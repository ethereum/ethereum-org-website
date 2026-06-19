---
title: Tiêu chuẩn token
description: Khám phá các tiêu chuẩn token Ethereum bao gồm ERC-20, ERC-721 và ERC-1155 cho các token có thể thay thế và không thể thay thế.
lang: vi
incomplete: true
---

## Giới thiệu {#introduction}

Nhiều tiêu chuẩn phát triển [Ethereum](/) tập trung vào các giao diện token. Các tiêu chuẩn này giúp đảm bảo các hợp đồng thông minh vẫn có khả năng kết hợp, vì vậy khi một dự án mới phát hành một token, nó vẫn tương thích với các sàn giao dịch và ứng dụng phi tập trung hiện có.

Các tiêu chuẩn token xác định cách các token hoạt động và tương tác trên toàn bộ hệ sinh thái Ethereum. Chúng giúp các nhà phát triển xây dựng dễ dàng hơn mà không phải làm lại từ đầu, đảm bảo rằng các token hoạt động trơn tru với các ví, sàn giao dịch và nền tảng tài chính phi tập trung (DeFi). Cho dù trong trò chơi, quản trị hay các trường hợp sử dụng khác, các tiêu chuẩn này mang lại sự nhất quán và làm cho Ethereum được kết nối với nhau nhiều hơn.

## Điều kiện tiên quyết {#prerequisites}

- [Các tiêu chuẩn phát triển Ethereum](/developers/docs/standards/)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)

## Các tiêu chuẩn token {#token-standards}

Dưới đây là một số tiêu chuẩn token phổ biến nhất trên Ethereum:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Một giao diện tiêu chuẩn cho các token có thể thay thế (có thể hoán đổi cho nhau), như token bỏ phiếu, token đặt cọc hoặc tiền ảo.

### Các tiêu chuẩn NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Một giao diện tiêu chuẩn cho các token không thể thay thế, như chứng thư cho một tác phẩm nghệ thuật hoặc một bài hát.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155 cho phép giao dịch hiệu quả hơn và gộp các giao dịch lại với nhau – do đó tiết kiệm chi phí. Tiêu chuẩn token này cho phép tạo ra cả token tiện ích (chẳng hạn như $BNB hoặc $BAT) và Token không thể thay thế như CryptoPunks.

Danh sách đầy đủ các đề xuất [ERC](https://eips.ethereum.org/erc).

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các hướng dẫn liên quan {#related-tutorials}

- [Danh sách kiểm tra tích hợp token](/developers/tutorials/token-integration-checklist/) _– Một danh sách các điều cần xem xét khi tương tác với các token._
- [Hiểu về hợp đồng thông minh token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Giới thiệu về việc triển khai hợp đồng thông minh đầu tiên của bạn trên một mạng lưới thử nghiệm Ethereum._
- [Chuyển nhượng và phê duyệt token ERC20 từ một hợp đồng thông minh Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Cách sử dụng một hợp đồng thông minh để tương tác với một token bằng ngôn ngữ Solidity._
- [Triển khai một thị trường ERC721 [hướng dẫn cách làm]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Cách đưa các mặt hàng đã được token hóa lên bán trên một bảng rao vặt phi tập trung._