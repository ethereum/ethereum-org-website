---
title: "Minh chứng theo cổ phần và minh chứng theo lao động"
description: "Một sự so sánh giữa minh chứng theo cổ phần và minh chứng theo lao động của Ethereum nằm ở cơ chế đồng thuận"
lang: vi
---

Tại thời điếm sơ khai của Ethereum, minh chứng theo cổ phần khi ấy cẫn cần rất nhiều nghiên cứu và phát triển trước khi có thể đủ độ tin cậy bảo mật cho Ethereum. Minh chứng theo lao động lại là một phương thức đơn giản hơn hẳn đã được chứng minh bởi Bitcoin, có nghĩa là các nhà phát triển có thể triển khai cơ chế đó ngay khi khởi tạo Ethereum. Để minh chứng theo cổ phần có thể được sử dụng họ cần hoàn thiện nó trong vòng 8 năm sau đó.

Bài viết này sẽ giải thích lý do đằng sau việc Ethereum chuyển đổi từ cơ chế minh chứng theo lao động sang minh chứng theo cổ phần và những hệ quả mang lại.

## Bảo mật {#security}

Các nhà nghiên cứu có căn cứ để cho rằng minh chứng theo cổ phần sẽ an toàn hơn minh chứng theo lao động. Tuy nhiên, nó chỉ mới được triển khai gần đây trên mạng chính thức của Ethereum nên sẽ có ít độ tin cậy qua thời gian hơn minh chứng theo lao động. Mục tiếp theo sẽ so sánh lợi và hại giữa mô hình bảo mật của minh chứng theo cổ phần và minh chứng theo lao động.

### Chi phí để tấn công {#cost-to-attack}

Trong cơ chế minh chứng theo cổ phần, người chứng minh cần yêu cầu tích trữ ("ký gửi") ít nhất 32 ETH cho một hợp đồng thông minh. Người minh chứng nếu vi phạm sẽ bị huỷ số ether đã gửi để trừng phạt. Để mạng lưới thống nhất, ít nhất 66% số người minh chứng cần bỏ phiếu với cùng một nhóm khối. Các khối được bỏ phiếu bởi >=66% số cổ phần sẽ trở nên "hoàn thiện", nghĩa là chúng không thể bị xóa hoặc sắp xếp lại.

Tấn công mạng có nghĩa là ngăn việc chuỗi xác nhận hay đảm bảo một tập hợp cụ thể các khối mà bằng cách nào đó có lợi cho những  kẻ tấn công. Điều này buộc kẻ tấn công phải bẻ hướng sự đồng thuận trung thực, hoặc bằng cách gom một lượng lớn ETH để tự mình bỏ phiếu, hoặc bằng cách lừa các validator trung thực bỏ phiếu theo ý hắn. Ngoại trừ những kiểu tấn công phức tạp và hiếm khi xảy ra nhằm đánh lừa validator trung thực, chi phí để tấn công Ethereum chính là lượng ETH mà kẻ tấn công phải stake đủ lớn để xoay chuyển sự đồng thuận theo ý mình.

Chi phí tấn công thấp nhất là >33% tổng số cổ phần. Kẻ tấn công nắm giữ >33% tổng số cổ phần có thể gây ra sự chậm trễ trong việc hoàn thiện chỉ bằng cách ngoại tuyến. Đây là một vấn đề tương đối nhỏ đối với mạng vì có một cơ chế được gọi là "rò rỉ do không hoạt động" giúp rò rỉ cổ phần từ các trình xác thực ngoại tuyến cho đến khi phần lớn trực tuyến chiếm 66% cổ phần và có thể hoàn thiện chuỗi một lần nữa. Về mặt lý thuyết, kẻ tấn công cũng có thể gây ra việc hoàn thiện kép với hơn 33% tổng số cổ phần bằng cách tạo ra hai khối thay vì một khi họ được yêu cầu làm nhà sản xuất khối và sau đó bỏ phiếu kép với tất cả các trình xác thực của họ. Mỗi phân nhánh chỉ yêu cầu 50% các trình xác thực trung thực còn lại nhìn thấy mỗi khối trước, vì vậy nếu họ quản lý để định giờ thông điệp của mình một cách chính xác, họ có thể hoàn thiện cả hai phân nhánh. Khả năng thành công của việc này thấp, nhưng nếu kẻ tấn công có thể gây ra hoàn thiện kép, cộng đồng Ethereum sẽ phải quyết định đi theo một phân nhánh, trong trường hợp đó các trình xác thực của kẻ tấn công chắc chắn sẽ bị chém phạt ở phân nhánh còn lại.

Với >33% tổng số cổ phần, kẻ tấn công có cơ hội gây ảnh hưởng nhỏ (trì hoãn hoàn thiện) hoặc nghiêm trọng hơn (hoàn thiện kép) lên mạng Ethereum. Với hơn 14.000.000 ETH được đặt cược trên mạng và mức giá đại diện là 1000 USD/ETH, chi phí tối thiểu để thực hiện các cuộc tấn công này là `1000 x 14.000.000 x 0.33 = 4.620.000.000 USD`. Kẻ tấn công sẽ mất số tiền này thông qua việc bị chém phạt và bị loại khỏi mạng. Để tấn công lần nữa, họ sẽ phải tích lũy >33% cổ phần (một lần nữa) và bị mất nó (một lần nữa). Mỗi nỗ lực tấn công mạng sẽ tốn >4,6 tỷ USD (với giá 1000 USD/ETH và 14 triệu ETH được đặt cược). Kẻ tấn công cũng bị loại khỏi mạng khi bị chém phạt, và họ phải tham gia một hàng đợi kích hoạt để tham gia lại. Điều này có nghĩa là tốc độ của một cuộc tấn công lặp lại không chỉ bị giới hạn bởi tốc độ mà kẻ tấn công có thể tích lũy >33% tổng số cổ phần mà còn bởi thời gian cần thiết để đưa tất cả các trình xác thực của họ lên mạng. Mỗi lần kẻ tấn công tấn công, họ sẽ nghèo đi nhiều, và phần còn lại của cộng đồng sẽ giàu lên, nhờ vào cú sốc nguồn cung kết quả.

Các cuộc tấn công khác, chẳng hạn như tấn công 51% hoặc đảo ngược hoàn thiện với 66% tổng số cổ phần, đòi hỏi nhiều ETH hơn đáng kể và tốn kém hơn nhiều đối với kẻ tấn công.

So sánh điều này với bằng chứng công việc. Chi phí để phát động một cuộc tấn công vào Ethereum bằng chứng công việc là chi phí để sở hữu ổn định >50% tổng tốc độ băm của mạng. Điều này tương đương với chi phí phần cứng và vận hành của đủ sức mạnh tính toán để cạnh tranh với các thợ đào khác nhằm tính toán các giải pháp bằng chứng công việc một cách nhất quán. Ethereum chủ yếu được đào bằng GPU thay vì ASIC, điều này giúp giữ chi phí thấp (mặc dù nếu Ethereum vẫn ở lại trên bằng chứng công việc, việc đào bằng ASIC có thể đã trở nên phổ biến hơn). Một đối thủ sẽ phải mua rất nhiều phần cứng và trả tiền điện để chạy nó nhằm tấn công mạng Ethereum bằng chứng công việc, nhưng tổng chi phí sẽ ít hơn chi phí cần thiết để tích lũy đủ ETH để phát động một cuộc tấn công. Một cuộc tấn công 51% trên bằng chứng công việc rẻ hơn ~[20 lần](https://youtu.be/1m12zgJ42dI?t=1562) so với bằng chứng cổ phần. Nếu cuộc tấn công bị phát hiện và chuỗi được phân nhánh cứng để loại bỏ các thay đổi của họ, kẻ tấn công có thể liên tục sử dụng cùng một phần cứng để tấn công phân nhánh mới.

### Độ phức tạp {#complexity}

Bằng chứng cổ phần phức tạp hơn nhiều so với bằng chứng công việc. Đây có thể là một điểm có lợi cho bằng chứng công việc vì khó có thể vô tình đưa các lỗi hoặc hiệu ứng không mong muốn vào các giao thức đơn giản hơn. Tuy nhiên, sự phức tạp đã được chế ngự bởi nhiều năm nghiên cứu và phát triển, mô phỏng và triển khai mạng thử nghiệm. Giao thức bằng chứng cổ phần đã được năm nhóm riêng biệt triển khai độc lập (trên mỗi lớp thực thi và lớp đồng thuận) bằng năm ngôn ngữ lập trình, mang lại khả năng phục hồi chống lại các lỗi của máy khách.

Để phát triển và kiểm tra logic đồng thuận bằng chứng cổ phần một cách an toàn, Chuỗi Beacon đã được ra mắt hai năm trước khi bằng chứng cổ phần được triển khai trên Mạng chính Ethereum. Chuỗi Beacon hoạt động như một môi trường thử nghiệm để kiểm tra bằng chứng cổ phần, vì nó là một chuỗi khối trực tiếp triển khai logic đồng thuận bằng chứng cổ phần nhưng không động đến các giao dịch Ethereum thực — thực chất chỉ là đi đến sự đồng thuận trên chính nó. Sau khi nó đã ổn định và không có lỗi trong một thời gian đủ dài, Chuỗi Beacon đã được "hợp nhất" với Mạng chính Ethereum. Tất cả những điều này đã góp phần chế ngự sự phức tạp của bằng chứng cổ phần đến mức nguy cơ về các hậu quả không mong muốn hoặc lỗi máy khách là rất thấp.

### Bề mặt tấn công {#attack-surface}

Bằng chứng cổ phần phức tạp hơn bằng chứng công việc, điều đó có nghĩa là có nhiều vectơ tấn công tiềm năng hơn cần xử lý. Thay vì một mạng ngang hàng kết nối các máy khách, có hai mạng, mỗi mạng triển khai một giao thức riêng biệt. Việc có một trình xác thực cụ thể được chọn trước để đề xuất một khối trong mỗi slot tạo ra tiềm năng cho các cuộc tấn công từ chối dịch vụ, trong đó lượng lớn lưu lượng mạng làm cho trình xác thực cụ thể đó ngoại tuyến.

Cũng có những cách mà kẻ tấn công có thể cẩn thận định thời gian phát hành các khối hoặc các chứng thực của họ để chúng được nhận bởi một tỷ lệ nhất định của mạng lưới trung thực, ảnh hưởng đến họ để bỏ phiếu theo những cách nhất định. Cuối cùng, một kẻ tấn công có thể chỉ cần tích lũy đủ ETH để đặt cược và thống trị cơ chế đồng thuận. Mỗi [vectơ tấn công này đều có các biện pháp phòng thủ liên quan](/developers/docs/consensus-mechanisms/pos/attack-and-defense), nhưng chúng không tồn tại để được phòng thủ dưới bằng chứng công việc.

## Tính phi tập trung {#decentralization}

Bằng chứng cổ phần phi tập trung hơn bằng chứng công việc vì các cuộc chạy đua vũ trang phần cứng khai thác có xu hướng loại bỏ các cá nhân và tổ chức nhỏ do giá cả. Mặc dù về mặt kỹ thuật, bất kỳ ai cũng có thể bắt đầu khai thác với phần cứng khiêm tốn, nhưng khả năng nhận được bất kỳ phần thưởng nào của họ là cực kỳ nhỏ so với các hoạt động khai thác của tổ chức. Với bằng chứng cổ phần, chi phí đặt cược và tỷ lệ lợi nhuận trên số cổ phần đó là như nhau đối với mọi người. Hiện tại, cần 32 ETH để chạy một trình xác thực.

Mặt khác, sự ra đời của các công cụ phái sinh đặt cược thanh khoản đã dẫn đến những lo ngại về tập trung hóa vì một vài nhà cung cấp lớn quản lý lượng lớn ETH đã đặt cược. Điều này có vấn đề và cần được khắc phục càng sớm càng tốt, nhưng nó cũng phức tạp hơn vẻ bề ngoài. Các nhà cung cấp dịch vụ đặt cược tập trung không nhất thiết phải có quyền kiểm soát tập trung đối với các trình xác thực - thường đó chỉ là một cách để tạo ra một bể ETH trung tâm mà nhiều nhà điều hành nút độc lập có thể đặt cược mà không cần mỗi người tham gia phải có 32 ETH của riêng mình.

Lựa chọn tốt nhất cho Ethereum là các trình xác thực được chạy cục bộ trên máy tính tại nhà, nhằm tối đa hóa tính phi tập trung. Đây là lý do tại sao Ethereum chống lại những thay đổi làm tăng yêu cầu phần cứng để chạy một nút/trình xác thực.

## Tính bền vững {#sustainability}

Bằng chứng cổ phần là một cách bảo mật chuỗi khối với chi phí carbon thấp. Theo bằng chứng công việc, các thợ đào cạnh tranh để giành quyền khai thác một khối. Các thợ đào thành công hơn khi họ có thể thực hiện các phép tính nhanh hơn, điều này khuyến khích đầu tư vào phần cứng và tiêu thụ năng lượng. Điều này đã được quan sát thấy đối với Ethereum trước khi nó chuyển sang bằng chứng cổ phần. Ngay trước khi chuyển đổi sang bằng chứng cổ phần, Ethereum đã tiêu thụ khoảng 78 TWh/năm - tương đương với một quốc gia nhỏ. Tuy nhiên, việc chuyển sang bằng chứng cổ phần đã giảm chi tiêu năng lượng này khoảng ~99,98%. Bằng chứng cổ phần đã biến Ethereum thành một nền tảng tiết kiệm năng lượng, ít carbon.

[Tìm hiểu thêm về mức tiêu thụ năng lượng của Ethereum](/energy-consumption)

## Phát hành {#issuance}

Ethereum bằng chứng cổ phần có thể trả cho bảo mật của mình bằng cách phát hành ít coin hơn nhiều so với Ethereum bằng chứng công việc vì các trình xác thực không phải trả chi phí điện cao. Kết quả là, ETH có thể giảm lạm phát hoặc thậm chí trở nên giảm phát khi một lượng lớn ETH bị đốt cháy. Mức lạm phát thấp hơn có nghĩa là bảo mật của Ethereum rẻ hơn so với khi sử dụng bằng chứng công việc.

## Tìm hiểu thêm từ video trực quan? Người học qua hình ảnh {#visual-learner}

Xem Justin Drake giải thích những lợi ích của bằng chứng cổ phần so với bằng chứng công việc:

<YouTube id="1m12zgJ42dI" />

## Đọc thêm {#further-reading}

- [Triết lý thiết kế bằng chứng cổ phần của Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Câu hỏi thường gặp về bằng chứng cổ phần của Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video "Giải thích đơn giản" về PoS và PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
