---
title: "Tiêu chuẩn kho tiền được token hóa ERC-4626"
description: "Một tiêu chuẩn cho các kho tiền sinh lời."
lang: vi
---

## Giới thiệu {#introduction}

ERC-4626 là một tiêu chuẩn để tối ưu hóa và thống nhất các thông số kỹ thuật của các kho tiền sinh lời. Nó cung cấp một API tiêu chuẩn cho các kho tiền sinh lời được token hóa đại diện cho cổ phần của một token ERC-20 cơ sở duy nhất. ERC-4626 cũng phác thảo một tiện ích mở rộng tùy chọn cho các kho tiền được token hóa sử dụng ERC-20, cung cấp chức năng cơ bản để gửi tiền, rút tiền token và đọc số dư.

**Vai trò của ERC-4626 trong các kho tiền sinh lời**

Các thị trường cho vay, công cụ tổng hợp và các token có khả năng sinh lãi nội tại giúp người dùng tìm thấy lợi nhuận tốt nhất trên các token tiền mã hóa của họ bằng cách thực hiện các chiến lược khác nhau. Các chiến lược này được thực hiện với một chút biến thể, điều này có thể dễ gây ra lỗi hoặc lãng phí tài nguyên phát triển.

ERC-4626 trong các kho tiền sinh lời sẽ làm giảm nỗ lực tích hợp và mở khóa quyền truy cập vào lợi nhuận trong các ứng dụng khác nhau với ít nỗ lực chuyên môn từ các nhà phát triển bằng cách tạo ra các mô hình triển khai nhất quán và mạnh mẽ hơn.

Token ERC-4626 được mô tả đầy đủ trong [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Tiện ích mở rộng kho tiền bất đồng bộ (ERC-7540)**

ERC-4626 được tối ưu hóa cho các khoản tiền gửi và quy đổi nguyên tử (atomic) lên đến một giới hạn. Nếu đạt đến giới hạn, không có khoản tiền gửi hoặc quy đổi mới nào có thể được gửi. Hạn chế này không hoạt động tốt đối với bất kỳ hệ thống hợp đồng thông minh nào có các hành động bất đồng bộ hoặc sự chậm trễ như một điều kiện tiên quyết để giao tiếp với Kho tiền (ví dụ: các giao thức tài sản thế giới thực, các giao thức cho vay dưới mức thế chấp, các giao thức cho vay chuỗi chéo, token staking thanh khoản (LST) hoặc các mô-đun an toàn bảo hiểm).

ERC-7540 mở rộng tiện ích của các Kho tiền ERC-4626 cho các trường hợp sử dụng bất đồng bộ. Giao diện Kho tiền hiện có (`deposit`/`withdraw`/`mint`/`redeem`) được sử dụng đầy đủ để yêu cầu nhận các Yêu cầu bất đồng bộ.

Tiện ích mở rộng ERC-7540 được mô tả đầy đủ trong [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Tiện ích mở rộng kho tiền đa tài sản (ERC-7575)**

Một trường hợp sử dụng còn thiếu không được ERC-4626 hỗ trợ là các Kho tiền có nhiều tài sản hoặc điểm vào như Token của nhà cung cấp thanh khoản (LP). Những điều này thường cồng kềnh hoặc không tuân thủ do yêu cầu của ERC-4626 là bản thân nó phải là một ERC-20.

ERC-7575 bổ sung hỗ trợ cho các Kho tiền có nhiều tài sản bằng cách tách biệt việc triển khai token ERC-20 khỏi việc triển khai ERC-4626.

Tiện ích mở rộng ERC-7575 được mô tả đầy đủ trong [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [các tiêu chuẩn token](/developers/docs/standards/tokens/) và [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Các hàm và tính năng của ERC-4626: {#body}

### Các phương thức {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Hàm này trả về địa chỉ của token cơ sở được sử dụng cho kho tiền để kế toán, gửi tiền, rút tiền.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Hàm này trả về tổng số lượng tài sản cơ sở được giữ bởi kho tiền.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Hàm này trả về số lượng `shares` sẽ được kho tiền trao đổi cho số lượng `assets` được cung cấp.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Hàm này trả về số lượng `assets` sẽ được kho tiền trao đổi cho số lượng `shares` được cung cấp.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Hàm này trả về số lượng tài sản cơ sở tối đa có thể được gửi trong một lệnh gọi [`deposit`](#deposit) duy nhất, với các cổ phần được đúc cho `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Hàm này cho phép người dùng mô phỏng các tác động của khoản tiền gửi của họ tại khối hiện tại.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Hàm này gửi `assets` token cơ sở vào kho tiền và cấp quyền sở hữu `shares` cho `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Hàm này trả về số lượng cổ phần tối đa có thể được đúc trong một lệnh gọi [`mint`](#mint) duy nhất, với các cổ phần được đúc cho `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc đúc của họ tại khối hiện tại.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Hàm này đúc chính xác `shares` cổ phần kho tiền cho `receiver` bằng cách gửi `assets` token cơ sở.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Hàm này trả về số lượng tài sản cơ sở tối đa có thể được rút từ số dư `owner` bằng một lệnh gọi [`withdraw`](#withdraw) duy nhất.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc rút tiền của họ tại khối hiện tại.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Hàm này đốt `shares` từ `owner` và gửi chính xác `assets` token từ kho tiền đến `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Hàm này trả về số lượng cổ phần tối đa có thể được quy đổi từ số dư `owner` thông qua một lệnh gọi [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc quy đổi của họ tại khối hiện tại.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Hàm này quy đổi một số lượng `shares` cụ thể từ `owner` và gửi `assets` token cơ sở từ kho tiền đến `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Trả về tổng số lượng cổ phần kho tiền chưa được quy đổi đang lưu hành.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Trả về tổng số lượng cổ phần kho tiền mà `owner` hiện đang có.

### Bản đồ giao diện {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Các sự kiện {#events}

#### Sự kiện Deposit {#deposit-event}

**PHẢI** được phát ra khi các token được gửi vào kho tiền thông qua các phương thức [`mint`](#mint) và [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Trong đó `sender` là người dùng đã trao đổi `assets` lấy `shares`, và đã chuyển những `shares` đó cho `owner`.

#### Sự kiện Withdraw {#withdraw-event}

**PHẢI** được phát ra khi các cổ phần được rút khỏi kho tiền bởi một người gửi tiền trong các phương thức [`redeem`](#redeem) hoặc [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Trong đó `sender` là người dùng đã kích hoạt việc rút tiền và trao đổi `shares`, thuộc sở hữu của `owner`, lấy `assets`. `receiver` là người dùng đã nhận được `assets` được rút.

## Đọc thêm {#further-reading}

- [EIP-4626: Tiêu chuẩn kho tiền được token hóa](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Kho lưu trữ GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)