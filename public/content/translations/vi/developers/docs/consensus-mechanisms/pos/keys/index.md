---
title: Các khóa trong Bằng chứng cổ phần (PoS) của Ethereum
description: Giải thích về các khóa được sử dụng trong cơ chế đồng thuận Bằng chứng cổ phần (PoS) của Ethereum
lang: vi
---

Ethereum bảo vệ tài sản của người dùng bằng mật mã học khóa công khai-khóa riêng tư. Khóa công khai được sử dụng làm cơ sở cho một địa chỉ Ethereum—nghĩa là nó hiển thị với công chúng và được sử dụng như một định danh duy nhất. Khóa riêng tư (hoặc khóa 'bí mật') chỉ nên được truy cập bởi chủ sở hữu tài khoản. Khóa riêng tư được sử dụng cho việc ký các giao dịch và dữ liệu để mật mã học có thể chứng minh rằng người nắm giữ chấp thuận một hành động nào đó của một khóa riêng tư cụ thể.

Các khóa của Ethereum được tạo ra bằng cách sử dụng [mật mã học đường cong elliptic (elliptic-curve cryptography)](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Tuy nhiên, khi Ethereum chuyển từ [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow) sang [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos), một loại khóa mới đã được thêm vào Ethereum. Các khóa ban đầu vẫn hoạt động y như trước—không có thay đổi nào đối với các khóa dựa trên đường cong elliptic bảo vệ các tài khoản. Tuy nhiên, người dùng cần một loại khóa mới để tham gia vào Bằng chứng cổ phần (PoS) bằng việc đặt cọc ETH và chạy các trình xác thực. Nhu cầu này phát sinh từ những thách thức về khả năng mở rộng liên quan đến nhiều thông điệp được truyền giữa số lượng lớn các trình xác thực, yêu cầu một phương pháp mật mã học có thể dễ dàng được tổng hợp để giảm lượng giao tiếp cần thiết cho mạng lưới đạt được đồng thuận.

Loại khóa mới này sử dụng [lược đồ chữ ký **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS cho phép tổng hợp các chữ ký rất hiệu quả nhưng cũng cho phép dịch ngược các khóa trình xác thực cá nhân đã được tổng hợp và rất lý tưởng để quản lý các hành động giữa các trình xác thực.

## Hai loại khóa trình xác thực {#two-types-of-keys}

Trước khi chuyển sang Bằng chứng cổ phần (PoS), người dùng Ethereum chỉ có một khóa riêng tư duy nhất dựa trên đường cong elliptic để truy cập vào tiền của họ. Với sự ra đời của Bằng chứng cổ phần (PoS), những người dùng muốn trở thành người đặt cọc độc lập (solo staker) cũng yêu cầu một **khóa trình xác thực** và một **khóa rút tiền**.

### Khóa trình xác thực {#validator-key}

Khóa ký của trình xác thực bao gồm hai yếu tố:

- Khóa **riêng tư** của trình xác thực
- Khóa **công khai** của trình xác thực

Mục đích của khóa riêng tư của trình xác thực là cho việc ký các hoạt động trên chuỗi như các đề xuất khối và chứng thực. Vì lý do này, các khóa này phải được giữ trong một ví nóng.

Sự linh hoạt này có lợi thế là di chuyển các khóa ký của trình xác thực rất nhanh từ thiết bị này sang thiết bị khác, tuy nhiên, nếu chúng bị mất hoặc bị đánh cắp, kẻ trộm có thể **hành động ác ý** theo một vài cách:

- Làm cho trình xác thực bị phạt cắt giảm bằng cách:
  - Trở thành người đề xuất và ký hai khối beacon khác nhau cho cùng một khe
  - Trở thành người chứng thực và ký một chứng thực "bao quanh" một chứng thực khác
  - Trở thành người chứng thực và ký hai chứng thực khác nhau có cùng mục tiêu
- Buộc một lối thoát tự nguyện, điều này ngăn trình xác thực tiếp tục việc đặt cọc và cấp quyền truy cập vào số dư ETH của nó cho chủ sở hữu khóa rút tiền

**Khóa công khai của trình xác thực** được bao gồm trong dữ liệu giao dịch khi người dùng gửi ETH vào hợp đồng khoản tiền đặt cọc. Điều này được gọi là _dữ liệu tiền gửi_ và nó cho phép Ethereum xác định trình xác thực.

### Thông tin xác thực rút tiền {#withdrawal-credentials}

Mỗi trình xác thực có một thuộc tính được gọi là _thông tin xác thực rút tiền_. Byte đầu tiên của trường 32-byte này xác định loại tài khoản: `0x00` đại diện cho thông tin xác thực BLS ban đầu (trước Shapella, không thể rút tiền), `0x01` đại diện cho thông tin xác thực cũ trỏ đến một địa chỉ lớp thực thi và `0x02` đại diện cho loại thông tin xác thực gộp hiện đại.

Các trình xác thực có khóa BLS `0x00` phải cập nhật các thông tin xác thực này để trỏ đến một địa chỉ lớp thực thi nhằm kích hoạt các khoản thanh toán số dư vượt mức hoặc rút tiền toàn bộ khỏi việc đặt cọc. Điều này có thể được thực hiện bằng cách cung cấp một địa chỉ lớp thực thi trong dữ liệu tiền gửi trong quá trình tạo khóa ban đầu, _HOẶC_ bằng cách sử dụng khóa rút tiền vào thời điểm sau đó cho việc ký và phát sóng một thông điệp `BLSToExecutionChange`.

[Tìm hiểu thêm về thông tin xác thực rút tiền của trình xác thực](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Khóa rút tiền {#withdrawal-key}

Khóa rút tiền sẽ được yêu cầu để cập nhật thông tin xác thực rút tiền trỏ đến một địa chỉ lớp thực thi, nếu chưa được thiết lập trong lần gửi tiền ban đầu. Điều này sẽ cho phép các khoản thanh toán số dư vượt mức bắt đầu được xử lý và cũng sẽ cho phép người dùng rút tiền toàn bộ số ETH đã đặt cọc của họ.

Giống như các khóa trình xác thực, các khóa rút tiền cũng bao gồm hai thành phần:

- Khóa **riêng tư** rút tiền
- Khóa **công khai** rút tiền

Việc mất khóa này trước khi cập nhật thông tin xác thực rút tiền sang loại `0x01` đồng nghĩa với việc mất quyền truy cập vào số dư của trình xác thực. Trình xác thực vẫn có thể ký các chứng thực và các khối vì những hành động này yêu cầu khóa riêng tư của trình xác thực, tuy nhiên sẽ có rất ít hoặc không có động lực nào nếu các khóa rút tiền bị mất.

Việc tách biệt các khóa trình xác thực khỏi các khóa tài khoản Ethereum cho phép một người dùng duy nhất chạy nhiều trình xác thực.

![validator key schematic](validator-key-schematic.png)

**Lưu ý**: Việc thoát khỏi các nhiệm vụ đặt cọc và rút tiền số dư của một trình xác thực hiện tại yêu cầu việc ký một [thông điệp thoát tự nguyện (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) bằng khóa trình xác thực. Tuy nhiên, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) là một đề xuất sẽ cho phép người dùng kích hoạt việc thoát của một trình xác thực và rút tiền số dư của nó bằng việc ký các thông điệp thoát bằng khóa rút tiền trong tương lai. Điều này sẽ giảm bớt các giả định tin cậy bằng cách cho phép những người đặt cọc ủy quyền ETH cho [các nhà cung cấp dịch vụ đặt cọc (staking-as-a-service)](/staking/saas/#what-is-staking-as-a-service) vẫn giữ được quyền kiểm soát tiền của họ.

## Tạo các khóa từ một cụm từ hạt giống {#deriving-keys-from-seed}

Nếu mỗi 32 ETH được đặt cọc yêu cầu một bộ 2 khóa hoàn toàn độc lập mới, việc quản lý khóa sẽ nhanh chóng trở nên cồng kềnh, đặc biệt đối với những người dùng chạy nhiều trình xác thực. Thay vào đó, nhiều khóa trình xác thực có thể được tạo ra từ một bí mật chung duy nhất và việc lưu trữ bí mật duy nhất đó cho phép truy cập vào nhiều khóa trình xác thực.

[Cụm từ gợi nhớ (Mnemonic)](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) và các đường dẫn là những tính năng nổi bật mà người dùng thường gặp khi [họ truy cập](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) vào ví của mình. Cụm từ gợi nhớ là một chuỗi các từ đóng vai trò như một hạt giống ban đầu cho một khóa riêng tư. Khi được kết hợp với dữ liệu bổ sung, cụm từ gợi nhớ tạo ra một mã băm được gọi là 'khóa chính' (master key). Điều này có thể được coi như gốc của một cái cây. Các nhánh từ gốc này sau đó có thể được tạo ra bằng cách sử dụng một đường dẫn phân cấp để các nút con có thể tồn tại dưới dạng sự kết hợp giữa mã băm của nút cha và chỉ số của chúng trong cây. Đọc về các tiêu chuẩn [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) và [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) cho việc tạo khóa dựa trên cụm từ gợi nhớ.

Các đường dẫn này có cấu trúc như sau, điều này sẽ quen thuộc với những người dùng đã tương tác với các ví cứng:

```
m/44'/60'/0'/0`
```

Các dấu gạch chéo trong đường dẫn này phân tách các thành phần của khóa riêng tư như sau:

```
master_key / purpose / coin_type / account / change / address_index
```

Logic này cho phép người dùng gắn càng nhiều trình xác thực càng tốt vào một **cụm từ gợi nhớ** duy nhất vì gốc cây có thể là chung và sự khác biệt có thể xảy ra ở các nhánh. Người dùng có thể **tạo ra bất kỳ số lượng khóa nào** từ cụm từ gợi nhớ.

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Mỗi nhánh được phân tách bằng một `/` vì vậy `m/2` có nghĩa là bắt đầu với khóa chính và đi theo nhánh 2. Trong sơ đồ bên dưới, một cụm từ gợi nhớ duy nhất được sử dụng để lưu trữ ba khóa rút tiền, mỗi khóa có hai trình xác thực được liên kết.

![validator key logic](multiple-keys.png)

## Đọc thêm {#further-reading}

- [Bài đăng trên blog của Tổ chức Ethereum bởi Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [Tạo khóa EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Các lối thoát được kích hoạt bởi lớp thực thi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Quản lý khóa ở quy mô lớn](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)