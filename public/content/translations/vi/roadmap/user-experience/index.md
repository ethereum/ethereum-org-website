---
title: "Cải thiện trải nghiệm người dùng"
description: "Việc sử dụng Ethereum vẫn còn quá phức tạp đối với hầu hết mọi người. Để khuyến khích sự chấp nhận rộng rãi, Ethereum phải giảm đáng kể rào cản gia nhập - người dùng phải nhận được những lợi ích của việc truy cập phi tập trung, không cần cấp phép và chống kiểm duyệt vào Ethereum nhưng nó phải trơn tru như việc sử dụng một ứng dụng Web2 truyền thống."
lang: vi
image: /images/roadmap/roadmap-ux.png
alt: "Lộ trình Ethereum"
template: roadmap
---

**Việc sử dụng Ethereum cần được đơn giản hóa**; từ việc quản lý [khóa](/glossary/#key) và [ví](/glossary/#wallet) cho đến việc khởi tạo giao dịch. Để tạo điều kiện cho sự chấp nhận rộng rãi, Ethereum phải tăng đáng kể tính dễ sử dụng, cho phép người dùng trải nghiệm quyền truy cập không cần cấp phép và chống kiểm duyệt vào Ethereum với trải nghiệm trơn tru như khi sử dụng các ứng dụng [Web2](/glossary/#web2).

## Vượt ra ngoài các cụm từ hạt giống {#no-more-seed-phrases}

Các tài khoản Ethereum được bảo vệ bởi một cặp khóa dùng để xác định tài khoản (khóa công khai) và ký các tin nhắn (khóa riêng tư). Khóa riêng tư giống như một mật khẩu chính; nó cho phép truy cập hoàn toàn vào một tài khoản Ethereum. Đây là một cách thức hoạt động khác biệt đối với những người đã quen thuộc hơn với các ngân hàng và ứng dụng Web2, vốn quản lý tài khoản thay cho người dùng. Để Ethereum đạt được sự chấp nhận rộng rãi mà không phải phụ thuộc vào các bên thứ ba tập trung, cần phải có một cách thức đơn giản, trơn tru để người dùng tự lưu ký tài sản của họ và giữ quyền kiểm soát dữ liệu của mình mà không cần phải hiểu về mật mã học khóa công khai-khóa riêng tư và quản lý khóa.

Giải pháp cho vấn đề này là sử dụng các ví [hợp đồng thông minh](/glossary/#smart-contract) để tương tác với Ethereum. Các ví hợp đồng thông minh tạo ra những cách thức để bảo vệ tài khoản nếu khóa bị mất hoặc bị đánh cắp, mang lại cơ hội phát hiện và phòng thủ gian lận tốt hơn, đồng thời cho phép các ví có thêm chức năng mới. Mặc dù các ví hợp đồng thông minh đã tồn tại ngày nay, nhưng chúng rất khó để xây dựng vì giao thức Ethereum cần hỗ trợ chúng tốt hơn. Sự hỗ trợ bổ sung này được gọi là trừu tượng hóa tài khoản.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Tìm hiểu thêm về trừu tượng hóa tài khoản</ButtonLink>

## Nút cho mọi người {#nodes-for-everyone}

Người dùng chạy các [nút](/glossary/#node) không cần phải tin tưởng các bên thứ ba để cung cấp dữ liệu cho họ, và họ có thể tương tác một cách nhanh chóng, riêng tư và không cần cấp phép với [chuỗi khối](/glossary/#blockchain) Ethereum. Tuy nhiên, việc chạy một nút hiện tại yêu cầu kiến thức kỹ thuật và dung lượng ổ đĩa đáng kể, điều này có nghĩa là nhiều người thay vào đó phải tin tưởng các bên trung gian.

Có một số bản nâng cấp sẽ giúp việc chạy các nút trở nên dễ dàng hơn nhiều và ít tốn kém tài nguyên hơn nhiều. Cách thức lưu trữ dữ liệu sẽ được thay đổi để sử dụng một cấu trúc tiết kiệm không gian hơn được gọi là **cây Verkle**. Ngoài ra, với [tính phi trạng thái](/roadmap/statelessness) hoặc [hết hạn dữ liệu](/roadmap/statelessness/#data-expiry), các nút Ethereum sẽ không cần phải lưu trữ một bản sao của toàn bộ dữ liệu trạng thái Ethereum, giúp giảm đáng kể yêu cầu về dung lượng ổ cứng. [Các nút nhẹ](/developers/docs/nodes-and-clients/light-clients/) sẽ cung cấp nhiều lợi ích của việc chạy một nút đầy đủ nhưng có thể chạy dễ dàng trên điện thoại di động hoặc bên trong các ứng dụng trình duyệt đơn giản.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Đọc về cây Verkle</ButtonLink>

Với những bản nâng cấp này, rào cản đối với việc chạy một nút được giảm xuống gần như bằng không. Người dùng sẽ được hưởng lợi từ quyền truy cập an toàn, không cần cấp phép vào Ethereum mà không phải hy sinh dung lượng ổ đĩa hoặc CPU đáng kể trên máy tính hoặc điện thoại di động của họ, và sẽ không phải phụ thuộc vào các bên thứ ba về dữ liệu hoặc quyền truy cập mạng lưới khi họ sử dụng các ứng dụng.

## Tiến độ hiện tại {#current-progress}

Các ví hợp đồng thông minh đã có sẵn, nhưng cần có thêm nhiều bản nâng cấp để làm cho chúng trở nên phi tập trung và không cần cấp phép nhất có thể. EIP-4337 là một đề xuất hoàn thiện không yêu cầu bất kỳ thay đổi nào đối với giao thức của Ethereum. Hợp đồng thông minh chính được yêu cầu cho EIP-4337 đã được **triển khai vào tháng 3 năm 2023**.

**Tính phi trạng thái hoàn toàn vẫn đang trong giai đoạn nghiên cứu** và có thể còn vài năm nữa mới được triển khai. Có một số cột mốc trên con đường hướng tới tính phi trạng thái hoàn toàn, bao gồm cả việc hết hạn dữ liệu, có thể được triển khai sớm hơn. Các hạng mục khác trong lộ trình, chẳng hạn như [cây Verkle](/roadmap/verkle-trees/) và [tách biệt người đề xuất và người xây dựng (PBS)](/roadmap/pbs/) cần phải được hoàn thành trước.

Các mạng thử nghiệm cây Verkle đã được thiết lập và đang hoạt động, và giai đoạn tiếp theo là chạy các máy khách hỗ trợ cây Verkle trên các mạng thử nghiệm riêng tư, sau đó là công khai. Bạn có thể giúp đẩy nhanh tiến độ bằng cách triển khai các hợp đồng lên các mạng thử nghiệm hoặc chạy các máy khách mạng thử nghiệm.
