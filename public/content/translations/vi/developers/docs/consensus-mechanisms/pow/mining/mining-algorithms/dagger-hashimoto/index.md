---
title: Dagger-Hashimoto
description: Cái nhìn chi tiết về thuật toán Dagger-Hashimoto.
lang: vi
---

Dagger-Hashimoto là bản triển khai nghiên cứu và đặc tả ban đầu cho thuật toán khai thác của Ethereum. Dagger-Hashimoto đã được thay thế bởi [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash). Việc khai thác đã bị tắt hoàn toàn tại [The Merge](/roadmap/merge/) vào ngày 15 tháng 9 năm 2022. Kể từ đó, Ethereum được bảo mật bằng cơ chế [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos) thay thế. Trang này chỉ mang tính chất lịch sử - thông tin ở đây không còn phù hợp với Ethereum sau The Merge.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [đồng thuận Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow), [khai thác](/developers/docs/consensus-mechanisms/pow/mining) và [các thuật toán khai thác](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto nhằm mục đích thỏa mãn hai mục tiêu:

1.  **Kháng ASIC**: lợi ích từ việc tạo ra phần cứng chuyên dụng cho thuật toán phải càng nhỏ càng tốt
2.  **Khả năng xác minh của máy khách nhẹ**: một khối phải có thể được xác minh một cách hiệu quả bởi một máy khách nhẹ.

Với một sửa đổi bổ sung, chúng tôi cũng chỉ định cách hoàn thành mục tiêu thứ ba nếu muốn, nhưng phải trả giá bằng sự phức tạp gia tăng:

**Lưu trữ toàn bộ Chuỗi**: việc khai thác yêu cầu lưu trữ toàn bộ trạng thái Chuỗi khối (do cấu trúc không đều của trie trạng thái Ethereum, chúng tôi dự đoán rằng có thể thực hiện một số việc cắt tỉa, đặc biệt là đối với một số hợp đồng thường được sử dụng, nhưng chúng tôi muốn giảm thiểu điều này).

## Tạo DAG {#dag-generation}

Mã cho thuật toán sẽ được định nghĩa bằng Python bên dưới. Đầu tiên, chúng tôi cung cấp `encode_int` để sắp xếp các số nguyên không dấu (unsigned ints) có độ chính xác được chỉ định thành chuỗi. Dạng nghịch đảo của nó cũng được cung cấp:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Tiếp theo, chúng ta giả định rằng `sha3` là một hàm nhận vào một số nguyên và trả về một số nguyên, và `dbl_sha3` là một hàm double-sha3; nếu chuyển đổi mã tham chiếu này thành một bản triển khai, hãy sử dụng:

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
      "n": 4000055296 * 8 // NUM_BITS,  # Kích thước của tập dữ liệu (4 Gigabyte); PHẢI LÀ BỘI SỐ CỦA 65536
      "n_inc": 65536,                   # Mức tăng giá trị của n mỗi chu kỳ; PHẢI LÀ BỘI SỐ CỦA 65536
                                        # với epochtime=20000 mang lại mức tăng trưởng 882 MB mỗi năm
      "cache_size": 2500,               # Kích thước bộ nhớ cache của máy khách nhẹ (có thể được chọn bởi máy khách
                                        # nhẹ; không nằm trong đặc tả thuật toán)
      "diff": 2**14,                    # Độ khó (được điều chỉnh trong quá trình đánh giá khối)
      "epochtime": 100000,              # Độ dài của một kỷ nguyên tính bằng khối (tần suất cập nhật tập dữ liệu)
      "k": 1,                           # Số lượng nút cha của một nút
      "w": w,                          # Được sử dụng cho Quá trình băm lũy thừa mô-đun
      "accesses": 200,                  # Số lần truy cập tập dữ liệu trong hashimoto
      "P": SAFE_PRIME_512               # Số nguyên tố an toàn cho Quá trình băm và tạo số ngẫu nhiên
}
```

`P` trong trường hợp này là một số nguyên tố được chọn sao cho `log₂(P)` chỉ nhỏ hơn 512 một chút, tương ứng với 512 bit mà chúng ta đã sử dụng để biểu diễn các con số của mình. Lưu ý rằng trên thực tế chỉ cần lưu trữ nửa sau của DAG, do đó yêu cầu RAM thực tế bắt đầu ở mức 1 GB và tăng thêm 441 MB mỗi năm.

### Xây dựng đồ thị Dagger {#dagger-graph-building}

Nguyên thủy xây dựng đồ thị Dagger được định nghĩa như sau:

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

Về cơ bản, nó bắt đầu một đồ thị dưới dạng một nút duy nhất, `sha3(seed)`, và từ đó bắt đầu thêm tuần tự các nút khác dựa trên các nút ngẫu nhiên trước đó. Khi một nút mới được tạo, lũy thừa mô-đun của seed được tính toán để chọn ngẫu nhiên một số chỉ số nhỏ hơn `i` (sử dụng `x % i` ở trên), và các giá trị của các nút tại các chỉ số đó được sử dụng trong một phép tính để tạo ra một giá trị mới cho `x`, sau đó được đưa vào một hàm bằng chứng công việc nhỏ (dựa trên XOR) để cuối cùng tạo ra giá trị của đồ thị tại chỉ số `i`. Lý do đằng sau thiết kế cụ thể này là để buộc truy cập tuần tự vào DAG; giá trị tiếp theo của DAG sẽ được truy cập không thể được xác định cho đến khi biết được giá trị hiện tại. Cuối cùng, phép lũy thừa mô-đun sẽ băm kết quả thêm một bước nữa.

Thuật toán này dựa trên một số kết quả từ lý thuyết số. Xem phần phụ lục bên dưới để biết thêm chi tiết.

## Đánh giá máy khách nhẹ {#light-client-evaluation}

Cấu trúc đồ thị ở trên nhằm mục đích cho phép mỗi nút trong đồ thị được tái tạo lại bằng cách tính toán một cây con chỉ gồm một số lượng nhỏ các nút và chỉ yêu cầu một lượng nhỏ bộ nhớ phụ trợ. Lưu ý rằng với k=1, cây con chỉ là một chuỗi các giá trị đi lên phần tử đầu tiên trong DAG.

Hàm tính toán của máy khách nhẹ cho DAG hoạt động như sau:

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

Về cơ bản, nó chỉ đơn giản là viết lại thuật toán trên, loại bỏ vòng lặp tính toán các giá trị cho toàn bộ DAG và thay thế việc tra cứu nút trước đó bằng một lệnh gọi đệ quy hoặc tra cứu bộ nhớ cache. Lưu ý rằng đối với `k=1`, bộ nhớ cache là không cần thiết, mặc dù một tối ưu hóa sâu hơn thực sự tính toán trước vài nghìn giá trị đầu tiên của DAG và giữ nó làm bộ nhớ cache tĩnh cho các tính toán; xem phần phụ lục để biết mã triển khai của phần này.

## Bộ đệm kép của các DAG {#double-buffer}

Trong một máy khách đầy đủ, một [_bộ đệm kép_](https://wikipedia.org/wiki/Multiple_buffering) gồm 2 DAG được tạo ra bởi công thức trên sẽ được sử dụng. Ý tưởng là các DAG được tạo ra sau mỗi số lượng khối `epochtime` theo các tham số ở trên. Thay vì máy khách sử dụng DAG mới nhất được tạo ra, nó sử dụng DAG trước đó. Lợi ích của việc này là nó cho phép các DAG được thay thế theo thời gian mà không cần phải kết hợp một bước mà các thợ khai thác phải đột ngột tính toán lại tất cả dữ liệu. Nếu không, có khả năng xảy ra sự chậm lại tạm thời đột ngột trong quá trình xử lý Chuỗi theo các khoảng thời gian đều đặn và làm tăng đáng kể tính tập trung. Do đó, rủi ro cuộc tấn công 51% có thể xảy ra trong vài phút đó trước khi tất cả dữ liệu được tính toán lại.

Thuật toán được sử dụng để tạo tập hợp các DAG dùng để tính toán công việc cho một khối như sau:

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

Ý tưởng đằng sau Hashimoto ban đầu là sử dụng Chuỗi khối như một tập dữ liệu, thực hiện một phép tính chọn N chỉ số từ Chuỗi khối, thu thập các giao dịch tại các chỉ số đó, thực hiện phép XOR trên dữ liệu này và trả về mã băm của kết quả. Thuật toán ban đầu của Thaddeus Dryja, được dịch sang Python để đảm bảo tính nhất quán, như sau:

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

Thật không may, mặc dù Hashimoto được coi là tốn nhiều RAM (RAM hard), nó dựa trên số học 256-bit, có chi phí tính toán đáng kể. Tuy nhiên, Dagger-Hashimoto chỉ sử dụng 64 bit ít quan trọng nhất khi lập chỉ mục tập dữ liệu của nó để giải quyết vấn đề này.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Việc sử dụng double SHA3 cho phép một hình thức xác minh trước gần như tức thời, không cần dữ liệu (zero-data), chỉ xác minh rằng một giá trị trung gian chính xác đã được cung cấp. Lớp bằng chứng công việc bên ngoài này rất thân thiện với ASIC và khá yếu, nhưng tồn tại để làm cho DDoS trở nên khó khăn hơn nữa vì một lượng nhỏ công việc đó phải được thực hiện để tạo ra một khối sẽ không bị từ chối ngay lập tức. Dưới đây là phiên bản dành cho máy khách nhẹ:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Khai thác và xác minh {#mining-and-verifying}

Bây giờ, hãy kết hợp tất cả lại với nhau vào thuật toán khai thác:

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

Dưới đây là thuật toán xác minh:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Xác minh thân thiện với máy khách nhẹ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ngoài ra, lưu ý rằng Dagger-Hashimoto áp đặt các yêu cầu bổ sung đối với tiêu đề block:

- Để xác minh hai lớp hoạt động, một tiêu đề block phải có cả nonce và giá trị trung gian trước khi sha3 (pre-sha3)
- Ở đâu đó, một tiêu đề block phải lưu trữ sha3 của tập hợp seed (seedset) hiện tại

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Phụ lục {#appendix}

Như đã lưu ý ở trên, RNG (Trình tạo số ngẫu nhiên) được sử dụng để tạo DAG dựa trên một số kết quả từ lý thuyết số. Đầu tiên, chúng tôi đảm bảo rằng Lehmer RNG, cơ sở cho biến `picker`, có chu kỳ rộng. Thứ hai, chúng tôi chỉ ra rằng `pow(x,3,P)` sẽ không ánh xạ `x` thành `1` hoặc `P-1` với điều kiện `x ∈ [2,P-2]` để bắt đầu. Cuối cùng, chúng tôi chỉ ra rằng `pow(x,3,P)` có tỷ lệ va chạm thấp khi được coi là một hàm băm.

### Trình tạo số ngẫu nhiên Lehmer {#lehmer-random-number}

Mặc dù hàm `produce_dag` không cần tạo ra các số ngẫu nhiên không thiên vị, một mối đe dọa tiềm ẩn là `seed**i % P` chỉ nhận một số ít giá trị. Điều này có thể mang lại lợi thế cho những thợ khai thác nhận ra mô hình so với những người không nhận ra.

Để tránh điều này, một kết quả từ lý thuyết số được áp dụng. Một [_Số nguyên tố an toàn (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) được định nghĩa là một số nguyên tố `P` sao cho `(P-1)/2` cũng là số nguyên tố. _Bậc (order)_ của một thành viên `x` thuộc [nhóm nhân (multiplicative group)](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` được định nghĩa là `m` nhỏ nhất sao cho <pre>xᵐ mod P ≡ 1</pre>
Với những định nghĩa này, chúng ta có:

> Quan sát 1. Cho `x` là một thành viên của nhóm nhân `ℤ/Pℤ` đối với một số nguyên tố an toàn `P`. Nếu `x mod P ≠ 1 mod P` và `x mod P ≠ P-1 mod P`, thì bậc của `x` là `P-1` hoặc `(P-1)/2`.

_Chứng minh_. Vì `P` là một số nguyên tố an toàn, nên theo [Định lý Lagrange][lagrange], chúng ta có bậc của `x` là `1`, `2`, `(P-1)/2`, hoặc `P-1`.

Bậc của `x` không thể là `1`, vì theo Định lý nhỏ của Fermat, chúng ta có:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Do đó `x` phải là phần tử đơn vị của phép nhân của `ℤ/nℤ`, là duy nhất. Vì chúng ta đã giả định rằng `x ≠ 1` theo giả thiết, điều này là không thể.

Bậc của `x` không thể là `2` trừ khi `x = P-1`, vì điều này sẽ vi phạm việc `P` là số nguyên tố.

Từ mệnh đề trên, chúng ta có thể nhận ra rằng việc lặp lại `(picker * init) % P` sẽ có độ dài chu kỳ ít nhất là `(P-1)/2`. Điều này là do chúng ta đã chọn `P` là một số nguyên tố an toàn xấp xỉ bằng một lũy thừa cao hơn của hai, và `init` nằm trong khoảng `[2,2**256+1]`. Với độ lớn của `P`, chúng ta không bao giờ nên mong đợi một chu kỳ từ phép lũy thừa mô-đun.

Khi chúng ta gán ô đầu tiên trong DAG (biến có nhãn `init`), chúng ta tính toán `pow(sha3(seed) + 2, 3, P)`. Thoạt nhìn, điều này không đảm bảo rằng kết quả không phải là `1` cũng không phải là `P-1`. Tuy nhiên, vì `P-1` là một số nguyên tố an toàn, chúng ta có thêm sự đảm bảo sau đây, là hệ quả của Quan sát 1:

> Quan sát 2. Cho `x` là một thành viên của nhóm nhân `ℤ/Pℤ` đối với một số nguyên tố an toàn `P`, và cho `w` là một số tự nhiên. Nếu `x mod P ≠ 1 mod P` và `x mod P ≠ P-1 mod P`, cũng như `w mod P ≠ P-1 mod P` và `w mod P ≠ 0 mod P`, thì `xʷ mod P ≠ 1 mod P` và `xʷ mod P ≠ P-1 mod P`

### Phép lũy thừa mô-đun như một hàm băm {#modular-exponentiation}

Đối với các giá trị nhất định của `P` và `w`, hàm `pow(x, w, P)` có thể có nhiều va chạm. Ví dụ, `pow(x,9,19)` chỉ nhận các giá trị `{1,18}`.

Cho rằng `P` là số nguyên tố, thì một `w` thích hợp cho hàm băm lũy thừa mô-đun có thể được chọn bằng cách sử dụng kết quả sau:

> Quan sát 3. Cho `P` là một số nguyên tố; `w` và `P-1` là hai số nguyên tố cùng nhau khi và chỉ khi đối với mọi `a` và `b` trong `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` khi và chỉ khi `a mod P ≡ b mod P`</center>

Do đó, cho rằng `P` là số nguyên tố và `w` nguyên tố cùng nhau với `P-1`, chúng ta có `|{pow(x, w, P) : x ∈ ℤ}| = P`, ngụ ý rằng hàm băm có tỷ lệ va chạm tối thiểu có thể.

Trong trường hợp đặc biệt mà `P` là một số nguyên tố an toàn như chúng ta đã chọn, thì `P-1` chỉ có các ước số là 1, 2, `(P-1)/2` và `P-1`. Vì `P` > 7, chúng ta biết rằng 3 nguyên tố cùng nhau với `P-1`, do đó `w=3` thỏa mãn mệnh đề trên.

## Thuật toán đánh giá dựa trên bộ nhớ cache hiệu quả hơn {#cache-based-evaluation}

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