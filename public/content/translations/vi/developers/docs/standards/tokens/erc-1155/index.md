---
title: Tiêu chuẩn Đa Token ERC-1155
description: Tìm hiểu về ERC-1155, một tiêu chuẩn đa token kết hợp các token có thể thay thế và không thể thay thế trong một hợp đồng duy nhất.
lang: vi
---

## Giới thiệu {#introduction}

Một giao diện tiêu chuẩn cho các hợp đồng quản lý nhiều loại token. Một hợp đồng được triển khai duy nhất có thể bao gồm bất kỳ sự kết hợp nào của token có thể thay thế, token không thể thay thế hoặc các cấu hình khác (ví dụ: token bán thay thế).

**Tiêu chuẩn Đa Token có nghĩa là gì?**

Ý tưởng này rất đơn giản và tìm cách tạo ra một giao diện hợp đồng thông minh có thể đại diện và kiểm soát bất kỳ số lượng loại token có thể thay thế và không thể thay thế nào. Theo cách này, token ERC-1155 có thể thực hiện các chức năng tương tự như token [ERC-20](/developers/docs/standards/tokens/erc-20/) và [ERC-721](/developers/docs/standards/tokens/erc-721/), và thậm chí cả hai cùng một lúc. Nó cải thiện chức năng của cả hai tiêu chuẩn ERC-20 và ERC-721, giúp nó hiệu quả hơn và sửa chữa các lỗi triển khai rõ ràng.

Token ERC-1155 được mô tả đầy đủ trong [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [các tiêu chuẩn token](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) và [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Các chức năng và tính năng của ERC-1155: {#body}

- [Chuyển hàng loạt](#batch_transfers): Chuyển nhiều tài sản trong một lệnh gọi duy nhất.
- [Số dư hàng loạt](#batch_balance): Lấy số dư của nhiều tài sản trong một lệnh gọi duy nhất.
- [Phê duyệt hàng loạt](#batch_approval): Phê duyệt tất cả các token cho một địa chỉ.
- [Hook](#receive_hook): Hook nhận token.
- [Hỗ trợ NFT](#nft_support): Nếu nguồn cung chỉ là 1, hãy coi nó như một NFT.
- [Quy tắc chuyển an toàn](#safe_transfer_rule): Bộ quy tắc để chuyển an toàn.

### Chuyển hàng loạt {#batch-transfers}

Việc chuyển hàng loạt hoạt động rất giống với các giao dịch chuyển ERC-20 thông thường. Hãy xem hàm `transferFrom` ERC-20 thông thường:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Sự khác biệt duy nhất trong ERC-1155 là chúng ta chuyển các giá trị dưới dạng một mảng và chúng ta cũng chuyển một mảng các id. Ví dụ với `ids=[3, 6, 13]` và `values=[100, 200, 5]`, các giao dịch chuyển kết quả sẽ là

1. Chuyển 100 token có id 3 từ `_from` đến `_to`.
2. Chuyển 200 token có id 6 từ `_from` đến `_to`.
3. Chuyển 5 token có id 13 từ `_from` đến `_to`.

Trong ERC-1155, chúng ta chỉ có `transferFrom`, không có `transfer`. Để sử dụng nó như một `transfer` thông thường, chỉ cần đặt địa chỉ người gửi thành địa chỉ đang gọi hàm.

### Số dư hàng loạt {#batch-balance}

Lệnh gọi `balanceOf` ERC-20 tương ứng cũng có hàm đối tác với sự hỗ trợ hàng loạt. Xin nhắc lại, đây là phiên bản ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Thậm chí còn đơn giản hơn đối với lệnh gọi số dư, chúng ta có thể truy xuất nhiều số dư trong một lệnh gọi duy nhất. Chúng ta chuyển mảng chủ sở hữu, tiếp theo là mảng id token.

Ví dụ với `_ids=[3, 6, 13]` và `_owners=[0xbeef..., 0x1337..., 0x1111...]`, giá trị trả về sẽ là

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Phê duyệt hàng loạt {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Việc phê duyệt hơi khác so với ERC-20. Thay vì phê duyệt các số lượng cụ thể, bạn đặt một nhà điều hành thành được phê duyệt hoặc không được phê duyệt thông qua `setApprovalForAll`.

Việc đọc trạng thái hiện tại có thể được thực hiện thông qua `isApprovedForAll`. Như bạn có thể thấy, đó là một hoạt động tất cả hoặc không có gì. Bạn không thể xác định số lượng token cần phê duyệt hoặc thậm chí là lớp token nào.

Điều này được thiết kế có chủ ý với mục tiêu đơn giản. Bạn chỉ có thể phê duyệt mọi thứ cho một địa chỉ.

### Hook nhận {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Với sự hỗ trợ của [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 hỗ trợ các hook nhận chỉ dành cho các hợp đồng thông minh. Hàm hook phải trả về một giá trị bytes4 kỳ diệu được xác định trước, được đưa ra như sau:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Khi hợp đồng nhận trả về giá trị này, nghĩa là hợp đồng chấp nhận việc chuyển giao và biết cách xử lý các token ERC-1155. Tuyệt vời, không còn token bị kẹt trong hợp đồng nữa!

### Hỗ trợ NFT {#nft-support}

Khi nguồn cung chỉ là một, token về cơ bản là một token không thể thay thế (NFT). Và theo tiêu chuẩn của ERC-721, bạn có thể xác định một URL siêu dữ liệu. URL có thể được đọc và sửa đổi bởi các ứng dụng, xem [tại đây](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Quy tắc chuyển an toàn {#safe-transfer-rule}

Chúng ta đã đề cập đến một vài quy tắc chuyển an toàn trong các giải thích trước đó. Nhưng hãy xem xét các quy tắc quan trọng nhất:

1. Người gọi phải được phê duyệt để chi tiêu các token cho địa chỉ `_from` hoặc người gọi phải bằng `_from`.
2. Lệnh gọi chuyển phải hoàn nguyên nếu
   1. địa chỉ `_to` là 0.
   2. độ dài của `_ids` không giống với độ dài của `_values`.
   3. bất kỳ số dư nào của người nắm giữ đối với các token trong `_ids` thấp hơn số lượng tương ứng trong `_values` được gửi cho người nhận.
   4. bất kỳ lỗi nào khác xảy ra.

_Lưu ý_: Tất cả các hàm hàng loạt bao gồm cả hook cũng tồn tại dưới dạng các phiên bản không có hàng loạt. Điều này được thực hiện để tiết kiệm gas, vì việc chuyển chỉ một tài sản có thể vẫn sẽ là cách được sử dụng phổ biến nhất. Chúng tôi đã bỏ qua chúng để cho đơn giản trong các giải thích, bao gồm cả các quy tắc chuyển an toàn. Tên giống hệt nhau, chỉ cần xóa 'Batch'.

## Đọc thêm {#further-reading}

- [EIP-1155: Tiêu chuẩn Đa Token](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Tài liệu Openzeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repo GitHub](https://github.com/enjin/erc-1155)
- [API NFT của Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
