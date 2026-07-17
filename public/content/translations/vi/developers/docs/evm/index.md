---
title: "Máy ảo Ethereum (EVM)"
description: "Giới thiệu về máy ảo Ethereum và cách nó liên quan đến trạng thái, giao dịch và hợp đồng thông minh."
lang: vi
---

Máy ảo Ethereum (EVM) là một môi trường ảo phi tập trung thực thi mã một cách nhất quán và an toàn trên tất cả các node [Ethereum](/). Các node chạy EVM để thực thi các hợp đồng thông minh, sử dụng "[Gas](/developers/docs/gas/)" để đo lường nỗ lực tính toán cần thiết cho các [hoạt động](/developers/docs/evm/opcodes/), đảm bảo phân bổ tài nguyên hiệu quả và bảo mật mạng lưới.

## Điều kiện tiên quyết {#prerequisites}

Một số hiểu biết cơ bản về các thuật ngữ phổ biến trong khoa học máy tính như [byte](https://wikipedia.org/wiki/Byte), [bộ nhớ](https://wikipedia.org/wiki/Computer_memory), và [ngăn xếp (stack)](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) là cần thiết để hiểu về EVM. Sẽ rất hữu ích nếu bạn nắm rõ các khái niệm về mật mã học/Chuỗi khối như [hàm băm](https://wikipedia.org/wiki/Cryptographic_hash_function) và [cây Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Từ sổ cái đến máy trạng thái {#from-ledger-to-state-machine}

Sự tương đồng với một 'sổ cái phân tán' thường được sử dụng để mô tả các Chuỗi khối như Bitcoin, cho phép một loại tiền mã hóa phi tập trung sử dụng các công cụ cơ bản của mật mã học. Sổ cái duy trì một bản ghi các hoạt động phải tuân thủ một bộ quy tắc chi phối những gì một người có thể và không thể làm để sửa đổi sổ cái. Ví dụ, một địa chỉ Bitcoin không thể chi tiêu nhiều Bitcoin hơn số lượng nó đã nhận được trước đó. Những quy tắc này củng cố tất cả các giao dịch trên Bitcoin và nhiều Chuỗi khối khác.

Mặc dù Ethereum có tiền mã hóa gốc riêng (ether) tuân theo các quy tắc trực quan gần như giống hệt nhau, nó cũng cho phép một chức năng mạnh mẽ hơn nhiều: [hợp đồng thông minh](/developers/docs/smart-contracts/). Đối với tính năng phức tạp hơn này, cần có một sự so sánh tinh vi hơn. Thay vì một sổ cái phân tán, Ethereum là một [máy trạng thái](https://wikipedia.org/wiki/Finite-state_machine) phân tán. Trạng thái của Ethereum là một cấu trúc dữ liệu lớn không chỉ chứa tất cả các tài khoản và số dư, mà còn chứa một _trạng thái máy_, có thể thay đổi từ khối này sang khối khác theo một bộ quy tắc được xác định trước, và có thể thực thi mã máy tùy ý. Các quy tắc cụ thể về việc thay đổi trạng thái từ khối này sang khối khác được xác định bởi EVM.

![A diagram showing the make up of the EVM](./evm.png)
_Sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Hàm chuyển đổi trạng thái Ethereum {#the-ethereum-state-transition-function}

EVM hoạt động giống như một hàm toán học: Với một đầu vào, nó tạo ra một đầu ra xác định. Do đó, sẽ khá hữu ích khi mô tả Ethereum một cách chính thức hơn là có một **hàm chuyển đổi trạng thái**:

```
Y(S, T)= S'
```

Cho một trạng thái hợp lệ cũ `(S)` và một tập hợp các giao dịch hợp lệ mới `(T)`, hàm chuyển đổi trạng thái Ethereum `Y(S, T)` tạo ra một trạng thái đầu ra hợp lệ mới `S'`

### Trạng thái {#state}

Trong bối cảnh của Ethereum, trạng thái là một cấu trúc dữ liệu khổng lồ được gọi là [cây tiền tố Merkle Patricia được sửa đổi](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), giữ cho tất cả các [tài khoản](/developers/docs/accounts/) được liên kết bằng các mã băm và có thể rút gọn thành một mã băm gốc duy nhất được lưu trữ trên Chuỗi khối.

### Giao dịch {#transactions}

Các giao dịch là các lệnh được ký bằng mật mã học từ các tài khoản. Có hai loại giao dịch: loại dẫn đến các lời gọi thông điệp và loại dẫn đến việc tạo hợp đồng.

Việc tạo hợp đồng dẫn đến việc tạo ra một tài khoản hợp đồng mới chứa mã byte của [hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) đã được biên dịch. Bất cứ khi nào một tài khoản khác thực hiện một lời gọi thông điệp đến hợp đồng đó, nó sẽ thực thi mã byte của mình.

## Các lệnh EVM {#evm-instructions}

EVM thực thi như một [máy ngăn xếp (stack machine)](https://wikipedia.org/wiki/Stack_machine) với độ sâu 1024 mục. Mỗi mục là một từ 256-bit, được chọn để dễ sử dụng với mật mã học 256-bit (chẳng hạn như mã băm Keccak-256 hoặc chữ ký secp256k1).

Trong quá trình thực thi, EVM duy trì một _bộ nhớ_ tạm thời (dưới dạng một mảng byte được định địa chỉ theo từ), không tồn tại lâu dài giữa các giao dịch.

### Lưu trữ tạm thời {#transient-storage}

Lưu trữ tạm thời là một kho lưu trữ khóa-giá trị cho mỗi giao dịch được truy cập thông qua các mã lệnh `TSTORE` và `TLOAD`. Nó tồn tại qua tất cả các lệnh gọi nội bộ trong cùng một giao dịch nhưng bị xóa vào cuối giao dịch. Không giống như bộ nhớ, lưu trữ tạm thời được mô hình hóa như một phần của trạng thái EVM thay vì khung thực thi, tuy nhiên nó không được cam kết vào trạng thái toàn cục. Lưu trữ tạm thời cho phép chia sẻ trạng thái tạm thời tiết kiệm Gas qua các lệnh gọi nội bộ trong một giao dịch.

### Lưu trữ {#storage}

Các hợp đồng chứa một trie _lưu trữ_ Merkle Patricia (dưới dạng một mảng từ có thể định địa chỉ theo từ), được liên kết với tài khoản được đề cập và là một phần của trạng thái toàn cục. Lưu trữ liên tục này khác với lưu trữ tạm thời, vốn chỉ khả dụng trong khoảng thời gian của một giao dịch duy nhất và không tạo thành một phần của trie lưu trữ liên tục của tài khoản.

### Mã lệnh {#opcodes}

Mã byte của hợp đồng thông minh đã biên dịch thực thi dưới dạng một số [mã lệnh](/developers/docs/evm/opcodes) EVM, thực hiện các hoạt động ngăn xếp tiêu chuẩn như `XOR`, `AND`, `ADD`, `SUB`, v.v. EVM cũng triển khai một số hoạt động ngăn xếp dành riêng cho Chuỗi khối, chẳng hạn như `ADDRESS`, `BALANCE`, `BLOCKHASH`, v.v. Tập hợp mã lệnh cũng bao gồm `TSTORE` và `TLOAD`, cung cấp quyền truy cập vào lưu trữ tạm thời.

![A diagram showing where gas is needed for EVM operations](../gas/gas.png)
_Các sơ đồ được phỏng theo [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Các bản triển khai EVM {#evm-implementations}

Tất cả các bản triển khai của EVM phải tuân thủ đặc tả được mô tả trong sách vàng Ethereum.

Trong suốt lịch sử mười năm của Ethereum, EVM đã trải qua một số lần sửa đổi và có một số bản triển khai của EVM bằng nhiều ngôn ngữ lập trình khác nhau.

[Các client thực thi Ethereum](/developers/docs/nodes-and-clients/#execution-clients) bao gồm một bản triển khai EVM. Ngoài ra, có nhiều bản triển khai độc lập, bao gồm:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Đọc thêm {#further-reading}

- [Sách vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper hay còn gọi là KEVM: Ngữ nghĩa của EVM trong K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [Các mã lệnh của Máy ảo Ethereum](https://www.ethervm.io/)
- [Tài liệu tham khảo tương tác về các mã lệnh của Máy ảo Ethereum](https://www.evm.codes/)
- [Giới thiệu ngắn gọn trong tài liệu của Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Mastering Ethereum - Máy ảo Ethereum](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## Chủ đề liên quan {#related-topics}

- [Gas](/developers/docs/gas/)

## Hướng dẫn: Máy ảo Ethereum (EVM) / Các mã lệnh trên Ethereum {#tutorials}

- [Hiểu về các đặc tả EVM của Sách vàng](/developers/tutorials/yellow-paper-evm/) _– Hướng dẫn chi tiết về đặc tả EVM chính thức từ Sách vàng Ethereum._
- [Dịch ngược một hợp đồng](/developers/tutorials/reverse-engineering-a-contract/) _– Cách dịch ngược một hợp đồng thông minh đã biên dịch bằng cách sử dụng các mã lệnh EVM._