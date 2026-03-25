---
title: "Các loại tài khoản Ethereum"
description: "Giải thích về các loại tài khoản Ethereum - các cấu trúc dữ liệu và mối quan hệ của chúng với cặp khóa mật mã."
lang: vi
---

Một tài khoản Ethereum là một thực thể có số dư ether (ETH) có khả năng gửi tin nhắn trên mạng Ethereum. Các tài khoản có thể được người dùng kiểm soát hoặc triển khai dưới dạng các hợp đồng thông minh.

## Điều kiện tiên quyết {#prerequisites}

Để giúp bạn hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc qua [phần giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

## Các loại tài khoản {#types-of-account}

Ethereum có 2 loại tài khoản:

- Tài khoản thuộc sở hữu bên ngoài (EOA) – được kiểm soát bởi bất kỳ ai có khóa riêng
- Tài khoản hợp đồng – một hợp đồng thông minh được triển khai lên mạng, được điều khiển bởi mã. Tìm hiểu về [hợp đồng thông minh](/developers/docs/smart-contracts/)

Cả hai loại tài khoản đều có khả năng:

- Nhận, giữ và gửi ETH và các token
- Tương tác với các hợp đồng thông minh đã được triển khai

### Các điểm khác biệt chính {#key-differences}

**sở hữu ngoại biên**

- Việc tạo tài khoản là miễn phí
- Có thể khởi tạo các giao dịch
- Các giao dịch giữa các tài khoản sở hữu bên ngoài chỉ có thể là chuyển khoản ETH/token
- Được cấu thành từ một cặp khóa mã hóa: khóa công khai và khóa riêng tư điều khiển hoạt động của tài khoản

**Hợp đồng**

- Việc tạo hợp đồng có chi phí vì bạn đang lưu trữ trên mạng
- Chỉ có thể gửi tin nhắn để phản hồi việc nhận giao dịch
- Các giao dịch từ một tài khoản bên ngoài đến một tài khoản hợp đồng có thể kích hoạt mã có thể thực hiện nhiều hành động khác nhau, chẳng hạn như chuyển token hoặc thậm chí tạo ra một hợp đồng mới
- Tài khoản hợp đồng không có khóa riêng. Thay vào đó, chúng được kiểm soát bởi logic của mã hợp đồng thông minh

## Xem xét một tài khoản {#an-account-examined}

Tài khoản Ethereum có bốn trường:

- `nonce` – Một bộ đếm cho biết số lượng giao dịch được gửi từ một tài khoản do bên ngoài sở hữu hoặc số lượng hợp đồng được tạo bởi một tài khoản hợp đồng. Chỉ một giao dịch với một nonce nhất định có thể được thực hiện cho mỗi tài khoản, bảo vệ chống lại các cuộc tấn công phát lại, trong đó các giao dịch đã ký được phát sóng và thực hiện lại nhiều lần.
- `balance` – Số lượng wei mà địa chỉ này sở hữu. Wei là một đơn vị của ETH và có 1e+18 wei cho mỗi ETH.
- `codeHash` – Hàm băm này đề cập đến _mã_ của một tài khoản trên máy ảo Ethereum (EVM). Tài khoản hợp đồng có các mã code được lập trình sẵn có thể thực hiện các thao tác khác nhau. Mã EVM này sẽ được thực thi nếu tài khoản nhận một cuộc gọi tin nhắn. Nó không thể thay đổi, khác với các trường tài khoản khác. Tất cả các đoạn mã như vậy được lưu trữ trong cơ sở dữ liệu trạng thái dưới các hash tương ứng của chúng để có thể truy xuất sau này. Giá trị hash được hiểu là một codeHash. Đối với các tài khoản sở hữu bên ngoài, trường codeHash là hash của một chuỗi rỗng.
- `storageRoot` – Đôi khi được gọi là hàm băm lưu trữ. Một hàm băm 256-bit của nút gốc của một [Merkle Patricia Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) mã hóa nội dung lưu trữ của tài khoản (một ánh xạ giữa các giá trị số nguyên 256-bit), được mã hóa vào trie dưới dạng một ánh xạ từ hàm băm Keccak 256-bit của các khóa số nguyên 256-bit sang các giá trị số nguyên 256-bit được mã hóa bằng RLP. Cây trie này mã hóa giá trị hash của nội dung lưu trữ của tài khoản này và theo mặc định thì nó rỗng.

![Sơ đồ thể hiện cấu tạo của một tài khoản](./accounts.png)
_Sơ đồ được phỏng theo [minh họa về EVM của Ethereum](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Các tài khoản thuộc sở hữu bên ngoài và các cặp khóa {#externally-owned-accounts-and-key-pairs}

Một tài khoản được tạo thành từ một cặp chìa khóa mã hóa: chìa khóa công khai và chìa khóa riêng. Chúng giúp chứng minh rằng một giao dịch thực sự đã được ký bởi người gửi và ngăn chặn việc giả mạo. Khóa riêng của bạn là thứ bạn sử dụng để ký các giao dịch, vì vậy nó cấp cho bạn quyền sở hữu đối với các quỹ liên kết với tài khoản của bạn. Bạn không thực sự sở hữu tiền mã hóa, bạn sở hữu các khóa riêng – các quỹ luôn nằm trên sổ cái của Ethereum.

Điều này ngăn chặn các tác nhân độc hại phát tán giao dịch giả mạo vì bạn luôn có thể xác minh người gửi của một giao dịch.

Nếu Alice muốn gửi ether từ tài khoản của mình sang tài khoản của Bob, Alice cần tạo một yêu cầu giao dịch và gửi nó đến mạng để xác minh. Việc Ethereum sử dụng mật mã khóa công khai đảm bảo rằng Alice có thể chứng minh rằng cô ấy đã khởi xướng yêu cầu giao dịch ban đầu. Nếu không có cơ chế mã hóa, một đối thủ ác ý như Eve có thể đơn giản phát đi một yêu cầu công khai trông giống như "gửi 5 ETH từ tài khoản của Alice tới tài khoản của Eve," và không ai có thể xác minh rằng yêu cầu này không đến từ Alice.

## Tạo tài khoản {#account-creation}

Khi bạn muốn tạo một tài khoản, hầu hết các thư viện sẽ tạo cho bạn một khóa bí mật ngẫu nhiên.

Một khóa riêng được tạo thành từ 64 ký tự hex và có thể được mã hóa bằng một mật khẩu.

Ví dụ:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Khóa công khai được tạo từ khóa riêng tư bằng [Thuật toán chữ ký số đường cong elip](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Bạn có được địa chỉ công khai cho tài khoản của mình bằng cách lấy 20 byte cuối của hàm băm Keccak-256 của khóa công khai và thêm `0x` vào đầu.

Điều này có nghĩa là một tài khoản được sở hữu bên ngoài (EOA) có một địa chỉ 42 ký tự (đoạn 20 byte bao gồm 40 ký tự thập lục phân cộng với tiền tố `0x`).

Ví dụ:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

Ví dụ sau đây cho thấy cách sử dụng một công cụ ký tên là [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) để tạo một tài khoản mới. Clef là một công cụ quản lý tài khoản và ký đi kèm với trình khách Ethereum, [Geth](https://geth.ethereum.org). Lệnh `clef newaccount` tạo một cặp khóa mới và lưu chúng trong một kho khóa đã mã hóa.

```
> clef newaccount --keystore <đường_dẫn>

Vui lòng nhập mật khẩu cho tài khoản mới sẽ được tạo:
> <mật_khẩu>

------------
INFO [10-28|16:19:09.156] Khóa mới của bạn đã được tạo       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Vui lòng sao lưu tệp khóa của bạn      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Vui lòng ghi nhớ mật khẩu của bạn!
Tài khoản đã tạo 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Tài liệu về Geth](https://geth.ethereum.org/docs)

Có thể tạo ra các khóa công khai mới từ khóa cá nhân của bạn, nhưng bạn không thể tạo ra khóa cá nhân từ các khóa công khai. Điều quan trọng là phải giữ an toàn các khóa riêng tư của bạn và, như tên gọi của nó, hãy giữ chúng **RIÊNG TƯ**.

Bạn cần một khóa riêng để ký các tin nhắn và giao dịch có đầu ra là một chữ ký. Người khác có thể sử dụng chữ ký để suy ra khóa công khai của bạn, từ đó chứng minh tác giả của tin nhắn. Trong ứng dụng của bạn, bạn có thể sử dụng một thư viện JavaScript để gửi giao dịch đến mạng.

## Các tài khoản hợp đồng {#contract-accounts}

Tài khoản hợp đồng cũng có một địa chỉ hexadecimal dài 42 ký tự:

Ví dụ:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Địa chỉ hợp đồng thường được cung cấp khi một hợp đồng được triển khai trên Blockchain Ethereum. Địa chỉ xuất phát từ địa chỉ của người tạo ra và số lượng giao dịch được gửi từ địa chỉ đó (gọi là “nonce”).

## Các khóa của trình xác thực {#validators-keys}

Cũng có một loại chìa khóa khác trong Ethereum, được giới thiệu khi Ethereum chuyển từ cơ chế đồng thuận bằng chứng công việc sang cơ chế đồng thuận bằng chứng cổ phần. Đây là các khóa 'BLS' và chúng được sử dụng để xác định các trình xác thực. Những khóa này có thể được tổng hợp một cách hiệu quả để giảm băng thông cần thiết cho mạng đạt được sự đồng thuận. Nếu không có sự tổng hợp này, mức cược tối thiểu cho một validator sẽ cao hơn nhiều.

[Thêm về các khóa của trình xác thực](/developers/docs/consensus-mechanisms/pos/keys/).

## Lưu ý về các ví {#a-note-on-wallets}

Một tài khoản không phải là một ví. Ví là một giao diện hoặc ứng dụng cho phép bạn tương tác với tài khoản Ethereum của mình, có thể là tài khoản do cá nhân sở hữu hoặc tài khoản hợp đồng.

## Bản demo trực quan {#a-visual-demo}

Xem Austin hướng dẫn bạn về hàm băm và cặp khóa.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Đọc thêm {#further-reading}

- [Tìm hiểu về Tài khoản Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Hợp đồng thông minh](/developers/docs/smart-contracts/)
- [Giao dịch](/developers/docs/transactions/)
