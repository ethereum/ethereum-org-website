---
title: "Tiêu chuẩn kho tiền được token hóa bất đồng bộ ERC-7540"
description: "Một bản mở rộng của ERC-4626 bổ sung các luồng nạp và quy đổi bất đồng bộ cho các kho tiền được token hóa."
lang: vi
---

## Giới thiệu {#introduction}

ERC-7540 mở rộng [Tiêu chuẩn kho tiền được token hóa ERC-4626](/developers/docs/standards/tokens/erc-4626/) bằng cách thêm hỗ trợ cho các luồng nạp và quy đổi bất đồng bộ. Nó giới thiệu một mô hình yêu cầu rồi yêu cầu nhận: người dùng trước tiên gửi một yêu cầu (giao tài sản hoặc cổ phần của họ cho kho tiền), sau đó yêu cầu nhận kết quả sau khi kho tiền đã xử lý nó.

Điều này là cần thiết khi một kho tiền không thể quyết toán ngay lập tức trong một giao dịch, ví dụ:

- Các giao thức tài sản thế giới thực (RWA) như trái phiếu kho bạc được token hóa, tín dụng tư nhân và các tài sản khác có chu kỳ quyết toán T+1 hoặc T+2
- Cho vay dưới mức thế chấp nơi các đánh giá tín dụng diễn ra ngoài chuỗi
- Các chiến lược kho tiền chuỗi chéo nơi việc bắc cầu gây ra sự chậm trễ
- Các token staking thanh khoản có thời gian chờ rút

Các kho tiền có thể chọn chỉ bất đồng bộ đối với các khoản nạp, chỉ các khoản quy đổi, hoặc cả hai. Sự linh hoạt này cho phép các nhà phát triển kho tiền chỉ thêm các luồng bất đồng bộ ở nơi mà chiến lược cơ sở yêu cầu, trong khi vẫn giữ cho phía bên kia đồng bộ.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [các tiêu chuẩn token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), và [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 so với ERC-7540 {#comparison}

Trong ERC-4626, một khoản nạp được quyết toán một cách nguyên tử: nhà đầu tư gửi tài sản và nhận lại cổ phần trong một giao dịch duy nhất.

<VaultDepositDiagram />

ERC-7540 chia quá trình này thành hai bước. Nhà đầu tư trước tiên gọi `requestDeposit()`, hàm này chuyển tài sản của họ vào kho tiền, sau đó chờ kho tiền xử lý yêu cầu. Cách thức và thời điểm điều đó xảy ra tùy thuộc vào kho tiền, ví dụ như khi một quá trình quyết toán ngoài chuỗi hoàn tất. Sau khi được hoàn thành, nhà đầu tư gọi `deposit()` để yêu cầu nhận cổ phần của họ. Tỷ giá hối đoái không được cố định tại thời điểm yêu cầu: kho tiền sẽ thiết lập nó, thường là khi nó hoàn thành yêu cầu, vì vậy số cổ phần nhận được có thể khác với những gì `convertToShares()` đã trả về khi yêu cầu được thực hiện.

<AsyncVaultDiagram />

Luồng quy đổi cũng hoạt động theo cách tương tự: `requestRedeem()` lấy cổ phần từ nhà đầu tư, và sau khi được hoàn thành, nhà đầu tư gọi `redeem()` để yêu cầu nhận tài sản.

## Các hàm và tính năng của ERC-7540 {#body}

ERC-7540 kế thừa toàn bộ giao diện ERC-4626 nhưng chuyển đổi mục đích sử dụng của `deposit`/`mint`/`withdraw`/`redeem` thành các hàm yêu cầu nhận. Các hàm `requestDeposit` và `requestRedeem` mới xử lý bước yêu cầu ban đầu.

Mỗi yêu cầu di chuyển qua ba trạng thái: đang chờ xử lý (đã gửi, đang chờ xử lý), có thể yêu cầu nhận (đã hoàn thành và được định giá), và đã yêu cầu nhận (nhà đầu tư đã thu nhận cổ phần hoặc tài sản của họ). Một kho tiền có thể làm cho một yêu cầu trở nên có thể yêu cầu nhận ngay lập tức, bỏ qua trạng thái đang chờ xử lý, nhưng việc yêu cầu nhận luôn là một lệnh gọi riêng biệt. Tiêu chuẩn không định nghĩa sự kiện nào cho thời điểm một yêu cầu trở nên có thể yêu cầu nhận.

<VaultRequestDiagram />

### Luồng yêu cầu nạp {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Chuyển `assets` từ `owner` vào kho tiền và gửi một yêu cầu nạp. Địa chỉ `controller` nhận quyền kiểm soát yêu cầu. Trả về một `requestId` xác định lô yêu cầu.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Trả về số lượng `assets` trong một yêu cầu nạp đang chờ xử lý (chưa thể yêu cầu nhận) cho `controller` và `requestId` đã cho.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Trả về số lượng `assets` trong một yêu cầu nạp có thể yêu cầu nhận (đã hoàn thành nhưng chưa được yêu cầu nhận) cho `controller` và `requestId` đã cho.

#### Yêu cầu nhận khoản nạp {#claiming-deposits}

Khi một yêu cầu nạp trở nên có thể yêu cầu nhận, người dùng gọi hàm ERC-4626 tiêu chuẩn [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) hoặc [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) để yêu cầu nhận cổ phần của họ. Trong ERC-7540, các hàm này không còn chuyển tài sản nữa (điều đó đã xảy ra tại thời điểm yêu cầu). Chúng chỉ đúc cổ phần cho người nhận.

### Luồng yêu cầu quy đổi {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Nắm quyền kiểm soát `shares` từ `owner` và gửi một yêu cầu quy đổi. Kho tiền có thể giữ các cổ phần cho đến khi yêu cầu được yêu cầu nhận hoặc đốt chúng ngay lập tức. Địa chỉ `controller` nhận quyền kiểm soát yêu cầu.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Trả về số lượng `shares` trong một yêu cầu quy đổi đang chờ xử lý cho `controller` và `requestId` đã cho.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Trả về số lượng `shares` trong một yêu cầu quy đổi có thể yêu cầu nhận cho `controller` và `requestId` đã cho.

#### Yêu cầu nhận khoản quy đổi {#claiming-redemptions}

Khi một yêu cầu quy đổi trở nên có thể yêu cầu nhận, người dùng gọi hàm ERC-4626 tiêu chuẩn [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) hoặc [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) để yêu cầu nhận tài sản của họ.

### Quản lý người vận hành {#operator-management}

ERC-7540 bao gồm một mô hình người vận hành (từ [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)) cho phép các bên thứ ba quản lý các yêu cầu thay mặt cho người dùng.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Phê duyệt hoặc thu hồi `operator` để hành động thay mặt cho `msg.sender` đối với các yêu cầu nạp/quy đổi và yêu cầu nhận.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Trả về việc liệu `operator` có được phê duyệt để hành động thay mặt cho `controller` hay không.

### ID yêu cầu {#request-ids}

ID yêu cầu phân biệt giữa các lô yêu cầu khác nhau. Tất cả các yêu cầu chia sẻ cùng một `requestId` đều có thể thay thế cho nhau: chúng chuyển đổi giữa các trạng thái cùng nhau và nhận cùng một tỷ giá hối đoái.

Khi một kho tiền trả về `requestId = 0` cho tất cả các yêu cầu, chỉ có địa chỉ `controller` mới phân biệt trạng thái yêu cầu. Nhiều yêu cầu từ cùng một bộ điều khiển sẽ được tổng hợp lại.

### Sự kiện {#events}

#### Sự kiện DepositRequest {#depositrequest-event}

PHẢI được phát ra khi một yêu cầu nạp được gửi thông qua [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Sự kiện RedeemRequest {#redeemrequest-event}

PHẢI được phát ra khi một yêu cầu quy đổi được gửi thông qua [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Sự kiện OperatorSet {#operatorset-event}

PHẢI được phát ra khi một người vận hành được phê duyệt hoặc thu hồi thông qua [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Các hàm xem trước {#preview-functions}

Các hàm xem trước chỉ được hoàn nguyên đối với các luồng bất đồng bộ, bởi vì tỷ giá hối đoái không được biết cho đến khi yêu cầu được hoàn thành. Trong một kho tiền nạp bất đồng bộ, `previewDeposit` và `previewMint` PHẢI hoàn nguyên, trong khi `previewRedeem` và `previewWithdraw` tiếp tục hoạt động như trong ERC-4626 (và ngược lại đối với kho tiền quy đổi bất đồng bộ). Đây là một sự khác biệt chính về hành vi so với ERC-4626.

## Đọc thêm {#further-reading}

- [EIP-7540: Các kho tiền được token hóa ERC-4626 bất đồng bộ](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Tiêu chuẩn kho tiền được token hóa](https://eips.ethereum.org/EIPS/eip-4626)
- [Triển khai ERC-7540 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)
