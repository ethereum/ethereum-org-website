---
title: "マークル・パトリシア・ツリー"
description: "マークル・パトリシア・ツリー入門"
lang: ja
sidebarDepth: 2
---

イーサリアムの状態 (あらゆるアカウント、残高、スマートコントラクトの全体) は、コンピューターサイエンスでマークルツリーとして一般的に知られている特殊なバージョンのデータ構造にエンコードされます。 この構造は、ツリー内のすべての個々のデータ間に検証可能な関係を構築し、そのデータに関する事柄を証明するために使用できる単一の**ルート**値が結果として得られるため、多くの暗号技術アプリケーションで有用です。

イーサリアムのデータ構造は「修正版マークル・パトリシア・トライ」です。これは、PATRICIA (The Practical Algorithm To Retrieve Information Coded in Alphanumeric) のいくつかの機能を借用し、イーサリアムの状態を構成するアイテムを効率的にデータ取得(re**trie**val)できるよう設計されていることから、そのように名付けられました。

マークル・パトリシア・トライは決定的かつ暗号学的に検証可能です。状態ルートを生成する唯一の方法は、状態の個々の部分から計算することであり、2つの状態が同一であることは、ルートハッシュとそれに至るハッシュ(_マークルプルーフ_)を比較することで容易に証明できます。 反対に、同じルートハッシュで2つの異なる状態を生成することはあり得ません。また、異なる値で状態を変更しようとすると、異なる状態のルートハッシュになります。 理論上、この構造は挿入、検索、削除において`O(log(n))`という効率性の「聖杯」を提供します。

近い将来、イーサリアムは[バークルツリー](/roadmap/verkle-trees)構造に移行する計画です。これにより、将来のプロトコル改善に向けた多くの新たな可能性が開かれるでしょう。

## 前提条件{#prerequisites}

このページをよりよく理解するためには、[ハッシュ](https://en.wikipedia.org/wiki/Hash_function)、[マークルツリー](https://en.wikipedia.org/wiki/Merkle_tree)、[トライ](https://en.wikipedia.org/wiki/Trie)、[シリアライゼーション](https://en.wikipedia.org/wiki/Serialization)に関する基本的な知識があると役立ちます。 この記事では、まず基本的な[基数ツリー](https://en.wikipedia.org/wiki/Radix_tree)について説明し、次にイーサリアムのより最適化されたデータ構造に必要な変更点を段階的に紹介します。

## 基本的な基数トライ {#basic-radix-tries}

基本的な基数ツリーでは、すべてのノードは次のようになります。

```
    [i_0, i_1 ... i_n, value]
```

ここで`i_0 ...` `i_n` はアルファベット(通常はバイナリまたは16進数)の記号を表し、`value` はノードの終端値で、`i_0, i_1 ...` の中の値は `i_n`スロットは、`NULL`か、他のノードへのポインタ(この場合はハッシュ)です。 これにより、基本的な`(key, value)`ストアが形成されます。

キーバリューセットに対する順序を永続化するために、基数ツリーのデータ構造を使用するとします。 トライ内でキー`dog`に現在マップされている値を見つけるには、まず`dog`をアルファベット文字に変換し(`64 6f 67`が得られる)、次に値が見つかるまでそのパスをたどってトライを下降します。 つまり、ツリーのルートノードを見つけるために、フラットなキーバリューDBのルートハッシュを調べることから始めます。 これは、他のノードを指すキーの配列として表現されます。 インデックス`6`の値をキーとして使い、フラットなkey/value DBでそれを検索して、1レベル下のノードを取得します。 次にインデックス`4`を選んで次の値を検索し、次にインデックス`6`、というように続けます。パス`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`をたどったら、ノードの値を参照して結果を返します。

「ツリー」で何かを検索することと、下層のフラットなキーバリュー型「データベース」で検索することには、違いがあります。 どちらもキーバリューの配列を定義しますが、下層のデータベースは従来の1ステップのキー検索が実行できます。 ツリーでキーを検索するには、複数のデータベースを検索して上記の最終値を得る必要があります。 曖昧さをなくすために、後者を`path`と呼ぶことにします。

基数ツリーの更新操作と削除操作は、次のように定義できます。

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

「マークル」基数ツリーは、決定論的に生成された暗号ハッシュダイジェストを使用してノードをリンクすることによって構築されます。 このコンテンツアドレッシング(key/value DBにおいて`key == keccak256(rlp(value))`)は、保存されているデータの暗号学的な完全性を保証します。 特定のツリーのルートハッシュが公に知られている場合、特定の値をツリールートに結合する各ノードのハッシュ値を提供することで、ツリーの内部にあるリーフデータにアクセスして、特定のパスに特定の値が存在していることを証明できます。

ルートハッシュは最終的にその下にあるすべてのハッシュに基づいているため、攻撃者が存在しない`(path, value)`ペアの証明を提供することは不可能です。 下層の変更はルートハッシュを変更します。 ハッシュについては、データの構造情報を圧縮して表現し、ハッシュ関数の事前イメージによって保護されていると考えることができます。

基数ツリーの原子単位(例: 1つの16進文字、または4ビットの2進数)を「ニブル」と呼ぶことにします。 上記のように、一度に1ニブルずつパスをたどる場合、ノードは最大16個の子を参照できますが、`value`要素も含むことができます。 そのため、ノードは長さ17の配列として表されます。 これらの17要素配列を「ブランチノード」と呼びます。

## マークル・パトリシア・トライ {#merkle-patricia-trees}

基数ツリーには、1つの大きな制限があります。それは、非効率的であることです。 イーサリアムのようにパスが64文字長(`bytes32`のニブル数)である1つの`(path, value)`バインディングを保存したい場合、文字ごとに1レベルを保存するために1キロバイト以上の余分なスペースが必要になり、各検索または削除には64ステップすべてを要します。 次に紹介するパトリシア・ツリーは、この問題を解決します。

### 最適化 {#optimization}

マークル・パトリシア・ツリーのノードは、以下のいずれかです。

1. `NULL` (空文字列として表現)
2. `branch` 17項目のノード `[ v0 ...` `v15, vt ]`
3. `leaf` 2項目のノード `[ encodedPath, value ]`
4. `extension` 2項目のノード `[ encodedPath, key ]`

64文字のパスでは、ツリーの最初のいくつかのレイヤーを横断した後、少なくとも下方の一部に分岐パスが存在しないノードに到達することは避けらません。 パスに沿って最大15個のスパースな`NULL`ノードを作成しなくて済むように、`[ encodedPath, key ]`形式の`extension`ノードを設定して、下降をショートカットします。ここで、`encodedPath`はスキップする「部分パス」(後述のコンパクトエンコーディングを使用)を含み、`key`は次のDB検索のためのものです。

`encodedPath`の最初のニブルにあるフラグでマークできる`leaf`ノードの場合、パスは先行するすべてのノードのパスフラグメントをエンコードしており、`value`を直接検索できます。

しかし、上記の最適化は、次の問題があります。

パスをニブル単位でたどる際、たどるべきニブルの数が奇数になることがありますが、すべてのデータは`bytes`形式で保存されるため、 例えば、ニブル`1`とニブル`01`を区別することができません(両方とも`<01>`として保存されなければならないため)。 奇数の長さを指定するには、部分パスの前にフラグをつけます。

### 仕様: オプショナルターミネーター付き16進数シーケンスのコンパクトエンコーディング {#specification}

上述した_残りの部分パス長が奇数か偶数か_と、_リーフノードか拡張ノードか_の両方を示すフラグは、任意の2項目ノードの部分パスの最初のニブルに格納されます。 結果は、次の通りになります。

| 16進数文字 | ビット  | ノードタイプ部分 | パス長 |
| ------ | ---- | -------- | --- |
| 0      | 0000 | 拡張子      | 偶数  |
| 1      | 0001 | 拡張子      | 奇数  |
| 2      | 0010 | 終端 （リーフ） | 偶数  |
| 3      | 0011 | 終端 （リーフ） | 奇数  |

残りのパス長が偶数(`0`または`2`)の場合、常に別の`0`の「パディング」ニブルが続きます。

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarrayは、最初のニブルがフラグである偶数の長さを持ちます。
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

例：

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

以下は、パトリシア・マークル・ツリーでノードを取得する拡張コードです。

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### トライの例 {#example-trie}

`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`という4つのパス/値のペアを含むトライが必要だとします。

まず、パスと値の両方を`bytes`に変換します。 以下では、_パス_の実際のバイト表現は<>で示しますが、_値_は理解しやすいように''で示される文字列として表示されています(これらも実際には`bytes`になります):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

それでは、下層のデータベースで、次のようなキーバリューのペアを持つこのようなツリーを構築します。

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

あるノードが別のノード内で参照される場合、含まれるのは`len(rlp.encode(node)) >= 32`であれば`keccak256(rlp.encode(node))`、そうでなければ`node`です。ここで`rlp.encode`は[RLP](/developers/docs/data-structures-and-encoding/rlp)エンコーディング関数です。

トライを更新する際、新しく作成されたノードの長さが32以上である_場合_、キー/値のペア`(keccak256(x), x)`を永続的なルックアップテーブルに格納する必要があることに注意してください。 ただし、ノードがそれよりも短い場合、関数 function f(x) = x は可逆であるため、何も格納する必要はありません。

## イーサリアムにおけるトライ {#tries-in-ethereum}

イーサリアムの実行レイヤーのすべてのマークルツリーは、マークル・パトリシア・ツリーを使用しています。

ブロックヘッダーに、これらのツリーの3つから、3つのルートがあります。

1. stateRoot (ステートルート)
2. transactionsRoot (トランザクションルート)
3. receiptsRoot (レシートルート)

### 状態トライ {#state-trie}

グローバルの状態ツリーが1つあり、クライアントがブロックを処理するたびに更新されます。 ここでは、`path`は常に`keccak256(ethereumAddress)`であり、`value`は常に`rlp(ethereumAccount)`です。 具体的には、イーサリアムの`account`は`[nonce,balance,storageRoot,codeHash]`の4項目からなる配列です。 この時点で、この`storageRoot`が別のパトリシア・トライのルートであることは注目に値します。

### ストレージ・トライ {#storage-trie}

ストレージ・トライは、_すべて_のコントラクトデータが格納される場所です。 アカウントごとに個別のストレージツリーがあります。 与えられたアドレスにある、特定のストレージポジションの値を取得するには、ストレージアドレスであるストレージに格納されたデータの整数のポジションと、ブロックIDが必要です。 これらは、JSON-RPC APIで定義されている`eth_getStorageAt`に引数として渡すことができます。例えば、アドレス`0x295a70b2de5e3953354a6a8344e616ed314d7251`のストレージスロット0のデータを取得するには、次のようにします。

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

ストレージの他の要素を取得するのは、ストレージツリーのポジションを最初に計算する必要があるため、より複雑になります。 この位置は、アドレスとストレージの位置の`keccak256`ハッシュとして計算され、両方とも長さが32バイトになるようにゼロで左詰めされます。 例えば、アドレス`0x391694e7e0b0cce554cb130d723a9d27458f9298`のストレージスロット1のデータの位置は次のようになります。

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Gethコンソールでは、これは次のように計算できます。

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

したがって、`path`は`keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`となります。 これを使用して、前と同様にストレージツリーからデータを取得できます。

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注: イーサリアムアカウントの`storageRoot`は、それがコントラクトアカウントでない場合、デフォルトで空になります。

### トランザクション・トライ {#transaction-trie}

ブロックごとに個別のトランザクション・トライがあり、これも`(key, value)`ペアを格納します。 ここでのパスは`rlp(transactionIndex)`で、これは次によって決定される値に対応するキーを表します。

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

これに関する詳細は、[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントに記載されています。

### レシート・トライ {#receipts-trie}

すべてのブロックは、それぞれのレシートツリーを持っています。 ここでの`path`は`rlp(transactionIndex)`です。 `transactionIndex`は、それが含まれていたブロック内でのインデックスです。 レシートツリーは更新されることはありません。 トランザクションと同様に、現在のレシートとレガシーのレシートがあります。 レシートツリーで特定のレシートをクエリーするには、ブロックのトランザクションのインデックス、レシートのペイロード、トランザクションタイプが必要となります。 返されるレシートは、`TransactionType`と`ReceiptPayload`を連結したものとして定義される`Receipt`型、または`rlp([status, cumulativeGasUsed, logsBloom, logs])`として定義される`LegacyReceipt`型のいずれかになります。

これに関する詳細は、[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントに記載されています。

## 参考リンク{#further-reading}

- [修正版マークル・パトリシア・トライ — イーサリアムはどのように状態を保存するか](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [イーサリアムにおけるマークル化](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [イーサリアム・トライを理解する](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
