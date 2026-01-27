---
title: "Cách sử dụng Manticore để phát hiện lỗi trong hợp đồng thông minh"
description: "Cách sử dụng Manticore để tự động tìm lỗi trong hợp đồng thông minh"
author: Trailofbits
lang: vi
tags:
  [
    "solidity",
    "hợp đồng thông minh",
    "tính bảo mật",
    "kiểm thử",
    "xác minh chính thức"
  ]
skill: advanced
published: 2020-01-13
source: "Xây dựng những hợp đồng an toàn"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Mục đích của hướng dẫn này là chỉ ra cách sử dụng Manticore để tự động tìm lỗi trong hợp đồng thông minh.

## Cài đặt {#installation}

Manticore yêu cầu python >= 3.6. Nó có thể được cài đặt thông qua pip hoặc sử dụng docker.

### Manticore qua docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Lệnh cuối cùng chạy eth-security-toolbox trong một docker có quyền truy cập vào thư mục hiện tại của bạn. Bạn có thể thay đổi tệp từ máy chủ lưu trữ của mình và chạy các công cụ trên tệp từ docker_

Bên trong docker, chạy:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore qua pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Nên dùng solc 0.5.11.

### Chạy một tập lệnh {#running-a-script}

Để chạy một tập lệnh python bằng python 3:

```bash
python3 script.py
```

## Giới thiệu về thực thi ký hiệu động {#introduction-to-dynamic-symbolic-execution}

### Thực thi ký hiệu động một cách ngắn gọn {#dynamic-symbolic-execution-in-a-nutshell}

Thực thi ký hiệu động (DSE) là một kỹ thuật phân tích chương trình khám phá không gian trạng thái với mức độ nhận thức ngữ nghĩa cao. Kỹ thuật này dựa trên việc khám phá các "đường dẫn chương trình", được biểu diễn dưới dạng các công thức toán học gọi là `vị từ đường dẫn`. Về mặt khái niệm, kỹ thuật này hoạt động trên các vị từ đường dẫn theo hai bước:

1. Chúng được xây dựng bằng cách sử dụng các ràng buộc trên đầu vào của chương trình.
2. Chúng được sử dụng để tạo ra các đầu vào của chương trình sẽ khiến các đường dẫn liên quan thực thi.

Phương pháp này không tạo ra kết quả dương tính giả theo nghĩa là tất cả các trạng thái chương trình được xác định đều có thể được kích hoạt trong quá trình thực thi cụ thể. Ví dụ: nếu phân tích tìm thấy một lỗi tràn số nguyên, nó được đảm bảo có thể tái tạo được.

### Ví dụ về vị từ đường dẫn {#path-predicate-example}

Để hiểu rõ hơn về cách DSE hoạt động, hãy xem xét ví dụ sau:

```solidity
function f(uint a){

  if (a == 65) {
      // Có một lỗi
  }

}
```

Vì `f()` chứa hai đường dẫn, một DSE sẽ xây dựng hai vị từ đường dẫn khác nhau:

- Đường dẫn 1: `a == 65`
- Đường dẫn 2: `Not (a == 65)`

Mỗi vị từ đường dẫn là một công thức toán học có thể được đưa cho một cái gọi là [bộ giải SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), nó sẽ cố gắng giải phương trình. Đối với `Đường dẫn 1`, bộ giải sẽ cho biết rằng đường dẫn có thể được khám phá với `a = 65`. Đối với `Đường dẫn 2`, bộ giải có thể gán cho `a` bất kỳ giá trị nào khác ngoài 65, ví dụ `a = 0`.

### Xác minh các thuộc tính {#verifying-properties}

Manticore cho phép toàn quyền kiểm soát tất cả việc thực thi của mỗi đường dẫn. Do đó, nó cho phép bạn thêm các ràng buộc tùy ý vào hầu hết mọi thứ. Kiểm soát này cho phép tạo ra các thuộc tính trên hợp đồng.

Hãy xem xét ví dụ sau:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // không có bảo vệ chống tràn
  return c;
}
```

Ở đây chỉ có một đường dẫn để khám phá trong hàm:

- Đường dẫn 1: `c = a + b`

Sử dụng Manticore, bạn có thể kiểm tra lỗi tràn số và thêm các ràng buộc vào vị từ đường dẫn:

- `c = a + b AND (c < a OR c < b)`

Nếu có thể tìm thấy một định giá của `a` và `b` mà vị từ đường dẫn ở trên là khả thi, điều đó có nghĩa là bạn đã tìm thấy một lỗi tràn số. Ví dụ: bộ giải có thể tạo ra đầu vào `a = 10 , b = MAXUINT256`.

Nếu bạn xem xét một phiên bản đã sửa lỗi:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Công thức liên quan với kiểm tra lỗi tràn số sẽ là:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Công thức này không thể giải được; nói cách khác, đây là một **bằng chứng** cho thấy trong `safe_add`, `c` sẽ luôn tăng.

Do đó, DSE là một công cụ mạnh mẽ, có thể xác minh các ràng buộc tùy ý trên mã của bạn.

## Chạy dưới Manticore {#running-under-manticore}

Chúng ta sẽ xem cách khám phá một hợp đồng thông minh với Giao diện Lập trình Ứng dụng Manticore. Mục tiêu là hợp đồng thông minh sau đây [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Chạy một khám phá độc lập {#run-a-standalone-exploration}

Bạn có thể chạy Manticore trực tiếp trên hợp đồng thông minh bằng lệnh sau (`project` có thể là Tệp Solidity hoặc một thư mục dự án):

```bash
$ manticore project
```

Bạn sẽ nhận được đầu ra của các trường hợp kiểm thử như sau (thứ tự có thể thay đổi):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Nếu không có thông tin bổ sung, Manticore sẽ khám phá hợp đồng với các giao dịch ký hiệu mới cho đến khi nó không khám phá được các đường dẫn mới trên hợp đồng. Manticore không chạy các giao dịch mới sau một giao dịch không thành công (ví dụ: sau một lệnh revert).

Manticore sẽ xuất thông tin trong một thư mục `mcore_*`. Trong số những thứ khác, bạn sẽ tìm thấy trong thư mục này:

- `global.summary`: độ bao phủ và cảnh báo của trình biên dịch
- `test_XXXXX.summary`: độ bao phủ, lệnh cuối cùng, số dư tài khoản cho mỗi trường hợp kiểm thử
- `test_XXXXX.tx`: danh sách chi tiết các giao dịch cho mỗi trường hợp kiểm thử

Ở đây Manticore tìm thấy 7 trường hợp kiểm thử, tương ứng với (thứ tự tên tệp có thể thay đổi):

|                                                           |  Giao dịch 0 |         Giao dịch 1        | Giao dịch 2                | Kết quả |
| :-------------------------------------------------------: | :----------: | :------------------------: | -------------------------- | :-----: |
| **test_00000000.tx** | Tạo hợp đồng | f(!=65) | f(!=65) |   STOP  |
| **test_00000001.tx** | Tạo hợp đồng |        hàm dự phòng        |                            |  REVERT |
| **test_00000002.tx** | Tạo hợp đồng |                            |                            |  RETURN |
| **test_00000003.tx** | Tạo hợp đồng |  f(65)  |                            |  REVERT |
| **test_00000004.tx** | Tạo hợp đồng | f(!=65) |                            |   STOP  |
| **test_00000005.tx** | Tạo hợp đồng | f(!=65) | f(65)   |  REVERT |
| **test_00000006.tx** | Tạo hợp đồng | f(!=65) | hàm dự phòng               |  REVERT |

_Tóm tắt khám phá f(!=65) biểu thị f được gọi với bất kỳ giá trị nào khác 65._

Như bạn có thể nhận thấy, Manticore tạo ra một trường hợp kiểm thử duy nhất cho mỗi giao dịch thành công hoặc bị hoàn lại.

Sử dụng cờ `--quick-mode` nếu bạn muốn khám phá mã nhanh (nó vô hiệu hóa các bộ phát hiện lỗi, tính toán gas, ...)

### Thao tác một hợp đồng thông minh thông qua Giao diện Lập trình Ứng dụng {#manipulate-a-smart-contract-through-the-api}

Phần này mô tả chi tiết cách thao tác một hợp đồng thông minh thông qua Giao diện Lập trình Ứng dụng Python của Manticore. Bạn có thể tạo tệp mới với phần mở rộng python `*.py` và viết mã cần thiết bằng cách thêm các lệnh Giao diện Lập trình Ứng dụng (những lệnh cơ bản sẽ được mô tả bên dưới) vào tệp này và sau đó chạy nó bằng lệnh `$ python3 *.py`. Ngoài ra, bạn có thể thực thi các lệnh bên dưới trực tiếp vào bảng điều khiển python, để chạy bảng điều khiển, hãy sử dụng lệnh `$ python3`.

### Tạo Tài khoản {#creating-accounts}

Việc đầu tiên bạn nên làm là khởi tạo một chuỗi khối mới bằng các lệnh sau:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Một tài khoản không phải hợp đồng được tạo bằng [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Một hợp đồng Solidity có thể được triển khai bằng cách sử dụng [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Khởi tạo hợp đồng
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Tóm tắt {#summary}

- Bạn có thể tạo tài khoản người dùng và tài khoản hợp đồng với [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) và [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Thực thi giao dịch {#executing-transactions}

Manticore hỗ trợ hai loại giao dịch:

- Giao dịch thô: tất cả các hàm được khám phá
- Giao dịch được đặt tên: chỉ có một hàm được khám phá

#### Giao dịch thô {#raw-transaction}

Một giao dịch thô được thực hiện bằng cách sử dụng [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Người gọi, địa chỉ, dữ liệu hoặc giá trị của giao dịch có thể là cụ thể hoặc ký hiệu:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) tạo ra một giá trị ký hiệu.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) tạo một mảng byte ký hiệu.

Ví dụ:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Nếu dữ liệu là ký hiệu, Manticore sẽ khám phá tất cả các hàm của hợp đồng trong quá trình thực thi giao dịch. Sẽ hữu ích khi xem giải thích về Hàm dự phòng trong bài viết [Thực hành Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) để hiểu cách hoạt động của việc lựa chọn hàm.

#### Giao dịch được đặt tên {#named-transaction}

Các hàm có thể được thực thi thông qua tên của chúng.
Để thực thi `f(uint var)` với một giá trị ký hiệu, từ user_account và với 0 ether, hãy sử dụng:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Nếu `value` của giao dịch không được chỉ định, nó là 0 theo mặc định.

#### Tóm tắt {#summary-1}

- Các đối số của một giao dịch có thể là cụ thể hoặc ký hiệu
- Một giao dịch thô sẽ khám phá tất cả các hàm
- Hàm có thể được gọi bằng tên của chúng

### Không gian làm việc {#workspace}

`m.workspace` là thư mục được sử dụng làm thư mục đầu ra cho tất cả các tệp được tạo:

```python
print("Results are in {}".format(m.workspace))
```

### Chấm dứt việc khám phá {#terminate-the-exploration}

Để dừng việc khám phá, hãy sử dụng [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Không nên gửi thêm giao dịch nào sau khi phương thức này được gọi và Manticore tạo các trường hợp kiểm thử cho mỗi đường dẫn được khám phá.

### Tóm tắt: Chạy dưới Manticore {#summary-running-under-manticore}

Tổng hợp tất cả các bước trước đó, chúng ta có:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # dừng việc khám phá
```

Tất cả mã ở trên, bạn có thể tìm thấy trong [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Lấy các đường dẫn gây lỗi {#getting-throwing-paths}

Bây giờ chúng ta sẽ tạo các đầu vào cụ thể cho các đường dẫn gây ra ngoại lệ trong `f()`. Mục tiêu vẫn là hợp đồng thông minh sau đây [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Sử dụng thông tin trạng thái {#using-state-information}

Mỗi đường dẫn được thực thi đều có trạng thái riêng của chuỗi khối. Một trạng thái có thể ở trạng thái sẵn sàng hoặc bị hủy, nghĩa là nó đạt đến một lệnh THROW hoặc REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): danh sách các trạng thái đã sẵn sàng (chúng không thực thi REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): danh sách các trạng thái bị hủy
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): tất cả các trạng thái

```python
for state in m.all_states:
    # làm gì đó với trạng thái
```

Bạn có thể truy cập thông tin trạng thái. Ví dụ:

- `state.platform.get_balance(account.address)`: số dư của tài khoản
- `state.platform.transactions`: danh sách các giao dịch
- `state.platform.transactions[-1].return_data`: dữ liệu được trả về bởi giao dịch cuối cùng

Dữ liệu được trả về bởi giao dịch cuối cùng là một mảng, có thể được chuyển đổi thành một giá trị bằng ABI.deserialize, ví dụ:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cách tạo trường hợp kiểm thử {#how-to-generate-testcase}

Sử dụng [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) để tạo trường hợp kiểm thử:

```python
m.generate_testcase(state, 'BugFound')
```

### Tóm tắt {#summary-2}

- Bạn có thể lặp qua trạng thái với m.all_states
- `state.platform.get_balance(account.address)` trả về số dư của tài khoản
- `state.platform.transactions` trả về danh sách các giao dịch
- `transaction.return_data` là dữ liệu được trả về
- `m.generate_testcase(state, name)` tạo đầu vào cho trạng thái

### Tóm tắt: Lấy đường dẫn gây lỗi {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Kiểm tra xem một lần thực thi có kết thúc bằng REVERT hoặc INVALID không
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Tất cả mã ở trên, bạn có thể tìm thấy trong [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Lưu ý rằng chúng ta có thể đã tạo một tập lệnh đơn giản hơn nhiều, vì tất cả các trạng thái được trả về bởi terminated_state đều có REVERT hoặc INVALID trong kết quả của chúng: ví dụ này chỉ nhằm mục đích minh họa cách thao tác Giao diện Lập trình Ứng dụng._

## Thêm ràng buộc {#adding-constraints}

Chúng ta sẽ xem cách ràng buộc việc khám phá. Chúng ta sẽ giả định rằng tài liệu tham khảo của `f()` nói rằng hàm không bao giờ được gọi với `a == 65`, do đó, bất kỳ lỗi nào với `a == 65` không phải là một lỗi thực sự. Mục tiêu vẫn là hợp đồng thông minh sau đây [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Toán tử {#operators}

Mô-đun [Toán tử](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) tạo điều kiện cho việc thao tác các ràng buộc, trong số những thứ khác, nó cung cấp:

- Operators.AND,
- Operators.OR,
- Operators.UGT (lớn hơn không dấu),
- Operators.UGE (lớn hơn hoặc bằng không dấu),
- Operators.ULT (nhỏ hơn không dấu),
- Operators.ULE (nhỏ hơn hoặc bằng không dấu).

Để nhập mô-đun, hãy sử dụng dòng lệnh sau:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` được sử dụng để nối một mảng với một giá trị. Ví dụ: return_data của một giao dịch cần được thay đổi thành một giá trị để được kiểm tra so với một giá trị khác:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ràng buộc {#state-constraint}

Bạn có thể sử dụng các ràng buộc trên toàn cục hoặc cho một trạng thái cụ thể.

#### Ràng buộc toàn cục {#state-constraint}

Sử dụng `m.constrain(constraint)` để thêm một ràng buộc toàn cục.
Ví dụ: bạn có thể gọi một hợp đồng từ một địa chỉ ký hiệu và giới hạn địa chỉ này ở các giá trị cụ thể:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ràng buộc trạng thái {#state-constraint}

Sử dụng [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) để thêm một ràng buộc vào một trạng thái cụ thể.
Nó có thể được sử dụng để ràng buộc trạng thái sau khi khám phá để kiểm tra một số thuộc tính trên đó.

### Kiểm tra ràng buộc {#checking-constraint}

Sử dụng `solver.check(state.constraints)` để biết liệu một ràng buộc có còn khả thi hay không.
Ví dụ: đoạn mã sau sẽ ràng buộc symbolic_value khác với 65 và kiểm tra xem trạng thái có còn khả thi không:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # trạng thái là khả thi
```

### Tóm tắt: Thêm ràng buộc {#summary-adding-constraints}

Thêm ràng buộc vào mã trước đó, chúng ta có được:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## Kiểm tra xem một lần thực thi có kết thúc bằng REVERT hoặc INVALID không
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # chúng ta không xem xét đường dẫn có a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Đã tìm thấy lỗi, kết quả nằm trong {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Không tìm thấy lỗi nào')
```

Tất cả mã ở trên, bạn có thể tìm thấy trong [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
