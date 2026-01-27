---
title: "Mở rộng Ethereum"
description: "Rollups đợt giao dịch với nhau ngoài chuỗi, giảm phí giao dịch cho người dùng. Tuy nhiên, cách Rollups hiện tại sử dụng dữ liệu quả đắt, giới hạn độ rẻ mà giao dịch có thể đạt được. Proto-Danksharding là giải pháp."
lang: vi
image: /images/roadmap/roadmap-transactions.png
alt: "Lộ trình Ethereum"
template: roadmap
---

Ethereum được mở rộng quy mô bằng cách sử dụng các [lớp 2](/layer-2/#rollups) (còn được gọi là rollup), chúng gộp các giao dịch lại với nhau và gửi kết quả đầu ra đến Ethereum. Mặc dù Rollups rẻ hơn gấp tám lần mạng chính Ethereum, tuy nhiên Optimize Rollups vẫn có thể giảm chi phí cho người dùng nhiều hơn. Rollupss cũng phụ thuộc vào một số thành phần tập trung dẫn đến nhà phát triển có thể loại bỏ khi Rollups hoàn thiện.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Chi phí giao dịch
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Công nghệ Rollups hiện tại đã rẻ hơn <strong>~5-20x</strong> so với mạng lớp 1 Ethereum</li>
    <li>ZK-rollups sẽ giảm phí thấp hơn khoảng <strong>~40-100 lần</strong></li>
    <li>Những thay đổi sắp tới của Ethereum sẽ cho phép thêm <strong>~100-1000 lần</strong> độ mở rộng</li>
    <li style={{ marginBottom: 0 }}>Người dùng sẽ được lợi từ giao dịch <strong>phí rẻ hơn 0,001 đô la</strong></li>
  </ul>
</AlertContent>
</Alert>

## Làm cho dữ liệu rẻ hơn {#making-data-cheaper}

Rollups thu thập một lượng lớn giao dịch, thực hiện và trả kết quả về Ethereum. Điều này tạo ra rất nhiều dữ liệu mở để mọi người có thể thực hiện giao dịch cho họ và xác minh những nhà vận hành Rollups trung thực. Nếu một người nào đó tìm thấy điểm nghi ngờ, họ có thể đưa ra các thử thách.

### Proto-Danksharding {#proto-danksharding}

Dữ liệu và lịch sử Rollups được dự trữ trên Ethereum vĩnh viễn, dẫn đến đắt đỏ. Hơn 90% phí giao dịch người dùng trả trên Rollups dùng để chi trả cho việc sử dụng dữ liệu này. Để có thể giảm phí giao dịch, chúng ta phải chuyển việc sử dụng dữ liệu sang một dạng tạm thời gọi là "Blob". Blobs rẻ hơn rất nhiều vì nó không phải vĩnh viễn; chúng có thể được xóa đi khỏi Ethereum khi chúng không còn cần thiết nữa. Lưu dữ liệu Rollups lâu dài trở thành một trách nhiệm của những người cần nó, như là những nhà vận hành Rollups, sàn giao dịch, dịch vụ lập chỉ mục,.. Thêm giao dịch Blob trên Ethereum là một phần của nâng cấp tên "Proto-Danksharding".

Với "Proto-Danksharding", có thể thêm rất nhiều khối Blob trên Ethereum. Điều này cho phép Ethereum đạt được một bước nhảy vọt đáng kể khác (>100x) về thông lượng và giảm mạnh chi phí giao dịch.

### Phân đoạn thế hệ mới (Danksharding) {#danksharding}

Giai đoạn thứ hai của việc mở rộng dữ liệu blob rất phức tạp vì nó yêu cầu các phương pháp mới để kiểm tra dữ liệu rollup có sẵn trên mạng và dựa vào việc [người xác thực](/glossary/#validator) tách biệt trách nhiệm xây dựng [khối](/glossary/#block) và đề xuất khối của họ. Điều đó cũng cần rất nhiều phương thức mật mã học để chứng minh rằng nút xác thực đó đã xác minh tập dữ liêu con ở trong dữ liệu Blob.

Bước thứ hai này được gọi là ["Danksharding"](/roadmap/danksharding/). Công việc triển khai vẫn tiếp tục, với tiến độ đạt được trên các điều kiện tiên quyết như [tách biệt việc xây dựng khối và đề xuất khối](/roadmap/pbs) và các thiết kế mạng mới cho phép mạng xác nhận hiệu quả rằng dữ liệu có sẵn bằng cách lấy mẫu ngẫu nhiên vài kilobyte mỗi lần, được gọi là [lấy mẫu dữ liệu sẵn có (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Tìm hiểu thêm về Danksharding</ButtonLink>

## Phi tập trung hóa các rollup {#decentralizing-rollups}

[Các rollup](/layer-2) đã và đang mở rộng quy mô Ethereum. Một [hệ sinh thái phong phú các dự án rollup](https://l2beat.com/scaling/tvs) đang cho phép người dùng giao dịch nhanh chóng và với chi phí thấp, với một loạt các đảm bảo về bảo mật. Tuy nhiên, Rollups đã và đang khởi động bằng cách tận dụng các Sequencer tập trung (máy tính thực hiện toàn bộ việc xử lý và gom giao dịch trước khi gửi chúng lên Ethereum). Điều này dẫn đến dễ bị kiểm duyệt bởi vì nhà vận hành Sequencer có thể áp lệnh cấm, bị hối lộ hoặc bị tác động theo những cách khác. Đồng thời, [các rollup khác nhau](https://l2beat.com/scaling/summary) về cách chúng xác thực dữ liệu đầu vào. Cách tốt nhất là để "người chứng minh" gửi [bằng chứng gian lận](/glossary/#fraud-proof) hoặc bằng chứng hợp lệ, nhưng không phải tất cả các rollup đều đã làm được điều đó. Ngay cả những Rollup có sử dụng bằng chứng hợp lệ/gian lận cũng chỉ dựa vào một nhóm nhỏ các prover đã biết trước. Vì thế, bước quan trọng tiếp theo trong mở rộng Ethereum là phân bổ trách nhiệm cho những Sequencers đang chạy và vai trò "người chứng minh" cho nhiều người hơn.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Tìm hiểu thêm về các rollup</ButtonLink>

## Tiến độ hiện tại {#current-progress}

Prô-tô Đan-kờ-sờ-đinh đã được triển khai thành công như một phần của bản nâng cấp mạng Can-cun Đê-nép (“Đen-cun”) vào tháng ba năm 2024. Kể từ khi triển khai, rô-lắp đã bắt đầu sử dụng bộ nhớ bờ-lóp, giúp giảm chi phí giao dịch cho người dùng và xử lý hàng triệu giao dịch trong bờ-lóp.

Công việc triển khai Dan-khờ-sờ-inh đầy đủ vẫn đang tiếp tục, với tiến triển ở các bước chuẩn bị như PBS (Tách biệt Người đề xuất và Người xây dựng khối) và DAS (Lấy mẫu khả năng sẵn có dữ liệu). Phi tập trung hạ tầng rô-lắp là một quá trình từ từ - có nhiều rô-lắp khác nhau xây dựng những hệ thống hơi khác nhau và sẽ đạt phi tập trung hoàn toàn với tốc độ khác nhau.

[Tìm hiểu thêm về bản nâng cấp mạng Dencun và tác động của nó](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
