---
title: "Vyper ERC-721コントラクトウォークスルー"
description: "中村龍矢氏のERC-721コントラクトとその仕組み"
author: Ori Pomerantz
lang: ja
tags: [ "vyper", "ERC-721", "python" ]
skill: beginner
published: 2021-04-01
---

## はじめに {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/)標準は、非代替性トークン(NFT)の所有権を保持するために使用されます。
[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンは、個々のトークンに違いがないため、コモディティのように振る舞います。
対照的に、ERC-721トークンは、さまざまな猫の
漫画や、異なる不動産の所有権など、似ているが同一ではない資産のために設計されています。

この記事では、[中村龍矢氏のERC-721コントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を分析します。
このコントラクトは、Pythonに似たコントラクト言語である[Vyper](https://vyper.readthedocs.io/en/latest/index.html)で書かれています。Vyperは、Solidityよりも安全でないコードを書くのが難しくなるように設計されています。

## コントラクト {#contract}

```python
# @dev ERC-721非代替性トークン標準の実装。
# @author Ryuya Nakamura (@nrryuya)
# 変更元: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyperのコメントは、Pythonと同様に、ハッシュ記号(`＃`)で始まり、行末まで続きます。 `@<キーワード>`を含むコメントは、[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)によって、人間が読める
ドキュメントを生成するために使用されます。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721インターフェイスはVyper言語に組み込まれています。
[コードの定義はこちらで確認できます](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
インターフェイスの定義はVyperではなくPythonで書かれています。なぜなら、インターフェイスはブロックチェーン内で使用されるだけでなく、Pythonで書かれている可能性のある外部クライアントからブロックチェーンにトランザクションを送信する際にも使用されるからです。

最初の行でインターフェイスをインポートし、2行目でここで実装することを指定しています。

### ERC721Receiverインターフェイス {#receiver-interface}

```python
# safeTransferFrom()によって呼び出されるコントラクトのインターフェイス
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721は2種類の送金をサポートしています。

- `transferFrom`: 送信者が任意の宛先アドレスを指定でき、
  送金の責任は送信者にあります。 これは、無効なアドレスに送金できることを意味し、その場合
  NFTは永久に失われます。
- `safeTransferFrom`: 宛先アドレスがコントラクトであるかどうかをチェックします。 もしそうであれば、ERC-721コントラクトは
  受信側のコントラクトにNFTを受け取りたいかどうかを尋ねます。

`safeTransferFrom`リクエストに応答するには、受信側コントラクトが`ERC721Receiver`を実装する必要があります。

```python
            _operator: address,
            _from: address,
```

`_from`アドレスは、トークンの現在の所有者です。 `_operator`アドレスは、
送金をリクエストしたアドレスです(アローワンスのため、この2つは同じでない場合があります)。

```python
            _tokenId: uint256,
```

ERC-721トークンIDは256ビットです。 通常、トークンIDはトークンが表すものの説明を
ハッシュ化して作成されます。

```python
            _data: Bytes[1024]
```

リクエストには最大1024バイトのユーザーデータを含めることができます。

```python
        ) -> bytes32: view
```

コントラクトが誤って送金を受け入れるケースを防ぐため、戻り値はブール値ではなく、
特定の価を持つ256ビットです。

この関数は`view`であり、ブロックチェーンの状態を読み取ることはできますが、変更することはできません。

### イベント {#events}

[イベント](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)は、ブロックチェーン外のユーザーやサーバーにイベントを通知するために発行されます。 イベントの内容は、ブロックチェーン上のコントラクトからは
利用できないことに注意してください。

```python
# @dev 何らかのメカニズムによってNFTの所有権が変更されたときに発行されます。このイベントは、NFTが作成
#      (`from` == 0)および破棄(`to` == 0)されたときに発行されます。例外：コントラクト作成中、任意の
#      数のNFTがTransferを発行せずに作成および割り当てられる場合があります。任意の
#      送金時、そのNFTの承認済みアドレス(もしあれば)はnoneにリセットされます。
# @param _from NFTの送信者(アドレスがゼロアドレスの場合、トークンの作成を示します)。
# @param _to NFTの受信者(アドレスがゼロアドレスの場合、トークンの破棄を示します)。
# @param _tokenId 送金されたNFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

これは、金額の代わりに`tokenId`を報告する点を除けば、ERC-20のTransferイベントと似ています。
ゼロアドレスを所有する者はいないため、慣例的にトークンの作成と破棄を報告するために使用します。

```python
# @dev NFTの承認済みアドレスが変更または再確認されたときに発行されます。ゼロ
#      アドレスは、承認済みアドレスがないことを示します。Transferイベントが発行されると、これも
#      そのNFTの承認済みアドレス(もしあれば)がnoneにリセットされることを示します。
# @param _owner NFTの所有者。
# @param _approved 承認するアドレス。
# @param _tokenId 承認するNFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721の承認はERC-20のアローワンスに似ています。 特定のアドレスが特定の
トークンを送金することが許可されます。 これにより、コントラクトがトークンを受け入れる際に応答するためのメカニズムが提供されます。 コントラクトは
イベントをリッスンできないため、トークンを送金しただけでは、コントラクトはそのことを「知り」ません。 この方法では、
所有者はまず承認を送信し、次にコントラクトに「トークン
Xの送金を承認しました。どうぞ...」というリクエストを送信します。

これは、ERC-721標準をERC-20標準と類似させるための設計上の選択です。 ERC-721トークンは非代替性であるため、
コントラクトはトークンの所有権を見ることで、特定のトークンを受け取ったことを
識別することもできます。

```python
# @dev 所有者のオペレーターが有効または無効になったときに発行されます。オペレーターは
#      所有者のすべてのNFTを管理できます。
# @param _owner NFTの所有者。
# @param _operator オペレーター権限を設定するアドレス。
# @param _approved オペレーター権限のステータス(権限が付与された場合はtrue、
# 取り消された場合はfalse)。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

委任状のように、特定タイプの(特定のコントラクトによって管理される)アカウントの全トークンを管理できる_オペレーター_がいると便利な場合があります。 例えば、私が6ヶ月間連絡を取っていないかどうかをチェックし、もしそうであれば私の資産を相続人に分配する権限をコントラクトに与えたいかもしれません(相続人の一人が要求した場合、コントラクトはトランザクションによって呼び出されない限り何もできません)。 ERC-20では、継承コントラクトに高いアローワンスを与えることができますが、
ERC-721ではトークンが非代替性であるため、これは機能しません。 これが同等の機能です。

`approved`の値は、イベントが承認のためのものか、承認の取り消しのためのものかを示します。

### 状態変数 {#state-vars}

これらの変数には、トークンの現在の状態、つまりどのトークンが利用可能で誰が所有しているかの情報が含まれています。 これらのほとんどは`HashMap`オブジェクトであり、[2つの型間に存在する一方向のマッピング](https://vyper.readthedocs.io/en/latest/types.html#mappings)です。

```python
# @dev NFT IDからそれを所有するアドレスへのマッピング。
idToOwner: HashMap[uint256, address]

# @dev NFT IDから承認済みアドレスへのマッピング。
idToApprovals: HashMap[uint256, address]
```

イーサリアムでは、ユーザーとコントラクトのIDは160ビットのアドレスで表されます。 これら2つの変数は、トークンIDから、
その所有者と送金を承認された者(それぞれ最大1つ)にマッピングします。 イーサリアムでは、未初期化データは常にゼロであるため、
所有者または承認済み送金者がいない場合、そのトークンの値はゼロになります。

```python
# @dev 所有者アドレスからそのトークン数へのマッピング。
ownerToNFTokenCount: HashMap[address, uint256]
```

この変数は、各所有者のトークン数を保持します。 所有者からトークンへのマッピングはないため、
特定の所有者が所有するトークンを識別する唯一の方法は、ブロックチェーンのイベント履歴を遡り、
適切な`Transfer`イベントを見ることです。 この変数を使用して、すべてのNFTをいつ取得したかを知ることができ、
それ以上調べる必要がありません。

このアルゴリズムは、ユーザーインターフェイスと外部サーバーに対してのみ機能することに注意してください。 ブロックチェーン上で実行されるコード
自体は、過去のイベントを読み取ることはできません。

```python
# @dev 所有者アドレスからオペレーターアドレスのマッピングへのマッピング。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

1つのアカウントに複数のオペレーターがいる場合があります。 単純な`HashMap`では、各キーが単一の値につながるため、
それらを追跡するには不十分です。 代わりに、値として
`HashMap[address, bool]`を使用できます。 デフォルトでは、各アドレスの値は`False`であり、
オペレーターではないことを意味します。 必要に応じて値を`True`に設定できます。

```python
# @dev トークンをミントできるミンターのアドレス
minter: address
```

新しいトークンは何らかの方法で作成されなければなりません。 このコントラクトには、それを許可された単一のエンティティ、
`minter`が存在します。 例えば、ゲームにとってはこれで十分でしょう。 他の目的のためには、
より複雑なビジネスロジックを作成する必要があるかもしれません。

```python
# @dev インターフェイスIDから、それがサポートされているかどうかを示すbool値へのマッピング
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165のERC165インターフェイスID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721のERC165インターフェイスID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)は、コントラクトがアプリケーションと
通信する方法、つまりどのERCに準拠しているかを公開するためのメカニズムを指定します。 この場合、コントラクトはERC-165とERC-721に準拠しています。

### 関数 {#functions}

これらは、実際にERC-721を実装する関数です。

#### コンストラクタ {#constructor}

```python
@external
def __init__():
```

Vyperでは、Pythonと同様に、コンストラクタ関数は`__init__`と呼ばれます。

```python
    """
    @dev コントラクトコンストラクタ。
    """
```

PythonやVyperでは、複数行の文字列(`"""`で始まり終わる)を指定し、それを一切使用しないことでコメントを作成することもできます。 これらのコメントには、
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)も含まれる場合があります。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

状態変数にアクセスするには`self.<変数名>`を使用します(これもPythonと同じです)。

#### ビュー関数 {#views}

これらはブロックチェーンの状態を変更しない関数であり、したがって外部から
呼び出された場合は無料で実行できます。 ビュー関数がコントラクトによって呼び出された場合でも、
すべてのノードで実行する必要があるため、ガス代がかかります。

```python
@view
@external
```

関数定義の前にある、アットマーク(`@`)で始まるこれらのキーワードは、_デコレータ_と呼ばれます。 これらは
関数を呼び出すことができる状況を指定します。

- `@view`は、この関数がビューであることを指定します。
- `@external`は、この特定の関数がトランザクションや他のコントラクトによって呼び出されることを指定します。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Pythonとは対照的に、Vyperは[静的型付け言語](https://wikipedia.org/wiki/Type_system#Static_type_checking)です。
[データ型](https://vyper.readthedocs.io/en/latest/types.html)を特定せずに、変数や関数パラメータを宣言することはできません。 この場合、入力パラメータは`bytes32`、つまり256ビット値です
(256ビットは[イーサリアム仮想マシン](/developers/docs/evm/)のネイティブワードサイズです)。 出力はブール
値です。 慣例により、関数パラメータの名前はアンダースコア(`_`)で始まります。

```python
    """
    @dev インターフェイスの識別はERC-165で指定されています。
    @param _interfaceID インターフェイスのID
    """
    return self.supportedInterfaces[_interfaceID]
```

コンストラクタ(`__init__`)で設定された`self.supportedInterfaces` HashMapから値を返します。

```python
### ビュー関数 ###

```

これらは、トークンに関する情報をユーザーや他のコントラクトが利用できるようにするビュー関数です。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`が所有するNFTの数を返します。
         `_owner`がゼロアドレスの場合はスローします。ゼロアドレスに割り当てられたNFTは無効と見なされます。
    @param _owner 残高を照会するアドレス。
    """
    assert _owner != ZERO_ADDRESS
```

この行は、`_owner`がゼロでないことを[アサート](https://vyper.readthedocs.io/en/latest/statements.html#assert)します。 もしゼロであれば、エラーが発生し、操作は取り消されます。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFTの所有者のアドレスを返します。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId NFTの識別子。
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != ZERO_ADDRESS
    return owner
```

イーサリアム仮想マシン(EVM)では、値が格納されていないストレージはゼロになります。
`_tokenId`にトークンがない場合、`self.idToOwner[_tokenId]`の値はゼロになります。 その場合、
関数は元に戻されます。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 単一のNFTの承認済みアドレスを取得します。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId 承認を照会するNFTのID。
    """
    # `_tokenId`が有効なNFTでない場合はスローします
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`はゼロを返す_可能性がある_ことに注意してください。 トークンが有効な場合、`self.idToApprovals[_tokenId]`を返します。
承認者がいない場合、その値はゼロです。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`が`_owner`の承認済みオペレーターであるかどうかをチェックします。
    @param _owner NFTを所有するアドレス。
    @param _operator 所有者の代わりに機能するアドレス。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

この関数は、`_operator`がこのコントラクト内の`_owner`のすべてのトークンを管理できるかどうかをチェックします。
複数のオペレーターが存在する可能性があるため、これは2レベルのHashMapです。

#### 送金ヘルパー関数 {#transfer-helpers}

これらの関数は、トークンの送金または管理の一部である操作を実装します。

```python

### 送金関数ヘルパー ###

@view
@internal
```

このデコレータ`@internal`は、この関数が同じコントラクト内の他の関数からのみアクセス可能であることを意味します。 慣例により、これらの関数名もアンダースコア(`_`)で始まります。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 指定されたスペンダーが指定されたトークンIDを送金できるかどうかを返します
    @param spender 照会するスペンダーのアドレス
    @param tokenId 送金されるトークンのuint256 ID
    @return bool msg.senderが指定されたトークンIDに対して承認されているか、
        所有者のオペレーターであるか、トークンの所有者であるかどうか
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

アドレスがトークンを送金できるようにするには、3つの方法があります。

1. アドレスがトークンの所有者である
2. アドレスがそのトークンを使用することを承認されている
3. アドレスがトークンの所有者のオペレーターである

上記の関数は状態を変更しないため、ビューにすることができます。 運用コストを削減するために、ビューに_できる_関数は
すべてビューに_すべき_です。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスにNFTを追加します
         `_tokenId`が誰かによって所有されている場合はスローします。
    """
    # `_tokenId`が誰かによって所有されている場合はスローします
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 所有者を変更
    self.idToOwner[_tokenId] = _to
    # カウント追跡を変更
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスからNFTを削除します
         `_from`が現在の所有者でない場合はスローします。
    """
    # `_from`が現在の所有者でない場合はスローします
    assert self.idToOwner[_tokenId] == _from
    # 所有者を変更
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # カウント追跡を変更
    self.ownerToNFTokenCount[_from] -= 1
```

送金に問題がある場合、呼び出しを元に戻します。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスの承認をクリアします
         `_owner`が現在の所有者でない場合はスローします。
    """
    # `_owner`が現在の所有者でない場合はスローします
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 承認をリセット
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

必要な場合のみ、値を変更してください。 状態変数はストレージに存在します。 ストレージへの書き込みは、
EVM (イーサリアム仮想マシン) が行う最も高価な操作の1つです([ガス](/developers/docs/gas/)の観点から)。 したがって、既存の値を書き込むだけでも
コストが高いため、これを最小限に抑えることをお勧めします。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFTの送金を実行します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認
         済みアドレスでない限り、スローします。(注：`msg.sender`はプライベート関数では許可されていないため、`_sender`を渡します。)
         `_to`がゼロアドレスの場合はスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    """
```

トークンを送金するには2つの方法(通常と安全)があるため、この内部関数がありますが、
監査を容易にするために、コード内の1つの場所でのみ実行するようにしています。

```python
    # 要件をチェック
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to`がゼロアドレスの場合はスローします
    assert _to != ZERO_ADDRESS
    # 承認をクリアします。`_from`が現在の所有者でない場合はスローします
    self._clearApproval(_from, _tokenId)
    # NFTを削除します。`_tokenId`が有効なNFTでない場合はスローします
    self._removeTokenFrom(_from, _tokenId)
    # NFTを追加
    self._addTokenTo(_to, _tokenId)
    # 送金をログに記録
    log Transfer(_from, _to, _tokenId)
```

Vyperでイベントを発行するには、`log`ステートメントを使用します([詳細はこちら](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))。

#### 送金関数 {#transfer-funs}

```python

### 送金関数 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認
         済みアドレスでない限り、スローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロアドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @notice 呼び出し元は、`_to`がNFTを受信できることを確認する責任があります。さもないと、
            永久に失われる可能性があります。
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

この関数を使用すると、任意のアドレスに送金できます。 アドレスがユーザーであるか、トークンの送金方法を知っているコントラクトでない限り、
送金したトークンはそのアドレスでスタックし、使用できなくなります。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev NFTの所有権をあるアドレスから別のアドレスに送金します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこの
         NFTの承認済みアドレスでない限り、スローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロアドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
         `_to`がスマートコントラクトの場合、`_to`で`onERC721Received`を呼び出し、
         戻り値が`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`でない場合にスローします。
         注：bytes4はパディング付きのbytes32で表されます
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    @param _data 指定されたフォーマットのない追加データで、`_to`への呼び出しで送信されます。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

問題が発生した場合はとにかく元に戻すので、先に送金しても問題ありません。
呼び出しで行われたことはすべてキャンセルされます。

```python
    if _to.is_contract: # `_to`がコントラクトアドレスかどうかをチェック
```

まず、アドレスがコントラクト(コードがある場合)かどうかを確認します。 そうでない場合は、それがユーザーアドレスであり、ユーザーが
トークンを使用または送金できると想定します。 しかし、それで
安心しきってはいけません。 `safeTransferFrom`を使用しても、誰も秘密鍵を知らないアドレスに
送金すると、トークンを失う可能性があります。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ターゲットコントラクトを呼び出して、ERC-721トークンを受信できるかどうかを確認します。

```python
        # 送金先が'onERC721Received'を実装していないコントラクトの場合はスローします
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

宛先がコントラクトであっても、ERC-721トークンを受け付けない(またはこの特定の
送金を受け付けないと決定した)場合は、元に戻します。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev NFTの承認済みアドレスを設定または再確認します。ゼロアドレスは、承認済みアドレスがないことを示します。
         `msg.sender`が現在のNFT所有者または現在の所有者の承認済みオペレーターでない限り、スローします。
         `_tokenId`が有効なNFTでない場合はスローします。(注：これはEIPには書かれていません)
         `_approved`が現在の所有者である場合はスローします。(注：これはEIPには書かれていません)
    @param _approved 指定されたNFT IDに対して承認されるアドレス。
    @param _tokenId 承認されるトークンのID。
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != ZERO_ADDRESS
    # `_approved`が現在の所有者である場合はスローします
    assert _approved != owner
```

慣例により、承認者を設定したくない場合は、自分自身ではなくゼロアドレスを指定します。

```python
    # 要件をチェック
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

承認を設定するには、所有者であるか、所有者によって承認されたオペレーターである必要があります。

```python
    # 承認を設定
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev サードパーティ(「オペレーター」)が`msg.sender`の
         すべての資産を管理するための承認を有効または無効にします。また、ApprovalForAllイベントも発行します。
         `_operator`が`msg.sender`である場合はスローします。(注：これはEIPには書かれていません)
    @notice これは、送信者がその時点でトークンを所有していなくても機能します。
    @param _operator 承認済みオペレーターのセットに追加するアドレス。
    @param _approved オペレーターが承認されている場合はTrue、承認を取り消す場合はfalse。
    """
    # `_operator`が`msg.sender`である場合はスローします
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 新しいトークンのミントと既存トークンの破棄 {#mint-burn}

コントラクトを作成したアカウントは`minter`であり、新しいNFTをミントする権限を持つ
スーパーユーザーです。 ただし、既存のトークンをバーンすることは許可されていません。 所有者、または所有者によって承認された
エンティティのみがそれを行うことができます。

```python
### ミント＆バーン関数 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

操作が失敗した場合は元に戻されるため、この関数は常に`True`を返します。

```python
    """
    @dev トークンをミントする関数
         `msg.sender`がミンターでない場合はスローします。
         `_to`がゼロアドレスの場合はスローします。
         `_tokenId`が誰かによって所有されている場合はスローします。
    @param _to ミントされたトークンを受け取るアドレス。
    @param _tokenId ミントするトークンID。
    @return 操作が成功したかどうかを示すブール値。
    """
    # `msg.sender`がミンターでない場合はスローします
    assert msg.sender == self.minter
```

ミンター(ERC-721コントラクトを作成したアカウント)のみが新しいトークンをミントできます。 これは、将来ミンターの
IDを変更したい場合に問題になる可能性があります。 本番環境のコントラクトでは、ミンターが
ミンター権限を他の誰かに譲渡できる関数が必要になるでしょう。

```python
    # `_to`がゼロアドレスの場合はスローします
    assert _to != ZERO_ADDRESS
    # NFTを追加します。`_tokenId`が誰かによって所有されている場合はスローします
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

慣例により、新しいトークンのミントはゼロアドレスからの送金としてカウントされます。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 特定のERC721トークンをバーンします。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認
         済みアドレスでない限り、スローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId バーンされるERC721トークンのuint256 ID。
    """
    # 要件をチェック
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

トークンの送金を許可されている人は誰でも、それをバーンすることが許可されています。 バーンはゼロアドレスへの送金と
同等に見えますが、ゼロアドレスは実際にはトークンを受け取りません。 これにより、トークンに使用されていたすべてのストレージを
解放でき、トランザクションのガス代を削減できます。

## このコントラクトの使用 {#using-contract}

Solidityとは対照的に、Vyperには継承がありません。 これは、コードをより明確にし、
したがってセキュリティを確保しやすくするための意図的な設計上の選択です。 したがって、独自のVyper ERC-721コントラクトを作成するには、この
コントラクトを取得し、
必要なビジネスロジックを実装するように変更します。

## 結論 {#conclusion}

復習のために、このコントラクトの最も重要なアイデアをいくつか紹介します。

- 安全な送金でERC-721トークンを受信するには、コントラクトは`ERC721Receiver`インターフェイスを実装する必要があります。
- 安全な送金を使用しても、秘密鍵が不明なアドレスに送信すると、
  トークンがスタックする可能性があります。
- 操作に問題がある場合は、単に失敗値を返すのではなく、
  呼び出しを`revert`することをお勧めします。
- ERC-721トークンは、所有者がいる場合に存在します。
- NFTの送金を承認するには、3つの方法があります。 所有者であるか、特定のトークンに対して承認されているか、
  または所有者のすべてのトークンのオペレーターであることができます。
- 過去のイベントはブロックチェーンの外部からのみ表示されます。 ブロックチェーン内で実行されるコードは、それらを表示できません。

では、セキュアなVyperコントラクトを実装してみましょう。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

