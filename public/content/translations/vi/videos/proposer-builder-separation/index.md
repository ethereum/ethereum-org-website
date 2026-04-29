---
title: "Vượt ra ngoài Giao thức Ethereum: tách biệt người đề xuất và người xây dựng"
description: "Một bài thuyết trình về tách biệt người đề xuất và người xây dựng (PBS), một mẫu thiết kế tách biệt vai trò xây dựng khối và đề xuất khối trong Ethereum."
lang: vi
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "lộ trình"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "Giải thích về PBS"
---

Bài thuyết trình này giải thích cách thức sản xuất khối của Ethereum đã phát triển từ một mô hình đơn giản thành một chuỗi cung ứng tinh vi bao gồm các trình xác thực, trình xây dựng, người tìm kiếm và relay. Barnabé Monnot từ Tổ chức Ethereum sẽ trình bày lý do tại sao lại có sự tách biệt người đề xuất và người xây dựng (PBS), cách các relay MEV-Boost làm trung gian cho mối quan hệ giữa người đề xuất và trình xây dựng, cũng như những giải pháp trong giao thức nào đang được khám phá để giảm bớt sự phụ thuộc vào niềm tin và cải thiện khả năng chống kiểm duyệt, phân phối MEV và sự phi tập trung của trình xác thực.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=u8XvkTrjITs) được xuất bản bởi CBER Forum. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

Tên tôi là Barnabé Monnot. Tôi sẽ nói một chút về những gì đang diễn ra bên ngoài Giao thức, và cụ thể là khái niệm tách biệt người đề xuất và người xây dựng (PBS) cũng như cách nó được vận hành với các relay và rất nhiều cơ sở hạ tầng ngoài chuỗi.

Tôi thích nghĩ về Giao thức như một đối tượng trừu tượng có những sức mạnh nhất định. Một trong những sức mạnh mà Giao thức có là khả năng trao quyền cho một số người tham gia nhất định. Chúng ta đã thấy trong bài nói chuyện trước rằng Giao thức trao quyền cho các trình xác thực để thực hiện các nhiệm vụ đồng thuận, nhưng đó không phải là điều duy nhất họ làm — chúng ta cũng phải đóng gói các khối với các giao dịch. Chúng tôi gọi đó là các nhiệm vụ thực thi, và đó là điều tôi muốn tập trung vào trong bài nói chuyện này.

#### Tại sao các trình xác thực sử dụng trình xây dựng (0:46) {#why-validators-use-builders-046}

Điều thú vị là mặc dù Giao thức là nơi khởi nguồn những quyền này và trao chúng cho các trình xác thực, những gì chúng ta quan sát thấy trong thực tế là nhiều trình xác thực chọn không tự mình thực thi quyền đó. Họ chọn trao quyền cho người khác để thực hiện thay cho họ. Và "người khác" đó được chúng ta biết đến trong Ethereum với tư cách là các trình xây dựng.

Vì vậy, những gì chúng ta quan sát thấy là mặc dù các trình xác thực tiếp tục tự mình thực hiện các nhiệm vụ đồng thuận này, họ quyết định chuyển giao các nhiệm vụ thực thi cho các trình xây dựng. Đây thực sự là một thị trường khá lớn. Ngày nay, khoảng 90% các khối được tạo ra bởi các trình xây dựng bên ngoài, và điều đó đã diễn ra kể từ khoảng tháng 12 năm 2022 — ba tháng sau The Merge. Khoản thanh toán trung vị từ trình xây dựng cho trình xác thực là khoảng 120 đô la cho mỗi khối. Có một triệu đô la được thanh toán hàng ngày, và cứ mỗi 12 giây lại có khả năng thị trường này đạt được một thỏa thuận nào đó giữa một người đề xuất và một trình xây dựng.

Hôm nay tôi muốn thảo luận về lý do tại sao các trình xác thực sử dụng trình xây dựng, mối quan hệ đó bắt nguồn từ đâu — tôi sẽ giới thiệu một chút về MEV và người tìm kiếm trong quá trình này — sau đó tôi sẽ cho bạn biết mối quan hệ này được làm trung gian như thế nào, và tôi sẽ nói về các relay tồn tại ngày nay cũng như các giải pháp trong giao thức mà chúng tôi đang xem xét. Tôi cũng muốn nhìn nhận tổng thể một chút, bởi vì rất dễ nhìn vào những bức tranh này và nghĩ rằng "ồ điều này thật đáng sợ, còn sự phi tập trung thì sao?" Tôi muốn cho bạn thấy rằng đây là những sự đánh đổi đang được thực hiện, nhưng theo ý kiến của tôi là đang đi đúng hướng.

#### Mô hình ngây thơ và MEV (3:04) {#the-naive-model-and-mev-304}

Bạn có thể nghĩ về một mô hình sản xuất khối ngây thơ, trong đó trình xác thực được chọn theo quy trình chọn người lãnh đạo, và họ phải tạo ra một khối chứa danh sách các giao dịch từ mempool. Trong mô hình ngây thơ nhất, bạn thực sự chỉ có hai bên — một trình xác thực lắng nghe mempool, và khi đến lượt họ tạo khối, họ lấy ra các giao dịch trả phí cao nhất và thêm chúng vào, thường sử dụng các thuật toán đóng gói không mấy tinh vi.

Những gì đã được quan sát thấy khá rõ rệt trong năm năm qua là điều này mang lại rất nhiều quyền lực cho người sản xuất — đặc biệt là quyền được xem xét cuối cùng (last look). Họ thấy những gì người dùng muốn làm, ví dụ họ thấy rằng người dùng muốn hoán đổi một thứ gì đó, và họ có thể sử dụng thông tin đó để trích xuất lợi nhuận cho chính mình.

Trong trường hợp tốt nhất, lợi nhuận này đến từ chức năng thị trường tự nhiên như kinh doanh chênh lệch giá. Trong trường hợp xấu nhất, nó có thể đến trực tiếp từ túi của người dùng, như trong trường hợp của các cuộc tấn công sandwich. Ví dụ, một người dùng đặt lệnh hoán đổi token A lấy token B trên một thị trường nào đó như Uniswap. Giao dịch đó sẽ tạo ra sự mất cân bằng giá với một thị trường khác được triển khai trên cùng một Chuỗi. Người sản xuất có thể nhìn thấy giao dịch đang chờ xử lý và chèn giao dịch của chính họ để thực hiện hoán đổi theo hướng ngược lại trên một thị trường khác, bỏ túi khoản chênh lệch giá trong quá trình này.

Điều này thực sự mang lại rất nhiều quyền lực cho người sản xuất và làm cho vị trí người sản xuất khối trở nên cực kỳ có giá trị. Đặc quyền của người sản xuất này là thứ mà chúng ta hiện gọi là **giá trị có thể trích xuất tối đa (MEV)**.

#### Vai trò của người tìm kiếm (5:43) {#the-role-of-searchers-543}

Trong thực tế, những người sản xuất có thể không biết giá trị nằm ở đâu. Bạn có thể có những người sản xuất khối không mấy tinh vi — như đã đề cập, bất kỳ ai cũng có thể trở thành trình xác thực miễn là họ có đủ vốn và có khả năng chạy một nút. Trong thực tế, tôi có thể không biết cách kinh doanh chênh lệch giá hay bất cứ điều gì về thị trường tài chính. Điều tôi muốn là có ai đó nói cho tôi biết những cơ hội này ở đâu — một thị trường gồm những người cạnh tranh để nói cho tôi biết điều tốt nhất nên làm với tư cách là người sản xuất khối.

Những thực thể rất giỏi trong việc tìm kiếm cơ hội này, chúng tôi gọi họ là **người tìm kiếm**. Họ đưa các cơ hội ra ánh sáng cho người sản xuất khối. Người tìm kiếm có thể quan sát thấy một người dùng đang thực hiện hoán đổi, thông qua mempool công khai hoặc thông qua các dark pool hay các kênh riêng tư, và sau đó giao tiếp với trình xác thực: "Đang có một giao dịch hoán đổi diễn ra — nếu bạn đóng gói giao dịch hoán đổi này cùng với giao dịch chênh lệch giá này thành một gói các giao dịch nguyên tử và đưa gói này vào, thì bạn có thể kiếm tiền từ chênh lệch giá." Bạn sẽ có nhiều người tìm kiếm cạnh tranh để thuyết phục người sản xuất khối.

Mô hình này hoạt động tốt trong thực tế nếu người tìm kiếm tin tưởng người sản xuất sẽ giữ cho gói giao dịch mang tính nguyên tử. Gần đây bạn có thể đã nghe nói về một cuộc tấn công trên Ethereum gây thiệt hại 25 triệu đô la cho một nhóm những kẻ tấn công sandwich — nguyên nhân gốc rễ là kẻ tấn công đã phá vỡ được tính nguyên tử của các gói, nhận nội dung và cố gắng tổ chức lại cũng như sửa đổi chúng. Đó là một thuộc tính rất quan trọng thực sự chỉ được duy trì chừng nào người sản xuất có thể được tin tưởng là không phá vỡ tính nguyên tử này.

#### Tại sao chúng ta cần trình xây dựng (8:16) {#why-we-need-builders-816}

Bạn sẽ làm gì nếu một người sản xuất không đáng tin cậy? Sau The Merge trong Ethereum, chúng ta có những người đặt cọc độc lập — chiếm khoảng 6% mạng lưới — những người mà chúng ta không biết. Những người tìm kiếm sẽ không thực sự muốn gửi các gói giao dịch cho những người đề xuất khối này vì nó hơi quá nguy hiểm.

Vì vậy, thiết kế được đưa ra là: thay vì để người tìm kiếm truyền đạt các gói giao dịch mà người sản xuất sẽ đưa vào khối của họ, chúng tôi sẽ tạo ra toàn bộ khối cho bạn. Bằng cách đó, bạn chỉ cần ký mù vào khối — bạn không cần biết có gì trong đó, bạn tin tưởng rằng trình xây dựng đang cung cấp cho bạn một khối tốt.

Bây giờ bạn có một chuỗi thậm chí còn sâu hơn: trình xác thực ở một đầu, người dùng ở đầu kia, và ở giữa là toàn bộ chuỗi các bên trung gian này tiếp tục trở nên dày đặc hơn theo thời gian. Trình xây dựng thực hiện phần thực thi trong khi trình xác thực thực hiện phần đồng thuận.

#### Cách các relay MEV-Boost hoạt động (13:01) {#how-mev-boost-relays-work-1301}

Giả sử bạn là một người đề xuất và bạn muốn tham gia vào thị trường này. Dịch vụ sản xuất khối này là một bài toán trao đổi công bằng kinh điển — hai bên cố gắng đạt được thỏa thuận nhưng họ không tin tưởng lẫn nhau. Các tài liệu kinh điển cho bạn biết rằng bạn không thể thực hiện trao đổi công bằng mà không có một bên thứ ba đáng tin cậy.

Những gì chúng ta sử dụng ngày nay như một bên thứ ba đáng tin cậy là thứ mà chúng ta gọi là **relay** — relay MEV-Boost. MEV-Boost là tên của Giao thức làm trung gian cho các tương tác giữa trình xây dựng và trình xác thực. Relay nằm ở giữa để đảm bảo rằng thỏa thuận đạt được các điều khoản từ cả hai phía.

Relay có một vài vai trò. Đầu tiên, nó cần xác thực tải trọng của một trình xây dựng — relay nhìn thấy rõ ràng khối mà trình xây dựng đang tạo ra và có thể kiểm tra xem nó có hợp lệ và có thể được đề xuất lên mạng lưới hay không. Có một biến thể được gọi là relay lạc quan, trong đó relay không kiểm tra tính hợp lệ ngay lập tức mà yêu cầu trình xây dựng cung cấp tài sản thế chấp trong trường hợp khối cuối cùng không hợp lệ.

Thứ hai, các trình xây dựng đang đưa ra các giá thầu cố gắng cạnh tranh để trở thành trình xây dựng được trình xác thực lựa chọn. Relay hoạt động như một bộ chuyển tiếp giá thầu, gửi các giá thầu đến trình xác thực. Sau đó ở bước cuối cùng, một khi trình xác thực chọn một trong các giá thầu từ relay — và trình xác thực có thể kết nối với bao nhiêu relay tùy thích — họ ký vào nó, vẫn không biết nội dung khối là gì, và gửi lại giá thầu đã ký cho relay. Với giá thầu đã ký này, relay có thể phát hành khối lên mạng lưới.

Tính kinh tế của các relay rất phức tạp. Một số thì miễn phí, giống như hàng hóa công cộng. Những relay khác đã phát triển các mô hình doanh thu — ví dụ như relay Ultrasound, có một "sự điều chỉnh giá thầu" nơi họ lấy phần chênh lệch giữa giá thầu tốt nhất và giá thầu tốt thứ hai làm doanh thu.

#### Niềm tin và relay (17:01) {#trust-and-the-relay-1701}

Relay là bên thứ ba đáng tin cậy trong hệ thống. Giả sử một relay phục vụ một khối không hợp lệ — mọi người sẽ ngay lập tức nhìn thấy nó vì nó đã được ký, và họ sẽ rất nhanh chóng ngắt kết nối khỏi relay đó. Bạn thậm chí có thể lan truyền một loại bằng chứng lỗi nào đó. Trong vòng năm khối, nếu relay không hoạt động tốt, mọi người sẽ ngừng tin tưởng nó và chỉ cần ngắt kết nối.

Vì vậy, nó dựa trên niềm tin, nhưng với giả định rằng nó có thể được thay thế khá nhanh chóng. Các relay không phải là trình xác thực — chúng không nhất thiết phải có khoản đặt cọc và chúng không cần phải có bất kỳ liên quan nào đến Ethereum. Đó có thể là những người chúng ta biết và yêu mến hôm nay, nhưng ngày mai có thể là bất kỳ ai.

#### Tích hợp PBS vào trong giao thức (20:01) {#enshrining-pbs-in-the-protocol-2001}

Chúng tôi đang cố gắng loại bỏ trạng thái bên thứ ba đáng tin cậy của relay. Chúng ta có một bên thứ ba đáng tin cậy mà chúng ta thích trong Ethereum — và đó chính là bản thân Ethereum. Bạn có thể thiết kế các giải pháp trong giao thức cố gắng về cơ bản là tích hợp vai trò của relay và làm cho sự phụ thuộc vào nó trở thành tùy chọn.

Hiện tại, Giao thức Ethereum nhìn thấy một phần những gì các trình xác thực đang làm nhưng hoàn toàn mù tịt về mạng lưới các trình xây dựng. Chúng tôi đang cố gắng thúc đẩy để Giao thức Ethereum trở thành bên thứ ba đáng tin cậy trong sự tương tác giữa người đề xuất và trình xây dựng — theo nghĩa đó, chúng ta không cần phải dựa vào relay nữa.

#### Ràng buộc trình xây dựng, khuếch đại sự phi tập trung (22:05) {#constraining-builders-amplifying-decentralization-2205}

Bức tranh toàn cảnh rất quan trọng. Ở mỗi lớp dường như có những trò chơi khác nhau đang diễn ra và những người chơi khác nhau đang lấy tiền của nhau — liệu đây có phải là tài chính truyền thống lặp lại một lần nữa không? Tôi muốn lập luận rằng những sự đánh đổi này không xuất phát từ một ý định xấu. Chúng cố gắng dựa vào các thuộc tính của những hệ thống này mà chúng tôi cho là hữu ích để mở rộng quy mô và làm cho chúng trở nên hữu dụng hơn.

Vitalik đã nói về một sự bất đối xứng cơ bản của các dịch vụ mà một Chuỗi khối có thể cung cấp. Sự đồng thuận yêu cầu một tập hợp rất lớn những người phi tập trung để kiểm tra. Nhưng một số dịch vụ thực sự chỉ cần một người làm tốt công việc và để mọi người khác xác minh rằng công việc đó đã được làm tốt. Chúng ta chỉ cần một trình xây dựng để tạo ra một khối, và sau đó mọi người đều có thể xác minh rằng nó hợp lệ.

Ngày nay rõ ràng có ba trình xây dựng thống trị: Beaver Build, Titan và rsync Builder. Đó có phải là một trạng thái tốt không? Không hẳn — chúng ta có thể làm tốt hơn. Nhưng có thực tế không khi tưởng tượng rằng chúng ta sẽ có số lượng trình xây dựng nhiều bằng số lượng trình xác thực? Có lẽ là không.

Những gì chúng ta thực sự muốn là lớp trình xác thực mỏng này ràng buộc và tận dụng thực tế là có những bên có năng lực cao ở giữa có thể thực hiện các nhiệm vụ không yêu cầu các giả định về đa số trung thực.

Một số ý tưởng để ràng buộc các trình xây dựng:

- **Danh sách bao gồm (Inclusion lists)** — nơi trình xác thực nói với trình xây dựng "bạn phải đưa những giao dịch này vào khối của mình"
- **Xây dựng khối một phần (Partial block building)** — chia nhỏ toàn bộ khối để trình xây dựng không độc quyền trên toàn bộ không gian
- **Giảm sự phụ thuộc vào bên thứ ba** — tích hợp vai trò của relay vào trong Giao thức

Để khuếch đại sự phi tập trung của trình xác thực:

- **Tách biệt người chứng thực và người đề xuất (Attester-proposer separation)** — thay vì mặc định biến trình xác thực thành người sản xuất khối, hãy chọn một nhóm người khác để trở thành người sản xuất khối và tách biệt các vai trò
- **Cải thiện cơ chế đặt cọc** — việc đặt cọc trong Ethereum ngày nay hơi thô sơ và có thể được cải thiện

#### Câu hỏi và kết thúc (27:03) {#questions-and-closing-2703}

Một câu hỏi từ khán giả: trong thế giới tài chính truyền thống, thời gian quyết toán đang được giảm từ hai ngày xuống còn một ngày. Liệu việc giảm thời gian quyết toán từ 12 giây xuống một khoảng thời gian ngắn hơn có giải quyết được một số vấn đề chạy trước không?

Mọi người đang nói về điều này — họ gọi nó là **xác nhận trước (pre-confirmations)**. Ý tưởng là bạn gửi giao dịch của mình và ai đó nói với bạn "bạn đã được đưa vào, ở mức giá này, trên trạng thái đó." Vấn đề là, bạn không thể quyết toán nhanh hơn tốc độ hoạt động của Giao thức. Bạn không thể có được quyết toán tính chung cuộc nhanh hơn 12 phút. Bạn không thể di chuyển nhanh hơn thời gian tạo khối.

Việc rút ngắn thời gian tạo khối là rất khó vì chúng tôi muốn giữ cho lớp trình xác thực phi tập trung nhất có thể, và việc rút ngắn nó chỉ làm tăng các yêu cầu về phần cứng.