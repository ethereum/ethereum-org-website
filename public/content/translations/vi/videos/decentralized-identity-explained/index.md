---
title: "Giải thích về danh tính phi tập trung"
description: "Bài giải thích về cách danh tính phi tập trung cung cấp cho người dùng nhiều quyền kiểm soát hơn đối với danh tính kỹ thuật số của họ và giữ cho thông tin cá nhân trên internet an toàn hơn bằng cách sử dụng thông tin xác thực dựa trên blockchain."
lang: vi
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identity"
format: explainer
author: Microsoft Security
breadcrumb: "Danh tính phi tập trung"
---

Một bài giải thích của **Microsoft Security** về cách danh tính phi tập trung cung cấp cho người dùng nhiều quyền kiểm soát hơn đối với thông tin xác thực kỹ thuật số của họ, bao gồm các vấn đề với các định danh kỹ thuật số hiện tại, cách Thông tin xác thực có thể xác minh (Verifiable Credentials) và Định danh phi tập trung (Decentralized Identifiers) hoạt động, và ý nghĩa của điều này đối với quyền riêng tư trực tuyến.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=Ew-_F-OtDFI) được xuất bản bởi Microsoft Security. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Vấn đề với thông tin xác thực kỹ thuật số (0:02) {#the-problem-with-digital-credentials-002}

Mỗi ngày, chúng ta mang theo những chiếc ví chứa đầy thẻ. Tuy nhiên, chỉ một số ít được chọn — như thẻ căn cước chính phủ và thẻ tín dụng — được chấp nhận rộng rãi. Xã hội của chúng ta đã thiết lập các tiêu chuẩn toàn cầu về cách chúng ta xuất trình và xác minh thông tin xác thực mà những chiếc thẻ vật lý này đại diện. Nhưng không có sự tương đương thực sự nào cho thông tin xác thực kỹ thuật số.

Tại sao không? Đầu tiên, không có cơ chế tiêu chuẩn nào để phát hành thẻ kỹ thuật số. Để phát hành thẻ hoặc thông tin xác thực kỹ thuật số được chấp nhận phổ biến, chúng ta cần các định danh kỹ thuật số mà các cá nhân có thể sở hữu độc lập với bất kỳ thực thể, tổ chức hoặc viện nghiên cứu nào. Hiện tại, chúng ta sử dụng địa chỉ email và số điện thoại làm định danh để truy cập các trang web và ứng dụng. Nhưng quyền truy cập của chúng ta vào các định danh này, và thông tin cá nhân của chúng ta, lại phụ thuộc vào các nhà cung cấp dịch vụ, những người có thể thu hồi chúng bất cứ lúc nào.

Thứ hai, không có tiêu chuẩn nào được chấp nhận phổ biến để thể hiện, trao đổi và xác minh thông tin xác thực kỹ thuật số xuyên suốt các ranh giới tổ chức.

#### Cách danh tính phi tập trung hoạt động (1:03) {#how-decentralized-identity-works-103}

Tất cả điều này sắp thay đổi. Một hình thức danh tính kỹ thuật số mới, dựa trên các tiêu chuẩn mới nổi như Thông tin xác thực có thể xác minh (Verifiable Credentials) và Định danh phi tập trung (Decentralized Identifiers), có thể cho phép thông tin xác thực kỹ thuật số hoạt động ở mọi nơi, đáng tin cậy hơn và tôn trọng quyền riêng tư.

Đây là cách nó hoạt động. Hãy gặp Alice. Chiếc ví kỹ thuật số mới của cô ấy trao quyền cho cô ấy sở hữu và kiểm soát thông tin xác thực. Vì nó không bị ràng buộc với bất kỳ tổ chức nào, các nguồn có thẩm quyền có thể tự tin cấp thông tin xác thực dựa trên tiêu chuẩn cho Alice. Khi Alice xuất trình những thông tin xác thực này, các trang web và ứng dụng có thể kiểm tra xem chúng có hợp lệ hay không — ví dụ: bằng cách xác nhận với một trường đại học rằng cô ấy là sinh viên ở đó — và sau đó cấp quyền truy cập tương ứng.

#### Niềm tin mật mã học (1:51) {#cryptographic-trust-151}

Mặc dù quá trình này có thể dễ dàng hơn, nhưng làm sao chúng ta biết nó đáng tin cậy? Các Định danh phi tập trung tận dụng các hệ thống mật mã học đã được chứng minh. Khi Alice xuất trình thông tin xác thực của mình, ví kỹ thuật số của cô ấy tạo ra một định danh duy nhất và ký nó bằng một khóa riêng tư được bảo mật bằng bằng chứng sinh trắc học hoặc mã PIN mà chỉ cô ấy biết. Khóa công khai được ghép nối duy nhất sẽ được xuất bản lên một sổ cái phân tán.

Alice có thể xuất trình thẻ sinh viên kỹ thuật số của mình cho một hiệu sách, và trước khi cấp chiết khấu, hiệu sách có thể xác nhận rằng trường đại học đã cấp thẻ đó cho Alice.

#### Quyền riêng tư và kiểm soát (2:27) {#privacy-and-control-227}

Trải nghiệm này mô phỏng những gì Alice làm ngày nay. Cô ấy có thể xuất trình và xác thực kỹ thuật số một bộ Thông tin xác thực có thể xác minh giống như cách cô ấy xuất trình một chiếc thẻ vật lý. Và cô ấy có thể thu hồi chúng chỉ bằng một cú nhấp chuột, giống như cách cô ấy cất lại thẻ vào ví của mình.

Tuyệt vời nhất là những chiếc thẻ kỹ thuật số này mang tính riêng tư. Điều này đặt Alice vào quyền kiểm soát duy nhất đối với danh tính kỹ thuật số của mình — cô ấy đưa ra các quyết định cho nó. Thông tin xác thực có thể xác minh sẽ giúp việc duy trì quyền kiểm soát trở nên dễ dàng hơn và giúp mở khóa một mạng internet đáng tin cậy hơn, tôn trọng quyền riêng tư cho tất cả chúng ta.