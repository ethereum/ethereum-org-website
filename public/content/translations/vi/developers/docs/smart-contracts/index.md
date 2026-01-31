---
title: "Giới thiệu về hợp đồng thông minh"
description: "Một cái nhìn tổng quan về hợp đồng thông minh, tập trung vào các đặc điểm và giới hạn độc đáo của chúng."
lang: vi
---

## Hợp đồng thông minh là gì? {#what-is-a-smart-contract}
Một "hợp đồng thông minh" đơn giản chỉ là một chương trình hoạt động trên chuỗi khối Ethereum. Đó là một bộ mã (các hàm của nó) và dữ liệu (trạng thái của nó) tồn tại tại một địa chỉ cụ thể trên chuỗi khối Ethereum.

Hợp đồng thông minh là một loại [tài khoản Ethereum](/developers/docs/accounts/). Điều này có nghĩa là họ có một số dư và có thể trở thành đối tượng của các giao dịch. Tuy nhiên, chúng không được điều khiển bởi người dùng, mà được triển khai vào mạng và hoạt động theo chương trình đã được lập. Các tài khoản người dùng sau đó có thể tương tác với một hợp đồng thông minh bằng cách gửi các giao dịch thực thi một chức năng được xác định trong hợp đồng thông minh. Hợp đồng thông minh có thể xác định các quy tắc, giống như một hợp đồng thông thường, và tự động thực thi chúng qua mã. Hợp đồng thông minh không thể bị xóa theo mặc định, và các tương tác với chúng là không thể đảo ngược.

## Điều kiện tiên quyết {#prerequisites}

Nếu bạn mới bắt đầu hoặc đang tìm kiếm một phần giới thiệu ít kỹ thuật hơn, chúng tôi khuyên bạn nên xem [phần giới thiệu về hợp đồng thông minh](/smart-contracts/) của chúng tôi.

Hãy chắc chắn rằng bạn đã đọc về [tài khoản](/developers/docs/accounts/), [giao dịch](/developers/docs/transactions/) và [máy ảo Ethereum](/developers/docs/evm/) trước khi bước vào thế giới hợp đồng thông minh.

## Máy bán hàng tự động kỹ thuật số {#a-digital-vending-machine}

Có lẽ phép ẩn dụ tốt nhất cho một hợp đồng thông minh là một máy bán hàng tự động, như được mô tả bởi [Nick Szabo](https://unenumerated.blogspot.com/). Với những đầu vào đúng, một đầu ra nhất định được đảm bảo.

Để lấy một món ăn nhẹ từ máy bán hàng tự động:

```
tiền + lựa chọn đồ ăn nhẹ = nhả đồ ăn nhẹ
```

Lô-gic này được lập trình vào trong máy bán hàng tự động.

Một hợp đồng thông minh, giống như một máy bán hàng tự động, có logic được lập trình sẵn. Dưới đây là một ví dụ đơn giản về cách máy bán hàng này sẽ trông như thế nào nếu nó được viết dưới dạng hợp đồng thông minh bằng ngôn ngữ Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Khai báo các biến trạng thái của hợp đồng
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Khi hợp đồng 'VendingMachine' được triển khai:
    // 1. đặt địa chỉ triển khai làm chủ sở hữu hợp đồng
    // 2. đặt số dư cupcake của hợp đồng thông minh đã triển khai thành 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Cho phép chủ sở hữu tăng số dư cupcake của hợp đồng thông minh
    function refill(uint amount) public {
        require(msg.sender == owner, "Chỉ chủ sở hữu mới có thể nạp thêm.");
        cupcakeBalances[address(this)] += amount;
    }

    // Cho phép bất kỳ ai mua cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Bạn phải trả ít nhất 1 ETH cho mỗi cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Không đủ cupcake trong kho để hoàn tất giao dịch mua này");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Giống như cách mà máy bán hàng tự động loại bỏ nhu cầu về một nhân viên bán hàng, hợp đồng thông minh có thể thay thế các trung gian trong nhiều ngành công nghiệp.

## Không cần cấp phép {#permissionless}

Bất kỳ ai cũng có thể viết một hợp đồng thông minh và triển khai nó lên mạng. Bạn chỉ cần học cách viết mã bằng [ngôn ngữ hợp đồng thông minh](/developers/docs/smart-contracts/languages/) và có đủ ETH để triển khai hợp đồng của mình. Việc triển khai một hợp đồng thông minh về mặt kỹ thuật là một giao dịch, vì vậy bạn cần phải trả [gas](/developers/docs/gas/) giống như cách bạn trả gas cho một lần chuyển ETH đơn giản. Tuy nhiên, chi phí gas cho việc triển khai hợp đồng cao hơn nhiều.

Ethereum có các ngôn ngữ thân thiện với nhà phát triển để viết các hợp đồng thông minh:

- Solidity
- Vyper

[Thêm về các ngôn ngữ](/developers/docs/smart-contracts/languages/)

Tuy nhiên, chúng phải được biên soạn trước khi có thể triển khai để máy ảo của Ethereum có thể hiểu và lưu trữ hợp đồng. [Thêm về việc biên dịch](/developers/docs/smart-contracts/compiling/)

## Tính kết hợp {#composability}

Hợp đồng thông minh trên Ethereum là công khai và có thể xem như là các API mở. Điều này có nghĩa là bạn có thể gọi các hợp đồng thông minh khác trong hợp đồng thông minh của riêng bạn để mở rộng đáng kể những gì có thể thực hiện. Các hợp đồng có thể triển khai các hợp đồng khác.

Tìm hiểu thêm về [tính kết hợp của hợp đồng thông minh](/developers/docs/smart-contracts/composability/).

## Các hạn chế {#limitations}

Các hợp đồng thông minh đơn thuần không thể lấy thông tin về các sự kiện "thế giới thực" vì chúng không thể truy cập dữ liệu từ các nguồn ngoài chuỗi. Điều này có nghĩa là họ không thể phản ứng với các sự kiện trong thế giới thực. Điều này là do thiết kế. Việc phụ thuộc vào thông tin bên ngoài có thể gây tổn hại đến sự đồng thuận, điều này rất quan trọng cho bảo mật và tính phi tập trung.

Tuy nhiên, điều quan trọng là các ứng dụng blockchain phải có khả năng sử dụng dữ liệu ngoài chuỗi. Giải pháp là các [oracle](/developers/docs/oracles/), là những công cụ thu thập dữ liệu ngoài chuỗi và cung cấp cho các hợp đồng thông minh.

Một hạn chế khác của hợp đồng thông minh là kích thước tối đa của hợp đồng. Một hợp đồng thông minh có thể tối đa là 24KB, nếu không thì sẽ hết gas. Vấn đề này có thể được giải quyết bằng cách sử dụng [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Hợp đồng đa chữ ký {#multisig}

Hợp đồng nhiều chữ ký (Multisig) là các tài khoản hợp đồng thông minh yêu cầu nhiều chữ ký hợp lệ để thực hiện một giao dịch. Điều này rất hữu ích để tránh các điểm thất bại đơn lẻ cho các hợp đồng nắm giữ số tiền đáng kể ether hoặc các token khác. Multisig cũng phân chia trách nhiệm trong việc thực hiện hợp đồng và quản lý khóa giữa nhiều bên, ngăn chặn việc mất một khóa riêng lẻ dẫn đến việc mất tiền không thể khôi phục. Vì những lý do này, các hợp đồng đa chữ ký có thể được sử dụng cho việc quản trị DAO đơn giản. Hợp đồng đa chữ ký yêu cầu N chữ ký trong số M chữ ký được chấp nhận (trong đó N ≤ M và M > 1) để thực thi. `N = 3, M = 5` và `N = 4, M = 7` thường được sử dụng. Một multisig 4/7 cần bốn trong bảy chữ ký hợp lệ. Điều này có nghĩa là các quỹ vẫn có thể được thu hồi ngay cả khi ba chữ ký bị mất. Trong trường hợp này, điều đó cũng có nghĩa là phần lớn những người nắm giữ khóa phải đồng ý và ký tên thì hợp đồng mới có hiệu lực.

## Các tài nguyên về hợp đồng thông minh {#smart-contract-resources}

**Hợp đồng OpenZeppelin -** **_Thư viện để phát triển hợp đồng thông minh an toàn._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Diễn đàn cộng đồng](https://forum.openzeppelin.com/c/general/16)

## Đọc thêm {#further-reading}

- [Coinbase: Hợp đồng thông minh là gì?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Hợp đồng thông minh là gì?](https://chain.link/education/smart-contracts)
- [Video: Giải thích đơn giản - Hợp đồng thông minh](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Nền tảng học và kiểm toán Web3](https://updraft.cyfrin.io)
