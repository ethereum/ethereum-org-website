---
title: "Hàm băm — ETH.BUILD"
description: "Bản trình bày về các hàm băm mật mã học sử dụng công cụ giáo dục ETH.BUILD. Tìm hiểu cách các hàm băm hoạt động và lý do tại sao chúng là nền tảng cho mô hình tính toàn vẹn dữ liệu và tài khoản của Ethereum."
lang: vi
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "tài khoản"
  - "mật mã học"
format: tutorial
author: Austin Griffith
breadcrumb: "Hàm băm (ETH.BUILD)"
---

Một hướng dẫn của **Austin Griffith** trình bày cách các hàm băm mật mã học hoạt động bằng cách sử dụng công cụ lập trình trực quan ETH.BUILD, bao gồm tính tất định, đầu ra có độ dài cố định, thuộc tính một chiều và cây Merkle.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=QJ010l-pBpE) được xuất bản bởi Austin Griffith. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

### Giới thiệu về hàm băm (0:00) {#introduction-to-hash-functions-000}

Đây là video đầu tiên trong loạt video có tên ETH.BUILD. Bạn có thể truy cập eth.build để sử dụng công cụ này, nhưng nó chỉ để thử nghiệm và nắm được ý tưởng về cách mọi thứ hoạt động khi xây dựng trên Ethereum.

Mô-đun đầu tiên chúng ta sẽ xem xét là hàm băm. Hàm băm là cái quái gì vậy? Chà, nó hơi giống như một dấu vân tay. Bạn có một đầu vào — có thể là bất cứ thứ gì — nhưng hiện tại chúng ta sẽ chỉ sử dụng văn bản "hello world". Ở phía bên kia, bạn sẽ có một đầu ra và đầu ra đó là một chuỗi thập lục phân gồm 64 ký tự. Nó nói là 66 ký tự vì có tiền tố "0x", nhưng thực chất nó là một chuỗi hex 64 ký tự.

### Hình dung mã băm dưới dạng màu sắc (0:50) {#visualizing-hashes-as-colors-050}

Nếu bạn nhìn vào mã hex, nó trông hơi giống một màu sắc và có thể sẽ dễ dàng mô tả những gì chúng ta đang thấy ở đây hơn nếu chúng ta chỉ biến nó thành màu sắc. Vì vậy, những gì chúng ta sẽ làm là lấy sáu ký tự đầu tiên của bất kỳ chuỗi nào và hiển thị nó dưới dạng một màu. Nếu nhìn vào đó, chúng ta thấy đó là một màu tím đẹp mắt.

Hãy xem tên tôi có màu gì — đây rồi, một màu xanh lá cây rừng tuyệt đẹp. Bây giờ hãy quay lại "hello world" — nó lại là màu tím đó.

### Tính tất định và đầu ra có độ dài cố định (1:38) {#determinism-and-fixed-length-output-138}

Những gì chúng ta vừa khám phá ra là nó có tính tất định. Về cơ bản, bất kể chúng ta đưa vào đầu vào là gì, chúng ta sẽ luôn nhận được cùng một kết quả ở đầu ra.

Thuộc tính thứ hai là bạn có thể đưa vào bất cứ thứ gì với kích thước tùy ý. Tôi có thể gõ bừa trên bàn phím và thấy màu sắc thay đổi, nhưng chuỗi đó vẫn giữ nguyên độ dài 66 ký tự. Bất kể bạn đưa vào đây thứ gì — thậm chí là một tệp — tôi có thể thả tệp của Leo, con trai tôi, và đưa nó vào làm mã băm rồi nhận được một màu cam đẹp mắt. Sau đó, tôi có thể thả một tài liệu văn bản danh sách từ BIP vào và nó có màu xanh nhạt tuyệt đẹp này. Nếu tôi đưa Leo trở lại, hãy đoán xem nó sẽ có màu gì? Chúng ta biết nó sẽ là màu cam đó. Bạn nhận được dấu vân tay mang tính tất định này của thứ mà bạn đã đưa vào.

### Thuộc tính một chiều (2:37) {#one-directional-property-237}

Thuộc tính quan trọng tiếp theo là nó có tính một chiều. Nếu tôi nhập lại "hello world", chúng ta sẽ nhận được mã băm "4717" này. Nếu chúng ta lấy mã băm đó và gửi cho ai đó rồi nói "đây là mã băm bí mật của tôi — nếu bạn có thể đoán được bí mật của tôi, tôi sẽ cho bạn một trăm đô la", họ sẽ không thể nào đoán gần đúng được.

Giả sử mã băm bắt đầu bằng "4717" và họ bắt đầu mày mò cố gắng tìm một kết quả trùng khớp. Bạn không thể chỉ thay đổi một vài ký tự nhỏ và tiến gần đến kết quả — bạn chỉ có thể đoán đúng hoặc sai. Về cơ bản, bạn phải đoán mò bằng phương pháp vét cạn (brute-force). Nếu họ tình cờ đoán là "hello world", họ sẽ có câu trả lời, nhưng nếu họ không đoán ra, họ sẽ không bao giờ có được nó. Không có cách nào để biết liệu bạn có đang tiến gần đến kết quả hay không.

Bạn sẽ thấy với mật mã học, đôi khi nó gây bực bội cho một nhà phát triển vì nó chỉ có thể hoạt động hoặc không — bạn không nhận được bất kỳ gợi ý nào về việc liệu bạn có đang tiến gần đến kết quả hay không. Nhưng đó là một điều tốt. Đó là thuộc tính mà chúng ta muốn có ở một hàm băm.

### Tóm tắt các thuộc tính của hàm băm (3:43) {#summary-of-hash-function-properties-343}

Vì vậy, chúng ta có: bất cứ thứ gì với bất kỳ kích thước nào đều có thể được đưa vào một hàm băm và nó sẽ cho ra một dấu vân tay thập lục phân chính xác gồm 64 ký tự của dữ liệu đó. Nó có tính tất định. Nó có tính một chiều — bạn không thể quay ngược lại. Rất dễ để tạo ra một mã băm, nhưng thực sự khó để đoán được bí mật của mã băm đó.

### Cây Merkle và việc kết hợp các mã băm (4:06) {#merkle-trees-and-combining-hashes-406}

Những gì chúng ta có thể làm với điều này là một số thứ thực sự thú vị, chẳng hạn như cây Merkle. Chúng ta có ba đầu vào và chúng ta có thể nối chúng lại với nhau. Chúng ta có thể kết hợp tất cả các mã băm đó và sau đó băm sự kết hợp này.

Màu sắc ngay tại đây — màu tím đó — đại diện cho mã băm của tất cả các mã băm này. Nếu tôi thay đổi "hello world" thành "hello world one", màu tím đó sẽ thay đổi. Bất kỳ thay đổi nhỏ nào đối với bất kỳ đầu vào nào trong số này đều sẽ khiến mã băm cuối cùng thay đổi. Bạn có thể đưa vào đủ loại dữ liệu theo đủ mọi cách khác nhau — thậm chí có một cây các mã băm, một cây Merkle — hoặc có một loạt các khối liên tiếp nhau và mã băm cuối cùng này sẽ dựa trên tất cả những thứ này. Nếu bất kỳ điều nhỏ nhặt nào thay đổi ở bất kỳ đâu trong quá trình này, mã băm cuối cùng sẽ thay đổi.

### Bài học chính (5:53) {#key-takeaway-553}

Bài học chính là một hàm băm về cơ bản giống như một dấu vân tay. Nếu tôi nhập một cái gì đó, nó sẽ cung cấp cho tôi đầu ra mà tôi mong đợi một cách tất định. Đó là một hàm băm — chào mừng đến với ETH.BUILD. Hãy cùng tạo ra một số thứ thú vị và học hỏi được nhiều điều trong quá trình này.