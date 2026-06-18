---
title: "Vyper ERC-721コントラクトの解説"
description: Ryuya NakamuraのERC-721コントラクトとその仕組み
author: オリ・ポメランツ
lang: ja
tags: ["vyper", "erc-721", "python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## はじめに {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/)標準は、非代替性トークン（NFT）の所有権を保持するために使用されます。
個々のトークン間に違いがないため、[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンはコモディティのように振る舞います。
対照的に、ERC-721トークンは、異なる[猫のキャラクター](https://www.cryptokitties.co/)や異なる不動産の権利書など、類似しているが同一ではない資産のために設計されています。

この記事では、[Ryuya NakamuraのERC-721コントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を分析します。
このコントラクトは、Solidityよりも安全でないコードを書きにくくするように設計されたPython風のコントラクト言語である[Vyper](https://vyper.readthedocs.io/en/latest/index.html)で書かれています。

## コントラクト {#contract}

```python
# @dev ERC-721非代替性トークン標準の実装。
# @author Ryuya Nakamura (@nrryuya)
# 変更元: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyperのコメントは、Pythonと同様にハッシュ（`#`）で始まり、行末まで続きます。`@<keyword>`を含むコメントは、人間が読めるドキュメントを生成するために[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)によって使用されます。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721インターフェースはVyper言語に組み込まれています。
[コードの定義はこちらで確認できます](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
インターフェースはブロックチェーン内だけでなく、Pythonで書かれている可能性のある外部クライアントからブロックチェーンにトランザクションを送信する際にも使用されるため、インターフェース定義はVyperではなくPythonで書かれています。

最初の行はインターフェースをインポートし、2行目はここでそれを実装することを指定しています。

### ERC721Receiverインターフェース {#receiver-interface}

```python
# safeTransferFrom()によって呼び出されるコントラクトのインターフェース
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721は2種類の送金をサポートしています：

- `transferFrom`：送信者が任意の宛先アドレスを指定でき、送金の責任を送信者に負わせます。これは、無効なアドレスに送金できることを意味し、その場合NFTは永久に失われます。
- `safeTransferFrom`：宛先アドレスがコントラクトであるかを確認します。コントラクトである場合、ERC-721コントラクトは受信側コントラクトにNFTを受け取るかどうかを尋ねます。

`safeTransferFrom`のリクエストに応答するには、受信側コントラクトは`ERC721Receiver`を実装する必要があります。

```python
            _operator: address,
            _from: address,
```

`_from`アドレスはトークンの現在の所有者です。`_operator`アドレスは送金をリクエストしたアドレスです（アローワンスがあるため、これら2つは同じではない場合があります）。

```python
            _tokenId: uint256,
```

ERC-721のトークンIDは256ビットです。通常、これらはトークンが表すものの説明をハッシュ化することによって作成されます。

```python
            _data: Bytes[1024]
```

リクエストには最大1024バイトのユーザーデータを含めることができます。

```python
        ) -> bytes32: view
```

コントラクトが誤って送金を受け入れるケースを防ぐため、戻り値はブール値ではなく、特定の値を持つ256ビットです。

この関数は`view`であり、ブロックチェーンの状態を読み取ることはできますが、変更することはできないことを意味します。

### イベント {#events}

[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)は、ブロックチェーン外のユーザーやサーバーにイベントを通知するために発行されます。イベントの内容はブロックチェーン上のコントラクトからは利用できないことに注意してください。

```python
# @dev 任意のメカニズムによってNFTの所有権が変更されたときに発行されます。このイベントは、NFTが
#      作成（`from` == 0）および破棄（`to` == 0）されたときに発行されます。例外：コントラクト作成中、任意の
#      数のNFTがTransferを発行せずに作成および割り当てられる場合があります。いかなる
#      送金時にも、そのNFTの承認済みアドレス（存在する場合）はなしにリセットされます。
# @param _from NFTの送信者（アドレスがゼロ・アドレスの場合はトークンの作成を示します）。
# @param _to NFTの受信者（アドレスがゼロ・アドレスの場合はトークンの破棄を示します）。
# @param _tokenId 送金されたNFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

これはERC-20のTransferイベントに似ていますが、金額の代わりに`tokenId`を報告する点が異なります。ゼロ・アドレスを所有する人はいないため、慣例としてトークンの作成と破棄を報告するために使用します。

```python
# @dev これは、NFTの承認済みアドレスが変更または再確認されたときに発行されます。ゼロ・
#      アドレスは、承認済みアドレスがないことを示します。Transferイベントが発行されると、これも
#      そのNFTの承認済みアドレス（存在する場合）がなしにリセットされることを示します。
# @param _owner NFTの所有者。
# @param _approved 承認するアドレス。
# @param _tokenId 承認するNFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721の承認（approval）は、ERC-20のアローワンスに似ています。特定のアドレスが特定のトークンを送金することが許可されます。これにより、コントラクトがトークンを受け取ったときに応答するメカニズムが提供されます。コントラクトはイベントをリッスンできないため、単にトークンを送金しただけでは、コントラクトはそれを「知る」ことができません。この方法では、所有者が最初に承認を提出し、次にコントラクトにリクエストを送信します。「トークンXの送金を承認したので、...を実行してください」。

これは、ERC-721標準をERC-20標準に似せるための設計上の選択です。ERC-721トークンは代替不可能であるため、コントラクトはトークンの所有権を確認することで、特定のトークンを受け取ったことを識別することもできます。

```python
# @dev これは、所有者に対してオペレーターが有効または無効にされたときに発行されます。オペレーターは
#      所有者のすべてのNFTを管理できます。
# @param _owner NFTの所有者。
# @param _operator オペレーター権限を設定するアドレス。
# @param _approved オペレーター権限のステータス（オペレーター権限が付与されている場合はtrue、
# 取り消されている場合はfalse）。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

委任状のように、特定の種類（特定のコントラクトによって管理されるもの）のアカウントのすべてのトークンを管理できる_オペレーター_を持つことが便利な場合があります。たとえば、私が6か月間連絡を取っていないかを確認し、そうであれば私の資産を相続人に分配するコントラクトにそのような権限を与えたいと思うかもしれません（相続人の一人がそれを要求した場合。コントラクトはトランザクションによって呼び出されない限り何もできません）。ERC-20では、相続コントラクトに高いアローワンスを与えるだけで済みますが、ERC-721ではトークンが代替不可能であるため、それは機能しません。これはそれに相当するものです。

`approved`の値は、イベントが承認のためのものか、承認の取り消しのためのものかを示します。

### 状態変数 {#state-vars}

これらの変数は、どのトークンが利用可能で誰が所有しているかという、トークンの現在の状態を含んでいます。これらのほとんどは`HashMap`オブジェクトであり、[2つの型間に存在する単方向のマッピング](https://vyper.readthedocs.io/en/latest/types.html#mappings)です。

```python
# @dev NFT IDからそれを所有するアドレスへのマッピング。
idToOwner: HashMap[uint256, address]

# @dev NFT IDから承認済みアドレスへのマッピング。
idToApprovals: HashMap[uint256, address]
```

イーサリアムにおけるユーザーとコントラクトのアイデンティティは、160ビットのアドレスで表されます。これら2つの変数は、トークンIDからその所有者および送金を承認された者（それぞれ最大1人）にマッピングします。イーサリアムでは、初期化されていないデータは常にゼロであるため、所有者や承認された送金者がいない場合、そのトークンの値はゼロになります。

```python
# @dev 所有者のアドレスからそのトークンの数へのマッピング。
ownerToNFTokenCount: HashMap[address, uint256]
```

この変数は、各所有者のトークン数を保持します。所有者からトークンへのマッピングはないため、特定の所有者が所有するトークンを特定する唯一の方法は、ブロックチェーンのイベント履歴を遡り、該当する`Transfer`イベントを確認することです。この変数を使用することで、すべてのNFTを取得し終え、これ以上過去を遡る必要がないタイミングを知ることができます。

このアルゴリズムは、ユーザーインターフェースと外部サーバーでのみ機能することに注意してください。ブロックチェーン上で実行されているコード自体は、過去のイベントを読み取ることはできません。

```python
# @dev 所有者のアドレスからオペレーターのアドレスのマッピングへのマッピング。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

アカウントは複数のオペレーターを持つ場合があります。各キーが単一の値につながるため、単純な`HashMap`ではそれらを追跡するのに不十分です。代わりに、値として`HashMap[address, bool]`を使用できます。デフォルトでは、各アドレスの値は`False`であり、これはオペレーターではないことを意味します。必要に応じて値を`True`に設定できます。

```python
# @dev トークンをミントできるミンターのアドレス
minter: address
```

新しいトークンは何らかの方法で作成される必要があります。このコントラクトでは、それを行うことが許可されている単一のエンティティ、`minter`が存在します。これは、たとえばゲームには十分である可能性が高いです。他の目的では、より複雑なビジネスロジックを作成する必要があるかもしれません。

```python
# @dev インターフェースIDからそれがサポートされているかどうかのboolへのマッピング
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165のERC-165インターフェースID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-721のERC-165インターフェースID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)は、コントラクトがどのERCに準拠しているか、アプリケーションがどのように通信できるかを開示するメカニズムを指定しています。この場合、コントラクトはERC-165とERC-721に準拠しています。

### 関数 {#functions}

これらは実際にERC-721を実装する関数です。

#### コンストラクタ {#constructor}

```python
@external
def __init__():
```

Vyperでは、Pythonと同様に、コンストラクタ関数は`__init__`と呼ばれます。

```python
    """
    @dev コントラクトのコンストラクタ。
    """
```

PythonおよびVyperでは、複数行の文字列（`"""`で始まり終わる）を指定し、それを一切使用しないことでコメントを作成することもできます。これらのコメントには[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)を含めることもできます。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

状態変数にアクセスするには、`self.<variable name>`を使用します（これもPythonと同じです）。

#### View関数 {#views}

これらはブロックチェーンの状態を変更しない関数であり、外部から呼び出された場合は無料で実行できます。View関数がコントラクトから呼び出された場合、依然としてすべてのノードで実行される必要があるため、ガスがかかります。

```python
@view
@external
```

関数定義の前にあり、アットマーク（`@`）で始まるこれらのキーワードは_デコレーション_と呼ばれます。これらは関数を呼び出すことができる状況を指定します。

- `@view`は、この関数がViewであることを指定します。
- `@external`は、この特定の関数がトランザクションや他のコントラクトから呼び出せることを指定します。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Pythonとは対照的に、Vyperは[静的型付け言語](https://wikipedia.org/wiki/Type_system#Static_type_checking)です。[データ型](https://vyper.readthedocs.io/en/latest/types.html)を特定せずに変数や関数パラメータを宣言することはできません。この場合、入力パラメータは256ビットの値である`bytes32`です（256ビットは[イーサリアム仮想マシン](/developers/docs/evm/)のネイティブワードサイズです）。出力はブール値です。慣例として、関数パラメータの名前はアンダースコア（`_`）で始まります。

```python
    """
    @dev インターフェースの識別はERC-165で指定されています。
    @param _interfaceID インターフェースのID
    """
    return self.supportedInterfaces[_interfaceID]
```

コンストラクタ（`__init__`）で設定された`self.supportedInterfaces` HashMapから値を返します。

```python
### VIEW関数 ###
```

これらは、トークンに関する情報をユーザーや他のコントラクトが利用できるようにするView関数です。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`が所有するNFTの数を返します。
         `_owner`がゼロ・アドレスの場合はスローします。ゼロ・アドレスに割り当てられたNFTは無効と見なされます。
    @param _owner 残高を照会するアドレス。
    """
    assert _owner != ZERO_ADDRESS
```

この行は、`_owner`がゼロでないことを[アサート](https://vyper.readthedocs.io/en/latest/statements.html#assert)します。ゼロの場合、エラーとなり操作はリバートされます。

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

イーサリアム仮想マシン（EVM）では、値が保存されていないストレージはすべてゼロになります。`_tokenId`にトークンがない場合、`self.idToOwner[_tokenId]`の値はゼロになります。その場合、関数はリバートされます。

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

`getApproved`はゼロを返す_可能性がある_ことに注意してください。トークンが有効な場合、`self.idToApprovals[_tokenId]`を返します。承認者がいない場合、その値はゼロになります。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`が`_owner`の承認済みオペレーターであるかを確認します。
    @param _owner NFTを所有するアドレス。
    @param _operator 所有者の代理として行動するアドレス。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

この関数は、`_operator`がこのコントラクト内の`_owner`のすべてのトークンを管理することを許可されているかを確認します。複数のオペレーターが存在する可能性があるため、これは2レベルのHashMapになっています。

#### 送金ヘルパー関数 {#transfer-helpers}

これらの関数は、トークンの送金や管理の一部となる操作を実装します。

```python

### 送金関数のヘルパー ###

@view
@internal
```

このデコレーション`@internal`は、関数が同じコントラクト内の他の関数からのみアクセス可能であることを意味します。慣例として、これらの関数名もアンダースコア（`_`）で始まります。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 指定されたスペンダーが指定されたトークンIDを送金できるかどうかを返します
    @param spender 照会するスペンダーのアドレス
    @param tokenId 送金されるトークンのuint256 ID
    @return bool msg.senderが指定されたトークンIDに対して承認されているか、
        所有者のオペレーターであるか、またはトークンの所有者であるか
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

アドレスがトークンの送金を許可されるには、3つの方法があります：

1. アドレスがトークンの所有者である
2. アドレスがそのトークンを使用することを承認されている
3. アドレスがトークン所有者のオペレーターである

上記の関数は状態を変更しないため、Viewにすることができます。運用コストを削減するために、Viewに_できる_関数はすべてViewに_すべき_です。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスにNFTを追加します
         `_tokenId`が誰かに所有されている場合はスローします。
    """
    # `_tokenId`が誰かに所有されている場合はスローします
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 所有者を変更します
    self.idToOwner[_tokenId] = _to
    # カウントの追跡を変更します
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスからNFTを削除します
         `_from`が現在の所有者でない場合はスローします。
    """
    # `_from`が現在の所有者でない場合はスローします
    assert self.idToOwner[_tokenId] == _from
    # 所有者を変更します
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # カウントの追跡を変更します
    self.ownerToNFTokenCount[_from] -= 1
```

送金に問題がある場合、呼び出しをリバートします。

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
        # 承認をリセットします
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

必要な場合のみ値を変更します。状態変数はストレージに存在します。ストレージへの書き込みは、EVM（イーサリアム仮想マシン）が行う最も高価な操作の1つです（[ガス](/developers/docs/gas/)の観点から）。したがって、それを最小限に抑えることは良い考えであり、既存の値を書き込むだけでも高いコストがかかります。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFTの送金を実行します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認済み
         アドレスでない限りスローします。（注：プライベート関数では`msg.sender`が許可されていないため、`_sender`を渡します。）
         `_to`がゼロ・アドレスの場合はスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    """
```

トークンを送金する方法は2つ（通常と安全）ありますが、監査を容易にするためにコード内で送金を行う場所を1か所だけにしたいので、この内部関数を用意しています。

```python
    # 要件を確認します
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to`がゼロ・アドレスの場合はスローします
    assert _to != ZERO_ADDRESS
    # 承認をクリアします。`_from`が現在の所有者でない場合はスローします
    self._clearApproval(_from, _tokenId)
    # NFTを削除します。`_tokenId`が有効なNFTでない場合はスローします
    self._removeTokenFrom(_from, _tokenId)
    # NFTを追加します
    self._addTokenTo(_to, _tokenId)
    # 送金をログに記録します
    log Transfer(_from, _to, _tokenId)
```

Vyperでイベントを発行するには、`log`ステートメントを使用します（[詳細はこちらを参照してください](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。

#### 送金関数 {#transfer-funs}

```python

### 送金関数 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認済み
         アドレスでない限りスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @notice 呼び出し元は、`_to`がNFTを受信できることを確認する責任があります。そうでない場合、
            それらは永久に失われる可能性があります。
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

この関数を使用すると、任意のアドレスに送金できます。アドレスがユーザーであるか、トークンの送金方法を知っているコントラクトでない限り、送金したトークンはそのアドレスにスタックし、役に立たなくなります。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev NFTの所有権をあるアドレスから別のアドレスへ送金します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの
         承認済みアドレスでない限りスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
         `_to`がスマートコントラクトの場合、`_to`で`onERC721Received`を呼び出し、
         戻り値が`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`でない場合はスローします。
         注：bytes4はパディング付きのbytes32で表されます
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    @param _data 指定された形式のない追加データ。`_to`への呼び出しで送信されます。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

問題があればいずれにせよリバートし、呼び出しで行われたすべてがキャンセルされるため、最初に送金を行っても問題ありません。

```python
    if _to.is_contract: # `_to`がコントラクトのアドレスであるかを確認します
```

まず、アドレスがコントラクトであるか（コードを持っているか）を確認します。そうでない場合は、ユーザーアドレスであると想定し、ユーザーがトークンを使用または送金できると考えます。しかし、それで安心しきってはいけません。`safeTransferFrom`を使用しても、誰も秘密鍵を知らないアドレスに送金すると、トークンを失う可能性があります。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ターゲットコントラクトを呼び出して、ERC-721トークンを受け取ることができるかを確認します。

```python
        # 送金先が'onERC721Received'を実装していないコントラクトの場合はスローします
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

宛先がコントラクトであっても、ERC-721トークンを受け入れない（またはこの特定の送金を受け入れないと決定した）場合は、リバートします。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev NFTの承認済みアドレスを設定または再確認します。ゼロ・アドレスは承認済みアドレスがないことを示します。
         `msg.sender`が現在のNFT所有者、または現在の所有者の承認されたオペレーターでない限りスローします。
         `_tokenId`が有効なNFTでない場合はスローします。（注：これはEIPには書かれていません）
         `_approved`が現在の所有者である場合はスローします。（注：これはEIPには書かれていません）
    @param _approved 指定されたNFT IDに対して承認されるアドレス。
    @param _tokenId 承認されるトークンのID。
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != ZERO_ADDRESS
    # `_approved`が現在の所有者である場合はスローします
    assert _approved != owner
```

慣例として、承認者を置きたくない場合は、自分自身ではなくゼロ・アドレスを指定します。

```python
    # 要件を確認します
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

承認を設定するには、所有者であるか、所有者によって承認されたオペレーターである必要があります。

```python
    # 承認を設定します
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 第三者（「オペレーター」）が`msg.sender`のすべての資産を管理するための承認を有効または無効にします。
         また、ApprovalForAllイベントを発行します。
         `_operator`が`msg.sender`である場合はスローします。（注：これはEIPには書かれていません）
    @notice これは、送信者がその時点でトークンを所有していなくても機能します。
    @param _operator 承認されたオペレーターのセットに追加するアドレス。
    @param _approved オペレーターが承認されている場合はtrue、承認を取り消す場合はfalse。
    """
    # `_operator`が`msg.sender`である場合はスローします
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 新しいトークンのミントと既存のトークンの破棄 {#mint-burn}

コントラクトを作成したアカウントは`minter`であり、新しいNFTをミントする権限を持つスーパーユーザーです。しかし、そのアカウントでさえ既存のトークンをバーンすることは許可されていません。所有者、または所有者によって承認されたエンティティのみがそれを行うことができます。

```python
### ミントおよびバーン関数 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

操作が失敗した場合はリバートされるため、この関数は常に`True`を返します。

```python
    """
    @dev トークンをミントする関数
         `msg.sender`がミンターでない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が誰かに所有されている場合はスローします。
    @param _to ミントされたトークンを受信するアドレス。
    @param _tokenId ミントするトークンID。
    @return 操作が成功したかどうかを示すブール値。
    """
    # `msg.sender`がミンターでない場合はスローします
    assert msg.sender == self.minter
```

ミンター（ERC-721コントラクトを作成したアカウント）のみが新しいトークンをミントできます。将来、ミンターのアイデンティティを変更したい場合、これが問題になる可能性があります。本番環境のコントラクトでは、ミンターがミンター権限を他の誰かに譲渡できる関数が必要になるでしょう。

```python
    # `_to`がゼロ・アドレスの場合はスローします
    assert _to != ZERO_ADDRESS
    # NFTを追加します。`_tokenId`が誰かに所有されている場合はスローします
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

慣例として、新しいトークンのミンティングはゼロ・アドレスからの送金としてカウントされます。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 特定のERC-721トークンをバーンします。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認済み
         アドレスでない限りスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId バーンされるERC-721トークンのuint256 ID。
    """
    # 要件を確認します
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

トークンの送金を許可されている人は誰でも、それをバーンすることが許可されています。バーンはゼロ・アドレスへの送金と同等に見えますが、ゼロ・アドレスは実際にはトークンを受け取りません。これにより、トークンに使用されていたすべてのストレージを解放でき、トランザクションのガスコストを削減できます。

## このコントラクトの使用 {#using-contract}

Solidityとは対照的に、Vyperには継承がありません。これは、コードをより明確にし、結果として安全性を確保しやすくするための意図的な設計上の選択です。したがって、独自のVyper ERC-721コントラクトを作成するには、[このコントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を取得し、必要なビジネスロジックを実装するように変更します。

## まとめ {#conclusion}

復習として、このコントラクトにおける最も重要なアイデアのいくつかを以下に示します：

- 安全な送金でERC-721トークンを受け取るには、コントラクトは`ERC721Receiver`インターフェースを実装する必要があります。
- 安全な送金を使用しても、秘密鍵が不明なアドレスに送信すると、トークンがスタックする可能性があります。
- 操作に問題がある場合、単に失敗の値を返すのではなく、呼び出しを`revert`（リバート）することをお勧めします。
- ERC-721トークンは、所有者がいる場合に存在します。
- NFTの送金を承認されるには3つの方法があります。所有者であるか、特定のトークンに対して承認されているか、所有者のすべてのトークンのオペレーターであるかのいずれかです。
- 過去のイベントはブロックチェーンの外部でのみ表示されます。ブロックチェーン内で実行されているコードはそれらを表示できません。

さあ、安全なVyperコントラクトを実装しましょう。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。