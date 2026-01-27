---
title: Danh sách kiểm tra tích hợp token
description: Danh sách kiểm tra các mục cần xem xét khi tương tác với token
author: "Trailofbits"
lang: vi
tags:
  [
    "solidity",
    "hợp đồng thông minh",
    "tính bảo mật",
    "tokens"
  ]
skill: intermediate
published: 2020-08-13
source: Xây dựng những hợp đồng an toàn
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Làm theo danh sách kiểm tra này khi tương tác với các token tùy ý. Hãy chắc chắn rằng bạn hiểu những rủi ro liên quan đến từng mục và biện minh cho bất kỳ ngoại lệ nào đối với các quy tắc này.

Để thuận tiện, tất cả các [tiện ích](https://github.com/crytic/slither#tools) Slither có thể được chạy trực tiếp trên địa chỉ token, chẳng hạn như:

[Hướng dẫn sử dụng Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Để làm theo danh sách kiểm tra này, bạn sẽ cần có đầu ra này từ Slither cho token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # yêu cầu cấu hình và sử dụng Echidna và Manticore
```

## Những cân nhắc chung {#general-considerations}

- **Hợp đồng có đánh giá bảo mật.** Tránh tương tác với các hợp đồng thiếu đánh giá bảo mật. Kiểm tra độ dài của bản đánh giá (hay còn gọi là “mức độ nỗ lực”), danh tiếng của công ty bảo mật, cũng như số lượng và mức độ nghiêm trọng của các phát hiện.
- **Bạn đã liên hệ với các nhà phát triển.** Bạn có thể cần thông báo cho nhóm của họ về một sự cố. Tìm kiếm các địa chỉ liên hệ thích hợp trên [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Họ có một danh sách gửi thư bảo mật cho các thông báo quan trọng.** Nhóm của họ nên tư vấn cho người dùng (như bạn!) khi các vấn đề nghiêm trọng được tìm thấy hoặc khi các bản nâng cấp xảy ra.

## Sự phù hợp với ERC {#erc-conformity}

Slither bao gồm một tiện ích, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), giúp xem xét sự phù hợp của token với nhiều tiêu chuẩn ERC liên quan. Sử dụng slither-check-erc để xem xét rằng:

- **Transfer và transferFrom trả về một giá trị boolean.** Một số token không trả về giá trị boolean trên các hàm này. Do đó, các lệnh gọi của chúng trong hợp đồng có thể thất bại.
- **Các hàm name, decimals và symbol có mặt nếu được sử dụng.** Các hàm này là tùy chọn trong tiêu chuẩn ERC20 và có thể không có mặt.
- **Decimals trả về một uint8.** Một số token trả về sai một uint256. Nếu trường hợp này xảy ra, hãy đảm bảo giá trị trả về dưới 255.
- **Token giảm thiểu [tình trạng tranh giành ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) đã biết.** Tiêu chuẩn ERC20 có một tình trạng tranh giành ERC20 đã biết phải được giảm thiểu để ngăn chặn kẻ tấn công đánh cắp token.
- **Token không phải là token ERC777 và không có lệnh gọi hàm bên ngoài trong transfer và transferFrom.** Các lệnh gọi bên ngoài trong các hàm chuyển có thể dẫn đến các cuộc tấn công tái nhập.

Slither bao gồm một tiện ích, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), tạo ra các bài kiểm tra đơn vị và các thuộc tính bảo mật có thể phát hiện ra nhiều lỗi ERC phổ biến. Sử dụng slither-prop để xem xét rằng:

- **Hợp đồng vượt qua tất cả các bài kiểm tra đơn vị và các thuộc tính bảo mật từ slither-prop.** Chạy các bài kiểm tra đơn vị đã tạo, sau đó kiểm tra các thuộc tính bằng [Echidna](https://github.com/crytic/echidna) và [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Cuối cùng, có một số đặc điểm khó xác định tự động. Xem xét các điều kiện này theo cách thủ công:

- **Transfer và transferFrom không nên thu phí.** Các token giảm phát có thể dẫn đến hành vi không mong muốn.
- **Tiền lãi tiềm năng kiếm được từ token được tính đến.** Một số token phân phối tiền lãi cho những người nắm giữ token. Tiền lãi này có thể bị kẹt trong hợp đồng nếu không được tính đến.

## Thành phần hợp đồng {#contract-composition}

- **Hợp đồng tránh sự phức tạp không cần thiết.** Token phải là một hợp đồng đơn giản; một token có mã phức tạp đòi hỏi tiêu chuẩn xem xét cao hơn. Sử dụng [công cụ in human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) của Slither để xác định mã phức tạp.
- **Hợp đồng sử dụng SafeMath.** Các hợp đồng không sử dụng SafeMath đòi hỏi một tiêu chuẩn xem xét cao hơn. Kiểm tra hợp đồng bằng tay để xem việc sử dụng SafeMath.
- **Hợp đồng chỉ có một vài chức năng không liên quan đến token.** Các chức năng không liên quan đến token làm tăng khả năng xảy ra sự cố trong hợp đồng. Sử dụng [công cụ in contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để xem xét tổng thể mã được sử dụng trong hợp đồng.
- **Token chỉ có một địa chỉ.** Các token có nhiều điểm vào để cập nhật số dư có thể phá vỡ việc ghi sổ nội bộ dựa trên địa chỉ (ví dụ: `balances[token_address][msg.sender]` có thể không phản ánh số dư thực tế).

## Đặc quyền của chủ sở hữu {#owner-privileges}

- **Token không thể nâng cấp.** Các hợp đồng có thể nâng cấp có thể thay đổi các quy tắc của chúng theo thời gian. Sử dụng [công cụ in human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để xác định xem hợp đồng có thể nâng cấp được không.
- **Chủ sở hữu có khả năng đúc token hạn chế.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể lạm dụng khả năng đúc token. Sử dụng [công cụ in human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để xem xét khả năng đúc token và cân nhắc xem xét mã theo cách thủ công.
- **Token không thể tạm dừng.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể bẫy các hợp đồng dựa trên các token có thể tạm dừng. Xác định mã có thể tạm dừng bằng tay.
- **Chủ sở hữu không thể đưa hợp đồng vào danh sách đen.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể bẫy các hợp đồng dựa trên các token có danh sách đen. Xác định các tính năng đưa vào danh sách đen bằng tay.
- **Nhóm đứng sau token được biết đến và có thể chịu trách nhiệm về việc lạm dụng.** Các hợp đồng với các nhóm phát triển ẩn danh hoặc nằm trong các nơi trú ẩn pháp lý nên yêu cầu một tiêu chuẩn xem xét cao hơn.

## Sự khan hiếm của token {#token-scarcity}

Việc xem xét các vấn đề về sự khan hiếm của token đòi hỏi phải xem xét thủ công. Kiểm tra các điều kiện sau:

- **Không có người dùng nào sở hữu phần lớn nguồn cung.** Nếu một vài người dùng sở hữu phần lớn token, họ có thể ảnh hưởng đến các hoạt động dựa trên sự phân chia của token.
- **Tổng nguồn cung là đủ.** Các token có tổng nguồn cung thấp có thể dễ dàng bị thao túng.
- **Các token được đặt ở nhiều hơn một vài sàn giao dịch.** Nếu tất cả các token đều ở trên một sàn giao dịch, một sự xâm phạm của sàn giao dịch có thể làm tổn hại đến hợp đồng dựa vào token.
- **Người dùng hiểu các rủi ro liên quan của các quỹ lớn hoặc các khoản vay nhanh (flash loan).** Các hợp đồng dựa vào số dư token phải xem xét cẩn thận những kẻ tấn công có quỹ lớn hoặc các cuộc tấn công thông qua các khoản vay nhanh.
- **Token không cho phép đúc nhanh (flash minting)**. Việc đúc nhanh có thể dẫn đến những biến động đáng kể về số dư và tổng nguồn cung, điều này đòi hỏi phải có các kiểm tra tràn nghiêm ngặt và toàn diện trong hoạt động của token.
