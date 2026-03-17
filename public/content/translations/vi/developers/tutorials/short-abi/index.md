---
title: "Các ABI ngắn để tối ưu hóa Calldata"
description: "Tối ưu hóa hợp đồng thông minh cho các gộp giao dịch lạc quan"
author: Ori Pomerantz
lang: vi
tags: [ "lớp 2" ]
skill: intermediate
published: 2022-04-01
---

## Giới thiệu {#introduction}

Trong bài viết này, bạn sẽ tìm hiểu về [các gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups), chi phí giao dịch trên chúng và cách cấu trúc chi phí khác biệt đó đòi hỏi chúng ta phải tối ưu hóa cho những thứ khác so với trên Mạng chính Ethereum.
Bạn cũng sẽ học cách thực hiện tối ưu hóa này.

### Tiết lộ đầy đủ {#full-disclosure}

Tôi là nhân viên toàn thời gian của [Optimism](https://www.optimism.io/), vì vậy các ví dụ trong bài viết này sẽ chạy trên Optimism.
Tuy nhiên, kỹ thuật được giải thích ở đây cũng sẽ hoạt động tốt cho các rollup khác.

### Thuật ngữ {#terminology}

Khi thảo luận về các rollup, thuật ngữ 'lớp 1' (L1) được sử dụng cho Mạng chính, mạng Ethereum sản phẩm.
Thuật ngữ 'lớp 2' (L2) được sử dụng cho rollup hoặc bất kỳ hệ thống nào khác dựa vào L1 để bảo mật nhưng thực hiện hầu hết quá trình xử lý của nó ngoài chuỗi.

## Làm cách nào chúng ta có thể giảm thêm chi phí giao dịch L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Các gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups) phải lưu giữ bản ghi của mọi giao dịch trong lịch sử để bất kỳ ai cũng có thể xem qua chúng và xác minh rằng trạng thái hiện tại là chính xác.
Cách rẻ nhất để đưa dữ liệu vào Mạng chính Ethereum là ghi dữ liệu đó dưới dạng calldata.
Giải pháp này đã được cả [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) và [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) lựa chọn.

### Chi phí giao dịch L2 {#cost-of-l2-transactions}

Chi phí giao dịch L2 bao gồm hai thành phần:

1. Xử lý L2, thường cực kỳ rẻ
2. Lưu trữ L1, gắn liền với chi phí gas của Mạng chính

Khi tôi đang viết bài này, trên Optimism, chi phí gas L2 là 0,001 [Gwei](/developers/docs/gas/#pre-london).
Mặt khác, chi phí gas L1 là khoảng 40 gwei.
[Bạn có thể xem giá hiện tại tại đây](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Một byte calldata có giá 4 gas (nếu là số không) hoặc 16 gas (nếu là bất kỳ giá trị nào khác).
Một trong những hoạt động tốn kém nhất trên máy ảo ethereum (EVM) là ghi vào bộ nhớ lưu trữ.
Chi phí tối đa để ghi một từ 32 byte vào bộ nhớ lưu trữ trên L2 là 22100 gas. Hiện tại, chi phí này là 22,1 gwei.
Vì vậy, nếu chúng ta có thể tiết kiệm một byte calldata bằng không, chúng ta sẽ có thể ghi khoảng 200 byte vào bộ nhớ lưu trữ mà vẫn có lợi.

### Giao diện nhị phân ứng dụng (ABI) {#the-abi}

Phần lớn các giao dịch truy cập vào một hợp đồng từ một tài khoản sở hữu ngoại biên.
Hầu hết các hợp đồng được viết bằng Solidity và diễn giải trường dữ liệu của chúng theo [giao diện nhị phân ứng dụng (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Tuy nhiên, ABI được thiết kế cho L1, nơi một byte calldata có giá xấp xỉ bốn phép toán số học, chứ không phải L2, nơi một byte calldata có giá hơn một nghìn phép toán số học.
Calldata được chia như sau:

| Phần         | Độ dài |  Byte | Byte lãng phí | Gas lãng phí | Byte cần thiết | Gas cần thiết |
| ------------ | -----: | ----: | ------------: | -----------: | -------------: | ------------: |
| Bộ chọn hàm  |      4 |   0-3 |             3 |           48 |              1 |            16 |
| Các số không |     12 |  4-15 |            12 |           48 |              0 |             0 |
| Địa chỉ đích |     20 | 16-35 |             0 |            0 |             20 |           320 |
| Số lượng     |     32 | 36-67 |            17 |           64 |             15 |           240 |
| Tổng         |     68 |       |               |          160 |                |           576 |

Giải thích:

- **Bộ chọn hàm**: Hợp đồng có ít hơn 256 hàm, vì vậy chúng ta có thể phân biệt chúng bằng một byte duy nhất.
  Các byte này thường khác không và do đó [có giá mười sáu gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Các số không**: Các byte này luôn bằng không vì một địa chỉ hai mươi byte không yêu cầu một từ ba mươi hai byte để chứa nó.
  Các byte chứa giá trị không có giá bốn gas ([xem sách vàng](https://ethereum.github.io/yellowpaper/paper.pdf), Phụ lục G,
  tr. 27, giá trị cho `G`<sub>`txdatazero`</sub>).
- **Số lượng**: Nếu chúng ta giả định rằng trong hợp đồng này, `decimals` là mười tám (giá trị bình thường) và số lượng token tối đa chúng ta chuyển sẽ là 10<sup>18</sup>, chúng ta sẽ có số lượng tối đa là 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, vì vậy mười lăm byte là đủ.

Lãng phí 160 gas trên L1 thường không đáng kể. Một giao dịch có giá ít nhất [21.000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), vì vậy thêm 0,8% không thành vấn đề.
Tuy nhiên, trên L2, mọi thứ lại khác. Hầu như toàn bộ chi phí của giao dịch là ghi nó vào L1.
Ngoài calldata giao dịch, có 109 byte tiêu đề giao dịch (địa chỉ đích, chữ ký, v.v.).
Do đó, tổng chi phí là `109*16+576+160=2480`, và chúng ta đang lãng phí khoảng 6,5% trong số đó.

## Giảm chi phí khi bạn không kiểm soát đích đến {#reducing-costs-when-you-dont-control-the-destination}

Giả sử rằng bạn không có quyền kiểm soát hợp đồng đích, bạn vẫn có thể sử dụng một giải pháp tương tự như [giải pháp này](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Hãy xem qua các tệp có liên quan.

### Token.sol {#token-sol}

[Đây là hợp đồng đích](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Đó là một hợp đồng ERC-20 tiêu chuẩn, với một tính năng bổ sung.
Hàm `faucet` này cho phép bất kỳ người dùng nào nhận được một số token để sử dụng.
Điều này sẽ làm cho một hợp đồng ERC-20 sản phẩm trở nên vô dụng, nhưng nó giúp cuộc sống dễ dàng hơn khi một ERC-20 chỉ tồn tại để tạo điều kiện thử nghiệm.

```solidity
    /**
     * @dev Cung cấp cho người gọi 1000 token để sử dụng
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Đây là hợp đồng mà các giao dịch sẽ gọi với calldata ngắn hơn](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Hãy xem xét từng dòng một.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Chúng ta cần hàm token để biết cách gọi nó.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Địa chỉ của token mà chúng tôi là một proxy.

```solidity

    /**
     * @dev Chỉ định địa chỉ token
     * @param tokenAddr_ địa chỉ hợp đồng ERC-20
     */
    constructor(
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

Đọc một giá trị từ calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Chúng ta sẽ tải một từ 32 byte (256-bit) vào bộ nhớ và loại bỏ các byte không phải là một phần của trường chúng ta muốn.
Thuật toán này không hoạt động đối với các giá trị dài hơn 32 byte, và tất nhiên chúng ta không thể đọc vượt quá cuối calldata.
Trên L1, có thể cần bỏ qua các bài kiểm tra này để tiết kiệm gas, nhưng trên L2, gas cực kỳ rẻ, cho phép chúng ta thực hiện bất kỳ kiểm tra tính hợp lệ nào có thể nghĩ đến.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Chúng ta có thể sao chép dữ liệu từ lệnh gọi đến `fallback()` (xem bên dưới), nhưng việc sử dụng [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), ngôn ngữ hợp ngữ của máy ảo ethereum (EVM), sẽ dễ dàng hơn.

Ở đây chúng ta sử dụng [opcode CALLDATALOAD](https://www.evm.codes/#35) để đọc các byte từ `startByte` đến `startByte+31` vào ngăn xếp.
Nói chung, cú pháp của một opcode trong Yul là `<tên opcode>(<giá trị ngăn xếp đầu tiên, nếu có>,<giá trị ngăn xếp thứ hai, nếu có>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Chỉ các byte `length` quan trọng nhất là một phần của trường, vì vậy chúng ta [dịch phải](https://en.wikipedia.org/wiki/Logical_shift) để loại bỏ các giá trị khác.
Điều này có thêm lợi thế là di chuyển giá trị sang bên phải của trường, vì vậy nó là chính giá trị đó thay vì giá trị nhân với 256<sup>lần nào đó</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Khi một lệnh gọi đến hợp đồng Solidity không khớp với bất kỳ chữ ký hàm nào, nó sẽ gọi [hàm `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (giả sử có một hàm).
Trong trường hợp của `CalldataInterpreter`, _bất kỳ_ lệnh gọi nào cũng sẽ đến đây vì không có hàm `external` hoặc `public` nào khác.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Đọc byte đầu tiên của calldata, cho chúng ta biết hàm.
Có hai lý do tại sao một hàm sẽ không có sẵn ở đây:

1. Các hàm `pure` hoặc `view` không thay đổi trạng thái và không tốn gas (khi được gọi ngoài chuỗi).
   Không có ý nghĩa gì khi cố gắng giảm chi phí gas của chúng.
2. Các hàm dựa trên [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Giá trị của `msg.sender` sẽ là địa chỉ của `CalldataInterpreter`, không phải là người gọi.

Thật không may, [nhìn vào các thông số kỹ thuật ERC-20](https://eips.ethereum.org/EIPS/eip-20), điều này chỉ còn lại một hàm, `transfer`.
Điều này chỉ còn lại hai hàm: `transfer` (bởi vì chúng ta có thể gọi `transferFrom`) và `faucet` (bởi vì chúng ta có thể chuyển token trở lại cho bất kỳ ai đã gọi chúng ta).

```solidity

        // Gọi các phương thức thay đổi trạng thái của token bằng
        // thông tin từ calldata

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

Sau khi chúng ta gọi `token.faucet()`, chúng ta nhận được token. Tuy nhiên, với tư cách là hợp đồng proxy, chúng tôi không **cần** token.
EOA (tài khoản sở hữu bên ngoài) hoặc hợp đồng đã gọi chúng tôi thì cần.
Vì vậy, chúng tôi chuyển tất cả token của mình cho bất kỳ ai đã gọi chúng tôi.

```solidity
        // chuyển khoản (giả sử chúng ta có khoản cho phép cho nó)
        if (_func == 2) {
```

Chuyển token yêu cầu hai tham số: địa chỉ đích và số lượng.

```solidity
            token.transferFrom(
                msg.sender,
```

Chúng tôi chỉ cho phép người gọi chuyển token mà họ sở hữu

```solidity
                address(uint160(calldataVal(1, 20))),
```

Địa chỉ đích bắt đầu ở byte #1 (byte #0 là hàm).
Là một địa chỉ, nó dài 20 byte.

```solidity
                calldataVal(21, 2)
```

Đối với hợp đồng cụ thể này, chúng tôi giả định rằng số lượng token tối đa mà bất kỳ ai muốn chuyển sẽ vừa trong hai byte (ít hơn 65536).

```solidity
            );
        }
```

Nhìn chung, một lần chuyển khoản mất 35 byte calldata:

| Phần         | Độ dài |  Byte |
| ------------ | -----: | ----: |
| Bộ chọn hàm  |      1 |     0 |
| Địa chỉ đích |     32 |  1-32 |
| Số lượng     |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Thử nghiệm đơn vị JavaScript này](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) cho chúng ta thấy cách sử dụng cơ chế này (và cách xác minh nó hoạt động chính xác).
Tôi sẽ giả định bạn hiểu [chai](https://www.chaijs.com/) và [ethers](https://docs.ethers.io/v5/) và chỉ giải thích các phần áp dụng cụ thể cho hợp đồng.

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

Chúng tôi bắt đầu bằng cách triển khai cả hai hợp đồng.

```javascript
    // Nhận token để sử dụng
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
   Đây là hợp đồng thông dịch calldata.
2. `data`, calldata cần gửi.
   Trong trường hợp gọi faucet, dữ liệu là một byte duy nhất, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Chúng tôi gọi [phương thức `sendTransaction` của người ký](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) vì chúng tôi đã chỉ định đích (`faucetTx.to`) và chúng tôi cần giao dịch được ký.

```javascript
// Kiểm tra faucet cung cấp token chính xác
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Ở đây chúng tôi xác minh số dư.
Không cần tiết kiệm gas cho các hàm `view`, vì vậy chúng tôi chỉ chạy chúng bình thường.

```javascript
// Cấp cho CDI một khoản cho phép (không thể ủy quyền phê duyệt)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Cấp cho trình thông dịch calldata một khoản trợ cấp để có thể thực hiện chuyển khoản.

```javascript
// Chuyển token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Tạo một giao dịch chuyển khoản. Byte đầu tiên là "0x02", theo sau là địa chỉ đích và cuối cùng là số tiền (0x0100, tức là 256 trong hệ thập phân).

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

Nếu bạn có quyền kiểm soát hợp đồng đích, bạn có thể tạo các hàm bỏ qua kiểm tra `msg.sender` vì chúng tin tưởng vào trình thông dịch calldata.
[Bạn có thể xem một ví dụ về cách hoạt động của nó tại đây, trong nhánh `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Nếu hợp đồng chỉ phản hồi các giao dịch bên ngoài, chúng ta có thể chỉ cần một hợp đồng duy nhất.
Tuy nhiên, điều đó sẽ phá vỡ [tính kết hợp](/developers/docs/smart-contracts/composability/).
Tốt hơn nhiều là có một hợp đồng phản hồi các lệnh gọi ERC-20 bình thường và một hợp đồng khác phản hồi các giao dịch với dữ liệu cuộc gọi ngắn.

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
Tuy nhiên, chúng ta không thể đặt biến này trong hàm khởi tạo, vì chúng ta chưa biết giá trị của nó.
Hợp đồng này được khởi tạo trước vì proxy mong đợi địa chỉ của token trong hàm tạo của nó.

```solidity
    /**
     * @dev Gọi hàm khởi tạo ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Địa chỉ của người tạo (được gọi là `owner`) được lưu trữ ở đây vì đó là địa chỉ duy nhất được phép đặt proxy.

```solidity
    /**
     * @dev đặt địa chỉ cho proxy (CalldataInterpreter).
     * Chỉ có thể được gọi một lần bởi chủ sở hữu
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Proxy có quyền truy cập đặc quyền, vì nó có thể bỏ qua các kiểm tra bảo mật.
Để đảm bảo rằng chúng ta có thể tin tưởng vào proxy, chúng tôi chỉ cho phép `owner` gọi hàm này và chỉ một lần.
Khi `proxy` có giá trị thực (khác không), giá trị đó không thể thay đổi, vì vậy ngay cả khi chủ sở hữu quyết định trở thành kẻ xấu, hoặc cụm từ ghi nhớ của nó bị tiết lộ, chúng ta vẫn an toàn.

```solidity
    /**
     * @dev Một số hàm chỉ có thể được gọi bởi proxy.
     */
    modifier onlyProxy {
```

Đây là một [`hàm modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), nó sửa đổi cách hoạt động của các hàm khác.

```solidity
      require(msg.sender == proxy);
```

Đầu tiên, xác minh chúng tôi được gọi bởi proxy chứ không phải ai khác.
Nếu không, hãy `revert`.

```solidity
      _;
    }
```

Nếu vậy, hãy chạy hàm mà chúng tôi sửa đổi.

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

Đây là ba hoạt động thường yêu cầu thông điệp phải đến trực tiếp từ thực thể chuyển token hoặc phê duyệt một khoản trợ cấp.
Ở đây chúng tôi có một phiên bản proxy của các hoạt động này:

1. Được sửa đổi bởi `onlyProxy()` để không ai khác được phép kiểm soát chúng.
2. Nhận địa chỉ thường là `msg.sender` làm tham số bổ sung.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Trình thông dịch calldata gần như giống hệt với trình thông dịch ở trên, ngoại trừ việc các hàm được ủy quyền nhận tham số `msg.sender` và không cần có khoản cho phép `transfer`.

```solidity
        // chuyển khoản (không cần khoản cho phép)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // phê duyệt
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

Chúng ta cần cho hợp đồng ERC-20 biết proxy nào cần tin tưởng

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Cần hai người ký để xác minh các khoản cho phép
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Để kiểm tra `approve()` và `transferFrom()`, chúng ta cần một người ký thứ hai.
Chúng tôi gọi nó là `poorSigner` vì nó không nhận được bất kỳ token nào của chúng tôi (tất nhiên nó cần phải có ETH).

```js
// Chuyển token
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Bởi vì hợp đồng ERC-20 tin tưởng vào proxy (`cdi`), chúng ta không cần một khoản trợ cấp để chuyển tiếp các giao dịch chuyển khoản.

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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Kiểm tra hai chức năng mới.
Lưu ý rằng `transferFromTx` yêu cầu hai tham số địa chỉ: người cấp khoản cho phép và người nhận.

## Kết luận {#conclusion}

Cả [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) và [Arbitrum](https://developer.offchainlabs.com/docs/special_features) đều đang tìm cách giảm kích thước của calldata được ghi vào L1 và do đó giảm chi phí giao dịch.
Tuy nhiên, với tư cách là các nhà cung cấp cơ sở hạ tầng đang tìm kiếm các giải pháp chung, khả năng của chúng tôi bị hạn chế.
Với tư cách là nhà phát triển ứng dụng phi tập trung, bạn có kiến thức cụ thể về ứng dụng, cho phép bạn tối ưu hóa calldata của mình tốt hơn nhiều so với chúng tôi trong một giải pháp chung.
Hy vọng rằng, bài viết này sẽ giúp bạn tìm ra giải pháp lý tưởng cho nhu cầu của mình.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).

