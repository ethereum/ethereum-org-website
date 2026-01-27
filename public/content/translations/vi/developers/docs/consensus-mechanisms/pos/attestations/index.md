---
title: Các chứng thực
description: Mô tả về các chứng thực trên Ethereum bằng chứng cổ phần.
lang: vi
---

Một trình xác thực dự kiến sẽ tạo, ký và phát một chứng thực trong mỗi tham số epoch. Trang này phác thảo các chứng thực này trông như thế nào và cách chúng được xử lý và truyền đạt giữa các máy khách đồng thuận.

## Chứng thực là gì? {#what-is-an-attestation}

Mỗi [tham số epoch](/glossary/#epoch) (6,4 phút), một trình xác thực sẽ đề xuất một chứng thực cho mạng. Chứng thực dành cho một slot cụ thể trong tham số epoch. Mục đích của chứng thực là bỏ phiếu ủng hộ quan điểm của trình xác thực về chuỗi, cụ thể là khối được chứng minh hợp lệ gần đây nhất và khối đầu tiên trong tham số epoch hiện tại (được gọi là các điểm kiểm tra `nguồn` và `đích`). Thông tin này được kết hợp cho tất cả các trình xác thực tham gia, cho phép mạng đạt được sự đồng thuận về trạng thái của chuỗi khối.

Chứng thực chứa các thành phần sau:

- `aggregation_bits`: danh sách bit của các trình xác thực trong đó vị trí ánh xạ tới chỉ mục của trình xác thực trong ủy ban của họ; giá trị (0/1) cho biết liệu trình xác thực đã ký `dữ liệu` hay chưa (tức là liệu họ có đang hoạt động và đồng ý với người đề xuất khối hay không)
- `data`: các chi tiết liên quan đến chứng thực, như được định nghĩa bên dưới
- `signature`: một chữ ký BLS tổng hợp các chữ ký của các trình xác thực riêng lẻ

Nhiệm vụ đầu tiên của một trình xác thực chứng thực là xây dựng `dữ liệu`. `Dữ liệu` chứa các thông tin sau:

- `slot`: Số slot mà chứng thực đề cập đến
- `index`: Một số xác định ủy ban mà trình xác thực thuộc về trong một slot nhất định
- `beacon_block_root`: Hàm băm gốc của khối mà trình xác thực nhìn thấy ở đầu chuỗi (kết quả của việc áp dụng thuật toán lựa chọn phân nhánh)
- `source`: Một phần của phiếu bầu về tính kết luận cuối cùng cho biết những gì các trình xác thực xem là khối được chứng minh hợp lệ gần đây nhất
- `target`: Một phần của phiếu bầu về tính kết luận cuối cùng cho biết những gì các trình xác thực xem là khối đầu tiên trong tham số epoch hiện tại

Khi `dữ liệu` được xây dựng, trình xác thực có thể lật bit trong `aggregation_bits` tương ứng với chỉ mục trình xác thực của chính họ từ 0 thành 1 để cho thấy rằng họ đã tham gia.

Cuối cùng, trình xác thực ký chứng thực và phát nó lên mạng.

### Chứng thực tổng hợp {#aggregated-attestation}

Có một chi phí đáng kể liên quan đến việc chuyển dữ liệu này xung quanh mạng cho mỗi trình xác thực. Do đó, các chứng thực từ các trình xác thực riêng lẻ được tổng hợp trong các mạng con trước khi được phát đi rộng rãi hơn. Điều này bao gồm việc tổng hợp các chữ ký lại với nhau để một chứng thực được phát đi bao gồm `dữ liệu` đồng thuận và một chữ ký duy nhất được hình thành bằng cách kết hợp chữ ký của tất cả các trình xác thực đồng ý với `dữ liệu` đó. Điều này có thể được kiểm tra bằng cách sử dụng `aggregation_bits` vì điều này cung cấp chỉ mục của mỗi trình xác thực trong ủy ban của họ (có ID được cung cấp trong `dữ liệu`) có thể được sử dụng để truy vấn các chữ ký riêng lẻ.

Trong mỗi tham số epoch, 16 trình xác thực trong mỗi mạng con được chọn làm `bộ tổng hợp`. Các bộ tổng hợp thu thập tất cả các chứng thực mà họ nghe được qua mạng gossip có `dữ liệu` tương đương với dữ liệu của chính họ. Người gửi của mỗi chứng thực phù hợp được ghi lại trong `aggregation_bits`. Sau đó, các bộ tổng hợp phát tổng hợp chứng thực tới mạng rộng hơn.

Khi một trình xác thực được chọn làm người đề xuất khối, họ sẽ đóng gói các chứng thực tổng hợp từ các mạng con cho đến slot mới nhất trong khối mới.

### Vòng đời đưa vào của chứng thực {#attestation-inclusion-lifecycle}

1. Tạo
2. Truyền bá
3. Tổng hợp
4. Truyền bá
5. Đưa vào

Vòng đời chứng thực được phác thảo trong sơ đồ dưới đây:

![vòng đời chứng thực](./attestation_schematic.png)

## Phần thưởng {#rewards}

Các trình xác thực được thưởng khi gửi chứng thực. Phần thưởng chứng thực phụ thuộc vào các cờ tham gia (nguồn, đích và đầu), phần thưởng cơ bản và tỷ lệ tham gia.

Mỗi cờ tham gia có thể là đúng hoặc sai, tùy thuộc vào chứng thực đã gửi và độ trễ đưa vào của nó.

Tình huống tốt nhất xảy ra khi cả ba cờ đều đúng, trong trường hợp đó, một trình xác thực sẽ kiếm được (cho mỗi cờ đúng):

`phần thưởng += phần thưởng cơ bản * trọng số cờ * tỷ lệ chứng thực cờ / 64`

Tỷ lệ chứng thực cờ được đo bằng cách sử dụng tổng số dư hiệu dụng của tất cả các trình xác thực chứng thực cho cờ đã cho so với tổng số dư hiệu dụng đang hoạt động.

### Phần thưởng cơ bản {#base-reward}

Phần thưởng cơ bản được tính theo số lượng trình xác thực chứng thực và số dư ether đã đặt cọc hiệu dụng của họ:

`phần thưởng cơ bản = số dư hiệu dụng của trình xác thực x 2^6 / SQRT(Số dư hiệu dụng của tất cả các trình xác thực đang hoạt động)`

#### Độ trễ đưa vào {#inclusion-delay}

Tại thời điểm các trình xác thực bỏ phiếu cho đầu chuỗi (`khối n`), `khối n+1` vẫn chưa được đề xuất. Do đó, các chứng thực tự nhiên được đưa vào **sau một khối**, vì vậy tất cả các chứng thực đã bỏ phiếu cho `khối n` là đầu chuỗi đều được đưa vào `khối n+1`, và **độ trễ đưa vào** là 1. Nếu độ trễ đưa vào tăng gấp đôi thành hai slot, phần thưởng chứng thực sẽ giảm một nửa, vì để tính phần thưởng chứng thực, phần thưởng cơ bản được nhân với nghịch đảo của độ trễ đưa vào.

### Các kịch bản chứng thực {#attestation-scenarios}

#### Thiếu Trình xác thực bỏ phiếu {#missing-voting-validator}

Các trình xác thực có tối đa 1 tham số epoch để gửi chứng thực của họ. Nếu chứng thực bị bỏ lỡ trong tham số epoch 0, họ có thể gửi nó với độ trễ đưa vào trong tham số epoch 1.

#### Thiếu Bộ tổng hợp {#missing-aggregator}

Tổng cộng có 16 Bộ tổng hợp cho mỗi tham số epoch. Ngoài ra, các trình xác thực ngẫu nhiên đăng ký **hai mạng con trong 256 tham số epoch** và đóng vai trò dự phòng trong trường hợp thiếu các bộ tổng hợp.

#### Thiếu người đề xuất khối {#missing-block-proposer}

Lưu ý rằng trong một số trường hợp, một bộ tổng hợp may mắn cũng có thể trở thành người đề xuất khối. Nếu chứng thực không được đưa vào vì người đề xuất khối đã mất tích, người đề xuất khối tiếp theo sẽ lấy chứng thực tổng hợp và đưa nó vào khối tiếp theo. Tuy nhiên, **độ trễ đưa vào** sẽ tăng thêm một.

## Đọc thêm {#further-reading}

- [Các chứng thực trong đặc tả đồng thuận có chú thích của Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Các chứng thực trong eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
