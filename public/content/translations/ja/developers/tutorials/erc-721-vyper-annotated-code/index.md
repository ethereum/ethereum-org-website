---
title: "Vyperで作成したERC-721コントラクトの紹介"
description: 中村龍矢氏のERC-721コントラクトとその仕組み
author: Ori Pomerantz
lang: ja
tags:
  - "Vyper"
  - "ERC-721"
  - "Python"
skill: beginner
published: 2021-04-01
---

## はじめに {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/)標準規格は、非代替性トークン（NFT）の所有権を保持するために使用されます。 [ERC-20](/developers/docs/standards/tokens/erc-20/)トークンは代替性を持つため、コモディティとして機能します。 一方、ERC-721トークンは、様々な[猫のイラスト](https://www.cryptokitties.co/)や不動産物件の各部分に対する権原など、同じ種類ではあるが異なるアセットを対象として設計されたものです。

本記事では、[中村龍矢氏のERC-721コントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を分析します。 このコントラクトは、[Vyper](https://vyper.readthedocs.io/en/latest/index.html)で作成されました。Vyperは、Pythonに似たコントラクト開発言語であり、Solidityと比較するとセキュリティが低いコードを作成しにくくなっています。

## コントラクトの内容 {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Pythonの場合と同様に、Vyperのコメントはハッシュ（`@/code>）で開始し、行末まで続けます。 <code>@<keyword>`を含むコメントは、 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) を通じて人間が読みやすいドキュメントに変換されます。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721インターフェイスは、Vyper言語に組み込まれています。 [コードの定義はこちら](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)をご覧ください。 インターフェイスの定義は、VyperではなくPythonで書かれています。これは、インターフェイスがブロックチェーン内だけでなく、Pythonで書かれた外部クライアントからブロックチェーンにトランザクションを送る際にも使われるからです。

第1行はインターフェイスをインポートし、第2行はここで実装することを指示します。

### ERC-721のReceiverインターフェイス {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721は、2つの送信方法をサポートしています。

- `transferFrom`は、送信者が任意の送信先アドレスを指定するもので、送信の責任は送信者が担います。 このため無効なアドレスにも送信できますが、その場合はNFTは永遠に失われます。
- `safeTransferFrom`は、送信先アドレスがコントラクトかどうかを確認します。 送信先アドレスがコントラクトであることを確認すると、ERC-721コントラクトが受信側のコントラクトにNFTを受け取りたいかどうかを尋ねます。

`safeTransferFrom`リクエストに応答するには、受信側コントラクトが`ERC721Receiver`を実装していなければなりません。

```python
            _operator: address,
            _from: address,
```

`_from`のアドレスは、トークンの現在の所有者のアドレスです。 `_operator`のアドレスは、 送信を要求したアドレスです（アローワンスにより、これらの 2 つが同一でない場合があります）。

```python
            _tokenId: uint256,
```

ERC-721トークンのIDは、256ビットです。 通常トークンIDは、トークンの内容をハッシュ化して生成されます。

```python
            _data: Bytes[1024]
```

このリクエストには、最大1024バイトのユーザーデータを含めることができます。

```python
        ) -> bytes32: view
```

コントラクトが誤送信を受け入れるケースを防止するため、戻り値はブール値ではなく、256ビットの特定の値になっています。

この関数は`view`関数であるため、ブロックチェーンの状態を読み取るだけで、変更はできません。

### イベント {#events}

[イベント](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)は、ブロックチェーン外のユーザーおよびサーバーにイベントを通知するために発行されます。 イベントの内容は、ブロックチェーン上のコントラクトでは利用できないことに注意してください。

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transferred.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

これは、金額の代わりに`tokenId`を伝える点を除くとERC-20のTransferイベントと類似しています。 アドレスを所有しないユーザーはいないので、慣習的に、このイベントを使ってトークンの発行と破壊を報告しています。

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721の承認は、ERC-20におけるアローワンスに類似した機能です。 特定のアドレスから、特定のトークンを送信することが可能です。 これにより、コントラクトがトークンを受け入れる際に対応するためのメカニズムが実現します。 コントラクトは、イベントをリッスンできないため、トークンが送信されてもそれを「把握」できないのです。 つまり、所有者はまず承認を提出してから、コントラクトに対して「私はあなたがトークンXを送信することを承認しましたので、〜を実行してください」というリクエストを送信するわけです。

これは、ERC-721標準をERC-20と類似の標準にするための設計上の選択によるものです。 ERC-721トークンは非代替性であるため、コントラクトは、トークンの所有権を調べて特定のトークンを受け取ったかどうかを確認できます。

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

場合によっては、委任状の機能のように、アカウントが所有する特定タイプのトークン（特定のコントラクトが管理するトークン）をすべて管理できる_オペレーター_ を持つことが便利な場合もあります。 例えば、私がコントラクトに対して、6カ月にわたりそのコントラクトとのやりとりを行っていないかどうかを確認する権限を与え、もしやりとりがない場合には、私のアセットを相続人に分配するように設定したいとします（相続人の一人が遺産分配を求めても、トランザクションによって呼び出されない限りコントラクトは何も実行できません）。 ERC-20では、継承コントラクトに対して大きなアローワンスを設定できますが、ERC-721の場合、非代替性を持つために不可能です。 そこで、オペレーターが同等の機能を提供します。

`approved`の値を通じて、当該イベントが承認を求めるものか、承認を取り消したものかを確認することができます。

### 状態変数 {#state-vars}

状態変数には、トークンの現在の状態、つまりどのトークンが存在し、誰が所有するかの情報が含まれます。 大部分の状態変数は`HashMap`オブジェクトであり、[2つのタイプ間に存在する一方向のマッピング](https://vyper.readthedocs.io/en/latest/types.html#mappings)です。

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

イーサリアムにおいて、ユーザーおよびコントラクトのIDは160ビットのアドレスで表示されます。 これら2つの変数は、トークンIDから、所有者および送信することを承認された者（それぞれにつき最大1つの変数）がマッピングされます。 イーサリアムでは、未初期化データは常にゼロであるため、所有者または承認済み送信者が存在しなければ、トークンの値はゼロになります。

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

この変数は、各所有者ごとのトークン数を保持します。 所有者とトークンはマッピングされないため、特定の所有者が持つトークンを特定するには、ブロックチェーンのイベント履歴を過去に遡って確認し、当該の`Transfer`イベントを確認するしかありません。 この変数を使用して、すべてのNFTでいつ取得したか知ることができ、それ以上調べる必要がありません。

ただし、このアルゴリズムはユーザーインターフェイスおよび外部サーバーのみを対象とする点に注意してください。 ブロックチェーン上で実行されるコード自体は、過去イベントを読み込むことができません。

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

1つのアカウントには、複数のオペレーターを含めることができます。 しかし、単純な`HashMap`では、各キーごとに単一の値を持つため、複数のオペレーターを追跡するのに十分ではありません。 その代わりに、`HashMap[address, bool]`を値として使用します。 デフォルトでは、各アドレスの値は`False`になっていますが、これはオペレーターでないことを示します。 オペレーターに設定するには、値を`True`に変更してください。

```python
# @dev Address of minter, who can mint a token
minter: address
```

何らかの方法で、新規トークンを作成する必要があります。 このコントラクトでは、新規トークンを作成する権限を持つ唯一のエンティティは`minter`です。 使用事例がゲームなどの場合は、これで十分でしょう。 その他の目的の場合、より複雑なビジネスロジックを作成する必要があるでしょう。

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)では、コントラクトにおいてアプリケーションがどのようなやりとりを行うか、およびどのERC規格に準拠するのかを開示するメカニズムの仕様が規定されています。 このコントラクトの場合、ERC-165とERC-721に準拠しています。

### 関数 {#functions}

以下は、実際にERC-721で実装できる関数です。

#### コンストラクタ関数 {#constructor}

```python
@external
def __init__():
```

Pythonの場合と同様に、Vyperでもコンストラクタ関数は`__init__`で呼び出します。

```python
    """
    @dev Contract constructor.
    """
```

PythonおよびVyperでは、複数行の文字列（文頭および文末を`"""`に付ける）を指定し、この文字列を利用しないことでもコメントを作成できます。 これらのコメントには、 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)を含めることも可能です。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

状態変数にアクセスするには、`self.<variable name>`を使用します（これも、Pythonと同様です）。

#### ビュー関数 {#views}

ビュー関数は、ブロックチェーンの状態を変更しない関数であり、外部から呼び出されると無料で実行されます。 一方、コントラクトがビュー関数を呼び出す場合は全ノードで実行する必要があるため、ガス代が発生します。

```python
@view
@external
```

アットマーク （`@`）で始まる関数定義の前に置かれたこれらのキーワードを、_デコレータ_と呼びます。 デコレータは、関数を呼び出せる状況を特定します。

- `@view`は、関数がビューであることを規定します。
- `@external`は、関数がトランザクションおよび他のコントラクトで呼び出し可能であることを規定します。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Pythonとは異なり、Vyperは[静的型付け言語](https://wikipedia.org/wiki/Type_system#Static_type_checking)です。 つまり、[データ型](https://vyper.readthedocs.io/en/latest/types.html)を指定しないと変数、つまり関数のパラメータを宣言できません。 この場合では、入力パラメータは、256ビット値の`bytes32`です (256ビットは、[イーサリアム仮想マシン](/developers/docs/evm/)のネイティブワードサイズです) 。 出力は、ブール値です。 慣習により、関数におけるパラメータの名称はアンダースコア (`_`) で開始します。

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

コンストラクタ（`__init__`）で設定した`self.supportedInterfaces`ハッシュマップが値を返します。

```python
### VIEW FUNCTIONS ###
```

これらは、ユーザーや他のコントラクトが利用できるトークンについての情報を提供するビュー関数です。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

この行は、`_owner`値がゼロでないことを[宣言](https://vyper.readthedocs.io/en/latest/statements.html#assert)します。 値がゼロの場合、エラーが発生し操作が元に戻されます。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

イーサリアム仮想マシン（EVM）では、値が格納されていないストレージはゼロになります。 `_tokenId`にトークンが含まれない場合、`self.idToOwner[_tokenId]`の値はゼロになります。 その場合、関数は元に戻されます。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`は、ゼロの値を返す_可能性_がある点に注意してください。 有効なトークンが存在する場合、`self.idToApprovals[_tokenId]`の値が返されます。 承認者が存在しない場合、値はゼロになります。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

この関数は、「`_operator`」がこのコントラクト内の「`_owner`」のトークンをすべて管理できるかどうかをチェックします。 複数のオペレーターが存在する可能性があるため、ハッシュマップも2つのレベルが存在します。

#### 送信ヘルパー関数 {#transfer-helpers}

これらの関数は、トークンの送信またはトークン管理の一部のオペレーションを実装しています。

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

`@internal`のデコレータは、関数が同一コントラクト内の他の関数からのみアクセス可能であることを意味します。 これらの関数も、慣習によりアンダースコア (`_`) で開始します。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

アドレスからトークンを送信できるようにするには、次の3通りの方法があります：

1. アドレスが、トークンの所有者であること
2. アドレスが、トークンの使用を承認されていること
3. アドレスが、トークンの所有者のオペレーターであること

上記の機能は、状態を変更しないためビュー機能とすることもできます。 オペレーションコストを軽減するには、ビュー機能と_指定できる_関数はビュー機能に_するべき_です。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

送信に問題が発生した場合、呼び出しは取り消されます。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

必要な場合のみ、値を変更してください。 状態変数は、ストレージ上に保存されます。 ストレージへの書き込みは、EVM（イーサリアム仮想マシン）において[ガス代](/developers/docs/gas/)が最も高価なオペレーションの1つです。 既存の値の書き込みもコストが高いため、ストレージへの書き込みは最低限に抑えることをお勧めします。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

トークンの送信には2つの方法（通常モードと安全モード）が存在するため、この内部関数が提供されていますが、監査を容易にするために、コード内で送信するロケーションは1つだけにする必要があります。

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

Vyper上でイベントを発行するには、`log`ステートメントを使用します（詳細は、[こちら](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)をご覧ください）。

#### 送信関数 {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

この関数は、任意のアドレスに送信する機能を提供します。 送信先のアドレスがユーザーであるか、トークンの送信方法が分かっているコントラクトでない場合、送信するトークンはそのアドレスに置かれたまま利用できない状態になります。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

問題が発生した場合にはトランザクションが元に戻され、コールに含まれるすべての事項が取り消されるため、先に送信を行っても構いません。

```python
    if _to.is_contract: # check if `_to` is a contract address
```

まず、アドレスがコントラクトであるか（コードを持つか）を確認してください。 アドレスがコントラクトでない場合、ユーザーのアドレスであれば、そのトークンを使用／送信できるようになります。 しかし、これがセキュリティを強化すると考えるべきではありません。 `safeTransferFrom`を使用した場合でも、秘密鍵が不明なアドレスに送信したトークンは失われる場合があります。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ERC-721トークンを受信できるかどうかを確認するには、送信先のコントラクトを呼び出します。

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

送信先がコントラクトであるが、ERC-721トークンを受け付けない場合（または、この特定の送信を受け付けないと選択した場合）、操作を取り消してください。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

慣習により、承認者を設定したくない場合、自分のアドレスではなく、ゼロのアドレスを指定してください。

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

承認を設定するには、所有者であるか、所有者が承認したオペレーターである必要があります。

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 新しいトークンのミントと既存トークンの破壊 {#mint-burn}

コントラクトを作成したアカウントは`minter`となり、新規のNFTをミントする承認を受けたスーパーユーザーとなります。 ただし、ミンターは既存トークンをバーンすることはできません。 バーンできるのは、所有者および所有者の承認を受けたエンティティのみです。

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

操作が実行されない場合は常に元に戻されるため、この関数は常に`True`の値が返されます。

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

新たなトークンをミントできるのは、このミンター（この ERC-721コントラクトを作成したアカウント）のみです。 ミンターの身元を変更したい場合、この点は将来的に問題になる可能性があります。 本番環境のコントラクトでは、ミンターがミンター特権を他のユーザーに譲渡できる機能が必要になるでしょう。

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

慣習により、新規トークンのミントは、ゼロアドレスからの送信としてカウントされます。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

トークンの送信が許可されているユーザーは、そのトークンをバーンすることができます。 バーンは、ゼロアドレスへの送信と同じ外見を持ちますが、このゼロアドレスは実際にはこのトークンを受け取りません。 バーンを通じて、このトークンに使用されたすべてのストレージを解放できるため、トランザクションのガス代を軽減することができます。

# コントラクトの使用方法 {#using-contract}

Solidityとは異なり、Viperは相続機能を提供しません。 これは、コードをより明確にし、セキュリティを確保しやすくするための意図的な設計上の選択によるものです。 このため、あなた自身がVyperでERC-721コントラクトを作成する際は、[このコントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を用いて修正し、必要なビジネスロジックを実装してください。

# まとめ {#conclusion}

このコントラクトにつき、最も重要なポイントを以下にまとめました：

- 安全モードの送信を使ってERC-721トークンを受け取るには、コントラクトに`ERC721Receiver`インターフェイスを実装する必要があります。
- 安全モードの送信を実行した場合でも、秘密鍵が不明なアドレスに送信したトークンは行方不明になる可能性があります。
- 操作に問題が発生した場合、単に失敗値をリターンするのではなく、コール自体を`取り消す`ことをお勧めします。
- ERC-721トークンには、必ず所有者が必要です。
- NFTの送信を承認するには、3通りの方法があります。 承認できるのは、所有者であるか、特定トークンの送信を承認されているか、所有者のトークンすべてに対するオペレーターであるユーザーのみです。
- 過去のイベントは、ブロックチェーン外でのみ表示されます。 ブロックチェーン内で実行されるコードは、表示できません。

それではさっそく、セキュアなVyperコントラクトを実装してみましょう。
