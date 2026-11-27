---
title: "Danh sách kiểm tra bảo mật hợp đồng thông minh"
description: "Quy trình làm việc được đề xuất để viết các hợp đồng thông minh bảo mật"
author: "Trailofbits"
tags: ["hợp đồng thông minh", "bảo mật", "Solidity"]
skill: intermediate
breadcrumb: "Danh sách kiểm tra bảo mật"
lang: vi
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Danh sách kiểm tra phát triển hợp đồng thông minh {#smart-contract-development-checklist}

Dưới đây là quy trình tổng quan mà chúng tôi khuyên bạn nên tuân theo trong khi viết các hợp đồng thông minh của mình.

Kiểm tra các vấn đề bảo mật đã biết:

- Đánh giá các hợp đồng của bạn bằng [Slither](https://github.com/crytic/slither). Công cụ này có hơn 100 bộ phát hiện tích hợp sẵn cho các lỗ hổng phổ biến. Hãy chạy nó trên mỗi lần check-in với mã mới và đảm bảo nhận được một báo cáo sạch (hoặc sử dụng chế độ phân loại để ẩn đi một số vấn đề nhất định).
- Chạy Slither trong CI, ví dụ với [slither-action](https://github.com/crytic/slither-action) trên GitHub, để các vấn đề bảo mật hiển thị trong các pull request.

Xem xét các tính năng đặc biệt của hợp đồng của bạn:

- Các hợp đồng của bạn có thể nâng cấp được không? Hãy đánh giá mã nâng cấp của bạn để tìm các lỗi với [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). Chúng tôi đã ghi lại 17 cách mà các bản nâng cấp có thể gặp sự cố.
- Các hợp đồng của bạn có nhằm mục đích tuân thủ các ERC không? Hãy kiểm tra chúng bằng [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Công cụ này ngay lập tức xác định các sai lệch so với sáu thông số kỹ thuật phổ biến.
- Bạn có tích hợp với các token của bên thứ 3 không? Hãy xem lại [danh sách kiểm tra tích hợp token](/developers/tutorials/token-integration-checklist/) của chúng tôi trước khi phụ thuộc vào các hợp đồng bên ngoài.

Kiểm tra trực quan các tính năng bảo mật quan trọng trong mã của bạn:

- Xem xét công cụ in [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) của Slither. Tránh các vấn đề che khuất (shadowing) vô ý và tuyến tính hóa C3.
- Xem xét công cụ in [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) của Slither. Nó báo cáo khả năng hiển thị của hàm và các kiểm soát truy cập.
- Xem xét công cụ in [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) của Slither. Nó báo cáo các kiểm soát truy cập trên các biến trạng thái.

Ghi chép lại các thuộc tính bảo mật quan trọng và sử dụng các trình tạo bài kiểm tra tự động để đánh giá chúng:

- Học cách [ghi chép các thuộc tính bảo mật cho mã của bạn](/developers/tutorials/guide-to-smart-contract-security-tools/). Ban đầu có thể khó khăn, nhưng đây là hoạt động quan trọng nhất để đạt được kết quả tốt. Nó cũng là điều kiện tiên quyết để sử dụng bất kỳ kỹ thuật nâng cao nào trong hướng dẫn này.
- Định nghĩa các thuộc tính bảo mật trong Solidity, để sử dụng với các công cụ fuzzer như [Echidna](https://github.com/crytic/echidna) và [Medusa](https://github.com/crytic/medusa), và với các công cụ thực thi tượng trưng như [hevm](https://hevm.dev/). Tập trung vào máy trạng thái, kiểm soát truy cập, các phép toán số học, tương tác bên ngoài và sự tuân thủ tiêu chuẩn của bạn.
- Định nghĩa các thuộc tính bảo mật bằng [API Python của Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Tập trung vào tính kế thừa, sự phụ thuộc của biến, kiểm soát truy cập và các vấn đề cấu trúc khác.
- Chạy các bài kiểm tra thuộc tính của bạn trên mỗi commit trong CI (ví dụ: GitHub Actions) để mọi người trong nhóm của bạn có thể dễ dàng thấy rằng chúng đã vượt qua. Các bài kiểm tra thất bại có thể chặn việc hợp nhất.

Cuối cùng, hãy lưu ý đến các vấn đề mà các công cụ tự động không thể dễ dàng tìm thấy:

- Thiếu quyền riêng tư: mọi người khác đều có thể thấy các giao dịch của bạn trong khi chúng đang xếp hàng trong pool
- Các giao dịch chạy trước (front running)
- Các hoạt động mật mã học
- Các tương tác rủi ro với các thành phần DeFi bên ngoài

## Yêu cầu trợ giúp {#ask-for-help}

[Giờ làm việc của Ethereum](https://meetings.hubspot.com/trailofbits/office-hours) diễn ra vào mỗi chiều thứ Ba. Các phiên 1 kèm 1 kéo dài 1 giờ này là cơ hội để hỏi chúng tôi bất kỳ câu hỏi nào bạn có về bảo mật, khắc phục sự cố bằng các công cụ của chúng tôi và nhận phản hồi từ các chuyên gia về phương pháp hiện tại của bạn. Chúng tôi sẽ giúp bạn hoàn thành hướng dẫn này.

Tham gia Slack của chúng tôi: [Empire Hacking](https://slack.empirehacking.nyc/). Chúng tôi luôn có mặt trong các kênh #crytic và #ethereum nếu bạn có bất kỳ câu hỏi nào.
