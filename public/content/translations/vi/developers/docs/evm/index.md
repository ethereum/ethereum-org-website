---
title: "Máy Ảo Ethereum"
description: "Một bài giới thiệu về máy ảo Ethereum và cách nó liên quan đến trạng thái, giao dịch và hợp đồng thông minh."
lang: vi
---

Máy ảo Ethereum là một môi trường ảo phi tập trung, thực thi mã một cách nhất quán và an toàn trên tất cả các nút của Ethereum. Các nút chạy EVM để thực thi các hợp đồng thông minh, sử dụng "[gas](/developers/docs/gas/)" để đo lường nỗ lực tính toán cần thiết cho các [thao tác](/developers/docs/evm/opcodes/), đảm bảo phân bổ tài nguyên hiệu quả và an ninh mạng.

## Điều kiện tiên quyết {#prerequisites}

Một số kiến thức cơ bản về các thuật ngữ phổ biến trong khoa học máy tính như [byte](https://wikipedia.org/wiki/Byte), [bộ nhớ](https://wikipedia.org/wiki/Computer_memory) và [ngăn xếp](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) là cần thiết để hiểu về EVM. Sẽ rất hữu ích nếu bạn quen thuộc với các khái niệm về mật mã học/chuỗi khối như [hàm băm](https://wikipedia.org/wiki/Cryptographic_hash_function) và [cây Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Từ sổ cái đến máy trạng thái {#from-ledger-to-state-machine}

Sự tương tự của 'sổ cái phân tán' thường được sử dụng để mô tả các blockchain như Bitcoin, cho phép một loại tiền tệ phi tập trung sử dụng các công cụ cơ bản của mật mã. Sổ cái duy trì một bản ghi các hoạt động, và nó phải tuân theo một tập hợp quy tắc quy định những gì một người có thể và không thể làm để thay đổi sổ cái. Ví dụ: một địa chỉ Bitcoin không thể tiêu nhiều Bitcoin hơn số Bitcoin đã nhận trước đó. Các quy tắc này làm nền tảng cho tất cả các giao dịch trên Bitcoin và nhiều blockchain khác.

Mặc dù Ethereum có tiền mã hóa gốc của riêng mình (ether) tuân theo các quy tắc trực quan gần như giống hệt nhau, nhưng nó cũng cho phép một chức năng mạnh mẽ hơn nhiều: [hợp đồng thông minh](/developers/docs/smart-contracts/). Đối với tính năng phức tạp hơn này, cần phải có một phép loại suy phức tạp hơn. Thay vì là một sổ cái phân tán, Ethereum là một [máy trạng thái](https://wikipedia.org/wiki/Finite-state_machine) phân tán. Trạng thái của Ethereum là một cấu trúc dữ liệu lớn không chỉ chứa tất cả các tài khoản và số dư mà còn chứa một _trạng thái máy_, có thể thay đổi từ khối này sang khối khác theo một bộ quy tắc được xác định trước, và có thể thực thi mã máy tùy ý. Các quy tắc cụ thể của việc thay đổi trạng thái từ khối này sang khối khác được xác định bởi EVM.

![Một sơ đồ thể hiện cấu tạo của EVM](./evm.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Hàm chuyển đổi trạng thái của Ethereum {#the-ethereum-state-transition-function}

EVM hoạt động như một hàm toán học: Cho một đầu vào, nó tạo ra một đầu ra xác định. Do đó, sẽ rất hữu ích nếu mô tả Ethereum một cách chính thức hơn là có một **hàm chuyển đổi trạng thái**:

```
Y(S, T)= S'
```

Cho một trạng thái hợp lệ cũ `(S)` và một tập hợp các giao dịch hợp lệ mới `(T)`, hàm chuyển đổi trạng thái Ethereum `Y(S, T)` tạo ra một trạng thái đầu ra hợp lệ mới `S'`

### Trạng thái {#state}

Trong bối cảnh của Ethereum, trạng thái là một cấu trúc dữ liệu khổng lồ được gọi là [Cây Patricia Merkle đã sửa đổi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), nơi lưu giữ tất cả các [tài khoản](/developers/docs/accounts/) được liên kết bằng các hàm băm và có thể rút gọn thành một hàm băm gốc duy nhất được lưu trữ trên chuỗi khối.

### Các giao dịch {#transactions}

Giao dịch là hướng dẫn được ký bằng mật mã từ các tài khoản. Có hai loại giao dịch: giao dịch dẫn đến cuộc gọi tin nhắn và giao dịch dẫn đến tạo hợp đồng.

Việc tạo hợp đồng sẽ dẫn đến việc tạo ra một tài khoản hợp đồng mới chứa bytecode [hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) đã được biên dịch. Bất cứ khi nào tài khoản khác thực hiện một cuộc gọi thông báo đến hợp đồng đó, nó sẽ thực thi bytecode của nó.

## Các lệnh của EVM {#evm-instructions}

EVM thực thi như một [máy ngăn xếp](https://wikipedia.org/wiki/Stack_machine) với độ sâu 1024 mục. Mỗi mục là một 256 bit word, được chọn để dễ sử dụng với mật mã 256 bit (chẳng hạn như băm Keccak-256 hoặc chữ ký secp256k1).

Trong quá trình thực thi, EVM duy trì một _bộ nhớ_ tạm thời (dưới dạng một mảng byte được định địa chỉ theo từ), bộ nhớ này không tồn tại giữa các giao dịch.

### Lưu trữ tạm thời

Lưu trữ tạm thời là một kho khóa-giá trị cho mỗi giao dịch, được truy cập thông qua các mã vận hành `TSTORE` và `TLOAD`. Nó tồn tại trong tất cả các lệnh gọi nội bộ trong cùng một giao dịch nhưng sẽ bị xóa vào cuối giao dịch. Không giống như bộ nhớ, lưu trữ tạm thời được mô hình hóa như một phần của trạng thái EVM thay vì khung thực thi, nhưng nó không được ghi vào trạng thái toàn cục. Lưu trữ tạm thời cho phép chia sẻ trạng thái tạm thời một cách tiết kiệm gas giữa các lệnh gọi nội bộ trong một giao dịch.

### Lưu trữ

Các hợp đồng chứa một cây _lưu trữ_ Patricia Merkle (dưới dạng mảng từ có thể định địa chỉ theo từ), được liên kết với tài khoản liên quan và là một phần của trạng thái toàn cục. Loại lưu trữ bền vững này khác với lưu trữ tạm thời, vốn chỉ khả dụng trong suốt thời gian của một giao dịch duy nhất và không phải là một phần của cây lưu trữ bền vững của tài khoản.

### Mã vận hành

Bytecode của hợp đồng thông minh đã biên dịch sẽ thực thi dưới dạng một số [mã vận hành](/developers/docs/evm/opcodes) EVM, thực hiện các hoạt động ngăn xếp tiêu chuẩn như `XOR`, `AND`, `ADD`, `SUB`, v.v. EVM cũng triển khai một số hoạt động ngăn xếp dành riêng cho chuỗi khối, chẳng hạn như `ADDRESS`, `BALANCE`, `BLOCKHASH`, v.v. Tập hợp mã vận hành cũng bao gồm `TSTORE` và `TLOAD`, cung cấp quyền truy cập vào lưu trữ tạm thời.

![Một sơ đồ cho thấy vị trí cần gas cho các hoạt động của EVM](../gas/gas.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Các phiên bản triển khai EVM {#evm-implementations}

Tất cả các triển khai của EVM phải tuân theo đặc điểm kỹ thuật được mô tả trong Ethereum Yellowpaper.

Trong lịch sử mười năm của Ethereum, EVM đã trải qua nhiều lần sửa đổi và có một số phiên bản triển khai EVM bằng nhiều ngôn ngữ lập trình khác nhau.

[Các máy khách thực thi của Ethereum](/developers/docs/nodes-and-clients/#execution-clients) bao gồm một phiên bản triển khai EVM. Ngoài ra, còn có nhiều bản triển khai độc lập, bao gồm:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Đọc thêm {#further-reading}

- [Sách Vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Sách Jello hay KEVM: Ngữ nghĩa của EVM trong K](https://jellopaper.org/)
- [Sách Be](https://github.com/chronaeon/beigepaper)
- [Mã vận hành Máy ảo Ethereum](https://www.ethervm.io/)
- [Tham chiếu tương tác về mã vận hành của Máy ảo Ethereum](https://www.evm.codes/)
- [Giới thiệu ngắn trong tài liệu của Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Làm chủ Ethereum - Máy ảo Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Các chủ đề liên quan {#related-topics}

- [Gas](/developers/docs/gas/)
