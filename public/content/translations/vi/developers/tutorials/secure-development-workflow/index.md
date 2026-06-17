---
title: Danh sách kiểm tra bảo mật hợp đồng thông minh
description: Quy trình làm việc được đề xuất để viết các hợp đồng thông minh bảo mật
author: "Trailofbits"
tags: ["hợp đồng thông minh", "bảo mật", "solidity"]
skill: intermediate
breadcrumb: Danh sách kiểm tra bảo mật
lang: vi
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Danh sách kiểm tra phát triển hợp đồng thông minh {#smart-contract-development-checklist}

Dưới đây là quy trình tổng quan mà chúng tôi khuyên bạn nên tuân theo khi viết các hợp đồng thông minh của mình.

Kiểm tra các vấn đề bảo mật đã biết:

- Đánh giá các hợp đồng của bạn bằng [Slither](https://github.com/crytic/slither). Công cụ này có hơn 40 bộ phát hiện tích hợp sẵn cho các lỗ hổng phổ biến. Hãy chạy nó trên mỗi lần check-in với mã mới và đảm bảo nhận được báo cáo sạch (hoặc sử dụng chế độ phân loại để tắt cảnh báo cho một số vấn đề nhất định).
- Đánh giá các hợp đồng của bạn bằng [Crytic](https://crytic.io/). Công cụ này kiểm tra 50 vấn đề mà Slither không làm. Crytic cũng có thể giúp nhóm của bạn luôn nắm bắt tình hình của nhau bằng cách dễ dàng làm nổi bật các vấn đề bảo mật trong các Pull Request trên GitHub.

Xem xét các tính năng đặc biệt của hợp đồng của bạn:

- Các hợp đồng của bạn có thể nâng cấp được không? Hãy đánh giá mã nâng cấp của bạn để tìm các lỗi bằng [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) hoặc [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Chúng tôi đã ghi nhận 17 cách mà các bản nâng cấp có thể gặp trục trặc.
- Các hợp đồng của bạn có nhằm mục đích tuân thủ các ERC không? Hãy kiểm tra chúng bằng [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Công cụ này ngay lập tức xác định các sai lệch so với sáu thông số kỹ thuật phổ biến.
- Bạn có tích hợp với các token của bên thứ 3 không? Hãy xem lại [danh sách kiểm tra tích hợp token](/developers/tutorials/token-integration-checklist/) của chúng tôi trước khi phụ thuộc vào các hợp đồng bên ngoài.

Kiểm tra trực quan các tính năng bảo mật quan trọng trong mã của bạn:

- Xem xét trình in [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) của Slither. Tránh các vấn đề che khuất (shadowing) vô ý và tuyến tính hóa C3.
- Xem xét trình in [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) của Slither. Nó báo cáo khả năng hiển thị của hàm và các kiểm soát truy cập.
- Xem xét trình in [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) của Slither. Nó báo cáo các kiểm soát truy cập trên các biến trạng thái.

Ghi chép lại các thuộc tính bảo mật quan trọng và sử dụng các trình tạo bài kiểm tra tự động để đánh giá chúng:

- Học cách [ghi chép các thuộc tính bảo mật cho mã của bạn](/developers/tutorials/guide-to-smart-contract-security-tools/). Ban đầu có thể khó khăn, nhưng đây là hoạt động quan trọng nhất để đạt được kết quả tốt. Nó cũng là điều kiện tiên quyết để sử dụng bất kỳ kỹ thuật nâng cao nào trong hướng dẫn này.
- Định nghĩa các thuộc tính bảo mật trong Solidity, để sử dụng với [Echidna](https://github.com/crytic/echidna) và [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Tập trung vào máy trạng thái, kiểm soát truy cập, các phép toán số học, tương tác bên ngoài và sự tuân thủ các tiêu chuẩn của bạn.
- Định nghĩa các thuộc tính bảo mật bằng [API Python của Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Tập trung vào tính kế thừa, sự phụ thuộc của biến, kiểm soát truy cập và các vấn đề cấu trúc khác.
- Chạy các bài kiểm tra thuộc tính của bạn trên mỗi commit với [Crytic](https://crytic.io). Crytic có thể tiếp nhận và đánh giá các bài kiểm tra thuộc tính bảo mật để mọi người trong nhóm của bạn có thể dễ dàng thấy rằng chúng đã vượt qua trên GitHub. Các bài kiểm tra thất bại có thể chặn các commit.

Cuối cùng, hãy lưu ý đến các vấn đề mà các công cụ tự động không thể dễ dàng tìm thấy:

- Thiếu quyền riêng tư: mọi người khác đều có thể nhìn thấy các giao dịch của bạn trong khi chúng đang xếp hàng chờ trong pool
- Các giao dịch chạy trước (front running)
- Các hoạt động mật mã học
- Các tương tác rủi ro với các thành phần tài chính phi tập trung (DeFi) bên ngoài

## Yêu cầu trợ giúp {#ask-for-help}

[Giờ làm việc của Ethereum](https://calendly.com/dan-trailofbits/office-hours) diễn ra vào mỗi chiều thứ Ba. Các phiên 1 kèm 1 kéo dài 1 giờ này là cơ hội để hỏi chúng tôi bất kỳ câu hỏi nào bạn có về bảo mật, khắc phục sự cố bằng các công cụ của chúng tôi và nhận phản hồi từ các chuyên gia về phương pháp hiện tại của bạn. Chúng tôi sẽ giúp bạn hoàn thành hướng dẫn này.

Tham gia Slack của chúng tôi: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Chúng tôi luôn có mặt trong các kênh #crytic và #ethereum nếu bạn có bất kỳ câu hỏi nào.