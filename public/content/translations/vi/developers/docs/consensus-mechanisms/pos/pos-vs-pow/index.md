---
title: "Bằng chứng cổ phần so với bằng chứng công việc"
description: "So sánh giữa cơ chế đồng thuận dựa trên bằng chứng cổ phần và bằng chứng công việc của Ethereum"
lang: vi
---

Khi [Ethereum](/) ra mắt, Bằng chứng cổ phần (PoS) vẫn cần rất nhiều nghiên cứu và phát triển trước khi có thể được tin tưởng để bảo mật Ethereum. Bằng chứng công việc (PoW) là một cơ chế đơn giản hơn đã được chứng minh bởi Bitcoin, nghĩa là các nhà phát triển cốt lõi có thể triển khai nó ngay lập tức để khởi chạy Ethereum. Phải mất thêm tám năm nữa để phát triển Bằng chứng cổ phần đến mức có thể được triển khai.

Trang này giải thích lý do đằng sau việc Ethereum chuyển đổi sang Bằng chứng cổ phần từ Bằng chứng công việc và những sự đánh đổi liên quan.

## Bảo mật {#security}

Các nhà nghiên cứu Ethereum coi Bằng chứng cổ phần bảo mật hơn Bằng chứng công việc. Tuy nhiên, nó chỉ mới được triển khai gần đây cho Mạng chính Ethereum thực tế và ít được kiểm chứng qua thời gian hơn so với Bằng chứng công việc. Các phần sau đây thảo luận về ưu và nhược điểm của mô hình bảo mật của Bằng chứng cổ phần so với Bằng chứng công việc.

### Chi phí tấn công {#cost-to-attack}

Trong Bằng chứng cổ phần, các trình xác thực được yêu cầu ký quỹ ("đặt cọc") ít nhất 32 ETH vào một hợp đồng thông minh. Ethereum có thể tiêu hủy ether đã đặt cọc để trừng phạt các trình xác thực có hành vi sai trái. Để đạt được đồng thuận, ít nhất 66% tổng số ether đã đặt cọc phải bỏ phiếu ủng hộ một tập hợp các khối cụ thể. Các khối được bỏ phiếu bởi >=66% khoản đặt cọc sẽ trở nên "đã chung cuộc", nghĩa là chúng không thể bị xóa hoặc tổ chức lại.

Tấn công mạng lưới có thể có nghĩa là ngăn chặn Chuỗi đạt tính chung cuộc hoặc đảm bảo một tổ chức các khối nhất định trong Chuỗi chính tắc theo cách nào đó mang lại lợi ích cho kẻ tấn công. Điều này yêu cầu kẻ tấn công phải làm chệch hướng của sự đồng thuận trung thực bằng cách tích lũy một lượng lớn ether và trực tiếp bỏ phiếu bằng số ether đó hoặc lừa các trình xác thực trung thực bỏ phiếu theo một cách cụ thể. Bỏ qua các cuộc tấn công tinh vi, xác suất thấp nhằm lừa các trình xác thực trung thực, chi phí để tấn công Ethereum chính là chi phí của khoản đặt cọc mà kẻ tấn công phải tích lũy để tác động đến sự đồng thuận theo hướng có lợi cho chúng.

Chi phí tấn công thấp nhất là >33% tổng số khoản đặt cọc. Một kẻ tấn công nắm giữ >33% tổng số khoản đặt cọc có thể gây ra sự chậm trễ tính chung cuộc chỉ bằng cách ngoại tuyến. Đây là một vấn đề tương đối nhỏ đối với mạng lưới vì có một cơ chế được gọi là "rò rỉ do không hoạt động" sẽ làm rò rỉ khoản đặt cọc khỏi các trình xác thực ngoại tuyến cho đến khi đa số trực tuyến đại diện cho 66% khoản đặt cọc và có thể làm cho Chuỗi đã chung cuộc trở lại. Về mặt lý thuyết, kẻ tấn công cũng có thể gây ra tính chung cuộc kép với hơn 33% tổng số khoản đặt cọc một chút bằng cách tạo ra hai khối thay vì một khối khi chúng được yêu cầu làm người sản xuất khối và sau đó bỏ phiếu kép với tất cả các trình xác thực của chúng. Mỗi Phân nhánh chỉ yêu cầu 50% số trình xác thực trung thực còn lại nhìn thấy mỗi khối trước, vì vậy nếu chúng xoay sở để căn thời gian gửi tin nhắn vừa đúng, chúng có thể làm cho cả hai Phân nhánh đã chung cuộc. Điều này có khả năng thành công thấp, nhưng nếu một kẻ tấn công có thể gây ra tính chung cuộc kép, cộng đồng Ethereum sẽ phải quyết định theo một Phân nhánh, trong trường hợp đó, các trình xác thực của kẻ tấn công chắc chắn sẽ bị phạt cắt giảm trên Phân nhánh còn lại.

Với >33% tổng số khoản đặt cọc, kẻ tấn công có cơ hội gây ra tác động nhỏ (chậm trễ tính chung cuộc) hoặc nghiêm trọng hơn (tính chung cuộc kép) đối với mạng lưới Ethereum. Với hơn 14.000.000 ETH được đặt cọc trên mạng lưới và mức giá đại diện là $1000/ETH, chi phí tối thiểu để thực hiện các cuộc tấn công này là `1000 x 14,000,000 x 0.33 = $4,620,000,000`. Kẻ tấn công sẽ mất số tiền này thông qua việc bị phạt cắt giảm và bị đẩy khỏi mạng lưới. Để tấn công lại, chúng sẽ phải tích lũy >33% khoản đặt cọc (một lần nữa) và đốt nó (một lần nữa). Mỗi nỗ lực tấn công mạng lưới sẽ tiêu tốn >4,6 tỷ đô la (ở mức $1000/ETH và 14 triệu ETH được đặt cọc). Kẻ tấn công cũng bị đẩy khỏi mạng lưới khi chúng bị phạt cắt giảm, và chúng phải tham gia vào hàng đợi sự kích hoạt để tham gia lại. Điều này có nghĩa là tỷ lệ của một cuộc tấn công lặp lại bị giới hạn không chỉ ở tốc độ kẻ tấn công có thể tích lũy >33% tổng số khoản đặt cọc mà còn ở thời gian cần thiết để đưa tất cả các trình xác thực của chúng lên mạng lưới. Mỗi lần kẻ tấn công tấn công, chúng trở nên nghèo hơn nhiều và phần còn lại của cộng đồng trở nên giàu có hơn, nhờ vào cú sốc nguồn cung do hậu quả để lại.

Các cuộc tấn công khác, chẳng hạn như cuộc tấn công 51% hoặc đảo ngược tính chung cuộc với 66% tổng số khoản đặt cọc, yêu cầu nhiều ETH hơn đáng kể và tốn kém hơn nhiều đối với kẻ tấn công.

So sánh điều này với Bằng chứng công việc. Chi phí để phát động một cuộc tấn công vào Ethereum Bằng chứng công việc là chi phí để liên tục sở hữu >50% tổng Tỷ lệ băm của mạng lưới. Điều này tương đương với chi phí phần cứng và chi phí vận hành của đủ sức mạnh tính toán để vượt qua các thợ khai thác khác nhằm tính toán các giải pháp Bằng chứng công việc một cách nhất quán. Ethereum chủ yếu được khai thác bằng GPU thay vì ASIC, điều này giúp giảm chi phí (mặc dù nếu Ethereum vẫn duy trì Bằng chứng công việc, việc khai thác bằng ASIC có thể đã trở nên phổ biến hơn). Một đối thủ sẽ phải mua rất nhiều phần cứng và trả tiền điện để chạy nó nhằm tấn công mạng lưới Ethereum Bằng chứng công việc, nhưng tổng chi phí sẽ ít hơn chi phí cần thiết để tích lũy đủ ETH để phát động một cuộc tấn công. Một cuộc tấn công 51% rẻ hơn ~[20 lần](https://youtu.be/1m12zgJ42dI?t=1562) trên Bằng chứng công việc so với Bằng chứng cổ phần. Nếu cuộc tấn công bị phát hiện và Chuỗi bị Phân nhánh cứng để loại bỏ các thay đổi của chúng, kẻ tấn công có thể liên tục sử dụng cùng một phần cứng để tấn công Phân nhánh mới.

### Độ phức tạp {#complexity}

Bằng chứng cổ phần phức tạp hơn nhiều so với Bằng chứng công việc. Đây có thể là một điểm có lợi cho Bằng chứng công việc vì khó có thể vô tình đưa các lỗi hoặc tác động không mong muốn vào các Giao thức đơn giản hơn. Tuy nhiên, độ phức tạp đã được kiểm soát bởi nhiều năm nghiên cứu và phát triển, mô phỏng và triển khai trên mạng thử nghiệm. Giao thức Bằng chứng cổ phần đã được triển khai độc lập bởi năm nhóm riêng biệt (trên mỗi lớp thực thi và đồng thuận) bằng năm ngôn ngữ lập trình, cung cấp khả năng phục hồi chống lại các lỗi máy khách.

Để phát triển và kiểm tra an toàn logic đồng thuận Bằng chứng cổ phần, Chuỗi Beacon đã được ra mắt hai năm trước khi Bằng chứng cổ phần được triển khai trên Mạng chính Ethereum. Chuỗi Beacon hoạt động như một môi trường thử nghiệm (sandbox) cho việc kiểm tra Bằng chứng cổ phần, vì nó là một Chuỗi khối trực tiếp triển khai logic đồng thuận Bằng chứng cổ phần nhưng không đụng chạm đến các giao dịch Ethereum thực tế - về cơ bản chỉ là đạt được đồng thuận trên chính nó. Khi điều này đã ổn định và không có lỗi trong một thời gian đủ dài, Chuỗi Beacon đã được "hợp nhất" với Mạng chính Ethereum. Tất cả những điều này đã góp phần kiểm soát độ phức tạp của Bằng chứng cổ phần đến mức rủi ro về những hậu quả không mong muốn hoặc lỗi máy khách là rất thấp.

### Bề mặt tấn công {#attack-surface}

Bằng chứng cổ phần phức tạp hơn Bằng chứng công việc, điều đó có nghĩa là có nhiều vectơ tấn công tiềm ẩn hơn cần xử lý. Thay vì một mạng lưới ngang hàng kết nối các máy khách, có hai mạng lưới, mỗi mạng lưới triển khai một Giao thức riêng biệt. Việc có một trình xác thực cụ thể được chọn trước để đề xuất một khối trong mỗi khe tạo ra khả năng bị từ chối dịch vụ khi lượng lớn lưu lượng mạng đánh bật trình xác thực cụ thể đó ngoại tuyến.

Cũng có những cách mà những kẻ tấn công có thể căn thời gian cẩn thận cho việc phát hành các khối hoặc chứng thực của chúng để chúng được nhận bởi một tỷ lệ nhất định của mạng lưới trung thực, ảnh hưởng đến việc họ bỏ phiếu theo những cách nhất định. Cuối cùng, một kẻ tấn công có thể đơn giản là tích lũy đủ ETH để đặt cọc và thống trị cơ chế đồng thuận. Mỗi [vectơ tấn công này đều có các biện pháp phòng thủ đi kèm](/developers/docs/consensus-mechanisms/pos/attack-and-defense), nhưng chúng không tồn tại để cần được phòng thủ trong Bằng chứng công việc.

## Sự phi tập trung {#decentralization}

Bằng chứng cổ phần phi tập trung hơn Bằng chứng công việc vì các cuộc chạy đua vũ trang về phần cứng khai thác có xu hướng loại bỏ các cá nhân và tổ chức nhỏ do chi phí cao. Mặc dù về mặt kỹ thuật, bất kỳ ai cũng có thể bắt đầu khai thác với phần cứng khiêm tốn, nhưng khả năng nhận được bất kỳ phần thưởng nào của họ là cực kỳ nhỏ so với các hoạt động khai thác của tổ chức. Với Bằng chứng cổ phần, chi phí của việc đặt cọc và tỷ lệ phần trăm lợi nhuận trên khoản đặt cọc đó là như nhau đối với tất cả mọi người. Hiện tại, chi phí để chạy một trình xác thực là 32 ETH.

Mặt khác, việc phát minh ra các công cụ phái sinh đặt cọc thanh khoản đã dẫn đến những lo ngại về sự tập trung hóa vì một vài nhà cung cấp lớn quản lý lượng lớn ETH đã đặt cọc. Điều này là một vấn đề và cần được khắc phục càng sớm càng tốt, nhưng nó cũng có nhiều sắc thái hơn vẻ bề ngoài. Các nhà cung cấp dịch vụ đặt cọc tập trung không nhất thiết phải có quyền kiểm soát tập trung đối với các trình xác thực - thường thì đó chỉ là một cách để tạo ra một nhóm ETH trung tâm mà nhiều nhà điều hành nút độc lập có thể đặt cọc mà không yêu cầu mỗi người tham gia phải có 32 ETH của riêng họ.

Lựa chọn tốt nhất cho Ethereum là các trình xác thực được chạy cục bộ trên máy tính cá nhân, tối đa hóa sự phi tập trung. Đây là lý do tại sao Ethereum chống lại các thay đổi làm tăng yêu cầu phần cứng để chạy một nút/trình xác thực.

## Tính bền vững {#sustainability}

Bằng chứng cổ phần là một cách ít phát thải carbon để bảo mật Chuỗi khối. Dưới Bằng chứng công việc, các thợ khai thác cạnh tranh để giành quyền khai thác một khối. Các thợ khai thác thành công hơn khi họ có thể thực hiện các phép tính nhanh hơn, khuyến khích đầu tư vào phần cứng và tiêu thụ năng lượng. Điều này đã được quan sát thấy đối với Ethereum trước khi nó chuyển sang Bằng chứng cổ phần. Ngay trước khi chuyển đổi sang Bằng chứng cổ phần, Ethereum đã tiêu thụ khoảng 78 TWh/năm - tương đương với một quốc gia nhỏ. Tuy nhiên, việc chuyển sang Bằng chứng cổ phần đã giảm mức tiêu thụ năng lượng này đi ~99,98%. Bằng chứng cổ phần đã biến Ethereum thành một nền tảng tiết kiệm năng lượng, ít carbon.

[Tìm hiểu thêm về mức tiêu thụ năng lượng của Ethereum](/energy-consumption)

## Phát hành {#issuance}

Ethereum Bằng chứng cổ phần có thể chi trả cho việc bảo mật của nó bằng cách phát hành ít tiền xu hơn nhiều so với Ethereum Bằng chứng công việc vì các trình xác thực không phải trả chi phí điện năng cao. Do đó, ETH có thể giảm lạm phát hoặc thậm chí trở nên giảm phát khi một lượng lớn ETH bị đốt. Mức lạm phát thấp hơn có nghĩa là bảo mật của Ethereum rẻ hơn so với dưới thời Bằng chứng công việc.

## Bạn thích học qua hình ảnh hơn? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Đọc thêm {#further-reading}

- [Triết lý thiết kế Bằng chứng cổ phần của Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Các câu hỏi thường gặp về Bằng chứng cổ phần của Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Giải thích đơn giản" về PoS so với PoW](https://www.youtube.com/watch?v=M3EFi_POhps)