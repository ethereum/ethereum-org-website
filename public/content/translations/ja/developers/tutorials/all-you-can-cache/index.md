---
title: "キャッシュし放題"
description: "より安価なロールアップトランザクションのためのキャッシングコントラクトの作成と使用方法を学ぶ"
author: "オリ・ポメランツ"
tags:
  - レイヤー2
  - キャッシング
  - ストレージ
  - スケーリング
skill: intermediate
breadcrumb: "ロールアップのキャッシング"
published: 2022-09-15
lang: ja
---

ロールアップを使用する場合、トランザクション内の1バイトのコストは、ストレージスロットのコストよりもはるかに高くなります。したがって、可能な限り多くの情報をオンチェーンにキャッシュすることは理にかなっています。

この記事では、複数回使用される可能性のあるパラメータ値をキャッシュし、（初回以降は）はるかに少ないバイト数で使用できるようにするキャッシングコントラクトの作成と使用方法、およびこのキャッシュを使用するオフチェーンコードの記述方法について学びます。

記事をスキップしてソースコードだけを見たい場合は、[こちら](https://github.com/qbzzt/20220915-all-you-can-cache)をご覧ください。開発スタックは[Foundry](https://getfoundry.sh/introduction/installation/)です。

## 全体的な設計 {#overall-design}

簡単にするため、すべてのトランザクションパラメータは32バイト長の`uint256`であると仮定します。トランザクションを受信すると、各パラメータを次のように解析します。

1. 最初のバイトが`0xFF`の場合、次の32バイトをパラメータ値として取得し、キャッシュに書き込みます。

2. 最初のバイトが`0xFE`の場合、次の32バイトをパラメータ値として取得しますが、キャッシュには書き込み_ません_。

3. その他の値の場合、上位4ビットを追加のバイト数として取得し、下位4ビットをキャッシュキーの最上位ビットとして取得します。以下にいくつか例を示します。

   | コールデータ内のバイト | キャッシュキー |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## キャッシュの操作 {#cache-manipulation}

キャッシュは[`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol)に実装されています。1行ずつ見ていきましょう。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

これらの定数は、すべての情報を提供し、それをキャッシュに書き込むかどうかを選択する特別なケースを解釈するために使用されます。キャッシュへの書き込みには、以前に使用されていないストレージスロットへの2回の[`SSTORE`](https://www.evm.codes/#55)操作が必要であり、それぞれ22100ガスのコストがかかるため、オプションにしています。

```solidity

    mapping(uint => uint) public val2key;
```

値とそのキーの間の[マッピング](https://www.geeksforgeeks.org/solidity/solidity-mappings/)です。この情報は、トランザクションを送信する前に値をエンコードするために必要です。

```solidity
    // 位置nは鍵n+1の値を持つ。なぜなら、
    // ゼロを「キャッシュにない」として保持する必要があるため。
    uint[] public key2val;
```

キーを割り当てるため、キーから値へのマッピングには配列を使用できます。簡単にするために、これを順番に行います。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

キャッシュから値を読み取ります。

```solidity
    // 値がまだキャッシュにない場合、キャッシュに書き込む
    // テストを機能させるためにのみpublicにしている
    function cacheWrite(uint _value) public returns (uint) {
        // 値がすでにキャッシュにある場合、現在の鍵を返す
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

同じ値を複数回キャッシュに入れても意味がありません。値がすでに存在する場合は、既存のキーを返すだけです。

```solidity
        // 0xFEは特殊なケースであるため、キャッシュが保持できる最大の鍵は
        // 0x0Dの後に15個の0xFFが続くものになる。キャッシュの長さがすでにその
        // 大きさである場合、失敗する。
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

これほど大きなキャッシュ（約1.8\*10<sup>37</sup>エントリ、保存には約10<sup>27</sup> TBが必要）になることはないと思います。しかし、私は[「640kBあれば十分」](https://quoteinvestigator.com/2011/09/08/640k-enough/)という言葉を覚えている世代です。このテストは非常に低コストです。

```solidity
        // 次の鍵を使用して値を書き込む
        val2key[_value] = key2val.length+1;
```

逆引き（値からキーへ）を追加します。

```solidity
        key2val.push(_value);
```

正引き（キーから値へ）を追加します。値を順番に割り当てるため、配列の最後の値の後に追加するだけです。

```solidity
        return key2val.length;
    }  // cacheWrite
```

新しい値が保存されているセルである`key2val`の新しい長さを返します。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

この関数は、任意の長さ（最大32バイト、ワードサイズ）のコールデータから値を読み取ります。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

この関数は内部関数であるため、残りのコードが正しく記述されていれば、これらのテストは必要ありません。しかし、コストはそれほどかからないので、念のため入れておきます。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

このコードは[Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html)で書かれています。コールデータから32バイトの値を読み取ります。EVMの未初期化スペースはゼロと見なされるため、コールデータが`startByte+32`の前に終了しても機能します。

```solidity
        _retVal = _retVal >> (256-length*8);
```

必ずしも32バイトの値が必要なわけではありません。これにより、余分なバイトが取り除かれます。

```solidity
        return _retVal;
    } // _calldataVal


    // _fromByteから開始して、コールデータから単一のパラメータを読み取る
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

コールデータから単一のパラメータを読み取ります。パラメータの長さは1バイトから33バイトまであるため、読み取った値だけでなく、次のバイトの位置も返す必要があることに注意してください。

```solidity
        // 最初のバイトは、残りの部分をどのように解釈するかを示す
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidityは、潜在的に危険な[暗黙の型変換](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)を禁止することで、バグの数を減らそうとします。たとえば、256ビットから8ビットへのダウングレードは明示的である必要があります。

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

        // ここに到達した場合、キャッシュから読み取る必要があることを意味する

        // 読み取る追加バイト数
        uint8 _extraBytes = _firstByte / 16;
```

下位の[ニブル](https://en.wikipedia.org/wiki/Nibble)を取得し、他のバイトと組み合わせてキャッシュから値を読み取ります。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n個のパラメータを読み取る（関数は期待するパラメータの数を知っている）
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

コールデータ自体からパラメータの数を取得することもできますが、呼び出し元の関数は期待するパラメータの数を知っています。呼び出し元に教えてもらう方が簡単です。

```solidity
        // 読み取ったパラメータ
        uint[] memory params = new uint[](_paramNum);

        // パラメータはバイト4から始まる。それ以前は関数シグネチャである
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

必要な数になるまでパラメータを読み取ります。コールデータの末尾を越えた場合、`_readParams`は呼び出しをリバートします。

```solidity

        return(params);
    }   // readParams

    // _readParamsをテストするため、4つのパラメータの読み取りをテストする
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundryの大きな利点の1つは、テストをSolidityで記述できることです（[以下の「キャッシュのテスト」を参照](#testing-the-cache)）。これにより、単体テストがはるかに簡単になります。これは、4つのパラメータを読み取って返し、テストでそれらが正しいことを検証できるようにする関数です。

```solidity
    // 値を取得し、それをエンコードするバイトを返す（可能であればキャッシュを使用する）
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal`は、キャッシュを使用するコールデータの作成を支援するためにオフチェーンコードが呼び出す関数です。単一の値を受け取り、それをエンコードするバイトを返します。この関数は`view`であるため、トランザクションを必要とせず、外部から呼び出されたときにガスを消費しません。

```solidity
        uint _key = val2key[_val];

        // 値はまだキャッシュにないため、追加する
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/)では、未初期化のストレージはすべてゼロであると見なされます。したがって、存在しない値のキーを探すと、ゼロが返されます。その場合、それをエンコードするバイトは`INTO_CACHE`（次回キャッシュされるようにするため）であり、その後に実際の値が続きます。

```solidity
        // 鍵が<0x10の場合、単一バイトとして返す
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

1バイトが最も簡単です。[`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat)を使用して、`bytes<n>`型を任意の長さのバイト配列に変換するだけです。名前に反して、引数が1つだけ提供された場合でも正常に機能します。

```solidity
        // 2バイトの値、0x1vvvとしてエンコードされる
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

16<sup>3</sup>未満のキーがある場合、それを2バイトで表現できます。まず、256ビットの値である`_key`を16ビットの値に変換し、論理和を使用して最初のバイトに追加のバイト数を加算します。次に、それを`bytes2`値に変換し、`bytes`に変換できるようにします。

```solidity
        // おそらく以下の行をループとして実行する賢い方法があるが、
        // これはview関数であるため、プログラマーの時間と
        // シンプルさを最適化している。

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

その他の値（3バイト、4バイトなど）も、フィールドサイズが異なるだけで同じように処理されます。

```solidity
        // ここに到達した場合、何かが間違っている。
        revert("Error in encodeVal, should not happen");
```

ここに到達した場合、16\*256<sup>15</sup>以上のキーを取得したことを意味します。しかし、`cacheWrite`はキーを制限しているため、14\*256<sup>16</sup>（最初のバイトが0xFEになるため、`DONT_CACHE`のようになります）に達することすらできません。しかし、将来のプログラマーがバグを混入させた場合に備えてテストを追加しても、それほどコストはかかりません。

```solidity
    } // encodeVal

}  // Cache
```

### キャッシュのテスト {#testing-the-cache}

Foundryの利点の1つは、[テストをSolidityで記述できること](https://getfoundry.sh/forge/tests/overview/)であり、これにより単体テストの記述が容易になります。`Cache`クラスのテストは[こちら](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)にあります。テストコードは反復的になりがちであるため、この記事では興味深い部分のみを説明します。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// コンソールのために`forge test -vv`を実行する必要がある。
import "forge-std/console.sol";
```

これは、テストパッケージと`console.log`を使用するために必要な定型コードです。

```solidity
import "src/Cache.sol";
```

テストするコントラクトを知る必要があります。

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp`関数は、各テストの前に呼び出されます。この場合、テストが互いに影響を与えないように、新しいキャッシュを作成するだけです。

```solidity
    function testCaching() public {
```

テストは、名前が`test`で始まる関数です。この関数は、値を書き込んで再度読み取るという、基本的なキャッシュ機能をチェックします。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

これが、[`assert...`関数](https://getfoundry.sh/reference/forge-std/std-assertions/)を使用して実際のテストを行う方法です。この場合、書き込んだ値が読み取った値であることを確認します。キャッシュキーが線形に割り当てられることがわかっているため、`cache.cacheWrite`の結果は破棄できます。

```solidity
        }
    }    // testCaching


    // 同じ値を複数回キャッシュし、鍵が
    // 同じままであることを確認する
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

まず、各値をキャッシュに2回書き込み、キーが同じであることを確認します（つまり、2回目の書き込みは実際には行われませんでした）。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理論的には、連続したキャッシュの書き込みに影響を与えないバグが存在する可能性があります。そのため、ここでは連続していない書き込みをいくつか行い、値が書き換えられていないことを確認します。

```solidity
    // メモリバッファからuintを読み取る（送信したパラメータが
    // 確実に戻ってくるようにするため）
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory`バッファから256ビットのワードを読み取ります。このユーティリティ関数を使用すると、キャッシュを使用する関数呼び出しを実行したときに正しい結果を受け取ることを検証できます。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yulは`uint256`を超えるデータ構造をサポートしていないため、メモリバッファ`_bytes`などのより高度なデータ構造を参照すると、その構造のアドレスが取得されます。Solidityは`bytes memory`値を、長さを含む32バイトのワードの後に実際のバイトが続く形式で保存するため、バイト番号`_start`を取得するには`_bytes+32+_start`を計算する必要があります。

```solidity

        return tempUint;
    }     // toUint256

    // fourParams()の関数シグネチャ、提供元:
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 正しい値が返ってくるかを確認するためのいくつかの定数値
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

テストに必要な定数です。

```solidity
    function testReadParam() public {
```

`readParams`を使用する関数である`fourParams()`を呼び出して、パラメータを正しく読み取れることをテストします。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

キャッシュを使用する関数を呼び出すために通常のABIメカニズムを使用することはできないため、低レベルの[`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses)メカニズムを使用する必要があります。このメカニズムは`bytes memory`を入力として受け取り、それ（およびブール値）を出力として返します。

```solidity
        // 最初の呼び出し、キャッシュは空である
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

同じコントラクトが、キャッシュされた関数（トランザクションからの直接呼び出し用）とキャッシュされていない関数（他のスマート・コントラクトからの呼び出し用）の両方をサポートすることは有用です。そのためには、すべてを[`fallback`関数](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)に入れるのではなく、正しい関数を呼び出すためにSolidityのメカニズムに依存し続ける必要があります。これにより、コンポーザビリティがはるかに容易になります。ほとんどの場合、関数を識別するには1バイトで十分であるため、3バイト（16\*3=48ガス）を無駄にしています。しかし、これを書いている時点では、その48ガスのコストは0.07セントであり、よりシンプルでバグの発生しにくいコードのコストとしては妥当です。

```solidity
            // 最初の値、キャッシュに追加する
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

最初の値：キャッシュに書き込む必要がある完全な値であることを示すフラグの後に、値の32バイトが続きます。他の3つの値も同様ですが、`VAL_B`はキャッシュに書き込まれず、`VAL_C`は3番目のパラメータと4番目のパラメータの両方である点が異なります。

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

空のキャッシュから開始し、`VAL_A`を追加して、その後に`VAL_C`を追加します。最初のキーは1、2番目のキーは2になることが期待されます。

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

出力は4つのパラメータです。ここでそれが正しいことを検証します。

```solidity
        // 2回目の呼び出し、キャッシュを使用できる
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // キャッシュ内の最初の値
            bytes1(0x01),
```

16未満のキャッシュキーはわずか1バイトです。

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

呼び出し後のテストは、最初の呼び出し後のテストと同じです。

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

`testEncodeVal()`の唯一の追加テストは、`_callInput`の長さが正しいことを検証することです。最初の呼び出しでは4+33\*4です。すべての値がすでにキャッシュにある2回目の呼び出しでは、4+1\*4です。

```solidity
    // 鍵が単一バイトより大きい場合のencodeValをテストする
    // キャッシュを4バイトまで埋めるには時間がかかりすぎるため、
    // 最大3バイトとする。
    function testEncodeValBig() public {
        // キャッシュにいくつかの値を入れる。
        // シンプルにするため、値nには鍵nを使用する。
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上記の`testEncodeVal`関数はキャッシュに4つの値しか書き込まないため、[マルチバイト値を処理する関数の部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171)はチェックされません。しかし、そのコードは複雑でエラーが発生しやすいです。

この関数の最初の部分は、1から0x1FFFまでのすべての値を順番にキャッシュに書き込むループであるため、これらの値をエンコードして、どこに保存されるかを知ることができます。

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

1バイト、2バイト、および3バイトの値をテストします。十分なスタックエントリ（少なくとも0x10000000、約2億5000万）を書き込むのに時間がかかりすぎるため、それ以上のテストは行いません。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 極端に小さいバッファでリバートが発生することをテストする
    function testShortCalldata() public {
```

パラメータが不足している異常なケースで何が起こるかをテストします。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

リバートされるため、得られる結果は`false`になるはずです。

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

この関数は、キャッシュが空で読み取る値がないことを除いて、4つの完全に正当なパラメータを取得します。

```solidity
        .
        .
        .
    // 極端に長いバッファでもすべて正常に機能することをテストする
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 最初の呼び出し、キャッシュは空である
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

            // そして「念のため」のもう一つの値
            bytes4(0x31112233)
        );
```

この関数は5つの値を送信します。5番目の値は有効なキャッシュエントリではないため無視されることがわかっています。もし含まれていなければリバートを引き起こしていたでしょう。

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

Solidityでテストを書くのは非常に良いことですが、結局のところ、分散型アプリケーション (dapp) が役立つためには、チェーンの外部からのリクエストを処理できる必要があります。この記事では、「Write Once, Read Many（一度書き込んで、何度も読み取る）」の略である`WORM`を使用して、dappでキャッシングを使用する方法を示します。キーがまだ書き込まれていない場合は、それに値を書き込むことができます。キーがすでに書き込まれている場合は、リバートされます。

### コントラクト {#the-contract}

[これがコントラクトです](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)。これは主に`Cache`と`CacheTest`ですでに行ったことを繰り返しているため、興味深い部分のみを取り上げます。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache`を使用する最も簡単な方法は、独自のコントラクトでそれを継承することです。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

この関数は、上記の`CacheTest`の`fourParam`に似ています。ABI仕様に従っていないため、関数にパラメータを宣言しないのが最善です。

```solidity
    // 呼び出しを簡単にする
    // writeEntryCached()の関数シグネチャ、提供元:
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

ABI仕様に従っていないため、`writeEntryCached`を呼び出す外部コードは、`worm.writeEntryCached`を使用する代わりに、コールデータを手動で構築する必要があります。この定数値があると、記述が簡単になります。

`WRITE_ENTRY_CACHED`を状態変数として定義していますが、外部から読み取るには、そのゲッター関数である`worm.WRITE_ENTRY_CACHED()`を使用する必要があることに注意してください。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

読み取り関数は`view`であるため、トランザクションを必要とせず、ガスも消費しません。その結果、パラメータにキャッシュを使用する利点はありません。view関数では、よりシンプルな標準メカニズムを使用するのが最善です。

### テストコード {#the-testing-code}

[これがコントラクトのテストコードです](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)。ここでも、興味深い部分のみを見ていきましょう。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[これ（`vm.expectRevert`）](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert)は、Foundryテストで次の呼び出しが失敗するはずであること、および報告される失敗の理由を指定する方法です。これは、コールデータを構築して低レベルインターフェース（`<contract>.call()`など）を使用してコントラクトを呼び出すのではなく、`<contract>.<function name>()`構文を使用する場合に適用されます。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

ここでは、`cacheWrite`がキャッシュキーを返すという事実を使用します。`cacheWrite`は状態を変更するため、トランザクション中にのみ呼び出すことができるため、これは本番環境で使用することが期待されるものではありません。トランザクションには戻り値がなく、結果がある場合、それらの結果はイベントとして発行されることになっています。したがって、`cacheWrite`の戻り値はオンチェーンコードからのみアクセス可能であり、オンチェーンコードはパラメータのキャッシングを必要としません。

```solidity
        (_success,) = address(worm).call(_callInput);
```

これは、`<contract address>.call()`には2つの戻り値があるが、最初の戻り値のみを気にするということをSolidityに伝える方法です。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

低レベルの`<address>.call()`関数を使用するため、`vm.expectRevert()`を使用できず、呼び出しから得られるブール値の成功値を確認する必要があります。

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

### クライアント

Solidityのテストで得られないものの1つは、独自のアプリケーションにカットアンドペーストできるJavaScriptコードです。このチュートリアルの元のバージョンでは、WORMをオプティミズムのゴエリにデプロイしていましたが、その後廃止されました。今日クライアントを実行するには、[OP Sepolia](https://docs.optimism.io/op-stack/introduction/op-stack)などのサポートされているOP StackネットワークにWORMを再デプロイし、結果のコントラクトアドレスをJavaScriptクライアントで使用します。

[クライアントのJavaScriptコードはこちらで確認できます](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。サンプルリポジトリはオプティミズムのゴエリ用に書かれているため、実行する前に、ターゲットネットワークに合わせて`javascript/.env.example`と`javascript/index.js`のRPCエンドポイントとエクスプローラーのURLを更新してください。使用方法は以下の通りです。

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

4. 設定に合わせて`.env`を編集します。

   | パラメータ           | 値                                                                                                                                                               |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC            | トランザクションの支払いに十分なETHを持つアカウントのニーモニック。[オプティミズムのフォーセットドキュメント](https://docs.optimism.io/app-developers/tools/faucets)には、現在のテストネットのフォーセットがリストされています。 |
   | OPTIMISM_GOERLI_URL | WORMを再デプロイするネットワークのRPC URL。OP Sepoliaの場合は、`https://sepolia.optimism.io`などのOP Sepolia RPCエンドポイント、またはプロバイダーの別のエンドポイントを使用します。        |

5. `index.js`を実行します。

   ```sh
   node index.js
   ```

   このサンプルアプリケーションは、最初にWORMにエントリを書き込み、コールデータとブロック・エクスプローラー上のトランザクションへのリンクを表示します。次に、そのエントリを読み戻し、使用する鍵とエントリ内の値（値、ブロック番号、および作成者）を表示します。

クライアントの大部分は通常のdappのJavaScriptです。そのため、ここでも興味深い部分のみを見ていきます。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 毎回新しい鍵が必要
    const key = await worm.encodeVal(Number(new Date()))
```

特定のスロットには1回しか書き込むことができないため、タイムスタンプを使用してスロットを再利用しないようにします。

```javascript
const val = await worm.encodeVal("0x600D")

// エントリを書き込む
const calldata = func + key.slice(2) + val.slice(2)
```

Ethersは、コールデータが16進数文字列、つまり`0x`の後に偶数個の16進数が続く形式であることを期待しています。`key`と`val`はどちらも`0x`で始まるため、これらのヘッダーを削除する必要があります。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidityのテストコードと同様に、キャッシュされた関数を通常の方法で呼び出すことはできません。代わりに、より低レベルのメカニズムを使用する必要があります。

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

エントリの読み取りには、通常のメカニズムを使用できます。`view`関数でパラメータのキャッシングを使用する必要はありません。
## 結論 {#conclusion}

この記事のコードは概念実証であり、目的はアイデアを理解しやすくすることです。本番環境に対応したシステムでは、いくつかの追加機能を実装することをお勧めします。

- `uint256`ではない値を処理する。たとえば、文字列など。
- グローバルキャッシュの代わりに、ユーザーとキャッシュの間のマッピングを持たせる。異なるユーザーは異なる値を使用します。
- アドレスに使用される値は、他の目的に使用される値とは異なります。アドレス専用の個別のキャッシュを用意することは理にかなっているかもしれません。
- 現在、キャッシュキーは「先着順、最小キー」アルゴリズムに基づいています。最初の16個の値は1バイトとして送信できます。次の4080個の値は2バイトとして送信できます。次の約100万個の値は3バイトなどです。本番システムでは、キャッシュエントリの使用カウンターを保持し、_最も一般的な_16個の値が1バイト、次の4080個の最も一般的な値が2バイトになるように再編成する必要があります。

  ただし、これは潜在的に危険な操作です。次の一連のイベントを想像してみてください。

  1. ノーム・ナイーブは、トークンを送信したいアドレスをエンコードするために`encodeVal`を呼び出します。そのアドレスはアプリケーションで最初に使用されたものの1つであるため、エンコードされた値は0x06です。これはトランザクションではなく`view`関数であるため、ノームと彼が使用するノードの間でのみ行われ、他の誰もそれを知りません。

  2. オーウェン・オーナーはキャッシュの再編成操作を実行します。そのアドレスを実際に使用する人はごくわずかであるため、現在は0x201122としてエンコードされています。別の値である10<sup>18</sup>に0x06が割り当てられます。

  3. ノーム・ナイーブはトークンを0x06に送信します。それらはアドレス`0x0000000000000000000000000de0b6b3a7640000`に送られますが、そのアドレスの秘密鍵を誰も知らないため、そこで動けなくなります。ノームは_不満_です。

  この問題や、キャッシュの再編成中にメンプールにあるトランザクションの関連問題を解決する方法はありますが、それを認識しておく必要があります。

私はオプティミズムの従業員であり、これが私が最もよく知っているロールアップであるため、ここではオプティミズムを使用してキャッシングをデモンストレーションしました。しかし、内部処理に最小限のコストしかかからず、比較してトランザクションデータをレイヤー1 (L1) に書き込むことが主な費用となるようなロールアップであれば、どれでも機能するはずです。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。
