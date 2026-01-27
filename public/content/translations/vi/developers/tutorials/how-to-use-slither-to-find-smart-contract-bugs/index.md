---
title: Cách sử dụng Slither để tìm lỗi của hợp đồng thông minh
description: Cách sử dụng Slither để tự động tìm lỗi trong hợp đồng thông minh
author: Trailofbits
lang: vi
tags:
  [
    "solidity",
    "hợp đồng thông minh",
    "tính bảo mật",
    "kiểm thử"
  ]
skill: advanced
published: 2020-06-09
source: Xây dựng những hợp đồng an toàn
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cách sử dụng Slither {#how-to-use-slither}

Mục đích của hướng dẫn này là chỉ ra cách sử dụng Slither để tự động tìm lỗi trong hợp đồng thông minh.

- [Cài đặt](#installation)
- [Sử dụng dòng lệnh](#command-line)
- [Giới thiệu về phân tích tĩnh](#static-analysis): Giới thiệu ngắn gọn về phân tích tĩnh
- [API](#api-basics): Mô tả API Python

## Cài đặt {#installation}

Slither yêu cầu Python >= 3.6. Nó có thể được cài đặt thông qua pip hoặc sử dụng docker.

Slither qua pip:

```bash
pip3 install --user slither-analyzer
```

Slither qua docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Lệnh cuối cùng chạy eth-security-toolbox trong một docker có quyền truy cập vào thư mục hiện tại của bạn. Bạn có thể thay đổi tệp từ máy chủ lưu trữ của mình và chạy các công cụ trên tệp từ docker_

Bên trong docker, chạy:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Chạy một tập lệnh {#running-a-script}

Để chạy một tập lệnh python bằng python 3:

```bash
python3 script.py
```

### Dòng lệnh {#command-line}

**Dòng lệnh so với các tập lệnh do người dùng xác định.** Slither đi kèm với một bộ các công cụ dò tìm được xác định trước để tìm nhiều lỗi phổ biến. Việc gọi Slither từ dòng lệnh sẽ chạy tất cả các công cụ dò tìm, không cần kiến thức chi tiết về phân tích tĩnh:

```bash
slither project_paths
```

Ngoài các công cụ dò tìm, Slither còn có các khả năng xem xét mã thông qua các [printers](https://github.com/crytic/slither#printers) và [công cụ](https://github.com/crytic/slither#tools) của nó.

Sử dụng [crytic.io](https://github.com/crytic) để có quyền truy cập vào các công cụ dò tìm riêng tư và tích hợp GitHub.

## Phân tích tĩnh {#static-analysis}

Các khả năng và thiết kế của khung phân tích tĩnh Slither đã được mô tả trong các bài đăng trên blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) và một [bài báo học thuật](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Phân tích tĩnh tồn tại ở nhiều dạng khác nhau. Bạn có thể nhận ra rằng các trình biên dịch như [clang](https://clang-analyzer.llvm.org/) và [gcc](https://lwn.net/Articles/806099/) phụ thuộc vào các kỹ thuật nghiên cứu này, nhưng nó cũng làm nền tảng cho ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) và các công cụ dựa trên các phương pháp chính thức như [Frama-C](https://frama-c.com/) và [Polyspace](https://www.mathworks.com/products/polyspace.html).

Chúng tôi sẽ không xem xét một cách toàn diện các kỹ thuật phân tích tĩnh và nhà nghiên cứu ở đây. Thay vào đó, chúng tôi sẽ tập trung vào những gì cần thiết để hiểu cách Slither hoạt động để bạn có thể sử dụng nó hiệu quả hơn để tìm lỗi và hiểu mã.

- [Biểu diễn mã](#code-representation)
- [Phân tích mã](#analysis)
- [Biểu diễn trung gian](#intermediate-representation)

### Biểu diễn mã {#code-representation}

Trái ngược với phân tích động, vốn chỉ lý giải về một đường dẫn thực thi duy nhất, phân tích tĩnh lý giải về tất cả các đường dẫn cùng một lúc. Để làm được điều đó, nó dựa vào một biểu diễn mã khác. Hai loại phổ biến nhất là cây cú pháp trừu tượng (AST) và đồ thị luồng điều khiển (CFG).

### Cây cú pháp trừu tượng (AST) {#abstract-syntax-trees-ast}

AST được sử dụng mỗi khi trình biên dịch phân tích cú pháp mã. Đây có lẽ là cấu trúc cơ bản nhất mà trên đó có thể thực hiện phân tích tĩnh.

Tóm lại, AST là một cây có cấu trúc, trong đó, mỗi lá thường chứa một biến hoặc một hằng số và các nút bên trong là toán hạng hoặc các toán tử luồng điều khiển. Hãy xem xét mã sau:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

AST tương ứng được hiển thị trong:

![AST](./ast.png)

Slither sử dụng AST được xuất bởi solc.

Mặc dù dễ xây dựng, AST là một cấu trúc lồng nhau. Đôi khi, đây không phải là cách phân tích đơn giản nhất. Ví dụ: để xác định các toán tử được sử dụng bởi biểu thức `a + b <= a`, trước tiên bạn phải phân tích `<=` rồi đến `+`. Một cách tiếp cận phổ biến là sử dụng cái gọi là mẫu visitor (visitor pattern), điều hướng qua cây một cách đệ quy. Slither chứa một visitor chung trong [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Mã sau sử dụng `ExpressionVisitor` để phát hiện xem biểu thức có chứa phép cộng hay không:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression là biểu thức cần được kiểm tra
print(f'Biểu thức {expression} có một phép cộng: {visitor.result()}')
```

### Đồ thị luồng điều khiển (CFG) {#control-flow-graph-cfg}

Biểu diễn mã phổ biến thứ hai là đồ thị luồng điều khiển (CFG). Đúng như tên gọi của nó, đây là một biểu diễn dựa trên đồ thị, thể hiện tất cả các đường dẫn thực thi. Mỗi nút chứa một hoặc nhiều lệnh. Các cạnh trong đồ thị biểu thị các toán tử luồng điều khiển (if/then/else, vòng lặp, v.v.). CFG của ví dụ trước của chúng tôi là:

![CFG](./cfg.png)

CFG là biểu diễn mà hầu hết các phân tích được xây dựng trên đó.

Nhiều biểu diễn mã khác tồn tại. Mỗi biểu diễn đều có ưu và nhược điểm tùy theo phân tích bạn muốn thực hiện.

### Phân tích {#analysis}

Loại phân tích đơn giản nhất bạn có thể thực hiện với Slither là phân tích cú pháp.

### Phân tích cú pháp {#syntax-analysis}

Slither có thể điều hướng qua các thành phần khác nhau của mã và biểu diễn của chúng để tìm ra những điểm không nhất quán và thiếu sót bằng cách sử dụng phương pháp tiếp cận giống như so khớp mẫu.

Ví dụ: các công cụ dò tìm sau đây tìm kiếm các vấn đề liên quan đến cú pháp:

- [Che biến trạng thái](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): lặp qua tất cả các biến trạng thái và kiểm tra xem có bất kỳ biến nào che một biến từ một hợp đồng được kế thừa hay không ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Giao diện ERC20 không chính xác](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): tìm kiếm các chữ ký hàm ERC20 không chính xác ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Phân tích ngữ nghĩa {#semantic-analysis}

Trái ngược với phân tích cú pháp, phân tích ngữ nghĩa sẽ đi sâu hơn và phân tích “ý nghĩa” của mã. Họ này bao gồm một số loại phân tích rộng. Chúng dẫn đến kết quả mạnh mẽ và hữu ích hơn, nhưng cũng phức tạp hơn để viết.

Các phân tích ngữ nghĩa được sử dụng để phát hiện các lỗ hổng bảo mật tiên tiến nhất.

#### Phân tích phụ thuộc dữ liệu {#fixed-point-computation}

Một biến `variable_a` được cho là phụ thuộc dữ liệu vào `variable_b` nếu có một đường dẫn mà giá trị của `variable_a` bị ảnh hưởng bởi `variable_b`.

Trong mã sau đây, `variable_a` phụ thuộc vào `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither đi kèm với các khả năng [phụ thuộc dữ liệu](https://github.com/crytic/slither/wiki/data-dependency) tích hợp sẵn, nhờ vào biểu diễn trung gian của nó (sẽ được thảo luận trong phần sau).

Một ví dụ về việc sử dụng phụ thuộc dữ liệu có thể được tìm thấy trong [công cụ dò tìm đẳng thức nghiêm ngặt nguy hiểm](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Ở đây Slither sẽ tìm kiếm so sánh đẳng thức nghiêm ngặt với một giá trị nguy hiểm ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) và sẽ thông báo cho người dùng rằng nên sử dụng `>=` hoặc `<=` thay vì `==`, để ngăn kẻ tấn công bẫy hợp đồng. Trong số những thứ khác, công cụ dò tìm sẽ coi giá trị trả về của một lệnh gọi đến `balanceOf(address)` là nguy hiểm ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) và sẽ sử dụng công cụ phụ thuộc dữ liệu để theo dõi việc sử dụng nó.

#### Tính toán điểm cố định {#fixed-point-computation}

Nếu phân tích của bạn điều hướng qua CFG và đi theo các cạnh, bạn có thể sẽ thấy các nút đã được truy cập. Ví dụ: nếu một vòng lặp được trình bày như hình dưới đây:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Phân tích của bạn sẽ cần biết khi nào nên dừng lại. Có hai chiến lược chính ở đây: (1) lặp lại trên mỗi nút một số lần hữu hạn, (2) tính toán một cái gọi là _điểm cố định_. Một điểm cố định về cơ bản có nghĩa là việc phân tích nút này không cung cấp bất kỳ thông tin có ý nghĩa nào.

Một ví dụ về điểm cố định được sử dụng có thể được tìm thấy trong các công cụ dò tìm tái nhập: Slither khám phá các nút và tìm kiếm các lệnh gọi bên ngoài, ghi và đọc vào bộ nhớ lưu trữ. Khi đã đạt đến điểm cố định ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), nó sẽ dừng việc khám phá và phân tích kết quả để xem liệu có tồn tại tình trạng tái nhập hay không, thông qua các mẫu tái nhập khác nhau ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Việc viết các phân tích sử dụng tính toán điểm cố định hiệu quả đòi hỏi sự hiểu biết tốt về cách phân tích truyền bá thông tin của nó.

### Biểu diễn trung gian {#intermediate-representation}

Biểu diễn trung gian (IR) là một ngôn ngữ được thiết kế để dễ dàng phân tích tĩnh hơn so với ngôn ngữ gốc. Slither dịch Solidity sang IR của riêng nó: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Việc hiểu SlithIR là không cần thiết nếu bạn chỉ muốn viết các kiểm tra cơ bản. Tuy nhiên, nó sẽ hữu ích nếu bạn có kế hoạch viết các phân tích ngữ nghĩa nâng cao. Các printers [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) và [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) sẽ giúp bạn hiểu cách mã được dịch.

## Kiến thức cơ bản về API {#api-basics}

Slither có một API cho phép bạn khám phá các thuộc tính cơ bản của hợp đồng và các hàm của nó.

Để tải một codebase:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Khám phá các hợp đồng và hàm {#exploring-contracts-and-functions}

Một đối tượng `Slither` có:

- `contracts (list(Contract)`: danh sách các hợp đồng
- `contracts_derived (list(Contract)`: danh sách các hợp đồng không được kế thừa bởi một hợp đồng khác (tập hợp con của các hợp đồng)
- `get_contract_from_name (str)`: Trả về một hợp đồng từ tên của nó

Một đối tượng `Contract` có:

- `name (str)`: Tên của hợp đồng
- `functions (list(Function))`: Danh sách các hàm
- `modifiers (list(Modifier))`: Danh sách các bộ sửa đổi
- `all_functions_called (list(Function/Modifier))`: Danh sách tất cả các hàm nội bộ mà hợp đồng có thể truy cập được
- `inheritance (list(Contract))`: Danh sách các hợp đồng được kế thừa
- `get_function_from_signature (str)`: Trả về một hàm từ chữ ký của nó
- `get_modifier_from_signature (str)`: Trả về một bộ sửa đổi từ chữ ký của nó
- `get_state_variable_from_name (str)`: Trả về một biến trạng thái từ tên của nó

Một đối tượng `Function` hoặc `Modifier` có:

- `name (str)`: Tên của hàm
- `contract (contract)`: hợp đồng nơi hàm được khai báo
- `nodes (list(Node))`: Danh sách các nút cấu thành CFG của hàm/bộ sửa đổi
- `entry_point (Node)`: Điểm vào của CFG
- `variables_read (list(Variable))`: Danh sách các biến đã đọc
- `variables_written (list(Variable))`: Danh sách các biến đã ghi
- `state_variables_read (list(StateVariable))`: Danh sách các biến trạng thái đã đọc (tập hợp con của các biến đã đọc)
- `state_variables_written (list(StateVariable))`: Danh sách các biến trạng thái đã ghi (tập hợp con của các biến đã ghi)
