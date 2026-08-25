---
title: "Giải thích về việc đặt cọc lại"
description: "Bài giải thích về việc đặt cọc lại, sử dụng ETH đã đặt cọc để cung cấp bảo mật cho các giao thức và dịch vụ bổ sung ngoài lớp cơ sở của Ethereum."
lang: vi
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "restaking"
  - "security"
format: explainer
author: CBER Forum
breadcrumb: "Đặt cọc lại"
---

Một bài thuyết trình của **Mike Neuder** tại sự kiện CBER Forum trình bày về cách thức hoạt động của việc đặt cọc lại. Bài thuyết trình định nghĩa về tự đặt cọc, đặt cọc ủy quyền, đặt cọc lại gốc và không gốc, cơ chế của đặt cọc thanh khoản và token đặt cọc lại thanh khoản, cũng như cách việc phạt cắt giảm tương tác với các vị thế đã đặt cọc lại.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=rOJo7VwPh7I) được xuất bản bởi CBER Forum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Chào mọi người, tôi là Mike. Tôi sẽ nói về LRT và LST. LRT — liệu đặt cọc lại có phải là hình thức đặt cọc mới không? Tôi sẽ bắt đầu với một câu hỏi thứ hai và sử dụng nó để thúc đẩy cuộc thảo luận về LST và LRT, định nghĩa chúng là gì. Đây chủ yếu là một bài thuyết trình bằng hình ảnh, vì vậy hy vọng chúng ta có thể bắt đầu từ đầu và cùng nhau xây dựng.

Dàn ý nhanh: bắt đầu từ những điều cơ bản nhất, chúng ta sẽ định nghĩa hai chế độ đặt cọc. Đầu tiên là tự đặt cọc, thứ hai là đặt cọc ủy quyền. Sau đó, chúng ta sẽ đi vào khái niệm đặt cọc lại và định nghĩa nó. Có bốn mô hình khác nhau mà tôi muốn khám phá — sử dụng sự phân tách giữa tự đặt cọc và ủy quyền, sau đó tập trung vào đặt cọc lại gốc so với đặt cọc lại không gốc. Sau đó, chúng ta sẽ đi vào quá trình thanh khoản hóa, nói về các token thanh khoản — token staking thanh khoản (LST) và token đặt cọc lại thanh khoản. Chúng ta sẽ thúc đẩy điều này bằng cách xem xét việc phạt cắt giảm và đặt cọc lại, và sau đó là cả hai loại token. Cuối cùng, chúng ta sẽ kết thúc với một số dữ liệu xung quanh việc đặt cọc như nó đang tồn tại ngày nay trên Ethereum.

#### Tự đặt cọc (0:48) {#self-staking-048}

Bắt đầu từ những điều cơ bản nhất, chúng ta có việc đặt cọc nơi Alice tự mình thực hiện. Cô ấy tương tác trực tiếp với giao thức, đưa khoản đặt cọc vào giao thức và cô ấy nhận được phần thưởng cho việc đó thông qua việc phát hành token gốc. Trong trường hợp của Ethereum, Alice đặt cọc 32 ETH và nhận được phần thưởng bằng ETH vì đã tham gia vào quá trình đồng thuận.

Có hai điều cần tập trung ở đây. Đầu tiên, việc đặt cọc đóng vai trò như cơ chế chống Sybil này — bạn không thể đánh lừa mạng lưới rằng bạn có nhiều danh tính vì mỗi danh tính tiêu tốn một lượng nhất định từ nguồn cung token cố định này. Thứ hai là tài sản thế chấp chịu rủi ro — đây là những quy tắc của giao thức liên quan đến việc phạt cắt giảm. Nếu Alice có hành vi sai trái theo một số đặc tả được định nghĩa rất rõ ràng, giao thức sẽ lấy đi vốn của cô ấy và trừng phạt cô ấy vì đã làm như vậy.

#### Đặt cọc ủy quyền (2:52) {#delegated-staking-252}

Đặt cọc ủy quyền thêm một lớp nữa ở giữa Alice và giao thức. Alice bây giờ ủy quyền cho Bob, người sẽ đặt cọc vào giao thức Ethereum. Phần thưởng được gửi cho Bob, và phần thưởng sau khi trừ phí được chuyển tiếp cho Alice. Đây là phiên bản đơn giản nhất của đặt cọc ủy quyền — Alice không muốn tự chạy phần mềm, có thể cô ấy không có đủ 32 ETH, hoặc không có phần cứng hay chuyên môn kỹ thuật để chạy một trình xác thực.

Có nhiều chế độ khác nhau của sự ủy quyền này ở các mức độ tin cậy khác nhau. Phiên bản cần nhiều sự tin tưởng nhất là có lưu ký — bạn gửi ETH của mình cho Coinbase và nói "hãy đặt cọc thay cho tôi." Bạn thực sự tin tưởng họ hoàn toàn vì họ lưu ký tài sản dưới tên của bạn. Có một phiên bản không lưu ký nhưng được quản trị bởi DAO, nơi bạn ủy quyền khoản đặt cọc của mình cho một người được xác định bởi một DAO bỏ phiếu xem ai sẽ được chạy các nút — đây là kiểu đặt cọc của Lido. Thứ ba là phiên bản tối thiểu hóa niềm tin nơi cả Alice và Bob đều đưa ra một số tài sản thế chấp. Alice trợ cấp phần còn lại cho tài sản thế chấp của Bob, và nếu Bob có hành vi sai trái và bị phạt cắt giảm, tài sản thế chấp của anh ta là phần đầu tiên bị loại bỏ. Tôi nói "tối thiểu hóa niềm tin" chứ không phải "không cần tin cậy" vì dù thế nào đi nữa, vẫn có những trường hợp mà tài sản thế chấp của Alice bị xóa sạch hoàn toàn tùy thuộc vào những gì Bob làm.

#### Tự đặt cọc lại với ETH gốc (4:42) {#self-restaking-with-native-eth-442}

Bây giờ chúng ta có thể nói về việc đặt cọc lại là gì. Đây là một khái niệm hoàn toàn mới — nó đã xuất hiện kể từ khi Sreeram và EigenLayer giới thiệu thuật ngữ này có lẽ khoảng một năm rưỡi hoặc hai năm trước.

Trong mô hình này, Alice làm điều tương tự như cô ấy đã làm trước đây — cô ấy gửi khoản đặt cọc của mình vào giao thức Ethereum và nhận được phần thưởng vì đã tham gia vào quá trình đồng thuận. Bây giờ chúng ta có một giao thức mới — gọi nó là "Retheum" — mà Alice đặt cọc lại vào đó. Điều quan trọng ở đây là cô ấy đang sử dụng cùng những token mà cô ấy đang đặt cọc trong giao thức Ethereum để bảo mật cho giao thức thứ hai này.

Cô ấy nhận được phần thưởng cho việc đó. Điều này có vẻ tuyệt vời — Alice bây giờ có khả năng nhận được gấp đôi phần thưởng cho cùng một lượng đặt cọc. Nhưng rủi ro là số vốn mà cô ấy đã đặt cọc trong cả hai giao thức hiện bị ràng buộc bởi các quy tắc của cả hai giao thức. Nếu Alice có hành vi sai trái trên Ethereum, cô ấy có thể mất vốn do bị phạt cắt giảm. Nếu cô ấy có hành vi sai trái trên "Retheum," cô ấy cũng có thể bị phạt cắt giảm. Lợi nhuận tăng thêm đi kèm với trách nhiệm tăng thêm — các hành vi giao thức được bắt buộc và có thể bị trừng phạt theo những cách khác nếu bạn ràng buộc token đặt cọc của mình trên nhiều giao thức khác nhau.

#### Đặt cọc lại gốc có ủy quyền (8:28) {#delegated-native-restaking-828}

Phiên bản thứ hai là đặt cọc lại ủy quyền với ETH gốc. Alice đang đặt cọc với Ethereum, và bây giờ cô ấy muốn sử dụng Bob để ủy quyền khoản đặt cọc của mình cho giao thức "Retheum". Cô ấy ủy quyền cho Bob, Bob đặt cọc lại, giao thức phát hành phần thưởng cho Bob, và Bob phát hành phần thưởng sau khi trừ phí cho Alice.

Theo mô hình này, 32 ETH trong giao thức Ethereum phải chịu trách nhiệm cho hành động của cả Alice và Bob — hai người có khả năng làm cho số ETH này bị phạt cắt giảm. Token bị ràng buộc bởi hai bộ quy tắc giao thức khác nhau.

**Câu hỏi từ khán giả:** Khi bạn đặt cọc ETH trong giao thức Ethereum, giao thức phải cung cấp cho bạn một thứ gì đó mà sau đó bạn xuất trình — thứ đó là gì?

Trong phiên bản gốc này, Alice đặt cọc và có cái được gọi là thông tin xác thực rút tiền từ hệ sinh thái Ethereum. Thông tin xác thực rút tiền đó có thể được trỏ đến một hợp đồng trên Ethereum xử lý lớp đặt cọc thứ hai. Đó là một hợp đồng kiểm soát các tài sản khi bạn rút tiền từ Ethereum — nó giống như việc lưu ký không cần tin cậy trong hợp đồng thông minh thực thi lớp hình phạt cắt giảm thứ hai.

Tại sao điều này được gọi là "gốc?" Bởi vì Alice vẫn đang tương tác trực tiếp với Ethereum — khoản đặt cọc của cô ấy là 32 ETH mà cô ấy sở hữu, được sử dụng để bảo mật lớp đồng thuận của Ethereum.

#### Đặt cọc lại không gốc (10:57) {#non-native-restaking-1057}

Tự đặt cọc lại trong bối cảnh không gốc: Alice chỉ đang tương tác với giao thức "Retheum". Cô ấy không chạy một nút trên Ethereum. Cô ấy đặt cọc lại — mặc dù tôi đặt chữ "lại" trong ngoặc kép vì cô ấy không thực sự đặt cọc lại, mà ngay từ đầu đó đã là việc đặt cọc. Lý do duy nhất nó được gọi là đặt cọc lại là vì điều này diễn ra thông qua một giao thức cũng tạo điều kiện cho các loại hình đặt cọc lại khác.

Cô ấy lấy các token không gốc — đây có thể là USDC, một stablecoin euro, wrapped Bitcoin, bất cứ thứ gì — cô ấy cung cấp nó như một sự bảo mật kinh tế và chống Sybil cho giao thức và kiếm được phần thưởng. Điều này đang định nghĩa lại việc đặt cọc lại như một thị trường cho niềm tin phi tập trung, nơi niềm tin đề cập đến giá trị kinh tế của số vốn chịu rủi ro.

Đặt cọc lại ủy quyền với các token không gốc cũng tuân theo mô hình tương tự — Alice ủy quyền thông qua Bob và nhận được phần thưởng sau khi trừ phí.

#### Phạt cắt giảm và đặt cọc lại (13:55) {#slashing-and-restaking-1355}

Trước khi chúng ta đi vào Thanh khoản, hãy nói về việc phạt cắt giảm. Trong chế độ phạt cắt giảm bình thường, Alice đang đặt cọc trong giao thức Ethereum. Nếu cô ấy làm điều gì đó mà giao thức coi là sai — ví dụ, một xác nhận nước đôi, nơi cô ấy sử dụng khóa mật mã của mình để ký hai mẩu thông tin xung đột với nhau — đó là một lỗi khách quan. Mọi người đều có thể xác minh cả hai chữ ký đều do Alice ký, và đó là bằng chứng đủ để phạt cắt giảm các token của cô ấy.

Việc đặt cọc lại và phạt cắt giảm tương tác với nhau như thế nào? Trong phiên bản đơn giản nhất — tự đặt cọc lại với tài sản gốc — Alice đặt cọc vào Ethereum và cũng đặt cọc lại thông qua "Retheum". Nếu Alice tiếp tục làm công việc của mình trên giao thức "Retheum" nhưng lại xác nhận nước đôi trên Ethereum, bây giờ chúng ta có một vấn đề: cô ấy bị phạt cắt giảm trên Ethereum, nhưng "Retheum" chưa thấy bất cứ điều gì quy cho cô ấy là sai theo các quy tắc của họ. Phải có một số giao tiếp giữa hai giao thức.

Hướng giao tiếp này thực sự khá dễ dàng vì "Retheum" là một hợp đồng thông minh trên Ethereum — nó có thể đọc từ trạng thái Ethereum và nói "trình xác thực này đã bị phạt cắt giảm theo Ethereum," vì vậy trên giao thức bậc hai, Alice cũng bị phạt cắt giảm.

Hướng ngược lại thì khó hơn. Nếu Alice bị phạt cắt giảm trên nền tảng đặt cọc lại, Ethereum sẽ cần được thông báo. Nhưng Ethereum cố tình không quan tâm đến mọi thứ xảy ra trên lớp hợp đồng của nó xét về mặt cơ chế đồng thuận.

**Câu hỏi từ khán giả:** Tại sao điều đó lại quan trọng? Ethereum cần khoản đặt cọc cho những gì nó làm, nhưng số tiền đặt cọc lại là một phái sinh của bản gốc.

Vấn đề là nếu Alice bị phạt cắt giảm trên nền tảng đặt cọc lại, cô ấy thực sự không còn sở hữu khoản đặt cọc đó nữa. Cô ấy có thể làm bất cứ điều gì cô ấy muốn trên giao thức Ethereum mà không có vốn thực tế nào chịu rủi ro — đó là toàn bộ mục đích của việc có khoản đặt cọc ngay từ đầu. Nó giống như bạn đang sử dụng tiền cho hai việc, nó biến mất ở một việc, và việc kia phải nhận thức được rằng số tiền đó không còn là của bạn nữa. Nó vẫn có giá trị kinh tế theo một nghĩa nào đó, nhưng bạn không kiểm soát nó — vì vậy bạn không quan tâm điều gì xảy ra với nó vì nó đã biến mất.