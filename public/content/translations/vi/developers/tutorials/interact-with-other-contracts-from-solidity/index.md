---
title: Tương tác với các hợp đồng khác từ Solidity
description: Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó
author: "jdourlens"
tags: ["hợp đồng thông minh", "solidity", "remix", "triển khai", "khả năng kết hợp"]
skill: advanced
breadcrumb: Tương tác hợp đồng
lang: vi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong các hướng dẫn trước, chúng ta đã học được nhiều điều về [cách triển khai hợp đồng thông minh đầu tiên của bạn](/developers/tutorials/deploying-your-first-smart-contract/) và thêm một số tính năng cho nó như [kiểm soát quyền truy cập bằng các modifier](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) hoặc [xử lý lỗi trong Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Trong hướng dẫn này, chúng ta sẽ tìm hiểu cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó.

Chúng ta sẽ tạo một hợp đồng cho phép bất kỳ ai cũng có thể có hợp đồng thông minh `Counter` của riêng mình bằng cách tạo một factory cho nó, tên của nó sẽ là `CounterFactory`. Đầu tiên, đây là mã của hợp đồng thông minh `Counter` ban đầu của chúng ta:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Lưu ý rằng chúng ta đã sửa đổi một chút mã hợp đồng để theo dõi địa chỉ của factory và địa chỉ của chủ sở hữu hợp đồng. Khi bạn gọi mã hợp đồng từ một hợp đồng khác, msg.sender sẽ tham chiếu đến địa chỉ của contract factory của chúng ta. Đây là **một điểm thực sự quan trọng cần hiểu** vì việc sử dụng một hợp đồng để tương tác với các hợp đồng khác là một thực tế phổ biến. Do đó, bạn nên chú ý xem ai là người gửi trong các trường hợp phức tạp.

Vì lý do này, chúng ta cũng đã thêm một modifier `onlyFactory` để đảm bảo rằng hàm thay đổi trạng thái chỉ có thể được gọi bởi factory, nơi sẽ truyền người gọi ban đầu dưới dạng tham số.

Bên trong `CounterFactory` mới của chúng ta, nơi sẽ quản lý tất cả các Counter khác, chúng ta sẽ thêm một mapping để liên kết một chủ sở hữu với địa chỉ của hợp đồng counter của họ:

```solidity
mapping(address => Counter) _counters;
```

Trong Ethereum, mapping tương đương với các đối tượng trong JavaScript, chúng cho phép ánh xạ một khóa kiểu A với một giá trị kiểu B. Trong trường hợp này, chúng ta ánh xạ địa chỉ của một chủ sở hữu với phiên bản Counter của họ.

Việc khởi tạo một Counter mới cho ai đó sẽ trông như thế này:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Đầu tiên, chúng ta kiểm tra xem người đó đã sở hữu một counter hay chưa. Nếu họ chưa sở hữu một counter, chúng ta khởi tạo một counter mới bằng cách truyền địa chỉ của họ vào hàm khởi tạo `Counter` và gán phiên bản mới được tạo vào mapping.

Để lấy số đếm của một Counter cụ thể, nó sẽ trông như thế này:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

Hàm đầu tiên kiểm tra xem hợp đồng Counter có tồn tại cho một địa chỉ nhất định hay không và sau đó gọi phương thức `getCount` từ phiên bản đó. Hàm thứ hai: `getMyCount` chỉ là một cách viết ngắn gọn để truyền trực tiếp msg.sender vào hàm `getCount`.

Hàm `increment` khá tương tự nhưng truyền người gửi giao dịch ban đầu vào hợp đồng `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Lưu ý rằng nếu được gọi quá nhiều lần, counter của chúng ta có thể trở thành nạn nhân của lỗi tràn số. Bạn nên sử dụng [thư viện SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) càng nhiều càng tốt để bảo vệ khỏi trường hợp có thể xảy ra này.

Để triển khai hợp đồng của chúng ta, bạn sẽ cần cung cấp cả mã của `CounterFactory` và `Counter`. Ví dụ: khi triển khai trong Remix, bạn sẽ cần chọn CounterFactory.

Đây là toàn bộ mã:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Sau khi biên dịch, trong phần triển khai của Remix, bạn sẽ chọn factory để triển khai:

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Sau đó, bạn có thể thử nghiệm với contract factory của mình và kiểm tra sự thay đổi giá trị. Nếu bạn muốn gọi hợp đồng thông minh từ một địa chỉ khác, bạn sẽ cần thay đổi địa chỉ trong phần chọn Tài khoản của Remix.