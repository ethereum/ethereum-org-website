---
title: "Hiểu hợp đồng thông minh mã thông báo ERC-20"
description: "Tìm hiểu cách triển khai tiêu chuẩn mã thông báo ERC-20 thông qua ví dụ và giải thích đầy đủ về hợp đồng thông minh Solidity."
author: "jdourlens"
tags: [ "hợp đồng thông minh", "tokens", "solidity", "erc-20" ]
skill: beginner
lang: vi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Một trong những [tiêu chuẩn hợp đồng thông minh](/developers/docs/standards/) quan trọng nhất trên Ethereum được gọi là [ERC-20](/developers/docs/standards/tokens/erc-20/), đã nổi lên như một tiêu chuẩn kỹ thuật được sử dụng cho tất cả các hợp đồng thông minh trên chuỗi khối Ethereum để triển khai mã thông báo có thể thay thế.

ERC-20 định nghĩa một danh sách các quy tắc chung mà tất cả các mã thông báo Ethereum có thể thay thế phải tuân thủ. Do đó, tiêu chuẩn mã thông báo này cho phép các nhà phát triển thuộc mọi loại dự đoán chính xác cách các mã thông báo mới sẽ hoạt động trong hệ thống Ethereum lớn hơn. Điều này đơn giản hóa và giảm nhẹ các tác vụ của nhà phát triển, bởi vì họ có thể tiếp tục công việc của mình khi biết rằng mỗi dự án mới sẽ không cần phải làm lại mỗi khi một mã thông báo mới được phát hành, miễn là mã thông báo đó tuân theo các quy tắc.

Dưới đây là các hàm mà một ERC-20 phải triển khai, được trình bày dưới dạng một giao diện. Nếu bạn không chắc chắn giao diện là gì: hãy xem bài viết của chúng tôi về [lập trình OOP trong Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

```solidity
pragma solidity ^0.6.0;

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
```

Dưới đây là giải thích từng dòng về chức năng của mỗi hàm. Sau đây, chúng tôi sẽ trình bày một cách triển khai đơn giản của mã thông báo ERC-20.

## Các hàm getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Trả về số lượng mã thông báo đang tồn tại. Hàm này là một hàm getter và không sửa đổi trạng thái của hợp đồng. Lưu ý rằng không có kiểu dữ liệu số thực (float) trong Solidity. Do đó, hầu hết các mã thông báo sử dụng 18 chữ số thập phân và sẽ trả về tổng nguồn cung cũng như các kết quả khác dưới dạng 1000000000000000000 cho 1 mã thông báo. Không phải mã thông báo nào cũng có 18 chữ số thập phân và đây là điều bạn thực sự cần lưu ý khi làm việc với các mã thông báo.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Trả về số lượng mã thông báo thuộc sở hữu của một địa chỉ (`account`). Hàm này là một hàm getter và không sửa đổi trạng thái của hợp đồng.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Tiêu chuẩn ERC-20 cho phép một địa chỉ cấp quyền cho một địa chỉ khác để có thể lấy mã thông báo từ đó. Hàm getter này trả về số lượng mã thông báo còn lại mà `spender` sẽ được phép chi tiêu thay mặt cho `owner`. Hàm này là một hàm getter, không sửa đổi trạng thái của hợp đồng và sẽ trả về 0 theo mặc định.

## Các hàm {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Di chuyển số lượng mã thông báo `amount` từ địa chỉ người gọi hàm (`msg.sender`) đến địa chỉ người nhận. Hàm này phát ra sự kiện `Transfer` được định nghĩa sau. Nó trả về true nếu việc chuyển có thể thực hiện được.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Đặt hạn mức (`allowance`) mà `spender` được phép chuyển từ số dư của người gọi hàm (`msg.sender`). Hàm này phát ra sự kiện `Approval`. Hàm trả về liệu hạn mức đã được đặt thành công hay chưa.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Di chuyển số lượng mã thông báo `amount` từ `sender` đến `recipient` bằng cơ chế hạn mức. `amount` sau đó được trừ vào hạn mức của người gọi. Hàm này phát ra sự kiện `Transfer`.

## Sự kiện {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sự kiện này được phát ra khi một lượng mã thông báo (giá trị) được gửi từ địa chỉ `from` đến địa chỉ `to`.

Trong trường hợp đúc các mã thông báo mới, việc chuyển thường là `from` địa chỉ 0x00..0000, trong khi trong trường hợp đốt mã thông báo, việc chuyển là `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Sự kiện này được phát ra khi số lượng mã thông báo (`value`) được `owner` phê duyệt để `spender` sử dụng.

## Một cách triển khai cơ bản của mã thông báo ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Dưới đây là đoạn mã đơn giản nhất để bạn dựa vào đó tạo mã thông báo ERC-20 của mình:

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

Một cách triển khai tuyệt vời khác của tiêu chuẩn mã thông báo ERC-20 là [cách triển khai ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
