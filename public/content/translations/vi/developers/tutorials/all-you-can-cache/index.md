---
title: "Tất cả những gì bạn có thể lưu vào bộ nhớ đệm"
description: "Tìm hiểu cách tạo và sử dụng hợp đồng bộ nhớ đệm cho các giao dịch rollup rẻ hơn"
author: Ori Pomerantz
tags: [ "lớp 2", "bộ nhớ đệm", "lưu trữ" ]
skill: intermediate
published: 2022-09-15
lang: vi
---

Khi sử dụng các rollup, chi phí của một byte trong giao dịch đắt hơn nhiều so với chi phí của một khe lưu trữ. Do đó, việc lưu vào bộ nhớ đệm càng nhiều thông tin trên chuỗi càng tốt.

Trong bài viết này, bạn sẽ tìm hiểu cách tạo và sử dụng hợp đồng bộ nhớ đệm theo cách mà bất kỳ giá trị tham số nào có khả năng được sử dụng nhiều lần sẽ được lưu vào bộ nhớ đệm và có sẵn để sử dụng (sau lần đầu tiên) với số byte nhỏ hơn nhiều, và cách viết mã ngoài chuỗi sử dụng bộ nhớ đệm này.

Nếu bạn muốn bỏ qua bài viết và chỉ xem mã nguồn, [nó ở đây](https://github.com/qbzzt/20220915-all-you-can-cache). Ngăn xếp phát triển là [Foundry](https://getfoundry.sh/introduction/installation/).

## Thiết kế tổng thể {#overall-design}

Để đơn giản, chúng ta sẽ giả định tất cả các tham số giao dịch là `uint256`, dài 32 byte. Khi chúng tôi nhận được một giao dịch, chúng tôi sẽ phân tích từng tham số như sau:

1. Nếu byte đầu tiên là `0xFF`, hãy lấy 32 byte tiếp theo làm giá trị tham số và ghi nó vào bộ nhớ đệm.

2. Nếu byte đầu tiên là `0xFE`, hãy lấy 32 byte tiếp theo làm giá trị tham số nhưng _không_ ghi nó vào bộ nhớ đệm.

3. Đối với bất kỳ giá trị nào khác, hãy lấy bốn bit trên cùng làm số byte bổ sung và bốn bit dưới cùng làm các bit có nghĩa nhất của khóa bộ nhớ đệm. Đây là một vài ví dụ:

   | Các byte trong dữ liệu lệnh gọi | Khóa bộ nhớ đệm |
   | :------------------------------ | --------------: |
   | 0x0F                            |            0x0F |
   | 0x10,0x10                       |            0x10 |
   | 0x12,0xAC                       |          0x02AC |
   | 0x2D,0xEA, 0xD6                 |        0x0DEAD6 |

## Thao tác bộ nhớ đệm {#cache-manipulation}

Bộ nhớ đệm được triển khai trong [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol). Hãy xem xét từng dòng một.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

Các hằng số này được sử dụng để diễn giải các trường hợp đặc biệt mà chúng tôi cung cấp tất cả thông tin và muốn hoặc không muốn nó được ghi vào bộ nhớ đệm. Việc ghi vào bộ nhớ đệm đòi hỏi hai thao tác [`SSTORE`](https://www.evm.codes/#55) vào các khe lưu trữ chưa được sử dụng trước đây với chi phí 22100 gas mỗi lần, vì vậy chúng tôi đặt nó làm tùy chọn.

```solidity

    mapping(uint => uint) public val2key;
```

[Ánh xạ](https://www.geeksforgeeks.org/solidity/solidity-mappings/) giữa các giá trị và khóa của chúng. Thông tin này là cần thiết để mã hóa các giá trị trước khi bạn gửi giao dịch.

```solidity
    // Vị trí n có giá trị cho khóa n+1, vì chúng ta cần giữ lại
    // giá trị không là "không có trong bộ nhớ đệm".
    uint[] public key2val;
```

Chúng ta có thể sử dụng một mảng để ánh xạ từ khóa đến giá trị vì chúng ta gán các khóa, và để đơn giản, chúng ta thực hiện tuần tự.

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    }  // cacheRead
```

Đọc một giá trị từ bộ nhớ đệm.

```solidity
    // Ghi một giá trị vào bộ nhớ đệm nếu nó chưa có ở đó
    // Chỉ ở chế độ công khai để cho phép kiểm thử hoạt động
    function cacheWrite(uint _value) public returns (uint) {
        // Nếu giá trị đã có trong bộ nhớ đệm, trả về khóa hiện tại
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

Không có ích gì khi đặt cùng một giá trị vào bộ nhớ đệm nhiều hơn một lần. Nếu giá trị đã có ở đó, chỉ cần trả về khóa hiện có.

```solidity
        // Vì 0xFE là một trường hợp đặc biệt, khóa lớn nhất mà bộ nhớ đệm có thể
        // chứa là 0x0D theo sau là 15 lần 0xFF. Nếu độ dài bộ nhớ đệm đã là
        // lớn như vậy, thì sẽ thất bại.
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "tràn bộ nhớ đệm");
```

Tôi không nghĩ chúng ta sẽ có một bộ nhớ đệm lớn đến vậy (khoảng 1,8\*10<sup>37</sup> mục, cần khoảng 10<sup>27</sup> TB để lưu trữ). Tuy nhiên, tôi đủ già để nhớ câu ["640kB sẽ luôn đủ"](https://quoteinvestigator.com/2011/09/08/640k-enough/). Kiểm thử này rất rẻ.

```solidity
        // Ghi giá trị bằng cách sử dụng khóa tiếp theo
        val2key[_value] = key2val.length+1;
```

Thêm tra cứu ngược (từ giá trị đến khóa).

```solidity
        key2val.push(_value);
```

Thêm tra cứu xuôi (từ khóa đến giá trị). Vì chúng ta gán các giá trị một cách tuần tự, chúng ta chỉ cần thêm nó vào sau giá trị mảng cuối cùng.

```solidity
        return key2val.length;
    }  // cacheWrite
```

Trả về độ dài mới của `key2val`, là ô chứa giá trị mới được lưu trữ.

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

Hàm này đọc một giá trị từ dữ liệu lệnh gọi có độ dài tùy ý (lên đến 32 byte, kích thước của một từ).

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "Giới hạn độ dài của _calldataVal là 32 byte");
        require(length + startByte <= msg.data.length,
            "_calldataVal đang cố đọc vượt quá kích thước dữ liệu lệnh gọi");
```

Hàm này là nội bộ, vì vậy nếu phần còn lại của mã được viết chính xác, các kiểm thử này không bắt buộc. Tuy nhiên, chúng không tốn kém nhiều nên chúng ta cũng có thể giữ chúng.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Mã này nằm trong [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html). Nó đọc một giá trị 32 byte từ dữ liệu lệnh gọi. Điều này hoạt động ngay cả khi dữ liệu lệnh gọi dừng trước `startByte+32` vì không gian chưa được khởi tạo trong Máy ảo Ethereum (EVM) được coi là bằng không.

```solidity
        _retVal = _retVal >> (256-length*8);
```

Chúng ta không nhất thiết muốn có một giá trị 32 byte. Điều này loại bỏ các byte dư thừa.

```solidity
        return _retVal;
    } // _calldataVal


    // Đọc một tham số duy nhất từ dữ liệu lệnh gọi, bắt đầu từ _fromByte
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

Đọc một tham số duy nhất từ dữ liệu lệnh gọi. Lưu ý rằng chúng ta cần trả về không chỉ giá trị đã đọc, mà còn cả vị trí của byte tiếp theo vì các tham số có thể có độ dài từ 1 byte đến 33 byte.

```solidity
        // Byte đầu tiên cho chúng ta biết cách diễn giải phần còn lại
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity cố gắng giảm số lượng lỗi bằng cách cấm các [chuyển đổi kiểu ngầm](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) tiềm ẩn nguy hiểm. Việc hạ cấp, ví dụ từ 256 bit xuống 8 bit, cần phải được thực hiện một cách rõ ràng.

```solidity

        // Đọc giá trị, nhưng không ghi vào bộ nhớ đệm
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // Đọc giá trị và ghi vào bộ nhớ đệm
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // Nếu chúng ta đến đây, điều đó có nghĩa là chúng ta cần đọc từ bộ nhớ đệm

        // Số byte bổ sung để đọc
        uint8 _extraBytes = _firstByte / 16;
```

Lấy [nibble](https://en.wikipedia.org/wiki/Nibble) thấp hơn và kết hợp nó với các byte khác để đọc giá trị từ bộ nhớ đệm.

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // Đọc n tham số (các hàm biết chúng mong đợi bao nhiêu tham số)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

Chúng ta có thể lấy số lượng tham số từ chính dữ liệu lệnh gọi, nhưng các hàm gọi chúng ta biết chúng mong đợi bao nhiêu tham số. Để chúng cho chúng ta biết sẽ dễ dàng hơn.

```solidity
        // Các tham số chúng tôi đọc
        uint[] memory params = new uint[](_paramNum);

        // Các tham số bắt đầu ở byte 4, trước đó là chữ ký hàm
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

Đọc các tham số cho đến khi bạn có đủ số lượng cần thiết. Nếu chúng ta vượt qua cuối dữ liệu lệnh gọi, `_readParams` sẽ hoàn nguyên lệnh gọi.

```solidity

        return(params);
    }   // readParams

    // Để kiểm thử _readParams, hãy kiểm thử việc đọc bốn tham số
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Một lợi thế lớn của Foundry là nó cho phép viết các bài kiểm thử bằng Solidity ([xem Kiểm thử bộ nhớ đệm bên dưới](#testing-the-cache)). Điều này giúp việc kiểm thử đơn vị dễ dàng hơn rất nhiều. Đây là một hàm đọc bốn tham số và trả về chúng để bài kiểm thử có thể xác minh chúng là chính xác.

```solidity
    // Lấy một giá trị, trả về các byte sẽ mã hóa nó (sử dụng bộ nhớ đệm nếu có thể)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` là một hàm mà mã ngoài chuỗi gọi để giúp tạo dữ liệu lệnh gọi sử dụng bộ nhớ đệm. Nó nhận một giá trị duy nhất và trả về các byte mã hóa nó. Hàm này là một `view`, vì vậy nó không yêu cầu giao dịch và khi được gọi từ bên ngoài không tốn bất kỳ gas nào.

```solidity
        uint _key = val2key[_val];

        // Giá trị chưa có trong bộ nhớ đệm, hãy thêm nó vào
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

Trong [Máy ảo Ethereum (EVM)](/developers/docs/evm/), tất cả bộ nhớ chưa được khởi tạo được giả định là số không. Vì vậy, nếu chúng ta tìm khóa cho một giá trị không có ở đó, chúng ta sẽ nhận được một số không. Trong trường hợp đó, các byte mã hóa nó là `INTO_CACHE` (để nó sẽ được lưu vào bộ nhớ đệm trong lần tiếp theo), theo sau là giá trị thực tế.

```solidity
        // Nếu khóa <0x10, trả về nó dưới dạng một byte duy nhất
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

Các byte đơn lẻ là dễ nhất. Chúng tôi chỉ sử dụng [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) để biến một loại `bytes<n>` thành một mảng byte có thể có độ dài bất kỳ. Mặc dù có tên như vậy, nó hoạt động tốt khi được cung cấp chỉ một đối số.

```solidity
        // Giá trị hai byte, được mã hóa là 0x1vvv
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

Khi chúng ta có một khóa nhỏ hơn 16<sup>3</sup>, chúng ta có thể biểu diễn nó bằng hai byte. Đầu tiên, chúng ta chuyển đổi `_key`, là một giá trị 256 bit, thành một giá trị 16 bit và sử dụng phép toán OR logic để thêm số byte bổ sung vào byte đầu tiên. Sau đó, chúng ta chỉ cần chuyển nó thành một giá trị `bytes2`, có thể được chuyển đổi thành `bytes`.

```solidity
        // Có lẽ có một cách thông minh để thực hiện các dòng sau dưới dạng một vòng lặp,
        // nhưng đó là một hàm view nên tôi đang tối ưu hóa thời gian và
        // sự đơn giản cho lập trình viên.

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

Các giá trị khác (3 byte, 4 byte, v.v.) được xử lý theo cùng một cách, chỉ với các kích thước trường khác nhau.

```solidity
        // Nếu chúng ta đến đây, có điều gì đó không ổn.
        revert("Lỗi trong encodeVal, không nên xảy ra");
```

Nếu chúng ta đến đây, điều đó có nghĩa là chúng ta đã có một khóa không nhỏ hơn 16\*256<sup>15</sup>. Nhưng `cacheWrite` giới hạn các khóa nên chúng ta thậm chí không thể đạt đến 14\*256<sup>16</sup> (sẽ có byte đầu tiên là 0xFE, vì vậy nó sẽ trông giống như `DONT_CACHE`). Nhưng việc thêm một bài kiểm thử không tốn nhiều chi phí trong trường hợp một lập trình viên tương lai tạo ra một lỗi.

```solidity
    } // encodeVal

}  // Cache
```

### Kiểm thử bộ nhớ đệm {#testing-the-cache}

Một trong những lợi thế của Foundry là [nó cho phép bạn viết các bài kiểm thử bằng Solidity](https://getfoundry.sh/forge/tests/overview/), giúp viết các bài kiểm thử đơn vị dễ dàng hơn. Các bài kiểm thử cho lớp `Cache` nằm ở [đây](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol). Vì mã kiểm thử có tính lặp lại, như các bài kiểm thử thường như vậy, bài viết này chỉ giải thích các phần thú vị.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// Cần chạy `forge test -vv` cho bảng điều khiển.
import "forge-std/console.sol";
```

Đây chỉ là bản soạn sẵn cần thiết để sử dụng gói kiểm thử và `console.log`.

```solidity
import "src/Cache.sol";
```

Chúng ta cần biết hợp đồng mà chúng ta đang kiểm thử.

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

Hàm `setUp` được gọi trước mỗi lần kiểm thử. Trong trường hợp này, chúng ta chỉ tạo một bộ nhớ đệm mới để các bài kiểm thử của chúng ta sẽ không ảnh hưởng đến nhau.

```solidity
    function testCaching() public {
```

Các bài kiểm thử là các hàm có tên bắt đầu bằng `test`. Hàm này kiểm tra chức năng cơ bản của bộ nhớ đệm, ghi các giá trị và đọc lại chúng.

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

Đây là cách bạn thực hiện kiểm thử thực tế, bằng cách sử dụng [các hàm `assert...`](https://getfoundry.sh/reference/forge-std/std-assertions/). Trong trường hợp này, chúng ta kiểm tra xem giá trị chúng ta đã viết có phải là giá trị chúng ta đã đọc không. Chúng ta có thể bỏ qua kết quả của `cache.cacheWrite` vì chúng ta biết rằng các khóa bộ nhớ đệm được gán tuyến tính.

```solidity
        }
    }    // testCaching


    // Lưu cùng một giá trị vào bộ nhớ đệm nhiều lần, đảm bảo rằng khóa vẫn
    // giữ nguyên
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

Đầu tiên, chúng ta viết mỗi giá trị hai lần vào bộ nhớ đệm và đảm bảo rằng các khóa giống nhau (có nghĩa là lần viết thứ hai không thực sự xảy ra).

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

Về mặt lý thuyết, có thể có một lỗi không ảnh hưởng đến các lần ghi bộ nhớ đệm liên tiếp. Vì vậy, ở đây chúng ta thực hiện một số lần ghi không liên tiếp và thấy các giá trị vẫn không được ghi lại.

```solidity
    // Đọc một uint từ bộ đệm bộ nhớ (để đảm bảo chúng tôi nhận lại các tham số
    // chúng tôi đã gửi đi)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

Đọc một từ 256 bit từ bộ đệm `bytes memory`. Hàm tiện ích này cho phép chúng ta xác minh rằng chúng ta nhận được kết quả chính xác khi chạy một lệnh gọi hàm sử dụng bộ nhớ đệm.

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul không hỗ trợ các cấu trúc dữ liệu ngoài `uint256`, vì vậy khi bạn tham chiếu đến một cấu trúc dữ liệu phức tạp hơn, chẳng hạn như bộ đệm bộ nhớ `_bytes`, bạn sẽ nhận được địa chỉ của cấu trúc đó. Solidity lưu trữ các giá trị `bytes memory` dưới dạng một từ 32 byte chứa độ dài, theo sau là các byte thực tế, vì vậy để lấy byte số `_start`, chúng ta cần tính `_bytes+32+_start`.

```solidity

        return tempUint;
    }     // toUint256

    // Chữ ký hàm cho fourParams(), được cung cấp bởi
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // Chỉ là một số giá trị hằng số để xem chúng ta có nhận lại được các giá trị chính xác không
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

Một số hằng số chúng ta cần để kiểm thử.

```solidity
    function testReadParam() public {
```

Gọi `fourParams()`, một hàm sử dụng `readParams`, để kiểm tra xem chúng ta có thể đọc các tham số một cách chính xác không.

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

Chúng ta không thể sử dụng cơ chế ABI thông thường để gọi một hàm bằng bộ nhớ đệm, vì vậy chúng ta cần sử dụng cơ chế cấp thấp [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses). Cơ chế đó lấy `bytes memory` làm đầu vào và trả về điều đó (cũng như một giá trị Boolean) làm đầu ra.

```solidity
        // Lần gọi đầu tiên, bộ nhớ đệm trống
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

Việc cùng một hợp đồng hỗ trợ cả các hàm được lưu vào bộ nhớ đệm (đối với các lệnh gọi trực tiếp từ các giao dịch) và các hàm không được lưu vào bộ nhớ đệm (đối với các lệnh gọi từ các hợp đồng thông minh khác) là hữu ích. Để làm điều đó, chúng ta cần tiếp tục dựa vào cơ chế Solidity để gọi hàm chính xác, thay vì đặt mọi thứ vào [hàm `fallback`](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function). Làm điều này giúp khả năng kết hợp dễ dàng hơn rất nhiều. Một byte duy nhất sẽ đủ để xác định hàm trong hầu hết các trường hợp, vì vậy chúng ta đang lãng phí ba byte (16\*3=48 gas). Tuy nhiên, khi tôi viết bài này, 48 gas đó có giá 0,07 xu, đó là một chi phí hợp lý cho mã đơn giản hơn, ít có khả năng bị lỗi hơn.

```solidity
            // Giá trị đầu tiên, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

Giá trị đầu tiên: Một cờ cho biết đó là một giá trị đầy đủ cần được ghi vào bộ nhớ đệm, theo sau là 32 byte của giá trị. Ba giá trị khác tương tự, ngoại trừ việc `VAL_B` không được ghi vào bộ nhớ đệm và `VAL_C` vừa là tham số thứ ba vừa là tham số thứ tư.

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

Đây là nơi chúng ta thực sự gọi hợp đồng `Cache`.

```solidity
        assertEq(_success, true);
```

Chúng tôi mong đợi cuộc gọi sẽ thành công.

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

Chúng tôi bắt đầu với một bộ nhớ đệm trống và sau đó thêm `VAL_A` theo sau là `VAL_C`. Chúng tôi mong đợi cái đầu tiên có khóa 1, và cái thứ hai có 2.

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

Đầu ra là bốn tham số. Ở đây chúng tôi xác minh nó là chính xác.

```solidity
        // Lần gọi thứ hai, chúng ta có thể sử dụng bộ nhớ đệm
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Giá trị đầu tiên trong Bộ nhớ đệm
            bytes1(0x01),
```

Các khóa bộ nhớ đệm dưới 16 chỉ là một byte.

```solidity
            // Giá trị thứ hai, không thêm nó vào bộ nhớ đệm
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // Giá trị thứ ba và thứ tư, cùng một giá trị
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

Các bài kiểm thử sau cuộc gọi giống hệt như các bài kiểm thử sau cuộc gọi đầu tiên.

```solidity
    function testEncodeVal() public {
```

Hàm này tương tự như `testReadParam`, ngoại trừ việc thay vì viết các tham số một cách rõ ràng, chúng ta sử dụng `encodeVal()`.

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

Bài kiểm thử bổ sung duy nhất trong `testEncodeVal()` là để xác minh rằng độ dài của `_callInput` là chính xác. Đối với cuộc gọi đầu tiên, nó là 4+33\*4. Đối với lần thứ hai, nơi mọi giá trị đã có trong bộ nhớ đệm, nó là 4+1\*4.

```solidity
    // Kiểm tra encodeVal khi khóa dài hơn một byte
    // Tối đa ba byte vì việc điền vào bộ nhớ đệm đến bốn byte mất
    // quá nhiều thời gian.
    function testEncodeValBig() public {
        // Đặt một số giá trị vào bộ nhớ đệm.
        // Để giữ cho mọi thứ đơn giản, hãy sử dụng khóa n cho giá trị n.
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

Hàm `testEncodeVal` ở trên chỉ ghi bốn giá trị vào bộ nhớ đệm, vì vậy [phần của hàm xử lý các giá trị nhiều byte](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) không được kiểm tra. Nhưng mã đó phức tạp và dễ bị lỗi.

Phần đầu tiên của hàm này là một vòng lặp ghi tất cả các giá trị từ 1 đến 0x1FFF vào bộ nhớ đệm theo thứ tự, vì vậy chúng ta sẽ có thể mã hóa các giá trị đó và biết chúng sẽ đi đâu.

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // Một byte        0x0F
            cache.encodeVal(0x0010),   // Hai byte     0x1010
            cache.encodeVal(0x0100),   // Hai byte     0x1100
            cache.encodeVal(0x1000)    // Ba byte 0x201000
        );
```

Kiểm tra các giá trị một byte, hai byte và ba byte. Chúng tôi không kiểm tra xa hơn vì sẽ mất quá nhiều thời gian để viết đủ các mục nhập ngăn xếp (ít nhất là 0x10000000, xấp xỉ một phần tư tỷ).

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // Kiểm tra xem với một bộ đệm quá nhỏ, chúng ta có nhận được một sự hoàn nguyên không
    function testShortCalldata() public {
```

Kiểm tra điều gì xảy ra trong trường hợp bất thường khi không có đủ tham số.

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

Vì nó hoàn nguyên, kết quả chúng ta nên nhận được là `false`.

```
    // Gọi với các khóa bộ nhớ đệm không có ở đó
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Giá trị đầu tiên, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Giá trị thứ hai
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

Hàm này nhận được bốn tham số hoàn toàn hợp lệ, ngoại trừ việc bộ nhớ đệm trống nên không có giá trị nào ở đó để đọc.

```solidity
        .
        .
        .
    // Kiểm tra xem với một bộ đệm quá dài, mọi thứ đều hoạt động
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // Lần gọi đầu tiên, bộ nhớ đệm trống
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // Giá trị đầu tiên, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(), bytes32(VAL_A),

            // Giá trị thứ hai, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(), bytes32(VAL_B),

            // Giá trị thứ ba, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(), bytes32(VAL_C),

            // Giá trị thứ tư, thêm nó vào bộ nhớ đệm
            cache.INTO_CACHE(), bytes32(VAL_D),

            // Và một giá trị khác để "may mắn"
            bytes4(0x31112233)
        );
```

Hàm này gửi năm giá trị. Chúng tôi biết rằng giá trị thứ năm bị bỏ qua vì nó không phải là một mục nhập bộ nhớ đệm hợp lệ, điều này sẽ gây ra một sự hoàn nguyên nếu nó không được bao gồm.

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## Một ứng dụng mẫu {#a-sample-app}

Việc viết các bài kiểm thử bằng Solidity là rất tốt, nhưng cuối cùng, một ứng dụng phi tập trung cần có khả năng xử lý các yêu cầu từ bên ngoài chuỗi để trở nên hữu ích. Bài viết này minh họa cách sử dụng bộ nhớ đệm trong một ứng dụng phi tập trung với `WORM`, viết tắt của "Write Once, Read Many" (Ghi một lần, Đọc nhiều lần). Nếu một khóa chưa được ghi, bạn có thể ghi một giá trị vào đó. Nếu khóa đã được ghi, bạn sẽ nhận được một sự hoàn nguyên.

### Hợp đồng {#the-contract}

[Đây là hợp đồng](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol). Nó chủ yếu lặp lại những gì chúng ta đã làm với `Cache` và `CacheTest`, vì vậy chúng ta chỉ đề cập đến những phần thú vị.

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

Cách dễ nhất để sử dụng `Cache` là kế thừa nó trong hợp đồng của chính chúng ta.

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

Hàm này tương tự như `fourParam` trong `CacheTest` ở trên. Bởi vì chúng ta không tuân theo các thông số kỹ thuật ABI, tốt nhất là không khai báo bất kỳ tham số nào vào hàm.

```solidity
    // Giúp việc gọi chúng tôi dễ dàng hơn
    // Chữ ký hàm cho writeEntryCached(), được cung cấp bởi
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

Mã bên ngoài gọi `writeEntryCached` sẽ cần phải xây dựng dữ liệu lệnh gọi một cách thủ công, thay vì sử dụng `worm.writeEntryCached`, vì chúng ta không tuân theo các thông số kỹ thuật ABI. Việc có giá trị hằng số này chỉ giúp việc viết nó dễ dàng hơn.

Lưu ý rằng mặc dù chúng ta định nghĩa `WRITE_ENTRY_CACHED` là một biến trạng thái, để đọc nó từ bên ngoài, cần phải sử dụng hàm getter cho nó, `worm.WRITE_ENTRY_CACHED()`.

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

Hàm đọc là một `view`, vì vậy nó không yêu cầu giao dịch và không tốn gas. Do đó, không có lợi ích gì khi sử dụng bộ nhớ đệm cho tham số. Với các hàm view, tốt nhất là sử dụng cơ chế tiêu chuẩn đơn giản hơn.

### Mã kiểm thử {#the-testing-code}

[Đây là mã kiểm thử cho hợp đồng](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol). Một lần nữa, chúng ta hãy chỉ xem xét những gì thú vị.

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[Điều này (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) là cách chúng ta chỉ định trong một bài kiểm thử Foundry rằng lệnh gọi tiếp theo sẽ thất bại, và lý do được báo cáo cho một thất bại. Điều này áp dụng khi chúng ta sử dụng cú pháp `<contract>.<function name>()` thay vì xây dựng dữ liệu lệnh gọi và gọi hợp đồng bằng giao diện cấp thấp (`<contract>.call()`, v.v.).

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

Ở đây chúng ta sử dụng thực tế là `cacheWrite` trả về khóa bộ nhớ đệm. Đây không phải là điều chúng ta mong đợi sẽ sử dụng trong sản xuất, vì `cacheWrite` thay đổi trạng thái và do đó chỉ có thể được gọi trong một giao dịch. Các giao dịch không có giá trị trả về, nếu chúng có kết quả, những kết quả đó phải được phát ra dưới dạng các sự kiện. Vì vậy, giá trị trả về của `cacheWrite` chỉ có thể truy cập được từ mã trên chuỗi, và mã trên chuỗi không cần bộ nhớ đệm tham số.

```solidity
        (_success,) = address(worm).call(_callInput);
```

Đây là cách chúng ta nói với Solidity rằng mặc dù `<contract address>.call()` có hai giá trị trả về, chúng ta chỉ quan tâm đến giá trị đầu tiên.

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

Vì chúng ta sử dụng hàm `<address>.call()` cấp thấp, chúng ta không thể sử dụng `vm.expectRevert()` và phải xem xét giá trị thành công boolean mà chúng ta nhận được từ lệnh gọi.

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

Đây là cách chúng ta xác minh rằng mã [phát ra một sự kiện một cách chính xác](https://getfoundry.sh/reference/cheatcodes/expect-emit/) trong Foundry.

### Ứng dụng khách {#the-client}

Một điều bạn không nhận được với các bài kiểm thử Solidity là mã JavaScript mà bạn có thể cắt và dán vào ứng dụng của riêng mình. Để viết mã đó, tôi đã triển khai WORM lên [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli), mạng thử nghiệm mới của [Optimism](https://www.optimism.io/). Nó ở địa chỉ [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a).

[Bạn có thể xem mã JavaScript cho ứng dụng khách tại đây](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js). Để sử dụng nó:

1. Sao chép kho lưu trữ git:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. Cài đặt các gói cần thiết:

   ```sh
   cd javascript
   yarn
   ```

3. Sao chép tệp cấu hình:

   ```sh
   cp .env.example .env
   ```

4. Chỉnh sửa `.env` cho cấu hình của bạn:

   | Thông số                                                      | Giá trị                                                                                                                                                                                                   |
   | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | Cụm từ ghi nhớ cho một tài khoản có đủ ETH để thanh toán cho một giao dịch. [Bạn có thể nhận ETH miễn phí cho mạng Optimism Goerli tại đây](https://optimismfaucet.xyz/). |
   | OPTIMISM_GOERLI_URL | URL đến Optimism Goerli. Điểm cuối công cộng, `https://goerli.optimism.io`, bị giới hạn tốc độ nhưng đủ cho những gì chúng ta cần ở đây                                                   |

5. Chạy `index.js`.

   ```sh
   node index.js
   ```

   Ứng dụng mẫu này trước tiên ghi một mục vào WORM, hiển thị dữ liệu lệnh gọi và một liên kết đến giao dịch trên Etherscan. Sau đó, nó đọc lại mục đó và hiển thị khóa mà nó sử dụng và các giá trị trong mục (giá trị, số khối và tác giả).

Hầu hết ứng dụng khách là JavaScript Dapp thông thường. Vì vậy, một lần nữa chúng ta sẽ chỉ đi qua các phần thú vị.

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // Cần một khóa mới mỗi lần
    const key = await worm.encodeVal(Number(new Date()))
```

Một khe cắm nhất định chỉ có thể được ghi vào một lần, vì vậy chúng tôi sử dụng dấu thời gian để đảm bảo chúng tôi không sử dụng lại các khe cắm.

```javascript
const val = await worm.encodeVal("0x600D")

// Ghi một mục
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers mong đợi dữ liệu cuộc gọi là một chuỗi hex, `0x` theo sau là một số chẵn các chữ số thập lục phân. Vì cả `key` và `val` đều bắt đầu bằng `0x`, chúng ta cần loại bỏ các tiêu đề đó.

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Cũng như với mã kiểm thử Solidity, chúng ta không thể gọi một hàm được lưu vào bộ nhớ đệm một cách bình thường. Thay vào đó, chúng ta cần sử dụng một cơ chế cấp thấp hơn.

```javascript
    .
    .
    .
    // Đọc mục vừa được viết
    const realKey = '0x' + key.slice(4)  // xóa cờ FF
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

Để đọc các mục, chúng ta có thể sử dụng cơ chế thông thường. Không cần sử dụng bộ nhớ đệm tham số với các hàm `view`.

## Kết luận {#conclusion}

Mã trong bài viết này là một bằng chứng về khái niệm, mục đích là để làm cho ý tưởng dễ hiểu. Đối với một hệ thống sẵn sàng cho sản xuất, bạn có thể muốn triển khai một số chức năng bổ sung:

- Xử lý các giá trị không phải là `uint256`. Ví dụ, chuỗi.
- Thay vì một bộ nhớ đệm toàn cục, có thể có một ánh xạ giữa người dùng và các bộ nhớ đệm. Những người dùng khác nhau sử dụng các giá trị khác nhau.
- Các giá trị được sử dụng cho các địa chỉ khác với các giá trị được sử dụng cho các mục đích khác. Có thể hợp lý khi có một bộ nhớ đệm riêng chỉ dành cho các địa chỉ.
- Hiện tại, các khóa bộ nhớ đệm theo thuật toán "đến trước, khóa nhỏ nhất". Mười sáu giá trị đầu tiên có thể được gửi dưới dạng một byte duy nhất. 4080 giá trị tiếp theo có thể được gửi dưới dạng hai byte. Khoảng một triệu giá trị tiếp theo là ba byte, v.v. Một hệ thống sản xuất nên giữ các bộ đếm sử dụng trên các mục bộ nhớ đệm và sắp xếp lại chúng để mười sáu giá trị _phổ biến nhất_ là một byte, 4080 giá trị phổ biến tiếp theo là hai byte, v.v.

  Tuy nhiên, đó là một hoạt động có khả năng nguy hiểm. Hãy tưởng tượng chuỗi sự kiện sau đây:

  1. Noam Naive gọi `encodeVal` để mã hóa địa chỉ mà anh ta muốn gửi token đến. Địa chỉ đó là một trong những địa chỉ được sử dụng đầu tiên trên ứng dụng, vì vậy giá trị được mã hóa là 0x06. Đây là một hàm `view`, không phải là một giao dịch, vì vậy nó nằm giữa Noam và nút mà anh ta sử dụng, và không ai khác biết về nó

  2. Owen Owner chạy hoạt động sắp xếp lại bộ nhớ đệm. Rất ít người thực sự sử dụng địa chỉ đó, vì vậy bây giờ nó được mã hóa là 0x201122. Một giá trị khác, 10<sup>18</sup>, được gán là 0x06.

  3. Noam Naive gửi token của mình đến 0x06. Chúng được gửi đến địa chỉ `0x0000000000000000000000000de0b6b3a7640000`, và vì không ai biết khóa riêng tư cho địa chỉ đó, chúng chỉ bị kẹt ở đó. Noam _không hề vui_.

  Có những cách để giải quyết vấn đề này, và vấn đề liên quan của các giao dịch đang trong mempool trong quá trình sắp xếp lại bộ nhớ đệm, nhưng bạn phải nhận thức được nó.

Tôi đã minh họa việc lưu vào bộ nhớ đệm ở đây với Optimism, vì tôi là một nhân viên của Optimism và đây là rollup mà tôi biết rõ nhất. Nhưng nó sẽ hoạt động với bất kỳ rollup nào tính phí tối thiểu cho việc xử lý nội bộ, để so sánh, việc ghi dữ liệu giao dịch vào L1 là chi phí chính.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).

