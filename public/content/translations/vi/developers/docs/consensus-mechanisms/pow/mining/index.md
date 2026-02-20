---
title: "Khai thác"
description: "Giải thích về cách hoạt động của việc khai thác trên Ethereum."
lang: vi
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Bằng chứng làm việc không còn là cơ chế đồng thuận nền tảng của Ethereum, nghĩa là việc khai thác đã bị tắt. Thay vào đó, Ethereum được bảo mật bởi các trình xác thực đặt cọc ETH. Bạn có thể bắt đầu đặt cọc ETH của mình ngay từ hôm nay. Đọc thêm về <a href='/roadmap/merge/'>sự kiện hợp nhất</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Bằng chứng cổ phần</a> và <a href='/staking/'>Cổ phần</a>. Trang này chỉ nhằm mục đích tham khảo lịch sử.
</AlertDescription>
</AlertContent>
</Alert>

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các giao dịch](/developers/docs/transactions/), [các khối](/developers/docs/blocks/) và [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/).

## Đào Ethereum là gì? {#what-is-ethereum-mining}

Khai thác là quá trình tạo ra một khối giao dịch để thêm vào blockchain Ethereum trong kiến trúc bằng chứng làm việc của Ethereum, hiện đã bị loại bỏ.

Từ mining bắt nguồn từ phép ẩn dụ vàng trong bối cảnh tiền điện tử. Vàng hay các kim loại quý thì khan hiếm, tương tự, các token số cũng khan hiếm, và cách duy nhất để tăng tổng lượng trong hệ thống Bằng chứng làm việc là thông qua khai thác. Trong Ethereum sử dụng bằng chứng làm việc, cách duy nhất để phát hành token là thông qua khai thác. Tuy nhiên, khác với vàng hay các kim loại quý, khai thác Ethereum còn là phương thức để bảo mật mạng lưới bằng cách tạo, xác minh, công bố và truyền tải các khối lên blockchain.

Khai thác Ethers = Bảo mật mạng lưới

Khai thác là mạch sống của bất kỳ blockchain nào sử dụng cơ chế Bằng chứng làm việc. Các thợ đào Ethereum – những máy tính chạy phần mềm – đã sử dụng thời gian và sức mạnh tính toán của mình để xử lý giao dịch và tạo khối trước khi Ethereum chuyển sang cơ chế Bằng chứng cổ phần.

## Tại sao lại có các thợ đào? {#why-do-miners-exist}

Trong các hệ thống phi tập trung như Ethereum, chúng ta cần đảm bảo rằng tất cả mọi người đồng thuận về thứ tự các giao dịch. Các thợ đào trợ giúp điều này xảy ra bằng cách giải các bài toán tính toán phức tạp để tạo khối, đồng thời bảo vệ mạng lưới khỏi các cuộc tấn công.

[Thông tin thêm về bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)

Trước đây, bất kỳ ai cũng có thể khai thác trên mạng lưới Ethereum bằng máy tính của mình. Tuy nhiên, không phải ai cũng có thể khai thác Ether (ETH) một cách có lợi nhuận. Trong hầu hết các trường hợp, các thợ đào phải mua phần cứng máy tính chuyên dụng và có nguồn năng lượng giá rẻ. Các máy tính thông thường khó có thể kiếm đủ phần thưởng khối để bù đắp chi phí khai thác liên quan.

### Chi phí khai thác {#cost-of-mining}

- Chi phí tiềm ẩn cho phần cứng cần thiết để xây dựng và vận hành một dàn khai thác
- Chi phí điện để cung cấp năng lượng cho dàn khai thác
- Nếu bạn khai thác trong một bể, các bể này thường tính một mức phí cố định theo phần trăm trên mỗi khối mà bể tạo ra
- Chi phí tiềm ẩn cho thiết bị hỗ trợ dàn khai thác (quạt thông gió, giám sát năng lượng, hệ thống điện, v.v.)

Để tìm hiểu thêm về lợi nhuận khai thác, hãy sử dụng công cụ tính toán khai thác, chẳng hạn như công cụ do [Etherscan](https://etherscan.io/ether-mining-calculator) cung cấp.

## Cách các giao dịch Ethereum đã được khai thác {#how-ethereum-transactions-were-mined}

Phần sau đây cung cấp tổng quan về cách các giao dịch được khai thác trên Ethereum theo cơ chế Bằng chứng làm việc. Mô tả tương tự về quy trình này cho bằng chứng cổ phần của Ethereum có thể được tìm thấy [tại đây](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Một người dùng viết và ký một yêu cầu [giao dịch](/developers/docs/transactions/) bằng khóa riêng tư của một [tài khoản](/developers/docs/accounts/) nào đó.
2. Người dùng phát tán yêu cầu giao dịch đến toàn bộ mạng Ethereum từ một [nút](/developers/docs/nodes-and-clients/) nào đó.
3. Khi nhận được thông tin về yêu cầu giao dịch mới, mỗi nút trong mạng Ethereum sẽ thêm yêu cầu đó vào bộ nhớ tạm cục bộ, là danh sách tất cả các yêu cầu giao dịch mà chúng biết nhưng chưa được ghi vào chuỗi khối dưới dạng một khối.
4. Tại một thời điểm nào đó, một nút khai thác tổng hợp vài chục hoặc hàng trăm yêu cầu giao dịch thành một [khối](/developers/docs/blocks/) tiềm năng, theo cách tối đa hóa [phí giao dịch](/developers/docs/gas/) mà họ kiếm được trong khi vẫn ở dưới giới hạn gas của khối. Nút khai thác sau đó sẽ là:
   1. Xác minh tính hợp lệ của từng yêu cầu giao dịch (tức là không ai đang cố gắng chuyển ether ra khỏi một tài khoản mà họ chưa ký, yêu cầu không bị sai định dạng, v.v.), sau đó thực thi mã của yêu cầu, làm thay đổi trạng thái bản sao cục bộ của Máy ảo Ethereum của họ. Thợ đào sẽ nhận phí giao dịch của mỗi yêu cầu giao dịch đó vào tài khoản của chính họ.
   2. Bắt đầu quá trình tạo chứng chỉ hợp lệ cho khối tiềm năng, sau khi tất cả các yêu cầu giao dịch trong khối đã được xác minh và thực thi trên bản sao Máy ảo Ethereum cục bộ.
5. Cuối cùng, một thợ đào sẽ hoàn tất việc tạo chứng chỉ cho một khối, trong đó bao gồm yêu cầu giao dịch cụ thể của chúng ta. Sau đó, thợ khai thác phát tán khối đã hoàn tất, trong đó bao gồm chứng chỉ và một giá trị kiểm tra của trạng thái Máy ảo Ethereum mới được khai báo.
6. Các nút khác nhận được thông tin về khối mới. Họ xác minh chứng chỉ, tự thực thi tất cả các giao dịch trong khối (bao gồm cả giao dịch ban đầu do người dùng của chúng ta phát tán), và kiểm tra xem giá trị kiểm tra của trạng thái Máy ảo Ethereum mới sau khi thực thi tất cả giao dịch có khớp với giá trị kiểm tra của trạng thái do khối của Thợ đào khai báo hay không. Chỉ sau đó, các nút này mới thêm khối này vào cuối chuỗi blockchain của họ và chấp nhận trạng thái Máy ảo Ethereum mới là trạng thái chính thức.
7. Mỗi nút sẽ xóa tất cả các giao dịch trong khối mới khỏi bộ nhớ tạm cục bộ của mình, nơi lưu trữ các yêu cầu giao dịch chưa được thực hiện.
8. Các nút mới tham gia mạng sẽ tải xuống tất cả các khối theo thứ tự, bao gồm cả khối chứa giao dịch mà chúng ta quan tâm. Chúng khởi tạo một bản sao Máy ảo Ethereum cục bộ (bắt đầu từ trạng thái trống), sau đó thực hiện quá trình thực thi mọi giao dịch trong từng khối trên bản sao Máy ảo Ethereum cục bộ của mình, đồng thời kiểm tra giá trị kiểm tra trạng thái ở mỗi khối trong quá trình này.

Mỗi giao dịch chỉ được khai thác một lần (được đưa vào khối mới và truyền đi lần đầu), nhưng lại được thực thi và xác minh bởi mọi người tham gia trong quá trình cập nhật trạng thái Máy ảo Ethereum chính thức. Điều này nhấn mạnh một trong những phương châm cốt lõi của chuỗi khối: **Đừng tin, hãy xác minh**.

## Các khối Ommer (chú) {#ommer-blocks}

Khai thác khối trên cơ chế Bằng chứng công việc mang tính xác suất, nghĩa là đôi khi hai khối hợp lệ được công bố cùng lúc do độ trễ mạng. Trong trường hợp này, giao thức phải xác định chuỗi dài nhất (và do đó là chuỗi "hợp lệ" nhất) đồng thời đảm bảo công bằng cho các thợ khai thác bằng cách phần thưởng một phần cho khối hợp lệ nhưng không được đưa vào chuỗi. Điều này khuyến khích việc phân quyền hóa mạng hơn nữa, vì các thợ đào nhỏ hơn, những người có thể phải đối mặt với độ trễ cao hơn, vẫn có thể tạo ra lợi nhuận thông qua phần thưởng khối [ommer](/glossary/#ommer).

Thuật ngữ "ommer" là cách gọi trung lập về giới tính được ưu tiên cho khối anh/chị/em của khối cha, nhưng đôi khi cũng được gọi là "chú". **Kể từ khi Ethereum chuyển sang bằng chứng cổ phần, các khối ommer không còn được khai thác nữa** vì chỉ có một người đề xuất được bầu trong mỗi slot. Bạn có thể thấy sự thay đổi này bằng cách xem [biểu đồ lịch sử](https://ycharts.com/indicators/ethereum_uncle_rate) của các khối ommer đã được khai thác.

## Bản demo trực quan {#a-visual-demo}

Hãy theo dõi Austin hướng dẫn bạn về việc khai thác và chuỗi khỗi proof of work.

<YouTube id="zcX7OJ-L8XQ" />

## Thuật toán khai thác {#mining-algorithm}

Mạng chính Ethereum chỉ từng sử dụng một thuật toán khai thác - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash là thuật toán kế thừa của thuật toán R&D ban đầu có tên là ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Tìm hiểu thêm về các thuật toán khai thác](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Các chủ đề liên quan {#related-topics}

- [Gas](/developers/docs/gas/)
- [Máy ảo Ethereum](/developers/docs/evm/)
- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
