---
title: "7 nguyên tắc thiết kế giao diện Web3"
description: "Các nguyên tắc để cải thiện khả năng sử dụng của Web3"
lang: vi
---

Các nguyên tắc về khả năng sử dụng là những "kinh nghiệm thực tế" mang tính tổng quát mà bạn có thể sử dụng để đo lường khả năng sử dụng của trang web.
7 nguyên tắc ở đây được điều chỉnh đặc biệt cho Web3 và nên được sử dụng cùng với [10 nguyên tắc chung cho thiết kế tương tác](https://www.nngroup.com/articles/ten-usability-heuristics/) của Jakob Nielsen.

## Bảy nguyên tắc về khả năng sử dụng cho Web3 {#seven-usability-heuristics-for-web3}

1. Phản hồi theo sau hành động
2. Bảo mật và niềm tin
3. Thông tin quan trọng nhất phải rõ ràng
4. Thuật ngữ dễ hiểu
5. Các hành động càng ngắn càng tốt
6. Các kết nối mạng lưới hiển thị rõ ràng và linh hoạt
7. Kiểm soát từ ứng dụng, không phải từ ví


## Định nghĩa và ví dụ {#definitions-and-examples}

### 1. Phản hồi theo sau hành động {#feedback-follows-action}

**Cần phải rõ ràng khi có điều gì đó đã xảy ra, hoặc đang xảy ra.**

Người dùng quyết định các bước tiếp theo dựa trên kết quả của các bước trước đó. Do đó, điều cần thiết là họ luôn được thông báo về trạng thái hệ thống. Điều này đặc biệt quan trọng trong Web3 vì các giao dịch đôi khi có thể mất một khoảng thời gian ngắn để được ghi vào Chuỗi khối. Nếu không có phản hồi thông báo cho họ chờ đợi, người dùng sẽ không chắc chắn liệu có chuyện gì đã xảy ra hay chưa.

**Mẹo:** 
- Thông báo cho người dùng qua tin nhắn, thông báo và các cảnh báo khác.
- Truyền đạt thời gian chờ đợi một cách rõ ràng.
- Nếu một hành động mất nhiều hơn vài giây, hãy trấn an người dùng bằng đồng hồ đếm ngược hoặc hình ảnh động để họ cảm thấy rằng hệ thống đang xử lý.
- Nếu một quy trình có nhiều bước, hãy hiển thị từng bước.

**Ví dụ:**
Việc hiển thị từng bước liên quan đến một giao dịch giúp người dùng biết họ đang ở đâu trong quy trình. Các biểu tượng phù hợp cho người dùng biết trạng thái hành động của họ.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. Bảo mật và niềm tin được tích hợp sẵn {#security-and-trust-are-backed-in}

Bảo mật nên được ưu tiên và điều này cần được nhấn mạnh với người dùng. 
Mọi người rất quan tâm đến dữ liệu của họ. Sự an toàn thường là mối quan tâm hàng đầu của người dùng, vì vậy nó nên được xem xét ở mọi cấp độ thiết kế. Bạn nên luôn tìm cách giành được niềm tin của người dùng, nhưng cách bạn thực hiện điều này có thể mang ý nghĩa khác nhau trên các ứng dụng khác nhau. Nó không nên là một suy nghĩ muộn màng, mà nên được thiết kế một cách có ý thức xuyên suốt. Xây dựng niềm tin trong toàn bộ trải nghiệm người dùng, bao gồm các kênh xã hội và tài liệu, cũng như giao diện người dùng (UI) cuối cùng. Những yếu tố như mức độ của sự phi tập trung, trạng thái đa chữ ký của kho bạc và liệu đội ngũ có công khai danh tính (doxxed) hay không, tất cả đều ảnh hưởng đến niềm tin của người dùng.

**Mẹo:**
- Tự hào liệt kê các bản kiểm toán (audit) của bạn
- Thực hiện nhiều cuộc kiểm toán
- Quảng bá bất kỳ tính năng an toàn nào mà bạn đã thiết kế
- Làm nổi bật các rủi ro có thể xảy ra, bao gồm cả các tích hợp cơ bản
- Truyền đạt sự phức tạp của các chiến lược
- Xem xét các vấn đề không thuộc UI có thể ảnh hưởng đến nhận thức của người dùng về sự an toàn

**Ví dụ:** 
Đưa các bản kiểm toán của bạn vào phần chân trang (footer), với kích thước nổi bật.

![Audits referenced in the website footer](./Image2.png)

### 3. Thông tin quan trọng nhất phải rõ ràng {#the-most-important-info-is-obvious}

Đối với các hệ thống phức tạp, chỉ hiển thị dữ liệu có liên quan nhất. Xác định điều gì là quan trọng nhất và ưu tiên hiển thị nó. 
Quá nhiều thông tin sẽ gây choáng ngợp và người dùng thường dựa vào một mẩu thông tin khi đưa ra quyết định. Trong tài chính phi tập trung (DeFi), điều này có thể sẽ là APR trên các ứng dụng tạo lợi nhuận và LTV trên các ứng dụng cho vay.

**Mẹo:**
- Nghiên cứu người dùng sẽ khám phá ra số liệu quan trọng nhất
- Làm cho thông tin chính lớn hơn, và các chi tiết khác nhỏ gọn và không gây chú ý
- Mọi người không đọc, họ quét (scan); hãy đảm bảo thiết kế của bạn dễ quét

**Ví dụ:** Các token lớn với đầy đủ màu sắc rất dễ tìm thấy khi quét. APR được làm lớn và làm nổi bật bằng màu nhấn.

![The token and APR are easy to find](./Image3.png)

### 4. Thuật ngữ rõ ràng {#clear-terminology}

Thuật ngữ nên dễ hiểu và phù hợp.
Thuật ngữ kỹ thuật có thể là một rào cản lớn, bởi vì nó đòi hỏi phải xây dựng một mô hình tư duy hoàn toàn mới. Người dùng không thể liên hệ thiết kế với các từ, cụm từ và khái niệm mà họ đã biết. Mọi thứ dường như khó hiểu và xa lạ, và có một đường cong học tập dốc trước khi họ thậm chí có thể thử sử dụng nó. Một người dùng có thể tiếp cận tài chính phi tập trung (DeFi) với mong muốn tiết kiệm một số tiền, và những gì họ tìm thấy là: Khai thác, canh tác (farming), đặt cọc, phát thải (emissions), hối lộ (bribes), kho tiền (vaults), tủ khóa (lockers), veTokens, sự phân bổ theo thời gian, kỷ nguyên (epochs), thuật toán phi tập trung, thanh khoản do Giao thức sở hữu…
Cố gắng sử dụng các thuật ngữ đơn giản mà nhóm người rộng lớn nhất có thể hiểu được. Đừng phát minh ra các thuật ngữ hoàn toàn mới chỉ dành cho dự án của bạn.

**Mẹo:**
- Sử dụng thuật ngữ đơn giản và nhất quán
- Sử dụng ngôn ngữ hiện có càng nhiều càng tốt
- Đừng tự nghĩ ra các thuật ngữ của riêng bạn
- Tuân theo các quy ước khi chúng xuất hiện
- Giáo dục người dùng càng nhiều càng tốt

**Ví dụ:**
"Phần thưởng của bạn" là một thuật ngữ trung lập, được hiểu rộng rãi; không phải là một từ mới được tạo ra cho dự án này. Phần thưởng được tính bằng USD để phù hợp với các mô hình tư duy trong thế giới thực, ngay cả khi bản thân phần thưởng là một token khác.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Các hành động càng ngắn càng tốt {#actions-are-as-short-as-possible}

Tăng tốc độ tương tác của người dùng bằng cách nhóm các hành động phụ. 
Điều này có thể được thực hiện ở cấp độ hợp đồng thông minh, cũng như trên UI. Người dùng không nên phải di chuyển từ phần này sang phần khác của hệ thống – hoặc rời khỏi hệ thống hoàn toàn – để hoàn thành một hành động phổ biến. 

**Mẹo:**
- Kết hợp "Chấp thuận" với các hành động khác nếu có thể
- Gộp các bước của việc ký lại gần nhau nhất có thể

**Ví dụ:** Kết hợp "thêm thanh khoản" và "đặt cọc" là một ví dụ đơn giản về một bộ tăng tốc giúp người dùng tiết kiệm cả thời gian và Gas.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Các kết nối mạng lưới hiển thị rõ ràng và linh hoạt {#network-connections-are-visible-and-flexible}

Thông báo cho người dùng biết họ đang kết nối với mạng lưới nào và cung cấp các phím tắt rõ ràng để thay đổi mạng lưới. 
Điều này đặc biệt quan trọng trên các ứng dụng đa chuỗi (multichain). Các chức năng chính của ứng dụng vẫn nên hiển thị khi ngắt kết nối hoặc kết nối với một mạng lưới không được hỗ trợ.

**Mẹo:**
- Hiển thị càng nhiều phần của ứng dụng càng tốt trong khi ngắt kết nối
- Hiển thị mạng lưới mà người dùng hiện đang kết nối
- Đừng bắt người dùng phải vào ví để thay đổi mạng lưới
- Nếu ứng dụng yêu cầu người dùng chuyển đổi mạng lưới, hãy nhắc nhở hành động đó từ nút kêu gọi hành động (call to action) chính
- Nếu ứng dụng chứa các thị trường hoặc kho tiền cho nhiều mạng lưới, hãy nêu rõ người dùng hiện đang xem tập hợp nào

**Ví dụ:** Cho người dùng thấy họ đang kết nối với mạng lưới nào và cho phép họ thay đổi nó trên thanh ứng dụng (appbar).

![Dropdown button showing the connected network](./Image6.png)

### 7. Kiểm soát từ ứng dụng, không phải từ ví {#control-from-the-app-not-the-wallet}

UI nên cho người dùng biết mọi thứ họ cần biết và cung cấp cho họ quyền kiểm soát mọi thứ họ cần làm. 
Trong Web3, có những hành động bạn thực hiện trên UI và những hành động bạn thực hiện trong ví. Nói chung, bạn bắt đầu một hành động trên UI, và sau đó xác nhận nó trong ví. Người dùng có thể cảm thấy không thoải mái nếu hai luồng này không được tích hợp cẩn thận.

**Mẹo:**
- Truyền đạt trạng thái hệ thống thông qua phản hồi trên UI
- Lưu giữ hồ sơ lịch sử của họ
- Cung cấp các liên kết đến trình khám phá khối cho các giao dịch cũ
- Cung cấp các phím tắt để thay đổi mạng lưới. 

**Ví dụ:** Một vùng chứa (container) tinh tế cho người dùng thấy họ có những token liên quan nào trong ví của mình và CTA chính cung cấp một phím tắt để thay đổi mạng lưới.

![Main CTA is prompting the user to switch network](./Image7.png)