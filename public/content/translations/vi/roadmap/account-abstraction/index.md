---
title: Trừu tượng hóa tài khoản
description: Tổng quan về các kế hoạch của Ethereum nhằm làm cho tài khoản người dùng trở nên đơn giản và an toàn hơn
lang: vi
summaryPoints:
  - Trừu tượng hóa tài khoản giúp việc xây dựng các ví hợp đồng thông minh trở nên dễ dàng hơn nhiều
  - Các ví hợp đồng thông minh giúp việc quản lý quyền truy cập vào các tài khoản Ethereum trở nên dễ dàng hơn nhiều
  - Các khóa bị mất và bị lộ có thể được khôi phục bằng cách sử dụng nhiều bản sao lưu
---

Hầu hết người dùng hiện tại tương tác với [Ethereum](/) bằng cách sử dụng **[tài khoản thuộc sở hữu bên ngoài (EOA)](/glossary/#eoa)**. Điều này giới hạn cách người dùng có thể tương tác với Ethereum. Ví dụ: nó gây khó khăn cho việc thực hiện các lô giao dịch và yêu cầu người dùng luôn phải giữ số dư ETH để trả phí giao dịch.

Trừu tượng hóa tài khoản là một cách để giải quyết những vấn đề này bằng cách cho phép người dùng lập trình linh hoạt hơn về bảo mật và trải nghiệm người dùng tốt hơn vào tài khoản của họ. Điều này có thể xảy ra bằng cách [nâng cấp các EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) để chúng có thể được kiểm soát bởi các hợp đồng thông minh. Cũng có một con đường khác liên quan đến việc thêm một [hệ thống giao dịch thứ hai, riêng biệt](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) để chạy song song với giao thức hiện tại. Bất kể theo con đường nào, kết quả là quyền truy cập vào Ethereum thông qua các ví hợp đồng thông minh, được hỗ trợ nguyên bản như một phần của giao thức hiện tại hoặc thông qua một mạng lưới giao dịch bổ sung.

Các ví hợp đồng thông minh mở ra nhiều lợi ích cho người dùng, bao gồm:

- xác định các quy tắc bảo mật linh hoạt của riêng bạn
- khôi phục tài khoản của bạn nếu bạn làm mất khóa
- chia sẻ bảo mật tài khoản của bạn trên các thiết bị hoặc cá nhân đáng tin cậy
- trả gas cho người khác, hoặc nhờ người khác trả gas cho bạn
- gộp các giao dịch lại với nhau (ví dụ: chấp thuận và thực hiện một giao dịch hoán đổi trong một lần)
- thêm nhiều cơ hội cho các ứng dụng phi tập trung (dapp) và các nhà phát triển ví để đổi mới trải nghiệm người dùng

Những lợi ích này hiện không được hỗ trợ nguyên bản vì chỉ có các tài khoản thuộc sở hữu bên ngoài ([EOA](/glossary/#eoa)) mới có thể bắt đầu các giao dịch. Các EOA đơn giản chỉ là các cặp khóa công khai-riêng tư. Chúng hoạt động như sau:

- nếu bạn có khóa riêng tư, bạn có thể làm _bất cứ điều gì_ trong phạm vi các quy tắc của Máy ảo Ethereum (EVM)
- nếu bạn không có khóa riêng tư, bạn _không thể làm gì cả_.

Nếu bạn làm mất khóa, chúng không thể được khôi phục và các khóa bị đánh cắp sẽ cung cấp cho kẻ trộm quyền truy cập ngay lập tức vào tất cả các khoản tiền trong một tài khoản.

Các ví hợp đồng thông minh là giải pháp cho những vấn đề này, nhưng hiện nay chúng rất khó lập trình vì cuối cùng, bất kỳ logic nào chúng triển khai đều phải được dịch thành một tập hợp các giao dịch EOA trước khi chúng có thể được xử lý bởi Ethereum. Trừu tượng hóa tài khoản cho phép các hợp đồng thông minh tự khởi tạo các giao dịch, do đó bất kỳ logic nào mà người dùng muốn triển khai đều có thể được mã hóa vào chính ví hợp đồng thông minh và được thực thi trên Ethereum.

Cuối cùng, trừu tượng hóa tài khoản cải thiện sự hỗ trợ cho các ví hợp đồng thông minh, giúp chúng dễ xây dựng hơn và an toàn hơn khi sử dụng. Với trừu tượng hóa tài khoản, người dùng có thể tận hưởng tất cả các lợi ích của Ethereum mà không cần phải hiểu công nghệ cơ bản.

## Vượt ra ngoài các cụm từ hạt giống {#beyond-seed-phrases}

Các tài khoản ngày nay được bảo mật bằng cách sử dụng các khóa riêng tư được tính toán từ các cụm từ hạt giống. Bất kỳ ai có quyền truy cập vào một cụm từ hạt giống đều có thể dễ dàng khám phá ra khóa riêng tư bảo vệ một tài khoản và giành quyền truy cập vào tất cả các tài sản mà nó bảo vệ. Nếu một khóa riêng tư và cụm từ hạt giống bị mất, các tài sản đó sẽ vĩnh viễn không thể truy cập được. Việc bảo mật các cụm từ hạt giống này rất bất tiện, ngay cả đối với những người dùng chuyên gia, và lừa đảo cụm từ hạt giống là một trong những trò lừa đảo phổ biến nhất.

Trừu tượng hóa tài khoản giải quyết vấn đề này bằng cách sử dụng một hợp đồng thông minh để nắm giữ tài sản và ủy quyền cho các giao dịch. Các hợp đồng thông minh có thể bao gồm logic tùy chỉnh được điều chỉnh để đạt được tính bảo mật và khả năng sử dụng tối đa. Người dùng vẫn sử dụng các khóa riêng tư để kiểm soát quyền truy cập, nhưng với các biện pháp an toàn được tăng cường.

Ví dụ: các khóa dự phòng có thể được thêm vào một ví, cho phép thay thế khóa nếu khóa chính bị xâm phạm. Mỗi khóa có thể được bảo mật theo cách khác nhau hoặc được phân phối cho các cá nhân đáng tin cậy, làm tăng đáng kể tính bảo mật. Các quy tắc ví bổ sung có thể giảm thiểu thiệt hại do lộ khóa, chẳng hạn như yêu cầu nhiều chữ ký cho các giao dịch có giá trị cao hoặc hạn chế các giao dịch đối với các địa chỉ đáng tin cậy.

## Trải nghiệm người dùng tốt hơn {#better-user-experience}

Trừu tượng hóa tài khoản nâng cao đáng kể trải nghiệm người dùng và tính bảo mật bằng cách hỗ trợ các ví hợp đồng thông minh ở cấp độ giao thức. Các nhà phát triển có thể tự do đổi mới, cải thiện việc gộp giao dịch để đạt được tốc độ và hiệu quả. Các giao dịch hoán đổi đơn giản có thể trở thành các thao tác chỉ với một cú nhấp chuột, cải thiện đáng kể tính dễ sử dụng.

Việc quản lý gas được cải thiện đáng kể. Các ứng dụng có thể trả phí gas cho người dùng hoặc cho phép thanh toán bằng các token khác ngoài ETH, loại bỏ nhu cầu duy trì số dư ETH.

## Trừu tượng hóa tài khoản sẽ được triển khai như thế nào? {#how-will-aa-be-implemented}

Hiện tại, các ví hợp đồng thông minh rất khó triển khai vì chúng dựa vào mã phức tạp bao bọc các giao dịch tiêu chuẩn. Ethereum có thể thay đổi điều này bằng cách cho phép các hợp đồng thông minh trực tiếp khởi tạo các giao dịch, nhúng logic vào các hợp đồng thông minh Ethereum thay vì dựa vào các trình chuyển tiếp bên ngoài.

### EIP-4337: Trừu tượng hóa tài khoản không cần thay đổi giao thức {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337 cho phép hỗ trợ ví hợp đồng thông minh nguyên bản mà không cần sửa đổi giao thức cốt lõi của Ethereum. Nó giới thiệu các đối tượng `UserOperation` được thu thập thành các lô giao dịch bởi các trình xác thực, đơn giản hóa việc phát triển ví. Hợp đồng EntryPoint của EIP-4337 đã được triển khai trên Mạng chính Ethereum vào ngày 1 tháng 3 năm 2023 và đã tạo điều kiện cho việc tạo ra hơn 26 triệu ví thông minh và 170 triệu UserOperations.

## Tiến độ hiện tại {#current-progress}

Là một phần của bản nâng cấp Pectra của Ethereum, EIP-7702 được lên lịch vào ngày 7 tháng 5 năm 2025. EIP-4337 đã được áp dụng rộng rãi, [với hơn 26 triệu tài khoản thông minh được triển khai và hơn 170 triệu UserOperations được xử lý](https://www.bundlebear.com/erc4337-overview/all).

## Đọc thêm {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Tài liệu về EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Tài liệu về EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Bảng điều khiển áp dụng ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Con đường đến với Trừu tượng hóa tài khoản" của Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog của Vitalik về các ví khôi phục xã hội](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)