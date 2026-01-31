---
title: "Kiểm thử hợp đồng thông minh đơn giản với thư viện Waffle"
description: "Hướng dẫn cho người mới bắt đầu"
author: Ewa Kowalska
tags:
  [
    "hợp đồng thông minh",
    "solidity",
    "Waffle",
    "kiểm thử"
  ]
skill: beginner
lang: vi
published: 2021-02-26
---

## Trong hướng dẫn này, bạn sẽ học cách {#in-this-tutorial-youll-learn-how-to}

- Kiểm thử các thay đổi về số dư của ví
- Kiểm thử việc phát ra các sự kiện với các đối số được chỉ định
- Khẳng định rằng một giao dịch đã bị hoàn lại

## Các giả định {#assumptions}

- Bạn có thể tạo một dự án JavaScript hoặc TypeScript mới
- Bạn có một số kinh nghiệm cơ bản về kiểm thử trong JavaScript
- Bạn đã sử dụng một số trình quản lý gói như yarn hoặc npm
- Bạn có kiến thức rất cơ bản về các hợp đồng thông minh và Solidity

## Bắt đầu {#getting-started}

Hướng dẫn này trình bày cách thiết lập và chạy kiểm thử bằng yarn, nhưng sẽ không có vấn đề gì nếu bạn thích dùng npm - tôi sẽ cung cấp các tài liệu tham khảo phù hợp đến [tài liệu](https://ethereum-waffle.readthedocs.io/en/latest/index.html) chính thức của Waffle.

## Cài đặt các phần phụ thuộc {#install-dependencies}

[Thêm](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) các phần phụ thuộc ethereum-waffle và typescript vào các phần phụ thuộc dev của dự án của bạn.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Ví dụ về hợp đồng thông minh {#example-smart-contract}

Trong suốt hướng dẫn, chúng ta sẽ làm việc với một ví dụ hợp đồng thông minh đơn giản - EtherSplitter. Nó không làm gì nhiều ngoài việc cho phép bất kỳ ai gửi một ít wei và chia đều số đó cho hai người nhận được xác định trước.
Hàm split yêu cầu số wei phải là số chẵn, nếu không nó sẽ hoàn lại. Đối với cả hai người nhận, nó thực hiện một lần chuyển wei theo sau là việc phát ra sự kiện Transfer.

Đặt đoạn mã EtherSplitter vào `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Không cho phép số lượng wei lẻ');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Biên dịch hợp đồng {#compile-the-contract}

Để [biên dịch](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) hợp đồng, hãy thêm mục sau vào tệp package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Tiếp theo, tạo tệp cấu hình Waffle trong thư mục gốc của dự án - `waffle.json` - và sau đó dán cấu hình sau vào đó:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Chạy `yarn build`. Kết quả là, thư mục `build` sẽ xuất hiện với hợp đồng EtherSplitter đã được biên dịch ở định dạng JSON.

## Thiết lập kiểm thử {#test-setup}

Việc kiểm thử với Waffle yêu cầu sử dụng các matcher của Chai và Mocha, vì vậy bạn cần [thêm](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) chúng vào dự án của mình. Cập nhật tệp package.json của bạn và thêm mục `test` vào phần scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Nếu bạn muốn [thực thi](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) các bài kiểm thử của mình, chỉ cần chạy `yarn test`.

## Kiểm thử {#testing}

Bây giờ, hãy tạo thư mục `test` và tạo tệp mới `test\EtherSplitter.test.ts`.
Sao chép đoạn mã bên dưới và dán nó vào tệp kiểm thử của chúng ta.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Bộ chia Ether", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // thêm các bài kiểm thử ở đây
})
```

Đôi lời trước khi chúng ta bắt đầu.
`MockProvider` cung cấp một phiên bản giả của chuỗi khối. Nó cũng cung cấp các ví giả sẽ phục vụ chúng ta cho việc kiểm thử hợp đồng EtherSplitter. Chúng ta có thể nhận được tối đa mười ví bằng cách gọi phương thức `getWallets()` trên nhà cung cấp. Trong ví dụ, chúng ta nhận được ba ví - một cho người gửi và hai cho người nhận.

Tiếp theo, chúng ta khai báo một biến có tên là 'splitter' - đây là hợp đồng EtherSplitter giả của chúng ta. Nó được tạo ra trước mỗi lần thực thi một bài kiểm thử đơn lẻ bằng phương thức `deployContract`. Phương thức này mô phỏng việc triển khai một hợp đồng từ ví được truyền vào làm tham số đầu tiên (ví của người gửi trong trường hợp của chúng ta). Tham số thứ hai là ABI và bytecode của hợp đồng được kiểm thử - chúng ta truyền vào đó tệp json của hợp đồng EtherSplitter đã được biên dịch từ thư mục `build`. Tham số thứ ba là một mảng với các đối số của hàm khởi tạo của hợp đồng, trong trường hợp của chúng ta, là hai địa chỉ của người nhận.

## Thay đổi số dư {#changebalances}

Đầu tiên, chúng ta sẽ kiểm tra xem phương thức `split` có thực sự thay đổi số dư trong ví của người nhận hay không. Nếu chúng ta chia 50 wei từ tài khoản của người gửi, chúng ta sẽ mong đợi số dư của cả hai người nhận sẽ tăng thêm 25 wei. Chúng ta sẽ sử dụng trình khớp `changeBalances` của Waffle:

```ts
it("Thay đổi số dư tài khoản", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Với tham số đầu tiên của trình khớp, chúng ta truyền vào một mảng các ví của người nhận, và với tham số thứ hai - một mảng các mức tăng dự kiến trên các tài khoản tương ứng.
Nếu chúng ta muốn kiểm tra số dư của một ví cụ thể, chúng ta cũng có thể sử dụng trình khớp `changeBalance`, không yêu cầu truyền mảng, như trong ví dụ dưới đây:

```ts
it("Thay đổi số dư tài khoản", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Lưu ý rằng trong cả hai trường hợp của `changeBalance` và `changeBalances`, chúng ta truyền hàm split dưới dạng một lệnh gọi lại vì trình khớp cần truy cập vào trạng thái của số dư trước và sau lệnh gọi.

Tiếp theo, chúng ta sẽ kiểm tra xem sự kiện Transfer có được phát ra sau mỗi lần chuyển wei hay không. Chúng ta sẽ chuyển sang một trình khớp khác từ Waffle:

## Phát ra {#emit}

```ts
it("Phát ra sự kiện khi chuyển cho người nhận đầu tiên", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Phát ra sự kiện khi chuyển cho người nhận thứ hai", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Trình khớp `emit` cho phép chúng ta kiểm tra xem một hợp đồng có phát ra một sự kiện khi gọi một phương thức hay không. Với các tham số cho trình khớp `emit`, chúng ta cung cấp hợp đồng giả mà chúng ta dự đoán sẽ phát ra sự kiện, cùng với tên của sự kiện đó. Trong trường hợp của chúng ta, hợp đồng giả là `splitter` và tên của sự kiện là `Transfer`. Chúng ta cũng có thể xác minh các giá trị chính xác của các đối số mà sự kiện đã được phát ra cùng - chúng ta truyền nhiều đối số vào trình khớp `withArgs` như khai báo sự kiện của chúng ta mong đợi. Trong trường hợp hợp đồng EtherSplitter, chúng ta truyền các địa chỉ của người gửi và người nhận cùng với số lượng wei đã chuyển.

## Hoàn lại với {#revertedwith}

Trong ví dụ cuối cùng, chúng ta sẽ kiểm tra xem giao dịch có bị hoàn lại không trong trường hợp số wei là số lẻ. Chúng ta sẽ sử dụng trình khớp `revertedWith`:

```ts
it("Hoàn lại khi số lượng wei là số lẻ", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Không cho phép số lượng wei lẻ"
  )
})
```

Bài kiểm thử, nếu vượt qua, sẽ đảm bảo với chúng ta rằng giao dịch thực sự đã bị hoàn lại. Tuy nhiên, cũng phải có sự trùng khớp chính xác giữa thông điệp mà chúng ta đã truyền trong câu lệnh `require` và thông điệp chúng ta mong đợi trong `revertedWith`. Nếu chúng ta quay lại mã của hợp đồng EtherSplitter, trong câu lệnh `require` cho số lượng wei, chúng ta cung cấp thông điệp: 'Không cho phép số lượng wei lẻ'. Thông điệp này khớp với thông điệp mà chúng ta mong đợi trong bài kiểm thử của mình. Nếu chúng không bằng nhau, bài kiểm thử sẽ thất bại.

## Xin chúc mừng! {#congratulations}

Bạn đã thực hiện bước đi lớn đầu tiên của mình hướng tới việc kiểm thử các hợp đồng thông minh với Waffle!
