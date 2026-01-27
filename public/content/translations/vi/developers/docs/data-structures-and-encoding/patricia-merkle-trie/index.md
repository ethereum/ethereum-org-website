---
title: "Cây Merkle Patricia"
description: "Giới thiệu về Cây Merkle Patricia."
lang: vi
sidebarDepth: 2
---

Trạng thái của Ethereum (toàn bộ các tài khoản, số dư và hợp đồng thông minh), được mã hóa thành một phiên bản đặc biệt của cấu trúc dữ liệu thường được biết đến trong khoa học máy tính với tên gọi là Cây Merkle. Cấu trúc này hữu ích cho nhiều ứng dụng trong mật mã học vì nó tạo ra một mối quan hệ có thể xác minh được giữa tất cả các phần dữ liệu riêng lẻ bị vướng vào trong cây, tạo ra một giá trị **gốc** duy nhất có thể được sử dụng để chứng minh mọi thứ về dữ liệu.

Cấu trúc dữ liệu của Ethereum là một 'Cây Merkle-Patricia đã sửa đổi', được đặt tên như vậy vì nó vay mượn một số tính năng của PATRICIA (Thuật toán thực tế để truy xuất thông tin được mã hóa bằng chữ và số) và vì nó được thiết kế để truy xuất dữ liệu hiệu quả các mục bao gồm trạng thái Ethereum.

Một cây Merkle-Patricia mang tính xác định và có thể xác minh bằng phương pháp mật mã: Cách duy nhất để tạo ra một gốc trạng thái là tính toán nó từ mỗi phần riêng lẻ của trạng thái, và hai trạng thái giống hệt nhau có thể dễ dàng được chứng minh bằng cách so sánh băm gốc và các băm dẫn đến nó (_một bằng chứng Merkle_). Ngược lại, không có cách nào để tạo ra hai trạng thái khác nhau với cùng một băm gốc và mọi nỗ lực sửa đổi trạng thái bằng các giá trị khác nhau sẽ dẫn đến một băm gốc trạng thái khác. Về mặt lý thuyết, cấu trúc này cung cấp 'chén thánh' về hiệu quả `O(log(n))` cho việc chèn, tra cứu và xóa.

Trong tương lai gần, Ethereum có kế hoạch chuyển sang cấu trúc [Cây Verkle](/roadmap/verkle-trees), điều này sẽ mở ra nhiều khả năng mới cho các cải tiến giao thức trong tương lai.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, bạn nên có kiến thức cơ bản về [các hàm băm](https://en.wikipedia.org/wiki/Hash_function), [cây Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [cây (tries)](https://en.wikipedia.org/wiki/Trie) và [tuần tự hóa](https://en.wikipedia.org/wiki/Serialization). Bài viết này bắt đầu bằng phần mô tả về một [cây cơ số](https://en.wikipedia.org/wiki/Radix_tree) cơ bản, sau đó giới thiệu dần các sửa đổi cần thiết cho cấu trúc dữ liệu được tối ưu hóa hơn của Ethereum.

## Các cây cơ số cơ bản {#basic-radix-tries}

Trong một cây cơ số cơ bản, mọi nút trông như sau:

```
    [i_0, i_1 ... i_n, value]
```

Trong đó `i_0 ...` i_n`biểu thị các ký hiệu của bảng chữ cái (thường là nhị phân hoặc thập lục phân),`value`là giá trị cuối tại nút, và các giá trị trong`i_0, i_1 ...` các vị trí i_n` là `NULL` hoặc con trỏ tới (trong trường hợp của chúng ta là băm của) các nút khác. Điều này tạo thành một kho lưu trữ `(khóa, giá trị)` cơ bản.

Giả sử bạn muốn sử dụng cấu trúc dữ liệu cây cơ số để duy trì một thứ tự trên một tập hợp các cặp khóa-giá trị. Để tìm giá trị hiện được ánh xạ tới khóa `dog` trong cây, trước tiên bạn sẽ chuyển đổi `dog` thành các chữ cái của bảng chữ cái (cho ra `64 6f 67`), sau đó đi xuống cây theo đường dẫn đó cho đến khi bạn tìm thấy giá trị. Nghĩa là, bạn bắt đầu bằng cách tra cứu băm gốc trong một DB khóa/giá trị phẳng để tìm nút gốc của cây. Nó được biểu diễn dưới dạng một mảng các khóa trỏ đến các nút khác. Bạn sẽ sử dụng giá trị tại chỉ mục `6` làm khóa và tra cứu nó trong DB khóa/giá trị phẳng để lấy nút ở cấp thấp hơn. Sau đó chọn chỉ mục `4` để tra cứu giá trị tiếp theo, rồi chọn chỉ mục `6`, v.v., cho đến khi, sau khi bạn đi theo đường dẫn: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, bạn sẽ tra cứu giá trị của nút và trả về kết quả.

Có sự khác biệt giữa việc tra cứu một cái gì đó trong 'cây' và 'DB' khóa/giá trị phẳng cơ bản. Cả hai đều xác định các sắp xếp khóa/giá trị, nhưng DB cơ bản có thể thực hiện tra cứu 1 bước truyền thống cho một khóa. Việc tra cứu một khóa trong cây đòi hỏi nhiều lần tra cứu DB cơ bản để đến được giá trị cuối cùng được mô tả ở trên. Hãy gọi cái sau là `path` để loại bỏ sự mơ hồ.

Các thao tác cập nhật và xóa đối với cây cơ số có thể được định nghĩa như sau:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Một cây cơ số "Merkle" được xây dựng bằng cách liên kết các nút sử dụng các thông báo băm mật mã được tạo ra một cách xác định. Việc định địa chỉ nội dung này (trong DB khóa/giá trị `khóa == keccak256(rlp(giá trị))`) cung cấp một sự đảm bảo toàn vẹn bằng mật mã của dữ liệu được lưu trữ. Nếu băm gốc của một cây cho trước được biết đến công khai, thì bất kỳ ai có quyền truy cập vào dữ liệu lá cơ bản đều có thể xây dựng một bằng chứng rằng cây bao gồm một giá trị nhất định tại một đường dẫn cụ thể bằng cách cung cấp các băm của mỗi nút nối một giá trị cụ thể với gốc cây.

Kẻ tấn công không thể cung cấp bằng chứng về một cặp `(đường dẫn, giá trị)` không tồn tại vì băm gốc cuối cùng dựa trên tất cả các băm bên dưới nó. Bất kỳ sửa đổi cơ bản nào cũng sẽ thay đổi băm gốc. Bạn có thể nghĩ về băm như một biểu diễn nén của thông tin cấu trúc về dữ liệu, được bảo mật bởi sự bảo vệ tiền ảnh của hàm băm.

Chúng ta sẽ gọi một đơn vị nguyên tử của cây cơ số (ví dụ: một ký tự thập lục phân đơn, hoặc số nhị phân 4 bit) là một "nibble". Trong khi duyệt một đường dẫn mỗi lần một nibble, như đã mô tả ở trên, các nút có thể tham chiếu tối đa đến 16 con nhưng bao gồm một phần tử `value`. Do đó, chúng ta biểu diễn chúng dưới dạng một mảng có độ dài 17. Chúng ta gọi các mảng 17 phần tử này là "nút nhánh".

## Cây Merkle Patricia {#merkle-patricia-trees}

Các cây cơ số có một hạn chế lớn: chúng không hiệu quả. Nếu bạn muốn lưu trữ một liên kết `(đường dẫn, giá trị)` trong đó đường dẫn, giống như trong Ethereum, dài 64 ký tự (số lượng nibble trong `bytes32`), chúng ta sẽ cần hơn một kilobyte dung lượng bổ sung để lưu trữ một cấp cho mỗi ký tự, và mỗi lần tra cứu hoặc xóa sẽ mất đủ 64 bước. Cây Patricia được giới thiệu sau đây sẽ giải quyết vấn đề này.

### Tối ưu hóa {#optimization}

Một nút trong một cây Merkle Patricia là một trong những loại sau:

1. `NULL` (được biểu thị bằng chuỗi trống)
2. `branch` Một nút 17 mục `[ v0 ...` v15, vt ]`
3. `leaf` Một nút 2 mục `[ encodedPath, value ]`
4. `extension` Một nút 2 mục `[ encodedPath, key ]`

Với các đường dẫn 64 ký tự, không thể tránh khỏi việc sau khi duyệt qua vài lớp đầu tiên của cây, bạn sẽ đến một nút nơi không có đường dẫn phân kỳ nào tồn tại ít nhất một phần đường đi xuống. Để tránh phải tạo ra tới 15 nút `NULL` thưa thớt dọc theo đường dẫn, chúng tôi rút ngắn đường đi xuống bằng cách thiết lập một nút `extension` có dạng `[ encodedPath, key ]`, trong đó `encodedPath` chứa "đường dẫn một phần" để bỏ qua (sử dụng một mã hóa nhỏ gọn được mô tả bên dưới) và `key` dùng cho lần tra cứu DB tiếp theo.

Đối với một nút `leaf`, có thể được đánh dấu bằng một cờ trong nibble đầu tiên của `encodedPath`, đường dẫn mã hóa tất cả các đoạn đường dẫn của nút trước đó và chúng ta có thể tra cứu trực tiếp `value`.

Tuy nhiên, việc tối ưu hóa trên lại gây ra sự mơ hồ.

Khi duyệt các đường dẫn theo nibble, chúng ta có thể kết thúc với một số lượng nibble lẻ cần duyệt, nhưng vì tất cả dữ liệu được lưu trữ ở định dạng `bytes`. Không thể phân biệt được, chẳng hạn, giữa nibble `1` và các nibble `01` (cả hai đều phải được lưu trữ là `<01>`). Để chỉ định độ dài lẻ, đường dẫn một phần được đặt trước bằng một cờ.

### Đặc tả: Mã hóa nhỏ gọn của chuỗi hex với dấu kết thúc tùy chọn {#specification}

Việc gắn cờ cho cả _độ dài đường dẫn một phần còn lại là lẻ so với chẵn_ và _nút lá so với nút mở rộng_ như được mô tả ở trên nằm ở nibble đầu tiên của đường dẫn một phần của bất kỳ nút 2 mục nào. Chúng dẫn đến kết quả sau:

| ký tự hex | bit  | loại nút                         | độ dài đường dẫn |
| --------- | ---- | -------------------------------- | ---------------- |
| 0         | 0000 | mở rộng                          | chẵn             |
| 1         | 0001 | mở rộng                          | lẻ               |
| 2         | 0010 | kết thúc (lá) | chẵn             |
| 3         | 0011 | kết thúc (lá) | lẻ               |

Đối với độ dài đường dẫn còn lại là chẵn (`0` hoặc `2`), một nibble "đệm" `0` khác sẽ luôn theo sau.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray now has an even length whose first nibble is the flags.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Ví dụ:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Đây là mã mở rộng để lấy một nút trong cây Merkle Patricia:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Ví dụ về cây {#example-trie}

Giả sử chúng ta muốn có một cây chứa bốn cặp đường dẫn/giá trị `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Đầu tiên, chúng ta chuyển đổi cả đường dẫn và giá trị thành `bytes`. Dưới đây, các biểu diễn byte thực tế cho _đường dẫn_ được biểu thị bằng `<>`, mặc dù _giá trị_ vẫn được hiển thị dưới dạng chuỗi, được biểu thị bằng `''`, để dễ hiểu hơn (chúng thực sự cũng sẽ là `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Bây giờ, chúng ta xây dựng một cây như vậy với các cặp khóa/giá trị sau trong DB cơ bản:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Khi một nút được tham chiếu bên trong một nút khác, những gì được bao gồm là `keccak256(rlp.encode(node))`, nếu `len(rlp.encode(node)) >= 32` thì ngược lại là `node`, trong đó `rlp.encode` là hàm mã hóa [RLP](/developers/docs/data-structures-and-encoding/rlp).

Lưu ý rằng khi cập nhật một cây, người ta cần lưu trữ cặp khóa/giá trị `(keccak256(x), x)` trong một bảng tra cứu liên tục _nếu_ nút mới được tạo có độ dài >= 32. Tuy nhiên, nếu nút ngắn hơn, người ta không cần phải lưu trữ bất cứ điều gì, vì hàm f(x) = x là có thể đảo ngược.

## Các cây trong Ethereum {#tries-in-ethereum}

Tất cả các cây merkle trong lớp thực thi của Ethereum đều sử dụng Cây Merkle Patricia.

Từ một tiêu đề khối có 3 gốc từ 3 trong số các cây này.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Cây trạng thái {#state-trie}

Có một cây trạng thái toàn cục, và nó được cập nhật mỗi khi một ứng dụng xử lý một khối. Trong đó, một `path` luôn là: `keccak256(ethereumAddress)` và một `value` luôn là: `rlp(ethereumAccount)`. Cụ thể hơn, một `tài khoản` Ethereum là một mảng 4 mục gồm `[nonce,balance,storageRoot,codeHash]`. Tại thời điểm này, cần lưu ý rằng `storageRoot` này là gốc của một cây patricia khác:

### Cây lưu trữ {#storage-trie}

Cây lưu trữ là nơi _tất cả_ dữ liệu hợp đồng tồn tại. Có một cây lưu trữ riêng cho mỗi tài khoản. Để truy xuất các giá trị tại các vị trí lưu trữ cụ thể tại một địa chỉ nhất định, cần có địa chỉ lưu trữ, vị trí số nguyên của dữ liệu được lưu trữ trong bộ lưu trữ và ID khối. Sau đó, chúng có thể được chuyển làm đối số cho `eth_getStorageAt` được định nghĩa trong JSON-RPC API, ví dụ: để truy xuất dữ liệu trong vị trí lưu trữ 0 cho địa chỉ `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Việc truy xuất các phần tử khác trong bộ lưu trữ phức tạp hơn một chút vì trước tiên phải tính toán vị trí trong cây lưu trữ. Vị trí được tính bằng băm `keccak256` của địa chỉ và vị trí lưu trữ, cả hai đều được đệm bên trái bằng các số không cho đến độ dài 32 byte. Ví dụ: vị trí của dữ liệu trong vị trí lưu trữ 1 cho địa chỉ `0x391694e7e0b0cce554cb130d723a9d27458f9298` là:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Trong bảng điều khiển Geth, điều này có thể được tính như sau:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

`path` do đó là `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Bây giờ có thể sử dụng điều này để truy xuất dữ liệu từ cây lưu trữ như trước:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Lưu ý: `storageRoot` cho một tài khoản Ethereum mặc định là trống nếu đó không phải là tài khoản hợp đồng.

### Cây giao dịch {#transaction-trie}

Có một cây giao dịch riêng cho mỗi khối, lại lưu trữ các cặp `(khóa, giá trị)`. Một đường dẫn ở đây là: `rlp(transactionIndex)` đại diện cho khóa tương ứng với một giá trị được xác định bởi:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Thông tin thêm về điều này có thể được tìm thấy trong tài liệu [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Cây biên lai {#receipts-trie}

Mỗi khối có cây Biên lai riêng. Một `path` ở đây là: `rlp(transactionIndex)`. `transactionIndex` là chỉ mục của nó trong khối mà nó được bao gồm. Cây biên lai không bao giờ được cập nhật. Tương tự như cây Giao dịch, có các biên lai hiện tại và cũ. Để truy vấn một biên lai cụ thể trong cây Biên lai, cần có chỉ mục của giao dịch trong khối của nó, tải trọng biên lai và loại giao dịch. Biên lai được trả về có thể thuộc loại `Receipt` được định nghĩa là sự nối chuỗi của `TransactionType` và `ReceiptPayload` hoặc nó có thể thuộc loại `LegacyReceipt` được định nghĩa là `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Thông tin thêm về điều này có thể được tìm thấy trong tài liệu [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Đọc thêm {#further-reading}

- [Cây Merkle Patricia đã sửa đổi — Cách Ethereum lưu một trạng thái](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling trong Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Tìm hiểu về cây Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
