---
title: "イーサリアム仮想マシン(EVM)"
description: "イーサリアム仮想マシンと状態、トランザクション、およびスマートコントラクトの関係性の説明"
lang: ja
---

イーサリアム仮想マシン(EVM)は、分散型の仮想環境でイーサリアムノードのすべてにわたり一貫して安全にコードを実行します。 ノードはEVMを実行してスマートコントラクトを実行し、「[ガス](/developers/docs/gas/)」を使用して[オペレーション](/developers/docs/evm/opcodes/)に必要な計算量を測定することで、効率的なリソース割り当てとネットワークセキュリティを確保します。

## 前提条件 {#prerequisites}

EVMを理解するためには、[バイト](https://wikipedia.org/wiki/Byte)、[メモリ](https://wikipedia.org/wiki/Computer_memory)、[スタック](https://wikipedia.org/wiki/Stack_\(abstract_data_type\))といった、コンピューターサイエンスの一般的な用語に関する基本的な知識が必要です。 また、[ハッシュ関数](https://wikipedia.org/wiki/Cryptographic_hash_function)や[マークルツリー](https://wikipedia.org/wiki/Merkle_tree)のような暗号技術やブロックチェーンの概念を理解していると役立ちます。

## 台帳から状態マシンへ {#from-ledger-to-state-machine}

「分散台帳」の例えは、ビットコインのようなブロックチェーンを説明する際によく使用され、暗号技術の基本的なツールを使用して分散型通貨を可能にするものです。 台帳はアクティビティの記録を維持し、アクティビティは台帳を変更する上で、誰かができること・できないことを定める一連の規則に従います。 例えば、あるビットコインアドレスで、以前に受け取ったビットコインよりも多くのビットコインを使用できません。 このルールは、ビットコインをはじめとする多くのブロックチェーンのすべてのトランザクションを支えるものです。

イーサリアムには、ほぼ同じ直感的なルールに従う独自のネイティブ暗号通貨（イーサ）がありますが、さらに強力な機能である[スマートコントラクト](/developers/docs/smart-contracts/)も可能にしています。 この機能は複雑なため、説明にはより詳しい例が必要になります。 イーサリアムは分散台帳ではなく、分散[状態マシン](https://wikipedia.org/wiki/Finite-state_machine)です。 イーサリアムの状態は、すべてのアカウントと残高だけでなく、_マシン状態_も保持する巨大なデータ構造であり、事前に定義された一連のルールに従ってブロックからブロックへと変化し、任意のマシンコードを実行できます。 ブロックごとの状態変化の具体的なルールは、EVMによって定義されています。

![EVMの構成を示す図](./evm.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)より引用した図_

## イーサリアムの状態遷移関数 {#the-ethereum-state-transition-function}

EVMは数学の関数のように動作し、入力に対して決定論的な出力が得られます。 したがって、イーサリアムを**状態遷移関数**を持つものとして、より正式に記述すると非常に分かりやすくなります。

```
Y(S, T)= S'
```

古い有効な状態`(S)`と新しい有効なトランザクションのセット`(T)`が与えられると、イーサリアムの状態遷移関数`Y(S, T)`は新しい有効な出力状態`S'`を生成します。

### 状態 {#state}

イーサリアムの文脈において、状態とは[修正マークルパトリシアツリー](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)と呼ばれる巨大なデータ構造であり、ハッシュによってリンクされたすべての[アカウント](/developers/docs/accounts/)を保持し、ブロックチェーンに格納された単一のルートハッシュに還元することができます。

### トランザクション {#transactions}

イーサリアムにおける「トランザクション」とは、アカウントから暗号的に署名された一連の指示です。 トランザクションには、メッセージの呼び出しが発生するものと、コントラクトの作成が発生するものの2種類があります。

コントラクトを作成すると、コンパイル済みの[スマートコントラクト](/developers/docs/smart-contracts/anatomy/)・バイトコードを含む新しいコントラクトアカウントが作成されます。 他のアカウントがスマートコントラクトへメッセージの呼び出しを行うたびに、そのバイトコードが実行されます。

## EVMの命令 {#evm-instructions}

EVMは、深さ1024アイテムの[スタックマシン](https://wikipedia.org/wiki/Stack_machine)として実行されます。 各項目は256ビットの単語で、これは256ビットの暗号(Keccak-256ハッシュやsecp256k1シグネチャなど)を使いやすいように選択されています。

実行中、EVMは一時的な_メモリ_（ワードアドレス指定バイト配列として）を維持しますが、トランザクションをまたいで永続化されることはありません。

### 一時ストレージ

一時ストレージは、`TSTORE`および`TLOAD`オペコードを介してアクセスされる、トランザクションごとのキー・バリューストアです。 同一トランザクション中のすべての内部コールにわたって永続しますが、トランザクションの終了時にクリアされます。 メモリとは異なり、一時ストレージは実行フレームではなくEVM状態の一部としてモデル化されていますが、グローバル状態にはコミットされません。 一時ストレージは、トランザクション中の内部コール間でのガス効率の良い一時的な状態共有を可能にします。

### ストレージ

コントラクトには、問題のアカウントに関連付けられ、グローバル状態の一部であるマークルパトリシア_ストレージ_ツリー（ワードアドレス指定のワード配列として）が含まれています。 この永続ストレージは、単一のトランザクションの期間中のみ利用可能で、アカウントの永続ストレージツリーの一部を形成しない一時ストレージとは異なります。

### オペコード

コンパイルされたスマートコントラクトのバイトコードは、`XOR`、`AND`、`ADD`、`SUB`などの標準的なスタック操作を実行する多数のEVM[オペコード](/developers/docs/evm/opcodes)として実行されます。 またEVMは、`ADDRESS`、`BALANCE`、`BLOCKHASH`など、ブロックチェーンに固有のスタック操作も多数実装しています。 オペコードセットには、一時ストレージへのアクセスを提供する`TSTORE`と`TLOAD`も含まれます。

![EVMのオペレーションでガスが必要となる箇所を示す図](../gas/gas.png)
_[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)より引用した図_

## EVMの実装 {#evm-implementations}

EVMのすべての実装は、イーサリアムイエローペーパーに記載されている仕様を遵守する必要があります。

イーサリアムの10年の歴史の中で、EVMは数度の改訂を経ており、様々なプログラミング言語によるEVMの実装が複数存在します。

[イーサリアム実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)には、EVMの実装が含まれています。 また、次のようなスタンドアローンの実装も複数あります。

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 参考リンク {#further-reading}

- [イーサリアム・イエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper(別名 KEVM): KにおけるEVMのセマンティクス](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [イーサリアム仮想マシンオペコード](https://www.ethervm.io/)
- [イーサリアム仮想マシンオペコード・インタラクティブリファレンス](https://www.evm.codes/)
- [Solidityドキュメント内の簡単な紹介](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [マスタリング・イーサリアム - イーサリアム仮想マシン](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## 関連トピック {#related-topics}

- [ガス](/developers/docs/gas/)
