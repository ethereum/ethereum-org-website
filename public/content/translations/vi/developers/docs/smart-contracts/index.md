---
title: "Giới thiệu về hợp đồng thông minh"
description: "Tổng quan về hợp đồng thông minh, tập trung vào các đặc điểm và hạn chế độc đáo của chúng."
lang: vi
---

## Hợp đồng thông minh là gì? {#what-is-a-smart-contract}

Một "hợp đồng thông minh" đơn giản là một chương trình chạy trên Chuỗi khối [Ethereum](/). Nó là một tập hợp mã (các hàm của nó) và dữ liệu (trạng thái của nó) nằm tại một địa chỉ cụ thể trên Chuỗi khối Ethereum.

Hợp đồng thông minh là một loại [tài khoản Ethereum](/developers/docs/accounts/). Điều này có nghĩa là chúng có số dư và có thể là mục tiêu của các giao dịch. Tuy nhiên, chúng không được kiểm soát bởi người dùng, thay vào đó chúng được triển khai lên mạng lưới và chạy theo như được lập trình. Các tài khoản người dùng sau đó có thể tương tác với một hợp đồng thông minh bằng cách gửi các giao dịch thực thi một hàm được định nghĩa trên hợp đồng thông minh. Hợp đồng thông minh có thể định nghĩa các quy tắc, giống như một hợp đồng thông thường, và tự động thực thi chúng thông qua mã. Theo mặc định, hợp đồng thông minh không thể bị xóa và các tương tác với chúng là không thể đảo ngược.

## Điều kiện tiên quyết {#prerequisites}

Nếu bạn mới bắt đầu hoặc đang tìm kiếm một phần giới thiệu ít mang tính kỹ thuật hơn, chúng tôi khuyên bạn nên xem phần [giới thiệu về hợp đồng thông minh](/smart-contracts/) của chúng tôi.

Hãy đảm bảo rằng bạn đã đọc về [tài khoản](/developers/docs/accounts/), [giao dịch](/developers/docs/transactions/) và [Máy ảo Ethereum](/developers/docs/evm/) trước khi bước vào thế giới của hợp đồng thông minh.

## Một máy bán hàng tự động kỹ thuật số {#a-digital-vending-machine}

Có lẽ phép ẩn dụ tốt nhất cho một hợp đồng thông minh là một máy bán hàng tự động, như được mô tả bởi [Nick Szabo](https://unenumerated.blogspot.com/). Với các đầu vào phù hợp, một đầu ra nhất định sẽ được đảm bảo.

Để lấy một món ăn vặt từ máy bán hàng tự động:

```
tiền + lựa chọn món ăn vặt = món ăn vặt được nhả ra
```

Logic này được lập trình vào máy bán hàng tự động.

Một hợp đồng thông minh, giống như một máy bán hàng tự động, có logic được lập trình trong đó. Dưới đây là một ví dụ đơn giản về việc máy bán hàng tự động này sẽ trông như thế nào nếu nó là một hợp đồng thông minh được viết bằng Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Khai báo các biến trạng thái của hợp đồng
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Khi hợp đồng 'VendingMachine' được triển khai:
    // 1. đặt địa chỉ triển khai làm chủ sở hữu của hợp đồng
    // 2. đặt số dư cupcake của hợp đồng thông minh được triển khai thành 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Cho phép chủ sở hữu tăng số dư cupcake của hợp đồng thông minh
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Cho phép bất kỳ ai mua cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Giống như cách một máy bán hàng tự động loại bỏ nhu cầu về nhân viên bán hàng, hợp đồng thông minh có thể thay thế các bên trung gian trong nhiều ngành công nghiệp.

## Không cần cấp phép {#permissionless}

Bất kỳ ai cũng có thể viết một hợp đồng thông minh và triển khai nó lên mạng lưới. Bạn chỉ cần học cách viết mã bằng một [ngôn ngữ hợp đồng thông minh](/developers/docs/smart-contracts/languages/) và có đủ ETH để triển khai hợp đồng của mình. Việc triển khai một hợp đồng thông minh về mặt kỹ thuật là một giao dịch, vì vậy bạn cần trả [Gas](/developers/docs/gas/) theo cùng cách bạn cần trả Gas cho một việc chuyển ETH đơn giản. Tuy nhiên, chi phí Gas cho việc triển khai hợp đồng cao hơn nhiều.

Ethereum có các ngôn ngữ thân thiện với nhà phát triển để viết hợp đồng thông minh:

- Solidity
- Vyper

[Tìm hiểu thêm về các ngôn ngữ](/developers/docs/smart-contracts/languages/)

Tuy nhiên, chúng phải được biên dịch trước khi có thể được triển khai để máy ảo của Ethereum có thể diễn giải và lưu trữ hợp đồng. [Tìm hiểu thêm về việc biên dịch](/developers/docs/smart-contracts/compiling/)

## Khả năng kết hợp {#composability}

Hợp đồng thông minh là công khai trên Ethereum và có thể được coi là các API mở. Điều này có nghĩa là bạn có thể gọi các hợp đồng thông minh khác trong hợp đồng thông minh của riêng bạn để mở rộng đáng kể những gì có thể làm được. Các hợp đồng thậm chí có thể triển khai các hợp đồng khác.

Tìm hiểu thêm về [khả năng kết hợp của hợp đồng thông minh](/developers/docs/smart-contracts/composability/).

## Những hạn chế {#limitations}

Chỉ riêng hợp đồng thông minh không thể lấy thông tin về các sự kiện "thế giới thực" vì chúng không thể truy xuất dữ liệu từ các nguồn ngoài chuỗi. Điều này có nghĩa là chúng không thể phản hồi các sự kiện trong thế giới thực. Đây là chủ đích thiết kế. Việc dựa vào thông tin bên ngoài có thể gây nguy hiểm cho sự đồng thuận, điều vốn rất quan trọng đối với bảo mật và sự phi tập trung.

Tuy nhiên, điều quan trọng đối với các ứng dụng Chuỗi khối là có thể sử dụng dữ liệu ngoài chuỗi. Giải pháp là các [oracle](/developers/docs/oracles/), là những công cụ thu thập dữ liệu ngoài chuỗi và cung cấp nó cho các hợp đồng thông minh.

Một hạn chế khác của hợp đồng thông minh là kích thước hợp đồng tối đa. Một hợp đồng thông minh có thể có kích thước tối đa là 24KB, nếu không nó sẽ hết Gas. Điều này có thể được khắc phục bằng cách sử dụng [Mẫu Diamond (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Hợp đồng đa chữ ký {#multisig}

Hợp đồng đa chữ ký (multisig) là các tài khoản hợp đồng thông minh yêu cầu nhiều chữ ký hợp lệ để thực thi một giao dịch. Điều này rất hữu ích để tránh các điểm lỗi duy nhất (single points of failure) đối với các hợp đồng nắm giữ số lượng lớn ether hoặc các token khác. Đa chữ ký cũng chia sẻ trách nhiệm thực thi hợp đồng và quản lý khóa giữa nhiều bên và ngăn chặn việc mất một khóa riêng tư duy nhất dẫn đến mất tiền không thể đảo ngược. Vì những lý do này, các hợp đồng đa chữ ký có thể được sử dụng cho quản trị DAO đơn giản. Đa chữ ký yêu cầu N chữ ký trong số M chữ ký có thể chấp nhận được (trong đó N ≤ M và M > 1) để thực thi. `N = 3, M = 5` và `N = 4, M = 7` thường được sử dụng. Một đa chữ ký 4/7 yêu cầu bốn trong số bảy chữ ký hợp lệ có thể có. Điều này có nghĩa là tiền vẫn có thể lấy lại được ngay cả khi bị mất ba chữ ký. Trong trường hợp này, nó cũng có nghĩa là phần lớn những người giữ khóa phải đồng ý và ký để hợp đồng được thực thi.

## Tài nguyên về hợp đồng thông minh {#smart-contract-resources}

**Hợp đồng OpenZeppelin -** **_Thư viện để phát triển hợp đồng thông minh an toàn._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Diễn đàn cộng đồng](https://forum.openzeppelin.com/c/general/16)

## Đọc thêm {#further-reading}

- [Coinbase: Hợp đồng thông minh là gì?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Hợp đồng thông minh là gì?](https://chain.link/education/smart-contracts)
- [Video: Giải thích đơn giản - Hợp đồng thông minh](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Nền tảng học tập và kiểm toán Web3](https://updraft.cyfrin.io)

## Hướng dẫn: Chữ ký hợp đồng thông minh (EIP-1271) trên Ethereum {#tutorials}

- [EIP-1271: Việc ký và xác minh chữ ký hợp đồng thông minh](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Cách EIP-1271 cho phép các hợp đồng thông minh xác minh chữ ký, với hướng dẫn từng bước về việc triển khai Safe._