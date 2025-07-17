---
title: イーサリアム仮想マシン(EVM)
description: イーサリアム仮想マシンと状態、トランザクション、およびスマートコントラクトの関係性の説明
lang: ja
---

イーサリアム仮想マシン(EVM)は、分散型の仮想環境でイーサリアムノードのすべてにわたり一貫して安全にコードを実行します。 ノードでは、スマートコントラクトを実行するためにEVMが動作しており、「[ガス](/gas/)」を使用して[演算](/developers/docs/evm/opcodes/)に必要な計算量を測定します。これにより、効率的なリソースの割り当てとネットワークのセキュリティを確保しています。

## 前提知識 {#prerequisites}

EVMを理解するためには、[バイト](https://wikipedia.org/wiki/Byte)、[メモリ](https://wikipedia.org/wiki/Computer_memory)、[スタック](https://wikipedia.org/wiki/Stack_(abstract_data_type))など、コンピュータサイエンスの一般的な用語に関する基本知識が必要です。 また、暗号学やブロックチェーンの概念である[ハッシュ関数](https://wikipedia.org/wiki/Cryptographic_hash_function)、[マークルツリー](https://wikipedia.org/wiki/Merkle_tree)などを知っていると理解の手助けになります。

## 台帳から状態マシンへ {#from-ledger-to-state-machine}

「分散台帳」の例えは、ビットコインのようなブロックチェーンを説明する際によく使用され、暗号技術の基本的なツールを使用して分散型通貨を可能にするものです。 台帳はアクティビティの記録を維持し、アクティビティは台帳を変更する上で、誰かができること・できないことを定める一連の規則に従います。 例えば、あるビットコインアドレスで、以前に受け取ったビットコインよりも多くのビットコインを使用できません。 このルールは、ビットコインをはじめとする多くのブロックチェーンのすべてのトランザクションを支えるものです。

イーサリアムには、ほぼ同様の直観的なルールに従うイーサリアムのネイティブ暗号通貨(イーサ)に加えて、[スマートコントラクト](/developers/docs/smart-contracts/)というさらに強力な機能があります。 この機能は複雑なため、説明にはより詳しい例が必要になります。 イーサリアムは分散台帳ではなく、分散型の[状態マシン](https://wikipedia.org/wiki/Finite-state_machine)です。 イーサリアムの状態とは、全アカウントとその残高を保持するだけでなく、予め定義されたルールに従ってブロックごとに変化し、任意のマシンコードを実行できる_マシンの状態_を保持する、巨大なデータ構造です。 ブロックごとの状態変化の具体的なルールは、EVMによって定義されています。

![EVMの構成図](./evm.png) _ [イーサリアムEVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

## イーサリアムの状態遷移関数 {#the-ethereum-state-transition-function}

EVMは数学の関数のように動作し、入力に対して決定論的な出力が得られます。 そのため、イーサリアムを**状態遷移関数**を持つと正式に表現することもできます。

```
Y(S, T)= S'
```

古い有効な状態 `(S)`と新しい有効なトランザクションのセット`(T)` により、イーサリアムの状態遷移関数`Y(S, T)`は新しい有効な出力状態 `S'` を生成します。

### 状態 {#state}

イーサリアムにおける「状態」とは、[修正マークルパトリシアツリー](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)と呼ばれる巨大なデータ構造であり、ハッシュでリンクされたすべての[アカウント](/developers/docs/accounts/)を保持し、ブロックチェーンに保存されている単一のルートハッシュにまとめることができます。

### トランザクション {#transactions}

イーサリアムにおける「トランザクション」とは、アカウントから暗号的に署名された一連の指示です。 トランザクションには、メッセージの呼び出しが発生するものと、コントラクトの作成が発生するものの2種類があります。

スマートコントラクトを作成すると、コンパイルされた[スマートコントラクト](/developers/docs/smart-contracts/anatomy/)バイトコードを含む、新規コントラクトアカウントが作られます。 他のアカウントがスマートコントラクトへメッセージの呼び出しを行うたびに、そのバイトコードが実行されます。

## EVM指示 {#evm-instructions}

EVMは1024項目を含む[スタックマシン](https://wikipedia.org/wiki/Stack_machine)として実行されます。 各項目は256ビットの単語で、これは256ビットの暗号(Keccak-256ハッシュやsecp256k1シグネチャなど)を使いやすいように選択されています。

実行中、EVMは一時的な_メモリ_(ワードアドレスによるバイト配列として)を持ちますが、これはトランザクション間には継続されません。

しかし、スマートコントラクトにはマークルパトリシア_ストレージ_のツリーが(ワードアドレス可能なワードアレイとして)含まれており、当該アカウントに関連付けられ、グローバルな状態の一部となっています。

コンパイルされたスマートコントラクトのバイトコードは、`XOR`、`AND`、 `ADD`、 `SUB`のような標準的なスタック操作を行う多数のEVM[オペコード](/developers/docs/evm/opcodes)として実行されます。 また、EVMは`ADDRESS`、`BALANCE`、`BLOCKHASH`など、ブロックチェーン固有のスタック操作を多数実装しています。

![EVMを実行にガスが必要な箇所を示す図](../gas/gas.png) _ [イーサリアムEVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

## EVMの実装 {#evm-implementations}

EVMのすべての実装は、イーサリアムイエローペーパーに記載されている仕様を遵守する必要があります。

イーサリアムが誕生してから9年間にわたって、EVMは数多くの改訂を受け、様々なプログラミング言語で実装されてきました。

[イーサリアム実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)にはEVMの実装が含まれています。 また、次のようなスタンドアローンの実装も複数あります。

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 参考文献 {#further-reading}

- [イーサリアムイエローペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper(別名: KEVM): KにおけるEVMのセマンティクス](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [イーサリアム仮想マシンのオペコード](https://www.ethervm.io/)
- [イーサリアム仮想マシンオペコードのインタラクティブリファレンス](https://www.evm.codes/)
- [Solidityドキュメントの簡単な紹介](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [マスタリング・イーサリアム - イーサリアム仮想マシン](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## 関連トピック {#related-topics}

- [ガス](/developers/docs/gas/)
