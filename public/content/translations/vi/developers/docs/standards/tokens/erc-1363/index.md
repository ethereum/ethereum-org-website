---
title: Tiêu chuẩn Token có thể thanh toán ERC-1363
description: ERC-1363 là một giao diện mở rộng cho các token ERC-20, hỗ trợ thực thi logic tùy chỉnh trên hợp đồng của người nhận sau khi chuyển token hoặc trên hợp đồng của người chi tiêu sau khi phê duyệt, tất cả chỉ trong một giao dịch duy nhất.
lang: vi
---

## Giới thiệu {#introduction}

### ERC-1363 là gì? {#what-is-erc1363}

ERC-1363 là một giao diện mở rộng cho các token ERC-20, hỗ trợ thực thi logic tùy chỉnh trên hợp đồng của người nhận sau khi chuyển token hoặc trên hợp đồng của người chi tiêu sau khi phê duyệt, tất cả chỉ trong một giao dịch duy nhất.

### Sự khác biệt so với ERC-20 {#erc20-differences}

Các hoạt động ERC-20 tiêu chuẩn như `transfer`, `transferFrom` và `approve` không cho phép thực thi mã trên hợp đồng của người nhận hoặc người chi tiêu mà không cần một giao dịch riêng biệt.
Điều này tạo ra sự phức tạp trong quá trình phát triển giao diện người dùng và rào cản trong việc áp dụng vì người dùng phải đợi giao dịch đầu tiên được thực thi rồi mới gửi giao dịch thứ hai.
Họ cũng phải trả GAS hai lần.

ERC-1363 giúp các token có thể thay thế thực hiện các hành động dễ dàng hơn và hoạt động mà không cần sử dụng bất kỳ trình lắng nghe ngoài chuỗi nào.
Nó cho phép thực hiện một lệnh gọi lại trên hợp đồng của người nhận hoặc người chi tiêu, sau một lần chuyển hoặc một lần phê duyệt, trong một giao dịch duy nhất.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về:

- [Các tiêu chuẩn của token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Nội dung {#body}

ERC-1363 giới thiệu một Giao diện Lập trình Ứng dụng tiêu chuẩn cho các token ERC-20 để tương tác với các hợp đồng thông minh sau khi `transfer`, `transferFrom` hoặc `approve`.

Tiêu chuẩn này cung cấp chức năng cơ bản để chuyển token, cũng như cho phép token được phê duyệt để chúng có thể được chi tiêu bởi một bên thứ ba khác trên chuỗi, và sau đó thực hiện một lệnh gọi lại trên hợp đồng của người nhận hoặc người chi tiêu.

Có nhiều mục đích sử dụng được đề xuất của các hợp đồng thông minh có thể chấp nhận các lệnh gọi lại ERC-20.

Các ví dụ có thể là:

- **Bán token huy động vốn**: token được gửi đi sẽ kích hoạt việc phân bổ phần thưởng ngay lập tức.
- **Dịch vụ**: thanh toán kích hoạt quyền truy cập dịch vụ trong một bước.
- **Hóa đơn**: token tự động thanh toán hóa đơn.
- **Đăng ký**: việc phê duyệt mức phí hàng năm sẽ kích hoạt đăng ký trong khoản thanh toán của tháng đầu tiên.

Vì những lý do này, nó ban đầu được đặt tên là **"Token có thể thanh toán"**.

Hành vi gọi lại còn mở rộng hơn nữa tiện ích của nó, cho phép các tương tác liền mạch như:

- **Góp cổ phần**: token được chuyển sẽ kích hoạt việc khóa tự động trong một hợp đồng góp cổ phần.
- **Bỏ phiếu**: token nhận được sẽ ghi nhận phiếu bầu trong một hệ thống quản trị.
- **Hoán đổi**: việc phê duyệt token sẽ kích hoạt logic hoán đổi trong một bước duy nhất.

Các token ERC-1363 có thể được sử dụng cho các tiện ích cụ thể trong mọi trường hợp yêu cầu thực thi một lệnh gọi lại sau khi nhận được một lần chuyển hoặc một lần phê duyệt.
ERC-1363 cũng hữu ích để tránh mất token hoặc khóa token trong các hợp đồng thông minh bằng cách xác minh khả năng xử lý token của người nhận.

Không giống như các đề xuất mở rộng ERC-20 khác, ERC-1363 không ghi đè các phương thức `transfer` và `transferFrom` của ERC-20 và xác định các ID giao diện cần được triển khai để duy trì khả năng tương thích ngược với ERC-20.

Từ [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Các phương thức {#methods}

Các hợp đồng thông minh triển khai tiêu chuẩn ERC-1363 **PHẢI** triển khai tất cả các hàm trong giao diện `ERC1363`, cũng như các giao diện `ERC20` và `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Một giao diện mở rộng cho các token ERC-20 hỗ trợ thực thi mã trên hợp đồng của người nhận
 * sau `transfer` hoặc `transferFrom`, hoặc mã trên hợp đồng của người chi tiêu sau `approve`, trong một giao dịch duy nhất.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * LƯU Ý: mã định danh ERC-165 cho giao diện này là 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Di chuyển một lượng token `value` từ tài khoản của người gọi đến `to`
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param to Địa chỉ mà token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Di chuyển một lượng token `value` từ tài khoản của người gọi đến `to`
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param to Địa chỉ mà token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `to`.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Di chuyển một lượng token `value` từ `from` đến `to` bằng cơ chế cho phép
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param from Địa chỉ gửi token.
   * @param to Địa chỉ mà token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Di chuyển một lượng token `value` từ `from` đến `to` bằng cơ chế cho phép
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param from Địa chỉ gửi token.
   * @param to Địa chỉ mà token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `to`.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Đặt một lượng token `value` làm mức cho phép của `spender` đối với token của người gọi
   * và sau đó gọi `ERC1363Spender::onApprovalReceived` trên `spender`.
   * @param spender Địa chỉ sẽ chi tiêu số tiền.
   * @param value Số lượng token sẽ được chi tiêu.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Đặt một lượng token `value` làm mức cho phép của `spender` đối với token của người gọi
   * và sau đó gọi `ERC1363Spender::onApprovalReceived` trên `spender`.
   * @param spender Địa chỉ sẽ chi tiêu số tiền.
   * @param value Số lượng token sẽ được chi tiêu.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `spender`.
   * @return Một giá trị boolean cho biết hoạt động đã thành công trừ khi có lỗi.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Một hợp đồng thông minh muốn chấp nhận token ERC-1363 thông qua `transferAndCall` hoặc `transferFromAndCall` **PHẢI** triển khai giao diện `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Giao diện cho bất kỳ hợp đồng nào muốn hỗ trợ `transferAndCall` hoặc `transferFromAndCall` từ các hợp đồng token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Bất cứ khi nào token ERC-1363 được chuyển đến hợp đồng này qua `ERC1363::transferAndCall` hoặc `ERC1363::transferFromAndCall`
   * bởi `operator` từ `from`, hàm này sẽ được gọi.
   *
   * LƯU Ý: Để chấp nhận việc chuyển, hàm này phải trả về
   * `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))`
   * (tức là 0x88a7ca5c, hoặc bộ chọn hàm của chính nó).
   *
   * @param operator Địa chỉ đã gọi hàm `transferAndCall` hoặc `transferFromAndCall`.
   * @param from Địa chỉ mà từ đó token được chuyển đi.
   * @param value Số lượng token được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể.
   * @return `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))` nếu việc chuyển được cho phép trừ khi có lỗi.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Một hợp đồng thông minh muốn chấp nhận token ERC-1363 thông qua `approveAndCall` **PHẢI** triển khai giao diện `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Giao diện cho bất kỳ hợp đồng nào muốn hỗ trợ `approveAndCall` từ các hợp đồng token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Bất cứ khi nào một `owner` token ERC-1363 phê duyệt hợp đồng này qua `ERC1363::approveAndCall`
   * để chi tiêu token của họ, hàm này sẽ được gọi.
   *
   * LƯU Ý: Để chấp nhận việc phê duyệt, hàm này phải trả về
   * `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))`
   * (tức là 0x7b04a2d0, hoặc bộ chọn hàm của chính nó).
   *
   * @param owner Địa chỉ đã gọi hàm `approveAndCall` và trước đây đã sở hữu các token.
   * @param value Số lượng token sẽ được chi tiêu.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể.
   * @return `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))` nếu việc phê duyệt được cho phép trừ khi có lỗi.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Đọc thêm {#further-reading}

- [ERC-1363: Tiêu chuẩn Token có thể thanh toán](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Kho lưu trữ GitHub](https://github.com/vittominacori/erc1363-payable-token)
