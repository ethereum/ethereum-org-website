---
title: Tiêu chuẩn Token
description: Khám phá các tiêu chuẩn token của Ethereum như ERC-20, ERC-721 và ERC-1155 dành cho token có thể thay thế và không thể thay thế.
lang: vi
incomplete: true
---

## Giới thiệu {#introduction}

Nhiều tiêu chuẩn phát triển Ethereum tập trung vào giao diện của token. Các tiêu chuẩn này giúp đảm bảo các hợp đồng thông minh vẫn có thể kết hợp được, vì vậy khi một dự án mới phát hành một token, nó sẽ vẫn tương thích với các sàn giao dịch phi tập trung và ứng dụng hiện có.

Các tiêu chuẩn token xác định cách các token hoạt động và tương tác trên toàn hệ sinh thái Ethereum. Chúng giúp các nhà phát triển xây dựng dễ dàng hơn mà không cần phải phát minh lại bánh xe, đảm bảo rằng các token hoạt động liền mạch với các ví, sàn giao dịch và nền tảng DeFi. Dù là trong lĩnh vực trò chơi, quản trị hay các trường hợp sử dụng khác, các tiêu chuẩn này đều mang lại sự nhất quán và giúp Ethereum kết nối với nhau nhiều hơn.

## Điều kiện tiên quyết {#prerequisites}

- [Các tiêu chuẩn phát triển Ethereum](/developers/docs/standards/)
- [Hợp đồng thông minh](/developers/docs/smart-contracts/)

## Các tiêu chuẩn token {#token-standards}

Đây là vài tiêu chuẩn token phổ biến nhất trên Ethereum:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Một giao diện tiêu chuẩn cho các token có thể thay thế (có thể hoán đổi cho nhau), như token biểu quyết, token cổ phần hoặc tiền ảo.

### Các tiêu chuẩn NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Một giao diện tiêu chuẩn cho các token không thể thay thế, như một chứng từ cho một tác phẩm nghệ thuật hoặc một bài hát.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155 cho phép giao dịch hiệu quả hơn và gộp các giao dịch lại với nhau – nhờ vậy mà tiết kiệm chi phí. Tiêu chuẩn token này cho phép tạo ra cả token tiện ích (như $BNB hay $BAT) và các NFT như CryptoPunks.

Danh sách đầy đủ các đề xuất [ERC](https://eips.ethereum.org/erc).

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các hướng dẫn liên quan {#related-tutorials}

- [Danh sách kiểm tra tích hợp token](/developers/tutorials/token-integration-checklist/) _– Một danh sách những điều cần cân nhắc khi tương tác với các token._
- [Tìm hiểu về hợp đồng thông minh token ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Giới thiệu về cách triển khai hợp đồng thông minh đầu tiên của bạn trên mạng thử nghiệm Ethereum._
- [Chuyển và phê duyệt các token ERC20 từ một hợp đồng thông minh Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Cách sử dụng một hợp đồng thông minh để tương tác với token bằng ngôn ngữ Solidity._
- [Triển khai thị trường ERC721 [hướng dẫn cách thực hiện]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Cách đưa các vật phẩm được token hóa ra bán trên một bảng rao vặt phi tập trung._
