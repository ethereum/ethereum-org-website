---
title: Bằng chứng cổ phần (PoS)
description: Giải thích về giao thức đồng thuận bằng chứng cổ phần và vai trò của nó trong Ethereum.
lang: vi
---

Bằng chứng cổ phần (PoS) là nền tảng cho [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của Ethereum. Ethereum đã chuyển sang cơ chế bằng chứng cổ phần vào năm 2022 vì nó an toàn hơn, ít tốn năng lượng hơn và tốt hơn cho việc triển khai các giải pháp mở rộng quy mô mới so với kiến trúc [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow) trước đây.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Proof-of-stake (bằng chứng cổ phần - PoS) là gì? {#what-is-pos}

Bằng chứng cổ phần là cách để chứng minh rằng các Validators đã bỏ thứ gì đó có giá trị vào bên trong mạng lưới, thứ có thể bị phá huỷ nếu họ hành động không trung thực. Trong bằng chứng cổ phần của Ethereum, người xác thực sẽ đặt cọc vốn dưới dạng ETH vào hợp đồng thông minh trên Ethereum. Sau đó, người xác thực có trách nhiệm kiểm tra xem các khối mới được truyền qua mạng có hợp lệ hay không và đôi khi tự tạo và truyền các khối mới. Nếu họ cố gắng lừa đảo mạng (ví dụ bằng cách đề xuất nhiều khối khi họ chỉ nên gửi một khối hoặc gửi các chứng nhận xung đột), một số hoặc toàn bộ ETH họ đặt cọc có thể bị phá hủy.

## Người xác thực {#validators}

Để tham gia với tư cách là người xác thực, người dùng phải gửi 32 ETH vào hợp đồng gửi tiền và chạy ba phần mềm riêng biệt: ứng dụng thực hiện, ứng dụng đồng thuận và ứng dụng xác thực. Khi gửi ETH, người dùng sẽ tham gia vào hàng đợi kích hoạt để giới hạn số lượng người xác thực mới tham gia mạng. Sau khi được kích hoạt, người xác thực sẽ nhận được các khối mới từ những người ngang hàng trên mạng Ethereum. Các giao dịch được chuyển giao trong khối sẽ được thực hiện lại để kiểm tra xem những thay đổi được đề xuất đối với trạng thái của Ethereum có hợp lệ hay không và chữ ký khối sẽ được kiểm tra. Sau đó, người xác thực sẽ gửi một phiếu bầu (gọi là chứng thực) ủng hộ khối đó trên toàn mạng.

Trong khi theo bằng chứng công việc, thời gian của các khối được xác định bởi độ khó khai thác thì theo bằng chứng cổ phần, nhịp độ được cố định. Thời gian trong bằng chứng cổ phần Ethereum được chia thành các slot (12 giây) và tham số epoch (32 slot). Một người xác thực được chọn ngẫu nhiên để trở thành người đề xuất khối trong mỗi vị trí. Người xác thực này chịu trách nhiệm tạo một khối mới và gửi nó đến các nút khác trên mạng. Ngoài ra, ở mỗi vị trí, một ủy ban gồm những người xác thực được chọn ngẫu nhiên, phiếu bầu của họ được sử dụng để xác định tính hợp lệ của khối được đề xuất. Chia người xác thực thành các ủy ban là rất quan trọng để quản lý được tải mạng. Các ủy ban phân chia nhóm người xác thực sao cho mọi người xác thực đang hoạt động đều chứng thực trong mọi tham số epoch, nhưng không phải trong mọi slot.

## Cách một Giao dịch được Thực thi trong Ethereum PoS {#transaction-execution-ethereum-pos}

Phần sau đây cung cấp lời giải thích toàn diện về cách thực hiện giao dịch trong cơ chế bằng chứng cổ phần của Ethereum.

1. Người dùng tạo và ký một [giao dịch](/developers/docs/transactions/) bằng khóa riêng tư của họ. Tác vụ này thường được xử lý bởi một ví hoặc một thư viện như [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), v.v. nhưng thực chất người dùng đang gửi yêu cầu tới một nút bằng [API JSON-RPC](/developers/docs/apis/json-rpc/) của Ethereum. Người dùng xác định số tiền gas mà họ sẵn sàng trả làm tiền boa cho người xác thực để khuyến khích họ đưa giao dịch vào một khối. [Phí ưu tiên](/developers/docs/gas/#priority-fee) được trả cho trình xác thực trong khi [phí cơ bản](/developers/docs/gas/#base-fee) bị đốt.
2. Giao dịch được gửi đến một [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-client) của Ethereum để xác minh tính hợp lệ của nó. Điều này có nghĩa là phải đảm bảo rằng người gửi có đủ ETH để thực hiện giao dịch và họ đã ký giao dịch bằng đúng khóa.
3. Nếu giao dịch hợp lệ, ứng dụng thực hiện sẽ thêm giao dịch đó vào khu vực chờ cục bộ (danh sách các giao dịch đang chờ xử lý) và cũng phát nó đến các nút khác qua mạng gossip của lớp thực hiện. Khi các nút khác biết về giao dịch, chúng cũng sẽ thêm giao dịch đó vào khu vực chờ cục bộ của chúng. Người dùng nâng cao có thể không phát giao dịch của họ mà thay vào đó chuyển tiếp nó đến các trình tạo khối chuyên dụng như [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Điều này cho phép họ sắp xếp các giao dịch trong các khối sắp tới để có lợi nhuận tối đa ([MEV](/developers/docs/mev/#mev-extraction)).
4. Một trong các nút xác thực trên mạng là nút đề xuất khối cho slot hiện tại, trước đó đã được chọn ngẫu nhiên bằng RANDAO. Nút này chịu trách nhiệm xây dựng và phát khối tiếp theo sẽ được thêm vào chuỗi khối Ethereum và cập nhật trạng thái toàn cầu. Nút này bao gồm ba phần: ứng dụng thực thi, ứng dụng đồng thuận và ứng dụng xác thực. Ứng dụng thực thi sẽ đóng gói các giao dịch từ khu vực chờ cục bộ thành "tải trọng thực thi" và thực thi chúng cục bộ để tạo ra thay đổi trạng thái. Thông tin này được chuyển đến ứng dụng đồng thuận, tại đó tải trọng thực thi được gói lại thành một phần của "khối đèn hiệu" cũng chứa thông tin về phần thưởng, hình phạt, lệnh cắt, chứng thực, v.v. cho phép mạng đồng ý về trình tự các khối ở đầu chuỗi. Giao tiếp giữa máy khách thực thi và máy khách đồng thuận được mô tả chi tiết hơn trong [Kết nối Máy khách Đồng thuận và Máy khách Thực thi](/developers/docs/networking-layer/#connecting-clients).
5. Các nút khác nhận được khối beacon mới trên mạng gossip lớp đồng thuận. Chúng chuyển nó đến ứng dụng thực hiện, tại đó các giao dịch được thực hiện lại cục bộ để đảm bảo thay đổi trạng thái được đề xuất là hợp lệ. Máy khách trình xác thực sau đó chứng thực rằng khối đó hợp lệ và là khối hợp lý tiếp theo trong khung nhìn của họ về chuỗi (nghĩa là nó được xây dựng trên chuỗi có trọng số chứng thực lớn nhất như được định nghĩa trong [quy tắc lựa chọn phân nhánh](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Khối được thêm vào cơ sở dữ liệu cục bộ tại mỗi nút chứng thực khối đó.
6. Giao dịch có thể được coi là "hoàn tất" nếu nó trở thành một phần của chuỗi có "liên kết siêu đa số" giữa hai điểm kiểm tra. Các điểm kiểm tra xuất hiện vào đầu mỗi tham số epoch và chúng tồn tại để tính đến thực tế là chỉ có một tập hợp con người xác thực đang hoạt động chứng thực trong mỗi slot, nhưng tất cả người xác thực đang hoạt động đều chứng thực trong mỗi tham số epoch. Do đó, chỉ giữa tham số epoch thì mới có thể chứng minh được 'liên kết siêu đa số' (đây là trường hợp 66% tổng số ETH được đặt cọc trên mạng đồng ý về hai điểm kiểm tra).

Bạn có thể tìm thấy thông tin chi tiết hơn về tính kết luận cuối cùng bên dưới.

## Tính kết luận cuối cùng {#finality}

Một giao dịch có tính "cuối cùng" trong các mạng phân tán khi nó là một phần của khối không thể thay đổi nếu không có một lượng lớn ETH bị đốt cháy. Trên Ethereum bằng chứng cổ phần (Proof-of-Stake), việc này được quản lý bằng cách sử dụng các khối "checkpoint". Khối đầu tiên trong mỗi kỷ nguyên (epoch) là một checkpoint. Người xác thực bỏ phiếu cho các cặp checkpoint mà nó cho là hợp lệ. Nếu một cặp checkpoint thu hút được số phiếu đại diện cho ít nhất 2/3 tổng số ETH đã được stake thì checkpoint sẽ được nâng cấp. Khi cả hai (target) trở thành "được chứng minh là đúng" (justified) càng gần với hiện tại. Thì cả hai cái trước đó "được chứng minh là đúng" (justified) càng sớm bởi vì nó là "mục tiêu" (target) của kỷ nguyên (epoch) trước. Giờ nó được nâng cấp lên thành "hoàn thiện" (finalized). Quá trình nâng cấp các điểm kiểm tra này được xử lý bởi **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG là một công cụ xác định tính cuối cùng của khối cho sự đồng thuận. Một khi một khối được hoàn tất, nó không thể bị hoàn lại hoặc thay đổi nếu không có sự cắt giảm đa số người đặt cược, khiến nó không khả thi về mặt kinh tế.

Để hoàn tác một khối đã hoàn tất, kẻ tấn công sẽ phải mất ít nhất một phần ba tổng nguồn cung ETH đã đặt cọc. Lý do chính xác cho điều này được giải thích trong [bài đăng trên blog của Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Vì tính kết luận cuối cùng đòi hỏi phải có đa số hai phần ba, nên kẻ tấn công có thể ngăn chặn mạng đạt được tính kết luận cuối cùng bằng cách bỏ phiếu bằng một phần ba tổng số đặt cọt. Có một cơ chế để chống lại điều này: [rò rỉ do không hoạt động](https://eth2book.info/bellatrix/part2/incentives/inactivity). Tính năng này được kích hoạt bất cứ khi nào chuỗi không hoàn tất trong hơn bốn tham số epoch. Rò rỉ không hoạt động sẽ làm mất đi số ETH đã đặt cọc từ những người xác thực bỏ phiếu chống lại đa số, cho phép đa số giành lại được hai phần ba và hoàn thiện chuỗi.

## Bảo mật kinh tế tiền mã hóa {#crypto-economic-security}

Vận hành trình xác thực là một cam kết. Người xác thực được kỳ vọng sẽ duy trì đủ phần cứng và kết nối để tham gia xác thực khối và đề xuất. Đổi lại, người xác thực được trả bằng ETH (số dư đặt cọc của họ tăng lên). Mặt khác, việc tham gia với tư cách là người xác thực cũng mở ra những con đường mới cho người dùng tấn công mạng để trục lợi cá nhân hoặc phá hoại. Để ngăn chặn điều này, người xác thực sẽ mất phần thưởng ETH nếu họ không tham gia khi được yêu cầu và đặt cọc hiện tại của họ có thể bị hủy nếu họ hành xử không trung thực. Hai hành vi chính có thể bị coi là không trung thực: đề xuất nhiều khối trong một slot duy nhất (lập lờ) và gửi các chứng thực mâu thuẫn.

Số lượng ETH bị cắt giảm phụ thuộc vào số lượng người xác thực cũng bị cắt giảm tại cùng thời điểm. Điều này được gọi là [\"hình phạt tương quan\"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), và nó có thể là nhỏ (~1% cổ phần cho một trình xác thực bị cắt giảm một mình) hoặc có thể dẫn đến việc 100% cổ phần của trình xác thực bị phá hủy (sự kiện cắt giảm hàng loạt). Nó được áp dụng vào giữa giai đoạn thoát bắt buộc bắt đầu bằng hình phạt ngay lập tức (tối đa 1 ETH) vào Ngày 1, hình phạt tương quan vào Ngày 18 và cuối cùng là bị loại khỏi mạng vào Ngày 36. Họ nhận được những hình phạt chứng thực nhỏ mỗi ngày vì họ có mặt trên mạng nhưng không gửi phiếu bầu. Tất cả điều này có nghĩa là một cuộc tấn công phối hợp sẽ rất tốn kém cho kẻ tấn công.

## Lựa chọn phân nhánh {#fork-choice}

Khi mạng hoạt động tối ưu và trung thực, sẽ chỉ có một khối mới ở đầu chuỗi và tất cả người xác thực đều chứng thực điều đó. Tuy nhiên, người xác thực có thể có quan điểm khác nhau về người đứng đầu chuỗi do độ trễ của mạng hoặc do người đề xuất khối đã không rõ ràng. Do đó, ứng dụng đồng thuận cần có một thuật toán để quyết định nên ưu tiên cái nào. Thuật toán được sử dụng trong bằng chứng cổ phần của Ethereum được gọi là [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), và nó hoạt động bằng cách xác định phân nhánh có trọng số chứng thực lớn nhất trong lịch sử của nó.

## Bằng chứng cổ phần và bảo mật {#pos-and-security}

Mối đe dọa về một [cuộc tấn công 51%](https://www.investopedia.com/terms/1/51-attack.asp) vẫn tồn tại trên bằng chứng cổ phần cũng như trên bằng chứng công việc, nhưng nó thậm chí còn rủi ro hơn cho những kẻ tấn công. Kẻ tấn công sẽ cần 51% số ETH đã đặt cọc. Sau đó, họ có thể sử dụng chứng thực riêng để đảm bảo rằng nĩa họ ưa thích là nĩa có nhiều chứng thực tích lũy nhất. 'Trọng số' của các chứng thực tích lũy là những gì ứng dụng đồng thuận sử dụng để xác định chuỗi chính xác, do đó kẻ tấn công này sẽ có thể biến nĩa của họ thành nĩa chuẩn. Tuy nhiên, điểm mạnh của bằng chứng cổ phần so với bằng chứng công việc là cộng đồng linh hoạt trong phản công. Ví dụ, những người xác thực trung thực có thể quyết định tiếp tục xây dựng trên chuỗi thiểu số và bỏ qua nĩa của kẻ tấn công trong khi khuyến khích các ứng dụng, sàn giao dịch và nhóm làm như vậy. Họ cũng có thể quyết định buộc kẻ tấn công phải rời khỏi mạng và phá hủy số ETH đã đặt cọc của họ. Đây là biện pháp phòng thủ kinh tế mạnh mẽ chống lại cuộc tấn công 51%.

Ngoài các cuộc tấn công 51%, kẻ xấu cũng có thể thực hiện các hoạt động độc hại khác, chẳng hạn như:

- các cuộc tấn công tầm xa (mặc dù tính kết luận cuối cùng vô hiệu hóa hướng tấn công này)
- 'tổ chức lại' tầm ngắn (mặc dù việc đề xuất ưu tiên và thời hạn chứng thực làm giảm bớt điều này)
- các cuộc tấn công bật nảy và cân bằng (cũng được giảm nhẹ bằng đề xuất ưu tiên và các cuộc tấn công này dù sao cũng chỉ được chứng minh trong điều kiện mạng lý tưởng)
- tấn công tuyết lở (bị vô hiệu hóa bởi quy tắc thuật toán lựa chọn nĩa chỉ xem xét thông điệp mới nhất)

Nhìn chung, bằng chứng cổ phần được triển khai trên Ethereum đã được chứng minh là bảo mật hơn về mặt kinh tế so với bằng chứng công việc.

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                                                                                                                                                   | Nhược điểm                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Đặt cọc giúp cá nhân dễ dàng tham gia vào bảo mật mạng, thúc đẩy tính phi tập trung. nút người xác thực có thể chạy trên máy tính xách tay thông thường. Nhóm đặt cọc cho phép người dùng đặt cọc mà không cần có 32 ETH. | Bằng chứng cổ phần còn mới và ít được thử nghiệm thực tế hơn so với bằng chứng công việc                |
| Đặt cược có tính phi tập trung cao hơn. Các hiệu quả kinh tế theo quy mô không áp dụng theo cách giống như đối với khai thác PoW.                                                                                                         | Bằng chứng cổ phần phức tạp hơn khi triển khai so với bằng chứng công việc                              |
| Bằng chứng cổ phần cung cấp tính bảo mật kinh tế tiền điện tử cao hơn bằng chứng công việc                                                                                                                                                                                | Người dùng cần chạy ba phần mềm để tham gia vào cơ chế bằng chứng cổ phần của Ethereum. |
| Cần phải phát hành ít ETH mới hơn để khuyến khích những người tham gia mạng                                                                                                                                                                                               |                                                                                                         |

### So sánh với bằng chứng công việc {#comparison-to-proof-of-work}

Ethereum ban đầu sử dụng bằng chứng công việc nhưng đã chuyển sang bằng chứng cổ phần vào tháng 9 năm 2022. PoS có một số ưu điểm so với PoW, chẳng hạn như:

- hiệu quả năng lượng tốt hơn – không cần sử dụng nhiều năng lượng cho các tính toán bằng chứng công việc
- rào cản gia nhập thấp hơn, yêu cầu phần cứng giảm – không cần phần cứng tinh nhuệ để có cơ hội tạo ra các khối mới
- giảm rủi ro tập trung hóa – bằng chứng cổ phần sẽ dẫn đến nhiều nút bảo mật mạng hơn
- vì nhu cầu năng lượng thấp nên cần ít phát hành ETH hơn để khuyến khích tham gia
- hình phạt kinh tế cho hành vi sai trái làm cho cuộc tấn công kiểu 51% tốn kém hơn cho kẻ tấn công so với bằng chứng công việc
- cộng đồng có thể dùng đến biện pháp phục hồi xã hội của một chuỗi trung thực nếu một cuộc tấn công 51% vượt qua được các biện pháp phòng thủ kinh tế tiền điện tử.

## Đọc thêm {#further-reading}

- [Câu hỏi thường gặp về Bằng chứng Cổ phần](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Bằng chứng Cổ phần là gì](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Bằng chứng Cổ phần là gì và Tại sao nó lại quan trọng](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Tại sao nên dùng Bằng chứng Cổ phần (Tháng 11 năm 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Bằng chứng Cổ phần: Làm thế nào tôi học được cách yêu tính chủ quan yếu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Tấn công và phòng thủ trên Ethereum bằng chứng cổ phần](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Triết lý Thiết kế Bằng chứng Cổ phần](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin giải thích về bằng chứng cổ phần cho Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Các chủ đề liên quan {#related-topics}

- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)
