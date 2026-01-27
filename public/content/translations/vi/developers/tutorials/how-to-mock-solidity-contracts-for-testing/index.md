---
title: Làm thế nào để tạo bản sao hợp đồng thông minh Solidity để kiểm thử
description: Tại sao bạn nên chế nhạo các hợp đồng của mình khi thử nghiệm
author: Markus Waas
lang: vi
tags:
  [
    "solidity",
    "hợp đồng thông minh",
    "kiểm thử",
    "mocking"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Đối tượng mock](https://wikipedia.org/wiki/Mock_object) là một mẫu thiết kế phổ biến trong lập trình hướng đối tượng. Xuất phát từ từ tiếng Pháp cổ 'mocquer' với ý nghĩa 'chế nhạo', nó đã phát triển thành 'bắt chước một thứ gì đó có thật', đó thực sự là những gì chúng ta đang làm trong lập trình. Vui lòng chỉ chế nhạo các hợp đồng thông minh của bạn nếu bạn muốn, nhưng hãy giả lập chúng bất cứ khi nào bạn có thể. Nó làm cho cuộc sống của bạn dễ dàng hơn.

## Kiểm thử đơn vị các hợp đồng với các đối tượng giả lập {#unit-testing-contracts-with-mocks}

Việc giả lập một hợp đồng về cơ bản có nghĩa là tạo ra một phiên bản thứ hai của hợp đồng đó, hoạt động rất tương tự như phiên bản gốc, nhưng theo cách có thể dễ dàng được kiểm soát bởi nhà phát triển. Bạn thường gặp phải các hợp đồng phức tạp, trong đó bạn chỉ muốn [kiểm thử đơn vị các phần nhỏ của hợp đồng](/developers/docs/smart-contracts/testing/). Vấn đề là sẽ ra sao nếu việc kiểm thử phần nhỏ này đòi hỏi một trạng thái hợp đồng rất cụ thể mà khó có thể đạt được?

Bạn có thể viết logic thiết lập kiểm thử phức tạp mỗi lần để đưa hợp đồng vào trạng thái được yêu cầu hoặc bạn có thể viết một đối tượng giả lập. Giả lập một hợp đồng rất dễ dàng với tính kế thừa. Chỉ cần tạo một hợp đồng giả lập thứ hai kế thừa từ hợp đồng gốc. Bây giờ bạn có thể ghi đè các hàm cho đối tượng giả lập của bạn. Hãy cùng xem một ví dụ.

## Ví dụ: ERC20 riêng tư {#example-private-erc20}

Chúng tôi sử dụng một hợp đồng ERC-20 mẫu có thời gian riêng tư ban đầu. Chủ sở hữu có thể quản lý những người dùng riêng tư và chỉ những người đó mới được phép nhận token khi bắt đầu. Khi một khoảng thời gian nhất định đã trôi qua, mọi người sẽ được phép sử dụng token. Nếu bạn tò mò, chúng tôi đang sử dụng hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) từ các hợp đồng OpenZeppelin v3 mới.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Và bây giờ hãy giả lập nó.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Bạn sẽ nhận được một trong những thông báo lỗi sau:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing \"override\" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add \"virtual\"?.`

Vì chúng tôi đang sử dụng phiên bản Solidity 0.6 mới, chúng tôi phải thêm từ khóa `virtual` cho các hàm có thể được ghi đè và `override` cho hàm ghi đè. Vì vậy, hãy thêm chúng vào cả hai hàm `isPublic`.

Bây giờ trong các bài kiểm thử đơn vị, bạn có thể sử dụng `PrivateERC20Mock` thay thế. Khi bạn muốn kiểm thử hành vi trong thời gian sử dụng riêng tư, hãy sử dụng `setIsPublic(false)` và tương tự, sử dụng `setIsPublic(true)` để kiểm thử thời gian sử dụng công khai. Tất nhiên trong ví dụ của chúng tôi, chúng tôi cũng có thể chỉ cần sử dụng [các trình trợ giúp thời gian](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) để thay đổi thời gian cho phù hợp. Nhưng ý tưởng về việc giả lập bây giờ hẳn đã rõ ràng và bạn có thể tưởng tượng các tình huống mà nó không dễ dàng như việc chỉ đơn giản là tua nhanh thời gian.

## Giả lập nhiều hợp đồng {#mocking-many-contracts}

Mọi việc có thể trở nên lộn xộn nếu bạn phải tạo một hợp đồng khác cho mỗi đối tượng giả lập. Nếu điều này làm phiền bạn, bạn có thể xem qua thư viện [MockContract](https://github.com/gnosis/mock-contract). Nó cho phép bạn ghi đè và thay đổi hành vi của các hợp đồng ngay lập tức. Tuy nhiên, nó chỉ hoạt động để giả lập các lệnh gọi đến một hợp đồng khác, vì vậy nó sẽ không hoạt động trong ví dụ của chúng ta.

## Việc giả lập thậm chí có thể mạnh mẽ hơn {#mocking-can-be-even-more-powerful}

Sức mạnh của việc giả lập không dừng lại ở đó.

- Thêm các hàm: Không chỉ việc ghi đè một hàm cụ thể là hữu ích, mà việc chỉ thêm các hàm bổ sung cũng vậy. Một ví dụ điển hình cho token là chỉ cần có thêm một hàm `mint` để cho phép bất kỳ người dùng nào nhận token mới miễn phí.
- Sử dụng trong các mạng thử nghiệm: Khi bạn triển khai và kiểm thử các hợp đồng của mình trên các mạng thử nghiệm cùng với dapp của bạn, hãy cân nhắc sử dụng phiên bản giả lập. Tránh việc ghi đè các hàm trừ khi bạn thực sự phải làm vậy. Sau cùng thì bạn muốn kiểm thử logic thực. Nhưng việc thêm, ví dụ như một hàm đặt lại có thể hữu ích để chỉ cần đặt lại trạng thái hợp đồng về ban đầu, không cần triển khai mới. Rõ ràng là bạn sẽ không muốn có điều đó trong một hợp đồng Mạng chính.
