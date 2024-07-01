---
title: ERC-721 非代替性トークン（NFT）規格
description:
lang: ja
---

## はじめに {#introduction}

**非代替性トークン（NFT）とは**

非代替性トークン（NFT）は、固有の方法で、人や物を識別するために使われます。 この種類のトークンは、収集用のアイテム、アクセスキー、宝くじ、コンサートやスポーツ試合におけるシート番号付チケットなどを発行するプラットフォームに最も適しています。 この特殊なタイプのトークンはすばらしい可能性を秘めているため、専用の規格としてERC-721を策定しました。

**ERC-721とは何か？**

ERC-721は、NFTに対する標準規格です。つまり、この種類のトークンはそれぞれがユニークな存在であり、発行日、希少性、および外見などの点で、同一のスマートコントラクトで発行される他のトークンとは異なる値を持つことができます。 外見が違うとはどういう意味でしょう？

はい！ すべてのNFTは、`tokenid`と呼ばれる`unit256`変数を持つため、ERC-721を伴うコントラクトでは、`contract adress, unit 256 tokenid`のペアはグローバルに固有でなければなりません。 その上で、各Dappでは、`tokenid`の入力から、ゾンビ、武器、スキル、あるいは可愛い子猫といったクールな画像を出力する「コンバーター」を搭載することができます。

## 前提知識 {#prerequisites}

- [アカウント](/developers/docs/accounts/)
- [スマートコントラクト](/developers/docs/smart-contracts/)
- [トークン規格](/developers/docs/standards/tokens/)

## 規格の概要 {#body}

ERC-721（Ethereum Request for Comments 721）は、ウィリアム・エントリケン氏、ディーター・シャーリー氏、ジェイコブ・エバンス氏、ナスタシア・サックス氏により2018年1月に提案された、スマートコントラクト内で非代替性トークン（NFT）を取り扱うためのAPIを実装するための規格です。

この規格により、複数アカウント間のトークンの転送、アカウントにおける現在のトークン残高の取得、トークン所有者の取得、およびネットワーク上で供給されているトークン総数の取得といった機能が提供されます。 さらに、特定のアカウントが所有するトークン残高のうち、サードパーティのアカウントが転送可能な上限の設定を承認するなど、その他の機能も提供されています。

以下のメソッドおよびイベントを実装したスマートコントラクトはERC-721非代替性トークン（NFT）コントラクトと呼ばれ、デプロイされると、イーサリアム上で作成されたトークンの状況を追跡する機能を提供します。

[EIP-721](https://eips.ethereum.org/EIPS/eip-721)から引用：

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

### 実例： {#web3py-example}

イーサリアムネットワークにおけるERC-721トークンコントラクトを詳しく検討することで、ネットワークをシンプルにする上でこれらの規格がいかに重要であるかが理解できるでしょう。 ERC-721トークンを対象とするインターフェイスを開発するには、コントラクトのアブリケーション・バイナリ・インターフェイス（ABI）があれば十分です。 これからつまずかないように簡略化されたABIを使用した例をお見せします。

#### Web3.pyの実例： {#web3py-example}

最初に、 Pythonライブラリの[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation)がインストールされていることを確認してください:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKittiesのコントラクトには、標準的なイベント以外にもいくつか興味深いイベントが含まれています。

特に、`Pregnant`と `Birth`のイベントについて見てみましょう。

```python
# 妊娠・出産イベントABIを利用して、新しいキティーの情報を得る。
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

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 人気が高いNFTの実例： {#popular-nfts}

- [イーサスキャンNFTトラッカー](https://etherscan.io/tokens-nft)は、イーサリアムにおけるNFTの取引量ランキングです。
- [クリプトキティーズ](https://www.cryptokitties.co/)は、クリプトキティーと呼ばれる愛らしい生物を育て、収集するゲームです。
- [ソラーレ](https://sorare.com/)は、グローバルなファンタジーフットボールゲームで、限定アイテムの収集、チームの管理、および試合を通じて賞品を獲得できます。
- [ ENS（イーサリアムネームサービス）](https://ens.domains/)は、安全かつ分散型の方法により、ブロックチェーン内外のリソースにシンプルかつ人間が読み取り可能な名称を付与できるサービスです。
- [POAP](https://poap.xyz)は、イベント参加や特定アクションの実行を行ったユーザーに対し、無料でNFTを提供できます。 POAPは自由に作成し、配布できます。
- [アンストッパブル・ドメインズ](https://unstoppabledomains.com/)は、 サンフランシスコに本社を置く企業で、ブロックチェーン上のドメイン作成業務を行っています。 ブロックチェーン上のドメインは、暗号通貨のアドレスを人間が読み取り可能な名称に置き換えるもので、ウェブサイトに検閲耐性を持たせるために使用できます。
- [ゴッズ・アンチェインド・カード](https://godsunchained.com/)は、イーサリアムブロックチェーン上のTCGで、NFTを使ってゲーム内アセットに真の所有権を提供しています。
- [ボアード・エイプ・ヨット・クラブ](https://boredapeyachtclub.com)は、10,000個の固有NFTのコレクションであると同時にいわゆるレアな美術作品であり、同クラブの会員証であるトークンでもあります。会員は、初回特典に加えて、コミュニティ活動を行うことでより多くの特典を受け取ることができます。

## 参考文献 {#further-reading}

- [EIP-721：ERC-721 非代替性トークン（NFT）規格](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721のドキュメンテーション](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721の実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [AlchemyのNFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
