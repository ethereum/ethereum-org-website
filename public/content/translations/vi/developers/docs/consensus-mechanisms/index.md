---
title: "Cơ chế đồng thuận"
description: "Một sự giải thích về các giao thức đồng thuận trong hệ thống phân tán và vai trò của chúng trong Ethereum."
lang: vi
---

Thuật ngữ 'cơ chế đồng thuận' thường được dùng để chỉ các giao thức 'Bằng chứng cổ phần', 'Bằng chứng công việc' hoặc 'Bằng chứng quyền hạn'. Tuy nhiên, đây chỉ là các thành phần trong cơ chế đồng thuận giúp bảo vệ chống lại [các cuộc tấn công Sybil](/glossary/#sybil-attack). Cơ chế đồng thuận là toàn bộ tập hợp các ý tưởng, giao thức và cơ chế khuyến khích, cho phép một tập hợp các nút phân tán đồng thuận về trạng thái của chuỗi khối.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước bài [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Sự đồng thuận là gì? {#what-is-consensus}

Thông qua sự đồng thuận, chúng ta có ý rằng một thoả thuận chung đã đạt được  Hãy xem xét một nhóm người đi xem phim. Nếu không có bất đồng về sự lựa chọn bộ phim đã được đề xuất, thì đạt được một sự đồng thuận. Nếu có bất đồng, nhóm buộc phải có cách để quyết định sẽ xem bộ phim nào. Trong những trường hợp cực đoan, nhóm cuối cùng sẽ tách ra.

Đối với chuỗi khối Ethereum, quá trình này được chính thức hoá và việc đạt được sự đồng thuận có nghĩa là ít nhất 66% số nút trên mạng đồng ý về trạng thái toàn cục của mạng.

## Cơ chế đồng thuận là gì? {#what-is-a-consensus-mechanism}

Thuật ngữ cơ chế đồng thuận chỉ toàn bộ tập hợp các giao thức, cơ chế khuyến khích và ý tưởng cho phép một mạng lưới các nút đồng thuận về trạng thái của chuỗi khối.

Ethereum sử dụng cơ chế đồng thuận dựa trên bằng chứng cổ phần (proof-of-stake), trong đó tính bảo mật kinh tế-tiền điện tử được đảm bảo nhờ hệ thống phần thưởng và hình phạt áp dụng cho số vốn mà các staker đã khoá. Cấu trúc khuyến khích này thúc đẩy các staker độc lập vận hành trình xác thực trung thực, trừng phạt những người không như thế và tạo ra chi phí cực kỳ cao để tấn công mạng.

Sau đó, có một giao thức quy định cách các trình xác thực trung thực được chọn để đề xuất hoặc xác thực khối, xử lý giao dịch và bỏ phiếu về quan điểm của họ về khối mới nhất trên chuỗi. Trong một số tình huống hiếm hoi khi nhiều khối ở cùng một vị trí gần đầu chuỗi, có một cơ chế lựa chọn fork chọn các khối tạo nên chuỗi 'nặng nhất', được đo bằng số lượng trình xác thực đã bỏ phiếu cho các khối theo số dư ether đã đặt cọc của họ.

Một số khái niệm quan trọng đối với cơ chế đồng thuận không được định nghĩa rõ ràng trong mã nguồn, chẳng hạn như mức độ bảo mật bổ sung mà việc phối hợp xã hội ngoài hệ thống có thể cung cấp như biện pháp phòng thủ cuối cùng chống lại các cuộc tấn công vào mạng.

Các thành phần này cùng nhau tạo thành cơ chế đồng thuận.

## Các loại cơ chế đồng thuận {#types-of-consensus-mechanisms}

### Dựa trên bằng chứng công việc {#proof-of-work}

Giống như Bitcoin, Ethereum đã từng sử dụng giao thức đồng thuận dựa trên **bằng chứng công việc (PoW)**.

#### Tạo khối {#pow-block-creation}

Các thợ đào cạnh tranh để tạo ra các khối mới chứa các giao dịch đã được xử lý. Người chiến thắng chia sẻ khối mới với phần còn lại của mạng và kiếm được một số ETH mới được đúc. Cuộc đua giành chiến thắng bởi máy tính có thể giải câu đố toán học nhanh nhất. Điều này tạo ra liên kết mật mã giữa khối hiện tại và khối trước đó. Solving this puzzle is the work in "bằng chứng công việc". The canonical chain is then determined by a fork-choice rule that selects the set of blocks that have had the most work done to mine them.

#### Bảo mật {#pow-security}

Mạng lưới được bảo vệ an toàn bởi thực tế rằng bạn cần 51% sức mạnh tính toán của mạng để gian lận trong chuỗi. Điều này sẽ đòi hỏi đầu tư lớn vào thiết bị và năng lượng; bạn có khả năng chi tiêu nhiều hơn số tiền bạn có thể đạt được.

Tìm hiểu thêm về [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)

### Dựa trên bằng chứng cổ phần {#proof-of-stake}

Ethereum hiện nay sử dụng một giao thức đồng thuận dựa trên **bằng chứng cổ phần (PoS)**.

#### Tạo khối {#pos-block-creation}

Các trình xác thực tạo ra các khối. Một trình xác thực được chọn ngẫu nhiên trong mỗi vị trí để làm người đề xuất khối. Máy chủ đồng thuận của họ sẽ yêu cầu một gói giao dịch dưới dạng 'tải trọng thực thi' từ máy chủ thực thi được ghép đôi với nó. Họ bao bọc điều này trong dữ liệu đồng thuận để tạo thành một khối, chúng gửi đến các nút khác trên mạng Ethereum. Việc sản xuất khối này được thưởng bằng ETH. Trong một số trường hợp hiếm hoi khi có nhiều khối có thể tồn tại cho một vị trí hoặc các nút nghe về các khối vào các thời điểm khác nhau, thuật toán lựa chọn fork sẽ chọn khối tạo thành chuỗi có trọng số chứng thực lớn nhất (trong đó trọng số là số lượng trình xác thực được chia tỷ lệ theo số dư ETH của họ).

#### Bảo mật {#pos-security}

Hệ thống Bằng chứng cổ phần bảo mật về mặt kinh tế tiền điện tử vì kẻ tấn công cố gắng kiểm soát chuỗi buộc phải hủy một lượng lớn ETH. Hệ thống phần thưởng khuyến khích những staker cá nhân hành xử trung thực và các hình phạt ngăn cản staker có hành vi độc hại.

Tìm hiểu thêm về [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)

### Hướng dẫn trực quan {#types-of-consensus-video}

Xem thêm về các loại cơ chế đồng thuận khác nhau được sử dụng trên Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Kháng Sybil & lựa chọn chuỗi {#sybil-chain}

Chỉ riêng Bằng chứng công việc và Bằng chứng cổ phần không phải là các giao thức đồng thuận, nhưng chúng thường được gọi như vậy để đơn giản hoá. Chúng thực ra là các cơ chế chống tấn công mạo nhận và lựa chọn người tạo khối; chúng là phương thức để quyết định ai là tác giả của khối mới nhất. Một thành phần quan trọng khác là thuật toán chọn chuỗi (còn gọi là fork choice), cho phép các nút mạng chọn một khối đúng duy nhất ở đầu chuỗi trong những tình huống có nhiều khối tồn tại ở cùng vị trí.

**Kháng Sybil** đo lường cách một giao thức chống lại một cuộc tấn công Sybil. Khả năng chống lại loại tấn công này là điều cần thiết đối với một chuỗi khối phi tập trung và cho phép các thợ đào và trình xác thực được thưởng công bằng dựa trên tài nguyên họ đóng góp. Bằng chứng công việc và Bằng chứng cổ phần bảo vệ chống lại điều này bằng cách buộc người dùng tiêu tốn nhiều năng lượng hoặc đưa ra nhiều tài sản thế chấp. Những biện pháp bảo vệ này là một biện pháp răn đe kinh tế chống lại các cuộc tấn công mạo nhận.

Một **quy tắc lựa chọn chuỗi** được sử dụng để quyết định chuỗi nào là chuỗi "chính xác". Bitcoin sử dụng quy tắc "chuỗi dài nhất", nghĩa là bất cứ chuỗi khối nào dài nhất sẽ là chuỗi được các nút còn lại công nhận là hợp lệ và làm việc cùng. Đối với các chuỗi Bằng chứng công việc, chuỗi dài nhất được xác định dựa trên tổng độ khó tích luỹ của bằng chứng công việc của chuỗi đó. Trước đây, Ethereum cũng đã từng sử dụng quy tắc chuỗi dài nhất; tuy nhiên, hiện nay Ethereum chạy trên cơ chế bằng chứng cổ phần nên đã áp dụng một thuật toán fork-choice cập nhật, đo 'trọng số' của chuỗi. Trọng số là tổng tích luỹ các phiếu bầu của các trình xác thực, được tính trọng số bởi số dư ether đã được trình xác thực đặt cọc.

Ethereum sử dụng một cơ chế đồng thuận được gọi là [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) kết hợp [bằng chứng cổ phần Casper FFG](https://arxiv.org/abs/1710.09437) với [quy tắc lựa chọn phân nhánh GHOST](https://arxiv.org/abs/2003.03052).

## Đọc thêm {#further-reading}

- [Thuật toán đồng thuận chuỗi khối là gì?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Sự đồng thuận của Nakamoto là gì? Hướng dẫn Toàn diện cho Người mới bắt đầu](https://blockonomi.com/nakamoto-consensus/)
- [Casper hoạt động như thế nào?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Về tính bảo mật và hiệu năng của các chuỗi khối bằng chứng công việc](https://eprint.iacr.org/2016/555.pdf)
- [Lỗi Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
- [Khai thác](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/)
- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)
