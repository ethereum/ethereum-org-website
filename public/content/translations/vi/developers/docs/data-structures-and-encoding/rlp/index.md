---
title: Recursive-length prefix (RLP) serialization
description: "Giải thích về mã hóa rlp trong excution layer của Ethereum."
lang: vi
sidebarDepth: 2
---

Recursive Length Prefix (RLP) serialization được sử dụng phổ biến trong các execution client của Ethereum. RLP chuẩn hóa việc truyền dữ liệu giữa các node với một định dạng tiết kiệm không gian. Mục đích của RLP là mã hóa các mảng dữ liệu nhị phân lồng nhau bất kỳ, và RLP là phương thức mã hóa chính được sử dụng để tuần tự hóa các đối tượng trong excution layer của Ethereum. Mục đích chính của RLP là mã hóa cấu trúc; ngoại trừ các số nguyên dương, RLP ủy thác việc mã hóa các kiểu dữ liệu cụ thể (ví dụ: chuỗi, số thực) cho các giao thức bậc cao hơn. Các số nguyên dương phải được biểu diễn dưới dạng nhị phân big-endian không có số không ở đầu (do đó làm cho giá trị số nguyên không tương đương với mảng byte trống). Các số nguyên dương được giải tuần tự hóa có số không ở đầu phải bị coi là không hợp lệ bởi bất kỳ giao thức bậc cao nào sử dụng RLP.

Thông tin thêm trong [sách vàng Ethereum (Phụ lục B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Để sử dụng RLP để mã hóa một dictionary, 2 chuẩn được sử dụng là:

- sử dụng `[[k1,v1],[k2,v2]...]` với các khóa theo thứ tự từ điển
- sử dụng mã hóa Patricia Tree bậc cao như Ethereum

## Định nghĩa {#definition}

Phương thức mã hóa RLP lấy một item. Một item được định nghĩa như sau：

- một chuỗi (tức là mảng byte) là một mục
- một list các item là một item
- một số nguyên dương là một mục

Ví dụ, tất cả các mục dưới đều là item:

- một chuỗi rỗng;
- chuỗi chứa từ "cat";
- một list chứa số lượng chuỗi bất kỳ;
- và các cấu trúc dữ liệu phức tạp hơn như `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- số `100`

Lưu ý rằng trong ngữ cảnh của phần còn lại của trang này, 'chuỗi' có nghĩa là "một số byte dữ liệu nhị phân nhất định"; không có mã hóa đặc biệt nào được sử dụng và không có kiến thức nào về nội dung của các chuỗi được ngụ ý (ngoại trừ theo yêu cầu của quy tắc chống lại các số nguyên dương không tối thiểu).

Mã hóa RLP được định nghĩa như sau:

- Đối với một số nguyên dương, nó được chuyển đổi thành mảng byte ngắn nhất mà diễn giải big-endian của nó là số nguyên, và sau đó được mã hóa thành một chuỗi theo các quy tắc bên dưới.
- Đối với một byte đơn có giá trị trong phạm vi `[0x00, 0x7f]` (thập phân `[0, 127]`), byte đó là mã hóa RLP của chính nó.
- Nếu không, nếu một chuỗi dài 0-55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0x80** (hệ thập phân 128) cộng với độ dài của chuỗi, theo sau là chuỗi. Do đó, phạm vi của byte đầu tiên là `[0x80, 0xb7]` (hệ thập phân `[128, 183]`).
- Nếu một chuỗi dài hơn 55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xb7** (hệ thập phân 183) cộng với độ dài tính bằng byte của độ dài chuỗi ở dạng nhị phân, theo sau là độ dài của chuỗi, theo sau là chuỗi. Ví dụ: một chuỗi dài 1024 byte sẽ được mã hóa là `\xb9\x04\x00` (hệ thập phân `185, 4, 0`) theo sau là chuỗi. Ở đây, `0xb9` (183 + 2 = 185) là byte đầu tiên, theo sau là 2 byte `0x0400` (hệ thập phân 1024) biểu thị độ dài của chuỗi thực tế. Do đó, phạm vi của byte đầu tiên là `[0xb8, 0xbf]` (hệ thập phân `[184, 191]`).
- Nếu một chuỗi dài 2^64 byte, hoặc dài hơn, nó có thể không được mã hóa.
- Nếu tổng tải trọng của một danh sách (tức là tổng độ dài của tất cả các mục được mã hóa RLP) dài 0-55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xc0** cộng với độ dài của tải trọng, theo sau là sự nối tiếp của các mã hóa RLP của các mục. Do đó, phạm vi của byte đầu tiên là `[0xc0, 0xf7]` (hệ thập phân `[192, 247]`).
- Nếu tổng tải trọng của một danh sách dài hơn 55 byte, mã hóa RLP bao gồm một byte đơn có giá trị **0xf7** cộng với độ dài tính bằng byte của độ dài tải trọng ở dạng nhị phân, theo sau là độ dài của tải trọng, theo sau là sự nối tiếp của các mã hóa RLP của các mục. Do đó, phạm vi của byte đầu tiên là `[0xf8, 0xff]` (hệ thập phân `[248, 255]`).

Đây là trong code:

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
- chuỗi trống ('null') = `[ 0x80 ]`
- danh sách trống = `[ 0xc0 ]`
- số nguyên 0 = `[ 0x80 ]`
- byte '\\x00' = `[ 0x00 ]`
- byte '\\x0f' = `[ 0x0f ]`
- các byte '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [biểu diễn lý thuyết tập hợp](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) của ba, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- chuỗi "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` , 'e', 'l', 'i', 't' ]`

## Giải mã RLP {#rlp-decoding}

Dựa theo các quy tắc và quy trình mã hóa RLP, đầu vào của mã hóa RLP được coi là một mảng dữ liệu nhị phân. Quá trình giải mã hóa RLP như sau:

1. theo byte đầu tiên (tức là tiền tố) của dữ liệu đầu vào và giải mã kiểu dữ liệu, độ dài của dữ liệu thực tế và độ lệch;

2. theo loại và độ lệch của dữ liệu, giải mã dữ liệu tương ứng, tuân thủ quy tắc mã hóa tối thiểu cho các số nguyên dương;

3. tiếp tục giải mã hóa phần còn lại của đầu vào;

Trong số đó, các quy tắc giải mã kiểu dữ liệu và offset như sau:

1. dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên (tức là tiền tố) là [0x00, 0x7f] và chuỗi chính xác là chính byte đầu tiên đó;

2. dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên là [0x80, 0xb7] và chuỗi có độ dài bằng byte đầu tiên trừ đi 0x80 theo sau byte đầu tiên;

3. dữ liệu là một chuỗi nếu phạm vi của byte đầu tiên là [0xb8, 0xbf] và độ dài của chuỗi có độ dài tính bằng byte bằng byte đầu tiên trừ đi 0xb7 theo sau byte đầu tiên và chuỗi theo độ dài của chuỗi;

4. dữ liệu là một list nếu phạm vi của byte đầu tiên là [0xc0, 0xf7], và phần mã hóa rlp của tất cả item của list có độ lớn băngf byte đầu tiên trừ 0xc0 theo sau byte đầu tiên;

5. dữ liệu là một list nếu phạm vi của byte đầu tiên là [0xb8, 0xff] và toàn bộ payload của list có độ dài bằng byte đầu tiên trừ đi 0xf7 theo sau byte đầu tiên, và các mã hóa rlp của các item nối tiếp nhau nằm tiếp sau;

Đây là trong code:

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
- [Hậu trường Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Các chủ đề liên quan {#related-topics}

- [Cây Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
