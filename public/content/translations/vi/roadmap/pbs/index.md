---
title: Tách biệt người đề xuất và người xây dựng
description: Tìm hiểu cách thức và lý do tại sao các trình xác thực Ethereum sẽ chia tách trách nhiệm tạo khối và phát sóng khối của họ.
lang: vi
---

Các trình xác thực [Ethereum](/) hiện nay tạo _và_ phát sóng các khối. Họ gom các giao dịch mà họ đã nhận được thông qua mạng lưới gossip và đóng gói chúng thành một khối được gửi đến các node ngang hàng trên mạng lưới Ethereum. **Tách biệt người đề xuất và người xây dựng (PBS)** chia các nhiệm vụ này cho nhiều trình xác thực. Các trình tạo block chịu trách nhiệm tạo các khối và cung cấp chúng cho người đề xuất khối trong mỗi khe. Người đề xuất khối không thể nhìn thấy nội dung của khối, họ chỉ đơn giản là chọn khối có lợi nhuận cao nhất, nhận một khoản phí từ trình tạo block (hoặc trình xây dựng trả một khoản giá thầu cho người đề xuất) trước khi gửi khối đến các node ngang hàng của mình.

Đây là một bản nâng cấp quan trọng vì một số lý do. Đầu tiên, nó tạo cơ hội để ngăn chặn việc kiểm duyệt giao dịch ở cấp độ giao thức. Thứ hai, nó ngăn chặn các trình xác thực nghiệp dư bị đánh bại bởi các tổ chức lớn có khả năng tối ưu hóa lợi nhuận từ việc tạo khối của họ tốt hơn. Thứ ba, nó giúp mở rộng quy mô Ethereum bằng cách kích hoạt các bản nâng cấp danksharding.

## PBS và khả năng chống kiểm duyệt {#pbs-and-censorship-resistance}

Việc tách biệt các trình tạo block và người đề xuất khối khiến cho các trình tạo block khó kiểm duyệt giao dịch hơn rất nhiều. Điều này là do các tiêu chí đưa vào tương đối phức tạp có thể được thêm vào để đảm bảo không có sự kiểm duyệt nào diễn ra trước khi khối được đề xuất. Vì người đề xuất khối là một thực thể riêng biệt với trình tạo block, nó có thể đảm nhận vai trò bảo vệ chống lại các trình tạo block có hành vi kiểm duyệt.

Ví dụ, các danh sách đưa vào (inclusion list) có thể được giới thiệu để khi các trình xác thực biết về các giao dịch nhưng không thấy chúng được đưa vào các khối, họ có thể bắt buộc chúng phải có trong khối tiếp theo. Danh sách đưa vào được tạo từ mempool cục bộ của người đề xuất khối (danh sách các giao dịch mà nó biết) và được gửi đến các node ngang hàng của họ ngay trước khi một khối được đề xuất. Nếu bất kỳ giao dịch nào từ danh sách đưa vào bị thiếu, người đề xuất có thể từ chối khối, thêm các giao dịch bị thiếu trước khi đề xuất nó, hoặc đề xuất nó và để nó bị các trình xác thực khác từ chối khi họ nhận được. Cũng có một phiên bản tiềm năng hiệu quả hơn của ý tưởng này khẳng định rằng các trình xây dựng phải sử dụng tối đa không gian khối có sẵn và nếu họ không làm vậy, các giao dịch sẽ được thêm vào từ danh sách đưa vào của người đề xuất. Đây vẫn là một lĩnh vực đang được tích cực nghiên cứu và cấu hình tối ưu cho các danh sách đưa vào vẫn chưa được xác định.

[Các mempool được mã hóa](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) cũng có thể khiến các trình xây dựng và người đề xuất không thể biết họ đang đưa những giao dịch nào vào một khối cho đến khi khối đó đã được phát sóng.

<ExpandableCard title="PBS giải quyết những loại kiểm duyệt nào?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Các tổ chức quyền lực có thể gây áp lực buộc các trình xác thực phải kiểm duyệt các giao dịch đến hoặc đi từ các địa chỉ nhất định. Các trình xác thực tuân thủ áp lực này bằng cách phát hiện các địa chỉ bị đưa vào danh sách đen trong bể giao dịch của họ và loại bỏ chúng khỏi các khối mà họ đề xuất. Sau PBS, điều này sẽ không còn khả thi nữa vì người đề xuất khối sẽ không biết họ đang phát sóng những giao dịch nào trong các khối của mình. Việc tuân thủ các quy tắc kiểm duyệt có thể quan trọng đối với một số cá nhân hoặc ứng dụng nhất định, ví dụ như khi nó được luật hóa trong khu vực của họ. Trong những trường hợp này, việc tuân thủ diễn ra ở cấp độ ứng dụng, trong khi giao thức vẫn không cần cấp phép và không bị kiểm duyệt.

</ExpandableCard>

## PBS và MEV {#pbs-and-mev}

**Giá trị có thể trích xuất tối đa (MEV)** đề cập đến việc các trình xác thực tối đa hóa lợi nhuận của họ bằng cách sắp xếp các giao dịch một cách có lợi. Các ví dụ phổ biến bao gồm kinh doanh chênh lệch giá trên các sàn giao dịch phi tập trung (ví dụ: chạy trước một lệnh bán hoặc mua lớn) hoặc xác định các cơ hội để thanh lý các vị thế tài chính phi tập trung (DeFi). Việc tối đa hóa MEV yêu cầu kiến thức kỹ thuật tinh vi và phần mềm tùy chỉnh được gắn vào các trình xác thực thông thường, khiến cho các nhà điều hành tổ chức có nhiều khả năng vượt trội hơn các cá nhân và trình xác thực nghiệp dư trong việc trích xuất MEV. Điều này có nghĩa là lợi nhuận đặt cọc có khả năng cao hơn với các nhà điều hành tập trung, tạo ra một lực lượng tập trung hóa làm nản lòng việc đặt cọc tại nhà.

PBS giải quyết vấn đề này bằng cách cấu hình lại tính kinh tế của MEV. Thay vì người đề xuất khối tự thực hiện việc tìm kiếm MEV của riêng họ, họ chỉ cần chọn một khối từ nhiều khối được cung cấp cho họ bởi các trình tạo block. Các trình tạo block có thể đã thực hiện trích xuất MEV tinh vi, nhưng phần thưởng cho việc đó lại thuộc về người đề xuất khối. Điều này có nghĩa là ngay cả khi một nhóm nhỏ các trình tạo block chuyên biệt thống trị việc trích xuất MEV, phần thưởng cho việc đó có thể thuộc về bất kỳ trình xác thực nào trên mạng lưới, bao gồm cả những người đặt cọc cá nhân tại nhà.

<ExpandableCard title="Tại sao việc tập trung hóa quá trình xây dựng khối lại ổn?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Các cá nhân có thể được khuyến khích đặt cọc với các pool thay vì tự mình đặt cọc do phần thưởng được nâng cao từ các chiến lược MEV tinh vi. Việc tách biệt việc tạo khối khỏi đề xuất khối có nghĩa là MEV được trích xuất sẽ được phân phối cho nhiều trình xác thực hơn thay vì tập trung vào người tìm kiếm MEV hiệu quả nhất. Đồng thời, việc cho phép các trình tạo block chuyên biệt tồn tại sẽ gỡ bỏ gánh nặng tạo khối khỏi các cá nhân, và cũng ngăn chặn các cá nhân đánh cắp MEV cho riêng họ, trong khi tối đa hóa số lượng các trình xác thực cá nhân, độc lập có thể kiểm tra xem các khối có trung thực hay không. Khái niệm quan trọng là "sự bất đối xứng giữa trình chứng minh và trình xác minh" (prover-verifier asymmetry), đề cập đến ý tưởng rằng việc sản xuất khối tập trung là ổn miễn là có một mạng lưới các trình xác thực mạnh mẽ và phi tập trung tối đa có khả năng chứng minh các khối là trung thực. Sự phi tập trung là một phương tiện, không phải là mục tiêu cuối cùng - điều chúng ta muốn là các khối trung thực.
</ExpandableCard>

## PBS và Danksharding {#pbs-and-danksharding}

Danksharding là cách Ethereum sẽ mở rộng quy mô lên >100.000 giao dịch mỗi giây và giảm thiểu phí cho người dùng Rollup. Nó dựa vào PBS vì nó làm tăng khối lượng công việc cho các trình tạo block, những người sẽ phải tính toán các bằng chứng cho tối đa 64 MB dữ liệu Rollup trong vòng chưa đầy 1 giây. Điều này có thể sẽ yêu cầu các trình xây dựng chuyên biệt có thể cống hiến phần cứng khá đáng kể cho nhiệm vụ này. Tuy nhiên, trong tình hình hiện tại, việc tạo khối có thể ngày càng trở nên tập trung xung quanh các nhà điều hành tinh vi và mạnh mẽ hơn do việc trích xuất MEV. Tách biệt người đề xuất và người xây dựng (PBS) là một cách để đón nhận thực tế này và ngăn chặn nó tạo ra lực lượng tập trung hóa lên việc xác thực khối (phần quan trọng) hoặc việc phân phối phần thưởng đặt cọc. Một lợi ích phụ tuyệt vời là các trình tạo block chuyên biệt cũng sẵn sàng và có khả năng tính toán các bằng chứng dữ liệu cần thiết cho danksharding.

## Tiến độ hiện tại {#current-progress}

PBS đang ở giai đoạn nghiên cứu nâng cao, nhưng vẫn còn một số câu hỏi thiết kế quan trọng cần được giải quyết trước khi nó có thể được tạo nguyên mẫu trong các client Ethereum. Vẫn chưa có đặc tả đã chung cuộc nào. Điều này có nghĩa là PBS có thể sẽ mất một năm hoặc hơn nữa. Kiểm tra [tình trạng nghiên cứu](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance) mới nhất.

## Đọc thêm {#further-reading}

- [Tình trạng nghiên cứu: khả năng chống kiểm duyệt dưới PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Các thiết kế thị trường phí thân thiện với PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS và khả năng chống kiểm duyệt](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Danh sách đưa vào (Inclusion lists)](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)