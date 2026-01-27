---
title: Tìm hiểu các đặc tả kỹ thuật EVM của Sách Vàng
description: Tìm hiểu một phần của Sách Vàng, đặc tả kỹ thuật chính thức cho Ethereum, giải thích về máy ảo Ethereum (EVM).
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: vi
published: 2022-05-15
---

[Sách Vàng](https://ethereum.github.io/yellowpaper/paper.pdf) là đặc tả kỹ thuật chính thức cho Ethereum. Ngoại trừ những phần được sửa đổi bởi [quy trình EIP](/eips/), nó chứa mô tả chính xác về cách mọi thứ hoạt động. Nó được viết dưới dạng một bài báo toán học, bao gồm các thuật ngữ mà các lập trình viên có thể không quen thuộc. Trong bài báo này, bạn sẽ học cách đọc nó, và rộng hơn là các bài báo toán học liên quan khác.

## Sách Vàng nào? {#which-yellow-paper}

Giống như hầu hết mọi thứ khác trong Ethereum, Sách Vàng cũng phát triển theo thời gian. Để có thể tham chiếu đến một phiên bản cụ thể, tôi đã tải lên [phiên bản hiện tại tại thời điểm viết bài](yellow-paper-berlin.pdf). Số mục, số trang và số phương trình mà tôi sử dụng sẽ tham chiếu đến phiên bản đó. Bạn nên mở nó trong một cửa sổ khác trong khi đọc tài liệu này.

### Tại sao lại là EVM? {#why-the-evm}

Sách vàng gốc được viết ngay từ khi bắt đầu quá trình phát triển của Ethereum. Nó mô tả cơ chế đồng thuận dựa trên bằng chứng công việc ban đầu được sử dụng để bảo mật mạng. Tuy nhiên, Ethereum đã tắt bằng chứng công việc và bắt đầu sử dụng sự đồng thuận dựa trên bằng chứng cổ phần vào tháng 9 năm 2022. Hướng dẫn này sẽ tập trung vào các phần của sách vàng định nghĩa Máy ảo Ethereum. EVM không thay đổi khi chuyển sang bằng chứng cổ phần (ngoại trừ giá trị trả về của mã vận hành DIFFICULTY).

## 9 Mô hình thực thi {#9-execution-model}

Phần này (trang 12-14) bao gồm hầu hết định nghĩa về EVM.

Thuật ngữ _trạng thái hệ thống_ bao gồm mọi thứ bạn cần biết về hệ thống để chạy nó. Trong một máy tính thông thường, điều này có nghĩa là bộ nhớ, nội dung của các thanh ghi, v.v.

Một [máy Turing](https://en.wikipedia.org/wiki/Turing_machine) là một mô hình tính toán. Về cơ bản, nó là một phiên bản đơn giản hóa của một máy tính, đã được chứng minh là có cùng khả năng chạy các phép tính mà một máy tính thông thường có thể thực hiện (mọi thứ mà một máy tính có thể tính toán thì một máy Turing cũng có thể tính toán và ngược lại). Mô hình này giúp dễ dàng chứng minh các định lý khác nhau về những gì có thể và không thể tính toán được.

Thuật ngữ [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) có nghĩa là một máy tính có thể chạy các phép tính giống như một máy Turing. Máy Turing có thể rơi vào các vòng lặp vô hạn, còn EVM thì không thể vì nó sẽ hết gas, vì vậy nó chỉ là quasi-Turing-complete (gần như hoàn thiện Turing).

## 9.1 Khái niệm cơ bản {#91-basics}

Phần này cung cấp các kiến thức cơ bản về EVM và cách nó so sánh với các mô hình tính toán khác.

Một [máy ngăn xếp](https://en.wikipedia.org/wiki/Stack_machine) là một máy tính lưu trữ dữ liệu trung gian không phải trong các thanh ghi, mà trong một [**ngăn xếp**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Đây là kiến trúc được ưa thích cho các máy ảo vì nó dễ triển khai, có nghĩa là lỗi và các lỗ hổng bảo mật ít có khả năng xảy ra hơn. Bộ nhớ trong ngăn xếp được chia thành các từ 256-bit. Điều này được chọn vì nó thuận tiện cho các hoạt động mã hóa cốt lõi của Ethereum như hàm băm Keccak-256 và các phép tính đường cong elip. Kích thước tối đa của ngăn xếp là 1024 mục (1024 x 256 bit). Khi các mã vận hành được thực thi, chúng thường lấy các tham số của mình từ ngăn xếp. Có các mã vận hành đặc biệt để tổ chức lại các phần tử trong ngăn xếp như `POP` (loại bỏ mục từ đầu ngăn xếp), `DUP_N` (sao chép mục thứ N trong ngăn xếp), v.v.

EVM cũng có một không gian tạm thời được gọi là **bộ nhớ** dùng để lưu trữ dữ liệu trong quá trình thực thi. Bộ nhớ này được tổ chức thành các từ 32-byte. Tất cả các vị trí bộ nhớ đều được khởi tạo bằng không. Nếu bạn thực thi mã [Yul](https://docs.soliditylang.org/en/latest/yul.html) này để thêm một từ vào bộ nhớ, nó sẽ lấp đầy 32 byte bộ nhớ bằng cách đệm không gian trống trong từ bằng các số không, tức là nó tạo ra một từ - với các số không ở các vị trí 0-29, 0x60 đến 30 và 0xA7 đến 31.

```yul
mstore(0, 0x60A7)
```

`mstore` là một trong ba mã vận hành mà EVM cung cấp để tương tác với bộ nhớ - nó tải một từ vào bộ nhớ. Hai mã còn lại là `mstore8` tải một byte đơn vào bộ nhớ và `mload` di chuyển một từ từ bộ nhớ sang ngăn xếp.

EVM cũng có một mô hình **lưu trữ** riêng biệt không thay đổi được duy trì như một phần của trạng thái hệ thống - bộ nhớ này được tổ chức thành các mảng từ (trái ngược với các mảng byte có thể định địa chỉ theo từ trong ngăn xếp). Đây là nơi các hợp đồng lưu trữ dữ liệu liên tục - một hợp đồng chỉ có thể tương tác với bộ lưu trữ của chính nó. Bộ lưu trữ được tổ chức theo ánh xạ khóa-giá trị.

Mặc dù không được đề cập trong phần này của Sách Vàng, nhưng cũng hữu ích khi biết rằng có một loại bộ nhớ thứ tư. **Calldata** là bộ nhớ chỉ đọc, có thể định địa chỉ theo byte, được sử dụng để lưu trữ giá trị được truyền cùng với tham số `data` của một giao dịch. EVM có các mã vận hành cụ thể để quản lý `calldata`. `calldatasize` trả về kích thước của dữ liệu. `calldataload` tải dữ liệu vào ngăn xếp. `calldatacopy` sao chép dữ liệu vào bộ nhớ.

Kiến trúc [Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) tiêu chuẩn lưu trữ mã và dữ liệu trong cùng một bộ nhớ. EVM không tuân theo tiêu chuẩn này vì lý do bảo mật - việc chia sẻ bộ nhớ tạm thời có thể làm thay đổi mã chương trình. Thay vào đó, mã được lưu vào bộ lưu trữ.

Chỉ có hai trường hợp mã được thực thi từ bộ nhớ:

- Khi một hợp đồng tạo ra một hợp đồng khác (sử dụng [`CREATE`](https://www.evm.codes/#f0) hoặc [`CREATE2`](https://www.evm.codes/#f5)), mã cho hàm khởi tạo của hợp đồng đến từ bộ nhớ.
- Trong quá trình tạo _bất kỳ_ hợp đồng nào, mã hàm khởi tạo sẽ chạy và sau đó trả về mã của hợp đồng thực tế, cũng từ bộ nhớ.

Thuật ngữ thực thi ngoại lệ có nghĩa là một ngoại lệ khiến việc thực thi của hợp đồng hiện tại bị dừng lại.

## 9.2 Tổng quan về phí {#92-fees-overview}

Phần này giải thích cách tính phí gas. Có ba loại chi phí:

### Chi phí mã vận hành {#opcode-cost}

Chi phí cố hữu của mã vận hành cụ thể. Để có được giá trị này, hãy tìm nhóm chi phí của mã vận hành trong Phụ lục H (trang 28, dưới phương trình (327)), và tìm nhóm chi phí trong phương trình (324). Điều này cho bạn một hàm chi phí, trong hầu hết các trường hợp, sử dụng các tham số từ Phụ lục G (trang 27).

Ví dụ, mã vận hành [`CALLDATACOPY`](https://www.evm.codes/#37) là một thành viên của nhóm _W<sub>copy</sub>_. Chi phí mã vận hành cho nhóm đó là _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Xem Phụ lục G, chúng ta thấy rằng cả hai hằng số đều là 3, cho chúng ta _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Chúng ta vẫn cần giải mã biểu thức _⌈μ<sub>s</sub>[2]÷32⌉_. Phần ngoài cùng, _⌈ \<value\> ⌉_ là hàm trần, một hàm mà khi nhận một giá trị sẽ trả về số nguyên nhỏ nhất mà vẫn không nhỏ hơn giá trị đó. Ví dụ, _⌈2.5⌉ = ⌈3⌉ = 3_. Phần bên trong là _μ<sub>s</sub>[2]÷32_. Xem mục 3 (Quy ước) trên trang 3, _μ_ là trạng thái máy. Trạng thái máy được định nghĩa trong mục 9.4.1 trên trang 13. Theo mục đó, một trong các tham số trạng thái máy là _s_ cho ngăn xếp. Tổng hợp lại, có vẻ như _μ<sub>s</sub>[2]_ là vị trí số 2 trong ngăn xếp. Xem [mã vận hành](https://www.evm.codes/#37), vị trí số 2 trong ngăn xếp là kích thước của dữ liệu tính bằng byte. Xem các mã vận hành khác trong nhóm W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) và [`RETURNDATACOPY`](https://www.evm.codes/#3e), chúng cũng có kích thước dữ liệu ở cùng một vị trí. Vì vậy, _⌈μ<sub>s</sub>[2]÷32⌉_ là số lượng từ 32 byte cần thiết để lưu trữ dữ liệu đang được sao chép. Tổng hợp lại, chi phí cố hữu của [`CALLDATACOPY`](https://www.evm.codes/#37) là 3 gas cộng với 3 cho mỗi từ dữ liệu được sao chép.

### Chi phí vận hành {#running-cost}

Chi phí chạy mã mà chúng ta đang gọi.

- Trong trường hợp của [`CREATE`](https://www.evm.codes/#f0) và [`CREATE2`](https://www.evm.codes/#f5), hàm khởi tạo cho hợp đồng mới.
- Trong trường hợp của [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), hoặc [`DELEGATECALL`](https://www.evm.codes/#f4), hợp đồng mà chúng ta gọi.

### Chi phí mở rộng bộ nhớ {#expanding-memory-cost}

Chi phí mở rộng bộ nhớ (nếu cần).

Trong phương trình 324, giá trị này được viết là _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Xem lại mục 9.4.1, chúng ta thấy rằng _μ<sub>i</sub>_ là số lượng từ trong bộ nhớ. Vì vậy _μ<sub>i</sub>_ là số từ trong bộ nhớ trước mã vận hành và _μ<sub>i</sub>'_ là số từ trong bộ nhớ sau mã vận hành.

Hàm _C<sub>mem</sub>_ được định nghĩa trong phương trình 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ là hàm sàn, một hàm mà khi nhận một giá trị sẽ trả về số nguyên lớn nhất mà vẫn không lớn hơn giá trị đó. Ví dụ: _⌊2,5⌋ = ⌊2⌋ = 2._ Khi _a < √512_, _a<sup>2</sup> < 512_, và kết quả của hàm sàn là không. Vì vậy, đối với 22 từ đầu tiên (704 byte), chi phí tăng tuyến tính với số lượng từ bộ nhớ cần thiết. Vượt qua điểm đó _⌊a<sup>2</sup> ÷ 512⌋_ là dương. Khi bộ nhớ yêu cầu đủ cao, chi phí gas tỷ lệ thuận với bình phương của lượng bộ nhớ.

**Lưu ý** rằng những yếu tố này chỉ ảnh hưởng đến chi phí gas _cố hữu_ - nó không tính đến thị trường phí hoặc tiền boa cho các trình xác thực, những yếu tố quyết định số tiền người dùng cuối phải trả - đây chỉ là chi phí thô để chạy một hoạt động cụ thể trên EVM.

[Đọc thêm về gas](/developers/docs/gas/).

## 9.3 Môi trường thực thi {#93-execution-env}

Môi trường thực thi là một bộ, _I_, bao gồm thông tin không phải là một phần của trạng thái chuỗi khối hoặc EVM.

| Thông số        | Mã vận hành để truy cập dữ liệu                                                                                           | Mã Solidity để truy cập dữ liệu                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                    | `address(this)`                                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                     | `tx.origin`                                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                   | `tx.gasprice`                                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), v.v.                                         | `msg.data`                                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                     | `msg.sender`                                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                  | `msg.value`                                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                   | `address(this).code`                                                     |
| _I<sub>H</sub>_ | Các trường tiêu đề khối, chẳng hạn như [`NUMBER`](https://www.evm.codes/#43) và [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, v.v. |
| _I<sub>e</sub>_ | Độ sâu của ngăn xếp lệnh gọi cho các lệnh gọi giữa các hợp đồng (bao gồm cả việc tạo hợp đồng)         |                                                                          |
| _I<sub>w</sub>_ | EVM có được phép thay đổi trạng thái hay không, hoặc nó đang chạy tĩnh                                                    |                                                                          |

Một vài tham số khác là cần thiết để hiểu phần còn lại của mục 9:

| Thông số | Được định nghĩa trong mục                         | Ý nghĩa                                                                                                                                                                                                                                       |
| -------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_      | 2 (trang 2, phương trình 1)    | Trạng thái của chuỗi khối                                                                                                                                                                                                                     |
| _g_      | 9.3 (trang 13) | Gas còn lại                                                                                                                                                                                                                                   |
| _A_      | 6.1 (trang 8)  | Trạng thái con tích lũy (các thay đổi được lên lịch cho khi giao dịch kết thúc)                                                                                                                                            |
| _o_      | 9.3 (trang 13) | Đầu ra - kết quả trả về trong trường hợp giao dịch nội bộ (khi một hợp đồng gọi một hợp đồng khác) và các lệnh gọi đến các hàm xem (khi bạn chỉ yêu cầu thông tin, vì vậy không cần phải đợi giao dịch) |

## 9.4 Tổng quan về thực thi {#94-execution-overview}

Bây giờ đã có tất cả các phần chuẩn bị, cuối cùng chúng ta có thể bắt đầu tìm hiểu cách EVM hoạt động.

Các phương trình 137-142 cho chúng ta các điều kiện ban đầu để chạy EVM:

| Ký hiệu          | Giá trị ban đầu                                                                  | Ý nghĩa                                                                                                                                                                                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Gas còn lại                                                                                                                                                                                                                                                                                                                        |
| _μ<sub>pc</sub>_ | _0_                                                                              | Bộ đếm chương trình, địa chỉ của lệnh tiếp theo cần thực thi                                                                                                                                                                                                                                                                       |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Bộ nhớ, được khởi tạo thành toàn số không                                                                                                                                                                                                                                                                                          |
| _μ<sub>i</sub>_  | _0_                                                                              | Vị trí bộ nhớ cao nhất được sử dụng                                                                                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_                                                          | Ngăn xếp, ban đầu trống                                                                                                                                                                                                                                                                                                            |
| _μ<sub>o</sub>_  | _∅_                                                                              | Đầu ra, tập hợp rỗng cho đến khi và trừ khi chúng ta dừng lại với dữ liệu trả về ([`RETURN`](https://www.evm.codes/#f3) hoặc [`REVERT`](https://www.evm.codes/#fd)) hoặc không có nó ([`STOP`](https://www.evm.codes/#00) hoặc [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Phương trình 143 cho chúng ta biết có bốn điều kiện có thể xảy ra tại mỗi thời điểm trong quá trình thực thi và phải làm gì với chúng:

1. `Z(σ,μ,A,I)`. Z đại diện cho một hàm kiểm tra xem một hoạt động có tạo ra một chuyển đổi trạng thái không hợp lệ hay không (xem [dừng ngoại lệ](#942-exceptional-halting)). Nếu nó đánh giá là True, trạng thái mới giống hệt trạng thái cũ (ngoại trừ gas bị đốt) vì các thay đổi chưa được thực hiện.
2. Nếu mã vận hành đang được thực thi là [`REVERT`](https://www.evm.codes/#fd), trạng thái mới giống như trạng thái cũ, một số gas bị mất.
3. Nếu chuỗi hoạt động kết thúc, được biểu thị bằng [`RETURN`](https://www.evm.codes/#f3)), trạng thái được cập nhật thành trạng thái mới.
4. Nếu chúng ta không ở một trong các điều kiện kết thúc 1-3, hãy tiếp tục chạy.

## 9.4.1 Trạng thái máy {#941-machine-state}

Phần này giải thích chi tiết hơn về trạng thái máy. Nó chỉ định rằng _w_ là mã vận hành hiện tại. Nếu _μ<sub>pc</sub>_ nhỏ hơn _||I<sub>b</sub>||_, độ dài của mã, thì byte đó (_I<sub>b</sub>[μ<sub>pc</sub>]_) là mã vận hành. Nếu không, mã vận hành được định nghĩa là [`STOP`](https://www.evm.codes/#00).

Vì đây là một [máy ngăn xếp](https://en.wikipedia.org/wiki/Stack_machine), chúng ta cần theo dõi số lượng các mục được lấy ra (_δ_) và đẩy vào (_α_) bởi mỗi mã vận hành.

## 9.4.2 Dừng ngoại lệ {#942-exceptional-halt}

Phần này định nghĩa hàm _Z_, chỉ định khi nào chúng ta có một kết thúc bất thường. Đây là một hàm [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), vì vậy nó sử dụng [_∨_ cho phép hoặc logic](https://en.wikipedia.org/wiki/Logical_disjunction) và [_∧_ cho phép và logic](https://en.wikipedia.org/wiki/Logical_conjunction).

Chúng ta có một điểm dừng ngoại lệ nếu bất kỳ điều kiện nào sau đây là đúng:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Như chúng ta đã thấy trong mục 9.2, _C_ là hàm chỉ định chi phí gas. Không còn đủ gas để chi trả cho mã vận hành tiếp theo.

- **_δ<sub>w</sub>=∅_**
  Nếu số lượng mục được lấy ra cho một mã vận hành không được xác định, thì mã vận hành đó cũng không được xác định.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, không đủ mục trong ngăn xếp cho mã vận hành hiện tại.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Mã vận hành là [`JUMP`](https://www.evm.codes/#56) và địa chỉ không phải là [`JUMPDEST`](https://www.evm.codes/#5b). Các bước nhảy _chỉ_ hợp lệ khi đích đến là [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Mã vận hành là [`JUMPI`](https://www.evm.codes/#57), điều kiện là đúng (khác không) nên bước nhảy sẽ xảy ra, và địa chỉ không phải là [`JUMPDEST`](https://www.evm.codes/#5b). Các bước nhảy _chỉ_ hợp lệ khi đích đến là [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Mã vận hành là [`RETURNDATACOPY`](https://www.evm.codes/#3e). Trong mã vận hành này, phần tử ngăn xếp _μ<sub>s</sub>[1]_ là độ lệch để đọc từ bộ đệm dữ liệu trả về và phần tử ngăn xếp _μ<sub>s</sub>[2]_ là độ dài của dữ liệu. Điều kiện này xảy ra khi bạn cố gắng đọc vượt quá phần cuối của bộ đệm dữ liệu trả về. Lưu ý rằng không có điều kiện tương tự cho calldata hoặc cho chính mã. Khi bạn cố gắng đọc vượt quá cuối của các bộ đệm đó, bạn chỉ nhận được các số không.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Tràn ngăn xếp. Nếu việc chạy mã vận hành sẽ dẫn đến một ngăn xếp có hơn 1024 mục, hãy hủy bỏ.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Chúng ta có đang chạy tĩnh không ([¬ là phép phủ định](https://en.wikipedia.org/wiki/Negation) và _I<sub>w</sub>_ là đúng khi chúng ta được phép thay đổi trạng thái chuỗi khối)? Nếu vậy, và chúng ta đang cố gắng thực hiện một hoạt động thay đổi trạng thái, thì điều đó không thể xảy ra.

  Hàm _W(w,μ)_ được định nghĩa sau trong phương trình 150. _W(w,μ)_ là đúng nếu một trong những điều kiện sau là đúng:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Các mã vận hành này thay đổi trạng thái, bằng cách tạo một hợp đồng mới, lưu trữ một giá trị hoặc phá hủy hợp đồng hiện tại.

  - **_LOG0≤w ∧ w≤LOG4_**
    Nếu chúng ta được gọi tĩnh, chúng ta không thể phát ra các mục nhật ký.
    Các mã vận hành nhật ký đều nằm trong khoảng từ [`LOG0` (A0)](https://www.evm.codes/#a0) đến [`LOG4` (A4)](https://www.evm.codes/#a4).
    Số sau mã vận hành nhật ký chỉ định số lượng chủ đề mà mục nhật ký chứa.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Bạn có thể gọi một hợp đồng khác khi bạn đang ở trạng thái tĩnh, nhưng nếu làm vậy, bạn không thể chuyển ETH cho nó.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Bạn không thể chạy [`SSTORE`](https://www.evm.codes/#55) trừ khi bạn có nhiều hơn G<sub>callstipend</sub> (được định nghĩa là 2300 trong Phụ lục G) gas.

## 9.4.3 Tính hợp lệ của đích nhảy {#943-jump-dest-valid}

Ở đây chúng tôi định nghĩa chính thức các mã vận hành [`JUMPDEST`](https://www.evm.codes/#5b) là gì. Chúng ta không thể chỉ tìm kiếm giá trị byte 0x5B, vì nó có thể nằm bên trong một PUSH (và do đó là dữ liệu chứ không phải là một mã vận hành).

Trong phương trình (153), chúng ta định nghĩa một hàm, _N(i,w)_. Tham số đầu tiên, _i_, là vị trí của mã vận hành. Tham số thứ hai, _w_, là chính mã vận hành. Nếu _w∈[PUSH1, PUSH32]_ có nghĩa là mã vận hành là một PUSH (dấu ngoặc vuông xác định một phạm vi bao gồm các điểm cuối). Trong trường hợp đó, mã vận hành tiếp theo nằm ở _i+2+(w−PUSH1)_. Đối với [`PUSH1`](https://www.evm.codes/#60), chúng ta cần tiến thêm hai byte (chính PUSH và giá trị một byte), đối với [`PUSH2`](https://www.evm.codes/#61), chúng ta cần tiến thêm ba byte vì nó là giá trị hai byte, v.v. Tất cả các mã vận hành EVM khác chỉ dài một byte, vì vậy trong tất cả các trường hợp khác _N(i,w)=i+1_.

Hàm này được sử dụng trong phương trình (152) để định nghĩa _D<sub>J</sub>(c,i)_, là [tập hợp](https://en.wikipedia.org/wiki/Set_\(mathematics\)) của tất cả các đích nhảy hợp lệ trong mã _c_, bắt đầu từ vị trí mã vận hành _i_. Hàm này được định nghĩa một cách đệ quy. Nếu _i≥||c||_, điều đó có nghĩa là chúng ta đang ở hoặc sau cuối mã. Chúng ta sẽ không tìm thấy bất kỳ đích nhảy nào nữa, vì vậy chỉ cần trả về tập hợp rỗng.

Trong tất cả các trường hợp khác, chúng ta xem xét phần còn lại của mã bằng cách đi đến mã vận hành tiếp theo và lấy tập hợp bắt đầu từ đó. _c[i]_ là mã vận hành hiện tại, vì vậy _N(i,c[i])_ là vị trí của mã vận hành tiếp theo. _D<sub>J</sub>(c,N(i,c[i]))_ do đó là tập hợp các đích nhảy hợp lệ bắt đầu từ mã vận hành tiếp theo. Nếu mã vận hành hiện tại không phải là `JUMPDEST`, chỉ cần trả về tập hợp đó. Nếu nó là `JUMPDEST`, hãy bao gồm nó trong tập hợp kết quả và trả về tập hợp đó.

## 9.4.4 Dừng thông thường {#944-normal-halt}

Hàm dừng _H_, có thể trả về ba loại giá trị.

- Nếu chúng ta không ở trong một mã vận hành dừng, trả về _∅_, tập hợp rỗng. Theo quy ước, giá trị này được hiểu là Boolean false.
- Nếu chúng ta có một mã vận hành dừng không tạo ra đầu ra ([`STOP`](https://www.evm.codes/#00) hoặc [`SELFDESTRUCT`](https://www.evm.codes/#ff)), hãy trả về một chuỗi byte có kích thước bằng không làm giá trị trả về. Lưu ý rằng điều này rất khác với tập hợp rỗng. Giá trị này có nghĩa là EVM thực sự đã dừng, chỉ là không có dữ liệu trả về để đọc.
- Nếu chúng ta có một mã vận hành dừng có tạo ra đầu ra ([`RETURN`](https://www.evm.codes/#f3) hoặc [`REVERT`](https://www.evm.codes/#fd)), hãy trả về chuỗi byte được chỉ định bởi mã vận hành đó. Chuỗi này được lấy từ bộ nhớ, giá trị ở đầu ngăn xếp (_μ<sub>s</sub>[0]_) là byte đầu tiên, và giá trị sau nó (_μ<sub>s</sub>[1]_) là độ dài.

## H.2 Bộ hướng dẫn {#h2-instruction-set}

Trước khi chúng ta đến tiểu mục cuối cùng của EVM, 9.5, hãy xem xét chính các hướng dẫn. Chúng được định nghĩa trong Phụ lục H.2 bắt đầu ở trang 29. Bất cứ điều gì không được chỉ định là thay đổi với mã vận hành cụ thể đó đều được cho là sẽ giữ nguyên. Các biến có thay đổi được chỉ định bằng \<cái gì đó\>′.

Ví dụ, hãy xem mã vận hành [`ADD`](https://www.evm.codes/#01).

| Giá trị | Gợi nhớ | δ | α | Mô tả                                                                                                                                                                                                                 |
| ------: | ------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x01 | ADD     | 2 | 1 | Phép cộng.                                                                                                                                                                                            |
|         |         |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ là số giá trị chúng ta lấy ra từ ngăn xếp. Trong trường hợp này là hai, vì chúng ta đang cộng hai giá trị trên cùng.

_α_ là số giá trị chúng ta đẩy lại. Trong trường hợp này là một, tổng.

Vì vậy, đỉnh ngăn xếp mới (_μ′<sub>s</sub>[0]_) là tổng của đỉnh ngăn xếp cũ (_μ<sub>s</sub>[0]_) và giá trị cũ bên dưới nó (_μ<sub>s</sub>[1]_).

Thay vì đi qua tất cả các mã vận hành với một "danh sách nhàm chán", bài viết này chỉ giải thích những mã vận hành giới thiệu điều gì đó mới.

| Giá trị | Gợi nhớ   | δ | α | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256 | 2 | 1 | Tính toán hàm băm Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                        |
|         |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Đây là mã vận hành đầu tiên truy cập bộ nhớ (trong trường hợp này, chỉ đọc). Tuy nhiên, nó có thể mở rộng ra ngoài giới hạn hiện tại của bộ nhớ, vì vậy chúng ta cần cập nhật _μ<sub>i</sub>._ Chúng ta làm điều này bằng cách sử dụng hàm _M_ được định nghĩa trong phương trình 328 trên trang 29.

| Giá trị | Gợi nhớ | δ | α | Mô tả                                               |
| ------: | ------- | - | - | --------------------------------------------------- |
|    0x31 | BALANCE | 1 | 1 | Lấy số dư của tài khoản đã cho.     |
|         |         |   |   | ... |

Địa chỉ mà chúng ta cần tìm số dư là _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Đầu ngăn xếp là địa chỉ, nhưng vì các địa chỉ chỉ có 160 bit, chúng ta tính toán giá trị [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Nếu _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, điều đó có nghĩa là có thông tin về địa chỉ này. Trong trường hợp đó, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ là số dư cho địa chỉ đó. Nếu _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, điều đó có nghĩa là địa chỉ này chưa được khởi tạo và số dư bằng không. Bạn có thể xem danh sách các trường thông tin tài khoản trong mục 4.1 trên trang 4.

Phương trình thứ hai, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, liên quan đến sự khác biệt về chi phí giữa việc truy cập vào bộ nhớ ấm (bộ nhớ đã được truy cập gần đây và có khả năng được lưu vào bộ nhớ đệm) và bộ nhớ lạnh (bộ nhớ chưa được truy cập và có khả năng nằm trong bộ nhớ chậm hơn, tốn kém hơn để truy xuất). _A<sub>a</sub>_ là danh sách các địa chỉ đã được giao dịch truy cập trước đó, do đó việc truy cập sẽ rẻ hơn, như được định nghĩa trong mục 6.1 trên trang 8. Bạn có thể đọc thêm về chủ đề này trong [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Giá trị | Gợi nhớ | δ  | α  | Mô tả                                                                                                                                           |
| ------: | ------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x8F | DUP16   | 16 | 17 | Sao chép mục thứ 16 của ngăn xếp.                                                                                               |
|         |         |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Lưu ý rằng để sử dụng bất kỳ mục ngăn xếp nào, chúng ta cần lấy nó ra, điều đó có nghĩa là chúng ta cũng cần lấy tất cả các mục ngăn xếp ở trên nó ra. Trong trường hợp của [`DUP<n>`](https://www.evm.codes/#8f) và [`SWAP<n>`](https://www.evm.codes/#9f), điều này có nghĩa là phải lấy ra và sau đó đẩy vào tối đa mười sáu giá trị.

## 9.5 Chu kỳ thực thi {#95-exec-cycle}

Bây giờ chúng ta đã có tất cả các phần, cuối cùng chúng ta có thể hiểu được cách chu kỳ thực thi của EVM được ghi lại.

Phương trình (155) nói rằng với trạng thái đã cho:

- _σ_ (trạng thái chuỗi khối toàn cục)
- _μ_ (trạng thái EVM)
- _A_ (trạng thái con, những thay đổi sẽ xảy ra khi giao dịch kết thúc)
- _I_ (môi trường thực thi)

Trạng thái mới là _(σ', μ', A', I')_.

Các phương trình (156)-(158) định nghĩa ngăn xếp và sự thay đổi trong đó do một mã vận hành (_μ<sub>s</sub>_). Phương trình (159) là sự thay đổi về gas (_μ<sub>g</sub>_). Phương trình (160) là sự thay đổi trong bộ đếm chương trình (_μ<sub>pc</sub>_). Cuối cùng, các phương trình (161)-(164) chỉ định rằng các tham số khác giữ nguyên, trừ khi được thay đổi rõ ràng bởi mã vận hành.

Với điều này, EVM được định nghĩa đầy đủ.

## Kết luận {#conclusion}

Ký hiệu toán học rất chính xác và đã cho phép Sách Vàng chỉ định mọi chi tiết của Ethereum. Tuy nhiên, nó cũng có một số nhược điểm:

- Nó chỉ có thể được con người hiểu, điều đó có nghĩa là các [bài kiểm tra tuân thủ](https://github.com/ethereum/tests) phải được viết thủ công.
- Các lập trình viên hiểu mã máy tính.
  Họ có thể hiểu hoặc không hiểu ký hiệu toán học.

Có lẽ vì những lý do này, các [đặc tả kỹ thuật lớp đồng thuận](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) mới hơn được viết bằng Python. Có các [đặc tả kỹ thuật lớp thực thi bằng Python](https://ethereum.github.io/execution-specs), nhưng chúng chưa hoàn chỉnh. Cho đến khi và trừ khi toàn bộ Sách Vàng cũng được dịch sang Python hoặc một ngôn ngữ tương tự, Sách Vàng sẽ tiếp tục được sử dụng và việc có thể đọc nó là hữu ích.
