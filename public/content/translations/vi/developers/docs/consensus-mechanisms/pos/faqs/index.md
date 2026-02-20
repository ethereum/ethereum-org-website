---
title: "Những câu hỏi thường gặp"
description: "Những câu hỏi thường gặp về bằng chứng cổ phần trên Ethereum."
lang: vi
---

## Bằng chứng cổ phần là gì {#what-is-proof-of-stake}

Proof-of-stake (bằng chứng cố phần) là một dạng thuật toán có thể cung cấp tính bảo mật cho blockchain bằng cách đảm bảo rằng tài sản có giá trị sẽ bị mất đi đối với những kẻ tấn công hành xử không trung thực. Các hệ thống bằng chứng cổ phần yêu cầu một tập hợp các trình xác thực phải ký gửi tài sản, và tài sản này có thể bị tịch thu nếu trình xác thực thực hiện hành vi gian lận có thể chứng minh được. Ethereum sử dụng cơ chế bằng chứng cổ phần này để bảo mật blockchain.

## Cơ chế bằng chứng cổ phần khác gì so với cơ chế bằng chứng công việc? {#comparison-to-proof-of-work}

Cả cơ chế bằng chứng công việc và cơ chế bằng chứng cổ phần đều là những cơ chế nhằm ngăn chặn về mặt kinh tế các tác nhân độc hại khỏi việc gây quá tải hoặc gian lận mạng lưới. Trong cả hai trường hợp, các nút tham gia tích cực vào cơ chế đồng thuận sẽ phải đặt một loại tài sản nào đó “vào trong mạng lưới”, và họ sẽ mất nó nếu có hành vi sai trái.

Trong cơ chế bằng chứng công việc, tài sản này là năng lượng. Nút, được gọi là thợ đào, chạy một thuật toán nhằm tính toán giá trị nhanh hơn bất kỳ nút nào khác. Nút nhanh nhất sẽ có quyền đề xuất một khối lên chuỗi. Để thay đổi lịch sử của chuỗi hoặc chiếm quyền đề xuất khối, một thợ đào sẽ phải sở hữu sức mạnh tính toán khổng lồ đến mức họ luôn giành chiến thắng. Điều này vô cùng tốn kém và khó thực hiện, giúp bảo vệ chuỗi khỏi các cuộc tấn công. Năng lượng cần thiết để “đào” bằng cơ chế bằng chứng công việc là một loại tài sản thực tế mà các thợ đào phải trả.

Cơ chế bằng chứng cổ phần yêu cầu các nút, được gọi là những người xác thực, phải nộp trực tiếp một tài sản tiền mã hóa vào một hợp đồng thông minh. Nếu một người xác thực hành xử sai trái, số tiền điện tử này có thể bị tiêu hủy vì họ đã “đặt cọc” tài sản trực tiếp vào chuỗi thay vì gián tiếp thông qua việc tiêu thụ năng lượng.

Cơ chế bằng chứng công việc tiêu tốn rất nhiều năng lượng vì điện năng bị thất thoát trong quá trình khai thác. Cơ chế bằng chứng cổ phần, ngược lại, chỉ yêu cầu một lượng năng lượng rất nhỏ – các trình xác thực Ethereum thậm chí có thể chạy trên những thiết bị công suất thấp như Raspberry Pi. Cơ chế bằng chứng cổ phần của Ethereum được cho là an toàn hơn so với bằng chứng công việc vì chi phí để tấn công cao hơn và hậu quả đối với kẻ tấn công cũng nghiêm trọng hơn.

So sánh giữa bằng chứng công việc và bằng chứng cổ phần là một chủ đề gây nhiều tranh cãi. [Blog của Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) và cuộc tranh luận giữa Justin Drake và Lyn Alden đã tóm tắt rõ ràng các luận điểm.

<YouTube id="1m12zgJ42dI" />

## Cơ chế bằng chứng cổ phần có tiết kiệm năng lượng không? {#is-pos-energy-efficient}

Đúng vậy. Các nút trong một mạng lưới bằng chứng cổ phần chỉ sử dụng một lượng năng lượng rất nhỏ. Một nghiên cứu của bên thứ ba kết luận rằng toàn bộ mạng Ethereum sử dụng cơ chế bằng chứng cổ phần chỉ tiêu thụ khoảng 0,0026 TWh mỗi năm – thấp hơn khoảng 13,000 lần so với việc chơi game tại Mỹ.

[Tìm hiểu thêm về mức tiêu thụ năng lượng của Ethereum](/energy-consumption/).

## Cơ chế bằng chứng cổ phần có an toàn không? {#is-pos-secure}

Cơ chế bằng chứng cổ phần của Ethereum rất an toàn. Cơ chế này đã được nghiên cứu, phát triển và kiểm thử nghiêm ngặt trong hơn tám năm trước khi chính thức đưa vào hoạt động. Các bảo đảm về mặt an ninh khác với những blockchain sử dụng cơ chế bằng chứng công việc. Trong cơ chế bằng chứng cổ phần, các trình xác thực độc hại có thể bị trừng phạt trực tiếp (bị “cắt giảm”) và bị loại khỏi tập hợp xác thực, đồng thời mất đi một lượng lớn ETH. Trong cơ chế bằng chứng công việc, một kẻ tấn công có thể liên tục lặp lại cuộc tấn công miễn là họ có đủ sức mạnh băm. Việc thực hiện các cuộc tấn công tương tự trên Ethereum sử dụng cơ chế bằng chứng cổ phần tốn kém hơn nhiều so với bằng chứng công việc. Để ảnh hưởng đến tính sống còn của chuỗi, cần ít nhất 33% tổng số ETH đã đặt cọc trong mạng lưới (ngoại trừ các trường hợp tấn công cực kỳ tinh vi với khả năng thành công cực thấp). Để kiểm soát nội dung của các khối trong tương lai, cần ít nhất 51% tổng số ETH đã đặt cọc, và để viết lại lịch sử, cần hơn 66% tổng số tài sản đặt cọc. Giao thức Ethereum sẽ tiêu hủy những tài sản này trong các kịch bản tấn công 33% hoặc 51%, và bằng sự đồng thuận xã hội trong kịch bản tấn công 66%.

- [Tìm hiểu thêm về cách bảo vệ bằng chứng cổ phần Ethereum khỏi những kẻ tấn công](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Tìm hiểu thêm về thiết kế bằng chứng cổ phần](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Cơ chế bằng chứng cổ phần có làm cho Ethereum rẻ hơn không? {#does-pos-make-ethereum-cheaper}

Không. Chi phí để gửi một giao dịch (phí gas) được quyết định bởi một thị trường phí biến động, tăng lên khi nhu cầu mạng cao hơn. Cơ chế đồng thuận không trực tiếp ảnh hưởng đến điều này.

[Tìm hiểu thêm về gas](/developers/docs/gas).

## Nút, khách hàng và trình xác thực là gì? {#what-are-nodes-clients-and-validators}

Nút là các máy tính được kết nối với mạng Ethereum. Khách hàng là phần mềm mà chúng chạy để biến máy tính thành một nút. Có hai loại khách hàng: khách hàng thực thi và khách hàng đồng thuận. Cả hai đều cần thiết để tạo ra một nút. Trình xác thực là một phần bổ sung tùy chọn cho khách hàng đồng thuận, cho phép nút tham gia vào cơ chế đồng thuận bằng chứng cổ phần. Điều này có nghĩa là tạo và đề xuất các khối khi được chọn, đồng thời chứng thực các khối mà họ nhận được trên mạng lưới. Để vận hành một trình xác thực, người vận hành nút phải gửi ký quỹ 32 ETH vào hợp đồng ký gửi.

- [Tìm hiểu thêm về các nút và máy khách](/developers/docs/nodes-and-clients)
- [Tìm hiểu thêm về đặt cọc](/staking)

## Bằng chứng cổ phần có phải ý tưởng mới không? {#is-pos-new}

Không. Một người dùng trên BitcoinTalk [đã đề xuất ý tưởng cơ bản về bằng chứng cổ phần](https://bitcointalk.org/index.php?topic=27787.0) như một bản nâng cấp cho Bitcoin vào năm 2011. Phải tới mười một năm sau mới sẵn sàng để tích hợp vào mạng chính Ethereum. Một số chuỗi khác đã triển khai bằng chứng cổ phần sớm hơn Ethereum, nhưng không phải cơ chế cụ thể của Ethereum (được gọi là Gasper).

## Bằng chứng cổ phần của Ethereum có gì đặc biệt? {#why-is-ethereum-pos-special}

Cơ chế bằng chứng cổ phần của Ethereum là độc nhất trong thiết kế của nó. Đây không phải là cơ chế bằng chứng cổ phần đầu tiên được thiết kế và triển khai, nhưng nó là cơ chế mạnh mẽ nhất. Cơ chế bằng chứng cổ phần được gọi là "Casper". Casper xác định cách người xác thực được chọn để đề xuất các khối, cách thức và thời điểm thực hiện các chứng thực, cách đếm các chứng thực, các phần thưởng và hình phạt dành cho người xác thực, các điều kiện xử phạt, các cơ chế an toàn như rò rỉ do không hoạt động, và các điều kiện cho "tính kết luận cuối cùng". Tính kết luận cuối cùng là điều kiện để một khối được coi là một phần vĩnh viễn của chuỗi chính tắc, nó phải được bỏ phiếu bởi ít nhất 66% tổng số ETH đã đặt cọc trên mạng. Các nhà nghiên cứu đã phát triển Casper dành riêng cho Ethereum, và Ethereum là chuỗi khối đầu tiên và duy nhất đã triển khai nó.

Ngoài Casper, bằng chứng cổ phần của Ethereum sử dụng một thuật toán lựa chọn phân nhánh được gọi là LMD-GHOST. Điều này là cần thiết trong trường hợp phát sinh tình huống có hai khối tồn tại trong cùng một slot. Điều này tạo ra hai phân nhánh của chuỗi khối. LMD-GHOST chọn phân nhánh có "trọng số" chứng thực lớn nhất. Trọng số là số lượng các chứng thực được tính theo số dư hiệu lực của những người xác thực. LMD-GHOST là độc nhất của Ethereum.

Sự kết hợp giữa Casper và LMD_GHOST được gọi là Gasper.

[Tìm hiểu thêm về Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Xử phạt là gì? {#what-is-slashing}

Xử phạt là thuật ngữ chỉ việc phá hủy một phần cổ phần của người xác thực và loại bỏ người xác thực đó khỏi mạng. Số ETH bị mất trong một lần xử phạt sẽ thay đổi theo số lượng người xác thực bị xử phạt - điều này có nghĩa là những người xác thực thông đồng sẽ bị trừng phạt nặng hơn so với các cá nhân.

[Tìm hiểu thêm về xử phạt](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Tại sao người xác thực cần 32 ETH? {#why-32-eth}

Người xác thực phải đặt cọc ETH để họ có thứ để mất nếu họ có hành vi sai trái. Lý do tại sao họ phải đặt cọc cụ thể 32 ETH là để cho phép các nút chạy trên phần cứng khiêm tốn. Nếu số ETH tối thiểu cho mỗi người xác thực thấp hơn, thì số lượng người xác thực và do đó số lượng thông điệp phải được xử lý trong mỗi slot sẽ tăng lên, có nghĩa là cần có phần cứng mạnh hơn để chạy một nút.

## Người xác thực được chọn như thế nào? {#how-are-validators-selected}

Một người xác thực duy nhất được chọn một cách ngẫu nhiên giả để đề xuất một khối trong mỗi slot bằng cách sử dụng một thuật toán gọi là RANDAO, thuật toán này trộn một hàm băm từ người đề xuất khối với một hạt giống được cập nhật mỗi khối. Giá trị này được sử dụng để chọn một người xác thực cụ thể từ tổng bộ người xác thực. Việc lựa chọn người xác thực được cố định trước hai epoch.

[Tìm hiểu thêm về việc lựa chọn người xác thực](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Stake grinding là gì? {#what-is-stake-grinding}

Stake grinding là một loại tấn công vào các mạng bằng chứng cổ phần, trong đó kẻ tấn công cố gắng làm sai lệch thuật toán lựa chọn người xác thực để ưu tiên cho những người xác thực của chính họ. Các cuộc tấn công stake grinding vào RANDAO yêu cầu khoảng một nửa tổng số ETH đã đặt cọc.

[Tìm hiểu thêm về stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Xử phạt xã hội là gì? {#what-is-social-slashing}

Xử phạt xã hội là khả năng cộng đồng phối hợp để tạo một phân nhánh của chuỗi khối nhằm đối phó với một cuộc tấn công. Nó cho phép cộng đồng phục hồi sau khi một kẻ tấn công hoàn tất một chuỗi không trung thực. Xử phạt xã hội cũng có thể được sử dụng để chống lại các cuộc tấn công kiểm duyệt.

- [Tìm hiểu thêm về xử phạt xã hội](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin nói về xử phạt xã hội](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Tôi có bị xử phạt không? {#will-i-get-slashed}

Là một người xác thực, rất khó để bị xử phạt trừ khi bạn cố tình tham gia vào hành vi độc hại. Xử phạt chỉ được thực hiện trong các tình huống rất cụ thể, khi người xác thực đề xuất nhiều khối cho cùng một slot hoặc tự mâu thuẫn với các chứng thực của họ - những điều này rất khó xảy ra một cách vô tình.

[Tìm hiểu thêm về các điều kiện xử phạt](https://eth2book.info/altair/part2/incentives/slashing)

## Vấn đề nothing-at-stake là gì? {#what-is-nothing-at-stake-problem}

Vấn đề nothing-at-stake là một vấn đề về mặt khái niệm với một số cơ chế bằng chứng cổ phần, nơi chỉ có phần thưởng mà không có hình phạt. Nếu không có gì để mất, một người xác thực thực dụng sẽ vui vẻ chứng thực cho bất kỳ, hoặc thậm chí nhiều, phân nhánh của chuỗi khối, vì điều này làm tăng phần thưởng của họ. Ethereum giải quyết vấn đề này bằng cách sử dụng các điều kiện về tính kết luận cuối cùng và xử phạt để đảm bảo một chuỗi chính tắc duy nhất.

[Tìm hiểu thêm về vấn đề nothing-at-stake](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Thuật toán lựa chọn nhánh là gì? {#what-is-a-fork-choice-algorithm}

Thuật toán lựa chọn nhánh thực hiện các quy tắc để xác định chuỗi nào là chuỗi chuẩn. Trong điều kiện tối ưu, không cần đến quy tắc lựa chọn nhánh vì mỗi khe thời gian chỉ có một người đề xuất khối và một khối để lựa chọn. Tuy nhiên, đôi khi có thể xuất hiện nhiều khối cho cùng một khe thời gian hoặc thông tin đến chậm, dẫn đến nhiều lựa chọn khác nhau về cách các khối gần đầu chuỗi được sắp xếp. Trong những trường hợp này, tất cả các khách hàng đều phải thực thi một số quy tắc giống nhau để đảm bảo rằng họ đều chọn đúng chuỗi khối. Thuật toán lựa chọn nhánh mã hóa những quy tắc này.

Thuật toán lựa chọn nhánh của Ethereum được gọi là LMD-GHOST. Nó chọn nhánh có trọng số xác thực lớn nhất, tức là nhánh mà phần ETH đặt cọc nhiều nhất đã bỏ phiếu.

[Tìm hiểu thêm về LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Tính cuối cùng trong cơ chế bằng chứng cổ phần là gì? {#what-is-finality}

Tính cuối cùng trong bằng chứng cổ phần là sự đảm bảo rằng một khối nhất định sẽ trở thành một phần vĩnh viễn của chuỗi chính và không thể bị đảo ngược trừ khi xảy ra lỗi đồng thuận, trong đó một kẻ tấn công phải đốt 33% tổng số ether đã đặt cọc. Đây là “tính cuối cùng kinh tế-mã hóa”, trái ngược với “tính cuối cùng xác suất” vốn liên quan đến các blockchain dùng bằng chứng công việc. Trong tính cuối cùng xác suất, không có trạng thái nào rõ ràng là đã hoàn tất hay chưa hoàn tất đối với các khối – nó chỉ đơn giản trở nên ít có khả năng hơn rằng một khối có thể bị loại bỏ khỏi chuỗi khi nó ngày càng cũ đi, và người dùng sẽ tự quyết định khi nào họ đủ tin tưởng rằng một khối là “an toàn”. Với tính cuối cùng kinh tế-mã hóa, các cặp khối điểm kiểm tra phải được ít nhất 66% lượng ether đặt cọc bỏ phiếu tán thành. Nếu điều kiện này được đáp ứng, các khối nằm giữa những điểm kiểm tra đó sẽ được xác nhận rõ ràng là “hoàn tất”.

[Tìm hiểu thêm về tính kết luận cuối cùng](/developers/docs/consensus-mechanisms/pos/#finality)

## Tính “chủ quan yếu” là gì? {#what-is-weak-subjectivity}

Chủ quan yếu là một đặc điểm của các mạng lưới bằng chứng cổ phần, trong đó thông tin xã hội được sử dụng để xác nhận trạng thái hiện tại của blockchain. Các nút mới hoặc các nút tham gia lại mạng sau một thời gian ngoại tuyến dài có thể được cung cấp một điểm kiểm tra gần đây để nút đó có thể ngay lập tức nhận biết liệu mình đang ở trên chuỗi đúng hay không. Những trạng thái này được gọi là “các điểm kiểm tra của chủ quan yếu” và có thể được lấy từ những người vận hành nút khác ngoài kênh chính, hoặc từ các trình khám phá khối, hoặc từ một số điểm truy cập công khai.

[Tìm hiểu thêm về tính chủ quan yếu](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Cơ chế bằng chứng cổ phần có chống kiểm duyệt không? {#is-pos-censorship-resistant}

Khả năng chống kiểm duyệt hiện tại vẫn khó chứng minh. Tuy nhiên, không giống như bằng chứng công việc, bằng chứng cổ phần cung cấp tùy chọn phối hợp cắt giảm để trừng phạt các trình xác thực có hành vi kiểm duyệt. Sắp tới sẽ có những thay đổi trong giao thức nhằm tách biệt những người xây dựng khối khỏi những người đề xuất khối và áp dụng danh sách các giao dịch mà người xây dựng phải đưa vào mỗi khối. Đề xuất này được gọi là “tách biệt người xây dựng và người đề xuất”, và nó giúp ngăn các trình xác thực kiểm duyệt giao dịch.

[Tìm hiểu thêm về việc tách biệt người đề xuất-người xây dựng](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Hệ thống bằng chứng cổ phần của Ethereum có thể bị tấn công 51% không? {#pos-51-attack}

Đúng vậy. Bằng chứng cổ phần dễ bị tấn công 51%, giống như bằng chứng công việc. Thay vì kẻ tấn công cần 51% sức mạnh băm của mạng, thì trong cơ chế này kẻ tấn công cần 51% tổng số ETH đã đặt cọc. Một kẻ tấn công tích lũy được 51% tổng số tài sản đặt cọc sẽ kiểm soát thuật toán lựa chọn nhánh. Điều này cho phép kẻ tấn công kiểm duyệt một số giao dịch, thực hiện sắp xếp lại ngắn hạn và trích xuất MEV bằng cách sắp xếp lại các khối theo hướng có lợi cho họ.

[Tìm hiểu thêm về các cuộc tấn công vào bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Sự phối hợp xã hội là gì, và tại sao nó cần thiết? {#what-is-social-coordination}

Sự phối hợp xã hội là tuyến phòng thủ cuối cùng của Ethereum, cho phép một chuỗi trung thực có thể phục hồi sau một cuộc tấn công mà trong đó các khối gian lận đã được hoàn tất. Trong trường hợp này, cộng đồng Ethereum sẽ phải phối hợp “ngoài kênh chính” và đồng ý sử dụng một nhánh thiểu số trung thực, đồng thời cắt giảm các trình xác thực của kẻ tấn công trong quá trình đó. Điều này cũng đòi hỏi các ứng dụng và sàn giao dịch phải công nhận nhánh trung thực.

[Đọc thêm về sự phối hợp xã hội](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Người giàu có giàu thêm trong cơ chế bằng chứng cổ phần không? {#do-rich-get-richer}

Càng có nhiều ETH để đặt cọc, một người càng có thể vận hành nhiều trình xác thực hơn và nhận được nhiều phần thưởng hơn. Phần thưởng tăng tuyến tính theo lượng ETH đã đặt cọc, và mọi người đều nhận được tỷ lệ lợi nhuận phần trăm như nhau. Cơ chế bằng chứng công việc làm người giàu trở nên giàu hơn nhiều so với cơ chế bằng chứng cổ phần, bởi vì những thợ đào giàu hơn có thể đầu tư vào phần cứng mạnh mẽ hơn.

## Cơ chế bằng chứng cổ phần có tập trung hóa hơn bằng chứng công việc không? {#is-pos-decentralized}

Không, bằng chứng công việc có xu hướng tập trung hóa vì chi phí khai thác tăng lên và loại bỏ dần các cá nhân, sau đó loại bỏ cả các công ty nhỏ, và cứ thế tiếp diễn. Vấn đề hiện tại của bằng chứng cổ phần là ảnh hưởng của các sản phẩm phái sinh đặt cọc thanh khoản (LSDs). Đây là các token đại diện cho ETH đã được đặt cọc bởi một nhà cung cấp nào đó, và mọi người có thể hoán đổi chúng trên các thị trường thứ cấp mà không cần rút ETH ra. LSDs cho phép người dùng đặt cọc với ít hơn 32 ETH, nhưng đồng thời cũng tạo ra rủi ro tập trung hóa nếu một vài tổ chức lớn có thể kiểm soát phần lớn lượng tài sản đặt cọc. Đây là lý do tại sao [đặt cọc một mình](/staking/solo) là lựa chọn tốt nhất cho Ethereum.

[Tìm hiểu thêm về việc tập trung hóa cổ phần trong LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Tại sao tôi chỉ có thể ký gửi ETH? {#why-can-i-only-stake-eth}

ETH là tiền tệ nội địa của Ethereum. Việc có một loại tiền tệ duy nhất mà trong đó tất cả các cổ phần được định giá là điều cần thiết, cho cả việc hạch toán số dư hiệu lực để tính trọng số phiếu bầu và cho mục đích bảo mật. Bản thân ETH là một thành phần cơ bản của Ethereum chứ không phải là một hợp đồng thông minh. Việc kết hợp các loại tiền tệ khác sẽ làm tăng đáng kể độ phức tạp và giảm tính bảo mật của việc đặt cọc.

## Ethereum có phải chuỗi khối duy nhất dùng bằng chứng cổ phần? {#is-ethereum-the-only-pos-blockchain}

Không, có vài chuỗi khối bằng chứng cổ phần khác. Không có cái nào giống Ethereum. cơ chế bằng chứng cổ phần của Ethereum là độc nhất.

## Sự kiện Hợp nhất là gì? {#what-is-the-merge}

Sự kiện Hợp nhất là khoảnh khắc Ethereum tắt cơ chế đồng thuận bằng chứng công việc của mình và bật cơ chế đồng thuận bằng chứng cổ phẩn. Sự kiện Hợp nhất đã diễn ra vào 15 tháng 9 năm 2022.

[Tìm hiểu thêm về The Merge](/roadmap/merge)

## Tính hoạt động và tính an toàn là gì? {#what-are-liveness-and-safety}

Tính hoạt động và tính an toàn là hai mối quan tâm bảo mật cơ bản đối với một chuỗi khối. Tính hoạt động là sự sẵn có của một chuỗi đang hoàn tất. Nếu chuỗi ngừng hoàn tất hoặc người dùng không thể truy cập dễ dàng, đó là những thất bại về tính hoạt động. Chi phí truy cập cực kỳ cao cũng có thể được coi là một thất bại về tính hoạt động. Tính an toàn đề cập đến mức độ khó khăn để tấn công chuỗi - tức là hoàn tất các điểm kiểm tra xung đột.

[Đọc thêm trong tài liệu về Casper](https://arxiv.org/pdf/1710.09437.pdf)
