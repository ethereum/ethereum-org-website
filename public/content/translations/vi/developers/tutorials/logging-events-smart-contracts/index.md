---
title: Ghi nhật ký dữ liệu từ hợp đồng thông minh bằng các sự kiện
description: Giới thiệu về các sự kiện của hợp đồng thông minh và cách bạn có thể sử dụng chúng để ghi nhật ký dữ liệu
author: "jdourlens"
tags: [ "hợp đồng thông minh", "remix", "solidity", "sự kiện" ]
skill: intermediate
lang: vi
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong Solidity, [sự kiện](/developers/docs/smart-contracts/anatomy/#events-and-logs) là các tín hiệu được gửi đi mà hợp đồng thông minh có thể kích hoạt. Các ứng dụng phi tập trung, hoặc bất cứ thứ gì được kết nối với API JSON-RPC của Ethereum, có thể lắng nghe những sự kiện này và hành động tương ứng. Một sự kiện cũng có thể được lập chỉ mục để lịch sử sự kiện có thể được tìm kiếm sau này.

## Sự kiện {#events}

Sự kiện phổ biến nhất trên chuỗi khối Ethereum tại thời điểm viết bài này là sự kiện Transfer được phát ra bởi các token ERC20 khi ai đó chuyển token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Chữ ký sự kiện được khai báo bên trong mã hợp đồng và có thể được phát ra bằng từ khóa emit. Ví dụ: sự kiện transfer ghi nhật ký ai đã gửi giao dịch chuyển tiền (_from_), đến ai (_to_) và bao nhiêu token đã được chuyển (_value_).

Nếu chúng ta quay lại hợp đồng thông minh Counter của mình và quyết định ghi nhật ký mỗi khi giá trị được thay đổi. Vì hợp đồng này không nhằm mục đích triển khai mà đóng vai trò là cơ sở để xây dựng một hợp đồng khác bằng cách mở rộng nó: nó được gọi là hợp đồng trừu tượng. Trong trường hợp ví dụ về bộ đếm của chúng ta, nó sẽ trông như sau:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Biến riêng tư thuộc loại số nguyên không dấu để lưu số lần đếm
    uint256 private count = 0;

    // Hàm tăng bộ đếm của chúng ta
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter để lấy giá trị đếm
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Lưu ý rằng:

- **Dòng 5**: chúng ta khai báo sự kiện của mình và những gì nó chứa, giá trị cũ và giá trị mới.

- **Dòng 13**: Khi chúng ta tăng biến đếm của mình, chúng ta phát ra sự kiện.

Nếu bây giờ chúng ta triển khai hợp đồng và gọi hàm increment, chúng ta sẽ thấy rằng Remix sẽ tự động hiển thị nó nếu bạn nhấp vào giao dịch mới bên trong một mảng có tên là logs.

![Ảnh chụp màn hình Remix](./remix-screenshot.png)

Nhật ký thực sự hữu ích để gỡ lỗi các hợp đồng thông minh của bạn. Chúng cũng quan trọng nếu bạn xây dựng các ứng dụng được sử dụng bởi nhiều người khác nhau và giúp việc phân tích để theo dõi cũng như hiểu cách hợp đồng thông minh của bạn được sử dụng trở nên dễ dàng hơn. Các nhật ký được tạo bởi các giao dịch sẽ được hiển thị trong các trình duyệt khối phổ biến và bạn cũng có thể sử dụng chúng để, ví dụ, tạo các tập lệnh ngoài chuỗi để lắng nghe các sự kiện cụ thể và thực hiện hành động khi chúng xảy ra.
