---
title: "Tuần tự hóa đơn giản"
description: "Giải thích về định dạng SSZ của Ethereum."
lang: vi
sidebarDepth: 2
---

**Tuần tự hóa đơn giản (SSZ)** là phương thức tuần tự hóa được sử dụng trên Beacon Chain. Nó thay thế tuần tự hóa RLP được sử dụng trên lớp thực thi ở mọi nơi trên lớp đồng thuận ngoại trừ giao thức khám phá ngang hàng. Để tìm hiểu thêm về tuần tự hóa RLP, xem [Tiền tố độ dài đệ quy (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ được thiết kế để có tính xác định và cũng để Merkle hóa một cách hiệu quả. SSZ có thể được coi là có hai thành phần: một lược đồ tuần tự hóa và một lược đồ Merkle hóa được thiết kế để hoạt động hiệu quả với cấu trúc dữ liệu đã được tuần tự hóa.

## SSZ hoạt động như thế nào? {#how-does-ssz-work}

### Tuần tự hóa {#serialization}

SSZ là một lược đồ tuần tự hóa không tự mô tả - thay vào đó, nó dựa trên một lược đồ phải được biết trước. Mục tiêu của tuần tự hóa SSZ là biểu diễn các đối tượng có độ phức tạp tùy ý dưới dạng các chuỗi byte. Đây là một quy trình rất đơn giản đối với "các loại cơ bản". Phần tử chỉ đơn giản là được chuyển đổi thành các byte thập lục phân. Các loại cơ bản bao gồm:

- số nguyên không dấu
- Boolean

Đối với các loại "hỗn hợp" phức tạp, việc tuần tự hóa sẽ phức tạp hơn bởi vì loại hỗn hợp chứa nhiều phần tử có thể có các loại khác nhau hoặc kích thước khác nhau, hoặc cả hai. Khi các đối tượng này đều có độ dài cố định (tức là kích thước của các phần tử sẽ luôn không đổi bất kể giá trị thực tế của chúng) việc tuần tự hóa chỉ đơn giản là chuyển đổi mỗi phần tử trong loại hỗn hợp được sắp xếp thành các chuỗi byte little-endian. Những chuỗi byte này được nối với nhau. Đối tượng được tuần tự hóa có biểu diễn danh sách byte của các phần tử có độ dài cố định theo cùng thứ tự chúng xuất hiện trong đối tượng được giải tuần tự hóa.

Đối với các loại có độ dài thay đổi, dữ liệu thực tế được thay thế bằng một giá trị "offset" (độ dời) tại vị trí của phần tử đó trong đối tượng được tuần tự hóa. Dữ liệu thực tế được thêm vào một heap ở cuối đối tượng được tuần tự hóa. Giá trị offset là chỉ mục cho sự bắt đầu của dữ liệu thực tế trong heap, hoạt động như một con trỏ đến các byte liên quan.

Ví dụ dưới đây minh họa cách hoạt động của việc đặt offset cho một container có cả các phần tử có độ dài cố định và thay đổi:

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

`serialized` sẽ có cấu trúc sau (ở đây chỉ được đệm tới 4 bit, trong thực tế được đệm tới 32 bit, và giữ nguyên biểu diễn `int` cho rõ ràng):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset cho    number 3    giá trị cho
                              vector                   vector

```

được chia thành nhiều dòng cho rõ ràng:

```
[
  37, 0, 0, 0,  # mã hóa little-endian của `number1`.
  55, 0, 0, 0,  # mã hóa little-endian của `number2`.
  16, 0, 0, 0,  # "Offset" cho biết giá trị của `vector` bắt đầu từ đâu (little-endian 16).
  22, 0, 0, 0,  # mã hóa little-endian của `number3`.
  1, 2, 3, 4,   # Các giá trị thực tế trong `vector`.
]
```

Đây vẫn là một sự đơn giản hóa - các số nguyên và số không trong sơ đồ trên thực sự sẽ được lưu trữ dưới dạng danh sách byte, như thế này:

```
[
  10100101000000000000000000000000  # mã hóa little-endian của `number1`
  10110111000000000000000000000000  # mã hóa little-endian của `number2`.
  10010000000000000000000000000000  # "Offset" cho biết giá trị của `vector` bắt đầu từ đâu (little-endian 16).
  10010110000000000000000000000000  # mã hóa little-endian của `number3`.
  10000001100000101000001110000100   # Giá trị thực tế của trường `bytes`.
]
```

Vì vậy, các giá trị thực tế cho các loại có độ dài thay đổi được lưu trữ trong một heap ở cuối đối tượng được tuần tự hóa với các offset của chúng được lưu trữ ở các vị trí chính xác trong danh sách các trường được sắp xếp.

Cũng có một số trường hợp đặc biệt yêu cầu xử lý cụ thể, chẳng hạn như loại `BitList` yêu cầu thêm giới hạn độ dài trong quá trình tuần tự hóa và xóa bỏ trong quá trình giải tuần tự hóa. Thông tin chi tiết đầy đủ có trong [thông số kỹ thuật SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Giải tuần tự hóa {#deserialization}

Để giải tuần tự hóa đối tượng này cần có <b>lược đồ</b>. Lược đồ xác định bố cục chính xác của dữ liệu được tuần tự hóa để mỗi phần tử cụ thể có thể được giải tuần tự hóa từ một blob byte thành một đối tượng có ý nghĩa với các phần tử có đúng loại, giá trị, kích thước và vị trí. Chính lược đồ sẽ cho trình giải tuần tự hóa biết giá trị nào là giá trị thực và giá trị nào là offset. Tất cả các tên trường sẽ biến mất khi một đối tượng được tuần tự hóa, nhưng được khởi tạo lại khi giải tuần tự hóa theo lược đồ.

Xem [ssz.dev](https://www.ssz.dev/overview) để biết giải thích tương tác về vấn đề này.

## Merkle hóa {#merkleization}

Đối tượng được tuần tự hóa SSZ này sau đó có thể được Merkle hóa - tức là được chuyển đổi thành một biểu diễn cây Merkle của cùng một dữ liệu. Đầu tiên, số lượng các đoạn 32 byte trong đối tượng được tuần tự hóa được xác định. Đây là các "lá" của cây. Tổng số lá phải là lũy thừa của 2 để việc băm các lá lại với nhau cuối cùng tạo ra một gốc cây băm duy nhất. Nếu không phải như vậy một cách tự nhiên, các lá bổ sung chứa 32 byte số không sẽ được thêm vào. Theo sơ đồ:

```
        gốc cây băm
            /     \
           /       \
          /         \
         /           \
   hàm băm của lá  hàm băm của lá
     1 và 2         3 và 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 lá1       lá2    lá3       lá4
```

Cũng có những trường hợp các lá của cây không phân bố đều một cách tự nhiên như trong ví dụ trên. Ví dụ, lá 4 có thể là một container với nhiều phần tử yêu cầu thêm "độ sâu" vào cây Merkle, tạo ra một cây không đều.

Thay vì gọi các phần tử cây này là lá X, nút X, v.v., chúng ta có thể đặt cho chúng các chỉ mục tổng quát hóa, bắt đầu với gốc = 1 và đếm từ trái sang phải dọc theo mỗi cấp. Đây là chỉ mục tổng quát hóa được giải thích ở trên. Mỗi phần tử trong danh sách được tuần tự hóa có một chỉ mục tổng quát hóa bằng `2**depth + idx`, trong đó idx là vị trí được đánh chỉ mục từ 0 của nó trong đối tượng được tuần tự hóa và depth là số cấp trong cây Merkle, có thể được xác định bằng logarit cơ số hai của số phần tử (lá).

## Chỉ mục tổng quát hóa {#generalized-indices}

Chỉ mục tổng quát hóa là một số nguyên đại diện cho một nút trong cây Merkle nhị phân, trong đó mỗi nút có một chỉ mục tổng quát hóa là `2 ** depth + index in row`.

```
        1           --độ sâu = 0  2**0 + 0 = 1
    2       3       --độ sâu = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --độ sâu = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Biểu diễn này tạo ra một chỉ mục nút cho mỗi mẩu dữ liệu trong cây Merkle.

## Đa bằng chứng {#multiproofs}

Việc cung cấp danh sách các chỉ mục tổng quát hóa đại diện cho một phần tử cụ thể cho phép chúng ta xác minh nó với gốc cây băm. Gốc này là phiên bản thực tế được chúng ta chấp nhận. Bất kỳ dữ liệu nào chúng ta được cung cấp đều có thể được xác minh so với thực tế đó bằng cách chèn nó vào đúng vị trí trong cây Merkle (được xác định bởi chỉ mục tổng quát hóa của nó) và quan sát thấy rằng gốc không đổi. Có các hàm trong thông số kỹ thuật [tại đây](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) chỉ ra cách tính toán tập hợp tối thiểu các nút cần thiết để xác minh nội dung của một tập hợp các chỉ mục tổng quát hóa cụ thể.

Ví dụ, để xác minh dữ liệu ở chỉ mục 9 trong cây bên dưới, chúng ta cần hàm băm của dữ liệu tại các chỉ mục 8, 9, 5, 3, 1.
Hàm băm của (8,9) phải bằng hàm băm (4), được băm với 5 để tạo ra 2, được băm với 3 để tạo ra gốc cây 1. Nếu dữ liệu không chính xác được cung cấp cho 9, gốc sẽ thay đổi - chúng ta sẽ phát hiện ra điều này và không xác minh được nhánh.

```
* = dữ liệu cần thiết để tạo bằng chứng

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Đọc thêm {#further-reading}

- [Nâng cấp Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Nâng cấp Ethereum: Merkle hóa](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Các triển khai SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Máy tính SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
