---
title: "Khai thác"
description: "Giải thích về cách thức hoạt động của việc khai thác trên Ethereum."
lang: vi
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Bằng chứng công việc (PoW) không còn là nền tảng cho cơ chế đồng thuận của Ethereum, nghĩa là việc khai thác đã bị tắt. Thay vào đó, [Ethereum](/) được bảo mật bởi các trình xác thực đặt cọc ETH. Bạn có thể bắt đầu đặt cọc ETH của mình ngay hôm nay. Đọc thêm về <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>bằng chứng cổ phần (PoS)</a>, và <a href='/staking/'>việc đặt cọc</a>. Trang này chỉ dành cho mục đích tham khảo lịch sử.
</AlertDescription>
</AlertContent>
</Alert>

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [giao dịch](/developers/docs/transactions/), [khối](/developers/docs/blocks/) và [bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Khai thác Ethereum là gì? {#what-is-ethereum-mining}

Khai thác là quá trình tạo ra một khối các giao dịch để thêm vào Chuỗi khối Ethereum trong kiến trúc bằng chứng công việc (PoW) hiện đã bị ngừng sử dụng của Ethereum.

Từ khai thác bắt nguồn từ bối cảnh so sánh tiền điện tử với vàng. Vàng hoặc kim loại quý rất khan hiếm, các token kỹ thuật số cũng vậy, và cách duy nhất để tăng tổng khối lượng trong hệ thống bằng chứng công việc (PoW) là thông qua việc khai thác. Trong Ethereum bằng chứng công việc (PoW), phương thức phát hành duy nhất là thông qua khai thác. Tuy nhiên, không giống như vàng hay kim loại quý, khai thác Ethereum cũng là cách để bảo mật mạng lưới bằng cách tạo, xác minh, xuất bản và truyền bá các khối trong Chuỗi khối.

Khai thác ether = Bảo mật mạng lưới

Khai thác là huyết mạch của bất kỳ Chuỗi khối bằng chứng công việc (PoW) nào. Các thợ đào Ethereum - những máy tính chạy phần mềm - đã sử dụng thời gian và sức mạnh tính toán của họ để xử lý các giao dịch và tạo ra các khối trước khi chuyển sang bằng chứng cổ phần (PoS).

## Tại sao các thợ đào lại tồn tại? {#why-do-miners-exist}

Trong các hệ thống phi tập trung như Ethereum, chúng ta cần đảm bảo rằng mọi người đều đồng ý về thứ tự của các giao dịch. Các thợ đào đã giúp điều này xảy ra bằng cách giải quyết các câu đố tính toán khó để tạo ra các khối, bảo mật mạng lưới khỏi các cuộc tấn công.

[Tìm hiểu thêm về bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/)

Trước đây, bất kỳ ai cũng có thể khai thác trên mạng lưới Ethereum bằng máy tính của họ. Tuy nhiên, không phải ai cũng có thể khai thác ether (ETH) một cách có lãi. Trong hầu hết các trường hợp, thợ đào phải mua phần cứng máy tính chuyên dụng và có quyền truy cập vào các nguồn năng lượng giá rẻ. Một máy tính thông thường khó có khả năng kiếm đủ phần thưởng khối để trang trải các chi phí liên quan đến việc khai thác.

### Chi phí khai thác {#cost-of-mining}

- Chi phí tiềm năng của phần cứng cần thiết để xây dựng và bảo trì một dàn máy khai thác
- Chi phí điện năng để vận hành dàn máy khai thác
- Nếu bạn đang khai thác trong một mỏ đào chung (pool), các mỏ này thường tính một khoản phí % cố định cho mỗi khối được tạo ra bởi mỏ
- Chi phí tiềm năng của các thiết bị hỗ trợ dàn máy khai thác (hệ thống thông gió, giám sát năng lượng, hệ thống dây điện, v.v.)

Để khám phá thêm về lợi nhuận khai thác, hãy sử dụng máy tính khai thác, chẳng hạn như máy tính do [Etherscan](https://etherscan.io/ether-mining-calculator) cung cấp.

## Cách các giao dịch Ethereum được khai thác {#how-ethereum-transactions-were-mined}

Phần sau đây cung cấp một cái nhìn tổng quan về cách các giao dịch được khai thác trong Ethereum bằng chứng công việc (PoW). Một mô tả tương tự về quá trình này cho Ethereum bằng chứng cổ phần (PoS) có thể được tìm thấy [tại đây](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Một người dùng viết và ký một yêu cầu [giao dịch](/developers/docs/transactions/) bằng khóa riêng tư của một [tài khoản](/developers/docs/accounts/) nào đó.
2. Người dùng phát sóng yêu cầu giao dịch tới toàn bộ mạng lưới Ethereum từ một [nút](/developers/docs/nodes-and-clients/) nào đó.
3. Khi nhận được thông tin về yêu cầu giao dịch mới, mỗi nút trong mạng lưới Ethereum sẽ thêm yêu cầu đó vào mempool cục bộ của họ, một danh sách tất cả các yêu cầu giao dịch mà họ đã nhận được nhưng chưa được đưa vào Chuỗi khối trong một khối.
4. Tại một thời điểm nào đó, một nút khai thác sẽ tổng hợp vài chục hoặc hàng trăm yêu cầu giao dịch thành một [khối](/developers/docs/blocks/) tiềm năng, theo cách tối đa hóa [phí giao dịch](/developers/docs/gas/) mà họ kiếm được trong khi vẫn ở dưới giới hạn gas của khối. Nút khai thác sau đó:
   1. Xác minh tính hợp lệ của từng yêu cầu giao dịch (ví dụ: không ai đang cố gắng chuyển ether ra khỏi một tài khoản mà họ chưa tạo chữ ký, yêu cầu không bị sai định dạng, v.v.), và sau đó thực thi mã của yêu cầu, thay đổi trạng thái của bản sao EVM cục bộ của họ. Thợ đào sẽ trao phí giao dịch cho mỗi yêu cầu giao dịch như vậy vào tài khoản của chính họ.
   2. Bắt đầu quá trình tạo ra "chứng chỉ hợp pháp" bằng chứng công việc (PoW) cho khối tiềm năng, sau khi tất cả các yêu cầu giao dịch trong khối đã được xác minh và thực thi trên bản sao EVM cục bộ.
5. Cuối cùng, một thợ đào sẽ hoàn thành việc tạo chứng chỉ cho một khối bao gồm yêu cầu giao dịch cụ thể của chúng ta. Thợ đào sau đó phát sóng khối đã hoàn thành, bao gồm chứng chỉ và một checksum của trạng thái EVM mới được xác nhận.
6. Các nút khác nhận được thông tin về khối mới. Chúng xác minh chứng chỉ, tự thực thi tất cả các giao dịch trên khối (bao gồm cả giao dịch ban đầu được phát sóng bởi người dùng của chúng ta), và xác minh rằng checksum của trạng thái EVM mới của chúng sau khi thực thi tất cả các giao dịch khớp với checksum của trạng thái được xác nhận bởi khối của thợ đào. Chỉ khi đó, các nút này mới nối khối này vào cuối Chuỗi khối của chúng và chấp nhận trạng thái EVM mới làm trạng thái chính thức.
7. Mỗi nút loại bỏ tất cả các giao dịch trong khối mới khỏi mempool cục bộ của chúng chứa các yêu cầu giao dịch chưa được thực hiện.
8. Các nút mới tham gia mạng lưới tải xuống tất cả các khối theo trình tự, bao gồm cả khối chứa giao dịch mà chúng ta quan tâm. Chúng khởi tạo một bản sao EVM cục bộ (bắt đầu như một EVM trạng thái trống), và sau đó trải qua quá trình thực thi mọi giao dịch trong mọi khối trên bản sao EVM cục bộ của chúng, xác minh các checksum trạng thái tại mỗi khối trong suốt quá trình.

Mỗi giao dịch được khai thác (được đưa vào một khối mới và được truyền bá lần đầu tiên) một lần, nhưng được thực thi và xác minh bởi mọi người tham gia trong quá trình thúc đẩy trạng thái EVM chính thức. Điều này làm nổi bật một trong những câu thần chú trung tâm của Chuỗi khối: **Đừng tin tưởng, hãy xác minh**.

## Khối ommer (uncle) {#ommer-blocks}

Việc khai thác khối trên bằng chứng công việc (PoW) mang tính xác suất, nghĩa là đôi khi hai khối hợp lệ được xuất bản đồng thời do độ trễ của mạng lưới. Trong trường hợp này, giao thức phải xác định Chuỗi dài nhất (và do đó "hợp lệ" nhất) trong khi vẫn đảm bảo sự công bằng đối với các thợ đào bằng cách thưởng một phần cho khối hợp lệ được đề xuất nhưng không được đưa vào. Điều này khuyến khích sự phi tập trung hơn nữa của mạng lưới vì các thợ đào nhỏ hơn, những người có thể phải đối mặt với độ trễ lớn hơn, vẫn có thể tạo ra lợi nhuận thông qua phần thưởng [khối ommer](/glossary/#ommer).

Thuật ngữ "ommer" là thuật ngữ trung lập về giới tính được ưa chuộng để chỉ khối anh em của một khối cha, nhưng đôi khi nó cũng được gọi là "uncle" (khối chú). **Kể từ khi Ethereum chuyển sang bằng chứng cổ phần (PoS), các khối ommer không còn được khai thác nữa** vì chỉ có một người đề xuất được bầu chọn trong mỗi khe. Bạn có thể thấy sự thay đổi này bằng cách xem [biểu đồ lịch sử](https://ycharts.com/indicators/ethereum_uncle_rate) của các khối ommer đã được khai thác.

## Bản demo trực quan {#a-visual-demo}

Hãy xem Austin hướng dẫn bạn về việc khai thác và Chuỗi khối bằng chứng công việc (PoW).

<VideoWatch slug="blockchain-eth-build" />

## Thuật toán khai thác {#mining-algorithm}

Mạng chính Ethereum chỉ từng sử dụng một thuật toán khai thác duy nhất - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash là thuật toán kế nhiệm của một thuật toán R&D ban đầu được gọi là ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Tìm hiểu thêm về các thuật toán khai thác](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Các chủ đề liên quan {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/)