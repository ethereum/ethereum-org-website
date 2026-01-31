---
title: "Một số thủ thuật được token lừa đảo sử dụng và cách phát hiện chúng"
description: "Trong hướng dẫn này, chúng tôi phân tích một token lừa đảo để xem một số thủ thuật mà những kẻ lừa đảo sử dụng, cách chúng triển khai và cách chúng ta có thể phát hiện ra chúng."
author: Ori Pomerantz
tags:
  [
    "lừa đảo",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: vi
---

Trong hướng dẫn này, chúng tôi phân tích [một token lừa đảo](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) để xem một số thủ thuật mà những kẻ lừa đảo sử dụng và cách chúng triển khai. Khi kết thúc hướng dẫn, bạn sẽ có cái nhìn toàn diện hơn về các hợp đồng token ERC-20, khả năng của chúng và lý do tại sao sự hoài nghi là cần thiết. Sau đó, chúng tôi xem xét các sự kiện do token lừa đảo đó đưa ra và xem cách chúng ta có thể tự động xác định rằng token đó không hợp pháp.

## Token lừa đảo - chúng là gì, tại sao mọi người tạo ra chúng và làm thế nào để tránh chúng {#scam-tokens}

Một trong những ứng dụng cho Ethereum đó là cho một nhóm tạo ra Token có thể giao dịch, nói đơn giản là tiền tệ của riêng họ. Tuy nhiên, bất kỳ nơi nào có các trường hợp sử dụng hợp pháp mang lại giá trị, cũng có những tên tội phạm cố gắng đánh cắp giá trị đó cho riêng họ.

Bạn có thể đọc thêm về chủ đề này [ở nơi khác trên ethereum.org](/guides/how-to-id-scam-tokens/) từ góc độ người dùng. Hướng dẫn này tập trung vào việc phân tích một token lừa đảo để xem nó được thực hiện như thế nào và cách phát hiện nó.

### Làm cách nào để tôi biết wARB là một trò lừa đảo? {#warb-scam}

Token mà chúng tôi phân tích là [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), nó giả vờ tương đương với [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) hợp pháp.

Cách dễ nhất để biết đâu là token hợp pháp là xem xét tổ chức ban đầu, [Arbitrum](https://arbitrum.foundation/). Các địa chỉ hợp pháp được chỉ định [trong tài liệu của họ](https://docs.arbitrum.foundation/deployment-addresses#token).

### Tại sao mã nguồn lại có sẵn? {#why-source}

Thông thường, chúng tôi mong đợi những người cố gắng lừa đảo người khác sẽ giữ bí mật, và thực tế là nhiều token lừa đảo không có sẵn mã của chúng (ví dụ: [token này](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) và [token này](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Tuy nhiên, các token hợp pháp thường công bố mã nguồn của chúng, vì vậy để có vẻ hợp pháp, tác giả của các token lừa đảo đôi khi cũng làm như vậy. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) là một trong những token có mã nguồn sẵn có, giúp việc tìm hiểu dễ dàng hơn.

Mặc dù người triển khai hợp đồng có thể chọn có công bố mã nguồn hay không, nhưng họ _không thể_ công bố mã nguồn sai. Trình duyệt khối biên dịch mã nguồn được cung cấp một cách độc lập và nếu không nhận được chính xác cùng một chỉ thị biên dịch, nó sẽ từ chối mã nguồn đó. [Bạn có thể đọc thêm về điều này trên trang Etherscan](https://etherscan.io/verifyContract).

## So sánh với các token ERC-20 hợp pháp {#compare-legit-erc20}

Chúng tôi sẽ so sánh token này với các token ERC-20 hợp pháp. Nếu bạn không quen với cách các token ERC-20 hợp pháp thường được viết, [xem hướng dẫn này](/developers/tutorials/erc20-annotated-code/).

### Hằng số cho các địa chỉ đặc quyền {#constants-for-privileged-addresses}

Các hợp đồng đôi khi cần các địa chỉ đặc quyền. Các hợp đồng được thiết kế để sử dụng lâu dài cho phép một số địa chỉ đặc quyền thay đổi các địa chỉ đó, ví dụ như để cho phép sử dụng một hợp đồng multisig mới. Có một số cách để làm điều này.

Hợp đồng token [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) sử dụng mẫu [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Địa chỉ đặc quyền được giữ trong bộ nhớ, trong một trường có tên là `_owner` (xem tệp thứ ba, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Hợp đồng token [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) không có địa chỉ đặc quyền trực tiếp. Tuy nhiên, nó không cần. Nó nằm sau một [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) tại [địa chỉ `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Hợp đồng đó có một địa chỉ đặc quyền (xem tệp thứ tư, `ERC1967Upgrade.sol`) có thể được sử dụng để nâng cấp.

```solidity
    /**
     * @dev Lưu trữ một địa chỉ mới trong slot quản trị EIP1967.
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

[Chủ sở hữu hợp đồng này](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) không phải là một hợp đồng có thể được kiểm soát bởi các tài khoản khác nhau vào những thời điểm khác nhau, mà là một [tài khoản sở hữu ngoại biên](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Điều này có nghĩa là nó có thể được thiết kế để một cá nhân sử dụng trong thời gian ngắn, thay vì là một giải pháp lâu dài để kiểm soát một ERC-20 vẫn còn giá trị.

Và thực vậy, nếu chúng ta xem trên Etherscan, chúng ta sẽ thấy rằng kẻ lừa đảo chỉ sử dụng hợp đồng này trong 12 giờ ([giao dịch đầu tiên](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) đến [giao dịch cuối cùng](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) trong ngày 19 tháng 5 năm 2023.

### Hàm `_transfer` giả mạo {#the-fake-transfer-function}

Thông thường, các giao dịch chuyển tiền thực tế sẽ xảy ra bằng cách sử dụng [một hàm `_transfer` nội bộ](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

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

Nếu chủ sở hữu hợp đồng gửi token, tại sao sự kiện `Transfer` lại cho thấy chúng đến từ `deployer`?

Tuy nhiên, có một vấn đề quan trọng hơn. Ai gọi hàm `_transfer` này? Nó không thể được gọi từ bên ngoài, nó được đánh dấu là `internal`. Và mã chúng tôi có không bao gồm bất kỳ lệnh gọi nào đến `_transfer`. Rõ ràng, nó ở đây như một mồi nhử.

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

Khi chúng ta xem các hàm được gọi để chuyển token, `transfer` và `transferFrom`, chúng ta thấy rằng chúng gọi một hàm hoàn toàn khác, `_f_`.

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

Có hai dấu hiệu đáng báo động tiềm ẩn trong hàm này.

- Việc sử dụng [bộ sửa đổi hàm](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Tuy nhiên, khi xem xét mã nguồn, chúng tôi thấy rằng `_mod_` thực sự vô hại.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Vấn đề tương tự mà chúng tôi đã thấy trong `_transfer`, đó là khi `contract_owner` gửi token, chúng dường như đến từ `deployer`.

### Hàm sự kiện giả mạo `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Bây giờ chúng ta đến với một cái gì đó trông giống như một trò lừa đảo thực sự. Tôi đã chỉnh sửa hàm một chút để dễ đọc hơn, nhưng về mặt chức năng thì nó tương đương.

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

Hạn chế này hoàn toàn hợp lý, vì chúng tôi không muốn các tài khoản ngẫu nhiên phân phối token. Tuy nhiên, phần còn lại của hàm rất đáng ngờ.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Một hàm để chuyển từ một tài khoản pool đến một mảng người nhận một mảng số tiền là hoàn toàn hợp lý. Có nhiều trường hợp sử dụng trong đó bạn sẽ muốn phân phối token từ một nguồn duy nhất đến nhiều điểm đến, chẳng hạn như trả lương, airdrop, v.v. Sẽ rẻ hơn (về gas) nếu thực hiện trong một giao dịch duy nhất thay vì phát hành nhiều giao dịch hoặc thậm chí gọi ERC-20 nhiều lần từ một hợp đồng khác như một phần của cùng một giao dịch.

Tuy nhiên, `dropNewTokens` không làm điều đó. Nó phát ra các [sự kiện `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), nhưng thực sự không chuyển bất kỳ token nào. Không có lý do chính đáng nào để gây nhầm lẫn cho các ứng dụng ngoài chuỗi bằng cách cho chúng biết về một giao dịch chuyển tiền không thực sự xảy ra.

### Hàm `Approve` đốt token {#the-burning-approve-function}

Các hợp đồng ERC-20 được cho là có [hàm `approve`](/developers/tutorials/erc20-annotated-code/#approve) cho các khoản phụ cấp và thực tế token lừa đảo của chúng tôi có một hàm như vậy, và nó thậm chí còn đúng. Tuy nhiên, vì Solidity có nguồn gốc từ C nên nó phân biệt chữ hoa chữ thường. "Approve" và "approve" là các chuỗi khác nhau.

Ngoài ra, chức năng này không liên quan đến `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Hàm này được gọi với một mảng địa chỉ cho những người nắm giữ token.

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

Đối với mỗi địa chỉ người nắm giữ, hàm sẽ chuyển toàn bộ số dư của người nắm giữ đến địa chỉ `0x00...01`, đốt nó một cách hiệu quả (hàm `burn` thực tế trong tiêu chuẩn cũng thay đổi tổng cung và chuyển token đến `0x00...00`). Điều này có nghĩa là `contract_owner` có thể xóa tài sản của bất kỳ người dùng nào. Đó không phải là một tính năng mà bạn muốn có trong một token quản trị.

### Các vấn đề về chất lượng mã {#code-quality-issues}

Những vấn đề về chất lượng mã này không _chứng minh_ rằng mã này là một trò lừa đảo, nhưng chúng khiến nó có vẻ đáng ngờ. Các công ty có tổ chức như Arbitrum thường không phát hành mã tệ như vậy.

#### Hàm `mount` {#the-mount-function}

Mặc dù nó không được chỉ định trong [tiêu chuẩn](https://eips.ethereum.org/EIPS/eip-20), nhưng nói chung, hàm tạo ra các token mới được gọi là [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Nếu chúng ta nhìn vào hàm khởi tạo `wARB`, chúng ta sẽ thấy hàm mint đã được đổi tên thành `mount` vì một lý do nào đó và được gọi năm lần với một phần năm nguồn cung ban đầu, thay vì một lần cho toàn bộ số lượng để đạt hiệu quả.

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

Bản thân hàm `mount` cũng đáng ngờ.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Nhìn vào `require`, chúng ta thấy rằng chỉ chủ sở hữu hợp đồng mới được phép mint. Điều đó là hợp pháp. Nhưng thông báo lỗi phải là _chỉ chủ sở hữu mới được phép mint_ hoặc một cái gì đó tương tự. Thay vào đó, nó là một thông báo không liên quan _ERC20: mint vào địa chỉ không_. Thử nghiệm chính xác cho việc mint vào địa chỉ không là `require(account != address(0), "<error message>")`, mà hợp đồng không bao giờ bận tâm kiểm tra.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Có hai sự kiện đáng ngờ khác, liên quan trực tiếp đến việc mint:

- Có một tham số `account`, có lẽ là tài khoản sẽ nhận số tiền được mint. Nhưng số dư tăng lên thực sự là của `contract_owner`.

- Trong khi số dư tăng thuộc về `contract_owner`, sự kiện được phát ra cho thấy một giao dịch chuyển tiền đến `account`.

### Tại sao lại có cả `auth` và `approver`? Tại sao lại có `mod` không làm gì cả? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

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

`auth` và `approver` có ý nghĩa hơn, vì chúng kiểm tra xem hợp đồng có được gọi bởi `contract_owner` hay không. Chúng tôi mong đợi một số hành động đặc quyền nhất định, chẳng hạn như mint, sẽ bị giới hạn trong tài khoản đó. Tuy nhiên, mục đích của việc có hai hàm riêng biệt thực hiện _chính xác cùng một việc_ là gì?

## Chúng ta có thể tự động phát hiện những gì? {#what-can-we-detect-automatically}

Chúng ta có thể thấy `wARB` là một token lừa đảo bằng cách xem Etherscan. Tuy nhiên, đó là một giải pháp tập trung. Về lý thuyết, Etherscan có thể bị lật đổ hoặc bị tấn công. Tốt hơn là có thể tự mình tìm ra một token có hợp pháp hay không.

Có một số thủ thuật chúng ta có thể sử dụng để xác định rằng một token ERC-20 là đáng ngờ (lừa đảo hoặc được viết rất tệ), bằng cách xem các sự kiện mà chúng phát ra.

## Các sự kiện `Approval` đáng ngờ {#suspicious-approval-events}

Các [sự kiện `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) chỉ nên xảy ra với một yêu cầu trực tiếp (trái ngược với các [sự kiện `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) có thể xảy ra do phụ cấp). [Xem tài liệu Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) để được giải thích chi tiết về vấn đề này và tại sao các yêu cầu cần phải trực tiếp, thay vì thông qua một hợp đồng.

Điều này có nghĩa là các sự kiện `Approval` phê duyệt chi tiêu từ một [tài khoản sở hữu ngoại biên](/developers/docs/accounts/#types-of-account) phải đến từ các giao dịch bắt nguồn từ tài khoản đó và có đích đến là hợp đồng ERC-20. Bất kỳ loại phê duyệt nào khác từ một tài khoản sở hữu ngoại biên đều đáng ngờ.

Đây là [một chương trình xác định loại sự kiện này](https://github.com/qbzzt/20230915-scam-token-detection), sử dụng [viem](https://viem.sh/) và [TypeScript](https://www.typescriptlang.org/docs/), một biến thể JavaScript với an toàn kiểu. Để chạy nó:

1. Sao chép `.env.example` vào `.env`.
2. Chỉnh sửa `.env` để cung cấp URL cho một nút mạng chính Ethereum.
3. Chạy `pnpm install` để cài đặt các gói cần thiết.
4. Chạy `pnpm susApproval` để tìm kiếm các phê duyệt đáng ngờ.

Đây là giải thích từng dòng:

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

Nhập định nghĩa kiểu, hàm và định nghĩa chuỗi từ `viem`.

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

Tạo một ứng dụng Viem. Chúng ta chỉ cần đọc từ chuỗi khối, vì vậy ứng dụng này không cần khoá riêng tư.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Địa chỉ của hợp đồng ERC-20 đáng ngờ và các khối mà chúng tôi sẽ tìm kiếm sự kiện. Các nhà cung cấp nút thường giới hạn khả năng đọc các sự kiện của chúng tôi vì băng thông có thể tốn kém. May mắn là `wARB` không được sử dụng trong khoảng thời gian mười tám giờ, vì vậy chúng ta có thể tìm kiếm tất cả các sự kiện (chỉ có tổng cộng 13 sự kiện).

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

Đây là cách để yêu cầu Viem cung cấp thông tin sự kiện. Khi chúng tôi cung cấp cho nó chữ ký sự kiện chính xác, bao gồm cả tên trường, nó sẽ phân tích cú pháp sự kiện cho chúng tôi.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Thuật toán của chúng tôi chỉ áp dụng cho các tài khoản sở hữu ngoại biên. Nếu có bất kỳ chỉ thị biên dịch nào được trả về bởi `client.getBytecode`, điều đó có nghĩa đây là một hợp đồng và chúng ta nên bỏ qua nó.

Nếu bạn chưa từng sử dụng TypeScript trước đây, định nghĩa hàm có thể trông hơi lạ. Chúng tôi không chỉ cho nó biết tham số đầu tiên (và duy nhất) được gọi là `addr`, mà còn cho biết nó thuộc loại `Address`. Tương tự, phần `: boolean` cho TypeScript biết rằng giá trị trả về của hàm là một giá trị boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Hàm này lấy biên lai giao dịch từ một sự kiện. Chúng tôi cần biên lai để đảm bảo chúng tôi biết đích đến của giao dịch là gì.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Đây là hàm quan trọng nhất, hàm thực sự quyết định một sự kiện có đáng ngờ hay không. Kiểu trả về, `(Event | null)`, cho TypeScript biết rằng hàm này có thể trả về một `Event` hoặc `null`. Chúng tôi trả về `null` nếu sự kiện không đáng ngờ.

```typescript
const owner = ev.args._owner
```

Viem có tên trường, vì vậy nó đã phân tích cú pháp sự kiện cho chúng tôi. `_owner` là chủ sở hữu của các token sẽ được chi tiêu.

```typescript
// Phê duyệt bởi các hợp đồng không đáng ngờ
if (await isContract(owner)) return null
```

Nếu chủ sở hữu là một hợp đồng, hãy cho rằng sự chấp thuận này không đáng ngờ. Để kiểm tra xem sự chấp thuận của một hợp đồng có đáng ngờ hay không, chúng ta sẽ cần phải theo dõi toàn bộ quá trình thực hiện của giao dịch để xem liệu nó có bao giờ đến được hợp đồng của chủ sở hữu hay không, và liệu hợp đồng đó có gọi trực tiếp hợp đồng ERC-20 hay không. Điều đó tốn nhiều tài nguyên hơn chúng ta muốn làm.

```typescript
const txn = await getEventTxn(ev)
```

Nếu sự chấp thuận đến từ một tài khoản sở hữu ngoại biên, hãy lấy giao dịch đã gây ra nó.

```typescript
// Phê duyệt là đáng ngờ nếu nó đến từ một chủ sở hữu EOA không phải là `from` của giao dịch
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Chúng ta không thể chỉ kiểm tra sự bằng nhau của chuỗi vì địa chỉ là hệ thập lục phân, vì vậy chúng chứa các chữ cái. Đôi khi, ví dụ như trong `txn.from`, tất cả các chữ cái đó đều là chữ thường. Trong các trường hợp khác, chẳng hạn như `ev.args._owner`, địa chỉ ở dạng [chữ hoa chữ thường hỗn hợp để xác định lỗi](https://eips.ethereum.org/EIPS/eip-55).

Nhưng nếu giao dịch không phải từ chủ sở hữu và chủ sở hữu đó là sở hữu ngoại biên, thì chúng ta có một giao dịch đáng ngờ.

```typescript
// Nó cũng đáng ngờ nếu đích đến của giao dịch không phải là hợp đồng ERC-20 mà chúng ta đang
// điều tra
if (txn.to.toLowerCase() != testedAddress) return ev
```

Tương tự, nếu địa chỉ `to` của giao dịch, hợp đồng đầu tiên được gọi, không phải là hợp đồng ERC-20 đang được điều tra thì nó đáng ngờ.

```typescript
    // Nếu không có lý do gì để nghi ngờ, hãy trả về null.
    return null
}
```

Nếu không có điều kiện nào là đúng thì sự kiện `Approval` không đáng ngờ.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Một hàm `async`](https://www.w3schools.com/js/js_async.asp) trả về một đối tượng `Promise`. Với cú pháp phổ biến, `await x()`, chúng ta chờ cho `Promise` đó được thực hiện trước khi tiếp tục xử lý. Điều này đơn giản để lập trình và làm theo, nhưng nó cũng không hiệu quả. Trong khi chúng ta đang chờ `Promise` cho một sự kiện cụ thể được thực hiện, chúng ta đã có thể bắt đầu xử lý sự kiện tiếp theo.

Ở đây chúng tôi sử dụng [`map`](https://www.w3schools.com/jsref/jsref_map.asp) để tạo một mảng các đối tượng `Promise`. Sau đó, chúng tôi sử dụng [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) để chờ tất cả các promise đó được giải quyết. Sau đó, chúng tôi [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) các kết quả đó để loại bỏ các sự kiện không đáng ngờ.

### Các sự kiện `Transfer` đáng ngờ {#suspicious-transfer-events}

Một cách khả thi khác để xác định các token lừa đảo là xem chúng có bất kỳ giao dịch chuyển tiền đáng ngờ nào không. Ví dụ: chuyển tiền từ các tài khoản không có nhiều token. Bạn có thể xem [cách triển khai thử nghiệm này](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), nhưng `wARB` không gặp phải vấn đề này.

## Kết luận {#conclusion}

Việc phát hiện tự động các trò lừa đảo ERC-20 bị ảnh hưởng bởi [kết quả âm tính giả](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), bởi vì một trò lừa đảo có thể sử dụng một hợp đồng token ERC-20 hoàn toàn bình thường mà không đại diện cho bất cứ thứ gì thực. Vì vậy, bạn nên luôn cố gắng _lấy địa chỉ token từ một nguồn đáng tin cậy_.

Phát hiện tự động có thể giúp ích trong một số trường hợp nhất định, chẳng hạn như các phần DeFi, nơi có nhiều token và chúng cần được xử lý tự động. Nhưng như mọi khi [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), hãy tự nghiên cứu và khuyến khích người dùng của bạn làm tương tự.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
