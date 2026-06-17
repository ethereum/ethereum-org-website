---
title: Gasper
description: Giải thích về cơ chế bằng chứng cổ phần Gasper.
lang: vi
---

Gasper là sự kết hợp giữa Casper the Friendly Finality Gadget (Casper FFG) và thuật toán chọn nhánh LMD-GHOST. Cùng nhau, các thành phần này tạo thành cơ chế đồng thuận bảo mật cho Bằng chứng cổ phần (PoS) của Ethereum. Casper là cơ chế nâng cấp một số khối nhất định thành "đã chung cuộc" để những người mới tham gia vào mạng lưới có thể tự tin rằng họ đang đồng bộ hóa chuỗi chính tắc. Thuật toán chọn nhánh sử dụng các lượt bỏ phiếu tích lũy để đảm bảo rằng các nút có thể dễ dàng chọn đúng nhánh khi các phân nhánh phát sinh trong Chuỗi khối.

**Lưu ý** rằng định nghĩa ban đầu của Casper FFG đã được cập nhật một chút để đưa vào Gasper. Trên trang này, chúng tôi xem xét phiên bản đã được cập nhật.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu tài liệu này, bạn cần đọc trang giới thiệu về [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Vai trò của Gasper {#role-of-gasper}

Gasper nằm trên một Chuỗi khối Bằng chứng cổ phần (PoS), nơi các nút cung cấp ether như một khoản tiền gửi bảo mật có thể bị phá hủy nếu họ lười biếng hoặc không trung thực trong việc đề xuất hoặc xác thực các khối. Gasper là cơ chế xác định cách các trình xác thực được khen thưởng và trừng phạt, quyết định chấp nhận và từ chối khối nào, cũng như xây dựng trên phân nhánh nào của Chuỗi khối.

## Tính chung cuộc là gì? {#what-is-finality}

Tính chung cuộc là một thuộc tính của một số khối nhất định, có nghĩa là chúng không thể bị đảo ngược trừ khi có một lỗi đồng thuận nghiêm trọng và kẻ tấn công đã phá hủy ít nhất 1/3 tổng số ether đã đặt cọc. Các khối đã chung cuộc có thể được coi là thông tin mà Chuỗi khối chắc chắn. Một khối phải trải qua quy trình nâng cấp gồm hai bước để được chuyển thành đã chung cuộc:

1. Hai phần ba tổng số ether đã đặt cọc phải bỏ phiếu ủng hộ việc đưa khối đó vào chuỗi chính tắc. Điều kiện này nâng cấp khối thành "đã được chứng minh hợp lệ". Các khối đã được chứng minh hợp lệ khó có khả năng bị đảo ngược, nhưng chúng có thể bị đảo ngược trong một số điều kiện nhất định.
2. Khi một khối khác được chứng minh hợp lệ trên một khối đã được chứng minh hợp lệ, nó sẽ được nâng cấp thành "đã chung cuộc". Việc chuyển một khối thành đã chung cuộc là một cam kết đưa khối đó vào chuỗi chính tắc. Nó không thể bị đảo ngược trừ khi kẻ tấn công phá hủy hàng triệu ether (hàng tỷ USD).

Những nâng cấp khối này không xảy ra trong mọi khe. Thay vào đó, chỉ các khối ở ranh giới kỷ nguyên mới có thể được chứng minh hợp lệ và chuyển thành đã chung cuộc. Các khối này được gọi là "điểm kiểm tra". Việc nâng cấp xem xét các cặp điểm kiểm tra. Một "liên kết đa số tuyệt đối" phải tồn tại giữa hai điểm kiểm tra liên tiếp (tức là hai phần ba tổng số ether đã đặt cọc bỏ phiếu rằng điểm kiểm tra B là hậu duệ chính xác của điểm kiểm tra A) để nâng cấp điểm kiểm tra cũ hơn thành đã chung cuộc và khối mới hơn thành đã được chứng minh hợp lệ.

Bởi vì tính chung cuộc yêu cầu sự đồng thuận của hai phần ba rằng một khối là chính tắc, kẻ tấn công không thể tạo ra một chuỗi đã chung cuộc thay thế mà không:

1. Sở hữu hoặc thao túng hai phần ba tổng số ether đã đặt cọc.
2. Phá hủy ít nhất một phần ba tổng số ether đã đặt cọc.

Điều kiện đầu tiên phát sinh vì cần hai phần ba số ether đã đặt cọc để chuyển một chuỗi thành đã chung cuộc. Điều kiện thứ hai phát sinh vì nếu hai phần ba tổng số khoản đặt cọc đã bỏ phiếu ủng hộ cả hai phân nhánh, thì một phần ba chắc chắn đã bỏ phiếu cho cả hai. Bỏ phiếu kép là một điều kiện phạt cắt giảm sẽ bị trừng phạt tối đa và một phần ba tổng số khoản đặt cọc sẽ bị phá hủy. Tính đến tháng 5 năm 2022, điều này đòi hỏi kẻ tấn công phải đốt lượng ether trị giá khoảng 10 tỷ USD. Thuật toán chứng minh hợp lệ và chuyển các khối thành đã chung cuộc trong Gasper là một dạng sửa đổi một chút của [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Khuyến khích và Phạt cắt giảm {#incentives-and-slashing}

Các trình xác thực được khen thưởng vì đã đề xuất và xác thực các khối một cách trung thực. Ether được thưởng và thêm vào khoản đặt cọc của họ. Mặt khác, các trình xác thực vắng mặt và không hành động khi được yêu cầu sẽ bỏ lỡ những phần thưởng này và đôi khi mất một phần nhỏ khoản đặt cọc hiện tại của họ. Tuy nhiên, các hình phạt cho việc ngoại tuyến là nhỏ và trong hầu hết các trường hợp, tương đương với chi phí cơ hội của việc bỏ lỡ phần thưởng. Tuy nhiên, một số hành động của trình xác thực rất khó xảy ra do vô tình và biểu thị một số ý định độc hại, chẳng hạn như đề xuất nhiều khối cho cùng một khe, chứng thực nhiều khối cho cùng một khe hoặc mâu thuẫn với các lượt bỏ phiếu điểm kiểm tra trước đó. Đây là những hành vi "có thể bị phạt cắt giảm" bị trừng phạt nghiêm khắc hơn—việc phạt cắt giảm dẫn đến một phần khoản đặt cọc của trình xác thực bị phá hủy và trình xác thực bị loại khỏi mạng lưới các trình xác thực. Quá trình này mất 36 ngày. Vào Ngày 1, có một hình phạt ban đầu lên tới 1 ETH. Sau đó, ether của trình xác thực bị phạt cắt giảm sẽ dần cạn kiệt trong suốt thời gian thoát, nhưng vào Ngày 18, họ nhận được một "hình phạt tương quan", hình phạt này sẽ lớn hơn khi có nhiều trình xác thực bị phạt cắt giảm trong cùng một khoảng thời gian. Hình phạt tối đa là toàn bộ khoản đặt cọc. Những phần thưởng và hình phạt này được thiết kế để khuyến khích các trình xác thực trung thực và không khuyến khích các cuộc tấn công vào mạng lưới.

### Rò rỉ do không hoạt động {#inactivity-leak}

Cũng như bảo mật, Gasper cũng cung cấp "tính khả dụng hợp lý" (plausible liveness). Đây là điều kiện mà miễn là hai phần ba tổng số ether đã đặt cọc đang bỏ phiếu trung thực và tuân theo giao thức, chuỗi sẽ có thể chuyển thành đã chung cuộc bất kể bất kỳ hoạt động nào khác (chẳng hạn như các cuộc tấn công, vấn đề độ trễ hoặc các khoản phạt cắt giảm). Nói cách khác, một phần ba tổng số ether đã đặt cọc phải bị xâm phạm bằng cách nào đó để ngăn chuỗi chuyển thành đã chung cuộc. Trong Gasper, có một tuyến phòng thủ bổ sung chống lại lỗi tính khả dụng, được gọi là "rò rỉ do không hoạt động". Cơ chế này kích hoạt khi chuỗi không thể chuyển thành đã chung cuộc trong hơn bốn kỷ nguyên. Các trình xác thực không tích cực chứng thực cho chuỗi đa số sẽ bị rút dần khoản đặt cọc của họ cho đến khi đa số giành lại được hai phần ba tổng số khoản đặt cọc, đảm bảo rằng các lỗi tính khả dụng chỉ là tạm thời.

### Chọn nhánh {#fork-choice}

Định nghĩa ban đầu của Casper FFG bao gồm một thuật toán chọn nhánh áp đặt quy tắc: `follow the chain containing the justified checkpoint that has the greatest height` trong đó chiều cao (height) được định nghĩa là khoảng cách lớn nhất từ khối nguyên thủy. Trong Gasper, quy tắc chọn nhánh ban đầu không còn được dùng nữa để chuyển sang một thuật toán phức tạp hơn gọi là LMD-GHOST. Điều quan trọng cần nhận ra là trong điều kiện bình thường, quy tắc chọn nhánh là không cần thiết - có một người đề xuất khối duy nhất cho mỗi khe và các trình xác thực trung thực sẽ chứng thực cho nó. Chỉ trong trường hợp mạng lưới không đồng bộ lớn hoặc khi một người đề xuất khối không trung thực đã mập mờ thì mới cần đến thuật toán chọn nhánh. Tuy nhiên, khi những trường hợp đó phát sinh, thuật toán chọn nhánh là một biện pháp phòng thủ quan trọng để bảo mật chuỗi chính xác.

LMD-GHOST là viết tắt của "latest message-driven greedy heaviest observed sub-tree" (cây con quan sát được nặng nhất tham lam được thúc đẩy bởi thông điệp mới nhất). Đây là một cách dùng nhiều thuật ngữ chuyên ngành để định nghĩa một thuật toán chọn nhánh có trọng số chứng thực tích lũy lớn nhất làm chuỗi chính tắc (cây con nặng nhất tham lam) và nếu nhận được nhiều thông điệp từ một trình xác thực, thì chỉ thông điệp mới nhất được xem xét (được thúc đẩy bởi thông điệp mới nhất). Trước khi thêm khối nặng nhất vào chuỗi chính tắc của mình, mọi trình xác thực đều đánh giá từng khối bằng quy tắc này.

## Đọc thêm {#further-reading}

- [Gasper: Kết hợp GHOST và Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)