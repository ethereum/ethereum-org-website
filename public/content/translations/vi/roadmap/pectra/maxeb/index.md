---
title: MaxEB
metaTitle: Pectra MaxEB
description: Tìm hiểu thêm về MaxEB trong bản phát hành Pectra
lang: vi
authors: ["Nixo"]
---

*Tóm tắt:* Phân nhánh cứng Pectra cho phép các trình xác thực Ethereum chọn tham gia vào số dư hiệu dụng tối đa cao hơn và tính lãi kép bằng cách chuyển đổi thông tin xác thực rút tiền từ **Loại 1** sang **Loại 2**. Công cụ chính thức để thực hiện việc này là Launchpad. Thao tác này không thể đảo ngược.

## Tổng quan {#overview}

### Ai bị ảnh hưởng? {#who-is-affected}

Bất kỳ ai chạy một trình xác thực - đây có thể là người biết chỉ số (ví dụ: [Trình xác thực #12345](https://beaconcha.in/validator/12345)) của một trình xác thực mà họ kiểm soát. Nếu bạn sử dụng một giao thức để chạy một trình xác thực (ví dụ: Lido CSM hoặc Rocket Pool), bạn sẽ phải kiểm tra với họ để xem liệu và khi nào họ hỗ trợ maxEB.

Nếu bạn đặt cọc bằng cách sử dụng token staking thanh khoản (LST) (ví dụ: rETH hoặc stETH), không có hành động nào được yêu cầu hoặc khuyến nghị.

### "maxEB" là gì? {#what-is-maxeb}

maxEB = Số dư hiệu dụng tối đa (MAXimum Effective Balance) của một trình xác thực. Cho đến phân nhánh cứng Pectra, mỗi trình xác thực kiếm được phần thưởng trên tối đa 32 ETH. Sau Pectra, các trình xác thực có tùy chọn kiếm phần thưởng trên bất kỳ số dư nào từ 32 đến 2048 ETH, với mức tăng dần 1 ETH bằng cách chọn tham gia vào thay đổi này.

### Làm thế nào để một trình xác thực chọn tham gia? {#how-does-a-validator-opt-in}

Một trình xác thực chọn tham gia vào thay đổi maxEB bằng cách chuyển đổi thông tin xác thực rút tiền từ **Loại 1** sang **Loại 2**. Việc này có thể được thực hiện trên [Launchpad (Hành động của trình xác thực)](https://launchpad.ethereum.org/validator-actions) sau khi phân nhánh cứng Pectra chính thức hoạt động. Giống như **Loại 0** → **Loại 1**, việc chuyển đổi từ **Loại 1** → **Loại 2** là một quá trình không thể đảo ngược.

### Thông tin xác thực rút tiền là gì? {#whats-a-withdrawal-credential}

Khi bạn chạy một trình xác thực, bạn có một bộ thông tin xác thực rút tiền. Bạn có thể tìm thấy chúng trong tệp json dữ liệu tiền gửi của mình hoặc bạn có thể xem chúng trên [tab tiền gửi](https://beaconcha.in/validator/12345#deposits) beaconcha.in của trình xác thực.

1. Thông tin xác thực rút tiền **Loại 0**: Nếu thông tin xác thực rút tiền của trình xác thực của bạn bắt đầu bằng `0x00...`, bạn đã gửi tiền trước phân nhánh cứng Shapella và chưa thiết lập địa chỉ rút tiền.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Thông tin xác thực rút tiền **Loại 1**: Nếu thông tin xác thực rút tiền của trình xác thực của bạn bắt đầu bằng `0x01...`, bạn đã gửi tiền sau phân nhánh cứng Shapella hoặc đã chuyển đổi thông tin xác thực **Loại 0** của mình sang thông tin xác thực **Loại 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Thông tin xác thực rút tiền **Loại 2**: Loại thông tin xác thực rút tiền mới này sẽ bắt đầu bằng `0x02...` và sẽ được kích hoạt sau Pectra. Các trình xác thực có thông tin xác thực rút tiền **Loại 2** đôi khi được gọi là "**trình xác thực lãi kép**"

| **Được phép** | **Không được phép** |
| --- | --- |
| ✅ Loại 0 → Loại 1 | ❌ Loại 0 → Loại 2 |
| ✅ Loại 1 → Loại 2 | ❌ Loại 1 → Loại 0 |
|  | ❌ Loại 2 → Loại 1 |
|  | ❌ Loại 2 → Loại 0 |

### Rủi ro {#risks}

MaxEB cho phép một trình xác thực gửi toàn bộ số dư của nó đến một trình xác thực khác. Người dùng gửi yêu cầu hợp nhất nên xác minh nguồn và nội dung của giao dịch mà họ đang ký. Công cụ chính thức để tận dụng các tính năng của maxEB là Launchpad. Nếu bạn quyết định sử dụng một công cụ của bên thứ ba, bạn nên xác minh rằng:

- Khóa công khai và địa chỉ rút tiền của trình xác thực nguồn khớp với trình xác thực mà họ kiểm soát
- Khóa công khai của trình xác thực đích là chính xác và thuộc về họ
- Yêu cầu là một chuyển đổi, không phải là một hợp nhất, nếu họ không có ý định gửi tiền đến một trình xác thực khác
- Giao dịch đang được ký bởi đúng địa chỉ rút tiền

Chúng tôi **đặc biệt khuyến nghị** thảo luận về bất kỳ công cụ của bên thứ ba nào bạn định sử dụng với [cộng đồng EthStaker](https://ethstaker.org/about). Đây là một nơi hữu ích để kiểm tra lại cách tiếp cận của bạn và tránh những sai lầm. Nếu bạn sử dụng một công cụ độc hại hoặc bị cấu hình sai, **toàn bộ số dư trình xác thực của bạn có thể được gửi đến một trình xác thực mà bạn không kiểm soát** — và không có cách nào để lấy lại.

## Chi tiết kỹ thuật {#technical-details}

### Luồng hoạt động {#the-flow}

Sẽ có hai cách sử dụng thao tác `ConsolidationRequest`:

1. Chuyển đổi một trình xác thực hiện có từ trình xác thực **Loại 1** sang **Loại 2**
2. Hợp nhất các trình xác thực khác vào một trình xác thực **Loại 2** hiện có

Trong quá trình chuyển đổi từ trình xác thực **Loại 1** sang **Loại 2**, cả *nguồn* và *đích* sẽ là trình xác thực mà bạn đang chuyển đổi. Thao tác này sẽ tốn Gas và sẽ được xếp hàng chờ sau các yêu cầu hợp nhất khác. Hàng đợi này **tách biệt** với hàng đợi tiền gửi và không bị ảnh hưởng bởi các khoản tiền gửi của trình xác thực mới và có thể được xem trên [pectrified.com](https://pectrified.com/).

Để hợp nhất các trình xác thực, bạn phải có một *trình xác thực đích* có thông tin xác thực rút tiền **Loại 2**. Đây là đích đến của bất kỳ số dư trình xác thực nào đang được hợp nhất và chỉ số được giữ nguyên.

### Yêu cầu để chuyển đổi sang Loại 2 {#requirements-for-converting-to-type-2}

Điều này sẽ được yêu cầu đối với trình xác thực đầu tiên bạn chuyển đổi sang **Loại 2**. Chỉ số của trình xác thực này được giữ nguyên và hoạt động. Đối với một chuyển đổi, *trình xác thực nguồn* == *trình xác thực đích.*

Trình xác thực phải...

- đang hoạt động
- có thông tin xác thực rút tiền **Loại 1**
- không ở trạng thái đang thoát (hoặc bị phạt cắt giảm)
- không có các khoản rút tiền được kích hoạt thủ công đang chờ xử lý (không áp dụng cho việc quét số dư)

![conversion illustration](./conversion.png)

### Yêu cầu để hợp nhất {#requirements-for-consolidating}

Đây là *cùng một thao tác* như chuyển đổi nhưng là khi *trình xác thực nguồn* khác với *trình xác thực đích*. Chỉ số của trình xác thực đích được giữ nguyên và chấp nhận số dư từ trình xác thực nguồn. Chỉ số của trình xác thực nguồn được đưa vào trạng thái `EXITED`.

Trong trường hợp này, trình xác thực nguồn có tất cả các yêu cầu tương tự như trên cộng thêm:

- đã hoạt động trong ít nhất ~27,3 giờ (một `SHARD_COMMITTEE_PERIOD`)

Trình xác thực đích phải

- có thông tin xác thực rút tiền **Loại 2**
- không ở trạng thái đang thoát.

![consolidation illustration](./consolidation.png)

### Yêu cầu hợp nhất {#the-consolidation-request}

Yêu cầu hợp nhất sẽ được ký bởi địa chỉ rút tiền được liên kết với trình xác thực nguồn và có:

1. Địa chỉ của trình xác thực nguồn (ví dụ: `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Khóa công khai của trình xác thực nguồn (ví dụ: `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Khóa công khai của trình xác thực đích đó

Trong một chuyển đổi, 2 & 3 sẽ giống nhau. Thao tác này có thể được thực hiện trên [Launchpad](https://launchpad.ethereum.org/).

### Yêu cầu về việc ký {#signing-requirements}

Để gửi một `ConsolidationRequest`, **địa chỉ rút tiền của trình xác thực nguồn** phải ký yêu cầu. Điều này chứng minh quyền kiểm soát đối với tiền của trình xác thực.

### Những gì được ký? {#what-is-signed}

Một [gốc ký (signing root)](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) được phân tách theo miền của đối tượng `ConsolidationRequest` được sử dụng.

- **Miền:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Các trường gốc ký:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

**Chữ ký BLS** kết quả được gửi cùng với yêu cầu.

Lưu ý: Việc ký được thực hiện bởi địa chỉ rút tiền, không phải khóa của trình xác thực.

### Rút tiền một phần {#partial-withdrawals}

Các trình xác thực có thông tin xác thực **Loại 1** được tự động quét số dư vượt mức của họ (bất kỳ khoản nào trên 32 ETH) mà không tốn Gas về địa chỉ rút tiền của họ. Bởi vì **Loại 2** cho phép một trình xác thực tính lãi kép số dư với mức tăng dần 1 ETH, nó sẽ không tự động quét số dư cho đến khi đạt 2048 ETH. Việc rút tiền một phần trên các trình xác thực **Loại 2** phải được kích hoạt thủ công và sẽ tốn Gas.

## Công cụ hợp nhất {#consolidation-tooling}

Có một số công cụ có sẵn để quản lý việc hợp nhất. Công cụ chính thức, được tạo bởi Tổ chức Ethereum, là [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Cũng có các công cụ của bên thứ ba được tạo bởi các thực thể từ cộng đồng đặt cọc có thể cung cấp các tính năng không được Launchpad cung cấp. Mặc dù các công cụ ở đây không được kiểm toán hoặc xác nhận bởi Tổ chức Ethereum, nhưng sau đây là các công cụ mã nguồn mở của các thành viên được biết đến trong cộng đồng.

| Công cụ | Trang web | Mã nguồn mở | Người tạo | Đã kiểm toán | Giao diện | Tính năng đáng chú ý |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Có, Apache 2.0 | [Pier Two](https://piertwo.com/) | Không | Giao diện web | WalletConnect, hoạt động với SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Có, MIT | [Luganodes](https://www.luganodes.com/) | Có, Quantstamp [Tháng 5 năm 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Dòng lệnh | Gom lô, cho nhiều trình xác thực cùng lúc |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Có, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Không | Dòng lệnh | Bộ tính năng đầy đủ để quản lý trình xác thực và nút |
| Siren | [GitHub](https://github.com/sigp/siren) | Có, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Không | Một số dòng lệnh, nhưng chủ yếu là giao diện web | Chỉ hoạt động nếu bạn đang sử dụng ứng dụng khách đồng thuận Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Có, giấy phép MIT | [Stakely](https://stakely.io/) | Không | Giao diện web, được lưu trữ bởi stakely và sẵn sàng để tự lưu trữ miễn phí| Hỗ trợ các kết nối ví chính bao gồm safe với WalletConnect |

## Câu hỏi thường gặp {#faq}

### Việc chọn tham gia có thay đổi may mắn đề xuất hoặc phần thưởng của tôi không? {#change-luck-or-rewards}

Không. Việc chọn tham gia không làm giảm cơ hội đề xuất của bạn - nhiệm vụ và việc lựa chọn đề xuất của bạn vẫn giữ nguyên. Ví dụ: nếu bạn có hai trình xác thực 32 ETH so với một trình xác thực 64 ETH, bạn sẽ có cùng tổng cơ hội được chọn để đề xuất một khối và kiếm phần thưởng.

### Việc chọn tham gia có thay đổi rủi ro bị phạt cắt giảm của tôi không? {#change-slashing-risk}

Đối với các nhà điều hành nhỏ hơn hoặc không chuyên nghiệp, câu trả lời ngắn gọn là không. Câu trả lời dài hơn là, đối với các nhà điều hành chuyên nghiệp chạy nhiều trình xác thực trên mỗi nút với cảnh báo nhanh, việc hợp nhất thành ít trình xác thực hơn có thể làm giảm khả năng phản ứng của họ đối với một khoản phạt cắt giảm và ngăn chặn các sự kiện xếp tầng. *Hình phạt* cắt giảm ban đầu cho tất cả các trình xác thực đã được giảm đáng kể từ 1 ETH (mỗi 32 ETH) xuống còn 0,0078125 ETH (mỗi 32 ETH) để bù đắp rủi ro này.

### Tôi có phải thoát trình xác thực của mình để chuyển đổi không? {#exit-validator}

Không. Bạn có thể chuyển đổi tại chỗ mà không cần thoát.

### Sẽ mất bao lâu để chuyển đổi / hợp nhất? {#how-long}

Tối thiểu 27,3 giờ nhưng việc hợp nhất cũng phải tuân theo một hàng đợi. Hàng đợi này độc lập với hàng đợi tiền gửi và rút tiền và không bị ảnh hưởng bởi chúng.

### Tôi có thể giữ chỉ số trình xác thực của mình không? {#keep-validator-index}

Có. Việc chuyển đổi tại chỗ giữ nguyên chỉ số trình xác thực. Nếu bạn hợp nhất nhiều trình xác thực, bạn sẽ chỉ có thể giữ lại chỉ số của *trình xác thực đích*.

### Tôi có bỏ lỡ các chứng thực không? {#miss-attestations}

Trong quá trình hợp nhất vào một trình xác thực khác, trình xác thực nguồn sẽ bị thoát và có một khoảng thời gian chờ ~27 giờ trước khi số dư hoạt động trên trình xác thực đích. Khoảng thời gian này **không ảnh hưởng đến các số liệu hiệu suất**.

### Tôi có phải chịu hình phạt không? {#incur-penalties}

Không. Miễn là trình xác thực của bạn trực tuyến, bạn sẽ không phải chịu hình phạt.

### Địa chỉ rút tiền của các trình xác thực đang được hợp nhất có phải khớp nhau không? {#withdrawal-addresses-match}

Không. Nhưng *nguồn* phải ủy quyền yêu cầu từ địa chỉ của chính nó.

### Phần thưởng của tôi có được tính lãi kép sau khi chuyển đổi không? {#rewards-compound}

Có. Với thông tin xác thực **Loại 2**, phần thưởng trên 32 ETH sẽ tự động được đặt cọc lại — nhưng không phải ngay lập tức. Do một bộ đệm nhỏ (được gọi là [*độ trễ (hysteresis)*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), số dư của bạn cần đạt **thêm khoảng 1,25 ETH** trước khi phần dư được đặt cọc lại. Vì vậy, thay vì tính lãi kép ở mức 33,0 ETH, nó xảy ra ở mức 33,25 (số dư hiệu dụng = 33 ETH), sau đó là 34,25 (số dư hiệu dụng = 34 ETH), v.v.

### Tôi có thể vẫn nhận được các lần quét tự động sau khi chuyển đổi không? {#automatic-sweep}

Các lần quét tự động sẽ chỉ xảy ra với số dư vượt mức trên 2048. Đối với tất cả các khoản rút tiền một phần khác, bạn sẽ cần phải kích hoạt chúng theo cách thủ công.

### Tôi có thể đổi ý và quay lại từ Loại 2 sang Loại 1 không? {#go-back-to-type1}

Không. Việc chuyển đổi sang **Loại 2** là không thể đảo ngược.

### Nếu tôi muốn hợp nhất nhiều trình xác thực, tôi có phải chuyển đổi từng cái sang Loại 2 trước không? {#consolidate-multiple-validators}

Không! Chuyển đổi một trình xác thực sang Loại 2 sau đó sử dụng nó làm đích. Tất cả các trình xác thực khác được hợp nhất vào đích Loại 2 đó có thể là Loại 1 hoặc Loại 2.

### Trình xác thực của tôi đang ngoại tuyến hoặc dưới 32 ETH - tôi vẫn có thể chuyển đổi nó chứ? {#offline-or-below-32eth}

Có. Miễn là nó đang hoạt động (chưa thoát) và bạn có thể ký bằng địa chỉ rút tiền của nó, bạn có thể chuyển đổi nó.

## Tài nguyên {#resources}

- [Thông số kỹ thuật đồng thuận Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Đây là phiên bản 'chân thực nhất' mà bạn nên dựa vào. Khi nghi ngờ, hãy đọc các thông số kỹ thuật.
- Không phải ai cũng thoải mái khi đọc mã, vì vậy [maxEB-GPT này](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) có thể giúp diễn giải các thông số kỹ thuật. *Tuyên bố miễn trừ trách nhiệm: Nên dựa vào các thông số kỹ thuật, không phải AI, như là sự thật, vì AI có thể diễn giải sai thông tin hoặc bịa đặt câu trả lời*
- [pectrified.com](https://pectrified.com/): Xem trạng thái của các khoản hợp nhất, tiền gửi và thời gian chờ của hàng đợi
- [Ethereal](https://github.com/wealdtech/ethereal): Công cụ CLI do cộng đồng tạo ra để quản lý các tác vụ phổ biến của trình xác thực
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Hợp đồng do cộng đồng tạo ra cho phép gửi tiền cho nhiều trình xác thực Ethereum trong một giao dịch duy nhất