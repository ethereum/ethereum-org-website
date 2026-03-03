---
title: "Tính khả thi của hợp đồng thông minh"
description: "Tìm hiểu cách các hợp đồng thông minh có thể được kết hợp như các khối Lego để xây dựng các dapps phức tạp bằng cách tái sử dụng các thành phần có sẵn."
lang: vi
incomplete: true
---

## Giới thiệu ngắn gọn {#a-brief-introduction}

Hợp đồng thông minh trên Ethereum là công khai và có thể xem như là các API mở. Bạn không cần phải viết hợp đồng thông minh của riêng mình để trở thành một nhà phát triển dapp, bạn chỉ cần biết cách tương tác với chúng. Ví dụ: bạn có thể sử dụng các hợp đồng thông minh hiện có của [Uniswap](https://uniswap.exchange/swap), một sàn giao dịch phi tập trung, để xử lý tất cả logic hoán đổi token trong ứng dụng của bạn – bạn không cần phải bắt đầu từ đầu. Hãy xem một số hợp đồng [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) và [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) của họ.

## Khái niệm tính khả hợp thành là gì? {#what-is-composability}

Tính khả hợp thành là việc kết hợp các yếu tố khác nhau để tạo ra hệ thống hoặc kết quả mới. Trong phát triển phần mềm, khả năng kết hợp có nghĩa là các nhà phát triển có thể tái sử dụng các thành phần phần mềm hiện có để xây dựng các ứng dụng mới. Một cách tốt để hiểu tính khả thi của việc kết hợp là xem các yếu tố có thể kết hợp như những viên gạch Lego. Mỗi viên Lego có thể kết hợp với nhau, cho phép bạn xây dựng những cấu trúc phức tạp bằng cách kết hợp các viên Lego khác nhau.

Trong Ethereum, mỗi hợp đồng thông minh đều có thể được coi như một viên Lego—bạn có thể sử dụng các hợp đồng thông minh từ các dự án khác như những khối xây dựng cho dự án của mình. Điều này có nghĩa là bạn không cần phải tốn thời gian để phát minh lại bánh xe hoặc xây dựng từ đầu.

## Cách thức hoạt động của tính khả hợp thành là gì? {#how-does-composability-work}

Hợp đồng thông minh Ethereum giống như các API công cộng, vì vậy bất kỳ ai cũng có thể tương tác với hợp đồng hoặc tích hợp chúng vào các ứng dụng phi tập trung (dapps) để tăng cường chức năng. Tính khả hợp thành của hợp đồng thông minh thường dựa trên ba nguyên tắc: tính mô-đun, tự trị và khả năng khám phá.

\*\*1. **Tính mô-đun**: Đây là khả năng của các thành phần riêng lẻ để thực hiện một nhiệm vụ cụ thể. Trong Ethereum, mỗi hợp đồng thông minh đều có một trường hợp sử dụng cụ thể (như đã trình bày trong ví dụ về Uniswap).

\*\*2. **Tính tự chủ**: Các thành phần có thể kết hợp phải có khả năng hoạt động độc lập. Mỗi hợp đồng thông minh trong Ethereum đều tự thực thi và có thể hoạt động mà không cần dựa vào các thành phần khác của hệ thống.

\*\*3. **Khả năng khám phá**: Các nhà phát triển không thể gọi các hợp đồng bên ngoài hoặc tích hợp các thư viện phần mềm vào các ứng dụng nếu chúng không được công khai. Theo thiết kế, các hợp đồng thông minh là mã nguồn mở; bất kỳ ai cũng có thể gọi một hợp đồng thông minh hoặc sao chép cơ sở mã.

## Lợi ích của khả năng kết hợp {#benefits-of-composability}

### Chu kỳ phát triển ngắn hơn {#shorter-development-cycle}

Khả năng kết hợp giúp giảm bớt công việc mà các nhà phát triển phải làm khi tạo [các ứng dụng phi tập trung](/apps/#what-are-dapps). [Như Naval Ravikant đã nói:](https://twitter.com/naval/status/1444366754650656770) "Mã nguồn mở có nghĩa là mọi vấn đề chỉ cần được giải quyết một lần."

Nếu có một hợp đồng thông minh giải quyết một vấn đề nào đó, các nhà phát triển khác có thể tái sử dụng nó, vì vậy họ không cần phải giải quyết cùng một vấn đề. Bằng cách này, các nhà phát triển có thể tận dụng các thư viện phần mềm hiện có và thêm chức năng bổ sung để tạo ra các dapp mới.

### Sự đổi mới lớn hơn {#greater-innovation}

Tính khả thi cho phép các lập trình viên thoải mái sáng tạo và thử nghiệm, vì họ có thể sử dụng lại, chỉnh sửa, sao chép hoặc tích hợp mã nguồn mở để đạt được kết quả mong muốn. Do đó, các đội ngũ phát triển dành ít thời gian cho các chức năng cơ bản và có thể dành nhiều thời gian hơn để thử nghiệm các tính năng mới.

### Trải nghiệm người dùng tốt hơn {#better-user-experience}

Khả năng tương tác giữa các thành phần của hệ sinh thái Ethereum cải thiện trải nghiệm của người dùng. Người dùng có thể truy cập vào chức năng cao hơn khi các ứng dụng phi tập trung (dapps) tích hợp các hợp đồng thông minh bên ngoài so với một hệ sinh thái phân mảnh, nơi mà các ứng dụng không thể giao tiếp với nhau.

Chúng ta sẽ lấy một ví dụ từ giao dịch arbitrage để minh họa lợi ích của việc tương tác với nhau:

Nếu một token đang được giao dịch ở mức giá cao hơn trên `sàn giao dịch A` so với `sàn giao dịch B`, bạn có thể tận dụng sự chênh lệch giá để kiếm lợi nhuận. Tuy nhiên, bạn chỉ có thể làm điều đó nếu có đủ vốn để tài trợ cho giao dịch (tức là mua token từ `sàn giao dịch B` và bán trên `sàn giao dịch A`).

Trong một trường hợp bạn không có đủ vốn để giao dịch, một khoản vay nóng có thể là lựa chọn lý tưởng. [Các khoản vay nhanh](/defi/#flash-loans) có tính kỹ thuật cao, nhưng ý tưởng cơ bản là bạn có thể vay tài sản (không cần tài sản thế chấp) và trả lại chúng trong _một_ giao dịch duy nhất.

Quay lại ví dụ ban đầu, một nhà giao dịch chênh lệch giá có thể vay một khoản vay nhanh lớn, mua token từ `sàn giao dịch B`, bán chúng trên `sàn giao dịch A`, trả lại vốn + lãi và giữ lại lợi nhuận, tất cả trong cùng một giao dịch. Logic phức tạp này yêu cầu kết hợp các lệnh gọi đến nhiều hợp đồng, điều này sẽ không khả thi nếu các hợp đồng thông minh thiếu tính tương tác.

## Các ví dụ về khả năng kết hợp trong Ethereum {#composability-in-ethereum}

### Hoán đổi token {#token-swaps}

Nếu bạn tạo một ứng dụng phi tập trung (dapp) yêu cầu thanh toán giao dịch bằng ETH, bạn có thể cho phép người dùng thanh toán bằng các token ERC-20 khác bằng cách tích hợp logic hoán đổi token. Đoạn mã sẽ tự động chuyển đổi token của người dùng sang ETH trước khi hợp đồng thực hiện hàm gọi.

### Quản trị {#governance}

Xây dựng các hệ thống quản trị riêng cho một [DAO](/dao/) có thể tốn kém và mất nhiều thời gian. Thay vào đó, bạn có thể sử dụng một bộ công cụ quản trị mã nguồn mở, chẳng hạn như [Aragon Client](https://client.aragon.org/), để khởi tạo DAO của mình nhằm nhanh chóng tạo ra một khuôn khổ quản trị.

### Quản lý danh tính {#identity-management}

Thay vì xây dựng một hệ thống xác thực tùy chỉnh hoặc dựa vào các nhà cung cấp tập trung, bạn có thể tích hợp các công cụ danh tính phi tập trung (DID) để quản lý xác thực cho người dùng. Một ví dụ là [SpruceID](https://www.spruceid.com/), một bộ công cụ mã nguồn mở cung cấp chức năng "Đăng nhập bằng Ethereum" cho phép người dùng xác thực danh tính bằng ví Ethereum.

## Các hướng dẫn liên quan {#related-tutorials}

- [Khởi động phát triển giao diện người dùng cho ứng dụng phi tập trung của bạn với create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Tổng quan về cách sử dụng create-eth-app để tạo ra các ứng dụng với các hợp đồng thông minh phổ biến có sẵn._

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

- [Khả năng kết hợp là sự đổi mới](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Tại sao khả năng kết hợp lại quan trọng đối với Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Khả năng kết hợp là gì?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
