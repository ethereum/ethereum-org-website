---
title: "Danh sách kiểm tra tích hợp token"
description: "Danh sách kiểm tra những điều cần lưu ý khi tương tác với token"
author: "Trailofbits"
lang: vi
tags: ["Solidity", "hợp đồng thông minh", "bảo mật", "token"]
skill: intermediate
breadcrumb: "Tích hợp token"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Hãy làm theo danh sách kiểm tra này khi tương tác với các token bất kỳ. Đảm bảo bạn hiểu rõ các rủi ro liên quan đến từng mục và giải thích hợp lý cho bất kỳ ngoại lệ nào đối với các quy tắc này.

Để thuận tiện, tất cả các [tiện ích](https://github.com/crytic/slither#tools) của Slither có thể được chạy trực tiếp trên một địa chỉ token, ví dụ như:

[Hướng dẫn sử dụng Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Để làm theo danh sách kiểm tra này, bạn sẽ cần có đầu ra này từ Slither cho token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # yêu cầu cấu hình, và sử dụng Echidna và Manticore
```

## Các cân nhắc chung {#general-considerations}

- **Hợp đồng đã được đánh giá bảo mật.** Tránh tương tác với các hợp đồng thiếu đánh giá bảo mật. Kiểm tra thời gian đánh giá (hay còn gọi là "mức độ nỗ lực"), danh tiếng của công ty bảo mật, cũng như số lượng và mức độ nghiêm trọng của các phát hiện.
- **Bạn đã liên hệ với các nhà phát triển.** Bạn có thể cần cảnh báo cho nhóm của họ về một sự cố. Tìm kiếm các liên hệ phù hợp trên [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Họ có một danh sách gửi thư bảo mật cho các thông báo quan trọng.** Nhóm của họ nên thông báo cho người dùng (như bạn!) khi phát hiện ra các vấn đề nghiêm trọng hoặc khi có bản nâng cấp.

## Sự tuân thủ ERC {#erc-conformity}

Slither bao gồm một tiện ích, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), giúp đánh giá sự tuân thủ của một token đối với nhiều tiêu chuẩn ERC liên quan. Sử dụng slither-check-erc để kiểm tra xem:

- **Hàm transfer và transferFrom trả về một giá trị boolean.** Một số token không trả về giá trị boolean trên các hàm này. Do đó, các lệnh gọi của chúng trong hợp đồng có thể thất bại.
- **Các hàm name, decimals và symbol có mặt nếu được sử dụng.** Các hàm này là tùy chọn trong tiêu chuẩn ERC-20 và có thể không có mặt.
- **Hàm decimals trả về một uint8.** Một số token trả về sai định dạng là uint256. Nếu rơi vào trường hợp này, hãy đảm bảo giá trị trả về dưới 255.
- **Token giảm thiểu [tình trạng tương tranh (race condition) ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) đã biết.** Tiêu chuẩn ERC-20 có một tình trạng tương tranh ERC-20 đã biết cần được giảm thiểu để ngăn chặn những kẻ tấn công đánh cắp token.
- **Token không phải là token ERC-777 và không có lệnh gọi hàm bên ngoài nào trong transfer và transferFrom.** Các lệnh gọi bên ngoài trong các hàm chuyển có thể dẫn đến các cuộc tấn công reentrancy (tái xâm nhập).

Slither bao gồm một tiện ích, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), giúp tạo ra các bài kiểm thử đơn vị (unit test) và các thuộc tính bảo mật có thể phát hiện nhiều lỗ hổng ERC phổ biến. Sử dụng slither-prop để kiểm tra xem:

- **Hợp đồng vượt qua tất cả các bài kiểm thử đơn vị và thuộc tính bảo mật từ slither-prop.** Chạy các bài kiểm thử đơn vị được tạo ra, sau đó kiểm tra các thuộc tính bằng [Echidna](https://github.com/crytic/echidna) và [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Cuối cùng, có một số đặc điểm nhất định rất khó để xác định tự động. Hãy kiểm tra thủ công các điều kiện sau:

- **Hàm transfer và transferFrom không nên thu phí.** Các token giảm phát có thể dẫn đến hành vi không mong muốn.
- **Lãi suất tiềm năng kiếm được từ token được tính đến.** Một số token phân phối tiền lãi cho những người nắm giữ token. Số tiền lãi này có thể bị kẹt trong hợp đồng nếu không được tính đến.

## Cấu trúc hợp đồng {#contract-composition}

- **Hợp đồng tránh sự phức tạp không cần thiết.** Token nên là một hợp đồng đơn giản; một token với mã nguồn phức tạp yêu cầu tiêu chuẩn đánh giá cao hơn. Sử dụng [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) của Slither để xác định mã nguồn phức tạp.
- **Hợp đồng sử dụng SafeMath.** Các hợp đồng không sử dụng SafeMath yêu cầu tiêu chuẩn đánh giá cao hơn. Kiểm tra thủ công hợp đồng về việc sử dụng SafeMath.
- **Hợp đồng chỉ có một vài hàm không liên quan đến token.** Các hàm không liên quan đến token làm tăng khả năng xảy ra sự cố trong hợp đồng. Sử dụng [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để đánh giá tổng quan mã nguồn được sử dụng trong hợp đồng.
- **Token chỉ có một địa chỉ.** Các token có nhiều điểm truy cập để cập nhật số dư có thể phá vỡ việc ghi sổ nội bộ dựa trên địa chỉ (ví dụ: `balances[token_address][msg.sender]` có thể không phản ánh số dư thực tế).

## Đặc quyền của chủ sở hữu {#owner-privileges}

- **Token không thể nâng cấp.** Các hợp đồng có thể nâng cấp có thể thay đổi các quy tắc của chúng theo thời gian. Sử dụng [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để xác định xem hợp đồng có thể nâng cấp hay không.
- **Chủ sở hữu có khả năng đúc giới hạn.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể lạm dụng việc đúc. Sử dụng [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) của Slither để đánh giá khả năng đúc và cân nhắc việc kiểm tra mã nguồn thủ công.
- **Token không thể tạm dừng.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể gài bẫy các hợp đồng phụ thuộc vào các token có thể tạm dừng. Xác định mã nguồn có thể tạm dừng bằng phương pháp thủ công.
- **Chủ sở hữu không thể đưa hợp đồng vào danh sách đen.** Các chủ sở hữu độc hại hoặc bị xâm phạm có thể gài bẫy các hợp đồng phụ thuộc vào các token có danh sách đen. Xác định các tính năng danh sách đen bằng phương pháp thủ công.
- **Nhóm đứng sau token được biết đến và có thể chịu trách nhiệm cho việc lạm dụng.** Các hợp đồng với nhóm phát triển ẩn danh, hoặc nằm trong các nơi trú ẩn pháp lý nên yêu cầu tiêu chuẩn đánh giá cao hơn.

## Sự khan hiếm của token {#token-scarcity}

Việc đánh giá các vấn đề về sự khan hiếm của token yêu cầu kiểm tra thủ công. Hãy kiểm tra các điều kiện sau:

- **Không có người dùng nào sở hữu phần lớn nguồn cung.** Nếu một vài người dùng sở hữu phần lớn token, họ có thể ảnh hưởng đến các hoạt động dựa trên sự phân bổ lại của token.
- **Tổng nguồn cung là đủ.** Các token có tổng nguồn cung thấp có thể dễ dàng bị thao túng.
- **Các token được đặt ở nhiều hơn một vài sàn giao dịch.** Nếu tất cả các token đều ở trên một sàn giao dịch, việc sàn giao dịch bị xâm phạm có thể làm tổn hại đến hợp đồng phụ thuộc vào token đó.
- **Người dùng hiểu các rủi ro liên quan đến các quỹ lớn hoặc các khoản vay nhanh (flash loan).** Các hợp đồng phụ thuộc vào số dư token phải xem xét cẩn thận những kẻ tấn công có nguồn vốn lớn hoặc các cuộc tấn công thông qua các khoản vay nhanh.
- **Token không cho phép đúc nhanh (flash minting)**. Việc đúc nhanh có thể dẫn đến những biến động đáng kể về số dư và tổng nguồn cung, điều này đòi hỏi các kiểm tra tràn số nghiêm ngặt và toàn diện trong hoạt động của token.