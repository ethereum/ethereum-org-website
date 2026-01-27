---
title: Bầu chọn thủ lĩnh bí mật
description: Giải thích về cách bầu cử lãnh đạo bí mật có thể giúp bảo vệ các trình xác thực khỏi các cuộc tấn công
lang: vi
summaryPoints:
  - Địa chỉ IP của những người đề xuất khối có thể được biết trước, khiến họ dễ bị tấn công
  - Bầu cử lãnh đạo bí mật che giấu danh tính của các trình xác thực để không thể biết trước được họ là ai
  - Một phần mở rộng của ý tưởng này là làm cho việc lựa chọn trình xác thực trở nên ngẫu nhiên trong mỗi slot.
---

# Bầu cử lãnh đạo bí mật {#single-secret-leader-election}

Trong cơ chế đồng thuận dựa trên [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos) ngày nay, danh sách những người đề xuất khối sắp tới được công khai và có thể ánh xạ địa chỉ IP của họ. Điều này có nghĩa là những kẻ tấn công có thể xác định trình xác thực nào sẽ đề xuất một khối và nhắm mục tiêu vào họ bằng một cuộc tấn công từ chối dịch vụ (DOS) khiến họ không thể đề xuất khối của mình kịp thời.

Điều này có thể tạo cơ hội cho kẻ tấn công kiếm lợi. Ví dụ: một người đề xuất khối được chọn cho slot `n+1` có thể tấn công DOS người đề xuất trong slot `n` để họ bỏ lỡ cơ hội đề xuất khối. Điều này sẽ cho phép người đề xuất khối đang tấn công trích xuất MEV của cả hai slot, hoặc lấy tất cả các giao dịch lẽ ra phải được chia thành hai khối và thay vào đó gộp tất cả chúng vào một khối, thu về tất cả các khoản phí liên quan. Điều này có thể ảnh hưởng đến các trình xác thực tại nhà nhiều hơn là các trình xác thực tổ chức tinh vi, những người có thể sử dụng các phương pháp tiên tiến hơn để tự bảo vệ mình khỏi các cuộc tấn công DOS, và do đó có thể là một lực lượng tập trung hóa.

Có một số giải pháp cho vấn đề này. Một trong số đó là [Công nghệ Trình xác thực Phân tán](https://github.com/ethereum/distributed-validator-specs) nhằm mục đích phân tán các nhiệm vụ khác nhau liên quan đến việc chạy một trình xác thực trên nhiều máy, với tính dự phòng, để kẻ tấn công khó có thể ngăn chặn một khối được đề xuất trong một slot cụ thể. Tuy nhiên, giải pháp mạnh mẽ nhất là **Bầu cử Lãnh đạo Bí mật Đơn lẻ (SSLE)**.

## Bầu cử lãnh đạo bí mật đơn lẻ {#secret-leader-election}

Trong SSLE, mật mã học thông minh được sử dụng để đảm bảo rằng chỉ trình xác thực được chọn mới biết họ đã được chọn. Cách thức hoạt động là mỗi trình xác thực gửi một cam kết về một bí mật mà tất cả họ cùng chia sẻ. Các cam kết được xáo trộn và cấu hình lại để không ai có thể ánh xạ các cam kết đến các trình xác thực nhưng mỗi trình xác thực đều biết cam kết nào thuộc về mình. Sau đó, một cam kết được chọn ngẫu nhiên. Nếu một trình xác thực phát hiện rằng cam kết của họ đã được chọn, họ biết rằng đã đến lượt mình đề xuất một khối.

Việc triển khai hàng đầu của ý tưởng này được gọi là [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Hoạt động như sau:

1. Các trình xác thực cam kết với một bí mật được chia sẻ. Lược đồ cam kết được thiết kế sao cho nó có thể được liên kết với danh tính của trình xác thực nhưng cũng được ngẫu nhiên hóa để không bên thứ ba nào có thể đảo ngược kỹ thuật liên kết và liên kết một cam kết cụ thể với một trình xác thực cụ thể.
2. Vào đầu một epoch, một tập hợp ngẫu nhiên các trình xác thực được chọn để lấy mẫu các cam kết từ 16.384 trình xác thực, bằng cách sử dụng RANDAO.
3. Trong 8182 slot tiếp theo (1 ngày), những người đề xuất khối sẽ xáo trộn và ngẫu nhiên hóa một tập hợp con các cam kết bằng cách sử dụng entropy riêng của họ.
4. Sau khi việc xáo trộn kết thúc, RANDAO được sử dụng để tạo một danh sách các cam kết có thứ tự. Danh sách này được ánh xạ vào các slot của Ethereum.
5. Các trình xác thực thấy rằng cam kết của họ được gắn vào một slot cụ thể, và khi slot đó đến, họ sẽ đề xuất một khối.
6. Lặp lại các bước này để việc gán các cam kết cho các slot luôn đi trước slot hiện tại rất xa.

Điều này ngăn cản những kẻ tấn công biết trước trình xác thực cụ thể nào sẽ đề xuất khối tiếp theo, ngăn chặn khả năng xảy ra các cuộc tấn công DOS.

## Bầu cử lãnh đạo bí mật không đơn lẻ (SnSLE) {#secret-non-single-leader-election}

Cũng có một đề xuất riêng nhằm tạo ra một kịch bản trong đó mỗi trình xác thực có một cơ hội ngẫu nhiên để đề xuất một khối trong mỗi slot, tương tự như cách đề xuất khối được quyết định theo bằng chứng công việc, được gọi là **bầu cử lãnh đạo bí mật không đơn lẻ (SnSLE)**. Một cách đơn giản để làm điều này là sử dụng hàm RANDAO được dùng để chọn ngẫu nhiên các trình xác thực trong giao thức ngày nay. Ý tưởng với RANDAO là một số đủ ngẫu nhiên được tạo ra bằng cách trộn các hàm băm được gửi bởi nhiều trình xác thực độc lập. Trong SnSLE, các hàm băm này có thể được sử dụng để chọn người đề xuất khối tiếp theo, ví dụ như bằng cách chọn hàm băm có giá trị thấp nhất. Phạm vi của các hàm băm hợp lệ có thể bị giới hạn để điều chỉnh xác suất các trình xác thực riêng lẻ được chọn trong mỗi slot. Bằng cách khẳng định rằng hàm băm phải nhỏ hơn `2^256 * 5 / N` trong đó `N` = số lượng trình xác thực đang hoạt động, cơ hội để bất kỳ trình xác thực riêng lẻ nào được chọn trong mỗi slot sẽ là `5/N`. Trong ví dụ này, sẽ có 99,3% khả năng có ít nhất một người đề xuất tạo ra một hàm băm hợp lệ trong mỗi slot.

## Tiến độ hiện tại {#current-progress}

Cả SSLE và SnSLE đều đang trong giai đoạn nghiên cứu. Vẫn chưa có đặc tả cuối cùng nào cho cả hai ý tưởng. SSLE và SnSLE là các đề xuất cạnh tranh không thể cùng được triển khai. Trước khi phát hành, chúng cần được nghiên cứu và phát triển thêm, tạo mẫu và triển khai trên các mạng thử nghiệm công khai.

## Đọc thêm {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
