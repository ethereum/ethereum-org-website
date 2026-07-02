---
title: "Tuần tự hóa đơn giản"
description: "Giải thích về định dạng SSZ của Ethereum."
lang: vi
sidebarDepth: 2
---

**Tuần tự hóa đơn giản (SSZ)** là phương pháp tuần tự hóa được sử dụng trên Chuỗi Beacon. Nó thay thế phương pháp tuần tự hóa RLP được sử dụng trên lớp thực thi ở mọi nơi trên lớp đồng thuận ngoại trừ giao thức khám phá nút ngang hàng. Để tìm hiểu thêm về tuần tự hóa RLP, hãy xem [Tiền tố độ dài đệ quy (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ được thiết kế để mang tính xác định và cũng để Merkle hóa một cách hiệu quả. SSZ có thể được coi là có hai thành phần: một lược đồ tuần tự hóa và một lược đồ Merkle hóa được thiết kế để hoạt động hiệu quả với cấu trúc dữ liệu đã được tuần tự hóa.

## SSZ hoạt động như thế nào? {#how-does-ssz-work}

### Tuần tự hóa {#serialization}

SSZ là một lược đồ tuần tự hóa không tự mô tả - thay vào đó, nó dựa vào một lược đồ (schema) phải được biết trước. Mục tiêu của tuần tự hóa SSZ là biểu diễn các đối tượng có độ phức tạp tùy ý dưới dạng các chuỗi byte. Đây là một quá trình rất đơn giản đối với các "kiểu cơ bản". Phần tử chỉ đơn giản được chuyển đổi thành các byte thập lục phân. Các kiểu cơ bản bao gồm:

- số nguyên không dấu
- Boolean (kiểu luận lý)

Đối với các kiểu "hỗn hợp" phức tạp, quá trình tuần tự hóa phức tạp hơn vì kiểu hỗn hợp chứa nhiều phần tử có thể có các kiểu khác nhau hoặc kích thước khác nhau, hoặc cả hai. Khi tất cả các đối tượng này có độ dài cố định (nghĩa là kích thước của các phần tử sẽ luôn không đổi bất kể giá trị thực tế của chúng), quá trình tuần tự hóa chỉ đơn giản là chuyển đổi từng phần tử trong kiểu hỗn hợp được sắp xếp thành các chuỗi byte little-endian. Các chuỗi byte này được nối lại với nhau. Đối tượng đã được tuần tự hóa có biểu diễn danh sách byte của các phần tử có độ dài cố định theo cùng thứ tự như khi chúng xuất hiện trong đối tượng đã được giải tuần tự hóa.

Đối với các kiểu có độ dài thay đổi, dữ liệu thực tế được thay thế bằng một giá trị "độ lệch" (offset) tại vị trí của phần tử đó trong đối tượng đã được tuần tự hóa. Dữ liệu thực tế được thêm vào một heap (vùng nhớ) ở cuối đối tượng đã được tuần tự hóa. Giá trị độ lệch là chỉ số cho điểm bắt đầu của dữ liệu thực tế trong heap, hoạt động như một con trỏ trỏ đến các byte có liên quan.

Ví dụ dưới đây minh họa cách hoạt động của độ lệch đối với một container chứa cả các phần tử có độ dài cố định và thay đổi:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` sẽ có cấu trúc sau (ở đây chỉ được đệm thành 4 bit, trong thực tế được đệm thành 32 bit và giữ nguyên biểu diễn `int` cho rõ ràng):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
     số 1          số 2     độ lệch cho     số 3     giá trị cho
                              vector                   vector
```

được chia thành nhiều dòng cho rõ ràng:

```
[
  37, 0, 0, 0,  # mã hóa little-endian của `number1`.
  55, 0, 0, 0,  # mã hóa little-endian của `number2`.
  16, 0, 0, 0,  # "Độ lệch" chỉ ra nơi bắt đầu giá trị của `vector` (little-endian 16).
  22, 0, 0, 0,  # mã hóa little-endian của `number3`.
  1, 2, 3, 4,   # Các giá trị thực tế trong `vector`.
]
```

Đây vẫn là một sự đơn giản hóa - các số nguyên và số không trong các sơ đồ trên thực tế sẽ được lưu trữ dưới dạng danh sách byte, như thế này:

```
[
  10100101000000000000000000000000  # mã hóa little-endian của `number1`
  10110111000000000000000000000000  # mã hóa little-endian của `number2`.
  10010000000000000000000000000000  # "Độ lệch" chỉ ra nơi bắt đầu giá trị của `vector` (little-endian 16).
  10010110000000000000000000000000  # mã hóa little-endian của `number3`.
  10000001100000101000001110000100   # Giá trị thực tế của trường `bytes`.
]
```

Vì vậy, các giá trị thực tế cho các kiểu có độ dài thay đổi được lưu trữ trong một heap ở cuối đối tượng đã được tuần tự hóa với các độ lệch của chúng được lưu trữ ở đúng vị trí trong danh sách các trường đã được sắp xếp.

Cũng có một số trường hợp đặc biệt yêu cầu xử lý cụ thể, chẳng hạn như kiểu `BitList` yêu cầu thêm giới hạn độ dài trong quá trình tuần tự hóa và loại bỏ trong quá trình giải tuần tự hóa. Chi tiết đầy đủ có sẵn trong [đặc tả SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

Để giải tuần tự hóa đối tượng này, cần có <b>lược đồ</b>. Lược đồ xác định bố cục chính xác của dữ liệu đã được tuần tự hóa để mỗi phần tử cụ thể có thể được giải tuần tự hóa từ một khối dữ liệu byte thành một đối tượng có ý nghĩa với các phần tử có đúng kiểu, giá trị, kích thước và vị trí. Chính lược đồ sẽ cho bộ giải tuần tự hóa biết giá trị nào là giá trị thực tế và giá trị nào là độ lệch. Tất cả các tên trường đều biến mất khi một đối tượng được tuần tự hóa, nhưng được khởi tạo lại khi giải tuần tự hóa theo lược đồ.
## Merkle hóa {#merkleization}

Đối tượng đã được tuần tự hóa SSZ này sau đó có thể được Merkle hóa - tức là được chuyển đổi thành biểu diễn cây Merkle của cùng một dữ liệu. Đầu tiên, số lượng các đoạn 32-byte trong đối tượng đã được tuần tự hóa được xác định. Đây là các "lá" của cây. Tổng số lá phải là lũy thừa của 2 để quá trình băm các lá lại với nhau cuối cùng tạo ra một gốc cây băm (hash-tree-root) duy nhất. Nếu điều này không tự nhiên xảy ra, các lá bổ sung chứa 32 byte số không sẽ được thêm vào. Theo sơ đồ:

```
gốc cây băm
            /     \
           /       \
          /         \
         /           \
mã băm của lá  mã băm của lá
   1 và 2         3 và 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 lá 1      lá 2   lá 3      lá 4
```

Cũng có những trường hợp các lá của cây không phân bố đều một cách tự nhiên theo cách chúng làm trong ví dụ trên. Ví dụ, lá 4 có thể là một container với nhiều phần tử yêu cầu thêm "độ sâu" vào cây Merkle, tạo ra một cây không đồng đều.

Thay vì gọi các phần tử cây này là lá X, nút X, v.v., chúng ta có thể cung cấp cho chúng các chỉ số tổng quát, bắt đầu với gốc = 1 và đếm từ trái sang phải dọc theo mỗi cấp. Đây là chỉ số tổng quát được giải thích ở trên. Mỗi phần tử trong danh sách đã được tuần tự hóa có một chỉ số tổng quát bằng `2**depth + idx` trong đó idx là vị trí có chỉ số bắt đầu từ 0 của nó trong đối tượng đã được tuần tự hóa và độ sâu là số cấp trong cây Merkle, có thể được xác định bằng logarit cơ số hai của số lượng phần tử (lá).

## Các chỉ số tổng quát {#generalized-indices}

Chỉ số tổng quát là một số nguyên đại diện cho một nút trong cây Merkle nhị phân, trong đó mỗi nút có một chỉ số tổng quát `2 ** depth + index in row`.

```
1           --độ sâu = 0  2**0 + 0 = 1
    2       3       --độ sâu = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --độ sâu = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Biểu diễn này mang lại một chỉ số nút cho mỗi phần dữ liệu trong cây Merkle.

## Đa bằng chứng (Multiproofs) {#multiproofs}

Việc cung cấp danh sách các chỉ số tổng quát đại diện cho một phần tử cụ thể cho phép chúng ta xác minh nó dựa trên gốc cây băm. Gốc này là phiên bản thực tế được chấp nhận của chúng ta. Bất kỳ dữ liệu nào chúng ta được cung cấp đều có thể được xác minh dựa trên thực tế đó bằng cách chèn nó vào đúng vị trí trong cây Merkle (được xác định bởi chỉ số tổng quát của nó) và quan sát thấy rằng gốc vẫn không đổi. Có các hàm trong đặc tả [tại đây](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) cho thấy cách tính toán tập hợp các nút tối thiểu được yêu cầu để xác minh nội dung của một tập hợp các chỉ số tổng quát cụ thể.

Ví dụ, để xác minh dữ liệu ở chỉ số 9 trong cây bên dưới, chúng ta cần mã băm của dữ liệu ở các chỉ số 8, 9, 5, 3, 1.
Mã băm của (8,9) phải bằng mã băm (4), mã băm này băm với 5 để tạo ra 2, sau đó băm với 3 để tạo ra gốc cây 1. Nếu dữ liệu không chính xác được cung cấp cho 9, gốc sẽ thay đổi - chúng ta sẽ phát hiện ra điều này và không thể xác minh nhánh đó.

```
* = dữ liệu được yêu cầu để tạo bằng chứng

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

- [Nâng cấp Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Nâng cấp Ethereum: Merkle hóa](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Các triển khai SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Công cụ tính toán SSZ](https://simpleserialize.com/)
