---
title: "Chứng thực"
description: "Mô tả về các chứng thực trên Ethereum bằng chứng cổ phần (proof-of-stake)."
lang: vi
---

Một trình xác thực được kỳ vọng sẽ tạo, ký và phát sóng một chứng thực trong mỗi kỷ nguyên. Trang này phác thảo hình thức của các chứng thực này cũng như cách chúng được xử lý và truyền đạt giữa các máy khách đồng thuận.

## Chứng thực là gì? {#what-is-an-attestation}

Mỗi [kỷ nguyên](/glossary/#epoch) (6,4 phút), một trình xác thực đề xuất một chứng thực cho mạng lưới. Chứng thực này dành cho một khe cụ thể trong kỷ nguyên. Mục đích của chứng thực là bỏ phiếu ủng hộ góc nhìn của trình xác thực về chuỗi, cụ thể là khối đã được chứng minh hợp lệ gần đây nhất và khối đầu tiên trong kỷ nguyên hiện tại (được gọi là các điểm kiểm tra `source` và `target`). Thông tin này được kết hợp cho tất cả các trình xác thực tham gia, cho phép mạng lưới đạt được đồng thuận về trạng thái của chuỗi khối.

Chứng thực chứa các thành phần sau:

- `aggregation_bits`: một danh sách bit (bitlist) của các trình xác thực, trong đó vị trí ánh xạ tới chỉ số trình xác thực trong ủy ban của họ; giá trị (0/1) cho biết liệu trình xác thực đã ký `data` hay chưa (tức là họ có đang hoạt động và đồng ý với người đề xuất khối hay không)
- `data`: các chi tiết liên quan đến chứng thực, như được định nghĩa bên dưới
- `signature`: một chữ ký BLS tổng hợp các chữ ký của từng trình xác thực riêng lẻ

Nhiệm vụ đầu tiên của một trình xác thực thực hiện chứng thực là xây dựng `data`. `data` chứa các thông tin sau:

- `slot`: Số khe mà chứng thực đề cập đến
- `index`: Một con số xác định ủy ban mà trình xác thực thuộc về trong một khe nhất định
- `beacon_block_root`: Mã băm gốc của khối mà trình xác thực nhìn thấy ở đầu chuỗi (kết quả của việc áp dụng thuật toán lựa chọn phân nhánh)
- `source`: Một phần của cuộc bỏ phiếu tính chung cuộc cho biết những gì các trình xác thực coi là khối đã được chứng minh hợp lệ gần đây nhất
- `target`: Một phần của cuộc bỏ phiếu tính chung cuộc cho biết những gì các trình xác thực coi là khối đầu tiên trong kỷ nguyên hiện tại

Khi `data` được xây dựng, trình xác thực có thể lật bit trong `aggregation_bits` tương ứng với chỉ số trình xác thực của chính họ từ 0 sang 1 để cho thấy rằng họ đã tham gia.

Cuối cùng, trình xác thực ký chứng thực và phát sóng nó lên mạng lưới.

### Chứng thực tổng hợp {#aggregated-attestation}

Có một chi phí hoạt động (overhead) đáng kể liên quan đến việc truyền dữ liệu này xung quanh mạng lưới cho mọi trình xác thực. Do đó, các chứng thực từ các trình xác thực riêng lẻ được tổng hợp trong các mạng con (subnet) trước khi được phát sóng rộng rãi hơn. Điều này bao gồm việc tổng hợp các chữ ký lại với nhau để một chứng thực được phát sóng bao gồm `data` đồng thuận và một chữ ký duy nhất được tạo thành bằng cách kết hợp các chữ ký của tất cả các trình xác thực đồng ý với `data` đó. Điều này có thể được kiểm tra bằng cách sử dụng `aggregation_bits` vì nó cung cấp chỉ số của từng trình xác thực trong ủy ban của họ (ID của ủy ban được cung cấp trong `data`), có thể được sử dụng để truy vấn các chữ ký riêng lẻ.

Trong mỗi kỷ nguyên, 16 trình xác thực trong mỗi mạng con được chọn làm `aggregators`. Các trình tổng hợp thu thập tất cả các chứng thực mà họ nhận được qua mạng lưới tin đồn (gossip network) có `data` tương đương với của chính họ. Người gửi của mỗi chứng thực khớp được ghi lại trong `aggregation_bits`. Sau đó, các trình tổng hợp phát sóng chứng thực tổng hợp lên mạng lưới rộng lớn hơn.

Khi một trình xác thực được chọn làm người đề xuất khối, họ đóng gói các chứng thực tổng hợp từ các mạng con cho đến khe mới nhất vào khối mới.

### Vòng đời đưa chứng thực vào khối {#attestation-inclusion-lifecycle}

1. Tạo (Generation)
2. Lan truyền (Propagation)
3. Tổng hợp (Aggregation)
4. Lan truyền (Propagation)
5. Đưa vào khối (Inclusion)

Vòng đời chứng thực được phác thảo trong sơ đồ dưới đây:

![attestation lifecycle](./attestation_schematic.png)

## Phần thưởng {#rewards}

Các trình xác thực được nhận phần thưởng khi gửi chứng thực. Phần thưởng chứng thực phụ thuộc vào các cờ tham gia (nguồn, đích và đầu), phần thưởng cơ sở và tỷ lệ tham gia.

Mỗi cờ tham gia có thể là đúng (true) hoặc sai (false), tùy thuộc vào chứng thực được gửi và độ trễ đưa vào khối của nó.

Kịch bản tốt nhất xảy ra khi cả ba cờ đều đúng, trong trường hợp đó, một trình xác thực sẽ kiếm được (cho mỗi cờ đúng):

`reward += base reward * flag weight * flag attesting rate / 64`

Tỷ lệ chứng thực cờ được đo lường bằng cách sử dụng tổng số dư hiệu dụng của tất cả các trình xác thực thực hiện chứng thực cho cờ nhất định so với tổng số dư hiệu dụng đang hoạt động.

### Phần thưởng cơ sở {#base-reward}

Phần thưởng cơ sở được tính toán dựa trên số lượng trình xác thực thực hiện chứng thực và số dư ether đặt cọc hiệu dụng của họ:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Độ trễ đưa vào khối {#inclusion-delay}

Tại thời điểm khi các trình xác thực bỏ phiếu cho đầu chuỗi (`block n`), `block n+1` vẫn chưa được đề xuất. Do đó, các chứng thực tự nhiên được đưa vào **muộn hơn một khối** nên tất cả các chứng thực đã bỏ phiếu cho `block n` là đầu chuỗi đều được đưa vào `block n+1` và **độ trễ đưa vào khối** là 1. Nếu độ trễ đưa vào khối tăng gấp đôi lên hai khe, phần thưởng chứng thực sẽ giảm đi một nửa, bởi vì để tính phần thưởng chứng thực, phần thưởng cơ sở được nhân với nghịch đảo của độ trễ đưa vào khối.

### Các kịch bản chứng thực {#attestation-scenarios}

#### Thiếu trình xác thực bỏ phiếu {#missing-voting-validator}

Các trình xác thực có tối đa 1 kỷ nguyên để gửi chứng thực của họ. Nếu chứng thực bị bỏ lỡ trong kỷ nguyên 0, họ có thể gửi nó với một độ trễ đưa vào khối trong kỷ nguyên 1.

#### Thiếu trình tổng hợp {#missing-aggregator}

Có tổng cộng 16 Trình tổng hợp (Aggregator) mỗi kỷ nguyên. Ngoài ra, các trình xác thực ngẫu nhiên đăng ký vào **hai mạng con trong 256 kỷ nguyên** và đóng vai trò dự phòng trong trường hợp thiếu các trình tổng hợp.

#### Thiếu người đề xuất khối {#missing-block-proposer}

Lưu ý rằng trong một số trường hợp, một trình tổng hợp may mắn cũng có thể trở thành người đề xuất khối. Nếu chứng thực không được đưa vào do người đề xuất khối bị thiếu, người đề xuất khối tiếp theo sẽ chọn chứng thực tổng hợp đó và đưa nó vào khối tiếp theo. Tuy nhiên, **độ trễ đưa vào khối** sẽ tăng thêm một.

## Đọc thêm {#further-reading}

- [Các chứng thực trong đặc tả đồng thuận có chú thích của Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Các chứng thực trên eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_