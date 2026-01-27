---
title: 7 quy tắc kinh nghiệm cho thiết kế giao diện Web3
description: Các nguyên tắc để cải thiện khả năng sử dụng của Web3
lang: vi
---

Các quy tắc kinh nghiệm về khả năng sử dụng là những “quy tắc chung” rộng mà bạn có thể sử dụng để đo lường khả năng sử dụng của trang web của mình.
7 quy tắc kinh nghiệm ở đây được thiết kế riêng cho Web3 và nên được sử dụng cùng với [10 nguyên tắc chung về thiết kế tương tác](https://www.nngroup.com/articles/ten-usability-heuristics/) của Jakob Nielsen.

## Bảy quy tắc kinh nghiệm về khả năng sử dụng cho web3 {#seven-usability-heuristics-for-web3}

1. Phản hồi theo sau hành động
2. Bảo mật và tin cậy
3. Thông tin quan trọng nhất phải rõ ràng
4. Thuật ngữ dễ hiểu
5. Các hành động càng ngắn càng tốt
6. Kết nối mạng được hiển thị rõ và linh hoạt
7. Điều khiển từ ứng dụng, không phải từ ví

## Định nghĩa và ví dụ {#definitions-and-examples}

### 1. Phản hồi theo sau hành động {#feedback-follows-action}

**Phải rõ ràng khi có điều gì đó đã xảy ra, hoặc đang xảy ra.**

Người dùng quyết định các bước tiếp theo dựa trên kết quả của các bước trước đó. Do đó, điều cần thiết là họ phải được thông báo về trạng thái hệ thống. Điều này đặc biệt quan trọng trong Web3 vì các giao dịch đôi khi có thể mất một khoảng thời gian ngắn để được xác nhận vào chuỗi khối. Nếu không có phản hồi thông báo cho họ chờ đợi, người dùng sẽ không chắc liệu có điều gì đã xảy ra hay không.

**Mẹo:**

- Thông báo cho người dùng thông qua tin nhắn, thông báo và các cảnh báo khác.
- Thông báo thời gian chờ đợi một cách rõ ràng.
- Nếu một hành động mất nhiều hơn vài giây, hãy trấn an người dùng bằng đồng hồ đếm giờ hoặc hoạt ảnh để họ cảm thấy như có điều gì đó đang xảy ra.
- Nếu một quy trình có nhiều bước, hãy hiển thị từng bước.

**Ví dụ:**
Hiển thị từng bước liên quan đến một giao dịch giúp người dùng biết họ đang ở đâu trong quy trình. Các biểu tượng phù hợp cho người dùng biết trạng thái hành động của họ.

![Thông báo cho người dùng về từng bước khi hoán đổi token](./Image1.png)

### 2. Bảo mật và tin cậy được tích hợp sẵn {#security-and-trust-are-backed-in}

Bảo mật nên được ưu tiên và điều này nên được nhấn mạnh cho người dùng.
Mọi người rất quan tâm đến dữ liệu của họ. An toàn thường là mối quan tâm hàng đầu của người dùng, vì vậy nó cần được xem xét ở mọi cấp độ của thiết kế. Bạn nên luôn tìm cách giành được sự tin tưởng của người dùng, nhưng cách bạn làm điều này có thể có ý nghĩa khác nhau trên các ứng dụng khác nhau. Nó không nên là một sự suy tính sau, mà nên được thiết kế một cách có ý thức xuyên suốt. Xây dựng niềm tin trong suốt trải nghiệm người dùng, bao gồm các kênh xã hội và tài liệu tham khảo, cũng như giao diện người dùng cuối cùng. Những thứ như mức độ phi tập trung, trạng thái đa chữ ký của ngân quỹ và liệu nhóm có được tiết lộ danh tính hay không, tất cả đều ảnh hưởng đến niềm tin của người dùng

**Mẹo:**

- Tự hào liệt kê các cuộc kiểm toán của bạn
- Thực hiện nhiều cuộc kiểm toán
- Quảng cáo bất kỳ tính năng an toàn nào mà bạn đã thiết kế
- Nêu bật các rủi ro có thể xảy ra, bao gồm cả các tích hợp cơ bản
- Thông báo về sự phức tạp của các chiến lược
- Xem xét các vấn đề không liên quan đến giao diện người dùng có thể ảnh hưởng đến nhận thức của người dùng về sự an toàn

**Ví dụ:**
Bao gồm các cuộc kiểm toán của bạn ở phần chân trang, với kích thước nổi bật.

![Các cuộc kiểm toán được tham chiếu ở chân trang web](./Image2.png)

### 3. Thông tin quan trọng nhất phải rõ ràng {#the-most-important-info-is-obvious}

Đối với các hệ thống phức tạp, chỉ hiển thị dữ liệu phù hợp nhất. Xác định điều gì là quan trọng nhất và ưu tiên hiển thị nó.
Quá nhiều thông tin sẽ gây choáng ngợp và người dùng thường chỉ tập trung vào một phần thông tin khi đưa ra quyết định. Trong DeFi, đây có thể sẽ là APR trên các ứng dụng lợi suất và LTV trên các ứng dụng cho vay.

**Mẹo:**

- Nghiên cứu người dùng sẽ khám phá ra chỉ số quan trọng nhất
- Làm cho thông tin chính lớn, và các chi tiết khác nhỏ và không phô trương
- Mọi người không đọc, họ quét; hãy đảm bảo thiết kế của bạn có thể quét được

**Ví dụ:** Các token lớn có đầy đủ màu sắc rất dễ tìm thấy khi quét. APR được làm lớn và được tô sáng bằng màu nhấn.

![Token và APR rất dễ tìm](./Image3.png)

### 4. Thuật ngữ rõ ràng {#clear-terminology}

Thuật ngữ phải dễ hiểu và phù hợp.
Biệt ngữ kỹ thuật có thể là một trở ngại lớn, vì nó đòi hỏi việc xây dựng một mô hình tư duy hoàn toàn mới. Người dùng không thể liên hệ thiết kế với các từ, cụm từ và khái niệm mà họ đã biết. Mọi thứ dường như khó hiểu và xa lạ, và có một đường cong học tập dốc đứng trước khi họ có thể cố gắng sử dụng nó. Một người dùng có thể tiếp cận DeFi muốn tiết kiệm một số tiền, và những gì họ tìm thấy là: Khai thác, farming, đặt cược, emissions, bribes, vaults, lockers, veTokens, vesting, epoch, thuật toán phi tập trung, thanh khoản thuộc sở hữu của giao thức…
Cố gắng sử dụng các thuật ngữ đơn giản sẽ được hiểu bởi nhóm người rộng nhất. Đừng phát minh ra các thuật ngữ hoàn toàn mới chỉ cho dự án của bạn.

**Mẹo:**

- Sử dụng thuật ngữ đơn giản và nhất quán
- Sử dụng ngôn ngữ hiện có càng nhiều càng tốt
- Đừng tự đặt ra các thuật ngữ của riêng bạn
- Tuân theo các quy ước khi chúng xuất hiện
- Giáo dục người dùng càng nhiều càng tốt

**Ví dụ:**
“Phần thưởng của bạn” là một thuật ngữ trung lập, được hiểu rộng rãi; không phải là một từ mới được tạo ra cho dự án này. Các phần thưởng được định giá bằng USD để phù hợp với các mô hình tư duy trong thế giới thực, ngay cả khi bản thân các phần thưởng đó ở dạng một token khác.

![Phần thưởng token, được hiển thị bằng U.S. đô la](./Image4.png)

### 5. Các hành động càng ngắn càng tốt {#actions-are-as-short-as-possible}

Tăng tốc độ tương tác của người dùng bằng cách nhóm các hành động phụ.
Điều này có thể được thực hiện ở cấp độ hợp đồng thông minh, cũng như giao diện người dùng. Người dùng không cần phải di chuyển từ phần này của hệ thống sang phần khác – hoặc rời khỏi hệ thống hoàn toàn – để hoàn thành một hành động thông thường.

**Mẹo:**

- Kết hợp "Phê duyệt" với các hành động khác nếu có thể
- Gói các bước ký càng gần nhau càng tốt

**Ví dụ:** Kết hợp “thêm thanh khoản” và “đặt cược” là một ví dụ đơn giản về một trình tăng tốc giúp người dùng tiết kiệm cả thời gian và gas.

![Hộp thoại hiển thị một công tắc để kết hợp các hành động gửi tiền và đặt cược](./Image5.png)

### 6. Kết nối mạng được hiển thị rõ và linh hoạt {#network-connections-are-visible-and-flexible}

Thông báo cho người dùng về mạng họ đang kết nối và cung cấp các phím tắt rõ ràng để thay đổi mạng.
Điều này đặc biệt quan trọng trên các ứng dụng đa chuỗi. Các chức năng chính của ứng dụng vẫn phải được hiển thị khi bị ngắt kết nối hoặc kết nối với một mạng không được hỗ trợ.

**Mẹo:**

- Hiển thị càng nhiều phần của ứng dụng càng tốt khi bị ngắt kết nối
- Hiển thị mạng mà người dùng hiện đang kết nối
- Đừng bắt người dùng phải vào ví để đổi mạng
- Nếu ứng dụng yêu cầu người dùng chuyển mạng, hãy nhắc hành động từ lời kêu gọi hành động chính
- Nếu ứng dụng chứa các thị trường hoặc hầm cho nhiều mạng, hãy nêu rõ người dùng hiện đang xem bộ nào

**Ví dụ:** Hiển thị cho người dùng mạng mà họ đang kết nối và cho phép họ thay đổi mạng đó trên thanh ứng dụng.

![Nút thả xuống hiển thị mạng được kết nối](./Image6.png)

### 7. Điều khiển từ ứng dụng, không phải từ ví {#control-from-the-app-not-the-wallet}

Giao diện người dùng nên cho người dùng biết mọi thứ họ cần biết và cho họ quyền kiểm soát mọi thứ họ cần làm.
Trong Web3, có những hành động bạn thực hiện trong giao diện người dùng và những hành động bạn thực hiện trong ví. Nói chung, bạn bắt đầu một hành động trong giao diện người dùng và sau đó xác nhận nó trong ví. Người dùng có thể cảm thấy không thoải mái nếu hai luồng này không được tích hợp cẩn thận.

**Mẹo:**

- Thông báo trạng thái hệ thống qua phản hồi trong giao diện người dùng
- Lưu giữ hồ sơ lịch sử của họ
- Cung cấp liên kết đến các trình duyệt khối cho các giao dịch cũ
- Cung cấp các phím tắt để thay đổi mạng.

**Ví dụ:** Một vùng chứa tinh tế cho người dùng thấy những token có liên quan mà họ có trong ví của mình và CTA chính cung cấp một lối tắt để thay đổi mạng.

![CTA chính đang nhắc người dùng chuyển mạng](./Image7.png)
