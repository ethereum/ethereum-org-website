---
title: Dagger-Hashimoto
description: Một cái nhìn chi tiết về thuật toán Dagger-Hashimoto.
lang: vi
---

Dagger-Hashimoto là bản triển khai nghiên cứu và đặc tả ban đầu cho thuật toán khai thác của Ethereum. Dagger-Hashimoto đã được thay thế bằng [Ethash](#ethash). Hoạt động khai thác đã bị tắt hoàn toàn tại [The Merge](/roadmap/merge/) vào ngày 15 tháng 9 năm 2022. Kể từ đó, Ethereum đã được bảo mật bằng cơ chế [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos). Trang này mang tính chất lịch sử - thông tin ở đây không còn phù hợp với Ethereum sau The Merge.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [sự đồng thuận bằng chứng công việc](/developers/docs/consensus-mechanisms/pow), [khai thác](/developers/docs/consensus-mechanisms/pow/mining) và [các thuật toán khai thác](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto nhằm đáp ứng hai mục tiêu:

1. **Kháng ASIC**: lợi ích từ việc tạo ra phần cứng chuyên dụng cho thuật toán phải nhỏ nhất có thể
2. **Khả năng xác minh của ứng dụng nhẹ**: một khối phải có thể được xác minh hiệu quả bởi một ứng dụng nhẹ.

Với một sửa đổi bổ sung, chúng tôi cũng chỉ định cách thực hiện mục tiêu thứ ba nếu muốn, nhưng phải trả giá bằng sự phức tạp tăng thêm:

**Lưu trữ toàn bộ chuỗi**: việc khai thác phải yêu cầu lưu trữ toàn bộ trạng thái chuỗi khối (do cấu trúc bất thường của cây trạng thái Ethereum, chúng tôi dự đoán rằng có thể thực hiện một số cắt tỉa, đặc biệt là đối với một số hợp đồng thường được sử dụng, nhưng chúng tôi muốn giảm thiểu điều này).

## Tạo DAG {#dag-generation}

Mã cho thuật toán sẽ được định nghĩa bằng Python bên dưới. Đầu tiên, chúng tôi cung cấp `encode_int` để sắp xếp các số nguyên không dấu có độ chính xác cụ thể thành các chuỗi. Nghịch đảo của nó cũng được đưa ra:

```python
NUM_BITS = 512

def encode_int(x):
    "Mã hóa một số nguyên x thành một chuỗi gồm 64 ký tự bằng cách sử dụng lược đồ big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Giải mã một số nguyên x từ một chuỗi bằng cách sử dụng lược đồ big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Tiếp theo, chúng tôi giả định rằng `sha3` là một hàm nhận một số nguyên và xuất ra một số nguyên, và `dbl_sha3` là một hàm double-sha3; nếu chuyển đổi mã tham chiếu này thành một bản triển khai, hãy sử dụng:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Các tham số {#parameters}

Các tham số được sử dụng cho thuật toán là:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Số nguyên tố an toàn lớn nhất nhỏ hơn 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Kích thước của bộ dữ liệu (4 Gigabyte); PHẢI LÀ BỘI SỐ CỦA 65536
      "n_inc": 65536,                   # Gia số trong giá trị của n mỗi kỳ; PHẢI LÀ BỘI SỐ CỦA 65536
                                        # với epochtime=20000 cho tốc độ tăng trưởng 882 MB mỗi năm
      "cache_size": 2500,               # Kích thước bộ nhớ đệm của ứng dụng nhẹ (có thể được chọn bởi ứng dụng nhẹ
                                        # ; không thuộc đặc tả của thuật toán)
      "diff": 2**14,                    # Độ khó (được điều chỉnh trong quá trình đánh giá khối)
      "epochtime": 100000,              # Độ dài của một epoch trong các khối (tần suất bộ dữ liệu được cập nhật)
      "k": 1,                           # Số lượng nút mẹ của một nút
      "w": w,                          # Được sử dụng để băm lũy thừa theo mô-đun
      "accesses": 200,                  # Số lần truy cập bộ dữ liệu trong quá trình hashimoto
      "P": SAFE_PRIME_512               # Số nguyên tố an toàn để băm và tạo số ngẫu nhiên
}
```

`P` trong trường hợp này là một số nguyên tố được chọn sao cho `log₂(P)` nhỏ hơn 512 một chút, tương ứng với 512 bit mà chúng ta đã sử dụng để biểu diễn các con số của mình. Lưu ý rằng chỉ có nửa sau của DAG thực sự cần được lưu trữ, vì vậy yêu cầu RAM trên thực tế bắt đầu ở mức 1 GB và tăng 441 MB mỗi năm.

### Xây dựng đồ thị Dagger {#dagger-graph-building}

Nguyên hàm xây dựng đồ thị dagger được định nghĩa như sau:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Về cơ bản, nó bắt đầu một đồ thị dưới dạng một nút duy nhất, `sha3(seed)`, và từ đó bắt đầu tuần tự thêm các nút khác dựa trên các nút ngẫu nhiên trước đó. Khi một nút mới được tạo, một lũy thừa theo mô-đun của seed được tính toán để chọn ngẫu nhiên một số chỉ số nhỏ hơn `i` (sử dụng `x % i` ở trên), và các giá trị của các nút tại các chỉ số đó được sử dụng trong một phép tính để tạo ra một giá trị mới cho `x`, sau đó được đưa vào một hàm bằng chứng công việc nhỏ (dựa trên XOR) để cuối cùng tạo ra giá trị của đồ thị tại chỉ số `i`. Lý do đằng sau thiết kế đặc biệt này là để buộc truy cập tuần tự vào DAG; giá trị tiếp theo của DAG sẽ được truy cập không thể được xác định cho đến khi giá trị hiện tại được biết. Cuối cùng, lũy thừa theo mô-đun sẽ băm kết quả sâu hơn nữa.

Thuật toán này dựa trên một số kết quả từ lý thuyết số. Xem phụ lục bên dưới để thảo luận.

## Đánh giá ứng dụng nhẹ {#light-client-evaluation}

Việc xây dựng đồ thị ở trên nhằm mục đích cho phép mỗi nút trong đồ thị được tái tạo bằng cách tính toán một cây con chỉ gồm một số lượng nhỏ các nút và chỉ yêu cầu một lượng nhỏ bộ nhớ phụ. Lưu ý rằng với k=1, cây con chỉ là một chuỗi các giá trị đi lên đến phần tử đầu tiên trong DAG.

Hàm tính toán của ứng dụng nhẹ cho DAG hoạt động như sau:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Về cơ bản, nó chỉ đơn giản là một bản viết lại của thuật toán trên, loại bỏ vòng lặp tính toán các giá trị cho toàn bộ DAG và thay thế việc tra cứu nút trước đó bằng một lệnh gọi đệ quy hoặc một tra cứu bộ nhớ đệm. Lưu ý rằng đối với `k=1`, bộ nhớ đệm là không cần thiết, mặc dù một tối ưu hóa sâu hơn thực sự tính toán trước vài nghìn giá trị đầu tiên của DAG và giữ đó làm bộ nhớ đệm tĩnh cho các phép tính; xem phụ lục để biết mã triển khai của việc này.

## Bộ đệm kép của các DAG {#double-buffer}

Trong một ứng dụng đầy đủ, một [_bộ đệm kép_](https://wikipedia.org/wiki/Multiple_buffering) gồm 2 DAG được tạo ra bởi công thức trên được sử dụng. Ý tưởng là các DAG được tạo ra mỗi `epochtime` khối theo các tham số ở trên. Thay vì ứng dụng sử dụng DAG mới nhất được tạo ra, nó sử dụng DAG trước đó. Lợi ích của việc này là nó cho phép các DAG được thay thế theo thời gian mà không cần phải kết hợp một bước mà các thợ đào phải đột ngột tính toán lại tất cả dữ liệu. Nếu không, có khả năng xử lý chuỗi sẽ bị chậm lại đột ngột và tạm thời ở các khoảng thời gian đều đặn và làm tăng đáng kể sự tập trung hóa. Do đó có rủi ro tấn công 51% trong vòng vài phút trước khi tất cả dữ liệu được tính toán lại.

Thuật toán được sử dụng để tạo tập hợp các DAG được sử dụng để tính toán công việc cho một khối như sau:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # Không thể có bộ đệm sau, chỉ cần tạo bộ đệm trước
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Ý tưởng đằng sau Hashimoto ban đầu là sử dụng chuỗi khối làm bộ dữ liệu, thực hiện một phép tính chọn N chỉ số từ chuỗi khối, thu thập các giao dịch tại các chỉ số đó, thực hiện phép XOR dữ liệu này và trả về giá trị băm của kết quả. Thuật toán ban đầu của Thaddeus Dryja, được dịch sang Python để đảm bảo tính nhất quán, như sau:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Thật không may, mặc dù Hashimoto được coi là khó về RAM, nó lại dựa vào số học 256-bit, vốn có chi phí tính toán đáng kể. Tuy nhiên, Dagger-Hashimoto chỉ sử dụng 64 bit có trọng số thấp nhất khi lập chỉ mục cho bộ dữ liệu của mình để giải quyết vấn đề này.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Việc sử dụng double SHA3 cho phép một hình thức xác minh trước gần như tức thời, không có dữ liệu, chỉ xác minh rằng một giá trị trung gian chính xác đã được cung cấp. Lớp bằng chứng công việc bên ngoài này rất thân thiện với ASIC và khá yếu, nhưng tồn tại để làm cho việc tấn công DDoS trở nên khó khăn hơn vì một lượng nhỏ công việc đó phải được thực hiện để tạo ra một khối sẽ không bị từ chối ngay lập tức. Đây là phiên bản ứng dụng nhẹ:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Khai thác và xác minh {#mining-and-verifying}

Bây giờ, chúng ta hãy kết hợp tất cả lại thành thuật toán khai thác:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

Đây là thuật toán xác minh:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Xác minh thân thiện với ứng dụng nhẹ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ngoài ra, lưu ý rằng Dagger-Hashimoto áp đặt các yêu cầu bổ sung đối với tiêu đề khối:

- Để xác minh hai lớp hoạt động, tiêu đề khối phải có cả nonce và giá trị trung gian trước khi qua sha3
- Ở đâu đó, tiêu đề khối phải lưu trữ sha3 của seedset hiện tại

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Phụ lục {#appendix}

Như đã lưu ý ở trên, RNG được sử dụng để tạo DAG dựa trên một số kết quả từ lý thuyết số. Đầu tiên, chúng tôi đảm bảo rằng Lehmer RNG, là cơ sở cho biến `picker`, có một chu kỳ dài. Thứ hai, chúng tôi chỉ ra rằng `pow(x,3,P)` sẽ không ánh xạ `x` tới `1` hoặc `P-1` với điều kiện `x ∈ [2,P-2]` ban đầu. Cuối cùng, chúng tôi chỉ ra rằng `pow(x,3,P)` có tỷ lệ xung đột thấp khi được coi là một hàm băm.

### Trình tạo số ngẫu nhiên Lehmer {#lehmer-random-number}

Mặc dù hàm `produce_dag` không cần tạo ra các số ngẫu nhiên không thiên vị, một mối đe dọa tiềm tàng là `seed**i % P` chỉ nhận một vài giá trị. Điều này có thể mang lại lợi thế cho những thợ đào nhận ra quy luật so với những người không nhận ra.

Để tránh điều này, một kết quả từ lý thuyết số được sử dụng. Một [_Số nguyên tố an toàn_](https://en.wikipedia.org/wiki/Safe_prime) được định nghĩa là một số nguyên tố `P` sao cho `(P-1)/2` cũng là một số nguyên tố. Bậc của một thành viên `x` của [nhóm nhân](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` được định nghĩa là `m` nhỏ nhất sao cho <pre>xᵐ mod P ≡ 1</pre>
Với các định nghĩa này, chúng ta có:

> Quan sát 1. Cho `x` là một thành viên của nhóm nhân `ℤ/Pℤ` đối với một số nguyên tố an toàn `P`. Nếu `x mod P ≠ 1 mod P` và `x mod P ≠ P-1 mod P`, thì bậc của `x` là `P-1` hoặc `(P-1)/2`.

_Bằng chứng_. Vì `P` là một số nguyên tố an toàn, nên theo [Định lý Lagrange][lagrange], chúng ta có bậc của `x` là `1`, `2`, `(P-1)/2` hoặc `P-1`.

Bậc của `x` không thể là `1`, vì theo Định lý nhỏ Fermat, chúng ta có:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Do đó, `x` phải là một phần tử đơn vị nhân của `ℤ/nℤ`, là duy nhất. Vì chúng ta đã giả định rằng `x ≠ 1`, điều này là không thể.

Bậc của `x` không thể là `2` trừ khi `x = P-1`, vì điều này sẽ vi phạm tính nguyên tố của `P`.

Từ mệnh đề trên, chúng ta có thể nhận ra rằng việc lặp `(picker * init) % P` sẽ có độ dài chu kỳ ít nhất là `(P-1)/2`. Điều này là do chúng tôi đã chọn `P` là một số nguyên tố an toàn xấp xỉ bằng một lũy thừa cao hơn của hai, và `init` nằm trong khoảng `[2,2**256+1]`. Với độ lớn của `P`, chúng ta không bao giờ nên mong đợi một chu kỳ từ phép lũy thừa theo mô-đun.

Khi chúng ta gán ô đầu tiên trong DAG (biến có nhãn `init`), chúng ta tính toán `pow(sha3(seed) + 2, 3, P)`. Thoạt nhìn, điều này không đảm bảo rằng kết quả không phải là `1` cũng không phải là `P-1`. Tuy nhiên, vì `P-1` là một số nguyên tố an toàn, chúng tôi có thêm sự đảm bảo sau đây, là hệ quả của Quan sát 1:

> Quan sát 2. Cho `x` là một thành viên của nhóm nhân `ℤ/Pℤ` đối với một số nguyên tố an toàn `P`, và cho `w` là một số tự nhiên. Nếu `x mod P ≠ 1 mod P` và `x mod P ≠ P-1 mod P`, cũng như `w mod P ≠ P-1 mod P` và `w mod P ≠ 0 mod P`, thì `xʷ mod P ≠ 1 mod P` và `xʷ mod P ≠ P-1 mod P`

### Lũy thừa theo mô-đun như một hàm băm {#modular-exponentiation}

Đối với các giá trị nhất định của `P` và `w`, hàm `pow(x, w, P)` có thể có nhiều xung đột. Ví dụ, `pow(x,9,19)` chỉ nhận các giá trị `{1,18}`.

Với `P` là số nguyên tố, thì `w` thích hợp cho một hàm băm lũy thừa theo mô-đun có thể được chọn bằng cách sử dụng kết quả sau:

> Quan sát 3. Cho `P` là một số nguyên tố; `w` và `P-1` là nguyên tố cùng nhau khi và chỉ khi với mọi `a` và `b` trong `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` khi và chỉ khi `a mod P ≡ b mod P`</center>

Do đó, với `P` là số nguyên tố và `w` là nguyên tố cùng nhau với `P-1`, chúng ta có `|{pow(x, w, P) : x ∈ ℤ}| = P`, ngụ ý rằng hàm băm có tỷ lệ xung đột nhỏ nhất có thể.

Trong trường hợp đặc biệt mà `P` là một số nguyên tố an toàn như chúng ta đã chọn, thì `P-1` chỉ có các ước số là 1, 2, `(P-1)/2` và `P-1`. Vì `P` > 7, chúng ta biết rằng 3 là nguyên tố cùng nhau với `P-1`, do đó `w=3` thỏa mãn mệnh đề trên.

## Thuật toán đánh giá dựa trên bộ nhớ đệm hiệu quả hơn {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```
