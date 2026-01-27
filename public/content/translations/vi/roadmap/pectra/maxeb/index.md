---
title: Pectra MaxEB
description: Tìm hiểu thêm về MaxEB trong bản phát hành Pectra
lang: vi
---

# MaxEB {#maxeb}

_tóm tắt nhanh:_ Bản hard fork Pectra cho phép các trình xác thực Ethereum chọn tham gia vào số dư hiệu lực tối đa cao hơn và gộp lãi bằng cách chuyển đổi từ thông tin đăng nhập rút tiền **Loại 1** sang **Loại 2**. Công cụ chính thức để thực hiện việc này là Launchpad. Thao tác này không thể đảo ngược.

## Tổng quan {#overview}

### Ai là người bị ảnh hưởng? {#who-is-affected}

Bất kỳ ai chạy một trình xác thực - đây có thể là người biết chỉ số (ví dụ: [Trình xác thực #12345](https://beaconcha.in/validator/12345)) của một trình xác thực mà họ kiểm soát. Nếu bạn sử dụng một giao thức để chạy một trình xác thực (ví dụ: Lido CSM hoặc Rocket Pool), bạn sẽ phải kiểm tra với họ để xem liệu và khi nào họ hỗ trợ maxEB.

Nếu bạn stake bằng token stake lỏng (ví dụ: rETH hoặc stETH), không có hành động nào được yêu cầu hoặc khuyến nghị.

### "maxEB" là gì? {#what-is-maxeb}

maxEB = Số dư hiệu lực tối đa của một trình xác thực. Cho đến trước hard fork Pectra, mỗi trình xác thực kiếm được trên tối đa 32 ETH. Sau Pectra, các trình xác thực có tùy chọn kiếm tiền trên bất kỳ số dư nào trong khoảng từ 32 đến 2048 ETH, với gia số 1 ETH, bằng cách chọn tham gia thay đổi.

### Trình xác thực chọn tham gia bằng cách nào? {#how-does-a-validator-opt-in}

Một trình xác thực chọn tham gia thay đổi maxEB bằng cách chuyển đổi từ thông tin đăng nhập rút tiền **Loại 1** sang **Loại 2**. Điều này có thể được thực hiện trên [Launchpad (Hành động của Trình xác thực)](https://launchpad.ethereum.org/validator-actions) sau khi hard fork Pectra đi vào hoạt động. Cũng như với **Loại 0** → **Loại 1**, việc chuyển đổi từ **Loại 1** → **Loại 2** là một quá trình không thể đảo ngược.

### Thông tin đăng nhập rút tiền là gì? {#whats-a-withdrawal-credential}

Khi bạn chạy một trình xác thực, bạn có một bộ thông tin đăng nhập rút tiền. Bạn có thể tìm thấy chúng trong tệp json dữ liệu tiền gửi của mình hoặc bạn có thể xem chúng trên [tab tiền gửi](https://beaconcha.in/validator/12345#deposits) của beaconcha.in của trình xác thực của bạn.

1. Thông tin đăng nhập rút tiền **Loại 0**: Nếu thông tin đăng nhập rút tiền của trình xác thực của bạn bắt đầu bằng `0x00...`, bạn đã ký gửi trước hard fork Shapella và chưa đặt địa chỉ rút tiền.

![Thông tin đăng nhập rút tiền Loại 0](./0x00-wd.png)

2. Thông tin đăng nhập rút tiền **Loại 1**: Nếu thông tin đăng nhập rút tiền của trình xác thực của bạn bắt đầu bằng `0x01...`, bạn đã ký gửi sau hard fork Shapella hoặc đã chuyển đổi thông tin đăng nhập **Loại 0** của bạn thành thông tin đăng nhập **Loại 1**.

![Thông tin đăng nhập rút tiền Loại 1](./0x01-wd.png)

3. Thông tin đăng nhập rút tiền **Loại 2**: Loại thông tin đăng nhập rút tiền mới này sẽ bắt đầu bằng `0x02...` và sẽ được kích hoạt sau Pectra. Các trình xác thực có thông tin đăng nhập rút tiền **Loại 2** đôi khi được gọi là "**trình xác thực gộp lãi**"

| **Được phép**     | **Không được phép** |
| ----------------- | ------------------- |
| ✅ Loại 0 → Loại 1 | ❌ Loại 0 → Loại 2   |
| ✅ Loại 1 → Loại 2 | ❌ Loại 1 → Loại 0   |
|                   | ❌ Loại 2 → Loại 1   |
|                   | ❌ Loại 2 → Loại 0   |

### Rủi ro {#risks}

MaxEB cho phép một trình xác thực gửi toàn bộ số dư của nó cho một trình xác thực khác. Người dùng gửi yêu cầu hợp nhất nên xác minh nguồn và nội dung của giao dịch mà họ đang ký. Công cụ chính thức để tận dụng các tính năng maxEB là Launchpad. Nếu bạn quyết định sử dụng một công cụ của bên thứ ba, bạn nên xác minh rằng:

- Khóa công khai và địa chỉ rút tiền của trình xác thực nguồn khớp với trình xác thực mà họ kiểm soát
- Khóa công khai của trình xác thực mục tiêu là chính xác và thuộc về họ
- Yêu cầu là một yêu cầu chuyển đổi, không phải là một yêu cầu hợp nhất, nếu họ không có ý định gửi tiền cho một trình xác thực khác
- Giao dịch đang được ký bởi địa chỉ rút tiền chính xác

Chúng tôi **khuyến nghị mạnh mẽ** thảo luận về bất kỳ công cụ của bên thứ ba nào bạn dự định sử dụng với [cộng đồng EthStaker](https://ethstaker.org/about). Đó là một nơi hữu ích để kiểm tra lại cách tiếp cận của bạn và tránh những sai lầm. Nếu bạn sử dụng một công cụ độc hại hoặc được cấu hình sai, **toàn bộ số dư trình xác thực của bạn có thể được gửi đến một trình xác thực mà bạn không kiểm soát** — không có cách nào để lấy lại.

## Chi tiết kỹ thuật {#technical-details}

### Luồng {#the-flow}

Sẽ có hai cách sử dụng thao tác `ConsolidationRequest`:

1. Chuyển đổi một trình xác thực hiện có từ trình xác thực **Loại 1** sang **Loại 2**
2. Hợp nhất các trình xác thực khác vào một trình xác thực **Loại 2** hiện có

Trong một chuyển đổi từ trình xác thực **Loại 1** sang **Loại 2**, cả _nguồn_ và _đích_ đều sẽ là trình xác thực mà bạn đang chuyển đổi. Thao tác sẽ tốn gas và sẽ được đưa vào hàng đợi sau các yêu cầu hợp nhất khác. Hàng đợi này **tách biệt** với hàng đợi ký gửi và không bị ảnh hưởng bởi các khoản ký gửi của trình xác thực mới và có thể được xem trên [pectrified.com](https://pectrified.com/).

Để hợp nhất các trình xác thực, bạn phải có một _trình xác thực mục tiêu_ có thông tin đăng nhập rút tiền **Loại 2**. Đây là đích đến của bất kỳ số dư trình xác thực nào đang được hợp nhất, và là chỉ số được bảo tồn.

### Yêu cầu để chuyển đổi sang Loại 2 {#requirements-for-converting-to-type-2}

Điều này sẽ được yêu cầu cho trình xác thực đầu tiên bạn chuyển đổi sang **Loại 2**. Chỉ số của trình xác thực này được bảo tồn và hoạt động. Đối với một chuyển đổi, _trình xác thực nguồn_ == _trình xác thực mục tiêu._

Trình xác thực phải...

- đang hoạt động
- có thông tin đăng nhập rút tiền **Loại 1**
- không ở trong trạng thái thoát (hoặc bị phạt slashing)
- không có các lần rút tiền đang chờ xử lý được kích hoạt thủ công (không áp dụng cho các lần quét)

![minh họa chuyển đổi](./conversion.png)

### Yêu cầu để hợp nhất {#requirements-for-consolidating}

Đây là _thao tác tương tự_ như chuyển đổi nhưng là khi _trình xác thực nguồn_ khác với _trình xác thực mục tiêu_. Chỉ số của trình xác thực mục tiêu được bảo tồn và chấp nhận số dư từ trình xác thực nguồn. Chỉ số của trình xác thực nguồn được đưa vào trạng thái `EXITED`.

Trong trường hợp này, trình xác thực nguồn có tất cả các yêu cầu tương tự như trên cộng với:

- đã hoạt động trong ít nhất ~27,3 giờ (một `SHARD_COMMITTEE_PERIOD`)

Trình xác thực mục tiêu phải

- có thông tin đăng nhập rút tiền **Loại 2**
- không ở trong trạng thái thoát.

![minh họa hợp nhất](./consolidation.png)

### Yêu cầu hợp nhất {#the-consolidation-request}

Yêu cầu hợp nhất sẽ được ký bởi địa chỉ rút tiền được liên kết với trình xác thực nguồn và có:

1. Địa chỉ của trình xác thực nguồn (ví dụ: `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Khóa công khai của trình xác thực nguồn (ví dụ: `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Khóa công khai của trình xác thực mục tiêu đó

Trong một chuyển đổi, 2 & 3 sẽ giống nhau. Thao tác này có thể được thực hiện trên [Launchpad](https://launchpad.ethereum.org/).

### Yêu cầu ký {#signing-requirements}

Để gửi `ConsolidationRequest`, **địa chỉ rút tiền của trình xác thực nguồn** phải ký yêu cầu. Điều này chứng tỏ quyền kiểm soát đối với quỹ của trình xác thực.

### Cái gì được ký? {#what-is-signed}

Một [signing root](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) được phân tách theo miền của đối tượng `ConsolidationRequest` được sử dụng.

- **Miền:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Các trường signing root:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

**Chữ ký BLS** kết quả được gửi cùng với yêu cầu.

Lưu ý: Việc ký được thực hiện bởi địa chỉ rút tiền, không phải khóa của trình xác thực.

### Rút tiền một phần {#partial-withdrawals}

Các trình xác thực có thông tin đăng nhập **Loại 1** sẽ được quét tự động, không tốn gas số dư dư thừa của họ (bất cứ thứ gì trên 32 ETH) vào địa chỉ rút tiền của họ. Bởi vì **Loại 2** cho phép một trình xác thực gộp số dư theo gia số 1 ETH, nó sẽ không tự động quét số dư cho đến khi đạt 2048 ETH. Việc rút tiền một phần trên các trình xác thực **Loại 2** phải được kích hoạt thủ công và sẽ tốn gas.

## Bộ công cụ hợp nhất {#consolidation-tooling}

Có một số công cụ có sẵn để quản lý việc hợp nhất. Công cụ chính thức, do Ethereum Foundation tạo ra, là [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Ngoài ra còn có các công cụ của bên thứ ba do các thực thể từ cộng đồng stake tạo ra có thể cung cấp các tính năng không được cung cấp bởi Launchpad. Mặc dù các công cụ ở đây không được Ethereum Foundation kiểm toán hoặc xác nhận, nhưng sau đây là các công cụ mã nguồn mở của các thành viên được biết đến trong cộng đồng.

| Công cụ                         | Trang web                                                                                                 | Mã nguồn mở                    | Người tạo                                      | Đã kiểm toán                                                                                                                                               | Giao diện                                                                             | Các tính năng đáng chú ý                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Pectra Staking Manager          | pectrastaking.com                                                                         | Có, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Không                                                                                                                                                      | Giao diện người dùng web                                                              | Wallet Connect, hoạt động với SAFE                                 |
| Pectra Validator Ops CLI Tool   | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Có, MIT                        | [Luganodes](https://www.luganodes.com/)        | Có, Quantstamp [tháng 5 năm 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Dòng lệnh                                                                             | Xử lý hàng loạt, cho nhiều trình xác thực cùng một lúc             |
| Ethereal                        | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Có, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Không                                                                                                                                                      | Dòng lệnh                                                                             | Bộ tính năng đầy đủ để quản lý trình xác thực và nút               |
| Siren                           | [GitHub](https://github.com/sigp/siren)                                                                   | Có, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Không                                                                                                                                                      | Một số dòng lệnh, nhưng chủ yếu là giao diện người dùng web                           | Chỉ hoạt động nếu bạn đang sử dụng máy khách đồng thuận Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Có, giấy phép MIT              | [Stakely](https://stakely.io/)                 | Không                                                                                                                                                      | Giao diện người dùng web, được lưu trữ bởi stakely và sẵn sàng để tự lưu trữ miễn phí | Hỗ trợ các kết nối ví chính bao gồm safe với walletconnect         |

## Câu hỏi thường gặp {#faq}

### Việc chọn tham gia có làm thay đổi vận may đề xuất hoặc phần thưởng của tôi không? {#change-luck-or-rewards}

Không. Chọn tham gia không làm giảm cơ hội đề xuất của bạn - nhiệm vụ và lựa chọn đề xuất của bạn vẫn giữ nguyên. Ví dụ: nếu bạn có hai trình xác thực 32 ETH so với một trình xác thực 64 ETH, bạn sẽ có cùng tổng cơ hội được chọn để đề xuất một khối và kiếm phần thưởng.

### Việc chọn tham gia có làm thay đổi rủi ro bị phạt slashing của tôi không? {#change-slashing-risk}

Đối với các nhà khai thác nhỏ hơn hoặc không chuyên nghiệp, câu trả lời ngắn gọn là không. Câu trả lời dài hơn là, đối với các nhà khai thác chuyên nghiệp chạy nhiều trình xác thực trên mỗi nút với cảnh báo nhanh, việc hợp nhất thành ít trình xác thực hơn có thể làm giảm khả năng phản ứng của họ với một vụ phạt slashing và ngăn chặn các sự kiện xếp tầng. _Hình phạt_ slashing ban đầu cho tất cả các trình xác thực đã được giảm đáng kể từ 1 ETH (trên 32 ETH) xuống còn 0,0078125 ETH (trên 32 ETH) để bù đắp cho rủi ro này.

### Tôi có phải thoát trình xác thực của mình để chuyển đổi không? {#exit-validator}

Không. Bạn có thể chuyển đổi tại chỗ mà không cần thoát.

### Sẽ mất bao lâu để chuyển đổi / hợp nhất? {#how-long}

Tối thiểu là 27,3 giờ nhưng việc hợp nhất cũng phải tuân theo một hàng đợi. Hàng đợi này độc lập với hàng đợi ký gửi và rút tiền và không bị ảnh hưởng bởi chúng.

### Tôi có thể giữ chỉ số trình xác thực của mình không? {#keep-validator-index}

Đúng vậy. Chuyển đổi tại chỗ giữ nguyên chỉ số trình xác thực. Nếu bạn hợp nhất nhiều trình xác thực, bạn sẽ chỉ có thể giữ chỉ số của _trình xác thực mục tiêu_.

### Tôi có bỏ lỡ các chứng thực không? {#miss-attestations}

Trong quá trình hợp nhất vào một trình xác thực khác, trình xác thực nguồn sẽ thoát ra và có khoảng thời gian chờ ~27 giờ trước khi số dư hoạt động trên trình xác thực mục tiêu. Khoảng thời gian này **không ảnh hưởng đến các chỉ số hiệu suất**.

### Tôi có bị phạt không? {#incur-penalties}

Không. Miễn là trình xác thực của bạn trực tuyến, bạn sẽ không bị phạt.

### Địa chỉ rút tiền của các trình xác thực đang được hợp nhất có phải khớp nhau không? {#withdrawal-addresses-match}

Không. Nhưng _nguồn_ phải ủy quyền cho yêu cầu từ địa chỉ của chính nó.

### Phần thưởng của tôi có được gộp lại sau khi chuyển đổi không? {#rewards-compound}

Đúng vậy. Với thông tin đăng nhập **Loại 2**, phần thưởng trên 32 ETH sẽ tự động được stake lại — nhưng không phải ngay lập tức. Do có một vùng đệm nhỏ (được gọi là [_hysteresis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), số dư của bạn cần đạt **thêm khoảng 1,25 ETH** trước khi phần dư được stake lại. Vì vậy, thay vì gộp lãi ở 33,0 ETH, nó xảy ra ở 33,25 (số dư hiệu lực = 33 ETH), sau đó là 34,25 (số dư hiệu lực = 34 ETH), v.v.

### Tôi có thể tiếp tục nhận được các lần quét tự động sau khi chuyển đổi không? {#automatic-sweep}

Quét tự động sẽ chỉ xảy ra với số dư vượt quá 2048. Đối với tất cả các lần rút tiền một phần khác, bạn sẽ cần phải kích hoạt chúng theo cách thủ công.

### Tôi có thể thay đổi quyết định và quay lại từ Loại 2 sang Loại 1 không? {#go-back-to-type1}

Không. Việc chuyển đổi sang **Loại 2** là không thể đảo ngược.

### Nếu tôi muốn hợp nhất nhiều trình xác thực, tôi có phải chuyển đổi từng trình xác thực sang Loại 2 trước không? {#consolidate-multiple-validators}

Không! Chuyển đổi một trình xác thực sang Loại 2 sau đó sử dụng nó làm mục tiêu. Tất cả các trình xác thực khác được hợp nhất vào mục tiêu Loại 2 đó có thể là Loại 1 hoặc Loại 2

### Trình xác thực của tôi đang ngoại tuyến hoặc dưới 32 ETH - tôi vẫn có thể chuyển đổi nó chứ? {#offline-or-below-32eth}

Đúng vậy. Miễn là nó đang hoạt động (chưa thoát) và bạn có thể ký bằng địa chỉ rút tiền của nó, bạn có thể chuyển đổi nó.

## Tài nguyên {#resources}

- [Thông số kỹ thuật đồng thuận Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Đây là phiên bản 'chân thực nhất' mà bạn nên dựa vào. Khi nghi ngờ, hãy đọc thông số kỹ thuật
- Không phải ai cũng cảm thấy thoải mái khi xem qua mã, vì vậy [maxEB-GPT này](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-GPT) có thể giúp diễn giải các thông số kỹ thuật. _Tuyên bố miễn trừ trách nhiệm: Các thông số kỹ thuật, không phải AI, nên được coi là sự thật, vì AI có thể diễn giải sai thông tin hoặc tạo ra các câu trả lời ảo_
- [pectrified.com](https://pectrified.com/): Xem trạng thái hợp nhất, tiền gửi và thời gian chờ của hàng đợi
- [Ethereal](https://github.com/wealdtech/ethereal): Công cụ CLI do cộng đồng tạo ra để quản lý các tác vụ trình xác thực thông thường
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Hợp đồng do cộng đồng tạo ra cho phép nhiều trình xác thực Ethereum được ký gửi trong một giao dịch duy nhất
