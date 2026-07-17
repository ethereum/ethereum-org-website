---
title: "Triển khai hợp đồng thông minh đầu tiên của bạn"
description: "Giới thiệu về việc triển khai hợp đồng thông minh đầu tiên của bạn trên mạng lưới thử nghiệm Ethereum"
author: "jdourlens"
tags: ["hợp đồng thông minh", "Remix", "Solidity", "triển khai"]
skill: beginner
breadcrumb: "Triển khai hợp đồng đầu tiên"
lang: vi
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Tôi đoán bạn cũng đang rất hào hứng giống như chúng tôi khi [triển khai](/developers/docs/smart-contracts/deploying/) và tương tác với [hợp đồng thông minh](/developers/docs/smart-contracts/) đầu tiên của mình trên Chuỗi khối Ethereum.

Đừng lo lắng, vì đây là hợp đồng thông minh đầu tiên của chúng ta, chúng ta sẽ triển khai nó trên một [mạng lưới thử nghiệm cục bộ](/developers/docs/networks/) để bạn không tốn bất kỳ chi phí nào khi triển khai và có thể thoải mái thử nghiệm với nó.

## Viết hợp đồng của chúng ta {#writing-our-contract}

Bước đầu tiên là [truy cập Remix](https://remix.ethereum.org/) và tạo một tệp mới. Ở phần trên cùng bên trái của giao diện Remix, hãy thêm một tệp mới và nhập tên tệp mà bạn muốn.

![Adding a new file in the Remix interface](./remix.png)

Trong tệp mới, chúng ta sẽ dán đoạn mã sau.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Biến công khai kiểu số nguyên không dấu để lưu số lần đếm
    uint256 public count = 0;

    // Hàm tăng bộ đếm của chúng ta
    function increment() public {
        count += 1;
    }

    // Hàm getter không cần thiết để lấy giá trị đếm
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Nếu bạn đã quen với lập trình, bạn có thể dễ dàng đoán được chương trình này làm gì. Dưới đây là giải thích từng dòng:

- Dòng 4: Chúng ta định nghĩa một hợp đồng với tên `Counter`.
- Dòng 7: Hợp đồng của chúng ta lưu trữ một số nguyên không dấu có tên `count` bắt đầu từ 0.
- Dòng 10: Hàm đầu tiên sẽ sửa đổi trạng thái của hợp đồng và `increment()` biến `count` của chúng ta.
- Dòng 15: Hàm thứ hai chỉ là một getter để có thể đọc giá trị của biến `count` bên ngoài hợp đồng thông minh. Lưu ý rằng, vì chúng ta đã định nghĩa biến `count` của mình là public nên điều này không cần thiết nhưng được hiển thị như một ví dụ.

Đó là tất cả cho hợp đồng thông minh đơn giản đầu tiên của chúng ta. Như bạn có thể biết, nó trông giống như một lớp từ các ngôn ngữ Lập trình Hướng đối tượng (OOP) như Java hoặc C++. Bây giờ là lúc để thử nghiệm với hợp đồng của chúng ta.

## Triển khai hợp đồng của chúng ta {#deploying-our-contract}

Vì chúng ta đã viết hợp đồng thông minh đầu tiên của mình, bây giờ chúng ta sẽ triển khai nó lên Chuỗi khối để có thể thử nghiệm với nó.

[Triển khai hợp đồng thông minh trên Chuỗi khối](/developers/docs/smart-contracts/deploying/) thực chất chỉ là gửi một giao dịch chứa mã của hợp đồng thông minh đã được biên dịch mà không chỉ định bất kỳ người nhận nào.

Đầu tiên, chúng ta sẽ [biên dịch hợp đồng](/developers/docs/smart-contracts/compiling/) bằng cách nhấp vào biểu tượng biên dịch ở phía bên trái:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Sau đó nhấp vào nút biên dịch:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Bạn có thể chọn tùy chọn “Auto compile” để hợp đồng luôn được biên dịch khi bạn lưu nội dung trên trình soạn thảo văn bản.

Sau đó điều hướng đến màn hình "deploy and run transactions":

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Khi bạn đang ở màn hình "deploy and run transactions", hãy kiểm tra kỹ xem tên hợp đồng của bạn có xuất hiện không và nhấp vào Deploy. Như bạn có thể thấy ở đầu trang, môi trường hiện tại là “JavaScript VM”, điều đó có nghĩa là chúng ta sẽ triển khai và tương tác với hợp đồng thông minh của mình trên một Chuỗi khối thử nghiệm cục bộ để có thể kiểm tra nhanh hơn và không mất bất kỳ khoản phí nào.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Sau khi bạn nhấp vào nút “Deploy”, bạn sẽ thấy hợp đồng của mình xuất hiện ở phía dưới. Nhấp vào mũi tên ở bên trái để mở rộng nó để chúng ta sẽ thấy nội dung hợp đồng của mình. Đây là biến `counter` của chúng ta, hàm `increment()` và getter `getCounter()`.

Nếu bạn nhấp vào nút `count` hoặc `getCount`, nó sẽ thực sự truy xuất nội dung của biến `count` của hợp đồng và hiển thị nó. Vì chúng ta chưa gọi hàm `increment`, nó sẽ hiển thị 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Bây giờ hãy gọi hàm `increment` bằng cách nhấp vào nút. Bạn sẽ thấy Nhật ký của các giao dịch được thực hiện xuất hiện ở cuối cửa sổ. Bạn sẽ thấy rằng các Nhật ký khác nhau khi bạn nhấn nút để truy xuất dữ liệu thay vì nút `increment`. Đó là vì việc đọc dữ liệu trên Chuỗi khối không cần bất kỳ giao dịch (ghi) hoặc phí nào. Bởi vì chỉ có việc sửa đổi trạng thái của Chuỗi khối mới yêu cầu thực hiện một giao dịch:

![A log of transactions](./transaction-log.png)

Sau khi nhấn nút increment sẽ tạo ra một giao dịch để gọi hàm `increment()` của chúng ta, nếu chúng ta nhấp lại vào các nút count hoặc getCount, chúng ta sẽ đọc trạng thái mới được cập nhật của hợp đồng thông minh với biến count lớn hơn 0.

![Newly updated state of the smart contract](./updated-state.png)

Trong hướng dẫn tiếp theo, chúng ta sẽ đề cập đến [cách bạn có thể thêm các sự kiện vào hợp đồng thông minh của mình](/developers/tutorials/logging-events-smart-contracts/). Ghi Nhật ký các sự kiện là một cách thuận tiện để gỡ lỗi hợp đồng thông minh của bạn và hiểu những gì đang xảy ra trong khi gọi một hàm.