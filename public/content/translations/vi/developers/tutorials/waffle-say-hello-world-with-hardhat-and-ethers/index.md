---
title: "Hướng dẫn Waffle hello world với hardhat và ethers"
description: "Tạo dự án Waffle đầu tiên của bạn với hardhat và ethers.js"
author: "MiZiet"
tags:
  [
    "waffle",
    "hợp đồng thông minh",
    "solidity",
    "kiểm thử",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: vi
published: 2020-10-16
---

Trong hướng dẫn [Waffle](https://ethereum-waffle.readthedocs.io) này, chúng ta sẽ học cách thiết lập một dự án hợp đồng thông minh "Hello world" đơn giản, sử dụng [hardhat](https://hardhat.org/) và [ethers.js](https://docs.ethers.io/v5/). Sau đó, chúng ta sẽ học cách thêm một chức năng mới vào hợp đồng thông minh của mình và cách kiểm tra nó với Waffle.

Hãy bắt đầu bằng cách tạo một dự án mới:

```bash
yarn init
```

hoặc

```bash
npm init
```

và cài đặt các gói cần thiết:

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

hoặc

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

Bước tiếp theo là tạo một dự án hardhat mẫu bằng cách chạy `npx hardhat`.

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Chào mừng đến với Hardhat v2.0.3 👷‍

? Bạn muốn làm gì? …
❯ Tạo một dự án mẫu
Tạo một tệp hardhat.config.js trống
Thoát
```

Chọn `Tạo một dự án mẫu`

Cấu trúc dự án của chúng ta sẽ trông như thế này:

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### Bây giờ hãy nói về một số tệp này: {#now-lets-talk}

- Greeter.sol - hợp đồng thông minh của chúng ta được viết bằng solidity;

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("Triển khai Greeter với lời chào:", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("Thay đổi lời chào từ '%s' thành '%s'", greeting, _greeting);
greeting = _greeting;
}
}
```

Hợp đồng thông minh của chúng ta có thể được chia thành ba phần:

1. constructor - nơi chúng ta khai báo một biến kiểu chuỗi có tên là `greeting`,
2. function greet - một hàm sẽ trả về `greeting` khi được gọi,
3. function setGreeting - một hàm cho phép chúng ta thay đổi giá trị `greeting`.

- sample-test.js - tệp kiểm tra của chúng ta

```js
describe("Greeter", function () {
  it("Nên trả về lời chào mới sau khi nó được thay đổi", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### Bước tiếp theo bao gồm việc biên dịch hợp đồng của chúng ta và chạy các bài kiểm tra: {#compiling-and-testing}

Các bài kiểm tra Waffle sử dụng Mocha (một khung kiểm thử) với Chai (một thư viện xác nhận). Tất cả những gì bạn phải làm là chạy `npx hardhat test` và đợi thông điệp sau xuất hiện.

```bash
✓ Nên trả về lời chào mới sau khi nó được thay đổi
```

### Mọi thứ cho đến nay đều tuyệt vời, hãy thêm một chút phức tạp vào dự án của chúng ta <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

Hãy tưởng tượng một tình huống mà ai đó thêm một chuỗi rỗng làm lời chào. Đó sẽ không phải là một lời chào nồng nhiệt, phải không?  
Hãy đảm bảo rằng điều đó không xảy ra:

Chúng ta muốn sử dụng `revert` của solidity khi ai đó chuyển một chuỗi rỗng. Một điều tốt là chúng ta có thể dễ dàng kiểm tra chức năng này với trình so khớp chai của Waffle `to.be.revertedWith()`.

```js
it("Nên hoàn lại khi chuyển một chuỗi rỗng", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "Lời chào không được để trống"
  )
})
```

Có vẻ như bài kiểm tra mới của chúng ta đã không thành công:

```bash
Triển khai Greeter với lời chào: Hello, world!
Thay đổi lời chào từ 'Hello, world!' thành 'Hola, mundo!'
    ✓ Nên trả về lời chào mới sau khi nó được thay đổi (1514ms)
Triển khai Greeter với lời chào: Hello, world!
Thay đổi lời chào từ 'Hello, world!' thành ''
    1) Nên hoàn lại khi chuyển một chuỗi rỗng


  1 thành công (2 giây)
  1 thất bại
```

Hãy triển khai chức năng này vào hợp đồng thông minh của chúng ta:

```solidity
require(bytes(_greeting).length > 0, "Lời chào không được để trống");
```

Bây giờ, hàm setGreeting của chúng ta trông như thế này:

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "Lời chào không được để trống");
console.log("Thay đổi lời chào từ '%s' thành '%s'", greeting, _greeting);
greeting = _greeting;
}
```

Hãy chạy lại các bài kiểm tra:

```bash
✓ Nên trả về lời chào mới sau khi nó được thay đổi (1467ms)
✓ Nên hoàn lại khi chuyển một chuỗi rỗng (276ms)

2 thành công (2 giây)
```

Xin chúc mừng! Bạn đã làm được :)

### Kết luận {#conclusion}

Chúng ta đã tạo một dự án đơn giản với Waffle, Hardhat và ethers.js. Chúng ta đã học cách thiết lập một dự án, thêm một bài kiểm tra và triển khai chức năng mới.

Để biết thêm các trình so khớp chai tuyệt vời để kiểm tra các hợp đồng thông minh của bạn, hãy xem [tài liệu chính thức của Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html).
