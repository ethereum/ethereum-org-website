---
title: "Chuyển khoản và phê duyệt token ERC-20 từ một hợp đồng thông minh Solidity"
description: "Xây dựng một hợp đồng thông minh của sàn giao dịch phi tập trung (DEX) xử lý việc chuyển khoản và phê duyệt token ERC-20 bằng Solidity."
author: "jdourlens"
tags: [ "hợp đồng thông minh", "tokens", "solidity", "erc-20" ]
skill: intermediate
lang: vi
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong hướng dẫn trước, chúng ta đã nghiên cứu [cấu trúc của một token ERC-20 trong Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) trên chuỗi khối Ethereum. Trong bài viết này, chúng ta sẽ xem cách có thể sử dụng hợp đồng thông minh để tương tác với token bằng ngôn ngữ Solidity.

Đối với hợp đồng thông minh này, chúng tôi sẽ tạo một sàn giao dịch phi tập trung mẫu, nơi người dùng có thể giao dịch ether để lấy [token ERC-20](/developers/docs/standards/tokens/erc-20/) mới được triển khai của chúng tôi.

Đối với hướng dẫn này, chúng tôi sẽ sử dụng mã mà chúng tôi đã viết trong hướng dẫn trước làm cơ sở. Sàn giao dịch phi tập trung (DEX) của chúng tôi sẽ khởi tạo một bản sao của hợp đồng trong hàm khởi tạo và thực hiện các hoạt động sau:

- đổi token lấy ether
- đổi ether lấy token

Chúng tôi sẽ bắt đầu mã sàn giao dịch phi tập trung của mình bằng cách thêm cơ sở mã ERC20 đơn giản của chúng tôi:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

Hợp đồng thông minh của sàn giao dịch phi tập trung (DEX) mới của chúng tôi sẽ triển khai ERC-20 và nhận tất cả nguồn cung:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

Vì vậy, bây giờ chúng tôi đã có sàn giao dịch phi tập trung (DEX) của mình và nó có sẵn tất cả lượng token dự trữ. Hợp đồng có hai chức năng:

- `buy`: Người dùng có thể gửi ether và nhận lại token
- `sell`: Người dùng có thể quyết định gửi token để nhận lại ether

## Hàm mua {#the-buy-function}

Hãy lập trình hàm mua. Trước tiên, chúng tôi sẽ cần kiểm tra lượng ether chứa trong thông điệp và xác minh rằng hợp đồng sở hữu đủ token và thông điệp có chứa một lượng ether. Nếu hợp đồng sở hữu đủ token, nó sẽ gửi số lượng token cho người dùng và phát ra sự kiện `Bought`.

Lưu ý rằng nếu chúng tôi gọi hàm require trong trường hợp có lỗi, ether đã gửi sẽ được hoàn lại ngay lập tức và trả lại cho người dùng.

Để đơn giản hóa, chúng tôi chỉ đổi 1 token lấy 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "Bạn cần gửi một ít ether");
    require(amountTobuy <= dexBalance, "Không đủ token trong kho dự trữ");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Trong trường hợp mua thành công, chúng ta sẽ thấy hai sự kiện trong giao dịch: Sự kiện `Transfer` token và sự kiện `Bought`.

![Hai sự kiện trong giao dịch: Transfer và Bought](./transfer-and-bought-events.png)

## Hàm bán {#the-sell-function}

Hàm chịu trách nhiệm bán trước tiên sẽ yêu cầu người dùng phải phê duyệt số tiền bằng cách gọi hàm phê duyệt trước đó. Việc phê duyệt chuyển khoản yêu cầu người dùng phải gọi token ERC20Basic được khởi tạo bởi sàn giao dịch phi tập trung (DEX). Điều này có thể được thực hiện bằng cách trước tiên gọi hàm `token()` của hợp đồng DEX để truy xuất địa chỉ nơi DEX đã triển khai hợp đồng ERC20Basic có tên là `token`. Sau đó, chúng tôi tạo một bản sao của hợp đồng đó trong phiên của mình và gọi hàm `approve` của nó. Sau đó, chúng ta có thể gọi hàm `sell` của DEX và hoán đổi token của mình để lấy lại ether. Ví dụ, đây là giao diện của nó trong một phiên brownie tương tác:

```python
#### Python trong bảng điều khiển brownie tương tác...

# triển khai DEX
dex = DEX.deploy({'from':account1})

# gọi hàm mua để hoán đổi ether lấy token
# 1e18 là 1 ether được tính bằng wei
dex.buy({'from': account2, 1e18})

# lấy địa chỉ triển khai cho token ERC20
# đã được triển khai trong quá trình tạo hợp đồng DEX
# dex.token() trả về địa chỉ đã triển khai cho token
token = ERC20Basic.at(dex.token())

# gọi hàm phê duyệt của token
# phê duyệt địa chỉ dex là người chi tiêu
# và số lượng token của bạn được phép chi tiêu
token.approve(dex.address, 3e18, {'from':account2})

```

Sau đó, khi hàm bán được gọi, chúng tôi sẽ kiểm tra xem việc chuyển từ địa chỉ của người gọi đến địa chỉ hợp đồng có thành công không và sau đó gửi Ethers trở lại địa chỉ của người gọi.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "Bạn cần bán ít nhất một số token");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Kiểm tra khoản phụ cấp token");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Nếu mọi thứ hoạt động, bạn sẽ thấy 2 sự kiện (một `Transfer` và một `Sold`) trong giao dịch và số dư token cũng như số dư ether của bạn được cập nhật.

![Hai sự kiện trong giao dịch: Transfer và Sold](./transfer-and-sold-events.png)

<Divider />

Từ hướng dẫn này, chúng ta đã thấy cách kiểm tra số dư và khoản phụ cấp của một token ERC-20, cũng như cách gọi `Transfer` và `TransferFrom` của một hợp đồng thông minh ERC20 bằng giao diện.

Khi bạn thực hiện một giao dịch, chúng tôi có một hướng dẫn JavaScript để [chờ và lấy chi tiết về các giao dịch](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) đã được thực hiện đối với hợp đồng của bạn và một [hướng dẫn để giải mã các sự kiện được tạo ra bởi việc chuyển khoản token hoặc bất kỳ sự kiện nào khác](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) miễn là bạn có Giao diện nhị phân ứng dụng (ABI).

Đây là mã hoàn chỉnh cho hướng dẫn:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "Bạn cần gửi một ít ether");
        require(amountTobuy <= dexBalance, "Không đủ token trong kho dự trữ");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "Bạn cần bán ít nhất một số token");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Kiểm tra khoản phụ cấp token");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
