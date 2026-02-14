---
title: "Tiêu chuẩn phát triển Ethereum"
description: "Tìm hiểu về các tiêu chuẩn Ethereum, bao gồm EIPs, các tiêu chuẩn token như ERC-20 và ERC-721, cùng với các quy ước phát triển."
lang: vi
incomplete: true
---

## Tổng quan về các tiêu chuẩn {#standards-overview}

Cộng đồng Ethereum đã áp dụng nhiều tiêu chuẩn giúp giữ cho các dự án (chẳng hạn như [máy khách Ethereum](/developers/docs/nodes-and-clients/) và ví) có thể tương tác giữa các lần triển khai và đảm bảo các hợp đồng thông minh và các ứng dụng phi tập trung vẫn có thể kết hợp được.

Thông thường, các tiêu chuẩn được giới thiệu dưới dạng [Đề xuất Cải tiến Ethereum](/eips/) (EIP), được các thành viên cộng đồng thảo luận thông qua một [quy trình tiêu chuẩn](https://eips.ethereum.org/EIPS/eip-1).

- [Giới thiệu về EIP](/eips/)
- [Danh sách các EIP](https://eips.ethereum.org/)
- [Kho lưu trữ GitHub của EIP](https://github.com/ethereum/EIPs)
- [Bảng thảo luận EIP](https://ethereum-magicians.org/c/eips)
- [Giới thiệu về Quản trị Ethereum](/governance/)
- [Tổng quan về Quản trị Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _Ngày 31 tháng 3 năm 2019 - Boris Mann_
- [Quản trị Phát triển Giao thức Ethereum và Điều phối Nâng cấp Mạng lưới](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _Ngày 23 tháng 3 năm 2020 - Hudson Jameson_
- [Danh sách phát tất cả các cuộc họp của Nhà phát triển cốt lõi Ethereum](https://www.youtube.com/@EthereumProtocol) _(Danh sách phát trên YouTube)_

## Các loại tiêu chuẩn {#types-of-standards}

Có 3 loại EIPs:

- Standards Track: mô tả bất kỳ thay đổi nào ảnh hưởng đến hầu hết hoặc tất cả các khai triển Ethereum
- [Lộ trình meta](https://eips.ethereum.org/meta): mô tả một quy trình xung quanh Ethereum hoặc đề xuất thay đổi một quy trình
- [Lộ trình thông tin](https://eips.ethereum.org/informational): mô tả một vấn đề thiết kế của Ethereum hoặc cung cấp các hướng dẫn chung hoặc thông tin cho cộng đồng Ethereum

Hơn nữa, Lộ trình Chuẩn được chia thành 4 loại:

- [Cốt lõi](https://eips.ethereum.org/core): các cải tiến yêu cầu phân nhánh đồng thuận
- [Mạng lưới](https://eips.ethereum.org/networking): các cải tiến xung quanh devp2p và Giao thức phụ Ethereum nhẹ, cũng như các cải tiến được đề xuất cho các thông số kỹ thuật giao thức mạng của whisper và swarm.
- [Giao diện](https://eips.ethereum.org/interface): các cải tiến xung quanh các tiêu chuẩn và thông số kỹ thuật API/RPC của máy khách, và các tiêu chuẩn cấp ngôn ngữ nhất định như tên phương thức và ABI hợp đồng.
- [ERC](https://eips.ethereum.org/erc): các tiêu chuẩn và quy ước cấp ứng dụng

Thông tin chi tiết hơn về các loại và danh mục khác nhau này có thể được tìm thấy trong [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Các tiêu chuẩn token {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Một giao diện tiêu chuẩn cho các token có thể thay thế (có thể hoán đổi cho nhau), như token biểu quyết, token cổ phần hoặc tiền ảo.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Một tiêu chuẩn token có thể thay thế giúp các token hoạt động giống hệt như ether và hỗ trợ xử lý việc chuyển token ở phía người nhận.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Một giao diện mở rộng cho các token ERC-20 hỗ trợ thực thi lệnh gọi lại trên các hợp đồng của người nhận trong một giao dịch duy nhất.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Một giao diện tiêu chuẩn cho các token không thể thay thế, như một chứng từ cho một tác phẩm nghệ thuật hoặc một bài hát.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Một sự kiện được tiêu chuẩn hóa được phát ra khi tạo/chuyển một hoặc nhiều token không thể thay thế sử dụng các mã định danh token liên tiếp.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Phần mở rộng giao diện cho vai trò người tiêu dùng EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Thêm một vai trò có giới hạn thời gian với các quyền hạn bị hạn chế cho các token ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(KHÔNG ĐƯỢC KHUYẾN NGHỊ)** Một tiêu chuẩn token cải tiến so với ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Một tiêu chuẩn token có thể chứa cả tài sản có thể thay thế và không thể thay thế.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Một tiêu chuẩn kho vault được token hóa được thiết kế để tối ưu hóa và thống nhất các thông số kỹ thuật của các kho vault sinh lời.

Tìm hiểu thêm về [các tiêu chuẩn token](/developers/docs/standards/tokens/).

## Đọc thêm {#further-reading}

- [Đề xuất Cải tiến Ethereum (EIP)](/eips/)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
