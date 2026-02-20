---
title: "Giới thiệu kỹ thuật về ether"
description: "Giới thiệu cho nhà phát triển về đồng tiền mã hóa ether."
lang: vi
---

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước [Giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/).

## Tiền mã hóa là gì? {#what-is-a-cryptocurrency}

Một tiền điện tử là một phương tiện trao đổi được bảo mật hóa bằng một sổ cái sử dụng công nghệ blockchain.

Một phương tiện trao đổi là bất kỳ thứ gì được chấp nhận rộng rãi như thanh toán cho hàng hóa và dịch vụ và sổ cái là một kho dữ liệu theo dõi các giao dịch. Công nghệ blockchain cho phép người dùng tạo các giao dịch trên sổ cái mà không phụ thuộc vào một bên thứ ba để duy trì nó.

Tiền điện tử đầu tiên là Bitcoin, được tạo ra bởi Satoshi Nakamoto. Kể từ khi Bitcoin được phát hành vào năm 2009, mọi người đã tạo ra hàng nghìn loại tiền điện tử trên nhiều chuỗi khối khác nhau.

## Ether là gì? {#what-is-ether}

**Ether (ETH)** là tiền mã hóa được sử dụng cho nhiều việc trên mạng Ethereum. Về cơ bản, đây là hình thức thanh toán duy nhất được chấp nhận cho các khoản phí giao dịch và sau [The Merge](/roadmap/merge), ether là bắt buộc để xác thực và đề xuất các khối trên Mainnet. Ether cũng được sử dụng làm một hình thức tài sản thế chấp chính trong các thị trường cho vay [DeFi](/defi), làm một đơn vị tài khoản trong các thị trường NFT, làm khoản thanh toán kiếm được khi thực hiện dịch vụ hoặc bán hàng hóa trong thế giới thực, và hơn thế nữa.

Ethereum cho phép các nhà phát triển tạo [**ứng dụng phi tập trung (dapps)**](/developers/docs/dapps), tất cả đều chia sẻ một nguồn tài nguyên điện toán chung. Bể dùng chung này có hạn, nên Ethereum cần một cơ chế để quyết định xem ai được sử dụng. Nếu không, một dapp có thể vô tình hoặc cố tình tiêu thụ toàn bộ tài nguyên mạng lưới, làm cản trở người khác sử dụng.

Tiền điện tử Ether hỗ trợ một cơ chế định giá cho sức mạnh tính toán của Ethereum. Khi người dùng muốn thực hiện giao dịch, họ phải trả ether để giao dịch của họ được công nhận trên chuỗi khối. Các chi phí sử dụng này được gọi là [phí gas](/developers/docs/gas/), và phí gas phụ thuộc vào lượng tài nguyên điện toán cần thiết để thực hiện giao dịch và nhu cầu về tài nguyên điện toán trên toàn mạng tại thời điểm đó.

Do đó, kể cả nếu dapp hiểm độc gửi đi một vòng lặp vô tận, giao dịch sẽ dần tiêu tốn hết ether và kết thúc, cho phép mạng lưới trở lại bình thường.

Việc [nhầm lẫn](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) giữa Ethereum và ether là rất phổ biến — khi mọi người đề cập đến "giá của Ethereum", họ đang mô tả giá của ether.

## Đúc ether {#minting-ether}

Khai thác là quá trình được đó ether mới được tạo trên sổ cái Ethereum. Giao thức Ethereum cơ bản tạo ra ether mơi và người dùng không thể tạo ether.

Ether được tạo ra khi một khối mới được tạo trên chuỗi khối Ethereum. Tổng lượng phát hành tuỳ thuộc vào số lượng nút xác thực và số lượng ether họ đã ký gửi. Số lượng phát hành được chia đều cho các nút trong trường hợp hoàn hảo là tất cả các nút xác thực đều thật thà và trực tuyến, nhưng trong thực tế, số lượng ấy tuỳ thuộc vào hiệu suất của nút xác thực. Khoảng 1/8 tổng lượng phát hành được trao cho người đề xuất khối; phần còn lại được phân phối cho các nút xác thực khác. Người đề xuất khối cũng nhận được tiền hoa hồng từ phí giao dịch và thu nhập liên quan đến MEV, nhưng đến từ Ether được tái lưu thông, chứ không phải phát hành mới.

## Đốt ether {#burning-ether}

Song song với việc tạo ether qua phần thường khối, ether cũng có thể bị xoá bỏ qua một quá trình gọi là 'đốt'. Khi ether bị đốt, nó sẽ vĩnh viễn bị loại bỏ khỏi lưu thông.

Việc đốt ether xảy ra trong mọi giao dịch trên Ethereum. Khi người dùng thanh toán cho các giao dịch của họ, một khoản phí gas cơ bản, do mạng đặt ra theo nhu cầu giao dịch giúp đơn giản hoá việc ước tính phí giao dịch trên Ethereum. Điều này, cùng với kích thước khối thay đổi và mức phí Gas tối đa, giúp đơn giản hóa việc ước tính phí giao dịch trên Ethereum. Khi nhu cầu mạng cao, [các khối](https://eth.blockscout.com/block/22580057) có thể đốt nhiều ether hơn lượng chúng đúc, bù trừ một cách hiệu quả cho việc phát hành ether.

Đốt phí cơ bản làm giảm khả năng của người tạo khối thao túng giao dịch. Ví dụ, nếu người tạo khối nhận được phí cơ bản, họ có thể đưa các giao dịch của chính mình vào một cách miễn phí và tăng phí cơ bản cho mọi người khác. Ngoài ra, họ có thể hoàn trả phí cơ bản cho một số người dùng ngoài chuỗi, dẫn đến một thị trường phí giao dịch phức tạp và kém minh bạch hơn.

## Các mệnh giá của ether {#denominations}

Vì giá trị của nhiều giao dịch trên Ethereum là nhỏ, nên Ether có nhiều mệnh giá, có thể được dùng như các đơn vị tính nhỏ hơn. Trong những đơn vị này, Wei và Gwei là quan trọng nhất.

Wei là lượng ether nhỏ nhất có thể có, và do đó, nhiều triển khai kỹ thuật, chẳng hạn như [Sách vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), sẽ dựa trên Wei cho mọi tính toán.

Gwei, viết tắt của giga-wei, được sử dụng thường xuyên để miêu tả phí gas trên Ethereum.

| Đơn vị | Giá trị ether    | Thường Sử Dụng Trong    |
| ------ | ---------------- | ----------------------- |
| Wei    | 10<sup>-18</sup> | Các phát triển kỹ thuật |
| Gwei   | 10<sup>-9</sup>  | Đọc phí gas             |

## Chuyển ether {#transferring-ether}

Mỗi giao dịch trên Ethereum chứa một trường `value`, chỉ định lượng ether sẽ được chuyển, được tính bằng wei, để gửi từ địa chỉ của người gửi đến địa chỉ người nhận.

Khi địa chỉ người nhận là một [hợp đồng thông minh](/developers/docs/smart-contracts/), lượng ether được chuyển này có thể được dùng để trả phí gas khi hợp đồng thông minh thực thi mã của nó.

[Tìm hiểu thêm về các giao dịch](/developers/docs/transactions/)

## Truy vấn ether {#querying-ether}

Người dùng có thể truy vấn số dư ether của bất kỳ [tài khoản](/developers/docs/accounts/) nào bằng cách kiểm tra trường `balance` của tài khoản, trường này cho thấy lượng ether nắm giữ được tính bằng wei.

[Etherscan](https://etherscan.io) và [Blockscout](https://eth.blockscout.com) là những công cụ phổ biến để kiểm tra số dư địa chỉ thông qua các ứng dụng trên nền tảng web. Ví dụ: [trang Blockscout này](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) hiển thị số dư của Ethereum Foundation. Số dư tài khoản cũng có thể được truy vấn qua các ví hay yêu cầu trực tiếp đến các nút.

## Đọc thêm {#further-reading}

- [Định nghĩa ether và Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Sách trắng Ethereum](/whitepaper/): Đề xuất ban đầu cho Ethereum. Tài liệu này bao gồm một miêu tả về ether và động lực đằng sau sự ra đời của nó.
- [Công cụ tính Gwei](https://www.alchemy.com/gwei-calculator): Sử dụng công cụ tính gwei này để dễ dàng chuyển đổi giữa wei, gwei và ether. Chỉ cần điền bất kỳ wei, gwei hay ETH và tự động tính toán lượng quy đổi.

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
