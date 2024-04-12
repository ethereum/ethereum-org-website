---
title: "コントラクトのリバースエンジニアリング"
description: ソースコードがない場合にコントラクトを理解する方法
author: Ori Pomerantz
lang: ja
tags:
  - "イーサリアム仮想マシン(EVM)"
  - "オペコード"
skill: advanced
published: 2021-12-30
---

## はじめに {#introduction}

_ブロックチェーン上に秘密はありません。_ブロックチェーン上で起こる全てのことは、一貫性があり、検証可能で、公開されています。 理想的には、[コントラクトはEtherscanで公開され、検証されたソースコードであるべきです](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。 しかし、[必ずしもそうとは限りません](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。 この記事では、ソースコード([`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f))を見ることなくコントラクトをリバースエンジニアリングする方法を学びます。

リバースコンパイラを使用しても、必ず[利用可能な結果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)が生成されるわけではありません。 この記事では、手動でリバースエンジニアリングを実行し、[オペコード](https://github.com/wolflo/evm-opcodes)からコントラクトを理解する方法を学びます。また、デコンパイラによる結果を理解する方法も学びます。

この記事を理解するには、イーサリアム仮想マシン(EVM)の基礎を理解しており、イーサリアム仮想マシン(EVM)アセンブラにある程度精通している必要があります。 [イーサリアム仮想マシン(EVM)に関するトピックについてはこちら](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)をご覧ください。

## 実行可能コードの準備 {#prepare-the-executable-code}

Etherscanにアクセスするとコントラクトのオペコードを入手できます。「**Contract**」タブをクリックし、次に「**Switch to Opcodes View**」をクリックしてください。 これで一行ずつオペコートが表示されます。

![Etherscanでのオペコードの表示](opcode-view.png)

ジャンプ (JUMP) を理解するには、コード内のオペコードの場所を理解する必要があります。 そのための1つの方法は、Googleスプレッドシートを開き、オペコードをC列に貼り付けることです。[既に準備されているこのスプレッドシートをコピーすれば、次のステップをスキップできます](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

次のステップは、正しいコードの位置を取得することです。これで、ジャンプを理解できるようになります。 オペコードのサイズをB列に、場所(16進数)をA列に配置します。`B1`セルに以下の関数を入力し、それをB列の残りの部分にコードの最終行までコピーアンドペーストします。 これを行った後、B列を非表示にできます。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

この関数は、まず1バイトをオペコード自体に追加し、次に`PUSH`を探します。 PUSHは特殊なオペコードであり、プッシュされる値用に追加のバイトを保持する必要があります。 オペコードが`PUSH`の場合、バイト数を抽出して加算します。

`A1`に最初のオフセットである0を配置します。 次に`A2`に下記の関数を配置し、A列の残りの部分にコピーアンドペーストします。

```
=dec2hex(hex2dec(A1)+B1)
```

ジャンプ(`JUMP`と`JUMPI`)の前にプッシュされる値は16進数で渡されるため、この関数で16進数の値を得る必要があります。

## エントリーポイント(0x00) {#the-entry-point-0x00}

コントラクトは、必ず最初のバイトから実行されます。 以下は、コードの冒頭部分です。

| オフセット | オペコード        | スタック(オペコードの後)       |
| -----:| ------------ | ------------------- |
|     0 | PUSH1 0x80   | 0x80                |
|     2 | PUSH1 0x40   | 0x40, 0x80          |
|     4 | MSTORE       | なし                  |
|     5 | PUSH1 0x04   | 0x04                |
|     7 | CALLDATASIZE | CALLDATASIZE 0x04   |
|     8 | LT           | CALLDATASIZE<4      |
|     9 | PUSH2 0x005e | 0x5E CALLDATASIZE<4 |
|     C | JUMPI        | なし                  |

このコードは、次の2つのことをしています。

1. メモリロケーションの0x40~0x5Fへ、32バイト値として0x80を書き込みます(0x5Fに0x80が格納され、0x40～0x5Eはすべてゼロになります)。
2. コールデータサイズ(CALLDATASIZE)を読み取ります。 通常、イーサリアムコントラクトのコールデータは、[アプリケーションバイナリインターフェース(ABI)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)に従います。アプリケーションバイナリインターフェース(ABI)では、最低でも4バイトが関数セレクタに必要です。 コールデータのサイズが4未満の場合、0x5Eへジャンプします。

![この部分のフローチャート](flowchart-entry.png)

### 0x5Eのハンドラ(非アプリケーションバイナリインターフェース(ABI)コールデータの処理) {#the-handler-at-0x5e-for-non-abi-call-data}

| オフセット | オペコード        |
| -----:| ------------ |
|    5E | JUMPDEST     |
|    5F | CALLDATASIZE |
|    60 | PUSH2 0x007c |
|    63 | JUMPI        |

このスニペットは、`JUMPDEST`で始まります。 イーサリアム仮想マシン(EVM)プログラムは、`JUMPDEST`ではないオペコードにジャンプした場合に例外を投げます。 次に、CALLDATASIZEを確認し、それが「true」の場合(ゼロではない場合)、0x7Cにジャンプします。 これについては後述します。

| オフセット | オペコード      | スタック(オペコードの後)                                                         |
| -----:| ---------- | --------------------------------------------------------------------- |
|    64 | CALLVALUE  | 呼び出しによって[Wei](/glossary/#wei)が提供されます。 Solidityでは、`msg.value`が呼び出されます。 |
|    65 | PUSH1 0x06 | 6 CALLVALUE                                                           |
|    67 | PUSH1 0x00 | 0 6 CALLVALUE                                                         |
|    69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                               |
|    6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                             |
|    6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                    |

コールデータがない場合、Storage[6]の値を読み取ります。 このStorage[6] の値はまだわかりませんが、コールデータなしで受信したコントラクトのトランザクションを探すことはできます。 コールデータなしで(つまりメソッドなしで)ETHを送金するだけのトランザクションの場合、Etherscanに`Transfer`メソッドがあります。 実際、[コントラクトが受信した最初のトランザクション](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)は、送金(transfer)です。

このトランザクションを調べるには、「**Click to show more**」をクリックします。コールデータ(Input Dataと表示される)が実際に空(`0x`)であることが分かります。 また、値が1.559ETHであることに留意してください。これに関しては、後述します。

![コールデータが空](calldata-empty.png)

次に「**State**」タブをクリックし、リバースエンジニアリングしているコントラクト(0x2510...)を展開します。 トランザクション中に `Storage[6]` が変更されたことが分かります。「Hex」から「**Number**」に変更すると、次のコントラクトの値に応じてweiに変換された値、1,559,000,000,000,000,000になります(分かりやすくするためにコンマを追加しています) 。

![Storage[6]の変化](storage6.png)

[同時期の他の`Transfer`トランザクション](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)によって引き起こされた状態変更を確認すると、`Storage[6]`がしばらくの間、コントラクトの値を追跡していたことが分かります。 これを今から`Value*`と呼びます。 アスタリスク (`*`) は、この変数が何をするかまだ_分からない_ことを思い起こさせます。しかし、コントラクトの値を追跡するだけのものではありません。`ADDRESS BALANCE`を使用してアカウント残高を取得できる場合には、非常に高価なストレージを使う必要がないからです。 最初のオペコードは、コントラクト自体のアドレスをプッシュ(PUSH)します。 2番目のオペコードは、スタックの上部にあるアドレスを読み込み、そのアドレスの残高で置き換えます。

| オフセット | オペコード        | スタック                                          |
| -----:| ------------ | --------------------------------------------- |
|    6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|    6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|    70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    74 | JUMP         |                                               |

ジャンプ先(JUMPDEST)でも、このコードのトレースを続けます。

| オフセット | オペコード      | スタック                                                          |
| -----:| ---------- | ------------------------------------------------------------- |
|   1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|   1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|   1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|   1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT`は、ビットごとのNOTであるため、コール値内の全てのビット値を反転します。

| オフセット | オペコード        | スタック                                                                            |
| -----:| ------------ | ------------------------------------------------------------------------------- |
|   1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|   1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|   1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|   1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|   1B2 | JUMPI        |                                                                                 |

`Value*`の値が、2^256-CALLVALUE-1以下の場合にジャンプ(JUMP)します。 これは、オーバーフローを防ぐためのロジックに見えます。 実際に、オフセット0X01DEでいくつかの無意味な操作(例: 削除される寸前にメモリへの書き込み)をした後、オーバーフローが検出されると、標準の動作としてコントラクトが元に戻されます。

このようなオーバーフローが発生する可能性は、非常に低いことに留意してください。これは、コール値に`Value*`を加えたものが、2^256 wei(約10^59 ETH)と同等になる必要があるためです。 [ETHの総供給量は、この記事の執筆時点で2億未満です](https://etherscan.io/stat/supply)。

| オフセット | オペコード    | スタック                                        |
| -----:| -------- | ------------------------------------------- |
|   1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|   1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|   1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|   1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|   1E3 | JUMP     |                                             |

ここに到達した場合、`Value* + CALLVALUE`を取得して、オフセット0x75へジャンプします。

| オフセット | オペコード    | スタック                              |
| -----:| -------- | --------------------------------- |
|    75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|    76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|    77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|    78 | SSTORE   | 0 CALLVALUE                       |

ここに到達した場合(コールデータが空である必要があります)、`Value*`にコール値を加えます。 これは、`Transfer`トランザクションが行うことと一致しています。

| オフセット | オペコード |
| -----:| ----- |
|    79 | POP   |
|    7A | POP   |
|    7B | STOP  |

最後に、スタックをクリアし(任意)、トランザクションが正常に終了したことを通知します。

まとめると、最初のコードのフローチャートは次のようになります。

![エントリポイントフローチャート](flowchart-entry.png)

## 0x7Cのハンドラ {#the-handler-at-0x7c}

意図的にこのハンドラが何をするか見出しに入れませんでした。 特定のコントラクトの動作を教えるのではなく、どのようにコントラクトをリバースエンジニアリングするかを学ぶのがポイントだからです。 同じ方法で、コードを追って何をするか学ぶことができます。

ここへ到達するのは、次のような場合です。

- (オフセット0x63から)1バイト、2バイトまたは3バイトのコールデータががある場合
- (オフセット0x42と0x5Dから)メソッドのシグネチャが不明な場合

| オフセット | オペコード        | スタック                 |
| -----:| ------------ | -------------------- |
|    7C | JUMPDEST     |                      |
|    7D | PUSH1 0x00   | 0x00                 |
|    7F | PUSH2 0x009d | 0x9D 0x00            |
|    82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|    84 | SLOAD        | Storage[3] 0x9D 0x00 |

これは別のストレージセルです。このセルはどのトランザクションにも見つからなかったので、これが何を意味しているのか理解するのは困難です。 しかし、以下のコードがこれを明確にします。

| オフセット | オペコード                                             | スタック                            |
| -----:| ------------------------------------------------- | ------------------------------- |
|    85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|    9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

これらのオペコードは、Storage[3]から読み取った値を160ビットに切り捨てています。これは、イーサリアムアドレスの長さです。

| オフセット | オペコード | スタック                            |
| -----:| ----- | ------------------------------- |
|    9B | SWAP1 | 0x9D Storage[3]-as-address 0x00 |
|    9C | JUMP  | Storage[3]-as-address 0x00      |

次のオペコードに進むため、このジャンプ(JUMP)は不要です。 このコードは、ガス効率が良くありません。

| オフセット | オペコード      | スタック                            |
| -----:| ---------- | ------------------------------- |
|    9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|    9E | SWAP1      | 0x00 Storage[3]-as-address      |
|    9F | POP        | Storage[3]-as-address           |
|    A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|    A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

コードの最初で、Mem[0x40]を0x80に設定しました。 その後の0x40を確かめると変更していないことが分かります。つまり、これは0x80であると推測できます。

| オフセット | オペコード        | スタック                                              |
| -----:| ------------ | ------------------------------------------------- |
|    A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|    A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|    A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|    A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

0x80から始まるすべてのコールデータ(CALLDATA)をメモリにコピーします。

| オフセット | オペコード         | スタック                                                                             |
| -----:| ------------- | -------------------------------------------------------------------------------- |
|    A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|    AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|    AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|    AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|    AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|    AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|    AF | DELEGATE_CALL |                                                                                  |

これで、かなり明確になりました。 このコントラクトは、[プロキシ](https://blog.openzeppelin.com/proxy-patterns/)として機能しており、Storage[3] 内のアドレスを呼び出して、実際の作業をしています。 `DELEGATE_CALL`は、別のコントラクトを呼び出しますが、同じストレージ内に留まります。 つまり、委任されたコントラクト(現在のコントラクトがこのコントラクトのプロキシとなります)が、同じストレージスペースにアクセスします。 コール(呼び出し)のパラメータは次の通りです。

- _ガス_: 残りのガス
- _呼び出されたアドレス_: Storage[3]-as-address
- _コールデータ_: 元のコールデータを配置する、0x80から始まるCALLDATASIZEバイト
- _リターンデータ_: なし(0x00 - 0x00)。リターンデータは他の方法で取得(以下を参照)

| オフセット | オペコード          | スタック                                                                                          |
| -----:| -------------- | --------------------------------------------------------------------------------------------- |
|    B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|    B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|    B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

ここでは、すべてのリターンデータを0x80から始まるメモリバッファにコピーします。

| オフセット | オペコード        | スタック                                                                                                                         |
| -----:| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|    B6 | DUP2         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|    B7 | DUP1         | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|    B8 | ISZERO       | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    B9 | PUSH2 0x00c0 | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    BC | JUMPI        | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|    BD | DUP2         | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|    BE | DUP5         | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|    BF | RETURN       |                                                                                                                              |

リターンデータをバッファ(0x80～0x80+RETURNDATASIZE)にコピーする呼び出しの後、その呼び出しが成功した場合は、そのバッファを正確に返します(`RETURN`します)。

### DELEGATECALLの失敗 {#delegatecall-failed}

0xC0に到達した場合は、現在のコントラクトが呼び出したコントラクトが、元に戻された(REVERTされた)ことを意味します。 現在のコントラクトはこのコントラクトの単なるプロキシであるため、現在のコントラクトも同じデータを返して、元に戻す(REVERTする)必要があります。

| オフセット | オペコード    | スタック                                                                                                                |
| -----:| -------- | ------------------------------------------------------------------------------------------------------------------- |
|    C0 | JUMPDEST | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|    C1 | DUP2     | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|    C2 | DUP5     | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|    C3 | REVERT   |                                                                                                                     |

そのため、前に`RETURN`で使用した同じバッファ(0x80～0x80+RETURNDATASIZE)を元に戻します(`REVERT`します)。

![プロキシするための呼び出しのフローチャート](flowchart-proxy.png)

## アプリケーションバイナリインターフェース(ABI)呼び出し {#abi-calls}

コールデータのサイズが4バイト以上である場合、有効なアプリケーションバイナリインターフェース(ABI)呼び出しである可能性があります。

| オフセット | オペコード        | スタック                                              |
| -----:| ------------ | ------------------------------------------------- |
|     D | PUSH1 0x00   | 0x00                                              |
|     F | CALLDATALOAD | (((First word (256 bits) of the call data)))      |
|    10 | PUSH1 0xe0   | 0xE0 (((First word (256 bits) of the call data))) |
|    12 | SHR          | (((first 32 bits (4 bytes) of the call data)))    |

Etherscanでは、`1C`が未知のオペコードとなっていますが、これは[Etherscanでこの機能が作成された後に追加された](https://eips.ethereum.org/EIPS/eip-145)ため、まだ反映がされていないのが理由です。 [最新のオペコードテーブル](https://github.com/wolflo/evm-opcodes)では、これが右シフトであることが示されています

| オフセット | オペコード            | スタック                                                                                                     |
| -----:| ---------------- | -------------------------------------------------------------------------------------------------------- |
|    13 | DUP1             | (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data)))            |
|    14 | PUSH4 0x3cd8045e | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|    19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|    1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|    1D | JUMPI            | (((first 32 bits (4 bytes) of the call data)))                                                           |

このようにメソッドシグネチャのマッチングテストを2つに分割することで、平均的にテストの半分を節約できます。 その直後のコードと0x43のコードは、コールデータの最初の32ビットの複製(`DUP1`)、プッシュ(`PUSH4 (((method signature>`)、`EQ`を実行し等式を判定、メソッドシグネチャがマッチした場合は`JUMPI`、という同じパターンをたどります。 以下に、メソッドシグネチャ、そのアドレス、既知の場合は[対応するメソッド定義](https://www.4byte.directory/)を示します。

| メソッド                                                                                   | メソッドシグネチャ  | ジャンプ先のオフセット |
| -------------------------------------------------------------------------------------- | ---------- | ----------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e | 0x0103      |
| ???                                                                                    | 0x81e580d3 | 0x0138      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4 | 0x0158      |
| ???                                                                                    | 0x1f135823 | 0x00C4      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab | 0x00ED      |

一致するものが見つからない場合、そのコードは、現在のコントラクトがプロキシとなっているコントラクトに一致するものがあることを期待して、[0x7Cのプロキシハンドラ](#the-handler-at-0x7c)へジャンプします。

![アプリケーションバイナリインターフェース(ABI)呼び出しのフローチャート](flowchart-abi.png)

## splitter() {#splitter}

| オフセット | オペコード        | スタック                          |
| -----:| ------------ | ----------------------------- |
|   103 | JUMPDEST     |                               |
|   104 | CALLVALUE    | CALLVALUE                     |
|   105 | DUP1         | CALLVALUE CALLVALUE           |
|   106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|   107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|   10A | JUMPI        | CALLVALUE                     |
|   10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|   10D | DUP1         | 0x00 0x00 CALLVALUE           |
|   10E | REVERT       |                               |

この関数が最初に行うことは、呼び出しがETHを送金していないことを確認することです。 この関数は、[`payable`](https://solidity-by-example.org/payable/)ではありません。 誰かがETHを送金してきた場合は、何かの間違いです。ETHを戻せなくなる前に元に戻す(`REVERT`する)必要があります。

| オフセット | オペコード                                             | スタック                                                                        |
| -----:| ------------------------------------------------- | --------------------------------------------------------------------------- |
|   10F | JUMPDEST                                          |                                                                             |
|   110 | POP                                               |                                                                             |
|   111 | PUSH1 0x03                                        | 0x03                                                                        |
|   113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|   114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|   116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|   117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|   12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|   12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|   12E | AND                                               | ProxyAddr 0x80                                                              |
|   12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|   130 | MSTORE                                            | 0x80                                                                        |

0x80にはプロキシアドレスが含まれるようになりました。

| オフセット | オペコード        | スタック      |
| -----:| ------------ | --------- |
|   131 | PUSH1 0x20   | 0x20 0x80 |
|   133 | ADD          | 0xA0      |
|   134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|   137 | JUMP         | 0xA0      |

### E4のコード {#the-e4-code}

これらの行を見るのは初めてですが、他のメソッドと共有されています(以下を参照)。 スタックXの値を呼び出します。`splitter()`で、このXの値が0xA0であることを覚えておいてください。

| オフセット | オペコード      | スタック        |
| -----:| ---------- | ----------- |
|    E4 | JUMPDEST   | X           |
|    E5 | PUSH1 0x40 | 0x40 X      |
|    E7 | MLOAD      | 0x80 X      |
|    E8 | DUP1       | 0x80 0x80 X |
|    E9 | SWAP2      | X 0x80 0x80 |
|    EA | SUB        | X-0x80 0x80 |
|    EB | SWAP1      | 0x80 X-0x80 |
|    EC | RETURN     |             |

したがって、このコードは、スタック(X)内のメモリのポインターを受け取ります。これにより、コントラクトが0x80～Xまでのバッファを返します(`RETURN`します)。

`splitter()`の場合、これは現在のコントラクトがプロキシとなっているアドレスを返します。 `RETURN`は、0x80～0x9Fのバッファを返します。これは、このデータを書き込んだ場所です(上記のオフセット0x130)。

## currentWindow() {#currentwindow}

オフセット0x158～0x163のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、`currentWindow()`も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                 |
| -----:| ------------ | -------------------- |
|   164 | JUMPDEST     |                      |
|   165 | POP          |                      |
|   166 | PUSH2 0x00da | 0xDA                 |
|   169 | PUSH1 0x01   | 0x01 0xDA            |
|   16B | SLOAD        | Storage[1] 0xDA      |
|   16C | DUP2         | 0xDA Storage[1] 0xDA |
|   16D | JUMP         | Storage[1] 0xDA      |

### DAのコード {#the-da-code}

このコードもまた他のメソッドと共有されます。 スタックYの値を呼び出します。`currentWindow()`で、このYの値がStorage[1]であることを覚えておいてください。

| オフセット | オペコード      | スタック             |
| -----:| ---------- | ---------------- |
|    DA | JUMPDEST   | Y 0xDA           |
|    DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|    DD | MLOAD      | 0x80 Y 0xDA      |
|    DE | SWAP1      | Y 0x80 0xDA      |
|    DF | DUP2       | 0x80 Y 0x80 0xDA |
|    E0 | MSTORE     | 0x80 0xDA        |

0x80～0x9FにYを書き込みます。

| オフセット | オペコード      | スタック           |
| -----:| ---------- | -------------- |
|    E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|    E3 | ADD        | 0xA0 0xDA      |

残りはすでに、[上記](#the-e4-code)で説明されています。 0xDAにジャンプして、スタックの先頭(Y)を0x80～0x9Fに書き込み、その値を返します。 `currentWindow()`の場合、Storage[1]を返します。

## merkleRoot() {#merkleroot}

オフセット0xED～0xF8のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、`merkleRoot()`も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                 |
| -----:| ------------ | -------------------- |
|    F9 | JUMPDEST     |                      |
|    FA | POP          |                      |
|    FB | PUSH2 0x00da | 0xDA                 |
|    FE | PUSH1 0x00   | 0x00 0xDA            |
|   100 | SLOAD        | Storage[0] 0xDA      |
|   101 | DUP2         | 0xDA Storage[0] 0xDA |
|   102 | JUMP         | Storage[0] 0xDA      |

ジャンプ(JUMP)の後に何が起こるかは、[すでに分かっています](#the-da-code)。 つまり、`merkleRoot()`は、Storage[0]を返します。

## 0x81e580d3 {#0x81e580d3}

オフセット0x138～0x143のコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、この関数も同様に`payable`ではないことが分かりります。

| オフセット | オペコード        | スタック                                                         |
| -----:| ------------ | ------------------------------------------------------------ |
|   144 | JUMPDEST     |                                                              |
|   145 | POP          |                                                              |
|   146 | PUSH2 0x00da | 0xDA                                                         |
|   149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|   14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|   14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|   14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|   152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|   18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|   190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|   192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|   194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|   195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|   196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|   197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|   198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|   199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|   19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

この関数は、コールデータに少なくとも32バイト(1ワード)を必要とするようです。

| オフセット | オペコード  | スタック                                         |
| -----:| ------ | -------------------------------------------- |
|   19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|   19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|   19F | REVERT |                                              |

コールデータを取得しなかった場合、トランザクションはリターンデータなしで元に戻されます。

この関数が、必要なコールデータを_取得した_場合、何が起こるか見ていきましょう。

| オフセット | オペコード        | スタック                                     |
| -----:| ------------ | ---------------------------------------- |
|   1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|   1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|   1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`は、メソッドシグネチャの_後にある_コールデータの最初のワードです。

| オフセット | オペコード        | スタック                                                                         |
| -----:| ------------ | ---------------------------------------------------------------------------- |
|   1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|   1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|   1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|   1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|   153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|   154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|   157 | JUMP         | calldataload(4) 0xDA                                                         |
|   16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|   16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|   171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|   172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|   173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|   174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|   175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|   176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|   179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

最初のワードがStorage[4]以上の場合、この関数は失敗します。 次のように、戻り値(リターンバリュー)なしで元に戻されます。

| オフセット | オペコード      | スタック          |
| -----:| ---------- | ------------- |
|   17A | PUSH1 0x00 | 0x00 ...      |
|   17C | DUP1       | 0x00 0x00 ... |
|   17D | REVERT     |               |

calldataload(4)がStorage[4]より小さい場合、次のコードになります。

| オフセット | オペコード      | スタック                                                |
| -----:| ---------- | --------------------------------------------------- |
|   17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|   17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|   181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|   182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|   183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

メモリロケーション0x00～0x1Fに、データ0x04が含まれるようになりました(0x00～0x1Eはすべてゼロ、0x1Fは4) 。

| オフセット | オペコード      | スタック                                                                    |
| -----:| ---------- | ----------------------------------------------------------------------- |
|   184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|   186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|   187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|   188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|   189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|   18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

ストレージ内にルックアップテーブルがあり、0x000...0004のSHA3から始まります。さらに、すべて正当なコールデータ値(Storage[4]より小さい値)のエントリが含まれています。

| オフセット | オペコード | スタック                                                                    |
| -----:| ----- | ----------------------------------------------------------------------- |
|   18B | SWAP1 | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|   18C | POP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|   18D | DUP2  | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|   18E | JUMP  | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

[オフセット0xDAのコード](#the-da-code)が何をしているのかすでに分かっています。これは、スタックの先頭の値を呼び出し元に返します。 そのため、この関数はルックアップテーブルにある値を呼び出し元に返します。

## 0x1f135823 {#0x1f135823}

オフセット0xC4～0xCFのコードは、`splitter()`の0x103～0x10Eで見たものと(`JUMPI`の宛先以外は)同一であるため、この関数も同様に`payable`ではないことが分かります。

| オフセット | オペコード        | スタック                |
| -----:| ------------ | ------------------- |
|    D0 | JUMPDEST     |                     |
|    D1 | POP          |                     |
|    D2 | PUSH2 0x00da | 0xDA                |
|    D5 | PUSH1 0x06   | 0x06 0xDA           |
|    D7 | SLOAD        | Value\* 0xDA      |
|    D8 | DUP2         | 0xDA Value\* 0xDA |
|    D9 | JUMP         | Value\* 0xDA      |

[オフセット0xDAのコード](#the-da-code)が何をしているかすでに分かっています。これは、スタックの先頭の値を呼び出し元に返します。 そのため、この関数は`Value*`を返します。

### メソッドのサマリー {#method-summary}

この時点でコントラクトを理解したと思えますか? 私は思えません。 これまで、次のようなメソッドを見てきました。

| メソッド                              | 説明                                        |
| --------------------------------- | ----------------------------------------- |
| Transfer                          | 呼び出しによって提供された値を受け入れ、その額で`Value*`を増やす      |
| [splitter()](#splitter)           | Return Storage[3], the proxy address      |
| [currentWindow()](#currentwindow) | Return Storage[1]                         |
| [merkleRoot()](#merkeroot)        | Return Storage[0]                         |
| [0x81e580d3](#0x81e580d3)         | パラメータがStorage[4]より小さい場合、ルックアップテーブルにある値を返す |
| [0x1f135823](#0x1f135823)         | Return Storage[6], a.k.a. Value\*       |

しかし、他の機能がStorage[3] のコントラクトによって提供されていることが分かっています。 そのコントラクトについて何か分かれば、手掛かりになるかもしれません。 幸いにも、ブロックチェーンについては、少なくとも理論的にはすべてが分かるようになっています。 Storage[3]を設定するメソッドは何も見られなかったため、コンストラクタによって設定されているはずです。

## コンストラクタ {#the-constructor}

[コントラクト](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)を見ると、それを作成したトランザクションも確認できます。

![作成トランザクションのクリック](create-tx.png)

そのトランザクションをクリックして「**State**」タブをクリックすると、パラメータの初期値を確認できます。 具体的には、Storage[3]には[0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)が含まれていることが分かります。 このコントラクトに、不足している機能が含まれているはずです。 調査中のコントラクトに使用した同じツールを使うことで、それを理解できます。

## プロキシコントラクト {#the-proxy-contract}

上記のオリジナルのコントラクトで使用したのと同じ手法を使用すると、次の場合にコントラクトが元に戻されることが分かります。

- 呼び出し(コール)にETHが伴う(0x05～0x0F)
- コールデータのサイズが4未満(0x10～0x19と0xBE～0xC2)

サポートされるメソッドは次のとおりです。

| メソッド                                                                                                            | メソッドシグネチャ                    | ジャンプ先のオフセット |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135      |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151      |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4      |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110      |
| ???                                                                                                             | 0x3f26479e                   | 0x0118      |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107      |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122      |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8      |

下の4つのメソッドに到達することはないので、無視しても問題ありません。 それらのシグネチャは、オリジナルのコントラクトが単独で処理します(シグネチャをクリックすると、上記の詳細が表示されます)。そのため、[オーバーライドされたメソッド](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)である必要があるためです。

残りのメソッドの1つが`claim(<params>)`、もう一つが`isClaimed(<params>)`であり、エアドロップコントラクトのように見えます。 ここからは、オペコードごとに調べる代わりに、[デコンパイラ](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)を使用します。デコンパイラは、このコントラクトの3つの関数について利用可能な結果を生成します。 他の関数のリバースエンジニアリングは、読者の演習として残しておきます。

### scaleAmountByPercentage {#scaleamountbypercentage}

この関数についてデコンパイラが提供した内容は、次のとおりです。

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

最初の`require`では、コールデータ内に2つのパラメータにとって十分なサイズ、つまり関数シグネチャの4バイトに加え少なくとも64バイトあるかどうかをテストしています。 そうでない場合、問題があるのは明らかです。

`if`文は、`_param1`がゼロでないこと、さらに`_param1 * _param2`が負でないことを確認していると思われます。 これは、オーバー(アンダー)フローを防止している可能性があります。

最後に、この関数はスケーリング値を返します。

### claim {#claim}

デコンパイラが作成するコードは複雑であり、すべてが重要なわけではありません。 役立つ情報を提供していると思われる行に焦点を当てるので、ある程度スキップします。

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

ここでは、重要事項が2つあります。

- `_param2`は、`uint256`として宣言されているが、実際にはアドレスである
- `_param1`は、請求対象のウィンドウであり、`currentWindow`であるか、前のウィンドウである必要がある

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

そのため、Storage[5]はウィンドウとアドレスの配列であり、アドレスがウィンドウの報酬を請求したかどうかが分かります。

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

`unknown2eb4a7ab`は、実際には`merkleRoot()`関数であることが分かっています。したがって、このコードは[マークルプルーフ](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)を検証していると思われます。 これは、`_param4`がマークルプルーフであることを意味します。

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

これは、コントラクトが自身のETHを別のアドレス(コントラクトまたは外部所有アカウント)に送金する方法です。 送金する金額の値で呼び出します。 これはETHのエアドロップであると思われます。

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

下の2行は、Storage[2] も呼び出すコントラクトであることを示しています。 [コンストラクタのトランザクションを見ると](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)、このコントラクトは[0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)であり、[ソースコードがEtherscanにアップロードされている](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)ラップドイーサ(WETH)コントラクトであることが分かります。

このコントラクトは、`_param2`にETHを送金しようとしていると思われます。 送金できれば問題ありません。 送金できない場合は、[ラップドイーサ(WETH)](https://weth.tkn.eth.limo/)を送金しようとします。 `_param2`が外部所有アカウント(EOA)である場合、必ずETHを受け取ることができますが、コントラクトはETHの受け取りを拒否することができます。 しかし、ラップドイーサ(WETH)はERC-20であるため、コントラクトは受け取りを拒否できません。

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

関数の最後に、ログエントリが生成されていることがわかります。 [生成されたログエントリを確認し](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)、`0xdbd5...`で始まるトピックでフィルタリングします。 [そのようなエントリを生成したトランザクションの1つをクリックすると](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)、実際に請求のように見えることがわかります。アカウントは、リバースエンジニアリングしているコントラクトにメッセージを送信し、代わりにETHを取得しています。

![請求トランザクション](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

この関数は、上記の[`claim`](#claim)と非常に似ています。 この関数はマークルプルーフも同様に確認し、ETHを最初に送金しようと試み、同じタイプのログエントリを生成します。

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

主な違いは、最初のパラメータです。引き出しを行うためのウィンドウがありません。 代わりに、請求対象となるすべてのウィンドウについてのループがあります。

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

そのため、すべてのウィンドウについて請求する`claim`を少し変えたもののように思われます。

## まとめ {#conclusion}

ここまでで、オペコードまたは(動作する場合は)デコンパイラを使用して、ソースコードが入手できないコントラクトを理解する方法を身に付けられたはずです。 この記事の長さが示しているように、コントラクトのリバースエンジニアリングは簡単ではありません。しかしながら、セキュリティが不可欠なシステムでは、コントラクトが想定した通りに動作しているかを検証できることは、非常に重要なスキルです。
