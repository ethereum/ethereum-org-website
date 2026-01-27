---
title: "ERC-20 với các Thanh chắn An toàn"
description: "Cách giúp mọi người tránh những sai lầm ngớ ngẩn"
author: Ori Pomerantz
lang: vi
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Giới thiệu {#introduction}

Một trong những điều tuyệt vời về Ethereum là không có cơ quan trung ương nào có thể sửa đổi hoặc hoàn tác các giao dịch của bạn. Một trong những vấn đề lớn với Ethereum là không có cơ quan trung ương nào có quyền hoàn tác các sai lầm của người dùng hoặc các giao dịch bất hợp pháp. Trong bài viết này, bạn sẽ tìm hiểu về một số lỗi phổ biến mà người dùng mắc phải với các token [ERC-20](/developers/docs/standards/tokens/erc-20/), cũng như cách tạo hợp đồng ERC-20 giúp người dùng tránh những lỗi đó, hoặc trao cho cơ quan trung ương một số quyền (ví dụ: đóng băng tài khoản).

Lưu ý rằng mặc dù chúng tôi sẽ sử dụng [hợp đồng token ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), bài viết này không giải thích chi tiết về nó. Bạn có thể tìm thấy thông tin này [tại đây](/developers/tutorials/erc20-annotated-code).

Nếu bạn muốn xem mã nguồn hoàn chỉnh:

1. Mở [Remix IDE](https://remix.ethereum.org/).
2. Nhấp vào biểu tượng sao chép github (![biểu tượng sao chép github](icon-clone.png)).
3. Sao chép kho lưu trữ github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Mở **contracts > erc20-safety-rails.sol**.

## Tạo hợp đồng ERC-20 {#creating-an-erc-20-contract}

Trước khi có thể thêm chức năng thanh chắn an toàn, chúng ta cần một hợp đồng ERC-20. Trong bài viết này, chúng ta sẽ sử dụng [Trình hướng dẫn Hợp đồng OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Mở nó trong một trình duyệt khác và làm theo các hướng dẫn sau:

1. Chọn **ERC20**.

2. Nhập các cài đặt này:

   | Thông số           | Giá trị          |
   | ------------------ | ---------------- |
   | Họ tên             | SafetyRailsToken |
   | Ký hiệu            | SAFE             |
   | Đúc sẵn            | 1000             |
   | Tính năng          | Không            |
   | Kiểm soát truy cập | Có thể sở hữu    |
   | Khả năng nâng cấp  | Không            |

3. Cuộn lên và nhấp vào **Mở trong Remix** (đối với Remix) hoặc **Tải xuống** để sử dụng một môi trường khác. Tôi sẽ giả định bạn đang sử dụng Remix, nếu bạn sử dụng thứ khác, chỉ cần thực hiện các thay đổi phù hợp.

4. Bây giờ chúng ta đã có một hợp đồng ERC-20 đầy đủ chức năng. Bạn có thể mở rộng `.deps` > `npm` để xem mã được nhập.

5. Biên dịch, triển khai và thử nghiệm hợp đồng để xem nó hoạt động như một hợp đồng ERC-20. Nếu bạn cần học cách sử dụng Remix, [hãy sử dụng hướng dẫn này](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Các lỗi thường gặp {#common-mistakes}

### Các sai lầm {#the-mistakes}

Người dùng đôi khi gửi token đến sai địa chỉ. Mặc dù chúng ta không thể đọc được suy nghĩ của họ để biết họ định làm gì, có hai loại lỗi thường xảy ra và dễ phát hiện:

1. Gửi các token đến địa chỉ của chính hợp đồng. Ví dụ, [token OP của Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) đã tích lũy được [hơn 120.000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) token OP trong vòng chưa đầy hai tháng. Điều này đại diện cho một lượng tài sản đáng kể mà có lẽ mọi người đã mất đi.

2. Gửi các token đến một địa chỉ trống, một địa chỉ không tương ứng với một [tài khoản sở hữu bên ngoài](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) hoặc một [hợp đồng thông minh](/developers/docs/smart-contracts). Mặc dù tôi không có số liệu thống kê về tần suất xảy ra điều này, [một sự cố có thể đã gây thiệt hại 20.000.000 token](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Ngăn chặn các giao dịch chuyển tiền {#preventing-transfers}

Hợp đồng ERC-20 của OpenZeppelin bao gồm [một hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), được gọi trước khi một token được chuyển đi. Theo mặc định, hook này không làm gì cả, nhưng chúng ta có thể gắn chức năng của riêng mình vào nó, chẳng hạn như các kiểm tra sẽ hoàn tác nếu có sự cố.

Để sử dụng hook, hãy thêm hàm này sau hàm khởi tạo:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Một số phần của hàm này có thể mới nếu bạn không quen thuộc với Solidity:

```solidity
        internal virtual
```

Từ khóa `virtual` có nghĩa là giống như chúng ta đã kế thừa chức năng từ `ERC20` và ghi đè hàm này, các hợp đồng khác có thể kế thừa từ chúng ta và ghi đè hàm này.

```solidity
        override(ERC20)
```

Chúng ta phải chỉ định rõ ràng rằng chúng ta đang [ghi đè](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) định nghĩa token ERC20 của `_beforeTokenTransfer`. Nói chung, từ quan điểm bảo mật, các định nghĩa rõ ràng tốt hơn nhiều so với các định nghĩa ngầm - bạn không thể quên rằng mình đã làm điều gì đó nếu nó ở ngay trước mắt bạn. Đó cũng là lý do chúng ta cần chỉ định `_beforeTokenTransfer` của lớp cha nào mà chúng ta đang ghi đè.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Dòng này gọi hàm `_beforeTokenTransfer` của hợp đồng hoặc các hợp đồng mà chúng ta đã kế thừa có nó. Trong trường hợp này, đó chỉ là `ERC20`, `Ownable` không có hook này. Mặc dù hiện tại `ERC20._beforeTokenTransfer` không làm gì cả, chúng ta vẫn gọi nó phòng trường hợp chức năng được thêm vào trong tương lai (và sau đó chúng ta quyết định triển khai lại hợp đồng, vì các hợp đồng không thay đổi sau khi triển khai).

### Lập trình các yêu cầu {#coding-the-requirements}

Chúng ta muốn thêm các yêu cầu này vào hàm:

- Địa chỉ `to` không thể bằng `address(this)`, địa chỉ của chính hợp đồng ERC-20.
- Địa chỉ `to` không được để trống, nó phải là:
  - Một tài khoản sở hữu bên ngoài (EOA). Chúng ta không thể kiểm tra trực tiếp xem một địa chỉ có phải là EOA hay không, nhưng chúng ta có thể kiểm tra số dư ETH của một địa chỉ. Các EOA hầu như luôn có số dư, ngay cả khi chúng không còn được sử dụng - rất khó để xóa chúng đến wei cuối cùng.
  - Một hợp đồng thông minh. Việc kiểm tra xem một địa chỉ có phải là hợp đồng thông minh hay không thì khó hơn một chút. Có một opcode kiểm tra độ dài mã bên ngoài, được gọi là [`EXTCODESIZE`](https://www.evm.codes/#3b), nhưng nó không có sẵn trực tiếp trong Solidity. Chúng ta phải sử dụng [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), là hợp ngữ EVM, cho nó. Có những giá trị khác mà chúng ta có thể sử dụng từ Solidity ([`<address>.code` và `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), nhưng chúng tốn kém hơn.

Hãy xem qua từng dòng mã mới:

```solidity
        require(to != address(this), "Không thể gửi token đến địa chỉ hợp đồng");
```

Đây là yêu cầu đầu tiên, kiểm tra xem `to` và `this(address)` có giống nhau không.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Đây là cách chúng ta kiểm tra xem một địa chỉ có phải là hợp đồng hay không. Chúng ta không thể nhận đầu ra trực tiếp từ Yul, vì vậy thay vào đó, chúng ta xác định một biến để giữ kết quả (`isToContract` trong trường hợp này). Cách Yul hoạt động là mỗi opcode được coi là một hàm. Vì vậy, trước tiên chúng ta gọi [`EXTCODESIZE`](https://www.evm.codes/#3b) để lấy kích thước hợp đồng, sau đó sử dụng [`GT`](https://www.evm.codes/#11) để kiểm tra xem nó có khác không (chúng ta đang xử lý các số nguyên không dấu, vì vậy tất nhiên nó không thể âm). Sau đó, chúng ta ghi kết quả vào `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Không thể gửi token đến một địa chỉ trống");
```

Và cuối cùng, chúng ta có kiểm tra thực tế cho các địa chỉ trống.

## Quyền truy cập quản trị {#admin-access}

Đôi khi có một quản trị viên có thể hoàn tác các sai lầm là rất hữu ích. Để giảm khả năng lạm dụng, quản trị viên này có thể là một [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) để nhiều người phải đồng ý về một hành động. Trong bài viết này, chúng ta sẽ có hai tính năng quản trị:

1. Đóng băng và gỡ đóng băng các tài khoản. Điều này có thể hữu ích, ví dụ, khi một tài khoản có thể bị xâm phạm.
2. Dọn dẹp tài sản.

   Đôi khi những kẻ lừa đảo gửi các token gian lận đến hợp đồng của token thật để có được tính hợp pháp. Ví dụ, [xem tại đây](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Hợp đồng ERC-20 hợp pháp là [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Trò lừa đảo giả mạo nó là [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Cũng có khả năng mọi người gửi nhầm các token ERC-20 hợp pháp vào hợp đồng của chúng ta, đây là một lý do khác để muốn có cách lấy chúng ra.

OpenZeppelin cung cấp hai cơ chế để cho phép truy cập quản trị:

- Các hợp đồng `Ownable` có một chủ sở hữu duy nhất. Các hàm có [bổ từ](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` chỉ có thể được gọi bởi chủ sở hữu đó. Chủ sở hữu có thể chuyển quyền sở hữu cho người khác hoặc từ bỏ hoàn toàn. Quyền của tất cả các tài khoản khác thường giống hệt nhau.
- Các hợp đồng `AccessControl` có [kiểm soát truy cập dựa trên vai trò (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Để đơn giản, trong bài viết này, chúng tôi sử dụng `Ownable`.

### Đóng băng và gỡ đóng băng các hợp đồng {#freezing-and-thawing-contracts}

Việc đóng băng và gỡ đóng băng hợp đồng đòi hỏi một vài thay đổi:

- Một [ánh xạ](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) từ các địa chỉ đến các [giá trị boolean](https://en.wikipedia.org/wiki/Boolean_data_type) để theo dõi các địa chỉ nào bị đóng băng. Tất cả các giá trị ban đầu đều bằng không, đối với các giá trị boolean được hiểu là false. Đây là điều chúng ta muốn vì theo mặc định, các tài khoản không bị đóng băng.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Sự kiện](https://www.tutorialspoint.com/solidity/solidity_events.htm) để thông báo cho bất kỳ ai quan tâm khi một tài khoản bị đóng băng hoặc gỡ đóng băng. Về mặt kỹ thuật, các sự kiện không bắt buộc đối với các hành động này, nhưng nó giúp mã ngoài chuỗi có thể lắng nghe các sự kiện này và biết điều gì đang xảy ra. Việc một hợp đồng thông minh phát ra chúng khi có điều gì đó có thể liên quan đến người khác xảy ra được coi là một hành vi lịch sự.

  Các sự kiện được lập chỉ mục để có thể tìm kiếm tất cả các lần một tài khoản đã bị đóng băng hoặc gỡ đóng băng.

  ```solidity
    // Khi các tài khoản bị đóng băng hoặc gỡ đóng băng
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Các hàm để đóng băng và gỡ đóng băng tài khoản. Hai hàm này gần như giống hệt nhau, vì vậy chúng ta sẽ chỉ xem xét hàm đóng băng.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Các hàm được đánh dấu [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) có thể được gọi từ các hợp đồng thông minh khác hoặc trực tiếp bằng một giao dịch.

  ```solidity
    {
        require(!frozenAccounts[addr], "Tài khoản đã bị đóng băng");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Nếu tài khoản đã bị đóng băng, hãy hoàn tác. Nếu không, hãy đóng băng nó và `emit` một sự kiện.

- Thay đổi `_beforeTokenTransfer` để ngăn tiền được chuyển từ một tài khoản bị đóng băng. Lưu ý rằng tiền vẫn có thể được chuyển vào tài khoản bị đóng băng.

  ```solidity
       require(!frozenAccounts[from], "Tài khoản bị đóng băng");
  ```

### Dọn dẹp tài sản {#asset-cleanup}

Để giải phóng các token ERC-20 do hợp đồng này nắm giữ, chúng ta cần gọi một hàm trên hợp đồng token mà chúng thuộc về, hoặc là [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) hoặc [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Không có lý do gì để lãng phí gas trong trường hợp này cho các khoản được phép chi tiêu, chúng ta cũng có thể chuyển trực tiếp.

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

Đây là cú pháp để tạo một đối tượng cho một hợp đồng khi chúng ta nhận được địa chỉ. Chúng ta có thể làm điều này bởi vì chúng ta có định nghĩa cho các token ERC20 như một phần của mã nguồn (xem dòng 4), và tệp đó bao gồm [định nghĩa cho IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), giao diện cho một hợp đồng ERC-20 của OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Đây là một hàm dọn dẹp, vì vậy có lẽ chúng ta không muốn để lại bất kỳ token nào. Thay vì lấy số dư từ người dùng theo cách thủ công, chúng ta cũng có thể tự động hóa quy trình.

## Kết luận {#conclusion}

Đây không phải là một giải pháp hoàn hảo - không có giải pháp hoàn hảo nào cho vấn đề "người dùng đã mắc lỗi". Tuy nhiên, việc sử dụng các loại kiểm tra này ít nhất có thể ngăn ngừa một số sai lầm. Khả năng đóng băng tài khoản, mặc dù nguy hiểm, có thể được sử dụng để hạn chế thiệt hại của một số vụ tấn công bằng cách từ chối cho hacker số tiền bị đánh cắp.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
