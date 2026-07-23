---
title: "Đặc biệt nhân Ngày Quyền riêng tư Dữ liệu - Giám sát siêu dữ liệu và Nym"
description: "Một cuộc trò chuyện nhân Ngày Quyền riêng tư Dữ liệu về giám sát siêu dữ liệu: siêu dữ liệu tiết lộ điều gì về bạn ngay cả khi nội dung tin nhắn được mã hóa, và cách các công cụ quyền riêng tư cấp mạng lưới như Nym hoạt động để bảo vệ nó."
lang: vi
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Quyền riêng tư"
---

Một chương trình đặc biệt từ **Nym** với Nhà khoa học trưởng của Nym, Claudia Diaz, khám phá cơ chế của siêu dữ liệu, vai trò quan trọng của nó trong giám sát hiện đại, những thông tin cá nhân mà nó tiết lộ, và các bước chúng ta có thể thực hiện để giành lại quyền riêng tư của mình.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=QBX5AK3DXqw) do Nym xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:04) {#intro-004}

Siêu dữ liệu truyền thông là gì? Nó đề cập đến mọi thứ về một cuộc giao tiếp mà không phải là nội dung thực sự đang được nói đến. Ví dụ, điều này bao gồm nguồn gốc của cuộc giao tiếp, đích đến, thời gian thông tin được gửi, lượng thông tin được gửi và bất kỳ mẫu nào có thể phát hiện được, bao gồm thời gian và kích thước của các gói tin đang được trao đổi.

#### Siêu dữ liệu truyền thông (0:27) {#communications-metadata-027}

Siêu dữ liệu truyền thông được phơi bày theo mặc định trong tất cả các giao thức internet: TCP/IP, HTTP, UDP, FTP. Ngay cả các giao thức bảo mật như TLS hoặc DNS bảo mật, vốn bảo vệ nội dung bằng mã hóa đầu cuối, vẫn hiển thị siêu dữ liệu truyền thông: nguồn gốc, đích đến, thời gian, độ dài, v.v.

Vậy thông tin này bị phơi bày, nhưng cho ai? Ai có thể lấy được nó?

#### Ai có quyền truy cập vào siêu dữ liệu (1:10) {#who-gets-access-to-metadata-110}

Có một số thực thể là trung gian trong truyền thông internet có khả năng truy cập vào siêu dữ liệu truyền thông này. Điều này bao gồm những ông lớn trong cơ sở hạ tầng internet, chẳng hạn như các nhà cung cấp dịch vụ internet, các điểm trao đổi, các hệ thống tự trị, bộ định tuyến BGP và những người tham gia mạng trục internet nói chung; họ có thể truy cập vào rất nhiều siêu dữ liệu truyền thông. 

Nhưng ngay cả những người chơi nhỏ, chẳng hạn như bất kỳ ai đang chạy bộ định tuyến Wi-Fi hoặc mạng cục bộ, hoặc ai đó có khả năng nghe lén cục bộ, cũng có quyền truy cập vào siêu dữ liệu truyền thông. Và tất nhiên, các đối thủ cấp quốc gia như NSA đã được biết là thu thập siêu dữ liệu ở quy mô lớn và phân tích nó để trích xuất mọi loại thông tin tình báo.

#### Tại sao siêu dữ liệu lại quan trọng (2:00) {#why-is-metadata-important-200}

Có nhiều lý do hơn giải thích tại sao siêu dữ liệu là một loại dữ liệu rất thú vị để thu thập và khai thác. Nó có thể đọc được bằng máy, bởi vì nó nói ngôn ngữ của máy tính; về cơ bản, nó là ngôn ngữ để máy tính có thể định tuyến các giao tiếp từ nguồn đến đích một cách hợp lý. Vì vậy, nó có thể đọc được bằng máy, và điều đó có nghĩa là máy móc có thể hiểu nó ở quy mô lớn rất dễ dàng, trái ngược với ngôn ngữ tự nhiên của con người, vốn khó diễn giải hơn nhiều, bởi vì có thể mọi người đang sử dụng từ ngữ theo một cách nhất định, hoặc chúng có những sắc thái, và điều này khó diễn giải hơn rất nhiều. Mặt khác, siêu dữ liệu lại thực sự dễ dàng.

Nó cũng có dung lượng thấp hơn nhiều so với nội dung. Ví dụ, nếu bạn nghĩ về một video YouTube, bản thân nội dung có thể lên tới nhiều gigabyte, nhưng siêu dữ liệu sẽ chỉ bao gồm URL của video là gì, nó chứa bao nhiêu byte và nó được xem vào lúc nào. Vì vậy, nó có thể ít hơn rất nhiều so với nội dung thực tế và nó cũng có thể quản lý được về mặt kích thước.

Siêu dữ liệu cũng có mức độ bảo vệ thấp hơn nhiều so với nội dung. Việc tự ý chặn thông tin liên lạc của mọi người và xem xét nội dung là không hợp pháp, điều này được pháp luật bảo vệ. Nhưng siêu dữ liệu, vì nó không được coi là quá nhạy cảm, nên có mức độ bảo vệ thấp hơn nhiều. Vì vậy, nhiều thực thể có thể thu thập siêu dữ liệu này một cách hợp pháp và phân tích nó để tìm hiểu thông tin về những gì mọi người đang làm trên internet.

Vậy điều này có to tát không? Chúng ta có thể nói, "Chà, nó chỉ là siêu dữ liệu. Miễn là bạn không biết tôi đang nói gì, tôi có thực sự nên lo lắng về việc bạn biết tôi nói chuyện với ai và vào lúc nào không?" 

Có một vài trích dẫn cho thấy siêu dữ liệu thực sự được coi là cực kỳ có giá trị như thế nào. Cố vấn chung của NSA, Stewart Baker, nói rằng siêu dữ liệu hoàn toàn cho bạn biết mọi thứ về cuộc sống của ai đó—nếu bạn có đủ siêu dữ liệu, bạn không thực sự cần nội dung. Đây là sức mạnh của nó trong việc có thể hiểu ai đó quan tâm đến điều gì, mạng lưới xã hội của họ là ai, sở thích của họ là gì, ý định của họ là gì, mối quan tâm của họ là gì. Bạn không thực sự cần phải nghe những gì họ đang nói; chỉ cần bạn có thể quan sát tất cả siêu dữ liệu là đủ.

Và Whitfield Diffie cùng Susan Landau, trong cuốn sách *Privacy on the Line* của họ, nói rằng phân tích lưu lượng, chứ không phải phân tích mật mã, mới là xương sống của tình báo truyền thông. Điều này là do bạn có thể thu thập nó ở quy mô lớn, bạn có thể phân tích nó ở quy mô lớn và nó sẽ cung cấp cho bạn tất cả các mẫu lớn, toàn bộ bức tranh tổng thể, từ đó cho phép bạn phóng to để xâm nhập vào các mục tiêu cụ thể mà bạn thấy thú vị nhất. Nhưng bạn tìm thấy chúng trước tiên bằng cách phân tích lưu lượng trên siêu dữ liệu.

Việc phân tích lưu lượng của siêu dữ liệu thậm chí có thể được sử dụng để khôi phục nội dung được mã hóa mà không cần phá vỡ mật mã học. Hãy giả sử chúng ta có mật mã học hoàn hảo: không có lượng phân tích mật mã nào có thể phá vỡ nó và các khóa bí mật là hoàn toàn bí mật. Chúng ta nên tin tưởng rằng nội dung này được bảo vệ và đối thủ không thể tìm hiểu về nội dung này.

Tuy nhiên, có nhiều tình huống mà phân tích lưu lượng của siêu dữ liệu truyền thông có thể hoạt động như một kênh kề (side channel) tiết lộ nội dung được mã hóa này.

#### Giám sát siêu dữ liệu (5:15) {#metadata-surveillance-515}

Một ví dụ là khi bạn đang duyệt một trang web bằng HTTPS. Về nguyên tắc, vì giao tiếp với trang web này được mã hóa, nên ai đó đang quan sát giao tiếp của bạn không thể biết bạn đang truy cập trang cụ thể nào trên trang web. Ví dụ, nếu bạn truy cập WebMD để kiểm tra bệnh tật, một người quan sát hoặc kẻ nghe lén sẽ có thể thấy, "Được rồi, bạn đang kiểm tra thông tin y tế trên WebMD," nhưng họ không thể biết bạn đang tìm kiếm căn bệnh cụ thể nào.

Tuy nhiên, cách để tìm hiểu xem ai đó đang làm gì trong kịch bản này là đối thủ trước tiên sẽ tải xuống tất cả các trang trên trang web và ghi lại, đối với mỗi trang, mẫu các gói tin được nhìn thấy trên đường truyền. Về cơ bản, số lượng gói tin đi theo hướng nào, kích thước của các gói tin này là bao nhiêu và khoảng thời gian giữa gói tin này và gói tin tiếp theo là bao lâu. 

Bằng cách làm điều này, bạn có thể xây dựng một dấu vân tay của từng trang này, sao cho khi mục tiêu đang tải xuống một trang từ trang web được mã hóa, bạn có thể khớp số lượng gói tin theo mỗi hướng và kích thước của chúng để đoán xem họ đang xem trang web cụ thể nào, mặc dù bản thân trang web đó đã được mã hóa và lẽ ra bạn không thể tìm hiểu được nội dung này.

Điều này rõ ràng là đáng lo ngại. Mặc dù chúng ta có thể có mã hóa đầu cuối, nhưng chúng ta còn lâu mới hoàn thành việc bảo vệ quyền riêng tư cho các giao tiếp của mình.

#### Danh sách mong muốn cho truyền thông riêng tư (6:40) {#a-wish-list-for-private-communications-640}

Vậy nếu chúng ta muốn có một danh sách mong muốn về những gì một mạng lưới truyền thông an toàn hoàn hảo sẽ cung cấp, thì những thuộc tính mà chúng ta muốn là gì? 

Rõ ràng, chúng ta muốn bảo vệ những gì người dùng đang nói qua kênh được mã hóa, và mã hóa đầu cuối đã là một bước rất quan trọng để đạt được điều đó. Nhưng không chỉ vậy, chúng ta cũng muốn che giấu người dùng đang giao tiếp với ai, tức là đối tác giao tiếp là ai, bạn đang nhận gói tin từ ai hoặc bạn đang gửi gói tin cho ai. Ngoài ra còn có vị trí, tức là bạn đang giao tiếp từ đâu; khi nào và trong bao lâu bạn đang giao tiếp; bạn đang trao đổi bao nhiêu byte dữ liệu; và bất kỳ mẫu nào khác trong giao tiếp. Và bạn thậm chí có thể đi xa hơn khi nói rằng chúng ta muốn che giấu việc ai đó có đang giao tiếp hay không.

Đây đều là những thuộc tính mà các hệ thống truyền thông ẩn danh hướng tới việc cung cấp, và trong không gian giải pháp, mixnet là một trong những giải pháp tốt nhất mà chúng ta có để cung cấp các loại thuộc tính này.