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

Một trong những điều tuyệt vời về Ethereum là không có cơ quan trung ương nào có thể sửa đổi hoặc hoàn tác các giao dịch của bạn. Một trong những vấn đề lớn với Ethereum là không có cơ quan trung ương nào có quyền hoàn tác các sai lầm của người dùng hoặc các giao dịch bất hợp pháp. Trong bài viết này, bạn sẽ tìm hiểu về một số sai lầm phổ biến mà người dùng mắc phải với token [ERC-20](/developers/docs/standards/tokens/erc-20/), cũng như cách tạo các hợp đồng ERC-20 giúp người dùng tránh những sai lầm đó, hoặc trao cho một cơ quan trung ương một số quyền hạn (ví dụ như đóng băng tài khoản).

Lưu ý rằng mặc dù chúng ta sẽ sử dụng [hợp đồng token ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), bài viết này không giải thích chi tiết về nó. Bạn có thể tìm thấy thông tin này [tại đây](/developers/tutorials/erc20-annotated-code).

Nếu bạn muốn xem toàn bộ mã nguồn:

1. Mở [Remix IDE](https://remix.ethereum.org/).
2. Nhấp vào biểu tượng sao chép GitHub (![clone github icon](icon-clone.png)).
3. Sao chép kho lưu trữ GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Mở **contracts > erc20-safety-rails.sol**.

## Tạo một hợp đồng ERC-20 {#creating-an-erc-20-contract}

Trước khi có thể thêm chức năng rào chắn an toàn, chúng ta cần một hợp đồng ERC-20. Trong bài viết này, chúng ta sẽ sử dụng [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Hãy mở nó trong một trình duyệt khác và làm theo các hướng dẫn sau:

1. Chọn **ERC20**.
2. Nhập các cài đặt sau:

   | Thông số           | Giá trị          |
   | ------------------ | ---------------- |
   | Tên                | SafetyRailsToken |
   | Ký hiệu            | SAFE             |
   | Đúc sẵn            | 1000             |
   | Tính năng          | Không có         |
   | Kiểm soát truy cập | Ownable          |
   | Khả năng nâng cấp  | Không có         |

3. Cuộn lên và nhấp vào **Open in Remix** (đối với Remix) hoặc **Download** để sử dụng một môi trường khác. Tôi sẽ giả định rằng bạn đang sử dụng Remix, nếu bạn sử dụng công cụ khác, chỉ cần thực hiện các thay đổi cho phù hợp.
4. Bây giờ chúng ta đã có một hợp đồng ERC-20 đầy đủ chức năng. Bạn có thể mở rộng `.deps` > `npm` để xem mã được nhập.
5. Biên dịch, triển khai và thử nghiệm với hợp đồng để xem nó hoạt động như một hợp đồng ERC-20. Nếu bạn cần tìm hiểu cách sử dụng Remix, [hãy sử dụng hướng dẫn này](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Những sai lầm phổ biến {#common-mistakes}

### Các sai lầm {#the-mistakes}

Người dùng đôi khi chuyển token đến sai địa chỉ. Mặc dù chúng ta không thể đọc được suy nghĩ của họ để biết họ định làm gì, nhưng có hai loại lỗi xảy ra rất nhiều và dễ phát hiện:

1. Chuyển token đến chính địa chỉ của hợp đồng. Ví dụ, [token OP của Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) đã tích lũy được [hơn 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP trong vòng chưa đầy hai tháng. Điều này đại diện cho một lượng tài sản đáng kể mà có lẽ mọi người đã đánh mất.

2. Chuyển token đến một địa chỉ trống, một địa chỉ không tương ứng với [tài khoản thuộc sở hữu bên ngoài (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) hoặc một [hợp đồng thông minh](/developers/docs/smart-contracts). Mặc dù tôi không có số liệu thống kê về mức độ thường xuyên xảy ra điều này, nhưng [một sự cố có thể đã gây thiệt hại 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Ngăn chặn việc chuyển {#preventing-transfers}

Hợp đồng ERC-20 của OpenZeppelin bao gồm [một hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), được gọi trước khi một token được chuyển. Theo mặc định, hook này không làm gì cả, nhưng chúng ta có thể gắn chức năng của riêng mình vào nó, chẳng hạn như các kiểm tra sẽ hoàn nguyên nếu có sự cố.

Để sử dụng hook, hãy thêm hàm này sau hàm khởi tạo:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Một số phần của hàm này có thể mới nếu bạn không quá quen thuộc với Solidity:

```solidity
        internal virtual
```

Từ khóa `virtual` có nghĩa là giống như việc chúng ta kế thừa chức năng từ `ERC20` và ghi đè hàm này, các hợp đồng khác có thể kế thừa từ chúng ta và ghi đè hàm này.

```solidity
        override(ERC20)
```

Chúng ta phải chỉ định rõ ràng rằng chúng ta đang [ghi đè](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) định nghĩa token ERC20 của `_beforeTokenTransfer`. Nhìn chung, các định nghĩa rõ ràng tốt hơn rất nhiều so với các định nghĩa ngầm định từ góc độ bảo mật - bạn không thể quên rằng mình đã làm điều gì đó nếu nó ở ngay trước mắt bạn. Đó cũng là lý do chúng ta cần chỉ định `_beforeTokenTransfer` của lớp cha nào mà chúng ta đang ghi đè.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Dòng này gọi hàm `_beforeTokenTransfer` của hợp đồng hoặc các hợp đồng mà chúng ta đã kế thừa có chứa nó. Trong trường hợp này, đó chỉ là `ERC20`, `Ownable` không có hook này. Mặc dù hiện tại `ERC20._beforeTokenTransfer` không làm gì cả, chúng ta vẫn gọi nó trong trường hợp chức năng được thêm vào trong tương lai (và sau đó chúng ta quyết định triển khai lại hợp đồng, vì các hợp đồng không thay đổi sau việc triển khai).

### Lập trình các yêu cầu {#coding-the-requirements}

Chúng ta muốn thêm các yêu cầu này vào hàm:

- Địa chỉ `to` không thể bằng `address(this)`, địa chỉ của chính hợp đồng ERC-20.
- Địa chỉ `to` không thể trống, nó phải là một trong hai:
  - Một tài khoản thuộc sở hữu bên ngoài (EOA). Chúng ta không thể kiểm tra trực tiếp xem một địa chỉ có phải là EOA hay không, nhưng chúng ta có thể kiểm tra số dư ETH của một địa chỉ. Các EOA hầu như luôn có số dư, ngay cả khi chúng không còn được sử dụng - rất khó để xóa sạch chúng đến đồng Wei cuối cùng.
  - Một hợp đồng thông minh. Việc kiểm tra xem một địa chỉ có phải là hợp đồng thông minh hay không khó hơn một chút. Có một mã lệnh kiểm tra độ dài mã bên ngoài, được gọi là [`EXTCODESIZE`](https://www.evm.codes/#3b), nhưng nó không có sẵn trực tiếp trong Solidity. Chúng ta phải sử dụng [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), là hợp ngữ của EVM, cho việc này. Có những giá trị khác mà chúng ta có thể sử dụng từ Solidity ([`<address>.code` và `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), nhưng chúng tốn nhiều Gas hơn.

Hãy cùng xem qua từng dòng mã mới:

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

Đây là cách chúng ta kiểm tra xem một địa chỉ có phải là hợp đồng hay không. Chúng ta không thể nhận đầu ra trực tiếp từ Yul, vì vậy thay vào đó, chúng ta định nghĩa một biến để chứa kết quả (trong trường hợp này là `isToContract`). Cách Yul hoạt động là mọi mã lệnh đều được coi là một hàm. Vì vậy, trước tiên chúng ta gọi [`EXTCODESIZE`](https://www.evm.codes/#3b) để lấy kích thước hợp đồng, và sau đó sử dụng [`GT`](https://www.evm.codes/#11) để kiểm tra xem nó có khác không hay không (chúng ta đang xử lý các số nguyên không dấu, vì vậy tất nhiên nó không thể âm). Sau đó, chúng ta ghi kết quả vào `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Và cuối cùng, chúng ta có bước kiểm tra thực tế đối với các địa chỉ trống.

## Quyền truy cập quản trị {#admin-access}

Đôi khi việc có một quản trị viên có thể hoàn tác các sai lầm là rất hữu ích. Để giảm thiểu khả năng lạm dụng, quản trị viên này có thể là một [đa chữ ký](https://blog.logrocket.com/security-choices-multi-signature-wallets/) để nhiều người phải đồng ý về một hành động. Trong bài viết này, chúng ta sẽ có hai tính năng quản trị:

1. Đóng băng và hủy đóng băng tài khoản. Điều này có thể hữu ích, ví dụ, khi một tài khoản có thể bị xâm phạm.
2. Dọn dẹp tài sản.

   Đôi khi những kẻ lừa đảo chuyển các token gian lận đến hợp đồng của token thật để đạt được tính hợp pháp. Ví dụ, [xem tại đây](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Hợp đồng ERC-20 hợp pháp là [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Kẻ lừa đảo giả mạo nó là [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Cũng có khả năng mọi người chuyển nhầm các token ERC-20 hợp pháp đến hợp đồng của chúng ta, đây là một lý do khác để muốn có cách lấy chúng ra.

OpenZeppelin cung cấp hai cơ chế để kích hoạt quyền truy cập quản trị:

- Các hợp đồng [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) có một chủ sở hữu duy nhất. Các hàm có modifier [`onlyOwner`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) chỉ có thể được gọi bởi chủ sở hữu đó. Chủ sở hữu có thể chuyển quyền sở hữu cho người khác hoặc từ bỏ hoàn toàn. Quyền của tất cả các tài khoản khác thường giống hệt nhau.
- Các hợp đồng [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) có [kiểm soát truy cập dựa trên vai trò (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Vì mục đích đơn giản, trong bài viết này chúng ta sử dụng `Ownable`.

### Đóng băng và rã đông hợp đồng {#freezing-and-thawing-contracts}

Việc đóng băng và rã đông hợp đồng yêu cầu một số thay đổi:

- Một [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) từ các địa chỉ sang [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) để theo dõi những địa chỉ nào bị đóng băng. Tất cả các giá trị ban đầu đều bằng không, đối với các giá trị boolean được hiểu là false. Đây là điều chúng ta muốn vì theo mặc định các tài khoản không bị đóng băng.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Các [sự kiện](https://www.tutorialspoint.com/solidity/solidity_events.htm) để thông báo cho bất kỳ ai quan tâm khi một tài khoản bị đóng băng hoặc rã đông. Về mặt kỹ thuật, các sự kiện không bắt buộc đối với các hành động này, nhưng nó giúp mã ngoài chuỗi có thể lắng nghe các sự kiện này và biết điều gì đang xảy ra. Việc một hợp đồng thông minh phát ra chúng khi có điều gì đó có thể liên quan đến người khác xảy ra được coi là một cách làm tốt.

  Các sự kiện được lập chỉ mục nên sẽ có thể tìm kiếm tất cả các lần một tài khoản bị đóng băng hoặc rã đông.

  ```solidity
    // Khi các tài khoản bị đóng băng hoặc hủy đóng băng
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Các hàm để đóng băng và rã đông tài khoản. Hai hàm này gần như giống hệt nhau, vì vậy chúng ta sẽ chỉ xem xét hàm đóng băng.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Các hàm được đánh dấu [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) có thể được gọi từ các hợp đồng thông minh khác hoặc trực tiếp bằng một giao dịch.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Nếu tài khoản đã bị đóng băng, hãy hoàn nguyên. Nếu không, hãy đóng băng nó và `emit` một sự kiện.

- Thay đổi `_beforeTokenTransfer` để ngăn tiền bị chuyển khỏi một tài khoản bị đóng băng. Lưu ý rằng tiền vẫn có thể được chuyển vào tài khoản bị đóng băng.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Dọn dẹp tài sản {#asset-cleanup}

Để giải phóng các token ERC-20 do hợp đồng này nắm giữ, chúng ta cần gọi một hàm trên hợp đồng token mà chúng thuộc về, có thể là [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) hoặc [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Không có lý do gì để lãng phí Gas trong trường hợp này cho các khoản trợ cấp (allowances), chúng ta cũng có thể chuyển trực tiếp.

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

Đây là cú pháp để tạo một đối tượng cho một hợp đồng khi chúng ta nhận được địa chỉ. Chúng ta có thể làm điều này vì chúng ta có định nghĩa cho các token ERC20 như một phần của mã nguồn (xem dòng 4), và tệp đó bao gồm [định nghĩa cho IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), giao diện cho một hợp đồng ERC-20 của OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Đây là một hàm dọn dẹp, vì vậy có lẽ chúng ta không muốn để lại bất kỳ token nào. Thay vì lấy số dư từ người dùng theo cách thủ công, chúng ta cũng có thể tự động hóa quy trình.

## Kết luận {#conclusion}

Đây không phải là một giải pháp hoàn hảo - không có giải pháp hoàn hảo nào cho vấn đề "người dùng mắc sai lầm". Tuy nhiên, việc sử dụng các loại kiểm tra này ít nhất có thể ngăn chặn một số sai lầm. Khả năng đóng băng tài khoản, mặc dù nguy hiểm, có thể được sử dụng để hạn chế thiệt hại của một số vụ hack bằng cách từ chối hacker truy cập vào các khoản tiền bị đánh cắp.

[Xem tại đây để biết thêm về các công việc của tôi](https://cryptodocguy.pro/).