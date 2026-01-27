---
title: Chốt chuỗi trong vòng 1 Slot (Single Slot Finality)
description: Giải thích về chốt chuỗi trong vòng 1 Slot (Single Slot Finality)
lang: vi
---

# Hoàn tất trong một slot {#single-slot-finality}

Sẽ tổn khoảng 15 phút để một khối ở Ethereum được chốt. Tuy nhiên, chúng ta khiến cơ chế đồng thuận xác thực khối trên Ethereum một cách hiệu quả hơn bằng cách giảm thời gian cần chốt chuỗi đáng kể. Thay vì đợi 15 phút, khối có thể được đề xuất và chốt trong vòng cùng 1 Slot (Slot = ~12 giây). Khái niệm này được gọi là **hoàn tất trong một slot (SSF)**.

## Tính kết luận cuối cùng là gì? {#what-is-finality}

Cơ chế bằng chứng cổ phần nền tảng của Ethereum, chốt chuỗi nghĩa là chắc chắn rằng một khối không bị thay đổi hay loại bỏ khỏi chuỗi khối trừ khi có ít nhất ~33% lượng ETH được Stake. Đây được gọi là 'kinh tế-mật mã học' ('Crypto-Economic') vì niềm tin đến từ chi phí cực kỳ cao gắn liền với việc thay đổi thứ tự hoặc nội dung của chuỗi — điều sẽ ngăn cản bất kỳ tác nhân kinh tế hợp lý nào dám thử.

## Tại sao lại muốn chốt chuỗi (Finality) nhanh hơn? {#why-aim-for-quicker-finality}

Thời gian hiện tại quá lâu để có thể chốt chuỗi. Hầu hết người dùng không muốn chờ 15 phút chỉ để chốt chuỗi, và nó gây bất tiện cho các ứng dụng và sàn giao dịch muốn thông lượng giao dịch vào phải chờ quá lâu để một vài giao dịch của họ được ghi vào chuỗi khối. Việc có độ trễ giữa lúc đề xuất và chốt khối cũng tạo cơ hội cho cuộc tấn công tái tổ chức chuỗi ngắn (Short Reorg), mà kẻ tấn công có thể lợi dụng để kiểm duyệt một số khối hoặc trích xuất MEV (giá trị trích xuất tối đa). Cơ chế xử lý việc nâng cấp khối theo từng giai đoạn cũng khá phức tạp và đã được vá lỗi nhiều lần để khắc phục lỗ hổng bảo mật, khiến nó trở thành phần mã nguồn Ethereum mà có thể xảy ra các lỗi tinh vi. Những vấn đề này có thể được loại bỏ khi thời gian chốt chuỗi đưcọ hoàn thành trong 1 Slot.

## Sự đánh đổi giữa tính phi tập trung / thời gian / chi phí chung {#the-decentralization-time-overhead-tradeoff}

Đảm bảo chốt chuỗi không phải là một thứ cần phải tức thì đối với một khối mới; cần phải có thời gian thì khối mới được chốt. Lý do là các nút đại diện cho ít nhất 2/3 tổng số ETH đã Stake trên mạng bỏ phiếu cho khối ("chứng thực") để có thể được coi là đã chốt. Mỗi nút xác thực trong mạng phải xử lí sự chứng thực từ các nút khác để biết khối đó đã đạt ngưỡng 2/3 hay chưa.

Thời gian để chốt càng ngắn thì mỗi nút cần nhiều sức mạnh tính toán hơn, vì phải sử lý sự xác thực phải diễn ra nhanh hơn. Ngoài ra, càng có nhiều nút xác thực trong mạng, thì mỗi khối càng có nhiều sự xác thực cần phải xử lý, lại càng làm tăng yêu câu về sức mạnh tính toán. Đòi hỏi sức mạnh tính toán càng lớn thì càng ít người có thể tham gia, vì phần cứng máy tính mắc tiền hơn để chạy một nút xác thực. Việc tăng thời gian giữa các khối sẽ làm giảm nhu cầu về sức mạnh tính toán giữa mỗi nút, nhưng đồng thời cũng kéo dài thời gian chốt, bởi vì sự chứng thực được xử lí chậm hơn.

Vì thế, sự đánh đổi giữa chi phí vận hành (sức mạnh tính toán), phi tập trung (số lượng nút có thể tham gia trong chuỗi xác thực và thời gian để chốt chuỗi. Hệ thống lý tưởng sẽ cân bằng được: sức mạnh tính toán mức tối thiếu, mức độ phi tập trung tối đa và thời gian chốt chuỗi tối thiểu.

Cơ chế đồng thuận hiện tại của Ethereum cân bằng giữa ba yếu tố này bằng cách:

- **Đặt mức Stake tối thiểu là 32 ETH**. Điều này đặt ra một giới hạn về số lượng sự chứng thực mà mỗi nút xử lí và do đó cũng đặt ra giới hạn cho yêu cầu tính toán của từng nút.
- **Đặt thời gian để chốt chuỗi là khoảng ~15 phút**. Điều này cho nút xác thực đủ thời gian để chạy trên máy tính gia đình thông thường có thể chạy xử lí sự chứng thực cho mỗi khối.

Với thiết kế của cơ chế hiện tại, để có thể giảm thời gian chốt chuỗi, sẽ cần thiết để giảm số lượng nút xác thực trên mạng lưới hoặc tăng yêu cầu phần cứng cho mỗi nút. Tuy nhiên, những cải thiện này làm có thể làm cho cách mà xử lí sự chứng thực cho phép tính được nhiều sự chứng thực hơn mà không làm tăng chi phí vận hành của mỗi nút. Quá trình càng hiệu quả càng cho phép chốt chuỗi được thực hiện trong vòng 1 Slot, hơn là mất tận 2 chu kỳ (Epochs = ~6,4 phút).

## Các lộ trình đến SSF {#routes-to-ssf}

<ExpandableCard title= "Tại sao hiện chưa có SSF?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Cơ chế đồng thuận hiện tại kết hợp các chứng thực từ nhiều nút, được gọi là ủy ban, nhằm giảm số lượng thông điệp mà mỗi nút phải xử lý để xác thực một khối. Mỗi nút xác thực đều có cơ hội thực hiện chứng thực trong mỗi chu kỳ (32 Slot), nhưng trong mỗi Slot chỉ có một tập con nút xác thực, được gọi là ủy ban. Họ thực hiện điều này bằng cách chia thành các mạng con, trong đó một số nút được chọn làm 'người tổng hợp'. Mỗi người tổng hợp sẽ kết hợp tất cả các chữ ký mà họ nhận được từ các nút khác trong mạng con của mình thành một chữ ký tổng hợp duy nhất. Người tổng hợp nào có số lượng đóng góp cá nhân lớn nhất sẽ gửi chữ ký tổng hợp của họ cho người đề xuất khối, người này sẽ đưa nó vào khối cùng với chữ ký tổng hợp từ các ủy ban khác.

Quy trình này cung cấp đủ khả năng để mọi nút xác thực có thể bỏ phiếu trong mỗi chu kỳ, bởi vì `32 Slot * 64 ủy ban * 256 nút xác thực mỗi ủy ban = 524.288 nút xác thực mỗi chu kỳ.`. Tại thời điểm viết bài này (Tháng 2 năm 2023) có ~513.000 nút xác thực hoạt động.

Trong sơ đồ này, mọi nút xác thực chỉ có thể bỏ phiếu cho khối bằng các phân bổ sự chứng thực của họ trên toàn bộ chu kỳ. Tuy nhiên, có những cách tiềm năng để cải thiện cơ chế để cho phép _mọi nút xác thực có cơ hội chứng thực mỗi Slot_. </ExpandableCard>

Từ lúc cơ chế đồng thuận Ethereum được thiết kế, sơ đồ tổng hợp chữ ký (BLS) đã được chứng minh là có khả năng mở rộng tốt hơn so với dự đoán ban đầu, đồng thời khả năng xử lý và xác minh chữ ký của các Client đã được cải thiện. Hóa ra việc xử lí sự xác thực từ một lượng nút khổng lồ thực sự có thể làm được trong một Slot. Ví dụ, trong một triệu nút xác thực mỗi người bỏ phiếu 2 lần mỗi Slot, thời gian Slot được điều chỉnh lên 16 giây, nút có nghĩa vụ xác minh chữ ký với tốc độ tối thiểu 125.000 chứng thực mỗi giây để có thể xử lý tất cả 1 triệu chứng thực trong Slot đó. Trên thực tế, một máy tính thông thường tốn 500 nano giây để thực hiện một lần xác minh chữ ký, nghĩa là có thể xử lí 125.000 chữ kí trung ~62.5 mili-giây - thấp hơn nhiều so với ngưỡng một giây.

Có thể đạt được hiệu quả cao hơn nữa bằng cách tạo ra các siêu ủy ban, ví dụ, gồm 125.000 người xác thực được chọn ngẫu nhiên cho mỗi slot. Chỉ những nút này mới có thể bỏ phiếu cho khối, và do đó tập con nút này mới quyết định liệu một khối được chốt hay không. Việc đây có phải là một ý tưởng hay hay không phụ thuộc vào việc cộng đồng muốn một cuộc tấn công thành công vào Ethereum đắt đỏ như thế nào. Điều này là do thay vì yêu cầu 2/3 tổng số ether đã được stake, một kẻ tấn công có thể hoàn tất một khối không trung thực với 2/3 số ether được stake _trong siêu ủy ban đó_. Đây vẫn là một lĩnh vực nghiên cứu đang hoạt động, nhưng có vẻ hợp lý rằng với một tập hợp người xác thực đủ lớn để cần đến các siêu ủy ban ngay từ đầu, chi phí để tấn công một trong những tiểu ủy ban đó sẽ cực kỳ cao (ví dụ: chi phí tấn công được tính bằng ETH sẽ là `2/3 * 125.000 * 32 = ~2,6 triệu ETH`). Chi phí tấn công có thể được điều chỉnh bằng cách tăng quy mô của tập hợp người xác thực (ví dụ: điều chỉnh quy mô tập hợp người xác thực sao cho chi phí tấn công bằng 1 triệu ether, 4 triệu ether, 10 triệu ether, v.v.). [Các cuộc thăm dò sơ bộ](https://youtu.be/ojBgyFl6-v4?t=755) của cộng đồng dường như cho thấy rằng 1-2 triệu ether là một chi phí tấn công có thể chấp nhận được, điều này ngụ ý có khoảng ~65.536 - 97.152 người xác thực cho mỗi siêu ủy ban.

Tuy nhiên, việc xác minh không phải là nút nghẽn cổ chai thực sự - mà chính là việc tổng hợp chữ ký chứng thực mới là thách thức lớn nhất. Để mở rộng quy mô tổng hợp chữ ký có thể sẽ yêu cầu tăng số lượng người xác thực trong mỗi mạng con, tăng số lượng mạng con hoặc thêm các lớp tổng hợp bổ sung (tức là triển khai các ủy ban của các ủy ban). Một phần giải pháp có thể là cho phép có các người chứng thực chuyên dụng – tương tự như cách việc xây dựng khối và tạo chứng thực cho dữ liệu Rollups sẽ được “thuê ngoài” cho các người xây khối chuyên biệt trong mô hình tách biệt người xây và đề xuất khối (PBS) và phân đoạn thế hệ mới.

## Vai trò của quy tắc chọn nhánh trong SSF là gì? Vai trò của quy tắc lựa chọn phân nhánh {#role-of-the-fork-choice-rule}

Cơ chế đồng thuận hiện tại dựa trên sự gắn kết chặt chẽ giữa cơ chế chốt chuỗi (thuật toán xác định liệu 2/3 nút đã chứng thực cho một chuỗi nhất định hay chưa) và quy tắc chọn nhánh (thuật toán quyết định chuỗi nào là đúng khi có nhiều lựa chọn). Thuật toán lựa chọn phân nhánh chỉ xem xét các khối _kể từ_ khối được hoàn tất sau cùng. Trong SSF sẽ không có khói nào để quy tắc chọn chỗi cân nhắc, bởi vì việc chốt diễn ra trong cùng Slot khi khối được đề xuất. Điều này có nghĩa là trong SSF, tại bất kỳ thời điểm nào, _hoặc là_ thuật toán lựa chọn phân nhánh _hoặc là_ tiện ích hoàn tất sẽ hoạt động. Cơ chế chốt sẽ chốt các khối trong trường hợp có 2/3 nút xác thực trực tuyến và chứng thực trung thực. Nếu một khối không thể vượt qua ngưỡng 2/3, thì quy tắc chọn chuỗi sẽ được kích hoạt để quyết định chọn chuỗi nào. Điều này cũng tạo cơ hội để duy trì cơ chế rò rỉ do không hoạt động, giúp khôi phục chuỗi khi >1/3 người xác thực ngoại tuyến, dù có thêm một số điểm khác biệt nhỏ.

## Các vấn đề còn tồn đọng {#outstanding-issues}

Vấn đề với việc mở rộng người tổng hợp bằng cách tăng số lượng nút trong mỗi mạng con là nó dẫn đến tải cao hơn cho mạng ngang hàng. Vấn đề với việc thêm các lớp tổng hợp là nó khá phức tạp về mặt kỹ thuật và làm tăng độ trễ (tức là người đề xuất khối có thể mất nhiều thời gian hơn để nhận được thông tin từ tất cả những người tổng hợp của mạng con). Ngoài ra, vẫn chưa rõ cách xử lý tình huống có nhiều nút hoạt động trên mạng hơn mức có thể được xử lý trong mỗi Slot, ngay cả khi đã có cơ chế tổng hợp chữ ký BLS. Một giải pháp tiềm năng là: vì trong SSF tất cả nút xác thực đều chứng thực trong mỗi Slot và không có ủy ban, nên giới hạn 32 ETH trên số dư hiệu quả có thể được loại bỏ hoàn toàn. Điều này đồng nghĩa với việc các nút đang quản lý nhiều nút có thể gộp Stake lại và vận hành ít nút hơn, từ đó giảm số lượng thông điệp mà các nút xác thực phải xử lý để bao quát toàn bộ tập nút xác thực. Điều này phụ thuộc vào việc "những người Stake lớn” đồng ý gộp nút của họ lại. Cũng có thể áp đặt một giới hạn cố định về số lượng nút hoặc tổng số ETH Stake tại bất kỳ thời điểm nào. Tuy nhiên, điều này đòi hỏi phải có một cơ chế để quyết định nút nào được phép tham gia và nút nào không, và điều đó dễ dẫn đến những hệ quả phụ không mong muốn.

## Tiến độ hiện tại {#current-progress}

SSF đang trong quá trình nghiên cứu. Nó dự kiến sẽ không được phát hành trong vài năm tới, có thể là sau các nâng cấp đáng kể khác như [cây Verkle](/roadmap/verkle-trees/) và [Danksharding](/roadmap/danksharding/).

## Đọc thêm {#further-reading}

- [Vitalik nói về SSF tại EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Ghi chú của Vitalik: Các lộ trình đến hoàn tất trong một slot](https://notes.ethereum.org/@vbuterin/single_slot_finality)
