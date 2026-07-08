---
title: "コントラクトのリバースエンジニアリング"
description: "ソースコードがない場合にコントラクトを理解する方法"
author: "オリ・ポメランツ"
lang: ja
tags: ["EVM", "オペコード"]
skill: advanced
breadcrumb: "リバースエンジニアリング"
published: 2021-12-30
---
## はじめに {#introduction}

_ブロックチェーン上に秘密はありません_。発生するすべてのことは一貫性があり、検証可能で、公開されています。理想的には、[コントラクトはソースコードが公開され、Etherscan上で検証されているべきです](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。しかし、[常にそうであるとは限りません](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。この記事では、ソースコードのないコントラクトである[`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)を調べることで、コントラクトをリバースエンジニアリングする方法を学びます。

逆コンパイラ（デコンパイラ）は存在しますが、常に[使える結果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)が得られるとは限りません。この記事では、[オペコード](https://github.com/wolflo/evm-opcodes)から手動でコントラクトをリバースエンジニアリングして理解する方法と、デコンパイラの結果を解釈する方法を学びます。

この記事を理解するには、EVMの基礎をすでに知っており、EVMアセンブラに少なくともある程度精通している必要があります。[これらのトピックについてはこちらで読むことができます](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 実行可能コードの準備 {#prepare-the-executable-code}

コントラクトのEtherscanにアクセスし、**Contract**タブをクリックしてから**Switch to Opcodes View**をクリックすると、オペコードを取得できます。1行に1つのオペコードが表示されるビューになります。

![Opcode View from Etherscan](opcode-view.png)

ただし、ジャンプを理解するためには、各オペコードがコード内のどこにあるかを知る必要があります。そのための1つの方法は、Googleスプレッドシートを開き、C列にオペコードを貼り付けることです。[この準備済みのスプレッドシートのコピーを作成することで、以下の手順をスキップできます](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

次のステップは、ジャンプを理解できるように正しいコードの場所を取得することです。B列にオペコードのサイズを、A列に場所（16進数）を入力します。セル`B1`にこの関数を入力し、コードの最後までB列の残りの部分にコピーして貼り付けます。これを行った後、B列を非表示にすることができます。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

まず、この関数はオペコード自体に1バイトを追加し、次に`PUSH`を探します。Pushオペコードは、プッシュされる値のための追加のバイトを持つ必要があるため特別です。オペコードが`PUSH`の場合、バイト数を抽出してそれを追加します。

`A1`に最初のオフセットであるゼロを入力します。次に、`A2`にこの関数を入力し、A列の残りの部分に再度コピーして貼り付けます。

```
=dec2hex(hex2dec(A1)+B1)
```

ジャンプ（`JUMP`および`JUMPI`）の前にプッシュされる値は16進数で与えられるため、16進数の値を取得するためにこの関数が必要です。

## エントリーポイント (0x00) {#the-entry-point-0x00}

コントラクトは常に最初のバイトから実行されます。以下はコードの初期部分です。

| オフセット | オペコード | スタック (オペコード実行後) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | 空                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | 空                    |

このコードは2つのことを行います。

1. 0x80を32バイトの値としてメモリ位置0x40〜0x5Fに書き込みます（0x80は0x5Fに保存され、0x40〜0x5Eはすべてゼロになります）。
2. コールデータのサイズを読み取ります。通常、イーサリアムのコントラクトのコールデータは[ABI（アプリケーション・バイナリ・インターフェース）](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)に従い、関数セレクタとして最低4バイトを必要とします。コールデータのサイズが4未満の場合、0x5Eにジャンプします。

![Flowchart for this portion](flowchart-entry.png)

### 0x5Eのハンドラ（非ABIコールデータ用） {#the-handler-at-0x5e-for-non-abi-call-data}

| オフセット | オペコード |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

このスニペットは`JUMPDEST`から始まります。EVM（イーサリアム仮想マシン）プログラムは、`JUMPDEST`以外のオペコードにジャンプすると例外をスローします。次にCALLDATASIZEを確認し、それが「真」（つまりゼロではない）であれば0x7Cにジャンプします。これについては後述します。

| オフセット | オペコード | スタック (オペコード実行後)                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | 呼び出しによって提供された[Wei](/glossary/#wei)。Solidityでは`msg.value`と呼ばれます。 |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

つまり、コールデータがない場合、Storage[6]の値を読み取ります。この値が何であるかはまだわかりませんが、コントラクトがコールデータなしで受信したトランザクションを探すことができます。コールデータなし（したがってメソッドもなし）で単にETHを送金するトランザクションは、Etherscanでは`Transfer`というメソッドになります。実際、[このコントラクトが受信した最初のトランザクション](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)は送金です。

そのトランザクションを見て**Click to see More**をクリックすると、入力データと呼ばれるコールデータが確かに空（`0x`）であることがわかります。また、値が1.559 ETHであることにも注目してください。これは後で関連してきます。

![The call data is empty](calldata-empty.png)

次に、**State**タブをクリックし、リバースエンジニアリングしているコントラクト（0x2510...）を展開します。トランザクション中に`Storage[6]`が変更されたことがわかります。Hexを**Number**に変更すると、1,559,000,000,000,000,000になっていることがわかります。これはwei単位で送金された値（わかりやすくするためにカンマを追加しました）であり、次のコントラクトの値に対応しています。

![Storage[6]の変更](storage6.png)

[同時期の他の`Transfer`トランザクション](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)によって引き起こされた状態の変更を見ると、`Storage[6]`がしばらくの間コントラクトの値を追跡していたことがわかります。今のところ、これを`Value*`と呼ぶことにします。アスタリスク（`*`）は、この変数が何をするのかまだ_わかっていない_ことを思い出させるためのものですが、単にコントラクトの値を追跡するためだけのものではないはずです。なぜなら、`ADDRESS BALANCE`を使用してアカウントの残高を取得できるのに、非常に高価なストレージを使用する必要はないからです。最初のオペコードはコントラクト自身のアドレスをプッシュします。2つ目のオペコードはスタックの一番上にあるアドレスを読み取り、それをそのアドレスの残高に置き換えます。

| オフセット | オペコード | スタック                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

ジャンプ先でこのコードのトレースを続けます。

| オフセット | オペコード | スタック                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT`はビット単位の演算であるため、コール値のすべてのビットの値を反転させます。

| オフセット | オペコード | スタック                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

`Value*`が2^256-CALLVALUE-1より小さいか等しい場合にジャンプします。これはオーバーフローを防ぐためのロジックのようです。実際、いくつかの無意味な操作（例えば、メモリへの書き込みが削除されようとしているなど）の後、オフセット0x01DEでオーバーフローが検出された場合にコントラクトがリバートすることがわかります。これは通常の動作です。

このようなオーバーフローが発生する可能性は極めて低いことに注意してください。なぜなら、コール値と`Value*`の合計が2^256 wei、つまり約10^59 ETHに匹敵する必要があるからです。[執筆時点でのETHの総供給量は2億未満です](https://etherscan.io/stat/supply)。

| オフセット | オペコード | スタック                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

ここに到達した場合、`Value* + CALLVALUE`を取得してオフセット0x75にジャンプします。

| オフセット | オペコード | スタック                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

ここに到達した場合（コールデータが空である必要があります）、`Value*`にコール値を加算します。これは、`Transfer`トランザクションが行うと述べたことと一致しています。

| オフセット | オペコード |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

最後に、スタックをクリアし（これは必須ではありません）、トランザクションの正常終了を通知します。

まとめると、以下が初期コードのフローチャートです。

![Entry point flowchart](flowchart-entry.png)

## 0x7Cのハンドラ {#the-handler-at-0x7c}

このハンドラが何をするのか、あえて見出しには書きませんでした。目的は、この特定のコントラクトがどのように機能するかを教えることではなく、コントラクトをリバースエンジニアリングする方法を教えることだからです。私がしたのと同じように、コードを追うことで、それが何をするのかを学ぶことができます。

ここにはいくつかの場所から到達します：

- 1、2、または3バイトのコールデータがある場合（オフセット0x63から）
- メソッドの署名が不明な場合（オフセット0x42および0x5Dから）

| Offset | Opcode       | Stack                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

これは別のストレージセルですが、どのトランザクションでも見つけることができなかったため、その意味を知るのはより困難です。以下のコードを見れば、より明確になるでしょう。

| Offset | Opcode                                            | Stack                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

これらのオペコードは、Storage[3]から読み取った値を、Ethereumのアドレスの長さである160ビットに切り詰めます。

| Offset | Opcode | Stack                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

次のオペコードに進むため、このジャンプは不要です。このコードは、可能な限りガス効率が良いとは言えません。

| Offset | Opcode     | Stack                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

コードの最初で、Mem[0x40]を0x80に設定しました。後で0x40を探すと、変更されていないことがわかるため、0x80であると想定できます。

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

0x80から開始して、すべてのコールデータをメモリにコピーします。

| Offset | Opcode        | Stack                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

これで状況がずっと明確になりました。このコントラクトは[プロキシ](https://blog.openzeppelin.com/proxy-patterns/)として機能し、Storage[3]のアドレスを呼び出して実際の作業を行うことができます。`DELEGATE_CALL`は別のコントラクトを呼び出しますが、同じストレージに留まります。つまり、委譲されたコントラクト（私たちがプロキシとなっているコントラクト）は、同じストレージ空間にアクセスします。呼び出しのパラメータは以下の通りです：

- _Gas_: 残りのすべてのガス
- _Called address_: Storage[3]-as-address
- _Call data_: 0x80から始まるCALLDATASIZEバイト（ここに元のコールデータを配置しました）
- _Return data_: なし（0x00 - 0x00）戻り値のデータは別の方法で取得します（以下を参照）

| Offset | Opcode         | Stack                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address                          |

ここで、すべての戻り値のデータを0x80から始まるメモリバッファにコピーします。

| Offset | Opcode       | Stack                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((呼び出しの成功/失敗))) (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((呼び出しは失敗したか))) (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((呼び出しは失敗したか))) (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

したがって、呼び出しの後、戻り値のデータをバッファ0x80 - 0x80+RETURNDATASIZEにコピーし、呼び出しが成功した場合は、まさにそのバッファを使用して`RETURN`します。

### DELEGATECALLの失敗 {#delegatecall-failed}

ここ（0xC0）に到達した場合、呼び出したコントラクトがリバートしたことを意味します。私たちはそのコントラクトのプロキシにすぎないため、同じデータを返してリバートさせたいと考えます。

| Offset | Opcode   | Stack                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((呼び出しの成功/失敗))) RETURNDATASIZE (((呼び出しの成功/失敗))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

したがって、先ほど`RETURN`に使用したのと同じバッファ（0x80 - 0x80+RETURNDATASIZE）を使用して`REVERT`します。

![Call to proxy flowchart](flowchart-proxy.png)

## ABIコール {#abi-calls}

コールデータのサイズが4バイト以上の場合、これは有効なABIコールである可能性があります。

| Offset | Opcode       | Stack                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((コールデータの最初のワード (256ビット))))      |
|     10 | PUSH1 0xe0   | 0xE0 (((コールデータの最初のワード (256ビット)))) |
|     12 | SHR          | (((コールデータの最初の32ビット (4バイト))))    |

Etherscanは`1C`を不明なオペコードとして表示します。なぜなら、[Etherscanがこの機能を記述した後にそれが追加され](https://eips.ethereum.org/EIPS/eip-145)、まだ更新されていないからです。[最新のオペコード表](https://github.com/wolflo/evm-opcodes)を見ると、これが右シフト（shift right）であることがわかります。

| Offset | Opcode           | Stack                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((コールデータの最初の32ビット (4バイト)))) (((コールデータの最初の32ビット (4バイト))))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((コールデータの最初の32ビット (4バイト)))) (((コールデータの最初の32ビット (4バイト)))) |
|     19 | GT               | 0x3CD8045E>コールデータの最初の32ビット (((コールデータの最初の32ビット (4バイト))))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>コールデータの最初の32ビット (((コールデータの最初の32ビット (4バイト))))            |
|     1D | JUMPI            | (((コールデータの最初の32ビット (4バイト))))                                                           |

このようにメソッド署名の照合テストを2つに分割することで、平均してテストの半分を節約できます。この直後に続くコードと0x43のコードは同じパターンに従っています。コールデータの最初の32ビットを`DUP1`し、`PUSH4 (((method signature>`し、`EQ`を実行して等しいかどうかを確認し、メソッド署名が一致する場合は`JUMPI`します。以下は、メソッド署名、そのアドレス、および判明している場合は[対応するメソッド定義](https://www.4byte.directory/)です。

| メソッド                                                                                 | メソッド署名 | ジャンプ先のオフセット |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

一致するものが見つからない場合、コードは[0x7Cのプロキシハンドラ](#the-handler-at-0x7c)にジャンプし、プロキシ先のコントラクトに一致するものがあることを期待します。

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Stack                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

この関数が最初に行うのは、呼び出しでETHが送信されていないことを確認することです。この関数は[`payable`](https://solidity-by-example.org/payable/)ではありません。もし誰かがETHを送信してきた場合、それは間違いであるはずなので、そのETHが取り戻せない場所に残るのを避けるために`REVERT`したいと考えます。

| Offset | Opcode                                            | Stack                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト))) |
|    12D | SWAP2                                             | (((Storage[3] すなわち私たちがプロキシとして機能しているコントラクト))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

そして、0x80には現在プロキシアドレスが含まれています。

| Offset | Opcode       | Stack     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4コード {#the-e4-code}

これらの行を見るのは初めてですが、他のメソッドと共有されています（後述）。したがって、スタック内の値をXと呼び、`splitter()`ではこのXの値が0xA0であることを覚えておいてください。

| Offset | Opcode     | Stack       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

つまり、このコードはスタック内でメモリポインタ（X）を受け取り、コントラクトに0x80 - Xのバッファで`RETURN`させます。

`splitter()`の場合、これは私たちがプロキシとして機能しているアドレスを返します。`RETURN`は0x80〜0x9Fのバッファを返しますが、これは私たちがこのデータを書き込んだ場所です（上記のオフセット0x130）。

## currentWindow() {#currentwindow}

オフセット0x158〜0x163のコードは、`splitter()`の0x103〜0x10Eで見たものと（`JUMPI`の宛先を除いて）同一です。したがって、`currentWindow()`も`payable`ではないことがわかります。

| オフセット | オペコード       | スタック                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DAコード {#the-da-code}

このコードは他のメソッドとも共有されています。そのため、スタック内の値をYと呼び、`currentWindow()`ではこのYの値がStorage[1]であることを覚えておきましょう。

| オフセット | オペコード     | スタック            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Yを0x80〜0x9Fに書き込みます。

| オフセット | オペコード     | スタック          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

残りの部分は[上記](#the-e4-code)ですでに説明されています。つまり、0xDAへのジャンプはスタックのトップ（Y）を0x80〜0x9Fに書き込み、その値を返します。`currentWindow()`の場合、Storage[1]を返します。

## merkleRoot() {#merkleroot}

オフセット0xED-0xF8のコードは、`splitter()`の0x103-0x10Eで見たものと（`JUMPI`の宛先を除いて）同一であるため、`merkleRoot()`も`payable`ではないことがわかります。

| オフセット | オペコード       | スタック                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

ジャンプ後に何が起こるかは、[すでに解明しました](#the-da-code)。したがって、`merkleRoot()`はStorage[0]を返します。

オフセット0x138〜0x143のコードは、`splitter()`の0x103〜0x10Eで見たものと（`JUMPI`の宛先を除いて）同一であるため、この関数も`payable`ではないことがわかります。

| Offset | Opcode       | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

この関数は少なくとも32バイト（1ワード）のコールデータを受け取るようです。

| Offset | Opcode | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

コールデータを取得できない場合、トランザクションは戻り値データなしでリバートされます。

関数が必要なコールデータを_取得した場合_に何が起こるか見てみましょう。

| Offset | Opcode       | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`は、メソッド署名の_後_のコールデータの最初のワードです。

| Offset | Opcode       | Stack                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

最初のワードがStorage[4]未満でない場合、関数は失敗します。戻り値なしでリバートされます。

| Offset | Opcode     | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

calldataload(4)がStorage[4]未満の場合、次のコードになります。

| Offset | Opcode     | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

そして、メモリの場所0x00〜0x1Fにはデータ0x04が含まれるようになります（0x00〜0x1Eはすべてゼロで、0x1Fは4です）。

| Offset | Opcode     | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

つまり、ストレージにはルックアップテーブルがあり、0x000...0004のSHA3から始まり、正当なコールデータ値（Storage[4]未満の値）ごとにエントリがあります。

| Offset | Opcode | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

[オフセット0xDAのコード](#the-da-code)が何をするかはすでにわかっています。スタックの一番上の値を呼び出し元に返します。したがって、この関数はルックアップテーブルの値を呼び出し元に返します。

## 0x1f135823 {#0x81e580d3}

オフセット0xC4〜0xCFのコードは、`splitter()`の0x103〜0x10Eで見たものと（`JUMPI`の宛先を除いて）同一であるため、この関数も`payable`ではないことがわかります。

| Offset | Opcode       | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

[オフセット0xDAのコード](#the-da-code)が何をするかはすでにわかっています。スタックの一番上の値を呼び出し元に返します。したがって、この関数は`Value*`を返します。

### メソッドの概要 {#0x1f135823}

現時点でコントラクトを理解できたと感じますか？私はそうは思いません。これまでのところ、以下のメソッドがあります。

| メソッド                            | 意味                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | 呼び出しによって提供された値を受け入れ、その分だけ`Value*`を増やす           |
| [splitter()](#splitter)           | Storage[3]、つまりプロキシ・アドレスを返す                                                 |
| [currentWindow()](#currentwindow) | Storage[1]を返す                                                                    |
| [merkleRoot()](#merkleroot)        | Storage[0]を返す                                                                    |
| [0x81e580d3](#0x81e580d3)         | パラメータがStorage[4]未満である場合、ルックアップテーブルから値を返す |
| [0x1f135823](#0x1f135823)         | Storage[6]、別名Value\*を返す                                                    |

しかし、他の機能はStorage[3]にあるコントラクトによって提供されることがわかっています。そのコントラクトが何であるかがわかれば、手がかりになるかもしれません。ありがたいことに、これはブロックチェーンであり、少なくとも理論上はすべてが既知です。Storage[3]を設定するメソッドは見当たらなかったため、コンストラクタによって設定されたに違いありません。

## コンストラクタ {#method-summary}

[コントラクトを見る](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)と、それを作成したトランザクションも確認できます。

![Click the create transaction](create-tx.png)

そのトランザクションをクリックし、次に**状態**タブをクリックすると、パラメータの初期値を確認できます。具体的には、Storage[3] に [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) が含まれていることがわかります。そのコントラクトには、欠落している機能が含まれているはずです。調査中のコントラクトで使用したのと同じツールを使用して、それを理解することができます。

## プロキシ・コントラクト {#the-constructor}

上記の元のコントラクトで使用したのと同じ手法を使用すると、次の場合にコントラクトがリバートすることがわかります。

- 呼び出しにETHが添付されている場合 (0x05-0x0F)
- コールデータのサイズが4未満の場合 (0x10-0x19 および 0xBE-0xC2)

そして、サポートされているメソッドは次のとおりです。

| メソッド | メソッドの署名 | ジャンプ先のオフセット |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

下部の4つのメソッドは、到達することがないため無視できます。これらの署名は、元のコントラクトが単独で処理するようになっているため（署名をクリックすると上記の詳細を確認できます）、[オーバーライドされたメソッド](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)であるはずです。

残りのメソッドの1つは `claim(<params>)` で、もう1つは `isClaimed(<params>)` であるため、エアドロップのコントラクトのように見えます。残りをオペコードごとに確認する代わりに、[デコンパイラを試す](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)ことができます。これにより、このコントラクトの3つの関数について有用な結果が得られます。他の関数のリバースエンジニアリングは、読者への演習として残しておきます。

### scaleAmountByPercentage {#the-proxy-contract}

この関数についてデコンパイラが提供する内容は次のとおりです。

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

最初の `require` は、コールデータに、関数署名の4バイトに加えて、2つのパラメータに十分な少なくとも64バイトがあることをテストします。そうでない場合は、明らかに何かが間違っています。

`if` ステートメントは、`_param1` がゼロではなく、`_param1 * _param2` が負ではないことを確認しているようです。これはおそらく、ラップアラウンドのケースを防ぐためです。

最後に、関数はスケーリングされた値を返します。

### 請求 {#scaleamountbypercentage}

デコンパイラが作成するコードは複雑であり、そのすべてが私たちに関連しているわけではありません。有用な情報を提供していると思われる行に焦点を当てるため、一部を省略します。

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

ここで2つの重要なことがわかります。

- `_param2` は `uint256` として宣言されていますが、実際にはアドレスです。
- `_param1` は請求されるウィンドウであり、`currentWindow` 以前である必要があります。

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

これで、Storage[5] がウィンドウとアドレスの配列であり、そのアドレスがそのウィンドウの報酬を請求したかどうかがわかりました。

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

`unknown2eb4a7ab` が実際には関数 `merkleRoot()` であることがわかっているため、このコードは[マークル証明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)を検証しているように見えます。これは、`_param4` がマークル証明であることを意味します。

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

これは、コントラクトが自身のETHを別のアドレス（コントラクトまたは外部所有）に送金する方法です。送金する金額を値として呼び出します。したがって、これはETHのエアドロップのようです。

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

下部の2行は、Storage[2] も私たちが呼び出すコントラクトであることを示しています。[コンストラクタのトランザクションを見る](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)と、このコントラクトが [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) であり、[ソースコードがEtherscanにアップロードされている](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)ラップド・イーサのコントラクトであることがわかります。

したがって、コントラクトは `_param2` にETHを送金しようとしているようです。それができれば素晴らしいです。できない場合は、[WETH](https://weth.tkn.eth.limo/) を送金しようとします。`_param2` が外部所有アカウント (EOA) の場合、常にETHを受け取ることができますが、コントラクトはETHの受け取りを拒否できます。ただし、WETHはERC-20であり、コントラクトはそれを受け入れることを拒否できません。

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

関数の最後で、ログエントリが生成されていることがわかります。[生成されたログエントリを見て](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)、`0xdbd5...` で始まるトピックでフィルタリングします。[そのようなエントリを生成したトランザクションの1つをクリックする](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)と、確かに請求のように見えます。アカウントはリバースエンジニアリングしているコントラクトにメッセージを送信し、その見返りとしてETHを受け取りました。

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#claim}

この関数は、上記の [`claim`](#claim) に非常に似ています。これもマークル証明をチェックし、最初のパラメータにETHを送金しようとし、同じタイプのログエントリを生成します。

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

主な違いは、最初のパラメータである引き出すウィンドウがないことです。代わりに、請求できるすべてのウィンドウに対するループがあります。

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

したがって、これはすべてのウィンドウを請求する `claim` のバリアントのようです。

## まとめ {#1e7df9d3}

これで、オペコードや（機能する場合は）デコンパイラを使用して、ソースコードが公開されていないコントラクトを理解する方法がわかったはずです。この記事の長さからも明らかなように、コントラクトのリバースエンジニアリングは簡単なことではありませんが、セキュリティが不可欠なシステムにおいて、コントラクトが約束通りに機能することを検証できることは重要なスキルです。

[私の他の記事についてはこちらをご覧ください](https://cryptodocguy.pro/)。