---
title: "Vyper ERC-721コントラクトの解説"
description: "Ryuya NakamuraのERC-721コントラクトとその仕組み"
author: "オリ・ポメランツ"
lang: ja
tags: ["Vyper", "erc-721", "Python"]
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

Vyperのコメントは、Pythonと同様にハッシュ（`ethereum.ercs`）で始まり、行末まで続きます。`@<keyword>`を含むコメントは、人間が読めるドキュメントを生成するために[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)によって使用されます。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721インターフェースはVyper言語に組み込まれています。
[コードの定義はこちらで確認できます](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
インターフェースはブロックチェーン内だけでなく、Pythonで書かれている可能性のある外部クライアントからブロックチェーンにトランザクションを送信する際にも使用されるため、インターフェース定義はVyperではなくPythonで書かれています。

最初の行はインターフェースをインポートし、2行目はここでそれを実装することを指定しています。

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### ERC721Receiverインターフェース

```python
# safeTransferFrom()によって呼び出されるコントラクトのインターフェース
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721は2種類の送金をサポートしています。

- `transferFrom`は、送信者が任意の宛先アドレスを指定でき、送金の責任を送信者に負わせます。これは、無効なアドレスに送金できることを意味し、その場合NFTは永久に失われます。
- `safeTransferFrom`は、宛先アドレスがコントラクトであるかどうかを確認します。コントラクトである場合、ERC-721コントラクトは受信側コントラクトにNFTを受け取るかどうかを尋ねます。

`safeTransferFrom`のリクエストに応答するには、受信側コントラクトは`ERC721Receiver`を実装する必要があります。

```python
            _operator: address,
            _from: address,
```

`_from`アドレスは、トークンの現在の所有者です。`_operator`アドレスは、送金をリクエストしたアドレスです（アローワンスがあるため、これら2つは同じではない場合があります）。慣例として、このコントラクトのほとんどの関数パラメータはアンダースコア（`_`）で始まります。

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

コントラクトが誤って送金を受け入れるケースを防ぐため、戻り値はブール値ではなく、特定の4バイトの値、つまり`onERC721Received`の関数セレクタになります。受信側コントラクトがトークンを受け入れる際に自身の状態を変更する可能性があるため、この関数は`nonpayable`です。
### イベント

[イベント](/developers/docs/smart-contracts/anatomy/#events-and-logs)は、ブロックチェーンの外部にいるユーザーやサーバーにイベントを知らせるために発行されます。イベントの内容は、ブロックチェーン上のコントラクトからは利用できないことに注意してください。3つのERC-721イベントはインポートした`IERC721`インターフェースで定義されているため、このコントラクト自体では宣言しません。以下の送金関数で見るように、`log IERC721.<Event>(...)`を使用して発行します。

`Transfer`（`sender`、`receiver`、`token_id`）は、NFTの所有権の変更を報告します。これはERC-20のTransferイベントに似ていますが、金額の代わりに`token_id`を報告する点が異なります。ゼロ・アドレスを所有する人はいないため、慣例としてトークンの作成と破棄を報告するために使用します。1つの例外はコントラクトの作成時であり、この間は`Transfer`を発行することなく任意の数のNFTを作成して割り当てることができます。

ERC-721の承認（approval）はERC-20のアローワンスに似ています。特定のアドレスが特定のトークンを送金することが許可され、その承認されたアドレスが設定または再確認されるたびに`Approval`（`owner`、`approved`、`token_id`）が発行されます。これにより、コントラクトがトークンを受け入れたときに応答するメカニズムが提供されます。コントラクトはイベントをリッスンできないため、単にトークンを送金しただけでは、コントラクトはそれを「知る」ことができません。この方法では、所有者が最初に承認を送信し、次にコントラクトに「トークンXの送金を承認したので、...してください」というリクエストを送信します。これは、ERC-721標準をERC-20標準に似せるための設計上の選択です。ERC-721トークンは非代替性であるため、コントラクトはトークンの所有権を確認することで、特定のトークンを取得したことを識別することもできます。

最後に、所有者に対して_オペレーター_が有効または無効になったときに`ApprovalForAll`（`owner`、`operator`、`approved`）が発行されます。委任状のように、アカウントの特定のタイプ（特定のコントラクトによって管理されるもの）のすべてのトークンを管理できるオペレーターを持つことが便利な場合があります。たとえば、私が6か月間連絡を取っていないかどうかを確認し、そうであれば私の資産を相続人に分配するコントラクトにそのような権限を与えたいと思うかもしれません（相続人の1人がそれを要求した場合。コントラクトはトランザクションによって呼び出されない限り何もできません）。ERC-20では、相続コントラクトに高いアローワンスを与えるだけで済みますが、トークンが非代替性であるため、ERC-721では機能しません。これがその同等物です。`approved`の値は、イベントが承認のためのものか、承認の取り消しのためのものかを示します。
### 状態変数

これらの変数は、どのトークンが利用可能で誰が所有しているかという、トークンの現在の状態を保持します。これらのほとんどは`HashMap`オブジェクトであり、[2つの型間に存在する単方向のマッピング](https://vyper.readthedocs.io/en/latest/types.html#mappings)です。

```python
# @dev NFT IDからそれを所有するアドレスへのマッピング。
idToOwner: HashMap[uint256, address]

# @dev NFT IDから承認されたアドレスへのマッピング。
idToApprovals: HashMap[uint256, address]
```

イーサリアムにおけるユーザーとコントラクトのアイデンティティは、160ビットのアドレスで表されます。これら2つの変数は、トークンIDからその所有者および送金を承認された者（それぞれ最大1つ）にマッピングします。イーサリアムでは、初期化されていないデータは常にゼロであるため、所有者や承認された送金者がいない場合、そのトークンの値はゼロになります。

```python
# @dev 所有者のアドレスからそのトークン数へのマッピング。
ownerToNFTokenCount: HashMap[address, uint256]
```

この変数は、各所有者のトークン数を保持します。所有者からトークンへのマッピングはないため、特定の所有者が所有するトークンを識別する唯一の方法は、ブロックチェーンのイベント履歴をさかのぼって適切な`Transfer`イベントを確認することです。この変数を使用することで、すべてのNFTを取得したタイミングを知ることができ、それ以上過去をさかのぼる必要がなくなります。

このアルゴリズムは、ユーザーインターフェースと外部サーバーでのみ機能することに注意してください。ブロックチェーン自体で実行されているコードは、過去のイベントを読み取ることができません。

```python
# @dev 所有者のアドレスからオペレーターのアドレスのマッピングへのマッピング。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

アカウントは複数のオペレーターを持つ場合があります。各キーが単一の値につながるため、単純な`HashMap`ではそれらを追跡するのに不十分です。代わりに、値として`HashMap[address, bool]`を使用できます。デフォルトでは、各アドレスの値は`False`であり、これはオペレーターではないことを意味します。必要に応じて値を`True`に設定できます。

```python
# @dev トークンをミントできるミンターのアドレス
minter: address
```

新しいトークンは何らかの方法で作成される必要があります。このコントラクトでは、それを行うことが許可されている単一のエンティティ、つまり`minter`が存在します。たとえば、ゲームの場合はこれで十分でしょう。他の目的では、より複雑なビジネスロジックを作成する必要があるかもしれません。

```python
# @dev サポートされているERC165インターフェースIDの静的リスト
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ERC165のERC165インターフェースID
    0x01ffc9a7,
    # ERC721のERC165インターフェースID
    0x80ac58cd,
]
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)は、コントラクトがどのERCに準拠しているか、アプリケーションがどのように通信できるかを開示するためのメカニズムを指定しています。`SUPPORTED_INTERFACES`は、このコントラクトが準拠する2つの4バイトのインターフェースID（ERC-165自体とERC-721）の定数リストです。
### 関数 {#functions}

これらは実際にERC-721を実装する関数です。

#### コンストラクタ

```python
@deploy
def __init__():
```

Pythonと同様に、Vyperではコンストラクタ関数は`__init__`と呼ばれます。これには`@deploy`デコレータが付けられており、コントラクトがデプロイされたときに1回だけ実行されることを意味します。

```python
    """
    @dev コントラクトのコンストラクタ。
    """
```

PythonやVyperでは、複数行の文字列（`"""`で始まり終わる）を指定し、それを何にも使用しないことでコメントを作成することもできます。これらのコメントには[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)を含めることもできます。

```python
    self.minter = msg.sender
```

状態変数にアクセスするには、`self.<変数名>`を使用します（これもPythonと同じです）。コンストラクタは、コントラクトをデプロイしたアカウントを`minter`として記録します。
#### ビュー関数

これらはブロックチェーンの状態を変更しない関数であるため、外部から呼び出された場合は無料で実行できます。ビュー関数がコントラクトによって呼び出された場合、依然としてすべてのノードで実行される必要があるため、ガスがかかります。

```python
@view
@external
```

関数定義の前にあるアットマーク（`@`）で始まるこれらのキーワードは、_デコレータ_と呼ばれます。これらは、関数を呼び出すことができる状況を指定します。

- `@view`は、この関数がビューであることを指定します。
- `@external`は、この特定の関数がトランザクションや他のコントラクトから呼び出せることを指定します。

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Pythonとは対照的に、Vyperは[静的型付け言語](https://wikipedia.org/wiki/Type_system#Static_type_checking)です。[データ型](https://vyper.readthedocs.io/en/latest/types.html)を特定せずに変数や関数パラメータを宣言することはできません。この場合、入力パラメータは4バイトの値である`bytes4`であり、出力はブール値です。

```python
    """
    @dev インターフェースの識別はERC-165で指定されています。
    @param interface_id インターフェースのID
    """
    return interface_id in SUPPORTED_INTERFACES
```

`interface_id`が`SUPPORTED_INTERFACES`リスト内のインターフェースIDのいずれかである場合は、`True`を返します。

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
         `_owner`がゼロ・アドレスの場合はスローします。ゼロ・アドレスに割り当てられたNFTは無効と見なされます。
    @param _owner 残高を照会するアドレス。
    """
    assert _owner != empty(address)
```

この行は、`_owner`がゼロ・アドレス（`empty(address)`と記述）ではないことを[アサート](https://vyper.readthedocs.io/en/latest/statements.html#assert)します。ゼロ・アドレスである場合、エラーが発生し、操作はリバートされます。

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

イーサリアム仮想マシン（EVM）では、値が保存されていないストレージはすべてゼロになります。`_tokenId`にトークンがない場合、`self.idToOwner[_tokenId]`の値はゼロになります。その場合、関数はリバートされます。

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

`getApproved`はゼロを返す_可能性がある_ことに注意してください。トークンが有効な場合、`self.idToApprovals[_tokenId]`を返します。承認者がいない場合、その値はゼロになります。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`が`_owner`の承認されたオペレーターであるかどうかを確認します。
    @param _owner NFTを所有するアドレス。
    @param _operator 所有者に代わって行動するアドレス。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

この関数は、`_operator`がこのコントラクト内の`_owner`のすべてのトークンを管理することが許可されているかどうかを確認します。複数のオペレーターが存在する可能性があるため、これは2レベルのHashMapになっています。
#### 送金ヘルパー関数

これらの関数は、トークンの送金や管理の一部となる操作を実装します。

```python

### 送金関数ヘルパー ###

@view
@internal
```

この`@internal`デコレータは、関数が同じコントラクト内の他の関数からのみアクセス可能であることを意味します。慣例として、これらの関数名もアンダースコア（`_`）で始まります。

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

アドレスがトークンの送金を許可されるには、次の3つの方法があります。

1. アドレスがトークンの所有者である
2. アドレスがそのトークンを使用することを承認されている
3. アドレスがトークンの所有者のオペレーターである

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
    if self.idToApprovals[_tokenId] != empty(address):
        # 承認をリセットします
        self.idToApprovals[_tokenId] = empty(address)
```

必要な場合にのみ値を変更します。状態変数はストレージに存在します。ストレージへの書き込みは、EVM（イーサリアム仮想マシン）が行う最も高価な操作の1つです（[ガス](/developers/docs/gas/)の観点から）。したがって、それを最小限に抑えることは良い考えであり、既存の値を書き込むだけでも高いコストがかかります。

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

Vyperでイベントを発行するには、`log`ステートメントを使用します（[詳細はこちらを参照してください](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。イベントはインポートされたインターフェースに属しているため、`IERC721.Transfer`として参照し、キーワードでフィールドを渡します。
#### 送金関数

```python

### 送金関数 ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの承認済み
         アドレスでない限りスローします。
         `_from`が現在の所有者でない場合はスローします。
         `_to`がゼロ・アドレスの場合はスローします。
         `_tokenId`が有効なNFTでない場合はスローします。
    @notice 呼び出し元は、`_to`がNFTを受信できることを確認する責任があります。そうでない場合、
            NFTは永久に失われる可能性があります。
    @param _from NFTの現在の所有者。
    @param _to 新しい所有者。
    @param _tokenId 送金するNFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

この関数を使用すると、任意のアドレスに送金できます。アドレスがユーザーであるか、トークンの送金方法を知っているコントラクトでない限り、送金したトークンはそのアドレスでスタックし、役に立たなくなります。

`IERC721`インターフェースは`transferFrom`、`safeTransferFrom`、および`approve`をpayableとして宣言しているため、インターフェースを実装するコントラクトはそれらのシグネチャと一致させる必要があり、ここに`@payable`デコレータがあります。

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
    @dev NFTの所有権をあるアドレスから別のアドレスに送金します。
         `msg.sender`が現在の所有者、承認されたオペレーター、またはこのNFTの
         承認済みアドレスでない限りスローします。
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

問題がある場合はいずれにせよリバートされ、呼び出しで行われたすべての処理がキャンセルされるため、最初に送金を行っても問題ありません。

```python
    if _to.is_contract: # `_to`がコントラクトアドレスかどうかを確認します
```

まず、アドレスがコントラクトであるか（コードを持っているか）どうかを確認します。そうでない場合は、ユーザーアドレスであると想定し、ユーザーはトークンを使用または送金できると考えます。しかし、誤った安心感に陥らないでください。誰も秘密鍵を知らないアドレスに送金した場合、`safeTransferFrom`を使用してもトークンを失う可能性があります。

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ターゲットコントラクトを呼び出して、ERC-721トークンを受信できるかどうかを確認します。Vyper 0.4では他のコントラクトへの呼び出しをマークする必要があるため、呼び出しには`extcall`というプレフィックスが付けられます。

```python
        # 送金先が'onERC721Received'を実装していないコントラクトの場合はスローします
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

宛先がコントラクトであっても、ERC-721トークンを受け入れない（またはこの特定の送金を受け入れないと決定した）場合は、リバートします。

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

慣例として、承認者を持ちたくない場合は、自分自身ではなくゼロ・アドレスを指定します。

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
    @dev サードパーティ（「オペレーター」）が`msg.sender`のすべての資産を管理するための
         承認を有効または無効にします。また、ApprovalForAllイベントを発行します。
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
