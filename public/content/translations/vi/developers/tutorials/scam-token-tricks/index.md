---
title: "Một số thủ thuật được sử dụng bởi các token lừa đảo và cách phát hiện chúng"
description: Trong hướng dẫn này, chúng ta sẽ mổ xẻ một token lừa đảo để xem một số thủ thuật mà những kẻ lừa đảo sử dụng, cách chúng triển khai và cách chúng ta có thể phát hiện ra chúng.
author: Ori Pomerantz
tags: ["lừa đảo", "solidity", "erc-20", "javascript", "typescript"]
skill: intermediate
breadcrumb: Các thủ thuật của token lừa đảo
published: 2023-09-15
lang: vi
---

Trong hướng dẫn này, chúng ta sẽ mổ xẻ [một token lừa đảo](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) để xem một số thủ thuật mà những kẻ lừa đảo sử dụng và cách chúng triển khai. Đến cuối hướng dẫn, bạn sẽ có cái nhìn toàn diện hơn về các hợp đồng token ERC-20, khả năng của chúng và lý do tại sao sự hoài nghi là cần thiết. Sau đó, chúng ta sẽ xem xét các sự kiện được phát ra bởi token lừa đảo đó và xem cách chúng ta có thể tự động xác định rằng nó không hợp pháp.

## Token lừa đảo - chúng là gì, tại sao mọi người lại tạo ra chúng và cách phòng tránh {#scam-tokens}

Một trong những ứng dụng phổ biến nhất của Ethereum là để một nhóm tạo ra một token có thể giao dịch, theo một nghĩa nào đó là tiền tệ của riêng họ. Tuy nhiên, ở bất cứ nơi nào có các trường hợp sử dụng hợp pháp mang lại giá trị, ở đó cũng có những kẻ tội phạm cố gắng đánh cắp giá trị đó cho riêng mình.

Bạn có thể đọc thêm về chủ đề này [ở những nơi khác trên ethereum.org](/guides/how-to-id-scam-tokens/) từ góc độ người dùng. Hướng dẫn này tập trung vào việc mổ xẻ một token lừa đảo để xem nó được thực hiện như thế nào và cách phát hiện ra nó.

### Làm sao tôi biết wARB là lừa đảo? {#warb-scam}

Token mà chúng ta mổ xẻ là [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), giả mạo là tương đương với [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) hợp pháp.

Cách dễ nhất để biết đâu là token hợp pháp là nhìn vào tổ chức phát hành, [Arbitrum](https://arbitrum.foundation/). Các địa chỉ hợp pháp được chỉ định [trong tài liệu của họ](https://docs.arbitrum.foundation/deployment-addresses#token).

### Tại sao mã nguồn lại có sẵn? {#why-source}

Thông thường, chúng ta cho rằng những kẻ cố gắng lừa đảo người khác sẽ rất kín đáo, và thực tế là nhiều token lừa đảo không công khai mã nguồn của chúng (ví dụ: [token này](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) và [token này](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Tuy nhiên, các token hợp pháp thường công bố mã nguồn của chúng, vì vậy để tỏ ra hợp pháp, các tác giả của token lừa đảo đôi khi cũng làm như vậy. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) là một trong những token có sẵn mã nguồn, điều này giúp chúng ta dễ dàng hiểu nó hơn.

Mặc dù những người triển khai hợp đồng có thể chọn công bố mã nguồn hay không, nhưng họ _không thể_ công bố sai mã nguồn. Trình khám phá khối biên dịch mã nguồn được cung cấp một cách độc lập và nếu không nhận được mã byte giống hệt nhau, nó sẽ từ chối mã nguồn đó. [Bạn có thể đọc thêm về điều này trên trang web Etherscan](https://etherscan.io/verifyContract).

## So sánh với các token ERC-20 hợp pháp {#compare-legit-erc20}

Chúng ta sẽ so sánh token này với các token ERC-20 hợp pháp. Nếu bạn không quen thuộc với cách các token ERC-20 hợp pháp thường được viết, [hãy xem hướng dẫn này](/developers/tutorials/erc20-annotated-code/).

### Các hằng số cho các địa chỉ đặc quyền {#constants-for-privileged-addresses}

Các hợp đồng đôi khi cần các địa chỉ đặc quyền. Các hợp đồng được thiết kế để sử dụng lâu dài cho phép một số địa chỉ đặc quyền thay đổi các địa chỉ đó, ví dụ như để cho phép sử dụng một hợp đồng đa chữ ký mới. Có một vài cách để thực hiện điều này.

Hợp đồng token [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) sử dụng mẫu [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Địa chỉ đặc quyền được giữ trong bộ nhớ, trong một trường có tên là `_owner` (xem tệp thứ ba, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Hợp đồng token [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) không có địa chỉ đặc quyền trực tiếp. Tuy nhiên, nó không cần một địa chỉ như vậy. Nó nằm sau một [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) tại [địa chỉ `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Hợp đồng đó có một địa chỉ đặc quyền (xem tệp thứ tư, `ERC1967Upgrade.sol`) được sử dụng để nâng cấp.

```solidity
    /**
     * @dev Lưu trữ một địa chỉ mới trong slot admin EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Ngược lại, hợp đồng `wARB` có một `contract_owner` được mã hóa cứng.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Chủ sở hữu hợp đồng này](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) không phải là một hợp đồng có thể được kiểm soát bởi các tài khoản khác nhau vào các thời điểm khác nhau, mà là một [tài khoản thuộc sở hữu bên ngoài](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Điều này có nghĩa là nó có thể được thiết kế để sử dụng ngắn hạn bởi một cá nhân, thay vì là một giải pháp dài hạn để kiểm soát một ERC-20 sẽ duy trì giá trị.

Và thực sự, nếu chúng ta nhìn vào Etherscan, chúng ta thấy rằng kẻ lừa đảo chỉ sử dụng hợp đồng này trong vỏn vẹn 12 giờ (từ [giao dịch đầu tiên](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) đến [giao dịch cuối cùng](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) trong ngày 19 tháng 5 năm 2023.

### Hàm `_transfer` giả mạo {#the-fake-transfer-function}

Theo tiêu chuẩn, các giao dịch chuyển thực tế sẽ diễn ra bằng cách sử dụng [một hàm `_transfer` nội bộ](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Trong `wARB`, hàm này trông gần như hợp pháp:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Phần đáng ngờ là:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Nếu chủ sở hữu hợp đồng chuyển token, tại sao sự kiện `Transfer` lại hiển thị chúng đến từ `deployer`?

Tuy nhiên, có một vấn đề quan trọng hơn. Ai gọi hàm `_transfer` này? Nó không thể được gọi từ bên ngoài, nó được đánh dấu là `internal`. Và mã mà chúng ta có không bao gồm bất kỳ lệnh gọi nào đến `_transfer`. Rõ ràng, nó ở đây như một mồi nhử.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Khi chúng ta xem xét các hàm được gọi để chuyển token, `transfer` và `transferFrom`, chúng ta thấy rằng chúng gọi một hàm hoàn toàn khác, `_f_`.

### Hàm `_f_` thực sự {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Có hai dấu hiệu cảnh báo tiềm ẩn trong hàm này.

- Việc sử dụng [công cụ sửa đổi hàm](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Tuy nhiên, khi chúng ta xem xét mã nguồn, chúng ta thấy rằng `_mod_` thực sự vô hại.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Vấn đề tương tự mà chúng ta đã thấy trong `_transfer`, đó là khi `contract_owner` chuyển token, chúng dường như đến từ `deployer`.

### Hàm sự kiện giả mạo `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Bây giờ chúng ta đến với một thứ trông giống như một trò lừa đảo thực sự. Tôi đã chỉnh sửa hàm một chút để dễ đọc hơn, nhưng về mặt chức năng thì nó tương đương.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Hàm này có công cụ sửa đổi `auth()`, có nghĩa là nó chỉ có thể được gọi bởi chủ sở hữu hợp đồng.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Hạn chế này hoàn toàn hợp lý, bởi vì chúng ta không muốn các tài khoản ngẫu nhiên phân phối token. Tuy nhiên, phần còn lại của hàm lại rất đáng ngờ.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Một hàm để chuyển từ một tài khoản chung đến một mảng người nhận với một mảng số lượng là hoàn toàn hợp lý. Có nhiều trường hợp sử dụng mà bạn sẽ muốn phân phối token từ một nguồn duy nhất đến nhiều đích, chẳng hạn như trả lương, airdrop, v.v. Việc thực hiện trong một giao dịch duy nhất sẽ rẻ hơn (về Gas) thay vì phát hành nhiều giao dịch, hoặc thậm chí gọi ERC-20 nhiều lần từ một hợp đồng khác như một phần của cùng một giao dịch.

Tuy nhiên, `dropNewTokens` không làm điều đó. Nó phát ra [các sự kiện `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), nhưng không thực sự chuyển bất kỳ token nào. Không có lý do chính đáng nào để gây nhầm lẫn cho các ứng dụng ngoài chuỗi bằng cách thông báo cho chúng về một giao dịch chuyển không thực sự xảy ra.

### Hàm đốt `Approve` {#the-burning-approve-function}

Các hợp đồng ERC-20 được cho là có [một hàm `approve`](/developers/tutorials/erc20-annotated-code/#approve) cho các hạn mức, và thực sự token lừa đảo của chúng ta có một hàm như vậy, và nó thậm chí còn chính xác. Tuy nhiên, vì Solidity bắt nguồn từ C nên nó phân biệt chữ hoa chữ thường. "Approve" và "approve" là các chuỗi khác nhau.

Ngoài ra, chức năng này không liên quan đến `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Hàm này được gọi với một mảng các địa chỉ của những người nắm giữ token.

```solidity
    public approver() {
```

Công cụ sửa đổi `approver()` đảm bảo chỉ `contract_owner` mới được phép gọi hàm này (xem bên dưới).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Đối với mỗi địa chỉ người nắm giữ, hàm sẽ chuyển toàn bộ số dư của người nắm giữ đến địa chỉ `0x00...01`, thực chất là đốt nó (hàm `burn` thực tế trong tiêu chuẩn cũng thay đổi tổng nguồn cung và chuyển các token đến `0x00...00`). Điều này có nghĩa là `contract_owner` có thể xóa tài sản của bất kỳ người dùng nào. Đó dường như không phải là một tính năng mà bạn muốn có trong một token quản trị.

### Các vấn đề về chất lượng mã {#code-quality-issues}

Những vấn đề về chất lượng mã này không _chứng minh_ rằng mã này là lừa đảo, nhưng chúng làm cho nó có vẻ đáng ngờ. Các công ty có tổ chức như Arbitrum thường không phát hành mã tệ như thế này.

#### Hàm `mount` {#the-mount-function}

Mặc dù nó không được chỉ định trong [tiêu chuẩn](https://eips.ethereum.org/EIPS/eip-20), nhưng nói chung hàm tạo ra các token mới được gọi là [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Nếu chúng ta nhìn vào hàm khởi tạo `wARB`, chúng ta thấy hàm đúc thời gian đã được đổi tên thành `mount` vì một lý do nào đó, và được gọi năm lần với một phần năm nguồn cung ban đầu, thay vì một lần cho toàn bộ số lượng để đạt hiệu quả.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Bản thân hàm `mount` cũng rất đáng ngờ.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Nhìn vào `require`, chúng ta thấy rằng chỉ chủ sở hữu hợp đồng mới được phép đúc. Điều đó là hợp pháp. Nhưng thông báo lỗi nên là _chỉ chủ sở hữu mới được phép đúc_ hoặc một cái gì đó tương tự. Thay vào đó, nó lại là thông báo không liên quan _ERC20: mint to the zero address_. Bài kiểm tra chính xác cho việc đúc đến địa chỉ zero là `require(account != address(0), "<error message>")`, mà hợp đồng không bao giờ bận tâm kiểm tra.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Có thêm hai sự thật đáng ngờ, liên quan trực tiếp đến việc đúc:

- Có một tham số `account`, có lẽ là tài khoản sẽ nhận được số lượng được đúc. Nhưng số dư tăng lên thực sự lại là của `contract_owner`.

- Mặc dù số dư tăng lên thuộc về `contract_owner`, sự kiện được phát ra lại hiển thị một giao dịch chuyển đến `account`.

### Tại sao lại có cả `auth` và `approver`? Tại sao lại có `mod` mà không làm gì cả? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Hợp đồng này chứa ba công cụ sửa đổi: `_mod_`, `auth` và `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` nhận ba tham số và không làm gì với chúng. Tại sao lại có nó?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` và `approver` có ý nghĩa hơn, bởi vì chúng kiểm tra xem hợp đồng có được gọi bởi `contract_owner` hay không. Chúng ta mong đợi một số hành động đặc quyền nhất định, chẳng hạn như việc đúc, sẽ bị giới hạn ở tài khoản đó. Tuy nhiên, mục đích của việc có hai hàm riêng biệt làm _chính xác cùng một việc_ là gì?

## Chúng ta có thể tự động phát hiện điều gì? {#what-can-we-detect-automatically}

Chúng ta có thể thấy rằng `wARB` là một token lừa đảo bằng cách nhìn vào Etherscan. Tuy nhiên, đó là một giải pháp tập trung. Về lý thuyết, Etherscan có thể bị phá hoại hoặc bị hack. Tốt hơn là có thể tự độc lập tìm ra liệu một token có hợp pháp hay không.

Có một số thủ thuật mà chúng ta có thể sử dụng để xác định rằng một token ERC-20 là đáng ngờ (có thể là lừa đảo hoặc được viết rất tệ), bằng cách xem xét các sự kiện mà chúng phát ra.

## Các sự kiện `Approval` đáng ngờ {#suspicious-approval-events}

[Các sự kiện `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) chỉ nên xảy ra với một yêu cầu trực tiếp (ngược lại với [các sự kiện `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) có thể xảy ra do một hạn mức). [Xem tài liệu Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) để biết giải thích chi tiết về vấn đề này và lý do tại sao các yêu cầu cần phải trực tiếp, thay vì được trung gian bởi một hợp đồng.

Điều này có nghĩa là các sự kiện `Approval` chấp thuận việc chi tiêu từ một [tài khoản thuộc sở hữu bên ngoài](/developers/docs/accounts/#types-of-account) phải đến từ các giao dịch bắt nguồn từ tài khoản đó và có đích đến là hợp đồng ERC-20. Bất kỳ loại chấp thuận nào khác từ một tài khoản thuộc sở hữu bên ngoài đều đáng ngờ.

Dưới đây là [một chương trình xác định loại sự kiện này](https://github.com/qbzzt/20230915-scam-token-detection), sử dụng [Viem](https://viem.sh/) và [TypeScript](https://www.typescriptlang.org/docs/), một biến thể JavaScript có tính an toàn kiểu. Để chạy nó:

1. Sao chép `.env.example` thành `.env`.
2. Chỉnh sửa `.env` để cung cấp URL đến một nút Mạng chính Ethereum.
3. Chạy `pnpm install` để cài đặt các gói cần thiết.
4. Chạy `pnpm susApproval` để tìm kiếm các chấp thuận đáng ngờ.

Dưới đây là giải thích từng dòng:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Nhập các định nghĩa kiểu, các hàm và định nghĩa chuỗi từ `viem`.

```typescript
import { config } from "dotenv"
config()
```

Đọc `.env` để lấy URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Tạo một máy khách Viem. Chúng ta chỉ cần đọc từ chuỗi khối, vì vậy máy khách này không cần khóa riêng tư.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Địa chỉ của hợp đồng ERC-20 đáng ngờ và các khối mà trong đó chúng ta sẽ tìm kiếm các sự kiện. Các nhà cung cấp nút thường giới hạn khả năng đọc các sự kiện của chúng ta vì băng thông có thể trở nên đắt đỏ. May mắn thay, `wARB` đã không được sử dụng trong khoảng thời gian mười tám giờ, vì vậy chúng ta có thể tìm kiếm tất cả các sự kiện (chỉ có tổng cộng 13 sự kiện).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Đây là cách để yêu cầu Viem cung cấp thông tin sự kiện. Khi chúng ta cung cấp cho nó chữ ký sự kiện chính xác, bao gồm cả tên trường, nó sẽ phân tích cú pháp sự kiện cho chúng ta.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Thuật toán của chúng ta chỉ áp dụng cho các tài khoản thuộc sở hữu bên ngoài. Nếu có bất kỳ mã byte nào được trả về bởi `client.getBytecode`, điều đó có nghĩa đây là một hợp đồng và chúng ta chỉ nên bỏ qua nó.

Nếu bạn chưa từng sử dụng TypeScript trước đây, định nghĩa hàm có thể trông hơi kỳ lạ. Chúng ta không chỉ nói với nó rằng tham số đầu tiên (và duy nhất) được gọi là `addr`, mà còn cho biết nó thuộc kiểu `Address`. Tương tự, phần `: boolean` cho TypeScript biết rằng giá trị trả về của hàm là một boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Hàm này lấy biên lai giao dịch từ một sự kiện. Chúng ta cần biên lai để đảm bảo chúng ta biết đích đến của giao dịch là gì.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Đây là hàm quan trọng nhất, hàm thực sự quyết định xem một sự kiện có đáng ngờ hay không. Kiểu trả về, `(Event | null)`, cho TypeScript biết rằng hàm này có thể trả về một `Event` hoặc `null`. Chúng ta trả về `null` nếu sự kiện không đáng ngờ.

```typescript
const owner = ev.args._owner
```

Viem có các tên trường, vì vậy nó đã phân tích cú pháp sự kiện cho chúng ta. `_owner` là chủ sở hữu của các token sẽ được chi tiêu.

```typescript
// Sự chấp thuận bởi các hợp đồng là không đáng ngờ
if (await isContract(owner)) return null
```

Nếu chủ sở hữu là một hợp đồng, hãy giả định rằng sự chấp thuận này không đáng ngờ. Để kiểm tra xem sự chấp thuận của một hợp đồng có đáng ngờ hay không, chúng ta sẽ cần theo dõi toàn bộ quá trình thực thi của giao dịch để xem liệu nó có bao giờ đến được hợp đồng chủ sở hữu hay không, và liệu hợp đồng đó có gọi trực tiếp hợp đồng ERC-20 hay không. Việc đó tốn nhiều tài nguyên hơn nhiều so với những gì chúng ta muốn làm.

```typescript
const txn = await getEventTxn(ev)
```

Nếu sự chấp thuận đến từ một tài khoản thuộc sở hữu bên ngoài, hãy lấy giao dịch đã gây ra nó.

```typescript
// Sự chấp thuận là đáng ngờ nếu nó đến từ một chủ sở hữu EOA không phải là `from` của giao dịch
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Chúng ta không thể chỉ kiểm tra sự bằng nhau của chuỗi vì các địa chỉ là hệ thập lục phân, do đó chúng chứa các chữ cái. Đôi khi, ví dụ như trong `txn.from`, những chữ cái đó đều là chữ thường. Trong các trường hợp khác, chẳng hạn như `ev.args._owner`, địa chỉ ở dạng [chữ hoa chữ thường hỗn hợp để nhận dạng lỗi](https://eips.ethereum.org/EIPS/eip-55).

Nhưng nếu giao dịch không phải từ chủ sở hữu và chủ sở hữu đó thuộc sở hữu bên ngoài, thì chúng ta có một giao dịch đáng ngờ.

```typescript
// Nó cũng đáng ngờ nếu đích đến của giao dịch không phải là hợp đồng ERC-20 mà chúng ta đang
// điều tra
if (txn.to.toLowerCase() != testedAddress) return ev
```

Tương tự, nếu địa chỉ `to` của giao dịch, hợp đồng đầu tiên được gọi, không phải là hợp đồng ERC-20 đang được điều tra thì nó rất đáng ngờ.

```typescript
    // Nếu không có lý do gì để nghi ngờ, trả về null.
    return null
}
```

Nếu không có điều kiện nào đúng thì sự kiện `Approval` không đáng ngờ.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Một hàm `async`](https://www.w3schools.com/js/js_async.asp) trả về một đối tượng `Promise`. Với cú pháp phổ biến, `await x()`, chúng ta đợi `Promise` đó được hoàn thành trước khi tiếp tục xử lý. Điều này rất đơn giản để lập trình và theo dõi, nhưng nó cũng không hiệu quả. Trong khi chúng ta đang chờ `Promise` cho một sự kiện cụ thể được hoàn thành, chúng ta đã có thể bắt tay vào làm việc với sự kiện tiếp theo.

Ở đây chúng ta sử dụng [`map`](https://www.w3schools.com/jsref/jsref_map.asp) để tạo một mảng các đối tượng `Promise`. Sau đó, chúng ta sử dụng [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) để đợi tất cả các promise đó được giải quyết. Sau đó, chúng ta [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) các kết quả đó để loại bỏ các sự kiện không đáng ngờ.

### Các sự kiện `Transfer` đáng ngờ {#suspicious-transfer-events}

Một cách khác có thể để xác định các token lừa đảo là xem liệu chúng có bất kỳ giao dịch chuyển nào đáng ngờ hay không. Ví dụ: các giao dịch chuyển từ các tài khoản không có nhiều token như vậy. Bạn có thể xem [cách triển khai bài kiểm tra này](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), nhưng `wARB` không gặp vấn đề này.

## Kết luận {#conclusion}

Việc tự động phát hiện các trò lừa đảo ERC-20 gặp phải [âm tính giả](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), bởi vì một trò lừa đảo có thể sử dụng một hợp đồng token ERC-20 hoàn toàn bình thường mà chỉ là không đại diện cho bất cứ điều gì thực tế. Vì vậy, bạn nên luôn cố gắng _lấy địa chỉ token từ một nguồn đáng tin cậy_.

Việc tự động phát hiện có thể giúp ích trong một số trường hợp nhất định, chẳng hạn như các phần của tài chính phi tập trung (DeFi), nơi có nhiều token và chúng cần được xử lý tự động. Nhưng như thường lệ, [người mua hãy cẩn thận](https://www.investopedia.com/terms/c/caveatemptor.asp), hãy tự nghiên cứu và khuyến khích người dùng của bạn làm điều tương tự.

[Xem tại đây để biết thêm về công việc của tôi](https://cryptodocguy.pro/).