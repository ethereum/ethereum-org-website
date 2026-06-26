---
title: "Tài khoản Ethereum"
description: "Giải thích về các tài khoản Ethereum – cấu trúc dữ liệu và mối quan hệ của chúng với mật mã học cặp khóa."
lang: vi
---

Một tài khoản [Ethereum](/) là một thực thể có số dư ether (ETH) có thể gửi các thông điệp trên Ethereum. Các tài khoản có thể do người dùng kiểm soát hoặc được triển khai dưới dạng các hợp đồng thông minh.

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc qua phần [giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Các loại tài khoản {#types-of-account}

Ethereum có hai loại tài khoản:

- Tài khoản thuộc sở hữu bên ngoài (Externally-owned account - EOA) – được kiểm soát bởi bất kỳ ai có các khóa riêng tư
- Tài khoản hợp đồng – một hợp đồng thông minh được triển khai trên mạng lưới, được kiểm soát bằng mã. Tìm hiểu về [hợp đồng thông minh](/developers/docs/smart-contracts/)

Cả hai loại tài khoản đều có khả năng:

- Nhận, giữ và gửi ETH cùng các token
- Tương tác với các hợp đồng thông minh đã được triển khai

### Những điểm khác biệt chính {#key-differences}

**Thuộc sở hữu bên ngoài**

- Việc tạo tài khoản không tốn phí
- Có thể khởi tạo các giao dịch
- Các giao dịch giữa các tài khoản thuộc sở hữu bên ngoài chỉ có thể là các khoản chuyển ETH/token
- Được tạo thành từ một cặp khóa mật mã học: khóa công khai và khóa riêng tư để kiểm soát các hoạt động của tài khoản

**Hợp đồng**

- Việc tạo một hợp đồng sẽ tốn phí vì bạn đang sử dụng không gian lưu trữ của mạng lưới
- Chỉ có thể gửi các thông điệp để phản hồi lại việc nhận một giao dịch
- Các giao dịch từ một tài khoản bên ngoài đến một tài khoản hợp đồng có thể kích hoạt mã để thực thi nhiều hành động khác nhau, chẳng hạn như chuyển token hoặc thậm chí tạo một hợp đồng mới
- Các tài khoản hợp đồng không có khóa riêng tư. Thay vào đó, chúng được kiểm soát bởi logic của mã hợp đồng thông minh

## Khảo sát một tài khoản {#an-account-examined}

Các tài khoản Ethereum có bốn trường:

- `nonce` – Một bộ đếm cho biết số lượng giao dịch được gửi từ một tài khoản thuộc sở hữu bên ngoài hoặc số lượng hợp đồng được tạo bởi một tài khoản hợp đồng. Chỉ có một giao dịch với một nonce nhất định có thể được thực thi cho mỗi tài khoản, giúp bảo vệ khỏi các cuộc tấn công phát lại (replay attacks) nơi các giao dịch đã ký bị phát sóng và thực thi lặp đi lặp lại.
- `balance` – Số lượng Wei thuộc sở hữu của địa chỉ này. Wei là một đơn vị của ETH và có 1e+18 Wei trong mỗi ETH.
- `codeHash` – Mã băm này đề cập đến _mã_ của một tài khoản trên Máy ảo Ethereum (EVM). Các tài khoản hợp đồng có các đoạn mã được lập trình sẵn có thể thực hiện các thao tác khác nhau. Mã EVM này được thực thi nếu tài khoản nhận được một lời gọi thông điệp. Nó không thể bị thay đổi, không giống như các trường tài khoản khác. Tất cả các đoạn mã như vậy được chứa trong cơ sở dữ liệu trạng thái dưới các mã băm tương ứng của chúng để truy xuất sau này. Giá trị mã băm này được gọi là codeHash. Đối với các tài khoản thuộc sở hữu bên ngoài, trường codeHash là mã băm của một chuỗi rỗng.
- `storageRoot` – Đôi khi được gọi là mã băm lưu trữ (storage hash). Một mã băm 256-bit của nút gốc của một [cây tiền tố Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) mã hóa nội dung lưu trữ của tài khoản (một ánh xạ giữa các giá trị số nguyên 256-bit), được mã hóa vào cây tiền tố dưới dạng một ánh xạ từ mã băm Keccak-256 bit của các khóa số nguyên 256-bit sang các giá trị số nguyên 256-bit được mã hóa RLP. Cây tiền tố này mã hóa mã băm của nội dung lưu trữ của tài khoản này, và mặc định là rỗng.

![A diagram showing the make up of an account](./accounts.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Các tài khoản thuộc sở hữu bên ngoài và các cặp khóa {#externally-owned-accounts-and-key-pairs}

Một tài khoản được tạo thành từ một cặp khóa mật mã học: khóa công khai và khóa riêng tư. Chúng giúp chứng minh rằng một giao dịch thực sự đã được ký bởi người gửi và ngăn chặn sự giả mạo. Khóa riêng tư của bạn là thứ bạn sử dụng để ký các giao dịch, vì vậy nó cấp cho bạn quyền lưu giữ các khoản tiền liên kết với tài khoản của bạn. Bạn không bao giờ thực sự nắm giữ tiền mã hóa, bạn nắm giữ các khóa riêng tư – tiền luôn nằm trên sổ cái của Ethereum.

Điều này ngăn chặn các tác nhân độc hại phát sóng các giao dịch giả mạo vì bạn luôn có thể xác minh người gửi của một giao dịch.

Nếu Alice muốn gửi ether từ tài khoản của chính mình đến tài khoản của Bob, Alice cần tạo một yêu cầu giao dịch và gửi nó ra mạng lưới để xác minh. Việc Ethereum sử dụng mật mã học khóa công khai đảm bảo rằng Alice có thể chứng minh cô ấy là người ban đầu khởi tạo yêu cầu giao dịch. Nếu không có các cơ chế mật mã học, một kẻ thù độc hại là Eve có thể dễ dàng phát sóng công khai một yêu cầu trông giống như "gửi 5 ETH từ tài khoản của Alice đến tài khoản của Eve," và sẽ không ai có thể xác minh rằng nó không đến từ Alice.

## Tạo tài khoản {#account-creation}

Khi bạn muốn tạo một tài khoản, hầu hết các thư viện sẽ tạo cho bạn một khóa riêng tư ngẫu nhiên.

Một khóa riêng tư được tạo thành từ 64 ký tự hex và có thể được mã hóa bằng mật khẩu.

Ví dụ:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Khóa công khai được tạo ra từ khóa riêng tư bằng cách sử dụng [Thuật toán chữ ký số đường cong elliptic](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Bạn nhận được một địa chỉ công khai cho tài khoản của mình bằng cách lấy 20 byte cuối cùng của mã băm Keccak-256 của khóa công khai và thêm `0x` vào đầu.

Điều này có nghĩa là một Tài khoản thuộc sở hữu bên ngoài (EOA) có một địa chỉ dài 42 ký tự (đoạn 20-byte tương đương với 40 ký tự thập lục phân cộng với tiền tố `0x`).

Ví dụ:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Ví dụ sau đây cho thấy cách sử dụng một công cụ ký có tên là [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) để tạo một tài khoản mới. Clef là một công cụ quản lý tài khoản và ký đi kèm với client Ethereum, [Geth](https://geth.ethereum.org). Lệnh `clef newaccount` tạo một cặp khóa mới và lưu chúng trong một kho khóa được mã hóa.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Tài liệu Geth](https://geth.ethereum.org/docs)

Có thể tạo ra các khóa công khai mới từ khóa riêng tư của bạn, nhưng bạn không thể tạo ra một khóa riêng tư từ các khóa công khai. Điều tối quan trọng là phải giữ an toàn cho các khóa riêng tư của bạn và, đúng như tên gọi của nó, phải giữ **RIÊNG TƯ**.

Bạn cần một khóa riêng tư để ký các thông điệp và các giao dịch nhằm xuất ra một chữ ký. Những người khác sau đó có thể lấy chữ ký để suy ra khóa công khai của bạn, chứng minh tác giả của thông điệp. Trong ứng dụng của mình, bạn có thể sử dụng một thư viện JavaScript để gửi các giao dịch đến mạng lưới.

## Các tài khoản hợp đồng {#contract-accounts}

Các tài khoản hợp đồng cũng có một địa chỉ thập lục phân dài 42 ký tự:

Ví dụ:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Địa chỉ hợp đồng thường được cấp khi một hợp đồng được triển khai lên Chuỗi khối Ethereum. Địa chỉ này bắt nguồn từ địa chỉ của người tạo và số lượng giao dịch được gửi từ địa chỉ đó ("nonce").

## Các khóa trình xác thực {#validators-keys}

Cũng có một loại khóa khác trong Ethereum, được giới thiệu khi Ethereum chuyển từ cơ chế đồng thuận Bằng chứng công việc (PoW) sang Bằng chứng cổ phần (PoS). Đây là các khóa 'BLS' và chúng được sử dụng để xác định các trình xác thực. Các khóa này có thể được tổng hợp một cách hiệu quả để giảm băng thông cần thiết cho mạng lưới đạt được sự đồng thuận. Nếu không có sự tổng hợp khóa này, khoản đặt cọc tối thiểu cho một trình xác thực sẽ cao hơn nhiều.

[Tìm hiểu thêm về các khóa trình xác thực](/developers/docs/consensus-mechanisms/pos/keys/).

## Lưu ý về ví {#a-note-on-wallets}

Một tài khoản không phải là một ví. Ví là một giao diện hoặc ứng dụng cho phép bạn tương tác với tài khoản Ethereum của mình, có thể là một tài khoản thuộc sở hữu bên ngoài hoặc một tài khoản hợp đồng.

## Bản demo trực quan {#a-visual-demo}

Hãy xem Austin hướng dẫn bạn về các hàm băm và các cặp khóa.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Đọc thêm {#further-reading}

- [Hiểu về các tài khoản Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Giao dịch](/developers/docs/transactions/)