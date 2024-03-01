---
title: マークル・パトリシア・ツリー
description: マークル・パトリシア・ツリー入門
lang: ja
sidebarDepth: 2
---

マークル・パトリシア・ツリー(Patricia Merkle Trie)は、暗号的に認証されたデータ構造を提供し、すべての `(key, value)`バインディングを保存するために使用できます。

マークル・パトリシア・ツリーは完全に決定的です。つまり、同じ `(key, value)` バインディングを持つツリーは、最後のバイトまで必ず同一です。 それらが同じルートハッシュを持ち、挿入、検索、削除において`O(log(n))`という優れた効率を発揮します。 さらに、レッド・ブラック・ツリーのような比較に基づく複雑な代替案よりも、理解やコーディングが簡単です。

## 前提知識 {#prerequisites}

このページを理解するには、[ハッシュ](https://en.wikipedia.org/wiki/Hash_function)、[マークル ツリー](https://en.wikipedia.org/wiki/Merkle_tree)、[ツリー](https://en.wikipedia.org/wiki/Trie)、[シリアライゼーション](https://en.wikipedia.org/wiki/Serialization)に関する基本的な知識が必要です。

## 基本的な基数ツリー {#basic-radix-tries}

基本的な基数ツリーでは、すべてのノードは次のようになります。

```
    [i_0, i_1 ... i_n, value]
```

`i_0 ... i_n`は、アルファベットの記号列(通常は 2 進数または 16 進数)を表し、`value`はノードの最終値、スロット `i_0, i_1 ... i_n`の値は、`NULL`または他のノードへのポインタ(イーサリアムの場合はハッシュ値)です。 これにより、基本的な`(key, value)`型ストアが形成されます。

キーバリューセットに対する順序を永続化するために、基数ツリーのデータ構造を使用するとします。 ツリーで現在`dog`に対応する値を知るには、最初に`dog`のアルファベットの文字を変換します(`64 6f 67`)。次に、値が見つかるまで 64 6f 67 のパスをたどってツリーを下ります。 つまり、ツリーのルートノードを見つけるために、フラットなキーバリュー DB のルートハッシュを調べることから始めます。 これは、他のノードを指すキーの配列として表現されます。 インデックス`6`の値をキーとして使用し、フラットなキーバリュー DB で検索し、ノードを 1 レベル下げます。 次にインデックス`4`を選択して次の値を検索し、次にインデックス`6`を選択します。 `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`のパスをたどり、ノードの値を参照して結果を返します。

「ツリー」で何かを検索することと、下層のフラットなキーバリュー型「データベース」で検索することには、違いがあります。 どちらもキーバリューの配列を定義しますが、下層のデータベースは従来の 1 ステップのキー検索が実行できます。 ツリーでキーを検索するには、複数のデータベースを検索して上記の最終値を得る必要があります。 あいまいさをなくすために、後者を`path`としましょう。

基数ツリーの更新操作と削除操作は、次のように定義できます。

```
    def update(node,path,value):
        if path == '':
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
            newnode[-1] = value
        else:
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

「マークル」基数ツリーは、決定論的に生成された暗号ハッシュダイジェストを使用してノードをリンクすることによって構築されます。 このコンテンツアドレッシング(キーバリュー DB で `key == keccak256(rlp(value))`)は、格納されたデータの暗号認証を提供します。 特定のツリーのルートハッシュが公に知られている場合、特定の値をツリールートに結合する各ノードのハッシュ値を提供することにより、特定のパスに特定の値がツリーに含まれていることを証明できます。

攻撃者は、存在しない `(path, value)` のペアの証明を提供することは不可能です。これはルートハッシュは、結局のところその下のにあるすべてのハッシュ値に基づいているためです。 下層の変更はルートハッシュを変更します。

基数ツリーの最小単位 (1 つの 16 進数文字、すなわち 4 ビットの 2 進数) を「ニブル」と呼びます。 上記のように一度に 1 つのニブルでパスを横断している間、ノードは最大で 16 の子を参照することができますが`value`要素を含んでいます。 このため、それらを長さのある配列として表します。 これらの 17 要素配列を「ブランチノード」と呼びます。

## マークル・パトリシア・ツリー {#merkle-patricia-trees}

基数ツリーには、1 つの大きな制限があります。それは、非効率的であることです。 イーサリアムのようにパスが 64 文字長 (`bytes32`単位のニブル数)の 1 つの`(path, value)`のバインディングを格納する場合、1 文字を格納する 1 レベルに、1 キロバイト以上のスペースが必要となり、また、それぞれの検索または削除には、64 ステップが必要です。 次に紹介するパトリシア・ツリーは、この問題を解決します。

### 最適化 {#optimization}

マークル・パトリシア・ツリーのノードは、以下のいずれかです。

1.  `NULL` (空文字列を表す)
2.  `branch` 17 アイテムのノード `[ v0 ... v15, vt ]`
3.  `leaf` 2 アイテムのノード `[ encodedPath, value ]`
4.  `extension` 2 アイテムのノード `[ encodedPath, key ]`

64 文字のパスでは、ツリーの最初のいくつかのレイヤーを横断した後、少なくとも下方の一部に分岐パスが存在しないノードに到達することは避けらません。 パスに沿って最大 15 の`NULL`のスパースノードを作成する必要性を回避するために、`[ encodedPath, key ]`フォームの`extension`ノードを設定することで下りへショートカットをします。この`encodedPath`は、次へスキップするための「部分パス」を含みます(後述のコンパクトエンコーディングを使用)。そして、`key` は、次の DB ルックアップ用です。

`leaf`ノードは、`encodedPath`の最初のニブルのフラグでマークできます。パスは、前のノードのすべてのパスのフラグメントをエンコードし、`value`を直接調べることができます。

しかし、上記の最適化は、次の問題があります。

パスをニブルで横断する場合、すべてのデータが`bytes`形式で格納されているため、ニブルの数が奇数になる場合があります。 例えば、ニブル`1`とニブル`01`を区別することはできません(両方とも`<01>`として格納される必要があります)。 奇数の長さを指定するには、部分パスの前にフラグをつけます。

### 仕様: オプショナルターミネーターを使用した 16 進数シーケンスのコンパクトエンコーディング {#specification}

上記の*残りの部分パス長が偶数または奇数*かと、*リーフまたは拡張ノード*かを表すフラグは両方、あらゆる「2 アイテムのノード」の部分パスの最初のニブルにあります。 結果は、次の通りになります。

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

偶数の残りのパス長 (`0`または`2`)の場合 、もう一つの`0`の「パディング」のニブルが常に続きます。

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray now has an even length whose first nibble is the flags.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

例：

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

以下は、パトリシア・マークル・ツリーでノードを取得する拡張コードです。

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### ツリーの例 {#example-trie}

次の 4 つのパスバリューのペアを含むツリーが必要だとします。 `('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coin')`、`('horse', 'stallion')`

まず、パスと値(バリュー)の両方を`bytes`に変換します。 以下では、*paths*を実際のバイト表現 `<>`によって表示しています。しかし、 *values*は、分かりやすいように文字列として`''`で表示しています(実際は`bytes`) 。

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coin'
    <68 6f 72 73 65> : 'stallion'
```

それでは、下層のデータベースで、次のようなキーバリューのペアを持つこのようなツリーを構築します。

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashD ]
    hashD:    [ <>, <>, <>, <>, <>, <>, hashE, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashE:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coin' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

1 つのノードが内部の別のノードから参照されるとき、含まれているのは、`H(rlp.encode(x))`であり、`H(x) = keccak256(x) if len(x) >= 32 else x`と`rlp.encode`は、[RLP](/developers/docs/data-structures-and-encoding/rlp)エンコーディング関数です。

ツリーを更新するとき、新しく作成されたノードの長さが 32 以上の*場合*、キーバリューのペア`(keccak256(x), x)`を永続的なルックアップテーブルに格納する必要があることに注意してください。 ただし、ノードがそれよりも短い場合、関数 function f(x) = x は可逆であるため、何も格納する必要はありません。

## イーサリアムのツリー {#tries-in-ethereum}

イーサリアムの実行レイヤーのすべてのマークルツリーは、マークル・パトリシア・ツリーを使用しています。

ブロックヘッダーに、これらのツリーの 3 つから、3 つのルートがあります。

1.  stateRoot (ステートルート)
2.  transactionsRoot (トランザクションルート)
3.  receiptsRoot (レシートルート)

### ステート(状態)ツリー {#state-trie}

グローバルの状態ツリーが 1 つあり、クライアントがブロックを処理するたびに更新されます。 その中では、 `path`は常に`keccak256(ethereumAddress)`であり、`value`は常に`rlp(ethereumAccount)`です。 より具体的には、イーサリアムの`account`は、4 つのアイテムの配列`[nonce,balance,storageRoot,codeHash]`です。 この点において、この`storageRoot`が、もう一つのパトリシア・ツリーであることは非常に重要です。

### ストレージツリー {#storage-trie}

ストレージツリーは、 *すべて*のコントラクトデータが存在する場所です。 アカウントごとに個別のストレージツリーがあります。 与えられたアドレスにある、特定のストレージポジションの値を取得するには、ストレージアドレスであるストレージに格納されたデータの整数のポジションと、ブロック ID が必要です。 これらは、JSON-RPC API で定義されている`eth_getStorageAt`に引数として渡すことができます。アドレス`0x295a70b2de5e3953354a6a8344e616ed314d7251`ストレージスロット 0 のデータを取得する例は、次のようになります。

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

ストレージの他の要素を取得するのは、ストレージツリーのポジションを最初に計算する必要があるため、より複雑になります。 ポジションは、アドレスとストレージポジションの`keccak256`ハッシュとして計算され、両方とも長さ 32 バイト長になるように左からゼロが足されます。 例えば、アドレス `0x391694e7e0b0cce554cb130d723a9d27458f9298`のストレージスロット 1 のデータの位置は、次のようになります。

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Geth コンソールでは、これは次のように計算できます。

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

よって、`path`は`keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`となります。 これを使用して、前と同様にストレージツリーからデータを取得できます。

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### トランザクションツリー {#transaction-trie}

ブロックごとに個別のトランザクションツリーがあり、ここでも`(key, value)`ペアが格納されます。 パスは、ここでは`rlp(transactionIndex)`で、以下によって決定される値に対応するキーを表します。

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

詳細については、[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントを参照してください。

### レシートツリー {#receipts-trie}

すべてのブロックは、それぞれのレシートツリーを持っています。 ここでの`path`は、`rlp(transactionIndex)`です。 `transactionIndex`は、マイニングされたブロックのインデックスです。 レシートツリーは更新されることはありません。 トランザクションと同様に、現在のレシートとレガシーのレシートがあります。 レシートツリーで特定のレシートをクエリーするには、ブロックのトランザクションのインデックス、レシートのペイロード、トランザクションタイプが必要となります。 返されるレシートは、`transaction type`と`transaction payload`の集まったものとして定義される`Receipt`タイプまたは、`rlp([status, cumulativeGasUsed, logsBloom, logs])`として定義される`LegacyReceipt`タイプとなります。

詳細については、[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)のドキュメントを参照してください。

## 参考文献 {#further-reading}

- [変更されたマークル・パトリシア・ツリー — イーサリアムにおける状態の保存方法](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [イーサリアムのマークリング](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [イーサリアムツリーの理解](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
