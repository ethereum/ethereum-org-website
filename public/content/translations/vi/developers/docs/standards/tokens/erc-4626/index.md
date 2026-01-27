---
title: Tiêu chuẩn Kho lưu trữ Token hóa ERC-4626
description: Một tiêu chuẩn cho các kho lưu trữ sinh lợi.
lang: vi
---

## Giới thiệu {#introduction}

ERC-4626 là một tiêu chuẩn để tối ưu hóa và thống nhất các thông số kỹ thuật của các kho lưu trữ sinh lợi. Nó cung cấp một API tiêu chuẩn cho các kho lưu trữ sinh lợi được token hóa, đại diện cho các phần của một token ERC-20 cơ sở duy nhất. ERC-4626 cũng nêu ra một phần mở rộng tùy chọn cho các kho lưu trữ được token hóa sử dụng ERC-20, cung cấp chức năng cơ bản để gửi, rút token và đọc số dư.

**Vai trò của ERC-4626 trong các kho lưu trữ sinh lợi**

Các thị trường cho vay, các công cụ tổng hợp và các token có lãi suất nội tại giúp người dùng tìm được lợi suất tốt nhất trên các token tiền mã hóa của họ bằng cách thực hiện các chiến lược khác nhau. Các chiến lược này được thực hiện với những biến thể nhỏ, có thể dễ bị lỗi hoặc lãng phí tài nguyên phát triển.

ERC-4626 trong các kho lưu trữ sinh lợi sẽ giảm bớt công sức tích hợp và mở khóa quyền truy cập vào lợi suất trong các ứng dụng khác nhau với ít nỗ lực chuyên môn hóa từ các nhà phát triển bằng cách tạo ra các mẫu triển khai nhất quán và mạnh mẽ hơn.

Token ERC-4626 được mô tả đầy đủ trong [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Phần mở rộng kho lưu trữ không đồng bộ (ERC-7540)**

ERC-4626 được tối ưu hóa cho các khoản tiền gửi và quy đổi nguyên tử lên đến một giới hạn. Nếu đạt đến giới hạn, không thể gửi thêm các khoản tiền gửi hoặc quy đổi mới. Hạn chế này không hoạt động tốt đối với bất kỳ hệ thống hợp đồng thông minh nào có các hành động không đồng bộ hoặc độ trễ là điều kiện tiên quyết để giao tiếp với Kho lưu trữ (ví dụ: các giao thức tài sản trong thế giới thực, các giao thức cho vay dưới thế chấp, các giao thức cho vay chuỗi chéo, các token staking thanh khoản hoặc các mô-đun an toàn bảo hiểm).

ERC-7540 mở rộng tiện ích của Kho lưu trữ ERC-4626 cho các trường hợp sử dụng không đồng bộ. Giao diện Kho lưu trữ hiện có (`deposit`/`withdraw`/`mint`/`redeem`) được tận dụng hoàn toàn để yêu cầu các Yêu cầu không đồng bộ.

Phần mở rộng ERC-7540 được mô tả đầy đủ trong [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Phần mở rộng kho lưu trữ đa tài sản (ERC-7575)**

Một trường hợp sử dụng bị thiếu không được ERC-4626 hỗ trợ là các Kho lưu trữ có nhiều tài sản hoặc điểm vào chẳng hạn như token nhà cung cấp thanh khoản (LP). Chúng thường khó sử dụng hoặc không tuân thủ do yêu cầu của ERC-4626 phải là một ERC-20.

ERC-7575 bổ sung hỗ trợ cho các Kho lưu trữ có nhiều tài sản bằng cách bên ngoài hóa việc triển khai token ERC-20 từ việc triển khai ERC-4626.

Phần mở rộng ERC-7575 được mô tả đầy đủ trong [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các tiêu chuẩn token](/developers/docs/standards/tokens/) và [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Các hàm và Tính năng của ERC-4626: {#body}

### Các phương thức {#methods}

#### tài sản {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Hàm này trả về địa chỉ của token cơ sở được sử dụng cho kho lưu trữ để hạch toán, gửi tiền, rút tiền.

#### tổng tài sản {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Hàm này trả về tổng số lượng tài sản cơ sở do kho lưu trữ nắm giữ.

#### chuyển đổi thành cổ phần {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Hàm này trả về số lượng `cổ phần` sẽ được kho lưu trữ trao đổi cho số lượng `tài sản` được cung cấp.

#### chuyển đổi thành tài sản {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Hàm này trả về số lượng `tài sản` sẽ được kho lưu trữ trao đổi cho số lượng `cổ phần` được cung cấp.

#### gửi tiền tối đa {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Hàm này trả về số lượng tối đa tài sản cơ sở có thể được gửi trong một lệnh gọi [`gửi tiền`](#deposit) duy nhất, với các cổ phần được đúc cho `người nhận`.

#### xem trước khi gửi tiền {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc gửi tiền của họ tại khối hiện tại.

#### gửi tiền {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Hàm này gửi `tài sản` của các token cơ sở vào kho lưu trữ và cấp quyền sở hữu `cổ phần` cho `người nhận`.

#### đúc tối đa {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Hàm này trả về số lượng cổ phần tối đa có thể được đúc trong một lệnh gọi [`đúc`](#mint) duy nhất, với các cổ phần được đúc cho `người nhận`.

#### xem trước khi đúc {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc đúc của họ tại khối hiện tại.

#### đúc {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Hàm này đúc chính xác `cổ phần` kho lưu trữ cho `người nhận` bằng cách gửi `tài sản` của các token cơ sở.

#### rút tối đa {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Hàm này trả về số lượng tối đa tài sản cơ sở có thể được rút từ số dư của `chủ sở hữu` bằng một lệnh gọi [`rút`](#withdraw) duy nhất.

#### xem trước khi rút {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc rút tiền của họ tại khối hiện tại.

#### rút {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Hàm này đốt `cổ phần` từ `chủ sở hữu` và gửi chính xác token `tài sản` từ kho lưu trữ đến `người nhận`.

#### quy đổi tối đa {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Hàm này trả về số lượng cổ phần tối đa có thể được quy đổi từ số dư của `chủ sở hữu` thông qua một lệnh gọi [`quy đổi`](#redeem).

#### xem trước khi quy đổi {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Hàm này cho phép người dùng mô phỏng các tác động của việc quy đổi của họ tại khối hiện tại.

#### quy đổi {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Hàm này quy đổi một số lượng `cổ phần` cụ thể từ `chủ sở hữu` và gửi `tài sản` của token cơ sở từ kho lưu trữ đến `người nhận`.

#### tổng cung {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Trả về tổng số lượng cổ phần kho lưu trữ chưa được quy đổi đang lưu hành.

#### số dư của {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Trả về tổng số lượng cổ phần kho lưu trữ mà `chủ sở hữu` hiện có.

### Sơ đồ giao diện {#mapOfTheInterface}

![Sơ đồ giao diện ERC-4626](./map-of-erc-4626.png)

### Sự kiện {#events}

#### Sự kiện Gửi tiền

**PHẢI** được phát ra khi các token được gửi vào kho lưu trữ thông qua các phương thức [`đúc`](#mint) và [`gửi tiền`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Trong đó `người gửi` là người dùng đã trao đổi `tài sản` lấy `cổ phần` và đã chuyển những `cổ phần` đó cho `chủ sở hữu`.

#### Sự kiện Rút tiền

**PHẢI** được phát ra khi cổ phần được rút từ kho lưu trữ bởi một người gửi tiền trong các phương thức [`quy đổi`](#redeem) hoặc [`rút`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Trong đó `người gửi` là người dùng đã kích hoạt việc rút tiền và trao đổi `cổ phần` do `chủ sở hữu` sở hữu lấy `tài sản`. `người nhận` là người dùng đã nhận `tài sản` đã rút.

## Đọc thêm {#further-reading}

- [EIP-4626: Tiêu chuẩn kho lưu trữ được token hóa](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Kho lưu trữ GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
