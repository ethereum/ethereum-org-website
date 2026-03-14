---
title: "Các khóa trong Ethereum bằng chứng cổ phần"
description: "Giải thích về các khóa được sử dụng trong cơ chế đồng thuận bằng chứng cổ phần của Ethereum"
lang: vi
---

Ethereum bảo mật tài sản của người dùng bằng cách sử dụng mật mã hóa khóa công khai-riêng tư. Khóa công khai được sử dụng làm cơ sở cho một địa chỉ Ethereum—tức là nó hiển thị công khai và được sử dụng như một mã định danh duy nhất. Khóa riêng tư (hay khóa 'bí mật') chỉ nên được chủ tài khoản truy cập. Khóa riêng tư được sử dụng để 'ký' các giao dịch và dữ liệu để mật mã học có thể chứng minh rằng chủ sở hữu chấp thuận một hành động nào đó của một khóa riêng tư cụ thể.

Các khóa của Ethereum được tạo bằng [mật mã hóa đường cong elip](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Tuy nhiên, khi Ethereum chuyển từ [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow) sang [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos), một loại khóa mới đã được thêm vào Ethereum. Các khóa ban đầu vẫn hoạt động chính xác như trước—không có thay đổi nào đối với các khóa dựa trên đường cong elip bảo mật tài khoản. Tuy nhiên, người dùng cần một loại khóa mới để tham gia vào bằng chứng cổ phần bằng cách đặt cọc ETH và chạy trình xác thực. Nhu cầu này phát sinh từ những thách thức về khả năng mở rộng liên quan đến nhiều thông báo được truyền giữa một số lượng lớn trình xác thực, đòi hỏi một phương pháp mã hóa có thể dễ dàng tổng hợp để giảm lượng giao tiếp cần thiết cho mạng lưới đi đến đồng thuận.

Loại khóa mới này sử dụng lược đồ chữ ký [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS cho phép tổng hợp chữ ký rất hiệu quả nhưng cũng cho phép thiết kế ngược các khóa trình xác thực riêng lẻ được tổng hợp và lý tưởng cho việc quản lý các hành động giữa các trình xác thực.

## Hai loại khóa của trình xác thực {#two-types-of-keys}

Trước khi chuyển sang bằng chứng cổ phần, người dùng Ethereum chỉ có một khóa riêng tư dựa trên đường cong elip duy nhất để truy cập vào tiền của họ. Với sự ra đời của bằng chứng cổ phần, những người dùng muốn trở thành người đặt cọc đơn lẻ cũng cần có một **khóa trình xác thực** và một **khóa rút tiền**.

### Khóa trình xác thực {#validator-key}

Khóa ký của trình xác thực bao gồm hai yếu tố:

- Khóa **riêng tư** của trình xác thực
- Khóa **công khai** của trình xác thực

Mục đích của khóa riêng tư của trình xác thực là ký các hoạt động trên chuỗi như đề xuất khối và chứng thực. Vì vậy, các khóa này phải được giữ trong ví nóng.

Sự linh hoạt này có ưu điểm là di chuyển các khóa ký của trình xác thực rất nhanh từ thiết bị này sang thiết bị khác, tuy nhiên, nếu chúng bị mất hoặc bị đánh cắp, kẻ trộm có thể **hành động độc hại** theo một số cách:

- Khiến trình xác thực bị phạt cắt giảm bằng cách:
  - Trở thành người đề xuất và ký hai khối beacon khác nhau cho cùng một vị trí
  - Trở thành người chứng thực và ký một chứng thực "bao quanh" một chứng thực khác
  - Trở thành người chứng thực và ký hai chứng thực khác nhau có cùng mục tiêu
- Buộc thoát tự nguyện, điều này ngăn trình xác thực tham gia đặt cọc và cấp quyền truy cập vào số dư ETH của nó cho chủ sở hữu khóa rút tiền

**Khóa công khai của trình xác thực** được bao gồm trong dữ liệu giao dịch khi người dùng gửi ETH vào hợp đồng gửi tiền đặt cọc. Điều này được gọi là _dữ liệu gửi tiền_ và nó cho phép Ethereum xác định trình xác thực.

### Thông tin xác thực rút tiền {#withdrawal-credentials}

Mỗi trình xác thực có một thuộc tính được gọi là _thông tin xác thực rút tiền_. Byte đầu tiên của trường 32 byte này xác định loại tài khoản: `0x00` đại diện cho thông tin xác thực BLS ban đầu (trước Shapella, không thể rút), `0x01` đại diện cho thông tin xác thực cũ trỏ đến một địa chỉ thực thi và `0x02` đại diện cho loại thông tin xác thực gộp hiện đại.

Các trình xác thực có khóa BLS `0x00` phải cập nhật các thông tin xác thực này để trỏ đến một địa chỉ thực thi nhằm kích hoạt các khoản thanh toán số dư vượt mức hoặc rút toàn bộ tiền khỏi việc đặt cọc. Điều này có thể được thực hiện bằng cách cung cấp một địa chỉ thực thi trong dữ liệu gửi tiền trong quá trình tạo khóa ban đầu, _HOẶC_ bằng cách sử dụng khóa rút tiền sau đó để ký và phát một thông báo `BLSToExecutionChange`.

[Thông tin thêm về thông tin xác thực rút tiền của trình xác thực](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Khóa rút tiền {#withdrawal-key}

Khóa rút tiền sẽ được yêu cầu để cập nhật thông tin xác thực rút tiền nhằm trỏ đến một địa chỉ thực thi, nếu không được đặt trong lần gửi tiền ban đầu. Điều này sẽ cho phép các khoản thanh toán số dư vượt mức bắt đầu được xử lý và cũng sẽ cho phép người dùng rút toàn bộ ETH đã đặt cọc của họ.

Cũng giống như các khóa của trình xác thực, các khóa rút tiền cũng bao gồm hai thành phần:

- Khóa **riêng tư** rút tiền
- Khóa **công khai** rút tiền

Mất khóa này trước khi cập nhật thông tin xác thực rút tiền thành loại `0x01` đồng nghĩa với việc mất quyền truy cập vào số dư của trình xác thực. Trình xác thực vẫn có thể ký các chứng thực và các khối vì các hành động này yêu cầu khóa riêng tư của trình xác thực, tuy nhiên có rất ít hoặc không có động lực nếu khóa rút tiền bị mất.

Việc tách các khóa của trình xác thực khỏi các khóa tài khoản Ethereum cho phép một người dùng duy nhất chạy nhiều trình xác thực.

![sơ đồ khóa của trình xác thực](validator-key-schematic.png)

**Lưu ý**: Việc thoát khỏi nhiệm vụ đặt cọc và rút số dư của trình xác thực hiện tại yêu cầu ký một [thông báo thoát tự nguyện (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) bằng khóa của trình xác thực. Tuy nhiên, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) là một đề xuất sẽ cho phép người dùng kích hoạt việc thoát của trình xác thực và rút số dư của nó bằng cách ký các thông báo thoát bằng khóa rút tiền trong tương lai. Điều này sẽ giảm các giả định về sự tin cậy bằng cách cho phép những người đặt cọc ủy quyền ETH cho [các nhà cung cấp dịch vụ đặt cọc](/staking/saas/#what-is-staking-as-a-service) vẫn giữ quyền kiểm soát tiền của họ.

## Tạo khóa từ một cụm từ khởi tạo {#deriving-keys-from-seed}

Nếu cứ 32 ETH được đặt cọc lại yêu cầu một bộ 2 khóa hoàn toàn độc lập mới, việc quản lý khóa sẽ nhanh chóng trở nên khó khăn, đặc biệt là đối với những người dùng chạy nhiều trình xác thực. Thay vào đó, nhiều khóa trình xác thực có thể được tạo ra từ một bí mật chung duy nhất và việc lưu trữ bí mật duy nhất đó cho phép truy cập vào nhiều khóa trình xác thực.

[Các từ gợi nhớ](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) và các đường dẫn là những tính năng nổi bật mà người dùng thường gặp khi [họ truy cập](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ví của họ. Từ gợi nhớ là một chuỗi các từ hoạt động như một hạt giống ban đầu cho một khóa riêng tư. Khi được kết hợp với dữ liệu bổ sung, từ gợi nhớ sẽ tạo ra một hàm băm được gọi là 'khóa chính'. Điều này có thể được coi là gốc của một cây. Các nhánh từ gốc này sau đó có thể được tạo ra bằng cách sử dụng một đường dẫn phân cấp để các nút con có thể tồn tại dưới dạng sự kết hợp của hàm băm của nút cha và chỉ mục của chúng trong cây. Đọc về các tiêu chuẩn [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) và [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) để tạo khóa dựa trên từ gợi nhớ.

Các đường dẫn này có cấu trúc sau, sẽ quen thuộc với những người dùng đã tương tác với ví phần cứng:

```
m/44'/60'/0'/0`
```

Các dấu gạch chéo trong đường dẫn này phân tách các thành phần của khóa riêng tư như sau:

```
master_key / purpose / coin_type / account / change / address_index
```

Logic này cho phép người dùng đính kèm càng nhiều trình xác thực càng tốt vào một **cụm từ gợi nhớ** duy nhất vì gốc cây có thể là chung và sự khác biệt có thể xảy ra ở các nhánh. Người dùng có thể **tạo ra bất kỳ số lượng khóa nào** từ cụm từ gợi nhớ.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Mỗi nhánh được phân tách bằng dấu `/` vì vậy `m/2` có nghĩa là bắt đầu với khóa chính và đi theo nhánh 2. Trong sơ đồ bên dưới, một cụm từ gợi nhớ duy nhất được sử dụng để lưu trữ ba khóa rút tiền, mỗi khóa có hai trình xác thực được liên kết.

![logic khóa trình xác thực](multiple-keys.png)

## Đọc thêm {#further-reading}

- [Bài đăng trên blog của Ethereum Foundation bởi Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [Tạo khóa EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Lối thoát được kích hoạt bởi Lớp Thực thi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Quản lý khóa ở quy mô lớn](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
