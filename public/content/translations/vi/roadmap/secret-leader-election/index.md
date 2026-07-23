---
title: Bầu chọn người dẫn đầu bí mật
description: Giải thích về cách bầu chọn người dẫn đầu bí mật có thể giúp bảo vệ các trình xác thực khỏi các cuộc tấn công
lang: vi
summaryPoints:
  - Địa chỉ IP của những người đề xuất khối có thể bị biết trước, khiến họ dễ bị tấn công
  - Bầu chọn người dẫn đầu bí mật che giấu danh tính của các trình xác thực để không ai có thể biết trước
  - Một phần mở rộng của ý tưởng này là làm cho việc lựa chọn trình xác thực trở nên ngẫu nhiên trong mỗi khe.
---

Trong cơ chế đồng thuận dựa trên [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos) hiện nay, danh sách những người đề xuất khối sắp tới là công khai và có thể lập bản đồ địa chỉ IP của họ. Điều này có nghĩa là những kẻ tấn công có thể xác định trình xác thực nào sắp đề xuất một khối và nhắm mục tiêu vào họ bằng một cuộc tấn công từ chối dịch vụ (DOS) khiến họ không thể đề xuất khối của mình kịp thời.

Điều này có thể tạo cơ hội cho kẻ tấn công trục lợi. Ví dụ: một người đề xuất khối được chọn cho khe `n+1` có thể tấn công DOS người đề xuất trong khe `n` để họ bỏ lỡ cơ hội đề xuất một khối. Điều này sẽ cho phép người đề xuất khối tấn công trích xuất MEV của cả hai khe, hoặc lấy tất cả các giao dịch lẽ ra phải được chia cho hai khối và thay vào đó đưa tất cả chúng vào một khối, thu được tất cả các khoản phí liên quan. Điều này có khả năng ảnh hưởng đến các trình xác thực tại nhà nhiều hơn so với các trình xác thực tổ chức tinh vi, những người có thể sử dụng các phương pháp tiên tiến hơn để tự bảo vệ mình khỏi các cuộc tấn công DOS, và do đó có thể là một tác nhân gây tập trung hóa.

Có một vài giải pháp cho vấn đề này. Một trong số đó là [công nghệ trình xác thực phân tán (DVT)](https://github.com/ethereum/distributed-validator-specs) nhằm mục đích phân bổ các tác vụ khác nhau liên quan đến việc chạy một trình xác thực trên nhiều máy, với tính dự phòng, để kẻ tấn công khó có thể ngăn chặn một khối được đề xuất trong một khe cụ thể. Tuy nhiên, giải pháp mạnh mẽ nhất là **Bầu chọn một người dẫn đầu bí mật (SSLE)**.

## Bầu chọn một người dẫn đầu bí mật {#secret-leader-election}

Trong SSLE, mật mã học thông minh được sử dụng để đảm bảo rằng chỉ trình xác thực được chọn mới biết họ đã được chọn. Điều này hoạt động bằng cách yêu cầu mỗi trình xác thực gửi một cam kết cho một bí mật mà tất cả họ cùng chia sẻ. Các cam kết được xáo trộn và cấu hình lại để không ai có thể ánh xạ các cam kết với các trình xác thực nhưng mỗi trình xác thực đều biết cam kết nào thuộc về mình. Sau đó, một cam kết được chọn ngẫu nhiên. Nếu một trình xác thực phát hiện ra rằng cam kết của họ đã được chọn, họ biết đã đến lượt mình đề xuất một khối.

Việc triển khai hàng đầu của ý tưởng này được gọi là [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Nó hoạt động như sau:

1. Các trình xác thực cam kết với một bí mật chung. Lược đồ cam kết được thiết kế sao cho nó có thể được liên kết với danh tính của trình xác thực nhưng cũng được ngẫu nhiên hóa để không có bên thứ ba nào có thể dịch ngược liên kết và kết nối một cam kết cụ thể với một trình xác thực cụ thể.
2. Vào đầu một Kỷ nguyên, một tập hợp ngẫu nhiên các trình xác thực được chọn để lấy mẫu các cam kết từ 16.384 trình xác thực, sử dụng RANDAO.
3. Trong 8182 khe tiếp theo (1 ngày), những người đề xuất khối xáo trộn và ngẫu nhiên hóa một tập hợp con các cam kết bằng cách sử dụng entropy riêng tư của họ.
4. Sau khi quá trình xáo trộn kết thúc, RANDAO được sử dụng để tạo một danh sách có thứ tự các cam kết. Danh sách này được ánh xạ vào các khe của Ethereum.
5. Các trình xác thực thấy rằng cam kết của họ được gắn với một khe cụ thể, và khi khe đó đến, họ đề xuất một khối.
6. Lặp lại các bước này để việc gán các cam kết cho các khe luôn đi trước rất xa so với khe hiện tại.

Điều này ngăn chặn những kẻ tấn công biết trước trình xác thực cụ thể nào sẽ đề xuất khối tiếp theo, ngăn chặn khả năng xảy ra các cuộc tấn công DOS.

## Bầu chọn người dẫn đầu bí mật không đơn lẻ (SnSLE) {#secret-non-single-leader-election}

Cũng có một đề xuất riêng biệt nhằm tạo ra một kịch bản trong đó mỗi trình xác thực có cơ hội ngẫu nhiên để đề xuất một khối trong mỗi khe, tương tự như cách đề xuất khối được quyết định theo Bằng chứng công việc (PoW), được gọi là **bầu chọn người dẫn đầu bí mật không đơn lẻ (SnSLE)**. Một cách đơn giản để thực hiện điều này là tận dụng hàm RANDAO được sử dụng để chọn ngẫu nhiên các trình xác thực trong Giao thức hiện nay. Ý tưởng với RANDAO là một số đủ ngẫu nhiên được tạo ra bằng cách trộn các mã băm do nhiều trình xác thực độc lập gửi. Trong SnSLE, các mã băm này có thể được sử dụng để chọn người đề xuất khối tiếp theo, ví dụ bằng cách chọn mã băm có giá trị thấp nhất. Phạm vi của các mã băm hợp lệ có thể bị giới hạn để điều chỉnh khả năng các trình xác thực riêng lẻ được chọn trong mỗi khe. Bằng cách khẳng định rằng mã băm phải nhỏ hơn `2^256 * 5 / N` trong đó `N` = số lượng trình xác thực đang hoạt động, cơ hội để bất kỳ trình xác thực riêng lẻ nào được chọn trong mỗi khe sẽ là `5/N`. Trong ví dụ này, sẽ có 99,3% cơ hội có ít nhất một người đề xuất tạo ra một mã băm hợp lệ trong mỗi khe.

## Tiến độ hiện tại {#current-progress}

SSLE và SnSLE đều đang trong giai đoạn nghiên cứu. Vẫn chưa có đặc tả đã chung cuộc cho cả hai ý tưởng này. SSLE và SnSLE là các đề xuất cạnh tranh nhau và không thể triển khai cả hai cùng lúc. Trước khi phát hành, chúng cần được nghiên cứu và phát triển thêm, tạo nguyên mẫu và triển khai trên các mạng thử nghiệm công khai.

## Đọc thêm {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)