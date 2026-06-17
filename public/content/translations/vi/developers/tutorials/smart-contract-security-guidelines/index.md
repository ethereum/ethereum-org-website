---
title: Hướng dẫn bảo mật hợp đồng thông minh
description: Một danh sách kiểm tra các hướng dẫn bảo mật cần xem xét khi xây dựng dapp của bạn
author: "Trailofbits"
tags: ["solidity", "hợp đồng thông minh", "bảo mật"]
skill: intermediate
breadcrumb: Hướng dẫn bảo mật
lang: vi
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Hãy làm theo các khuyến nghị cấp cao này để xây dựng các hợp đồng thông minh bảo mật hơn.

## Hướng dẫn thiết kế {#design-guidelines}

Thiết kế của hợp đồng nên được thảo luận trước, trước khi viết bất kỳ dòng mã nào.

### Tài liệu và đặc tả {#documentation-and-specifications}

Tài liệu có thể được viết ở các cấp độ khác nhau và nên được cập nhật trong quá trình triển khai các hợp đồng:

- **Mô tả hệ thống bằng ngôn ngữ thông thường**, mô tả những gì các hợp đồng thực hiện và bất kỳ giả định nào về cơ sở mã.
- **Sơ đồ kiến trúc và lược đồ**, bao gồm các tương tác hợp đồng và máy trạng thái của hệ thống. [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) có thể giúp tạo ra các lược đồ này.
- **Tài liệu mã nguồn kỹ lưỡng**, [định dạng NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) có thể được sử dụng cho Solidity.

### Tính toán trên chuỗi so với ngoài chuỗi {#onchain-vs-offchain-computation}

- **Giữ càng nhiều mã ngoài chuỗi càng tốt.** Giữ cho lớp trên chuỗi nhỏ gọn. Tiền xử lý dữ liệu bằng mã ngoài chuỗi theo cách sao cho việc xác minh trên chuỗi trở nên đơn giản. Bạn cần một danh sách đã sắp xếp? Hãy sắp xếp danh sách ngoài chuỗi, sau đó chỉ kiểm tra thứ tự của nó trên chuỗi.

### Khả năng nâng cấp {#upgradeability}

Chúng tôi đã thảo luận về các giải pháp nâng cấp khác nhau trong [bài đăng trên blog của chúng tôi](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Hãy đưa ra lựa chọn có chủ ý về việc có hỗ trợ khả năng nâng cấp hay không trước khi viết bất kỳ mã nào. Quyết định này sẽ ảnh hưởng đến cách bạn cấu trúc mã của mình. Nhìn chung, chúng tôi khuyên bạn:

- **Ưu tiên [di chuyển hợp đồng](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) hơn là khả năng nâng cấp.** Các hệ thống di chuyển có nhiều ưu điểm tương tự như các hệ thống có thể nâng cấp, nhưng không có những nhược điểm của chúng.
- **Sử dụng mẫu phân tách dữ liệu thay vì mẫu delegatecallproxy.** Nếu dự án của bạn có sự phân tách trừu tượng rõ ràng, việc nâng cấp bằng cách sử dụng phân tách dữ liệu sẽ chỉ cần một vài điều chỉnh. Mẫu delegatecallproxy đòi hỏi chuyên môn về EVM và rất dễ xảy ra lỗi.
- **Lập tài liệu cho quy trình di chuyển/nâng cấp trước việc triển khai.** Nếu bạn phải phản ứng dưới áp lực mà không có bất kỳ hướng dẫn nào, bạn sẽ mắc sai lầm. Hãy viết sẵn quy trình cần tuân theo từ trước. Nó nên bao gồm:
  - Các lệnh gọi khởi tạo các hợp đồng mới
  - Nơi lưu trữ các khóa và cách truy cập chúng
  - Cách kiểm tra việc triển khai! Phát triển và thử nghiệm một tập lệnh sau triển khai.

## Hướng dẫn thực hiện {#implementation-guidelines}

**Hướng tới sự đơn giản.** Luôn sử dụng giải pháp đơn giản nhất phù hợp với mục đích của bạn. Bất kỳ thành viên nào trong nhóm của bạn cũng có thể hiểu được giải pháp của bạn.

### Cấu trúc hàm {#function-composition}

Kiến trúc cơ sở mã của bạn nên làm cho mã dễ dàng được xem xét. Tránh các lựa chọn kiến trúc làm giảm khả năng suy luận về tính đúng đắn của nó.

- **Chia nhỏ logic của hệ thống**, thông qua nhiều hợp đồng hoặc bằng cách nhóm các hàm tương tự lại với nhau (ví dụ: xác thực, số học, ...).
- **Viết các hàm nhỏ, với mục đích rõ ràng.** Điều này sẽ tạo điều kiện thuận lợi cho việc xem xét dễ dàng hơn và cho phép thử nghiệm các thành phần riêng lẻ.

### Kế thừa {#inheritance}

- **Giữ cho sự kế thừa có thể quản lý được.** Kế thừa nên được sử dụng để phân chia logic, tuy nhiên, dự án của bạn nên hướng tới việc giảm thiểu độ sâu và độ rộng của cây kế thừa.
- **Sử dụng [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) của Slither để kiểm tra hệ thống phân cấp của các hợp đồng.** Inheritance printer sẽ giúp bạn xem xét quy mô của hệ thống phân cấp.

### Sự kiện {#events}

- **Ghi nhật ký tất cả các hoạt động quan trọng.** Các sự kiện sẽ giúp gỡ lỗi hợp đồng trong quá trình phát triển và giám sát nó sau việc triển khai.

### Tránh các cạm bẫy đã biết {#avoid-known-pitfalls}

- **Nhận thức được các vấn đề bảo mật phổ biến nhất.** Có rất nhiều tài nguyên trực tuyến để tìm hiểu về các vấn đề phổ biến, chẳng hạn như [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/), hoặc [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Lưu ý các phần cảnh báo trong [tài liệu Solidity](https://docs.soliditylang.org/en/latest/).** Các phần cảnh báo sẽ thông báo cho bạn về các hành vi không rõ ràng của ngôn ngữ này.

### Các phần phụ thuộc {#dependencies}

- **Sử dụng các thư viện đã được kiểm tra kỹ lưỡng.** Việc nhập mã từ các thư viện đã được kiểm tra kỹ lưỡng sẽ giảm khả năng bạn viết mã có lỗi. Nếu bạn muốn viết một hợp đồng ERC-20, hãy sử dụng [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Sử dụng trình quản lý phụ thuộc; tránh sao chép và dán mã.** Nếu bạn dựa vào một nguồn bên ngoài, thì bạn phải giữ cho nó luôn được cập nhật với nguồn gốc.

### Thử nghiệm và xác minh {#testing-and-verification}

- **Viết các bài kiểm thử đơn vị kỹ lưỡng.** Một bộ kiểm thử mở rộng là rất quan trọng để xây dựng phần mềm chất lượng cao.
- **Viết các thuộc tính và kiểm tra tùy chỉnh cho [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) và [Manticore](https://github.com/trailofbits/manticore).** Các công cụ tự động sẽ giúp đảm bảo hợp đồng của bạn được bảo mật. Hãy xem lại phần còn lại của hướng dẫn này để tìm hiểu cách viết các kiểm tra và thuộc tính hiệu quả.
- **Sử dụng [crytic.io](https://crytic.io/).** Crytic tích hợp với GitHub, cung cấp quyền truy cập vào các trình phát hiện Slither riêng tư và chạy các kiểm tra thuộc tính tùy chỉnh từ Echidna.

### Solidity {#solidity}

- **Ưu tiên Solidity 0.5 hơn 0.4 và 0.6.** Theo ý kiến của chúng tôi, Solidity 0.5 bảo mật hơn và có các thực tiễn tích hợp tốt hơn so với 0.4. Solidity 0.6 đã được chứng minh là quá không ổn định cho môi trường sản xuất và cần thời gian để hoàn thiện.
- **Sử dụng một bản phát hành ổn định để biên dịch; sử dụng bản phát hành mới nhất để kiểm tra các cảnh báo.** Kiểm tra xem mã của bạn không có vấn đề nào được báo cáo với phiên bản trình biên dịch mới nhất. Tuy nhiên, Solidity có chu kỳ phát hành nhanh và có lịch sử về các lỗi trình biên dịch, vì vậy chúng tôi không khuyến nghị sử dụng phiên bản mới nhất cho việc triển khai (xem [khuyến nghị phiên bản solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) của Slither).
- **Không sử dụng inline assembly.** Assembly đòi hỏi chuyên môn về EVM. Đừng viết mã EVM nếu bạn chưa _nắm vững_ sách vàng.

## Hướng dẫn triển khai {#deployment-guidelines}

Sau khi hợp đồng đã được phát triển và triển khai:

- **Giám sát các hợp đồng của bạn.** Theo dõi các nhật ký và sẵn sàng phản ứng trong trường hợp hợp đồng hoặc ví bị xâm phạm.
- **Thêm thông tin liên hệ của bạn vào [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Danh sách này giúp các bên thứ ba liên hệ với bạn nếu phát hiện ra lỗ hổng bảo mật.
- **Bảo mật ví của những người dùng có đặc quyền.** Làm theo [các phương pháp hay nhất](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) của chúng tôi nếu bạn lưu trữ khóa trong ví phần cứng.
- **Có kế hoạch ứng phó sự cố.** Hãy cân nhắc rằng các hợp đồng thông minh của bạn có thể bị xâm phạm. Ngay cả khi các hợp đồng của bạn không có lỗi, kẻ tấn công vẫn có thể chiếm quyền kiểm soát các khóa của chủ sở hữu hợp đồng.