---
title: Tuần tự hóa tiền tố độ dài đệ quy (RLP)
description: Định nghĩa về mã hóa rlp trong lớp thực thi của Ethereum.
lang: vi
sidebarDepth: 2
---

Tuần tự hóa tiền tố độ dài đệ quy (RLP) được sử dụng rộng rãi trong các client thực thi của Ethereum. RLP tiêu chuẩn hóa việc chuyển dữ liệu giữa các node theo một định dạng tiết kiệm không gian. Mục đích của RLP là mã hóa các mảng dữ liệu nhị phân lồng nhau tùy ý, và RLP là phương pháp mã hóa chính được sử dụng để tuần tự hóa các đối tượng trong lớp thực thi của Ethereum. Mục đích chính của RLP là mã hóa cấu trúc; ngoại trừ các số nguyên dương, RLP ủy quyền việc mã hóa các kiểu dữ liệu cụ thể (ví dụ: chuỗi, số thực) cho các giao thức bậc cao hơn. Các số nguyên dương phải được biểu diễn dưới dạng nhị phân Big-endian không có các số 0 ở đầu (do đó làm cho giá trị số nguyên 0 tương đương với mảng byte rỗng). Các số nguyên dương được giải tuần tự hóa có các số 0 ở đầu phải được coi là không hợp lệ bởi bất kỳ giao thức bậc cao nào sử dụng RLP.

Xem thêm thông tin trong [sách vàng Ethereum (Phụ lục B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Để sử dụng RLP mã hóa một từ điển, hai dạng chuẩn được đề xuất là:

- sử dụng `[[k1,v1],[k2,v2]...]` với các khóa theo thứ tự từ điển
- sử dụng mã hóa Patricia Tree bậc cao hơn như [Ethereum](/) đang làm

## Định nghĩa {#definition}

Hàm mã hóa RLP nhận vào một mục (item). Một mục được định nghĩa như sau：

- một chuỗi (tức là mảng byte) là một mục
- một danh sách các mục là một mục
- một số nguyên dương là một mục

Ví dụ, tất cả những thứ sau đây đều là các mục:

- một chuỗi rỗng;
- chuỗi chứa từ "cat";
- một danh sách chứa số lượng chuỗi bất kỳ;
- và các cấu trúc dữ liệu phức tạp hơn như `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- số `100`

Lưu ý rằng trong ngữ cảnh của phần còn lại trên trang này, 'chuỗi' có nghĩa là "một số lượng byte dữ liệu nhị phân nhất định"; không có mã hóa đặc biệt nào được sử dụng và không ngụ ý bất kỳ kiến thức nào về nội dung của các chuỗi (ngoại trừ những gì được yêu cầu bởi quy tắc chống lại các số nguyên dương không tối giản).

Mã hóa RLP được định nghĩa như sau:

- Đối với một số nguyên dương, nó được chuyển đổi thành mảng byte ngắn nhất mà cách diễn giải Big-endian của nó là số nguyên đó, và sau đó được mã hóa thành một chuỗi theo các quy tắc bên dưới.
- Đối với một byte đơn có giá trị nằm trong khoảng `[0x00, 0x7f]` (thập phân `[0, 127]`), byte đó chính là mã hóa RLP của nó.
- Nếu không, nếu một chuỗi dài từ 0-55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0x80** (thập phân 128) cộng với độ dài của chuỗi, theo sau là chuỗi đó. Do đó, phạm vi của byte đầu tiên là `[0x80, 0xb7]` (thập phân `[128, 183]`).
- Nếu một chuỗi dài hơn 55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xb7** (thập phân 183) cộng với độ dài tính bằng byte của độ dài chuỗi dưới dạng nhị phân, theo sau là độ dài của chuỗi, rồi đến chuỗi đó. Ví dụ, một chuỗi dài 1024 byte sẽ được mã hóa thành `\xb9\x04\x00` (thập phân `185, 4, 0`) theo sau là chuỗi đó. Ở đây, `0xb9` (183 + 2 = 185) là byte đầu tiên, theo sau là 2 byte `0x0400` (thập phân 1024) biểu thị độ dài của chuỗi thực tế. Do đó, phạm vi của byte đầu tiên là `[0xb8, 0xbf]` (thập phân `[184, 191]`).
- Nếu một chuỗi dài 2^64 byte hoặc dài hơn, nó có thể không được mã hóa.
- Nếu tổng payload của một danh sách (tức là tổng độ dài của tất cả các mục của nó đang được mã hóa RLP) dài từ 0-55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xc0** cộng với độ dài của payload, theo sau là sự nối tiếp các mã hóa RLP của các mục. Do đó, phạm vi của byte đầu tiên là `[0xc0, 0xf7]` (thập phân `[192, 247]`).
- Nếu tổng payload của một danh sách dài hơn 55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xf7** cộng với độ dài tính bằng byte của độ dài payload dưới dạng nhị phân, theo sau là độ dài của payload, rồi đến sự nối tiếp các mã hóa RLP của các mục. Do đó, phạm vi của byte đầu tiên là `[0xf8, 0xff]` (thập phân `[248, 255]`).

Dưới dạng ngắn gọn:

| Phạm vi       | Byte 1     | Byte 2     | ...        | Byte 9                | Byte 10    | Ý nghĩa                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | chuỗi một byte                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | chuỗi ngắn (0-55 byte)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | chuỗi dài, N+1 byte cho độ dài, sau đó là payload |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | danh sách ngắn (0-55 byte)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | danh sách dài, N+1 byte cho độ dài, sau đó là payload |

- `p` = payload
- `n` = len (số lượng byte của payload)
- `N` = offset của độ dài của độ dài (N+1 byte `n` theo sau)

Trong mã code, điều này là:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Ví dụ {#examples}

- chuỗi "dog" = [ 0x83, 'd', 'o', 'g' ]
- danh sách [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- chuỗi rỗng ('null') = `[ 0x80 ]`
- danh sách rỗng = `[ 0xc0 ]`
- số nguyên 0 = `[ 0x80 ]`
- byte '\\x00' = `[ 0x00 ]`
- byte '\\x0f' = `[ 0x0f ]`
- các byte '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [biểu diễn lý thuyết tập hợp](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) của số ba, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- chuỗi "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Giải mã RLP {#rlp-decoding}

Theo các quy tắc và quy trình mã hóa RLP, đầu vào của giải mã RLP được coi là một mảng dữ liệu nhị phân. Quy trình giải mã RLP như sau:

1.  dựa vào byte đầu tiên (tức là tiền tố) của dữ liệu đầu vào và giải mã kiểu dữ liệu, độ dài của dữ liệu thực tế và offset;

2.  dựa vào kiểu và offset của dữ liệu, giải mã dữ liệu tương ứng, tuân thủ quy tắc mã hóa tối giản cho các số nguyên dương;

3.  tiếp tục giải mã phần còn lại của đầu vào;

Trong đó, các quy tắc giải mã kiểu dữ liệu và offset như sau:

1.  dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên (tức là tiền tố) là [0x00, 0x7f], và chuỗi chính xác là byte đầu tiên đó;

2.  dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên là [0x80, 0xb7], và chuỗi có độ dài bằng byte đầu tiên trừ đi 0x80 sẽ theo sau byte đầu tiên;

3.  dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên là [0xb8, 0xbf], và độ dài của chuỗi (tính bằng byte) bằng byte đầu tiên trừ đi 0xb7 sẽ theo sau byte đầu tiên, và chuỗi sẽ theo sau độ dài của chuỗi;

4.  dữ liệu là một danh sách nếu phạm vi của byte đầu tiên là [0xc0, 0xf7], và sự nối tiếp các mã hóa RLP của tất cả các mục trong danh sách mà tổng payload bằng byte đầu tiên trừ đi 0xc0 sẽ theo sau byte đầu tiên;

5.  dữ liệu là một danh sách nếu phạm vi của byte đầu tiên là [0xf8, 0xff], và tổng payload của danh sách có độ dài bằng byte đầu tiên trừ đi 0xf7 sẽ theo sau byte đầu tiên, và sự nối tiếp các mã hóa RLP của tất cả các mục trong danh sách sẽ theo sau tổng payload của danh sách;

Trong mã code, điều này là:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Đọc thêm {#further-reading}

- [RLP trong Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Bên trong Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Tiền tố độ dài đệ quy của Ethereum trong ACL2. Bản in trước arXiv arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Chủ đề liên quan {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)