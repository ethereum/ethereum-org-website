---
title: "Khả năng kết hợp của hợp đồng thông minh"
description: "Tìm hiểu cách các hợp đồng thông minh có thể được kết hợp như những khối Lego để xây dựng các dapp phức tạp bằng cách tái sử dụng các thành phần hiện có."
lang: vi
incomplete: true
---

## Giới thiệu ngắn gọn {#a-brief-introduction}

Các hợp đồng thông minh là công khai trên Ethereum và có thể được coi như các API mở. Bạn không cần phải tự viết hợp đồng thông minh của riêng mình để trở thành một nhà phát triển dapp, bạn chỉ cần biết cách tương tác với chúng. Ví dụ: bạn có thể sử dụng các hợp đồng thông minh hiện có của [Uniswap](https://uniswap.exchange/swap), một sàn giao dịch phi tập trung, để xử lý tất cả logic hoán đổi token trong ứng dụng của bạn – bạn không cần phải bắt đầu lại từ đầu. Hãy xem qua một số hợp đồng [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) và [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) của họ.

## Khả năng kết hợp là gì? {#what-is-composability}

Khả năng kết hợp là việc kết hợp các thành phần riêng biệt để tạo ra các hệ thống hoặc đầu ra mới. Trong phát triển phần mềm, khả năng kết hợp có nghĩa là các nhà phát triển có thể tái sử dụng các thành phần phần mềm hiện có để xây dựng các ứng dụng mới. Một cách tốt để hiểu về khả năng kết hợp là coi các yếu tố có khả năng kết hợp như những khối Lego. Mỗi khối Lego có thể được kết hợp với một khối khác, cho phép bạn xây dựng các cấu trúc phức tạp bằng cách kết hợp các khối Lego khác nhau.

Trong Ethereum, mỗi hợp đồng thông minh là một loại Lego—bạn có thể sử dụng các hợp đồng thông minh từ các dự án khác làm nền tảng xây dựng cho dự án của mình. Điều này có nghĩa là bạn không phải mất thời gian phát minh lại bánh xe hoặc xây dựng lại từ đầu.

## Khả năng kết hợp hoạt động như thế nào? {#how-does-composability-work}

Các hợp đồng thông minh Ethereum giống như các API công khai, vì vậy bất kỳ ai cũng có thể tương tác với hợp đồng hoặc tích hợp chúng vào các dapp để có thêm chức năng. Khả năng kết hợp của hợp đồng thông minh thường hoạt động dựa trên ba nguyên tắc: tính mô-đun, tính tự chủ và khả năng khám phá:

**1. Tính mô-đun**: Đây là khả năng của các thành phần riêng lẻ để thực hiện một nhiệm vụ cụ thể. Trong Ethereum, mỗi hợp đồng thông minh có một trường hợp sử dụng cụ thể (như được hiển thị trong ví dụ về Uniswap).

**2. Tính tự chủ**: Các thành phần có khả năng kết hợp phải có khả năng hoạt động độc lập. Mỗi hợp đồng thông minh trong Ethereum đều tự thực thi và có thể hoạt động mà không cần dựa vào các phần khác của hệ thống.

**3. Khả năng khám phá**: Các nhà phát triển không thể gọi các hợp đồng bên ngoài hoặc tích hợp các thư viện phần mềm vào các ứng dụng nếu chúng không có sẵn công khai. Theo thiết kế, các hợp đồng thông minh là mã nguồn mở; bất kỳ ai cũng có thể gọi một hợp đồng thông minh hoặc phân nhánh một cơ sở mã.

## Lợi ích của khả năng kết hợp {#benefits-of-composability}

### Chu kỳ phát triển ngắn hơn {#shorter-development-cycle}

Khả năng kết hợp làm giảm khối lượng công việc mà các nhà phát triển phải làm khi tạo ra các [ứng dụng phi tập trung (dapp)](/apps/#what-are-dapps). [Như Naval Ravikant đã nói:](https://twitter.com/naval/status/1444366754650656770) "Mã nguồn mở có nghĩa là mỗi vấn đề chỉ cần được giải quyết một lần."

Nếu có một hợp đồng thông minh giải quyết được một vấn đề, các nhà phát triển khác có thể tái sử dụng nó, vì vậy họ không phải giải quyết lại cùng một vấn đề. Bằng cách này, các nhà phát triển có thể lấy các thư viện phần mềm hiện có và thêm các chức năng bổ sung để tạo ra các dapp mới.

### Đổi mới mạnh mẽ hơn {#greater-innovation}

Khả năng kết hợp khuyến khích sự đổi mới và thử nghiệm vì các nhà phát triển được tự do tái sử dụng, sửa đổi, sao chép hoặc tích hợp mã nguồn mở để tạo ra kết quả mong muốn. Do đó, các nhóm phát triển dành ít thời gian hơn cho các chức năng cơ bản và có thể phân bổ nhiều thời gian hơn để thử nghiệm các tính năng mới.

### Trải nghiệm người dùng tốt hơn {#better-user-experience}

Khả năng tương tác giữa các thành phần của hệ sinh thái Ethereum cải thiện trải nghiệm người dùng. Người dùng có thể truy cập nhiều chức năng hơn khi các dapp tích hợp các hợp đồng thông minh bên ngoài so với trong một hệ sinh thái bị phân mảnh nơi các ứng dụng không thể giao tiếp với nhau.

Chúng ta sẽ sử dụng một ví dụ từ giao dịch chênh lệch giá (arbitrage) để minh họa những lợi ích của khả năng tương tác:

Nếu một token đang giao dịch ở mức giá cao hơn trên `exchange A` so với `exchange B`, bạn có thể tận dụng sự chênh lệch giá để kiếm lợi nhuận. Tuy nhiên, bạn chỉ có thể làm điều đó nếu bạn có đủ vốn để tài trợ cho giao dịch (tức là mua token từ `exchange B` và bán nó trên `exchange A`).

Trong trường hợp bạn không có đủ tiền để trang trải cho giao dịch, một khoản vay chớp nhoáng có thể là lý tưởng. [Các khoản vay chớp nhoáng](/defi/#flash-loans) mang tính kỹ thuật cao, nhưng ý tưởng cơ bản là bạn có thể vay tài sản (không cần tài sản thế chấp) và hoàn trả lại trong cùng _một_ giao dịch.

Quay trở lại ví dụ ban đầu của chúng ta, một nhà giao dịch chênh lệch giá có thể thực hiện một khoản vay chớp nhoáng lớn, mua token từ `exchange B`, bán chúng trên `exchange A`, trả lại vốn + lãi và giữ lại lợi nhuận, trong cùng một giao dịch. Logic phức tạp này đòi hỏi phải kết hợp các lệnh gọi đến nhiều hợp đồng, điều này sẽ không thể thực hiện được nếu các hợp đồng thông minh thiếu khả năng tương tác.

## Các ví dụ về khả năng kết hợp trong Ethereum {#composability-in-ethereum}

### Hoán đổi token {#token-swaps}

Nếu bạn tạo một dapp yêu cầu các giao dịch phải được thanh toán bằng ETH, bạn có thể cho phép người dùng thanh toán bằng các token ERC-20 khác bằng cách tích hợp logic hoán đổi token. Mã sẽ tự động chuyển đổi token của người dùng thành ETH trước khi hợp đồng thực thi hàm được gọi.

### Quản trị {#governance}

Việc xây dựng các hệ thống quản trị tùy chỉnh cho một [DAO](/dao/) có thể tốn kém và mất thời gian. Thay vào đó, bạn có thể sử dụng một bộ công cụ quản trị mã nguồn mở, chẳng hạn như [Aragon Client](https://client.aragon.org/), để khởi động DAO của bạn nhằm nhanh chóng tạo ra một khuôn khổ quản trị.

### Quản lý danh tính {#identity-management}

Thay vì xây dựng một hệ thống xác thực tùy chỉnh hoặc dựa vào các nhà cung cấp tập trung, bạn có thể tích hợp các công cụ danh tính phi tập trung (DID) để quản lý xác thực cho người dùng. Một ví dụ là [SpruceID](https://www.spruceid.com/), một bộ công cụ mã nguồn mở cung cấp chức năng "Đăng nhập bằng Ethereum" cho phép người dùng xác thực danh tính bằng một ví Ethereum.

## Các hướng dẫn liên quan {#related-tutorials}

- [Khởi động phát triển frontend cho dapp của bạn với create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Tổng quan về cách sử dụng create-eth-app để tạo các ứng dụng với các hợp đồng thông minh phổ biến có sẵn._

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

- [Khả năng kết hợp là sự đổi mới](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Tại sao khả năng kết hợp lại quan trọng đối với Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Khả năng kết hợp là gì?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)