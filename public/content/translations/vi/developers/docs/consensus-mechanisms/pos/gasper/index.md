---
title: Gasper
description: Giải thích về cơ chế bằng chứng cổ phần Gasper.
lang: vi
---

Gasper là sự kết hợp của Casper the Friendly Finality Gadget (Casper-FFG) và thuật toán lựa chọn phân nhánh LMD-GHOST. Các thành phần này cùng nhau tạo thành cơ chế đồng thuận bảo mật cho Ethereum bằng chứng cổ phần. Casper là cơ chế nâng cấp các khối nhất định thành "hoàn tất" để những người mới tham gia vào mạng có thể tin tưởng rằng họ đang đồng bộ hóa chuỗi chính tắc. Thuật toán lựa chọn phân nhánh sử dụng các phiếu bầu tích lũy để đảm bảo rằng các nút có thể dễ dàng chọn đúng khi các phân nhánh phát sinh trong chuỗi khối.

**Lưu ý** rằng định nghĩa ban đầu của Casper-FFG đã được cập nhật một chút để đưa vào Gasper. Trên trang này, chúng tôi xem xét phiên bản đã cập nhật.

## Lời mở đầu

Để hiểu tài liệu này, cần phải đọc trang giới thiệu về [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/).

## Vai trò của Gasper {#role-of-gasper}

Gasper nằm trên một chuỗi khối bằng chứng cổ phần, nơi các nút cung cấp ether làm tiền ký quỹ bảo mật có thể bị hủy nếu chúng lười biếng hoặc không trung thực trong việc đề xuất hoặc xác thực các khối. Gasper là cơ chế xác định cách các trình xác thực được thưởng và bị phạt, quyết định chấp nhận và từ chối khối nào và xây dựng trên phân nhánh nào của chuỗi khối.

## Tính kết luận cuối cùng là gì? {#what-is-finality}

Tính kết luận cuối cùng là một thuộc tính của các khối nhất định có nghĩa là chúng không thể bị hoàn nguyên trừ khi đã có một lỗi đồng thuận nghiêm trọng và một kẻ tấn công đã phá hủy ít nhất 1/3 tổng số ether đã đặt cọc. Các khối đã hoàn tất có thể được coi là thông tin mà chuỗi khối chắc chắn. Một khối phải trải qua một quy trình nâng cấp hai bước để được hoàn tất:

1. Hai phần ba tổng số ether đã đặt cọc phải đã bỏ phiếu ủng hộ việc đưa khối đó vào chuỗi chính tắc. Điều kiện này nâng cấp khối thành "hợp lý". Các khối hợp lý không có khả năng bị hoàn nguyên, nhưng có thể bị trong một số điều kiện nhất định.
2. Khi một khối khác được hợp lý hóa trên một khối đã hợp lý, nó được nâng cấp thành "hoàn tất". Việc hoàn tất một khối là một cam kết đưa khối đó vào chuỗi chính tắc. Nó không thể bị hoàn nguyên trừ khi một kẻ tấn công phá hủy hàng triệu ether (hàng tỷ USD).

Những nâng cấp khối này không xảy ra trong mọi slot. Thay vào đó, chỉ các khối ranh giới tham số epoch mới có thể được hợp lý hóa và hoàn tất. Các khối này được gọi là "điểm kiểm tra". Việc nâng cấp xem xét các cặp điểm kiểm tra. Một "liên kết siêu đa số" phải tồn tại giữa hai điểm kiểm tra liên tiếp (tức là, hai phần ba tổng số ether đã đặt cọc bỏ phiếu rằng điểm kiểm tra B là hậu duệ chính xác của điểm kiểm tra A) để nâng cấp điểm kiểm tra cũ hơn thành hoàn tất và khối gần đây hơn thành hợp lý.

Bởi vì tính kết luận cuối cùng yêu cầu sự đồng ý của hai phần ba rằng một khối là chính tắc, một kẻ tấn công không thể tạo ra một chuỗi đã hoàn tất thay thế mà không:

1. Sở hữu hoặc thao túng hai phần ba tổng số ether đã đặt cọc.
2. Phá hủy ít nhất một phần ba tổng số ether đã đặt cọc.

Điều kiện đầu tiên phát sinh vì cần có hai phần ba số ether đã đặt cọc để hoàn tất một chuỗi. Điều kiện thứ hai phát sinh bởi vì nếu hai phần ba tổng số cổ phần đã bỏ phiếu ủng hộ cả hai phân nhánh, thì một phần ba phải đã bỏ phiếu cho cả hai. Bỏ phiếu hai lần là một điều kiện phạt cắt giảm sẽ bị trừng phạt tối đa, và một phần ba tổng số cổ phần sẽ bị phá hủy. Kể từ tháng 5 năm 2022, điều này yêu cầu một kẻ tấn công phải đốt khoảng 10 tỷ đô la giá trị ether. Thuật toán hợp lý hóa và hoàn tất các khối trong Gasper là một dạng sửa đổi một chút của [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Ưu đãi và Phạt cắt giảm {#incentives-and-slashing}

Các trình xác thực được thưởng vì đã đề xuất và xác thực các khối một cách trung thực. Ether được thưởng và được thêm vào cổ phần của họ. Mặt khác, các trình xác thực vắng mặt và không hành động khi được yêu cầu sẽ bỏ lỡ những phần thưởng này và đôi khi mất một phần nhỏ cổ phần hiện có của họ. Tuy nhiên, các hình phạt cho việc ngoại tuyến là nhỏ và, trong hầu hết các trường hợp, tương đương với chi phí cơ hội của việc bỏ lỡ phần thưởng. Tuy nhiên, một số hành động của trình xác thực rất khó thực hiện một cách vô tình và biểu thị một số ý định độc hại, chẳng hạn như đề xuất nhiều khối cho cùng một slot, chứng thực cho nhiều khối cho cùng một slot, hoặc mâu thuẫn với các phiếu bầu điểm kiểm tra trước đó. Đây là những hành vi "có thể bị phạt cắt giảm" bị phạt nặng hơn—phạt cắt giảm dẫn đến một phần cổ phần của trình xác thực bị phá hủy và trình xác thực bị loại khỏi mạng lưới các trình xác thực. Quá trình này mất 36 ngày. Vào ngày 1, có một hình phạt ban đầu lên đến 1 ETH. Sau đó, ether của trình xác thực bị phạt cắt giảm sẽ từ từ cạn kiệt trong suốt thời gian thoát, nhưng vào Ngày 18, họ nhận được một "hình phạt tương quan", hình phạt này lớn hơn khi có nhiều trình xác thực bị phạt cắt giảm cùng lúc. Hình phạt tối đa là toàn bộ cổ phần. Những phần thưởng và hình phạt này được thiết kế để khuyến khích các trình xác thực trung thực và ngăn cản các cuộc tấn công vào mạng.

### Rò rỉ do không hoạt động {#inactivity-leak}

Cũng như bảo mật, Gasper cũng cung cấp "tính sống động hợp lý". Đây là điều kiện mà miễn là hai phần ba tổng số ether đã đặt cọc đang bỏ phiếu một cách trung thực và tuân theo giao thức, chuỗi sẽ có thể hoàn tất bất kể bất kỳ hoạt động nào khác (chẳng hạn như các cuộc tấn công, vấn đề về độ trễ hoặc phạt cắt giảm). Nói cách khác, một phần ba tổng số ether đã đặt cọc phải bị xâm phạm bằng cách nào đó để ngăn chuỗi hoàn tất. Trong Gasper, có một tuyến phòng thủ bổ sung chống lại lỗi về tính sống động, được gọi là "rò rỉ do không hoạt động". Cơ chế này được kích hoạt khi chuỗi không thể hoàn tất trong hơn bốn tham số epoch. Các trình xác thực không tích cực chứng thực cho chuỗi đa số sẽ bị rút dần cổ phần của họ cho đến khi phe đa số giành lại được hai phần ba tổng số cổ phần, đảm bảo rằng các lỗi về tính sống động chỉ là tạm thời.

### Lựa chọn phân nhánh {#fork-choice}

Định nghĩa ban đầu của Casper-FFG bao gồm một thuật toán lựa chọn phân nhánh áp đặt quy tắc: `theo chuỗi chứa điểm kiểm tra hợp lý có độ cao lớn nhất` trong đó độ cao được định nghĩa là khoảng cách lớn nhất từ khối khởi nguyên. Trong Gasper, quy tắc lựa chọn phân nhánh ban đầu không còn được dùng nữa thay vào đó là một thuật toán phức tạp hơn có tên là LMD-GHOST. Điều quan trọng là phải nhận ra rằng trong điều kiện bình thường, quy tắc lựa chọn phân nhánh là không cần thiết - có một người đề xuất khối duy nhất cho mỗi slot, và các trình xác thực trung thực sẽ chứng thực cho nó. Chỉ trong trường hợp mạng không đồng bộ lớn hoặc khi một người đề xuất khối không trung thực đã đưa ra thông tin không nhất quán thì mới cần đến thuật toán lựa chọn phân nhánh. Tuy nhiên, khi những trường hợp đó phát sinh, thuật toán lựa chọn phân nhánh là một cơ chế phòng thủ quan trọng để bảo mật chuỗi chính xác.

LMD-GHOST là viết tắt của "cây con quan sát được nặng nhất tham lam theo thông điệp mới nhất". Đây là một cách định nghĩa đầy thuật ngữ cho một thuật toán lựa chọn phân nhánh có trọng số chứng thực tích lũy lớn nhất làm phân nhánh chính tắc (cây con nặng nhất tham lam) và nếu nhận được nhiều thông điệp từ một trình xác thực, thì chỉ thông điệp mới nhất được xem xét (dựa trên thông điệp mới nhất). Trước khi thêm khối nặng nhất vào chuỗi chính tắc của mình, mọi trình xác thực đều đánh giá từng khối bằng quy tắc này.

## Đọc thêm {#further-reading}

- [Gasper: Kết hợp GHOST và Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)
