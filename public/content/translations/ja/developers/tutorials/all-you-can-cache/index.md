---
title: "キャッシュでできること"
description: ロールアップのトランザクションをより安くするキャッシュコントラクトの作成と使い方を学びます。
author: Ori Pomerantz
tags:
  - "レイヤー2"
  - "キャッシュ"
  - "ストレージ"
skill: 中級
published: 2022-09-15
lang: ja
---

ロールアップを使うと、トランザクションのバイトあたりのコストは、ストレージスロットのコストよりもはるかに高くなってしまいます。 そのため、オンチェーンに可能な限り多くの情報をキャッシュするほうが合理的です。

この記事では、複数回使用される可能性のあるパラメータの値をキャッシュして、(初回以降では) はるかに少ないバイト数で使えるようにするキャッシュコントラクトの作成および使用方法を学びます。 また、このキャッシュコントラクトを使用するチェーン上のコードを書く方法についても説明します。

記事を読まずにソースコードだけを確認したいならば、[こちら](https://github.com/qbzzt/20220915-all-you-can-cache)にあります。 開発スタックは、[Foundry](https://book.getfoundry.sh/getting-started/installation)を使っています。

## 設計の概要 {#overall-design}

わかりやすくするために、すべてのトランザクションのパラメータは、`uint256`(32バイト長)であることとします。 トランザクションを受け取ると、次のように各パラメータをパースします。

1. 先頭のバイトが`0xFF`の場合、次の32バイトをパラメータの値として取得し、キャッシュに書き込む

2. 先頭のバイトが`0xFE`の場合、次の32バイトをパラメータの値として取得するが、それをキャッシュに_書き込まない_。

3. その他の値の場合、上位4ビットを追加のバイト数として、下位4ビットをキャッシュキーの最上位ビットとして取得する。 以下に、いくつかの例を示します。

   | calldataのバイト    |  キャッシュキー |
   |:--------------- | --------:|
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## キャッシュ操作 {#cache-manipulation}

[`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)にキャッシュが実装されています。 一行ずつ見ていきましょう。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

上記の定数は、すべての情報を提供し、それをキャッシュに書き込むかどうかを判断するのに使います。 キャッシュに書き込むには、2回の[`SSTORE`](https://www.evm.codes/#55)操作が必要になり、未使用のストレージスロットに対し、それぞれ22100ガスのコストが発生するので選択できるようにしています。

```solidity

    mapping(uint => uint) public val2key;
```

値とそのキーの間で[マッピング](https://www.geeksforgeeks.org/solidity-mappings/)をしています。 この情報は、トランザクションを送信する前に、値をエンコードするのに必要になります。

```solidity
    // Location n has the value for key n+1, because we need to preserve
    // zero as "not in the cache".
    uint[] public key2val;
```

キーから値へのマッピングに配列が使えます。なぜなら、キーを割り当て、それを簡単に順次実行するためです。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

キャッシュから値を読み込みます。

```solidity
    // Write a value to the cache if it's not there already
    // Only public to enable the test to work
    function cacheWrite(uint _value) public returns (uint) {
        // If the value is already in the cache, return the current key
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

同じ値をキャッシュに複数回入れるのは、無駄です。 値がすでに存在するならば、既存のキーを返します。

```solidity
        // Since 0xFE is a special case, the largest key the cache can
        // hold is 0x0D followed by 15 0xFF's. If the cache length is already that
        // large, fail.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

これほどまでの大きなキャッシュを取得することは考えられません (約1.8\*10<sup>37</sup>のエントリーを保存するには約 10<sup>27</sup>TBが必要になります) 。 私はというと、[「常に640kBあれば十分だ」](https://quoteinvestigator.com/2011/09/08/640k-enough/)ということを覚えているくらいの年齢です。 このテストは安くできます。

```solidity
        // Write the value using the next key
        val2key[_value] = key2val.length+1;
```

(値からキーへ) 逆引できる検索を加えています。

```solidity
        key2val.push(_value);
```

前方検索 (キーから値へ) を追加します。 連続して値を指定するため、最後の配列にある値の後に追加するだけです。

```solidity
        return key2val.length;
    }  // cacheWrite
```

新しい値が格納されるセルである`key2val`の新しい長さを返します。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

この関数は、任意の長さcalldata (ワードサイズは最大32バイト) から値を読み取ります。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

この関数は内部関数です。そのため、コードの残りの部分が正しく記述されていれば、これらのテストは必要ありません。 しかし、そんなにコストは掛からないため、テストをしてもよいかもしれません。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

これは、[Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)のコードです。 calldataから32バイトの値を読み取ります。 `startByte+32`より前にcalldataが停止した場合でも、EVM内で初期化されていない領域はゼロと見なされるため、機能します。

```solidity
        _retVal = _retVal >> (256-length*8);
```

私たちは、必ずしも32バイトの値が欲しいわけではありません。 これで、余分なバイトを削除できます。

```solidity
        return _retVal;
    } // _calldataVal


    // Read a single parameter from the calldata, starting at _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

calldataからパラメータを1つ読み取ります。 パラメータの長さは、1バイトから33バイトまでの範囲です。そのため、読み取った値だけでなく、次のバイトの位置も返す必要があることに注意してください。

```solidity
        // The first byte tells us how to interpret the rest
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidityでは、バグを減らすために潜在的に危険な[暗黙の型変換](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)を禁止しています。 例えば、256ビットから8ビットへのダウングレードを明示的に行う必要があります。

```solidity

        // Read the value, but do not write it to the cache
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Read the value, and write it to the cache
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // If we got here it means that we need to read from the cache

        // Number of extra bytes to read
        uint8 _extraBytes = _firstByte / 16;
```

下位にある[ニブル](https://en.wikipedia.org/wiki/Nibble)を取得し、他のバイトと組み合わせてキャッシュから値を読み取ります。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Read n parameters (functions know how many parameters they expect)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

パラメータの数は、calldata自体から取得できますが、私たちが呼び出す関数は、予期しているパラメータの数を知っています。 これは、関数を使って簡単に取得できます。

```solidity
        // The parameters we read
        uint[] memory params = new uint[](_paramNum);

        // Parameters start at byte 4, before that it's the function signature
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

必要な数のパラメータを読み込みます。 calldataの読み込みが終わると、`_readParams`は、呼び出しを戻します。

```solidity

        return(params);
    }   // readParams

    // For testing _readParams, test reading four parameters
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundryの素晴らしい機能の一つは、Solidityでテストを作成できることです([後述するキャッシュのテストを参照](#testing-the-cache))。 そのため、単体テストが簡単に作成できます。 これは、4つのパラメータを読み取り、それらが正しいことをテストで検証できるように返す関数です。

```solidity
    // Get a value, return bytes that will encode it (using the cache if possible)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`は、オフチェーンコードがキャッシュを使用するcalldataを作るのを支援する関数です。 単一の値を受け取り、その値をエンコードしたバイト値で返します。 この関数は、`view`なのでトランザクションは必要なく、外部からの呼び出しにガス代はかかりません。

```solidity
        uint _key = val2key[_val];

        // The value isn't in the cache yet, add it
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)では、初期化されていないすべてのストレージはゼロであるとみなされます。 そのため、存在しない値のキーを検索すると、ゼロを受け取ります。 このケースにおいて、それをエンコードするバイトは `INTO_CACHE`であり、その後に実際の値が続きます (つまり次回は、キャッシュが使われます) 。

```solidity
        // If the key is <0x10, return it as a single byte
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

単一のバイトが一番簡単です。  [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat)のみを使って、`bytes<n>`型を任意の長さのバイト配列に変換します。 名前はよそにして、引数を1つだけ指定したときに、正常に動作します。

```solidity
        // Two byte value, encoded as 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>以下のキーを持っている場合は、それを2バイトで表現できます。 まず、256ビットの値である`_key`を16ビットの値に変換し、論理和を使用して余分なバイト数を先頭のバイトに加えます。 そして、この値を`bytes`に変換可能な`bytes2`値に入れます。

```solidity
        // There is probably a clever way to do the following lines as a loop,
        // but it's a view function so I'm optimizing for programmer time and
        // simplicity.

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             。
             。
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

他の値(3バイト、4バイト等)も、フィールドのサイズが異なるだけで、同じ方法で処理されます。

```solidity
        // If we get here, something is wrong.
        revert("Error in encodeVal, should not happen");
```

ここまでで、16\*256<sup>15</sup>以上のキーを取得できることになります。 しかし、`cacheWrite`では、キーを制限しています。そのため、14\*256<sup>16</sup>より上には行けません (これは、最初のバイトが0xFEになり、 `DONT_CACHE`になってしまうためです) 。 しかし、将来プログラマーがバグを入れてしまう場合に備え、テストを追加するのに、それほど費用はかかりません。

```solidity
    } // encodeVal

}  // Cache
```

### キャッシュのテスト {#testing-the-cache}

Foundryの素晴らしい機能の一つは、[Solidityでテストを作成できること](https://book.getfoundry.sh/forge/tests)です。そのため、単体テストを簡単に作成できます。 `Cache`クラスのテストは、[こちら](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)にあります。 テストにおけるテストコードは、繰り返しが多い傾向があります。そのため、この記事では、重要な部分のみを説明します。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Need to run `forge test -vv` for the console.
import "forge-std/console.sol";
```

これは、テストパッケージおよび`console.log`を使うのに必要となるボイラープレートです。

```solidity
import "src/Cache.sol";
```

テストするコントラクトのインポートです。

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp`関数は、各テストの前に呼び出されます。 このケースにおいては、新しいキャッシュを作成してテスト同士が影響しないようにします。

```solidity
    function testCaching() public {
```

`test`の名前で始まる関数がテストです。 この関数では、値を書き込み、読み取ることでキャッシュ機能の基本的な確認を行います。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

これは、[`assert...`関数](https://book.getfoundry.sh/reference/forge-std/std-assertions)を使って、実際にテストをする方法です。 このケースでは、書き込んだ値が読み込んだ値であることを確認します。 キャッシュキーが線形に割り当てられるため、`cache.cacheWrite`の結果は、破棄できます。

```solidity
        }
    }    // testCaching


    // Cache the same value multiple times, ensure that the key stays
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

まず、各値をキャッシュに2回書き込みます。そして、キーが同じであることを確認します (2回目の書き込みは、実際に起こらないことを意図しています)。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理論的には、連続したキャッシュの書き込みに関連しないバグが存在する可能性があります。 そのため、ここでは連続的ではない書き込みを何回か実行し、値がまだ書き換えられていないことを確認します。

```solidity
    // Read a uint from a memory buffer (to make sure we get back the parameters
    // we sent out)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory`バッファから256ビットのワードを読み取ります。 このユーティリティ関数でキャッシュを使う関数の呼び出しを実行したときに、正しい結果が得られることを検証できます。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yulでは、`uint256`を超えるデータ構造をサポートしていません。そのため、メモリバッファである`_bytes`など、より高度なデータ構造を参照するときは、そのデータ構造のアドレスが取得されます。 Solidityでは、`bytes memory`値を長さを含む32バイトワードとして保存します。長さの後に実際のバイトが続くため、バイト数`_start`を取得して、`_bytes+32+_start`を計算する必要があります。

```solidity

        return tempUint;
    }     // toUint256

    // Function signature for fourParams(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Just some constant values to see we're getting the correct values back
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

テストに必要な定数です。

```solidity
    function testReadParam() public {
```

`readParams`を使う関数`fourParams()`を呼び出し、パラメータを正しく読み取れることをテストします。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

キャッシュを使う関数の呼び出しに、通常のABIメカニズムは使えません。そのため、低レベルの [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html# members-of-addresses)メカニズムを使う必要があります。 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses)のメカニズムでは、入力として`bytes memory`を取り、それを (ブール値と共に) 出力として返します。

```solidity
        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

1つのコントラクトで、キャッシュされた関数 (トランザクションからの直接呼び出し用) とキャッシュ無しの関数 (他のコントラクトからの呼び出し用) の両方をサポートしていると有用です。 それには、正しい関数を呼び出すために、すべてを[`fallback`関数](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)に置くのではなく、引き続きSolidityのメカニズムに頼る必要があります。 この実装によって構成可能性をより容易に達成できます。 ほとんどの状況において、1バイトで関数を十分に識別できます。そのため、3バイト (16\*3=48ガス) を無駄にしていることになります。 しかし、この記事を書いている時点では、48ガスのコストは0.07セントなので、より単純でバグが発生しにくいコードとしては妥当なコストです。

```solidity
            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

最初の値は、全ての値をキャッシュに書き込む必要をあることを示すフラグです。次に、32バイトの値が続きます。 他の値は似ていますが、`VAL_B`は、キャッシュに書き込まれず、`VAL_C`は、3番目のパラメータと4番目のパラメータの両方である点が異なります。

```solidity
             。
             。
             。
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

`Cache`コントラクトを実際に呼び出すところです。

```solidity
        assertEq(_success, true);
```

この呼び出しが成功することを要求しています。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

空のキャッシュから始め、 `VAL_A`を加えてから `VAL_C`を追加します。 最初のキーに1があり、2番目のキーには、2があることを要求しています。

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

出力は、4つのパラメータです。 ここで、それが正しいことを検証しています。

```solidity
        // Second call, we can use the cache
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value in the Cache
            bytes1(0x01),
```

16未満のキャッシュキーは、ちょうど1バイトになります。

```solidity
            // Second value, don't add it to the cache
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Third and fourth values, same value
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        。
        。
    }   // testReadParam
```

呼出し後のテストは、最初の呼び出しの後のテストと同一です。

```solidity
    function testEncodeVal() public {
```

この関数は、`testReadParam`に似ています。しかし、パラメータを明示的に記述する代わりに、`encodeVal()`を使うところが違います。

```solidity
        。
        。
        。
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        。
        。
        assertEq(_callInput.length, 4+1*4);
    }   // testEncodeVal
```

`testEncodeVal()`の唯一の追加テストとして、`_callInput`の長さが正しいかを検証することがあります。 最初の呼び出しでは、4+33\*4となります。 次の呼び出しでは、すべての値がすでにキャッシュ内にあり、4+1\*4となります。

```solidity
    // Test encodeVal when the key is more than a single byte
    // Maximum three bytes because filling the cache to four bytes takes
    // too long.
    function testEncodeValBig() public {
        // Put a number of values in the cache.
        // To keep things simple, use key n for value n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上記の`testEncodeVal`関数は、4つの値のみをキャッシュに書き込むので、[マルチバイト値を処理する関数の部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)についてチェックされません。 しかし、その部分は、複雑でエラーが発生しやすくなっています。

この関数の最初の部分は、1から0x1FFFまでのすべての値を順番にキャッシュに書き込むループなので、これらの値をエンコードして、どこに行くのかを知ることができます。

```solidity
        。
        。
        。

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // One byte        0x0F
            cache.encodeVal(0x0010),   // Two bytes     0x1010
            cache.encodeVal(0x0100),   // Two bytes     0x1100
            cache.encodeVal(0x1000)    // Three bytes 0x201000
        );
```

1バイト、2バイト、3バイトの値をテストします。 十分なスタックエントリを書き込むには時間がかかりすぎるため (0x10000000では少なくとも約2億5千万回) 、それ以上のテストは行いません。

```solidity
        。
        。
        。
        。
    }    // testEncodeValBig


    // Test what with an excessively small buffer we get a revert
    function testShortCalldata() public {
```

パラメータが足りていない場合の異常時に何が起こるかをテストします。

```solidity
        。
        。
        。
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

処理が取り消されるので、得られる結果は、`false`になります。

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        。
        。
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

この関数は、キャッシュが空なので読み込む値がないことは別として、正当な4つのパラメータを取得します。

```solidity
        。
        。
        。
    // Test what with an excessively long buffer everything works file
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // First call, the cache is empty
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Second value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Third value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Fourth value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_D),

            // And another value for "good luck"
            bytes4(0x31112233)
        );
```

この関数は、5つの値を送信します。 5番目の値は、有効なキャッシュエントリではないため、無視されます。このキャッシュエントリが含まれない場合は、処理が取り消されることになります。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        。
        。
    }   // testLongCalldata

}        // CacheTest

```

## サンプルアプリケーション {#a-sample-app}

Solidityでテストを作成するのは素晴らしいものの、結局のところ、有用なDappにするには、チェーンの外部からリクエストを処理できる必要があります。 この記事では、「Write Once, Read Many」の略である`WORM`使ってDappにおけるキャッシュの使い方を詳しく説明します。 キーが書き込まれていない場合は、値を書き込むことができます。 キーがすでに書き込まれている場合は、処理が取り消されます。

### コントラクト {#the-contract}

[ここに](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)コントラクトのコードがあります。 コードでは、ほとんどすでに解説した`Cache`と`CacheTest`を繰り返しているため、興味深い部分のみを取り上げます。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`を使う最も簡単な方法は、自分のコントラクトに継承することです。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

この関数は、上述の`CacheTest`の`fourParam`に似ています。 ABI仕様に従っていないため、関数内でパラメータを宣言しないほうが間違いなく良いでしょう。

```solidity
    // Make it easier to call us
    // Function signature for writeEntryCached(), courtesy of
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

ABIの仕様に従っていないため、`writeEntryCached`を呼び出す外部コードは、`worm.writeEntryCached`を使う代わりに手動でcalldataを作成しなければなりません。 この定数値があると、その記述が楽になります。

`WRITE_ENTRY_CACHED`を状態変数として定義しても、それを外部から読み取るには、Getter関数 `worm.WRITE_ENTRY_CACHED()`を使うわなければならないことに気をつけてください。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

読み取りの関数は、`view`で宣言されているので、トランザクションは必要なく、ガスもかかりません。 結果、パラメータにキャッシュを使うメリットは、ありません。 ビュー関数では、より単純な標準メカニズムを使う方が最善です。

### テストコード {#the-testing-code}

[ここに](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)コントラクトのテストコードがあります。 再度となりますが、興味深い部分のみを取り上げます。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[この箇所は (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)、Foundryテストで次の呼び出しが失敗し、失敗した理由をレポートすることを記述する方法です。 これは、低レベルのインターフェイス (`<contract>.call()`など) を使用して呼び出しデータを作成し、コントラクトを呼び出すというよりも、`<contract>.<function name>()`構文を使う時に作動させます。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

上記は、`cacheWrite`がキャッシュキーを返すというファクトを使います。 これは運用環境での使用を想定していません。`cacheWrite`は、状態を変更するためです。従ってトランザクション中しか読みだせません。 トランザクションには、戻り値がありません。結果があれば、その結果はイベントとして出力されることになります。 そのため、 `cacheWrite`の戻り値は、オンチェーンコードからのみアクセスできます。また、オンチェーンコードでは、パラメータキャッシュは不要です。

```solidity
        (_success,) = address(worm).call(_callInput);
```

上記は、`<contract address>.call()`に2つの戻り値があるものの、最初の値のみを使うことをSolidityに伝える方法です。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

低レベルの`<address>.call()`関数を使っているので`vm.expectRevert()`は使用できません。呼び出しで取得したブール値で成功を確認する必要があります。

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        。
        。

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

上記は、Foundryでコードが[イベントを正しく発行していること](https://book.getfoundry.sh/cheatcodes/expect-emit)を確認する方法です。

### クライアント {#the-client}

Solidityのテストで得られないものの1つとして、自身のアプリケーションにカットアンドペーストできるJavaScriptコードでしょう。 そのコードを書くために、WORMをOptimism<a>の新しいテストネットである<a href="https://www.optimism.io/">Optimism Goerli</a>にデプロイしました。 アドレスは、<a href="https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a"><code>0xd34335b1d818cee54e3323d3246bd31d94e6a78a</code></a>です。</p> 

<p spaces-before="0">
  クライアントのJavaScriptコードは、<a href="https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js">こちら</a>にあります。 次の方法で使うことができます。
</p>

<ol start="1">
  <li>
    <p spaces-before="0">
      次のGitリポジトリをクローンしてください。 
      
      <pre><code class="sh">   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
</code></pre>
    </p>
  </li>
  
  <li>
    <p spaces-before="0">
      必要な次のパッケージをインストールしてください。 
      
      <pre><code class="sh">   cd javascript
   yarn
</code></pre>
    </p>
  </li>
  
  <li>
    <p spaces-before="0">
      次の設定ファイルをコピーしてください。 
      
      <pre><code class="sh">   cp .env.example .env
</code></pre>
    </p>
  </li>
  
  <li>
    <p spaces-before="0">
      <code>.env</code>を編集して設定を行ってください。
    </p>
  </li>
</ol>

<table spaces-before="3">
  <tr>
    <th>
      パラメータ
    </th>
    
    <th>
      値
    </th>
  </tr>
  
  <tr>
    <td>
      MNEMONIC
    </td>
    
    <td>
      トランザクションの支払いで十分なETHを持っているアカウントのニーモニック。 <a href="https://optimismfaucet.xyz/">こちら</a>でOptimismのGoerliネットワークの無料ETHを手に入れられます。
    </td>
  </tr>
  
  <tr>
    <td>
      OPTIMISM_GOERLI_URL
    </td>
    
    <td>
      Optimism GoerliのURLを設定します。 公開エンドポイントは、 <code>https://goerli.optimism.io</code>です。通信制限がありますが、必要なことをするには十分です。
    </td>
  </tr>
</table>

<ol start="5">
  <li>
    <p spaces-before="0">
      <code>index.js</code>の実行 
      
      <pre><code class="sh">   node index.js
</code></pre>
    </p>
    
    <p spaces-before="3">
      このサンプルアプリケーションは、まず、WORMにエントリを書き込み、calldataとEtherescan上のトランザクションへのリンクを表示します。 そして、そのエントリを読み込み、使用するキーとエントリ内の値 (値、ブロック番号、作成者) を表示します。
    </p>
  </li>
</ol>

<p spaces-before="0">
  クライアントの大体の部分は、通常のDappのJavaScriptと変わりません。 そのため、ここでも興味深い部分のみを取り上げます。
</p>

<pre><code class="javascript">。
。
。
const main = async () =&gt; {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Need a new key every time
    const key = await worm.encodeVal(Number(new Date()))
</code></pre>

<p spaces-before="0">
  与えられたスロットには、1回しか書き込むことができないため、タイムスタンプを使用してスロットが再利用されないようにします。
</p>

<pre><code class="javascript">const val = await worm.encodeVal("0x600D")

// Write an entry
const calldata = func + key.slice(2) + val.slice(2)
</code></pre>

<p spaces-before="0">
  Ethersでは、calldataが16進数の文字列、<code>0x</code>の後に16進数の偶数が続くことを想定しています。 <code>key</code>と<code>val</code>は、両方とも<code>0x</code>で始まるため、これらのヘッダーを削除する必要があります。
</p>

<pre><code class="javascript">const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
</code></pre>

<p spaces-before="0">
  Solidityのテストコードと同様に、キャッシュされた関数を通常は呼び出すことができません。 代わりに、低レベルのメカニズムを使用する必要があります。
</p>

<pre><code class="javascript">    。
    。
    。
    // Read the entry just written
    const realKey = '0x' + key.slice(4)  // remove the FF flag
    const entryRead = await worm.readEntry(realKey)
    .
    。
    。
</code></pre>

<p spaces-before="0">
  エントリの読み取りには、通常のメカニズムを使用できます。 <code>view</code>関数では、パラメータのキャッシュを使う必要はありません。
</p>



<h2 id="conclusion" spaces-before="0">
  まとめ
</h2>

<p spaces-before="0">
  この記事のコードの目的は、PoC (プルーフ・オブ・コンセプト) で、アイデアを理解しやすくすることです。 本番環境でのシステムでは、次のいくつかの追加機能を実装する必要性が考えられます。
</p>

<ul>
  <li>
    <code>uint256</code>以外の値に対応すること。 例えば、文字列です。
  </li>
  <li>
    グローバルキャッシュの代わりに、ユーザーとキャッシュ間のマッピングを持つことも考えられます。 異なるユーザーで異なる値を使う場合です。
  </li>
  <li>
    アドレスに使用される値は、他の目的に使用される値とは異なります。 アドレス専用の別のキャッシュに分けた方が合理的かもしれません。
  </li>
  <li>
    <p spaces-before="0">
      現在のコードでは、キャッシュキーは「先着最小キー」アルゴリズムになっています。 最初の16個の値は、1バイトとして送信できます。 次の4080個の値は、2バイトとして送信できます。 次の約100万個の値は、3バイトなどとなります。 本番のシステムでは、キャッシュエントリ上で使用量カウンタを保持し、16個の<em x-id="4">最も一般的な</em>値が1バイト、次の4080個にくる一般的な値が2バイトになるようにする等、再編成する必要があります。
    </p>
    <p spaces-before="2">
      ただし、それはリスクのある操作です。 次の一連のイベントを想像してみてください。
    </p>
    <ol start="1">
      <li>
        <p spaces-before="0">
          Noam Naiveは、彼がトークンを送信するアドレスをエンコードするために<code>encodeVal</code>を呼び出します。 これは、アプリケーションで最初に使用されるアドレスの1つであるため、0x06の値にエンコードされます。 また、トランザクションではないため、<code>view</code>関数になります。そのため、Noamと彼が使うノードの間であり、他の人はそれについて知りません。
        </p>
      </li>
      
      <li>
        <p spaces-before="0">
          Owen Ownerは、キャッシュの並べ替え操作を実行します。 そのアドレスを使用する人はほとんどいないため、現在は 0x201122としてエンコードされています。 別の値である10<sup>18</sup>には、0x06が割り当てられます。
        </p>
      </li>
      
      <li>
        <p spaces-before="0">
          Noam Naiveは、保有しているトークンを0x06に送信します。 そのトークンは、アドレス <code>0x0000000000000000000000000de0b6b3a7640000</code>に送られますが、そのアドレスの秘密鍵を誰も知らないため、そこにスタックしてしまいます。 Noamにとって<em x-id="4">これは悲惨です</em>。
        </p>
      </li>
    </ol>
    
    <p spaces-before="2">
      この問題とキャッシュの再順序付け中にメモリプール内にあるトランザクションに関連する問題を解決する方法は、いくつかありますが、注意をしなければなりません。
    </p>
  </li>
</ul>

<p spaces-before="0">
  私は、Optimismの従業員なので、最もよく知っているロールアップであるOptimismを使用してキャッシュを説明しました。 内部処理に最小限のコストが発生する他のロールアップでも機能するはずです。他のロールアップを比較すると、L1へのトランザクションデータの書き込みが主なコストとなります。
</p>
