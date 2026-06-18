---
title: Cách mock (giả lập) hợp đồng thông minh Solidity để thử nghiệm
description: Tại sao bạn nên "trêu đùa" (mock) các hợp đồng của mình khi thử nghiệm
author: Markus Waas
lang: vi
tags:
  - solidity
  - hợp đồng thông minh
  - thử nghiệm
  - mocking
skill: intermediate
breadcrumb: Mock hợp đồng
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Đối tượng mock (giả lập)](https://wikipedia.org/wiki/Mock_object) là một mẫu thiết kế phổ biến trong lập trình hướng đối tượng. Bắt nguồn từ từ 'mocquer' trong tiếng Pháp cổ với ý nghĩa 'trêu đùa', nó đã phát triển thành 'bắt chước một thứ gì đó có thật', và đây chính xác là những gì chúng ta đang làm trong lập trình. Bạn chỉ nên "trêu đùa" các hợp đồng thông minh của mình nếu muốn, nhưng hãy mock chúng bất cứ khi nào có thể. Điều đó sẽ giúp cuộc sống của bạn dễ dàng hơn.

## Kiểm thử đơn vị (unit-test) hợp đồng bằng mock {#unit-testing-contracts-with-mocks}

Mock một hợp đồng về cơ bản có nghĩa là tạo ra một phiên bản thứ hai của hợp đồng đó, hoạt động rất giống với bản gốc, nhưng theo cách mà nhà phát triển có thể dễ dàng kiểm soát. Bạn thường sẽ gặp phải những hợp đồng phức tạp mà bạn chỉ muốn [kiểm thử đơn vị các phần nhỏ của hợp đồng](/developers/docs/smart-contracts/testing/). Vấn đề là điều gì sẽ xảy ra nếu việc kiểm thử phần nhỏ này yêu cầu một trạng thái hợp đồng rất cụ thể mà khó có thể đạt được?

Bạn có thể viết logic thiết lập thử nghiệm phức tạp mỗi lần để đưa hợp đồng vào trạng thái được yêu cầu, hoặc bạn viết một mock. Việc mock một hợp đồng rất dễ dàng với tính kế thừa. Chỉ cần tạo một hợp đồng mock thứ hai kế thừa từ hợp đồng gốc. Bây giờ bạn có thể ghi đè (override) các hàm cho mock của mình. Hãy cùng xem một ví dụ.

## Ví dụ: ERC-20 riêng tư {#example-private-erc20}

Chúng ta sử dụng một ví dụ về hợp đồng ERC-20 có thời gian riêng tư ban đầu. Chủ sở hữu có thể quản lý người dùng riêng tư và chỉ những người đó mới được phép nhận token lúc ban đầu. Khi một khoảng thời gian nhất định trôi qua, mọi người sẽ được phép sử dụng token. Nếu bạn tò mò, chúng tôi đang sử dụng hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) từ các hợp đồng OpenZeppelin v3 mới.

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

Và bây giờ hãy mock nó.

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

Bạn sẽ nhận được một trong các thông báo lỗi sau:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Vì chúng ta đang sử dụng phiên bản Solidity 0.6 mới, chúng ta phải thêm từ khóa `virtual` cho các hàm có thể bị ghi đè và override cho hàm ghi đè. Vì vậy, hãy thêm chúng vào cả hai hàm `isPublic`.

Bây giờ trong các bài kiểm thử đơn vị của bạn, bạn có thể sử dụng `PrivateERC20Mock` để thay thế. Khi bạn muốn kiểm thử hành vi trong thời gian sử dụng riêng tư, hãy sử dụng `setIsPublic(false)` và tương tự là `setIsPublic(true)` để kiểm thử thời gian sử dụng công khai. Tất nhiên trong ví dụ của chúng ta, chúng ta cũng có thể chỉ cần sử dụng [các hàm hỗ trợ thời gian (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) để thay đổi thời gian cho phù hợp. Nhưng ý tưởng về mocking bây giờ đã rõ ràng và bạn có thể tưởng tượng ra các kịch bản mà việc này không dễ dàng như việc chỉ đơn giản là tua nhanh thời gian.

## Mock nhiều hợp đồng {#mocking-many-contracts}

Mọi thứ có thể trở nên lộn xộn nếu bạn phải tạo một hợp đồng khác cho mỗi mock. Nếu điều này làm bạn bận tâm, bạn có thể xem qua thư viện [MockContract](https://github.com/gnosis/mock-contract). Nó cho phép bạn ghi đè và thay đổi hành vi của các hợp đồng một cách linh hoạt. Tuy nhiên, nó chỉ hoạt động để mock các lệnh gọi đến một hợp đồng khác, vì vậy nó sẽ không hoạt động cho ví dụ của chúng ta.

## Mocking thậm chí có thể mạnh mẽ hơn {#mocking-can-be-even-more-powerful}

Sức mạnh của mocking không dừng lại ở đó.

- Thêm hàm: Không chỉ việc ghi đè một hàm cụ thể mới hữu ích, mà việc thêm các hàm bổ sung cũng vậy. Một ví dụ điển hình cho token là chỉ cần có thêm một hàm `mint` để cho phép bất kỳ người dùng nào nhận token mới miễn phí.
- Sử dụng trên testnet: Khi bạn triển khai và kiểm thử các hợp đồng của mình trên testnet cùng với ứng dụng phi tập trung (dapp) của bạn, hãy cân nhắc sử dụng một phiên bản mock. Tránh ghi đè các hàm trừ khi bạn thực sự phải làm vậy. Rốt cuộc thì bạn muốn kiểm thử logic thực tế. Nhưng ví dụ, việc thêm một hàm reset có thể hữu ích để đơn giản là đặt lại trạng thái hợp đồng về ban đầu mà không yêu cầu việc triển khai mới. Rõ ràng là bạn sẽ không muốn có điều đó trong một hợp đồng trên Mạng chính.