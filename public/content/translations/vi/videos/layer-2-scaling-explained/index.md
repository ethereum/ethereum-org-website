---
title: "Giải thích về mở rộng quy mô lớp 2 (l2) của Ethereum"
description: "Tổng quan về các giải pháp mở rộng quy mô lớp 2 (l2) cho Ethereum, bao gồm bản cuộn, Plasma, kênh trạng thái và chuỗi phụ."
lang: vi
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Mở rộng quy mô lớp 2"
---

Một bài giải thích của **Finematics** bao quát các giải pháp mở rộng quy mô lớp 2 (l2) cho Ethereum — bao gồm các kênh, Plasma, chuỗi phụ và bản cuộn, và lý do tại sao bản cuộn đang nổi lên như một chiến lược mở rộng quy mô thống trị. Tìm hiểu cách các công nghệ này giảm chi phí và tăng thông lượng trong khi vẫn kế thừa tính bảo mật của Ethereum.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=BgCgauWVTs0) được xuất bản bởi Finematics. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Mở rộng quy mô Ethereum (0:31) {#ethereum-scaling-031}

Việc mở rộng quy mô Ethereum đã là một trong những chủ đề được thảo luận nhiều nhất gần như kể từ thời điểm mạng lưới ra mắt. Cuộc tranh luận về mở rộng quy mô luôn nóng lên sau một khoảng thời gian tắc nghẽn mạng lưới nghiêm trọng.

Một trong những khoảng thời gian đầu tiên như vậy là thị trường giá lên của tiền mã hóa năm 2017, nơi CryptoKitties khét tiếng cùng với các ICO đã có thể làm tắc nghẽn toàn bộ mạng lưới Ethereum, gây ra sự gia tăng đột biến về phí Gas. Năm nay, sự tắc nghẽn mạng lưới đã quay trở lại thậm chí còn mạnh mẽ hơn, lần này là do sự phổ biến của tài chính phi tập trung (DeFi) và khai thác lợi suất. Đã có những khoảng thời gian mà ngay cả phí Gas cao tới hơn 500 Gwei cũng không giúp giao dịch của bạn được xác minh trong một thời gian.

#### Mở rộng quy mô Chuỗi khối (1:20) {#scaling-blockchains-120}

Khi nói đến việc mở rộng quy mô Ethereum hoặc Chuỗi khối nói chung, có hai cách chính để thực hiện: mở rộng quy mô chính lớp cơ sở — lớp 1 (l1) — hoặc mở rộng quy mô mạng lưới bằng cách chuyển bớt một phần công việc sang một lớp khác — lớp 2 (l2).

Lớp 1 (l1) là lớp đồng thuận cơ sở tiêu chuẩn nơi hầu như tất cả các giao dịch hiện đang được thanh toán. Khái niệm về các lớp không phải là một khái niệm dành riêng cho Ethereum; các Chuỗi khối khác như Bitcoin hoặc Zcash cũng sử dụng nó một cách rộng rãi.

Lớp 2 (l2) là một lớp khác được xây dựng trên lớp 1 (l1). Có một vài điểm quan trọng ở đây: lớp 2 (l2) không yêu cầu bất kỳ thay đổi nào ở lớp 1 (l1) — nó có thể chỉ được xây dựng trên lớp 1 (l1) bằng cách sử dụng các yếu tố hiện có của nó, chẳng hạn như các hợp đồng thông minh. Lớp 2 (l2) cũng tận dụng tính bảo mật của lớp 1 (l1) bằng cách neo trạng thái của nó vào lớp 1 (l1).

Ethereum hiện có thể xử lý khoảng 15 giao dịch mỗi giây trên lớp cơ sở của nó. Việc mở rộng quy mô lớp 2 (l2) có thể làm tăng đáng kể số lượng giao dịch — tùy thuộc vào giải pháp, xử lý từ 2.000 đến 4.000 giao dịch mỗi giây.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

Còn Ethereum 2.0 thì sao? Chẳng phải nó được cho là sẽ mở rộng quy mô Ethereum sao? Đúng vậy — Ethereum 2.0 giới thiệu Bằng chứng cổ phần (PoS) và phân mảnh sẽ làm tăng đáng kể thông lượng giao dịch trên lớp cơ sở.

Điều đó có nghĩa là chúng ta không cần mở rộng quy mô lớp 2 (l2) khi Ethereum 2.0 ra mắt? Không hẳn — ngay cả với phân mảnh, Ethereum vẫn sẽ cần mở rộng quy mô lớp 2 (l2) để có thể xử lý hàng trăm nghìn hoặc thậm chí hàng triệu giao dịch mỗi giây trong tương lai.

#### Bộ ba bất khả thi về khả năng mở rộng (3:15) {#scalability-trilemma-315}

Đây cũng là nơi bộ ba bất khả thi về khả năng mở rộng nổi tiếng phát huy tác dụng. Về lý thuyết, chúng ta có thể bỏ qua hoàn toàn lớp 2 (l2) và thay vào đó tập trung vào việc mở rộng quy mô lớp cơ sở. Điều này sẽ yêu cầu các nút chuyên dụng cao để xử lý khối lượng công việc gia tăng, dẫn đến sự tập trung hóa cao hơn và do đó làm giảm tính bảo mật và các đặc tính chống kiểm duyệt của mạng lưới.

Bám sát vào thực tế là khả năng mở rộng không bao giờ được đánh đổi bằng tính bảo mật và sự phi tập trung, chúng ta còn lại sự kết hợp giữa mở rộng quy mô lớp 1 (l1) và lớp 2 (l2) để tiến tới tương lai.

#### Mở rộng quy mô lớp 2 (3:52) {#layer-2-scaling-352}

Mở rộng quy mô lớp 2 (l2) là một thuật ngữ chung cho các giải pháp giúp tăng cường khả năng của lớp 1 (l1) bằng cách xử lý các giao dịch ngoài chuỗi. Hai khả năng chính có thể được cải thiện là tốc độ giao dịch và thông lượng giao dịch. Hơn thế nữa, các giải pháp lớp 2 (l2) có thể giảm đáng kể phí Gas.

Khi nói đến các giải pháp mở rộng quy mô thực tế, có nhiều tùy chọn có sẵn. Một số tùy chọn hiện đã có sẵn và có thể tăng thông lượng mạng lưới Ethereum trong ngắn hạn đến trung hạn, trong khi những tùy chọn khác đang hướng tới khung thời gian trung hạn đến dài hạn. Một số giải pháp dành riêng cho ứng dụng — ví dụ: các kênh thanh toán — trong khi những giải pháp khác, chẳng hạn như bản cuộn optimistic, có thể được sử dụng cho bất kỳ hoạt động thực thi hợp đồng tùy ý nào.

#### Các kênh (5:03) {#channels-503}

Các kênh là một trong những giải pháp mở rộng quy mô được thảo luận rộng rãi đầu tiên. Chúng cho phép những người tham gia trao đổi các giao dịch của họ nhiều lần trong khi chỉ gửi hai giao dịch lên lớp cơ sở. Các loại kênh phổ biến nhất là kênh trạng thái và loại phụ của chúng, các kênh thanh toán.

Mặc dù các kênh có tiềm năng dễ dàng xử lý hàng nghìn giao dịch mỗi giây, nhưng chúng đi kèm với một vài nhược điểm. Chúng không cung cấp sự tham gia mở — những người tham gia phải được biết đến từ trước và người dùng phải khóa tiền của họ trong một hợp đồng đa chữ ký. Hơn thế nữa, giải pháp mở rộng quy mô này dành riêng cho ứng dụng và không thể được sử dụng để mở rộng quy mô các hợp đồng thông minh đa dụng.

Dự án chính tận dụng sức mạnh của các kênh trạng thái trên Ethereum là Raiden. Khái niệm về các kênh thanh toán cũng được sử dụng rộng rãi bởi Lightning Network của Bitcoin.

#### Plasma (6:04) {#plasma-604}

Plasma là một giải pháp mở rộng quy mô lớp 2 (l2) ban đầu được đề xuất bởi Joseph Poon và Vitalik Buterin. Nó là một khuôn khổ để xây dựng các ứng dụng có thể mở rộng trên Ethereum.

Plasma tận dụng việc sử dụng các hợp đồng thông minh và cây Merkle để cho phép tạo ra vô số chuỗi con — các bản sao của Chuỗi khối Ethereum gốc. Việc chuyển bớt các giao dịch từ Chuỗi chính sang các chuỗi con cho phép các giao dịch diễn ra nhanh chóng và rẻ.

Một trong những nhược điểm của Plasma là thời gian chờ đợi lâu đối với những người dùng muốn rút tiền của họ khỏi lớp 2 (l2). Plasma, tương tự như các kênh, không thể được sử dụng để mở rộng quy mô các hợp đồng thông minh đa dụng. OMG Network được xây dựng trên bản triển khai Plasma của riêng họ có tên là More Viable Plasma. Matic Network là một ví dụ khác về nền tảng sử dụng phiên bản điều chỉnh của khuôn khổ Plasma.

#### Chuỗi phụ (7:08) {#sidechains-708}

Chuỗi phụ là các Chuỗi khối độc lập tương thích với Ethereum với các mô hình đồng thuận và tham số khối của riêng chúng. Khả năng tương tác với Ethereum được thực hiện bằng cách sử dụng cùng một Máy ảo Ethereum (EVM), vì vậy các hợp đồng được triển khai trên lớp cơ sở Ethereum có thể được triển khai trực tiếp lên chuỗi phụ.

xDai là một ví dụ về một chuỗi phụ như vậy.

#### Bản cuộn ZK (8:11) {#zk-rollups-811}

Bản cuộn cung cấp khả năng mở rộng quy mô bằng cách gộp — hoặc "cuộn lại" — các giao dịch chuỗi phụ thành một giao dịch duy nhất và tạo ra một bằng chứng mật mã học, còn được gọi là SNARK (Succinct Non-interactive Argument of Knowledge). Chỉ bằng chứng này được gửi lên lớp cơ sở. Với bản cuộn, tất cả trạng thái và việc thực thi giao dịch được xử lý trong các chuỗi phụ; Chuỗi Ethereum chính chỉ lưu trữ dữ liệu giao dịch.

Có hai loại bản cuộn: bản cuộn ZK và bản cuộn optimistic.

Bản cuộn ZK, mặc dù nhanh hơn và hiệu quả hơn bản cuộn optimistic, nhưng không cung cấp một cách dễ dàng để các hợp đồng thông minh hiện có di chuyển sang lớp 2 (l2).

Bản cuộn optimistic chạy một máy ảo tương thích với EVM được gọi là OVM (Optimistic Virtual Machine), cho phép thực thi các hợp đồng thông minh giống như có thể được thực thi trên Ethereum. Điều này thực sự quan trọng vì nó giúp các hợp đồng thông minh hiện có dễ dàng duy trì khả năng kết hợp của chúng, điều này cực kỳ phù hợp trong tài chính phi tập trung (DeFi) nơi tất cả các hợp đồng thông minh lớn đã được thử nghiệm thực tế.

Một trong những dự án chính làm việc trên bản cuộn optimistic là Optimism, dự án đang ngày càng tiến gần hơn đến việc ra mắt Mạng chính của họ. Khi nói đến bản cuộn ZK, Loopring và DeversiFi là những ví dụ điển hình về các sàn giao dịch phi tập trung được xây dựng trên lớp 2 (l2). Hơn thế nữa, chúng ta có zkSync cho phép các khoản thanh toán tiền mã hóa có thể mở rộng.

#### Một lộ trình lấy bản cuộn làm trung tâm (9:18) {#a-rollup-centric-roadmap-918}

Khả năng mở rộng của bản cuộn cũng có thể được phóng đại bởi Ethereum 2.0. Trên thực tế, vì bản cuộn chỉ cần lớp dữ liệu được mở rộng quy mô, chúng có thể nhận được một sự thúc đẩy to lớn ngay trong Giai đoạn 1 của Ethereum 2.0, liên quan đến việc phân mảnh dữ liệu.

Bất chấp một loạt các giải pháp mở rộng quy mô lớp 2 (l2) có sẵn, có vẻ như cộng đồng Ethereum đang hội tụ về cách tiếp cận chủ yếu mở rộng quy mô thông qua bản cuộn và phân mảnh dữ liệu Giai đoạn 1 của Ethereum 2.0. Cách tiếp cận này cũng đã được xác nhận trong một bài đăng gần đây của Vitalik Buterin có tên "A Rollup-Centric Ethereum Roadmap" (Một lộ trình Ethereum lấy bản cuộn làm trung tâm).

Trong các video tương lai, chúng ta sẽ khám phá việc mở rộng quy mô lớp cơ sở với Ethereum 2.0 và cách cả mở rộng quy mô lớp 1 (l1) và lớp 2 (l2) có thể giúp làm cho tài chính phi tập trung (DeFi) trở nên dễ tiếp cận hơn với mọi người.