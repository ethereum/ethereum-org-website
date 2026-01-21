---
title: "コントラクトのリバースエンジニアリング"
description: ソースコードがない場合にコントラクトを理解する方法
author: Ori Pomerantz
lang: ja
tags: [ "evm", "オペコード" ]
skill: advanced
published: 2021-12-30
---

## はじめに {#introduction}

_ブロックチェーン上に秘密はありません_。ブロックチェーン上で起こる全てのことは、一貫性があり、検証可能で、公開されています。 理想的には、[コントラクトのソースコードはEtherscanで公開・検証されるべきです](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。 しかし、[必ずしもそうとは限りません](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。 この記事では、ソースコードがないコントラクト[`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)を調べることで、コントラクトをリバースエンジニアリングする方法を学びます。

逆コンパイラは存在しますが、必ずしも[利用可能な結果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)が得られるとは限りません。 この記事では、手動でリバースエンジニアリングを行い、[オペコード](https://github.com/wolflo/evm-opcodes)からコントラクトを理解する方法と、デコンパイラの結果を解釈する方法を学びます。

この記事を理解するには、イーサリアム仮想マシン(EVM)の基礎を理解しており、EVMアセンブラにある程度精通している必要があります。 [これらのトピックについてはこちらをお読みください](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 実行可能コードの準備 {#prepare-the-executable-code}

コントラクトのEtherscanページにアクセスし、**Contract**タブをクリックしてから**Switch to Opcodes View**をクリックすると、オペコードを取得できます。 1行に1つのオペコードが表示されるビューになります。

![Etherscanのオペコードビュー](opcode-view.png)

ただし、ジャンプを理解するには、コード内の各オペコードの場所を知る必要があります。 そのためには、Googleスプレッドシートを開き、オペコードをC列に貼り付けるという方法があります。[こちらの準備済みのスプレッドシートのコピーを作成すれば、次の手順をスキップできます](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

次のステップでは、ジャンプを理解できるように、正しいコードのロケーションを取得します。 B列にオペコードサイズを、A列に(16進数の)ロケーションを入れます。セル`B1`にこの関数を入力し、コードの最後までB列の残りのセルにコピー＆ペーストします。 これを行った後、B列を非表示にできます。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

まず、この関数はオペコード自体のために1バイトを追加し、次に`PUSH`を探します。 プッシュオペコードは特殊で、プッシュされる値用に追加のバイトを保持する必要があります。 オペコードが`PUSH`の場合、バイト数を抽出して加算します。

`A1`に最初のオフセットであるゼロを配置します。 次に、`A2`にこの関数を配置し、A列の残りの部分にコピーアンドペーストします。

```
=dec2hex(hex2dec(A1)+B1)
```

ジャンプ(`JUMP`と`JUMPI`)の前にプッシュされる値は16進数で渡されるため、この関数で16進数の値を得る必要があります。

## エントリーポイント (0x00) {#the-entry-point-0x00}

コントラクトは、必ず最初のバイトから実行されます。 以下は、コードの冒頭部分です。

| オフセット | オペコード        | スタック(オペコードの後)             |
| ----: | ------------ | -------------------------------------------- |
|     0 | PUSH1 0x80   | 0x80                                         |
|     2 | PUSH1 0x40   | 0x40, 0x80                                   |
|     4 | MSTORE       | なし                                           |
|     5 | PUSH1 0x04   | 0x04                                         |
|     7 | CALLDATASIZE | CALLDATASIZE 0x04                            |
|     8 | LT           | CALLDATASIZE<4      |
|     9 | PUSH2 0x005e | 0x5E CALLDATASIZE<4 |
|     C | JUMPI        | なし                                           |

このコードは、次の2つのことをしています。

1. メモリロケーションの0x40～0x5Fへ、32バイト値として0x80を書き込みます(0x5Fに0x80が格納され、0x40～0x5Eはすべてゼロになります)。
2. コールデータサイズを読み取ります。 通常、イーサリアムコントラクトのコールデータは[ABI (アプリケーションバイナリインターフェース)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)に従います。これには、関数セレクタ用に最低4バイトが必要です。 コールデータのサイズが4未満の場合、0x5Eへジャンプします。

![この部分のフローチャート](flowchart-entry.png)

### 0x5Eのハンドラ (非ABIコールデータ用) {#the-handler-at-0x5e-for-non-abi-call-data}

| オフセット | オペコード        |
| ----: | ------------ |
|    5E | JUMPDEST     |
|    5E | CALLDATASIZE |
|    60 | PUSH2 0x007c |
|    63 | JUMPI        |

このスニペットは、JUMPDESTで始まります。 イーサリアム仮想マシン(EVM)プログラムは、`JUMPDEST`ではないオペコードにジャンプした場合に例外を投げます。 次に、CALLDATASIZEを確認し、それが「true」の場合(ゼロではない場合)、0x7Cにジャンプします。 これについては後述します。

| オフセット | オペコード      | スタック(オペコードの後)                                                       |
| ----: | ---------- | -------------------------------------------------------------------------------------- |
|    64 | CALLVALUE  | 呼び出しによって提供された[Wei](/glossary/#wei)。 Solidityでは`msg.value`と呼ばれます                        |
|    65 | PUSH1 0x06 | 6 CALLVALUE                                                                            |
|    67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                          |
|    69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                |
|    6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                              |
|    6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE |

コールデータがない場合、Storage[6]の値を読み取ります。 このStorage[6]の値はまだわかりませんが、コールデータなしで受信したコントラクトのトランザクションを探すことはできます。 コールデータなしで(つまりメソッドなしで)ETHを送金するだけのトランザクションの場合、Etherscanに`Transfer`メソッドがあります。 実際、[コントラクトが受け取った最初のトランザクション](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)は送金です。

このトランザクションを調べ、「**Click to see More**」をクリックすると、コールデータ(インプットデータ)が実際に空(`0x`)であることが分かります。 また、値が1.559ETHであることに留意してください。これに関しては、後述します。

![コールデータが空である](calldata-empty.png)

次に、**State**タブをクリックし、リバースエンジニアリングしているコントラクト(0x2510...)を展開します。 トランザクション中に`Storage[6]`が変更されたことが分かります。「Hex」から**Number**に変更すると、次のコントラクトの値に応じてweiに変換された値、1,559,000,000,000,000,000になります(分かりやすくするためにコンマを追加しています)。

![Storage[6]の変化](storage6.png)

[同期間の他の`Transfer`トランザクション](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)によるステートの変更を見ると、`Storage[6]`がしばらくの間コントラクトの値を追跡していたことがわかります。 これを今から`Value*`と呼びます。 アスタリスク(`*`)は、この変数がまだ何をするかわからないことを示しています。しかし、これは単にコントラクトの値を追跡するためだけのものではありません。なぜなら、`ADDRESS BALANCE`を使ってアカウントの残高を取得できるのに、非常に高価なストレージを使う必要はないからです。 最初のオペコードは、コントラクト自体のアドレスをプッシュします。 2番目のオペコードは、スタックの上部にあるアドレスを読み込み、そのアドレスの残高で置き換えます。

| オフセット | オペコード        | スタック                                        |
| ----: | ------------ | ------------------------------------------- |
|    6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|    6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|    70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    74 | JUMP         |                                             |

ジャンプ先でも、このコードのトレースを続けます。

| オフセット | オペコード      | スタック                                                        |
| ----: | ---------- | ----------------------------------------------------------- |
|   1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|   1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|   1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|   1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT`はビットごとの演算であるため、コール値内の全てのビット値を反転します。

| オフセット | オペコード        | スタック                                                                                                 |
| ----: | ------------ | ---------------------------------------------------------------------------------------------------- |
|   1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                  |
|   1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                  |
|   1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|   1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|   1B2 | JUMPI        |                                                                                                      |

`Value*`の値が、2^256-CALLVALUE-1以下の場合にジャンプします。 これは、オーバーフローを防ぐためのロジックに見えます。 実際に、オフセット0x01DEでいくつかの無意味な操作(例: 削除される寸前にメモリへの書き込み)をした後、オーバーフローが検出されると、標準の動作としてコントラクトが元に戻されます。

このようなオーバーフローが発生する可能性は、非常に低いことに留意してください。これは、コール値に`Value*`を加えたものが、2^256 wei(約10^59 ETH)と同等になる必要があるためです。 [ETHの総供給量は、この記事の執筆時点で2億未満です](https://etherscan.io/stat/supply)。

| オフセット | オペコード    | スタック                                      |
| ----: | -------- | ----------------------------------------- |
|   1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|   1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|   1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|   1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|   1E3 | JUMP     |                                           |

ここに到達した場合、`Value* + CALLVALUE`を取得して、オフセット0x75へジャンプします。

| オフセット | オペコード    | スタック                            |
| ----: | -------- | ------------------------------- |
|    75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|    76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|    77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|    78 | SSTORE   | 0 CALLVALUE                     |

ここに到達した場合(コールデータが空である必要があります)、`Value*`にコール値を加えます。 これは、`Transfer`トランザクションが行うことと一致しています。

| オフセット | オペコード |
| ----: | ----- |
|    79 | POP   |
|    7A | POP   |
|    7B | STOP  |

最後に、スタックをクリアし(任意)、トランザクションが正常に終了したことを通知します。

まとめると、最初のコードのフローチャートは次のようになります。

![エントリーポイントのフローチャート](flowchart-entry.png)

## 0x7Cのハンドラ {#the-handler-at-0x7c}

意図的にこのハンドラが何をするか見出しに入れませんでした。 特定のコントラクトの動作を教えるのではなく、どのようにコントラクトをリバースエンジニアリングするかを学ぶのがポイントだからです。 同じ方法で、コードを追って何をするか学ぶことができます。

ここへ到達するのは、次のような場合です。

- (オフセット0x63から)1バイト、2バイトまたは3バイトのコールデータがある場合
- (オフセット0x42と0x5Dから)メソッドのシグネチャが不明な場合

| オフセット | オペコード        | スタック                                                                     |
| ----: | ------------ | ------------------------------------------------------------------------ |
|    7C | JUMPDEST     |                                                                          |
|    7D | PUSH1 0x00   | 0x00                                                                     |
|    7F | PUSH2 0x009d | 0x9D 0x00                                                                |
|    82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                           |
|    84 | SLOAD        | Storage[3] 0x9D 0x00 |

これは別のストレージセルです。このセルはどのトランザクションにも見つからなかったので、これが何を意味しているのか理解するのは困難です。 しかし、以下のコードがこれを明確にします。

| オフセット | オペコード                                             | スタック                                                                                                                                                |
| ----: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|    85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|    9A | AND                                               | Storage[3]-as-address 0x9D 0x00                                                                 |

これらのオペコードは、Storage[3]から読み取った値を160ビットに切り捨てています。これは、イーサリアムアドレスの長さです。

| オフセット | オペコード | スタック                                                                                |
| ----: | ----- | ----------------------------------------------------------------------------------- |
|    9B | SWAP1 | 0x9D Storage[3]-as-address 0x00 |
|    9C | JUMP  | Storage[3]-as-address 0x00      |

次のオペコードに進むため、このジャンプは不要です。 このコードは、ガス効率が良くありません。

| オフセット | オペコード      | スタック                                                                                                                                    |
| ----: | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
|    9D | JUMPDEST   | Storage[3]-as-address 0x00                                                          |
|    9E | SWAP1      | 0x00 Storage[3]-as-address                                                          |
|    9F | POP        | Storage[3]-as-address                                                               |
|    A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address                                                          |
|    A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

コードの最初で、Mem[0x40]を0x80に設定しました。 その後の0x40を確かめると変更していないことが分かります。つまり、これは0x80であると推測できます。

| オフセット | オペコード        | スタック                                                                                                  |
| ----: | ------------ | ----------------------------------------------------------------------------------------------------- |
|    A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|    A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|    A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|    A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

0x80から始まるすべてのコールデータをメモリにコピーします。

| オフセット | オペコード                              | スタック                                                                                                                                                                                     |
| ----: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    A8 | PUSH1 0x00                         | 0x00 0x80 Storage[3]-as-address                                                                                                      |
|    AA | DUP1                               | 0x00 0x00 0x80 Storage[3]-as-address                                                                                                 |
|    AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                                    |
|    AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                               |
|    AD | DUP6                               | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|    AE | GAS                                | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|    AF | DELEGATE_CALL |                                                                                                                                                                                          |

これで、かなり明確になりました。 このコントラクトは[プロキシ](https://blog.openzeppelin.com/proxy-patterns/)として機能しており、Storage[3] 内のアドレスを呼び出して、実際の作業をしています。 `DELEGATE_CALL`は、別のコントラクトを呼び出しますが、同じストレージ内に留まります。 つまり、委任されたコントラクト(現在のコントラクトがこのコントラクトのプロキシとなります)が、同じストレージスペースにアクセスします。 コール(呼び出し)のパラメータは次の通りです。

- _ガス_: 残りの全ガス
- _呼び出し先アドレス_: Storage[3]-as-address
- _コールデータ_: 元のコールデータを配置する、0x80から始まるCALLDATASIZEバイト
- _リターンデータ_: なし(0x00 - 0x00)。リターンデータは他の方法で取得(以下を参照)

| オフセット | オペコード          | スタック                                                                                                                                                                                                       |
| ----: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|    B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|    B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

ここでは、すべてのリターンデータを0x80から始まるメモリバッファにコピーします。

| オフセット | オペコード        | スタック                                                                                                                                                                                                                                                                                                                                                        |
| ----: | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                                       |
|    B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|    B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                                       |
|    BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                        |
|    BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                   |
|    BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                             |

リターンデータをバッファ(0x80～0x80+RETURNDATASIZE)にコピーする呼び出しの後、その呼び出しが成功した場合は、そのバッファを正確に返します。

### DELEGATECALL失敗 {#delegatecall-failed}

0xC0に到達した場合は、現在のコントラクトが呼び出したコントラクトが、元に戻された(REVERTされた)ことを意味します。 現在のコントラクトはこのコントラクトの単なるプロキシであるため、現在のコントラクトも同じデータを返して、元に戻す(REVERTする)必要があります。

| オフセット | オペコード    | スタック                                                                                                                                                                                                                                                                                      |
| ----: | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|    C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    C3 | REVERT   |                                                                                                                                                                                                                                                                                           |

そのため、前に`RETURN`で使用した同じバッファ(0x80～0x80+RETURNDATASIZE)を元に戻します(REVERTします)。

![プロキシへのコールに関するフローチャート](flowchart-proxy.png)

## ABIコール {#abi-calls}

コールデータのサイズが4バイト以上である場合、有効なABIコールである可能性があります。

| オフセット | オペコード        | スタック                                                                                                          |
| ----: | ------------ | ------------------------------------------------------------------------------------------------------------- |
|     D | PUSH1 0x00   | 0x00                                                                                                          |
|     F | CALLDATALOAD | (((コールデータの最初のワード (256ビット))))      |
|    10 | PUSH1 0xe0   | 0xE0 (((コールデータの最初のワード (256ビット)))) |
|    12 | SHR          | (((コールデータの最初の32ビット (4バイト))))      |

Etherscanによると`1C`は未知のオペコードですが、これは[Etherscanがこの機能を実装した後に追加された](https://eips.ethereum.org/EIPS/eip-145)もので、まだ更新されていないためです。 [最新のオペコード表](https://github.com/wolflo/evm-opcodes)を見ると、これが右シフトであることがわかります

| オフセット | オペコード            | スタック                                                                                                                                                                                                                         |
| ----: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    13 | DUP1             | (((コールデータの最初の32ビット (4バイト)))) (((コールデータの最初の32ビット (4バイト))))            |
|    14 | PUSH4 0x3cd8045e | 0x3CD8045E (((コールデータの最初の32ビット (4バイト)))) (((コールデータの最初の32ビット (4バイト)))) |
|    19 | GT               | 0x3CD8045E>コールデータの最初の32ビット (((コールデータの最初の32ビット (4バイト))))                                                                                          |
|    1A | PUSH2 0x0043     | 0x43 0x3CD8045E>コールデータの最初の32ビット (((コールデータの最初の32ビット (4バイト))))                                                                                     |
|    1D | JUMPI            | (((コールデータの最初の32ビット (4バイト))))                                                                                                                     |

このようにメソッドシグネチャのマッチングテストを2つに分割することで、平均的にテストの半分を節約できます。 その直後のコードと0x43のコードは、コールデータの最初の32ビットの複製(`DUP1`)、プッシュ(`PUSH4 (((method signature)`)、`EQ`を実行し等式を判定、メソッドシグネチャがマッチした場合は`JUMPI`、という同じパターンをたどります。 以下に、メソッドシグネチャ、そのアドレス、既知の場合は[対応するメソッド定義](https://www.4byte.directory/)を示します。

| メソッド                                                                                                      | メソッドシグネチャ  | ジャンプ先のオフセット |
| --------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e | 0x0103      |
| ???                                                                                                       | 0x81e580d3 | 0x0138      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4 | 0x0158      |
| ???                                                                                                       | 0x1f135823 | 0x00C4      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab | 0x00ED      |

一致するものが見つからない場合、そのコードは、現在のコントラクトがプロキシとなっているコントラクトに一致するものがあることを期待して、[0x7Cのプロキシハンドラ](#the-handler-at-0x7c)へジャンプします。

![ABIコールのフローチャート](flowchart-abi.png)

## splitter() {#splitter}

| オフセット | オペコード        | スタック                          |
| ----: | ------------ | ----------------------------- |
|   103 | JUMPDEST     |                               |
|   104 | CALLVALUE    | CALLVALUE                     |
|   105 | DUP1         | CALLVALUE CALLVALUE           |
|   106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|   107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|   10A | JUMPI        | CALLVALUE                     |
|   10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|   10D | DUP1         | 0x00 0x00 CALLVALUE           |
|   10E | REVERT       |                               |

この関数が最初に行うことは、呼び出しがETHを送金していないことを確認することです。 この関数は[`payable`](https://solidity-by-example.org/payable/)ではありません。 誰かがETHを送金してきた場合は、何かの間違いです。ETHを戻せなくなる前に`REVERT`して回避する必要があります。

| オフセット | オペコード                                             | スタック                                                                                                                                                                                                                      |
| ----: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   10F | JUMPDEST                                          |                                                                                                                                                                                                                           |
|   110 | POP                                               |                                                                                                                                                                                                                           |
|   111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                      |
|   113 | SLOAD                                             | (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト)))                                                                |
|   114 | PUSH1 0x40                                        | 0x40 (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト)))                                                           |
|   116 | MLOAD                                             | 0x80 (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト)))                                                           |
|   117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト))) |
|   12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト))) |
|   12D | SWAP2                                             | (((Storage[3]、別名、このコントラクトがプロキシとなっているコントラクト))) 0xFF...FF 0x80 |
|   12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                            |
|   12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                       |
|   130 | MSTORE                                            | 0x80                                                                                                                                                                                                                      |

そして0x80にはプロキシアドレスが含まれるようになりました

| オフセット | オペコード        | スタック      |
| ----: | ------------ | --------- |
|   131 | PUSH1 0x20   | 0x20 0x80 |
|   133 | ADD          | 0xA0      |
|   134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|   137 | JUMP         | 0xA0      |

### E4コード {#the-e4-code}

これらの行を見るのは初めてですが、他のメソッドと共有されています(以下を参照)。 スタックの値をXと呼びます。`splitter()`で、このXの値が0xA0であることを覚えておいてください。

| オフセット | オペコード      | スタック        |
| ----: | ---------- | ----------- |
|    E4 | JUMPDEST   | X           |
|    E5 | PUSH1 0x40 | 0x40 X      |
|    E7 | MLOAD      | 0x80 X      |
|    E8 | DUP1       | 0x80 0x80 X |
|    E9 | SWAP2      | X 0x80 0x80 |
|    EA | SUB        | X-0x80 0x80 |
|    EB | SWAP1      | 0x80 X-0x80 |
|    EC | RETURN     |             |

したがって、このコードは、スタック(X)内のメモリのポインターを受け取ります。これにより、コントラクトが0x80～Xまでのバッファを`RETURN`します。

`splitter()`の場合、これは現在のコントラクトがプロキシとなっているアドレスを返します。 `RETURN`は、0x80～0x9Fのバッファを返します。これは、このデータを書き込んだ場所です(上記のオフセット0x130)。

## currentWindow() {#currentwindow}

オフセット0x158～0x163のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、`currentWindow()`も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                                                                     |
| ----: | ------------ | ------------------------------------------------------------------------ |
|   164 | JUMPDEST     |                                                                          |
|   165 | POP          |                                                                          |
|   166 | PUSH2 0x00da | 0xDA                                                                     |
|   169 | PUSH1 0x01   | 0x01 0xDA                                                                |
|   16B | SLOAD        | Storage[1] 0xDA      |
|   16C | DUP2         | 0xDA Storage[1] 0xDA |
|   16D | JUMP         | Storage[1] 0xDA      |

### DAコード {#the-da-code}

このコードもまた他のメソッドと共有されます。 スタックの値をYと呼びます。`currentWindow()`で、このYの値がStorage[1]であることを覚えておいてください。

| オフセット | オペコード      | スタック             |
| ----: | ---------- | ---------------- |
|    DA | JUMPDEST   | Y 0xDA           |
|    DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|    DD | MLOAD      | 0x80 Y 0xDA      |
|    DE | SWAP1      | Y 0x80 0xDA      |
|    DF | DUP2       | 0x80 Y 0x80 0xDA |
|    E0 | MSTORE     | 0x80 0xDA        |

0x80～0x9FにYを書き込みます。

| オフセット | オペコード      | スタック           |
| ----: | ---------- | -------------- |
|    E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|    E3 | ADD        | 0xA0 0xDA      |

残りはすでに、[上記](#the-e4-code)で説明されています。 0xDAにジャンプして、スタックの先頭(Y)を0x80～0x9Fに書き込み、その値を返します。 `currentWindow()`の場合、Storage[1]を返します。

## merkleRoot() {#merkleroot}

オフセット0xED～0xF8のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、`merkleRoot()`も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                                                                     |
| ----: | ------------ | ------------------------------------------------------------------------ |
|    F9 | JUMPDEST     |                                                                          |
|    FA | POP          |                                                                          |
|    FB | PUSH2 0x00da | 0xDA                                                                     |
|    FE | PUSH1 0x00   | 0x00 0xDA                                                                |
|   100 | SLOAD        | Storage[0] 0xDA      |
|   101 | DUP2         | 0xDA Storage[0] 0xDA |
|   102 | JUMP         | Storage[0] 0xDA      |

ジャンプの後に何が起こるかは、[すでに分かっています](#the-da-code)。 つまり、`merkleRoot()`は、Storage[0]を返します。

## 0x81e580d3 {#0x81e580d3}

オフセット0x138～0x143のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、この関数も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                                                                          |
| ----: | ------------ | ----------------------------------------------------------------------------- |
|   144 | JUMPDEST     |                                                                               |
|   145 | POP          |                                                                               |
|   146 | PUSH2 0x00da | 0xDA                                                                          |
|   149 | PUSH2 0x0153 | 0x0153 0xDA                                                                   |
|   14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                      |
|   14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                 |
|   14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                          |
|   152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                 |
|   18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                 |
|   190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|   192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                       |
|   194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                  |
|   195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                     |
|   196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                        |
|   197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|   198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                         |
|   199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                  |
|   19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                            |

この関数は、コールデータに少なくとも32バイト(1ワード)を必要とするようです。

| オフセット | オペコード  | スタック                                         |
| ----: | ------ | -------------------------------------------- |
|   19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|   19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|   19F | REVERT |                                              |

コールデータを取得しなかった場合、トランザクションはリターンデータなしで元に戻されます。

この関数が、必要なコールデータを取得した場合、何が起こるか見ていきましょう。

| オフセット | オペコード        | スタック                                                        |
| ----: | ------------ | ----------------------------------------------------------- |
|   1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|   1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|   1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`は、メソッドシグネチャの_後_にあるコールデータの最初のワードです

| オフセット | オペコード        | スタック                                                                                                                                                                                                               |
| ----: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                        |
|   1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                        |
|   1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                     |
|   1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                            |
|   153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                            |
|   154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                     |
|   157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                            |
|   16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                            |
|   16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                       |
|   171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                    |
|   172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                               |
|   173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                     |
|   174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                  |
|   175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|   176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|   179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                    |

最初のワードがStorage[4]以上の場合、この関数は失敗します。 次のように、戻り値なしで元に戻されます。

| オフセット | オペコード      | スタック                                                          |
| ----: | ---------- | ------------------------------------------------------------- |
|   17A | PUSH1 0x00 | 0x00 ...      |
|   17C | DUP1       | 0x00 0x00 ... |
|   17D | REVERT     |                                                               |

calldataload(4)がStorage[4]より小さい場合、次のコードになります。

| オフセット | オペコード      | スタック                                                                                      |
| ----: | ---------- | ----------------------------------------------------------------------------------------- |
|   17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|   17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|   181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|   182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|   183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

メモリロケーション0x00～0x1Fに、データ0x04が含まれるようになりました(0x00～0x1Eはすべてゼロ、0x1Fは4)。

| オフセット | オペコード      | スタック                                                                                                                                                                                                                       |
| ----: | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                       |
|   186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                       |
|   187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                       |
|   188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                |
|   189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                |
|   18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

ストレージ内にルックアップテーブルがあり、0x000...0004のSHA3から始まります。さらに、すべて正当なコールデータ値(Storage[4]より小さい値)のエントリが含まれています。

| オフセット | オペコード | スタック                                                                                                                                                                                                                       |
| ----: | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   18B | SWAP1 | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|   18C | POP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|   18D | DUP2  | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|   18E | JUMP  | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

オフセット0xDAのコードが何をしているかは[すでに分かっています](#the-da-code)。これは、スタックの先頭の値を呼び出し元に返します。 そのため、この関数はルックアップテーブルにある値を呼び出し元に返します。

## 0x1f135823 {#0x1f135823}

オフセット0xC4～0xCFのコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、この関数も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック              |
| ----: | ------------ | ----------------- |
|    D0 | JUMPDEST     |                   |
|    D1 | POP          |                   |
|    D2 | PUSH2 0x00da | 0xDA              |
|    D5 | PUSH1 0x06   | 0x06 0xDA         |
|    D7 | SLOAD        | Value\* 0xDA      |
|    D8 | DUP2         | 0xDA Value\* 0xDA |
|    D9 | JUMP         | Value\* 0xDA      |

オフセット0xDAのコードが何をしているかは[すでに分かっています](#the-da-code)。これは、スタックの先頭の値を呼び出し元に返します。 そのため、この関数は`Value*`を返します。

### メソッドの概要 {#method-summary}

この時点でコントラクトを理解したと思えますか? 私は思えません。 これまで、次のようなメソッドを見てきました。

| メソッド                                                 | 意味                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 送金                                                   | 呼び出しによって提供された値を受け入れ、その額で`Value*`を増やす                                                            |
| [splitter()](#splitter)           | Storage[3] (プロキシアドレス)を返す |
| [currentWindow()](#currentwindow) | Storage[1]を返す                               |
| [merkleRoot()](#merkleroot)       | Storage[0]を返す                               |
| [0x81e580d3](#0x81e580d3)                            | パラメータがStorage[4]より小さい場合、ルックアップテーブルにある値を返す   |
| [0x1f135823](#0x1f135823)                            | Storage[6] (別名、 Value\*) |

しかし、他の機能がStorage[3]のコントラクトによって提供されていることが分かっています。 そのコントラクトについて何か分かれば、手掛かりになるかもしれません。 幸いにも、これはブロックチェーンであり、少なくとも理論的にはすべてが既知です。 Storage[3]を設定するメソッドは何も見られなかったため、コンストラクタによって設定されているはずです。

## コンストラクタ {#the-constructor}

[コントラクトを見る](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)と、それを生成したトランザクションも確認できます。

![作成トランザクションをクリック](create-tx.png)

そのトランザクションをクリックして**State**タブをクリックすると、パラメータの初期値を確認できます。 具体的には、Storage[3]に[0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)が含まれていることがわかります。 このコントラクトに、不足している機能が含まれているはずです。 調査中のコントラクトに使用した同じツールを使うことで、それを理解できます。

## プロキシコントラクト {#the-proxy-contract}

上記のオリジナルのコントラクトで使用したのと同じ手法を使用すると、次の場合にコントラクトが元に戻されることが分かります。

- 呼び出しにETHが添付されている(0x05-0x0F)
- コールデータのサイズが4未満(0x10-0x19および0xBE-0xC2)

サポートされるメソッドは次のとおりです。

| メソッド                                                                                                                                                                                   | メソッドシグネチャ                    | ジャンプ先のオフセット |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135      |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151      |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4      |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110      |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118      |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107      |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122      |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8      |

下の4つのメソッドに到達することはないので、無視しても問題ありません。 それらのシグネチャは、オリジナルのコントラクトが単独で処理します(シグネチャをクリックすると、上記の詳細が表示されます)。そのため、[オーバーライドされたメソッド](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)である必要があります。

残りのメソッドの1つが`claim(<params>)`、もう一つが`isClaimed(<params>)`であり、エアドロップコントラクトのように見えます。 ここからは、オペコードごとに調べる代わりに、[デコンパイラ](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)を使用します。デコンパイラは、このコントラクトの3つの関数について利用可能な結果を生成します。 他の関数のリバースエンジニアリングは、読者の演習として残しておきます。

### scaleAmountByPercentage {#scaleamountbypercentage}

この関数についてデコンパイラが提供した内容は、次のとおりです。

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:\n  require calldata.size - 4 >=′ 64\n  if _param1 and _param2 > -1 / _param1:\n      revert with 0, 17\n  return (_param1 * _param2 / 100 * 10^6)
```

最初の`require`では、コールデータ内に2つのパラメータにとって十分なサイズ、つまり関数シグネチャの4バイトに加え少なくとも64バイトあるかどうかをテストしています。 そうでない場合、問題があるのは明らかです。

`if`文は、`_param1`がゼロでないこと、さらに`_param1 * _param2`が負でないことを確認していると思われます。 これは、ラップアラウンドを防ぐためでしょう。

最後に、この関数はスケーリング値を返します。

### claim {#claim}

デコンパイラが作成するコードは複雑であり、すべてが重要なわけではありません。 役立つ情報を提供していると思われる行に焦点を当てるので、一部をスキップします。

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:\n  ...\n  require _param2 == addr(_param2)\n  ...\n  if currentWindow <= _param1:\n      revert with 0, '将来のウィンドウに対して請求することはできません'
```

ここでは、重要事項が2つあります。

- `_param2`は、`uint256`として宣言されていますが、実際にはアドレスです
- `_param1`は、請求対象のウィンドウであり、`currentWindow`であるか、それ以前のウィンドウである必要があります。

```python
  ...\n  if stor5[_claimWindow][addr(_claimFor)]:\n      revert with 0, 'アカウントはすでに指定されたウィンドウで請求済みです'
```

そのため、Storage[5]はウィンドウとアドレスの配列であり、アドレスがウィンドウの報酬を請求したかどうかが分かります。

```python
  ...\n  idx = 0\n  s = 0\n  while idx < _param4.length:\n  ...\n      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:\n          mem[mem[64] + 32] = mem[(32 * idx) + 296]\n          ...\n          s = sha3(mem[_62 + 32 len mem[_62]])\n          continue\n      ...\n      s = sha3(mem[_66 + 32 len mem[_66]])\n      continue\n  if unknown2eb4a7ab != s:\n      revert with 0, '無効な証明です'
```

`unknown2eb4a7ab`は実際には`merkleRoot()`関数であることがわかっているので、このコードは[マークル証明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)を検証しているようです。 これは、`_param4`がマークル証明であることを意味します。

```python
  call addr(_param2) with:\n     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei\n       gas 30000 wei
```

これは、コントラクトが自身のETHを別のアドレス(コントラクトまたは外部所有)に送金する方法です。 送金する金額の値で呼び出します。 これはETHのエアドロップであると思われます。

```python
  if not return_data.size:\n      if not ext_call.success:\n          require ext_code.size(stor2)\n          call stor2.deposit() with:\n             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

下の2行は、Storage[2]も呼び出すコントラクトであることを示しています。 [コンストラクタのトランザクション](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)を見ると、このコントラクトが[0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) (Wrapped Etherコントラクトで、[そのソースコードはEtherscanにアップロードされています](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)) であることがわかります。

このコントラクトは、`_param2`にETHを送金しようとしていると思われます。 送金できれば問題ありません。 そうでなければ、[WETH](https://weth.tkn.eth.limo/)を送ろうと試みます。 `_param2`が外部所有アカウント (EOA)である場合、必ずETHを受け取ることができますが、コントラクトはETHの受け取りを拒否することができます。 しかし、WETHはERC-20であるため、コントラクトは受け取りを拒否できません。

```python
  ...\n  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

関数の最後に、ログエントリが生成されていることがわかります。 [生成されたログエントリ](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)を確認し、`0xdbd5...`で始まるトピックでフィルタリングします。 [そのようなエントリを生成したトランザクションの1つをクリックすると](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)、実際に請求のように見えることがわかります。アカウントは、リバースエンジニアリングしているコントラクトにメッセージを送信し、代わりにETHを取得しています。

![請求トランザクション](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

この関数は、上記の[`claim`](#claim)と非常に類似しています。 この関数はマークル証明も同様に確認し、ETHを最初に送金しようと試み、同じタイプのログエントリを生成します。

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:\n  ...\n  idx = 0\n  s = 0\n  while idx < _param3.length:\n      if idx >= mem[96]:\n          revert with 0, 50\n      _55 = mem[(32 * idx) + 128]\n      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:\n          ...\n          s = sha3(mem[_58 + 32 len mem[_58]])\n          continue\n      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])\n  ...\n  if unknown2eb4a7ab != s:\n      revert with 0, '無効な証明です'\n  ...\n  call addr(_param1) with:\n     value s wei\n       gas 30000 wei\n  if not return_data.size:\n      if not ext_call.success:\n          require ext_code.size(stor2)\n          call stor2.deposit() with:\n             value s wei\n               gas gas_remaining wei\n  ...\n  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

主な違いは、最初のパラメータである引き出しを行うためのウィンドウがないことです。 代わりに、請求対象となるすべてのウィンドウについてのループがあります。

```python
  idx = 0\n  s = 0\n  while idx < currentWindow:\n      ...\n      if stor5[mem[0]]:\n          if idx == -1:\n              revert with 0, 17\n          idx = idx + 1\n          s = s\n          continue\n      ...\n      stor5[idx][addr(_param1)] = 1\n      if idx >= unknown81e580d3.length:\n          revert with 0, 50\n      mem[0] = 4\n      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:\n          revert with 0, 17\n      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):\n          revert with 0, 17\n      if idx == -1:\n          revert with 0, 17\n      idx = idx + 1\n      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)\n      continue
```

そのため、すべてのウィンドウについて請求する`claim`の変種のようです。

## 結論 {#conclusion}

ここまでで、オペコードまたは(動作する場合は)デコンパイラを使用して、ソースコードが入手できないコントラクトを理解する方法を身に付けられたはずです。 この記事の長さが示しているように、コントラクトのリバースエンジニアリングは簡単ではありません。しかしながら、セキュリティが不可欠なシステムでは、コントラクトが想定した通りに動作しているかを検証できることは、非常に重要なスキルです。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
