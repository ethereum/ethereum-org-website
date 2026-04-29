---
title: "Sự tiến hóa của Ethereum: Fusaka, Glamsterdam và xa hơn nữa"
description: "Preston Van Loon nói về các bản nâng cấp Giao thức sắp tới của Ethereum, bao gồm các cột mốc lộ trình Fusaka và Glamsterdam cũng như sự tiến hóa dài hạn của Giao thức."
lang: vi
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "lộ trình và ưu tiên"
  - "lộ trình"
  - "nâng cấp"
format: presentation
author: ETHDenver
breadcrumb: "Sự tiến hóa của Ethereum"
---

Một bài thuyết trình của **Preston Van Loon** từ Offchain Labs và Prysm, được trình bày tại ETHDenver. Preston đề cập đến tốc độ nâng cấp gần đây của Ethereum và những gì sắp tới cho mạng lưới, bao gồm Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, thời gian khe ngắn hơn và tính chung cuộc nhanh hơn.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=GgKveVMLnoo) do ETHDenver xuất bản. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Giới thiệu (0:07) {#introduction-007}

**Người dẫn chương trình:** Được rồi, mọi người. Tiếp tục chương trình nào. Chúng ta sẽ nói về sự tiến hóa của Ethereum với Preston Van Loon. Xin mời anh.

**Preston Van Loon:** Vâng. Cảm ơn. GM — các bạn biết đấy, lúc nào cũng là GM, dù ngày hay đêm, dù có phải là buổi sáng hay không. Vì vậy, tôi thấy GM cả ngày lẫn đêm. Tôi muốn nói về sự tiến hóa của Ethereum, vậy hãy bắt đầu nào.

Có một câu chuyện mà có lẽ bạn đã từng nghe: Ethereum triển khai quá chậm. Tôi biết bạn đã nghe điều đó. Tôi cũng đã nghe. Bạn đã nghe nó rất nhiều lần. Mọi người thường nói, "Khi nào thì Hợp nhất (Merge)? Các nhà phát triển không thể làm gì sao? Các chuỗi khác đang tiến triển rất nhanh. Tại sao Ethereum lại chậm như vậy?" Tôi ở đây để nói với bạn rằng câu chuyện đó không còn đúng nữa.

Tôi làm việc trên ứng dụng khách đồng thuận Prysm. Đây là một trong những thành phần chính của Chuỗi Beacon Ethereum. Và tôi đã trực tiếp tham gia vào các bản cập nhật gần đây nhất — cho Pectra, Fusaka. Từ những gì tôi thấy ở bên trong, đây không phải là một bộ máy quan liêu chậm chạp mà mọi người đã gán cho Ethereum trong nhiều năm qua. Nó thực sự là một cỗ máy tốc độ cao, được vận hành trơn tru, mang đến một số bản nâng cấp lớn nhất mà chúng ta từng thấy trong lịch sử của Ethereum.

#### Triển khai ba bản nâng cấp trong một năm (1:18) {#shipping-three-upgrades-in-one-year-118}

Những gì chúng tôi đã triển khai trong năm 2025 là ba bản cập nhật lớn trong một năm. Đầu tiên là Pectra vào tháng 5 năm 2025. Bản cập nhật này đã giới thiệu tính năng trừu tượng hóa tài khoản gốc, tăng số dư hiệu dụng tối đa của trình xác thực cho phép hợp nhất, và thêm mười EIP nữa. Vào tháng 5, đây là bản nâng cấp lớn nhất về số lượng EIP mà Ethereum từng thấy.

Nhưng chỉ bảy tháng sau, chúng tôi đã triển khai Fusaka — một bản nâng cấp thậm chí còn lớn hơn về số lượng EIP. Bản này có mười ba EIP, với một sự đổi mới mang tên PeerDAS, điều này thực sự thú vị. Nhưng chỉ sáu ngày sau, chúng tôi lại nâng cấp một lần nữa với Phân nhánh BPO1, và BPO2 theo sau ngay sau đó, làm tăng dung lượng khối dữ liệu của Ethereum.

Đây là một minh chứng cho khả năng triển khai của Ethereum. Đây là sự hợp tác giữa năm hoặc sáu ứng dụng khách đồng thuận, năm ứng dụng khách thực thi, nhiều nhà nghiên cứu — hơn một trăm người tham gia vào quá trình phát triển cốt lõi của Ethereum — và tất cả họ đều đang phối hợp triển khai cùng một lúc.

#### Mở rộng quy mô với PeerDAS (2:22) {#peerdas-scaling-222}

Hãy cùng xem điểm nhấn của Fusaka: PeerDAS. PeerDAS là một giải pháp mở rộng quy mô rất tuyệt vời. Trước PeerDAS, chúng ta có Pectra, và với Pectra, bạn phải — với tư cách là người vận hành nút hoặc trình xác thực — tải xuống mọi khối dữ liệu đi kèm với một khối. Mục tiêu lúc đó là sáu khối dữ liệu mỗi khối. Mọi người đều phải tải nó xuống, và đó thực sự là một nút thắt cổ chai trong việc mở rộng quy mô. Nếu bạn muốn tăng con số đó lên, bạn đang yêu cầu những người vận hành nút tăng mức sử dụng băng thông của họ cho các khối dữ liệu theo tỷ lệ tương ứng.

Giờ đây với Fusaka, chúng ta có các khối dữ liệu được mã hóa xóa (erasure-coded) và chỉ yêu cầu các trình xác thực lưu giữ một phần trong số đó. Bạn chỉ cần lưu giữ một phần tám của các khối dữ liệu. Và với bất kỳ 50% khối dữ liệu nào, bạn có thể tái tạo lại toàn bộ. Vì vậy, với việc phân tán điều này trên toàn mạng lưới, nó đảm bảo Tính khả dụng của dữ liệu và giảm bớt gánh nặng cho những người tham gia stake độc lập. Điều này mang lại cho chúng ta mức giảm băng thông mạng lưới gần 90% ngay lập tức trong việc sử dụng khối dữ liệu.

Nhìn vào các con số: đối với Pectra, chúng ta có mục tiêu là sáu và tối đa là chín khối dữ liệu với giới hạn gas là 36 triệu. Chúng tôi coi đây là mức cơ sở cho việc sử dụng khối dữ liệu — tức là 768 kilobyte mỗi khối. Giờ đây, giữa Pectra và Fusaka, chúng ta đã có một bản nâng cấp ngoài băng tần (out-of-band) trong đó giới hạn gas đã được tăng lên. Đây là một quá trình Quản trị trên chuỗi, nơi các trình xác thực chỉ cần bỏ phiếu về mức giới hạn khối mà họ cho là phù hợp — nó đã tăng từ 36 lên 45 triệu. Và sau đó trong năm, chúng ta đã đến với Fusaka, bản nâng cấp này không thay đổi mục tiêu hay mức tối đa của khối dữ liệu nhưng lại tiếp tục tăng giới hạn gas.

Và sau đó chúng ta có được sự sụt giảm lớn về băng thông, trong đó mỗi khối với mục tiêu sáu khối dữ liệu giờ đây chỉ còn 96 kilobyte dữ liệu khối dữ liệu mà một trình xác thực phải lưu trữ. Sau đó, với BPO1, Phân nhánh chỉ dành cho tham số khối dữ liệu (blob-parameter-only), chúng tôi đã tăng mục tiêu lên 10 và tối đa lên 15. BPO2, diễn ra chỉ một tháng sau đó, đã tăng lên 14 và 21 — gấp đôi những gì chúng ta có trong Pectra, nhưng vẫn sử dụng ít hơn 71% băng thông cho các khối dữ liệu đối với những người tham gia stake độc lập.

#### Những gì sắp tới trong Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

Điều gì sẽ đến tiếp theo trong Glamsterdam? Có ba điều thực sự quan trọng và một điều vẫn đang được tích cực nghiên cứu.

Điều đầu tiên là ePBS — tách biệt người đề xuất và người xây dựng (PBS) được tích hợp sẵn. Cách thức sản xuất khối được thực hiện ngày nay là rất nhiều người đang thuê ngoài cơ hội xây dựng một khối thông qua MEV-Boost cho các trình xây dựng rất tinh vi. Đó là phần lớn của mạng lưới. Vấn đề là bạn phải tin tưởng vào một rơ-le (relay), và cần rất nhiều niềm tin rằng trình xây dựng sẽ thực sự đưa ra khối mà họ đã đấu giá. ePBS giới thiệu một cơ chế trong Giao thức để giảm thiểu đáng kể sự tin tưởng cần thiết, và đây là một cách triển khai rất gọn gàng cho cùng một ý tưởng.

Điều tiếp theo chúng ta có là danh sách truy cập cấp độ khối. Đây là một sự đổi mới thú vị, trong đó mỗi khối sẽ đi kèm với một danh sách cho biết nó đang đọc hoặc ghi dữ liệu ở đâu trong trạng thái. Điều đó có nghĩa là bạn có thể xử lý các khối song song. Ngày nay, bạn phải xử lý các khối một cách tuần tự. Nếu bạn muốn xử lý khối 10, trước tiên bạn phải xử lý 9 và 8, v.v. Giờ đây, nếu bạn có một tập hợp các khối và không có khối nào xung đột với thông tin truy cập trạng thái, bạn có thể xử lý cả tám khối đó song song. Có thể bạn có tám lõi — điều đó làm cho Ethereum hiệu quả hơn và xử lý các khối nhanh hơn.

Điều thứ ba là định giá lại Gas. Đã có các điểm chuẩn thông qua EIP này cho thấy một số mã lệnh bị định giá quá cao, một số lại quá thấp. Giờ đây, chúng tôi sẽ cập nhật mức phí bạn phải trả cho mỗi mã lệnh để phản ánh đúng thực tế, giúp Ethereum an toàn hơn và hiệu quả hơn.

#### Vai trò đang tiến hóa của các l2 (6:14) {#the-evolving-role-of-l2s-614}

Có một điều tôi muốn nói đến mà Vitalik đã đề cập gần đây. Anh ấy đã nói trong một dòng tweet vài tuần trước rằng tầm nhìn ban đầu về các lớp 2 (l2) và vai trò của chúng trong Ethereum không còn hợp lý nữa. Điều này đã thu hút rất nhiều sự chú ý của báo giới, và tôi nghĩ nhiều người đã hiểu sai về vấn đề này.

Hãy để tôi nói cho bạn biết ý nghĩa của nó từ góc độ của một người trong cuộc. Ethereum đang mở rộng quy mô nhanh hơn dự kiến. Phí đang thấp hơn bao giờ hết. Tôi chưa bao giờ nghĩ mình sẽ trả phí Gas dưới một Gwei trên Mạng chính, nhưng chúng ta đang ở đây. Các khối dữ liệu rất dồi dào — chúng ta có rất nhiều. Chúng ta đang mở rộng quy mô các khối dữ liệu nhanh hơn dự kiến. Và ngay cả phí l2 cũng thực sự thấp.

Vì vậy, ý tưởng rằng chúng ta cần các l2 đa mục đích — tức là các l2 chỉ đơn giản là cùng một EVM mà chúng ta có trên lớp 1 (l1), chỉ cần sao chép và dán nó nhiều lần và tất cả những gì chúng làm là chạy nhanh hơn — đó không còn là tầm nhìn nữa. Các l2 này sẽ phát triển mạnh nhờ sự chuyên môn hóa. Một số trong đó sẽ nhắm mục tiêu vào các lĩnh vực như quyền riêng tư, trò chơi, các chi tiết cụ thể trong tài chính phi tập trung (DeFi) hoặc các phần mở rộng của EVM. Nhưng nếu chúng chỉ đơn giản là một bản sao của l1, chúng không nằm trong lộ trình mà ban đầu chúng ta đã hình dung về mô hình phân mảnh (sharded) này thông qua các l2.

#### FOCIL: khả năng chống kiểm duyệt ở cấp độ Giao thức (7:25) {#focil-protocol-level-censorship-resistance-725}

Vượt ra ngoài Glamsterdam, có ba điều thực sự thú vị đang được tích cực phát triển và nghiên cứu. Điều đầu tiên là FOCIL — Danh sách bao gồm được thực thi theo lựa chọn phân nhánh (Fork-Choice Enforced Inclusion Lists).

Vấn đề mà nó hướng tới giải quyết là các trình xây dựng khối có quyền lựa chọn. Họ được quyết định những giao dịch nào sẽ được đưa vào khối. Họ có thể ưu tiên một số giao dịch hoặc không ưu tiên những giao dịch khác — có thể là vì lợi thế MEV, có thể là do áp lực pháp lý. Nhưng trong mọi trường hợp, họ có thể kiểm duyệt các giao dịch theo ý muốn, và không ai có thể làm gì được.

FOCIL thay đổi động lực quyền lực. Thay vì nói rằng các trình xây dựng khối có thể chọn tất cả các giao dịch trong một khối, sẽ có một ủy ban ngẫu nhiên lựa chọn — dựa trên các phương pháp phỏng đoán cục bộ của họ — một số giao dịch mà họ tin rằng phải được đưa vào khối tiếp theo. Đó không phải là tất cả các giao dịch trong khối tiếp theo. Các trình xây dựng vẫn có nhiều quyền tự do, nhưng có một tập hợp con mà họ bắt buộc phải đưa vào. người đề xuất khối sẽ lấy danh sách ngắn này — có thể khoảng tám giao dịch — và đặt nó ở cuối khối, và chúng sẽ được thực thi cùng với khối.

Điều này được thực thi thông qua lựa chọn Phân nhánh. Các trình xác thực khi thấy một khối sẽ không chứng thực cho nó trừ khi nó có một danh sách bao gồm được đính kèm ở dưới cùng. Nếu họ thấy một khối không có danh sách đó, họ sẽ coi khối đó là không hợp lệ và chỉ cần bỏ qua nó — họ sẽ không truyền bá nó, họ sẽ không bỏ phiếu cho nó. Đây vẫn là một nghiên cứu đang hoạt động với một số tham số vẫn đang được quyết định, nhưng hướng đi đã rõ ràng: Ethereum sẽ đưa khả năng chống kiểm duyệt vào cấp độ Giao thức.

#### Thời gian khe ngắn hơn (9:24) {#shorter-slot-times-924}

Điều thực sự thú vị tiếp theo là thời gian khe ngắn hơn. Với Hegata — Phân nhánh sau Glamsterdam — chúng tôi đang xem xét liệu chúng tôi có thể đưa vào thời gian khe ngắn hơn hoặc các khe nhanh hay không. Điều đó không có nghĩa là chúng ta nhảy vọt ngay đến các khe sáu giây hoặc thậm chí nhanh hơn, mà là xây dựng nền tảng để biến điều đó thành hiện thực.

Nghe có vẻ rất đơn giản — kiểu như, "hãy chạy nhanh hơn thôi." Nhưng bạn phải nghĩ về việc truyền bá mạng lưới, nhiệm vụ chứng thực của trình xác thực nơi họ có một khoảng thời gian giới hạn để thực hiện, và sau đó là tính kinh tế. Khi tôi lần đầu tiên thử nghiệm điều này, tôi chỉ thay đổi số 12 thành số 6 và đột nhiên mọi người đều tạo ra lượng phát hành gấp đôi — kiếm được gấp đôi tiền — điều này không thực sự là mục đích đằng sau thời gian khe ngắn hơn. Vấn đề là đi nhanh hơn nhưng vẫn giữ mọi thứ cân bằng. Vì vậy, đây là một điều rất phức tạp, nhưng nó có khả năng đạt được mục tiêu cuối cùng một cách từ từ.

#### Tính chung cuộc nhanh hơn (10:20) {#faster-finality-1020}

Điều thứ ba là tính chung cuộc nhanh hơn. Điều này thực sự quan trọng vì Ethereum chốt hạ (finalize) mỗi hai Kỷ nguyên — cứ sau 13 phút — và có những ứng dụng thực sự phụ thuộc vào việc đặt câu hỏi: giao dịch của tôi đã vĩnh viễn chưa? Nếu giao dịch chưa nằm trong một Kỷ nguyên đã chung cuộc, thì câu trả lời là chưa — có một khả năng nhỏ là nó có thể bị tổ chức lại (reorg) và giao dịch cần phải được gửi lại.

Giờ đây, nếu chúng ta có tính chung cuộc nhanh, những thứ như sàn giao dịch, cầu nối hoặc bất kỳ ứng dụng nào cũng có thể yên tâm rằng một giao dịch đã hoàn tất. Đầu tiên, thay vì hai Kỷ nguyên cho tính chung cuộc, hãy thực hiện nó trong một Kỷ nguyên. Sau đó, chúng ta có thể nói thay vì các Kỷ nguyên dài 32 khe, hãy rút ngắn chúng xuống còn bốn khe. Giờ đây, nếu bạn kết hợp điều này với thời gian khe sáu giây, bạn đang nói về tính chung cuộc trong vòng chưa đầy 30 giây. Đó là một mục tiêu cuối cùng thực sự tuyệt vời.

#### Ngôi sao Bắc Đẩu (11:15) {#the-north-star-1115}

Tất cả những điều này được xây dựng hướng tới ngôi sao Bắc Đẩu, nơi chúng ta nói rằng lớp 1 (l1) rất nhanh với thời gian chốt hạ tính bằng giây. Làm thế nào để chúng ta đạt được điều đó? Đầu tiên, chúng ta bắt đầu với PeerDAS — tính năng này đã được triển khai. Nó đã mang lại cho chúng ta một lớp có thể mở rộng cho Tính khả dụng của dữ liệu. Tiếp theo, chúng ta có Glamsterdam, chủ yếu bao gồm ePBS, đây là một cách triển khai gọn gàng cho tách biệt người đề xuất và người xây dựng (PBS) và làm cho những thứ như FOCIL trở nên hiệu quả hơn. FOCIL mang đến khả năng chống kiểm duyệt, rất hài hòa với ePBS. Với các khe nhanh hơn, thời gian khe nhanh hơn làm cho tính chung cuộc nhanh hơn thậm chí còn hiệu quả hơn. Sau đó, chúng ta đạt được mục tiêu cuối cùng này, nơi chúng ta thực sự có các giao dịch nhanh chóng được đã chung cuộc trong vài giây.

#### Lời kết (12:02) {#closing-1202}

Tôi muốn bạn hình dung cuộc sống sẽ như thế nào trong hai năm tới. Hơi khó để tưởng tượng vì tiền mã hóa phát triển quá nhanh. Điều này có thể trở thành hiện thực chỉ trong hai năm: thời gian xác nhận giao dịch bốn hoặc sáu giây; tính chung cuộc được đo bằng giây chứ không phải bằng phút; thực thi ở cấp độ Giao thức cho khả năng chống kiểm duyệt; các biện pháp bảo vệ chống lại mật mã học hậu lượng tử; và các l2 cạnh tranh về các tính năng và đổi mới mới, chứ không chỉ là chạy nhanh hơn. Tất cả những điều này trong khi vẫn giữ được ưu điểm là bạn có thể sử dụng máy tính xách tay hoặc phần cứng cấp độ người tiêu dùng để chạy một nút đầy đủ tại nhà. Ethereum rất dễ tiếp cận và vẫn sẽ dễ tiếp cận đối với mọi người trong tương lai.

Điều tôi muốn các bạn đọng lại là: câu chuyện mà tôi đã trình bày với các bạn lúc đầu — thực sự không có bằng chứng nào chứng minh cho nó. Ethereum đang triển khai rất nhanh. Chỉ trong một năm, đã có ba bản nâng cấp. Và trong 24 tháng tới, sẽ còn nhiều điều nữa sắp đến, và chúng sẽ đến thậm chí còn nhanh hơn.

Đây không chỉ là những mốc thời gian năm năm viển vông. Đây là những điều thực tế với các đề xuất cụ thể đang được phát triển ngay lúc này. Có những thứ đang nằm trên mạng phát triển ngay bây giờ. Có những người đang làm việc ngay lúc chúng ta nói chuyện về các triển khai này. Nếu bạn đang xây dựng trên Ethereum ngày hôm nay, bạn đang xây dựng trên Chuỗi khối được phát triển tích cực nhất trên thế giới.

Tôi là Preston Van Loon, nhà phát triển cốt lõi của Ethereum. Tôi làm việc trong nhóm Prysm tại Offchain Labs. Nếu bạn muốn tham gia, cách tốt nhất để theo kịp những gì đang xảy ra trong Ethereum là tự mình giúp xây dựng nó. Hãy đến nói chuyện với tôi sau chương trình. Hãy đến xem kho lưu trữ Prysm hoặc bất kỳ kho lưu trữ thông số kỹ thuật đồng thuận hay thông số kỹ thuật thực thi nào — chúng tôi thực sự mong muốn những đóng góp của bạn. Cảm ơn các bạn.