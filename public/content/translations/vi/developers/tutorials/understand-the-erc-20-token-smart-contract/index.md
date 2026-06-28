---
title: "Hiểu về hợp đồng thông minh token ERC-20"
description: "Tìm hiểu cách triển khai tiêu chuẩn token ERC-20 với một ví dụ và giải thích đầy đủ về hợp đồng thông minh Solidity."
author: "jdourlens"
tags: ["hợp đồng thông minh", "token", "Solidity", "erc-20"]
skill: beginner
breadcrumb: "Cơ bản về token ERC-20"
lang: vi
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Một trong những [tiêu chuẩn hợp đồng thông minh](/developers/docs/standards/) quan trọng nhất trên Ethereum được biết đến là [ERC-20](/developers/docs/standards/tokens/erc-20/), đã nổi lên như một tiêu chuẩn kỹ thuật được sử dụng cho tất cả các hợp đồng thông minh trên chuỗi khối Ethereum để triển khai token có thể thay thế.

ERC-20 định nghĩa một danh sách các quy tắc chung mà tất cả các token có thể thay thế trên Ethereum phải tuân thủ. Do đó, tiêu chuẩn token này trao quyền cho các nhà phát triển thuộc mọi loại hình dự đoán chính xác cách các token mới sẽ hoạt động trong hệ thống Ethereum rộng lớn hơn. Điều này đơn giản hóa và làm cho công việc của các nhà phát triển dễ dàng hơn, bởi vì họ có thể tiếp tục công việc của mình với sự tự tin rằng mỗi dự án mới sẽ không cần phải làm lại mỗi khi một token mới được phát hành, miễn là token đó tuân theo các quy tắc.

Dưới đây là các hàm mà một ERC-20 phải triển khai, được trình bày dưới dạng một giao diện (interface). Nếu bạn không chắc chắn giao diện là gì: hãy xem bài viết của chúng tôi về [lập trình OOP trong Solidity](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/).

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

Dưới đây là giải thích từng dòng về mục đích của mỗi hàm. Sau đó, chúng tôi sẽ trình bày một cách triển khai đơn giản của token ERC-20.

## Các hàm Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

Trả về số lượng token đang tồn tại. Hàm này là một getter và không sửa đổi trạng thái của hợp đồng. Hãy nhớ rằng không có số thực dấu phẩy động (float) trong Solidity. Do đó, hầu hết các token áp dụng 18 chữ số thập phân và sẽ trả về tổng nguồn cung cũng như các kết quả khác theo dạng 1000000000000000000 cho 1 token. Không phải mọi token đều có 18 chữ số thập phân và đây là điều bạn thực sự cần chú ý khi làm việc với các token.

```solidity
function balanceOf(address account) external view returns (uint256);
```

Trả về số lượng token thuộc sở hữu của một địa chỉ (`account`). Hàm này là một getter và không sửa đổi trạng thái của hợp đồng.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

Tiêu chuẩn ERC-20 cho phép một địa chỉ cấp một hạn mức cho một địa chỉ khác để có thể lấy token từ nó. Getter này trả về số lượng token còn lại mà `spender` sẽ được phép chi tiêu thay mặt cho `owner`. Hàm này là một getter, không sửa đổi trạng thái của hợp đồng và sẽ trả về 0 theo mặc định.

## Các hàm {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

Chuyển số lượng `amount` token từ địa chỉ gọi hàm (`msg.sender`) sang địa chỉ người nhận. Hàm này phát ra sự kiện `Transfer` được định nghĩa sau. Nó trả về true nếu việc chuyển là khả thi.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

Thiết lập số lượng `allowance` mà `spender` được phép chuyển từ số dư của người gọi hàm (`msg.sender`). Hàm này phát ra sự kiện Approval. Hàm trả về kết quả liệu hạn mức có được thiết lập thành công hay không.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

Chuyển số lượng `amount` token từ `sender` sang `recipient` bằng cách sử dụng cơ chế hạn mức. Số lượng (amount) sau đó được khấu trừ vào hạn mức của người gọi. Hàm này phát ra sự kiện `Transfer`.

## Các sự kiện {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sự kiện này được phát ra khi số lượng token (value) được gửi từ địa chỉ `from` đến địa chỉ `to`.

Trong trường hợp việc đúc token mới, việc chuyển thường là `from` địa chỉ 0x00..0000 trong khi trong trường hợp đốt token, việc chuyển là `to` 0x00..0000.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

Sự kiện này được phát ra khi số lượng token (`value`) được `owner` phê duyệt để sử dụng bởi `spender`.

## Một cách triển khai cơ bản của token ERC-20 {#a-basic-implementation-of-erc-20-tokens}

Dưới đây là đoạn mã đơn giản nhất để làm cơ sở cho token ERC-20 của bạn:

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

Một cách triển khai xuất sắc khác của tiêu chuẩn token ERC-20 là [bản triển khai ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).