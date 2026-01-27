---
title: "Waffle: Giả lập động và kiểm thử các lệnh gọi hợp đồng"
description: Hướng dẫn Waffle nâng cao về cách sử dụng tính năng giả lập động và kiểm thử các lệnh gọi hợp đồng
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "hợp đồng thông minh",
    "solidity",
    "kiểm thử",
    "mocking"
  ]
skill: intermediate
lang: vi
published: 2020-11-14
---

## Hướng dẫn này viết về điều gì? {#what-is-this-tutorial-about}

Trong hướng dẫn này, bạn sẽ học cách:

- sử dụng tính năng giả lập động
- kiểm thử các tương tác giữa các hợp đồng thông minh

Các giả định:

- bạn đã biết cách viết một hợp đồng thông minh đơn giản bằng `Solidity`
- bạn đã quen với `JavaScript` và `TypeScript`
- bạn đã xem các hướng dẫn `Waffle` khác hoặc đã biết đôi chút về nó

## Giả lập động {#dynamic-mocking}

Tại sao tính năng giả lập động lại hữu ích? À, nó cho phép chúng ta viết các bài kiểm thử đơn vị thay vì các bài kiểm thử tích hợp. Điều đó có nghĩa là gì? Điều đó có nghĩa là chúng ta không cần phải lo lắng về các yếu tố phụ thuộc của hợp đồng thông minh, do đó chúng ta có thể kiểm thử tất cả chúng một cách hoàn toàn độc lập. Hãy để tôi chỉ cho bạn chính xác cách thực hiện.

### **1. Dự án** {#1-project}

Trước khi bắt đầu, chúng ta cần chuẩn bị một dự án node.js đơn giản:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Hãy bắt đầu bằng việc thêm các yếu tố phụ thuộc của typescript và kiểm thử - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Bây giờ, hãy thêm `Waffle` và `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

Cấu trúc dự án của bạn bây giờ sẽ trông như thế này:

```
.
├── contracts
├── package.json
└── test
```

### **2. Hợp đồng thông minh** {#2-smart-contract}

Để bắt đầu tính năng giả lập động, chúng ta cần một hợp đồng thông minh có các yếu tố phụ thuộc. Đừng lo, tôi đã chuẩn bị sẵn cho bạn rồi!

Đây là một hợp đồng thông minh đơn giản được viết bằng `Solidity` với mục đích duy nhất là kiểm tra xem chúng ta có giàu không. Nó sử dụng token ERC20 để kiểm tra xem chúng ta có đủ token không. Hãy đặt nó trong `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Vì chúng ta muốn sử dụng tính năng giả lập động nên chúng ta không cần toàn bộ ERC20, đó là lý do tại sao chúng ta đang sử dụng giao diện IERC20 chỉ với một hàm duy nhất.

Đã đến lúc xây dựng hợp đồng này! Để làm điều đó, chúng ta sẽ sử dụng `Waffle`. Đầu tiên, chúng ta sẽ tạo một tệp cấu hình `waffle.json` đơn giản để chỉ định các tùy chọn biên dịch.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Bây giờ, chúng ta đã sẵn sàng để xây dựng hợp đồng với Waffle:

```bash
npx waffle
```

Dễ phải không? Trong thư mục `build/` đã xuất hiện hai tệp tương ứng với hợp đồng và giao diện. Chúng ta sẽ sử dụng chúng sau để kiểm thử.

### **3. Kiểm thử** {#3-testing}

Hãy tạo một tệp có tên `AmIRichAlready.test.ts` để kiểm thử thực tế. Trước hết, chúng ta phải xử lý các phần nhập. Chúng ta sẽ cần chúng cho phần sau:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Ngoại trừ các yếu tố phụ thuộc JS, chúng ta cần nhập hợp đồng và giao diện đã xây dựng của mình:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle sử dụng `chai` để kiểm thử. Tuy nhiên, trước khi có thể sử dụng, chúng ta phải đưa các bộ so khớp của Waffle vào chính chai:

```typescript
use(solidity)
```

Chúng ta cần triển khai hàm `beforeEach()` để đặt lại trạng thái của hợp đồng trước mỗi bài kiểm thử. Trước tiên, hãy nghĩ xem chúng ta cần gì ở đó. Để triển khai một hợp đồng, chúng ta cần hai thứ: một ví và một hợp đồng ERC20 đã triển khai để chuyển nó làm tham số cho hợp đồng `AmIRichAlready`.

Đầu tiên, chúng ta tạo một ví:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Sau đó, chúng ta cần triển khai một hợp đồng ERC20. Đây là phần khó - chúng ta chỉ có một giao diện. Đây là phần mà Waffle ra tay cứu giúp chúng ta. Waffle có một hàm `deployMockContract()` thần kỳ, có thể tạo một hợp đồng chỉ bằng cách sử dụng _abi_ (giao diện nhị phân ứng dụng) của giao diện:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Bây giờ với cả ví và ERC20 đã triển khai, chúng ta có thể tiến hành triển khai hợp đồng `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Với tất cả những điều đó, hàm `beforeEach()` của chúng ta đã hoàn tất. Đến đây, tệp `AmIRichAlready.test.ts` của bạn sẽ trông như thế này:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Hãy viết bài kiểm thử đầu tiên cho hợp đồng `AmIRichAlready`. Bạn nghĩ bài kiểm thử của chúng ta nên nói về điều gì? Vâng, bạn nói đúng! Chúng ta nên kiểm tra xem mình đã giàu chưa :)

Nhưng hãy đợi một chút. Làm thế nào hợp đồng giả lập của chúng ta biết được giá trị nào sẽ trả về? Chúng ta chưa triển khai bất kỳ logic nào cho hàm `balanceOf()`. Một lần nữa, Waffle có thể giúp ở đây. Hợp đồng giả lập của chúng ta hiện có một số tính năng mới thú vị:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Với kiến thức này, cuối cùng chúng ta có thể viết bài kiểm thử đầu tiên của mình:

```typescript
it("trả về false nếu ví có ít hơn 1000000 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Hãy chia nhỏ bài kiểm thử này thành các phần:

1. Chúng ta thiết lập hợp đồng ERC20 giả lập của mình để luôn trả về số dư là 999999 token.
2. Kiểm tra xem phương thức `contract.check()` có trả về `false` không.

Chúng ta đã sẵn sàng để chạy nó:

![Một bài kiểm thử đã qua](./test-one.png)

Vậy là bài kiểm thử hoạt động, nhưng... vẫn còn một số điểm cần cải thiện. Hàm `balanceOf()` sẽ luôn trả về 99999. Chúng ta có thể cải thiện điều đó bằng cách chỉ định một ví mà hàm sẽ trả về một cái gì đó - giống như một hợp đồng thực:

```typescript
it("trả về false nếu ví có ít hơn 1000001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Cho đến nay, chúng ta mới chỉ kiểm thử trường hợp chúng ta chưa đủ giàu. Hãy kiểm thử trường hợp ngược lại:

```typescript
it("trả về true nếu ví có ít nhất 1000001 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Bạn chạy các bài kiểm thử...

![Hai bài kiểm thử đã qua](test-two.png)

...và đây là kết quả của bạn! Hợp đồng của chúng ta dường như hoạt động như dự định :)

## Kiểm thử các lệnh gọi hợp đồng {#testing-contract-calls}

Hãy tóm tắt những gì chúng ta đã làm cho đến nay. Chúng ta đã kiểm thử chức năng của hợp đồng `AmIRichAlready` và nó dường như đang hoạt động bình thường. Điều đó có nghĩa là chúng ta đã xong, phải không? Không hẳn! Waffle cho phép chúng ta kiểm thử hợp đồng của mình sâu hơn nữa. Nhưng chính xác là như thế nào? À, trong kho vũ khí của Waffle có các bộ so khớp `calledOnContract()` và `calledOnContractWith()`. Chúng sẽ cho phép chúng ta kiểm tra xem hợp đồng của chúng ta có gọi hợp đồng giả lập ERC20 hay không. Đây là một bài kiểm thử cơ bản với một trong những bộ so khớp này:

```typescript
it("kiểm tra xem hợp đồng có gọi hàm balanceOf trên token ERC20 không", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Chúng ta có thể tiến xa hơn nữa và cải thiện bài kiểm thử này với bộ so khớp khác mà tôi đã nói với bạn:

```typescript
it("kiểm tra xem hợp đồng có gọi hàm balanceOf với một ví nhất định trên token ERC20 không", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Hãy kiểm tra xem các bài kiểm thử có đúng không:

![Ba bài kiểm thử đã qua](test-three.png)

Tuyệt vời, tất cả các bài kiểm thử đều đã qua.

Kiểm thử các lệnh gọi hợp đồng với Waffle siêu dễ. Và đây là phần tuyệt nhất. Các bộ so khớp này hoạt động với cả hợp đồng thông thường và hợp đồng giả lập! Đó là vì Waffle ghi lại và lọc các lệnh gọi EVM thay vì chèn mã, như trường hợp của các thư viện kiểm thử phổ biến cho các công nghệ khác.

## Về đích {#the-finish-line}

Xin chúc mừng! Bây giờ bạn đã biết cách sử dụng Waffle để kiểm thử các lệnh gọi hợp đồng và giả lập hợp đồng một cách linh động. Còn nhiều tính năng thú vị hơn nữa để khám phá. Tôi khuyên bạn nên tìm hiểu sâu hơn trong tài liệu tham khảo của Waffle.

Tài liệu tham khảo của Waffle có sẵn [tại đây](https://ethereum-waffle.readthedocs.io/).

Mã nguồn cho hướng dẫn này có thể được tìm thấy [tại đây](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Các hướng dẫn mà bạn cũng có thể quan tâm:

- [Kiểm thử hợp đồng thông minh với Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
