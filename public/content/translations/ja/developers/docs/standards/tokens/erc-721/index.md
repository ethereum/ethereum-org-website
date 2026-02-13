---
title: "ERC-721 非代替性トークン（NFT）規格"
description: "ERC-721は、イーサリアム上のユニークなデジタル資産を表現するための、非代替性トークン（NFT）の標準規格です。これについて学びましょう。"
lang: ja
---

## はじめに {#introduction}

**非代替性トークン(NFT)とは？**

非代替性トークン（NFT）は、固有の方法で、人や物を識別するために使われます。 この種類のトークンは、収集用のアイテム、アクセスキー、宝くじ、コンサートやスポーツ試合におけるシート番号付チケットなどを発行するプラットフォームに最も適しています。 この特殊なタイプのトークンはすばらしい可能性を秘めているため、専用の規格としてERC-721を策定しました。

**ERC-721とは？**

ERC-721は、NFTに対する標準規格です。つまり、この種類のトークンはそれぞれがユニークな存在であり、発行日、希少性、および外見などの点で、同一のスマートコントラクトで発行される他のトークンとは異なる値を持つことができます。
外見が違うとはどういう意味でしょう？

はい！ すべてのNFTは`tokenId`と呼ばれる`uint256`変数を持っています。そのため、どのERC-721コントラクトでも、ペアである
`contract address, uint256 tokenId`はグローバルに一意でなければなりません。 とはいえ、dappは`tokenId`を入力として使用し、ゾンビ、武器、スキル、あるいは素晴らしい子猫のようなクールな画像を出力する「コンバーター」を持つことができます。

## 前提条件 {#prerequisites}

- [アカウント](/developers/docs/accounts/)
- [スマートコントラクト](/developers/docs/smart-contracts/)
- [トークン規格](/developers/docs/standards/tokens/)

## 規格の概要 {#body}

ERC-721（Ethereum Request for Comments 721）は、ウィリアム・エントリケン氏、ディーター・シャーリー氏、ジェイコブ・エバンス氏、ナスタシア・サックス氏により2018年1月に提案された、スマートコントラクト内で非代替性トークン（NFT）を取り扱うためのAPIを実装するための規格です。

この規格により、複数アカウント間のトークンの転送、アカウントにおける現在のトークン残高の取得、トークン所有者の取得、およびネットワーク上で供給されているトークン総数の取得といった機能が提供されます。
さらに、特定のアカウントが所有するトークン残高のうち、サードパーティのアカウントが転送可能な上限の設定を承認するなど、その他の機能も提供されています。

以下のメソッドおよびイベントを実装したスマートコントラクトはERC-721非代替性トークン（NFT）コントラクトと呼ばれ、デプロイされると、イーサリアム上で作成されたトークンの状況を追跡する機能を提供します。

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) から引用：

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

### 実例 {#web3py-example}

イーサリアムネットワークにおけるERC-721トークンコントラクトを詳しく検討することで、ネットワークをシンプルにする上でこれらの規格がいかに重要であるかが理解できるでしょう。
ERC-721トークンを対象とするインターフェイスを開発するには、コントラクトのアブリケーション・バイナリ・インターフェイス（ABI）があれば十分です。 理解しやすいように、以下では簡略化したABIを用いています。

#### Web3.pyの例 {#web3py-example}

まず、[Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Pythonライブラリがインストールされていることを確認してください:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKittiesコントラクト

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKittiesセールスオークション

# これはERC-721 NFTコントラクトの簡易版コントラクト・アプリケーション・バイナリ・インターフェース(ABI)です。
# balanceOf(address)、name()、ownerOf(tokenId)、symbol()、totalSupply()メソッドのみを公開します。
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

# TransferイベントABIを使用して、送金されたKittiesに関する情報を取得します。
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# ログをフィルタリングするためにイベントの署名が必要です。
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# 注:
#   - Transferイベントが返されない場合は、ブロック数を120から増やしてください。
#   - Transferイベントが見つからなかった場合は、次の場所でtokenIdを取得することもできます:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       イベントのログを展開して、その「tokenId」引数をコピーしてください
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # 上記のリンクから「tokenId」をここに貼り付けます
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKittiesのコントラクトには、標準的なイベント以外にもいくつか興味深いイベントが含まれています。

そのうちの2つ、`Pregnant`と`Birth`をチェックしてみましょう。

```python
# PregnantおよびBirthイベントABIを使用して、新しいKittiesに関する情報を取得します。
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

# ログをフィルタリングするためにイベントの署名が必要です。
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# これはPregnantイベントです:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# これはBirthイベントです:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## 人気のNFT {#popular-nfts}

- [Etherscan NFTトラッカー](https://etherscan.io/nft-top-contracts)は、送金量別にイーサリアムのトップNFTをリストアップします。
- [CryptoKitties](https://www.cryptokitties.co/)は、繁殖可能で、収集可能で、そしてとても愛らしい、私たちがCryptoKittiesと呼ぶ生き物を中心としたゲームです。
- [Sorare](https://sorare.com/)は、限定版のコレクティブルを収集し、チームを管理し、賞品を獲得するために競い合うグローバルなファンタジーフットボールゲームです。
- [イーサリアム・ネーム・サービス(ENS)](https://ens.domains/)は、安全かつ分散型の方法により、ブロックチェーン内外のリソースにシンプルかつ人間が読み取り可能な名前を使用してアドレスを付与します。
- [POAP](https://poap.xyz)は、イベントに参加したり、特定のアクションを完了した人々に無料のNFTを配布します。 POAPは自由に作成し、配布できます。
- [Unstoppable Domains](https://unstoppabledomains.com/)は、サンフランシスコを拠点とし、ブロックチェーン上にドメインを構築している会社です。 ブロックチェーンドメインは、暗号通貨アドレスを人間が読める名前に置き換え、検閲耐性のあるウェブサイトを可能にするために使用できます。
- [Gods Unchained Cards](https://godsunchained.com/)はイーサリアムブロックチェーン上のトレーディングカードゲーム(TCG)で、NFTを使用してゲーム内アセットに真の所有権をもたらします。
- [Bored Ape Yacht Club](https://boredapeyachtclub.com)は10,000個のユニークなNFTのコレクションで、証明可能な希少なアート作品であると同時に、クラブへの会員トークンとしても機能し、コミュニティの取り組みの結果として時間とともに増える会員特典や利益を提供します。

## 参考リンク {#further-reading}

- [EIP-721: ERC-721 非代替性トークン標準](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721ドキュメント](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
