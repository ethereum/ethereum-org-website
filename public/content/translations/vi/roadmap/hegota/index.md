---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Tìm hiểu về bản nâng cấp giao thức Hegotá"
lang: vi
template: upgrade
---

Hegotá là bản nâng cấp mạng lưới [Ethereum](/) dự kiến sẽ diễn ra sau [Glamsterdam](/roadmap/glamsterdam/). Nó được đặt tên từ sự kết hợp của "Bogotá" (bản nâng cấp lớp thực thi, được đặt theo tên một địa điểm tổ chức Devcon trước đây) và "Heze" (bản nâng cấp lớp đồng thuận, được đặt theo tên một ngôi sao).

Hegotá đang trong giai đoạn lập kế hoạch ban đầu. Tính năng chính của nó đã được chọn và một thay đổi thứ hai cũng đã được lên lịch, nhưng phần còn lại của phạm vi vẫn đang được quyết định và chưa có ngày cụ thể nào được ấn định.

## Tính năng chính: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Danh sách bao gồm bắt buộc theo lựa chọn phân nhánh (Fork-choice enforced inclusion lists - FOCIL, hoặc EIP-7805) là về [khả năng chống kiểm duyệt](/roadmap/security/#censorship-resistance): đảm bảo rằng một giao dịch hợp lệ sẽ được đưa vào một khối ngay cả khi các trình tạo block muốn loại bỏ nó.

Ngày nay, một [trình xác thực](/glossary/#validator) duy nhất sẽ xây dựng mỗi khối và quyết định những giao dịch nào nó chứa. Do đó, bất kỳ ai có thể gây ảnh hưởng đến đủ số lượng trình tạo block đều có thể trì hoãn một giao dịch, và người dùng không có cách nào để can thiệp ngoài việc chờ đợi và hy vọng.

FOCIL phân tán quyết định đó cho nhiều trình xác thực. Một ủy ban sẽ đề xuất một danh sách các giao dịch cần được đưa vào, và các quy tắc của giao thức bắt buộc trình tạo block phải tôn trọng các danh sách đó. Việc kiểm duyệt một giao dịch không còn là điều mà một bên có thể tự mình thực hiện.

## Giao dịch khung {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Giao dịch khung (EIP-8141) cho phép một [tài khoản](/glossary/#account) tự quyết định điều gì được coi là một giao dịch hợp lệ, thay vì giao thức khăng khăng yêu cầu một cơ chế chữ ký cố định.

Ngày nay, mọi giao dịch đều được ủy quyền theo cùng một cách: một chữ ký, từ một khóa. [Tài khoản hợp đồng thông minh](/roadmap/account-abstraction/) giải quyết vấn đề đó bằng cách định tuyến các giao dịch thông qua cơ sở hạ tầng bổ sung, điều này gây tốn Gas và thêm các thành phần phức tạp có thể gặp lỗi.

Một giao dịch khung chuyển việc kiểm tra vào chính tài khoản đó. Tài khoản chạy logic xác minh của riêng nó, vì vậy các khả năng hiện đang cần cơ sở hạ tầng bổ sung đó — khôi phục xã hội, giới hạn chi tiêu, yêu cầu nhiều phê duyệt, cho phép người khác trả Gas — trở thành những thứ mà giao thức hỗ trợ trực tiếp.

Bởi vì tài khoản chọn các quy tắc của riêng mình, nó cũng có thể chọn một cơ chế chữ ký mà máy tính lượng tử không thể phá vỡ. Điều đó làm cho đây trở thành một bước tiến tới [khả năng kháng lượng tử](/roadmap/security/#quantum-resistance) cũng như các ví tốt hơn.

## Còn gì khác trong Hegotá {#scope}

Vẫn chưa được quyết định. FOCIL và giao dịch khung là hai thay đổi được lên lịch cho đến nay; hàng chục đề xuất khác đã được đưa ra và chưa có đề xuất nào được chốt. Trang này sẽ được giữ ngắn gọn cho đến khi phạm vi được xác định rõ ràng — để biết trạng thái hiện tại của cuộc thảo luận, hãy xem các tài nguyên bên dưới.

## Đọc thêm {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota) — trạng thái cập nhật liên tục của mọi đề xuất
- [Hegotá Meta EIP (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Đặc tả kỹ thuật EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Đặc tả kỹ thuật EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Lộ trình Ethereum](/roadmap/)
