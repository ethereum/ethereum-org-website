---
title: "ERC-20 với các biện pháp an toàn"
description: "Cách giúp mọi người tránh những sai lầm ngớ ngẩn"
author: Ori Pomerantz
lang: vi
tags:
  - erc-20
skill: beginner
breadcrumb: "An toàn ERC-20"
published: 2022-08-15
---

## Giới thiệu {#introduction}

Một trong những điều tuyệt vời về Ethereum là không có cơ quan trung ương nào có thể sửa đổi hoặc hoàn tác các giao dịch của bạn. Một trong những vấn đề lớn với Ethereum là không có cơ quan trung ương nào có quyền hoàn tác các sai lầm của người dùng hoặc các giao dịch bất hợp pháp. Trong bài viết này, bạn sẽ tìm hiểu về một số sai lầm phổ biến mà người dùng mắc phải với các token [ERC-20](/developers/docs/standards/tokens/erc-20/), cũng như cách tạo các hợp đồng ERC-20 giúp người dùng tránh những sai lầm đó, hoặc trao cho cơ quan trung ương một số quyền hạn (ví dụ như đóng băng tài khoản).

Lưu ý rằng mặc dù chúng ta sẽ sử dụng [hợp đồng token ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), bài viết này không giải thích chi tiết về nó. Bạn có thể tìm thấy thông tin này [tại đây](/developers/tutorials/erc20-annotated-code).

Nếu bạn muốn xem toàn bộ mã nguồn:

1. Mở [Remix IDE](https://remix.ethereum.org/).
2. Nhấp vào biểu tượng clone GitHub (![biểu tượng clone GitHub](icon-clone.png)).
3. Clone kho lưu trữ GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Mở **contracts > erc20-safety-rails.sol**.

Lưu ý rằng kho lưu trữ được viết cho OpenZeppelin Contracts 4.7.2, trong đó hàm mà bài viết này ghi đè được gọi là `_beforeTokenTransfer`. Bài viết này sử dụng OpenZeppelin Contracts 5.x hiện tại, trong đó bạn ghi đè `_update` thay thế, vì vậy mã trong bài viết này hơi khác so với mã trong kho lưu trữ.

## Tạo một hợp đồng ERC-20 {#creating-an-erc-20-contract}

Trước khi có thể thêm chức năng biện pháp an toàn, chúng ta cần một hợp đồng ERC-20. Trong bài viết này, chúng ta sẽ sử dụng [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Mở nó trong một trình duyệt khác và làm theo các hướng dẫn sau:

1. Chọn **ERC20**.
2. Nhập các cài đặt sau:

   | Tham số | Giá trị |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None (bỏ chọn **Permit**) |
   | Access Control | Ownable |
   | Upgradability | None |

3. Cuộn lên và nhấp vào **Open in Remix** (đối với Remix) hoặc **Download** để sử dụng một môi trường khác. Tôi sẽ giả định rằng bạn đang sử dụng Remix, nếu bạn sử dụng thứ khác, chỉ cần thực hiện các thay đổi phù hợp.
4. Bây giờ chúng ta đã có một hợp đồng ERC-20 đầy đủ chức năng. Bạn có thể mở rộng `.deps` > `npm` để xem mã đã nhập.
5. Biên dịch, triển khai và thử nghiệm với hợp đồng để xem nó hoạt động như một hợp đồng ERC-20. Nếu bạn cần tìm hiểu cách sử dụng Remix, [hãy sử dụng hướng dẫn này](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Những sai lầm phổ biến {#common-mistakes}

### Các sai lầm {#the-mistakes}

Người dùng đôi khi chuyển token đến sai địa chỉ. Mặc dù chúng ta không thể đọc được suy nghĩ của họ để biết họ định làm gì, nhưng có hai loại lỗi xảy ra rất nhiều và dễ phát hiện:

1. Chuyển token đến chính địa chỉ của hợp đồng. Ví dụ, [token OP của Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) đã tích lũy được [hơn 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP trong vòng chưa đầy hai tháng. Điều này đại diện cho một lượng tài sản đáng kể mà có lẽ mọi người đã đánh mất.

2. Chuyển token đến một địa chỉ trống, một địa chỉ không tương ứng với [tài khoản thuộc sở hữu bên ngoài (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) hoặc một [hợp đồng thông minh](/developers/docs/smart-contracts). Mặc dù tôi không có số liệu thống kê về mức độ thường xuyên xảy ra điều này, nhưng [một sự cố có thể đã gây thiệt hại 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Ngăn chặn việc chuyển {#preventing-transfers}

Trong hợp đồng ERC-20 của OpenZeppelin, mọi thay đổi về số dư, cho dù đó là chuyển, đúc hay đốt, đều đi qua [một hàm nội bộ, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Chúng ta có thể ghi đè nó để gắn chức năng của riêng mình vào đó, chẳng hạn như các kiểm tra sẽ hoàn nguyên nếu có vấn đề.

Để làm như vậy, hãy thêm hàm này sau hàm khởi tạo:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Một số phần của hàm này có thể mới nếu bạn không quá quen thuộc với Solidity:

```solidity
        internal virtual
```

Từ khóa `virtual` có nghĩa là giống như chúng ta đã kế thừa chức năng từ `ERC20` và ghi đè hàm này, các hợp đồng khác có thể kế thừa từ chúng ta và ghi đè hàm này.

```solidity
        override(ERC20)
```

Chúng ta phải chỉ định rõ ràng rằng chúng ta đang [ghi đè](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) định nghĩa token ERC20 của `_update`. Nhìn chung, các định nghĩa rõ ràng tốt hơn nhiều so với các định nghĩa ngầm định, từ quan điểm bảo mật - bạn không thể quên rằng mình đã làm điều gì đó nếu nó ở ngay trước mắt bạn. Đó cũng là lý do chúng ta cần chỉ định `_update` của lớp cha nào mà chúng ta đang ghi đè.

```solidity
        super._update(from, to, value);
```

Dòng này gọi hàm `_update` của hợp đồng hoặc các hợp đồng mà chúng ta đã kế thừa có chứa nó. Trong trường hợp này, đó chỉ là `ERC20`, `Ownable` không có hàm này. Không giống như một hook trống, `ERC20._update` là thứ thực sự di chuyển các token, vì vậy việc gọi nó là điều cần thiết. Các kiểm tra của chúng ta diễn ra trước lệnh gọi này, vì vậy chúng có thể hoàn nguyên trước bất kỳ thay đổi số dư nào.

### Lập trình các yêu cầu {#coding-the-requirements}

Chúng ta muốn thêm các yêu cầu này vào hàm. Bởi vì `_update` cũng được gọi khi các token bị đốt, với `to` được đặt thành `address(0)`, chúng ta chỉ kiểm tra `to` khi nó không phải là `address(0)`:

- Địa chỉ `to` không thể bằng `address(this)`, địa chỉ của chính hợp đồng ERC-20.
- Địa chỉ `to` không thể trống, nó phải là một trong hai:
  - Một tài khoản thuộc sở hữu bên ngoài (EOA). Chúng ta không thể kiểm tra trực tiếp xem một địa chỉ có phải là EOA hay không, nhưng chúng ta có thể kiểm tra số dư ETH của một địa chỉ. Các EOA hầu như luôn có số dư, ngay cả khi chúng không còn được sử dụng - rất khó để xóa chúng đến Wei cuối cùng.
  - Một hợp đồng thông minh. Việc kiểm tra xem một địa chỉ có phải là hợp đồng thông minh hay không khó hơn một chút. Có một mã lệnh kiểm tra độ dài mã bên ngoài, được gọi là [`EXTCODESIZE`](https://www.evm.codes/#3b). Trong Solidity, bạn có thể lấy nó bằng [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), mà trình biên dịch sẽ chuyển thành `EXTCODESIZE`. Ở đây chúng ta sử dụng [Yul](https://docs.soliditylang.org/en/latest/yul.html), là hợp ngữ EVM, để chỉ ra cách gọi trực tiếp mã lệnh. Lưu ý rằng kể từ [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), một EOA cũng có thể có mã (một sự ủy quyền cho một hợp đồng), vì vậy kiểm tra này xác định các tài khoản có mã, không hoàn toàn là các hợp đồng. Đối với mục đích của chúng ta, từ chối các địa chỉ trống, điều đó là ổn.

Dưới đây là hàm hoàn chỉnh:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Việc đốt gửi token đến Địa chỉ(0), đừng chặn nó
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Hãy xem qua từng dòng mã mới:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Đây là yêu cầu đầu tiên, kiểm tra xem `to` và `this(address)` không giống nhau.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Đây là cách chúng ta kiểm tra xem một địa chỉ có phải là hợp đồng hay không. Chúng ta không thể nhận đầu ra trực tiếp từ Yul, vì vậy thay vào đó chúng ta định nghĩa một biến để giữ kết quả (trong trường hợp này là `isToContract`). Cách Yul hoạt động là mọi mã lệnh đều được coi là một hàm. Vì vậy, trước tiên chúng ta gọi [`EXTCODESIZE`](https://www.evm.codes/#3b) để lấy kích thước hợp đồng, và sau đó sử dụng [`GT`](https://www.evm.codes/#11) để kiểm tra xem nó không bằng không (chúng ta đang xử lý các số nguyên không dấu, vì vậy tất nhiên nó không thể âm). Sau đó, chúng ta ghi kết quả vào `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Và cuối cùng, chúng ta có kiểm tra thực tế cho các địa chỉ trống.

## Quyền truy cập quản trị {#admin-access}

Đôi khi việc có một quản trị viên có thể hoàn tác các sai lầm là rất hữu ích. Để giảm thiểu khả năng lạm dụng, quản trị viên này có thể là một [đa chữ ký](https://blog.logrocket.com/security-choices-multi-signature-wallets/) để nhiều người phải đồng ý về một hành động. Trong bài viết này, chúng ta sẽ có hai tính năng quản trị:

1. Đóng băng và hủy đóng băng tài khoản. Điều này có thể hữu ích, ví dụ, khi một tài khoản có thể bị xâm phạm.
2. Dọn dẹp tài sản.

   Đôi khi những kẻ lừa đảo chuyển các token gian lận đến hợp đồng của token thật để đạt được tính hợp pháp. Ví dụ, [xem tại đây](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Hợp đồng ERC-20 hợp pháp là [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Kẻ lừa đảo giả mạo nó là [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Cũng có khả năng mọi người chuyển nhầm các token ERC-20 hợp pháp đến hợp đồng của chúng ta, đây là một lý do khác để muốn có cách lấy chúng ra.

OpenZeppelin cung cấp hai cơ chế để kích hoạt quyền truy cập quản trị:

- Các hợp đồng [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) có một chủ sở hữu duy nhất. Các hàm có modifier [`onlyOwner`](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) chỉ có thể được gọi bởi chủ sở hữu đó. Chủ sở hữu có thể chuyển quyền sở hữu cho người khác hoặc từ bỏ hoàn toàn. Quyền của tất cả các tài khoản khác thường giống hệt nhau.
- Các hợp đồng [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) có [kiểm soát truy cập dựa trên vai trò (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Vì mục đích đơn giản, trong bài viết này chúng ta sử dụng `Ownable`.

### Đóng băng và rã đông hợp đồng {#freezing-and-thawing-contracts}

Việc đóng băng và hủy đóng băng các hợp đồng yêu cầu một số thay đổi:

- Một [mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) từ các địa chỉ sang [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) để theo dõi những địa chỉ nào bị đóng băng. Tất cả các giá trị ban đầu là không, đối với các giá trị boolean được hiểu là sai (false). Đây là điều chúng ta muốn vì theo mặc định các tài khoản không bị đóng băng.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Các [sự kiện](https://docs.soliditylang.org/en/latest/contracts.html#events) để thông báo cho bất kỳ ai quan tâm khi một tài khoản bị đóng băng hoặc hủy đóng băng. Về mặt kỹ thuật, các sự kiện không bắt buộc đối với các hành động này, nhưng nó giúp mã ngoài chuỗi có thể lắng nghe các sự kiện này và biết điều gì đang xảy ra. Việc một hợp đồng thông minh phát ra chúng khi có điều gì đó có thể liên quan đến người khác xảy ra được coi là một cách cư xử tốt.

  Các sự kiện được lập chỉ mục (indexed) nên sẽ có thể tìm kiếm tất cả các lần một tài khoản đã bị đóng băng hoặc hủy đóng băng.

  ```solidity
    // Khi các Tài khoản bị đóng băng hoặc hủy đóng băng
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Các hàm để đóng băng và hủy đóng băng tài khoản. Hai hàm này gần như giống hệt nhau, vì vậy chúng ta sẽ chỉ xem xét hàm đóng băng.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Các hàm được đánh dấu [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) có thể được gọi từ các hợp đồng thông minh khác hoặc trực tiếp bằng một giao dịch.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // đóng băng Tài khoản
  ```

  Nếu tài khoản đã bị đóng băng, hãy hoàn nguyên. Nếu không, hãy đóng băng nó và `emit` một sự kiện.

- Thay đổi `_update` để ngăn tiền bị chuyển khỏi một tài khoản bị đóng băng. Lưu ý rằng tiền vẫn có thể được chuyển vào tài khoản bị đóng băng. Đặt dòng này ở đầu hàm, bên ngoài khối `if`, để nó cũng ngăn việc đốt các token từ một tài khoản bị đóng băng.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Dọn dẹp tài sản {#asset-cleanup}

Để giải phóng các token ERC-20 được giữ bởi hợp đồng này, chúng ta cần gọi một hàm trên hợp đồng token mà chúng thuộc về, hoặc là [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) hoặc [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Không có lý do gì để lãng phí Gas trong trường hợp này cho các khoản cho phép (allowances), chúng ta cũng có thể chuyển trực tiếp.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Đây là cú pháp để tạo một đối tượng cho một hợp đồng khi chúng ta nhận được địa chỉ. Để sử dụng nó, chúng ta cần [định nghĩa cho IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), giao diện cho một hợp đồng ERC-20 của OpenZeppelin. Dòng `import {ERC20} from ...` của Wizard chỉ mang lại `ERC20`, vì vậy hãy thêm dòng này bên cạnh các import khác ở đầu tệp:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Đây là một hàm dọn dẹp, vì vậy có lẽ chúng ta không muốn để lại bất kỳ token nào. Thay vì lấy số dư từ người dùng theo cách thủ công, chúng ta cũng có thể tự động hóa quy trình.

## Kết luận {#conclusion}

Đây không phải là một giải pháp hoàn hảo - không có giải pháp hoàn hảo nào cho vấn đề "người dùng mắc sai lầm". Tuy nhiên, việc sử dụng các loại kiểm tra này ít nhất có thể ngăn chặn một số sai lầm. Khả năng đóng băng tài khoản, mặc dù nguy hiểm, có thể được sử dụng để hạn chế thiệt hại của một số vụ hack bằng cách từ chối hacker truy cập vào các khoản tiền bị đánh cắp.

[Xem tại đây để biết thêm về các công việc của tôi](https://cryptodocguy.pro/).
