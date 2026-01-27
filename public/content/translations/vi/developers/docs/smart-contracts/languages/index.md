---
title: Ngôn ngữ hợp đồng thông minh
description: Tổng quan và so sánh hai ngôn ngữ chính dùng để xây dựng hợp đồng thông minh - Solidity và Vyper.
lang: vi
---

Một khía cạnh tuyệt vời của Ethereum đó chính là những hợp đồng thông minh có thể được viết nên bởi các ngôn ngữ lập trình tương đối thân thiện. Nếu bạn đã có kinh nghiệm với Python hoặc bất kỳ [ngôn ngữ dấu ngoặc nhọn nào](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), bạn có thể tìm thấy một ngôn ngữ có cú pháp quen thuộc.

Hai ngôn ngữ hoạt động và được duy trì phổ biến nhất là:

- Solidity
- Vyper

Remix IDE cung cấp một môi trường phát triển toàn diện cho việc tạo và kiểm tra hợp đồng bằng cả Solidity và Vyper. [Hãy thử Remix IDE trong trình duyệt](https://remix.ethereum.org) để bắt đầu lập trình.

Các nhà phát triển có kinh nghiệm hơn cũng có thể muốn sử dụng Yul, một ngôn ngữ trung gian cho [Máy ảo Ethereum](/developers/docs/evm/), hoặc Yul+, một phần mở rộng của Yul.

Nếu bạn muốn tìm hiểu thêm và thử nghiệm các ngôn ngữ mới vẫn đang được phát triển mạnh mẽ, bạn có thể thử Fe, một ngôn ngữ hợp đồng thông minh mới nổi hiện nay còn trong giai đoạn sơ khai.

## Điều kiện tiên quyết {#prerequisites}

Những kiến thức trước đây về các ngôn ngữ lập trình, đặc biệt là JavaScript hoặc Python, có thể giúp bạn hiểu được sự khác biệt trong những ngôn ngữ hợp đồng thông minh. Chúng tôi cũng khuyến nghị bạn nắm rõ hợp đồng thông minh như một khái niệm trước khi đi sâu vào sự so sánh giữa các ngôn ngữ. [Giới thiệu về hợp đồng thông minh](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Là ngôn ngữ bậc cao và hướng đối tượng để triển khai các hợp đồng thông minh.
- Ngôn ngữ ngoặc nhọn, chịu sự ảnh hưởng mạnh mẽ bởi C++.
- Nhập tĩnh (kiểu dữ liệu của biến sẽ được xác định ở thời điểm biên dịch).
- Hỗ Trợ:
  - Kế thừa (để bạn có thể mở rộng các hợp đồng khác).
  - Các thư viện (bạn có thể tạo ra những đoạn mã có thể tái sử dụng để gọi chúng vào các hợp đồng khác - tương tựng như hàm tĩnh trong một lớp tĩnh ở các ngôn ngữ lập trình hướng đối tượng khác).
  - Các kiểu dữ liệu phức tạp do người dùng tự định nghĩa.

### Các liên kết quan trọng {#important-links}

- [Tài liệu tham khảo](https://docs.soliditylang.org/en/latest/)
- [Cổng thông tin ngôn ngữ Solidity](https://soliditylang.org/)
- [Solidity qua ví dụ](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Phòng trò chuyện Solidity Gitter](https://gitter.im/ethereum/solidity) được bắc cầu đến [Phòng trò chuyện Solidity Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Bảng tính nhanh](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter của Solidity](https://twitter.com/solidity_lang)

### Hợp đồng mẫu {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Từ khóa "public" giúp các biến
    // có thể truy cập được từ các hợp đồng khác
    address public minter;
    mapping (address => uint) public balances;

    // Các sự kiện cho phép các ứng dụng
    // phản ứng với các thay đổi hợp đồng cụ thể mà bạn khai báo
    event Sent(address from, address to, uint amount);

    // Mã hàm khởi tạo chỉ được chạy khi hợp đồng
    // được tạo
    constructor() {
        minter = msg.sender;
    }

    // Gửi một lượng coin mới được tạo tới một địa chỉ
    // Chỉ có thể được gọi bởi người tạo hợp đồng
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Gửi một lượng coin hiện có
    // từ bất kỳ người gọi nào đến một địa chỉ
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Số dư không đủ.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Ví dụ trên sẽ cho bạn biết cú phát của hợp đồng được viết bằng Solidity là như thế nào. Để có mô tả chi tiết hơn về các hàm và biến, [xem tài liệu](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Ngôn ngữ lập trình Python
- Strong typing (kiểu dữ liệu của một đối tượng không thay đổi đột ngột, không tường minh)
- Mã biên dịch gọn và dễ hiểu
- Tạo mã bytecode hiệu quả
- Được tạo ra với mục đích là it tính năng hơn Solidity để tăng sự an toàn của hợp đồng và dễ kiểm tra hơn. Vyper không hỗ trợ:
  - Modifiers
  - Tính kế thừa
  - Mã assembly nội dòng
  - Nạp chồng hàm
  - Nạp chồng toán tử
  - Đệ quy
  - Vòng lặp vô hạn
  - Các fixed points nhị phân

Để biết thêm thông tin, [đọc cơ sở lý luận của Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Các liên kết quan trọng {#important-links-1}

- [Tài liệu tham khảo](https://vyper.readthedocs.io)
- [Vyper qua ví dụ](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Thêm ví dụ về Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Trò chuyện cộng đồng Vyper trên Discord](https://discord.gg/SdvKC79cJk)
- [Bảng tính nhanh](https://reference.auditless.com/cheatsheet)
- [Các bộ khung và công cụ phát triển hợp đồng thông minh cho Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - học cách bảo mật và hack các hợp đồng thông minh Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub để phát triển](https://github.com/zcor/vyper-dev)
- [Các ví dụ hợp đồng thông minh Vyper hay nhất](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Các tài nguyên chọn lọc tuyệt vời về Vyper](https://github.com/spadebuilders/awesome-vyper)

### Ví dụ {#example}

```python
# Đấu giá mở

# Tham số đấu giá
# Người thụ hưởng nhận tiền từ người trả giá cao nhất
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Trạng thái hiện tại của phiên đấu giá
highestBidder: public(address)
highestBid: public(uint256)

# Đặt thành true ở cuối, không cho phép bất kỳ thay đổi nào
ended: public(bool)

# Theo dõi các giá thầu được hoàn lại để chúng ta có thể tuân theo mẫu rút tiền
pendingReturns: public(HashMap[address, uint256])

# Tạo một phiên đấu giá đơn giản với `_bidding_time`
# giây thời gian đấu giá thay mặt cho
# địa chỉ người thụ hưởng `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Đặt giá cho phiên đấu giá với giá trị được gửi
# cùng với giao dịch này.
# Giá trị sẽ chỉ được hoàn lại nếu
# không thắng phiên đấu giá.
@external
@payable
def bid():
    # Kiểm tra xem thời gian đặt giá đã kết thúc chưa.
    assert block.timestamp < self.auctionEnd
    # Kiểm tra xem giá thầu có đủ cao không
    assert msg.value > self.highestBid
    # Theo dõi khoản tiền hoàn lại cho người trả giá cao trước đó
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Theo dõi giá thầu cao mới
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Rút lại một giá thầu đã được hoàn lại trước đó. Mẫu rút tiền được
# sử dụng ở đây để tránh một vấn đề bảo mật. Nếu các khoản hoàn trả được gửi trực tiếp
# như một phần của bid(), một hợp đồng đặt giá độc hại có thể chặn
# các khoản hoàn trả đó và do đó chặn các giá thầu cao hơn mới được đưa vào.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Kết thúc phiên đấu giá và gửi giá thầu cao nhất
# cho người thụ hưởng.
@external
def endAuction():
    # Một nguyên tắc hay là cấu trúc các hàm tương tác
    # với các hợp đồng khác (tức là chúng gọi các hàm hoặc gửi ether)
    # thành ba giai đoạn:
    # 1. kiểm tra các điều kiện
    # 2. thực hiện các hành động (có khả năng thay đổi các điều kiện)
    # 3. tương tác với các hợp đồng khác
    # Nếu các giai đoạn này bị trộn lẫn, hợp đồng khác có thể gọi
    # lại vào hợp đồng hiện tại và sửa đổi trạng thái hoặc gây ra
    # các hiệu ứng (thanh toán ether) được thực hiện nhiều lần.
    # Nếu các hàm được gọi trong nội bộ bao gồm tương tác với các hợp đồng
    # bên ngoài, chúng cũng phải được coi là tương tác với
    # các hợp đồng bên ngoài.

    # 1. Điều kiện
    # Kiểm tra xem thời gian kết thúc đấu giá đã đến chưa
    assert block.timestamp >= self.auctionEnd
    # Kiểm tra xem hàm này đã được gọi chưa
    assert not self.ended

    # 2. Tác động
    self.ended = True

    # 3. Tương tác
    send(self.beneficiary, self.highestBid)
```

Ví dụ trên sẽ cho bạn biết cú phát của hợp đồng được viết bằng Vyper là như thế nào. Để có mô tả chi tiết hơn về các hàm và biến, [xem tài liệu](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul và Yul+ {#yul}

Nếu bạn mới tiếp cận Ethereum và chưa thực hiện bất kỳ đoạn mã nào với các ngôn ngữ lập trình hợp đồng thông minh, chúng tôi khuyên bạn nên bắt đầu với Solidity hoặc Vyper. Bạn chỉ nên tìm hiểu Yul hoặc Yu+ khi bạn đã quen thuộc với các kĩ thuật tốt nhất về bảo mật hợp đồng thông minh và các chi tiết công việc với Máy chủ ảo Ethereum.

**Yul**

- Là ngôn ngữ trung gian cho Ethereum.
- Hỗ trợ [Máy chủ ảo Ethereum (EVM)](/developers/docs/evm) và [Ewasm](https://github.com/ewasm), một WebAssembly đặc trưng của Ethereum, và được thiết kế để trở thành một mẫu số chung có thể sử dụng được của cả hai nền tảng.
- Mục tiêu tốt cho các giai đoạn tối ưu hóa cấp cao, có thể mang lại lợi ích ngang nhau cho cả hai nền tảng Máy chủ ảo Ethereum và Ewasm.

**Yul+**

- Ngôn ngữ bậc thấp, có các tiện ích mở rộng hiệu quả hơn Yul.
- Ban đầu được thiết kế cho một hợp đồng [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/).
- Yul+ có thể được xem là một đề xuất nâng cấp thử nghiệm cho Yul với việc bổ sung các tính năng mới.

### Các liên kết quan trọng {#important-links-2}

- [Tài liệu Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Tài liệu Yul+](https://github.com/fuellabs/yulp)
- [Bài viết giới thiệu Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Hợp đồng mẫu {#example-contract-2}

Ví dụ đơn giản sau đây thực hiện một hàm lũy thừa. Nó có thể được biên dịch bằng `solc --strict-assembly --bin input.yul`. Ví dụ này nên được đặt trong thư mục input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Nếu bạn đã có nhiều kinh nghiệm với các hợp đồng thông minh, bạn có thể tìm thấy một bản triển khai ERC20 đầy đủ bằng Yul [tại đây](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Là ngôn ngữ nhập tĩnh cho Máy ảo Ethereum (EVM).
- Được lấy cảm hứng từ Python và Rust.
- Dễ học - kể cả với những lập trình viên mới tiếp cận hệ sinh thái Ethereum.
- Quá trình phát triển Fe vẫn đang ở giai đoạn đầu với bản phát hành alpha được công bố vào 01/2021.

### Các liên kết quan trọng {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Thông báo về Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Lộ trình Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Trò chuyện Fe trên Discord](https://discord.com/invite/ywpkAXFjZH)
- [Twitter của Fe](https://twitter.com/official_fe)

### Hợp đồng mẫu {#example-contract-3}

Dưới đây là một hợp đồng đơn giản được triển khai bằng Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Cách lựa chọn {#how-to-choose}

Như những ngôn ngữ lập trình khác, điều này tùy thuộc vào sở thích cá nhân cũng như việc chọn đúng ngôn ngữ để phù hợp với nhu cầu công việc đó.

Dưới đây là một vài gợi ý mà bạn có thể cân nhắc nếu bạn chưa từng thử lập trình một ngôn ngữ nào trước đây:

### Thế mạnh của Solidity? {#solidity-advantages}

- Có nhiều tài liệu hướng dẫn và các bộ công cụ học tập dành cho người mới bắt đầu. Xem thêm về điều đó trong phần [Học bằng cách viết mã](/developers/learning-tools/).
- Có sẵn các công cụ phát triển ổn định.
- Solidity có một cộng đồng các nhà phát triển lớp mạnh, điều đó có nghĩa là bạn sẽ luôn tìm được hầu hết các câu trả lời về những vấn đề của bạn một cách nhanh chóng.

### Thế mạnh của Vyper? {#vyper-advatages}

- Một cách tuyệt vời để bắt đầu cho những lập trình viên Python muốn xây dựng hợp đồng thông minh.
- Vyper có ít tính năng hơn vì thế phù hợp cho việc phác thảo nhanh các mẫu ý tưởng.
- Vyper nhắm đến việc đơn giản hóa việc kiểm định và giúp con người có thể hiểu được ở mức tối đa.

### Thế mạnh của Yul và Yul+? {#yul-advantages}

- Ngôn ngữ cấp thấp đơn giản.
- Cho phép tiếp cận gần hơn đến phần gốc máy chủ ảo Ethereum, giúp tối ưu hóa việc sử dụng gas trong các hợp động của bạn.

## So sánh các ngôn ngữ {#language-comparisons}

Để so sánh cú pháp cơ bản, vòng đời hợp đồng, giao diện, toán tử, cấu trúc dữ liệu, hàm, luồng điều khiển và hơn thế nữa, hãy xem [bảng tính nhanh của Auditless](https://reference.auditless.com/cheatsheet/).

## Đọc thêm {#further-reading}

- [Thư viện Hợp đồng Solidity của OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity qua ví dụ](https://solidity-by-example.org)
