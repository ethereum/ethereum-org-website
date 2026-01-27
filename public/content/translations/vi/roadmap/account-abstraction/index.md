---
title: Trừu tượng hóa tài khoản
description: Tổng quan về kế hoạch của Ethereum giúp tài khoản người dùng đơn giản và an toàn hơn
lang: vi
summaryPoints:
  - Trừu tượng hóa tài khoản giúp việc xây dựng ví hợp đồng thông minh trở nên dễ dàng hơn
  - Ví hợp đồng thông minh giúp việc quản lý quyền truy cập vào các tài khoản Ethereum trở nên dễ dàng hơn
  - Các khóa bị mất hoặc bị lộ có thể được khôi phục bằng cách sử dụng nhiều bản sao lưu
---

# Trừu tượng hóa tài khoản {#account-abstraction}

Hầu hết người dùng hiện tại tương tác với Ethereum bằng **[tài khoản sở hữu bên ngoài (EOA)](/glossary/#eoa)**. Điều này giới hạn cách mà người dùng có thể tương tác với Ethereum. Ví dụ, điều này khiến việc thực hiện nhiều giao dịch cùng lúc trở nên khó khăn và yêu cầu người dùng luôn phải duy trì một số dư ETH để trả phí giao dịch.

Trừu tượng hóa tài khoản là một cách để giải quyết những vấn đề này bằng cách cho phép người dùng lập trình linh hoạt hơn về bảo mật và trải nghiệm người dùng tốt hơn ngay trong tài khoản của họ. Điều này có thể thực hiện được bằng cách [nâng cấp các EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) để chúng có thể được kiểm soát bởi các hợp đồng thông minh. Cũng có một hướng đi khác liên quan đến việc bổ sung một [hệ thống giao dịch thứ hai, tách biệt](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) để chạy song song với giao thức hiện có. Dù theo hướng nào thì kết quả cuối cùng vẫn là truy cập Ethereum thông qua ví hợp đồng thông minh, có thể được hỗ trợ trực tiếp trong giao thức hiện có hoặc thông qua một mạng lưới giao dịch bổ sung.

Ví hợp đồng thông minh mang lại nhiều lợi ích cho người dùng, bao gồm:

- tự định nghĩa các quy tắc bảo mật linh hoạt của riêng bạn
- khôi phục tài khoản của bạn nếu bạn bị mất khóa
- chia sẻ bảo mật tài khoản của bạn cho nhiều thiết bị hoặc cá nhân đáng tin cậy
- trả phí gas cho người khác, hoặc để người khác trả phí gas cho bạn
- gộp nhiều giao dịch lại với nhau (ví dụ: phê duyệt và thực hiện một lệnh hoán đổi chỉ trong một lần)
- nhiều cơ hội hơn cho các ứng dụng phi tập trung và nhà phát triển ví sáng tạo và thử nghiệm trong trải nghiệm người dùng

Những lợi ích này hiện chưa được hỗ trợ nguyên bản vì chỉ các tài khoản sở hữu bên ngoài ([EOA](/glossary/#eoa)) mới có thể bắt đầu giao dịch. Tài khoản thuộc sở hữu bên ngoài đơn giản chỉ là một cặp khóa công khai – khóa riêng tư. Chúng hoạt động như sau:

- nếu bạn có khóa riêng tư, bạn có thể làm _bất cứ điều gì_ trong phạm vi các quy tắc của Máy ảo Ethereum (EVM)
- nếu bạn không có khóa riêng tư thì bạn _không thể làm gì cả_.

Nếu bạn làm mất khóa thì không thể khôi phục được, và nếu khóa bị đánh cắp thì kẻ trộm sẽ có quyền truy cập ngay lập tức vào toàn bộ số tiền trong tài khoản.

Ví hợp đồng thông minh là giải pháp cho những vấn đề này, nhưng hiện nay chúng rất khó lập trình vì cuối cùng mọi logic mà chúng thực hiện đều phải được chuyển thành một tập hợp các giao dịch tài khoản thuộc sở hữu bên ngoài trước khi có thể được Ethereum xử lý. Trừu tượng hoá tài khoản cho phép hợp đồng thông minh tự khởi tạo giao dịch, nhờ đó bất kỳ logic nào mà người dùng muốn thực hiện đều có thể được lập trình trực tiếp vào ví hợp đồng thông minh và chạy trên Ethereum.

Cuối cùng, trừu tượng hoá tài khoản cải thiện khả năng hỗ trợ cho ví hợp đồng thông minh, giúp chúng dễ xây dựng hơn và an toàn hơn khi sử dụng. Với trừu tượng hoá tài sản, người dùng có thể tận hưởng tất cả lợi ích của Ethereum mà không cần phải hiểu công nghệ nền tảng phía sau.

## Vượt ra ngoài các cụm từ khởi tạo {#beyond-seed-phrases}

Các tài khoản ngày nay được bảo mật bằng khoá riêng tự, được tính toán từ cụm từ khởi tạo. Bất kỳ ai có được cụm từ khởi tạo đều có thể dễ dàng tìm ra khoá riêng tư bảo vệ một tài khoản và truy cập vào toàn bộ tài sản trong đó. Nếu như khoá riêng tư và cụm từ khởi tạo bị mất, tài sản sẽ vĩnh viễn không thể truy cập được. Việc bảo mật các cụm từ khởi tạo là bất tiện, ngay cả với những người dùng thành thạo, và lừa đảo đánh cắp cụm từ khởi tạo là một trong những hình thức lừa đảo phổ biến nhất.

Trừu tượng hoá tài khoản giải quyết vấn đề này bằng cách sử dụng một hợp đồng thông minh để lưu giữ tài sản và cho phép thực hiện giao dịch. Các hợp đồng thông minh có thể bao gồm logic tùy chỉnh được thiết kế để đạt mức bảo mật và khả năng sử dụng tối đa. Người dùng vẫn sử dụng khoá riêng tư để kiểm soát quyền truy cập, nhưng kèm theo các biện pháp an toàn nâng cao.

Ví dụ, có thể thêm các khóa dự phòng vào ví, cho phép thay thế khóa nếu khóa chính bị xâm phạm. Mỗi khóa có thể được bảo vệ theo cách khác nhau hoặc phân phối cho những người đáng tin cậy, giúp tăng cường bảo mật đáng kể. Các quy tắc bổ sung cho ví có thể giảm thiểu thiệt hại khi khóa bị lộ, chẳng hạn như yêu cầu nhiều chữ ký cho các giao dịch giá trị cao hoặc giới hạn giao dịch chỉ với các địa chỉ đáng tin cậy.

## Trải nghiệm người dùng tốt hơn {#better-user-experience}

Trừu tượng hoá tài khoản cải thiện đáng kể trải nghiệm người dùng và bảo mật bằng cách hỗ trợ ví hợp đồng thông minh ngay trên cấp giao thức. Các nhà phát triển có thể tự do sáng tạo, cải thiện việc gộp giao dịch để tăng tốc độ và hiệu quả. Các thao tác hoán đổi đơn giản có thể trở thành các hành động chỉ với một cú nhấp chuột, cải thiện đáng kể tính tiện dụng.

Quản lý phí gas được cải thiện đáng kể. Các ứng dụng có thể trả phí gas cho người dùng hoặc cho phép thanh toán bằng các tiền khác ngoài ETH, loại bỏ việc cần phải duy trì số dư ETH.

## Trừu tượng hoá tài khoản sẽ được triển khai như thế nào? {#how-will-aa-be-implemented}

Hiện tại, việc triển khai ví hợp đồng thông minh còn khó khăn vì chúng dựa vào mã phức tạp để thực hiện các giao dịch cơ bản. Ethereum có thể thay đổi điều này bằng cách cho phép các hợp đồng thông minh tự trực tiếp khởi tạo giao dịch, nhúng logic vào hợp đồng thông minh thay vì phụ thuộc vào các bên trung gian bên ngoài.

### EIP-4337: Trừu tượng hoá tài khoản mà không thay đổi giao thức

EIP-4337 cho phép hỗ trợ ví hợp đồng thông minh một cách trực tiếp mà không cần sửa đổi giao thức cốt lõi của Ethereum. Nó giới thiệu các đối tượng `UserOperation` được các trình xác thực thu thập vào các gói giao dịch, giúp đơn giản hóa việc phát triển ví. Hợp đồng EntryPoint của EIP-4337 đã được triển khai trên Ethereum Mainnet vào ngày 1 tháng 3 năm 2023 và đã hỗ trợ tạo ra hơn 26 triệu ví hợp đồng thông minh và 170 triệu UserOperation.

## Tiến độ hiện tại {#current-progress}

Là một phần của nâng cấp Pectra của Ethereum, EIP-7702 dự kiến sẽ được triển khai vào ngày 7 tháng 5 năm 2025. EIP-4337 đã được áp dụng rộng rãi, [với hơn 26 triệu tài khoản thông minh được triển khai và hơn 170 triệu UserOperation đã được xử lý](https://www.bundlebear.com/erc4337-overview/all).

## Đọc thêm {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Tài liệu EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Tài liệu EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Bảng điều khiển việc áp dụng ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [Bài viết "Con đường đến với Trừu tượng hóa tài khoản" của Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog của Vitalik về ví khôi phục xã hội](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Tổng hợp các tài nguyên về Trừu tượng hóa tài khoản](https://github.com/4337Mafia/awesome-account-abstraction)
