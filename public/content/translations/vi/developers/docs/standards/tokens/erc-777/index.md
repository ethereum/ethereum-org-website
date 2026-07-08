---
title: "Tiêu chuẩn token ERC-777"
description: "Tìm hiểu về ERC-777, một tiêu chuẩn token có thể thay thế được cải tiến với các hook, mặc dù ERC-20 được khuyến nghị sử dụng vì lý do bảo mật."
lang: vi
---

## Cảnh báo {#warning}

**ERC-777 rất khó để triển khai đúng cách, do [dễ bị tấn công dưới nhiều hình thức khác nhau](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Thay vào đó, bạn nên sử dụng [ERC-20](/developers/docs/standards/tokens/erc-20/).** Trang này được giữ lại như một tài liệu lưu trữ lịch sử.

## Giới thiệu? {#introduction}

ERC-777 là một tiêu chuẩn token có thể thay thế nhằm cải thiện tiêu chuẩn [ERC-20](/developers/docs/standards/tokens/erc-20/) hiện có.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ERC-777 đề xuất những cải tiến gì so với ERC-20? {#-erc-777-vs-erc-20}

ERC-777 cung cấp các cải tiến sau so với ERC-20.

### Hook {#hooks}

Hook là một hàm được mô tả trong mã của một hợp đồng thông minh. Các hook được gọi khi token được gửi hoặc nhận thông qua hợp đồng. Điều này cho phép một hợp đồng thông minh phản ứng với các token đến hoặc đi.

Các hook được đăng ký và khám phá bằng cách sử dụng tiêu chuẩn [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Tại sao các hook lại tuyệt vời? {#why-are-hooks-great}

1. Các hook cho phép gửi token đến một hợp đồng và thông báo cho hợp đồng đó trong một giao dịch duy nhất, không giống như [ERC-20](https://eips.ethereum.org/EIPS/eip-20), vốn yêu cầu một lệnh gọi kép (`approve`/`transferFrom`) để đạt được điều này.
2. Các hợp đồng chưa đăng ký hook sẽ không tương thích với ERC-777. Hợp đồng gửi sẽ hủy bỏ giao dịch khi hợp đồng nhận chưa đăng ký hook. Điều này ngăn chặn việc vô tình chuyển token đến các hợp đồng thông minh không phải ERC-777.
3. Các hook có thể từ chối giao dịch.

### Số thập phân {#decimals}

Tiêu chuẩn này cũng giải quyết sự nhầm lẫn xung quanh `decimals` gây ra trong ERC-20. Sự rõ ràng này cải thiện trải nghiệm của nhà phát triển.

### Tương thích ngược với ERC-20 {#backwards-compatibility-with-erc-20}

Các hợp đồng ERC-777 có thể được tương tác như thể chúng là các hợp đồng ERC-20.

## Đọc thêm {#further-reading}

[EIP-777: Tiêu chuẩn token](https://eips.ethereum.org/EIPS/eip-777)