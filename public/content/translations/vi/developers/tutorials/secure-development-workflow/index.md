---
title: "Danh sách kiểm tra bảo mật hợp đồng thông minh"
description: "Quy trình làm việc được đề xuất để viết các hợp đồng thông minh bảo mật"
author: "Trailofbits"
tags: [ "hợp đồng thông minh", "tính bảo mật", "solidity" ]
skill: intermediate
lang: vi
published: 2020-09-07
source: "Xây dựng những hợp đồng an toàn"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Danh sách kiểm tra phát triển hợp đồng thông minh {#smart-contract-development-checklist}

Đây là một quy trình cấp cao mà chúng tôi khuyên bạn nên tuân theo khi viết các hợp đồng thông minh của mình.

Kiểm tra các vấn đề bảo mật đã biết:

- Xem lại hợp đồng của bạn với [Slither](https://github.com/crytic/slither). Nó có hơn 40 trình phát hiện tích hợp cho các lỗ hổng phổ biến. Chạy nó trên mỗi lần kiểm tra với mã mới và đảm bảo nó nhận được một báo cáo sạch (hoặc sử dụng chế độ phân loại để tắt tiếng các vấn đề nhất định).
- Xem lại hợp đồng của bạn với [Crytic](https://crytic.io/). Nó kiểm tra 50 vấn đề mà Slither không kiểm tra. Crytic cũng có thể giúp nhóm của bạn nắm bắt công việc của nhau, bằng cách dễ dàng hiển thị các vấn đề bảo mật trong các Yêu cầu Phản hồi trên GitHub.

Xem xét các tính năng đặc biệt của hợp đồng của bạn:

- Hợp đồng của bạn có thể nâng cấp được không? Xem lại mã nâng cấp của bạn để tìm lỗi bằng [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) hoặc [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Chúng tôi đã ghi lại 17 cách việc nâng cấp có thể gặp sự cố.
- Hợp đồng của bạn có tuân thủ các ERC không? Kiểm tra chúng bằng [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Công cụ này xác định ngay lập tức các sai lệch so với sáu thông số kỹ thuật phổ biến.
- Bạn có tích hợp với các token của bên thứ ba không? Xem lại [danh sách kiểm tra tích hợp token](/developers/tutorials/token-integration-checklist/) của chúng tôi trước khi dựa vào các hợp đồng bên ngoài.

Kiểm tra trực quan các tính năng bảo mật quan trọng của mã của bạn:

- Xem lại trình in [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) của Slither. Tránh các vấn đề về che khuất ngoài ý muốn và tuyến tính hóa C3.
- Xem lại trình in [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) của Slither. Nó báo cáo khả năng hiển thị của hàm và các kiểm soát truy cập.
- Xem lại trình in [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) của Slither. Nó báo cáo các kiểm soát truy cập trên các biến trạng thái.

Ghi lại các thuộc tính bảo mật quan trọng và sử dụng các trình tạo thử nghiệm tự động để đánh giá chúng:

- Tìm hiểu cách [ghi lại các thuộc tính bảo mật cho mã của bạn](/developers/tutorials/guide-to-smart-contract-security-tools/). Lúc đầu sẽ rất khó khăn, nhưng đây là hoạt động quan trọng nhất để đạt được kết quả tốt. Đây cũng là điều kiện tiên quyết để sử dụng bất kỳ kỹ thuật nâng cao nào trong hướng dẫn này.
- Xác định các thuộc tính bảo mật trong Solidity, để sử dụng với [Echidna](https://github.com/crytic/echidna) và [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Tập trung vào máy trạng thái, kiểm soát truy cập, các phép toán số học, tương tác bên ngoài và sự phù hợp với các tiêu chuẩn.
- Xác định các thuộc tính bảo mật bằng [Giao diện Lập trình Ứng dụng Python của Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Tập trung vào tính kế thừa, các phụ thuộc biến, kiểm soát truy cập và các vấn đề cấu trúc khác.
- Chạy các bài kiểm tra thuộc tính của bạn trên mỗi lần commit với [Crytic](https://crytic.io). Crytic có thể sử dụng và đánh giá các bài kiểm tra thuộc tính bảo mật để mọi người trong nhóm của bạn có thể dễ dàng thấy rằng chúng đã vượt qua trên GitHub. Các bài kiểm tra không thành công có thể chặn các lần commit.

Cuối cùng, hãy lưu ý đến các vấn đề mà các công cụ tự động không thể dễ dàng tìm thấy:

- Thiếu sự riêng tư: mọi người khác có thể thấy các giao dịch của bạn khi chúng đang được xếp hàng trong pool
- Chạy trước các giao dịch
- Các hoạt động mật mã
- Các tương tác rủi ro với các thành phần DeFi bên ngoài

## Yêu cầu trợ giúp {#ask-for-help}

[Giờ hành chính của Ethereum](https://calendly.com/dan-trailofbits/office-hours) diễn ra vào mỗi chiều thứ Ba. Các phiên 1-1, kéo dài 1 giờ này là cơ hội để bạn hỏi chúng tôi bất kỳ câu hỏi nào về bảo mật, khắc phục sự cố khi sử dụng các công cụ của chúng tôi và nhận phản hồi từ các chuyên gia về phương pháp tiếp cận hiện tại của bạn. Chúng tôi sẽ giúp bạn làm theo hướng dẫn này.

Tham gia Slack của chúng tôi: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Chúng tôi luôn sẵn sàng trong các kênh #crytic và #ethereum nếu bạn có bất kỳ câu hỏi nào.
