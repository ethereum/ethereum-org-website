---
title: "Tìm hiểu về các cơ chế đồng thuận của chuỗi khối"
description: "Một bài giải thích bao quát các cơ chế đồng thuận cốt lõi được sử dụng trong các chuỗi khối và cách chúng cho phép các mạng lưới phi tập trung thống nhất về trạng thái của các giao dịch mà không cần cơ quan trung ương."
lang: vi
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Cơ chế đồng thuận"
---

Một bài giải thích của **Tech in Asia** bao quát ba cơ chế đồng thuận chính được sử dụng trong các hệ thống chuỗi khối: Bằng chứng công việc (PoW), Bằng chứng cổ phần (PoS) và bằng chứng ủy quyền (PoA), cũng như cách chúng cho phép các mạng lưới phi tập trung thống nhất về trạng thái của các giao dịch.

*Bản ghi lời thoại này là một bản sao dễ tiếp cận của [bản ghi lời thoại video gốc](https://www.youtube.com/watch?v=ojxfbN78WFQ) được xuất bản bởi Tech in Asia. Nó đã được chỉnh sửa đôi chút để dễ đọc hơn.*

#### Cơ chế đồng thuận là gì? (0:00) {#what-are-consensus-mechanisms-000}

Chuỗi khối — từ khóa gây sốt của năm 2018. Nhưng bạn có biết làm thế nào một hệ thống ngang hàng phi tập trung không có nhân vật có thẩm quyền lại đưa ra quyết định không? Câu trả lời nằm ở các cơ chế đồng thuận. Có nhiều cơ chế đồng thuận khác nhau, nhưng tất cả đều phục vụ cùng một mục đích: đảm bảo các bản ghi là chính xác và trung thực. Sự khác biệt nằm ở cách đạt được sự đồng thuận. Dưới đây chúng ta sẽ khám phá ba loại cơ chế đồng thuận.

#### Bằng chứng công việc (PoW) (0:23) {#proof-of-work-023}

Trong một hệ thống Bằng chứng công việc (PoW), dữ liệu giao dịch được lưu trữ trong các khối, được xác thực bằng cách yêu cầu mọi người giải một bài toán phức tạp gắn liền với nó. Việc này thường được thực hiện bởi các máy tính mạnh mẽ và được gọi là "khai thác". Một phần thưởng dưới dạng tiền mã hóa được phát hành cho thợ đào đầu tiên giải quyết được bài toán.

Hãy tưởng tượng một nhóm thợ săn kho báu đang cố gắng mở một chiếc rương có gắn một ổ khóa phức tạp. Việc tìm ra tổ hợp chính xác rất tẻ nhạt, nhưng người đầu tiên làm được điều đó sẽ nhận được phần thưởng. Nói một cách đơn giản, Bằng chứng công việc (PoW) là một cuộc đua để tìm ra tổ hợp chính xác trên một chiếc rương kho báu. Các loại tiền mã hóa như Bitcoin và Ethereum sử dụng cơ chế Bằng chứng công việc (PoW).

#### Bằng chứng cổ phần (PoS) (1:04) {#proof-of-stake-104}

Tiếp theo, chúng ta có Bằng chứng cổ phần (PoS). Ở đây, người tạo ra một khối mới, còn được gọi là trình xác thực, được chọn ngẫu nhiên dựa trên số lượng khoản đặt cọc mà họ cam kết với mạng lưới. Khoản đặt cọc càng cao, cơ hội được chọn làm trình xác thực càng lớn.

Hãy áp dụng điều này vào kịch bản rương kho báu. Hãy hình dung một nhóm thợ săn kho báu đang tranh giành một chiếc rương. Chiếc rương được trao thưởng dựa trên một hệ thống xổ số. Để tham gia, mỗi thợ săn phải mua vé số. Mỗi thợ săn mua càng nhiều, cơ hội chiến thắng càng cao. Các giao thức chuỗi khối như Ouroboros của Cardano và EOS áp dụng sự đồng thuận Bằng chứng cổ phần (PoS).

#### Bằng chứng ủy quyền (PoA) (1:42) {#proof-of-authority-142}

Cuối cùng, bằng chứng ủy quyền (PoA) — một hình thức sửa đổi của Bằng chứng cổ phần (PoS). Ở đây, chỉ những bên được phê duyệt, được chọn dựa trên danh tiếng của họ mới có thể trở thành trình xác thực.

Hãy xem lại kịch bản rương kho báu. Nhóm thợ săn kho báu thành lập một liên minh và gộp chung kho báu của họ. Dựa trên mức độ đáng tin cậy của họ, một số ít người được nhóm chỉ định để đảm bảo tính hợp lệ của nội dung trong rương. Hyperledger Fabric của IBM và mạng thử nghiệm Kovan của Ethereum là một số ví dụ về các hệ thống chuỗi khối sử dụng bằng chứng ủy quyền (PoA).

#### Các mô hình đồng thuận lai (2:14) {#hybrid-consensus-models-214}

Trong khi các công ty chuỗi khối truyền thống tồn tại trên một cơ chế đồng thuận duy nhất, một số công ty đổi mới đang áp dụng nhiều giao thức đồng thuận. Lấy Opet Foundation làm ví dụ, họ đang xây dựng một chuỗi khối độc đáo để lưu trữ dữ liệu thu thập được trên ứng dụng chatbot hỗ trợ học tập của mình bằng cách áp dụng cả hai giao thức bằng chứng ủy quyền (PoA) và Bằng chứng công việc (PoW).

Dữ liệu như hồ sơ học tập, ngoại khóa và hồ sơ tính cách của học sinh được lưu trữ trên chuỗi khối và có khả năng được xác thực thông qua một khuôn khổ bằng chứng ủy quyền (PoA) được hỗ trợ bởi Hyperledger Fabric. Các trình xác thực, trong trường hợp này, là các tổ chức giáo dục có uy tín hoặc thậm chí là các cơ quan đăng ký quốc gia và các bộ giáo dục tương ứng. Điều này giúp đảm bảo rằng tất cả dữ liệu của học sinh đều đáng tin cậy.

Nhưng ai sẽ làm việc miễn phí? Sự đồng thuận Bằng chứng công việc (PoW) phát huy tác dụng để trao phần thưởng cho các trình xác thực đã thực hiện công việc.

#### Quyền riêng tư và dữ liệu học sinh (3:02) {#privacy-and-student-data-302}

Với Hyperledger Fabric, mỗi hồ sơ học sinh được bảo mật bằng một khóa mã băm riêng tư do học sinh sở hữu. Dữ liệu chỉ có thể được truy cập khi học sinh cung cấp khóa duy nhất. Điều này có nghĩa là quyền riêng tư của học sinh được bảo vệ và kiểm soát bởi chính học sinh đó.

Ví dụ, khi học sinh nộp đơn vào trường đại học thông qua nền tảng của Opet, họ cung cấp khóa duy nhất của hồ sơ cho trường đại học. Với khóa đó, trường đại học có thể truy cập hồ sơ học tập mới nhất của họ. Học sinh cũng sẽ có thể xem liệu hồ sơ của họ đã được mở khóa hay ít nhất là được xem xét cho việc nộp đơn hay chưa. Điều này thúc đẩy hiệu quả và tính minh bạch so với các phương pháp truyền thống.

#### Lời kết (3:37) {#closing-337}

Bằng cách kết hợp các mô hình Bằng chứng công việc (PoW) và bằng chứng ủy quyền (PoA), giải pháp chuỗi khối của Opet Foundation đảm bảo quyền riêng tư đối với dữ liệu của học sinh đồng thời khuyến khích cả các tổ chức giáo dục và học sinh khi họ đóng góp cho nền tảng. Với việc các chuỗi khối ngày càng trở nên phổ biến, việc chúng ta thấy nhiều hệ thống lai độc đáo hơn được tạo ra chỉ là vấn đề thời gian.