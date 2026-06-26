---
title: "Hiểu về các thông số kỹ thuật EVM trong Sách vàng"
description: "Hiểu về phần giải thích Máy ảo Ethereum (EVM) trong Sách vàng, tài liệu đặc tả chính thức của Ethereum."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: "EVM trong Sách vàng"
lang: vi
published: 2022-05-15
---

[Sách vàng](https://ethereum.github.io/yellowpaper/paper.pdf) là tài liệu đặc tả chính thức của Ethereum. Ngoại trừ những phần được sửa đổi bởi [quy trình EIP](/eips/), nó chứa mô tả chính xác về cách mọi thứ hoạt động. Nó được viết dưới dạng một bài báo toán học, bao gồm các thuật ngữ mà các lập trình viên có thể không quen thuộc. Trong bài viết này, bạn sẽ học cách đọc nó, và rộng hơn là các bài báo toán học liên quan khác.

## Phiên bản Sách vàng nào? {#which-yellow-paper}

Giống như hầu hết mọi thứ khác trong Ethereum, Sách vàng phát triển theo thời gian. Để có thể tham khảo một phiên bản cụ thể, tôi đã tải lên [phiên bản hiện tại tại thời điểm viết bài](yellow-paper-berlin.pdf). Các số phần, trang và phương trình mà tôi sử dụng sẽ tham chiếu đến phiên bản đó. Bạn nên mở nó trong một cửa sổ khác khi đọc tài liệu này.

### Tại sao lại là EVM? {#why-the-evm}

Sách vàng ban đầu được viết ngay từ khi bắt đầu phát triển Ethereum. Nó mô tả cơ chế đồng thuận Bằng chứng công việc (PoW) ban đầu được sử dụng để bảo mật mạng lưới. Tuy nhiên, Ethereum đã tắt Bằng chứng công việc (PoW) và bắt đầu sử dụng cơ chế đồng thuận Bằng chứng cổ phần (PoS) vào tháng 9 năm 2022. Hướng dẫn này sẽ tập trung vào các phần của sách vàng định nghĩa Máy ảo Ethereum (EVM). EVM không bị thay đổi bởi quá trình chuyển đổi sang Bằng chứng cổ phần (PoS) (ngoại trừ giá trị trả về của mã lệnh DIFFICULTY).

## 9 Mô hình thực thi {#9-execution-model}

Phần này (trang 12-14) bao gồm hầu hết định nghĩa về EVM.

Thuật ngữ _trạng thái hệ thống_ bao gồm mọi thứ bạn cần biết về hệ thống để chạy nó. Trong một máy tính thông thường, điều này có nghĩa là bộ nhớ, nội dung của các thanh ghi, v.v.

Một [máy Turing](https://en.wikipedia.org/wiki/Turing_machine) là một mô hình tính toán. Về cơ bản, nó là một phiên bản đơn giản hóa của máy tính, được chứng minh là có cùng khả năng chạy các phép tính mà một máy tính bình thường có thể làm (mọi thứ mà máy tính có thể tính toán thì máy Turing cũng có thể tính toán và ngược lại). Mô hình này giúp dễ dàng chứng minh các định lý khác nhau về những gì có thể và không thể tính toán được.

Thuật ngữ [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) (hoàn thiện Turing) có nghĩa là một máy tính có thể chạy các phép tính giống như một máy Turing. Máy Turing có thể rơi vào các vòng lặp vô hạn, còn EVM thì không thể vì nó sẽ cạn kiệt Gas, do đó nó chỉ là quasi-Turing-complete (gần hoàn thiện Turing).

## 9.1 Kiến thức cơ bản {#91-basics}

Phần này cung cấp những kiến thức cơ bản về EVM và cách nó so sánh với các mô hình tính toán khác.

Một [máy ngăn xếp (stack machine)](https://en.wikipedia.org/wiki/Stack_machine) là một máy tính lưu trữ dữ liệu trung gian không phải trong các thanh ghi, mà trong một [**ngăn xếp (stack)**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Đây là kiến trúc được ưa chuộng cho các máy ảo vì nó dễ triển khai, đồng nghĩa với việc các lỗi và lỗ hổng bảo mật ít có khả năng xảy ra hơn nhiều. Bộ nhớ trong ngăn xếp được chia thành các từ (word) 256-bit. Điều này được chọn vì nó thuận tiện cho các hoạt động mật mã cốt lõi của Ethereum như Quá trình băm Keccak-256 và các phép tính đường cong elliptic. Kích thước tối đa của ngăn xếp là 1024 mục (1024 x 256 bit). Khi các mã lệnh được thực thi, chúng thường lấy các tham số từ ngăn xếp. Có các mã lệnh dành riêng cho việc tổ chức lại các phần tử trong ngăn xếp như `POP` (xóa mục khỏi đỉnh ngăn xếp), `DUP_N` (nhân bản mục thứ N trong ngăn xếp), v.v.

EVM cũng có một không gian dễ bay hơi gọi là **bộ nhớ (memory)** được sử dụng để lưu trữ dữ liệu trong quá trình thực thi. Bộ nhớ này được tổ chức thành các từ 32-byte. Tất cả các vị trí bộ nhớ đều được khởi tạo bằng 0. Nếu bạn thực thi mã [Yul](https://docs.soliditylang.org/en/latest/yul.html) này để thêm một từ vào bộ nhớ, nó sẽ lấp đầy 32 byte bộ nhớ bằng cách đệm không gian trống trong từ bằng các số 0, tức là nó tạo ra một từ - với các số 0 ở vị trí 0-29, 0x60 ở vị trí 30 và 0xA7 ở vị trí 31.

```yul
mstore(0, 0x60A7)
```

`mstore` là một trong ba mã lệnh mà EVM cung cấp để tương tác với bộ nhớ - nó tải một từ vào bộ nhớ. Hai mã lệnh còn lại là `mstore8` tải một byte duy nhất vào bộ nhớ và `mload` di chuyển một từ từ bộ nhớ sang ngăn xếp.

EVM cũng có một mô hình **lưu trữ (storage)** không bay hơi riêng biệt được duy trì như một phần của trạng thái hệ thống - bộ nhớ này được tổ chức thành các mảng từ (trái ngược với các mảng byte có thể định địa chỉ theo từ trong ngăn xếp). Lưu trữ này là nơi các hợp đồng giữ dữ liệu liên tục - một hợp đồng chỉ có thể tương tác với bộ lưu trữ của chính nó. Lưu trữ được tổ chức theo các ánh xạ khóa-giá trị.

Mặc dù không được đề cập trong phần này của Sách vàng, nhưng cũng hữu ích khi biết có một loại bộ nhớ thứ tư. **Calldata** (dữ liệu lệnh gọi) là bộ nhớ chỉ đọc có thể định địa chỉ theo byte được sử dụng để lưu trữ giá trị được truyền cùng với tham số `data` của một giao dịch. EVM có các mã lệnh cụ thể để quản lý `calldata`. `calldatasize` trả về kích thước của dữ liệu. `calldataload` tải dữ liệu vào ngăn xếp. `calldatacopy` sao chép dữ liệu vào bộ nhớ.

[Kiến trúc Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) tiêu chuẩn lưu trữ mã và dữ liệu trong cùng một bộ nhớ. EVM không tuân theo tiêu chuẩn này vì lý do bảo mật - việc chia sẻ bộ nhớ dễ bay hơi khiến cho việc thay đổi mã chương trình trở nên khả thi. Thay vào đó, mã được lưu vào bộ lưu trữ.

Chỉ có hai trường hợp mã được thực thi từ bộ nhớ:

- Khi một hợp đồng tạo ra một hợp đồng khác (sử dụng [`CREATE`](https://www.evm.codes/#f0) hoặc [`CREATE2`](https://www.evm.codes/#f5)), mã cho hàm khởi tạo hợp đồng đến từ bộ nhớ.
- Trong quá trình tạo _bất kỳ_ hợp đồng nào, mã hàm khởi tạo sẽ chạy và sau đó trả về mã của hợp đồng thực tế, cũng từ bộ nhớ.

Thuật ngữ thực thi ngoại lệ (exceptional execution) có nghĩa là một ngoại lệ khiến việc thực thi hợp đồng hiện tại bị dừng lại.

## 9.2 Tổng quan về phí {#92-fees-overview}

Phần này giải thích cách tính phí Gas. Có ba loại chi phí:

### Chi phí mã lệnh {#opcode-cost}

Chi phí cố hữu của mã lệnh cụ thể. Để lấy giá trị này, hãy tìm nhóm chi phí của mã lệnh trong Phụ lục H (trang 28, dưới phương trình (327)) và tìm nhóm chi phí trong phương trình (324). Điều này cung cấp cho bạn một hàm chi phí, trong hầu hết các trường hợp sử dụng các tham số từ Phụ lục G (trang 27).

Ví dụ, mã lệnh [`CALLDATACOPY`](https://www.evm.codes/#37) là một thành viên của nhóm _W<sub>copy</sub>_. Chi phí mã lệnh cho nhóm đó là _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Nhìn vào Phụ lục G, chúng ta thấy rằng cả hai hằng số đều là 3, điều này cho chúng ta _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Chúng ta vẫn cần giải mã biểu thức _⌈μ<sub>s</sub>[2]÷32⌉_. Phần ngoài cùng, _⌈ \<value\> ⌉_ là hàm trần (ceiling function), một hàm mà khi nhận một giá trị sẽ trả về số nguyên nhỏ nhất không nhỏ hơn giá trị đó. Ví dụ, _⌈2.5⌉ = ⌈3⌉ = 3_. Phần bên trong là _μ<sub>s</sub>[2]÷32_. Nhìn vào phần 3 (Quy ước) trên trang 3, _μ_ là trạng thái máy. Trạng thái máy được định nghĩa trong phần 9.4.1 trên trang 13. Theo phần đó, một trong các tham số trạng thái máy là _s_ cho ngăn xếp. Kết hợp tất cả lại, có vẻ như _μ<sub>s</sub>[2]_ là vị trí số 2 trong ngăn xếp. Nhìn vào [mã lệnh](https://www.evm.codes/#37), vị trí số 2 trong ngăn xếp là kích thước của dữ liệu tính bằng byte. Nhìn vào các mã lệnh khác trong nhóm W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) và [`RETURNDATACOPY`](https://www.evm.codes/#3e), chúng cũng có kích thước dữ liệu ở cùng một vị trí. Vì vậy, _⌈μ<sub>s</sub>[2]÷32⌉_ là số lượng từ 32 byte cần thiết để lưu trữ dữ liệu đang được sao chép. Kết hợp mọi thứ lại, chi phí cố hữu của [`CALLDATACOPY`](https://www.evm.codes/#37) là 3 Gas cộng với 3 Gas cho mỗi từ dữ liệu được sao chép.

### Chi phí chạy {#running-cost}

Chi phí chạy mã mà chúng ta đang gọi.

- Trong trường hợp của [`CREATE`](https://www.evm.codes/#f0) và [`CREATE2`](https://www.evm.codes/#f5), là hàm khởi tạo cho hợp đồng mới.
- Trong trường hợp của [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), hoặc [`DELEGATECALL`](https://www.evm.codes/#f4), là hợp đồng mà chúng ta gọi.

### Chi phí mở rộng bộ nhớ {#expanding-memory-cost}

Chi phí mở rộng bộ nhớ (nếu cần thiết).

Trong phương trình 324, giá trị này được viết là _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Nhìn lại phần 9.4.1, chúng ta thấy rằng _μ<sub>i</sub>_ là số lượng từ trong bộ nhớ. Vì vậy, _μ<sub>i</sub>_ là số lượng từ trong bộ nhớ trước mã lệnh và _μ<sub>i</sub>'_ là số lượng từ trong bộ nhớ sau mã lệnh.

Hàm _C<sub>mem</sub>_ được định nghĩa trong phương trình 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ là hàm sàn (floor function), một hàm mà khi nhận một giá trị sẽ trả về số nguyên lớn nhất không lớn hơn giá trị đó. Ví dụ, _⌊2.5⌋ = ⌊2⌋ = 2._ Khi _a < √512_, _a<sup>2</sup> < 512_, và kết quả của hàm sàn là 0. Vì vậy, đối với 22 từ đầu tiên (704 byte), chi phí tăng tuyến tính với số lượng từ bộ nhớ được yêu cầu. Vượt qua điểm đó, _⌊a<sup>2</sup> ÷ 512⌋_ là số dương. Khi bộ nhớ yêu cầu đủ cao, chi phí Gas tỷ lệ thuận với bình phương lượng bộ nhớ.

**Lưu ý** rằng các yếu tố này chỉ ảnh hưởng đến chi phí Gas _cố hữu_ - nó không tính đến thị trường phí hoặc tiền boa cho các trình xác thực quyết định số tiền mà người dùng cuối phải trả - đây chỉ là chi phí thô để chạy một hoạt động cụ thể trên EVM.

[Đọc thêm về Gas](/developers/docs/gas/).

## 9.3 Môi trường thực thi {#93-execution-env}

Môi trường thực thi là một bộ (tuple), _I_, bao gồm thông tin không thuộc về trạng thái Chuỗi khối hoặc EVM.

| Tham số         | Mã lệnh để truy cập dữ liệu                                                                                                      | Mã Solidity để truy cập dữ liệu          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), v.v.                                                                 | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Các trường tiêu đề block, chẳng hạn như [`NUMBER`](https://www.evm.codes/#43) và [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, v.v. |
| _I<sub>e</sub>_ | Độ sâu của ngăn xếp lệnh gọi cho các lệnh gọi giữa các hợp đồng (bao gồm cả việc tạo hợp đồng)                                   |
| _I<sub>w</sub>_ | EVM có được phép thay đổi trạng thái hay không, hay nó đang chạy tĩnh                                                            |

Một vài tham số khác cần thiết để hiểu phần còn lại của phần 9:

| Tham số | Được định nghĩa trong phần | Ý nghĩa                                                                                                                                                                                                                                  |
| ------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_     | 2 (trang 2, phương trình 1) | Trạng thái của Chuỗi khối                                                                                                                                                                                                                |
| _g_     | 9.3 (trang 13)             | Gas còn lại                                                                                                                                                                                                                              |
| _A_     | 6.1 (trang 8)              | Trạng thái phụ tích lũy (các thay đổi được lên lịch khi giao dịch kết thúc)                                                                                                                                                              |
| _o_     | 9.3 (trang 13)             | Đầu ra - kết quả trả về trong trường hợp giao dịch nội bộ (khi một hợp đồng gọi một hợp đồng khác) và các lệnh gọi đến các hàm view (khi bạn chỉ yêu cầu thông tin, vì vậy không cần phải đợi một giao dịch)                             |

## 9.4 Tổng quan về thực thi {#94-execution-overview}

Bây giờ đã có tất cả các bước chuẩn bị, cuối cùng chúng ta có thể bắt đầu tìm hiểu cách EVM hoạt động.

Các phương trình 137-142 cung cấp cho chúng ta các điều kiện ban đầu để chạy EVM:

| Ký hiệu          | Giá trị ban đầu | Ý nghĩa                                                                                                                                                                                                                                                     |
| ---------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_             | Gas còn lại                                                                                                                                                                                                                                                 |
| _μ<sub>pc</sub>_ | _0_             | Bộ đếm chương trình, Địa chỉ của lệnh tiếp theo sẽ thực thi                                                                                                                                                                                                 |
| _μ<sub>m</sub>_  | _(0, 0, ...)_   | Bộ nhớ, được khởi tạo toàn bộ bằng 0                                                                                                                                                                                                                        |
| _μ<sub>i</sub>_  | _0_             | Vị trí bộ nhớ cao nhất được sử dụng                                                                                                                                                                                                                         |
| _μ<sub>s</sub>_  | _()_            | Ngăn xếp, ban đầu trống                                                                                                                                                                                                                                     |
| _μ<sub>o</sub>_  | _∅_             | Đầu ra, tập hợp rỗng cho đến khi và trừ khi chúng ta dừng lại với dữ liệu trả về ([`RETURN`](https://www.evm.codes/#f3) hoặc [`REVERT`](https://www.evm.codes/#fd)) hoặc không có nó ([`STOP`](https://www.evm.codes/#00) hoặc [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Phương trình 143 cho chúng ta biết có bốn điều kiện có thể xảy ra tại mỗi thời điểm trong quá trình thực thi và phải làm gì với chúng:

1.  `Z(σ,μ,A,I)`. Z đại diện cho một hàm kiểm tra xem một hoạt động có tạo ra một quá trình chuyển đổi trạng thái không hợp lệ hay không (xem [dừng ngoại lệ](#942-exceptional-halt)). Nếu nó đánh giá là True, trạng thái mới giống hệt trạng thái cũ (ngoại trừ Gas bị đốt cháy) vì các thay đổi chưa được thực hiện.
2.  Nếu mã lệnh đang được thực thi là [`REVERT`](https://www.evm.codes/#fd), trạng thái mới giống như trạng thái cũ, một lượng Gas bị mất.
3.  Nếu chuỗi các hoạt động đã hoàn thành, được biểu thị bằng một [`RETURN`](https://www.evm.codes/#f3)), trạng thái được cập nhật thành trạng thái mới.
4.  Nếu chúng ta không ở một trong các điều kiện kết thúc 1-3, hãy tiếp tục chạy.

## 9.4.1 Trạng thái máy {#941-machine-state}

Phần này giải thích chi tiết hơn về trạng thái máy. Nó chỉ định rằng _w_ là mã lệnh hiện tại. Nếu _μ<sub>pc</sub>_ nhỏ hơn _||I<sub>b</sub>||_, độ dài của mã, thì byte đó (_I<sub>b</sub>[μ<sub>pc</sub>]_) là mã lệnh. Nếu không, mã lệnh được định nghĩa là [`STOP`](https://www.evm.codes/#00).

Vì đây là một [máy ngăn xếp](https://en.wikipedia.org/wiki/Stack_machine), chúng ta cần theo dõi số lượng mục được lấy ra (_δ_) và đẩy vào (_α_) bởi mỗi mã lệnh.

## 9.4.2 Dừng ngoại lệ {#942-exceptional-halt}

Phần này định nghĩa hàm _Z_, chỉ định khi nào chúng ta có một sự kết thúc bất thường. Đây là một hàm [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), vì vậy nó sử dụng [_∨_ cho phép toán logic OR](https://en.wikipedia.org/wiki/Logical_disjunction) và [_∧_ cho phép toán logic AND](https://en.wikipedia.org/wiki/Logical_conjunction).

Chúng ta có một điểm dừng ngoại lệ nếu bất kỳ điều kiện nào sau đây là đúng:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Như chúng ta đã thấy trong phần 9.2, _C_ là hàm chỉ định chi phí Gas. Không còn đủ Gas để trang trải cho mã lệnh tiếp theo.

- **_δ<sub>w</sub>=∅_**
  Nếu số lượng mục được lấy ra cho một mã lệnh không được xác định, thì bản thân mã lệnh đó cũng không được xác định.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Tràn dưới ngăn xếp (stack underflow), không đủ mục trong ngăn xếp cho mã lệnh hiện tại.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Mã lệnh là [`JUMP`](https://www.evm.codes/#56) và Địa chỉ không phải là [`JUMPDEST`](https://www.evm.codes/#5b). Các bước nhảy _chỉ_ hợp lệ khi đích đến là một [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Mã lệnh là [`JUMPI`](https://www.evm.codes/#57), điều kiện là đúng (khác 0) nên bước nhảy sẽ xảy ra và Địa chỉ không phải là [`JUMPDEST`](https://www.evm.codes/#5b). Các bước nhảy _chỉ_ hợp lệ khi đích đến là một [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Mã lệnh là [`RETURNDATACOPY`](https://www.evm.codes/#3e). Trong mã lệnh này, phần tử ngăn xếp _μ<sub>s</sub>[1]_ là độ lệch (offset) để đọc từ bộ đệm dữ liệu trả về và phần tử ngăn xếp _μ<sub>s</sub>[2]_ là độ dài của dữ liệu. Điều kiện này xảy ra khi bạn cố gắng đọc vượt quá phần cuối của bộ đệm dữ liệu trả về. Lưu ý rằng không có điều kiện tương tự cho dữ liệu lệnh gọi (calldata) hoặc cho chính mã đó. Khi bạn cố gắng đọc vượt quá phần cuối của các bộ đệm đó, bạn chỉ nhận được các số 0.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Tràn số ngăn xếp (stack overflow). Nếu việc chạy mã lệnh sẽ dẫn đến một ngăn xếp có hơn 1024 mục, hãy hủy bỏ.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Chúng ta có đang chạy tĩnh không ([¬ là phủ định](https://en.wikipedia.org/wiki/Negation) và _I<sub>w</sub>_ là đúng khi chúng ta được phép thay đổi trạng thái Chuỗi khối)? Nếu vậy, và chúng ta đang thử một hoạt động thay đổi trạng thái, điều đó không thể xảy ra.

  Hàm _W(w,μ)_ được định nghĩa sau trong phương trình 150. _W(w,μ)_ là đúng nếu một trong các điều kiện sau là đúng:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Các mã lệnh này thay đổi trạng thái, bằng cách tạo một hợp đồng mới, lưu trữ một giá trị hoặc tự hủy hợp đồng hiện tại.

  - **_LOG0≤w ∧ w≤LOG4_**
    Nếu chúng ta được gọi tĩnh, chúng ta không thể phát ra các mục Nhật ký.
    Các mã lệnh Nhật ký đều nằm trong phạm vi từ [`LOG0` (A0)](https://www.evm.codes/#a0) đến [`LOG4` (A4)](https://www.evm.codes/#a4).
    Số sau mã lệnh Nhật ký chỉ định số lượng chủ đề mà mục Nhật ký chứa.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Bạn có thể gọi một hợp đồng khác khi bạn đang ở trạng thái tĩnh, nhưng nếu bạn làm vậy, bạn không thể chuyển ETH cho nó.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Bạn không thể chạy [`SSTORE`](https://www.evm.codes/#55) trừ khi bạn có nhiều hơn G<sub>callstipend</sub> (được định nghĩa là 2300 trong Phụ lục G) Gas.

## 9.4.3 Tính hợp lệ của đích đến bước nhảy {#943-jump-dest-valid}

Ở đây chúng ta chính thức định nghĩa các mã lệnh [`JUMPDEST`](https://www.evm.codes/#5b) là gì. Chúng ta không thể chỉ tìm kiếm giá trị byte 0x5B, vì nó có thể nằm bên trong một PUSH (và do đó là dữ liệu chứ không phải mã lệnh).

Trong phương trình (153), chúng ta định nghĩa một hàm, _N(i,w)_. Tham số đầu tiên, _i_, là vị trí của mã lệnh. Tham số thứ hai, _w_, là chính mã lệnh đó. Nếu _w∈[PUSH1, PUSH32]_ điều đó có nghĩa là mã lệnh là một PUSH (dấu ngoặc vuông xác định một phạm vi bao gồm các điểm cuối). Trong trường hợp đó, mã lệnh tiếp theo nằm ở _i+2+(w−PUSH1)_. Đối với [`PUSH1`](https://www.evm.codes/#60), chúng ta cần tiến lên hai byte (bản thân PUSH và giá trị một byte), đối với [`PUSH2`](https://www.evm.codes/#61), chúng ta cần tiến lên ba byte vì nó là giá trị hai byte, v.v. Tất cả các mã lệnh EVM khác chỉ dài một byte, vì vậy trong tất cả các trường hợp khác _N(i,w)=i+1_.

Hàm này được sử dụng trong phương trình (152) để định nghĩa _D<sub>J</sub>(c,i)_, là [tập hợp](<https://en.wikipedia.org/wiki/Set_(mathematics)>) của tất cả các đích đến bước nhảy hợp lệ trong mã _c_, bắt đầu từ vị trí mã lệnh _i_. Hàm này được định nghĩa đệ quy. Nếu _i≥||c||_, điều đó có nghĩa là chúng ta đang ở tại hoặc sau phần cuối của mã. Chúng ta sẽ không tìm thấy bất kỳ đích đến bước nhảy nào nữa, vì vậy chỉ cần trả về tập hợp rỗng.

Trong tất cả các trường hợp khác, chúng ta xem xét phần còn lại của mã bằng cách chuyển đến mã lệnh tiếp theo và lấy tập hợp bắt đầu từ nó. _c[i]_ là mã lệnh hiện tại, vì vậy _N(i,c[i])_ là vị trí của mã lệnh tiếp theo. Do đó, _D<sub>J</sub>(c,N(i,c[i]))_ là tập hợp các đích đến bước nhảy hợp lệ bắt đầu từ mã lệnh tiếp theo. Nếu mã lệnh hiện tại không phải là `JUMPDEST`, chỉ cần trả về tập hợp đó. Nếu nó là `JUMPDEST`, hãy đưa nó vào tập kết quả và trả về tập hợp đó.

## 9.4.4 Dừng bình thường {#944-normal-halt}

Hàm dừng _H_, có thể trả về ba loại giá trị.

- Nếu chúng ta không ở trong một mã lệnh dừng, trả về _∅_, tập hợp rỗng. Theo quy ước, giá trị này được hiểu là Boolean false.
- Nếu chúng ta có một mã lệnh dừng không tạo ra đầu ra (hoặc [`STOP`](https://www.evm.codes/#00) hoặc [`SELFDESTRUCT`](https://www.evm.codes/#ff)), trả về một chuỗi có kích thước 0 byte làm giá trị trả về. Lưu ý rằng điều này rất khác với tập hợp rỗng. Giá trị này có nghĩa là EVM thực sự đã dừng lại, chỉ là không có dữ liệu trả về để đọc.
- Nếu chúng ta có một mã lệnh dừng tạo ra đầu ra (hoặc [`RETURN`](https://www.evm.codes/#f3) hoặc [`REVERT`](https://www.evm.codes/#fd)), trả về chuỗi byte được chỉ định bởi mã lệnh đó. Chuỗi này được lấy từ bộ nhớ, giá trị ở đỉnh ngăn xếp (_μ<sub>s</sub>[0]_) là byte đầu tiên và giá trị sau nó (_μ<sub>s</sub>[1]_) là độ dài.

## H.2 Tập lệnh {#h2-instruction-set}

Trước khi chúng ta đi đến tiểu mục cuối cùng của EVM, 9.5, hãy xem xét chính các lệnh. Chúng được định nghĩa trong Phụ lục H.2 bắt đầu từ trang 29. Bất cứ điều gì không được chỉ định là thay đổi với mã lệnh cụ thể đó thì được cho là sẽ giữ nguyên. Các biến có thay đổi được chỉ định bằng \<something\>′.

Ví dụ, hãy xem xét mã lệnh [`ADD`](https://www.evm.codes/#01).

| Giá trị | Gợi nhớ | δ   | α   | Mô tả                                                     |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Phép cộng.                                                |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ là số lượng giá trị chúng ta lấy ra từ ngăn xếp. Trong trường hợp này là hai, vì chúng ta đang cộng hai giá trị trên cùng.

_α_ là số lượng giá trị chúng ta đẩy trở lại. Trong trường hợp này là một, tổng số.

Vì vậy, đỉnh ngăn xếp mới (_μ′<sub>s</sub>[0]_) là tổng của đỉnh ngăn xếp cũ (_μ<sub>s</sub>[0]_) và giá trị cũ bên dưới nó (_μ<sub>s</sub>[1]_).

Thay vì xem qua tất cả các mã lệnh với một "danh sách dài lê thê", bài viết này chỉ giải thích những mã lệnh giới thiệu một cái gì đó mới.

| Giá trị | Gợi nhớ   | δ   | α   | Mô tả                                                                                                      |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Tính toán Mã băm Keccak-256.                                                                               |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Đây là mã lệnh đầu tiên truy cập bộ nhớ (trong trường hợp này, chỉ đọc). Tuy nhiên, nó có thể mở rộng vượt quá giới hạn hiện tại của bộ nhớ, vì vậy chúng ta cần cập nhật _μ<sub>i</sub>._ Chúng ta làm điều này bằng cách sử dụng hàm _M_ được định nghĩa trong phương trình 328 trên trang 29.

| Giá trị | Gợi nhớ | δ   | α   | Mô tả                             |
| ----: | -------- | --- | --- | --------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Lấy số dư của Tài khoản đã cho.   |
|       |          |     |     | ...                               |

Địa chỉ mà chúng ta cần tìm số dư là _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Đỉnh của ngăn xếp là Địa chỉ, nhưng vì các Địa chỉ chỉ có 160 bit, chúng ta tính giá trị [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Nếu _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, điều đó có nghĩa là có thông tin về Địa chỉ này. Trong trường hợp đó, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ là số dư cho Địa chỉ đó. Nếu _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, điều đó có nghĩa là Địa chỉ này chưa được khởi tạo và số dư bằng 0. Bạn có thể xem danh sách các trường thông tin Tài khoản trong phần 4.1 trên trang 4.

Phương trình thứ hai, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, liên quan đến sự khác biệt về chi phí giữa việc truy cập vào bộ lưu trữ ấm (bộ lưu trữ đã được truy cập gần đây và có khả năng được lưu trong bộ nhớ cache) và bộ lưu trữ lạnh (bộ lưu trữ chưa được truy cập và có khả năng nằm trong bộ lưu trữ chậm hơn, tốn kém hơn để truy xuất). _A<sub>a</sub>_ là danh sách các Địa chỉ đã được giao dịch truy cập trước đó, do đó sẽ rẻ hơn để truy cập, như được định nghĩa trong phần 6.1 trên trang 8. Bạn có thể đọc thêm về chủ đề này trong [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Giá trị | Gợi nhớ | δ   | α   | Mô tả                                   |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | Nhân bản mục ngăn xếp thứ 16.           |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Lưu ý rằng để sử dụng bất kỳ mục ngăn xếp nào, chúng ta cần lấy nó ra, điều đó có nghĩa là chúng ta cũng cần lấy ra tất cả các mục ngăn xếp nằm trên nó. Trong trường hợp của [`DUP<n>`](https://www.evm.codes/#8f) và [`SWAP<n>`](https://www.evm.codes/#9f), điều này có nghĩa là phải lấy ra và sau đó đẩy vào tối đa mười sáu giá trị.

## 9.5 Chu kỳ thực thi {#95-exec-cycle}

Bây giờ chúng ta đã có tất cả các phần, cuối cùng chúng ta có thể hiểu cách chu kỳ thực thi của EVM được ghi lại.

Phương trình (155) nói rằng với trạng thái:

- _σ_ (trạng thái Chuỗi khối toàn cầu)
- _μ_ (trạng thái EVM)
- _A_ (trạng thái phụ, các thay đổi sẽ xảy ra khi giao dịch kết thúc)
- _I_ (môi trường thực thi)

Trạng thái mới là _(σ', μ', A', I')_.

Các phương trình (156)-(158) định nghĩa ngăn xếp và sự thay đổi trong đó do một mã lệnh (_μ<sub>s</sub>_). Phương trình (159) là sự thay đổi về Gas (_μ<sub>g</sub>_). Phương trình (160) là sự thay đổi trong bộ đếm chương trình (_μ<sub>pc</sub>_). Cuối cùng, các phương trình (161)-(164) chỉ định rằng các tham số khác giữ nguyên, trừ khi được thay đổi rõ ràng bởi mã lệnh.

Với điều này, EVM được định nghĩa đầy đủ.

## Kết luận {#conclusion}

Ký hiệu toán học rất chính xác và đã cho phép Sách vàng chỉ định mọi chi tiết của Ethereum. Tuy nhiên, nó có một số nhược điểm:

- Nó chỉ có thể được con người hiểu, điều đó có nghĩa là [các bài kiểm tra tuân thủ](https://github.com/ethereum/tests) phải được viết thủ công.
- Các lập trình viên hiểu mã máy tính.
  Họ có thể hiểu hoặc không hiểu ký hiệu toán học.

Có lẽ vì những lý do này, [các đặc tả lớp đồng thuận](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) mới hơn được viết bằng Python. Có [các đặc tả lớp thực thi bằng Python](https://ethereum.github.io/execution-specs), nhưng chúng chưa hoàn chỉnh. Cho đến khi và trừ khi toàn bộ Sách vàng cũng được dịch sang Python hoặc một ngôn ngữ tương tự, Sách vàng sẽ tiếp tục được sử dụng và việc có thể đọc nó là rất hữu ích.