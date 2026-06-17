---
title: "ABI ngắn để tối ưu hóa dữ liệu lệnh gọi"
description: Tối ưu hóa hợp đồng thông minh cho bản cuộn Optimistic
author: Ori Pomerantz
lang: vi
tags: ["lớp 2 (l2)"]
skill: intermediate
breadcrumb: ABI ngắn
published: 2022-04-01
---

## Giới thiệu {#introduction}

Trong bài viết này, bạn sẽ tìm hiểu về [bản cuộn Optimistic](/developers/docs/scaling/optimistic-rollups), chi phí giao dịch trên đó và cách cấu trúc chi phí khác biệt này yêu cầu chúng ta phải tối ưu hóa cho những thứ khác so với trên Mạng chính Ethereum.
Bạn cũng sẽ học cách triển khai sự tối ưu hóa này.

### Thông tin minh bạch {#full-disclosure}

Tôi là một nhân viên toàn thời gian của [Optimism](https://www.optimism.io/), vì vậy các ví dụ trong bài viết này sẽ chạy trên Optimism.
Tuy nhiên, kỹ thuật được giải thích ở đây cũng sẽ hoạt động tốt cho các bản cuộn khác.

### Thuật ngữ {#terminology}

Khi thảo luận về các bản cuộn, thuật ngữ 'lớp 1 (l1)' được sử dụng cho Mạng chính, mạng lưới Ethereum sản xuất.
Thuật ngữ 'lớp 2 (l2)' được sử dụng cho Rollup hoặc bất kỳ hệ thống nào khác dựa vào l1 để bảo mật nhưng thực hiện phần lớn quá trình xử lý ngoài chuỗi.

## Làm thế nào chúng ta có thể giảm thêm chi phí của các giao dịch l2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Bản cuộn Optimistic](/developers/docs/scaling/optimistic-rollups) phải lưu giữ hồ sơ của mọi giao dịch lịch sử để bất kỳ ai cũng có thể xem qua chúng và xác minh rằng trạng thái hiện tại là chính xác.
Cách rẻ nhất để đưa dữ liệu vào Mạng chính Ethereum là ghi nó dưới dạng dữ liệu lệnh gọi.
Giải pháp này đã được chọn bởi cả [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) và [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Chi phí của các giao dịch l2 {#cost-of-l2-transactions}

Chi phí của các giao dịch l2 bao gồm hai thành phần:

1. Xử lý l2, thường cực kỳ rẻ
2. Lưu trữ l1, gắn liền với chi phí Gas trên Mạng chính

Tại thời điểm tôi viết bài này, trên Optimism, chi phí Gas l2 là 0,001 [Gwei](/developers/docs/gas/#pre-london).
Mặt khác, chi phí Gas l1 xấp xỉ 40 Gwei.
[Bạn có thể xem giá hiện tại ở đây](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Một byte dữ liệu lệnh gọi có giá 4 Gas (nếu nó bằng 0) hoặc 16 Gas (nếu nó là bất kỳ giá trị nào khác).
Một trong những hoạt động đắt đỏ nhất trên EVM là ghi vào bộ nhớ.
Chi phí tối đa để ghi một từ 32 byte vào bộ nhớ trên l2 là 22100 Gas. Hiện tại, mức này là 22,1 Gwei.
Vì vậy, nếu chúng ta có thể tiết kiệm một byte 0 duy nhất của dữ liệu lệnh gọi, chúng ta sẽ có thể ghi khoảng 200 byte vào bộ nhớ mà vẫn có lợi.

### ABI {#the-abi}

Phần lớn các giao dịch truy cập vào một hợp đồng từ một tài khoản thuộc sở hữu bên ngoài.
Hầu hết các hợp đồng được viết bằng Solidity và diễn giải trường dữ liệu của chúng theo [giao diện nhị phân ứng dụng (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Tuy nhiên, ABI được thiết kế cho l1, nơi một byte dữ liệu lệnh gọi có chi phí xấp xỉ bằng bốn phép toán số học, chứ không phải l2 nơi một byte dữ liệu lệnh gọi có chi phí hơn một nghìn phép toán số học.
Dữ liệu lệnh gọi được chia như sau:

| Phần | Độ dài | Byte | Byte lãng phí | Gas lãng phí | Byte cần thiết | Gas cần thiết |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Bộ chọn hàm |      4 |   0-3 |            3 |         48 |               1 |            16 |
| Các số 0 |     12 |  4-15 |           12 |         48 |               0 |             0 |
| Địa chỉ đích |     20 | 16-35 |            0 |          0 |              20 |           320 |
| Số lượng |     32 | 36-67 |           17 |         64 |              15 |           240 |
| Tổng cộng |     68 |       |              |        160 |                 |           576 |

Giải thích:

- **Bộ chọn hàm**: Hợp đồng có ít hơn 256 hàm, vì vậy chúng ta có thể phân biệt chúng bằng một byte duy nhất.
  Các byte này thường khác 0 và do đó [có giá 16 Gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Các số 0**: Các byte này luôn bằng 0 vì một địa chỉ 20 byte không yêu cầu một từ 32 byte để chứa nó.
  Các byte chứa số 0 có giá 4 Gas ([xem sách vàng](https://ethereum.github.io/yellowpaper/paper.pdf), Phụ lục G,
  trang 27, giá trị cho `G`<sub>`txdatazero`</sub>).
- **Số lượng**: Nếu chúng ta giả định rằng trong hợp đồng này `decimals` là mười tám (giá trị bình thường) và số lượng token tối đa mà chúng ta chuyển sẽ là 10<sup>18</sup>, chúng ta nhận được số lượng tối đa là 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, vì vậy mười lăm byte là đủ.

Sự lãng phí 160 Gas trên l1 thường không đáng kể. Một giao dịch có giá ít nhất [21.000 Gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), vì vậy thêm 0,8% không thành vấn đề.
Tuy nhiên, trên l2, mọi thứ lại khác. Gần như toàn bộ chi phí của giao dịch là ghi nó vào l1.
Ngoài dữ liệu lệnh gọi của giao dịch, còn có 109 byte tiêu đề giao dịch (địa chỉ đích, chữ ký, v.v.).
Do đó, tổng chi phí là `109*16+576+160=2480` và chúng ta đang lãng phí khoảng 6,5% trong số đó.

## Giảm chi phí khi bạn không kiểm soát đích đến {#reducing-costs-when-you-dont-control-the-destination}

Giả sử rằng bạn không có quyền kiểm soát hợp đồng đích, bạn vẫn có thể sử dụng một giải pháp tương tự như [giải pháp này](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Hãy cùng xem qua các tệp có liên quan.

### Token.sol {#token-sol}

[Đây là hợp đồng đích](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Nó là một hợp đồng ERC-20 tiêu chuẩn, với một tính năng bổ sung.
Hàm `faucet` này cho phép bất kỳ người dùng nào nhận được một số token để sử dụng.
Nó sẽ làm cho một hợp đồng ERC-20 sản xuất trở nên vô dụng, nhưng nó giúp mọi thứ dễ dàng hơn khi một ERC-20 chỉ tồn tại để tạo điều kiện cho việc thử nghiệm.

```solidity
    /**
     * @dev Cung cấp cho người gọi 1000 token để thử nghiệm
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Đây là hợp đồng mà các giao dịch được cho là sẽ gọi với dữ liệu lệnh gọi ngắn hơn](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Hãy cùng xem qua từng dòng.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Chúng ta cần hàm token để biết cách gọi nó.

```solidity
hợp đồng CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Địa chỉ của token mà chúng ta đóng vai trò là một hợp đồng proxy.

```solidity

    /**
     * @dev Chỉ định địa chỉ token
     * @param tokenAddr_ Địa chỉ hợp đồng ERC-20
     */
    hàm khởi tạo(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Địa chỉ token là tham số duy nhất chúng ta cần chỉ định.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Đọc một giá trị từ dữ liệu lệnh gọi.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Chúng ta sẽ tải một từ 32 byte (256 bit) duy nhất vào bộ nhớ và loại bỏ các byte không thuộc trường mà chúng ta muốn.
Thuật toán này không hoạt động đối với các giá trị dài hơn 32 byte và tất nhiên chúng ta không thể đọc vượt quá phần cuối của dữ liệu lệnh gọi.
Trên l1, có thể cần phải bỏ qua các bài kiểm tra này để tiết kiệm Gas, nhưng trên l2, Gas cực kỳ rẻ, điều này cho phép thực hiện bất kỳ kiểm tra tính hợp lý nào mà chúng ta có thể nghĩ ra.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Chúng ta có thể đã sao chép dữ liệu từ lệnh gọi đến `fallback()` (xem bên dưới), nhưng sẽ dễ dàng hơn nếu sử dụng [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), ngôn ngữ hợp ngữ của EVM.

Ở đây chúng ta sử dụng [mã lệnh CALLDATALOAD](https://www.evm.codes/#35) để đọc các byte từ `startByte` đến `startByte+31` vào ngăn xếp.
Nói chung, cú pháp của một mã lệnh trong Yul là `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Chỉ những byte `length` có ý nghĩa nhất mới là một phần của trường, vì vậy chúng ta [dịch phải](https://en.wikipedia.org/wiki/Logical_shift) để loại bỏ các giá trị khác.
Điều này có thêm lợi thế là di chuyển giá trị sang bên phải của trường, vì vậy nó chính là giá trị đó thay vì giá trị nhân với 256<sup>một số nào đó</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Khi một lệnh gọi đến một hợp đồng Solidity không khớp với bất kỳ chữ ký hàm nào, nó sẽ gọi [hàm `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (giả sử có một hàm như vậy).
Trong trường hợp của `CalldataInterpreter`, _bất kỳ_ lệnh gọi nào cũng đến đây vì không có hàm `external` hoặc `public` nào khác.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Đọc byte đầu tiên của dữ liệu lệnh gọi, cho chúng ta biết hàm.
Có hai lý do tại sao một hàm sẽ không khả dụng ở đây:

1. Các hàm là `pure` hoặc `view` không thay đổi trạng thái và không tốn Gas (khi được gọi ngoài chuỗi).
   Sẽ không có ý nghĩa gì khi cố gắng giảm chi phí Gas của chúng.
2. Các hàm dựa vào [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Giá trị của `msg.sender` sẽ là địa chỉ của `CalldataInterpreter`, không phải của người gọi.

Thật không may, [khi xem xét các thông số kỹ thuật của ERC-20](https://eips.ethereum.org/EIPS/eip-20), điều này chỉ để lại một hàm, `transfer`.
Điều này khiến chúng ta chỉ còn lại hai hàm: `transfer` (vì chúng ta có thể gọi `transferFrom`) và `faucet` (vì chúng ta có thể chuyển token trở lại cho bất kỳ ai đã gọi chúng ta).

```solidity

        // Gọi các phương thức thay đổi trạng thái của token bằng cách sử dụng
        // thông tin từ dữ liệu lệnh gọi

        // faucet
        if (_func == 1) {
```

Một lệnh gọi đến `faucet()`, không có tham số.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Sau khi gọi `token.faucet()`, chúng ta nhận được token. Tuy nhiên, với tư cách là hợp đồng proxy, chúng ta không **cần** token.
EOA (tài khoản thuộc sở hữu bên ngoài) hoặc hợp đồng đã gọi chúng ta mới cần.
Vì vậy, chúng ta chuyển tất cả token của mình cho bất kỳ ai đã gọi chúng ta.

```solidity
        // chuyển (giả sử chúng ta có hạn mức cho việc này)
        if (_func == 2) {
```

Việc chuyển token yêu cầu hai tham số: địa chỉ đích và số lượng.

```solidity
            token.transferFrom(
                msg.sender,
```

Chúng ta chỉ cho phép người gọi chuyển các token mà họ sở hữu

```solidity
                address(uint160(calldataVal(1, 20))),
```

Địa chỉ đích bắt đầu ở byte #1 (byte #0 là hàm).
Là một địa chỉ, nó dài 20 byte.

```solidity
                calldataVal(21, 2)
```

Đối với hợp đồng cụ thể này, chúng ta giả định rằng số lượng token tối đa mà bất kỳ ai muốn chuyển sẽ vừa trong hai byte (nhỏ hơn 65536).

```solidity
            );
        }
```

Nhìn chung, một lần chuyển mất 35 byte dữ liệu lệnh gọi:

| Phần | Độ dài | Byte |
| ------------------- | -----: | ----: |
| Bộ chọn hàm |      1 |     0 |
| Địa chỉ đích |     32 |  1-32 |
| Số lượng |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Bài kiểm tra đơn vị JavaScript này](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) cho chúng ta thấy cách sử dụng cơ chế này (và cách xác minh nó hoạt động chính xác).
Tôi sẽ giả định rằng bạn hiểu [chai](https://www.chaijs.com/) và [ethers](https://docs.ethers.io/v5/) và chỉ giải thích các phần áp dụng cụ thể cho hợp đồng.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Chúng ta bắt đầu bằng cách triển khai cả hai hợp đồng.

```javascript
    // Nhận token để thử nghiệm
    const faucetTx = {
```

Chúng ta không thể sử dụng các hàm cấp cao mà chúng ta thường sử dụng (chẳng hạn như `token.faucet()`) để tạo giao dịch, vì chúng ta không tuân theo ABI.
Thay vào đó, chúng ta phải tự xây dựng giao dịch và sau đó gửi nó.

```javascript
      to: cdi.address,
      data: "0x01"
```

Có hai tham số chúng ta cần cung cấp cho giao dịch:

1. `to`, địa chỉ đích.
   Đây là hợp đồng thông dịch dữ liệu lệnh gọi.
2. `data`, dữ liệu lệnh gọi để gửi.
   Trong trường hợp gọi vòi, dữ liệu là một byte duy nhất, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chúng ta gọi [phương thức `sendTransaction` của người ký](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) vì chúng ta đã chỉ định đích đến (`faucetTx.to`) và chúng ta cần giao dịch được ký.

```javascript
// Kiểm tra xem faucet có cung cấp token chính xác không
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Ở đây chúng ta xác minh số dư.
Không cần phải tiết kiệm Gas trên các hàm `view`, vì vậy chúng ta chỉ cần chạy chúng bình thường.

```javascript
// Cấp cho CDI một hạn mức (không thể ủy quyền phê duyệt)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Cấp cho trình thông dịch dữ liệu lệnh gọi một hạn mức để có thể thực hiện các giao dịch chuyển.

```javascript
// Chuyển token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Tạo một giao dịch chuyển. Byte đầu tiên là "0x02", tiếp theo là địa chỉ đích và cuối cùng là số lượng (0x0100, tức là 256 ở hệ thập phân).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Kiểm tra xem chúng ta có ít hơn 256 token
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Và đích đến của chúng ta đã nhận được chúng
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Giảm chi phí khi bạn kiểm soát hợp đồng đích {#reducing-the-cost-when-you-do-control-the-destination-contract}

Nếu bạn có quyền kiểm soát hợp đồng đích, bạn có thể tạo các hàm bỏ qua các kiểm tra `msg.sender` vì chúng tin tưởng trình thông dịch dữ liệu lệnh gọi.
[Bạn có thể xem ví dụ về cách thức hoạt động của nó ở đây, trong nhánh `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Nếu hợp đồng chỉ phản hồi các giao dịch bên ngoài, chúng ta có thể xoay sở chỉ với một hợp đồng.
Tuy nhiên, điều đó sẽ phá vỡ [khả năng kết hợp](/developers/docs/smart-contracts/composability/).
Sẽ tốt hơn nhiều nếu có một hợp đồng phản hồi các lệnh gọi ERC-20 bình thường và một hợp đồng khác phản hồi các giao dịch có dữ liệu lệnh gọi ngắn.

### Token.sol {#token-sol-2}

Trong ví dụ này, chúng ta có thể sửa đổi `Token.sol`.
Điều này cho phép chúng ta có một số hàm mà chỉ proxy mới có thể gọi.
Dưới đây là các phần mới:

```solidity
    // Địa chỉ duy nhất được phép chỉ định địa chỉ CalldataInterpreter
    address owner;

    // Địa chỉ CalldataInterpreter
    address proxy = address(0);
```

Hợp đồng ERC-20 cần biết danh tính của proxy được ủy quyền.
Tuy nhiên, chúng ta không thể thiết lập biến này trong hàm khởi tạo, vì chúng ta chưa biết giá trị.
Hợp đồng này được khởi tạo đầu tiên vì proxy mong đợi địa chỉ của token trong hàm khởi tạo của nó.

```solidity
    /**
     * @dev Gọi hàm khởi tạo ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Địa chỉ của người tạo (được gọi là `owner`) được lưu trữ ở đây vì đó là địa chỉ duy nhất được phép thiết lập proxy.

```solidity
    /**
     * @dev thiết lập địa chỉ cho proxy (CalldataInterpreter).
     * Chỉ có thể được gọi một lần bởi chủ sở hữu
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Proxy có quyền truy cập đặc quyền, vì nó có thể bỏ qua các kiểm tra bảo mật.
Để đảm bảo chúng ta có thể tin tưởng proxy, chúng ta chỉ cho phép `owner` gọi hàm này và chỉ một lần.
Khi `proxy` có giá trị thực (không phải bằng 0), giá trị đó không thể thay đổi, vì vậy ngay cả khi chủ sở hữu quyết định trở nên xấu xa hoặc cụm từ ghi nhớ của nó bị tiết lộ, chúng ta vẫn an toàn.

```solidity
    /**
     * @dev Một số hàm chỉ có thể được gọi bởi proxy.
     */
    modifier onlyProxy {
```

Đây là một [hàm `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), nó sửa đổi cách các hàm khác hoạt động.

```solidity
      require(msg.sender == proxy);
```

Đầu tiên, xác minh rằng chúng ta được gọi bởi proxy và không ai khác.
Nếu không, `revert`.

```solidity
      _;
    }
```

Nếu đúng như vậy, hãy chạy hàm mà chúng ta sửa đổi.

```solidity
   /* Các hàm cho phép proxy thực sự làm proxy cho các tài khoản */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Đây là ba hoạt động thường yêu cầu thông điệp đến trực tiếp từ thực thể chuyển token hoặc phê duyệt hạn mức.
Ở đây chúng ta có một phiên bản proxy của các hoạt động này, trong đó:

1. Được sửa đổi bởi `onlyProxy()` để không ai khác được phép kiểm soát chúng.
2. Nhận địa chỉ thường là `msg.sender` dưới dạng một tham số bổ sung.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Trình thông dịch dữ liệu lệnh gọi gần như giống hệt với trình thông dịch ở trên, ngoại trừ việc các hàm được proxy nhận một tham số `msg.sender` và không cần hạn mức cho `transfer`.

```solidity
        // chuyển (không cần hạn mức)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Có một vài thay đổi giữa mã kiểm tra trước đó và mã này.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Chúng ta cần cho hợp đồng ERC-20 biết proxy nào đáng tin cậy

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Cần hai người ký để xác minh hạn mức
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Để kiểm tra `approve()` và `transferFrom()`, chúng ta cần một người ký thứ hai.
Chúng ta gọi nó là `poorSigner` vì nó không nhận được bất kỳ token nào của chúng ta (tất nhiên nó cần phải có ETH).

```js
// Chuyển token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Vì hợp đồng ERC-20 tin tưởng proxy (`cdi`), chúng ta không cần hạn mức để chuyển tiếp các giao dịch chuyển.

```js
// phê duyệt và transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Kiểm tra xem sự kết hợp approve / transferFrom đã được thực hiện chính xác chưa
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Kiểm tra hai hàm mới.
Lưu ý rằng `transferFromTx` yêu cầu hai tham số địa chỉ: người cấp hạn mức và người nhận.

## Kết luận {#conclusion}

Cả [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) và [Arbitrum](https://developer.offchainlabs.com/docs/special_features) đều đang tìm cách giảm kích thước của dữ liệu lệnh gọi được ghi vào l1 và do đó giảm chi phí giao dịch.
Tuy nhiên, với tư cách là các nhà cung cấp cơ sở hạ tầng đang tìm kiếm các giải pháp chung, khả năng của chúng tôi bị hạn chế.
Là nhà phát triển ứng dụng phi tập trung (dapp), bạn có kiến thức cụ thể về ứng dụng, điều này cho phép bạn tối ưu hóa dữ liệu lệnh gọi của mình tốt hơn nhiều so với những gì chúng tôi có thể làm trong một giải pháp chung.
Hy vọng rằng bài viết này sẽ giúp bạn tìm ra giải pháp lý tưởng cho nhu cầu của mình.

[Xem thêm các tác phẩm của tôi tại đây](https://cryptodocguy.pro/).