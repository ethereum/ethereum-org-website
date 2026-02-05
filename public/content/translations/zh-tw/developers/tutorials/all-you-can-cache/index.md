---
title: "任你快取"
description: "學習如何創建和使用快取合約，以降低卷軸交易的成本"
author: "作者：Ori Pomerantz"
tags: [ "Layer 2", "快取", "儲存" ]
skill: intermediate
published: 2022-09-15
lang: zh-tw
---

使用卷軸時，交易中一個位元組的成本遠高於一個儲存時隙的成本。 因此，盡可能在鏈上快取資訊是合理的。

在本文中，您將學習如何創建和使用快取合約，讓任何可能被多次使用的參數值都被快取，並在（首次使用後）能以更少的位元組來取用，以及如何撰寫使用此快取的鏈外程式碼。

如果您想跳過文章，直接查看原始程式碼，[請點擊這裡](https://github.com/qbzzt/20220915-all-you-can-cache)。 開發堆疊為 [Foundry](https://getfoundry.sh/introduction/installation/)。

## 總體設計 {#overall-design}

為求簡單，我們假設所有交易參數都是 `uint256`，長度為 32 位元組。 當我們收到一筆交易時，我們會像這樣解析每個參數：

1. 如果第一個位元組是 `0xFF`，則將接下來的 32 個位元組作為參數值並寫入快取。

2. 如果第一個位元組是 `0xFE`，則將接下來的 32 個位元組作為參數值，但_不_寫入快取。

3. 對於任何其他值，將前四個位元作為附加位元組的數量，後四個位元作為快取鍵的最高有效位。 下面有些範例：

   | calldata 中的位元組  |      快取鍵 |
   | :-------------- | -------: |
   | 0x0F            |     0x0F |
   | 0x10,0x10       |     0x10 |
   | 0x12,0xAC       |   0x02AC |
   | 0x2D,0xEA, 0xD6 | 0x0DEAD6 |

## 快取操作 {#cache-manipulation}

快取在 [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) 中實現。 讓我們逐行檢視它。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

這些常數用於解釋特殊情況，即我們提供所有資訊，並選擇是否要將其寫入快取。 寫入快取需要對先前未使用的儲存時隙進行兩次 [`SSTORE`](https://www.evm.codes/#55) 操作，每次成本為 22100 Gas，因此我們將其設為可選。

```solidity

    mapping(uint => uint) public val2key;
```

值與其鍵之間的 [映射](https://www.geeksforgeeks.org/solidity/solidity-mappings/)。 在您送出交易之前，此資訊是編碼值所必需的。

```solidity
    // 位置 n 儲存鍵 n+1 的值，因為我們需要保留
    // 零作為「不在快取中」的標記。
    uint[] public key2val;
```

我們可以使用陣列來進行從鍵到值的映射，因為我們是自己指派鍵，而且為求簡單，我們會循序指派。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

從快取中讀取一個值。

```solidity
    // 如果快取中尚無此值，則將其寫入
    // 設為 public 僅為了讓測試能運作
    function cacheWrite(uint _value) public returns (uint) {
        // 如果該值已在快取中，則回傳目前的鍵
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

將相同的值多次放入快取中是沒有意義的。 如果值已經存在，只需回傳現有的鍵即可。

```solidity
        // 因為 0xFE 是特殊情況，所以快取能容納的最大鍵
        // 是 0x0D 後面跟著 15 個 0xFF。如果快取長度已達
        // 這麼大，就失敗。
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

我不認為我們會有這麼大的快取 (約 1.8\*10<sup>37</sup> 個項目，需要約 10<sup>27</sup> TB 來儲存)。 然而，我的年紀足以記得 ["640kB 永遠夠用"](https://quoteinvestigator.com/2011/09/08/640k-enough/)這句話。 這個測試的成本非常低。

```solidity
        // 使用下一個鍵寫入值
        val2key[_value] = key2val.length+1;
```

新增反向查找 (從值到鍵)。

```solidity
        key2val.push(_value);
```

新增正向查找 (從鍵到值)。 因為我們是循序指派值，所以可以直接將其加在陣列最後一個值的後面。

```solidity
        return key2val.length;
    }  // cacheWrite
```

回傳 `key2val` 的新長度，也就是新值儲存的儲存格。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

此函數從 calldata 讀取任意長度 (最多 32 位元組，即一個字組的大小) 的值。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

這個函數是內部的，所以如果其餘的程式碼都撰寫正確，這些測試就不是必需的。 不過，它們的成本不高，所以不妨保留。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

此程式碼使用 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) 撰寫。 它從 calldata 讀取一個 32 位元組的值。 即使 calldata 在 `startByte+32` 之前就結束了，這段程式碼也能運作，因為 EVM 中未初始化的空間會被視為零。

```solidity
        _retVal = _retVal >> (256-length*8);
```

我們不一定需要一個 32 位元組的值。 這會移除多餘的位元組。

```solidity
        return _retVal;
    } // _calldataVal


    // 從 calldata 讀取單一參數，從 _fromByte 開始
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

從 calldata 讀取單一參數。 請注意，我們不僅需要回傳讀取的值，還需要回傳下一個位元組的位置，因為參數的長度可能從 1 位元組到 33 位元組不等。

```solidity
        // 第一個位元組告訴我們如何解釋其餘的部分
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity 藉由禁止潛在危險的[隱含類型轉換](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions)，試圖減少錯誤的數量。 降級，例如從 256 位元降到 8 位元，需要明確指定。

```solidity

        // 讀取值，但不寫入快取
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 讀取值，並將其寫入快取
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // 如果執行到這裡，表示我們需要從快取中讀取

        // 要讀取的額外位元組數
        uint8 _extraBytes = _firstByte / 16;
```

取較低的[半位元組 (nibble)](https://en.wikipedia.org/wiki/Nibble) 並將其與其他位元組組合，以從快取中讀取值。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // 讀取 n 個參數 (函數知道它們預期有多少個參數)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

我們可以從 calldata 本身取得參數數量，但是呼叫我們的函數知道它們預期有多少個參數。 讓它們告訴我們比較容易。

```solidity
        // 我們讀取的參數
        uint[] memory params = new uint[](_paramNum);

        // 參數從第 4 個位元組開始，之前是函數簽章
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

讀取參數，直到您取得所需的數量。 如果我們超出 calldata 的結尾，`_readParams` 將會還原呼叫。

```solidity

        return(params);
    }   // readParams

    // 用於測試 _readParams，測試讀取四個參數
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry 的一個大優點是它允許用 Solidity 撰寫測試 ([見下文的測試快取](#testing-the-cache))。 這讓單元測試變得容易得多。 這是一個讀取四個參數並回傳它們的函數，以便測試可以驗證它們是否正確。

```solidity
    // 取得一個值，回傳將其編碼的位元組 (如果可能，使用快取)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` 是一個由鏈外程式碼呼叫的函數，用來幫助創建使用快取的 calldata。 它接收單一值並回傳對其編碼的位元組。 此函數是 `view` 函數，所以不需要交易，且從外部呼叫時不消耗任何 Gas。

```solidity
        uint _key = val2key[_val];

        // 該值尚不在快取中，將其加入
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

在 [EVM](/developers/docs/evm/) 中，所有未初始化的儲存空間都假設為零。 所以，如果我們查找一個不存在的值的鍵，我們會得到零。 在這種情況下，編碼它的位元組是 `INTO_CACHE` (這樣下次就會被快取)，後面跟著實際的值。

```solidity
        // 如果鍵 <0x10，則以單一位元組回傳
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

單一位元組是最簡單的。 我們只需使用 [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) 將 `bytes<n>` 類型轉換為任意長度的位元組陣列。 儘管有這個名稱，但當只提供一個參數時，它也能正常運作。

```solidity
        // 兩位元組值，編碼為 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

當我們的鍵小於 16<sup>3</sup> 時，我們可以用兩個位元組來表示它。 我們首先將 256 位元值的 `_key` 轉換為 16 位元值，並使用邏輯「或」將額外位元組的數量加到第一個位元組上。 然後我們將其轉換為 `bytes2` 值，該值可以轉換為 `bytes`。

```solidity
        // 可能有更聰明的方法以迴圈方式處理以下幾行，
        // 但這是一個 view 函數，所以我為了節省程式員時間和簡化而進行優化。

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

其他值 (3 位元組、4 位元組等) 以相同的方式處理，只是欄位大小不同。

```solidity
        // 如果執行到這裡，表示出了問題。
        revert("Error in encodeVal, should not happen");
```

如果我們執行到這裡，表示我們得到了一個不小於 16\*256<sup>15</sup> 的鍵。 但是 `cacheWrite` 限制了鍵的範圍，所以我們甚至無法達到 14\*256<sup>16</sup> (其第一個位元組會是 0xFE，看起來就像 `DONT_CACHE`)。 但是，為了防止未來的程式員引入錯誤，增加一個測試並不會花費太多成本。

```solidity
    } // encodeVal

}  // Cache
```

### 測試快取 {#testing-the-cache}

Foundry 的優點之一是 [它允許您用 Solidity 撰寫測試](https://getfoundry.sh/forge/tests/overview/)，這讓撰寫單元測試變得更容易。 `Cache` 類別的測試在[這裡](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)。 因為測試程式碼通常是重複的，所以本文只解釋有趣的部分。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// 需要執行 `forge test -vv` 才能使用主控台。
import "forge-std/console.sol";
```

這只是使用測試套件和 `console.log` 所需的樣板程式碼。

```solidity
import "src/Cache.sol";
```

我們需要知道我們正在測試的合約。

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` 函數在每次測試前被呼叫。 在這種情況下，我們只是創建一個新的快取，這樣我們的測試就不會互相影響。

```solidity
    function testCaching() public {
```

測試是以 `test` 開頭的函數。 此函數檢查基本的快取功能，即寫入值並再次讀取它們。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

這就是您如何使用 [`assert...` 函數](https://getfoundry.sh/reference/forge-std/std-assertions/) 進行實際測試的方式。 在這種情況下，我們檢查我們寫入的值是否與我們讀取的值相同。 我們可以捨棄 `cache.cacheWrite` 的結果，因為我們知道快取鍵是線性指派的。

```solidity
        }
    }    // testCaching


    // 將相同的值多次快取，確保鍵保持不變
    // the same
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

首先，我們將每個值寫入快取兩次，並確保鍵是相同的 (表示第二次寫入沒有真正發生)。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理論上，可能存在一個不影響連續快取寫入的錯誤。 所以這裡我們做一些非連續的寫入，看看值是否仍然沒有被重寫。

```solidity
    // 從記憶體緩衝區讀取 uint (以確保我們取回我們送出的參數)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

從 `bytes memory` 緩衝區讀取一個 256 位元字組。 這個實用功能快鍵讓我們可以驗證當我們執行使用快取的函數呼叫時，是否收到正確的結果。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul 不支援 `uint256` 以外的數據結構，所以當您引用更複雜的數據結構時，例如記憶體緩衝區 `_bytes`，您會得到該結構的地址。 Solidity 將 `bytes memory` 值儲存為一個 32 位元組字組，其中包含長度，後面跟著實際的位元組，所以要取得位元組編號 `_start`，我們需要計算 `_bytes+32+_start`。

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() 的函數簽章，由
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d 提供
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 只是一些常數值，用來查看我們是否取回正確的值
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

一些我們測試所需的常數。

```solidity
    function testReadParam() public {
```

呼叫 `fourParams()`，一個使用 `readParams` 的函數，來測試我們是否能正確讀取參數。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

我們不能使用正常的 ABI 機制來呼叫使用快取的函數，所以我們需要使用低階的 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 機制。 該機制接受一個 `bytes memory` 作為輸入，並回傳它 (以及一個布林值) 作為輸出。

```solidity
        // 第一次呼叫，快取是空的
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

讓同一個合約同時支援快取函數 (用於直接從交易呼叫) 和非快取函數 (用於從其他智能合約呼叫) 是很有用的。 為此，我們需要繼續依賴 Solidity 的機制來呼叫正確的函數，而不是將所有東西都放在[一個 `fallback` 函數](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function)中。 這樣做使得可組合性變得容易得多。 在大多數情況下，單一位元組就足以識別函數，所以我們浪費了三個位元組 (16\*3=48 Gas)。 然而，在我寫這篇文章的時候，那 48 Gas 的成本是 0.07 美分，對於更簡單、更少錯誤的程式碼來說，這是一個合理的成本。

```solidity
            // 第一個值，將它加入快取
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

第一個值：一個旗標，表示這是一個需要寫入快取的完整值，後面跟著值的 32 個位元組。 其他三個值是相似的，除了 `VAL_B` 沒有寫入快取，而 `VAL_C` 既是第三個參數也是第四個參數。

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

這就是我們實際呼叫 `Cache` 合約的地方。

```solidity
        assertEq(_success, true);
```

我們預期呼叫會成功。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

我們從一個空的快取開始，然後加入 `VAL_A`，接著是 `VAL_C`。 我們預期第一個的鍵是 1，第二個是 2。

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

輸出是四個參數。 這裡我們驗證它是正確的。

```solidity
        // 第二次呼叫，我們可以使用快取
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 快取中的第一個值
            bytes1(0x01),
```

小於 16 的快取鍵只有一個位元組。

```solidity
            // 第二個值，不要將它加入快取
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // 第三和第四個值，相同的值
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

呼叫後的測試與第一次呼叫後的測試相同。

```solidity
    function testEncodeVal() public {
```

這個函數與 `testReadParam` 相似，只是我們不顯式地寫入參數，而是使用 `encodeVal()`。

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

在 `testEncodeVal()` 中唯一的額外測試是驗證 `_callInput` 的長度是否正確。 對於第一次呼叫，它是 4+33\*4。 對於第二次，其中每個值都已在快取中，它是 4+1\*4。

```solidity
    // 當鍵超過一個位元組時測試 encodeVal
    // 最多三個位元組，因為填滿快取到四個位元組需要太長時間。
    function testEncodeValBig() public {
        // 將一些值放入快取。
        // 為保持簡單，對值 n 使用鍵 n。
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上面的 `testEncodeVal` 函數只向快取中寫入四個值，因此 [處理多位元組值的函數部分](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) 沒有被檢查到。 但那段程式碼很複雜且容易出錯。

這個函數的第一部分是一個迴圈，它按順序將從 1 到 0x1FFF 的所有值寫入快取，這樣我們就能夠編碼這些值並知道它們的位置。

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // 一個位元組        0x0F
            cache.encodeVal(0x0010),   // 兩個位元組     0x1010
            cache.encodeVal(0x0100),   // 兩個位元組     0x1100
            cache.encodeVal(0x1000)    // 三個位元組 0x201000
        );
```

測試一個位元組、兩個位元組和三個位元組的值。 我們沒有測試超過這個範圍，因為寫入足夠多的堆疊項目 (至少 0x10000000，大約二十五億) 會花費太長時間。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 測試當緩衝區過小時，我們會得到一個 revert
    function testShortCalldata() public {
```

測試在參數不足的異常情況下會發生什麼。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

由於它會還原，我們應該得到的結果是 `false`。

```
    // 使用不存在的快取鍵呼叫
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 第一個值，將它加入快取
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // 第二個值
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

這個函數得到四個完全合法的參數，但快取是空的，所以沒有值可以讀取。

```solidity
        .
        .
        .
    // 測試當緩衝區過長時一切都能正常運作
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 第一次呼叫，快取是空的
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 第一個值，將它加入快取
            cache.INTO_CACHE(), bytes32(VAL_A),

            // 第二個值，將它加入快取
            cache.INTO_CACHE(), bytes32(VAL_B),

            // 第三個值，將它加入快取
            cache.INTO_CACHE(), bytes32(VAL_C),

            // 第四個值，將它加入快取
            cache.INTO_CACHE(), bytes32(VAL_D),

            // 再加上一個值來「祝好運」
            bytes4(0x31112233)
        );
```

此函數傳送五個值。 我們知道第五個值被忽略了，因為它不是一個有效的快取項目，如果它被包含進去，就會導致還原。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## 一個範例應用程式 {#a-sample-app}

用 Solidity 寫測試固然很好，但終究去中心化應用程式需要能夠處理來自鏈外的請求才能派上用場。 本文示範如何在一個名為 `WORM` (意指「寫一次，讀多次」) 的去中心化應用程式中使用快取。 如果一個鍵尚未寫入，您可以將一個值寫入其中。 如果鍵已經寫入，您會得到一個還原。

### 合約 {#the-contract}

[這是合約](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)。 它大部分重複了我們已經用 `Cache` 和 `CacheTest` 做過的事情，所以我們只涵蓋有趣的部分。

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

使用 `Cache` 最簡單的方法是在我們自己的合約中繼承它。

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

這個函數與上面 `CacheTest` 中的 `fourParam` 相似。 因為我們不遵循 ABI 規範，最好不要在函數中聲明任何參數。

```solidity
    // 讓我們更容易被呼叫
    // writeEntryCached() 的函數簽章，由
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3 提供
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

呼叫 `writeEntryCached` 的外部程式碼將需要手動建構 calldata，而不是使用 `worm.writeEntryCached`，因為我們不遵循 ABI 規範。 有這個常數值只是為了讓撰寫更容易。

請注意，即使我們將 `WRITE_ENTRY_CACHED` 定義為狀態變數，要從外部讀取它，也必須使用它的 getter 函數，即 `worm.WRITE_ENTRY_CACHED()`。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

讀取函數是 `view` 函數，所以它不需要交易，也不消耗 Gas。 因此，對參數使用快取沒有任何好處。 對於 view 函數，最好使用更簡單的標準機制。

### 測試程式碼 {#the-testing-code}

[這是合約的測試程式碼](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)。 同樣，我們只看有趣的部分。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[這個 (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) 是我們在 Foundry 測試中指定下一個呼叫應該失敗，以及失敗報告原因的方式。 這適用於我們使用語法 `<contract>.<function name>()` 而不是建構 calldata 並使用低階介面 (`<contract>.call()` 等) 呼叫合約的情況。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

這裡我們利用 `cacheWrite` 回傳快取鍵的特性。 這不是我們期望在生產環境中使用的，因為 `cacheWrite` 會改變狀態，因此只能在交易中呼叫。 交易沒有回傳值，如果它們有結果，這些結果應該以事件的形式發出。 所以 `cacheWrite` 的回傳值只能從鏈上程式碼存取，而鏈上程式碼不需要參數快取。

```solidity
        (_success,) = address(worm).call(_callInput);
```

這就是我們告訴 Solidity，雖然 `<contract address>.call()` 有兩個回傳值，但我們只關心第一個。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

因為我們使用低階的 `<address>.call()` 函數，所以不能使用 `vm.expectRevert()`，而必須查看從呼叫中得到的布林成功值。

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

這是在 Foundry 中驗證程式碼 [正確發出事件](https://getfoundry.sh/reference/cheatcodes/expect-emit/) 的方式。

### 用戶端 {#the-client}

用 Solidity 測試得不到的一件事，就是可以複製貼上到您自己應用程式中的 JavaScript 程式碼。 為了撰寫這段程式碼，我將 WORM 部署到了 [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)，這是 [Optimism](https://www.optimism.io/) 的新測試網。 它的地址是 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)。

[您可以在這裡看到用戶端的 JavaScript 程式碼](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。 如何使用它：

1. 複製 git 儲存庫：

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. 安裝必要的套件：

   ```sh
   cd javascript
   yarn
   ```

3. 複製設定檔：

   ```sh
   cp .env.example .env
   ```

4. 編輯 `.env` 以符合您的設定：

   | 參數                                                            | 數值                                                                                           |
   | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | 一個擁有足夠 ETH 支付交易費用的帳戶的助記詞。 [您可以在這裡免費獲得 Optimism Goerli 網路的 ETH](https://optimismfaucet.xyz/)。 |
   | OPTIMISM_GOERLI_URL | Optimism Goerli 的 URL。 公共端點 `https://goerli.optimism.io` 有速率限制，但足以滿足我們在這裡的需求                 |

5. 執行 `index.js`。

   ```sh
   node index.js
   ```

   這個範例應用程式首先向 WORM 寫入一個項目，顯示 calldata 和 Etherscan 上交易的連結。 然後它會讀回該項目，並顯示它使用的鍵以及項目中的值 (值、區塊號和作者)。

用戶端大部分是正常的去中心化應用程式 JavaScript。 所以我們同樣只會看有趣的部分。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 每次都需要一個新的鍵
    const key = await worm.encodeVal(Number(new Date()))
```

一個給定的時隙只能寫入一次，所以我們使用時間戳來確保我們不會重複使用時隙。

```javascript
const val = await worm.encodeVal("0x600D")

// 寫入一個項目
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers 期望呼叫資料是一個十六進制字串，即 `0x` 後面跟著偶數個十六進制數字。 由於 `key` 和 `val` 都以 `0x` 開頭，我們需要移除這些標頭。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

與 Solidity 測試程式碼一樣，我們不能正常呼叫快取函數。 相反，我們需要使用更低階的機制。

```javascript
    .
    .
    .
    // 讀取剛寫入的項目
    const realKey = '0x' + key.slice(4)  // 移除 FF 旗標
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

對於讀取項目，我們可以使用正常的機制。 對於 `view` 函數，不需要使用參數快取。

## 結論 {#conclusion}

本文中的程式碼是一個概念驗證，目的是讓這個想法更容易理解。 對於一個生產就緒的系統，您可能需要實現一些額外的功能：

- 處理非 `uint256` 的值。 例如，字串。
- 與其使用全域快取，或許可以建立使用者與快取之間的映射。 不同的使用者使用不同的值。
- 用於地址的值與用於其他目的的值是不同的。 單獨為地址建立一個快取可能是有意義的。
- 目前，快取鍵採用「先到先得，鍵值最小」的演算法。 前十六個值可以作為單一位元組傳送。 接下來的 4080 個值可以作為兩個位元組傳送。 接下來大約一百萬個值是三個位元組，依此類推。 一個生產系統應該對快取項目保留使用計數器，並重新組織它們，以便十六個_最常用_的值是一個位元組，接下來的 4080 個最常用值是兩個位元組，依此類推。

  然而，這是一個潛在危險的操作。 想像以下事件序列：

  1. 天真的諾姆 (Noam Naive) 呼叫 `encodeVal` 來編碼他想傳送代幣的地址。 該地址是應用程式上最早使用的地址之一，所以編碼後的值是 0x06。 這是一個 `view` 函數，不是一個交易，所以它只發生在諾姆和他使用的節點之間，沒有其他人知道。

  2. 擁有者歐文 (Owen Owner) 執行快取重新排序操作。 很少有人真正使用那個地址，所以它現在被編碼為 0x201122。 一個不同的值，10<sup>18</sup>，被指派為 0x06。

  3. 天真的諾姆將他的代幣傳送到 0x06。 它們被送到地址 `0x0000000000000000000000000de0b6b3a7640000`，而且由於沒有人知道該地址的私密金鑰，它們就卡在那裡了。 諾姆_非常不開心_。

  有辦法解決這個問題，以及在快取重新排序期間交易在記憶體池中的相關問題，但您必須意識到這一點。

我在這裡用 Optimism 來示範快取，因為我是 Optimism 的員工，這是我最了解的 rollup。 但它應該適用於任何對內部處理收取最低成本的 rollup，這樣相比之下，將交易資料寫入 L1 就成了主要開銷。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

