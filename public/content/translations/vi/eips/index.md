---
title: "Đề xuất Cải tiến Ethereum (EIPs)"
description: "Thông tin cơ bản bạn cần phải hiểu về EIPs"
lang: vi
---

# Giới thiệu về các Đề xuất Cải tiến Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## EIPS là gì? {#what-are-eips}

[Các Đề xuất Cải tiến Ethereum (EIP)](https://eips.ethereum.org/) là các tiêu chuẩn xác định các tính năng hoặc quy trình mới tiềm năng cho Ethereum. EIPs có những tính năng đặc điểm cho những thay đổi được đế xuất và đóng vai trò "nguồn sự thực" cho cộng đồng. Mang lưới được nâng cấp và tiêu chuẩn cho Ethereum được trao đổi và phát triển thông qua quy trình của EPI.

Mọi người ở trong cộng đồng của Ethereum điều có khả năng tạo EIP. Các hướng dẫn để viết EIP được bao gồm trong [EIP-1](https://eips.ethereum.org/EIPS/eip-1). EIP nên chủ yếu cung cấp thông số rõ ràng với ít động lực. Người viết rae EIP chịu trách nhiệm về sự đồng thuận giữa cộng đồng và viết lại những ý kiến khác. Do rào cản của kỹ thuật cao về việc nộp bản thảo tốt của EIP, theo truyền thống, đa số tác giả EIP thường là nhà thi hành và nhà phát triển.

## Tại sao EIPs quan trọng? {#why-do-eips-matter}

EIPs đóng vai trò quan trọng trong việc thay đổi và là tài liệu trên Ethereum. Chúng là cách để mọi người đề xuất, trang luận, và áp dụng những thay đổi. Có [nhiều loại EIP khác nhau](https://eips.ethereum.org/EIPS/eip-1#eip-types), bao gồm EIP cốt lõi cho các thay đổi giao thức cấp thấp ảnh hưởng đến sự đồng thuận và yêu cầu nâng cấp mạng như [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), và ERC cho các tiêu chuẩn ứng dụng như [EIP-20](https://eips.ethereum.org/EIPS/eip-20) và [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Mỗi lần nâng cấp mạng bao gồm một tập hợp các EIP cần được triển khai bởi mỗi [máy khách Ethereum](/learn/#clients-and-nodes) trên mạng. Điều này có nghĩa rằng để đạt được đồng thuận với những Client khác trên mạng chính Ethereum, người lập trình Client phải đảm bảo rằng họ thi hành EIP cần thiết.

Cùng với việc cung cấp đặc điểm kĩ thuật cho các thay đổi, EIP là đơn vị trung tâm của quá trình quản trị trong Ethereum: bất kỳ ai cũng có thể đề xuất một EIP, sau đó các bên liên quan trong cộng đồng sẽ thảo luận để quyết định liệu nó có nên được chấp nhận làm tiêu chuẩn hay đưa vào một bản nâng cấp mạng. Vì các EIP không phải cốt lõi không bắt buộc tất cả ứng dụng phải áp dụng (ví dụ, có thể tạo một token thay thế được mà không cần tuân theo EIP-20), nhưng các EIP cốt lõi phải được chấp nhận rộng rãi (vì tất cả các nút phải nâng cấp để tiếp tục ở trong cùng một mạng), nên các EIP cốt lõi đòi hỏi sự đồng thuận rộng rãi hơn trong cộng đồng so với các EIP không cốt lõi.

## Lịch sử của các EIP {#history-of-eips}

[Kho lưu trữ GitHub về Đề xuất Cải tiến Ethereum (EIP)](https://github.com/ethereum/EIPs) được tạo vào tháng 10 năm 2015. Quy trình EIP dựa trên quy trình [Đề xuất Cải tiến Bitcoin (BIPs)](https://github.com/bitcoin/bips), bản thân quy trình này lại dựa trên quy trình [Đề xuất Nâng cao Python (PEPs)](https://www.python.org/dev/peps/).

Người chỉnh sửa EIP có nhiệm vụ xử lí và xem xét EIPs về vấn đề kĩ thuật, vấn đề định dạng và sửa lỗi chính tả, ngữ pháp cũng như phong cách lập trình. Martin Becze, Vitalik Buterin, Gavin Wood và một số người khác là người chỉnh sửa EIP đầu tiên từ 2015 cho tới 2016.

Người chỉnh sửa EIP hiện tại gồm

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Các người chỉnh sửa EIP danh dự gồm

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Nếu bạn muốn trở thành người chỉnh sửa EIP, vui lòng xem [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Người chỉnh sửa EIP quyết định khi nào để xuất sẵn sàng trở thành EIP và giúp tác giả EIP đẩy để xuất đi xa hơn. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) giúp tổ chức các cuộc họp giữa các biên tập viên EIP và cộng đồng (xem [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Quy trình tiêu chuẩn hóa đầy đủ cùng với biểu đồ được mô tả trong [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Tìm hiểu thêm {#learn-more}

Nếu bạn muốn đọc thêm về các EIP, hãy xem [trang web EIP](https://eips.ethereum.org/) và [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Đây là một số liên kết hữu ích:

- [Danh sách mọi Đề xuất Cải tiến Ethereum](https://eips.ethereum.org/all)
- [Mô tả về tất cả các loại EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Mô tả về tất cả các trạng thái EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Các dự án giáo dục cộng đồng {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP là một loạt video giáo dục thảo luận về Đề xuất Cải tiến Ethereum (EIP) và các tính năng chính của các bản nâng cấp sắp tới._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf cung cấp thông tin bổ sung cho các Đề xuất Cải tiến Ethereum (EIP), bao gồm trạng thái, chi tiết triển khai, các Yêu cầu Phản hồi liên quan và phản hồi của cộng đồng._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun cung cấp tin tức mới nhất về các Đề xuất Cải tiến Ethereum (EIP), các cập nhật về những cuộc họp EIP, và nhiều hơn nữa._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight là một bản trình bày về trạng thái của quy trình và số liệu thống kê về Đề xuất Cải tiến Ethereum (EIP) theo thông tin được thu thập từ các nguồn khác nhau._

## Tham gia {#participate}

Ai cũng có thể tạo một EIP. Trước khi gửi một đề xuất, người gửi phải đọc [EIP-1](https://eips.ethereum.org/EIPS/eip-1) trong đó nêu ra quy trình EIP và cách viết EIP, và lấy ý kiến phản hồi trên [Ethereum Magicians](https://ethereum-magicians.org/), nơi các đề xuất được thảo luận lần đầu với cộng đồng trước khi một bản nháp được gửi.

## Tài liệu tham khảo {#references}

<cite class="citation">

Nội dung trang được tham khảo một phần từ [Quản trị phát triển Ethereum và nâng cấp phối hợp mạng lưới](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) bởi Hudson Jameson

</cite>
