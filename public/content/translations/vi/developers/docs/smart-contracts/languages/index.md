---
title: "Ngôn ngữ hợp đồng thông minh"
description: "Tổng quan và so sánh hai ngôn ngữ hợp đồng thông minh chính – Solidity và Vyper."
lang: vi
---

Một khía cạnh tuyệt vời của [Ethereum](/) là các hợp đồng thông minh có thể được lập trình bằng các ngôn ngữ tương đối thân thiện với nhà phát triển. Nếu bạn đã có kinh nghiệm với Python hoặc bất kỳ [ngôn ngữ sử dụng dấu ngoặc nhọn](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) nào, bạn có thể tìm thấy một ngôn ngữ có cú pháp quen thuộc.

Hai ngôn ngữ hoạt động và được bảo trì nhiều nhất là:

- Solidity
- Vyper

Remix IDE cung cấp một môi trường phát triển toàn diện để tạo và thử nghiệm các hợp đồng bằng cả Solidity và Vyper. [Hãy thử Remix IDE trên trình duyệt](https://remix.ethereum.org) để bắt đầu viết mã.

Các nhà phát triển giàu kinh nghiệm hơn cũng có thể muốn sử dụng Yul, một ngôn ngữ trung gian cho [Máy ảo Ethereum (EVM)](/developers/docs/evm/), hoặc Yul+, một phần mở rộng của Yul.

Nếu bạn tò mò và muốn giúp thử nghiệm các ngôn ngữ mới vẫn đang trong quá trình phát triển mạnh mẽ, bạn có thể thử nghiệm với Fe, một ngôn ngữ hợp đồng thông minh mới nổi hiện vẫn đang ở giai đoạn sơ khai.

## Điều kiện tiên quyết {#prerequisites}

Kiến thức trước đây về các ngôn ngữ lập trình, đặc biệt là JavaScript hoặc Python, có thể giúp bạn hiểu được sự khác biệt giữa các ngôn ngữ hợp đồng thông minh. Chúng tôi cũng khuyên bạn nên hiểu khái niệm về hợp đồng thông minh trước khi đi quá sâu vào việc so sánh các ngôn ngữ. [Giới thiệu về hợp đồng thông minh](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Ngôn ngữ bậc cao, hướng đối tượng để triển khai các hợp đồng thông minh.
- Ngôn ngữ sử dụng dấu ngoặc nhọn chịu ảnh hưởng sâu sắc nhất từ C++.
- Kiểu tĩnh (kiểu của một biến được biết tại thời điểm biên dịch).
- Hỗ trợ:
  - Kế thừa (bạn có thể mở rộng các hợp đồng khác).
  - Thư viện (bạn có thể tạo mã có thể tái sử dụng mà bạn có thể gọi từ các hợp đồng khác nhau – giống như các hàm tĩnh trong một lớp tĩnh ở các ngôn ngữ lập trình hướng đối tượng khác).
  - Các kiểu dữ liệu phức tạp do người dùng định nghĩa.

### Các liên kết quan trọng {#important-links}

- [Tài liệu](https://docs.soliditylang.org/en/latest/)
- [Cổng thông tin ngôn ngữ Solidity](https://soliditylang.org/)
- [Solidity qua ví dụ](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Phòng chat Gitter của Solidity](https://gitter.im/ethereum/solidity) được kết nối với [Phòng chat Matrix của Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Bảng tóm tắt (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter của Solidity](https://twitter.com/solidity_lang)

### Ví dụ về hợp đồng {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Từ khóa "public" làm cho các biến
    // có thể truy cập được từ các hợp đồng khác
    address public minter;
    mapping (address => uint) public balances;

    // Các sự kiện cho phép máy khách phản ứng với các
    // thay đổi của hợp đồng mà bạn khai báo
    event Sent(address from, address to, uint amount);

    // Mã của hàm khởi tạo chỉ được chạy khi hợp đồng
    // được tạo
    constructor() {
        minter = msg.sender;
    }

    // Gửi một số lượng tiền xu mới được tạo đến một địa chỉ
    // Chỉ có thể được gọi bởi người tạo hợp đồng
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Gửi một số lượng tiền xu hiện có
    // từ bất kỳ người gọi nào đến một địa chỉ
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Ví dụ này sẽ cho bạn hình dung về cú pháp hợp đồng Solidity. Để có mô tả chi tiết hơn về các hàm và biến, [hãy xem tài liệu](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Ngôn ngữ lập trình mang phong cách Python
- Kiểu dữ liệu mạnh
- Mã trình biên dịch nhỏ gọn và dễ hiểu
- Tạo mã byte hiệu quả
- Cố tình có ít tính năng hơn Solidity với mục đích làm cho các hợp đồng an toàn hơn và dễ kiểm toán hơn. Vyper không hỗ trợ:
  - Modifiers (Bộ sửa đổi)
  - Kế thừa
  - Inline assembly (Hợp ngữ nội tuyến)
  - Nạp chồng hàm
  - Nạp chồng toán tử
  - Gọi đệ quy
  - Vòng lặp vô hạn
  - Dấu phẩy tĩnh nhị phân

Để biết thêm thông tin, [hãy đọc cơ sở lý luận của Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Các liên kết quan trọng {#important-links-1}

- [Tài liệu](https://vyper.readthedocs.io)
- [Vyper qua ví dụ](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Thêm về Vyper qua ví dụ](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat Discord của cộng đồng Vyper](https://discord.gg/SdvKC79cJk)
- [Bảng tóm tắt (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Các framework và công cụ phát triển hợp đồng thông minh cho Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - học cách bảo mật và hack các hợp đồng thông minh Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub dành cho phát triển](https://github.com/zcor/vyper-dev)
- [Các ví dụ hợp đồng thông minh nổi bật nhất của Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Tài nguyên chọn lọc tuyệt vời về Vyper](https://github.com/spadebuilders/awesome-vyper)

### Ví dụ {#example}

```python
# Đấu giá mở

# Các tham số đấu giá
# Người thụ hưởng nhận tiền từ người trả giá cao nhất
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Trạng thái hiện tại của cuộc đấu giá
highestBidder: public(address)
highestBid: public(uint256)

# Được đặt thành true khi kết thúc, không cho phép bất kỳ thay đổi nào
ended: public(bool)

# Theo dõi các giá thầu được hoàn lại để chúng ta có thể tuân theo mô hình rút tiền
pendingReturns: public(HashMap[address, uint256])

# Tạo một cuộc đấu giá đơn giản với `_bidding_time`
# giây thời gian đấu giá thay mặt cho
# địa chỉ người thụ hưởng `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Đặt giá thầu cho cuộc đấu giá với giá trị được gửi
# cùng với giao dịch này.
# Giá trị sẽ chỉ được hoàn lại nếu
# không thắng cuộc đấu giá.
@external
@payable
def bid():
    # Kiểm tra xem thời gian đấu giá đã kết thúc chưa.
    assert block.timestamp < self.auctionEnd
    # Kiểm tra xem giá thầu có đủ cao không
    assert msg.value > self.highestBid
    # Theo dõi khoản hoàn trả cho người trả giá cao trước đó
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Theo dõi giá thầu cao mới
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Rút một giá thầu đã được hoàn lại trước đó. Mô hình rút tiền được
# sử dụng ở đây để tránh một vấn đề bảo mật. Nếu các khoản hoàn trả được trực tiếp
# gửi như một phần của bid(), một hợp đồng đặt giá thầu độc hại có thể chặn
# các khoản hoàn trả đó và do đó chặn các giá thầu mới cao hơn được đưa ra.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Kết thúc cuộc đấu giá và gửi giá thầu cao nhất
# cho người thụ hưởng.
@external
def endAuction():
    # Một nguyên tắc tốt là cấu trúc các hàm tương tác
    # với các hợp đồng khác (tức là chúng gọi hàm hoặc gửi ether)
    # thành ba giai đoạn:
    # 1. kiểm tra các điều kiện
    # 2. thực hiện các hành động (có khả năng thay đổi các điều kiện)
    # 3. tương tác với các hợp đồng khác
    # Nếu các giai đoạn này bị xáo trộn, hợp đồng khác có thể gọi
    # ngược lại vào hợp đồng hiện tại và sửa đổi trạng thái hoặc khiến
    # các hiệu ứng (thanh toán ether) được thực hiện nhiều lần.
    # Nếu các hàm được gọi nội bộ bao gồm tương tác với các
    # hợp đồng bên ngoài, chúng cũng phải được coi là tương tác với
    # các hợp đồng bên ngoài.

    # 1. Các điều kiện
    # Kiểm tra xem đã đến thời gian kết thúc đấu giá chưa
    assert block.timestamp >= self.auctionEnd
    # Kiểm tra xem hàm này đã được gọi chưa
    assert not self.ended

    # 2. Các hiệu ứng
    self.ended = True

    # 3. Tương tác
    send(self.beneficiary, self.highestBid)
```

Ví dụ này sẽ cho bạn hình dung về cú pháp hợp đồng Vyper. Để có mô tả chi tiết hơn về các hàm và biến, [hãy xem tài liệu](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul và Yul+ {#yul}

Nếu bạn mới làm quen với Ethereum và chưa từng viết mã bằng các ngôn ngữ hợp đồng thông minh, chúng tôi khuyên bạn nên bắt đầu với Solidity hoặc Vyper. Chỉ nên tìm hiểu Yul hoặc Yul+ khi bạn đã quen thuộc với các phương pháp bảo mật hợp đồng thông minh tốt nhất và các đặc thù khi làm việc với EVM.

**Yul**

- Ngôn ngữ trung gian cho Ethereum.
- Hỗ trợ [EVM](/developers/docs/evm) và [Ewasm](https://github.com/ewasm), một WebAssembly mang phong cách Ethereum, và được thiết kế để trở thành mẫu số chung có thể sử dụng được cho cả hai nền tảng.
- Mục tiêu tốt cho các giai đoạn tối ưu hóa cấp cao có thể mang lại lợi ích như nhau cho cả nền tảng EVM và Ewasm.

**Yul+**

- Một phần mở rộng cấp thấp, hiệu quả cao cho Yul.
- Ban đầu được thiết kế cho một hợp đồng [Rollup lạc quan](/developers/docs/scaling/optimistic-rollups/).
- Yul+ có thể được xem như một đề xuất nâng cấp thử nghiệm cho Yul, bổ sung thêm các tính năng mới cho nó.

### Các liên kết quan trọng {#important-links-2}

- [Tài liệu Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Tài liệu Yul+](https://github.com/fuellabs/yulp)
- [Bài viết giới thiệu Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Ví dụ về hợp đồng {#example-contract-2}

Ví dụ đơn giản sau đây triển khai một hàm lũy thừa. Nó có thể được biên dịch bằng cách sử dụng `solc --strict-assembly --bin input.yul`. Ví dụ này nên được lưu trữ trong tệp input.yul.

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

Nếu bạn đã có nhiều kinh nghiệm với các hợp đồng thông minh, bạn có thể tìm thấy một bản triển khai ERC-20 đầy đủ bằng Yul [tại đây](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Ngôn ngữ kiểu tĩnh cho Máy ảo Ethereum (EVM).
- Lấy cảm hứng từ Python và Rust.
- Hướng tới mục tiêu dễ học -- ngay cả đối với các nhà phát triển mới làm quen với hệ sinh thái Ethereum.
- Quá trình phát triển Fe vẫn đang ở giai đoạn đầu, ngôn ngữ này đã có bản phát hành alpha vào tháng 1 năm 2021.

### Các liên kết quan trọng {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Thông báo về Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Lộ trình Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat Discord của Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter của Fe](https://twitter.com/official_fe)

### Ví dụ về hợp đồng {#example-contract-3}

Sau đây là một hợp đồng đơn giản được triển khai bằng Fe.

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

Giống như bất kỳ ngôn ngữ lập trình nào khác, điều quan trọng nhất là chọn đúng công cụ cho đúng công việc cũng như sở thích cá nhân.

Dưới đây là một vài điều cần cân nhắc nếu bạn chưa thử bất kỳ ngôn ngữ nào:

### Điểm tuyệt vời của Solidity là gì? {#solidity-advantages}

- Nếu bạn là người mới bắt đầu, có rất nhiều hướng dẫn và công cụ học tập ngoài kia. Xem thêm về điều đó trong phần [Học qua việc viết mã](/developers/learning-tools/).
- Có sẵn các công cụ tốt cho nhà phát triển.
- Solidity có một cộng đồng nhà phát triển lớn, điều đó có nghĩa là bạn rất có thể sẽ tìm thấy câu trả lời cho các câu hỏi của mình khá nhanh chóng.

### Điểm tuyệt vời của Vyper là gì? {#vyper-advatages}

- Cách tuyệt vời để bắt đầu cho các nhà phát triển Python muốn viết các hợp đồng thông minh.
- Vyper có số lượng tính năng ít hơn, điều này làm cho nó trở nên tuyệt vời để tạo nguyên mẫu ý tưởng nhanh chóng.
- Vyper hướng tới mục tiêu dễ kiểm toán và tối đa hóa khả năng đọc hiểu của con người.

### Điểm tuyệt vời của Yul và Yul+ là gì? {#yul-advantages}

- Ngôn ngữ cấp thấp đơn giản và đầy đủ chức năng.
- Cho phép tiếp cận gần hơn nhiều với EVM thô, điều này có thể giúp tối ưu hóa việc sử dụng Gas cho các hợp đồng của bạn.

## So sánh các ngôn ngữ {#language-comparisons}

Để so sánh cú pháp cơ bản, vòng đời hợp đồng, giao diện, toán tử, cấu trúc dữ liệu, hàm, luồng điều khiển và nhiều nội dung khác, hãy xem [bảng tóm tắt này của Auditless](https://reference.auditless.com/cheatsheet/)

## Đọc thêm {#further-reading}

- [Thư viện hợp đồng Solidity của OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity qua ví dụ](https://solidity-by-example.org)