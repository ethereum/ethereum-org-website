---
title: "Tương tác với các hợp đồng khác từ Solidity"
description: "Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó"
author: "jdourlens"
tags:
  [
    "hợp đồng thông minh",
    "solidity",
    "remix",
    "triển khai",
    "khả năng tổng hợp"
  ]
skill: advanced
lang: vi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong các hướng dẫn trước, chúng ta đã học được rất nhiều về [cách triển khai hợp đồng thông minh đầu tiên của bạn](/developers/tutorials/deploying-your-first-smart-contract/) và thêm một số tính năng cho nó như [kiểm soát quyền truy cập bằng các bộ sửa đổi](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) hoặc [xử lý lỗi trong Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Trong hướng dẫn này, chúng ta sẽ học cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó.

Chúng ta sẽ tạo một hợp đồng cho phép bất kỳ ai có hợp đồng thông minh `Counter` của riêng họ bằng cách tạo một factory cho nó, tên của nó sẽ là `CounterFactory`. Đầu tiên đây là mã của hợp đồng thông minh `Counter` ban đầu của chúng ta:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Bạn không phải là chủ sở hữu của hợp đồng");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Bạn cần sử dụng factory");
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

Lưu ý rằng chúng tôi đã sửa đổi một chút mã hợp đồng để theo dõi địa chỉ của factory và địa chỉ của chủ sở hữu hợp đồng. Khi bạn gọi mã hợp đồng từ một hợp đồng khác, msg.sender sẽ tham chiếu đến địa chỉ của factory hợp đồng của chúng ta. Đây là **một điểm thực sự quan trọng cần hiểu** vì việc sử dụng một hợp đồng để tương tác với các hợp đồng khác là một thông lệ phổ biến. Do đó, bạn nên cẩn thận về việc ai là người gửi trong các trường hợp phức tạp.

Vì vậy, chúng tôi cũng đã thêm một bộ sửa đổi `onlyFactory` để đảm bảo rằng hàm thay đổi trạng thái chỉ có thể được gọi bởi factory, nơi sẽ chuyển người gọi ban đầu dưới dạng một tham số.

Bên trong `CounterFactory` mới của chúng ta, sẽ quản lý tất cả các Counter khác, chúng ta sẽ thêm một ánh xạ sẽ liên kết một chủ sở hữu với địa chỉ của hợp đồng counter của họ:

```solidity
mapping(address => Counter) _counters;
```

Trong Ethereum, ánh xạ tương đương với các đối tượng trong javascript, chúng cho phép ánh xạ một khóa loại A tới một giá trị loại B. Trong trường hợp này, chúng ta ánh xạ địa chỉ của một chủ sở hữu với phiên bản Counter của nó.

Việc khởi tạo một Counter mới cho ai đó sẽ trông như thế này:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Đầu tiên chúng ta kiểm tra xem người đó đã sở hữu một counter hay chưa. Nếu họ chưa sở hữu một counter, chúng ta sẽ khởi tạo một counter mới bằng cách chuyển địa chỉ của họ cho hàm khởi tạo `Counter` và gán phiên bản mới được tạo cho ánh xạ.

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

Hàm đầu tiên kiểm tra xem hợp đồng Counter có tồn tại cho một địa chỉ nhất định hay không và sau đó gọi phương thức `getCount` từ phiên bản đó. Hàm thứ hai: `getMyCount` chỉ là một lối tắt để chuyển trực tiếp msg.sender đến hàm `getCount`.

Hàm `increment` khá tương tự nhưng chuyển người gửi giao dịch ban đầu đến hợp đồng `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Lưu ý rằng nếu được gọi quá nhiều lần, bộ đếm của chúng ta có thể bị lỗi tràn số. Bạn nên sử dụng [thư viện SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) càng nhiều càng tốt để bảo vệ khỏi trường hợp có thể xảy ra này.

Để triển khai hợp đồng của chúng ta, bạn sẽ cần cung cấp cả mã của `CounterFactory` và `Counter`. Ví dụ: khi triển khai trong Remix, bạn sẽ cần phải chọn CounterFactory.

Đây là mã đầy đủ:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Bạn không phải là chủ sở hữu của hợp đồng");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Bạn cần sử dụng factory");
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

![Chọn factory để triển khai trong Remix](./counterfactory-deploy.png)

Sau đó, bạn có thể thử nghiệm với factory hợp đồng của mình và kiểm tra sự thay đổi giá trị. Nếu bạn muốn gọi hợp đồng thông minh từ một địa chỉ khác, bạn sẽ cần thay đổi địa chỉ trong phần chọn Tài khoản của Remix.
