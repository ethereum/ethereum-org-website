---
title: "Dịch ngược một hợp đồng"
description: Cách để hiểu một hợp đồng khi bạn không có mã nguồn
author: Ori Pomerantz
lang: vi
tags: ["evm", "mã lệnh"]
skill: advanced
breadcrumb: Dịch ngược
published: 2021-12-30
---
## Giới thiệu {#introduction}

_Không có bí mật nào trên Chuỗi khối_, mọi thứ diễn ra đều nhất quán, có thể xác minh và công khai. Lý tưởng nhất là [các hợp đồng nên có mã nguồn được công bố và xác minh trên Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Tuy nhiên, [không phải lúc nào cũng như vậy](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Trong bài viết này, bạn sẽ học cách dịch ngược các hợp đồng bằng cách xem xét một hợp đồng không có mã nguồn, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Có các trình biên dịch ngược, nhưng chúng không phải lúc nào cũng tạo ra [kết quả có thể sử dụng được](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Trong bài viết này, bạn sẽ học cách dịch ngược thủ công và hiểu một hợp đồng từ [các mã lệnh](https://github.com/wolflo/evm-opcodes), cũng như cách diễn giải kết quả của một trình dịch ngược.

Để có thể hiểu bài viết này, bạn nên biết những kiến thức cơ bản về EVM và ít nhất là có chút quen thuộc với hợp ngữ EVM. [Bạn có thể đọc về các chủ đề này tại đây](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Chuẩn bị mã thực thi {#prepare-the-executable-code}

Bạn có thể lấy các mã lệnh bằng cách truy cập Etherscan cho hợp đồng, nhấp vào tab **Contract** và sau đó chọn **Switch to Opcodes View**. Bạn sẽ nhận được một chế độ xem với mỗi mã lệnh trên một dòng.

![Opcode View from Etherscan](opcode-view.png)

Tuy nhiên, để có thể hiểu được các lệnh nhảy, bạn cần biết vị trí của từng mã lệnh trong mã. Để làm điều đó, một cách là mở Google Spreadsheet và dán các mã lệnh vào cột C. [Bạn có thể bỏ qua các bước sau bằng cách tạo một bản sao của bảng tính đã được chuẩn bị sẵn này](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Bước tiếp theo là lấy các vị trí mã chính xác để chúng ta có thể hiểu được các lệnh nhảy. Chúng ta sẽ đặt kích thước mã lệnh ở cột B và vị trí (ở hệ thập lục phân) ở cột A. Nhập hàm này vào ô `B1` và sau đó sao chép và dán nó cho phần còn lại của cột B, cho đến cuối mã. Sau khi làm điều này, bạn có thể ẩn cột B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Đầu tiên, hàm này thêm một byte cho chính mã lệnh đó, và sau đó tìm kiếm `PUSH`. Các mã lệnh PUSH rất đặc biệt vì chúng cần có thêm các byte cho giá trị đang được đẩy vào. Nếu mã lệnh là `PUSH`, chúng ta trích xuất số lượng byte và cộng thêm vào.

Trong `A1`, hãy đặt độ lệch đầu tiên là 0. Sau đó, trong `A2`, hãy đặt hàm này và lại sao chép và dán nó cho phần còn lại của cột A:

```
=dec2hex(hex2dec(A1)+B1)
```

Chúng ta cần hàm này cung cấp cho chúng ta giá trị hệ thập lục phân vì các giá trị được đẩy vào trước các lệnh nhảy (`JUMP` và `JUMPI`) được cung cấp cho chúng ta ở hệ thập lục phân.

## Điểm vào (0x00) {#the-entry-point-0x00}

Các hợp đồng luôn được thực thi từ byte đầu tiên. Đây là phần đầu của mã:

| Offset | Mã lệnh      | Ngăn xếp (sau mã lệnh) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Trống                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Trống                    |

Đoạn mã này thực hiện hai việc:

1. Ghi 0x80 dưới dạng giá trị 32 byte vào các vị trí bộ nhớ 0x40-0x5F (0x80 được lưu trữ ở 0x5F và 0x40-0x5E đều là các số không).
2. Đọc kích thước dữ liệu lệnh gọi. Thông thường, dữ liệu lệnh gọi cho một hợp đồng Ethereum tuân theo [ABI (giao diện nhị phân ứng dụng)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), yêu cầu tối thiểu bốn byte cho bộ chọn hàm. Nếu kích thước dữ liệu lệnh gọi nhỏ hơn bốn, hãy nhảy đến 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### Trình xử lý tại 0x5E (dành cho dữ liệu lệnh gọi không thuộc ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Mã lệnh      |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Đoạn mã này bắt đầu bằng một `JUMPDEST`. Các chương trình EVM (Máy ảo Ethereum) sẽ ném ra một ngoại lệ nếu bạn nhảy đến một mã lệnh không phải là `JUMPDEST`. Sau đó, nó xem xét CALLDATASIZE và nếu là "true" (tức là không phải số không) thì sẽ nhảy đến 0x7C. Chúng ta sẽ tìm hiểu điều đó ở bên dưới.

| Offset | Mã lệnh    | Ngăn xếp (sau mã lệnh)                                                     |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) được cung cấp bởi lệnh gọi. Được gọi là `msg.value` trong Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Vì vậy, khi không có dữ liệu lệnh gọi, chúng ta đọc giá trị của Storage[6]. Chúng ta chưa biết giá trị này là gì, nhưng chúng ta có thể tìm kiếm các giao dịch mà hợp đồng đã nhận mà không có dữ liệu lệnh gọi. Các giao dịch chỉ chuyển ETH mà không có bất kỳ dữ liệu lệnh gọi nào (và do đó không có phương thức) sẽ có phương thức `Transfer` trên Etherscan. Trên thực tế, [giao dịch đầu tiên mà hợp đồng nhận được](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) là một khoản chuyển.

Nếu chúng ta xem xét giao dịch đó và nhấp vào **Click to see More** (Nhấp để xem thêm), chúng ta thấy rằng dữ liệu lệnh gọi, được gọi là dữ liệu đầu vào, thực sự trống (`0x`). Cũng lưu ý rằng giá trị là 1.559 ETH, điều này sẽ liên quan ở phần sau.

![The call data is empty](calldata-empty.png)

Tiếp theo, nhấp vào tab **State** (Trạng thái) và mở rộng hợp đồng mà chúng ta đang dịch ngược (0x2510...). Bạn có thể thấy rằng `Storage[6]` đã thay đổi trong quá trình giao dịch và nếu bạn đổi Hex thành **Number** (Số), bạn sẽ thấy nó trở thành 1,559,000,000,000,000,000, giá trị được chuyển tính bằng wei (tôi đã thêm dấu phẩy cho rõ ràng), tương ứng với giá trị hợp đồng tiếp theo.

![Sự thay đổi trong Storage[6]](storage6.png)

Nếu chúng ta xem xét các thay đổi trạng thái do [các giao dịch `Transfer` khác từ cùng thời kỳ](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) gây ra, chúng ta thấy rằng `Storage[6]` đã theo dõi giá trị của hợp đồng trong một thời gian. Hiện tại, chúng ta sẽ gọi nó là `Value*`. Dấu hoa thị (`*`) nhắc nhở chúng ta rằng chúng ta chưa _biết_ biến này làm gì, nhưng nó không thể chỉ để theo dõi giá trị hợp đồng vì không cần thiết phải sử dụng bộ nhớ lưu trữ (storage), vốn rất đắt đỏ, khi bạn có thể lấy số dư tài khoản của mình bằng cách sử dụng `ADDRESS BALANCE`. Mã lệnh đầu tiên đẩy địa chỉ của chính hợp đồng. Mã lệnh thứ hai đọc địa chỉ ở trên cùng của ngăn xếp và thay thế nó bằng số dư của địa chỉ đó.

| Offset | Mã lệnh      | Ngăn xếp                                    |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Chúng ta sẽ tiếp tục theo dõi đoạn mã này tại đích nhảy.

| Offset | Mã lệnh    | Ngăn xếp                                                    |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` là phép toán bitwise (thao tác bit), vì vậy nó đảo ngược giá trị của mọi bit trong giá trị lệnh gọi.

| Offset | Mã lệnh      | Ngăn xếp                                                                    |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Chúng ta nhảy nếu `Value*` nhỏ hơn 2^256-CALLVALUE-1 hoặc bằng nó. Điều này có vẻ giống như logic để ngăn chặn tràn số (overflow). Và thực sự, chúng ta thấy rằng sau một vài thao tác vô nghĩa (ví dụ như ghi vào bộ nhớ sắp bị xóa) tại offset 0x01DE, hợp đồng sẽ hoàn nguyên nếu phát hiện tràn số, đây là hành vi bình thường.

Lưu ý rằng việc tràn số như vậy là cực kỳ khó xảy ra, vì nó sẽ yêu cầu giá trị lệnh gọi cộng với `Value*` phải tương đương với 2^256 wei, khoảng 10^59 ETH. [Tổng nguồn cung ETH, tại thời điểm viết bài, là chưa đến hai trăm triệu](https://etherscan.io/stat/supply).

| Offset | Mã lệnh  | Ngăn xếp                                  |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Nếu chúng ta đến được đây, hãy lấy `Value* + CALLVALUE` và nhảy đến offset 0x75.

| Offset | Mã lệnh  | Ngăn xếp                        |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Nếu chúng ta đến được đây (điều này yêu cầu dữ liệu lệnh gọi phải trống), chúng ta sẽ cộng thêm giá trị lệnh gọi vào `Value*`. Điều này nhất quán với những gì chúng ta nói về các giao dịch `Transfer`.

| Offset | Mã lệnh |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Cuối cùng, xóa ngăn xếp (điều này không cần thiết) và báo hiệu kết thúc giao dịch thành công.

Tóm lại, đây là lưu đồ cho đoạn mã ban đầu.

![Entry point flowchart](flowchart-entry.png)

## Trình xử lý tại 0x7C {#the-handler-at-0x7c}

Tôi cố tình không đưa vào tiêu đề những gì trình xử lý này làm. Mục đích không phải là để dạy bạn cách hợp đồng cụ thể này hoạt động, mà là cách dịch ngược các hợp đồng. Bạn sẽ tìm hiểu những gì nó làm theo cách giống như tôi đã làm, bằng cách theo dõi mã.

Chúng ta đến đây từ một vài nơi:

- Nếu có dữ liệu lệnh gọi gồm 1, 2 hoặc 3 byte (từ offset 0x63)
- Nếu chữ ký phương thức không xác định (từ các offset 0x42 và 0x5D)

| Offset | Mã lệnh       | Ngăn xếp                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Đây là một ô lưu trữ khác, một ô mà tôi không thể tìm thấy trong bất kỳ giao dịch nào nên khó biết nó có nghĩa là gì hơn. Mã bên dưới sẽ làm cho nó rõ ràng hơn.

| Offset | Mã lệnh                                            | Ngăn xếp                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-dưới-dạng-địa-chỉ 0x9D 0x00 |

Các mã lệnh này cắt bớt giá trị chúng ta đọc từ Storage[3] xuống còn 160 bit, độ dài của một Địa chỉ Ethereum.

| Offset | Mã lệnh | Ngăn xếp                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-dưới-dạng-địa-chỉ 0x00 |
|     9C | JUMP   | Storage[3]-dưới-dạng-địa-chỉ 0x00      |

Bước nhảy này là thừa, vì chúng ta sẽ chuyển sang mã lệnh tiếp theo. Mã này không tiết kiệm gas như nó có thể.

| Offset | Mã lệnh     | Ngăn xếp                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-dưới-dạng-địa-chỉ 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-dưới-dạng-địa-chỉ      |
|     9F | POP        | Storage[3]-dưới-dạng-địa-chỉ           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-dưới-dạng-địa-chỉ      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-dưới-dạng-địa-chỉ |

Ngay từ đầu mã, chúng ta đã đặt Mem[0x40] thành 0x80. Nếu chúng ta tìm kiếm 0x40 sau đó, chúng ta thấy rằng chúng ta không thay đổi nó - vì vậy chúng ta có thể giả định nó là 0x80.

| Offset | Mã lệnh       | Ngăn xếp                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-dưới-dạng-địa-chỉ           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-dưới-dạng-địa-chỉ      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-dưới-dạng-địa-chỉ |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-dưới-dạng-địa-chỉ                        |

Sao chép toàn bộ dữ liệu lệnh gọi vào bộ nhớ, bắt đầu từ 0x80.

| Offset | Mã lệnh        | Ngăn xếp                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ                           |
|     AD | DUP6          | Storage[3]-dưới-dạng-địa-chỉ 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ     |
|     AE | GAS           | GAS Storage[3]-dưới-dạng-địa-chỉ 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-dưới-dạng-địa-chỉ |
|     AF | DELEGATE_CALL |

Bây giờ mọi thứ đã rõ ràng hơn nhiều. Hợp đồng này có thể hoạt động như một [hợp đồng proxy](https://blog.openzeppelin.com/proxy-patterns/), gọi Địa chỉ trong Storage[3] để thực hiện công việc thực sự. `DELEGATE_CALL` gọi một hợp đồng riêng biệt, nhưng vẫn ở trong cùng một không gian lưu trữ. Điều này có nghĩa là hợp đồng được ủy quyền, hợp đồng mà chúng ta làm proxy, truy cập vào cùng một không gian lưu trữ. Các tham số cho lệnh gọi là:

- _Gas_: Tất cả lượng gas còn lại
- _Địa chỉ được gọi_: Storage[3]-dưới-dạng-địa-chỉ
- _Dữ liệu lệnh gọi_: Các byte CALLDATASIZE bắt đầu tại 0x80, đây là nơi chúng ta đặt dữ liệu lệnh gọi ban đầu
- _Dữ liệu trả về_: Không có (0x00 - 0x00) Chúng ta sẽ lấy dữ liệu trả về bằng các phương tiện khác (xem bên dưới)

| Offset | Mã lệnh         | Ngăn xếp                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ                          |

Ở đây chúng ta sao chép toàn bộ dữ liệu trả về vào bộ đệm bộ nhớ bắt đầu tại 0x80.

| Offset | Mã lệnh       | Ngăn xếp                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ                              |
|     B7 | DUP1         | (((gọi thành công/thất bại))) (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ   |
|     B8 | ISZERO       | (((lệnh gọi có thất bại không))) (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((lệnh gọi có thất bại không))) (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ |
|     BC | JUMPI        | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ                              |
|     BD | DUP2         | RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ          |
|     BF | RETURN       |                                                                                                                              |

Vì vậy, sau lệnh gọi, chúng ta sao chép dữ liệu trả về vào bộ đệm 0x80 - 0x80+RETURNDATASIZE, và nếu lệnh gọi thành công, sau đó chúng ta `RETURN` với chính xác bộ đệm đó.

### DELEGATECALL Thất bại {#delegatecall-failed}

Nếu chúng ta đến đây, tại 0xC0, điều đó có nghĩa là hợp đồng mà chúng ta đã gọi đã hoàn nguyên. Vì chúng ta chỉ là một hợp đồng proxy cho hợp đồng đó, chúng ta muốn trả về cùng một dữ liệu và cũng hoàn nguyên.

| Offset | Mã lệnh   | Ngăn xếp                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ                     |
|     C1 | DUP2     | RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Storage[3]-dưới-dạng-địa-chỉ |
|     C3 | REVERT   |

Vì vậy, chúng ta `REVERT` với cùng một bộ đệm mà chúng ta đã sử dụng cho `RETURN` trước đó: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Các lệnh gọi ABI {#abi-calls}

Nếu kích thước dữ liệu lệnh gọi là bốn byte trở lên, đây có thể là một lệnh gọi ABI hợp lệ.

| Offset | Mã lệnh      | Ngăn xếp                                          |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((Từ đầu tiên (256 bit) của dữ liệu lệnh gọi)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Từ đầu tiên (256 bit) của dữ liệu lệnh gọi))) |
|     12 | SHR          | (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi)))    |

Etherscan cho chúng ta biết rằng `1C` là một mã lệnh không xác định, bởi vì [nó đã được thêm vào sau khi Etherscan viết tính năng này](https://eips.ethereum.org/EIPS/eip-145) và họ chưa cập nhật nó. Một [bảng mã lệnh cập nhật](https://github.com/wolflo/evm-opcodes) cho chúng ta thấy rằng đây là phép dịch phải

| Offset | Mã lệnh          | Ngăn xếp                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi))) (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi))) (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi))) |
|     19 | GT               | 0x3CD8045E>32-bit-đầu-tiên-của-dữ-liệu-lệnh-gọi (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>32-bit-đầu-tiên-của-dữ-liệu-lệnh-gọi (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi)))            |
|     1D | JUMPI            | (((32 bit (4 byte) đầu tiên của dữ liệu lệnh gọi)))                                                           |

Bằng cách chia các bài kiểm tra khớp chữ ký phương thức làm hai như thế này sẽ tiết kiệm trung bình một nửa số bài kiểm tra. Mã ngay sau phần này và mã ở 0x43 tuân theo cùng một mẫu: `DUP1` 32 bit đầu tiên của dữ liệu lệnh gọi, `PUSH4 (((method signature>`, chạy `EQ` để kiểm tra tính bằng nhau, và sau đó `JUMPI` nếu chữ ký phương thức khớp. Dưới đây là các chữ ký phương thức, địa chỉ của chúng và nếu biết [định nghĩa phương thức tương ứng](https://www.4byte.directory/):

| Phương thức                                                                                 | Chữ ký phương thức | Offset để nhảy tới |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Nếu không tìm thấy kết quả khớp nào, mã sẽ nhảy tới [trình xử lý proxy tại 0x7C](#the-handler-at-0x7c), với hy vọng rằng hợp đồng mà chúng ta đang làm proxy có kết quả khớp.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Mã lệnh       | Ngăn xếp                      |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Điều đầu tiên hàm này làm là kiểm tra xem lệnh gọi có gửi bất kỳ ETH nào hay không. Hàm này không phải là [`payable`](https://solidity-by-example.org/payable/). Nếu ai đó đã gửi ETH cho chúng ta, đó chắc chắn là một sai sót và chúng ta muốn `REVERT` để tránh việc giữ số ETH đó ở nơi mà họ không thể lấy lại.

| Offset | Mã lệnh                                            | Ngăn xếp                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy))) |
|    12D | SWAP2                                             | (((Storage[3] hay còn gọi là hợp đồng mà chúng ta đang làm proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Và 0x80 bây giờ chứa địa chỉ proxy

| Offset | Mã lệnh       | Ngăn xếp     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Mã E4 {#the-e4-code}

Đây là lần đầu tiên chúng ta thấy những dòng này, nhưng chúng được chia sẻ với các phương thức khác (xem bên dưới). Vì vậy, chúng ta sẽ gọi giá trị trong ngăn xếp là X, và chỉ cần nhớ rằng trong `splitter()`, giá trị của X này là 0xA0.

| Offset | Mã lệnh     | Ngăn xếp       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Vì vậy, mã này nhận một con trỏ bộ nhớ trong ngăn xếp (X) và khiến hợp đồng `RETURN` với một bộ đệm là 0x80 - X.

Trong trường hợp của `splitter()`, điều này trả về địa chỉ mà chúng ta đang làm proxy. `RETURN` trả về bộ đệm trong khoảng 0x80-0x9F, đây là nơi chúng ta đã ghi dữ liệu này (offset 0x130 ở trên).

## currentWindow() {#currentwindow}

Mã trong các offset 0x158-0x163 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoại trừ đích đến `JUMPI`), vì vậy chúng ta biết `currentWindow()` cũng không phải là `payable`.

| Offset | Mã lệnh       | Ngăn xếp                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Mã DA {#the-da-code}

Mã này cũng được chia sẻ với các phương thức khác. Vì vậy, chúng ta sẽ gọi giá trị trong ngăn xếp là Y, và chỉ cần nhớ rằng trong `currentWindow()` giá trị của Y này là Storage[1].

| Offset | Mã lệnh     | Ngăn xếp            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Ghi Y vào 0x80-0x9F.

| Offset | Mã lệnh     | Ngăn xếp          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Và phần còn lại đã được giải thích [ở trên](#the-e4-code). Vì vậy, các bước nhảy đến 0xDA sẽ ghi đỉnh ngăn xếp (Y) vào 0x80-0x9F, và trả về giá trị đó. Trong trường hợp của `currentWindow()`, nó trả về Storage[1].

## merkleRoot() {#merkleroot}

Mã ở các offset 0xED-0xF8 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoại trừ đích đến `JUMPI`), vì vậy chúng ta biết `merkleRoot()` cũng không phải là `payable`.

| Offset | Mã lệnh      | Ngăn xếp             |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Những gì xảy ra sau lệnh nhảy thì [chúng ta đã tìm ra](#the-da-code). Vì vậy, `merkleRoot()` trả về Storage[0].

## 0x81e580d3 {#0x81e580d3}

Đoạn mã ở các offset 0x138-0x143 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoại trừ đích đến `JUMPI`), vì vậy chúng ta biết hàm này cũng không phải là `payable`.

| Offset | Mã lệnh      | Stack                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Có vẻ như hàm này nhận ít nhất 32 byte (một word) dữ liệu lệnh gọi.

| Offset | Mã lệnh | Stack                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Nếu nó không nhận được dữ liệu lệnh gọi, giao dịch sẽ bị hoàn nguyên mà không có bất kỳ dữ liệu trả về nào.

Hãy xem điều gì sẽ xảy ra nếu hàm _thực sự_ nhận được dữ liệu lệnh gọi mà nó cần.

| Offset | Mã lệnh      | Stack                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` là word đầu tiên của dữ liệu lệnh gọi _sau_ chữ ký phương thức

| Offset | Mã lệnh      | Stack                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Nếu word đầu tiên không nhỏ hơn Storage[4], hàm sẽ thất bại. Nó hoàn nguyên mà không có bất kỳ giá trị trả về nào:

| Offset | Mã lệnh    | Stack         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Nếu calldataload(4) nhỏ hơn Storage[4], chúng ta có đoạn mã này:

| Offset | Mã lệnh    | Stack                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Và các vị trí bộ nhớ 0x00-0x1F bây giờ chứa dữ liệu 0x04 (0x00-0x1E đều là các số không, 0x1F là bốn)

| Offset | Mã lệnh    | Stack                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Vì vậy, có một bảng tra cứu trong storage, bắt đầu tại SHA3 của 0x000...0004 và có một mục nhập cho mọi giá trị dữ liệu lệnh gọi hợp lệ (giá trị dưới Storage[4]).

| Offset | Mã lệnh | Stack                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Chúng ta đã biết [đoạn mã tại offset 0xDA](#the-da-code) làm gì, nó trả về giá trị trên cùng của stack cho người gọi. Vì vậy, hàm này trả về giá trị từ bảng tra cứu cho người gọi.

## 0x1f135823 {#0x1f135823}

Mã ở các offset 0xC4-0xCF giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoại trừ đích đến `JUMPI`), vì vậy chúng ta biết hàm này cũng không phải là `payable`.

| Offset | Mã lệnh      | Stack             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Chúng ta đã biết [mã tại offset 0xDA](#the-da-code) làm gì, nó trả về giá trị trên cùng của stack cho người gọi. Vì vậy, hàm này trả về `Value*`.

### Tóm tắt phương thức {#method-summary}

Bạn có cảm thấy mình hiểu hợp đồng tại thời điểm này không? Tôi thì không. Cho đến nay chúng ta có các phương thức sau:

| Phương thức                       | Ý nghĩa                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | Chấp nhận giá trị được cung cấp bởi lệnh gọi và tăng `Value*` lên một lượng tương ứng           |
| [splitter()](#splitter)           | Trả về Storage[3], địa chỉ proxy                                                 |
| [currentWindow()](#currentwindow) | Trả về Storage[1]                                                                    |
| [merkleRoot()](#merkleroot)        | Trả về Storage[0]                                                                    |
| [0x81e580d3](#0x81e580d3)         | Trả về giá trị từ một bảng tra cứu, với điều kiện tham số nhỏ hơn Storage[4] |
| [0x1f135823](#0x1f135823)         | Trả về Storage[6], hay còn gọi là Value\*                                                    |

Nhưng chúng ta biết bất kỳ chức năng nào khác đều được cung cấp bởi hợp đồng trong Storage[3]. Có lẽ nếu chúng ta biết hợp đồng đó là gì, nó sẽ cho chúng ta một manh mối. Rất may, đây là Chuỗi khối và mọi thứ đều được biết đến, ít nhất là về mặt lý thuyết. Chúng ta không thấy bất kỳ phương thức nào thiết lập Storage[3], vì vậy nó chắc chắn đã được thiết lập bởi hàm khởi tạo.

## Hàm khởi tạo {#the-constructor}

Khi chúng ta [xem xét một hợp đồng](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), chúng ta cũng có thể thấy giao dịch đã tạo ra nó.

![Click the create transaction](create-tx.png)

Nếu chúng ta nhấp vào giao dịch đó, và sau đó là tab **Trạng thái**, chúng ta có thể thấy các giá trị ban đầu của các tham số. Cụ thể, chúng ta có thể thấy rằng Storage[3] chứa [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Hợp đồng đó chắc chắn chứa chức năng còn thiếu. Chúng ta có thể hiểu nó bằng cách sử dụng cùng các công cụ mà chúng ta đã sử dụng cho hợp đồng đang được điều tra.

## Hợp đồng proxy {#the-proxy-contract}

Sử dụng cùng các kỹ thuật mà chúng ta đã dùng cho hợp đồng gốc ở trên, chúng ta có thể thấy rằng hợp đồng hoàn nguyên nếu:

- Có bất kỳ ETH nào được đính kèm vào lệnh gọi (0x05-0x0F)
- Kích thước dữ liệu lệnh gọi nhỏ hơn bốn (0x10-0x19 và 0xBE-0xC2)

Và các phương thức mà nó hỗ trợ là:

| Phương thức                                                                                                          | Chữ ký phương thức             | Offset để nhảy vào |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Chúng ta có thể bỏ qua bốn phương thức dưới cùng vì chúng ta sẽ không bao giờ dùng đến chúng. Chữ ký của chúng cho thấy hợp đồng gốc của chúng ta tự xử lý chúng (bạn có thể nhấp vào các chữ ký để xem chi tiết ở trên), vì vậy chúng chắc chắn là [các phương thức bị ghi đè](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Một trong những phương thức còn lại là `claim(<params>)`, và một phương thức khác là `isClaimed(<params>)`, vì vậy nó trông giống như một hợp đồng airdrop. Thay vì đi qua phần còn lại theo từng mã lệnh, chúng ta có thể [thử dùng trình dịch ngược (decompiler)](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), công cụ này tạo ra các kết quả có thể sử dụng được cho ba hàm từ hợp đồng này. Việc dịch ngược các hàm khác được để lại như một bài tập cho người đọc.

### scaleAmountByPercentage {#scaleamountbypercentage}

Đây là những gì trình dịch ngược cung cấp cho chúng ta đối với hàm này:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Lệnh `require` đầu tiên kiểm tra xem dữ liệu lệnh gọi có, ngoài bốn byte của chữ ký hàm, ít nhất 64 byte hay không, đủ cho hai tham số. Nếu không thì rõ ràng là có điều gì đó sai.

Câu lệnh `if` dường như kiểm tra xem `_param1` không phải là số không, và `_param1 * _param2` không phải là số âm. Điều này có lẽ là để ngăn chặn các trường hợp tràn số (wrap around).

Cuối cùng, hàm trả về một giá trị đã được chia tỷ lệ.

### claim {#claim}

Mã mà trình dịch ngược tạo ra rất phức tạp và không phải tất cả đều liên quan đến chúng ta. Tôi sẽ bỏ qua một số phần để tập trung vào các dòng mà tôi tin là cung cấp thông tin hữu ích

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Chúng ta thấy ở đây hai điều quan trọng:

- `_param2`, mặc dù được khai báo là `uint256`, nhưng thực chất là một địa chỉ
- `_param1` là cửa sổ (window) đang được yêu cầu nhận, phải là `currentWindow` hoặc sớm hơn.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Vì vậy, bây giờ chúng ta biết rằng Storage[5] là một mảng các cửa sổ và địa chỉ, và liệu địa chỉ đó đã yêu cầu nhận phần thưởng cho cửa sổ đó hay chưa.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Chúng ta biết rằng `unknown2eb4a7ab` thực chất là hàm `merkleRoot()`, vì vậy đoạn mã này trông giống như nó đang xác minh một [bằng chứng Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Điều này có nghĩa là `_param4` là một bằng chứng Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Đây là cách một hợp đồng chuyển ETH của chính nó sang một địa chỉ khác (hợp đồng hoặc tài khoản sở hữu bên ngoài). Nó gọi địa chỉ đó với một giá trị là số tiền cần chuyển. Vì vậy, có vẻ như đây là một đợt airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Hai dòng dưới cùng cho chúng ta biết rằng Storage[2] cũng là một hợp đồng mà chúng ta gọi. Nếu chúng ta [nhìn vào giao dịch của hàm khởi tạo](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), chúng ta thấy rằng hợp đồng này là [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), một hợp đồng Ether được bọc (WETH) [có mã nguồn đã được tải lên Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Vì vậy, có vẻ như hợp đồng cố gắng gửi ETH đến `_param2`. Nếu nó có thể làm được, thật tuyệt. Nếu không, nó cố gắng gửi [WETH](https://weth.tkn.eth.limo/). Nếu `_param2` là một tài khoản sở hữu bên ngoài (EOA) thì nó luôn có thể nhận ETH, nhưng các hợp đồng có thể từ chối nhận ETH. Tuy nhiên, WETH là ERC-20 và các hợp đồng không thể từ chối chấp nhận điều đó.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Ở cuối hàm, chúng ta thấy một mục nhật ký đang được tạo. [Hãy xem các mục nhật ký được tạo](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) và lọc theo chủ đề bắt đầu bằng `0xdbd5...`. Nếu chúng ta [nhấp vào một trong các giao dịch đã tạo ra mục như vậy](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), chúng ta thấy rằng nó thực sự trông giống như một yêu cầu nhận - tài khoản đã gửi một thông điệp đến hợp đồng mà chúng ta đang dịch ngược, và đổi lại nhận được ETH.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Hàm này rất giống với [`claim`](#claim) ở trên. Nó cũng kiểm tra một bằng chứng Merkle, cố gắng chuyển ETH cho người đầu tiên và tạo ra cùng một loại mục nhật ký.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Sự khác biệt chính là tham số đầu tiên, cửa sổ để rút tiền, không có ở đó. Thay vào đó, có một vòng lặp qua tất cả các cửa sổ có thể được yêu cầu nhận.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Vì vậy, nó trông giống như một biến thể `claim` yêu cầu nhận tất cả các cửa sổ.

## Kết luận {#conclusion}

Đến đây, bạn đã biết cách để hiểu các hợp đồng không có sẵn mã nguồn, bằng cách sử dụng các mã lệnh hoặc (khi nó hoạt động) trình dịch ngược. Như có thể thấy rõ từ độ dài của bài viết này, việc dịch ngược một hợp đồng không hề đơn giản, nhưng trong một hệ thống nơi bảo mật là yếu tố thiết yếu, thì khả năng xác minh các hợp đồng hoạt động đúng như cam kết là một kỹ năng quan trọng.

[Xem thêm các bài viết khác của tôi tại đây](https://cryptodocguy.pro/).