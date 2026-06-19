---
title: "盡情快取"
description: 了解如何建立與使用快取合約，以降低匯總交易的成本
author: 奧里·波梅蘭茨
tags: ["第二層 (L2)", "快取", "儲存", "擴容"]
skill: intermediate
breadcrumb: 匯總的快取
published: 2022-09-15
lang: zh-tw
---

使用匯總時，交易中一個位元組的成本比儲存時槽的成本昂貴許多。因此，盡可能將更多資訊快取在鏈上是合理的。

在本文中，您將了解如何建立與使用快取合約，使得任何可能被多次使用的參數值都能被快取，並在（第一次之後）以少許的位元組數量供後續使用，以及如何撰寫使用此快取的鏈下程式碼。

如果您想跳過本文直接查看原始碼，[請點擊這裡](https://github.com/qbzzt/20220915-all-you-can-cache)。開發堆疊為 [Foundry](https://getfoundry.sh/introduction/installation/)。

## 整體設計 {#overall-design}

為了簡單起見，我們假設所有交易參數都是 `uint256`，長度為 32 個位元組。當我們收到一筆交易時，我們將如下解析每個參數：

1. 如果第一個位元組是 `0xFF`，則將接下來的 32 個位元組作為參數值，並將其寫入快取。

2. 如果第一個位元組是 `0xFE`，則將接下來的 32 個位元組作為參數值，但_不要_將其寫入快取。

3. 對於任何其他值，將前四個位元作為額外位元組的數量，並將後四個位元作為快取金鑰的最高有效位元。以下是一些範例：

   | 呼叫資料中的位元組 | 快取金鑰 |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## 快取操作 {#cache-manipulation}

快取實作於 [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) 中。讓我們逐行檢視。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

這些常數用於解釋我們提供所有資訊並決定是否將其寫入快取的特殊情況。寫入快取需要對先前未使用的儲存時槽執行兩次 [`SSTORE`](https://www.evm.codes/#55) 操作，每次花費 22100 燃料，因此我們將其設為可選。

```solidity

    mapping(uint => uint) public val2key;
```

值與其金鑰之間的 [對應 (mapping)](https://www.geeksforgeeks.org/solidity/solidity-mappings/)。在您送出交易之前，此資訊對於編碼值是必要的。

```solidity
    // 位置 n 具有金鑰 n+1 的值，因為我們需要保留
    // 零作為「不在快取中」。
    uint[] public key2val;
```

我們可以使用陣列來對應金鑰到值，因為我們負責分配金鑰，而且為了簡單起見，我們按順序進行分配。

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

從快取中讀取一個值。

```solidity
    // 如果值尚未在快取中，則將其寫入快取
    // 僅設為 public 以使測試能夠運作
    function cacheWrite(uint _value) public returns (uint) {
        // 如果值已經在快取中，則返回目前的金鑰
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

將相同的值多次放入快取中是沒有意義的。如果該值已經存在，只需回傳現有的金鑰即可。

```solidity
        // 由於 0xFE 是一個特殊情況，快取能容納的最大金鑰
        // 是 0x0D 後面跟著 15 個 0xFF。如果快取長度已經那麼
        // 大，則失敗。
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

我不認為我們會擁有那麼大的快取（大約 1.8\*10<sup>37</sup> 個項目，這需要大約 10<sup>27</sup> TB 的儲存空間）。然而，我的年紀足以讓我記得 [「640kB 永遠夠用」](https://quoteinvestigator.com/2011/09/08/640k-enough/) 這句話。這個測試的成本非常低。

```solidity
        // 使用下一個金鑰寫入值
        val2key[_value] = key2val.length+1;
```

新增反向查找（從值到金鑰）。

```solidity
        key2val.push(_value);
```

新增正向查找（從金鑰到值）。因為我們按順序分配值，所以我們只需將其新增到最後一個陣列值之後。

```solidity
        return key2val.length;
    }  // cacheWrite
```

回傳 `key2val` 的新長度，這也是儲存新值的儲存格。

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

此函式從任意長度（最多 32 個位元組，即字組大小）的呼叫資料中讀取一個值。

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

此函式是內部的，因此如果其餘程式碼編寫正確，則不需要這些測試。然而，它們的成本不高，所以我們不妨保留它們。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

此程式碼使用 [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) 編寫。它從呼叫資料中讀取一個 32 位元組的值。即使呼叫資料在 `startByte+32` 之前結束，這也能正常運作，因為 EVM 中未初始化的空間被視為零。

```solidity
        _retVal = _retVal >> (256-length*8);
```

我們不一定需要 32 位元組的值。這會去除多餘的位元組。

```solidity
        return _retVal;
    } // _calldataVal


    // 從呼叫資料中讀取單個參數，從 _fromByte 開始
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

從呼叫資料中讀取單一參數。請注意，我們不僅需要回傳讀取到的值，還需要回傳下一個位元組的位置，因為參數的長度範圍可以從 1 個位元組到 33 個位元組。

```solidity
        // 第一個位元組告訴我們如何解釋其餘部分
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity 試圖透過禁止潛在危險的 [隱式型別轉換](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) 來減少錯誤數量。降級轉換（例如從 256 位元降至 8 位元）必須是明確的。

```solidity

        // 讀取值，但不將其寫入快取
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // 讀取值，並將其寫入快取
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // 如果我們到了這裡，這意味著我們需要從快取中讀取

        // 要讀取的額外位元組數
        uint8 _extraBytes = _firstByte / 16;
```

取較低的 [半位元組 (nibble)](https://en.wikipedia.org/wiki/Nibble) 並將其與其他位元組結合，以從快取中讀取值。

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // 讀取 n 個參數（函式知道它們預期有多少個參數）
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

我們可以從呼叫資料本身取得我們擁有的參數數量，但呼叫我們的函式知道它們預期有多少個參數。讓它們告訴我們會更容易。

```solidity
        // 我們讀取的參數
        uint[] memory params = new uint[](_paramNum);

        // 參數從第 4 個位元組開始，在此之前是函式簽章
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

讀取參數，直到達到您需要的數量。如果我們超出了呼叫資料的結尾，`_readParams` 將會回滾呼叫。

```solidity

        return(params);
    }   // readParams

    // 為了測試 _readParams，測試讀取四個參數
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry 的一大優勢是它允許使用 Solidity 撰寫測試（[請參閱下方的測試快取](#testing-the-cache)）。這使得單元測試變得容易許多。這是一個讀取四個參數並回傳它們的函式，以便測試可以驗證它們是否正確。

```solidity
    // 取得一個值，返回將對其進行編碼的位元組（如果可能，使用快取）
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` 是鏈下程式碼呼叫的函式，用於協助建立使用快取的呼叫資料。它接收單一值並回傳編碼該值的位元組。此函式是一個 `view`，因此它不需要交易，且在外部呼叫時不會消耗任何燃料。

```solidity
        uint _key = val2key[_val];

        // 該值尚未在快取中，將其加入
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

在 [EVM](/developers/docs/evm/) 中，所有未初始化的儲存空間都被假定為零。因此，如果我們尋找一個不存在的值的金鑰，我們會得到零。在這種情況下，編碼它的位元組是 `INTO_CACHE`（因此下次它將被快取），後面跟著實際的值。

```solidity
        // 如果金鑰 <0x10，則將其作為單個位元組返回
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

單一位元組是最簡單的。我們只需使用 [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) 將 `bytes<n>` 型別轉換為可以是任何長度的位元組陣列。儘管名稱如此，當只提供一個引數時，它也能正常運作。

```solidity
        // 兩個位元組的值，編碼為 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

當我們有一個小於 16<sup>3</sup> 的金鑰時，我們可以用兩個位元組來表示它。我們首先將 256 位元值的 `_key` 轉換為 16 位元值，並使用邏輯 OR 將額外位元組的數量加到第一個位元組。然後我們只需將其轉換為 `bytes2` 值，該值可以轉換為 `bytes`。

```solidity
        // 可能有一種聰明的方法可以將以下幾行作為迴圈執行，
        // 但這是一個 view 函式，所以我針對程式設計師的時間和
        // 簡單性進行了最佳化。

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

其他值（3 個位元組、4 個位元組等）的處理方式相同，只是欄位大小不同。

```solidity
        // 如果我們到了這裡，表示出了問題。
        revert("Error in encodeVal, should not happen");
```

如果我們執行到這裡，這意味著我們得到了一個不小於 16\*256<sup>15</sup> 的金鑰。但是 `cacheWrite` 限制了金鑰，所以我們甚至無法達到 14\*256<sup>16</sup>（其第一個位元組將是 0xFE，因此它看起來會像 `DONT_CACHE`）。但是新增一個測試以防未來的程式設計師引入錯誤，並不會花費我們太多成本。

```solidity
    } // encodeVal

}  // Cache
```

### 測試快取 {#testing-the-cache}

Foundry 的優勢之一是 [它讓您可以使用 Solidity 撰寫測試](https://getfoundry.sh/forge/tests/overview/)，這使得撰寫單元測試變得更容易。`Cache` 類別的測試在 [這裡](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol)。因為測試程式碼通常是重複的，所以本文只解釋有趣的部分。

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// 需要執行 `forge test -vv` 才能在主控台顯示。
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

`setUp` 函式會在每次測試之前被呼叫。在這種情況下，我們只是建立一個新的快取，這樣我們的測試就不會互相影響。

```solidity
    function testCaching() public {
```

測試是名稱以 `test` 開頭的函式。此函式檢查基本的快取功能，寫入值並再次讀取它們。

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

這就是您使用 [`assert...` 函式](https://getfoundry.sh/reference/forge-std/std-assertions/) 進行實際測試的方式。在這種情況下，我們檢查我們寫入的值是否是我們讀取的值。我們可以捨棄 `cache.cacheWrite` 的結果，因為我們知道快取金鑰是線性分配的。

```solidity
        }
    }    // testCaching


    // 多次快取相同的值，確保金鑰保持
    // 不變
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

首先，我們將每個值寫入快取兩次，並確保金鑰相同（這意味著第二次寫入並沒有真正發生）。

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

理論上，可能存在一個不影響連續快取寫入的錯誤。因此，我們在這裡進行一些不連續的寫入，並觀察這些值仍然沒有被重寫。

```solidity
    // 從記憶體緩衝區讀取 uint（以確保我們取回
    // 我們送出的參數）
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

從 `bytes memory` 緩衝區讀取一個 256 位元的字組。這個公用函式讓我們能夠驗證當我們執行使用快取的函式呼叫時，是否收到正確的結果。

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul 不支援 `uint256` 以外的資料結構，因此當您參照更複雜的資料結構（例如記憶體緩衝區 `_bytes`）時，您會得到該結構的地址。Solidity 將 `bytes memory` 值儲存為一個包含長度的 32 位元組字組，後面跟著實際的位元組，因此要取得第 `_start` 個位元組，我們需要計算 `_bytes+32+_start`。

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() 的函式簽章，由以下提供
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // 只是一些常數值，以查看我們是否取回了正確的值
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

我們測試所需的一些常數。

```solidity
    function testReadParam() public {
```

呼叫 `fourParams()`（一個使用 `readParams` 的函式），以測試我們是否能正確讀取參數。

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

我們無法使用一般的 ABI 機制來呼叫使用快取的函式，因此我們需要使用低階的 [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) 機制。該機制將 `bytes memory` 作為輸入，並將其（以及一個布林值）作為輸出回傳。

```solidity
        // 第一次呼叫，快取是空的
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

讓同一個合約同時支援快取函式（用於直接來自交易的呼叫）和非快取函式（用於來自其他智慧合約的呼叫）是很有用的。為此，我們需要繼續依賴 Solidity 機制來呼叫正確的函式，而不是將所有內容都放入 [一個 `fallback` 函式](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) 中。這樣做使得可組合性變得容易許多。在大多數情況下，單一位元組就足以識別函式，因此我們浪費了三個位元組（16\*3=48 燃料）。然而，在我撰寫本文時，這 48 燃料的成本為 0.07 美分，對於更簡單、更不容易出錯的程式碼來說，這是一個合理的成本。

```solidity
            // 第一個值，將其加入快取
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

第一個值：一個旗標，表示這是一個需要寫入快取的完整值，後面跟著該值的 32 個位元組。其他三個值類似，除了 `VAL_B` 不會寫入快取，且 `VAL_C` 同時是第三個和第四個參數。

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

這是我們實際呼叫 `Cache` 合約的地方。

```solidity
        assertEq(_success, true);
```

我們預期呼叫會成功。

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

我們從一個空的快取開始，然後新增 `VAL_A`，接著是 `VAL_C`。我們預期第一個金鑰為 1，第二個金鑰為 2。

```
assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

輸出是這四個參數。在這裡我們驗證它是正確的。

```solidity
        // 第二次呼叫，我們可以使用快取
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 快取中的第一個值
            bytes1(0x01),
```

小於 16 的快取金鑰只有一個位元組。

```solidity
            // 第二個值，不要將其加入快取
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

呼叫之後的測試與第一次呼叫之後的測試相同。

```solidity
    function testEncodeVal() public {
```

此函式類似於 `testReadParam`，差別在於我們不直接寫出參數，而是使用 `encodeVal()`。

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

`testEncodeVal()` 中唯一額外的測試是驗證 `_callInput` 的長度是否正確。對於第一次呼叫，它是 4+33\*4。對於第二次呼叫（每個值都已經在快取中），它是 4+1\*4。

```solidity
    // 當金鑰超過單個位元組時測試 encodeVal
    // 最多三個位元組，因為將快取填滿到四個位元組需要
    // 太長時間。
    function testEncodeValBig() public {
        // 將一些值放入快取中。
        // 為了保持簡單，對值 n 使用金鑰 n。
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

上面的 `testEncodeVal` 函式只將四個值寫入快取，因此 [處理多位元組值的部分函式](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) 沒有被檢查到。但該程式碼很複雜且容易出錯。

此函式的第一部分是一個迴圈，它將從 1 到 0x1FFF 的所有值依序寫入快取，這樣我們就能夠編碼這些值並知道它們的去向。

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

測試一個位元組、兩個位元組和三個位元組的值。我們不測試超過這個範圍的值，因為寫入足夠的堆疊項目（至少 0x10000000，大約 2.5 億個）需要花費太長時間。

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // 測試使用過小的緩衝區時我們會得到回滾
    function testShortCalldata() public {
```

測試在沒有足夠參數的異常情況下會發生什麼事。

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

由於它會回滾，我們應該得到的結果是 `false`。

```
// Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // 第一個值，將其加入快取
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

此函式獲得四個完全合法的參數，只是快取是空的，因此沒有值可供讀取。

```solidity
        .
        .
        .
    // 測試使用過長的緩衝區時一切運作正常
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // 第一次呼叫，快取是空的
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(), bytes32(VAL_A),

            // 第二個值，將其加入快取
            cache.INTO_CACHE(), bytes32(VAL_B),

            // 第三個值，將其加入快取
            cache.INTO_CACHE(), bytes32(VAL_C),

            // 第四個值，將其加入快取
            cache.INTO_CACHE(), bytes32(VAL_D),

            // 以及另一個為了「好運」的值
            bytes4(0x31112233)
        );
```

此函式傳送五個值。我們知道第五個值會被忽略，因為它不是有效的快取項目，如果沒有包含它，就會導致回滾。

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## 範例應用程式 {#a-sample-app}

使用 Solidity 撰寫測試固然很好，但歸根究底，去中心化應用程式 (dapp) 需要能夠處理來自鏈外的請求才有用。本文示範如何在 dapp 中使用 `WORM` 進行快取，它代表「寫入一次，讀取多次 (Write Once, Read Many)」。如果金鑰尚未寫入，您可以將值寫入其中。如果金鑰已經寫入，您將會得到回滾。

### 合約 {#the-contract}

[這是合約](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)。它主要重複了我們已經對 `Cache` 和 `CacheTest` 所做的事情，因此我們只涵蓋有趣的部分。

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

此函式類似於上方 `CacheTest` 中的 `fourParam`。因為我們不遵循 ABI 規範，所以最好不要在函式中宣告任何參數。

```solidity
    // 讓我們更容易被呼叫
    // writeEntryCached() 的函式簽章，由以下提供
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

呼叫 `writeEntryCached` 的外部程式碼將需要手動建立呼叫資料，而不是使用 `worm.writeEntryCached`，因為我們不遵循 ABI 規範。擁有這個常數值只是為了更容易撰寫它。

請注意，即使我們將 `WRITE_ENTRY_CACHED` 定義為狀態變數，要從外部讀取它，仍必須使用它的 getter 函式 `worm.WRITE_ENTRY_CACHED()`。

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

讀取函式是一個 `view`，因此它不需要交易，也不會消耗燃料。因此，對參數使用快取沒有任何好處。對於 view 函式，最好使用更簡單的標準機制。

### 測試程式碼 {#the-testing-code}

[這是合約的測試程式碼](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)。同樣地，讓我們只看有趣的部分。

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[這 (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) 是我們在 Foundry 測試中指定下一次呼叫應該失敗的方式，以及回報的失敗原因。這適用於我們使用 `<contract>.<function name>()` 語法，而不是建立呼叫資料並使用低階介面（`<contract>.call()` 等）呼叫合約的情況。

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

在這裡，我們利用了 `cacheWrite` 會回傳快取金鑰的事實。這不是我們預期在正式環境中使用的東西，因為 `cacheWrite` 會改變狀態，因此只能在交易期間呼叫。交易沒有回傳值，如果它們有結果，這些結果應該作為事件發出。因此，`cacheWrite` 的回傳值只能從鏈上程式碼存取，而鏈上程式碼不需要參數快取。

```solidity
        (_success,) = address(worm).call(_callInput);
```

這就是我們告訴 Solidity 雖然 `<contract address>.call()` 有兩個回傳值，但我們只關心第一個的方式。

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

由於我們使用低階的 `<address>.call()` 函式，我們無法使用 `vm.expectRevert()`，而必須查看從呼叫中獲得的布林成功值。

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

這是我們在 Foundry 中驗證程式碼 [正確發出事件](https://getfoundry.sh/reference/cheatcodes/expect-emit/) 的方式。

### 用戶端 {#the-client}
Solidity 測試無法提供的一件事是您可以剪下並貼上到您自己應用程式中的 JavaScript 程式碼。為了撰寫該程式碼，我將 WORM 部署到 [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli)（[Optimism](https://www.optimism.io/) 的新測試網）。它的地址是 [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a)。

[您可以在這裡看到用戶端的 JavaScript 程式碼](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)。要使用它：

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

4. 根據您的設定編輯 `.env`：

   | 參數 | 值 |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC | 擁有足夠 ETH 支付交易費用的帳戶助記詞。[您可以在這裡取得 Optimism Goerli 網路的免費 ETH](https://optimismfaucet.xyz/)。 |
   | OPTIMISM_GOERLI_URL | Optimism Goerli 的 URL。公共端點 `https://goerli.optimism.io` 有速率限制，但足以滿足我們在此的需求 |

5. 執行 `index.js`。

   ```sh
   node index.js
   ```

   此範例應用程式首先將一個項目寫入 WORM，顯示呼叫資料以及 Etherscan 上的交易連結。然後它會讀回該項目，並顯示它使用的金鑰以及項目中的值（值、區塊號碼和作者）。

大部分的用戶端都是一般的 Dapp JavaScript。因此，我們同樣只會檢視有趣的部分。

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // 每次都需要一個新的金鑰
    const key = await worm.encodeVal(Number(new Date()))
```

特定的時槽只能寫入一次，因此我們使用時間戳記來確保我們不會重複使用時槽。

```javascript
const val = await worm.encodeVal("0x600D")

// 寫入一個條目
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers 預期呼叫資料是一個十六進位字串，即 `0x` 後面跟著偶數個十六進位數字。由於 `key` 和 `val` 都以 `0x` 開頭，我們需要移除這些標頭。

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

與 Solidity 測試程式碼一樣，我們無法正常呼叫快取函式。相反地，我們需要使用較低階的機制。

```javascript
    .
    .
    .
    // 讀取剛寫入的條目
    const realKey = '0x' + key.slice(4)  // 移除 FF 標記
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

對於讀取項目，我們可以使用一般機制。不需要對 `view` 函式使用參數快取。

## 結論 {#conclusion}

本文中的程式碼是一個概念驗證，目的是讓這個想法容易理解。對於可用於正式環境的系統，您可能需要實作一些額外的功能：

- 處理不是 `uint256` 的值。例如，字串。
- 與其使用全域快取，不如在使用者和快取之間建立對應關係。不同的使用者使用不同的值。
- 用於地址的值與用於其他目的的值是不同的。為地址建立一個獨立的快取可能是合理的。
- 目前，快取金鑰採用「先到先得，金鑰最小」的演算法。前 16 個值可以作為單一位元組傳送。接下來的 4080 個值可以作為兩個位元組傳送。接下來的大約一百萬個值是三個位元組，依此類推。正式系統應該在快取項目上保留使用計數器並重新組織它們，以便 16 個_最常見_的值是一個位元組，接下來 4080 個最常見的值是兩個位元組，依此類推。

  然而，這是一個潛在危險的操作。想像以下事件序列：

  1. Noam Naive 呼叫 `encodeVal` 來編碼他想要傳送代幣的地址。該地址是應用程式上最早使用的地址之一，因此編碼值為 0x06。這是一個 `view` 函式，而不是一筆交易，因此它只發生在 Noam 和他使用的節點之間，沒有其他人知道這件事。

  2. Owen Owner 執行快取重新排序操作。實際上很少人使用該地址，因此它現在被編碼為 0x201122。另一個不同的值 10<sup>18</sup> 被分配為 0x06。

  3. Noam Naive 將他的代幣傳送到 0x06。它們會進入地址 `0x0000000000000000000000000de0b6b3a7640000`，而且因為沒有人知道該地址的私鑰，它們就卡在那裡了。Noam _很不高興_。

  有方法可以解決這個問題，以及在快取重新排序期間處於記憶體池中的交易的相關問題，但您必須意識到這一點。

我在這裡使用 Optimism 示範快取，因為我是 Optimism 的員工，這是我最了解的匯總。但它應該適用於任何對內部處理收取極低成本的匯總，因此相較之下，將交易資料寫入第一層 (L1) 才是主要的開銷。

[請點擊這裡查看我更多的作品](https://cryptodocguy.pro/)。