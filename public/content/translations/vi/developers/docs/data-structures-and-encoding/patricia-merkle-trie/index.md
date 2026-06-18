---
title: Cây tiền tố Merkle Patricia
description: Giới thiệu về cây tiền tố Merkle Patricia.
lang: vi
sidebarDepth: 2
---

Trạng thái của [Ethereum](/) (tổng thể của tất cả các Tài khoản, số dư và hợp đồng thông minh), được mã hóa thành một phiên bản đặc biệt của cấu trúc dữ liệu thường được biết đến trong khoa học máy tính là cây Merkle. Cấu trúc này hữu ích cho nhiều ứng dụng trong mật mã học vì nó tạo ra một mối quan hệ có thể xác minh giữa tất cả các phần dữ liệu riêng lẻ được liên kết trong cây, dẫn đến một giá trị **gốc** (root) duy nhất có thể được sử dụng để chứng minh các thông tin về dữ liệu.

Cấu trúc dữ liệu của Ethereum là một 'cây tiền tố Merkle Patricia được sửa đổi', được đặt tên như vậy vì nó mượn một số tính năng của PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric - Thuật toán thực tế để truy xuất thông tin được mã hóa bằng chữ và số), và vì nó được thiết kế để truy xuất (re**trie**val) dữ liệu hiệu quả cho các mục cấu thành nên trạng thái Ethereum.

Cây tiền tố Merkle Patricia có tính tất định và có thể xác minh bằng mật mã học: Cách duy nhất để tạo ra một gốc trạng thái là tính toán nó từ từng phần riêng lẻ của trạng thái, và hai trạng thái giống hệt nhau có thể dễ dàng được chứng minh bằng cách so sánh mã băm gốc và các mã băm dẫn đến nó (_một bằng chứng Merkle_). Ngược lại, không có cách nào để tạo ra hai trạng thái khác nhau với cùng một mã băm gốc, và bất kỳ nỗ lực nào nhằm sửa đổi trạng thái với các giá trị khác nhau sẽ dẫn đến một mã băm gốc trạng thái khác. Về mặt lý thuyết, cấu trúc này cung cấp 'chén thánh' về hiệu suất `O(log(n))` cho các thao tác chèn, tra cứu và xóa.

Trong tương lai gần, Ethereum có kế hoạch chuyển sang cấu trúc [cây Verkle](/roadmap/verkle-trees), điều này sẽ mở ra nhiều khả năng mới cho các cải tiến giao thức trong tương lai.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, sẽ rất hữu ích nếu bạn có kiến thức cơ bản về [mã băm](https://en.wikipedia.org/wiki/Hash_function), [cây Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [cây tiền tố (trie)](https://en.wikipedia.org/wiki/Trie) và [tuần tự hóa](https://en.wikipedia.org/wiki/Serialization). Bài viết này bắt đầu bằng mô tả về một [cây cơ số (radix tree)](https://en.wikipedia.org/wiki/Radix_tree) cơ bản, sau đó dần dần giới thiệu các sửa đổi cần thiết cho cấu trúc dữ liệu tối ưu hơn của Ethereum.

## Cây tiền tố cơ số cơ bản (Basic radix tries) {#basic-radix-tries}

Trong một cây tiền tố cơ số cơ bản, mỗi nút trông như sau:

```
[i_0, i_1 ... i_n, value]
```

Trong đó `i_0 ... i_n` đại diện cho các ký hiệu của bảng chữ cái (thường là nhị phân hoặc thập lục phân), `value` là giá trị đầu cuối tại nút, và các giá trị trong các khe `i_0, i_1 ... i_n` có thể là `NULL` hoặc các con trỏ trỏ đến (trong trường hợp của chúng ta là mã băm của) các nút khác. Điều này tạo thành một kho lưu trữ `(key, value)` cơ bản.

Giả sử bạn muốn sử dụng cấu trúc dữ liệu cây cơ số để duy trì thứ tự trên một tập hợp các cặp khóa-giá trị. Để tìm giá trị hiện được ánh xạ tới khóa `dog` trong cây tiền tố, trước tiên bạn sẽ chuyển đổi `dog` thành các chữ cái của bảng chữ cái (tạo ra `64 6f 67`), và sau đó đi xuống cây tiền tố theo đường dẫn đó cho đến khi bạn tìm thấy giá trị. Tức là, bạn bắt đầu bằng cách tra cứu mã băm gốc trong một cơ sở dữ liệu (DB) khóa/giá trị phẳng để tìm nút gốc của cây tiền tố. Nó được biểu diễn dưới dạng một mảng các khóa trỏ đến các nút khác. Bạn sẽ sử dụng giá trị tại chỉ số `6` làm khóa và tra cứu nó trong DB khóa/giá trị phẳng để lấy nút ở cấp độ thấp hơn một bậc. Sau đó chọn chỉ số `4` để tra cứu giá trị tiếp theo, rồi chọn chỉ số `6`, và cứ tiếp tục như vậy, cho đến khi bạn đi theo đường dẫn: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, bạn sẽ tra cứu giá trị của nút và trả về kết quả.

Có một sự khác biệt giữa việc tra cứu một thứ gì đó trong 'cây tiền tố' và 'DB' khóa/giá trị phẳng bên dưới. Cả hai đều định nghĩa các sắp xếp khóa/giá trị, nhưng DB bên dưới có thể thực hiện tra cứu khóa truyền thống trong 1 bước. Việc tra cứu một khóa trong cây tiền tố yêu cầu nhiều lần tra cứu DB bên dưới để đạt được giá trị cuối cùng như mô tả ở trên. Hãy gọi cái sau là `path` để loại bỏ sự mơ hồ.

Các thao tác cập nhật và xóa đối với cây tiền tố cơ số có thể được định nghĩa như sau:

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

Một cây cơ số "Merkle" được xây dựng bằng cách liên kết các nút sử dụng các bản tóm tắt mã băm mật mã học được tạo ra một cách tất định. Việc định địa chỉ theo nội dung này (trong DB khóa/giá trị `key == keccak256(rlp(value))`) cung cấp sự đảm bảo tính toàn vẹn bằng mật mã học cho dữ liệu được lưu trữ. Nếu mã băm gốc của một cây tiền tố nhất định được công khai, thì bất kỳ ai có quyền truy cập vào dữ liệu lá bên dưới đều có thể xây dựng một bằng chứng rằng cây tiền tố bao gồm một giá trị nhất định tại một đường dẫn cụ thể bằng cách cung cấp các mã băm của từng nút nối một giá trị cụ thể với gốc của cây.

Kẻ tấn công không thể cung cấp bằng chứng về một cặp `(path, value)` không tồn tại vì mã băm gốc cuối cùng dựa trên tất cả các mã băm bên dưới nó. Bất kỳ sửa đổi cơ bản nào cũng sẽ làm thay đổi mã băm gốc. Bạn có thể coi mã băm như một biểu diễn nén của thông tin cấu trúc về dữ liệu, được bảo mật bởi tính năng bảo vệ tiền ảnh (pre-image protection) của hàm băm.

Chúng ta sẽ gọi một đơn vị nguyên tử của cây cơ số (ví dụ: một ký tự thập lục phân duy nhất hoặc số nhị phân 4 bit) là một "nibble" (nửa byte). Trong khi duyệt qua một đường dẫn từng nibble một, như được mô tả ở trên, các nút có thể tham chiếu tối đa đến 16 nút con nhưng bao gồm một phần tử `value`. Do đó, chúng ta biểu diễn chúng dưới dạng một mảng có độ dài 17. Chúng ta gọi các mảng 17 phần tử này là "các nút nhánh" (branch nodes).

## Cây tiền tố Merkle Patricia {#merkle-patricia-trees}

Cây tiền tố cơ số có một hạn chế lớn: chúng không hiệu quả. Nếu bạn muốn lưu trữ một liên kết `(path, value)` trong đó đường dẫn, giống như trong Ethereum, dài 64 ký tự (số lượng nibble trong `bytes32`), chúng ta sẽ cần hơn một kilobyte không gian bổ sung để lưu trữ một cấp độ cho mỗi ký tự, và mỗi lần tra cứu hoặc xóa sẽ mất trọn vẹn 64 bước. Cây tiền tố Patricia được giới thiệu sau đây sẽ giải quyết vấn đề này.

### Tối ưu hóa {#optimization}

Một nút trong cây tiền tố Merkle Patricia là một trong những loại sau:

1.  `NULL` (được biểu diễn dưới dạng chuỗi rỗng)
2.  `branch` Một nút gồm 17 mục `[ v0 ... v15, vt ]`
3.  `leaf` Một nút gồm 2 mục `[ encodedPath, value ]`
4.  `extension` Một nút gồm 2 mục `[ encodedPath, key ]`

Với các đường dẫn 64 ký tự, điều tất yếu là sau khi duyệt qua một vài lớp đầu tiên của cây tiền tố, bạn sẽ đến một nút mà không có đường dẫn phân kỳ nào tồn tại cho ít nhất một phần của đoạn đường đi xuống. Để tránh phải tạo ra tới 15 nút `NULL` thưa thớt dọc theo đường dẫn, chúng ta đi tắt quá trình đi xuống bằng cách thiết lập một nút `extension` có dạng `[ encodedPath, key ]`, trong đó `encodedPath` chứa "đường dẫn một phần" để bỏ qua (sử dụng một mã hóa nhỏ gọn được mô tả bên dưới), và `key` dành cho lần tra cứu DB tiếp theo.

Đối với một nút `leaf`, có thể được đánh dấu bằng một cờ trong nibble đầu tiên của `encodedPath`, đường dẫn mã hóa tất cả các đoạn đường dẫn của nút trước đó và chúng ta có thể tra cứu `value` trực tiếp.

Tuy nhiên, sự tối ưu hóa ở trên lại gây ra sự mơ hồ.

Khi duyệt qua các đường dẫn bằng nibble, chúng ta có thể kết thúc với một số lượng nibble lẻ cần duyệt, nhưng vì tất cả dữ liệu được lưu trữ ở định dạng `bytes`. Không thể phân biệt được, ví dụ, giữa nibble `1` và các nibble `01` (cả hai đều phải được lưu trữ dưới dạng `<01>`). Để chỉ định độ dài lẻ, đường dẫn một phần được thêm tiền tố là một cờ.

### Đặc tả: Mã hóa nhỏ gọn của chuỗi thập lục phân với ký tự kết thúc tùy chọn {#specification}

Việc gắn cờ cho cả _độ dài đường dẫn một phần còn lại là lẻ hay chẵn_ và _nút lá hay nút mở rộng_ như được mô tả ở trên nằm trong nibble đầu tiên của đường dẫn một phần của bất kỳ nút 2 mục nào. Chúng dẫn đến kết quả như sau:

| ký tự hex | bit | loại nút một phần | độ dài đường dẫn |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | mở rộng (extension) | chẵn        |
| 1        | 0001 | mở rộng (extension) | lẻ         |
| 2        | 0010 | kết thúc (lá) | chẵn        |
| 3        | 0011 | kết thúc (lá) | lẻ         |

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
        # hexarray hiện có độ dài chẵn với nibble đầu tiên là các cờ.
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

Dưới đây là mã mở rộng để lấy một nút trong cây tiền tố Merkle Patricia:

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

### Ví dụ về cây tiền tố (Trie) {#example-trie}

Giả sử chúng ta muốn một cây tiền tố chứa bốn cặp đường dẫn/giá trị `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Đầu tiên, chúng ta chuyển đổi cả đường dẫn và giá trị thành `bytes`. Dưới đây, các biểu diễn byte thực tế cho _đường dẫn_ được biểu thị bằng `<>`, mặc dù _giá trị_ vẫn được hiển thị dưới dạng chuỗi, được biểu thị bằng `''`, để dễ hiểu hơn (chúng cũng sẽ thực sự là `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Bây giờ, chúng ta xây dựng một cây tiền tố như vậy với các cặp khóa/giá trị sau trong DB bên dưới:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Khi một nút được tham chiếu bên trong một nút khác, những gì được bao gồm là `keccak256(rlp.encode(node))`, nếu `len(rlp.encode(node)) >= 32` ngược lại là `node` trong đó `rlp.encode` là hàm mã hóa [RLP](/developers/docs/data-structures-and-encoding/rlp).

Lưu ý rằng khi cập nhật một cây tiền tố, người ta cần lưu trữ cặp khóa/giá trị `(keccak256(x), x)` trong một bảng tra cứu liên tục _nếu_ nút mới được tạo có độ dài >= 32. Tuy nhiên, nếu nút ngắn hơn thế, người ta không cần lưu trữ bất cứ thứ gì, vì hàm f(x) = x có thể đảo ngược.

## Cây tiền tố trong Ethereum {#tries-in-ethereum}

Tất cả các cây tiền tố Merkle trong lớp thực thi của Ethereum đều sử dụng cây tiền tố Merkle Patricia.

Từ một tiêu đề block, có 3 gốc từ 3 trong số các cây tiền tố này.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie trạng thái {#state-trie}

Có một trie trạng thái toàn cục duy nhất, và nó được cập nhật mỗi khi một client xử lý một khối. Trong đó, một `path` luôn là: `keccak256(ethereumAddress)` và một `value` luôn là: `rlp(ethereumAccount)`. Cụ thể hơn, một `account` Ethereum là một mảng 4 mục gồm `[nonce,balance,storageRoot,codeHash]`. Tại thời điểm này, cần lưu ý rằng `storageRoot` này là gốc của một cây tiền tố Patricia khác:

### Trie lưu trữ {#storage-trie}

Trie lưu trữ là nơi chứa _tất cả_ dữ liệu hợp đồng. Có một trie lưu trữ riêng biệt cho mỗi Tài khoản. Để truy xuất các giá trị tại các vị trí lưu trữ cụ thể ở một Địa chỉ nhất định, cần có địa chỉ lưu trữ, vị trí số nguyên của dữ liệu được lưu trữ trong bộ lưu trữ và ID khối. Sau đó, chúng có thể được truyền dưới dạng đối số cho `eth_getStorageAt` được định nghĩa trong API JSON-RPC, ví dụ: để truy xuất dữ liệu trong khe lưu trữ 0 cho Địa chỉ `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Việc truy xuất các phần tử khác trong bộ lưu trữ phức tạp hơn một chút vì trước tiên phải tính toán vị trí trong trie lưu trữ. Vị trí được tính bằng mã băm `keccak256` của Địa chỉ và vị trí lưu trữ, cả hai đều được đệm bằng các số 0 ở bên trái để có độ dài 32 byte. Ví dụ: vị trí cho dữ liệu trong khe lưu trữ 1 cho Địa chỉ `0x391694e7e0b0cce554cb130d723a9d27458f9298` là:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Trong bảng điều khiển Geth, điều này có thể được tính toán như sau:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Do đó, `path` là `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Bây giờ, nó có thể được sử dụng để truy xuất dữ liệu từ trie lưu trữ như trước:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Lưu ý: `storageRoot` cho một Tài khoản Ethereum mặc định là trống nếu nó không phải là một tài khoản hợp đồng.

### Trie giao dịch {#transaction-trie}

Có một trie giao dịch riêng biệt cho mỗi khối, một lần nữa lưu trữ các cặp `(key, value)`. Một đường dẫn ở đây là: `rlp(transactionIndex)` đại diện cho khóa tương ứng với một giá trị được xác định bởi:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Bạn có thể tìm thêm thông tin về điều này trong tài liệu [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie biên lai {#receipts-trie}

Mỗi khối có trie biên lai riêng. Một `path` ở đây là: `rlp(transactionIndex)`. `transactionIndex` là chỉ số của nó trong khối mà nó được đưa vào. Trie biên lai không bao giờ được cập nhật. Tương tự như trie giao dịch, có các biên lai hiện tại và biên lai cũ (legacy). Để truy vấn một biên lai cụ thể trong trie biên lai, cần có chỉ số của giao dịch trong khối của nó, tải trọng (payload) biên lai và loại giao dịch. Biên lai được trả về có thể thuộc loại `Receipt` được định nghĩa là sự nối kết của `TransactionType` và `ReceiptPayload` hoặc nó có thể thuộc loại `LegacyReceipt` được định nghĩa là `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Bạn có thể tìm thêm thông tin về điều này trong tài liệu [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Đọc thêm {#further-reading}

- [Cây tiền tố Merkle Patricia được sửa đổi — Cách Ethereum lưu trạng thái](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling trong Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Hiểu về cây tiền tố Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)