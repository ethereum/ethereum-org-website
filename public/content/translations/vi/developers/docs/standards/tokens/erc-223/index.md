---
title: Tiêu chuẩn token ERC-223
description: Tổng quan về tiêu chuẩn token có thể thay thế ERC-223, cách thức hoạt động và so sánh với ERC-20.
lang: vi
---

## Giới thiệu {#introduction}

### ERC-223 là gì? {#what-is-erc223}

ERC-223 là một tiêu chuẩn cho các token có thể thay thế, tương tự như tiêu chuẩn ERC-20. Điểm khác biệt chính là ERC-223 không chỉ định nghĩa API của token mà còn cả logic để chuyển token từ người gửi đến người nhận. Nó giới thiệu một mô hình giao tiếp cho phép việc chuyển token được xử lý ở phía người nhận.

### Những điểm khác biệt so với ERC-20 {#erc20-differences}

ERC-223 giải quyết một số hạn chế của ERC-20 và giới thiệu một phương thức tương tác mới giữa hợp đồng token và một hợp đồng có thể nhận token. Có một vài điều có thể thực hiện với ERC-223 nhưng không thể với ERC-20:

- Xử lý chuyển token ở phía người nhận: Người nhận có thể phát hiện ra rằng một token ERC-223 đang được nạp vào.
- Từ chối các token bị gửi sai: Nếu người dùng gửi token ERC-223 đến một hợp đồng không được thiết kế để nhận token, hợp đồng đó có thể từ chối giao dịch, giúp ngăn chặn việc mất token.
- Siêu dữ liệu trong các lần chuyển: Token ERC-223 có thể bao gồm siêu dữ liệu, cho phép đính kèm thông tin tùy ý vào các giao dịch token.

## Điều kiện tiên quyết {#prerequisites}

- [Tài khoản](/developers/docs/accounts)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Nội dung chính {#body}

ERC-223 là một tiêu chuẩn token triển khai một API cho các token bên trong hợp đồng thông minh. Nó cũng khai báo một API cho các hợp đồng được thiết kế để nhận token ERC-223. Các hợp đồng không hỗ trợ API Người nhận (Receiver API) của ERC-223 sẽ không thể nhận token ERC-223, giúp ngăn ngừa lỗi từ người dùng.

Nếu một hợp đồng thông minh triển khai các phương thức và sự kiện sau, nó có thể được gọi là một hợp đồng token tương thích với ERC-223. Sau khi được triển khai, nó sẽ chịu trách nhiệm theo dõi các token đã được tạo trên Ethereum.

Hợp đồng không bắt buộc chỉ có những hàm này và nhà phát triển có thể thêm bất kỳ tính năng nào khác từ các tiêu chuẩn token khác vào hợp đồng này. Ví dụ, các hàm `approve` và `transferFrom` không thuộc tiêu chuẩn ERC-223 nhưng các hàm này có thể được triển khai nếu cần thiết.

Từ [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Các phương thức {#methods}

Token ERC-223 phải triển khai các phương thức sau:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Một hợp đồng được thiết kế để nhận token ERC-223 phải triển khai phương thức sau:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Nếu token ERC-223 được gửi đến một hợp đồng không triển khai hàm `tokenReceived(..)` thì việc chuyển phải thất bại và token không được di chuyển khỏi số dư của người gửi.

### Các sự kiện {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Ví dụ {#examples}

API của token ERC-223 tương tự như của ERC-20, vì vậy từ góc độ phát triển giao diện người dùng (UI) thì không có sự khác biệt. Ngoại lệ duy nhất ở đây là token ERC-223 có thể không có các hàm `approve` + `transferFrom` vì chúng là tùy chọn đối với tiêu chuẩn này.

#### Ví dụ bằng Solidity {#solidity-example}

Ví dụ sau minh họa cách một hợp đồng token ERC-223 cơ bản hoạt động:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Bây giờ chúng ta muốn một hợp đồng khác chấp nhận các khoản nạp `tokenA` với giả định rằng tokenA là một token ERC-223. Hợp đồng phải chỉ chấp nhận tokenA và từ chối bất kỳ token nào khác. Khi hợp đồng nhận được tokenA, nó phải phát ra một sự kiện `Deposit()` và tăng giá trị của biến `deposits` nội bộ.

Dưới đây là mã nguồn:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Token duy nhất mà chúng tôi muốn chấp nhận.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Điều quan trọng cần hiểu là trong hàm này
        // msg.sender là địa chỉ của một token đang được nhận,
        // msg.value  luôn là 0 vì hợp đồng token không sở hữu hoặc gửi ether trong hầu hết các trường hợp,
        // _from      là người gửi của việc chuyển token,
        // _value     là số lượng token đã được nạp.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Các câu hỏi thường gặp {#faq}

### Điều gì sẽ xảy ra nếu chúng ta gửi một số tokenB đến hợp đồng? {#sending-tokens}

Giao dịch sẽ thất bại và việc chuyển token sẽ không diễn ra. Token sẽ được trả lại cho địa chỉ của người gửi.

### Làm thế nào chúng ta có thể nạp tiền vào hợp đồng này? {#contract-deposits}

Gọi hàm `transfer(address,uint256)` hoặc `transfer(address,uint256,bytes)` của token ERC-223, chỉ định địa chỉ của `RecipientContract`.

### Điều gì sẽ xảy ra nếu chúng ta chuyển một token ERC-20 đến hợp đồng này? {#erc-20-transfers}

Nếu một token ERC-20 được gửi đến `RecipientContract`, token sẽ được chuyển, nhưng việc chuyển sẽ không được ghi nhận (không có sự kiện `Deposit()` nào được phát ra và giá trị tiền nạp sẽ không thay đổi). Các khoản nạp ERC-20 không mong muốn không thể bị lọc hoặc ngăn chặn.

### Sẽ ra sao nếu chúng ta muốn thực thi một hàm nào đó sau khi việc nạp token hoàn tất? {#function-execution}

Có nhiều cách để làm điều này. Trong ví dụ này, chúng ta sẽ làm theo phương pháp giúp cho các lần chuyển ERC-223 giống hệt như các lần chuyển ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Token duy nhất mà chúng tôi muốn chấp nhận.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Xử lý giao dịch đến và thực hiện một lệnh gọi hàm tiếp theo.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Khi `RecipientContract` nhận được một token ERC-223, hợp đồng sẽ thực thi một hàm được mã hóa dưới dạng tham số `_data` của giao dịch token, giống hệt như cách các giao dịch ether mã hóa các lệnh gọi hàm dưới dạng `data` của giao dịch. Đọc [trường dữ liệu](/developers/docs/transactions/#the-data-field) để biết thêm thông tin.

Trong ví dụ trên, một token ERC-223 phải được chuyển đến địa chỉ của `RecipientContract` bằng hàm `transfer(address,uin256,bytes calldata _data)`. Nếu tham số dữ liệu là `0xc2985578` (chữ ký của một hàm `foo()`) thì hàm foo() sẽ được gọi sau khi nhận được khoản nạp token và sự kiện Foo() sẽ được phát ra.

Các tham số cũng có thể được mã hóa trong `data` của lần chuyển token, ví dụ chúng ta có thể gọi hàm bar() với giá trị 12345 cho `_someNumber`. Trong trường hợp này, `data` phải là `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` trong đó `0x0423a132` là chữ ký của hàm `bar(uint256)` và `00000000000000000000000000000000000000000000000000000000000004d2` là 12345 dưới dạng uint256.

## Những hạn chế {#limitations}

Mặc dù ERC-223 giải quyết một số vấn đề được tìm thấy trong tiêu chuẩn ERC-20, nhưng nó không phải là không có những hạn chế riêng:

- Sự chấp thuận và tính tương thích: ERC-223 vẫn chưa được áp dụng rộng rãi, điều này có thể hạn chế khả năng tương thích của nó với các công cụ và nền tảng hiện có.
- Tương thích ngược: ERC-223 không tương thích ngược với ERC-20, nghĩa là các hợp đồng và công cụ ERC-20 hiện có sẽ không hoạt động với token ERC-223 nếu không có sự sửa đổi.
- Chi phí Gas: Các kiểm tra và chức năng bổ sung trong các lần chuyển ERC-223 có thể dẫn đến chi phí Gas cao hơn so với các giao dịch ERC-20.

## Đọc thêm {#further-reading}

- [EIP-223: Tiêu chuẩn token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Đề xuất ERC-223 ban đầu](https://github.com/ethereum/eips/issues/223)