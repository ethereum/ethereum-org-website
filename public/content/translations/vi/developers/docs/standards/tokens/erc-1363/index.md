---
title: Tiêu chuẩn Token có thể thanh toán ERC-1363
description: ERC-1363 là một giao diện mở rộng cho các token ERC-20 hỗ trợ thực thi logic tùy chỉnh trên hợp đồng người nhận sau khi chuyển, hoặc trên hợp đồng người chi tiêu sau khi phê duyệt, tất cả trong một giao dịch duy nhất.
lang: vi
---

## Giới thiệu {#introduction}

### ERC-1363 là gì? {#what-is-erc1363}

ERC-1363 là một giao diện mở rộng cho các token ERC-20 hỗ trợ thực thi logic tùy chỉnh trên hợp đồng người nhận sau khi chuyển, hoặc trên hợp đồng người chi tiêu sau khi phê duyệt, tất cả trong một giao dịch duy nhất.

### Sự khác biệt so với ERC-20 {#erc20-differences}

Các hoạt động ERC-20 tiêu chuẩn như `transfer`, `transferFrom` và `approve`, không cho phép thực thi mã trên hợp đồng người nhận hoặc người chi tiêu mà không có một giao dịch riêng biệt.
Điều này gây ra sự phức tạp trong việc phát triển giao diện người dùng (UI) và trở ngại trong việc áp dụng vì người dùng phải đợi giao dịch đầu tiên được thực thi rồi mới gửi giao dịch thứ hai.
Họ cũng phải trả Gas hai lần.

ERC-1363 giúp các token có thể thay thế (fungible token) có khả năng thực hiện các hành động dễ dàng hơn và hoạt động mà không cần sử dụng bất kỳ trình lắng nghe ngoài chuỗi nào.
Nó cho phép thực hiện một lệnh gọi lại (callback) trên hợp đồng người nhận hoặc người chi tiêu, sau khi chuyển hoặc phê duyệt, trong một giao dịch duy nhất.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về:

- [Các tiêu chuẩn token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Nội dung chính {#body}

ERC-1363 giới thiệu một API tiêu chuẩn cho các token ERC-20 để tương tác với các hợp đồng thông minh sau `transfer`, `transferFrom` hoặc `approve`.

Tiêu chuẩn này cung cấp chức năng cơ bản để chuyển token, cũng như cho phép các token được phê duyệt để chúng có thể được chi tiêu bởi một bên thứ ba trên chuỗi khác, và sau đó thực hiện một lệnh gọi lại trên hợp đồng người nhận hoặc người chi tiêu.

Có nhiều đề xuất sử dụng các hợp đồng thông minh có thể chấp nhận các lệnh gọi lại ERC-20.

Các ví dụ có thể là:

- **Bán huy động vốn (Crowdsales)**: các token được gửi sẽ kích hoạt việc phân bổ phần thưởng ngay lập tức.
- **Dịch vụ**: thanh toán kích hoạt quyền truy cập dịch vụ trong một bước.
- **Hóa đơn**: các token tự động thanh toán hóa đơn.
- **Đăng ký (Subscriptions)**: việc phê duyệt mức phí hàng năm sẽ kích hoạt đăng ký ngay trong lần thanh toán của tháng đầu tiên.

Vì những lý do này, ban đầu nó được đặt tên là **"Payable Token"** (Token có thể thanh toán).

Hành vi gọi lại tiếp tục mở rộng tiện ích của nó, cho phép các tương tác liền mạch như:

- **Đặt cọc (Staking)**: các token được chuyển sẽ kích hoạt việc khóa tự động trong một hợp đồng đặt cọc.
- **Bỏ phiếu**: các token nhận được sẽ ghi nhận các phiếu bầu trong một hệ thống quản trị.
- **Hoán đổi**: việc phê duyệt token kích hoạt logic hoán đổi trong một bước duy nhất.

Các token ERC-1363 có thể được sử dụng cho các tiện ích cụ thể trong tất cả các trường hợp yêu cầu một lệnh gọi lại được thực thi sau khi nhận được một khoản chuyển hoặc một phê duyệt.
ERC-1363 cũng hữu ích trong việc tránh mất token hoặc khóa token trong các hợp đồng thông minh bằng cách xác minh khả năng xử lý token của người nhận.

Không giống như các đề xuất mở rộng ERC-20 khác, ERC-1363 không ghi đè các phương thức `transfer` và `transferFrom` của ERC-20 và định nghĩa các ID giao diện cần được triển khai để duy trì khả năng tương thích ngược với ERC-20.

Từ [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Các phương thức {#methods}

Các hợp đồng thông minh triển khai tiêu chuẩn ERC-1363 **PHẢI** triển khai tất cả các hàm trong giao diện `ERC1363`, cũng như các giao diện `ERC20` và `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Một giao diện mở rộng cho các token ERC-20 hỗ trợ thực thi mã trên một hợp đồng người nhận
 * sau `transfer` hoặc `transferFrom`, hoặc mã trên một hợp đồng người chi tiêu sau `approve`, trong một giao dịch duy nhất.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * LƯU Ý: định danh ERC-165 cho giao diện này là 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Chuyển một số lượng `value` token từ tài khoản của người gọi đến `to`
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param to Địa chỉ mà các token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Chuyển một số lượng `value` token từ tài khoản của người gọi đến `to`
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param to Địa chỉ mà các token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `to`.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Chuyển một số lượng `value` token từ `from` đến `to` bằng cách sử dụng cơ chế hạn mức
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param from Địa chỉ để gửi token từ đó.
   * @param to Địa chỉ mà các token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Chuyển một số lượng `value` token từ `from` đến `to` bằng cách sử dụng cơ chế hạn mức
   * và sau đó gọi `ERC1363Receiver::onTransferReceived` trên `to`.
   * @param from Địa chỉ để gửi token từ đó.
   * @param to Địa chỉ mà các token đang được chuyển đến.
   * @param value Số lượng token sẽ được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `to`.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Đặt một số lượng `value` token làm hạn mức của `spender` đối với các token của người gọi
   * và sau đó gọi `ERC1363Spender::onApprovalReceived` trên `spender`.
   * @param spender Địa chỉ sẽ chi tiêu quỹ.
   * @param value Số lượng token sẽ được chi tiêu.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Đặt một số lượng `value` token làm hạn mức của `spender` đối với các token của người gọi
   * và sau đó gọi `ERC1363Spender::onApprovalReceived` trên `spender`.
   * @param spender Địa chỉ sẽ chi tiêu quỹ.
   * @param value Số lượng token sẽ được chi tiêu.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể, được gửi trong lệnh gọi đến `spender`.
   * @return Một giá trị boolean chỉ ra thao tác đã thành công trừ khi ném ra lỗi.
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

Một hợp đồng thông minh muốn chấp nhận các token ERC-1363 thông qua `transferAndCall` hoặc `transferFromAndCall` **PHẢI** triển khai giao diện `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Giao diện cho bất kỳ hợp đồng nào muốn hỗ trợ `transferAndCall` hoặc `transferFromAndCall` từ các hợp đồng token ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Bất cứ khi nào các token ERC-1363 được chuyển đến hợp đồng này thông qua `ERC1363::transferAndCall` hoặc `ERC1363::transferFromAndCall`
   * bởi `operator` từ `from`, hàm này sẽ được gọi.
   *
   * LƯU Ý: Để chấp nhận việc chuyển, hàm này phải trả về
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (tức là 0x88a7ca5c, hoặc bộ chọn hàm của chính nó).
   *
   * @param operator Địa chỉ đã gọi hàm `transferAndCall` hoặc `transferFromAndCall`.
   * @param from Địa chỉ mà các token được chuyển từ đó.
   * @param value Số lượng token được chuyển.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` nếu việc chuyển được cho phép trừ khi ném ra lỗi.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Một hợp đồng thông minh muốn chấp nhận các token ERC-1363 thông qua `approveAndCall` **PHẢI** triển khai giao diện `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Giao diện cho bất kỳ hợp đồng nào muốn hỗ trợ `approveAndCall` từ các hợp đồng token ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Bất cứ khi nào một `owner` của các token ERC-1363 phê duyệt hợp đồng này thông qua `ERC1363::approveAndCall`
   * để chi tiêu các token của họ, hàm này sẽ được gọi.
   *
   * LƯU Ý: Để chấp nhận sự phê duyệt, hàm này phải trả về
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (tức là 0x7b04a2d0, hoặc bộ chọn hàm của chính nó).
   *
   * @param owner Địa chỉ đã gọi hàm `approveAndCall` và trước đó sở hữu các token.
   * @param value Số lượng token sẽ được chi tiêu.
   * @param data Dữ liệu bổ sung không có định dạng cụ thể.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` nếu sự phê duyệt được cho phép trừ khi ném ra lỗi.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Đọc thêm {#further-reading}

- [ERC-1363: Tiêu chuẩn Token có thể thanh toán](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Kho lưu trữ GitHub](https://github.com/vittominacori/erc1363-payable-token)