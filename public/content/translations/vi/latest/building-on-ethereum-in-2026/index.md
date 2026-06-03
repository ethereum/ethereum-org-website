---
title: "Xây dựng trên Ethereum vào năm 2026: những gì đã thay đổi"
description: "Ba bản nâng cấp giao thức kể từ năm 2023 đã thay đổi hai điều mà các trình xây dựng quan tâm: chi phí sử dụng lớp 1 (l1) và những gì ví thông thường có thể làm. Hướng dẫn thực tế để xây dựng trên Ethereum vào năm 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "phí gas"
  - "trừu tượng hóa tài khoản"
  - "nâng cấp giao thức"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: "Xây dựng trên Ethereum vào năm 2026"
lang: vi
---

Nếu mô hình tư duy của bạn về Ethereum được hình thành từ năm 2021 đến 2023, thì nó đã lỗi thời. Ba bản nâng cấp giao thức kể từ đó, [Dencun](/roadmap/dencun/) vào tháng 3 năm 2024, [Pectra](/roadmap/pectra/) vào tháng 5 năm 2025 và [Fusaka](/roadmap/fusaka/) vào tháng 12 năm 2025, đã thay đổi hai điều mà các trình xây dựng quan tâm: chi phí sử dụng lớp 1 (l1) và những gì ví thông thường có thể làm.

## Mạng chính lại rẻ {#mainnet-is-cheap-again}

Chế độ phí từ năm 2021 đến 2023 không còn là một giả định mặc định an toàn nữa.

Tính đến ngày 5 tháng 5 năm 2026, công cụ theo dõi gas của Etherscan cho thấy gas tiêu chuẩn ở mức khoảng 0,15 gwei, với mức trung bình hàng ngày gần 0,5 gwei trong suốt tháng 4. Một giao dịch chuyển ETH cơ bản có giá dưới một xu ở mức đó, với những ngày gần đây thường rơi vào mức vài xu. Xu hướng này đã giảm qua từng bản nâng cấp gần đây và bản nâng cấp tiếp theo, [Glamsterdam](/roadmap/glamsterdam/), dự kiến sẽ còn đẩy phí xuống thấp hơn nữa. Điều đó khiến cho quan điểm "Mạng chính Ethereum quá đắt đối với hầu hết các ứng dụng" trở thành một điểm khởi đầu lỗi thời.

Nếu bạn muốn một quy tắc ngón tay cái đơn giản, hãy sử dụng phép toán gas thay vì những lời truyền miệng cũ. Ở mức 0,5 gwei, mức trung bình gần đây của tháng 4 và ETH ở mức khoảng 2.350 đô la, chi phí minh họa sẽ như thế này.

| Hoạt động       | Gas đã sử dụng    | Chi phí minh họa |
| :-------------- | :---------- | :---------------- |
| Chuyển ETH    | 21.000      | **$0.025**        |
| Chuyển ERC-20 | \~65.000    | **$0.076**        |
| Chấp thuận ERC-20  | \~46.000    | **$0.054**        |
| Hoán đổi            | \~180.000   | **$0.21**         |
| Triển khai ERC-20   | \~1.200.000 | **$1.41**         |

Đó là những ví dụ, không phải là sự đảm bảo. Chi phí thay đổi theo giá ETH, giá gas và độ phức tạp của hợp đồng. Các chỉ số gwei có thể dao động mạnh trong một tháng bình thường trong khi chi phí bằng đô la hầu như không thay đổi, bởi vì các bản cuộn hiện đảm nhận khoảng 95 phần trăm các giao dịch của Ethereum và l1 thường chạy thấp hơn nhiều so với mục tiêu khối của nó. Phí mạng chính hiện đã đủ thấp để nhiều ứng dụng có thể chạy một cách hợp lý trên mạng chính.

### Tại sao chi phí lại giảm {#why-costs-fell}

Ba bản nâng cấp đã thực hiện phần lớn công việc.

Dencun (tháng 3 năm 2024) đã giới thiệu EIP-4844 và cung cấp cho các bản cuộn làn dữ liệu riêng của chúng thông qua các khối dữ liệu, với một thị trường phí riêng biệt. Các bản cuộn đã ngừng cạnh tranh với lưu lượng thực thi thông thường trên cùng một không gian khối.

Pectra đã được kích hoạt vào ngày 7 tháng 5 năm 2025. EIP-7691 đã tăng thông lượng khối dữ liệu từ mục tiêu 3 / tối đa 6 khối dữ liệu mỗi khối lên mục tiêu 6 / tối đa 9, điều này đã mở rộng làn dữ liệu giá rẻ mà các bản cuộn sử dụng và đẩy phí lớp 2 (l2) xuống thấp hơn.

Fusaka đã được kích hoạt vào ngày 3 tháng 12 năm 2025. Thay đổi công suất nổi bật của nó là PeerDAS, cho phép các trình xác thực lấy mẫu dữ liệu khối dữ liệu thay vì tải xuống toàn bộ mọi khối dữ liệu và việc lấy mẫu đó là điều làm cho số lượng khối dữ liệu cao hơn trở nên an toàn ở lớp mạng lưới. Song song đó, cộng đồng đã tăng giới hạn gas l1 từ 30M lên 60M trong năm 2025 và EIP-7935 của Fusaka đã tiêu chuẩn hóa 60M làm mặc định mới. EIP-7825 giới hạn bất kỳ giao dịch đơn lẻ nào ở mức \~16,78M gas, điều mà hầu hết các ứng dụng sẽ không bao giờ nhận thấy nhưng các đợt triển khai rất lớn và các lệnh gọi đa hợp (multicall) nguyên khối giờ đây phải nằm gọn trong giới hạn đó. EIP-7951 cũng đã thêm xác minh secp256r1 (P-256) gốc trên mạng chính, điều này làm cho các chữ ký mã khóa và WebAuthn rẻ hơn nhiều để xác minh trong các luồng tài khoản.

Hiệu ứng ròng là mạng chính không còn được định giá giống như một chuỗi bị tắc nghẽn vĩnh viễn.

## Cách EIP-7702 thay đổi mô hình tài khoản {#how-eip-7702-changes-the-account-model}

Pectra cũng đã phát hành EIP-7702, cung cấp cho các ví thông thường quyền truy cập vào hành vi của tài khoản thông minh như gom lô, tài trợ gas, khóa phiên, luồng khôi phục và trải nghiệm người dùng (UX) thân thiện với mã khóa, mà không bắt người dùng phải chuyển sang một tài khoản mới.

Nó hoạt động bằng cách thêm một loại giao dịch mới (loại `0x04`, `SetCode`) cho phép một EOA đặt một con trỏ đến mã hợp đồng đã được triển khai. Người dùng giữ nguyên địa chỉ, khóa EOA ban đầu giữ quyền kiểm soát tối cao đối với tài khoản và sự ủy quyền sau đó có thể được thay đổi hoặc đặt lại về địa chỉ null.

Đối với các trình xây dựng ứng dụng, thay đổi thực tế là yêu cầu ví cung cấp kết quả, chứ không phải thiết lập EIP-7702 cấp thấp. Nếu người dùng cần chấp thuận và hoán đổi trong một luồng, hãy yêu cầu một đợt gom lô thông qua ERC-5792 `wallet_sendCalls`. Ví có thể quyết định xem nên sử dụng EIP-7702, ERC-4337 hay một hệ thống tài khoản khác.

Mã được ủy quyền là một ranh giới bảo mật. Nếu một ví trỏ một EOA vào mã có lỗi hoặc độc hại, mã đó có thể thực hiện các lệnh gọi dưới tư cách người dùng, bao gồm các chấp thuận token, chuyển và tương tác ứng dụng. Các trình xây dựng nên coi các mục tiêu ủy quyền giống như cơ sở hạ tầng của ví, dựa vào các triển khai đã được ví kiểm duyệt và không yêu cầu người dùng ủy quyền cho mã do ứng dụng kiểm soát một cách tùy tiện.

## Điều này thay đổi những gì về cách xây dựng {#what-this-changes-about-how-to-build}

Câu hỏi mặc định của trình xây dựng từng là "lớp 2 (l2) nào đủ rẻ?" Câu hỏi đó vẫn có câu trả lời, nhưng nó không phải là câu hỏi duy nhất. Với phí l1 ở mức vài xu cho mỗi giao dịch trong điều kiện tải bình thường và EIP-7702 cho phép bất kỳ ví nào cung cấp UX tài khoản thông minh mà không cần di chuyển địa chỉ, câu hỏi mặc định hữu ích hơn là liệu ứng dụng có nên nằm trên mạng chính hay không, hoặc liệu một l2 cụ thể có mang lại lợi thế thực sự về phân phối, thanh khoản hoặc UX mà l1 không thể hay không.

Giả định về tài khoản cũng thay đổi. Đừng thiết kế các ứng dụng mới như thể mọi tài khoản người dùng đều là một EOA ECDSA thông thường phải giữ ETH trước khi làm bất cứ điều gì hữu ích. Hãy ưu tiên các giao diện gom lô cấp độ ví như ERC-5792 `wallet_sendCalls`, giả định rằng tài trợ gas và khóa phiên sẽ trở thành các tính năng bình thường của ví và coi mã khóa cùng các luồng khôi phục là một phần của bề mặt UX tài khoản thay vì các thủ thuật tiếp nhận người dùng riêng biệt.

## Điều gì tiếp theo {#whats-next}

Bản nâng cấp được đặt tên tiếp theo của Ethereum là Glamsterdam, với Danh sách truy cập cấp độ khối (BAL) và tách biệt người đề xuất và người xây dựng (PBS) được tích hợp sẵn (ePBS) là các mục tiêu nổi bật. Cùng với nhau, chúng giúp việc tăng giới hạn gas khối từ 60 triệu hiện nay lên khoảng 200 triệu trở nên an toàn, để lại nhiều công suất l1 hơn cho các trình xây dựng làm việc. Sự kích hoạt dự kiến vào nửa cuối năm 2026. Sau Glamsterdam, [Hegotá](https://forkcast.org/upgrade/hegota/) được lên kế hoạch tiếp nối, với Danh sách bao gồm được thực thi theo lựa chọn phân nhánh (FOCIL) được chọn làm tính năng nổi bật của nó.

Đối với các trình xây dựng, những mục đáng theo dõi là công suất l1 lớn hơn (BAL), việc đưa giao dịch vào đáng tin cậy hơn (FOCIL) và con đường hướng tới trừu tượng hóa tài khoản gốc. ePBS, một điểm nổi bật khác của Glamsterdam, chủ yếu là một thay đổi cơ sở hạ tầng giúp loại bỏ sự phụ thuộc vào niềm tin trong việc đưa giao dịch vào l1. Sự thay đổi bề mặt trực tiếp ở cấp độ ứng dụng là nhỏ.

BAL nhằm mục đích giữ cho l1 rẻ khi mức độ sử dụng tăng lên. Nói một cách dễ hiểu, một khối sẽ đi kèm với một bản đồ các tài khoản và bộ nhớ mà nó chạm tới. Các máy khách có thể sử dụng bản đồ đó để tìm nạp trước dữ liệu và thực thi các giao dịch độc lập song song, điều này giúp việc tăng giới hạn gas l1 an toàn hơn mà không làm cho các khối quá chậm để xác minh. Hiệu ứng thực tế đối với các trình xây dựng là nhiều hoạt động hơn có thể quay trở lại mạng chính mà không tự động tái tạo lại chế độ gas từ năm 2021 đến 2023.

FOCIL là về việc đưa các giao dịch hợp lệ vào các khối ngay cả khi một nhà sản xuất khối muốn loại bỏ chúng. Ngày nay, nếu bên xây dựng một khối bỏ qua một giao dịch, phần còn lại của giao thức có những cách hạn chế để ép buộc nó vào. Với EIP-7805, một số trình xác thực trên thực tế sẽ nói rằng, "chúng tôi đã thấy những giao dịch hợp lệ này đang chờ trong mempool công khai." Khối tiếp theo sau đó phải bao gồm chúng, hoặc các trình xác thực có thể từ chối hỗ trợ khối đó. Đối với các trình xây dựng, điều này quan trọng khi quyền truy cập đáng tin cậy vào l1 là một phần của sản phẩm, bao gồm các công cụ quyền riêng tư, các cổng nạp tiền (onramp) được quản lý hoặc các ứng dụng phục vụ người dùng có thể bị một số nhà cung cấp cơ sở hạ tầng lọc.

Đối với các trình xây dựng ứng dụng, mục Hegotá cần theo dõi chặt chẽ nhất là trừu tượng hóa tài khoản. EIP-8141, Giao dịch khung (Frame Transactions), sẽ thêm một loại giao dịch trong đó việc xác thực, thực thi và thanh toán gas được chia thành các khung. Trong thực tế, điều đó có nghĩa là một tài khoản thông minh có thể tự xác minh một giao dịch, xác định các quy tắc chữ ký của riêng nó, chấp thuận ai trả gas và thực thi một hoặc nhiều hành động mà không phụ thuộc vào EntryPoint của ERC-4337, các trình đóng gói (bundler) hoặc các trình chuyển tiếp (relayer) do ứng dụng chạy.

Điều đó thay đổi các giả định về sản phẩm. Tài trợ gas trở thành một mẫu tài khoản gốc thay vì cơ sở hạ tầng mà mỗi ứng dụng phải sắp xếp riêng. Các sơ đồ chữ ký thay thế trở nên dễ hỗ trợ hơn, bao gồm cả mã khóa hiện nay và một con đường rời khỏi ECDSA nếu việc di chuyển hậu lượng tử trở nên cần thiết. Nếu EIP-8141 hoặc một thiết kế trừu tượng hóa tài khoản gốc tương tự được triển khai, mô hình trình xây dựng sẽ chuyển từ "một EOA ký một giao dịch" sang "một tài khoản xác định cách nó xác thực, thanh toán và thực thi một giao dịch."

Đó là định hướng, không phải là một lời hứa. EIP-8141 đang ở dạng Bản nháp và tính đến tháng 5 năm 2026, nó chỉ được "xem xét để đưa vào" Hegotá, nghĩa là các nhóm máy khách đang thảo luận về nó nhưng chưa cam kết phát hành nó trong bản nâng cấp đó. Con đường xây dựng thực tế năm 2026 cho UX tài khoản vẫn là EIP-7702 cộng với các luồng ví ERC-4337, nhưng các trình xây dựng nên thiết kế như thể các tài khoản có thể lập trình đang trở thành mô hình tài khoản mặc định.

## Những gì cần xây dựng khác đi ngay bây giờ {#what-to-build-differently-now}

Bắt đầu bằng cách kiểm tra lại các giả định về phí cũ. Nếu cẩm nang việc triển khai của bạn vẫn coi mạng chính Ethereum là một môi trường 10 đến 30 gwei theo mặc định, thì có lẽ nó đang định tuyến quá nhiều công việc ra khỏi l1. Mạng chính đáng được xem xét đầu tiên khi ứng dụng của bạn phụ thuộc vào thanh khoản được chia sẻ, khả năng kết hợp với các giao thức hiện có, tính trung lập hoặc trạng thái giá trị cao nên tồn tại ở nơi mà tính bảo mật và sự đồng thuận xã hội của Ethereum là mạnh nhất.

Sử dụng các l2 vì những lý do vẫn còn quan trọng, bao gồm phân phối, khối lượng giao dịch rất cao, hệ sinh thái dành riêng cho ứng dụng hoặc chi phí cho mỗi hành động cần phải càng gần bằng không càng tốt. Vấn đề không phải là "mạng chính cho mọi thứ." Vấn đề là "mạng chính quá đắt" không còn nên là bộ lọc đầu tiên nữa.

Về phía tài khoản, hãy xây dựng dựa trên các khả năng của ví thay vì các EOA thô. Giao diện người dùng (frontend) của bạn nên sẵn sàng cho các lệnh gọi được gom lô, gas được tài trợ, khóa phiên, mã khóa và các luồng khôi phục đến thông qua các ví. EIP-7702 và ERC-4337 là những công cụ thực tế hiện nay. Trừu tượng hóa tài khoản gốc là hướng đi cần theo dõi tiếp theo.

Hãy ngừng coi mạng chính Ethereum là lớp quyết toán đắt đỏ mà bạn chỉ chạm tới vào phút cuối và ngừng coi tài khoản người dùng là các khóa ECDSA tĩnh phải giữ ETH trước khi chúng có thể làm bất cứ điều gì. Ethereum vào năm 2026 đang hướng tới việc thực thi l1 rẻ hơn và các tài khoản có thể lập trình. Hãy xây dựng cho thế giới đó.

## Đọc thêm {#further-reading}

- [Thông báo Mạng chính Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Thông báo Mạng chính Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Cập nhật các ưu tiên giao thức cho năm 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Điểm kiểm tra #9 (Tháng 4 năm 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Hướng dẫn Pectra 7702 trên ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 Đặt mã cho các EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 Danh sách truy cập cấp độ khối](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 Danh sách bao gồm được thực thi theo lựa chọn phân nhánh (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 Giao dịch khung](https://eips.ethereum.org/EIPS/eip-8141)
- [Bản nâng cấp Hegotá của Forkcast](https://forkcast.org/upgrade/hegota/)
- [Công cụ theo dõi Gas của Etherscan](https://etherscan.io/gastracker)
- [EIP-7773 Siêu dữ liệu phân nhánh cứng Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Lộ trình Glamsterdam trên ethereum.org](https://ethereum.org/roadmap/glamsterdam/)