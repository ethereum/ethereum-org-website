---
title: Cải thiện trải nghiệm người dùng
description: Vẫn là quá phức tạp để phần lớn mọi người sử dụng Ethereum. Để thúc đẩy việc phổ cập, Ethereum cần phải giảm đáng kể những rào cản để tiếp cận - người dùng phải đạt được lợi ích của phi tập trung, không cần cấp quyền và truy cập không kiểm duyệt đến mạng Ethereum nhưng cũng cần dễ sử dụng như dùng một trang web truyền thống.
lang: vi
image: /images/roadmap/roadmap-ux.png
alt: "Lộ trình Ethereum"
template: roadmap
---

**Việc sử dụng Ethereum cần được đơn giản hóa**; từ việc quản lý [khóa](/glossary/#key) và [ví](/glossary/#wallet) cho đến việc khởi tạo giao dịch. Để tạo điều kiện cho việc áp dụng rộng rãi, Ethereum phải tăng đáng kể mức độ dễ sử dụng, cho phép người dùng trải nghiệm quyền truy cập không cần cấp phép và chống kiểm duyệt vào Ethereum với trải nghiệm liền mạch như khi sử dụng các ứng dụng [Web2](/glossary/#web2).

## Vượt xa các cụm từ khởi tạo {#no-more-seed-phrases}

Tài khoản Ethereum được bảo mật bằng một cặp khóa: khóa công khai dùng để nhận diện tài khoản và khóa riêng tư dùng để ký các thông điệp. Khóa riêng tư giống như một mật khẩu tổng — nó cho phép truy cập toàn bộ vào tài khoản Ethereum. Điều này là một cách vận hành khác biệt đối với những người quen với ngân hàng và các ứng dụng Web2, nơi tài khoản thường được quản lý thay cho người dùng. Để cho phép Ethereum có thể đạt được sự phổ cập mà không phụ thuộc vào các bên thứ ba tập trung, cần phải có một cách thức đơn giản, liền mạch để người dùng tự nắm giữ tài sản và kiểm soát dữ liệu của mình, mà không phải hiểu rõ về mật mã khóa công khai – khóa riêng tư hay cách quản lý khóa.

Giải pháp cho vấn đề này là sử dụng các ví [hợp đồng thông minh](/glossary/#smart-contract) để tương tác với Ethereum. Ví hợp đồng thông minh mang lại nhiều khả năng mới: bảo vệ tài khoản khi khóa bị mất hoặc đánh cắp, tăng cường phát hiện và phòng chống gian lận, đồng thời cho phép ví bổ sung thêm các tính năng mới. Mặc dù các ví hợp đồng thông minh đã tồn tại, việc xây dựng vẫn còn bất tiện vì giao thức Ethereum chưa thực sự tối ưu cho chúng. Sự hỗ trợ bổ sung này được gọi là trừu tượng hóa tài khoản.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Thêm thông tin về trừu tượng hóa tài khoản</ButtonLink>

## Nút cho tất cả mọi người

Người dùng chạy [nút](/glossary/#node) không phải tin tưởng các bên thứ ba cung cấp dữ liệu cho họ và họ có thể tương tác nhanh chóng, riêng tư và không cần cấp phép với [chuỗi khối](/glossary/#blockchain) Ethereum. Tuy nhiên, chạy một nút hiện nay cần khá nhiều kiến thức kỹ thuật và không gian lưu trữ lớn, nên nhiều người phải dựa vào bên trung gian thay vì tự làm.

Có một số nâng cấp sẽ giúp việc chạy các nút trở nên dễ dàng hơn nhiều và tốn ít tài nguyên hơn. Cách lưu trữ dữ liệu sẽ được thay đổi để sử dụng một cấu trúc tiết kiệm không gian hơn được gọi là **Cây Verkle**. Ngoài ra, với [tính phi trạng thái](/roadmap/statelessness) hoặc [hết hạn dữ liệu](/roadmap/statelessness/#data-expiry), các nút Ethereum sẽ không cần lưu một bản sao của toàn bộ dữ liệu trạng thái Ethereum, giúp giảm đáng kể yêu cầu về không gian ổ đĩa cứng. [Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients/) sẽ cung cấp nhiều lợi ích của việc chạy một nút đầy đủ nhưng có thể chạy dễ dàng trên điện thoại di động hoặc bên trong các ứng dụng trình duyệt đơn giản.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Tìm hiểu về cây Verkle</ButtonLink>

Với những nâng cấp này, rào cản để chạy một nút gần như được xóa bỏ hoàn toàn. Người dùng sẽ được hưởng lợi từ việc truy cập Ethereum an toàn, không cần cấp phép mà không phải hy sinh dung lượng ổ đĩa hay CPU đáng kể trên máy tính hoặc điện thoại di động, đồng thời không phải phụ thuộc vào bên thứ ba để lấy dữ liệu hay truy cập mạng khi sử dụng các ứng dụng.

## Tiến độ hiện tại {#current-progress}

Hợp đồng thông minh vốn đã khả dụng, tuy vậy thêm những nâng cấp là bắt buộc để làm chúng phi tập trung và mở nhất có thể. EIP-4337 là một đề xuất đã hoàn thiện, không yêu cầu bất kỳ thay đổi nào đối với giao thức của Ethereum. Hợp đồng thông minh chính cần thiết cho EIP-4337 đã được **triển khai vào tháng 3 năm 2023**.

**Tính phi trạng thái hoàn toàn vẫn đang trong giai đoạn nghiên cứu** và có thể sẽ mất vài năm nữa mới được triển khai. Có một số cột mốc trên hành trình tiến tới tính không trạng thái hoàn toàn, bao gồm hết hạn dữ liệu, có thể được triển khai sớm hơn. Các mục khác trong lộ trình, chẳng hạn như [Cây Verkle](/roadmap/verkle-trees/) và [tách biệt người đề xuất-người xây dựng](/roadmap/pbs/), cần được hoàn thành trước.

Mạng thử nghiệm cây Verkle đã sẵn sàng và được chạy lên, và bước tiếp theo sẽ là chạy các máy khách đã kích hoạt cây Verkle ở mạng riêng tư, sau đó tới mạng công khai. Bạn có thể giúp đẩy nhanh quá trình bằng cách triển khai các hợp đồng hoặc chạy các máy khách trên mạng thử nghiệm.
