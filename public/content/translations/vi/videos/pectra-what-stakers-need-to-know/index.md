---
title: "Bản nâng cấp Ethereum Pectra: những điều người đặt cọc cần biết"
description: "Giải thích bản nâng cấp Pectra từ góc độ của người đặt cọc, bao gồm các tác động thực tế đối với trình xác thực, hoạt động đặt cọc và các EIP chính ảnh hưởng đến việc đặt cọc trong giao thức Ethereum."
lang: vi
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra cho người đặt cọc"
---

Một hội thảo trực tuyến do **Blockdaemon** tổ chức với kỹ sư chuỗi khối Julia Schmidt (Alluvial) và Freddy Tänzer (Blockdaemon) thảo luận về cách bản nâng cấp Pectra tác động đến việc đặt cọc ETH. Hội thảo trực tuyến bao gồm các khoản rút tiền có thể kích hoạt từ lớp thực thi, việc tăng số dư hiệu dụng tối đa, việc hợp nhất trình xác thực và các tác động của đặt cọc thanh khoản.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=_UpAFpC7X6Y) do Blockdaemon xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:00) {#introduction-000}

**Người dẫn chương trình:** Xin chào và chào mừng đến với hội thảo trực tuyến do Blockdaemon tổ chức tập trung vào bản nâng cấp Pectra sắp tới của Ethereum. Cùng tham gia với chúng ta hôm nay là Julia Schmidt, kỹ sư chuỗi khối tại Alluvial, và Freddy Tänzer, trưởng nhóm hệ sinh thái Ethereum của Blockdaemon, để thảo luận về cách các thay đổi của Pectra sẽ tác động đến việc đặt cọc ETH, toàn bộ mạng lưới, các dịch vụ đặt cọc thanh khoản và hơn thế nữa. Để bắt đầu, Freddy — anh có thể cung cấp cho chúng tôi một cái nhìn tổng quan ngắn gọn về bản nâng cấp Pectra và tác động của nó đối với người đặt cọc sẽ là gì không?

#### Pectra là gì (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Pectra là một bản nâng cấp Ethereum dự kiến diễn ra vào cuối quý 1 năm 2025 — khoảng tháng 3, có thể lùi lại một chút, có lẽ là tháng 4 hoặc tầm đó. Ban đầu nó được cho là một phân nhánh nhỏ, và sau đó ngày càng có nhiều thứ được thêm vào, vì vậy hiện tại họ thực sự đã chia nó thành hai phần.

Phần đầu tiên chứa rất nhiều thứ — ví dụ, liên quan đến tài khoản thông minh, trừu tượng hóa tài khoản và những thứ tương tự — nhưng tôi thực sự muốn tập trung vào những điều có liên quan đến khán giả của chúng ta về các thay đổi trong việc đặt cọc. Chủ yếu có hai thay đổi lớn.

Điều đầu tiên là việc bạn có thể kích hoạt rút tiền và thoát khỏi trình xác thực của mình thông qua lớp thực thi — thông tin xác thực rút tiền — về cơ bản loại bỏ sự phụ thuộc vào người vận hành nút. Điều thứ hai, được cho là có tác động thậm chí còn lớn hơn, là số dư hiệu dụng tối đa của một trình xác thực hiện có thể thay đổi. Trước đây nó chỉ là 32 ETH như một số tiền cố định, và bây giờ nó có thể nằm trong khoảng từ 32 đến 2.048 ETH.

Cũng có một thay đổi nhỏ hơn về cơ bản dẫn đến việc các khoản tiền gửi nhanh hơn nhiều — được đăng ký trên chuỗi từ khoảng 14 giờ xuống còn chưa đầy một giờ — nhưng tôi nghĩ hai thay đổi kia là những thay đổi có liên quan nhất đến cuộc thảo luận của chúng ta ở đây.

#### EIP-7002: các lệnh thoát có thể kích hoạt từ lớp thực thi (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Người dẫn chương trình:** Đối với thay đổi lớn đầu tiên, Julia, cô có thể giải thích quy trình sau Pectra sẽ thay đổi như thế nào so với các cách hiện tại mà việc rút tiền được khởi tạo trong hệ sinh thái đặt cọc của Ethereum không?

**Julia Schmidt:** Để đề xuất và chứng thực các khối, trình xác thực cần phải liên tục trực tuyến và có số dư đặt cọc là 32 ETH. Khi bạn thiết lập một trình xác thực để tham gia vào cơ chế đồng thuận, bạn sẽ thiết lập hai khóa. Một là khóa trình xác thực, được sử dụng để thực hiện các nhiệm vụ của trình xác thực — việc ký các chứng thực khối. Hai là khóa rút tiền, đại diện cho quyền sở hữu số ETH đã đặt cọc.

Bạn có hai cách đặt cọc: đặt cọc độc lập, hoặc các thiết lập đa lưu ký như với Blockdaemon và như chúng tôi đang làm tại Liquid Collective, nơi bạn có thể chọn người vận hành nút của mình để thực hiện tất cả các nhiệm vụ của trình xác thực và hoạt động của trình xác thực thay mặt bạn. Điều đó cung cấp cho họ khóa trình xác thực, và bạn chỉ có quyền truy cập vào khóa rút tiền.

Thông điệp thực tế để thoát một trình xác thực chỉ có thể được gửi từ khóa trình xác thực do người vận hành nút kiểm soát. Điều đó đòi hỏi bạn phải tin tưởng người vận hành nút của mình — phụ thuộc vào họ để thoát trình xác thực cho bạn. Nếu họ làm điều đó, thì thật tuyệt, nhưng bạn luôn phải dựa vào bên thứ ba này.

Những gì đã xảy ra trước đây là bạn sẽ đồng ý ký trước các thông điệp thoát khi bạn thiết lập cấu hình đặt cọc đa lưu ký này. Bạn sẽ nhận được một thông điệp mà bạn có thể sử dụng sau này để thoát trình xác thực của mình, nhưng bạn sẽ không biết liệu thông điệp thoát đó có thực sự hoạt động hay không. Mỗi khi có một bản nâng cấp trong Ethereum làm thay đổi số phiên bản, thông điệp thoát của bạn có thể không còn hoạt động nữa.

Trong bản nâng cấp Dencun gần đây nhất, một EIP mới đã thay đổi thời gian hết hạn của các thông điệp thoát này — nhưng nó chỉ là điều trị triệu chứng, không giải quyết được vấn đề. Vấn đề thực sự là chủ sở hữu của số ETH đã đặt cọc không thể kích hoạt việc rút tiền. Tiền về cơ bản có thể bị người vận hành nút giữ làm con tin.

Điều này hiện đã được giải quyết với EIP-7002, cho phép cả khóa trình xác thực và khóa rút tiền kích hoạt việc thoát từ lớp thực thi — đơn giản bằng cách gửi một giao dịch đến một hợp đồng rút tiền đặc biệt, nơi bạn gửi yêu cầu rút tiền và chỉ định thoát toàn bộ trình xác thực, hoặc rút tiền một phần từ số dư đã đặt cọc.

#### EIP-7251: số dư hiệu dụng tối đa (4:15) {#eip-7251-max-effective-balance-415}

**Người dẫn chương trình:** Freddy, anh có thể cung cấp cho chúng tôi cái nhìn tổng quan về số dư hiệu dụng tối đa trong tương lai từ Pectra trở đi, và điều này sẽ tác động như thế nào đến những người hiện đang đặt cọc?

**Freddy Tänzer:** Chỉ muốn nói thêm — đối với các khách hàng tổ chức của chúng tôi, sự phụ thuộc này vào người vận hành nút thường được giải quyết bằng các thông điệp thoát được ký trước, chủ yếu để giải quyết các mối quan ngại từ các cơ quan quản lý hoặc các mối quan ngại về tính liên tục của hoạt động kinh doanh. Họ cũng phải giữ an toàn cho các thông điệp thoát đó. Vì vậy, có một sự đơn giản hóa rõ ràng trong quy trình, loại bỏ sự phụ thuộc đó.

Bây giờ, về số dư hiệu dụng tối đa: rất nhiều thứ không thay đổi, và tất cả những điều này đều là tùy chọn. Bạn không cần phải thay đổi bất cứ điều gì. Mục tiêu của các nhà phát triển cốt lõi Ethereum và toàn bộ hệ sinh thái là giảm số lượng trình xác thực trên mạng lưới. Hiện tại chúng ta có hơn một triệu trình xác thực, và mỗi trình xác thực phải giao tiếp với những trình xác thực khác về các chứng thực và đồng thuận. Đó là một lượng lớn lưu lượng mạng — các thử nghiệm đã chỉ ra rằng việc đạt tới hai triệu trình xác thực có thể là một vấn đề.

Mục tiêu là giảm số lượng trình xác thực mà không ảnh hưởng đến tính bảo mật của mạng lưới — vì tổng số lượng ETH được đặt cọc sẽ không đổi, chỉ là trung bình có nhiều ETH hơn trên mỗi trình xác thực.

Đối với khách hàng, điều đó chủ yếu có nghĩa là họ cần quyết định xem nên sử dụng loại trình xác thực mới hay loại cũ. Điều này phụ thuộc vào nhu cầu thanh khoản của họ. Trong thiết lập hiện tại với các trình xác thực 32 ETH, phần thưởng giao thức của bạn sẽ được đẩy đến thông tin xác thực rút tiền của bạn cứ sau chín hoặc mười ngày, mang lại cho bạn thanh khoản thường xuyên.

Nhưng nhiều thiết lập giả định rằng phần thưởng được sử dụng để gộp vào khoản đặt cọc. Trước đây, khi gộp, bạn sẽ cần đợi cho đến khi có 32 ETH tiền thưởng để khởi chạy thủ công một trình xác thực mới. Với loại trình xác thực mới, bạn tự động gộp phần thưởng của mình — điều đó có nghĩa là nhiều phần thưởng hơn và ít công việc hơn.

Sự đánh đổi là bạn không nhận được phần thưởng thường xuyên, và bạn cần thiết lập một quy trình để lấy lại chúng. Các lệnh kích hoạt rút tiền hiện là các giao dịch thông thường phải chịu phí gas, thay vì nhận phần thưởng miễn phí trong mô hình cũ.

Cũng có tin tốt về việc phạt cắt giảm: hình phạt cắt giảm ban đầu sẽ giảm đáng kể — khoảng 128 lần. Với một trình xác thực 32 ETH, hình phạt ban đầu là một ETH. Sau Pectra, nó sẽ là một phần nhỏ của một ETH — có thể là $20 hoặc $25. Điều này có những tác động phụ tích cực đối với việc đặt cọc độc lập, điều hiển nhiên là quan trọng đối với tính trung lập đáng tin cậy của Ethereum.

Lợi ích tự động gộp chủ yếu mang lại lợi ích cho các khoản đặt cọc nhỏ hơn. Nếu bạn có một nghìn trình xác thực, bạn có thể khởi chạy thủ công một trình xác thực mới hàng tháng. Nhưng nếu bạn chỉ có một trình xác thực, trên thực tế bạn sẽ cần đợi 32 năm để gộp.

#### Tác động của đặt cọc thanh khoản (11:25) {#liquid-staking-implications-1125}

**Người dẫn chương trình:** Julia, việc hợp nhất các trình xác thực lớn hơn so với lợi ích của đặt cọc thanh khoản như thế nào? Những quyết định này sẽ được cân nhắc ra sao trong tâm trí của người đặt cọc sau Pectra?

**Julia Schmidt:** Tại Alluvial, chúng tôi đã theo dõi chặt chẽ những thay đổi này và muốn cung cấp cả hai giải pháp. Các yêu cầu hợp nhất trong Pectra là một giải pháp tạm thời không nên ảnh hưởng đến thời gian kiếm tiền của số dư hiệu dụng của bạn — nó sẽ không phải đi qua hàng đợi kích hoạt một lần nữa khi hợp nhất nhiều trình xác thực. Quá trình này khá suôn sẻ.

Việc hình phạt cắt giảm ban đầu đã được hạ thấp làm giảm rủi ro khi chạy các trình xác thực có số dư cao. Sự thúc đẩy từ Tổ chức Ethereum thực sự là hợp nhất càng nhiều càng tốt để giảm tải mạng lưới. Có một nhược điểm nhỏ: trong trường hợp rất hiếm khi một trình xác thực có số dư hiệu dụng tối đa là 2.048 ETH bị phạt cắt giảm, nó sẽ đi vào hàng đợi thoát và tiền của bạn sẽ bị khóa trong một thời gian dài hơn — nó sẽ giống như 64 trình xác thực bị phạt cắt giảm cùng một lúc. Vì vậy, chúng tôi sẽ cố gắng cung cấp các mức trần trình xác thực linh hoạt tùy theo khẩu vị rủi ro của khách hàng.

Về mặt tiện ích, một token staking thanh khoản (LST) rõ ràng là bổ sung thêm thanh khoản — ngay cả với việc rút tiền một phần từ lớp thực thi, nó sẽ không diễn ra ngay lập tức. Bạn gửi giao dịch, nó được đưa vào hàng đợi, sau đó có kỷ nguyên thoát và kỷ nguyên rút tiền. Các token staking thanh khoản vẫn cung cấp thanh khoản tức thì mà việc rút tiền một phần không thể làm được.

#### Các bước tiếp theo cho người đặt cọc (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** Những gì chúng tôi thấy là các tổ chức tài chính thường sẽ đặt cọc từ 65% đến 85% số ETH của họ dưới dạng lưu ký, bởi vì họ cần phần còn lại như một bộ đệm thanh khoản cho các khoản quy đổi. Với đặt cọc thanh khoản, bạn có khả năng tăng số lượng ETH được đặt cọc, điều này tạo ra phần thưởng cao hơn.

Cả hai bên đều được hưởng lợi từ Pectra — đặt cọc thanh khoản có được tùy chọn rút tiền từ lớp thực thi, và đặt cọc truyền thống loại bỏ được vấn đề gia tăng 32 ETH, đặc biệt là đối với các khoản đặt cọc nhỏ hơn.

**Julia Schmidt:** Với giao thức Liquid Collective, chúng tôi không chỉ cung cấp việc đặt cọc cho một người vận hành nút — chúng tôi có một liên minh gồm các người vận hành nút khác nhau mà chúng tôi phân bổ các khoản đặt cọc theo phương pháp vòng tròn (round-robin). Điều đó làm tăng sự phi tập trung của số ETH đã đặt cọc. Và những người vận hành nút này tuân theo NORS (Tiêu chuẩn Rủi ro Người vận hành Nút), vì vậy chúng tôi cũng đảm bảo phạm vi bảo hiểm trong trường hợp bị phạt cắt giảm.

Một lợi thế chính mà tôi chưa đề cập đến là việc rút tiền một phần — giờ đây khi bạn có thể rút ETH đã đặt cọc từ lớp thực thi, điều này mở ra những con đường mới cho các giao thức như EigenLayer để kích hoạt việc rút tiền và thoát. Có một sự gia tăng lớn về chức năng và khả năng tương tác mà tài chính phi tập trung (DeFi) hiện có thể kết hợp tốt hơn vào toàn bộ vòng đời trình xác thực, từ khi gửi tiền đến khi thoát. Là một kỹ sư chuỗi khối, thật thú vị khi có thể tự động hóa toàn bộ quy trình làm việc.

#### Lời kết (19:50) {#closing-1950}

**Người dẫn chương trình:** Julia, mọi người có thể đến đâu để tìm hiểu thêm về Liquid Collective và Alluvial?

**Julia Schmidt:** Bạn có thể theo dõi Alluvial và Liquid Collective trên Twitter, trên X, trên LinkedIn, hoặc trên trang web của Alluvial. Chúng tôi sẽ chia sẻ một bài viết trình bày chi tiết về các thay đổi liên quan đến bản nâng cấp Pectra và cách chúng sẽ ảnh hưởng đến bối cảnh Ethereum.

**Người dẫn chương trình:** Freddy, có bất kỳ cập nhật nào cần chia sẻ liên quan đến Pectra không?

**Freddy Tänzer:** Chúng tôi có rất nhiều điều sắp tới. Chúng tôi sẽ có một trang dành riêng trên trang web của mình, blockdaemon.com — nó sẽ là trung tâm của tất cả các tài nguyên. Chúng tôi sẽ có một bài đăng trên blog, một phần Câu hỏi thường gặp (FAQ), cùng một số hướng dẫn và đề xuất mô hình hóa liên quan đến việc chọn loại trình xác thực nào và kích thước bao nhiêu. Cho dù bạn muốn một trình xác thực 2.000 ETH, hay hai trình xác thực 1.000 ETH, hoặc bốn trình xác thực 500 ETH — tất cả những điều này nhìn chung đều có thể thực hiện được, và có những quyết định đánh đổi cần được đưa ra. Chúng tôi sẽ giúp khách hàng của mình điều hướng qua quá trình này.

**Người dẫn chương trình:** Thật tuyệt vời. Freddy, Julia, cảm ơn rất nhiều vì thời gian của các bạn hôm nay — một cuộc thảo luận hấp dẫn và một phần giới thiệu tuyệt vời về Pectra.