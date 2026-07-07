---
title: Tính chung cuộc trong một slot
description: Giải thích về tính chung cuộc trong một slot
lang: vi
---

Mất khoảng 15 phút để một khối [Ethereum](/) đạt tính chung cuộc. Tuy nhiên, chúng ta có thể làm cho cơ chế đồng thuận của Ethereum xác thực các khối hiệu quả hơn và giảm đáng kể thời gian đạt tính chung cuộc. Thay vì chờ đợi mười lăm phút, các khối có thể được đề xuất và đã chung cuộc trong cùng một khe. Khái niệm này được gọi là **tính chung cuộc trong một slot (SSF)**.

## Tính chung cuộc là gì? {#what-is-finality}

Trong cơ chế đồng thuận dựa trên Bằng chứng cổ phần (PoS) của Ethereum, tính chung cuộc đề cập đến sự đảm bảo rằng một khối không thể bị thay đổi hoặc xóa khỏi chuỗi khối mà không đốt ít nhất 33% tổng số ETH đã đặt cọc. Đây là bảo mật 'kinh tế mã hóa' vì sự tin cậy đến từ chi phí cực kỳ cao liên quan đến việc thay đổi thứ tự hoặc nội dung của chuỗi, điều này sẽ ngăn cản bất kỳ tác nhân kinh tế hợp lý nào cố gắng thực hiện việc đó.

## Tại sao lại hướng tới tính chung cuộc nhanh hơn? {#why-aim-for-quicker-finality}

Thời gian đạt tính chung cuộc hiện tại hóa ra lại quá dài. Hầu hết người dùng không muốn đợi 15 phút để đạt tính chung cuộc, và thật bất tiện cho các ứng dụng và sàn giao dịch có thể muốn thông lượng giao dịch cao lại phải đợi lâu như vậy để chắc chắn rằng các giao dịch của họ là vĩnh viễn. Việc có độ trễ giữa đề xuất của một khối và việc đạt tính chung cuộc cũng tạo cơ hội cho các đợt tổ chức lại (reorg) ngắn mà kẻ tấn công có thể sử dụng để kiểm duyệt một số khối nhất định hoặc trích xuất MEV. Cơ chế xử lý việc nâng cấp các khối theo từng giai đoạn cũng khá phức tạp và đã được vá nhiều lần để đóng các lỗ hổng bảo mật, khiến nó trở thành một trong những phần của cơ sở mã Ethereum nơi các lỗi tinh vi có nhiều khả năng phát sinh hơn. Tất cả những vấn đề này có thể được loại bỏ bằng cách giảm thời gian đạt tính chung cuộc xuống còn một khe.

## Sự đánh đổi giữa sự phi tập trung / thời gian / chi phí hoạt động {#the-decentralization-time-overhead-tradeoff}

Đảm bảo tính chung cuộc không phải là thuộc tính ngay lập tức của một khối mới; cần có thời gian để một khối mới đạt tính chung cuộc. Lý do cho điều này là các trình xác thực đại diện cho ít nhất 2/3 tổng số ETH đã đặt cọc trên mạng lưới phải bỏ phiếu cho khối ("chứng thực") để nó được coi là đã chung cuộc. Mỗi nút xác thực trên mạng lưới phải xử lý các chứng thực từ các nút khác để biết rằng một khối đã, hoặc chưa, đạt được ngưỡng 2/3 đó.

Thời gian cho phép để đạt tính chung cuộc càng ngắn, thì càng yêu cầu nhiều sức mạnh tính toán tại mỗi nút vì quá trình xử lý chứng thực phải được thực hiện nhanh hơn. Ngoài ra, càng có nhiều nút xác thực tồn tại trên mạng lưới, thì càng có nhiều chứng thực phải được xử lý cho mỗi khối, điều này cũng làm tăng thêm sức mạnh xử lý được yêu cầu. Sức mạnh xử lý được yêu cầu càng nhiều, thì càng ít người có thể tham gia vì cần phần cứng đắt tiền hơn để chạy mỗi nút xác thực. Việc tăng thời gian giữa các khối làm giảm sức mạnh tính toán được yêu cầu tại mỗi nút nhưng cũng kéo dài thời gian đạt tính chung cuộc, vì các chứng thực được xử lý chậm hơn.

Do đó, có một sự đánh đổi giữa chi phí tài nguyên (sức mạnh tính toán), sự phi tập trung (số lượng nút có thể tham gia xác thực chuỗi) và thời gian đạt tính chung cuộc. Hệ thống lý tưởng cân bằng giữa sức mạnh tính toán tối thiểu, sự phi tập trung tối đa và thời gian đạt tính chung cuộc tối thiểu.

Cơ chế đồng thuận hiện tại của Ethereum đã cân bằng ba thông số này bằng cách:

- **Đặt khoản đặt cọc tối thiểu là 32 ETH**. Điều này thiết lập giới hạn trên cho số lượng chứng thực của các trình xác thực phải được xử lý bởi các nút riêng lẻ, và do đó là giới hạn trên cho các yêu cầu tính toán đối với mỗi nút.
- **Đặt thời gian đạt tính chung cuộc ở mức ~15 phút**. Điều này cung cấp đủ thời gian cho các trình xác thực chạy trên máy tính cá nhân thông thường để xử lý an toàn các chứng thực cho mỗi khối.

Với thiết kế cơ chế hiện tại, để giảm thời gian đạt tính chung cuộc, cần phải giảm số lượng trình xác thực trên mạng lưới hoặc tăng yêu cầu phần cứng cho mỗi nút. Tuy nhiên, có những cải tiến có thể được thực hiện đối với cách xử lý các chứng thực để cho phép đếm được nhiều chứng thực hơn mà không làm tăng thêm chi phí tài nguyên tại mỗi nút. Việc xử lý hiệu quả hơn sẽ cho phép tính chung cuộc được xác định trong một khe duy nhất, thay vì qua hai kỷ nguyên.

## Các con đường tiến tới SSF {#routes-to-ssf}

<ExpandableCard title= "Why can't we have SSF today?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

Cơ chế đồng thuận hiện tại kết hợp các chứng thực từ nhiều trình xác thực, được gọi là các ủy ban, để giảm số lượng tin nhắn mà mỗi trình xác thực phải xử lý để xác thực một khối. Mọi trình xác thực đều có cơ hội chứng thực trong mỗi kỷ nguyên (32 khe) nhưng trong mỗi khe, chỉ một tập hợp con các trình xác thực, được gọi là một 'ủy ban' thực hiện chứng thực. Họ làm như vậy bằng cách chia thành các mạng con trong đó một vài trình xác thực được chọn làm 'người tổng hợp'. Mỗi người tổng hợp đó kết hợp tất cả các chữ ký mà họ thấy từ các trình xác thực khác trong mạng con của họ thành một chữ ký tổng hợp duy nhất. Người tổng hợp bao gồm số lượng đóng góp cá nhân lớn nhất sẽ chuyển chữ ký tổng hợp của họ cho người đề xuất khối, người này sẽ đưa nó vào khối cùng với chữ ký tổng hợp từ các ủy ban khác.

Quá trình này cung cấp đủ dung lượng cho mọi trình xác thực bỏ phiếu trong mỗi kỷ nguyên, bởi vì `32 slots * 64 committees * 256 validators per committee = 524,288 validators per epoch`. Tại thời điểm viết bài (tháng 2 năm 2023) có khoảng 513.000 trình xác thực đang hoạt động.

Trong cơ chế này, mọi trình xác thực chỉ có thể bỏ phiếu cho một khối bằng cách phân phối các chứng thực của họ trong toàn bộ kỷ nguyên. Tuy nhiên, có những cách tiềm năng để cải thiện cơ chế sao cho _mọi trình xác thực đều có cơ hội chứng thực trong mọi khe_.
</ExpandableCard>

Kể từ khi cơ chế đồng thuận Ethereum được thiết kế, cơ chế tổng hợp chữ ký (BLS) đã được phát hiện là có khả năng mở rộng cao hơn nhiều so với suy nghĩ ban đầu, trong khi khả năng xử lý và xác minh chữ ký của các máy khách cũng đã được cải thiện. Hóa ra việc xử lý các chứng thực từ một số lượng lớn các trình xác thực thực sự có thể thực hiện được trong một khe duy nhất. Ví dụ: với một triệu trình xác thực, mỗi trình xác thực bỏ phiếu hai lần trong mỗi khe và thời gian khe được điều chỉnh thành 16 giây, các nút sẽ được yêu cầu xác minh chữ ký ở tốc độ tối thiểu là 125.000 lần tổng hợp mỗi giây để xử lý tất cả 1 triệu chứng thực trong khe đó. Trên thực tế, một máy tính bình thường mất khoảng 500 nano giây để thực hiện một lần xác minh chữ ký, nghĩa là 125.000 lần có thể được thực hiện trong ~62,5 mili giây - thấp hơn nhiều so với ngưỡng một giây.

Có thể đạt được hiệu quả cao hơn nữa bằng cách tạo ra các siêu ủy ban, ví dụ: 125.000 trình xác thực được chọn ngẫu nhiên cho mỗi khe. Chỉ những trình xác thực này mới được bỏ phiếu cho một khối và do đó chỉ tập hợp con các trình xác thực này mới quyết định xem một khối có đã chung cuộc hay không. Việc đây có phải là một ý tưởng hay hay không phụ thuộc vào việc cộng đồng muốn một cuộc tấn công thành công vào Ethereum sẽ tốn kém đến mức nào. Điều này là do thay vì yêu cầu 2/3 tổng số ether đã đặt cọc, kẻ tấn công có thể làm chung cuộc một khối không trung thực với 2/3 số ether đã đặt cọc _trong siêu ủy ban đó_. Đây vẫn là một lĩnh vực nghiên cứu đang hoạt động, nhưng có vẻ hợp lý rằng đối với một tập hợp trình xác thực đủ lớn để yêu cầu các siêu ủy ban ngay từ đầu, chi phí tấn công một trong những tiểu ủy ban đó sẽ cực kỳ cao (ví dụ: chi phí tấn công tính bằng ETH sẽ là `2/3 * 125,000 * 32 = ~2.6 million ETH`). Chi phí tấn công có thể được điều chỉnh bằng cách tăng quy mô của tập hợp trình xác thực (ví dụ: điều chỉnh quy mô trình xác thực sao cho chi phí tấn công bằng 1 triệu ether, 4 triệu ether, 10 triệu ether, v.v.). [Các cuộc thăm dò sơ bộ](https://youtu.be/ojBgyFl6-v4?t=755) trong cộng đồng dường như cho thấy 1-2 triệu ether là chi phí tấn công có thể chấp nhận được, ngụ ý khoảng 65.536 - 97.152 trình xác thực cho mỗi siêu ủy ban.

Tuy nhiên, việc xác minh không phải là nút thắt cổ chai thực sự - chính việc tổng hợp chữ ký mới thực sự thách thức các nút trình xác thực. Để mở rộng quy mô tổng hợp chữ ký có thể sẽ yêu cầu tăng số lượng trình xác thực trong mỗi mạng con, tăng số lượng mạng con hoặc thêm các lớp tổng hợp bổ sung (tức là triển khai các ủy ban của các ủy ban). Một phần của giải pháp có thể là cho phép các người tổng hợp chuyên biệt - tương tự như cách việc xây dựng khối và tạo cam kết cho dữ liệu Rollup sẽ được thuê ngoài cho các người xây dựng khối chuyên biệt theo cơ chế tách biệt người đề xuất và người xây dựng (PBS) và Danksharding.

## Vai trò của quy tắc chọn nhánh trong SSF là gì? {#role-of-the-fork-choice-rule}

Cơ chế đồng thuận ngày nay dựa trên sự liên kết chặt chẽ giữa công cụ tính chung cuộc (thuật toán xác định xem 2/3 số trình xác thực đã chứng thực cho một chuỗi nhất định hay chưa) và quy tắc chọn nhánh (thuật toán quyết định chuỗi nào là chuỗi chính xác khi có nhiều tùy chọn). Thuật toán chọn nhánh chỉ xem xét các khối _kể từ_ khối đã chung cuộc cuối cùng. Theo SSF, sẽ không có bất kỳ khối nào để quy tắc chọn nhánh xem xét, bởi vì tính chung cuộc xảy ra trong cùng một khe khi khối được đề xuất. Điều này có nghĩa là theo SSF, _hoặc_ thuật toán chọn nhánh _hoặc_ công cụ tính chung cuộc sẽ hoạt động tại bất kỳ thời điểm nào. Công cụ tính chung cuộc sẽ làm chung cuộc các khối nơi 2/3 số trình xác thực đang trực tuyến và chứng thực một cách trung thực. Nếu một khối không thể vượt qua ngưỡng 2/3, quy tắc chọn nhánh sẽ bắt đầu hoạt động để xác định chuỗi nào cần theo dõi. Điều này cũng tạo cơ hội để duy trì cơ chế rò rỉ do không hoạt động nhằm phục hồi một chuỗi nơi >1/3 số trình xác thực ngoại tuyến, mặc dù có thêm một số sắc thái.

## Các vấn đề còn tồn đọng {#outstanding-issues}

Vấn đề với việc mở rộng quy mô tổng hợp bằng cách tăng số lượng trình xác thực trên mỗi mạng con là nó dẫn đến tải trọng lớn hơn trên mạng lưới ngang hàng. Vấn đề với việc thêm các lớp tổng hợp là nó khá phức tạp để thiết kế và làm tăng độ trễ (tức là có thể mất nhiều thời gian hơn để người đề xuất khối nhận được thông tin từ tất cả các người tổng hợp mạng con). Cũng chưa rõ cách giải quyết kịch bản có nhiều trình xác thực đang hoạt động trên mạng lưới hơn mức có thể xử lý khả thi trong mỗi khe, ngay cả với tính năng tổng hợp chữ ký BLS. Một giải pháp tiềm năng là, vì tất cả các trình xác thực đều chứng thực trong mọi khe và không có ủy ban nào theo SSF, giới hạn 32 ETH đối với số dư hiệu dụng có thể được loại bỏ hoàn toàn, nghĩa là các nhà điều hành quản lý nhiều trình xác thực có thể hợp nhất khoản đặt cọc của họ và chạy ít trình xác thực hơn, giảm số lượng tin nhắn mà các nút xác thực phải xử lý để tính toán cho toàn bộ tập hợp trình xác thực. Điều này dựa vào việc những người đặt cọc lớn đồng ý hợp nhất các trình xác thực của họ. Cũng có thể áp đặt một giới hạn cố định về số lượng trình xác thực hoặc số lượng ETH đã đặt cọc tại bất kỳ thời điểm nào. Tuy nhiên, điều này yêu cầu một số cơ chế để quyết định trình xác thực nào được phép tham gia và trình xác thực nào không, điều này dễ tạo ra các tác động phụ không mong muốn.

## Tiến độ hiện tại {#current-progress}

SSF đang trong giai đoạn nghiên cứu. Nó dự kiến sẽ không được phát hành trong vài năm tới, có khả năng là sau các bản nâng cấp đáng kể khác như [cây Verkle](/roadmap/verkle-trees/) và [Danksharding](/roadmap/danksharding/).

## Đọc thêm {#further-reading}

- [Vitalik nói về SSF tại EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Ghi chú của Vitalik: Các con đường tiến tới tính chung cuộc trong một slot](https://notes.ethereum.org/@vbuterin/single_slot_finality)