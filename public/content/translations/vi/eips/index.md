---
title: Giới thiệu về Đề xuất Cải tiến Ethereum (EIP)
metaTitle: Đề xuất Cải tiến Ethereum (EIP)
description: Những thông tin cơ bản bạn cần biết để hiểu về EIP
lang: vi
---

## EIP là gì? {#what-are-eips}

[Đề xuất Cải tiến Ethereum (EIP)](https://eips.ethereum.org/) là các tiêu chuẩn chỉ định các tính năng hoặc quy trình mới tiềm năng cho Ethereum. Các EIP chứa các thông số kỹ thuật cho những thay đổi được đề xuất và đóng vai trò là "nguồn chân lý" cho cộng đồng. Các bản nâng cấp mạng lưới và tiêu chuẩn ứng dụng cho [Ethereum](/) được thảo luận và phát triển thông qua quy trình EIP.

Bất kỳ ai trong cộng đồng Ethereum đều có khả năng tạo một EIP. Các hướng dẫn để viết EIP được bao gồm trong [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Một EIP chủ yếu nên cung cấp một bản đặc tả kỹ thuật súc tích cùng với một chút lý do thực hiện. Tác giả EIP chịu trách nhiệm đạt được sự đồng thuận trong cộng đồng và ghi lại các ý kiến thay thế. Do rào cản kỹ thuật cao để gửi một EIP hoàn chỉnh, về mặt lịch sử, hầu hết các tác giả EIP thường là các nhà phát triển ứng dụng hoặc giao thức.

## Tại sao các EIP lại quan trọng? {#why-do-eips-matter}

Các EIP đóng vai trò trung tâm trong cách các thay đổi diễn ra và được ghi lại trên Ethereum. Chúng là cách để mọi người đề xuất, tranh luận và áp dụng các thay đổi. Có [nhiều loại EIP khác nhau](https://eips.ethereum.org/EIPS/eip-1#eip-types), bao gồm các EIP cốt lõi (core EIP) cho các thay đổi giao thức cấp thấp ảnh hưởng đến sự đồng thuận và yêu cầu nâng cấp mạng lưới như [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), và các ERC cho các tiêu chuẩn ứng dụng như [EIP-20](https://eips.ethereum.org/EIPS/eip-20) và [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Mỗi bản nâng cấp mạng lưới bao gồm một tập hợp các EIP cần được triển khai bởi mỗi [client Ethereum](/learn/#clients-and-nodes) trên mạng lưới. Điều này có nghĩa là để duy trì sự đồng thuận với các client khác trên Mạng chính Ethereum, các nhà phát triển client cần đảm bảo rằng họ đã triển khai tất cả các EIP được yêu cầu.

Cùng với việc cung cấp đặc tả kỹ thuật cho các thay đổi, các EIP là đơn vị xoay quanh việc quản trị diễn ra trong Ethereum: bất kỳ ai cũng có thể tự do đề xuất một EIP, và sau đó các bên liên quan khác nhau trong cộng đồng sẽ tranh luận để xác định xem nó có nên được áp dụng như một tiêu chuẩn hay được đưa vào một bản nâng cấp mạng lưới hay không. Bởi vì các EIP không cốt lõi không bắt buộc phải được áp dụng bởi tất cả các ứng dụng (ví dụ: có thể tạo ra một token có thể thay thế mà không triển khai EIP-20), nhưng các EIP cốt lõi phải được áp dụng rộng rãi (vì tất cả các node phải nâng cấp để tiếp tục là một phần của cùng một mạng lưới), các EIP cốt lõi yêu cầu sự đồng thuận rộng rãi hơn trong cộng đồng so với các EIP không cốt lõi.

## Lịch sử của các EIP {#history-of-eips}

[Kho lưu trữ GitHub của Đề xuất Cải tiến Ethereum (EIP)](https://github.com/ethereum/EIPs) được tạo vào tháng 10 năm 2015. Quy trình EIP dựa trên quy trình [Đề xuất Cải tiến Bitcoin (BIP)](https://github.com/bitcoin/bips), mà bản thân nó lại dựa trên quy trình [Đề xuất Nâng cao Python (PEP)](https://www.python.org/dev/peps/).

Các biên tập viên EIP được giao nhiệm vụ xem xét các EIP về tính hợp lý kỹ thuật, các vấn đề định dạng và sửa lỗi chính tả, ngữ pháp cũng như phong cách viết code. Martin Becze, Vitalik Buterin, Gavin Wood và một vài người khác là những biên tập viên EIP đầu tiên từ năm 2015 đến cuối năm 2016.

Các biên tập viên EIP hiện tại là

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Các biên tập viên EIP danh dự là

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Nếu bạn muốn trở thành một biên tập viên EIP, vui lòng xem [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Các biên tập viên EIP quyết định khi nào một đề xuất đã sẵn sàng để trở thành một EIP và giúp các tác giả EIP thúc đẩy các đề xuất của họ. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) giúp tổ chức các cuộc họp giữa các biên tập viên EIP và cộng đồng (xem [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Toàn bộ quy trình tiêu chuẩn hóa cùng với biểu đồ được mô tả trong [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Tìm hiểu thêm {#learn-more}

Nếu bạn muốn đọc thêm về các EIP, hãy xem [trang web EIP](https://eips.ethereum.org/) và [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Dưới đây là một số liên kết hữu ích:

- [Danh sách mọi Đề xuất Cải tiến Ethereum](https://eips.ethereum.org/all)
- [Mô tả về tất cả các loại EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Mô tả về tất cả các trạng thái EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Các dự án giáo dục cộng đồng {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP là một loạt video giáo dục thảo luận về Đề xuất Cải tiến Ethereum (EIP) và các tính năng chính của các bản nâng cấp sắp tới.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf cung cấp thông tin bổ sung cho các Đề xuất Cải tiến Ethereum (EIP), bao gồm trạng thái, chi tiết triển khai, các pull request liên quan và phản hồi từ cộng đồng.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun cung cấp tin tức mới nhất về các Đề xuất Cải tiến Ethereum (EIP), cập nhật về các cuộc họp EIP và nhiều thông tin khác.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight là một bản trình bày về trạng thái của quy trình Đề xuất Cải tiến Ethereum (EIP) và các số liệu thống kê dựa trên thông tin thu thập từ nhiều nguồn khác nhau.*

## Tham gia {#participate}

Bất kỳ ai cũng có thể tạo một EIP. Trước khi gửi một đề xuất, bạn phải đọc [EIP-1](https://eips.ethereum.org/EIPS/eip-1), trong đó phác thảo quy trình EIP và cách viết một EIP, đồng thời thu thập phản hồi trên [Ethereum Magicians](https://ethereum-magicians.org/), nơi các đề xuất được thảo luận lần đầu với cộng đồng trước khi bản nháp được gửi đi.

## Tài liệu tham khảo {#references}

<cite class="citation">

Nội dung trang được cung cấp một phần từ [Quản trị Phát triển Giao thức Ethereum và Điều phối Nâng cấp Mạng lưới](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) bởi Hudson Jameson

</cite>