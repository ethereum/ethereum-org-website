---
title: Bằng chứng cổ phần (PoS)
description: Giải thích về giao thức đồng thuận bằng chứng cổ phần và vai trò của nó trong Ethereum.
lang: vi
---

Bằng chứng cổ phần (PoS) là nền tảng cho [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/) của Ethereum. Ethereum đã chuyển sang cơ chế bằng chứng cổ phần vào năm 2022 vì nó an toàn hơn, tiêu thụ ít năng lượng hơn và tốt hơn cho việc triển khai các giải pháp mở rộng quy mô mới so với kiến trúc [bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow) trước đây.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [cơ chế đồng thuận](/developers/docs/consensus-mechanisms/).

## Bằng chứng cổ phần (PoS) là gì? {#what-is-pos}

Bằng chứng cổ phần là một cách để chứng minh rằng các trình xác thực đã đưa một thứ gì đó có giá trị vào mạng lưới, thứ có thể bị phá hủy nếu họ hành động không trung thực. Trong bằng chứng cổ phần của [Ethereum](/), các trình xác thực đặt cọc vốn một cách rõ ràng dưới dạng ETH vào một hợp đồng thông minh trên Ethereum. Trình xác thực sau đó chịu trách nhiệm kiểm tra xem các khối mới được truyền bá trên mạng lưới có hợp lệ hay không và thỉnh thoảng tự mình tạo và truyền bá các khối mới. Nếu họ cố gắng lừa đảo mạng lưới (ví dụ: bằng cách đề xuất nhiều khối khi họ chỉ nên gửi một khối hoặc gửi các chứng thực xung đột), một phần hoặc toàn bộ số ETH đã đặt cọc của họ có thể bị phá hủy.

## Trình xác thực {#validators}

Để tham gia với tư cách là một trình xác thực, người dùng phải gửi 32 ETH vào hợp đồng tiền gửi và chạy ba phần mềm riêng biệt: một máy khách thực thi, một ứng dụng khách đồng thuận và một ứng dụng khách trình xác thực. Khi gửi ETH của họ, người dùng tham gia vào một hàng đợi kích hoạt nhằm giới hạn tỷ lệ các trình xác thực mới tham gia vào mạng lưới. Sau khi được kích hoạt, các trình xác thực nhận các khối mới từ các thiết bị ngang hàng trên mạng lưới Ethereum. Các giao dịch được phân phối trong khối được thực thi lại để kiểm tra xem các thay đổi được đề xuất đối với trạng thái của Ethereum có hợp lệ hay không và chữ ký của khối được kiểm tra. Trình xác thực sau đó gửi một phiếu bầu (được gọi là chứng thực) ủng hộ khối đó trên toàn mạng lưới.

Trong khi ở bằng chứng công việc, thời gian của các khối được xác định bởi độ khó khai thác, thì trong bằng chứng cổ phần, nhịp độ này là cố định. Thời gian trong Ethereum bằng chứng cổ phần được chia thành các khe (12 giây) và các kỷ nguyên (32 khe). Một trình xác thực được chọn ngẫu nhiên để trở thành người đề xuất khối trong mỗi khe. Trình xác thực này chịu trách nhiệm tạo một khối mới và gửi nó đến các nút khác trên mạng lưới. Cũng trong mỗi khe, một ủy ban các trình xác thực được chọn ngẫu nhiên, phiếu bầu của họ được sử dụng để xác định tính hợp lệ của khối đang được đề xuất. Việc chia tập hợp trình xác thực thành các ủy ban là rất quan trọng để giữ cho tải trọng mạng lưới ở mức có thể quản lý được. Các ủy ban chia nhỏ tập hợp trình xác thực để mọi trình xác thực đang hoạt động đều chứng thực trong mỗi kỷ nguyên, nhưng không phải trong mọi khe.

## Cách một giao dịch được thực thi trong Ethereum PoS {#transaction-execution-ethereum-pos}

Phần sau đây cung cấp lời giải thích từ đầu đến cuối về cách một giao dịch được thực thi trong Ethereum bằng chứng cổ phần.

1. Một người dùng tạo và ký một [giao dịch](/developers/docs/transactions/) bằng khóa riêng tư của họ. Điều này thường được xử lý bởi một ví hoặc một thư viện như [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), v.v. nhưng về mặt kỹ thuật, người dùng đang thực hiện một yêu cầu đến một nút bằng cách sử dụng [JSON-RPC API](/developers/docs/apis/json-rpc/) của Ethereum. Người dùng xác định lượng Gas mà họ sẵn sàng trả như một khoản phí ưu tiên cho một trình xác thực để khuyến khích họ đưa giao dịch vào một khối. Các khoản [phí ưu tiên](/developers/docs/gas/#priority-fee) được trả cho trình xác thực trong khi [phí cơ sở](/developers/docs/gas/#base-fee) bị đốt cháy.
2. Giao dịch được gửi đến một [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-client) Ethereum để xác minh tính hợp lệ của nó. Điều này có nghĩa là đảm bảo rằng người gửi có đủ ETH để thực hiện giao dịch và họ đã ký nó bằng đúng khóa.
3. Nếu giao dịch hợp lệ, máy khách thực thi sẽ thêm nó vào mempool cục bộ của nó (danh sách các giao dịch đang chờ xử lý) và cũng phát sóng nó đến các nút khác qua mạng lưới tin đồn của lớp thực thi. Khi các nút khác nghe về giao dịch, họ cũng thêm nó vào mempool cục bộ của họ. Người dùng nâng cao có thể hạn chế phát sóng giao dịch của họ và thay vào đó chuyển tiếp nó đến các nhà xây dựng khối chuyên dụng như [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Điều này cho phép họ tổ chức các giao dịch trong các khối sắp tới để đạt lợi nhuận tối đa ([MEV](/developers/docs/mev/#mev-extraction)).
4. Một trong các nút trình xác thực trên mạng lưới là người đề xuất khối cho khe hiện tại, trước đó đã được chọn giả ngẫu nhiên bằng cách sử dụng RANDAO. Nút này chịu trách nhiệm xây dựng và phát sóng khối tiếp theo sẽ được thêm vào Chuỗi khối Ethereum và cập nhật trạng thái toàn cầu. Nút được tạo thành từ ba phần: một máy khách thực thi, một ứng dụng khách đồng thuận và một ứng dụng khách trình xác thực. Máy khách thực thi đóng gói các giao dịch từ mempool cục bộ thành một "tải trọng thực thi" và thực thi chúng cục bộ để tạo ra một sự thay đổi trạng thái. Thông tin này được chuyển đến ứng dụng khách đồng thuận, nơi tải trọng thực thi được bọc như một phần của "khối beacon", khối này cũng chứa thông tin về phần thưởng, hình phạt, các khoản phạt cắt giảm, chứng thực, v.v. cho phép mạng lưới đồng ý về chuỗi các khối ở đầu Chuỗi. Giao tiếp giữa máy khách thực thi và ứng dụng khách đồng thuận được mô tả chi tiết hơn trong [Kết nối Máy khách Thực thi và Ứng dụng khách Đồng thuận](/developers/docs/networking-layer/#connecting-clients).
5. Các nút khác nhận khối beacon mới trên mạng lưới tin đồn của lớp đồng thuận. Họ chuyển nó cho máy khách thực thi của họ, nơi các giao dịch được thực thi lại cục bộ để đảm bảo sự thay đổi trạng thái được đề xuất là hợp lệ. Ứng dụng khách trình xác thực sau đó chứng thực rằng khối đó hợp lệ và là khối tiếp theo hợp lý theo góc nhìn của họ về Chuỗi (có nghĩa là nó được xây dựng trên Chuỗi có trọng số chứng thực lớn nhất như được định nghĩa trong [các quy tắc lựa chọn phân nhánh](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Khối được thêm vào cơ sở dữ liệu cục bộ trong mỗi nút chứng thực cho nó.
6. Giao dịch có thể được coi là "đã chung cuộc" nếu nó đã trở thành một phần của Chuỗi có "liên kết đa số tuyệt đối" giữa hai điểm kiểm tra. Các điểm kiểm tra xảy ra vào đầu mỗi kỷ nguyên và chúng tồn tại để giải thích cho thực tế là chỉ một tập hợp con các trình xác thực đang hoạt động chứng thực trong mỗi khe, nhưng tất cả các trình xác thực đang hoạt động đều chứng thực trong suốt mỗi kỷ nguyên. Do đó, chỉ giữa các kỷ nguyên mới có thể chứng minh được 'liên kết đa số tuyệt đối' (đây là nơi 66% tổng số ETH đã đặt cọc trên mạng lưới đồng ý về hai điểm kiểm tra).

Thông tin chi tiết hơn về tính chung cuộc có thể được tìm thấy bên dưới.

## Tính chung cuộc {#finality}

Một giao dịch có "tính chung cuộc" trong các mạng lưới phân tán khi nó là một phần của một khối không thể thay đổi nếu không có một lượng lớn ETH bị đốt cháy. Trên Ethereum bằng chứng cổ phần, điều này được quản lý bằng cách sử dụng các khối "điểm kiểm tra". Khối đầu tiên trong mỗi kỷ nguyên là một điểm kiểm tra. Các trình xác thực bỏ phiếu cho các cặp điểm kiểm tra mà nó coi là hợp lệ. Nếu một cặp điểm kiểm tra thu hút được số phiếu bầu đại diện cho ít nhất hai phần ba tổng số ETH đã đặt cọc, các điểm kiểm tra sẽ được nâng cấp. Điểm kiểm tra gần đây hơn trong hai điểm (mục tiêu) trở thành "đã được chứng minh hợp lệ". Điểm kiểm tra sớm hơn trong hai điểm đã được chứng minh hợp lệ vì nó là "mục tiêu" trong kỷ nguyên trước đó. Bây giờ nó được nâng cấp thành "đã chung cuộc". Quá trình nâng cấp các điểm kiểm tra này được xử lý bởi **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG là một công cụ tính chung cuộc của khối dành cho sự đồng thuận. Khi một khối đã chung cuộc, nó không thể bị hoàn nguyên hoặc thay đổi nếu không có một khoản phạt cắt giảm đa số đối với những người đặt cọc, khiến điều đó trở nên bất khả thi về mặt kinh tế.

Để hoàn nguyên một khối đã chung cuộc, một kẻ tấn công sẽ phải cam kết mất ít nhất một phần ba tổng nguồn cung ETH đã đặt cọc. Lý do chính xác cho điều này được giải thích trong [bài đăng trên blog của Tổ chức Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality) này. Vì tính chung cuộc yêu cầu đa số hai phần ba, một kẻ tấn công có thể ngăn mạng lưới đạt được tính chung cuộc bằng cách bỏ phiếu với một phần ba tổng số tiền đặt cọc. Có một cơ chế để phòng thủ chống lại điều này: [rò rỉ do không hoạt động](https://eth2book.info/bellatrix/part2/incentives/inactivity). Cơ chế này kích hoạt bất cứ khi nào Chuỗi không thể đạt được tính chung cuộc trong hơn bốn kỷ nguyên. Rò rỉ do không hoạt động làm tiêu hao dần ETH đã đặt cọc từ các trình xác thực bỏ phiếu chống lại đa số, cho phép đa số giành lại đa số hai phần ba và đạt được tính chung cuộc cho Chuỗi.

## Bảo mật kinh tế mã hóa {#crypto-economic-security}

Chạy một trình xác thực là một cam kết. Trình xác thực được kỳ vọng sẽ duy trì đủ phần cứng và kết nối để tham gia vào việc xác thực khối và đề xuất. Đổi lại, trình xác thực được trả bằng ETH (số dư đã đặt cọc của họ tăng lên). Mặt khác, việc tham gia với tư cách là một trình xác thực cũng mở ra những con đường mới cho người dùng tấn công mạng lưới vì lợi ích cá nhân hoặc phá hoại. Để ngăn chặn điều này, các trình xác thực sẽ bỏ lỡ phần thưởng ETH nếu họ không tham gia khi được yêu cầu và khoản đặt cọc hiện tại của họ có thể bị phá hủy nếu họ hành xử không trung thực. Hai hành vi chính có thể được coi là không trung thực: đề xuất nhiều khối trong một khe duy nhất (nói nước đôi) và gửi các chứng thực mâu thuẫn.

Số lượng ETH bị phạt cắt giảm phụ thuộc vào việc có bao nhiêu trình xác thực cũng đang bị phạt cắt giảm vào khoảng cùng thời điểm. Điều này được gọi là ["hình phạt tương quan"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), và nó có thể là nhỏ (~1% khoản đặt cọc đối với một trình xác thực duy nhất bị phạt cắt giảm) hoặc có thể dẫn đến 100% khoản đặt cọc của trình xác thực bị phá hủy (sự kiện phạt cắt giảm hàng loạt). Nó được áp dụng vào giữa khoảng thời gian buộc phải thoát, bắt đầu bằng một hình phạt ngay lập tức (lên đến 1 ETH) vào Ngày 1, hình phạt tương quan vào Ngày 18 và cuối cùng là bị loại khỏi mạng lưới vào Ngày 36. Họ nhận các hình phạt chứng thực nhỏ mỗi ngày vì họ có mặt trên mạng lưới nhưng không gửi phiếu bầu. Tất cả những điều này có nghĩa là một cuộc tấn công phối hợp sẽ rất tốn kém đối với kẻ tấn công.

## Lựa chọn phân nhánh {#fork-choice}

Khi mạng lưới hoạt động tối ưu và trung thực, chỉ có duy nhất một khối mới ở đầu Chuỗi và tất cả các trình xác thực đều chứng thực cho nó. Tuy nhiên, các trình xác thực có thể có những góc nhìn khác nhau về đầu Chuỗi do độ trễ của mạng lưới hoặc do một người đề xuất khối đã nói nước đôi. Do đó, các ứng dụng khách đồng thuận yêu cầu một thuật toán để quyết định nên ưu tiên cái nào. Thuật toán được sử dụng trong Ethereum bằng chứng cổ phần được gọi là [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), và nó hoạt động bằng cách xác định Phân nhánh có trọng số chứng thực lớn nhất trong lịch sử của nó.

## Bằng chứng cổ phần và bảo mật {#pos-and-security}

Mối đe dọa của một [cuộc tấn công 51%](https://www.investopedia.com/terms/1/51-attack.asp) vẫn tồn tại trên bằng chứng cổ phần giống như trên bằng chứng công việc, nhưng nó thậm chí còn rủi ro hơn đối với những kẻ tấn công. Một kẻ tấn công sẽ cần 51% số ETH đã đặt cọc. Sau đó, họ có thể sử dụng các chứng thực của riêng mình để đảm bảo Phân nhánh ưa thích của họ là Phân nhánh có nhiều chứng thực tích lũy nhất. 'Trọng số' của các chứng thực tích lũy là những gì các ứng dụng khách đồng thuận sử dụng để xác định Chuỗi chính xác, vì vậy kẻ tấn công này sẽ có thể biến Phân nhánh của họ thành Phân nhánh chính tắc. Tuy nhiên, một điểm mạnh của bằng chứng cổ phần so với bằng chứng công việc là cộng đồng có sự linh hoạt trong việc tổ chức một cuộc phản công. Ví dụ: các trình xác thực trung thực có thể quyết định tiếp tục xây dựng trên Chuỗi thiểu số và bỏ qua Phân nhánh của kẻ tấn công trong khi khuyến khích các ứng dụng, sàn giao dịch và các nhóm khai thác làm điều tương tự. Họ cũng có thể quyết định buộc loại bỏ kẻ tấn công khỏi mạng lưới và phá hủy số ETH đã đặt cọc của họ. Đây là những biện pháp phòng thủ kinh tế mạnh mẽ chống lại một cuộc tấn công 51%.

Ngoài các cuộc tấn công 51%, những kẻ xấu cũng có thể cố gắng thực hiện các loại hoạt động độc hại khác, chẳng hạn như:

- các cuộc tấn công tầm xa (mặc dù công cụ tính chung cuộc vô hiệu hóa vectơ tấn công này)
- các cuộc 'tổ chức lại' tầm ngắn (mặc dù việc tăng cường người đề xuất và thời hạn chứng thực làm giảm thiểu điều này)
- các cuộc tấn công nảy và cân bằng (cũng được giảm thiểu bằng cách tăng cường người đề xuất, và dù sao thì những cuộc tấn công này cũng chỉ được chứng minh trong các điều kiện mạng lưới lý tưởng)
- các cuộc tấn công tuyết lở (bị vô hiệu hóa bởi quy tắc của thuật toán lựa chọn phân nhánh là chỉ xem xét thông điệp mới nhất)

Nhìn chung, bằng chứng cổ phần, như được triển khai trên Ethereum, đã được chứng minh là an toàn hơn về mặt kinh tế so với bằng chứng công việc.

## Ưu và nhược điểm {#pros-and-cons}

| Ưu điểm                                                                                                                                                                                                             | Nhược điểm                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Việc đặt cọc giúp các cá nhân dễ dàng tham gia vào việc bảo mật mạng lưới hơn, thúc đẩy sự phi tập trung. Nút trình xác thực có thể được chạy trên một máy tính xách tay bình thường. Các nhóm đặt cọc cho phép người dùng đặt cọc mà không cần có 32 ETH. | Bằng chứng cổ phần mới hơn và ít được thử nghiệm thực tế hơn so với bằng chứng công việc              |
| Việc đặt cọc mang tính phi tập trung hơn. Tính kinh tế theo quy mô không áp dụng theo cách giống như đối với việc khai thác PoW.                                                                                                         | Bằng chứng cổ phần phức tạp hơn để triển khai so với bằng chứng công việc                          |
| Bằng chứng cổ phần cung cấp khả năng bảo mật kinh tế mã hóa cao hơn so với bằng chứng công việc                                                                                                                                           | Người dùng cần chạy ba phần mềm để tham gia vào bằng chứng cổ phần của Ethereum. |
| Yêu cầu phát hành ít ETH mới hơn để khuyến khích những người tham gia mạng lưới                                                                                                                                            |                                                                                         |

### So sánh với bằng chứng công việc {#comparison-to-proof-of-work}

Ethereum ban đầu sử dụng bằng chứng công việc nhưng đã chuyển sang bằng chứng cổ phần vào tháng 9 năm 2022. PoS mang lại một số lợi thế so với PoW, chẳng hạn như:

- hiệu quả năng lượng tốt hơn – không cần sử dụng nhiều năng lượng cho các tính toán bằng chứng công việc
- rào cản gia nhập thấp hơn, giảm yêu cầu về phần cứng – không cần phần cứng cao cấp để có cơ hội tạo ra các khối mới
- giảm rủi ro tập trung hóa – bằng chứng cổ phần sẽ dẫn đến việc có nhiều nút hơn bảo mật mạng lưới
- do yêu cầu năng lượng thấp, việc phát hành ETH ít hơn được yêu cầu để khuyến khích sự tham gia
- các hình phạt kinh tế đối với hành vi sai trái làm cho các cuộc tấn công kiểu 51% trở nên tốn kém hơn đối với kẻ tấn công so với bằng chứng công việc
- cộng đồng có thể sử dụng khôi phục xã hội của một Chuỗi trung thực nếu một cuộc tấn công 51% vượt qua được các biện pháp phòng thủ kinh tế mã hóa.

## Đọc thêm {#further-reading}

- [Câu hỏi thường gặp về Bằng chứng cổ phần](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Bằng chứng cổ phần là gì](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Bằng chứng cổ phần là gì và tại sao nó lại quan trọng](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Tại sao lại là Bằng chứng cổ phần (Tháng 11 năm 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Bằng chứng cổ phần: Cách tôi học cách yêu thích tính chủ quan yếu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Tấn công và phòng thủ Ethereum bằng chứng cổ phần](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Triết lý thiết kế Bằng chứng cổ phần](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin giải thích bằng chứng cổ phần cho Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Chủ đề liên quan {#related-topics}

- [Bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/)
- [Bằng chứng ủy quyền](/developers/docs/consensus-mechanisms/poa/)