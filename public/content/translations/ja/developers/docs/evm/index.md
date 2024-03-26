---
title: イーサリアム仮想マシン(EVM)
description: イーサリアム仮想マシンと状態、トランザクション、およびスマートコントラクトの関係性の説明
lang: ja
---

イーサリアム仮想マシン(EVM)の物理的に例示することは、雲や海の波を指し示すようにはできませんが、イーサリアムクライアントを実行する数千の接続されたコンピュータによって維持される 1 つのエンティティとして*存在*します。

イーサリアムのプロトコル自体、この特別な状態マシンの継続的、無中断かつ変更不可能である動作を維持することが唯一の目的です。 すべてのイーサリアムアカウントとスマートコントラクトが存続する環境です。 チェーン内のすべてブロックにおいて、イーサリアムは単一の「正規」の状態のみを持ち、EVM はブロックごとに新たな有効状態を計算するためのルールを定義します。

## 前提知識 {#prerequisites}

EVM を理解するためには、[バイト](https://wikipedia.org/wiki/Byte)、[メモリ](https://wikipedia.org/wiki/Computer_memory)、[スタック](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>)など、コンピュータサイエンスの一般的な用語に関する基本知識が必要です。 また、暗号学やブロックチェーンの概念である[ハッシュ関数](https://wikipedia.org/wiki/Cryptographic_hash_function)、[マークルツリー](https://wikipedia.org/wiki/Merkle_tree)などを知っていると理解の手助けになります。

## 台帳から状態マシンへ {#from-ledger-to-state-machine}

「分散台帳」の例えは、ビットコインのようなブロックチェーンを説明する際によく使用され、暗号技術の基本的なツールを使用して分散型通貨を可能にするものです。 台帳はアクティビティの記録を維持し、アクティビティは台帳を変更する上で、誰かができること・できないことを定める一連の規則に従います。 例えば、あるビットコインアドレスで、以前に受け取ったビットコインよりも多くのビットコインを使用できません。 このルールは、ビットコインをはじめとする多くのブロックチェーンのすべてのトランザクションを支えるものです。

イーサリアムには、ほぼ同様の直観的なルールに従うイーサリアムのネイティブ暗号通貨(イーサ)に加えて、[スマートコントラクト](/developers/docs/smart-contracts/)というさらに強力な機能があります。 この機能は複雑なため、説明にはより詳しい例が必要になります。 イーサリアムは分散台帳ではなく、分散型の[状態マシン](https://wikipedia.org/wiki/Finite-state_machine)です。 イーサリアムの状態とは、全アカウントとその残高を保持するだけでなく、予め定義されたルールに従ってブロックごとに変化し、任意のマシンコードを実行できる*マシンの状態*を保持する、巨大なデータ構造です。 ブロックごとの状態変化の具体的なルールは、EVM によって定義されています。

![EVMの構成図](./evm.png) _ [イーサリアム EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

## イーサリアムの状態遷移関数 {#the-ethereum-state-transition-function}

EVM は数学の関数のように動作し、入力に対して決定論的な出力が得られます。 そのため、イーサリアムを**状態遷移関数**を持つと正式に表現することもできます。

```
Y(S, T)= S'
```

古い有効な状態 `(S)`と新しい有効なトランザクションのセット`(T)` により、イーサリアムの状態遷移関数`Y(S, T)`は新しい有効な出力状態 `S'` を生成します。

### 状態 {#state}

イーサリアムにおける「状態」とは、[修正マークルパトリシアツリー](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)と呼ばれる巨大なデータ構造であり、ハッシュでリンクされたすべての[アカウント](/developers/docs/accounts/)を保持し、ブロックチェーンに保存されている単一のルートハッシュにまとめることができます。

### トランザクション {#transactions}

イーサリアムにおける「トランザクション」とは、アカウントから暗号的に署名された一連の指示です。 トランザクションには、メッセージの呼び出しが発生するものと、コントラクトの作成が発生するものの 2 種類があります。

スマートコントラクトを作成すると、コンパイルされた[スマートコントラクト](/developers/docs/smart-contracts/anatomy/)バイトコードを含む、新規コントラクトアカウントが作られます。 他のアカウントがスマートコントラクトへメッセージの呼び出しを行うたびに、そのバイトコードが実行されます。

## EVM 指示 {#evm-instructions}

EVM は 1024 項目を含む[スタックマシン](https://wikipedia.org/wiki/Stack_machine)として実行されます。 各項目は 256 ビットの単語で、これは 256 ビットの暗号(Keccak-256 ハッシュや secp256k1 シグネチャなど)を使いやすいように選択されています。

実行中、EVM は一時的な*メモリ*(ワードアドレスによるバイト配列として)を持ちますが、これはトランザクション間には継続されません。

しかし、スマートコントラクトにはマークルパトリシア*ストレージ*のツリーが(ワードアドレス可能なワードアレイとして)含まれており、当該アカウントに関連付けられ、グローバルな状態の一部となっています。

コンパイルされたスマートコントラクトのバイトコードは、`XOR`、`AND`、 `ADD`、 `SUB`のような標準的なスタック操作を行う多数の EVM[オペコード](/developers/docs/evm/opcodes)として実行されます。 また、EVM は`ADDRESS`、`BALANCE`、`BLOCKHASH`など、ブロックチェーン固有のスタック操作を多数実装しています。

![EVMを実行にガスが必要な箇所を示す図](../gas/gas.png) _ [イーサリアム EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

## EVM の実装 {#evm-implementations}

EVM のすべての実装は、イーサリアムイエローペーパーに記載されている仕様を遵守する必要があります。

イーサリアムが誕生してから 9 年間にわたって、EVM は数多くの改訂を受け、様々なプログラミング言語で実装されてきました。

[イーサリアム実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)には EVM の実装が含まれています。 また、次のようなスタンドアローンの実装も複数あります。

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [eEVM](https://github.com/microsoft/eevm) - _C++_

## 参考文献 {#further-reading}

- [イーサリアムイエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper(別名: KEVM): K における EVM のセマンティクス](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [イーサリアム仮想マシンのオペコード](https://www.ethervm.io/)
- [イーサリアム仮想マシンオペコードのインタラクティブリファレンス](https://www.evm.codes/)
- [Solidity ドキュメントの簡単な紹介](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)

## 関連トピック {#related-topics}

- [ガス](/developers/docs/gas/)
