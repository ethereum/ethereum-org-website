---
title: "Đặt tên cho hợp đồng thông minh"
description: "Các phương pháp hay nhất để đặt tên cho hợp đồng thông minh Ethereum bằng ENS"
lang: vi
---

Hợp đồng thông minh là nền tảng của cơ sở hạ tầng phi tập trung của Ethereum, cho phép các ứng dụng và giao thức tự trị. Nhưng ngay cả khi các khả năng của hợp đồng phát triển, người dùng và nhà phát triển vẫn dựa vào các địa chỉ thập lục phân thô để xác định và tham chiếu các hợp đồng này.

Việc đặt tên cho các hợp đồng thông minh bằng [Dịch vụ Định danh Ethereum (ENS)](https://ens.domains/) giúp cải thiện trải nghiệm người dùng bằng cách loại bỏ các địa chỉ hợp đồng thập lục phân và giảm rủi ro từ các cuộc tấn công như đầu độc địa chỉ và tấn công giả mạo. Hướng dẫn này giải thích tại sao việc đặt tên cho hợp đồng thông minh lại quan trọng, cách thức thực hiện và các công cụ có sẵn như [Enscribe](https://www.enscribe.xyz) để đơn giản hóa quy trình và giúp các nhà phát triển áp dụng phương pháp này.

## Tại sao nên đặt tên cho hợp đồng thông minh? {#why-name-contracts}

### Các định danh mà con người có thể đọc được {#human-readable-identifiers}

Thay vì tương tác với các địa chỉ hợp đồng không rõ ràng như `0x8f8e...f9e3`, các nhà phát triển và người dùng có thể sử dụng các tên mà con người có thể đọc được như `v2.myapp.eth`. Điều này giúp đơn giản hóa các tương tác với hợp đồng thông minh.

Điều này có thể thực hiện được nhờ [Dịch vụ Định danh Ethereum](https://ens.domains/) cung cấp dịch vụ đặt tên phi tập trung cho các địa chỉ Ethereum. Điều này tương tự như cách Dịch vụ Tên Miền (DNS) cho phép người dùng internet truy cập các địa chỉ mạng bằng một tên như ethereum.org thay vì thông qua một địa chỉ IP như `104.18.176.152`.

### Cải thiện bảo mật và độ tin cậy {#improved-security-and-trust}

Các hợp đồng được đặt tên giúp giảm thiểu các giao dịch vô tình đến sai địa chỉ. Chúng cũng giúp người dùng xác định các hợp đồng gắn với các ứng dụng hoặc thương hiệu cụ thể. Điều này bổ sung một lớp tin cậy về mặt danh tiếng, đặc biệt khi các tên được gắn vào các tên miền mẹ nổi tiếng như `uniswap.eth`.

Do độ dài 42 ký tự của địa chỉ Ethereum, người dùng rất khó xác định những thay đổi nhỏ trong địa chỉ, nơi một vài ký tự đã bị sửa đổi. Ví dụ: một địa chỉ như `0x58068646C148E313CB414E85d2Fe89dDc3426870` thường sẽ bị các ứng dụng dành cho người dùng như ví rút gọn thành `0x580...870`. Người dùng khó có thể nhận thấy một địa chỉ độc hại khi một vài ký tự đã bị thay đổi.

Loại kỹ thuật này được sử dụng trong các cuộc tấn công giả mạo và đầu độc địa chỉ, nơi người dùng bị lừa tin rằng họ đang tương tác hoặc gửi tiền đến đúng địa chỉ, trong khi thực tế địa chỉ đó chỉ giống với địa chỉ chính xác nhưng không phải là một.

Tên ENS cho ví và hợp đồng giúp bảo vệ khỏi các loại tấn công này. Giống như các cuộc tấn công giả mạo DNS, các cuộc tấn công giả mạo ENS cũng có thể được che giấu, tuy nhiên, người dùng có nhiều khả năng nhận thấy một lỗi chính tả trong tên ENS hơn là một sửa đổi nhỏ đối với một địa chỉ thập lục phân.

### UX tốt hơn cho ví và trình khám phá {#better-ux}

Khi một hợp đồng thông minh đã được định cấu hình bằng tên ENS, các ứng dụng như ví và trình khám phá chuỗi khối có thể hiển thị tên ENS cho các hợp đồng thông minh, thay vì các địa chỉ thập lục phân. Điều này mang lại sự nâng cao đáng kể về trải nghiệm người dùng (UX) cho người dùng.

Ví dụ: khi tương tác với một ứng dụng như Uniswap, người dùng thường sẽ thấy rằng ứng dụng họ đang tương tác được lưu trữ trên trang web `uniswap.org`, nhưng họ sẽ được hiển thị một địa chỉ hợp đồng thập lục phân nếu Uniswap chưa đặt tên cho các hợp đồng thông minh của họ bằng ENS. Nếu hợp đồng được đặt tên, thay vào đó, họ có thể thấy `v4.contracts.uniswap.eth` hữu ích hơn nhiều.

## Đặt tên tại thời điểm triển khai so với sau khi triển khai {#when-to-name}

Có hai thời điểm có thể đặt tên cho hợp đồng thông minh:

- **Tại thời điểm triển khai**: gán một tên ENS cho hợp đồng khi nó được triển khai.
- **Sau khi triển khai**: ánh xạ một địa chỉ hợp đồng hiện có với một tên ENS mới.

Cả hai phương pháp đều dựa vào việc có quyền sở hữu hoặc quản lý quyền truy cập vào một tên miền ENS để họ có thể tạo và thiết lập các bản ghi ENS.

## Cách hoạt động của việc đặt tên ENS cho các hợp đồng {#how-ens-naming-works}

Các tên ENS được lưu trữ trên chuỗi và phân giải thành các địa chỉ Ethereum thông qua các trình phân giải ENS. Để đặt tên cho một hợp đồng thông minh:

1. Đăng ký hoặc kiểm soát một tên miền ENS mẹ (ví dụ: `myapp.eth`)
2. Tạo một tên miền phụ (ví dụ: `v1.myapp.eth`)
3. Thiết lập bản ghi `địa chỉ` của tên miền phụ thành địa chỉ hợp đồng
4. Thiết lập bản ghi ngược của hợp đồng thành ENS để cho phép tìm thấy tên thông qua địa chỉ của nó

Các tên ENS có cấu trúc phân cấp và hỗ trợ không giới hạn tên phụ. Việc thiết lập các bản ghi này thường bao gồm việc tương tác với sổ đăng ký ENS và các hợp đồng trình phân giải công khai.

## Công cụ để đặt tên cho hợp đồng {#tools}

Có hai phương pháp để đặt tên cho hợp đồng thông minh. Sử dụng [Ứng dụng ENS](https://app.ens.domains) với một số bước thủ công hoặc sử dụng [Enscribe](https://www.enscribe.xyz). Những điều này được nêu dưới đây.

### Thiết lập ENS thủ công {#manual-ens-setup}

Sử dụng [Ứng dụng ENS](https://app.ens.domains/), các nhà phát triển có thể tạo các tên phụ theo cách thủ công và thiết lập các bản ghi địa chỉ chuyển tiếp. Tuy nhiên, họ không thể thiết lập một tên chính cho một hợp đồng thông minh bằng cách thiết lập bản ghi ngược cho tên đó thông qua ứng dụng ENS. Phải thực hiện các bước thủ công được đề cập trong [tài liệu ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) đơn giản hóa việc đặt tên hợp đồng thông minh bằng ENS và nâng cao niềm tin của người dùng vào các hợp đồng thông minh. Nó cung cấp:

- **Triển khai và đặt tên nguyên tử**: Gán một tên ENS khi triển khai một hợp đồng mới
- **Đặt tên sau triển khai**: Gắn tên cho các hợp đồng đã được triển khai
- **Hỗ trợ đa chuỗi**: Hoạt động trên Ethereum và các mạng L2 nơi ENS được hỗ trợ
- **Dữ liệu xác minh hợp đồng**: Bao gồm dữ liệu xác minh hợp đồng được lấy từ nhiều nguồn để tăng cường niềm tin cho người dùng

Enscribe hỗ trợ các tên ENS do người dùng cung cấp hoặc các tên miền riêng của nó nếu người dùng không có tên ENS.

Bạn có thể truy cập [Ứng dụng Enscribe](https://app.enscribe.xyz) để bắt đầu đặt tên và xem các hợp đồng thông minh.

## Các phương pháp tốt nhất {#best-practices}

- **Sử dụng các tên rõ ràng, có phiên bản** như `v1.myapp.eth` để làm cho việc nâng cấp hợp đồng trở nên minh bạch
- **Thiết lập bản ghi ngược** để liên kết hợp đồng với tên ENS nhằm đảm bảo khả năng hiển thị trong các ứng dụng như ví và trình khám phá chuỗi khối.
- **Theo dõi ngày hết hạn một cách chặt chẽ** nếu bạn muốn ngăn chặn những thay đổi vô tình về quyền sở hữu
- **Xác minh nguồn hợp đồng** để người dùng có thể tin tưởng rằng hợp đồng được đặt tên hoạt động như mong đợi

## Rủi ro {#risks}

Việc đặt tên cho các hợp đồng thông minh mang lại những lợi ích đáng kể cho người dùng Ethereum, tuy nhiên, chủ sở hữu các tên miền ENS phải cảnh giác trong việc quản lý chúng. Các rủi ro đáng chú ý bao gồm:

- **Hết hạn**: Giống như tên DNS, việc đăng ký tên ENS có thời hạn hữu hạn. Do đó, điều quan trọng là chủ sở hữu phải theo dõi ngày hết hạn của tên miền và gia hạn chúng trước khi hết hạn. Cả Ứng dụng ENS và Enscribe đều cung cấp các chỉ báo trực quan cho chủ sở hữu tên miền khi sắp đến ngày hết hạn.
- **Thay đổi quyền sở hữu**: Các bản ghi ENS được biểu thị dưới dạng NFT trên Ethereum, trong đó chủ sở hữu của một tên miền `.eth` cụ thể sở hữu NFT được liên kết. Do đó, nếu một tài khoản khác nắm quyền sở hữu NFT này, chủ sở hữu mới có thể sửa đổi bất kỳ bản ghi ENS nào mà họ thấy phù hợp.

Để giảm thiểu những rủi ro đó, tài khoản chủ sở hữu cho các tên miền cấp 2 (2LD) `.eth` nên được bảo mật thông qua ví đa chữ ký với các tên miền phụ được tạo để quản lý việc đặt tên hợp đồng. Bằng cách đó, trong trường hợp có bất kỳ thay đổi quyền sở hữu nào do vô tình hoặc độc hại ở cấp tên miền phụ, chúng có thể bị chủ sở hữu 2LD ghi đè.

## Tương lai của việc đặt tên hợp đồng {#future}

Việc đặt tên hợp đồng đang trở thành một phương pháp hay nhất cho việc phát triển dapp, tương tự như cách tên miền thay thế địa chỉ IP trên web. Khi nhiều cơ sở hạ tầng hơn như ví, trình khám phá và bảng điều khiển tích hợp phân giải ENS cho các hợp đồng, các hợp đồng được đặt tên sẽ cải thiện sự an toàn và giảm lỗi trên toàn hệ sinh thái.

Bằng cách làm cho các hợp đồng thông minh dễ nhận biết và suy luận hơn, việc đặt tên giúp thu hẹp khoảng cách giữa người dùng và ứng dụng trên Ethereum, cải thiện cả sự an toàn và UX cho người dùng.

## Đọc thêm {#further-reading}

- [Đặt tên cho Hợp đồng thông minh bằng ENS](https://docs.ens.domains/web/naming-contracts/)
- [Đặt tên cho Hợp đồng thông minh bằng Enscribe](https://www.enscribe.xyz/docs).
