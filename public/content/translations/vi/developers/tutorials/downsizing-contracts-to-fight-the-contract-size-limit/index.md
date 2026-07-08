---
title: "Thu gọn hợp đồng để đối phó với giới hạn kích thước hợp đồng"
description: "Bạn có thể làm gì để ngăn hợp đồng thông minh của mình trở nên quá lớn?"
author: Markus Waas
lang: vi
tags:
  - solidity
  - hợp đồng thông minh
  - lưu trữ
skill: intermediate
breadcrumb: "Thu gọn hợp đồng"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Tại sao lại có giới hạn? {#why-is-there-a-limit}

Vào [ngày 22 tháng 11 năm 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), đợt Phân nhánh cứng Spurious Dragon đã giới thiệu [EIP-170](https://eips.ethereum.org/EIPS/eip-170), bổ sung giới hạn kích thước hợp đồng thông minh là 24.576 kb. Đối với bạn, một nhà phát triển Solidity, điều này có nghĩa là khi bạn thêm ngày càng nhiều chức năng vào hợp đồng của mình, tại một thời điểm nào đó bạn sẽ đạt đến giới hạn và khi triển khai sẽ thấy lỗi:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Giới hạn này được đưa ra để ngăn chặn các cuộc tấn công từ chối dịch vụ (DOS). Bất kỳ lệnh gọi nào đến một hợp đồng đều tương đối rẻ về mặt Gas. Tuy nhiên, tác động của một lệnh gọi hợp đồng đối với các nút Ethereum tăng lên không tương xứng tùy thuộc vào kích thước mã của hợp đồng được gọi (đọc mã từ đĩa, tiền xử lý mã, thêm dữ liệu vào bằng chứng Merkle). Bất cứ khi nào bạn gặp tình huống mà kẻ tấn công yêu cầu ít tài nguyên để gây ra nhiều công việc cho người khác, bạn sẽ có nguy cơ bị tấn công DOS.

Ban đầu, điều này ít gây ra vấn đề hơn vì một giới hạn kích thước hợp đồng tự nhiên là giới hạn gas của khối. Rõ ràng, một hợp đồng phải được triển khai trong một giao dịch chứa toàn bộ mã byte của hợp đồng. Nếu bạn chỉ đưa một giao dịch đó vào một khối, bạn có thể sử dụng hết toàn bộ lượng Gas đó, nhưng nó không phải là vô hạn. Kể từ [Bản nâng cấp London](/ethereum-forks/#london), giới hạn gas của khối đã có thể thay đổi từ 15 triệu đến 30 triệu đơn vị tùy thuộc vào nhu cầu của mạng lưới.

Trong phần tiếp theo, chúng ta sẽ xem xét một số phương pháp được sắp xếp theo tác động tiềm năng của chúng. Hãy nghĩ về nó giống như việc giảm cân. Chiến lược tốt nhất để một người đạt được cân nặng mục tiêu (trong trường hợp của chúng ta là 24kb) là tập trung vào các phương pháp có tác động lớn trước. Trong hầu hết các trường hợp, chỉ cần điều chỉnh chế độ ăn uống là bạn sẽ đạt được mục tiêu, nhưng đôi khi bạn cần thêm một chút nữa. Sau đó, bạn có thể thêm một số bài tập thể dục (tác động trung bình) hoặc thậm chí là thực phẩm bổ sung (tác động nhỏ).

## Tác động lớn {#big-impact}

### Tách biệt các hợp đồng của bạn {#separate-your-contracts}

Đây luôn nên là cách tiếp cận đầu tiên của bạn. Làm thế nào bạn có thể tách hợp đồng thành nhiều hợp đồng nhỏ hơn? Điều này thường buộc bạn phải đưa ra một kiến trúc tốt cho các hợp đồng của mình. Các hợp đồng nhỏ hơn luôn được ưu tiên từ góc độ dễ đọc của mã. Để chia nhỏ các hợp đồng, hãy tự hỏi:

- Những hàm nào thuộc về nhau? Mỗi tập hợp các hàm có thể hoạt động tốt nhất trong hợp đồng riêng của nó.
- Những hàm nào không yêu cầu đọc trạng thái hợp đồng hoặc chỉ một tập hợp con cụ thể của trạng thái?
- Bạn có thể tách biệt phần lưu trữ và chức năng không?

### Thư viện {#libraries}

Một cách đơn giản để chuyển mã chức năng ra khỏi phần lưu trữ là sử dụng một [Thư viện](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Đừng khai báo các hàm của Thư viện là internal vì chúng sẽ được [thêm vào hợp đồng](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) trực tiếp trong quá trình biên dịch. Nhưng nếu bạn sử dụng các hàm public, thì trên thực tế chúng sẽ nằm trong một hợp đồng Thư viện riêng biệt. Hãy cân nhắc [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) để làm cho việc sử dụng các Thư viện thuận tiện hơn.

### Proxy {#proxies}

Một chiến lược nâng cao hơn sẽ là một hệ thống proxy. Các Thư viện sử dụng `DELEGATECALL` ở phía sau, về cơ bản chỉ thực thi hàm của một hợp đồng khác với trạng thái của hợp đồng đang gọi. Hãy xem [bài đăng blog này](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) để tìm hiểu thêm về các hệ thống proxy. Chúng cung cấp cho bạn nhiều chức năng hơn, ví dụ: chúng cho phép khả năng nâng cấp, nhưng chúng cũng làm tăng thêm nhiều sự phức tạp. Tôi sẽ không thêm chúng chỉ để giảm kích thước hợp đồng trừ khi đó là lựa chọn duy nhất của bạn vì bất kỳ lý do gì.

## Tác động trung bình {#medium-impact}

### Loại bỏ các hàm {#remove-functions}

Điều này là hiển nhiên. Các hàm làm tăng kích thước hợp đồng lên khá nhiều.

- **External**: Thường thì chúng ta thêm rất nhiều hàm view vì lý do tiện lợi. Điều đó hoàn toàn ổn cho đến khi bạn đạt đến giới hạn kích thước. Khi đó, bạn có thể thực sự muốn suy nghĩ về việc loại bỏ tất cả ngoại trừ những hàm hoàn toàn cần thiết.
- **Internal**: Bạn cũng có thể loại bỏ các hàm internal/private và chỉ cần chèn trực tiếp mã (inline) miễn là hàm đó chỉ được gọi một lần.

### Tránh các biến bổ sung {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Một thay đổi đơn giản như thế này tạo ra sự khác biệt **0.28kb**. Rất có thể bạn có thể tìm thấy nhiều tình huống tương tự trong các hợp đồng của mình và chúng thực sự có thể cộng dồn thành những con số đáng kể.

### Rút ngắn thông điệp lỗi {#shorten-error-message}

Các thông điệp hoàn nguyên dài và đặc biệt là nhiều thông điệp hoàn nguyên khác nhau có thể làm phình to hợp đồng. Thay vào đó, hãy sử dụng các mã lỗi ngắn và giải mã chúng trong hợp đồng của bạn. Một thông điệp dài có thể trở nên ngắn hơn nhiều:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Sử dụng lỗi tùy chỉnh thay vì thông điệp lỗi {#use-custom-errors-instead-of-error-messages}

Các lỗi tùy chỉnh đã được giới thiệu trong [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Chúng là một cách tuyệt vời để giảm kích thước các hợp đồng của bạn, bởi vì chúng được mã hóa ABI dưới dạng các selector (giống như các hàm).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Cân nhắc giá trị run thấp trong trình tối ưu hóa {#consider-a-low-run-value-in-the-optimizer}

Bạn cũng có thể thay đổi các cài đặt của trình tối ưu hóa. Giá trị mặc định là 200 có nghĩa là nó đang cố gắng tối ưu hóa mã byte như thể một hàm được gọi 200 lần. Nếu bạn thay đổi nó thành 1, về cơ bản bạn đang yêu cầu trình tối ưu hóa tối ưu cho trường hợp chỉ chạy mỗi hàm một lần. Một hàm được tối ưu hóa để chỉ chạy một lần có nghĩa là nó được tối ưu hóa cho chính việc triển khai. Hãy lưu ý rằng **điều này làm tăng [chi phí Gas](/developers/docs/gas/) khi chạy các hàm**, vì vậy bạn có thể không muốn làm điều đó.

## Tác động nhỏ {#small-impact}

### Tránh truyền struct vào các hàm {#avoid-passing-structs-to-functions}

Nếu bạn đang sử dụng [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), việc không truyền các struct vào một hàm có thể giúp ích. Thay vì truyền tham số dưới dạng một struct, hãy truyền trực tiếp các tham số được yêu cầu. Trong ví dụ này, chúng tôi đã tiết kiệm thêm **0.1kb**.

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### Khai báo đúng phạm vi hiển thị (visibility) cho các hàm và biến {#declare-correct-visibility-for-functions-and-variables}

- Các hàm hoặc biến chỉ được gọi từ bên ngoài? Hãy khai báo chúng là `external` thay vì `public`.
- Các hàm hoặc biến chỉ được gọi từ bên trong hợp đồng? Hãy khai báo chúng là `private` hoặc `internal` thay vì `public`.

### Loại bỏ các modifier {#remove-modifiers}

Các modifier, đặc biệt là khi được sử dụng nhiều, có thể có tác động đáng kể đến kích thước hợp đồng. Hãy cân nhắc loại bỏ chúng và thay vào đó sử dụng các hàm.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Những mẹo này sẽ giúp bạn giảm đáng kể kích thước hợp đồng. Một lần nữa, tôi không thể nhấn mạnh đủ rằng, hãy luôn tập trung vào việc chia nhỏ các hợp đồng nếu có thể để đạt được tác động lớn nhất.