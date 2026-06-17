---
title: "Cách sử dụng Slither để tìm lỗi hợp đồng thông minh"
description: "Cách sử dụng Slither để tự động tìm lỗi trong các hợp đồng thông minh"
author: Trailofbits
lang: vi
tags: ["Solidity", "hợp đồng thông minh", "bảo mật", "kiểm thử"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Cách sử dụng Slither {#how-to-use-slither}

Mục đích của hướng dẫn này là chỉ ra cách sử dụng Slither để tự động tìm lỗi trong các hợp đồng thông minh.

- [Cài đặt](#installation)
- [Sử dụng dòng lệnh](#command-line)
- [Giới thiệu về phân tích tĩnh](#static-analysis): Giới thiệu ngắn gọn về phân tích tĩnh
- [API](#api-basics): Mô tả API Python

## Cài đặt {#installation}

Slither yêu cầu Python >= 3.6. Nó có thể được cài đặt thông qua pip hoặc sử dụng Docker.

Cài đặt Slither qua pip:

```bash
pip3 install --user slither-analyzer
```

Cài đặt Slither qua Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Lệnh cuối cùng chạy eth-security-toolbox trong một Docker có quyền truy cập vào thư mục hiện tại của bạn. Bạn có thể thay đổi các tệp từ máy chủ của mình và chạy các công cụ trên các tệp từ Docker_

Bên trong Docker, chạy:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Chạy một tập lệnh {#running-a-script}

Để chạy một tập lệnh Python với Python 3:

```bash
python3 script.py
```

### Dòng lệnh {#command-line}

**Dòng lệnh so với các tập lệnh do người dùng định nghĩa.** Slither đi kèm với một tập hợp các bộ phát hiện được xác định trước để tìm ra nhiều lỗi phổ biến. Việc gọi Slither từ dòng lệnh sẽ chạy tất cả các bộ phát hiện, không cần kiến thức chi tiết về phân tích tĩnh:

```bash
slither project_paths
```

Ngoài các bộ phát hiện, Slither có khả năng đánh giá mã thông qua các [trình in (printers)](https://github.com/crytic/slither#printers) và [công cụ](https://github.com/crytic/slither#tools) của nó.

Sử dụng [crytic.io](https://github.com/crytic) để có quyền truy cập vào các bộ phát hiện riêng tư và tích hợp GitHub.

## Phân tích tĩnh {#static-analysis}

Các khả năng và thiết kế của framework phân tích tĩnh Slither đã được mô tả trong các bài đăng trên blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) và một [bài báo học thuật](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Phân tích tĩnh tồn tại dưới nhiều hình thức khác nhau. Bạn rất có thể nhận ra rằng các trình biên dịch như [clang](https://clang-analyzer.llvm.org/) và [gcc](https://lwn.net/Articles/806099/) phụ thuộc vào các kỹ thuật nghiên cứu này, nhưng nó cũng là nền tảng cho ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) và các công cụ dựa trên các phương pháp hình thức như [Frama-C](https://frama-c.com/) và [Polyspace](https://www.mathworks.com/products/polyspace.html).

Chúng tôi sẽ không xem xét toàn diện các kỹ thuật phân tích tĩnh và nghiên cứu ở đây. Thay vào đó, chúng tôi sẽ tập trung vào những gì cần thiết để hiểu cách Slither hoạt động để bạn có thể sử dụng nó hiệu quả hơn nhằm tìm lỗi và hiểu mã.

- [Biểu diễn mã](#code-representation)
- [Phân tích mã](#analysis)
- [Biểu diễn trung gian](#intermediate-representation)

### Biểu diễn mã {#code-representation}

Trái ngược với phân tích động, vốn suy luận về một đường dẫn thực thi duy nhất, phân tích tĩnh suy luận về tất cả các đường dẫn cùng một lúc. Để làm như vậy, nó dựa vào một biểu diễn mã khác. Hai biểu diễn phổ biến nhất là cây cú pháp trừu tượng (AST) và biểu đồ luồng điều khiển (CFG).

### Cây cú pháp trừu tượng (AST) {#abstract-syntax-trees-ast}

AST được sử dụng mỗi khi trình biên dịch phân tích cú pháp mã. Nó có lẽ là cấu trúc cơ bản nhất mà trên đó phân tích tĩnh có thể được thực hiện.

Tóm lại, AST là một cây có cấu trúc trong đó, thông thường, mỗi lá chứa một biến hoặc một hằng số và các nút bên trong là các toán hạng hoặc các phép toán luồng điều khiển. Hãy xem xét đoạn mã sau:

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

Mặc dù đơn giản để xây dựng, AST là một cấu trúc lồng nhau. Đôi khi, đây không phải là cách đơn giản nhất để phân tích. Ví dụ, để xác định các phép toán được sử dụng bởi biểu thức `a + b <= a`, trước tiên bạn phải phân tích `<=` và sau đó là `+`. Một cách tiếp cận phổ biến là sử dụng cái gọi là mẫu visitor (visitor pattern), điều hướng qua cây một cách đệ quy. Slither chứa một visitor chung trong [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Đoạn mã sau sử dụng `ExpressionVisitor` để phát hiện xem biểu thức có chứa phép cộng hay không:

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
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Biểu đồ luồng điều khiển (CFG) {#control-flow-graph-cfg}

Biểu diễn mã phổ biến thứ hai là biểu đồ luồng điều khiển (CFG). Đúng như tên gọi của nó, đây là một biểu diễn dựa trên đồ thị phơi bày tất cả các đường dẫn thực thi. Mỗi nút chứa một hoặc nhiều lệnh. Các cạnh trong đồ thị đại diện cho các phép toán luồng điều khiển (if/then/else, vòng lặp, v.v.). CFG của ví dụ trước của chúng ta là:

![CFG](./cfg.png)

CFG là biểu diễn mà trên đó hầu hết các phân tích được xây dựng.

Nhiều biểu diễn mã khác cũng tồn tại. Mỗi biểu diễn có những ưu điểm và nhược điểm tùy thuộc vào phân tích mà bạn muốn thực hiện.

### Phân tích {#analysis}

Loại phân tích đơn giản nhất mà bạn có thể thực hiện với Slither là phân tích cú pháp.

### Phân tích cú pháp {#syntax-analysis}

Slither có thể điều hướng qua các thành phần khác nhau của mã và biểu diễn của chúng để tìm ra sự không nhất quán và các lỗ hổng bằng cách sử dụng một cách tiếp cận giống như khớp mẫu (pattern matching).

Ví dụ, các bộ phát hiện sau đây tìm kiếm các vấn đề liên quan đến cú pháp:

- [Che khuất biến trạng thái (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): lặp qua tất cả các biến trạng thái và kiểm tra xem có biến nào che khuất một biến từ một hợp đồng được kế thừa hay không ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Giao diện ERC-20 không chính xác](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): tìm kiếm các chữ ký hàm ERC-20 không chính xác ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Phân tích ngữ nghĩa {#semantic-analysis}

Trái ngược với phân tích cú pháp, phân tích ngữ nghĩa sẽ đi sâu hơn và phân tích "ý nghĩa" của mã. Nhóm này bao gồm một số loại phân tích rộng. Chúng dẫn đến kết quả mạnh mẽ và hữu ích hơn, nhưng cũng phức tạp hơn để viết.

Phân tích ngữ nghĩa được sử dụng cho các phát hiện lỗ hổng nâng cao nhất.

#### Phân tích phụ thuộc dữ liệu {#fixed-point-computation}

Một biến `variable_a` được cho là phụ thuộc dữ liệu vào `variable_b` nếu có một đường dẫn mà giá trị của `variable_a` bị ảnh hưởng bởi `variable_b`.

Trong đoạn mã sau, `variable_a` phụ thuộc vào `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither đi kèm với các khả năng [phụ thuộc dữ liệu](https://github.com/crytic/slither/wiki/data-dependency) tích hợp sẵn, nhờ vào biểu diễn trung gian của nó (được thảo luận trong phần sau).

Một ví dụ về việc sử dụng phụ thuộc dữ liệu có thể được tìm thấy trong [bộ phát hiện đẳng thức nghiêm ngặt nguy hiểm](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Ở đây, Slither sẽ tìm kiếm phép so sánh bằng nghiêm ngặt với một giá trị nguy hiểm ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), và sẽ thông báo cho người dùng rằng họ nên sử dụng `>=` hoặc `<=` thay vì `==`, để ngăn chặn kẻ tấn công gài bẫy hợp đồng. Trong số những thứ khác, bộ phát hiện sẽ coi giá trị trả về của một lệnh gọi tới `balanceOf(address)` là nguy hiểm ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), và sẽ sử dụng công cụ phụ thuộc dữ liệu để theo dõi việc sử dụng nó.

#### Tính toán điểm cố định (Fixed-point computation) {#fixed-point-computation-2}

Nếu phân tích của bạn điều hướng qua CFG và đi theo các cạnh, bạn có khả năng sẽ thấy các nút đã được truy cập. Ví dụ, nếu một vòng lặp được trình bày như hình dưới đây:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Phân tích của bạn sẽ cần biết khi nào nên dừng lại. Có hai chiến lược chính ở đây: (1) lặp lại trên mỗi nút một số lần hữu hạn, (2) tính toán một cái gọi là _điểm cố định (fixpoint)_. Một điểm cố định về cơ bản có nghĩa là việc phân tích nút này không cung cấp thêm bất kỳ thông tin có ý nghĩa nào.

Một ví dụ về điểm cố định được sử dụng có thể được tìm thấy trong các bộ phát hiện tái xâm nhập: Slither khám phá các nút và tìm kiếm các lệnh gọi bên ngoài, ghi và đọc vào bộ nhớ. Khi nó đã đạt đến một điểm cố định ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), nó dừng việc khám phá và phân tích các kết quả để xem liệu có sự tái xâm nhập hay không, thông qua các mẫu tái xâm nhập khác nhau ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Việc viết các phân tích sử dụng tính toán điểm cố định hiệu quả đòi hỏi sự hiểu biết tốt về cách phân tích truyền bá thông tin của nó.

### Biểu diễn trung gian {#intermediate-representation}

Biểu diễn trung gian (IR) là một ngôn ngữ nhằm mục đích dễ dàng hơn cho phân tích tĩnh so với ngôn ngữ gốc. Slither dịch Solidity sang IR của riêng nó: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Việc hiểu SlithIR là không cần thiết nếu bạn chỉ muốn viết các kiểm tra cơ bản. Tuy nhiên, nó sẽ hữu ích nếu bạn dự định viết các phân tích ngữ nghĩa nâng cao. Các trình in [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) và [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) sẽ giúp bạn hiểu cách mã được dịch.

## Cơ bản về API {#api-basics}

Slither có một API cho phép bạn khám phá các thuộc tính cơ bản của hợp đồng và các hàm của nó.

Để tải một cơ sở mã (codebase):

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Khám phá các hợp đồng và hàm {#exploring-contracts-and-functions}

Một đối tượng `Slither` có:

- `contracts (list(Contract)`: danh sách các hợp đồng
- `contracts_derived (list(Contract)`: danh sách các hợp đồng không được kế thừa bởi một hợp đồng khác (tập con của các hợp đồng)
- `get_contract_from_name (str)`: Trả về một hợp đồng từ tên của nó

Một đối tượng `Contract` có:

- `name (str)`: Tên của hợp đồng
- `functions (list(Function))`: Danh sách các hàm
- `modifiers (list(Modifier))`: Danh sách các hàm
- `all_functions_called (list(Function/Modifier))`: Danh sách tất cả các hàm nội bộ có thể truy cập được bởi hợp đồng
- `inheritance (list(Contract))`: Danh sách các hợp đồng được kế thừa
- `get_function_from_signature (str)`: Trả về một Hàm từ chữ ký của nó
- `get_modifier_from_signature (str)`: Trả về một Modifier từ chữ ký của nó
- `get_state_variable_from_name (str)`: Trả về một Biến trạng thái (StateVariable) từ tên của nó

Một đối tượng `Function` hoặc `Modifier` có:

- `name (str)`: Tên của hàm
- `contract (contract)`: hợp đồng nơi hàm được khai báo
- `nodes (list(Node))`: Danh sách các nút cấu thành CFG của hàm/modifier
- `entry_point (Node)`: Điểm vào của CFG
- `variables_read (list(Variable))`: Danh sách các biến được đọc
- `variables_written (list(Variable))`: Danh sách các biến được ghi
- `state_variables_read (list(StateVariable))`: Danh sách các biến trạng thái được đọc (tập con của variables`read)
- `state_variables_written (list(StateVariable))`: Danh sách các biến trạng thái được ghi (tập con của variables`written)