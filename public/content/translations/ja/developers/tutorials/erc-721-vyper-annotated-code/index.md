---
title: "Vyper ERC-721コントラクトのウォークスルー"
description: "Ryuya Nakamura氏のERC-721コントラクトとその仕組み"
author: "オリ・ポメランツ"
lang: ja
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## はじめに {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/)標準は、非代替性トークン (NFT) の所有権を保持するために使用されます。
[ERC-20](/developers/docs/standards/tokens/erc-20/)トークンは、個々のトークン間に違いがないため、コモディティ（日用品や商品）のように振る舞います。
対照的に、ERC-721トークンは、異なる[猫のキャラクター](https://www.cryptokitties.co/)や異なる不動産の権利書など、類似しているが同一ではない資産のために設計されています。

この記事では、[Ryuya Nakamura氏のERC-721コントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を分析します。
このコントラクトは、Solidityよりも安全でないコードを書きにくくするように設計されたPython風のコントラクト言語である[Vyper](https://vyper.readthedocs.io/en/latest/index.html)で書かれています。

## コントラクト {#contract}

```python
#pragma version >0.3.10
```

`#pragma version` 行は、コントラクトがどのVyperバージョン向けに書かれているかをコンパイラに伝えます。`>0.3.10` は0.3.10より新しい任意のリリースを受け入れますが、このコントラクトは実際にはVyper 0.4.1以降を必要とします。キーワード引数を使用してイベントをログに記録する機能（たとえば `log IERC721.Transfer(...)`）はVyper 0.4.1で追加されたため、0.4.0ではコンパイルできません。

```python
# @dev ERC-721非代替性トークン (NFT)標準の実装。
# @author Ryuya Nakamura (@nrryuya)
# 変更元: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyperのコメントは、Pythonと同様にハッシュ（`#`）で始まり、行末まで続きます。`@<keyword>` を含むコメントは、人間が読めるドキュメントを生成するために[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)によって使用されます。

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

ERC-165およびERC-721インターフェースはVyperコンパイラに同梱されているため、自分で書くのではなく `ethereum.ercs` からインポートします。[ERC-721インターフェースの定義はこちらで確認できます](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi)。
`implements:` 行は、このコントラクトが両方のインターフェースを提供することを宣言しており、コンパイラはそれらが要求するすべての関数が以下で定義されているかチェックします。

### ERC721Receiverインターフェース {#receiver-interface}

```python
# safeTransferFrom()によって呼び出されるコントラクトのインターフェース
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721は2種類のトランスファーをサポートしています。

- `transferFrom`：送信者が任意の宛先アドレスを指定でき、トランスファーの責任を送信者に負わせます。これは、無効なアドレスにトランスファーできることを意味し、その場合NFTは永久に失われます。
- `safeTransferFrom`：宛先アドレスがコントラクトであるかチェックします。もしそうであれば、ERC-721コントラクトは受信側コントラクトにNFTを受け取りたいか尋ねます。

`safeTransferFrom` のリクエストに応答するには、受信側コントラクトは `ERC721Receiver` を実装する必要があります。

```python
            _operator: address,
            _from: address,
```

`_from` アドレスはトークンの現在の所有者です。`_operator` アドレスはトランスファーを要求したアドレスです（アローワンスがあるため、これら2つは同じではない場合があります）。慣例により、このコントラクトのほとんどの関数パラメータはアンダースコア（`_`）で始まります。

```python
            _tokenId: uint256,
```

ERC-721のトークンIDは256ビットです。通常、これらはトークンが表すものの説明をハッシュ化することによって作成されます。

```python
            _data: Bytes[1024]
```

リクエストには最大1024バイトのユーザーデータを含めることができます。

```python
        ) -> bytes4: nonpayable
```

コントラクトが誤ってトランスファーを受け入れるケースを防ぐため、戻り値はブール値ではなく、特定の4バイトの値、つまり `onERC721Received` の関数セレクタになります。受信側コントラクトがトークンを受け入れる際に自身の状態を変更する可能性があるため、この関数は `nonpayable` です。

### イベント {#events}

[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)は、ブロックチェーン外のユーザーやサーバーに出来事を知らせるために発行されます。イベントの内容はブロックチェーン上のコントラクトからは利用できないことに注意してください。3つのERC-721イベントはインポートした `IERC721` インターフェースで定義されているため、このコントラクト自体では宣言しません。以下のトランスファー関数で見るように、`log IERC721.<Event>(...)` を使用して発行します。

`Transfer`（`sender`、`receiver`、`token_id`）は、NFTの所有権の変更を報告します。これはERC-20のTransferイベントに似ていますが、金額の代わりに `token_id` を報告する点が異なります。誰もゼロ・アドレスを所有していないため、慣例としてトークンの作成と破棄を報告するために使用します。唯一の例外はコントラクトの作成時であり、その間は `Transfer` を発行することなく任意の数のNFTを作成して割り当てることができます。

ERC-721の承認（approval）はERC-20のアローワンスに似ています。特定のアドレスが特定のトークンをトランスファーすることを許可され、その承認されたアドレスが設定または再確認されるたびに `Approval`（`owner`、`approved`、`token_id`）が発行されます。これにより、コントラクトがトークンを受け入れたときに応答するメカニズムが提供されます。コントラクトはイベントをリッスンできないため、単にトークンをトランスファーしただけでは、コントラクトはそれを「知る」ことができません。この方法では、所有者が最初に承認を送信し、次にコントラクトに「トークンXをトランスファーすることを承認しました。〜してください」というリクエストを送信します。これは、ERC-721標準をERC-20標準に似せるための設計上の選択です。ERC-721トークンは代替不可能であるため、コントラクトはトークンの所有権を見ることで特定のトークンを取得したことを識別することもできます。

最後に、所有者に対して_オペレーター_が有効または無効にされたときに `ApprovalForAll`（`owner`、`operator`、`approved`）が発行されます。委任状のように、アカウントの特定のタイプ（特定のコントラクトによって管理されるもの）のすべてのトークンを管理できるオペレーターを持つことが便利な場合があります。たとえば、私が6ヶ月間連絡を取っていないかチェックし、そうであれば私の資産を相続人に分配するコントラクトにそのような権限を与えたいと思うかもしれません（相続人の一人がそれを要求した場合。コントラクトはトランザクションによって呼び出されない限り何もできません）。ERC-20では、相続コントラクトに高いアローワンスを与えるだけで済みますが、ERC-721ではトークンが代替不可能であるため、それは機能しません。これがその同等物です。`approved` の値は、イベントが承認のためのものか、承認の取り消しのためのものかを示します。

### 状態変数 {#state-vars}

これらの変数は、どのトークンが利用可能で誰が所有しているかという、トークンの現在の状態を含んでいます。これらのほとんどは `HashMap` オブジェクトであり、[2つの型間に存在する単方向のマッピング](https://vyper.readthedocs.io/en/latest/types.html#mappings)です。

```python
# @dev NFT IDからそれを所有するアドレスへのマッピング。
idToOwner: HashMap[uint256, address]

# @dev NFT IDから承認されたアドレスへのマッピング。
idToApprovals: HashMap[uint256, address]
```

イーサリアムにおけるユーザーとコントラクトのアイデンティティは、160ビットのアドレスで表されます。これら2つの変数は、トークンIDからその所有者およびトランスファーを承認された者（それぞれ最大1人）にマッピングします。イーサリアムでは、初期化されていないデータは常にゼロであるため、所有者や承認されたトランスファー実行者がいない場合、そのトークンの値はゼロになります。

```python
# @dev 所有者のアドレスからそのトークンの数へのマッピング。
ownerToNFTokenCount: HashMap[address, uint256]
```

この変数は、各所有者のトークン数を保持します。所有者からトークンへのマッピングはないため、特定の所有者が所有するトークンを特定する唯一の方法は、ブロックチェーンのイベント履歴を遡って適切な `Transfer` イベントを見ることです。この変数を使用することで、すべてのNFTを取得し終え、これ以上過去を遡る必要がないタイミングを知ることができます。

このアルゴリズムは、ユーザーインターフェースと外部サーバーでのみ機能することに注意してください。ブロックチェーン上で実行されているコード自体は、過去のイベントを読み取ることはできません。

```python
# @dev 所有者のアドレスからオペレーターのアドレスのマッピングへのマッピング。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

アカウントは複数のオペレーターを持つことができます。各キーが単一の値につながるため、単純な `HashMap` ではそれらを追跡するのに不十分です。代わりに、値として `HashMap[address, bool]` を使用できます。デフォルトでは各アドレスの値は `False` であり、これはオペレーターではないことを意味します。必要に応じて値を `True` に設定できます。

```python
# @dev トークンをミントできるミンターのアドレス
minter: address
```

新しいトークンは何らかの方法で作成される必要があります。このコントラクトでは、それを行うことが許可されている単一のエンティティ、`minter` が存在します。これは、たとえばゲームには十分でしょう。他の目的のためには、より複雑なビジネスロジックを作成する必要があるかもしれません。

```python
# @dev サポートされているERC-165インターフェースIDの静的リスト
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ERC-165のERC-165インターフェースID
    0x01ffc9a7,
    # ERC-721のERC-165インターフェースID
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)は、アプリケーションがコントラクトとどのように通信できるか、どのERCに準拠しているかを開示するメカニズムを指定しています。`SUPPORTED_INTERFACES` は、このコントラクトが準拠する2つの4バイトのインターフェースID（ERC-165自体とERC-721）の定数リストです。

### 関数 {#functions}

これらは実際にERC-721を実装する関数です。

#### コンストラクタ {#constructor}

```python
@deploy
def __init__():
```

Vyperでは、Pythonと同様にコンストラクタ関数は `__init__` と呼ばれます。これは `@deploy` デコレーションでマークされており、コントラクトがデプロイされたときに一度だけ実行されることを意味します。

```python
    """
    @dev コントラクトのコンストラクタ。
    """
```

PythonおよびVyperでは、複数行の文字列（`"""` で始まり終わる）を指定し、それを一切使用しないことでコメントを作成することもできます。これらのコメントには[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)を含めることもできます。

```python
    self.minter = msg.sender
```

状態変数にアクセスするには `self.<variable name>` を使用します（これもPythonと同じです）。コンストラクタは、コントラクトをデプロイしたアカウントを `minter` として記録します。

#### ビュー関数 {#views}

これらはブロックチェーンの状態を変更しない関数であり、外部から呼び出された場合は無料で実行できます。ビュー関数がコントラクトから呼び出された場合は、依然としてすべてのノードで実行される必要があるため、ガスを消費します。

```python
@view
@external
```

関数定義の前にあり、アットマーク（`@`）で始まるこれらのキーワードは_デコレーション_と呼ばれます。これらは関数を呼び出すことができる状況を指定します。

- `@view` は、この関数がビューであることを指定します。
- `@external` は、この特定の関数がトランザクションや他のコントラクトから呼び出せることを指定します。

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Pythonとは対照的に、Vyperは[静的型付け言語](https://wikipedia.org/wiki/Type_system#Static_type_checking)です。[データ型](https://vyper.readthedocs.io/en/latest/types.html)を特定せずに変数や関数パラメータを宣言することはできません。この場合、入力パラメータは4バイトの値である `bytes4` であり、出力はブール値です。

```python
    """
    @dev インターフェースの識別はERC-165で指定されています。
    @param interface_id インターフェースのID
    """
    return interface_id in SUPPORTED_INTERFACES
```

`interface_id` が `SUPPORTED_INTERFACES` リスト内のインターフェースIDのいずれかである場合は `True` を返します。

```python
### VIEW関数 ###
```

これらは、トークンに関する情報をユーザーや他のコントラクトが利用できるようにするビュー関数です。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`が所有するNFTの数を返します。
         `_owner`がゼロ・アドレスの場合はスローします。ゼロ・アドレスに割り当てられたNFTは無効と見なされます。
    @param _owner 残高を照会するアドレス。
    """
    assert _owner != empty(address)
```

この行は、`_owner` がゼロ・アドレス（`empty(address)` と記述される）ではないことを[アサート](https://vyper.readthedocs.io/en/latest/statements.html#assert)します。もしそうであれば、エラーとなり操作はリバートされます。

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
    assert owner != empty(address)
    return owner
```

イーサリアム仮想マシン (EVM) では、値が保存されていないストレージはすべてゼロになります。`_tokenId` にトークンがない場合、`self.idToOwner[_tokenId]` の値はゼロになります。その場合、関数はリバートします。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 単一のNFTの承認されたアドレスを取得します。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId 承認を照会するNFTのID。
    """
    # `_tokenId`が有効なNFTでない場合はスローします
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

`getApproved` はゼロを返す_可能性がある_ことに注意してください。トークンが有効な場合は `self.idToApprovals[_tokenId]` を返します。承認者がいない場合、その値はゼロになります。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`が`_owner`の承認されたオペレーターであるかを確認します。
    @param _owner NFTを所有するアドレス。
    @param _operator 所有者の代理として機能するアドレス。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

この関数は、`_operator` がこのコントラクト内の `_owner` のすべてのトークンを管理することを許可されているかチェックします。複数のオペレーターが存在する可能性があるため、これは2レベルのHashMapになっています。

#### トランスファーヘルパー関数 {#transfer-helpers}

これらの関数は、トークンのトランスファーや管理の一部となる操作を実装します。

```python

### 送金関数のヘルパー ###

@view
@internal
```

このデコレーション `@internal` は、関数が同じコントラクト内の他の関数からのみアクセス可能であることを意味します。慣例により、これらの関数名もアンダースコア（`_`）で始まります。

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

アドレスがトークンのトランスファーを許可されるには、3つの方法があります。

1. アドレスがトークンの所有者である
2. アドレスがそのトークンを使用することを承認されている
3. アドレスがトークン所有者のオペレーターである

上記の関数は状態を変更しないため、ビューにすることができます。運用コストを削減するために、ビューに_できる_関数はすべてビューに_すべき_です。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスにNFTを追加します
         `_tokenId`が誰かに所有されている場合はスローします。
    """
    # `_tokenId`が誰かに所有されている場合はスローします
    assert self.idToOwner[_tokenId] == empty(address)
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
    self.idToOwner[_tokenId] = empty(address)
    # カウントの追跡を変更します
    self.ownerToNFTokenCount[_from] -= 1
```

トランスファーに問題がある場合、呼び出しをリバートします。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 指定されたアドレスの承認をクリアします
         `_owner`が現在の所有者でない場合はスローします。
    """
    # `_owner`が現在の所有者でない場合はスローします
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # 承認をリセットします
        self.idToApprovals[_tokenId] = empty(address)
```

必要な場合のみ値を変更します。状態変数はストレージに存在します。ストレージへの書き込みは、EVM（イーサリアム仮想マシン）が行う最も高価な操作の1つです（[ガス](/developers/docs/gas/)の観点から）。したがって、それを最小限に抑えることは良い考えであり、既存の値を書き込むだけでも高いコストがかかります。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFTの送金を実行します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認された
         アドレスでない限りスローします。（注：プライベート関数では`msg.sender`が許可されていないため、`_sender`を渡します。）
         `_to`がゼロ・アドレスの場合はスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    """
```

トークンをトランスファーする方法は2つ（通常と安全）ありますが、監査を容易にするためにコード内でトランスファーを行う場所を1箇所だけにしたいので、この内部関数を用意しています。

```python
    # 要件を確認します
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to`がゼロ・アドレスの場合はスローします
    assert _to != empty(address)
    # 承認をクリアします。`_from`が現在の所有者でない場合はスローします
    self._clearApproval(_from, _tokenId)
    # NFTを削除します。`_tokenId`が有効なNFTでない場合はスローします
    self._removeTokenFrom(_from, _tokenId)
    # NFTを追加します
    self._addTokenTo(_to, _tokenId)
    # 送金をログに記録します
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Vyperでイベントを発行するには、`log` ステートメントを使用します（[詳細はこちらを参照](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。イベントはインポートされたインターフェースに属しているため、`IERC721.Transfer` として参照し、そのフィールドをキーワードで渡します。

#### トランスファー関数 {#transfer-funs}

```python

### 送金関数 ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認された
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

この関数を使用すると、任意のアドレスにトランスファーできます。アドレスがユーザーであるか、トークンのトランスファー方法を知っているコントラクトでない限り、トランスファーしたトークンはそのアドレスでスタックし、役に立たなくなります。

`IERC721` インターフェースが `transferFrom`、`safeTransferFrom`、および `approve` をpayableとして宣言しているため、ここに `@payable` デコレーションがあります。したがって、インターフェースを実装するコントラクトはそれらのシグネチャと一致する必要があります。

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev NFTの所有権をあるアドレスから別のアドレスへ送金します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの
         承認されたアドレスでない限りスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
         `_to`がスマートコントラクトの場合、`_to`で`onERC721Received`を呼び出し、
         戻り値が`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`でない場合はスローします。
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    @param _data 指定された形式のない追加データ。`_to`への呼び出しで送信されます。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

問題があればいずれにせよリバートし、呼び出しで行われたすべての処理がキャンセルされるため、最初にトランスファーを行っても問題ありません。

```python
    if _to.is_contract: # `_to`がコントラクトのアドレスであるかを確認します
```

まず、アドレスがコントラクトであるか（コードを持っているか）チェックします。そうでない場合は、ユーザーアドレスであり、ユーザーがトークンを使用またはトランスファーできると想定します。しかし、それで安心しきってはいけません。`safeTransferFrom` を使用した場合でも、誰も秘密鍵を知らないアドレスにトランスファーすると、トークンを失う可能性があります。

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ターゲットコントラクトを呼び出して、ERC-721トークンを受信できるか確認します。Vyper 0.4では他のコントラクトへの呼び出しをマークする必要があるため、呼び出しの前に `extcall` が付けられています。

```python
        # 送金先が'onERC721Received'を実装していないコントラクトの場合はスローします
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

宛先がコントラクトであっても、ERC-721トークンを受け入れない（またはこの特定のトランスファーを受け入れないと決定した）場合は、リバートします。

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev NFTの承認されたアドレスを設定または再確認します。ゼロ・アドレスは承認されたアドレスがないことを示します。
         `msg.sender`が現在のNFT所有者、または現在の所有者の承認されたオペレーターでない限りスローします。
         `_tokenId`が有効なNFTでない場合はスローします。（注：これはEIPには書かれていません）
         `_approved`が現在の所有者である場合はスローします。（注：これはEIPには書かれていません）
    @param _approved 指定されたNFT IDに対して承認されるアドレス。
    @param _tokenId 承認されるトークンのID。
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != empty(address)
    # `_approved`が現在の所有者である場合はスローします
    assert _approved != owner
```

慣例により、承認者を持たないようにしたい場合は、自分自身ではなくゼロ・アドレスを指定します。

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
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 第三者（「オペレーター」）が`msg.sender`のすべての資産を管理するための承認を有効または無効にします。
         また、ApprovalForAllイベントを発行します。
         `_operator`が`msg.sender`である場合はスローします。（注：これはEIPには書かれていません）
    @notice これは、送信者がその時点でトークンを所有していなくても機能します。
    @param _operator 承認されたオペレーターのセットに追加するアドレス。
    @param _approved オペレーターが承認されている場合はTrue、承認を取り消す場合はFalse。
    """
    # `_operator`が`msg.sender`である場合はスローします
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### 新しいトークンのミントと既存のトークンの破棄 {#mint-burn}

コントラクトを作成したアカウントは `minter` であり、新しいNFTをミントする権限を持つスーパーユーザーです。しかし、それでも既存のトークンをバーンすることは許可されていません。所有者、または所有者によって承認されたエンティティのみがそれを行うことができます。

```python
### ミントとバーン関数 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

操作が失敗した場合はリバートされるため、この関数は常に `True` を返します。

```python
    """
    @dev トークンをミントする関数
         `msg.sender`がミンターでない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が誰かに所有されている場合はスローします。
    @param _to ミントされたトークンを受け取るアドレス。
    @param _tokenId ミントするトークンID。
    @return 操作が成功したかどうかを示すブール値。
    """
    # `msg.sender`がミンターでない場合はスローします
    assert msg.sender == self.minter
```

ミンター（ERC-721コントラクトを作成したアカウント）のみが新しいトークンをミントできます。将来、ミンターのアイデンティティを変更したい場合、これが問題になる可能性があります。本番環境のコントラクトでは、おそらくミンターがミンター権限を他の誰かに譲渡できる関数が必要になるでしょう。

```python
    # `_to`がゼロ・アドレスの場合はスローします
    assert _to != empty(address)
    # NFTを追加します。`_tokenId`が誰かに所有されている場合はスローします
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

慣例により、新しいトークンのミンティングはゼロ・アドレスからのトランスファーとしてカウントされます。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 特定のERC-721トークンをバーンします。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認された
         アドレスでない限りスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @param _tokenId バーンされるERC-721トークンのuint256 ID。
    """
    # 要件を確認します
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`が有効なNFTでない場合はスローします
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

トークンのトランスファーを許可されている人は誰でも、それをバーンすることが許可されています。バーンはゼロ・アドレスへのトランスファーと同等に見えますが、ゼロ・アドレスは実際にはトークンを受け取りません。これにより、トークンに使用されていたすべてのストレージを解放でき、トランザクションのガスコストを削減できます。

## このコントラクトの使用 {#using-contract}

Solidityとは対照的に、Vyperには継承がありません。これは、コードをより明確にし、結果として安全性を確保しやすくするための意図的な設計上の選択です。したがって、独自のVyper ERC-721コントラクトを作成するには、[このコントラクト](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)を取得し、希望するビジネスロジックを実装するように変更します。

## おわりに {#conclusion}

復習として、このコントラクトにおける最も重要なアイデアのいくつかを以下に示します。

- 安全なトランスファーでERC-721トークンを受け取るには、コントラクトは `ERC721Receiver` インターフェースを実装する必要があります。
- 安全なトランスファーを使用した場合でも、秘密鍵が不明なアドレスに送信すると、トークンがスタックする可能性があります。
- 操作に問題がある場合は、単に失敗の値を返すのではなく、呼び出しを `revert` することをお勧めします。
- ERC-721トークンは、所有者がいる場合に存在します。
- NFTのトランスファーを承認されるには3つの方法があります。所有者であるか、特定のトークンに対して承認されているか、所有者のすべてのトークンのオペレーターであるかのいずれかです。
- 過去のイベントはブロックチェーンの外部でのみ表示されます。ブロックチェーン内で実行されているコードはそれらを表示できません。

さあ、安全なVyperコントラクトを実装しに行きましょう。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。
