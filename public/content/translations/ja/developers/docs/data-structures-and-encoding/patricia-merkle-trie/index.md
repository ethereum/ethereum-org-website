---
title: マークル・パトリシア・トライ
description: マークル・パトリシア・トライの紹介。
lang: ja
sidebarDepth: 2
---

[イーサリアム](/)の状態（すべてのアカウント、残高、スマートコントラクトの総体）は、コンピューターサイエンスにおいて一般的にマークル・ツリーとして知られるデータ構造の特別なバージョンにエンコードされます。この構造は、ツリーに組み込まれたすべての個別のデータ間に検証可能な関係を作り出し、データに関する証明に使用できる単一の**ルート**値を生成するため、暗号技術における多くのアプリケーションで役立ちます。

イーサリアムのデータ構造は「変更されたマークル・パトリシア・トライ」です。この名前は、PATRICIA（Practical Algorithm To Retrieve Information Coded in Alphanumeric）のいくつかの機能を借用していること、そしてイーサリアムの状態を構成するアイテムの効率的なデータ検索（re**trie**val）のために設計されていることに由来します。

マークル・パトリシア・トライは決定的であり、暗号技術的に検証可能です。状態ルートを生成する唯一の方法は、状態の個々の部分から計算することです。また、同一の2つの状態は、ルートハッシュとそこに至るハッシュ（*マークル証明*）を比較することで簡単に証明できます。逆に、同じルートハッシュを持つ2つの異なる状態を作成する方法はなく、異なる値で状態を変更しようとすると、異なる状態ルートハッシュが生成されます。理論的には、この構造は挿入、検索、削除において`O(log(n))`の効率性という「聖杯」を提供します。

近い将来、イーサリアムは[バークル・ツリー](/roadmap/verkle-trees)構造に移行する予定であり、これにより将来のプロトコル改善に向けた多くの新たな可能性が開かれます。

## 前提知識 {#prerequisites}

このページをよりよく理解するためには、[ハッシュ](https://en.wikipedia.org/wiki/Hash_function)、[マークル・ツリー](https://en.wikipedia.org/wiki/Merkle_tree)、[トライ](https://en.wikipedia.org/wiki/Trie)、および[シリアライゼーション](https://en.wikipedia.org/wiki/Serialization)に関する基本的な知識があると役立ちます。この記事では、まず基本的な[基数ツリー（radix tree）](https://en.wikipedia.org/wiki/Radix_tree)について説明し、その後、イーサリアムのより最適化されたデータ構造に必要な変更を徐々に紹介します。

## 基本的な基数トライ {#basic-radix-tries}

基本的な基数トライでは、すべてのノードは次のようになります。

```
[i_0, i_1 ... i_n, value]
```

ここで、`i_0 ... i_n`はアルファベットの記号（通常はバイナリまたは16進数）を表し、`value`はノードの終端値です。また、`i_0, i_1 ... i_n`スロットの値は`NULL`であるか、他のノードへのポインタ（この場合はハッシュ）です。これにより、基本的な`(key, value)`ストアが形成されます。

鍵/値のペアのセットに対する順序を永続化するために、基数ツリーのデータ構造を使用したいとします。トライ内で現在鍵`dog`にマッピングされている値を見つけるには、まず`dog`をアルファベットの文字に変換し（`64 6f 67`になります）、値が見つかるまでそのパスに従ってトライを下っていきます。つまり、フラットな鍵/値DBでルートハッシュを検索し、トライのルートノードを見つけることから始めます。これは、他のノードを指す鍵の配列として表されます。インデックス`6`の値を鍵として使用し、フラットな鍵/値DBで検索して、1つ下のレベルのノードを取得します。次にインデックス`4`を選んで次の値を検索し、次にインデックス`6`を選ぶというように進め、パス`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`をたどった後、ノードの値を検索して結果を返します。

「トライ」で何かを検索することと、基盤となるフラットな鍵/値「DB」で検索することには違いがあります。どちらも鍵/値の配置を定義しますが、基盤となるDBは従来の1ステップでの鍵の検索が可能です。トライで鍵を検索するには、上記で説明した最終的な値に到達するために、基盤となるDBでの複数回の検索が必要になります。曖昧さをなくすため、後者を`path`と呼ぶことにします。

基数トライの更新および削除操作は、次のように定義できます。

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

「マークル」基数ツリーは、決定論的に生成された暗号ハッシュダイジェストを使用してノードをリンクすることによって構築されます。このコンテンツアドレッシング（鍵/値DBの`key == keccak256(rlp(value))`）は、保存されたデータの暗号技術的な整合性を保証します。特定のトライのルートハッシュが公に知られている場合、基盤となるリーフデータにアクセスできる人なら誰でも、特定の値とツリールートを結ぶ各ノードのハッシュを提供することで、トライが特定のパスに特定の値を含んでいるという証明を構築できます。

ルートハッシュは最終的にそれ以下のすべてのハッシュに基づいているため、攻撃者が存在しない`(path, value)`ペアの証明を提供することは不可能です。基盤となるデータを少しでも変更すれば、ルートハッシュが変わってしまいます。ハッシュは、ハッシュ関数の原像計算困難性（pre-image protection）によって保護された、データに関する構造情報の圧縮表現と考えることができます。

基数ツリーの最小単位（例：1つの16進文字、または4ビットのバイナリ数）を「ニブル（nibble）」と呼びます。上記のようにパスを1ニブルずつたどる際、ノードは最大16個の子を参照できますが、`value`要素も含まれます。したがって、これらを長さ17の配列として表現します。この17要素の配列を「ブランチノード（branch nodes）」と呼びます。

## マークル・パトリシア・トライ {#merkle-patricia-trees}

基数トライには1つの大きな制限があります。それは非効率であるということです。イーサリアムのようにパスが64文字（`bytes32`のニブル数）の長さである場合、1つの`(path, value)`バインディングを保存するには、文字ごとに1つのレベルを保存するために1キロバイト以上の余分なスペースが必要になり、各検索や削除には完全に64ステップかかります。以下で紹介するパトリシア・トライは、この問題を解決します。

### 最適化 {#optimization}

マークル・パトリシア・トライのノードは、次のいずれかです。

1.  `NULL`（空の文字列として表現）
2.  `branch` 17項目のノード `[ v0 ... v15, vt ]`
3.  `leaf` 2項目のノード `[ encodedPath, value ]`
4.  `extension` 2項目のノード `[ encodedPath, key ]`

64文字のパスでは、トライの最初の数層をたどった後、少なくとも途中までは分岐するパスが存在しないノードに到達することが避けられません。パスに沿って最大15個のまばらな`NULL`ノードを作成するのを避けるため、`[ encodedPath, key ]`の形式の`extension`ノードを設定して降下をショートカットします。ここで、`encodedPath`にはスキップする「部分パス」（後述のコンパクトエンコーディングを使用）が含まれ、`key`は次のDB検索用です。

`encodedPath`の最初のニブルのフラグでマークできる`leaf`ノードの場合、パスは以前のすべてのノードのパスフラグメントをエンコードしており、`value`を直接検索できます。

しかし、上記の最適化は曖昧さをもたらします。

ニブル単位でパスをたどる際、たどるべきニブルが奇数個になることがありますが、すべてのデータは`bytes`形式で保存されます。たとえば、ニブル`1`とニブル`01`を区別することはできません（どちらも`<01>`として保存する必要があります）。奇数の長さを指定するために、部分パスにはフラグがプレフィックスとして付けられます。

### 仕様：オプションのターミネーターを持つ16進数シーケンスのコンパクトエンコーディング {#specification}

上記で説明した「残りの部分パスの長さが奇数か偶数か」および「リーフノードかエクステンションノードか」のフラグは、任意の2項目ノードの部分パスの最初のニブルに存在します。その結果、次のようになります。

| 16進文字 | ビット | ノードタイプ（部分） | パス長 |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | エクステンション   | 偶数        |
| 1        | 0001 | エクステンション   | 奇数        |
| 2        | 0010 | 終端（リーフ）     | 偶数        |
| 3        | 0011 | 終端（リーフ）     | 奇数        |

残りのパス長が偶数の場合（`0`または`2`）、常に別の`0`「パディング」ニブルが続きます。

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
        # これでhexarrayは偶数の長さになり、最初のニブルがフラグになります。
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

マークル・パトリシア・トライでノードを取得するための拡張コードは次のとおりです。

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

4つのパス/値のペア`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`を含むトライが必要だとします。

まず、パスと値の両方を`bytes`に変換します。以下では、理解しやすくするために、*パス*の実際のバイト表現は`<>`で示されていますが、*値*は依然として文字列として`''`で示されています（これらも実際には`bytes`になります）。

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

次に、基盤となるDBに以下の鍵/値のペアを持つトライを構築します。

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

あるノードが別のノード内で参照される場合、含まれるのは`len(rlp.encode(node)) >= 32`であれば`keccak256(rlp.encode(node))`、そうでなければ`node`です。ここで、`rlp.encode`は[RLP](/developers/docs/data-structures-and-encoding/rlp)エンコーディング関数です。

トライを更新する際、新しく作成されたノードの長さが32以上である*場合*、鍵/値のペア`(keccak256(x), x)`を永続的なルックアップテーブルに保存する必要があることに注意してください。ただし、ノードがそれより短い場合は、関数f(x) = xが可逆であるため、何も保存する必要はありません。

## イーサリアムにおけるトライ {#tries-in-ethereum}

イーサリアムの実行レイヤーにあるすべてのマークル・トライは、マークル・パトリシア・トライを使用しています。

ブロック・ヘッダーには、これらのトライのうち3つからの3つのルートがあります。

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### ステート・トライ {#state-trie}

グローバルなステート・トライは1つあり、クライアントがブロックを処理するたびに更新されます。その中で、`path`は常に`keccak256(ethereumAddress)`であり、`value`は常に`rlp(ethereumAccount)`です。より具体的には、イーサリアムの`account`は`[nonce,balance,storageRoot,codeHash]`の4項目の配列です。この時点で、この`storageRoot`が別のパトリシア・トライのルートであることに注目する価値があります。

### ストレージ・トライ {#storage-trie}

ストレージ・トライは、*すべての*コントラクトデータが存在する場所です。アカウントごとに個別のストレージ・トライがあります。特定のアドレスの特定のストレージ位置にある値を取得するには、ストレージアドレス、ストレージ内の保存データの整数位置、およびブロックIDが必要です。これらは、JSON-RPC APIで定義されている`eth_getStorageAt`の引数として渡すことができます。たとえば、アドレス`0x295a70b2de5e3953354a6a8344e616ed314d7251`のストレージスロット0のデータを取得するには、次のようにします。

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

ストレージ内の他の要素を取得するのは、まずストレージ・トライ内の位置を計算する必要があるため、少し複雑になります。位置は、アドレスとストレージ位置の`keccak256`ハッシュとして計算され、どちらも長さが32バイトになるように左側にゼロがパディングされます。たとえば、アドレス`0x391694e7e0b0cce554cb130d723a9d27458f9298`のストレージスロット1のデータの位置は次のようになります。

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

ゴー・イーサリアム（ゲス）のコンソールでは、これは次のように計算できます。

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

したがって、`path`は`keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`になります。これを以前と同様に使用して、ストレージ・トライからデータを取得できます。

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注：イーサリアムアカウントの`storageRoot`は、コントラクト・アカウントでない場合、デフォルトで空になります。

### トランザクション・トライ {#transaction-trie}

ブロックごとに個別のトランザクション・トライがあり、ここでも`(key, value)`のペアが保存されます。ここでのパスは`rlp(transactionIndex)`であり、次によって決定される値に対応する鍵を表します。

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

これに関する詳細情報は、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントに記載されています。

### レシート・トライ {#receipts-trie}

すべてのブロックには独自のレシート・トライがあります。ここでの`path`は`rlp(transactionIndex)`です。`transactionIndex`は、それが含まれたブロック内のインデックスです。レシート・トライが更新されることはありません。トランザクション・トライと同様に、現在のレシートとレガシーなレシートがあります。レシート・トライ内の特定のレシートをクエリするには、ブロック内のトランザクションのインデックス、レシートのペイロード、およびトランザクションタイプが必要です。返されるレシートは、`TransactionType`と`ReceiptPayload`の連結として定義される`Receipt`タイプであるか、`rlp([status, cumulativeGasUsed, logsBloom, logs])`として定義される`LegacyReceipt`タイプになります。

これに関する詳細情報は、[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントに記載されています。

## 参考文献 {#further-reading}

- [変更されたマークル・パトリシア・トライ — イーサリアムが状態を保存する方法](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [イーサリアムにおけるマークリング](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [イーサリアムのトライを理解する](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)