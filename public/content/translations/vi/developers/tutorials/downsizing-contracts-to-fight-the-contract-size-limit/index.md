---
title: "Thu hẹp hợp đồng để chống lại giới hạn kích thước hợp đồng"
description: Bạn có thể làm gì để ngăn các hợp đồng thông minh của mình trở nên quá lớn?
author: Markus Waas
lang: vi
tags: [ "solidity", "hợp đồng thông minh", "lưu trữ" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Tại sao lại có giới hạn? {#why-is-there-a-limit}

Vào [ngày 22 tháng 11 năm 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/), đợt phân nhánh cứng Spurious Dragon đã giới thiệu [EIP-170](https://eips.ethereum.org/EIPS/eip-170), bổ sung giới hạn kích thước hợp đồng thông minh là 24,576 kb. Đối với bạn với tư cách là một nhà phát triển Solidity, điều này có nghĩa là khi bạn thêm ngày càng nhiều chức năng vào hợp đồng của mình, đến một lúc nào đó, bạn sẽ đạt đến giới hạn và khi triển khai sẽ thấy lỗi:

`Cảnh báo: Kích thước mã hợp đồng vượt quá 24576 byte (một giới hạn được giới thiệu trong Spurious Dragon).` Hợp đồng này có thể không triển khai được trên Mạng chính. Hãy cân nhắc việc bật trình tối ưu hóa (với giá trị "runs" thấp!), tắt các chuỗi hoàn nguyên hoặc sử dụng các thư viện.\`

Giới hạn này đã được đưa ra để ngăn chặn các cuộc tấn công từ chối dịch vụ (DOS). Bất kỳ lệnh gọi nào đến một hợp đồng đều tương đối rẻ về mặt gas. Tuy nhiên, tác động của một lệnh gọi hợp đồng đối với các nút Ethereum tăng lên không tương xứng tùy thuộc vào kích thước mã của hợp đồng được gọi (đọc mã từ đĩa, tiền xử lý mã, thêm dữ liệu vào bằng chứng Merkle). Bất cứ khi nào bạn gặp phải tình huống mà kẻ tấn công yêu cầu ít tài nguyên để gây ra nhiều công việc cho người khác, bạn có nguy cơ bị tấn công DOS.

Ban đầu, đây không phải là một vấn đề lớn vì một giới hạn kích thước hợp đồng tự nhiên là giới hạn gas của khối. Rõ ràng là một hợp đồng phải được triển khai trong một giao dịch chứa tất cả chỉ thị biên dịch của hợp đồng. Nếu bạn chỉ bao gồm một giao dịch đó vào một khối, bạn có thể sử dụng hết lượng gas đó, nhưng nó không phải là vô hạn. Kể từ [Nâng cấp London](/ethereum-forks/#london), giới hạn gas của khối đã có thể thay đổi trong khoảng từ 15 triệu đến 30 triệu đơn vị tùy thuộc vào nhu cầu của mạng.

Trong phần tiếp theo, chúng ta sẽ xem xét một số phương pháp được sắp xếp theo tác động tiềm tàng của chúng. Hãy nghĩ về nó theo thuật ngữ giảm cân. Chiến lược tốt nhất để ai đó đạt được cân nặng mục tiêu của họ (trong trường hợp của chúng ta là 24kb) là tập trung vào các phương pháp có tác động lớn trước tiên. Trong hầu hết các trường hợp, chỉ cần điều chỉnh chế độ ăn uống sẽ giúp bạn đạt được mục tiêu, nhưng đôi khi bạn cần nhiều hơn một chút. Sau đó, bạn có thể thêm một số bài tập thể dục (tác động trung bình) hoặc thậm chí là các chất bổ sung (tác động nhỏ).

## Tác động lớn {#big-impact}

### Tách các hợp đồng của bạn {#separate-your-contracts}

Đây phải luôn là cách tiếp cận đầu tiên của bạn. Làm thế nào bạn có thể tách hợp đồng thành nhiều hợp đồng nhỏ hơn? Nó thường buộc bạn phải đưa ra một kiến trúc tốt cho các hợp đồng của mình. Các hợp đồng nhỏ hơn luôn được ưu tiên từ góc độ dễ đọc của mã. Để tách hợp đồng, hãy tự hỏi bản thân:

- Những chức năng nào thuộc về nhau? Mỗi bộ chức năng có thể là tốt nhất trong hợp đồng riêng của nó.
- Những chức năng nào không yêu cầu đọc trạng thái hợp đồng hoặc chỉ một tập hợp con cụ thể của trạng thái?
- Bạn có thể tách riêng phần lưu trữ và chức năng không?

### Thư viện {#libraries}

Một cách đơn giản để di chuyển mã chức năng ra khỏi bộ nhớ là sử dụng [thư viện](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Đừng khai báo các chức năng của thư viện là nội bộ vì chúng sẽ được [thêm vào hợp đồng](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) trực tiếp trong quá trình biên dịch. Nhưng nếu bạn sử dụng các hàm công khai, thì những hàm đó trên thực tế sẽ nằm trong một hợp đồng thư viện riêng biệt. Hãy cân nhắc [sử dụng for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) để việc sử dụng các thư viện thuận tiện hơn.

### Proxy {#proxies}

Một chiến lược nâng cao hơn sẽ là một hệ thống proxy. Các thư viện sử dụng `DELEGATECALL` ở phía sau, chỉ đơn giản là thực thi chức năng của một hợp đồng khác với trạng thái của hợp đồng gọi. Hãy xem [bài đăng trên blog này](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) để tìm hiểu thêm về các hệ thống proxy. Chúng cung cấp cho bạn nhiều chức năng hơn, ví dụ: chúng cho phép khả năng nâng cấp, nhưng chúng cũng làm tăng thêm rất nhiều sự phức tạp. Tôi sẽ không thêm những thứ đó chỉ để giảm kích thước hợp đồng trừ khi đó là lựa chọn duy nhất của bạn vì bất kỳ lý do gì.

## Tác động trung bình {#medium-impact}

### Xóa các chức năng {#remove-functions}

Điều này có lẽ đã quá rõ ràng. Các chức năng làm tăng kích thước hợp đồng lên khá nhiều.

- **Bên ngoài**: Nhiều khi chúng tôi thêm rất nhiều chức năng xem vì lý do tiện lợi. Điều đó hoàn toàn ổn cho đến khi bạn đạt đến giới hạn kích thước. Sau đó, bạn có thể muốn thực sự nghĩ về việc loại bỏ tất cả trừ những cái thực sự cần thiết.
- **Nội bộ**: Bạn cũng có thể xóa các chức năng nội bộ/riêng tư và chỉ cần đưa mã vào cùng dòng miễn là chức năng đó chỉ được gọi một lần.

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

Một thay đổi đơn giản như thế này tạo ra sự khác biệt **0,28kb**. Có khả năng bạn có thể tìm thấy nhiều tình huống tương tự trong các hợp đồng của mình và những tình huống đó thực sự có thể cộng lại thành số tiền đáng kể.

### Rút ngắn thông báo lỗi {#shorten-error-message}

Các thông báo hoàn nguyên dài và đặc biệt là nhiều thông báo hoàn nguyên khác nhau có thể làm phình to hợp đồng. Thay vào đó, hãy sử dụng các mã lỗi ngắn và giải mã chúng trong hợp đồng của bạn. Một thông điệp dài có thể trở nên ngắn hơn nhiều:

```solidity
require(msg.sender == owner, "Chỉ chủ sở hữu của hợp đồng này mới có thể gọi chức năng này");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Sử dụng các lỗi tùy chỉnh thay vì thông báo lỗi

Các lỗi tùy chỉnh đã được giới thiệu trong [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Chúng là một cách tuyệt vời để giảm kích thước hợp đồng của bạn, bởi vì chúng được mã hóa ABI dưới dạng các bộ chọn (giống như các chức năng).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Cân nhắc giá trị chạy thấp trong trình tối ưu hóa {#consider-a-low-run-value-in-the-optimizer}

Bạn cũng có thể thay đổi cài đặt trình tối ưu hóa. Giá trị mặc định là 200 có nghĩa là nó đang cố gắng tối ưu hóa chỉ thị biên dịch như thể một chức năng được gọi 200 lần. Nếu bạn đổi nó thành 1, về cơ bản bạn đang yêu cầu trình tối ưu hóa tối ưu cho trường hợp chạy mỗi chức năng chỉ một lần. Một chức năng được tối ưu hóa để chỉ chạy một lần có nghĩa là nó được tối ưu hóa cho chính việc triển khai. Lưu ý rằng **điều này làm tăng [chi phí gas](/developers/docs/gas/) để chạy các chức năng**, vì vậy bạn có thể không muốn làm điều đó.

## Tác động nhỏ {#small-impact}

### Tránh chuyển các cấu trúc cho các chức năng {#avoid-passing-structs-to-functions}

Nếu bạn đang sử dụng [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), nó có thể giúp không chuyển các cấu trúc cho một chức năng. Thay vì chuyển tham số dưới dạng một cấu trúc, hãy chuyển trực tiếp các tham số bắt buộc. Trong ví dụ này, chúng tôi đã tiết kiệm được **0,1kb** nữa.

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

### Khai báo khả năng hiển thị chính xác cho các chức năng và biến {#declare-correct-visibility-for-functions-and-variables}

- Các chức năng hoặc biến chỉ được gọi từ bên ngoài? Khai báo chúng là `external` thay vì `public`.
- Các chức năng hoặc biến chỉ được gọi từ bên trong hợp đồng? Khai báo chúng là `private` hoặc `internal` thay vì `public`.

### Xóa các bộ sửa đổi {#remove-modifiers}

Các bộ sửa đổi, đặc biệt khi được sử dụng nhiều, có thể có tác động đáng kể đến kích thước hợp đồng. Cân nhắc loại bỏ chúng và thay vào đó sử dụng các chức năng.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Những mẹo đó sẽ giúp bạn giảm đáng kể kích thước hợp đồng. Một lần nữa, tôi không thể không nhấn mạnh rằng, hãy luôn tập trung vào việc tách các hợp đồng nếu có thể để có tác động lớn nhất.
