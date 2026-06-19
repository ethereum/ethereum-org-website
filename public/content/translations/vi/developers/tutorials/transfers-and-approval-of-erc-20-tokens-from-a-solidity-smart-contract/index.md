---
title: Chuyển và chấp thuận token ERC-20 từ một hợp đồng thông minh Solidity
description: Xây dựng một hợp đồng thông minh DEX xử lý việc chuyển và chấp thuận token ERC-20 bằng Solidity.
author: "jdourlens"
tags: ["hợp đồng thông minh", "token", "solidity", "erc-20"]
skill: intermediate
breadcrumb: Chuyển ERC-20
lang: vi
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong hướng dẫn trước, chúng ta đã tìm hiểu [cấu trúc của một token ERC-20 trong Solidity](/developers/tutorials/understand-the-erc-20-token-smart-contract/) trên chuỗi khối Ethereum. Trong bài viết này, chúng ta sẽ xem cách sử dụng một hợp đồng thông minh để tương tác với một token bằng ngôn ngữ Solidity.

Đối với hợp đồng thông minh này, chúng ta sẽ tạo một sàn giao dịch phi tập trung (DEX) mô phỏng thực tế, nơi người dùng có thể giao dịch ether để lấy [token ERC-20](/developers/docs/standards/tokens/erc-20/) mới được triển khai của chúng ta.

Trong hướng dẫn này, chúng ta sẽ sử dụng mã đã viết ở hướng dẫn trước làm cơ sở. DEX của chúng ta sẽ khởi tạo một phiên bản của hợp đồng trong hàm khởi tạo của nó và thực hiện các thao tác:

- hoán đổi token lấy ether
- hoán đổi ether lấy token

Chúng ta sẽ bắt đầu mã sàn giao dịch phi tập trung của mình bằng cách thêm cơ sở mã ERC20 đơn giản:

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

Hợp đồng thông minh DEX mới của chúng ta sẽ triển khai ERC-20 và nhận tất cả nguồn cung:

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

Vậy là bây giờ chúng ta đã có DEX và nó có sẵn toàn bộ dự trữ token. Hợp đồng có hai hàm:

- `buy`: Người dùng có thể gửi ether và nhận lại token
- `sell`: Người dùng có thể quyết định gửi token để nhận lại ether

## Hàm mua (buy) {#the-buy-function}

Hãy lập trình hàm mua. Trước tiên, chúng ta cần kiểm tra số lượng ether mà thông điệp chứa và xác minh rằng hợp đồng sở hữu đủ token cũng như thông điệp có chứa một lượng ether. Nếu hợp đồng sở hữu đủ token, nó sẽ gửi số lượng token đó cho người dùng và phát ra sự kiện `Bought`.

Lưu ý rằng nếu chúng ta gọi hàm yêu cầu (require) trong trường hợp có lỗi, số ether đã gửi sẽ trực tiếp bị hoàn nguyên và trả lại cho người dùng.

Để giữ cho mọi thứ đơn giản, chúng ta chỉ hoán đổi 1 token lấy 1 Wei.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

Trong trường hợp mua thành công, chúng ta sẽ thấy hai sự kiện trong giao dịch: Sự kiện `Transfer` của token và sự kiện `Bought`.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## Hàm bán (sell) {#the-sell-function}

Hàm chịu trách nhiệm bán trước tiên sẽ yêu cầu người dùng đã chấp thuận số lượng bằng cách gọi hàm chấp thuận (approve) từ trước. Việc chấp thuận chuyển yêu cầu token ERC20Basic được khởi tạo bởi DEX phải được người dùng gọi. Điều này có thể đạt được bằng cách trước tiên gọi hàm `token()` của hợp đồng DEX để lấy địa chỉ nơi DEX đã triển khai hợp đồng ERC20Basic có tên là `token`. Sau đó, chúng ta tạo một phiên bản của hợp đồng đó trong phiên làm việc của mình và gọi hàm `approve` của nó. Tiếp theo, chúng ta có thể gọi hàm `sell` của DEX và hoán đổi token của chúng ta để lấy lại ether. Ví dụ, đây là cách nó hoạt động trong một phiên tương tác Brownie:

```python
#### Python trong bảng điều khiển Brownie tương tác...

# triển khai DEX
dex = DEX.deploy({'from':account1})

# gọi hàm buy để hoán đổi ether lấy token
# 1e18 là 1 ether được tính bằng Wei
dex.buy({'from': account2, 1e18})

# lấy địa chỉ triển khai cho token ERC-20
# đã được triển khai trong quá trình tạo hợp đồng DEX
# dex.token() trả về địa chỉ đã được triển khai cho token
token = ERC20Basic.at(dex.token())

# gọi hàm chấp thuận của token
# chấp thuận địa chỉ dex làm người chi tiêu
# và số lượng token của bạn mà nó được phép chi tiêu
token.approve(dex.address, 3e18, {'from':account2})

```

Sau đó, khi hàm bán được gọi, chúng ta sẽ kiểm tra xem việc chuyển từ địa chỉ người gọi đến địa chỉ hợp đồng có thành công hay không và sau đó gửi lại Ether cho địa chỉ người gọi.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

Nếu mọi thứ hoạt động tốt, bạn sẽ thấy 2 sự kiện (một `Transfer` và `Sold`) trong giao dịch, đồng thời số dư token và số dư ether của bạn được cập nhật.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

Từ hướng dẫn này, chúng ta đã thấy cách kiểm tra số dư và hạn mức của một token ERC-20, cũng như cách gọi `Transfer` và `TransferFrom` của một hợp đồng thông minh ERC20 bằng cách sử dụng giao diện.

Sau khi bạn thực hiện một giao dịch, chúng tôi có một hướng dẫn JavaScript để [chờ và lấy thông tin chi tiết về các giao dịch](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) đã được thực hiện đối với hợp đồng của bạn và một [hướng dẫn để giải mã các sự kiện được tạo ra bởi việc chuyển token hoặc bất kỳ sự kiện nào khác](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) miễn là bạn có ABI.

Dưới đây là toàn bộ mã cho hướng dẫn:

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```