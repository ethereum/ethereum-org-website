---
title: "Làm thế nào để hợp nhất những ảnh hưởng được được ETH cung cấp"
description: "Phân tích về cách Hợp nhất ảnh hưởng đến nguồn cung ETH"
lang: vi
---

# The Merge đã tác động đến nguồn cung ETH như thế nào {#how-the-merge-impacts-ETH-supply}

The Mere (sự kiện hợp nhất) đánh dấu sự chuyển đổi của mạng lưới Ethereum từ cơ chế bằng chứng công việc sang bằng chứng cổ phần, diễn ra vào tháng 9 năm 2022. Cách ETH được phát hành đã có sự thay đổi vào thời điểm chuyển đổi đó. Trước đây, ETH mới được phát hành từ hai nguồn: lớp thực thi (tức là Mạng chính) và lớp đồng thuận (tức là Chuỗi Hải Đăng). Kể từ khi sự kiện hợp nhất diễn ra, đã không còn việc phát hành ở lớp thực thi. Hãy cùng phân tích chi tiết điều này.

## Các thành phần của việc phát hành ETH {#components-of-eth-issuance}

Chúng ta có thể chia nguồn cung ETH thành hai yếu tố chính: phát hành và đốt.

**Phát hành** ETH là quá trình tạo ra ETH chưa từng tồn tại trước đó. **Đốt** ETH là khi ETH hiện có bị phá hủy, loại bỏ nó khỏi lưu thông. Tốc độ phát hành và đốt được tính toán dựa trên nhiều tham số, và sự cân bằng giữa chúng quyết định tỷ lệ lạm phát / giảm phát của Ether.

<Card
emoji=":chart_decreasing:"
title="Tóm tắt phát hành ETH">

- Trước khi chuyển sang bằng chứng cổ phần, các thợ đào đã được phát hành khoảng 13.000 ETH/ngày
- Người stake được phát hành khoảng 1.700 ETH/ngày, dựa trên tổng số khoảng 14 triệu ETH được stake
- Lượng phát hành từ việc stake chính xác sẽ dao động dựa trên tổng số lượng ETH được stake
- **Kể từ The Merge, chỉ còn lại ~1.700 ETH/ngày, làm giảm tổng lượng phát hành ETH mới khoảng ~88%**
- Đốt: Con số này dao động theo nhu cầu của mạng lưới. _Nếu_ giá gas trung bình đạt ít nhất 16 gwei trong một ngày nhất định, điều này sẽ bù đắp cho khoảng 1.700 ETH được phát hành cho các nút xác thực và đưa mức lạm phát ròng của ETH về không hoặc thấp hơn trong ngày đó.
</Card>

## Trước The Merge (lịch sử) {#pre-merge}

### Phát hành ở lớp thực thi {#el-issuance-pre-merge}

Dưới cơ chế bằng chứng công việc, các thợ đào chỉ tương tác với lớp thực thi và được thưởng bằng phần thưởng khối nếu họ là người đầu tiên giải được khối tiếp theo. Kể từ [bản nâng cấp Constantinople](/ethereum-forks/#constantinople) vào năm 2019, phần thưởng này là 2 ETH cho mỗi khối. Các thợ đào cũng được thưởng cho việc phát hành các khối [ommer](/glossary/#ommer), là những khối hợp lệ nhưng không nằm trong chuỗi dài nhất/chính tắc. Những phần thưởng này có giá trị tối đa là 1,75 ETH cho mỗi ommer, và là phần thưởng _cộng thêm_ vào phần thưởng được phát hành từ khối chính tắc. Quá trình đào là một hoạt động tiêu tốn kinh tế lớn, và trong quá khứ đã yêu cầu mức phát hành ETH cao để duy trì.

### Phát hành ở lớp đồng thuận {#cl-issuance-pre-merge}

[Chuỗi Hải Đăng](/ethereum-forks/#beacon-chain-genesis) đã đi vào hoạt động vào năm 2020. Thay vì thợ đào, nó được bảo mật bởi các nốt xác thực sử dụng cơ chế bằng chứng cổ phần. Chuỗi này được khởi tạo bởi người dùng Ethereum gửi ETH một chiều vào hợp đồng thông minh trên mạng chính (lớp thực thi), mà chuỗi Beacon sẽ theo dõi và ghi nhận cho người dùng một lượng ETH tương ứng trên chuỗi mới. Cho đến khi sự kiện hợp nhất diễn ra, các nốt xác thực trên chuỗi Beacon chưa xử lý giao dịch mà về cơ bản chỉ đạt đồng thuận về trạng thái của chính quỹ nốt xác thực.

Các nốt xác thực trên chuỗi Beacon được thưởng ETH khi xác nhận trạng thái của chuỗi và đề xuất khối. Phần thưởng (hoặc hình phạt) được tính toán và phân phối ở mỗi chu kỳ (Epoch - mỗi 6,4 phút), dựa trên hiệu suất hoạt động của nút xác thực. Phần thưởng của trình xác thực **ít hơn đáng kể** so với phần thưởng đào được phát hành trước đây theo bằng chứng công việc (2 ETH mỗi ~13,5 giây), vì việc vận hành một nút xác thực không tốn kém về mặt kinh tế và do đó không yêu cầu hoặc đảm bảo phần thưởng cao như vậy.

### Phân tích chi tiết việc phát hành trước The Merge {#pre-merge-issuance-breakdown}

Tổng cung ETH: **~120.520.000 ETH** (tại thời điểm The Merge vào tháng 9 năm 2022)

**Phát hành ở lớp thực thi:**

- Ước tính là 2,08 ETH mỗi 13,3 giây\*: **~4.930.000** ETH được phát hành trong một năm
- Dẫn đến tỷ lệ lạm phát **khoảng 4,09%** (4,93 triệu mỗi năm / 120,5 triệu tổng cộng)
- \*Con số này bao gồm 2 ETH cho mỗi khối Canonical, cộng thêm trung bình 0,08 ETH theo thời gian từ các khối ommer. Cũng sử dụng 13,3 giây, mục tiêu thời gian khối cơ sở không có bất kỳ ảnh hưởng nào từ [bom độ khó](/glossary/#difficulty-bomb). ([Xem nguồn](https://bitinfocharts.com/ethereum/))

**Phát hành ở lớp đồng thuận:**

- Sử dụng tổng cộng 14.000.000 ETH đã stake, tỷ lệ phát hành ETH là khoảng 1700 ETH/ngày ([Xem nguồn](https://ultrasound.money/))
- Kết quả là **~620.500** ETH được phát hành trong một năm
- Dẫn đến tỷ lệ lạm phát **khoảng 0,52%** (620.500 mỗi năm / 119,3 triệu tổng cộng)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Tổng tỷ lệ phát hành hàng năm (trước The Merge): ~4,61%** (4,09% + 0,52%)

**~88,7%** lượng phát hành đã thuộc về các thợ đào trên lớp thực thi (4,09 / 4,61 \* 100)

**~11,3%** đã được phát hành cho những người stake trên lớp đồng thuận (0,52 / 4,61 \* 100)
</AlertDescription>
</AlertContent>
</Alert>

## Sau The Merge (hiện tại) {#post-merge}

### Phát hành ở lớp thực thi {#el-issuance-post-merge}

Việc phát hành ở lớp thực thi kể từ The Merge là bằng không. Bằng chứng công việc không còn là một phương tiện hợp lệ để sản xuất khối theo các quy tắc đồng thuận đã được nâng cấp. Tất cả hoạt động của lớp thực thi được đóng gói thành "các khối beacon", được phát hành và chứng thực bởi các trình xác thực bằng chứng cổ phần. Phần thưởng cho việc chứng thực và phát hành các khối beacon được tính riêng trên lớp đồng thuận.

### Phát hành ở lớp đồng thuận {#cl-issuance-post-merge}

Việc phát hành ở lớp đồng thuận vẫn tiếp tục diễn ra như trước The Merge, với các phần thưởng nhỏ cho các trình xác thực chứng thực và đề xuất các khối. Phần thưởng của trình xác thực tiếp tục được tích lũy vào _số dư của trình xác thực_ được quản lý trong lớp đồng thuận. Không giống như các tài khoản hiện tại (tài khoản "thực thi"), có thể giao dịch trên Mạng chính, đây là các tài khoản Ethereum riêng biệt không thể giao dịch tự do với các tài khoản Ethereum khác. Tiền trong các tài khoản này chỉ có thể được rút về một địa chỉ thực thi được chỉ định duy nhất.

Kể từ bản nâng cấp Shanghai/Capella diễn ra vào tháng 4 năm 2023, những lần rút tiền này đã được kích hoạt cho người stake. Người stake được khuyến khích rút _thu nhập/phần thưởng của họ (số dư trên 32 ETH)_ vì các khoản tiền này không đóng góp vào trọng số stake của họ (tối đa là 32).

Người stake cũng có thể chọn thoát và rút toàn bộ số dư trình xác thực của họ. Để đảm bảo Ethereum ổn định, số lượng trình xác thực rời khỏi cùng một lúc bị giới hạn.

Khoảng 0,33% tổng số trình xác thực có thể thoát trong một ngày nhất định. Theo mặc định, bốn (4) trình xác thực có thể thoát mỗi epoch (mỗi 6,4 phút hoặc 900 mỗi ngày). Thêm một (1) trình xác thực được phép thoát cho mỗi 65.536 (2<sup>16</sup>) trình xác thực bổ sung trên 262.144 (2<sup>18</sup>). Ví dụ, với hơn 327.680 trình xác thực, năm (5) trình xác thực có thể rời đi mỗi epoch (1.125 mỗi ngày). Sáu (6) trình xác thực sẽ được phép thoát với tổng số trình xác thực đang hoạt động trên 393.216, v.v.

Khi có nhiều trình xác thực rút tiền hơn, số lượng trình xác thực được thoát tối đa sẽ giảm dần xuống tối thiểu là bốn để cố ý ngăn chặn một lượng lớn ETH đã stake gây mất ổn định bị rút đồng thời.

### Phân tích chi tiết lạm phát sau The Merge {#post-merge-inflation-breakdown}

- Tổng cung ETH: **~120.520.000 ETH** (tại thời điểm The Merge vào tháng 9 năm 2022)
- Phát hành ở lớp thực thi: **0**
- Phát hành ở lớp đồng thuận: Tương tự như trên, tỷ lệ phát hành hàng năm **~0,52%** (với tổng số 14 triệu ETH đã stake)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Tổng tỷ lệ phát hành hàng năm: **~0,52%**

Giảm ròng trong việc phát hành ETH hàng năm: **~88,7%** ((4,61% - 0,52%) / 4,61% \* 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Đốt {#the-burn}

Đối nghịch với việc phát hành ETH là tốc độ ETH bị đốt. Để một giao dịch được thực hiện trên Ethereum, một khoản phí tối thiểu (được gọi là phí cơ bản) phải được trả, và khoản phí này biến động liên tục (theo từng khối) tùy thuộc vào hoạt động của mạng lưới. Phí được thanh toán bằng ETH và là _yêu cầu_ bắt buộc để giao dịch được coi là hợp lệ. Phí này bị _đốt_ trong quá trình giao dịch, loại bỏ nó khỏi lưu thông.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Việc đốt phí đã được triển khai với [bản nâng cấp London](/ethereum-forks/#london) vào tháng 8 năm 2021 và vẫn không thay đổi kể từ The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Ngoài việc đốt phí được áp dụng bởi bản nâng cấp London, các nút xác thực cũng có thể bị phạt nếu ngoại tuyến, hoặc tệ hơn, họ có thể bị Slashing nếu vi phạm các quy tắc nhất định đe dọa đến an ninh mạng lưới. Các hình phạt này dẫn đến việc giảm ETH trong số dư của nút xác thực, và số ETH đó không được thưởng trực tiếp cho bất kỳ tài khoản nào khác, mà trên thực tế là bị đốt/loại bỏ khỏi lưu thông.

### Tính toán giá gas trung bình cho giảm phát {#calculating-average-gas-price-for-deflation}

Như đã đề cập ở trên, lượng ETH được phát hành trong một ngày phụ thuộc vào tổng số ETH được Stake. Tại thời điểm viết, con số này vào khoảng 1.700 ETH/ngày.

Để xác định mức giá Gas trung bình cần thiết nhằm bù đắp hoàn toàn lượng phát hành này trong một khoảng thời gian 24 giờ, chúng ta sẽ bắt đầu bằng cách tính tổng số khối trong một ngày, với giả định thời gian tạo khối là 12 giây:

- `(1 khối / 12 giây) * (60 giây / phút) = 5 khối / phút`
- `(5 khối / phút) * (60 phút / giờ) = 300 khối / giờ`
- `(300 khối / giờ) * (24 giờ / ngày) = 7.200 khối / ngày`

Mỗi khối nhắm đến `15x10^6 gas/khối` ([thêm về gas](/developers/docs/gas/)). Dựa vào đó, ta có thể tính được mức giá Gas trung bình (tính theo đơn vị Gwei/Gas) cần thiết để bù đắp lượng phát hành, với tổng phát hành hàng ngày là 1.700 ETH:

- `7200 khối/ngày * 15x10^6 gas/khối * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/ngày`

Giải cho `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (làm tròn đến hai chữ số có nghĩa)

Một cách khác để sắp xếp lại bước cuối cùng này là thay thế `1700` bằng một biến `X` đại diện cho việc phát hành ETH hàng ngày và đơn giản hóa phần còn lại thành:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Chúng ta có thể đơn giản hóa và viết điều này dưới dạng một hàm của `X`:

- `f(X) = X/108` trong đó `X` là lượng phát hành ETH hàng ngày và `f(X)` đại diện cho giá gwei/gas cần thiết để bù đắp tất cả ETH mới được phát hành.

Vì vậy, ví dụ: nếu `X` (việc phát hành ETH hàng ngày) tăng lên 1800 dựa trên tổng số ETH đã stake, thì `f(X)` (gwei cần thiết để bù đắp tất cả việc phát hành) sau đó sẽ là `17 gwei` (sử dụng 2 chữ số có nghĩa)

## Đọc thêm {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Các bảng điều khiển có sẵn để trực quan hóa việc phát hành và đốt ETH trong thời gian thực_
- [Lập biểu đồ phát hành Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
