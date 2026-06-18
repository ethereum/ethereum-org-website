---
title: イーサリアム仮想マシン (EVM)
description: イーサリアム仮想マシン、および状態、トランザクション、スマート・コントラクトとの関係についての紹介。
lang: ja
---

イーサリアム仮想マシン (EVM) は、すべての[イーサリアム](/)ノード間で一貫して安全にコードを実行する分散型仮想環境です。ノードはEVMを実行してスマート・コントラクトを実行し、[オペレーション](/developers/docs/evm/opcodes/)に必要な計算量を測定するために「[ガス](/developers/docs/gas/)」を使用することで、効率的なリソース割り当てとネットワークのセキュリティを確保します。

## 前提条件 {#prerequisites}

EVMを理解するには、[バイト](https://wikipedia.org/wiki/Byte)、[メモリ](https://wikipedia.org/wiki/Computer_memory)、[スタック](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) などのコンピューターサイエンスの一般的な用語に関する基本的な知識が必要です。また、[ハッシュ関数](https://wikipedia.org/wiki/Cryptographic_hash_function)や[マークル・ツリー](https://wikipedia.org/wiki/Merkle_tree)などの暗号技術やブロックチェーンの概念に慣れておくと役立ちます。

## 台帳から状態マシンへ {#from-ledger-to-state-machine}

「分散型台帳」という例えは、暗号技術の基本的なツールを使用して分散型通貨を可能にするビットコインのようなブロックチェーンを説明するためによく使用されます。台帳は、台帳を変更するために誰が何をでき、何ができないかを管理する一連のルールに従わなければならない活動の記録を維持します。たとえば、ビットコインのアドレスは、以前に受け取った以上のビットコインを支払うことはできません。これらのルールは、ビットコインや他の多くのブロックチェーン上のすべてのトランザクションの基盤となっています。

イーサリアムには、ほぼ同じ直感的なルールに従う独自のネイティブ暗号資産 (イーサ) がありますが、はるかに強力な機能である[スマート・コントラクト](/developers/docs/smart-contracts/)も可能にします。このより複雑な機能には、より洗練された例えが必要です。分散型台帳の代わりに、イーサリアムは分散型の[状態マシン](https://wikipedia.org/wiki/Finite-state_machine)です。イーサリアムの状態は、すべてのアカウントと残高だけでなく、事前に定義された一連のルールに従ってブロックごとに変化し、任意の機械語コードを実行できる「マシン状態 (machine state)」を保持する大規模なデータ構造です。ブロックごとに状態を変更する具体的なルールは、EVMによって定義されています。

![A diagram showing the make up of the EVM](./evm.png)
_図は[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)から引用・改変_

## イーサリアムの状態遷移関数 {#the-ethereum-state-transition-function}

EVMは数学関数のように動作します。つまり、入力が与えられると、決定論的な出力を生成します。したがって、イーサリアムが**状態遷移関数**を持っているとより形式的に説明することは非常に役立ちます。

```
Y(S, T)= S'
```

有効な古い状態 `(S)` と有効なトランザクションの新しいセット `(T)` が与えられると、イーサリアムの状態遷移関数 `Y(S, T)` は新しい有効な出力状態 `S'` を生成します。

### 状態 {#state}

イーサリアムのコンテキストでは、状態は[変更されたマークル・パトリシア・トライ](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)と呼ばれる巨大なデータ構造であり、すべての[アカウント](/developers/docs/accounts/)をハッシュでリンクし、ブロックチェーンに保存されている単一のルートハッシュに還元できるように保持します。

### トランザクション {#transactions}

トランザクションは、アカウントからの暗号技術によって署名された命令です。トランザクションには、メッセージ・コールをもたらすものと、コントラクトの作成をもたらすものの2種類があります。

コントラクトの作成により、コンパイルされた[スマート・コントラクト](/developers/docs/smart-contracts/anatomy/)のバイトコードを含む新しいコントラクト・アカウントが作成されます。別のアカウントがそのコントラクトにメッセージ・コールを行うたびに、そのバイトコードが実行されます。

## EVMの命令 {#evm-instructions}

EVMは、深さ1024アイテムの[スタックマシン](https://wikipedia.org/wiki/Stack_machine)として実行されます。各アイテムは256ビットのワードであり、256ビットの暗号技術 (ケチャック・256ハッシュやsecp256k1署名など) での使いやすさを考慮して選択されました。

実行中、EVMは一時的な「メモリ」(ワード単位でアドレス指定されるバイト配列として) を維持しますが、これはトランザクション間で永続化されません。

### 一時ストレージ {#transient-storage}

一時ストレージは、`TSTORE` および `TLOAD` オペコードを通じてアクセスされる、トランザクションごとのキーバリューストアです。同じトランザクション中のすべての内部呼び出しにわたって保持されますが、トランザクションの終了時にクリアされます。メモリとは異なり、一時ストレージは実行フレームではなくEVMの状態の一部としてモデル化されていますが、グローバルな状態にはコミットされません。一時ストレージにより、トランザクション中の内部呼び出し間で、ガス効率の良い一時的な状態の共有が可能になります。

### ストレージ {#storage}

コントラクトには、対象のアカウントに関連付けられ、グローバルな状態の一部であるマークル・パトリシア・「ストレージ」・トライ (ワード単位でアドレス指定可能なワード配列として) が含まれています。この永続的なストレージは、単一のトランザクションの期間中のみ利用可能であり、アカウントの永続的なストレージ・トライの一部を形成しない一時ストレージとは異なります。

### オペコード {#opcodes}

コンパイルされたスマート・コントラクトのバイトコードは、`XOR`、`AND`、`ADD`、`SUB` などの標準的なスタック操作を実行する多数のEVM[オペコード](/developers/docs/evm/opcodes)として実行されます。EVMはまた、`ADDRESS`、`BALANCE`、`BLOCKHASH` などのブロックチェーン固有のスタック操作も多数実装しています。オペコードセットには、一時ストレージへのアクセスを提供する `TSTORE` と `TLOAD` も含まれています。

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_図は[Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)から引用・改変_

## EVMの実装 {#evm-implementations}

EVMのすべての実装は、イーサリアムのイエロー・ペーパーに記載されている仕様に準拠する必要があります。

イーサリアムの10年の歴史の中で、EVMは何度かの改訂を経ており、さまざまなプログラミング言語によるEVMの実装がいくつか存在します。

[イーサリアムの実行クライアント](/developers/docs/nodes-and-clients/#execution-clients)には、EVMの実装が含まれています。さらに、以下のような複数のスタンドアロン実装があります。

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 参考文献 {#further-reading}

- [イーサリアムのイエロー・ペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper (別名 KEVM): KにおけるEVMのセマンティクス](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [イーサリアム仮想マシンのオペコード](https://www.ethervm.io/)
- [イーサリアム仮想マシンのオペコード・インタラクティブ・リファレンス](https://www.evm.codes/)
- [Solidityドキュメントの簡単な紹介](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [マスタリング・イーサリアム - イーサリアム仮想マシン](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## 関連トピック {#related-topics}

- [ガス](/developers/docs/gas/)

## チュートリアル: イーサリアム仮想マシン (EVM) / イーサリアムのオペコード {#tutorials}

- [イエロー・ペーパーのEVM仕様を理解する](/developers/tutorials/yellow-paper-evm/) _– イーサリアムのイエロー・ペーパーに記載されている正式なEVM仕様のガイド付きウォークスルー。_
- [コントラクトのリバースエンジニアリング](/developers/tutorials/reverse-engineering-a-contract/) _– EVMオペコードを使用してコンパイルされたスマート・コントラクトをリバースエンジニアリングする方法。_