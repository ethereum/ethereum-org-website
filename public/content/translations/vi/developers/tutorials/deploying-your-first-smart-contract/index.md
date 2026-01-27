---
title: "Triển khai hợp đồng thông minh đầu tiên của bạn"
description: "Giới thiệu về việc triển khai hợp đồng thông minh đầu tiên của bạn trên mạng thử nghiệm Ethereum"
author: "jdourlens"
tags:
  [
    "hợp đồng thông minh",
    "remix",
    "solidity",
    "triển khai"
  ]
skill: beginner
lang: vi
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Tôi đoán rằng bạn cũng háo hức như chúng tôi khi [triển khai](/developers/docs/smart-contracts/deploying/) và tương tác với [hợp đồng thông minh](/developers/docs/smart-contracts/) đầu tiên của bạn trên chuỗi khối Ethereum.

Đừng lo, vì đây là hợp đồng thông minh đầu tiên của chúng ta, chúng ta sẽ triển khai nó trên một [mạng thử nghiệm cục bộ](/developers/docs/networks/) nên bạn sẽ không tốn bất kỳ chi phí nào để triển khai và thử nghiệm bao nhiêu tùy thích.

## Viết hợp đồng của chúng ta {#writing-our-contract}

Bước đầu tiên là [truy cập Remix](https://remix.ethereum.org/) và tạo một tệp mới. Ở phần trên cùng bên trái của giao diện Remix, hãy thêm một tệp mới và nhập tên tệp bạn muốn.

![Thêm tệp mới trong giao diện Remix](./remix.png)

Trong tệp mới, chúng ta sẽ dán đoạn mã sau.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Biến công khai của kiểu số nguyên không dấu để giữ số lượng đếm
    uint256 public count = 0;

    // Hàm tăng bộ đếm của chúng ta
    function increment() public {
        count += 1;
    }

    // Getter không cần thiết để lấy giá trị đếm
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Nếu bạn đã quen với lập trình, bạn có thể dễ dàng đoán được chương trình này làm gì. Dưới đây là giải thích từng dòng một:

- Dòng 4: Chúng ta định nghĩa một hợp đồng có tên là `Counter`.
- Dòng 7: Hợp đồng của chúng ta lưu trữ một số nguyên không dấu có tên là `count`, bắt đầu từ 0.
- Dòng 10: Hàm đầu tiên sẽ sửa đổi trạng thái của hợp đồng và `increment()` biến `count` của chúng ta.
- Hàm thứ hai chỉ là một getter để có thể đọc giá trị của biến `count` từ bên ngoài hợp đồng thông minh. Lưu ý rằng, vì chúng ta đã định nghĩa biến `count` của mình là công khai nên điều này không cần thiết nhưng được hiển thị như một ví dụ.

Đó là tất cả cho hợp đồng thông minh đơn giản đầu tiên của chúng ta. Như bạn có thể đã biết, nó trông giống như một lớp từ các ngôn ngữ OOP (Lập trình hướng đối tượng) như Java hoặc C++. Bây giờ là lúc để thử nghiệm với hợp đồng của chúng ta.

## Triển khai hợp đồng của chúng ta {#deploying-our-contract}

Sau khi chúng ta đã viết hợp đồng thông minh đầu tiên, bây giờ chúng ta sẽ triển khai nó lên chuỗi khối để có thể thử nghiệm với nó.

[Triển khai hợp đồng thông minh trên chuỗi khối](/developers/docs/smart-contracts/deploying/) thực chất chỉ là gửi một giao dịch chứa mã của hợp đồng thông minh đã được biên dịch mà không chỉ định bất kỳ người nhận nào.

Trước tiên, chúng ta sẽ [biên dịch hợp đồng](/developers/docs/smart-contracts/compiling/) bằng cách nhấp vào biểu tượng biên dịch ở phía bên tay trái:

![Biểu tượng biên dịch trong thanh công cụ Remix](./remix-compile-button.png)

Sau đó, nhấp vào nút biên dịch:

![Nút biên dịch trong trình biên dịch Solidity của Remix](./remix-compile.png)

Bạn có thể chọn tùy chọn “Tự động biên dịch” để hợp đồng sẽ luôn được biên dịch khi bạn lưu nội dung trong trình soạn thảo văn bản.

Sau đó, điều hướng đến màn hình "triển khai và chạy giao dịch":

![Biểu tượng triển khai trong thanh công cụ Remix](./remix-deploy.png)

Khi bạn ở trên màn hình "triển khai và chạy giao dịch", hãy kiểm tra kỹ xem tên hợp đồng của bạn có xuất hiện không và nhấp vào Triển khai. Như bạn có thể thấy ở đầu trang, môi trường hiện tại là “JavaScript VM”, điều đó có nghĩa là chúng ta sẽ triển khai và tương tác với hợp đồng thông minh của mình trên một chuỗi khối thử nghiệm cục bộ để có thể kiểm tra nhanh hơn và không mất phí.

![Nút triển khai trong trình biên dịch Solidity của Remix](./remix-deploy-button.png)

Khi bạn đã nhấp vào nút “Triển khai”, bạn sẽ thấy hợp đồng của mình xuất hiện ở dưới cùng. Nhấp vào mũi tên bên trái để mở rộng nó và chúng ta sẽ thấy nội dung của hợp đồng. Đây là biến `counter` của chúng ta, hàm `increment()` và hàm getter `getCounter()`.

Nếu bạn nhấp vào nút `count` hoặc `getCount`, nó sẽ thực sự truy xuất nội dung của biến `count` của hợp đồng và hiển thị nó. Vì chúng ta chưa gọi hàm `increment` nên nó sẽ hiển thị 0.

![Nút hàm trong trình biên dịch Solidity của Remix](./remix-function-button.png)

Bây giờ hãy gọi hàm `increment` bằng cách nhấp vào nút. Bạn sẽ thấy nhật ký của các giao dịch được thực hiện xuất hiện ở cuối cửa sổ. Bạn sẽ thấy rằng nhật ký sẽ khác khi bạn nhấn nút để truy xuất dữ liệu thay vì nút `increment`. Đó là vì việc đọc dữ liệu trên chuỗi khối không cần bất kỳ giao dịch (ghi) hoặc phí nào. Bởi vì chỉ việc sửa đổi trạng thái của chuỗi khối mới yêu cầu thực hiện một giao dịch:

![Nhật ký giao dịch](./transaction-log.png)

Sau khi nhấn nút `increment` tạo ra giao dịch để gọi hàm `increment()` của chúng ta, nếu chúng ta nhấp lại vào nút `count` hoặc `getCount`, chúng ta sẽ đọc được trạng thái mới được cập nhật của hợp đồng thông minh với biến `count` lớn hơn 0.

![Trạng thái mới được cập nhật của hợp đồng thông minh](./updated-state.png)

Trong bài hướng dẫn tiếp theo, chúng ta sẽ tìm hiểu [cách bạn có thể thêm các sự kiện vào hợp đồng thông minh của mình](/developers/tutorials/logging-events-smart-contracts/). Ghi nhật ký các sự kiện là một cách thuận tiện để gỡ lỗi hợp đồng thông minh của bạn và hiểu những gì đang xảy ra khi gọi một hàm.
