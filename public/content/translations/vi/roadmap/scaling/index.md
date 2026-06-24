---
title: "Mở rộng quy mô Ethereum"
description: "Các bản cuộn gộp các giao dịch lại với nhau ngoài chuỗi, giúp giảm chi phí cho người dùng. Tuy nhiên, cách các bản cuộn hiện đang sử dụng dữ liệu quá tốn kém, làm hạn chế mức độ rẻ của các giao dịch. Proto-Danksharding sẽ giải quyết vấn đề này."
lang: vi
image: /images/roadmap/roadmap-transactions.png
alt: "Lộ trình Ethereum"
template: roadmap
---

Ethereum được mở rộng quy mô bằng cách sử dụng [lớp 2](/layer-2/#rollups) (còn được gọi là các bản cuộn), giúp gộp các giao dịch lại với nhau và gửi kết quả đầu ra đến Ethereum. Mặc dù các bản cuộn rẻ hơn tới tám lần so với Mạng chính Ethereum, nhưng vẫn có thể tối ưu hóa các bản cuộn hơn nữa để giảm chi phí cho người dùng cuối. Các bản cuộn cũng dựa vào một số thành phần tập trung mà các nhà phát triển có thể loại bỏ khi các bản cuộn trưởng thành hơn.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Chi phí giao dịch
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Các bản cuộn ngày nay rẻ hơn <strong>\~5-20 lần</strong> so với lớp 1 của Ethereum</li>
    <li>ZK-rollup sẽ sớm giảm phí xuống <strong>\~40-100 lần</strong></li>
    <li>Những thay đổi sắp tới đối với Ethereum sẽ cung cấp thêm khả năng mở rộng quy mô gấp <strong>\~100-1000 lần</strong></li>
 <li style={{ marginBottom: 0 }}>Người dùng sẽ được hưởng lợi từ các giao dịch <strong>có chi phí dưới 0,001 đô la</strong></li>
  </ul>
</AlertContent>
</Alert>

## Làm cho dữ liệu rẻ hơn {#making-data-cheaper}

Các bản cuộn thu thập số lượng lớn các giao dịch, thực thi chúng và gửi kết quả đến Ethereum. Điều này tạo ra rất nhiều dữ liệu cần được cung cấp công khai để bất kỳ ai cũng có thể tự mình thực thi các giao dịch và xác minh rằng người vận hành Rollup đã trung thực. Nếu ai đó phát hiện ra sự khác biệt, họ có thể đưa ra một thử thách.

### Proto-Danksharding {#proto-danksharding}

Dữ liệu Rollup trước đây đã được lưu trữ vĩnh viễn trên Ethereum, điều này rất tốn kém. Hơn 90% chi phí giao dịch mà người dùng phải trả trên các bản cuộn là do việc lưu trữ dữ liệu này. Để giảm chi phí giao dịch, chúng ta có thể chuyển dữ liệu vào một kho lưu trữ 'khối dữ liệu' tạm thời mới. Các khối dữ liệu rẻ hơn vì chúng không tồn tại vĩnh viễn; chúng sẽ bị xóa khỏi Ethereum khi không còn cần thiết nữa. Việc lưu trữ dữ liệu Rollup dài hạn trở thành trách nhiệm của những người cần nó, chẳng hạn như những người vận hành Rollup, các sàn giao dịch, các dịch vụ lập chỉ mục, v.v. Việc thêm các giao dịch khối dữ liệu vào Ethereum là một phần của bản nâng cấp được gọi là "Proto-Danksharding".

Với Proto-Danksharding, có thể thêm nhiều khối dữ liệu vào các khối Ethereum. Điều này cho phép tăng đáng kể (>100 lần) thông lượng của Ethereum và giảm chi phí giao dịch.

### Danksharding {#danksharding}

Giai đoạn thứ hai của việc mở rộng dữ liệu khối dữ liệu rất phức tạp vì nó đòi hỏi các phương pháp mới để kiểm tra xem dữ liệu Rollup có sẵn trên mạng lưới hay không và dựa vào việc các [trình xác thực](/glossary/#validator) tách biệt trách nhiệm xây dựng [khối](/glossary/#block) và đề xuất khối của họ. Nó cũng đòi hỏi một cách để chứng minh bằng mật mã rằng các trình xác thực đã xác minh các tập hợp con nhỏ của dữ liệu khối dữ liệu.

Bước thứ hai này được gọi là ["danksharding"](/roadmap/danksharding/). Công việc triển khai vẫn tiếp tục, với tiến bộ đạt được trên các điều kiện tiên quyết như [tách biệt việc xây dựng khối và đề xuất khối](/roadmap/pbs) và các thiết kế mạng lưới mới cho phép mạng lưới xác nhận hiệu quả rằng dữ liệu có sẵn bằng cách lấy mẫu ngẫu nhiên vài kilobyte mỗi lần, được gọi là [lấy mẫu tính khả dụng của dữ liệu (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Tìm hiểu thêm về danksharding</ButtonLink>

## Phi tập trung hóa các bản cuộn {#decentralizing-rollups}

[Các bản cuộn](/layer-2) đã và đang mở rộng quy mô Ethereum. Một [hệ sinh thái phong phú gồm các dự án Rollup](https://l2beat.com/scaling/tvs) đang cho phép người dùng giao dịch nhanh chóng và rẻ mẻ, với một loạt các đảm bảo về bảo mật. Tuy nhiên, các bản cuộn đã được khởi chạy bằng cách sử dụng các bộ sắp xếp tập trung (các máy tính thực hiện tất cả quá trình xử lý và tổng hợp giao dịch trước khi gửi chúng đến Ethereum). Điều này dễ bị kiểm duyệt, bởi vì những người vận hành bộ sắp xếp có thể bị trừng phạt, mua chuộc hoặc bị xâm phạm theo cách khác. Đồng thời, [các bản cuộn khác nhau](https://l2beat.com/scaling/summary) ở cách chúng xác thực dữ liệu đến. Cách tốt nhất là để các "người chứng minh" (provers) gửi [bằng chứng gian lận](/glossary/#fraud-proof) hoặc bằng chứng tính hợp lệ, nhưng không phải tất cả các bản cuộn đều đã đạt được điều đó. Ngay cả những bản cuộn sử dụng bằng chứng tính hợp lệ/gian lận cũng chỉ sử dụng một nhóm nhỏ các người chứng minh đã biết. Do đó, bước quan trọng tiếp theo trong việc mở rộng quy mô Ethereum là phân phối trách nhiệm chạy các bộ sắp xếp và người chứng minh cho nhiều người hơn.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Tìm hiểu thêm về các bản cuộn</ButtonLink>

## Tiến độ hiện tại {#current-progress}

Proto-Danksharding đã được triển khai thành công như một phần của bản nâng cấp mạng lưới Cancun-Deneb ("Dencun") vào tháng 3 năm 2024. Kể từ khi được triển khai, các bản cuộn đã bắt đầu sử dụng lưu trữ khối dữ liệu, dẫn đến giảm chi phí giao dịch cho người dùng và hàng triệu giao dịch được xử lý trong các khối dữ liệu.

Công việc về danksharding đầy đủ vẫn tiếp tục, với tiến bộ đạt được trên các điều kiện tiên quyết của nó như PBS (tách biệt người đề xuất và người xây dựng) và DAS (lấy mẫu tính khả dụng của dữ liệu). Việc phi tập trung hóa cơ sở hạ tầng Rollup là một quá trình dần dần - có nhiều bản cuộn khác nhau đang xây dựng các hệ thống hơi khác nhau và sẽ phi tập trung hóa hoàn toàn ở các tốc độ khác nhau.

[Tìm hiểu thêm về bản nâng cấp mạng lưới Dencun và tác động của nó](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />