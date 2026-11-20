---
title: "Chứng thực"
description: "Mô tả về các chứng thực trên Ethereum proof-of-stake."
lang: vi
---

Một trình xác thực được kỳ vọng sẽ tạo, ký và phát sóng một chứng thực trong mỗi Kỷ nguyên. Trang này phác thảo hình thức của các chứng thực này cũng như cách chúng được xử lý và truyền đạt giữa các máy khách đồng thuận.

## Chứng thực là gì? {#what-is-an-attestation}

Mỗi [Kỷ nguyên](/glossary/#epoch) (6,4 phút), một trình xác thực sẽ phát sóng một chứng thực lên mạng lưới. Chứng thực này dành cho một khe cụ thể trong Kỷ nguyên. Mục đích của chứng thực là để bỏ phiếu ủng hộ góc nhìn của trình xác thực về Chuỗi, cụ thể là đầu Chuỗi, điểm kiểm tra đã được chứng minh hợp lệ gần đây nhất và điểm kiểm tra ở đầu Kỷ nguyên hiện tại (được gọi là các điểm kiểm tra `source` và `target`). Thông tin này được kết hợp cho tất cả các trình xác thực tham gia, cho phép mạng lưới đạt được đồng thuận về trạng thái của Chuỗi khối.

Kể từ [bản nâng cấp Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), một chứng thực từ một trình xác thực đơn lẻ và một chứng thực tổng hợp có các định dạng khác nhau. Chứng thực của một trình xác thực đơn lẻ bao gồm:

- `committee_index`: ủy ban mà trình xác thực thuộc về trong khe đã cho
- `attester_index`: chỉ số của trình xác thực
- `data`: các chi tiết liên quan đến chứng thực, như được định nghĩa bên dưới
- `signature`: chữ ký BLS của trình xác thực trên `data`

Nhiệm vụ đầu tiên của một trình xác thực thực hiện chứng thực là xây dựng `data`. `data` chứa các thông tin sau:

- `slot`: Số khe mà chứng thực đề cập đến
- `index`: Được đặt thành `0` kể từ Pectra. Ủy ban được xác định bên ngoài `data` (bởi `committee_index`, hoặc bởi `committee_bits` trong một tổng hợp) để các phiếu bầu từ các ủy ban khác nhau có `data` giống hệt nhau và có thể được tổng hợp lại với nhau. Trước Pectra, trường này xác định ủy ban
- `beacon_block_root`: Mã băm gốc của khối mà trình xác thực nhìn thấy ở đầu Chuỗi (kết quả của việc áp dụng thuật toán lựa chọn Phân nhánh)
- `source`: Một phần của cuộc bỏ phiếu tính chung cuộc cho biết những gì các trình xác thực nhìn thấy là điểm kiểm tra đã được chứng minh hợp lệ gần đây nhất
- `target`: Một phần của cuộc bỏ phiếu tính chung cuộc cho biết những gì các trình xác thực nhìn thấy là điểm kiểm tra ở đầu Kỷ nguyên hiện tại (khối tại khe đầu tiên của nó, hoặc khối mới nhất trước đó nếu khe đó trống)

Khi `data` được xây dựng, trình xác thực sẽ ký nó và phát sóng chứng thực đến [mạng con](#aggregated-attestation) cho ủy ban của nó.

### Chứng thực tổng hợp {#aggregated-attestation}

Có một chi phí hoạt động đáng kể liên quan đến việc truyền dữ liệu này xung quanh mạng lưới cho mọi trình xác thực. Do đó, các chứng thực từ các trình xác thực riêng lẻ được tổng hợp trong các mạng con trước khi được phát sóng rộng rãi hơn. Điều này bao gồm việc tổng hợp các chữ ký lại với nhau để một chứng thực được phát sóng bao gồm `data` đồng thuận và một chữ ký duy nhất được tạo thành bằng cách kết hợp các chữ ký của tất cả các trình xác thực đồng ý với `data` đó. Một chứng thực tổng hợp bao gồm:

- `aggregation_bits`: một danh sách bit với một bit cho mỗi thành viên của mỗi ủy ban được bao gồm, trong đó vị trí ánh xạ tới vị trí của trình xác thực trong ủy ban của nó; giá trị (0/1) cho biết liệu chữ ký của trình xác thực đó có được bao gồm hay không
- `data`: dữ liệu chứng thực mà mọi trình xác thực được bao gồm đã ký
- `signature`: một chữ ký BLS tổng hợp các chữ ký của các trình xác thực được bao gồm
- `committee_bits`: các thành viên của ủy ban nào được bao phủ bởi `aggregation_bits`

Bất kỳ ai cũng có thể kiểm tra chữ ký tổng hợp dựa trên các khóa công khai kết hợp của các trình xác thực có bit được thiết lập.

Trong mỗi khe, khoảng 16 thành viên của mỗi ủy ban được chọn làm `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`) của nó. Một trình xác thực biết được liệu nó có được chọn hay không từ chữ ký của chính nó trên số khe. Các bộ tổng hợp thu thập tất cả các chứng thực mà chúng nghe được trên mạng con của ủy ban có cùng `data` với chứng thực của chính chúng, và kết hợp chúng lại, ghi lại người gửi của mỗi chứng thực trong `aggregation_bits`. Các bộ tổng hợp sau đó phát sóng bản tổng hợp đến mạng lưới rộng lớn hơn.

Khi một trình xác thực được chọn làm người đề xuất khối, họ sẽ bao gồm các chứng thực tổng hợp từ các khe gần đây vào khối mới. Kể từ Pectra, người đề xuất có thể hợp nhất các bản tổng hợp từ các ủy ban khác nhau có chung `data` thành một chứng thực, và một khối có thể chứa tối đa 8 chứng thực như vậy.

### Vòng đời bao gồm chứng thực {#attestation-inclusion-lifecycle}

1. Tạo
2. Truyền bá
3. Tổng hợp
4. Truyền bá
5. Bao gồm

Vòng đời chứng thực được phác thảo trong sơ đồ dưới đây:

<AttestationsDiagram />

## Phần thưởng {#rewards}

Các trình xác thực được nhận phần thưởng cho việc gửi các chứng thực. Phần thưởng chứng thực phụ thuộc vào các cờ tham gia (nguồn, đích và đầu), phần thưởng cơ sở và tỷ lệ tham gia.

Mỗi cờ tham gia có thể là đúng (true) hoặc sai (false), tùy thuộc vào chứng thực được gửi và độ trễ bao gồm của nó.

Kịch bản tốt nhất xảy ra khi cả ba cờ đều đúng, trong trường hợp đó, một trình xác thực sẽ kiếm được (cho mỗi cờ đúng):

`reward += base reward * flag weight * flag attesting rate / 64`

Tỷ lệ chứng thực cờ được đo lường bằng cách sử dụng tổng số dư hiệu dụng của tất cả các trình xác thực thực hiện chứng thực cho cờ đã cho so với tổng số dư hiệu dụng đang hoạt động.

### Phần thưởng cơ sở {#base-reward}

Phần thưởng cơ sở được tính toán theo số lượng trình xác thực thực hiện chứng thực và số dư ether đặt cọc hiệu dụng của họ:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Độ trễ bao gồm {#inclusion-delay}

Tại thời điểm khi các trình xác thực bỏ phiếu cho đầu Chuỗi (`block n`), `block n+1` vẫn chưa được đề xuất. Do đó, các chứng thực tự nhiên được bao gồm **muộn hơn một khối** nên tất cả các chứng thực đã bỏ phiếu cho `block n` là đầu Chuỗi đều được bao gồm trong `block n+1` và, **độ trễ bao gồm** là 1. Độ trễ bao gồm quyết định chứng thực sẽ kiếm được các cờ tham gia nào:

- `head`: chỉ khi độ trễ bao gồm chính xác là 1 khe
- `source`: nếu độ trễ bao gồm tối đa là 5 khe (căn bậc hai nguyên của 32 khe trong một Kỷ nguyên)
- `target`: bất cứ khi nào chứng thực được bao gồm (kể từ bản nâng cấp Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Vì vậy, một chứng thực được bao gồm muộn hai khe sẽ mất phần thưởng đầu nhưng vẫn kiếm được phần thưởng nguồn và đích.

### Các kịch bản chứng thực {#attestation-scenarios}

#### Thiếu trình xác thực bỏ phiếu {#missing-voting-validator}

Một chứng thực có thể được bao gồm trong bất kỳ khối nào từ khe sau khi nó được tạo cho đến cuối Kỷ nguyên tiếp theo. Nếu một chứng thực từ Kỷ nguyên 0 không được bao gồm trong một khối trong Kỷ nguyên 0, nó vẫn có thể được bao gồm trong Kỷ nguyên 1, với độ trễ bao gồm dài hơn.

#### Thiếu bộ tổng hợp {#missing-aggregator}

Mỗi ủy ban nhắm đến khoảng 16 bộ tổng hợp trong mỗi khe, vì vậy việc thiếu một bộ tổng hợp hiếm khi ngăn cản các chứng thực của một ủy ban được tổng hợp. Một cách riêng biệt, mỗi nút Beacon duy trì đăng ký **hai mạng con trong 256 Kỷ nguyên** cùng một lúc, được chọn từ ID nút của nó, điều này giữ cho mọi mạng con được kết nối tốt.

#### Thiếu người đề xuất khối {#missing-block-proposer}

Lưu ý rằng trong một số trường hợp, một bộ tổng hợp may mắn cũng có thể trở thành người đề xuất khối. Nếu chứng thực không được bao gồm vì người đề xuất khối đã bị thiếu, người đề xuất khối tiếp theo sẽ chọn chứng thực tổng hợp và bao gồm nó vào khối tiếp theo. Tuy nhiên, **độ trễ bao gồm** sẽ tăng thêm một.

## Đọc thêm {#further-reading}

- [Các chứng thực trong đặc tả đồng thuận có chú thích của Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Các chứng thực trên eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Các chứng thực trong đặc tả đồng thuận Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_
