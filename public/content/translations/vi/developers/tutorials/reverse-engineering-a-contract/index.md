---
title: "Thiết kế ngược một hợp đồng"
description: Cách hiểu một hợp đồng khi bạn không có mã nguồn
author: Ori Pomerantz
lang: vi
tags: [ "evm", "mã vận hành" ]
skill: advanced
published: 2021-12-30
---

## Giới thiệu {#introduction}

_Không có bí mật nào trên chuỗi khối_, mọi thứ xảy ra đều nhất quán, có thể kiểm chứng và có sẵn công khai. Lý tưởng nhất là [các hợp đồng nên được công bố và xác minh mã nguồn trên Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Tuy nhiên, [không phải lúc nào cũng vậy](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Trong bài viết này, bạn sẽ học cách thiết kế ngược các hợp đồng bằng cách xem một hợp đồng không có mã nguồn, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Có các trình biên dịch ngược, nhưng chúng không phải lúc nào cũng tạo ra [kết quả có thể sử dụng được](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Trong bài viết này, bạn sẽ học cách thiết kế ngược thủ công và hiểu một hợp đồng từ [các mã vận hành](https://github.com/wolflo/evm-opcodes), cũng như cách diễn giải kết quả của một trình biên dịch ngược.

Để có thể hiểu bài viết này, bạn nên biết những điều cơ bản về EVM và ít nhất đã phần nào quen thuộc với trình hợp dịch EVM. [Bạn có thể đọc về các chủ đề này ở đây](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Chuẩn bị mã thực thi {#prepare-the-executable-code}

Bạn có thể lấy mã vận hành bằng cách truy cập Etherscan cho hợp đồng, nhấp vào tab **Hợp đồng** rồi **Chuyển sang Chế độ xem Mã vận hành**. Bạn sẽ có được chế độ xem là một mã vận hành trên mỗi dòng.

![Chế độ xem Mã vận hành từ Etherscan](opcode-view.png)

Tuy nhiên, để có thể hiểu các bước nhảy, bạn cần biết mỗi mã vận hành nằm ở đâu trong mã. Để làm điều đó, một cách là mở Google Spreadsheet và dán các mã vận hành vào cột C. [Bạn có thể bỏ qua các bước sau bằng cách tạo một bản sao của bảng tính đã được chuẩn bị sẵn này](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Bước tiếp theo là lấy đúng vị trí mã để chúng ta có thể hiểu được các bước nhảy. Chúng ta sẽ đặt kích thước mã vận hành vào cột B và vị trí (theo hệ thập lục phân) vào cột A. Nhập hàm này vào ô `B1` rồi sao chép và dán vào phần còn lại của cột B, cho đến cuối mã. Sau khi thực hiện xong, bạn có thể ẩn cột B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Đầu tiên, hàm này thêm một byte cho chính mã vận hành, sau đó tìm kiếm `PUSH`. Mã vận hành đẩy là đặc biệt vì chúng cần có thêm các byte cho giá trị được đẩy. Nếu mã vận hành là `PUSH`, chúng ta sẽ trích xuất số lượng byte và cộng vào đó.

Trong ô `A1`, hãy đặt độ lệch đầu tiên là 0. Sau đó, trong ô `A2`, hãy đặt hàm này và một lần nữa sao chép và dán nó cho phần còn lại của cột A:

```
=dec2hex(hex2dec(A1)+B1)
```

Chúng ta cần hàm này để cung cấp giá trị thập lục phân vì các giá trị được đẩy trước các bước nhảy (`JUMP` và `JUMPI`) được cung cấp cho chúng ta dưới dạng thập lục phân.

## Điểm vào (0x00) {#the-entry-point-0x00}

Các hợp đồng luôn được thực thi từ byte đầu tiên. Đây là phần đầu của mã:

| Độ lệch | Mã vận hành  | Ngăn xếp (sau mã vận hành)  |
| ------: | ------------ | ---------------------------------------------- |
|       0 | PUSH1 0x80   | 0x80                                           |
|       2 | PUSH1 0x40   | 0x40, 0x80                                     |
|       4 | MSTORE       | Trống                                          |
|       5 | PUSH1 0x04   | 0x04                                           |
|       7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|       8 | LT           | CALLDATASIZE\<4      |
|       9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|       C | JUMPI        | Trống                                          |

Mã này thực hiện hai việc:

1. Ghi 0x80 dưới dạng giá trị 32 byte vào các vị trí bộ nhớ 0x40-0x5F (0x80 được lưu trữ trong 0x5F, và 0x40-0x5E đều bằng 0).
2. Đọc kích thước calldata. Thông thường, dữ liệu cuộc gọi cho hợp đồng Ethereum tuân theo [ABI (giao diện nhị phân ứng dụng)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), yêu cầu tối thiểu bốn byte cho bộ chọn hàm. Nếu kích thước dữ liệu cuộc gọi nhỏ hơn bốn, hãy nhảy đến 0x5E.

![Lưu đồ cho phần này](flowchart-entry.png)

### Trình xử lý tại 0x5E (cho dữ liệu cuộc gọi không phải ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Độ lệch | Mã vận hành  |
| ------: | ------------ |
|      5E | JUMPDEST     |
|      5F | CALLDATASIZE |
|      60 | PUSH2 0x007c |
|      63 | JUMPI        |

Đoạn mã này bắt đầu bằng `JUMPDEST`. Các chương trình EVM (máy ảo ethereum) sẽ đưa ra một ngoại lệ nếu bạn nhảy đến một mã vận hành không phải là `JUMPDEST`. Sau đó, nó xem xét CALLDATASIZE, và nếu nó là "true" (nghĩa là không bằng không) thì sẽ nhảy đến 0x7C. Chúng ta sẽ nói về điều đó ở bên dưới.

| Độ lệch | Mã vận hành | Ngăn xếp (sau mã vận hành)                                                            |
| ------: | ----------- | -------------------------------------------------------------------------------------------------------- |
|      64 | CALLVALUE   | [Wei](/glossary/#wei) được cung cấp bởi lệnh gọi. Được gọi là `msg.value` trong Solidity |
|      65 | PUSH1 0x06  | 6 CALLVALUE                                                                                              |
|      67 | PUSH1 0x00  | 0 6 CALLVALUE                                                                                            |
|      69 | DUP3        | CALLVALUE 0 6 CALLVALUE                                                                                  |
|      6A | DUP3        | 6 CALLVALUE 0 6 CALLVALUE                                                                                |
|      6B | SLOAD       | Lưu trữ[6] CALLVALUE 0 6 CALLVALUE                   |

Vì vậy, khi không có dữ liệu cuộc gọi, chúng ta sẽ đọc giá trị của Lưu trữ[6]. Chúng ta chưa biết giá trị này là gì, nhưng chúng ta có thể tìm kiếm các giao dịch mà hợp đồng đã nhận được mà không có dữ liệu cuộc gọi. Các giao dịch chỉ chuyển ETH mà không có bất kỳ dữ liệu cuộc gọi nào (và do đó không có phương thức nào) có trong Etherscan phương thức `Chuyển`. Trên thực tế, [giao dịch đầu tiên mà hợp đồng nhận được](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) là một giao dịch chuyển.

Nếu chúng ta xem xét giao dịch đó và nhấp vào **Nhấp để xem thêm**, chúng ta sẽ thấy rằng dữ liệu cuộc gọi, được gọi là dữ liệu đầu vào, thực sự trống (`0x`). Cũng lưu ý rằng giá trị là 1,559 ETH, điều này sẽ có liên quan sau.

![Dữ liệu cuộc gọi trống](calldata-empty.png)

Tiếp theo, nhấp vào tab **Trạng thái** và mở rộng hợp đồng mà chúng ta đang thiết kế ngược (0x2510...). Bạn có thể thấy rằng `Lưu trữ[6]` đã thay đổi trong giao dịch, và nếu bạn đổi Hex thành **Số**, bạn sẽ thấy nó trở thành 1.559.000.000.000.000.000, giá trị được chuyển bằng wei (tôi đã thêm dấu phẩy cho rõ ràng), tương ứng với giá trị hợp đồng tiếp theo.

![Thay đổi trong Lưu trữ[6]](storage6.png)

Nếu chúng ta xem xét các thay đổi trạng thái gây ra bởi [các giao dịch `Chuyển` khác từ cùng thời kỳ](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), chúng ta thấy rằng `Lưu trữ[6]` đã theo dõi giá trị của hợp đồng trong một thời gian. Hiện tại, chúng ta sẽ gọi nó là `Giá trị*`. Dấu hoa thị (`*`) nhắc nhở chúng ta rằng chúng ta chưa _biết_ biến này làm gì, nhưng nó không thể chỉ để theo dõi giá trị hợp đồng vì không cần sử dụng bộ nhớ, vốn rất tốn kém, khi bạn có thể nhận được số dư tài khoản của mình bằng cách sử dụng `ĐỊA CHỈ SỐ DƯ`. Mã vận hành đầu tiên đẩy địa chỉ riêng của hợp đồng. Mã thứ hai đọc địa chỉ ở đầu ngăn xếp và thay thế nó bằng số dư của địa chỉ đó.

| Độ lệch | Mã vận hành  | Stack                                         |
| ------: | ------------ | --------------------------------------------- |
|      6C | PUSH2 0x0075 | 0x75 Giá trị\* CALLVALUE 0 6 CALLVALUE        |
|      6F | SWAP2        | CALLVALUE Giá trị\* 0x75 0 6 CALLVALUE        |
|      70 | SWAP1        | Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE        |
|      71 | PUSH2 0x01a7 | 0x01A7 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE |
|      74 | JUMP         |                                               |

Chúng ta sẽ tiếp tục theo dõi mã này tại đích nhảy.

| Độ lệch | Mã vận hành | Stack                                                         |
| ------: | ----------- | ------------------------------------------------------------- |
|     1A7 | JUMPDEST    | Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|     1A8 | PUSH1 0x00  | 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|     1AA | DUP3        | CALLVALUE 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE         |
|     1AB | NOT         | 2^256-CALLVALUE-1 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` là theo bit, vì vậy nó đảo ngược giá trị của mọi bit trong giá trị cuộc gọi.

| Độ lệch | Mã vận hành  | Stack                                                                                                      |
| ------: | ------------ | ---------------------------------------------------------------------------------------------------------- |
|     1AC | DUP3         | Giá trị\* 2^256-CALLVALUE-1 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|     1AD | GT           | Giá trị\*>2^256-CALLVALUE-1 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|     1AE | ISZERO       | Giá trị\*\<=2^256-CALLVALUE-1 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     1AF | PUSH2 0x01df | 0x01DF Giá trị\*\<=2^256-CALLVALUE-1 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE |
|     1B2 | JUMPI        |                                                                                                            |

Chúng ta sẽ nhảy nếu `Giá trị*` nhỏ hơn hoặc bằng 2^256-CALLVALUE-1. Điều này có vẻ giống như logic để ngăn chặn tràn số. Và thực vậy, chúng ta thấy rằng sau một vài hoạt động vô nghĩa (ví dụ: ghi vào bộ nhớ sắp bị xóa) ở độ lệch 0x01DE, hợp đồng sẽ hoàn nguyên nếu phát hiện tràn số, đây là hành vi bình thường.

Lưu ý rằng một sự tràn số như vậy là cực kỳ khó xảy ra, bởi vì nó sẽ yêu cầu giá trị cuộc gọi cộng với `Giá trị*` phải tương đương với 2^256 wei, khoảng 10^59 ETH. [Tổng cung ETH, tại thời điểm viết bài, là dưới hai trăm triệu](https://etherscan.io/stat/supply).

| Độ lệch | Mã vận hành | Stack                                       |
| ------: | ----------- | ------------------------------------------- |
|     1DF | JUMPDEST    | 0x00 Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE |
|     1E0 | POP         | Giá trị\* CALLVALUE 0x75 0 6 CALLVALUE      |
|     1E1 | ADD         | Giá trị\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|     1E2 | SWAP1       | 0x75 Giá trị\*+CALLVALUE 0 6 CALLVALUE      |
|     1E3 | JUMP        |                                             |

Nếu chúng ta đến đây, hãy lấy `Giá trị* + CALLVALUE` và nhảy đến độ lệch 0x75.

| Độ lệch | Mã vận hành | Stack                             |
| ------: | ----------- | --------------------------------- |
|      75 | JUMPDEST    | Giá trị\*+CALLVALUE 0 6 CALLVALUE |
|      76 | SWAP1       | 0 Giá trị\*+CALLVALUE 6 CALLVALUE |
|      77 | SWAP2       | 6 Giá trị\*+CALLVALUE 0 CALLVALUE |
|      78 | SSTORE      | 0 CALLVALUE                       |

Nếu chúng ta đến đây (yêu cầu dữ liệu cuộc gọi phải trống), chúng ta sẽ cộng giá trị cuộc gọi vào `Giá trị*`. Điều này phù hợp với những gì chúng ta nói về giao dịch `Chuyển`.

| Độ lệch | Mã vận hành |
| ------: | ----------- |
|      79 | POP         |
|      7A | POP         |
|      7B | STOP        |

Cuối cùng, xóa ngăn xếp (điều này không cần thiết) và báo hiệu kết thúc thành công giao dịch.

Tóm lại, đây là lưu đồ cho mã ban đầu.

![Lưu đồ điểm vào](flowchart-entry.png)

## Trình xử lý tại 0x7C {#the-handler-at-0x7c}

Tôi đã cố tình không đưa vào tiêu đề những gì trình xử lý này thực hiện. Vấn đề không phải là dạy bạn cách hoạt động của hợp đồng cụ thể này, mà là cách để thiết kế ngược các hợp đồng. Bạn sẽ học được những gì nó làm theo cách tương tự như tôi đã làm, bằng cách theo dõi mã.

Chúng ta đến đây từ một số nơi:

- Nếu có dữ liệu cuộc gọi 1, 2 hoặc 3 byte (từ độ lệch 0x63)
- Nếu chữ ký phương thức không xác định (từ độ lệch 0x42 và 0x5D)

| Độ lệch | Mã vận hành  | Stack                                                                    |
| ------: | ------------ | ------------------------------------------------------------------------ |
|      7C | JUMPDEST     |                                                                          |
|      7D | PUSH1 0x00   | 0x00                                                                     |
|      7F | PUSH2 0x009d | 0x9D 0x00                                                                |
|      82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                           |
|      84 | SLOAD        | Lưu trữ[3] 0x9D 0x00 |

Đây là một ô lưu trữ khác, một ô mà tôi không thể tìm thấy trong bất kỳ giao dịch nào nên khó biết ý nghĩa của nó hơn. Mã dưới đây sẽ làm cho nó rõ ràng hơn.

| Độ lệch | Mã vận hành                                       | Stack                                                                                                                                               |
| ------: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|      85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Lưu trữ[3] 0x9D 0x00 |
|      9A | AND                                               | Lưu trữ[3]-dưới dạng-địa chỉ 0x9D 0x00                                                          |

Các mã vận hành này cắt bớt giá trị chúng ta đọc từ Lưu trữ[3] thành 160 bit, độ dài của một địa chỉ Ethereum.

| Độ lệch | Mã vận hành | Stack                                                                                      |
| ------: | ----------- | ------------------------------------------------------------------------------------------ |
|      9B | SWAP1       | 0x9D Lưu trữ[3]-dưới dạng-địa chỉ 0x00 |
|      9C | JUMP        | Lưu trữ[3]-dưới dạng-địa chỉ 0x00      |

Bước nhảy này là thừa, vì chúng ta sẽ đi đến mã vận hành tiếp theo. Mã này không hiệu quả về gas như nó có thể.

| Độ lệch | Mã vận hành | Stack                                                                                                                                          |
| ------: | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|      9D | JUMPDEST    | Lưu trữ[3]-dưới dạng-địa chỉ 0x00                                                          |
|      9E | SWAP1       | 0x00 Lưu trữ[3]-dưới dạng-địa chỉ                                                          |
|      9F | POP         | Lưu trữ[3]-dưới dạng-địa chỉ                                                               |
|      A0 | PUSH1 0x40  | 0x40 Lưu trữ[3]-dưới dạng-địa chỉ                                                          |
|      A2 | MLOAD       | Mem[0x40] Lưu trữ[3]-dưới dạng-địa chỉ |

Ngay từ đầu mã, chúng ta đã đặt Mem[0x40] thành 0x80. Nếu chúng ta tìm 0x40 sau đó, chúng ta thấy rằng chúng ta không thay đổi nó - vì vậy chúng ta có thể giả định nó là 0x80.

| Độ lệch | Mã vận hành  | Stack                                                                                                        |
| ------: | ------------ | ------------------------------------------------------------------------------------------------------------ |
|      A3 | CALLDATASIZE | CALLDATASIZE 0x80 Lưu trữ[3]-dưới dạng-địa chỉ           |
|      A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Lưu trữ[3]-dưới dạng-địa chỉ      |
|      A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Lưu trữ[3]-dưới dạng-địa chỉ |
|      A7 | CALLDATACOPY | 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                        |

Sao chép tất cả dữ liệu cuộc gọi vào bộ nhớ, bắt đầu từ 0x80.

| Độ lệch | Mã vận hành                        | Stack                                                                                                                                                                                                  |
| ------: | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      A8 | PUSH1 0x00                         | 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                                             |
|      AA | DUP1                               | 0x00 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                                        |
|      AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                           |
|      AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                      |
|      AD | DUP6                               | Lưu trữ[3]-dưới dạng-địa chỉ 0x80 CALLDATASIZE 0x00 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ     |
|      AE | GAS                                | GAS Lưu trữ[3]-dưới dạng-địa chỉ 0x80 CALLDATASIZE 0x00 0x00 0x80 Lưu trữ[3]-dưới dạng-địa chỉ |
|      AF | DELEGATE_CALL |                                                                                                                                                                                                        |

Bây giờ mọi thứ đã rõ ràng hơn rất nhiều. Hợp đồng này có thể hoạt động như một [proxy](https://blog.openzeppelin.com/proxy-patterns/), gọi địa chỉ trong Lưu trữ[3] để thực hiện công việc thực sự. `DELEGATE_CALL` gọi một hợp đồng riêng biệt, nhưng vẫn ở trong cùng một bộ lưu trữ. Điều này có nghĩa là hợp đồng được ủy quyền, hợp đồng mà chúng ta là proxy, truy cập vào cùng một không gian lưu trữ. Các thông số cho cuộc gọi là:

- _Gas_: Tất cả gas còn lại
- _Địa chỉ được gọi_: Lưu trữ[3]-dưới dạng-địa chỉ
- _Dữ liệu cuộc gọi_: Các byte CALLDATASIZE bắt đầu từ 0x80, là nơi chúng ta đặt dữ liệu cuộc gọi gốc
- _Dữ liệu trả về_: Không có (0x00 - 0x00) Chúng ta sẽ nhận được dữ liệu trả về bằng các phương tiện khác (xem bên dưới)

| Độ lệch | Mã vận hành    | Stack                                                                                                                                                                                                                |
| ------: | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      B0 | RETURNDATASIZE | RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                          |
|      B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ           |
|      B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ      |
|      B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ |
|      B5 | RETURNDATACOPY | RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                          |

Tại đây, chúng tôi sao chép tất cả dữ liệu trả về vào bộ đệm bộ nhớ bắt đầu từ 0x80.

| Độ lệch | Mã vận hành  | Stack                                                                                                                                                                                                                                                                                                                                                                                       |
| ------: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      B6 | DUP2         | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                                          |
|      B7 | DUP1         | (((gọi thành công/thất bại))) (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                   |
|      B8 | ISZERO       | (((cuộc gọi có thất bại không))) (((cuộc gọi thành công/thất bại))) RETURNDATASIZE (((cuộc gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ      |
|      B9 | PUSH2 0x00c0 | 0xC0 (((cuộc gọi có thất bại không))) (((cuộc gọi thành công/thất bại))) RETURNDATASIZE (((cuộc gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ |
|      BC | JUMPI        | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                                          |
|      BD | DUP2         | RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                           |
|      BE | DUP5         | 0x80 RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                                                                                      |
|      BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                                                             |

Vì vậy, sau cuộc gọi, chúng tôi sao chép dữ liệu trả về vào bộ đệm 0x80 - 0x80+RETURNDATASIZE và nếu cuộc gọi thành công, chúng tôi sẽ `TRẢ VỀ` chính xác bộ đệm đó.

### DELEGATECALL thất bại {#delegatecall-failed}

Nếu chúng ta đến đây, đến 0xC0, điều đó có nghĩa là hợp đồng mà chúng ta đã gọi đã hoàn nguyên. Vì chúng ta chỉ là một proxy cho hợp đồng đó, chúng ta muốn trả về cùng một dữ liệu và cũng hoàn nguyên.

| Độ lệch | Mã vận hành | Stack                                                                                                                                                                                                                                                                                                  |
| ------: | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|      C0 | JUMPDEST    | (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ                     |
|      C1 | DUP2        | RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ      |
|      C2 | DUP5        | 0x80 RETURNDATASIZE (((gọi thành công/thất bại))) RETURNDATASIZE (((gọi thành công/thất bại))) 0x80 Lưu trữ[3]-dưới dạng-địa chỉ |
|      C3 | REVERT      |                                                                                                                                                                                                                                                                                                        |

Vì vậy, chúng ta `HOÀN NGUYÊN` với cùng một bộ đệm mà chúng ta đã sử dụng cho `TRẢ VỀ` trước đó: 0x80 - 0x80+RETURNDATASIZE

![Lưu đồ cuộc gọi đến proxy](flowchart-proxy.png)

## Các lệnh gọi ABI {#abi-calls}

Nếu kích thước dữ liệu cuộc gọi là bốn byte trở lên, đây có thể là một cuộc gọi ABI hợp lệ.

| Độ lệch | Mã vận hành  | Stack                                                                                                                             |
| ------: | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
|       D | PUSH1 0x00   | 0x00                                                                                                                              |
|       F | CALLDATALOAD | (((Từ đầu tiên (256 bit) của dữ liệu cuộc gọi)))      |
|      10 | PUSH1 0xe0   | 0xE0 (((Từ đầu tiên (256 bit) của dữ liệu cuộc gọi))) |
|      12 | SHR          | (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi)))   |

Etherscan cho chúng ta biết rằng `1C` là một mã vận hành không xác định, bởi vì [nó đã được thêm vào sau khi Etherscan viết tính năng này](https://eips.ethereum.org/EIPS/eip-145) và họ chưa cập nhật nó. Một [bảng mã vận hành cập nhật](https://github.com/wolflo/evm-opcodes) cho chúng ta thấy đây là dịch phải

| Độ lệch | Mã vận hành      | Stack                                                                                                                                                                                                                                                                      |
| ------: | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      13 | DUP1             | (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi))) (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi)))            |
|      14 | PUSH4 0x3cd8045e | 0x3CD8045E (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi))) (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi))) |
|      19 | GT               | 0x3CD8045E>dữ liệu-cuộc-gọi-32-bit-đầu tiên (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi)))                                                                                                |
|      1A | PUSH2 0x0043     | 0x43 0x3CD8045E>dữ liệu-cuộc-gọi-32-bit-đầu tiên (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi)))                                                                                           |
|      1D | JUMPI            | (((32 bit đầu tiên (4 byte) của dữ liệu cuộc gọi)))                                                                                                                                            |

Bằng cách chia các bài kiểm tra khớp chữ ký phương thức thành hai như thế này, trung bình sẽ tiết kiệm được một nửa số bài kiểm tra. Mã ngay sau mã này và mã trong 0x43 tuân theo cùng một mẫu: `DUP1` 32 bit đầu tiên của dữ liệu cuộc gọi, `PUSH4 (((chữ ký phương thức)`, chạy `EQ` để kiểm tra sự bằng nhau, và sau đó là `JUMPI` nếu chữ ký phương thức khớp. Dưới đây là các chữ ký phương thức, địa chỉ của chúng và nếu biết [định nghĩa phương thức tương ứng](https://www.4byte.directory/):

| Phương pháp                                                                                               | Chữ ký phương thức | Độ lệch để nhảy vào |
| --------------------------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e         | 0x0103              |
| ???                                                                                                       | 0x81e580d3         | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4         | 0x0158              |
| ???                                                                                                       | 0x1f135823         | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab         | 0x00ED              |

Nếu không tìm thấy kết quả phù hợp, mã sẽ chuyển đến [trình xử lý proxy tại 0x7C](#the-handler-at-0x7c), với hy vọng rằng hợp đồng mà chúng tôi là proxy có kết quả phù hợp.

![Lưu đồ các lệnh gọi ABI](flowchart-abi.png)

## splitter() {#splitter}

| Độ lệch | Mã vận hành  | Stack                         |
| ------: | ------------ | ----------------------------- |
|     103 | JUMPDEST     |                               |
|     104 | CALLVALUE    | CALLVALUE                     |
|     105 | DUP1         | CALLVALUE CALLVALUE           |
|     106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|     107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|     10A | JUMPI        | CALLVALUE                     |
|     10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|     10D | DUP1         | 0x00 0x00 CALLVALUE           |
|     10E | REVERT       |                               |

Điều đầu tiên mà hàm này thực hiện là kiểm tra xem lệnh gọi có gửi bất kỳ ETH nào không. Hàm này không phải là [`payable`](https://solidity-by-example.org/payable/). Nếu ai đó gửi ETH cho chúng tôi, đó phải là một sai lầm và chúng tôi muốn `HOÀN NGUYÊN` để tránh việc ETH đó ở nơi họ không thể lấy lại được.

| Độ lệch | Mã vận hành                                       | Stack                                                                                                                                                                                                                                       |
| ------: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     10F | JUMPDEST                                          |                                                                                                                                                                                                                                             |
|     110 | POP                                               |                                                                                                                                                                                                                                             |
|     111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                                        |
|     113 | SLOAD                                             | (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy)))                                                                |
|     114 | PUSH1 0x40                                        | 0x40 (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy)))                                                           |
|     116 | MLOAD                                             | 0x80 (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy)))                                                           |
|     117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy))) |
|     12C | SWAP1                                             | 0x80 0xFF...FF (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy))) |
|     12D | SWAP2                                             | (((Lưu trữ[3] hay còn gọi là hợp đồng mà chúng tôi làm proxy))) 0xFF...FF 0x80 |
|     12E | AND                                               | Địa chỉ proxy 0x80                                                                                                                                                                                                                          |
|     12F | DUP2                                              | 0x80 Địa chỉ proxy 0x80                                                                                                                                                                                                                     |
|     130 | MSTORE                                            | 0x80                                                                                                                                                                                                                                        |

Và 0x80 bây giờ chứa địa chỉ proxy

| Độ lệch | Mã vận hành  | Stack     |
| ------: | ------------ | --------- |
|     131 | PUSH1 0x20   | 0x20 0x80 |
|     133 | ADD          | 0xA0      |
|     134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|     137 | JUMP         | 0xA0      |

### Mã E4 {#the-e4-code}

Đây là lần đầu tiên chúng tôi thấy những dòng này, nhưng chúng được chia sẻ với các phương thức khác (xem bên dưới). Vì vậy, chúng ta sẽ gọi giá trị trong ngăn xếp là X và chỉ cần nhớ rằng trong `splitter()`, giá trị của X này là 0xA0.

| Độ lệch | Mã vận hành | Stack       |
| ------: | ----------- | ----------- |
|      E4 | JUMPDEST    | X           |
|      E5 | PUSH1 0x40  | 0x40 X      |
|      E7 | MLOAD       | 0x80 X      |
|      E8 | DUP1        | 0x80 0x80 X |
|      E9 | SWAP2       | X 0x80 0x80 |
|      EA | SUB         | X-0x80 0x80 |
|      EB | SWAP1       | 0x80 X-0x80 |
|      EC | RETURN      |             |

Vì vậy, mã này nhận một con trỏ bộ nhớ trong ngăn xếp (X), và làm cho hợp đồng `TRẢ VỀ` với một bộ đệm là 0x80 - X.

Trong trường hợp của `splitter()`, điều này trả về địa chỉ mà chúng tôi là một proxy. `RETURN` trả về bộ đệm trong 0x80-0x9F, đây là nơi chúng tôi đã viết dữ liệu này (độ lệch 0x130 ở trên).

## currentWindow() {#currentwindow}

Mã ở độ lệch 0x158-0x163 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoài đích `JUMPI`), vì vậy chúng ta biết `currentWindow()` cũng không phải là `payable`.

| Độ lệch | Mã vận hành  | Stack                                                                    |
| ------: | ------------ | ------------------------------------------------------------------------ |
|     164 | JUMPDEST     |                                                                          |
|     165 | POP          |                                                                          |
|     166 | PUSH2 0x00da | 0xDA                                                                     |
|     169 | PUSH1 0x01   | 0x01 0xDA                                                                |
|     16B | SLOAD        | Lưu trữ[1] 0xDA      |
|     16C | DUP2         | 0xDA Lưu trữ[1] 0xDA |
|     16D | JUMP         | Lưu trữ[1] 0xDA      |

### Mã DA {#the-da-code}

Mã này cũng được chia sẻ với các phương pháp khác. Vì vậy, chúng ta sẽ gọi giá trị trong ngăn xếp là Y và chỉ cần nhớ rằng trong `currentWindow()`, giá trị của Y này là Lưu trữ[1].

| Độ lệch | Mã vận hành | Stack            |
| ------: | ----------- | ---------------- |
|      DA | JUMPDEST    | Y 0xDA           |
|      DB | PUSH1 0x40  | 0x40 Y 0xDA      |
|      DD | MLOAD       | 0x80 Y 0xDA      |
|      DE | SWAP1       | Y 0x80 0xDA      |
|      DF | DUP2        | 0x80 Y 0x80 0xDA |
|      E0 | MSTORE      | 0x80 0xDA        |

Viết Y vào 0x80-0x9F.

| Độ lệch | Mã vận hành | Stack          |
| ------: | ----------- | -------------- |
|      E1 | PUSH1 0x20  | 0x20 0x80 0xDA |
|      E3 | ADD         | 0xA0 0xDA      |

Và phần còn lại đã được giải thích [ở trên](#the-e4-code). Vì vậy, các bước nhảy đến 0xDA sẽ ghi giá trị trên cùng của ngăn xếp (Y) vào 0x80-0x9F và trả về giá trị đó. Trong trường hợp của `currentWindow()`, nó trả về Lưu trữ[1].

## merkleRoot() {#merkleroot}

Mã ở độ lệch 0xED-0xF8 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoài đích `JUMPI`), vì vậy chúng ta biết `merkleRoot()` cũng không phải là `payable`.

| Độ lệch | Mã vận hành  | Stack                                                                    |
| ------: | ------------ | ------------------------------------------------------------------------ |
|      F9 | JUMPDEST     |                                                                          |
|      FA | POP          |                                                                          |
|      FB | PUSH2 0x00da | 0xDA                                                                     |
|      FE | PUSH1 0x00   | 0x00 0xDA                                                                |
|     100 | SLOAD        | Lưu trữ[0] 0xDA      |
|     101 | DUP2         | 0xDA Lưu trữ[0] 0xDA |
|     102 | JUMP         | Lưu trữ[0] 0xDA      |

Điều gì xảy ra sau khi nhảy [chúng ta đã tìm ra](#the-da-code). Vì vậy, `merkleRoot()` trả về Lưu trữ[0].

## 0x81e580d3 {#0x81e580d3}

Mã ở độ lệch 0x138-0x143 giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoài đích `JUMPI`), vì vậy chúng ta biết hàm này cũng không phải là `payable`.

| Độ lệch | Mã vận hành  | Stack                                                                           |
| ------: | ------------ | ------------------------------------------------------------------------------- |
|     144 | JUMPDEST     |                                                                                 |
|     145 | POP          |                                                                                 |
|     146 | PUSH2 0x00da | 0xDA                                                                            |
|     149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
|     14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
|     14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|     14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|     152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|     18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|     190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|     192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|     194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|     195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|     196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|     197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|     198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|     199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|     19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Có vẻ như hàm này nhận ít nhất 32 byte (một từ) dữ liệu cuộc gọi.

| Độ lệch | Mã vận hành | Stack                                        |
| ------: | ----------- | -------------------------------------------- |
|     19D | DUP1        | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|     19E | DUP2        | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|     19F | REVERT      |                                              |

Nếu không nhận được dữ liệu cuộc gọi, giao dịch sẽ được hoàn nguyên mà không có dữ liệu trả về.

Hãy xem điều gì sẽ xảy ra nếu hàm _có_ nhận được dữ liệu cuộc gọi mà nó cần.

| Độ lệch | Mã vận hành  | Stack                                                       |
| ------: | ------------ | ----------------------------------------------------------- |
|     1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|     1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|     1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` là từ đầu tiên của dữ liệu cuộc gọi _sau_ chữ ký phương thức

| Độ lệch | Mã vận hành  | Stack                                                                                                                                                                                                                |
| ------: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                          |
|     1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                          |
|     1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                       |
|     1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
|     153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
|     154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                       |
|     157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
|     16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
|     16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                         |
|     171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |
|     172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                 |
|     173 | SLOAD        | Lưu trữ[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|     174 | DUP2         | calldataload(4) Lưu trữ[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|     175 | LT           | calldataload(4)\<Lưu trữ[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|     176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Lưu trữ[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|     179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |

Nếu từ đầu tiên không nhỏ hơn Lưu trữ[4], hàm sẽ thất bại. Nó hoàn nguyên mà không có giá trị trả về nào:

| Độ lệch | Mã vận hành | Stack                                                         |
| ------: | ----------- | ------------------------------------------------------------- |
|     17A | PUSH1 0x00  | 0x00 ...      |
|     17C | DUP1        | 0x00 0x00 ... |
|     17D | REVERT      |                                                               |

Nếu calldataload(4) nhỏ hơn Lưu trữ[4], chúng ta sẽ nhận được mã này:

| Độ lệch | Mã vận hành | Stack                                                                                     |
| ------: | ----------- | ----------------------------------------------------------------------------------------- |
|     17E | JUMPDEST    | calldataload(4) 0x04 calldataload(4) 0xDA           |
|     17F | PUSH1 0x00  | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|     181 | SWAP2       | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|     182 | DUP3        | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|     183 | MSTORE      | calldataload(4) 0x00 calldataload(4) 0xDA           |

Và các vị trí bộ nhớ 0x00-0x1F hiện chứa dữ liệu 0x04 (0x00-0x1E đều là số không, 0x1F là bốn)

| Độ lệch | Mã vận hành | Stack                                                                                                                                                                                                                       |
| ------: | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     184 | PUSH1 0x20  | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                        |
|     186 | SWAP1       | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                        |
|     187 | SWAP2       | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                        |
|     188 | SHA3        | (((SHA3 của 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                |
|     189 | ADD         | (((SHA3 của 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                |
|     18A | SLOAD       | Lưu trữ[(((SHA3 của 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Vì vậy, có một bảng tra cứu trong bộ lưu trữ, bắt đầu tại SHA3 của 0x000...0004 và có một mục cho mỗi giá trị dữ liệu cuộc gọi hợp pháp (giá trị dưới Lưu trữ[4]).

| Độ lệch | Mã vận hành | Stack                                                                                                                                                                                                                       |
| ------: | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     18B | SWAP1       | calldataload(4) Lưu trữ[(((SHA3 của 0x00-0x1F))) + calldataload(4)] 0xDA |
|     18C | POP         | Lưu trữ[(((SHA3 của 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|     18D | DUP2        | 0xDA Lưu trữ[(((SHA3 của 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|     18E | JUMP        | Lưu trữ[(((SHA3 của 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Chúng ta đã biết [mã tại độ lệch 0xDA](#the-da-code) làm gì, nó trả về giá trị trên cùng của ngăn xếp cho người gọi. Vì vậy, hàm này trả về giá trị từ bảng tra cứu cho người gọi.

## 0x1f135823 {#0x1f135823}

Mã ở độ lệch 0xC4-0xCF giống hệt với những gì chúng ta đã thấy ở 0x103-0x10E trong `splitter()` (ngoài đích `JUMPI`), vì vậy chúng ta biết hàm này cũng không phải là `payable`.

| Độ lệch | Mã vận hành  | Stack               |
| ------: | ------------ | ------------------- |
|      D0 | JUMPDEST     |                     |
|      D1 | POP          |                     |
|      D2 | PUSH2 0x00da | 0xDA                |
|      D5 | PUSH1 0x06   | 0x06 0xDA           |
|      D7 | SLOAD        | Giá trị\* 0xDA      |
|      D8 | DUP2         | 0xDA Giá trị\* 0xDA |
|      D9 | JUMP         | Giá trị\* 0xDA      |

Chúng ta đã biết [mã tại độ lệch 0xDA](#the-da-code) làm gì, nó trả về giá trị trên cùng của ngăn xếp cho người gọi. Vì vậy, hàm này trả về `Giá trị*`.

### Tóm tắt phương thức {#method-summary}

Bạn có cảm thấy mình hiểu hợp đồng ở thời điểm này không? Tôi không. Cho đến nay, chúng ta có những phương pháp sau:

| Phương pháp                                          | Ý nghĩa                                                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Chuyển khoản                                         | Chấp nhận giá trị được cung cấp bởi lệnh gọi và tăng `Giá trị*` theo số tiền đó                                              |
| [splitter()](#splitter)           | Trả về Lưu trữ[3], địa chỉ proxy                                         |
| [currentWindow()](#currentwindow) | Trả về Lưu trữ[1]                                                        |
| [merkleRoot()](#merkeroot)        | Trả về Lưu trữ[0]                                                        |
| [0x81e580d3](#0x81e580d3)                            | Trả về giá trị từ bảng tra cứu, với điều kiện tham số nhỏ hơn Lưu trữ[4] |
| [0x1f135823](#0x1f135823)                            | Trả về Lưu trữ[6], hay còn gọi là Giá trị\*                              |

Nhưng chúng ta biết bất kỳ chức năng nào khác đều được cung cấp bởi hợp đồng trong Lưu trữ[3]. Có lẽ nếu chúng ta biết hợp đồng đó là gì, nó sẽ cho chúng ta một manh mối. Rất may, đây là chuỗi khối và mọi thứ đều được biết đến, ít nhất là trên lý thuyết. Chúng tôi không thấy bất kỳ phương pháp nào đặt Lưu trữ[3], vì vậy nó phải được đặt bởi hàm tạo.

## Hàm dựng {#the-constructor}

Khi chúng ta [xem xét một hợp đồng](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), chúng ta cũng có thể thấy giao dịch đã tạo ra nó.

![Nhấp vào giao dịch tạo](create-tx.png)

Nếu chúng ta nhấp vào giao dịch đó, rồi nhấp vào tab **Trạng thái**, chúng ta có thể thấy các giá trị ban đầu của các tham số. Cụ thể, chúng ta có thể thấy rằng Lưu trữ[3] chứa [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Hợp đồng đó phải chứa chức năng còn thiếu. Chúng ta có thể hiểu nó bằng cách sử dụng các công cụ tương tự mà chúng ta đã sử dụng cho hợp đồng mà chúng ta đang điều tra.

## Hợp đồng Proxy {#the-proxy-contract}

Sử dụng các kỹ thuật tương tự mà chúng ta đã sử dụng cho hợp đồng ban đầu ở trên, chúng ta có thể thấy rằng hợp đồng sẽ hoàn nguyên nếu:

- Có bất kỳ ETH nào được đính kèm vào cuộc gọi (0x05-0x0F)
- Kích thước dữ liệu cuộc gọi nhỏ hơn bốn (0x10-0x19 và 0xBE-0xC2)

Và các phương pháp mà nó hỗ trợ là:

| Phương pháp                                                                                                                                                                            | Chữ ký phương thức           | Độ lệch để nhảy vào |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,địa chỉ)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,địa chỉ,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110              |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118              |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8              |

Chúng ta có thể bỏ qua bốn phương pháp dưới cùng vì chúng ta sẽ không bao giờ đến được chúng. Chữ ký của chúng là như vậy mà hợp đồng ban đầu của chúng ta tự xử lý chúng (bạn có thể nhấp vào các chữ ký để xem chi tiết ở trên), vì vậy chúng phải là [các phương thức được ghi đè](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Một trong những phương thức còn lại là `claim(<params>)`, và một phương thức khác là `isClaimed(<params>)`, vì vậy nó trông giống như một hợp đồng airdrop. Thay vì đi qua phần còn lại từng mã vận hành một, chúng ta có thể [thử trình biên dịch ngược](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), trình biên dịch này tạo ra kết quả có thể sử dụng được cho ba hàm từ hợp đồng này. Việc thiết kế ngược các phần còn lại được để lại như một bài tập cho người đọc.

### scaleAmountByPercentage {#scaleamountbypercentage}

Đây là những gì trình biên dịch ngược cung cấp cho chúng ta cho hàm này:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  yêu cầu calldata.size - 4 >=′ 64
  nếu _param1 và _param2 > -1 / _param1:
      hoàn nguyên với 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Yêu cầu `require` đầu tiên kiểm tra xem dữ liệu cuộc gọi có, ngoài bốn byte của chữ ký hàm, ít nhất 64 byte, đủ cho hai tham số. Nếu không, rõ ràng có điều gì đó không ổn.

Câu lệnh `if` dường như kiểm tra rằng `_param1` không phải là không, và `_param1 * _param2` không phải là số âm. Nó có lẽ để ngăn chặn các trường hợp tràn số.

Cuối cùng, hàm trả về một giá trị đã được thay đổi quy mô.

### claim {#claim}

Mã mà trình biên dịch ngược tạo ra rất phức tạp, và không phải tất cả đều liên quan đến chúng ta. Tôi sẽ bỏ qua một số dòng để tập trung vào những dòng mà tôi tin là cung cấp thông tin hữu ích

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  yêu cầu _param2 == addr(_param2)
  ...
  nếu currentWindow <= _param1:
      hoàn nguyên với 0, 'không thể yêu cầu cho một cửa sổ trong tương lai'
```

Chúng ta thấy ở đây hai điều quan trọng:

- `_param2`, mặc dù nó được khai báo là `uint256`, thực ra là một địa chỉ
- `_param1` là cửa sổ đang được yêu cầu, phải là `currentWindow` hoặc sớm hơn.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Tài khoản đã yêu cầu cửa sổ đã cho'
```

Vì vậy, bây giờ chúng ta biết rằng Lưu trữ[5] là một mảng các cửa sổ và địa chỉ, và liệu địa chỉ đó đã yêu cầu phần thưởng cho cửa sổ đó hay chưa.

```python
  ...
  idx = 0
  s = 0
  trong khi idx < _param4.length:
  ...
      nếu s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          tiếp tục
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      tiếp tục
  nếu unknown2eb4a7ab != s:
      hoàn nguyên với 0, 'Bằng chứng không hợp lệ'
```

Chúng ta biết rằng `unknown2eb4a7ab` thực ra là hàm `merkleRoot()`, vì vậy mã này trông giống như đang xác minh một [bằng chứng merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Điều này có nghĩa là `_param4` là một bằng chứng merkle.

```python
  gọi addr(_param2) với:
     giá trị không xác định81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Đây là cách một hợp đồng chuyển ETH của chính nó đến một địa chỉ khác (hợp đồng hoặc sở hữu bên ngoài). Nó gọi nó với một giá trị là số tiền cần chuyển. Vì vậy, có vẻ như đây là một airdrop của ETH.

```python
  nếu không return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() với:
             value không xác định81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Hai dòng dưới cùng cho chúng ta biết rằng Lưu trữ[2] cũng là một hợp đồng mà chúng ta gọi. Nếu chúng ta [xem xét giao dịch hàm tạo](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), chúng ta thấy rằng hợp đồng này là [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), một hợp đồng Wrapped Ether [có mã nguồn đã được tải lên Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Vì vậy, có vẻ như các hợp đồng cố gắng gửi ETH đến `_param2`. Nếu nó có thể làm được, tuyệt vời. Nếu không, nó cố gắng gửi [WETH](https://weth.tkn.eth.limo/). Nếu `_param2` là một tài khoản sở hữu bên ngoài (EOA) thì nó luôn có thể nhận ETH, nhưng các hợp đồng có thể từ chối nhận ETH. Tuy nhiên, WETH là ERC-20 và các hợp đồng không thể từ chối chấp nhận điều đó.

```python
  ...
  log 0xdbd5389f: addr(_param2), không xác định81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Ở cuối hàm, chúng ta thấy một mục nhập nhật ký đang được tạo. [Xem các mục nhập nhật ký đã tạo](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) và lọc theo chủ đề bắt đầu bằng `0xdbd5...`. Nếu chúng ta [nhấp vào một trong các giao dịch đã tạo ra một mục nhập như vậy](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), chúng ta thấy rằng thực sự nó trông giống như một yêu cầu - tài khoản đã gửi một thông điệp đến hợp đồng mà chúng ta đang thiết kế ngược, và đổi lại nhận được ETH.

![Giao dịch yêu cầu](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Hàm này rất giống với [`claim`](#claim) ở trên. Nó cũng kiểm tra một bằng chứng merkle, cố gắng chuyển ETH cho người đầu tiên, và tạo ra cùng một loại mục nhập nhật ký.

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
          tiếp tục
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Bằng chứng không hợp lệ'
  ...
  call addr(_param1) với:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() với:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Sự khác biệt chính là tham số đầu tiên, cửa sổ để rút, không có ở đó. Thay vào đó, có một vòng lặp qua tất cả các cửa sổ có thể được yêu cầu.

```python
  idx = 0
  s = 0
  trong khi idx < currentWindow:
      ...
      if stor5[mem[0]]:
          nếu idx == -1:
              hoàn nguyên với 0, 17
          idx = idx + 1
          s = s
          tiếp tục
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
      tiếp tục
```

Vì vậy, nó trông giống như một biến thể của `claim` yêu cầu tất cả các cửa sổ.

## Kết luận {#conclusion}

Đến bây giờ bạn sẽ biết cách hiểu các hợp đồng không có sẵn mã nguồn, sử dụng mã vận hành hoặc (khi nó hoạt động) trình biên dịch ngược. Như đã thấy rõ từ độ dài của bài viết này, việc thiết kế ngược một hợp đồng không phải là chuyện nhỏ, nhưng trong một hệ thống mà bảo mật là điều cần thiết, đó là một kỹ năng quan trọng để có thể xác minh các hợp đồng hoạt động như đã hứa.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
