---
title: "Các khóa trong Bằng chứng cổ phần (PoS) của Ethereum"
description: "Giải thích về các khóa được sử dụng trong cơ chế đồng thuận Bằng chứng cổ phần (PoS) của Ethereum"
lang: vi
---

Ethereum bảo mật tài sản của người dùng bằng cách sử dụng mật mã học khóa công khai-riêng tư. Khóa công khai được sử dụng làm cơ sở cho một địa chỉ Ethereum—nghĩa là nó hiển thị với công chúng và được sử dụng như một định danh duy nhất. Khóa riêng tư (hoặc 'bí mật') chỉ nên được truy cập bởi chủ sở hữu tài khoản. Khóa riêng tư được sử dụng để 'ký' các giao dịch và dữ liệu để mật mã học có thể chứng minh rằng người nắm giữ chấp thuận một hành động nào đó của một khóa riêng tư cụ thể.

Các khóa của Ethereum được tạo ra bằng cách sử dụng [mật mã học đường cong elliptic](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Tuy nhiên, khi Ethereum chuyển từ [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow) sang [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos), một loại khóa mới đã được thêm vào Ethereum. Các khóa ban đầu vẫn hoạt động y như trước—không có thay đổi nào đối với các khóa dựa trên đường cong elliptic bảo mật các tài khoản. Tuy nhiên, người dùng cần một loại khóa mới để tham gia vào Bằng chứng cổ phần (PoS) bằng cách đặt cọc ETH và chạy các trình xác thực. Nhu cầu này phát sinh từ những thách thức về khả năng mở rộng liên quan đến nhiều thông điệp được truyền giữa số lượng lớn các trình xác thực, đòi hỏi một phương pháp mật mã học có thể dễ dàng được tổng hợp để giảm lượng giao tiếp cần thiết cho mạng lưới đạt được sự đồng thuận.

Loại khóa mới này sử dụng [lược đồ chữ ký **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). Các chữ ký BLS từ nhiều trình xác thực có thể được tổng hợp thành một chữ ký duy nhất được xác minh trong một lần kiểm tra, điều này giúp giữ cho các thông điệp đồng thuận nhỏ gọn. BLS không an toàn trước lượng tử, vì vậy [lộ trình hậu lượng tử](/roadmap/security/quantum-resistance/) có kế hoạch thay thế các khóa BLS của trình xác thực bằng các khóa dựa trên mã băm.

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

Mỗi trình xác thực có một thuộc tính được gọi là _thông tin xác thực rút tiền_. Byte đầu tiên của trường 32 byte này xác định loại tài khoản: `0x00` đại diện cho thông tin xác thực BLS cũ (trước Shapella, không thể rút tiền), `0x01` đại diện cho thông tin xác thực cũ trỏ đến một địa chỉ thực thi và `0x02` đại diện cho loại thông tin xác thực gộp hiện đại.

Các trình xác thực có khóa BLS `0x00` phải cập nhật các thông tin xác thực này để trỏ đến một địa chỉ thực thi nhằm kích hoạt các khoản thanh toán số dư vượt mức hoặc rút tiền toàn bộ khỏi việc đặt cọc. Điều này có thể được thực hiện bằng cách cung cấp một địa chỉ thực thi trong dữ liệu tiền gửi trong quá trình tạo khóa ban đầu, _HOẶC_ bằng cách sử dụng khóa rút tiền vào một thời điểm sau đó để ký và phát sóng một thông điệp `BLSToExecutionChange`. Các đề xuất nhằm loại bỏ dần thông tin xác thực `0x00` trước quá trình chuyển đổi hậu lượng tử đang được thảo luận, vì vậy các trình xác thực vẫn đang ở `0x00` nên chuyển đổi ngay bây giờ.

[Tìm hiểu thêm về thông tin xác thực rút tiền của trình xác thực](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Khóa rút tiền {#withdrawal-key}

Khóa rút tiền sẽ được yêu cầu để cập nhật thông tin xác thực rút tiền trỏ đến một địa chỉ thực thi, nếu chưa được thiết lập trong lần gửi tiền ban đầu. Điều này sẽ cho phép các khoản thanh toán số dư vượt mức bắt đầu được xử lý và cũng sẽ cho phép người dùng rút toàn bộ số ETH đã đặt cọc của họ.

Giống như các khóa trình xác thực, các khóa rút tiền cũng bao gồm hai thành phần:

- Khóa **riêng tư** rút tiền
- Khóa **công khai** rút tiền

Việc mất khóa này trước khi cập nhật thông tin xác thực rút tiền sang loại `0x01` đồng nghĩa với việc mất quyền truy cập vào số dư của trình xác thực. Trình xác thực vẫn có thể ký các chứng thực và khối vì những hành động này yêu cầu khóa riêng tư của trình xác thực, tuy nhiên sẽ có rất ít hoặc không có động lực nào nếu các khóa rút tiền bị mất.

Việc tách biệt các khóa trình xác thực khỏi các khóa tài khoản Ethereum cho phép một người dùng chạy nhiều trình xác thực. Với thông tin xác thực `0x02`, một trình xác thực có thể giữ tới 2.048 ETH, vì vậy một khoản đặt cọc lớn hơn không còn cần phải chia nhỏ cho nhiều trình xác thực nữa.

<ValidatorKeysDiagram />

**Lưu ý**: Một trình xác thực có thể thoát bằng cách ký một [thông điệp thoát tự nguyện (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) bằng khóa trình xác thực. Kể từ bản nâng cấp Pectra, [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) cũng cho phép địa chỉ rút tiền kích hoạt việc thoát của một trình xác thực và rút tiền một phần đối với các trình xác thực `0x02`. Điều này làm giảm các giả định tin cậy bằng cách cho phép những người đặt cọc ủy quyền ETH cho [các nhà cung cấp staking như một dịch vụ](/staking/saas/#what-is-staking-as-a-service) vẫn nắm quyền kiểm soát tiền của họ.

## Lấy các khóa từ một cụm từ hạt giống {#deriving-keys-from-seed}

Nếu mỗi 32 ETH được đặt cọc yêu cầu một bộ 2 khóa hoàn toàn độc lập mới, việc quản lý khóa sẽ nhanh chóng trở nên cồng kềnh, đặc biệt là đối với những người dùng chạy nhiều trình xác thực. Thay vào đó, nhiều khóa trình xác thực có thể được lấy từ một bí mật chung duy nhất và việc lưu trữ bí mật duy nhất đó cho phép truy cập vào nhiều khóa trình xác thực.

[Cụm từ ghi nhớ (Mnemonic)](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) và đường dẫn là những tính năng nổi bật mà người dùng thường gặp khi [họ truy cập](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) vào ví của mình. Cụm từ ghi nhớ là một chuỗi các từ đóng vai trò như một hạt giống ban đầu cho một khóa riêng tư. Khi được kết hợp với dữ liệu bổ sung, cụm từ ghi nhớ tạo ra một mã băm được gọi là 'khóa chính'. Điều này có thể được coi như gốc của một cái cây. Các nhánh từ gốc này sau đó có thể được lấy ra bằng cách sử dụng một đường dẫn phân cấp để các nút con có thể tồn tại dưới dạng sự kết hợp giữa mã băm của nút cha và chỉ số của chúng trong cây. Đọc về các tiêu chuẩn [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) và [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) cho việc tạo khóa dựa trên cụm từ ghi nhớ.

Các đường dẫn này có cấu trúc sau, sẽ quen thuộc với những người dùng đã tương tác với ví cứng:

```
m/44'/60'/0'/0
```

Các dấu gạch chéo trong đường dẫn này phân tách các thành phần của khóa riêng tư như sau:

```
master_key / purpose / coin_type / account / change / address_index
```

Logic này cho phép người dùng gắn càng nhiều trình xác thực càng tốt vào một **cụm từ ghi nhớ** duy nhất vì gốc cây có thể là chung và sự khác biệt có thể xảy ra ở các nhánh. Người dùng có thể **lấy ra bất kỳ số lượng khóa nào** từ cụm từ ghi nhớ.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Mỗi nhánh được phân tách bằng một dấu `/` vì vậy `m/2` có nghĩa là bắt đầu với khóa chính và đi theo nhánh 2. Các khóa trình xác thực tuân theo [EIP-2334](https://eips.ethereum.org/EIPS/eip-2334): trình xác thực `i` nhận được khóa rút tiền của nó tại `m/12381/3600/i/0` và khóa ký của nó tại `m/12381/3600/i/0/0` (12381 xác định đường cong BLS12-381, 3600 là loại tiền cho các khóa lớp đồng thuận).

<KeyDerivationDiagram />

## Đọc thêm {#further-reading}

- [Bài đăng trên blog của Tổ chức Ethereum bởi Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [Tạo khóa EIP-2333 BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Các lối thoát được kích hoạt bởi lớp thực thi](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Quản lý khóa ở quy mô lớn](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
