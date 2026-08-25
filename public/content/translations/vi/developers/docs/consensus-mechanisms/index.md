---
title: "Cơ chế đồng thuận"
description: "Giải thích về các giao thức đồng thuận trong các hệ thống phân tán và vai trò của chúng trong Ethereum."
lang: vi
authors: ["Patrick Collins"]
---

Thuật ngữ 'cơ chế đồng thuận' thường được sử dụng một cách thông tục để chỉ các giao thức 'bằng chứng cổ phần (PoS)', 'bằng chứng công việc (PoW)' hoặc 'bằng chứng ủy quyền (PoA)'. Tuy nhiên, đây chỉ là các thành phần trong các cơ chế đồng thuận giúp bảo vệ chống lại [tấn công Sybil](/glossary/#sybil-attack). Cơ chế đồng thuận là toàn bộ tập hợp các ý tưởng, giao thức và cơ chế khuyến khích cho phép một tập hợp các nút phân tán đạt được thỏa thuận về trạng thái của một Chuỗi khối.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc phần [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Đồng thuận là gì? {#what-is-consensus}

Đồng thuận có nghĩa là một thỏa thuận chung đã đạt được. Hãy xem xét một nhóm người đi xem phim. Nếu không có sự bất đồng nào về lựa chọn phim được đề xuất, thì sự đồng thuận đã đạt được. Nếu có sự bất đồng, nhóm phải có cách để quyết định xem phim nào. Trong những trường hợp cực đoan, nhóm cuối cùng sẽ tách ra.

Đối với Chuỗi khối [Ethereum](/), quá trình này được chính thức hóa và việc đạt được đồng thuận có nghĩa là ít nhất 66% các nút trên mạng lưới đồng ý về trạng thái toàn cục của mạng lưới.

## Cơ chế đồng thuận là gì? {#what-is-a-consensus-mechanism}

Thuật ngữ cơ chế đồng thuận đề cập đến toàn bộ tập hợp các giao thức, cơ chế khuyến khích và ý tưởng cho phép một mạng lưới các nút đồng ý về trạng thái của một Chuỗi khối.

Ethereum sử dụng một cơ chế đồng thuận dựa trên bằng chứng cổ phần (PoS), lấy bảo mật kinh tế tiền mã hóa từ một tập hợp các phần thưởng và hình phạt áp dụng cho vốn được khóa bởi những người đặt cọc. Cấu trúc khuyến khích này khuyến khích những người đặt cọc cá nhân vận hành các trình xác thực trung thực, trừng phạt những người không làm như vậy và tạo ra một chi phí cực kỳ cao để tấn công mạng lưới.

Sau đó, có một giao thức quản lý cách các trình xác thực trung thực được chọn để đề xuất hoặc xác thực các khối, xử lý các giao dịch và bỏ phiếu cho góc nhìn của họ về đầu Chuỗi. Trong những tình huống hiếm hoi khi có nhiều khối ở cùng một vị trí gần đầu Chuỗi, có một cơ chế chọn nhánh để chọn các khối tạo nên Chuỗi 'nặng nhất', được đo lường bằng số lượng trình xác thực đã bỏ phiếu cho các khối được tính theo trọng số số dư ether đã đặt cọc của họ.

Một số khái niệm quan trọng đối với sự đồng thuận không được định nghĩa rõ ràng trong mã, chẳng hạn như bảo mật bổ sung được cung cấp bởi sự phối hợp xã hội ngoài băng tần tiềm năng như một tuyến phòng thủ cuối cùng chống lại các cuộc tấn công vào mạng lưới.

Các thành phần này cùng nhau tạo thành cơ chế đồng thuận.

## Các loại cơ chế đồng thuận {#types-of-consensus-mechanisms}

### Dựa trên bằng chứng công việc (PoW) {#proof-of-work}

Giống như Bitcoin, Ethereum đã từng sử dụng một giao thức đồng thuận dựa trên **bằng chứng công việc (PoW)**.

#### Tạo khối {#pow-block-creation}

Các thợ đào cạnh tranh để tạo ra các khối mới chứa đầy các giao dịch đã được xử lý. Người chiến thắng chia sẻ khối mới với phần còn lại của mạng lưới và kiếm được một số ETH mới được đúc. Cuộc đua thuộc về máy tính có khả năng giải một câu đố toán học nhanh nhất. Điều này tạo ra liên kết mật mã giữa khối hiện tại và khối đi trước. Việc giải câu đố này chính là công việc trong "bằng chứng công việc". Chuỗi chính tắc sau đó được xác định bởi một quy tắc chọn nhánh để chọn tập hợp các khối có nhiều công việc nhất được thực hiện để khai thác chúng.

#### Bảo mật {#pow-security}

Mạng lưới được giữ an toàn bởi thực tế là bạn sẽ cần 51% sức mạnh tính toán của mạng lưới để lừa đảo Chuỗi. Điều này sẽ yêu cầu những khoản đầu tư khổng lồ vào thiết bị và năng lượng; bạn có khả năng sẽ chi tiêu nhiều hơn những gì bạn thu được.

Tìm hiểu thêm về [bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Dựa trên bằng chứng cổ phần (PoS) {#proof-of-stake}

Ethereum hiện sử dụng một giao thức đồng thuận dựa trên **bằng chứng cổ phần (PoS)**.

#### Tạo khối {#pos-block-creation}

Các trình xác thực tạo ra các khối. Một trình xác thực được chọn ngẫu nhiên trong mỗi khe để làm người đề xuất khối. Ứng dụng khách đồng thuận của họ yêu cầu một gói giao dịch dưới dạng 'tải trọng thực thi' từ máy khách thực thi được ghép nối của họ. Họ bọc gói này trong dữ liệu đồng thuận để tạo thành một khối, sau đó họ gửi khối này đến các nút khác trên mạng lưới Ethereum. Việc sản xuất khối này được thưởng bằng ETH. Trong những trường hợp hiếm hoi khi có nhiều khối khả thi tồn tại cho một khe duy nhất, hoặc các nút nghe về các khối ở những thời điểm khác nhau, thuật toán chọn nhánh sẽ chọn khối tạo thành Chuỗi có trọng số chứng thực lớn nhất (trong đó trọng số là số lượng trình xác thực chứng thực được tính theo tỷ lệ số dư ETH của họ).

#### Bảo mật {#pos-security}

Một hệ thống bằng chứng cổ phần an toàn về mặt kinh tế tiền mã hóa vì một kẻ tấn công cố gắng giành quyền kiểm soát Chuỗi phải tiêu hủy một lượng lớn ETH. Một hệ thống phần thưởng khuyến khích những người đặt cọc cá nhân hành xử trung thực và các hình phạt làm nản lòng những người đặt cọc hành động ác ý.

Tìm hiểu thêm về [bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Hướng dẫn trực quan {#types-of-consensus-video}

Xem thêm về các loại cơ chế đồng thuận khác nhau được sử dụng trên Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Kháng Sybil & chọn Chuỗi {#sybil-chain}

Bản thân bằng chứng công việc và bằng chứng cổ phần không phải là các giao thức đồng thuận, nhưng chúng thường được gọi như vậy cho đơn giản. Chúng thực chất là các cơ chế kháng Sybil và bộ chọn tác giả khối; chúng là một cách để quyết định ai là tác giả của khối mới nhất. Một thành phần quan trọng khác là thuật toán chọn Chuỗi (hay còn gọi là chọn nhánh) cho phép các nút chọn một khối chính xác duy nhất ở đầu Chuỗi trong các tình huống có nhiều khối tồn tại ở cùng một vị trí.

**Kháng Sybil** đo lường cách một giao thức chống lại một cuộc tấn công Sybil. Khả năng chống lại loại tấn công này là rất cần thiết cho một Chuỗi khối phi tập trung và cho phép các thợ đào và trình xác thực được khen thưởng công bằng dựa trên các nguồn lực đã bỏ ra. Bằng chứng công việc và bằng chứng cổ phần bảo vệ chống lại điều này bằng cách buộc người dùng phải tiêu tốn nhiều năng lượng hoặc đưa ra nhiều tài sản thế chấp. Những biện pháp bảo vệ này là một sự răn đe kinh tế đối với các cuộc tấn công Sybil.

Một **quy tắc chọn Chuỗi** được sử dụng để quyết định Chuỗi nào là Chuỗi "chính xác". Bitcoin sử dụng quy tắc "Chuỗi dài nhất", có nghĩa là Chuỗi khối nào dài nhất sẽ là Chuỗi mà phần còn lại của các nút chấp nhận là hợp lệ và làm việc cùng. Đối với các Chuỗi bằng chứng công việc, Chuỗi dài nhất được xác định bởi tổng độ khó bằng chứng công việc tích lũy của Chuỗi. Ethereum cũng từng sử dụng quy tắc Chuỗi dài nhất; tuy nhiên, hiện tại Ethereum chạy trên bằng chứng cổ phần, nó đã áp dụng một thuật toán chọn nhánh cập nhật để đo lường 'trọng số' của Chuỗi. Trọng số là tổng tích lũy các phiếu bầu của trình xác thực, được tính theo trọng số số dư ether đã đặt cọc của trình xác thực.

Ethereum sử dụng một cơ chế đồng thuận được gọi là [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) kết hợp [bằng chứng cổ phần Casper FFG](https://arxiv.org/abs/1710.09437) với [quy tắc chọn nhánh GHOST](https://arxiv.org/abs/2003.03052).

## Đọc thêm {#further-reading}

- [Thuật toán đồng thuận Chuỗi khối là gì?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Đồng thuận Nakamoto là gì? Hướng dẫn hoàn chỉnh cho người mới bắt đầu](https://blockonomi.com/nakamoto-consensus/)
- [Casper hoạt động như thế nào?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Về bảo mật và hiệu suất của các Chuỗi khối bằng chứng công việc](https://eprint.iacr.org/2016/555.pdf)
- [Lỗi Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Khai thác](/developers/docs/consensus-mechanisms/pow/mining/)
- [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Bằng chứng ủy quyền (PoA)](/developers/docs/consensus-mechanisms/poa/)