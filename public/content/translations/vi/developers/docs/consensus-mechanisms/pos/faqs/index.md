---
title: Các câu hỏi thường gặp
description: Các câu hỏi thường gặp về Bằng chứng cổ phần (PoS) của Ethereum.
lang: vi
---

## Bằng chứng cổ phần (PoS) là gì {#what-is-proof-of-stake}

Bằng chứng cổ phần (PoS) là một lớp thuật toán có thể cung cấp bảo mật cho các Chuỗi khối bằng cách đảm bảo rằng những kẻ tấn công hành động thiếu trung thực sẽ bị mất các tài sản có giá trị. Các hệ thống Bằng chứng cổ phần (PoS) yêu cầu một tập hợp các trình xác thực phải cung cấp sẵn một số tài sản có thể bị tiêu hủy nếu trình xác thực đó tham gia vào một số hành vi được chứng minh là thiếu trung thực. Ethereum sử dụng cơ chế Bằng chứng cổ phần (PoS) để bảo mật Chuỗi khối.

## Bằng chứng cổ phần (PoS) so với Bằng chứng công việc (PoW) như thế nào? {#comparison-to-proof-of-work}

Cả Bằng chứng công việc (PoW) và Bằng chứng cổ phần (PoS) đều là các cơ chế làm giảm động lực kinh tế của các tác nhân độc hại trong việc gửi thư rác hoặc lừa đảo mạng lưới. Trong cả hai trường hợp, các nút tích cực tham gia vào quá trình đồng thuận sẽ đưa một số tài sản "vào mạng lưới" mà họ sẽ mất nếu có hành vi sai trái.

Trong Bằng chứng công việc (PoW), tài sản này là năng lượng. Nút, được gọi là thợ đào, chạy một thuật toán nhằm tính toán một giá trị nhanh hơn bất kỳ nút nào khác. Nút nhanh nhất có quyền đề xuất một khối lên Chuỗi. Để thay đổi lịch sử của Chuỗi hoặc thống trị việc đề xuất khối, một thợ đào sẽ phải có sức mạnh tính toán lớn đến mức họ luôn giành chiến thắng trong cuộc đua. Điều này cực kỳ tốn kém và khó thực hiện, giúp bảo vệ Chuỗi khỏi các cuộc tấn công. Năng lượng cần thiết để "khai thác" bằng Bằng chứng công việc (PoW) là một tài sản trong thế giới thực mà các thợ đào phải trả tiền.

Bằng chứng cổ phần (PoS) yêu cầu các nút, được gọi là trình xác thực, phải gửi rõ ràng một tài sản tiền mã hóa vào một hợp đồng thông minh. Nếu một trình xác thực có hành vi sai trái, số tiền mã hóa này có thể bị tiêu hủy vì họ đang "đặt cọc" tài sản của mình trực tiếp vào Chuỗi thay vì gián tiếp thông qua việc tiêu thụ năng lượng.

Bằng chứng công việc (PoW) tiêu tốn nhiều năng lượng hơn vì điện năng bị đốt cháy trong quá trình khai thác. Mặt khác, Bằng chứng cổ phần (PoS) chỉ yêu cầu một lượng năng lượng rất nhỏ - các trình xác thực Ethereum thậm chí có thể chạy trên một thiết bị tiêu thụ ít điện năng như Raspberry Pi. Cơ chế Bằng chứng cổ phần (PoS) của Ethereum được cho là an toàn hơn Bằng chứng công việc (PoW) vì chi phí để tấn công lớn hơn và hậu quả đối với kẻ tấn công cũng nghiêm trọng hơn.

Bằng chứng công việc (PoW) so với Bằng chứng cổ phần (PoS) là một chủ đề gây tranh cãi. [Blog của Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) và cuộc tranh luận giữa Justin Drake và Lyn Alden đưa ra một bản tóm tắt tốt về các lập luận này.

<VideoWatch slug="pow-vs-pos" />

## Bằng chứng cổ phần (PoS) có tiết kiệm năng lượng không? {#is-pos-energy-efficient}

Có. Các nút trên mạng lưới Bằng chứng cổ phần (PoS) sử dụng một lượng năng lượng rất nhỏ. Một nghiên cứu của bên thứ ba đã kết luận rằng toàn bộ mạng lưới Ethereum Bằng chứng cổ phần (PoS) tiêu thụ khoảng 0,0026 TWh/năm - ít hơn khoảng 13.000 lần so với riêng việc chơi game ở Hoa Kỳ.

[Tìm hiểu thêm về mức tiêu thụ năng lượng của Ethereum](/energy-consumption/).

## Bằng chứng cổ phần (PoS) có an toàn không? {#is-pos-secure}

Bằng chứng cổ phần (PoS) của Ethereum rất an toàn. Cơ chế này đã được nghiên cứu, phát triển và thử nghiệm nghiêm ngặt trong hơn tám năm trước khi đi vào hoạt động. Các đảm bảo bảo mật khác với các Chuỗi khối Bằng chứng công việc (PoW). Trong Bằng chứng cổ phần (PoS), các trình xác thực độc hại có thể bị trừng phạt tích cực ("phạt cắt giảm") và bị loại khỏi tập hợp trình xác thực, làm tiêu tốn một lượng lớn ETH. Theo Bằng chứng công việc (PoW), một kẻ tấn công có thể tiếp tục lặp lại cuộc tấn công của chúng trong khi chúng có đủ sức mạnh Mã băm. Việc thực hiện các cuộc tấn công tương đương trên Ethereum Bằng chứng cổ phần (PoS) cũng tốn kém hơn so với Bằng chứng công việc (PoW). Để ảnh hưởng đến tính khả dụng của Chuỗi, cần ít nhất 33% tổng số ether đã đặt cọc trên mạng lưới (ngoại trừ các trường hợp tấn công rất tinh vi với khả năng thành công cực kỳ thấp). Để kiểm soát nội dung của các khối trong tương lai, cần ít nhất 51% tổng số ETH đã đặt cọc và để viết lại lịch sử, cần hơn 66% tổng số khoản đặt cọc. Giao thức Ethereum sẽ tiêu hủy các tài sản này trong các kịch bản cuộc tấn công 51% hoặc 33% và bằng sự đồng thuận xã hội trong kịch bản tấn công 66%.

- [Tìm hiểu thêm về việc bảo vệ Bằng chứng cổ phần (PoS) của Ethereum khỏi những kẻ tấn công](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Tìm hiểu thêm về thiết kế Bằng chứng cổ phần (PoS)](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Bằng chứng cổ phần (PoS) có làm cho Ethereum rẻ hơn không? {#does-pos-make-ethereum-cheaper}

Không. Chi phí để gửi một giao dịch (phí gas) được xác định bởi một thị trường phí động, tăng lên khi nhu cầu mạng lưới nhiều hơn. Cơ chế đồng thuận không ảnh hưởng trực tiếp đến điều này.

[Tìm hiểu thêm về Gas](/developers/docs/gas).

## Nút, ứng dụng khách và trình xác thực là gì? {#what-are-nodes-clients-and-validators}

Nút là các máy tính được kết nối với mạng lưới Ethereum. Ứng dụng khách là phần mềm chúng chạy để biến máy tính thành một nút. Có hai loại ứng dụng khách: ứng dụng khách thực thi và ứng dụng khách đồng thuận. Cả hai đều cần thiết để tạo một nút. Trình xác thực là một tiện ích bổ sung tùy chọn cho ứng dụng khách đồng thuận cho phép nút tham gia vào đồng thuận Bằng chứng cổ phần (PoS). Điều này có nghĩa là tạo và đề xuất các khối khi được chọn và chứng thực các khối mà chúng nghe được trên mạng lưới. Để chạy một trình xác thực, người vận hành nút phải gửi 32 ETH vào hợp đồng tiền gửi.

- [Tìm hiểu thêm về nút và ứng dụng khách](/developers/docs/nodes-and-clients)
- [Tìm hiểu thêm về việc đặt cọc](/staking)

## Bằng chứng cổ phần (PoS) có phải là một ý tưởng mới không? {#is-pos-new}

Không. Một người dùng trên BitcoinTalk đã [đề xuất ý tưởng cơ bản về Bằng chứng cổ phần (PoS)](https://bitcointalk.org/index.php?topic=27787.0) như một bản nâng cấp cho Bitcoin vào năm 2011. Phải mất mười một năm trước khi nó sẵn sàng để triển khai trên Mạng chính Ethereum. Một số Chuỗi khác đã triển khai Bằng chứng cổ phần (PoS) sớm hơn Ethereum, nhưng không phải là cơ chế cụ thể của Ethereum (được gọi là Gasper).

## Điều gì đặc biệt về Bằng chứng cổ phần (PoS) của Ethereum? {#why-is-ethereum-pos-special}

Cơ chế Bằng chứng cổ phần (PoS) của Ethereum có thiết kế độc đáo. Nó không phải là cơ chế Bằng chứng cổ phần (PoS) đầu tiên được thiết kế và triển khai, nhưng nó là cơ chế mạnh mẽ nhất. Cơ chế Bằng chứng cổ phần (PoS) được gọi là "Casper". Casper xác định cách các trình xác thực được chọn để đề xuất khối, cách thức và thời điểm các chứng thực được thực hiện, cách các chứng thực được tính, phần thưởng và hình phạt dành cho các trình xác thực, các điều kiện phạt cắt giảm, các cơ chế an toàn dự phòng như rò rỉ do không hoạt động và các điều kiện cho "tính chung cuộc". Tính chung cuộc là điều kiện mà để một khối được coi là một phần vĩnh viễn của Chuỗi chính tắc, nó phải được bình chọn bởi ít nhất 66% tổng số ETH đã đặt cọc trên mạng lưới. Các nhà nghiên cứu đã phát triển Casper dành riêng cho Ethereum và Ethereum là Chuỗi khối đầu tiên và duy nhất triển khai nó.

Ngoài Casper, Bằng chứng cổ phần (PoS) của Ethereum sử dụng một thuật toán chọn nhánh có tên là LMD-GHOST. Điều này là cần thiết trong trường hợp phát sinh điều kiện có hai khối tồn tại cho cùng một khe. Điều này tạo ra hai Phân nhánh của Chuỗi khối. LMD-GHOST chọn Phân nhánh có "trọng số" chứng thực lớn nhất. Trọng số là số lượng chứng thực được tính theo số dư hiệu dụng của các trình xác thực. LMD-GHOST là duy nhất đối với Ethereum.

Sự kết hợp giữa Casper và LMD-GHOST được gọi là Gasper.

[Tìm hiểu thêm về Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Phạt cắt giảm là gì? {#what-is-slashing}

Phạt cắt giảm là thuật ngữ dùng để chỉ việc tiêu hủy một phần khoản đặt cọc của trình xác thực và loại bỏ trình xác thực đó khỏi mạng lưới. Lượng ETH bị mất trong một lần phạt cắt giảm tỷ lệ thuận với số lượng trình xác thực bị phạt cắt giảm - điều này có nghĩa là các trình xác thực thông đồng sẽ bị trừng phạt nghiêm khắc hơn so với các cá nhân.

[Tìm hiểu thêm về phạt cắt giảm](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Tại sao các trình xác thực cần 32 ETH? {#why-32-eth}

Các trình xác thực phải đặt cọc ETH để họ có thứ gì đó để mất nếu họ có hành vi sai trái. Lý do tại sao họ phải đặt cọc cụ thể 32 ETH là để cho phép các nút chạy trên phần cứng khiêm tốn. Nếu mức ETH tối thiểu cho mỗi trình xác thực thấp hơn, thì số lượng trình xác thực và do đó số lượng tin nhắn phải được xử lý trong mỗi khe sẽ tăng lên, nghĩa là sẽ cần phần cứng mạnh hơn để chạy một nút.

## Các trình xác thực được chọn như thế nào? {#how-are-validators-selected}

Một trình xác thực duy nhất được chọn một cách giả ngẫu nhiên để đề xuất một khối trong mỗi khe bằng cách sử dụng một thuật toán có tên là RANDAO, thuật toán này trộn một Mã băm từ người đề xuất khối với một hạt giống được cập nhật ở mỗi khối. Giá trị này được sử dụng để chọn một trình xác thực cụ thể từ tổng số tập hợp trình xác thực. Việc lựa chọn trình xác thực được cố định trước hai kỷ nguyên.

[Tìm hiểu thêm về việc lựa chọn trình xác thực](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Thao túng cổ phần là gì? {#what-is-stake-grinding}

Thao túng cổ phần là một loại hình tấn công trên các mạng lưới Bằng chứng cổ phần (PoS), trong đó kẻ tấn công cố gắng làm sai lệch thuật toán chọn trình xác thực theo hướng có lợi cho các trình xác thực của chính họ. Các cuộc tấn công thao túng cổ phần vào RANDAO yêu cầu khoảng một nửa tổng số ETH đã đặt cọc.

[Tìm hiểu thêm về thao túng cổ phần](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Cắt giảm xã hội là gì? {#what-is-social-slashing}

Cắt giảm xã hội là khả năng của cộng đồng trong việc điều phối một Phân nhánh của Chuỗi khối để đối phó với một cuộc tấn công. Nó cho phép cộng đồng phục hồi sau khi một kẻ tấn công làm cho một Chuỗi thiếu trung thực đã chung cuộc. Cắt giảm xã hội cũng có thể được sử dụng để chống lại các cuộc tấn công kiểm duyệt.

- [Tìm hiểu thêm về cắt giảm xã hội](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin nói về cắt giảm xã hội](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Tôi có bị phạt cắt giảm không? {#will-i-get-slashed}

Là một trình xác thực, rất khó để bị phạt cắt giảm trừ khi bạn cố tình tham gia vào các hành vi độc hại. Phạt cắt giảm chỉ được thực hiện trong các kịch bản rất cụ thể khi các trình xác thực đề xuất nhiều khối cho cùng một khe hoặc mâu thuẫn với chính họ bằng các chứng thực của họ - những điều này rất khó có thể phát sinh một cách vô tình.

[Tìm hiểu thêm về các điều kiện phạt cắt giảm](https://eth2book.info/altair/part2/incentives/slashing)

## Vấn đề không có gì để mất là gì? {#what-is-nothing-at-stake-problem}

Vấn đề không có gì để mất là một vấn đề mang tính khái niệm với một số cơ chế Bằng chứng cổ phần (PoS) trong đó chỉ có phần thưởng và không có hình phạt. Nếu không có gì để mất, một trình xác thực thực dụng sẽ sẵn sàng chứng thực cho bất kỳ, hoặc thậm chí nhiều Phân nhánh của Chuỗi khối, vì điều này làm tăng phần thưởng của họ. Ethereum giải quyết vấn đề này bằng cách sử dụng các điều kiện tính chung cuộc và phạt cắt giảm để đảm bảo một Chuỗi chính tắc.

[Tìm hiểu thêm về vấn đề không có gì để mất](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Thuật toán chọn nhánh là gì? {#what-is-a-fork-choice-algorithm}

Một thuật toán chọn nhánh thực hiện các quy tắc xác định Chuỗi nào là Chuỗi chính tắc. Trong các điều kiện tối ưu, không cần quy tắc chọn nhánh vì chỉ có một người đề xuất khối cho mỗi khe và một khối để lựa chọn. Tuy nhiên, đôi khi, nhiều khối cho cùng một khe hoặc thông tin đến muộn dẫn đến nhiều tùy chọn về cách tổ chức các khối gần đầu Chuỗi. Trong những trường hợp này, tất cả các ứng dụng khách phải thực hiện một số quy tắc giống hệt nhau để đảm bảo tất cả chúng đều chọn đúng chuỗi các khối. Thuật toán chọn nhánh mã hóa các quy tắc này.

Thuật toán chọn nhánh của Ethereum được gọi là LMD-GHOST. Nó chọn Phân nhánh có trọng số chứng thực lớn nhất, nghĩa là Phân nhánh mà hầu hết ETH đã đặt cọc đã bình chọn.

[Tìm hiểu thêm về LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Tính chung cuộc trong Bằng chứng cổ phần (PoS) là gì? {#what-is-finality}

Tính chung cuộc trong Bằng chứng cổ phần (PoS) là sự đảm bảo rằng một khối nhất định là một phần vĩnh viễn của Chuỗi chính tắc và không thể bị đảo ngược trừ khi có sự thất bại trong đồng thuận, trong đó kẻ tấn công đốt cháy 33% tổng số ether đã đặt cọc. Đây là tính chung cuộc "kinh tế tiền mã hóa", trái ngược với "tính chung cuộc xác suất" có liên quan đến các Chuỗi khối Bằng chứng công việc (PoW). Trong tính chung cuộc xác suất, không có trạng thái đã chung cuộc/chưa chung cuộc rõ ràng cho các khối - đơn giản là khả năng một khối có thể bị xóa khỏi Chuỗi ngày càng ít đi khi nó cũ hơn và người dùng tự xác định khi nào họ đủ tự tin rằng một khối là "an toàn". Với tính chung cuộc kinh tế tiền mã hóa, các cặp khối điểm kiểm tra phải được bình chọn bởi 66% ether đã đặt cọc. Nếu điều kiện này được thỏa mãn, các khối giữa các điểm kiểm tra đó được "đã chung cuộc" một cách rõ ràng.

[Tìm hiểu thêm về tính chung cuộc](/developers/docs/consensus-mechanisms/pos/#finality)

## "Tính chủ quan yếu" là gì? {#what-is-weak-subjectivity}

Tính chủ quan yếu là một tính năng của các mạng lưới Bằng chứng cổ phần (PoS), trong đó thông tin xã hội được sử dụng để xác nhận trạng thái hiện tại của Chuỗi khối. Các nút mới hoặc các nút tham gia lại mạng lưới sau một thời gian dài ngoại tuyến có thể được cung cấp một trạng thái gần đây để nút có thể thấy ngay lập tức liệu chúng có đang ở trên đúng Chuỗi hay không. Các trạng thái này được gọi là "điểm kiểm tra tính chủ quan yếu" và chúng có thể được lấy từ các nhà điều hành nút khác ngoài băng tần, hoặc từ các trình khám phá khối, hoặc từ một số điểm cuối công khai.

[Tìm hiểu thêm về tính chủ quan yếu](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Bằng chứng cổ phần (PoS) có kháng kiểm duyệt không? {#is-pos-censorship-resistant}

Khả năng kháng kiểm duyệt hiện tại rất khó để chứng minh. Tuy nhiên, không giống như Bằng chứng công việc (PoW), Bằng chứng cổ phần (PoS) cung cấp tùy chọn điều phối các khoản phạt cắt giảm để trừng phạt các trình xác thực kiểm duyệt. Có những thay đổi sắp tới đối với Giao thức nhằm tách biệt trình xây dựng khối khỏi người đề xuất khối và triển khai danh sách các giao dịch mà các trình xây dựng phải đưa vào mỗi khối. Đề xuất này được gọi là tách biệt người đề xuất và người xây dựng (PBS) và giúp ngăn chặn các trình xác thực kiểm duyệt các giao dịch.

[Tìm hiểu thêm về tách biệt người đề xuất và người xây dựng (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Hệ thống Bằng chứng cổ phần (PoS) của Ethereum có thể bị cuộc tấn công 51% không? {#pos-51-attack}

Có. Bằng chứng cổ phần (PoS) dễ bị tổn thương trước các cuộc tấn công 51%, giống như Bằng chứng công việc (PoW). Thay vì kẻ tấn công yêu cầu 51% sức mạnh Mã băm của mạng lưới, kẻ tấn công yêu cầu 51% tổng số ETH đã đặt cọc. Một kẻ tấn công tích lũy được 51% tổng số khoản đặt cọc sẽ có quyền kiểm soát thuật toán chọn nhánh. Điều này cho phép kẻ tấn công kiểm duyệt một số giao dịch nhất định, thực hiện các đợt tổ chức lại trong phạm vi ngắn và trích xuất MEV bằng cách sắp xếp lại các khối theo hướng có lợi cho chúng.

[Tìm hiểu thêm về các cuộc tấn công vào Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Điều phối xã hội là gì và tại sao nó lại cần thiết? {#what-is-social-coordination}

Điều phối xã hội là tuyến phòng thủ cuối cùng của Ethereum, cho phép một Chuỗi trung thực được phục hồi sau một cuộc tấn công đã làm cho các khối thiếu trung thực đã chung cuộc. Trong trường hợp này, cộng đồng Ethereum sẽ phải điều phối "ngoài băng tần" và đồng ý sử dụng một Phân nhánh thiểu số trung thực, đồng thời phạt cắt giảm các trình xác thực của kẻ tấn công trong quá trình này. Điều này cũng sẽ yêu cầu các ứng dụng và sàn giao dịch công nhận Phân nhánh trung thực.

[Đọc thêm về điều phối xã hội](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Người giàu có trở nên giàu hơn trong Bằng chứng cổ phần (PoS) không? {#do-rich-get-richer}

Một người càng có nhiều ETH để đặt cọc, họ càng có thể chạy nhiều trình xác thực và họ càng có thể tích lũy được nhiều phần thưởng. Phần thưởng tỷ lệ tuyến tính với lượng ETH đã đặt cọc và mọi người đều nhận được cùng một tỷ lệ phần trăm lợi nhuận. Bằng chứng công việc (PoW) làm cho người giàu trở nên giàu hơn so với Bằng chứng cổ phần (PoS) vì những thợ đào giàu có hơn mua phần cứng ở quy mô lớn sẽ được hưởng lợi từ tính kinh tế theo quy mô, nghĩa là mối quan hệ giữa sự giàu có và phần thưởng là phi tuyến tính.

## Bằng chứng cổ phần (PoS) có tập trung hơn Bằng chứng công việc (PoW) không? {#is-pos-decentralized}

Không, Bằng chứng công việc (PoW) có xu hướng tập trung hóa vì chi phí khai thác tăng lên và loại bỏ các cá nhân, sau đó loại bỏ các công ty nhỏ, v.v. Vấn đề hiện tại với Bằng chứng cổ phần (PoS) là ảnh hưởng của các công cụ phái sinh đặt cọc thanh khoản (LSD). Đây là các token đại diện cho ETH được đặt cọc bởi một số nhà cung cấp mà bất kỳ ai cũng có thể hoán đổi trên các thị trường thứ cấp mà không cần phải rút ETH thực tế. LSD cho phép người dùng đặt cọc với ít hơn 32 ETH, nhưng chúng cũng tạo ra rủi ro tập trung hóa, nơi một vài tổ chức lớn có thể kiểm soát phần lớn khoản đặt cọc. Đây là lý do tại sao [đặt cọc độc lập](/staking/solo) là lựa chọn tốt nhất cho Ethereum.

[Tìm hiểu thêm về sự tập trung hóa khoản đặt cọc trong LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tại sao tôi chỉ có thể đặt cọc ETH? {#why-can-i-only-stake-eth}

ETH là tiền tệ gốc của Ethereum. Việc có một loại tiền tệ duy nhất mà tất cả các khoản đặt cọc được định giá là điều cần thiết, cả cho việc hạch toán số dư hiệu dụng để tính trọng số bình chọn và bảo mật. Bản thân ETH là một thành phần cơ bản của Ethereum chứ không phải là một hợp đồng thông minh. Việc kết hợp các loại tiền tệ khác sẽ làm tăng đáng kể độ phức tạp và làm giảm tính bảo mật của việc đặt cọc.

## Ethereum có phải là Chuỗi khối Bằng chứng cổ phần (PoS) duy nhất không? {#is-ethereum-the-only-pos-blockchain}

Không, có một số Chuỗi khối Bằng chứng cổ phần (PoS). Không có Chuỗi khối nào giống hệt Ethereum; cơ chế Bằng chứng cổ phần (PoS) của Ethereum là duy nhất.

## The Merge là gì? {#what-is-the-merge}

The Merge là thời điểm Ethereum tắt cơ chế đồng thuận dựa trên Bằng chứng công việc (PoW) và bật cơ chế đồng thuận dựa trên Bằng chứng cổ phần (PoS). The Merge diễn ra vào ngày 15 tháng 9 năm 2022.

[Tìm hiểu thêm về The Merge](/roadmap/merge)

## Tính khả dụng và tính an toàn là gì? {#what-are-liveness-and-safety}

Tính khả dụng và tính an toàn là hai mối quan tâm bảo mật cơ bản đối với một Chuỗi khối. Tính khả dụng là sự sẵn có của một Chuỗi đang chung cuộc. Nếu Chuỗi ngừng chung cuộc hoặc người dùng không thể truy cập nó một cách dễ dàng, đó là những thất bại về tính khả dụng. Chi phí truy cập cực kỳ cao cũng có thể được coi là một thất bại về tính khả dụng. Tính an toàn đề cập đến mức độ khó khăn để tấn công Chuỗi - tức là làm cho các điểm kiểm tra xung đột đã chung cuộc.

[Đọc thêm trong tài liệu về Casper](https://arxiv.org/pdf/1710.09437.pdf)