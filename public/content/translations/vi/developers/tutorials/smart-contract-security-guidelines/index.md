---
title: "Các nguyên tắc bảo mật hợp đồng thông minh"
description: "Danh sách kiểm tra các nguyên tắc bảo mật cần xem xét khi xây dựng ứng dụng phi tập trung của bạn"
author: "Trailofbits"
tags: [ "solidity", "hợp đồng thông minh", "tính bảo mật" ]
skill: intermediate
lang: vi
published: 2020-09-06
source: "Xây dựng những hợp đồng an toàn"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Làm theo các khuyến nghị cấp cao này để xây dựng các hợp đồng thông minh bảo mật hơn.

## Nguyên tắc thiết kế {#design-guidelines}

Thiết kế của hợp đồng nên được thảo luận trước, trước khi viết bất kỳ dòng mã nào.

### Tài liệu và thông số kỹ thuật {#documentation-and-specifications}

Tài liệu có thể được viết ở các cấp độ khác nhau và nên được cập nhật trong khi triển khai các hợp đồng:

- **Mô tả hệ thống bằng tiếng Anh đơn giản**, mô tả những gì hợp đồng thực hiện và bất kỳ giả định nào về cơ sở mã.
- **Sơ đồ và biểu đồ kiến trúc**, bao gồm các tương tác hợp đồng và máy trạng thái của hệ thống. [Các trình in của Slither](https://github.com/crytic/slither/wiki/Printer-documentation) có thể giúp tạo ra các sơ đồ này.
- **Tài liệu mã kỹ lưỡng**, [định dạng Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) có thể được sử dụng cho Solidity.

### Tính toán trên chuỗi và ngoài chuỗi {#onchain-vs-offchain-computation}

- **Giữ càng nhiều mã ngoài chuỗi càng tốt.** Giữ cho lớp trên chuỗi nhỏ. Xử lý trước dữ liệu bằng mã ngoài chuỗi sao cho việc xác minh trên chuỗi trở nên đơn giản. Bạn có cần một danh sách có thứ tự không? Sắp xếp danh sách ngoài chuỗi, sau đó chỉ kiểm tra thứ tự của nó trên chuỗi.

### Khả năng nâng cấp {#upgradeability}

Chúng tôi đã thảo luận về các giải pháp khả năng nâng cấp khác nhau trong [bài đăng trên blog của chúng tôi](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Hãy đưa ra lựa chọn có chủ ý về việc có hỗ trợ khả năng nâng cấp hay không trước khi viết bất kỳ mã nào. Quyết định này sẽ ảnh hưởng đến cách bạn cấu trúc mã của mình. Nói chung, chúng tôi khuyên bạn nên:

- **Ưu tiên [di chuyển hợp đồng](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) hơn khả năng nâng cấp.** Các hệ thống di chuyển có nhiều ưu điểm tương tự như các hệ thống có thể nâng cấp, mà không có nhược điểm của chúng.
- **Sử dụng mẫu tách dữ liệu thay vì mẫu delegatecallproxy.** Nếu dự án của bạn có sự tách biệt trừu tượng rõ ràng, khả năng nâng cấp bằng cách tách dữ liệu sẽ chỉ cần một vài điều chỉnh. Delegatecallproxy đòi hỏi chuyên môn về Máy chủ ảo Ethereum và rất dễ xảy ra lỗi.
- **Ghi lại quy trình di chuyển/nâng cấp trước khi triển khai.** Nếu bạn phải phản ứng trong tình trạng căng thẳng mà không có bất kỳ hướng dẫn nào, bạn sẽ mắc sai lầm. Viết trước quy trình cần tuân theo. Nó nên bao gồm:
  - Các lệnh gọi khởi tạo các hợp đồng mới
  - Nơi lưu trữ các khóa và cách truy cập chúng
  - Cách kiểm tra việc triển khai! Phát triển và kiểm tra một tập lệnh sau triển khai.

## Nguyên tắc triển khai {#implementation-guidelines}

**Phấn đấu cho sự đơn giản.** Luôn sử dụng giải pháp đơn giản nhất phù hợp với mục đích của bạn. Bất kỳ thành viên nào trong nhóm của bạn cũng có thể hiểu được giải pháp của bạn.

### Thành phần hàm {#function-composition}

Kiến trúc của cơ sở mã nên giúp mã của bạn dễ dàng xem xét. Tránh các lựa chọn kiến trúc làm giảm khả năng suy luận về tính đúng đắn của nó.

- **Phân chia logic của hệ thống**, thông qua nhiều hợp đồng hoặc bằng cách nhóm các hàm tương tự lại với nhau (ví dụ: xác thực, số học, ...).
- **Viết các hàm nhỏ, có mục đích rõ ràng.** Điều này sẽ tạo điều kiện thuận lợi cho việc xem xét dễ dàng hơn và cho phép thử nghiệm các thành phần riêng lẻ.

### Kế thừa {#inheritance}

- **Giữ cho việc kế thừa có thể quản lý được.** Kế thừa nên được sử dụng để phân chia logic, tuy nhiên, dự án của bạn nên hướng tới việc giảm thiểu độ sâu và độ rộng của cây kế thừa.
- **Sử dụng [trình in kế thừa] của Slither(https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) để kiểm tra hệ thống phân cấp của hợp đồng.** Trình in kế thừa sẽ giúp bạn xem lại kích thước của hệ thống phân cấp.

### Sự kiện {#events}

- **Ghi nhật ký tất cả các hoạt động quan trọng.** Các sự kiện sẽ giúp gỡ lỗi hợp đồng trong quá trình phát triển, và giám sát nó sau khi triển khai.

### Tránh các cạm bẫy đã biết {#avoid-known-pitfalls}

- **Hãy nhận biết các vấn đề bảo mật phổ biến nhất.** Có nhiều tài nguyên trực tuyến để tìm hiểu về các vấn đề phổ biến, chẳng hạn như [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), hoặc [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Hãy chú ý đến các phần cảnh báo trong [tài liệu tham khảo của Solidity](https://docs.soliditylang.org/en/latest/).** Các phần cảnh báo sẽ thông báo cho bạn về hành vi không rõ ràng của ngôn ngữ.

### Các phần phụ thuộc {#dependencies}

- **Sử dụng các thư viện đã được kiểm tra kỹ lưỡng.** Nhập mã từ các thư viện đã được kiểm tra kỹ lưỡng sẽ làm giảm khả năng bạn viết mã có lỗi. Nếu bạn muốn viết một hợp đồng ERC20, hãy sử dụng [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Sử dụng trình quản lý phụ thuộc; tránh sao chép-dán mã.** Nếu bạn dựa vào một nguồn bên ngoài, thì bạn phải giữ cho nó được cập nhật với nguồn gốc.

### Kiểm tra và xác minh {#testing-and-verification}

- **Viết các bài kiểm tra đơn vị kỹ lưỡng.** Một bộ thử nghiệm sâu rộng là rất quan trọng để xây dựng phần mềm chất lượng cao.
- **Viết các kiểm tra và thuộc tính tùy chỉnh cho [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) và [Manticore](https://github.com/trailofbits/manticore).** Các công cụ tự động sẽ giúp đảm bảo hợp đồng của bạn được bảo mật. Xem lại phần còn lại của hướng dẫn này để tìm hiểu cách viết các kiểm tra và thuộc tính hiệu quả.
- **Sử dụng [crytic.io](https://crytic.io/).** Crytic tích hợp với GitHub, cung cấp quyền truy cập vào các trình phát hiện Slither riêng tư, và chạy các kiểm tra thuộc tính tùy chỉnh từ Echidna.

### Solidity {#solidity}

- **Ưu tiên Solidity 0.5 hơn 0.4 và 0.6.** Theo chúng tôi, Solidity 0.5 bảo mật hơn và có các phương pháp thực hành tích hợp sẵn tốt hơn so với 0.4. Solidity 0.6 đã tỏ ra quá không ổn định để sản xuất và cần thời gian để hoàn thiện.
- **Sử dụng một bản phát hành ổn định để biên dịch; sử dụng bản phát hành mới nhất để kiểm tra cảnh báo.** Kiểm tra xem mã của bạn không có vấn đề nào được báo cáo với phiên bản trình biên dịch mới nhất. Tuy nhiên, Solidity có chu kỳ phát hành nhanh và có tiền sử về lỗi trình biên dịch, vì vậy chúng tôi không khuyến nghị phiên bản mới nhất để triển khai (xem [khuyến nghị về phiên bản solc của Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Không sử dụng hợp ngữ nội tuyến.** Hợp ngữ đòi hỏi chuyên môn về Máy chủ ảo Ethereum. Đừng viết mã EVM nếu bạn chưa _nắm vững_ sách vàng.

## Nguyên tắc triển khai {#deployment-guidelines}

Sau khi hợp đồng đã được phát triển và triển khai:

- **Giám sát hợp đồng của bạn.** Theo dõi nhật ký, và sẵn sàng phản ứng trong trường hợp hợp đồng hoặc ví bị xâm phạm.
- **Thêm thông tin liên hệ của bạn vào [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Danh sách này giúp các bên thứ ba liên hệ với bạn nếu một lỗ hổng bảo mật được phát hiện.
- **Bảo mật ví của người dùng có đặc quyền.** Làm theo các [phương pháp hay nhất của chúng tôi](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) nếu bạn lưu trữ khóa trong ví phần cứng.
- **Có một kế hoạch ứng phó sự cố.** Hãy cân nhắc rằng các hợp đồng thông minh của bạn có thể bị xâm phạm. Ngay cả khi hợp đồng của bạn không có lỗi, kẻ tấn công có thể kiểm soát các khóa của chủ sở hữu hợp đồng.
