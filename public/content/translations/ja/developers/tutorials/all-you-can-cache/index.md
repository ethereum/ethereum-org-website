---
title: "キャッシュでできること"
description: ロールアップのトランザクションをより安くするキャッシュコントラクトの作成と使い方を学びます。
author: Ori Pomerantz
tags: [ "レイヤー2", "キャッシュ", "ストレージ" ]
skill: intermediate
published: 2022-09-15
lang: ja
---

ロールアップを使うと、トランザクションのバイトあたりのコストは、ストレージスロットのコストよりもはるかに高くなってしまいます。 そのため、オンチェーンに可能な限り多くの情報をキャッシュするほうが合理的です。

この記事では、複数回使用される可能性のあるパラメータの値をキャッシュして、(初回以降では) はるかに少ないバイト数で使えるようにするキャッシュコントラクトの作成および使用方法を学びます。また、このキャッシュを使用するオフチェーンコードの書き方についても説明します。

記事をスキップしてソースコードだけを見たい場合は、[こちら](https://github.com/qbzzt/20220915-all-you-can-cache)をご覧ください。 開発スタックは[Foundry](https://getfoundry.sh/introduction/installation/)です。

## 全体設計 {#overall-design}

わかりやすくするために、すべてのトランザクションのパラメータは`uint256`、32バイト長であると仮定します。 トランザクションを受け取ると、次のように各パラメータをパースします。

1. 先頭のバイトが`0xFF`の場合、次の32バイトをパラメータの値として取得し、キャッシュに書き込みます。

2. 先頭のバイトが`0xFE`の場合、次の32バイトをパラメータの値として取得しますが、キャッシュには書き込み_ません_。

3. その他の値の場合、上位4ビットを追加のバイト数として、下位4ビットをキャッシュキーの最上位ビットとして取得します。 以下に、いくつかの例を示します。

   | calldataのバイト    |  キャッシュキー |
   | :-------------- | -------: |
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## キャッシュ操作 {#cache-manipulation}

キャッシュは[`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)に実装されています。 一行ずつ見ていきましょう。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

これらの定数は、すべての情報を提供し、それをキャッシュに書き込むかどうかの特殊なケースを解釈するために使用されます。 キャッシュへの書き込みには、以前は使用されていなかったストレージスロットに対して2回の[`SSTORE`](https://www.evm.codes/#55)操作が必要で、それぞれ22100ガスがかかるため、オプションとしています。

```solidity

    mapping(uint => uint) public val2key;
```

値とそのキーの間の[マッピング](https://www.geeksforgeeks.org/solidity/solidity-mappings/)です。 この情報は、トランザクションを送信する前に値をエンコードするために必要です。

```solidity
    // 位置nにはキーn+1の値があります。なぜなら、
    // ゼロを「キャッシュにない」状態として保持する必要があるためです。
    uint[] public key2val;
```

キーを割り当て、簡単にするために順次行うため、キーから値へのマッピングには配列を使用できます。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "初期化されていないキャッシュエントリを読み込んでいます");
        return key2val[_key-1];
    }  // cacheRead
```

キャッシュから値を読み取ります。

```solidity
    // 値がまだキャッシュにない場合に書き込む
    // テストを機能させるためにのみpublicに設定
    function cacheWrite(uint _value) public returns (uint) {
        // 値がすでにキャッシュにある場合は、現在のキーを返す
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

同じ値をキャッシュに複数回入れる意味はありません。 値がすでに存在する場合は、既存のキーを返します。

```solidity
        // 0xFEは特殊なケースであるため、キャッシュが保持できる
        // 最大のキーは、0x0Dの後に15個の0xFFが続くものです。キャッシュ長がすでに
        // その大きさになっている場合は失敗します。
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "キャッシュオーバーフロー");
```

これほど大きなキャッシュを得ることはないでしょう (約1.8\*10<sup>37</sup>エントリで、保存には約10<sup>27</sup>TBが必要です)。 しかし、私は["640kBあれば常に十分"](https://quoteinvestigator.com/2011/09/08/640k-enough/)という言葉を覚えているほどには年をとっています。 このテストは非常に安価です。

```solidity
        // 次のキーを使用して値を書き込む
        val2key[_value] = key2val.length+1;
```

逆引き参照 (値からキーへ) を追加します。

```solidity
        key2val.push(_value);
```

順引き参照 (キーから値へ) を追加します。 値を順次割り当てるため、最後の配列値の後に追加するだけです。

```solidity
        return key2val.length;
    }  // cacheWrite
```

新しい値が格納されているセルである`key2val`の新しい長さを返します。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

この関数は、任意の長さ (最大32バイト、ワードサイズ) のcalldataから値を読み取ります。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataValの長さ制限は32バイトです");
        require(length + startByte <= msg.data.length,
            "_calldataValがcalldatasizeを超えて読み取ろうとしています");
```

この関数は内部関数であるため、コードの残りの部分が正しく書かれていれば、これらのテストは不要です。 しかし、大してコストがかからないので、あってもよいでしょう。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

このコードは[Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)で書かれています。 calldataから32バイトの値を読み取ります。 `startByte+32`より前にcalldataが停止しても、EVMでは初期化されていない領域はゼロとみなされるため、これは機能します。

```solidity
        _retVal = _retVal >> (256-length*8);
```

必ずしも32バイトの値が必要というわけではありません。 これにより、余分なバイトが取り除かれます。

```solidity
    } // _calldataVal


    // calldataから_fromByteを開始位置として単一のパラメータを読み取る
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

calldataから単一のパラメータを読み取ります。 パラメータは1バイトから33バイトの範囲になる可能性があるため、読み取った値だけでなく、次のバイトの位置も返す必要があることに注意してください。

```solidity
        // 最初のバイトで残りの解釈方法がわかる
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidityは、危険な可能性のある[暗黙の型変換](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)を禁止することで、バグの数を減らそうとします。 ダウングレード、たとえば256ビットから8ビットへの変換は、明示的に行う必要があります。

```solidity

        // 値を読み取るが、キャッシュには書き込まない
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 値を読み取り、キャッシュに書き込む
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // ここまで来たということは、キャッシュから読み取る必要があるということ

        // 読み取る追加バイト数
        uint8 _extraBytes = _firstByte / 16;
```

下位[ニブル](https://en.wikipedia.org/wiki/Nibble)を取り、それを他のバイトと組み合わせてキャッシュから値を読み取ります。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n個のパラメータを読み取る (関数は期待するパラメータ数を知っている)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

パラメータ数はcalldata自体から取得できますが、私たちを呼び出す関数は期待するパラメータ数を知っています。 それらの関数に教えてもらう方が簡単です。

```solidity
        // 読み取ったパラメータ
        uint[] memory params = new uint[](_paramNum);

        // パラメータは4バイト目から始まります。それより前は関数シグネチャです
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

必要な数になるまでパラメータを読み取ります。 calldataの末尾を超えた場合、`_readParams`は呼び出しをリバートします。

```solidity

        return(params);
    }   // readParams

    // _readParamsのテストのため、4つのパラメータの読み取りをテストする
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundryの大きな利点の1つは、Solidityでテストを書くことができる点です([下記の「キャッシュのテスト」を参照](#testing-the-cache))。 これにより、単体テストが非常に簡単になります。 これは4つのパラメータを読み取って返し、テストでそれらが正しいことを検証できるようにする関数です。

```solidity
    // 値を取得し、それをエンコードするバイト列を返す (可能であればキャッシュを使用)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`は、オフチェーンコードがキャッシュを使用するcalldataの作成を支援するために呼び出す関数です。 単一の値を受け取り、それをエンコードするバイト列を返します。 この関数は`view`なので、トランザクションを必要とせず、外部から呼び出してもガスはかかりません。

```solidity
        uint _key = val2key[_val];

        // 値はまだキャッシュにないので、追加する
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)では、初期化されていないストレージはすべてゼロであるとみなされます。 そのため、存在しない値のキーを探すと、ゼロが返されます。 その場合、それをエンコードするバイト列は`INTO_CACHE` (次回キャッシュされるように) となり、その後に実際の値が続きます。

```solidity
        // キーが0x10未満の場合、単一バイトとして返す
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

単一バイトが最も簡単です。 [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat)を使用して、`bytes<n>`型を任意の長さのバイト配列に変換するだけです。 その名前にもかかわらず、引数が1つだけ提供された場合でも正常に動作します。

```solidity
        // 2バイト値、0x1vvvとしてエンコード
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>未満のキーがある場合、それを2バイトで表現できます。 まず、256ビットの値である`_key`を16ビットの値に変換し、論理和を使用して最初のバイトに追加バイト数を加えます。 次に、それを`bytes`に変換できる`bytes2`の値に入れます。

```solidity
        // 以降の行をループとして実行する賢い方法があるかもしれませんが、
        // これはview関数なので、プログラマの時間と
        // 単純さを最適化しています。

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

その他の値 (3バイト、4バイトなど) は、フィールドサイズが異なるだけで、同じように処理されます。

```solidity
        // ここに到達した場合、何かが間違っています。
        revert("encodeValのエラー、発生するはずがありません");
```

ここに到達するということは、16\*256<sup>15</sup>以上のキーを取得したということです。 しかし、`cacheWrite`はキーを制限するため、14\*256<sup>16</sup> (最初のバイトが0xFEとなり、`DONT_CACHE`のように見える) に達することさえありません。 しかし、将来のプログラマーがバグを混入させる場合に備えてテストを追加しても、大したコストはかかりません。

```solidity
    } // encodeVal

}  // Cache
```

### キャッシュのテスト {#testing-the-cache}

Foundryの利点の1つは、[Solidityでテストを書くことができる](https://getfoundry.sh/forge/tests/overview/)ことで、これにより単体テストが書きやすくなります。 `Cache`クラスのテストは[こちら](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)にあります。 テストコードは繰り返しが多くなりがちなので、この記事では興味深い部分のみを説明します。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// consoleを使用するには、`forge test -vv`を実行する必要があります。
import "forge-std/console.sol";
```

これは、テストパッケージと`console.log`を使用するために必要な、単なる定型コードです。

```solidity
import "src/Cache.sol";
```

テスト対象のコントラクトをインポートする必要があります。

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp`関数は各テストの前に呼び出されます。 この場合、新しいキャッシュを作成するだけなので、テストが互いに影響することはありません。

```solidity
    function testCaching() public {
```

テストは`test`で始まる名前の関数です。 この関数は、値を書き込んで再度読み取ることにより、基本的なキャッシュ機能を確認します。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

これは、[`assert...` 関数](https://getfoundry.sh/reference/forge-std/std-assertions/)を使用して実際のテストを行う方法です。 この場合、書き込んだ値が読み取った値と等しいことを確認します。 `cache.cacheWrite`の結果は、キャッシュキーが線形に割り当てられることがわかっているので、破棄できます。

```solidity
        }
    }    // testCaching


    // 同じ値を複数回キャッシュし、キーが
    // 同じままであることを確認する
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

まず、各値をキャッシュに2回書き込み、キーが同じであることを確認します (つまり、2回目の書き込みは実際には行われなかったということです)。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理論上は、連続したキャッシュ書き込みに影響しないバグが存在する可能性があります。 そのため、ここでは連続していない書き込みをいくつか行い、値がまだ書き換えられていないことを確認します。

```solidity
    // メモリバッファからuintを読み取る (送信したパラメータが
    // 返ってくることを確認するため)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory`バッファから256ビットのワードを読み取ります。 このユーティリティ関数を使用すると、キャッシュを使用する関数呼び出しを実行したときに、正しい結果を受け取ったことを確認できます。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yulは`uint256`を超えるデータ構造をサポートしていないため、メモリバッファ`_bytes`のような、より高度なデータ構造を参照すると、その構造のアドレスが取得されます。 Solidityは`bytes memory`の値を、長さを含む32バイトのワードとして格納し、その後に実際のバイトが続くため、`_start`番目のバイトを取得するには`_bytes+32+_start`を計算する必要があります。

```solidity

        return tempUint;
    }     // toUint256

    // fourParams()の関数シグネチャ、提供元:
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 正しい値が返ってくることを確認するための定数値
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

テストに必要な定数です。

```solidity
    function testReadParam() public {
```

`readParams`を使用する関数`fourParams()`を呼び出し、パラメータを正しく読み取れることをテストします。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

キャッシュを使用する関数を呼び出すには、通常のABIメカニズムが使用できないため、低レベルの[`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses)メカニズムを使用する必要があります。 このメカニズムは、入力として`bytes memory`を受け取り、それを出力として(ブール値と同様に)返します。

```solidity
        // 最初の呼び出し、キャッシュは空
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

同じコントラクトが、キャッシュされた関数(トランザクションからの直接呼び出し用)とキャッシュされていない関数(他のスマートコントラクトからの呼び出し用)の両方をサポートすると便利です。 そのためには、すべてを[フォールバック関数](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)に置くのではなく、引き続きSolidityのメカニズムに頼って正しい関数を呼び出す必要があります。 これにより、構成可能性が大幅に向上します。 ほとんどの場合、関数を識別するには1バイトで十分なため、3バイト(16\*3=48ガス)を無駄にしています。 しかし、この記事を書いている時点では、その48ガスのコストは0.07セントであり、これはより単純でバグが発生しにくいコードのための妥当なコストです。

```solidity
            // 最初の値、キャッシュに追加する
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

最初の値: キャッシュに書き込む必要がある完全な値であることを示すフラグで、その後に32バイトの値が続きます。 他の3つの値も同様ですが、`VAL_B`はキャッシュに書き込まれず、`VAL_C`は3番目と4番目の両方のパラメータである点が異なります。

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

ここで実際に`Cache`コントラクトを呼び出します。

```solidity
        assertEq(_success, true);
```

呼び出しが成功することを期待します。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

空のキャッシュから始めて、`VAL_A`の後に`VAL_C`を追加します。 最初のキーが1で、2番目のキーが2であることを期待します。

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

出力は4つのパラメータです。 ここで、それが正しいことを検証します。

```solidity
        // 2回目の呼び出し、キャッシュを使用できる
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // キャッシュ内の最初の値
            bytes1(0x01),
```

16未満のキャッシュキーは、ちょうど1バイトになります。

```solidity
            // 2番目の値、キャッシュに追加しない
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // 3番目と4番目の値、同じ値
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

呼び出し後のテストは、最初の呼び出し後のテストと同一です。

```solidity
    function testEncodeVal() public {
```

この関数は`testReadParam`に似ていますが、パラメータを明示的に書き込む代わりに`encodeVal()`を使用する点が異なります。

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()`での唯一の追加テストは、`_callInput`の長さが正しいかを確認することです。 最初の呼び出しでは、4+33\*4となります。 2回目では、すべての値がすでにキャッシュ内にあるため、4+1\*4となります。

```solidity
    // キーが1バイト以上の場合のencodeValのテスト
    // 4バイトまでキャッシュを埋めるのは
    // 時間がかかりすぎるため、最大3バイトとする。
    function testEncodeValBig() public {
        // いくつかの値をキャッシュに入れる。
        // 簡単にするため、値nにキーnを使用する。
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上記の`testEncodeVal`関数は4つの値しかキャッシュに書き込まないため、[マルチバイト値を扱う関数の部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)はチェックされません。 しかし、そのコードは複雑でエラーが発生しやすくなっています。

この関数の最初の部分は、1から0x1FFFまでのすべての値を順番にキャッシュに書き込むループなので、これらの値をエンコードして、どこに行くのかを知ることができます。

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // 1バイト        0x0F
            cache.encodeVal(0x0010),   // 2バイト     0x1010
            cache.encodeVal(0x0100),   // 2バイト     0x1100
            cache.encodeVal(0x1000)    // 3バイト 0x201000
        );
```

1バイト、2バイト、3バイトの値をテストします。 十分なスタックエントリ (少なくとも0x10000000、約2億5千万) を書き込むには時間がかかりすぎるため、それ以上のテストは行いません。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 短すぎるバッファでリバートされることをテストする
    function testShortCalldata() public {
```

パラメータが不十分な異常ケースで何が起こるかをテストします。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

リバートされるので、得られる結果は`false`になるはずです。

```
    // 存在しないキャッシュキーで呼び出す
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 最初の値、キャッシュに追加する
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // 2番目の値
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

この関数は、キャッシュが空で読み込む値がないことを除けば、4つの完全に正当なパラメータを取得します。

```solidity
        .
        .
        .
    // 長すぎるバッファでもすべてがうまくいくことをテストする
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 最初の呼び出し、キャッシュは空
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 最初の値、キャッシュに追加する
            cache.INTO_CACHE(), bytes32(VAL_A),

            // 2番目の値、キャッシュに追加する
            cache.INTO_CACHE(), bytes32(VAL_B),

            // 3番目の値、キャッシュに追加する
            cache.INTO_CACHE(), bytes32(VAL_C),

            // 4番目の値、キャッシュに追加する
            cache.INTO_CACHE(), bytes32(VAL_D),

            // 「幸運を祈って」もう1つの値
            bytes4(0x31112233)
        );
```

この関数は5つの値を送信します。 5番目の値は有効なキャッシュエントリではないため無視されることがわかります。もし含まれていなければリバートを引き起こしていたでしょう。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## サンプルアプリケーション {#a-sample-app}

Solidityでテストを書くのは非常に良いことですが、結局のところ、dappが役立つためにはチェーンの外部からのリクエストを処理できる必要があります。 この記事では、「Write Once, Read Many (一度書き込み、多数回読み取り)」を意味する`WORM`を使用して、dappでキャッシングを使用する方法を実演します。 キーがまだ書き込まれていない場合は、値を書き込むことができます。 キーがすでに書き込まれている場合は、リバートされます。

### コントラクト {#the-contract}

[こちらがコントラクト](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)です。 これは主に`Cache`と`CacheTest`で既に行ったことを繰り返しているので、興味深い部分のみを取り上げます。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`を使用する最も簡単な方法は、自分のコントラクトでそれを継承することです。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

この関数は、上記の`CacheTest`の`fourParam`に似ています。 ABI仕様に従っていないため、関数にパラメータを宣言しないのが最善です。

```solidity
    // 呼び出しを容易にする
    // writeEntryCached()の関数シグネチャ、提供元:
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

ABI仕様に従っていないため、`writeEntryCached`を呼び出す外部コードは、`worm.writeEntryCached`を使用する代わりに、手動でcalldataを構築する必要があります。 この定数値があると、その記述が楽になります。

`WRITE_ENTRY_CACHED`を状態変数として定義しても、それを外部から読み取るには、そのゲッター関数である`worm.WRITE_ENTRY_CACHED()`を使用する必要があることに注意してください。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

読み取り関数は`view`なので、トランザクションを必要とせず、ガスもかかりません。 結果として、パラメータにキャッシュを使うメリットはありません。 ビュー関数では、より単純な標準メカニズムを使う方が最善です。

### テストコード {#the-testing-code}

[こちらがコントラクトのテストコード](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)です。 繰り返しになりますが、興味深い部分のみを見ていきましょう。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[これ (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)は、Foundryテストで次の呼び出しが失敗すること、および失敗の報告理由を指定する方法です。 これは、`<contract>.<function name>`構文を使用する場合に適用されます。これは、calldataを構築して低レベルインターフェース (`<contract>.call()`など) を使用してコントラクトを呼び出すのとは異なります。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

ここでは、`cacheWrite`がキャッシュキーを返すという事実を利用します。 これは本番環境での使用を想定していません。`cacheWrite`は状態を変更するため、トランザクション中にしか呼び出せません。 トランザクションには戻り値がありません。結果がある場合、その結果はイベントとして発行されることになっています。 そのため、`cacheWrite`の戻り値はオンチェーンコードからのみアクセスでき、オンチェーンコードはパラメータのキャッシュを必要としません。

```solidity
        (_success,) = address(worm).call(_callInput);
```

これは、`<contract address>.call()`には2つの戻り値があるが、最初の値しか気にしないことをSolidityに伝える方法です。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

低レベルの`<address>.call()`関数を使用しているため、`vm.expectRevert()`を使用できず、呼び出しから得られるブール値の成功値を見る必要があります。

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

これは、Foundryでコードが[イベントを正しく発行する](https://getfoundry.sh/reference/cheatcodes/expect-emit/)ことを検証する方法です。

### クライアント {#the-client}

Solidityのテストでは得られないものの1つは、自分のアプリケーションにコピー＆ペーストできるJavaScriptコードです。 そのコードを書くために、WORMを[Optimism](https://www.optimism.io/)の新しいテストネットである[Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)にデプロイしました。 アドレスは[`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)です。

[クライアントのJavaScriptコードはこちらで確認できます](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。 使用方法は次のとおりです。

1. gitリポジトリをクローンします。

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 必要なパッケージをインストールします。

   ```sh
   cd javascript
   yarn
   ```

3. 設定ファイルをコピーします。

   ```sh
   cp .env.example .env
   ```

4. `.env`を編集して設定を行います。

   | パラメータ                                                         | 値                                                                                                               |
   | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | トランザクションの支払いに十分なETHを持っているアカウントのニーモニック。 [こちらでOptimismのGoerliネットワークの無料ETHを手に入れられます](https://optimismfaucet.xyz/)。 |
   | OPTIMISM_GOERLI_URL | Optimism GoerliのURL。 公開エンドポイント`https://goerli.optimism.io`は、レート制限がありますが、ここで必要な用途には十分です。                         |

5. `index.js`を実行します。

   ```sh
   node index.js
   ```

   このサンプルアプリケーションは、まずWORMにエントリを書き込み、calldataとEtherscan上のトランザクションへのリンクを表示します。 次に、そのエントリを読み返し、使用するキーとエントリ内の値 (値、ブロック番号、作成者) を表示します。

クライアントのほとんどは通常のDapp JavaScriptです。 そのため、ここでも興味深い部分のみを取り上げます。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 毎回新しいキーが必要
    const key = await worm.encodeVal(Number(new Date()))
```

特定のスロットには一度しか書き込めないため、タイムスタンプを使用してスロットを再利用しないようにします。

```javascript
const val = await worm.encodeVal("0x600D")

// エントリを書き込む
const calldata = func + key.slice(2) + val.slice(2)
```

Ethersは、コールデータが16進文字列、つまり`0x`の後に偶数個の16進数が続くことを期待します。 `key`と`val`は両方とも`0x`で始まるため、これらのヘッダーを削除する必要があります。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidityのテストコードと同様に、キャッシュされた関数を通常の方法で呼び出すことはできません。 代わりに、より低レベルのメカニズムを使用する必要があります。

```javascript
    .
    .
    .
    // 書き込んだばかりのエントリを読み取る
    const realKey = '0x' + key.slice(4)  // FFフラグを削除する
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

エントリの読み取りには、通常のメカニズムを使用できます。 `view`関数では、パラメータのキャッシュを使う必要はありません。

## 結論 {#conclusion}

この記事のコードは概念実証 (プルーフ・オブ・コンセプト) であり、アイデアを理解しやすくすることを目的としています。 本番環境のシステムでは、いくつかの追加機能を実装することをお勧めします。

- `uint256`ではない値を処理します。 例えば、文字列です。
- グローバルキャッシュの代わりに、ユーザーとキャッシュの間のマッピングを持つことを検討します。 異なるユーザーは異なる値を使用します。
- アドレスに使用される値は、他の目的で使用される値とは異なります。 アドレス専用の個別のキャッシュを持つことが合理的かもしれません。
- 現在、キャッシュキーは「先着、最小キー」アルゴリズムに基づいています。 最初の16個の値は、単一バイトとして送信できます。 次の4080個の値は、2バイトとして送信できます。 次の約100万個の値は3バイト、などとなります。 本番システムでは、キャッシュエントリの使用カウンタを保持し、最も_一般的な_16個の値が1バイト、次に一般的な4080個の値が2バイトになるように再編成する必要があります。

  ただし、これは潜在的に危険な操作です。 次の一連のイベントを想像してみてください。

  1. Noam Naiveが`encodeVal`を呼び出して、トークンを送りたいアドレスをエンコードします。 そのアドレスはアプリケーションで最初に使用されたアドレスの1つなので、エンコードされた値は0x06です。 これはトランザクションではなく`view`関数なので、Noamと彼が使用するノード間のやり取りであり、他の誰も知りません。

  2. Owen Ownerがキャッシュの並べ替え操作を実行します。 そのアドレスを実際に使用する人はほとんどいないため、現在は0x201122としてエンコードされています。 別の値である10<sup>18</sup>に、0x06が割り当てられます。

  3. Noam Naiveは自分のトークンを0x06に送信します。 トークンはアドレス`0x0000000000000000000000000de0b6b3a7640000`に送られますが、そのアドレスの秘密鍵を誰も知らないため、そこにスタックしてしまいます。 Noamは_不満_です。

  この問題、およびキャッシュの再順序付け中にメモリプール内にあるトランザクションの関連問題を解決する方法はありますが、その存在を認識しておく必要があります。

私はOptimismの従業員であり、これが最もよく知っているロールアップなので、ここではOptimismを使ってキャッシュを実演しました。 しかし、これは内部処理に最小限のコストしかかからないどのロールアップでも機能するはずです。そのため、比較するとL1へのトランザクションデータの書き込みが主な費用となります。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).

