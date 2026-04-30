---
title: "Chuỗi khối 101: minh họa trực quan"
description: "Một minh họa về cách công nghệ chuỗi khối hoạt động, bao gồm quá trình băm, các khối, chuỗi, sổ cái phân tán và token để làm cho các khái niệm chuỗi khối trở nên rõ ràng và trực quan."
lang: vi
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "cryptography"
format: presentation
author: Anders Brownworth
breadcrumb: "Chuỗi khối 101"
---

Minh họa trực quan của Anders Brownworth về cách công nghệ chuỗi khối hoạt động, bao gồm phần hướng dẫn về quá trình băm SHA-256, các khối, khai thác, chuỗi khối, sổ cái phân tán, token và nhiều nội dung khác.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=_160oMzblY8) được xuất bản bởi Anders Brownworth. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Mã băm SHA-256 (0:01) {#sha-256-hash-001}

Đây là một bản demo về chuỗi khối. Chúng ta sẽ thực hiện điều này theo một cách rất trực quan — chúng ta sẽ làm cho nó trở nên rất dễ hiểu bằng cách đi qua từng thành phần chính tạo nên một chuỗi khối.

Trước khi bắt đầu, chúng ta cần xem xét một thứ gọi là mã băm SHA-256. Một mã băm trông giống như một dãy số ngẫu nhiên, và về cơ bản nó là dấu vân tay của một số dữ liệu kỹ thuật số. Tình cờ nó lại là dấu vân tay của bất cứ thứ gì tôi gõ vào ô này. Nếu tôi gõ tên mình là "Anders" vào ô này, bạn sẽ thấy mã băm đã thay đổi. Thực tế là, nó thay đổi mỗi khi tôi gõ một chữ cái.

Vậy đây là mã băm của cái tên "Anders", tất cả đều viết thường — nó bắt đầu bằng `19ea`. Nếu tôi xóa nó đi và gõ lại "Anders", bạn có thể thấy nó bắt đầu bằng `19ea` — chính xác là cùng một mã băm. Theo nghĩa đó, nó là một dấu vân tay kỹ thuật số của dữ liệu này. Bất kể dữ liệu ở đây là gì, mỗi khi bạn gõ chính xác cùng một dữ liệu, bạn sẽ nhận được chính xác cùng một mã băm.

Tôi có thể gõ bất cứ thứ gì tôi muốn. Bạn có thể không gõ gì cả — `e3b0` — đó là mã băm của khoảng trống. Hoặc bạn có thể gõ vô số thứ. Thực tế là, bạn có thể đưa toàn bộ Thư viện Quốc hội vào đây và bạn sẽ nhận được một mã băm. Điều thú vị là, bất kể có một lượng nhỏ thông tin, không có thông tin nào, hay toàn bộ Thư viện Quốc hội, bạn sẽ luôn nhận được một mã băm có độ dài như thế này. Bạn sẽ không thể đoán trước được nó là gì — bạn gần như phải đưa dữ liệu vào để tìm ra mã băm là gì, nhưng bạn sẽ luôn nhận được chính xác cùng một mã băm bất kể bạn đưa chính xác cùng một thông tin vào bao nhiêu lần.

#### Khối (2:10) {#block-210}

Những gì tôi sẽ làm là mở rộng ý tưởng về mã băm này thành một thứ mà chúng ta sẽ gọi là một khối. Một khối hoàn toàn giống như mã băm, nhưng phần dữ liệu đã được chia thành ba phần: một phần gọi là "khối" — chỉ là một con số, đây là khối số 1 — một "nonce", cũng chỉ là một con số khác, và sau đó là một số dữ liệu giống như chúng ta đã có trước đây.

Mã băm của tất cả thông tin này nằm ở dưới đây, và nó bắt đầu bằng bốn số không. Đó là một mã băm tương đối bất thường — hầu hết chúng sẽ không bắt đầu bằng bốn số không như vậy. Nhưng mã băm này thì có, và vì nó có, một cách hoàn toàn tùy ý, tôi sẽ nói rằng khối này đã được "ký".

Điều gì sẽ xảy ra nếu tôi thay đổi bất kỳ phần nào của thông tin này? Giả sử tôi gõ một cái gì đó vào đây — mã băm sẽ thay đổi, và xác suất nó bắt đầu bằng bốn số không là bao nhiêu? Khá thấp. Tôi sẽ chỉ gõ "hi" — nhìn kìa, mã băm này không bắt đầu bằng bốn số không, và nền đã chuyển sang màu đỏ. Vì vậy, bây giờ bạn biết rằng khối này với thông tin bên trong nó không phải là một khối hợp lệ hoặc đã được ký.

Đó là lúc nonce phát huy tác dụng. Nonce chỉ là một con số mà bạn có thể thiết lập để cố gắng tìm ra một giá trị làm cho mã băm bắt đầu bằng bốn số không một lần nữa. Tôi có thể ngồi đây cả ngày để gõ các con số, nhưng tôi có nút "Khai thác" nhỏ này. Điều sẽ xảy ra khi tôi nhấn vào nó là nó sẽ chạy qua tất cả các con số từ 1 trở lên để cố gắng tìm ra một con số mà mã băm bắt đầu bằng bốn số không. Quá trình này được gọi là khai thác.

Nó đã dừng lại ở 59.396 — và con số đó tình cờ băm ra một thứ bắt đầu bằng bốn số không. Nó thỏa mãn định nghĩa của tôi về một khối đã được ký là gì.

#### Chuỗi khối (5:16) {#blockchain-516}

Vậy bạn có thể cho tôi biết chuỗi khối là gì không? Nó có lẽ chỉ là một chuỗi các khối này. Đây là chuỗi khối của tôi — khối số một có một nonce giống như trước, một vùng dữ liệu, nhưng sau đó nó có trường "trước đó" này là một dãy các số không. Tiếp tục, đây là khối hai, khối ba, khối bốn — chuỗi khối này có năm khối trên đó.

Trường "trước đó" cho mỗi khối là mã băm của khối trước nó. Bạn có thể thấy rằng mỗi khối trỏ ngược lại khối trước nó. Khối đầu tiên đó không có khối trước đó, vì vậy nó chỉ là một dãy các số không.

Điều gì xảy ra nếu tôi thay đổi một số thông tin ở đây? Nó sẽ thay đổi mã băm của khối này và làm cho nó không hợp lệ. Nhưng điều gì sẽ xảy ra nếu tôi thay đổi một cái gì đó trong một khối trước đó? Nó sẽ thay đổi mã băm đó, nhưng mã băm đó được sao chép lên trường "trước đó" của khối tiếp theo, vì vậy nó làm hỏng cả hai khối. Chúng ta có thể quay lại bao xa tùy thích đến một thời điểm nào đó trong quá khứ và làm hỏng khối đó, và nó sẽ làm hỏng tất cả các khối kể từ đó. Mọi thứ trước nó vẫn có màu xanh lá cây, nhưng mọi thứ sau nó đều chuyển sang màu đỏ.

Nếu tôi đi và thay đổi khối cuối cùng, tất cả những gì tôi phải làm là khai thác lại khối đó. Nếu tôi quay ngược thời gian và thực hiện một thay đổi, tôi phải khai thác khối này, khối này, khối này và khối này. Càng nhiều khối trôi qua, việc thực hiện thay đổi càng trở nên khó khăn hơn. Đó là cách một chuỗi khối chống lại sự đột biến — chống lại sự thay đổi.

#### Chuỗi khối phân tán (9:18) {#distributed-blockchain-918}

Vậy làm sao tôi biết liệu chuỗi khối của mình đã được khai thác lại hay chưa? Bây giờ chúng ta có một chuỗi khối phân tán. Nó trông hoàn toàn giống như chuỗi khối trước đó, nhưng đây là Nút ngang hàng A. Nếu bạn đi xuống đây, bạn có thể thấy Nút ngang hàng B, và nó có một bản sao chính xác của chuỗi khối. Ngoài ra còn có Nút ngang hàng C — điều này có thể tiếp diễn mãi mãi. Có rất nhiều nút ngang hàng trên internet, và tất cả chúng đều có một bản sao hoàn chỉnh của chuỗi khối.

Nếu tôi nhìn vào mã băm này, nó là `e4b`. Nếu tôi đi xuống cái tiếp theo, nó cũng có `e4b`. Chúng chắc chắn giống hệt nhau. Bây giờ nếu tôi vào đây và gõ một cái gì đó, khai thác lại khối này, và sau đó khai thác các khối tiếp theo — tất cả các chuỗi đều có màu xanh lá cây. Tuy nhiên, chuỗi này nói rằng mã băm cuối cùng là `e4b`, chuỗi dưới cùng cũng nói là `e4b`, và chuỗi ở giữa này nói là `4cae`.

Vì vậy, tôi biết chỉ bằng cách liếc nhìn vào một mã băm nhỏ này rằng có điều gì đó không ổn trong chuỗi khối này. Mặc dù tất cả các mã băm đều bắt đầu bằng bốn số không, nhưng mã băm này lại khác. Về cơ bản nó là hai chọi một — chúng ta là một nền dân chủ nhỏ ở đây. Vì vậy `e4b` chiến thắng. Đó là cách mà việc có một bản sao được phân tán hoàn toàn trên nhiều máy tính khác nhau cho phép bạn nhanh chóng xem liệu tất cả các khối có giống hệt nhau hay không.

Các chuỗi khối có thể có 400.000 hoặc 500.000 khối rất dễ dàng. Thay vì kiểm tra qua tất cả chúng, tất cả những gì bạn thực sự phải làm là nhìn vào mã băm của khối gần đây nhất, và bạn có thể xem liệu có bất cứ điều gì trong quá khứ đã bị thay đổi hay không.

#### Token (12:17) {#tokens-1217}

Đó là toàn bộ vấn đề — không có gì hơn thế nữa. Nhưng nó có vẻ không thực sự hữu ích vì chúng ta không có bất cứ thứ gì trong vùng dữ liệu có ý nghĩa. Những gì chúng ta thực sự muốn là một token.

Bây giờ tôi có những token này — hoàn toàn tùy ý, tôi gọi chúng là đô la. Chúng ta có hai mươi lăm đô la từ Darcy cho Bingley, bốn đô la và hai mươi bảy xu từ Elizabeth cho Jane — bạn hiểu ý rồi đấy. Có tất cả những giao dịch này đang diễn ra, và tôi vừa thay thế dữ liệu bằng những giao dịch này. Giống như trước đây, nếu chúng ta đi xuống, chúng ta nhận thấy chúng ta có tất cả các bản sao khác của cùng một chuỗi khối.

Đây là lúc tính bất biến trở nên quan trọng. Nếu tôi thay đổi một cái gì đó ở đây, mã băm sẽ khác với những gì có trên các bản sao khác. Rất quan trọng là nếu bạn quay ngược thời gian và thay đổi một số giá trị, chúng ta sẽ nhận ra. Rất quan trọng với tiền bạc là bạn không bị mất dấu, và đó là toàn bộ mục đích của việc sử dụng một chuỗi khối — chống lại bất kỳ loại sửa đổi nào đối với những thứ đã xảy ra trong quá khứ.

Một điều tôi muốn đề cập: chúng ta không liệt kê "Darcy có một trăm đô la và anh ấy đang đưa 25 cho Bingley." Chúng ta chỉ ghi nhớ các luồng di chuyển tiền, không phải số dư tài khoản ngân hàng. Điều này đặt ra câu hỏi — Darcy có 25 đô la không?

#### Giao dịch Coinbase (14:34) {#coinbase-transaction-1434}

Chúng ta có một vấn đề trong phiên bản chuỗi khối này: chúng ta thực sự không biết liệu Darcy có 25 đô la hay không. Vì vậy, hãy xem xét một giao dịch Coinbase. Chúng ta thêm một giao dịch Coinbase vào các khối của mình — nó nói rằng chúng ta sẽ tạo ra một trăm đô la từ hư không và đưa nó cho Anders. Không có giao dịch nào khác trong khối này vì không ai có tiền trước đó.

Trong khối tiếp theo, một trăm đô la khác lại xuất hiện từ hư không và thuộc về Anders. Bây giờ chúng ta có một số giao dịch — tất cả đều từ Anders vì tôi là người duy nhất có tiền vào thời điểm này. Tôi đang gửi mười đô la của mình cho Sophie. Tôi có mười đô la không? Có — tôi nhìn lại và thấy rằng giao dịch Coinbase đã cho tôi một trăm, vì vậy tôi có ít nhất mười.

Bạn cộng tất cả những thứ này lại và chúng không vượt quá một trăm. Nó tuân theo một quy tắc cơ bản của tiền tệ: bạn không thể tạo ra tiền từ hư không, và sự phân tán của nó được kiểm soát.

Nếu chúng ta tua nhanh thời gian, chúng ta thấy rằng Jackson đang đưa cho Alexa hai đô la. Jackson có thực sự có hai đô la không? Chúng ta quay lại một khối và thấy rằng Emily đã nhận được mười đô la từ Anders và đưa mười đô la cho Jackson. Vì vậy, Jackson thực sự có tiền. Chúng ta có thể quay ngược lại và tìm ra điều đó — đó là một trong những lợi ích của việc có trường "trước đó".

#### Lời kết (16:30) {#closing-1630}

Đó là một chuỗi khối cơ bản chạy một loại tiền tệ trên đó. Như bạn đã biết, các chuỗi khối có nhiều bản sao — mọi người đều có một bản sao. Nếu chúng ta làm đột biến một cái gì đó và biến nó thành sáu đô la, các khối sẽ trở nên không hợp lệ và không khớp với các bản sao khác. Điều này chống lại sự giả mạo, đó là những gì bạn muốn cho một loại tiền tệ. Nó hoạt động rất tốt cho những thứ nhỏ và mang tính giao dịch.

Chuỗi khối là một cách rất hiệu quả để xử lý sự đồng thuận về những gì đã xảy ra trong quá khứ — lịch sử bất biến này đi cùng với thời gian. Chúng ta đang lướt qua một số điểm chính, nhưng nếu bạn tìm hiểu sâu vào bản demo, nhấp qua những thứ này và thử nghiệm với nó, bạn sẽ ngày càng hiểu rõ hơn về cách thức hoạt động của nó.