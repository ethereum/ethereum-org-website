---
title: "Ghi nhật ký dữ liệu từ hợp đồng thông minh bằng các sự kiện"
description: "Giới thiệu về các sự kiện của hợp đồng thông minh và cách bạn có thể sử dụng chúng để ghi nhật ký dữ liệu"
author: "jdourlens"
tags:
  - hợp đồng thông minh
  - remix
  - solidity
  - sự kiện
skill: intermediate
breadcrumb: "Ghi nhật ký sự kiện"
lang: vi
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Trong Solidity, [các sự kiện](/developers/docs/smart-contracts/anatomy/#events-and-logs) là những tín hiệu được phát ra mà các hợp đồng thông minh có thể kích hoạt. Các ứng dụng phi tập trung (dapp), hoặc bất kỳ thứ gì kết nối với API JSON-RPC của Ethereum, đều có thể lắng nghe các sự kiện này và hành động tương ứng. Một sự kiện cũng có thể được lập chỉ mục để lịch sử sự kiện có thể được tìm kiếm sau này.

## Sự kiện {#events}

Sự kiện phổ biến nhất trên Chuỗi khối Ethereum tại thời điểm viết bài này là sự kiện Transfer được phát ra bởi các token ERC20 khi ai đó chuyển token.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Chữ ký sự kiện được khai báo bên trong mã hợp đồng và có thể được phát ra bằng từ khóa emit. Ví dụ, sự kiện transfer ghi nhật ký người đã gửi giao dịch chuyển (_from_), gửi cho ai (_to_) và số lượng token đã được chuyển (_value_).

Nếu chúng ta quay lại hợp đồng thông minh Counter của mình và quyết định ghi nhật ký mỗi khi giá trị bị thay đổi. Vì hợp đồng này không nhằm mục đích được triển khai mà đóng vai trò làm cơ sở để xây dựng một hợp đồng khác bằng cách kế thừa nó: nó được gọi là một hợp đồng trừu tượng (abstract contract). Trong trường hợp ví dụ về bộ đếm của chúng ta, nó sẽ trông như thế này:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Biến riêng tư kiểu unsigned int để lưu số lần đếm
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

- **Dòng 13**: Khi chúng ta tăng biến count của mình, chúng ta phát ra sự kiện.

Bây giờ, nếu chúng ta triển khai hợp đồng và gọi hàm increment, chúng ta sẽ thấy Remix tự động hiển thị nó nếu bạn nhấp vào giao dịch mới bên trong một mảng có tên là logs.

![Remix screenshot](./remix-screenshot.png)

Nhật ký thực sự hữu ích cho việc gỡ lỗi các hợp đồng thông minh của bạn, nhưng chúng cũng quan trọng nếu bạn xây dựng các ứng dụng được nhiều người khác nhau sử dụng và giúp việc phân tích để theo dõi và hiểu cách hợp đồng thông minh của bạn được sử dụng trở nên dễ dàng hơn. Các nhật ký được tạo ra bởi các giao dịch được hiển thị trên các trình khám phá khối phổ biến và ví dụ, bạn cũng có thể sử dụng chúng để tạo các tập lệnh ngoài chuỗi nhằm lắng nghe các sự kiện cụ thể và thực hiện hành động khi chúng xảy ra.