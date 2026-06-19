---
title: "Hướng dẫn chi tiết hợp đồng cầu nối tiêu chuẩn của Optimism"
description: "Cầu nối tiêu chuẩn cho Optimism hoạt động như thế nào? Tại sao nó lại hoạt động theo cách này?"
author: Ori Pomerantz
tags: ["Solidity", "cầu nối", "lớp 2"]
skill: intermediate
breadcrumb: "Cầu nối Optimism"
published: 2022-03-30
lang: vi
---

[Optimism](https://www.optimism.io/) là một [Rollup lạc quan](/developers/docs/scaling/optimistic-rollups/).
Các Rollup lạc quan có thể xử lý các giao dịch với mức giá thấp hơn nhiều so với Mạng chính Ethereum (còn được gọi là lớp 1 hoặc l1) vì các giao dịch chỉ được xử lý bởi một vài nút, thay vì mọi nút trên mạng lưới.
Đồng thời, tất cả dữ liệu đều được ghi vào l1 để mọi thứ có thể được chứng minh và tái tạo lại với tất cả các đảm bảo về tính toàn vẹn và tính khả dụng của Mạng chính.

Để sử dụng các tài sản l1 trên Optimism (hoặc bất kỳ l2 nào khác), các tài sản cần được [chuyển qua cầu nối](/bridges/#prerequisites).
Một cách để đạt được điều này là người dùng khóa tài sản (ETH và [token ERC-20](/developers/docs/standards/tokens/erc-20/) là phổ biến nhất) trên l1 và nhận các tài sản tương đương để sử dụng trên l2.
Cuối cùng, bất kỳ ai sở hữu chúng đều có thể muốn chuyển chúng qua cầu nối trở lại l1.
Khi thực hiện việc này, các tài sản sẽ bị đốt trên l2 và sau đó được giải phóng lại cho người dùng trên l1.

Đây là cách [cầu nối tiêu chuẩn của Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) hoạt động.
Trong bài viết này, chúng ta sẽ xem xét mã nguồn của cầu nối đó để xem nó hoạt động như thế nào và nghiên cứu nó như một ví dụ về mã Solidity được viết tốt.

## Luồng điều khiển {#control-flows}

Cầu nối có hai luồng chính:

- Nạp tiền (từ l1 sang l2)
- Rút tiền (từ l2 sang l1)

### Luồng nạp tiền {#deposit-flow}

#### Lớp 1 {#deposit-flow-layer-1}

1. Nếu nạp ERC-20, người nạp tiền sẽ cấp cho cầu nối một hạn mức để chi tiêu số tiền đang được nạp
2. Người nạp tiền gọi cầu nối l1 (`depositERC20`, `depositERC20To`, `depositETH`, hoặc `depositETHTo`)
3. Cầu nối l1 nắm quyền sở hữu tài sản được chuyển qua cầu nối
   - ETH: Tài sản được người nạp tiền chuyển như một phần của lệnh gọi
   - ERC-20: Tài sản được cầu nối tự chuyển cho chính nó bằng cách sử dụng hạn mức do người nạp tiền cung cấp
4. Cầu nối l1 sử dụng cơ chế thông điệp liên miền để gọi `finalizeDeposit` trên cầu nối l2

#### Lớp 2 {#deposit-flow-layer-2}

5. Cầu nối l2 xác minh lệnh gọi đến `finalizeDeposit` là hợp lệ:
   - Đến từ hợp đồng thông điệp liên miền
   - Ban đầu xuất phát từ cầu nối trên l1
6. Cầu nối l2 kiểm tra xem hợp đồng token ERC-20 trên l2 có đúng không:
   - Hợp đồng l2 báo cáo rằng đối tác l1 của nó giống với đối tác mà các token xuất phát từ l1
   - Hợp đồng l2 báo cáo rằng nó hỗ trợ đúng giao diện ([sử dụng ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Nếu hợp đồng l2 là hợp đồng đúng, hãy gọi nó để đúc số lượng token thích hợp đến địa chỉ thích hợp. Nếu không, hãy bắt đầu quá trình rút tiền để cho phép người dùng yêu cầu nhận các token trên l1.

### Luồng rút tiền {#withdrawal-flow}

#### Lớp 2 {#withdrawal-flow-layer-2}

1. Người rút tiền gọi cầu nối l2 (`withdraw` hoặc `withdrawTo`)
2. Cầu nối l2 đốt số lượng token thích hợp thuộc về `msg.sender`
3. Cầu nối l2 sử dụng cơ chế thông điệp liên miền để gọi `finalizeETHWithdrawal` hoặc `finalizeERC20Withdrawal` trên cầu nối l1

#### Lớp 1 {#withdrawal-flow-layer-1}

4. Cầu nối l1 xác minh lệnh gọi đến `finalizeETHWithdrawal` hoặc `finalizeERC20Withdrawal` là hợp lệ:
   - Đến từ cơ chế thông điệp liên miền
   - Ban đầu xuất phát từ cầu nối trên l2
5. Cầu nối l1 chuyển tài sản thích hợp (ETH hoặc ERC-20) đến địa chỉ thích hợp

## Mã lớp 1 {#layer-1-code}

Đây là mã chạy trên l1, Mạng chính Ethereum.

### IL1ERC20Bridge {#il1erc20bridge}

[Giao diện này được định nghĩa tại đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Nó bao gồm các hàm và định nghĩa cần thiết để chuyển token ERC-20 qua cầu nối.

```solidity
// SPDX-License-Identifier: MIT
```

[Hầu hết mã của Optimism được phát hành theo giấy phép MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Tại thời điểm viết bài, phiên bản mới nhất của Solidity là 0.8.12.
Cho đến khi phiên bản 0.9.0 được phát hành, chúng ta không biết liệu mã này có tương thích với nó hay không.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Sự kiện *
     **********/

    event ERC20DepositInitiated(
```

Trong thuật ngữ cầu nối Optimism, _deposit_ (nạp tiền) có nghĩa là chuyển từ l1 sang l2 và _withdrawal_ (rút tiền) có nghĩa là chuyển từ l2 sang l1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Trong hầu hết các trường hợp, địa chỉ của một ERC-20 trên l1 không giống với địa chỉ của ERC-20 tương đương trên l2.
[Bạn có thể xem danh sách các địa chỉ token tại đây](https://static.optimism.io/optimism.tokenlist.json).
Địa chỉ có `chainId` 1 nằm trên l1 (Mạng chính) và địa chỉ có `chainId` 10 nằm trên l2 (Optimism).
Hai giá trị `chainId` còn lại dành cho mạng thử nghiệm Kovan (42) và mạng thử nghiệm Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Có thể thêm ghi chú vào các giao dịch chuyển, trong trường hợp đó, chúng được thêm vào các sự kiện báo cáo chúng.

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Cùng một hợp đồng cầu nối xử lý các giao dịch chuyển theo cả hai hướng.
Trong trường hợp của cầu nối l1, điều này có nghĩa là khởi tạo các khoản nạp tiền và hoàn tất các khoản rút tiền.

```solidity

    /********************
     * Các hàm công khai *
     ********************/

    /**
     * @dev lấy Địa chỉ của hợp đồng cầu nối l2 tương ứng.
     * @return Địa chỉ của hợp đồng cầu nối l2 tương ứng.
     */
    function l2TokenBridge() external returns (address);
```

Hàm này không thực sự cần thiết, vì trên l2 nó là một hợp đồng được triển khai trước, vì vậy nó luôn ở địa chỉ `0x4200000000000000000000000000000000000010`.
Nó ở đây để đối xứng với cầu nối l2, vì địa chỉ của cầu nối l1 _không_ dễ để biết.

```solidity
    /**
     * @dev nạp một lượng ERC-20 vào số dư của người gọi trên l2.
     * @param _l1Token Địa chỉ của ERC-20 l1 mà chúng ta đang nạp
     * @param _l2Token Địa chỉ của ERC-20 l2 tương ứng với l1
     * @param _amount Số lượng ERC-20 cần nạp
     * @param _l2Gas Giới hạn Gas yêu cầu để hoàn thành việc nạp trên l2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến l2. Dữ liệu này được cung cấp
     *        chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *        độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Tham số `_l2Gas` là lượng Gas l2 mà giao dịch được phép chi tiêu.
[Lên đến một giới hạn (cao) nhất định, điều này là miễn phí](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), vì vậy trừ khi hợp đồng ERC-20 làm điều gì đó thực sự kỳ lạ khi đúc, nó sẽ không thành vấn đề.
Hàm này xử lý kịch bản phổ biến, trong đó người dùng chuyển tài sản qua cầu nối đến cùng một địa chỉ trên một Chuỗi khối khác.

```solidity
    /**
     * @dev nạp một lượng ERC-20 vào số dư của người nhận trên l2.
     * @param _l1Token Địa chỉ của ERC-20 l1 mà chúng ta đang nạp
     * @param _l2Token Địa chỉ của ERC-20 l2 tương ứng với l1
     * @param _to Địa chỉ l2 để ghi có khoản rút tiền.
     * @param _amount Số lượng ERC-20 cần nạp.
     * @param _l2Gas Giới hạn Gas yêu cầu để hoàn thành việc nạp trên l2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến l2. Dữ liệu này được cung cấp
     *        chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *        độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Hàm này gần như giống hệt với `depositERC20`, nhưng nó cho phép bạn gửi ERC-20 đến một địa chỉ khác.

```solidity
    /*************************
     * Các hàm chéo chuỗi *
     *************************/

    /**
     * @dev Hoàn thành việc rút tiền từ l2 sang l1 và ghi có tiền vào số dư của người nhận đối với
     * token ERC-20 l1.
     * Lệnh gọi này sẽ thất bại nếu khoản rút tiền được khởi tạo từ l2 chưa được hoàn tất.
     *
     * @param _l1Token Địa chỉ của token l1 để finalizeWithdrawal.
     * @param _l2Token Địa chỉ của token l2 nơi khoản rút tiền được khởi tạo.
     * @param _from Địa chỉ l2 khởi tạo việc chuyển.
     * @param _to Địa chỉ l1 để ghi có khoản rút tiền.
     * @param _amount Số lượng ERC-20 cần nạp.
     * @param _data Dữ liệu được cung cấp bởi người gửi trên l2. Dữ liệu này được cung cấp
     *   chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *   độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Việc rút tiền (và các thông điệp khác từ l2 sang l1) trong Optimism là một quá trình gồm hai bước:

1. Một giao dịch khởi tạo trên l2.
2. Một giao dịch hoàn tất hoặc yêu cầu nhận trên l1.
   Giao dịch này cần diễn ra sau khi [thời gian thử thách lỗi](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) cho giao dịch l2 kết thúc.

### IL1StandardBridge {#il1standardbridge}

[Giao diện này được định nghĩa tại đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Tệp này chứa các định nghĩa sự kiện và hàm cho ETH.
Các định nghĩa này rất giống với các định nghĩa trong `IL1ERC20Bridge` ở trên cho ERC-20.

Giao diện cầu nối được chia thành hai tệp vì một số token ERC-20 yêu cầu xử lý tùy chỉnh và không thể được xử lý bởi cầu nối tiêu chuẩn.
Bằng cách này, cầu nối tùy chỉnh xử lý token như vậy có thể triển khai `IL1ERC20Bridge` và không phải chuyển cả ETH qua cầu nối.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Sự kiện *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Sự kiện này gần như giống hệt với phiên bản ERC-20 (`ERC20DepositInitiated`), ngoại trừ việc không có địa chỉ token l1 và l2.
Điều tương tự cũng đúng với các sự kiện và hàm khác.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /********************
     * Các hàm công khai *
     ********************/

    /**
     * @dev Nạp một lượng ETH vào số dư của người gọi trên l2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Nạp một lượng ETH vào số dư của người nhận trên l2.
            .
            .
            .
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Các hàm chéo chuỗi *
     *************************/

    /**
     * @dev Hoàn thành việc rút tiền từ l2 sang l1 và ghi có tiền vào số dư của người nhận đối với
     * token ETH l1. Vì chỉ xDomainMessenger mới có thể gọi hàm này, nó sẽ không bao giờ được gọi
     * trước khi khoản rút tiền được hoàn tất.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[Hợp đồng này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) được kế thừa bởi cả hai cầu nối ([l1](#the-l1-bridge-contract) và [l2](#l2-bridge-code)) để gửi thông điệp đến lớp kia.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Nhập giao diện */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) cho hợp đồng biết cách gửi thông điệp đến lớp kia, sử dụng trình nhắn tin liên miền.
Trình nhắn tin liên miền này là một hệ thống hoàn toàn khác và xứng đáng có một bài viết riêng, mà tôi hy vọng sẽ viết trong tương lai.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Hợp đồng trợ giúp cho các hợp đồng thực hiện giao tiếp chéo miền
 *
 * Trình biên dịch được sử dụng: được xác định bởi hợp đồng kế thừa
 */
contract CrossDomainEnabled {
    /*************
     * Các biến *
     *************/

    // Hợp đồng Messenger được sử dụng để gửi và nhận thông điệp từ miền khác.
    address public messenger;

    /***************
     * Hàm khởi tạo *
     ***************/

    /**
     * @param _messenger Địa chỉ của CrossDomainMessenger trên lớp hiện tại.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Một tham số mà hợp đồng cần biết, địa chỉ của trình nhắn tin liên miền trên lớp này.
Tham số này được thiết lập một lần, trong hàm khởi tạo và không bao giờ thay đổi.

```solidity

    /**********************
     * Các modifier của hàm *
     **********************/

    /**
     * Bắt buộc rằng hàm được sửa đổi chỉ có thể được gọi bởi một tài khoản chéo miền cụ thể.
     * @param _sourceDomainAccount Tài khoản duy nhất trên miền gốc được
     *  xác thực để gọi hàm này.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Bất kỳ hợp đồng nào trên Chuỗi khối nơi nó đang chạy (Mạng chính Ethereum hoặc Optimism) đều có thể truy cập tính năng nhắn tin liên miền.
Nhưng chúng ta cần cầu nối ở mỗi bên _chỉ_ tin tưởng một số thông điệp nhất định nếu chúng đến từ cầu nối ở bên kia.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Chỉ những thông điệp từ trình nhắn tin liên miền thích hợp (`messenger`, như bạn thấy bên dưới) mới có thể được tin tưởng.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Cách trình nhắn tin liên miền cung cấp địa chỉ đã gửi thông điệp với lớp kia là [hàm `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Miễn là nó được gọi trong giao dịch được khởi tạo bởi thông điệp, nó có thể cung cấp thông tin này.

Chúng ta cần đảm bảo rằng thông điệp chúng ta nhận được đến từ cầu nối kia.

```solidity

        _;
    }

    /**********************
     * Các hàm nội bộ *
     **********************/

    /**
     * Lấy messenger, thường là từ bộ nhớ. Hàm này được hiển thị trong trường hợp một hợp đồng con
     * cần ghi đè.
     * @return Địa chỉ của hợp đồng messenger chéo miền nên được sử dụng.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Hàm này trả về trình nhắn tin liên miền.
Chúng ta sử dụng một hàm thay vì biến `messenger` để cho phép các hợp đồng kế thừa từ hợp đồng này sử dụng một thuật toán để chỉ định trình nhắn tin liên miền nào sẽ được sử dụng.

```solidity

    /**
     * Gửi một thông điệp đến một tài khoản trên miền khác
     * @param _crossDomainTarget Người nhận dự kiến trên miền đích
     * @param _message Dữ liệu để gửi đến mục tiêu (thường là dữ liệu lệnh gọi đến một hàm có
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit Giới hạn Gas cho việc nhận thông điệp trên miền đích.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Cuối cùng, hàm gửi thông điệp đến lớp kia.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) là một công cụ phân tích tĩnh mà Optimism chạy trên mọi hợp đồng để tìm kiếm các lỗ hổng và các vấn đề tiềm ẩn khác.
Trong trường hợp này, dòng sau kích hoạt hai lỗ hổng:

1. [Các sự kiện tái xâm nhập](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Tái xâm nhập lành tính](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Trong trường hợp này, chúng ta không lo lắng về việc tái xâm nhập vì chúng ta biết `getCrossDomainMessenger()` trả về một địa chỉ đáng tin cậy, ngay cả khi Slither không có cách nào để biết điều đó.

### Hợp đồng cầu nối l1 {#the-l1-bridge-contract}

[Mã nguồn cho hợp đồng này ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Các giao diện có thể là một phần của các hợp đồng khác, vì vậy chúng phải hỗ trợ nhiều phiên bản Solidity.
Nhưng bản thân cầu nối là hợp đồng của chúng ta và chúng ta có thể nghiêm ngặt về phiên bản Solidity mà nó sử dụng.

```solidity
/* Nhập giao diện */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#il1erc20bridge) và [IL1StandardBridge](#il1standardbridge) đã được giải thích ở trên.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) cho phép chúng ta tạo các thông điệp để điều khiển cầu nối tiêu chuẩn trên l2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Giao diện này](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) cho phép chúng ta điều khiển các hợp đồng ERC-20.
[Bạn có thể đọc thêm về nó tại đây](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Nhập thư viện */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Như đã giải thích ở trên](#crossdomainenabled), hợp đồng này được sử dụng để nhắn tin giữa các lớp.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) có các địa chỉ cho các hợp đồng l2 luôn có cùng một địa chỉ. Điều này bao gồm cầu nối tiêu chuẩn trên l2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Các tiện ích Địa chỉ của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Nó được sử dụng để phân biệt giữa các địa chỉ hợp đồng và các địa chỉ thuộc về các tài khoản thuộc sở hữu bên ngoài (EOA).

Lưu ý rằng đây không phải là một giải pháp hoàn hảo, vì không có cách nào để phân biệt giữa các lệnh gọi trực tiếp và các lệnh gọi được thực hiện từ hàm khởi tạo của hợp đồng, nhưng ít nhất điều này cho phép chúng ta xác định và ngăn chặn một số lỗi phổ biến của người dùng.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Tiêu chuẩn ERC-20](https://eips.ethereum.org/EIPS/eip-20) hỗ trợ hai cách để một hợp đồng báo cáo lỗi:

1. Hoàn nguyên
2. Trả về `false`

Việc xử lý cả hai trường hợp sẽ làm cho mã của chúng ta phức tạp hơn, vì vậy thay vào đó, chúng ta sử dụng [`SafeERC20` của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), điều này đảm bảo [tất cả các lỗi đều dẫn đến việc hoàn nguyên](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Cầu nối ETH và ERC-20 l1 là một hợp đồng lưu trữ tiền l1 đã nạp và các token
 * tiêu chuẩn đang được sử dụng trên l2. Nó đồng bộ hóa một cầu nối l2 tương ứng, thông báo cho nó về các khoản nạp
 * và lắng nghe nó đối với các khoản rút tiền mới được hoàn tất.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Dòng này là cách chúng ta chỉ định sử dụng trình bao bọc `SafeERC20` mỗi khi chúng ta sử dụng giao diện `IERC20`.

```solidity

    /********************************
     * Tham chiếu hợp đồng bên ngoài *
     ********************************/

    address public l2TokenBridge;
```

Địa chỉ của [L2StandardBridge](#l2-bridge-code).

```solidity

    // Ánh xạ token l1 sang token l2 sang số dư của token l1 đã nạp
    mapping(address => mapping(address => uint256)) public deposits;
```

Một [ánh xạ (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) kép như thế này là cách bạn định nghĩa một [mảng thưa hai chiều](https://en.wikipedia.org/wiki/Sparse_matrix).
Các giá trị trong cấu trúc dữ liệu này được xác định là `deposit[L1 token addr][L2 token addr]`.
Giá trị mặc định là 0.
Chỉ những ô được đặt thành một giá trị khác mới được ghi vào bộ nhớ.

```solidity

    /***************
     * Hàm khởi tạo *
     ***************/

    // Hợp đồng này nằm sau một proxy, vì vậy các tham số của hàm khởi tạo sẽ không được sử dụng.
    constructor() CrossDomainEnabled(address(0)) {}
```

Để có thể nâng cấp hợp đồng này mà không cần phải sao chép tất cả các biến trong bộ nhớ.
Để làm điều đó, chúng ta sử dụng một [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), một hợp đồng sử dụng [`delegatecall`](https://solidity-by-example.org/delegatecall/) để chuyển các lệnh gọi đến một hợp đồng riêng biệt có địa chỉ được lưu trữ bởi hợp đồng proxy (khi bạn nâng cấp, bạn yêu cầu proxy thay đổi địa chỉ đó).
Khi bạn sử dụng `delegatecall`, bộ nhớ vẫn là bộ nhớ của hợp đồng _gọi_, vì vậy các giá trị của tất cả các biến trạng thái hợp đồng không bị ảnh hưởng.

Một tác động của mẫu này là bộ nhớ của hợp đồng được _gọi_ của `delegatecall` không được sử dụng và do đó các giá trị hàm khởi tạo được truyền cho nó không quan trọng.
Đây là lý do chúng ta có thể cung cấp một giá trị vô nghĩa cho hàm khởi tạo `CrossDomainEnabled`.
Đó cũng là lý do việc khởi tạo bên dưới tách biệt với hàm khởi tạo.

```solidity
    /******************
     * Khởi tạo *
     ******************/

    /**
     * @param _l1messenger Địa chỉ Messenger l1 đang được sử dụng cho các giao tiếp chéo chuỗi.
     * @param _l2TokenBridge Địa chỉ cầu nối tiêu chuẩn l2.
     */
    // slither-disable-next-line external-function
```

[Bài kiểm tra Slither](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) này xác định các hàm không được gọi từ mã hợp đồng và do đó có thể được khai báo là `external` thay vì `public`.
Chi phí Gas của các hàm `external` có thể thấp hơn, vì chúng có thể được cung cấp các tham số trong dữ liệu lệnh gọi.
Các hàm được khai báo là `public` phải có thể truy cập được từ bên trong hợp đồng.
Các hợp đồng không thể sửa đổi dữ liệu lệnh gọi của chính chúng, vì vậy các tham số phải nằm trong bộ nhớ (memory).
Khi một hàm như vậy được gọi từ bên ngoài, cần phải sao chép dữ liệu lệnh gọi vào bộ nhớ, điều này tốn Gas.
Trong trường hợp này, hàm chỉ được gọi một lần, vì vậy sự kém hiệu quả không quan trọng đối với chúng ta.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Hàm `initialize` chỉ nên được gọi một lần.
Nếu địa chỉ của trình nhắn tin liên miền l1 hoặc cầu nối token l2 thay đổi, chúng ta tạo một proxy mới và một cầu nối mới gọi nó.
Điều này khó có thể xảy ra ngoại trừ khi toàn bộ hệ thống được nâng cấp, một sự cố rất hiếm gặp.

Lưu ý rằng hàm này không có bất kỳ cơ chế nào hạn chế _ai_ có thể gọi nó.
Điều này có nghĩa là về lý thuyết, một kẻ tấn công có thể đợi cho đến khi chúng ta triển khai proxy và phiên bản đầu tiên của cầu nối, sau đó [chạy trước](https://solidity-by-example.org/hacks/front-running/) để đến hàm `initialize` trước khi người dùng hợp pháp làm điều đó. Nhưng có hai phương pháp để ngăn chặn điều này:

1. Nếu các hợp đồng không được triển khai trực tiếp bởi một EOA mà [trong một giao dịch có một hợp đồng khác tạo ra chúng](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), toàn bộ quá trình có thể là nguyên tử (atomic) và kết thúc trước khi bất kỳ giao dịch nào khác được thực thi.
2. Nếu lệnh gọi hợp pháp đến `initialize` thất bại, luôn có thể bỏ qua proxy và cầu nối mới được tạo và tạo những cái mới.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Đây là hai tham số mà cầu nối cần biết.

```solidity

    /**************
     * Nạp tiền *
     **************/

    /** @dev Modifier yêu cầu người gửi phải là EOA. Kiểm tra này có thể bị vượt qua bởi một hợp đồng
     *  độc hại thông qua initcode, nhưng nó xử lý lỗi người dùng mà chúng ta muốn tránh.
     */
    modifier onlyEOA() {
        // Được sử dụng để ngăn chặn việc nạp tiền từ các hợp đồng (tránh vô tình làm mất token)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Đây là lý do chúng ta cần các tiện ích `Address` của OpenZeppelin.

```solidity
    /**
     * @dev Hàm này có thể được gọi mà không cần dữ liệu
     * để nạp một lượng ETH vào số dư của người gọi trên l2.
     * Vì hàm receive không nhận dữ liệu, một số lượng mặc định
     * thận trọng sẽ được chuyển tiếp đến l2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Hàm này tồn tại cho mục đích thử nghiệm.
Lưu ý rằng nó không xuất hiện trong các định nghĩa giao diện - nó không dành cho mục đích sử dụng thông thường.

```solidity
    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

Hai hàm này là các trình bao bọc xung quanh `_initiateETHDeposit`, hàm xử lý việc nạp ETH thực tế.

```solidity
    /**
     * @dev Thực hiện logic cho các khoản nạp bằng cách lưu trữ ETH và thông báo cho Cổng ETH l2 về
     * khoản nạp.
     * @param _from Tài khoản để kéo khoản nạp từ trên l1.
     * @param _to Tài khoản để cung cấp khoản nạp cho trên l2.
     * @param _l2Gas Giới hạn Gas yêu cầu để hoàn thành việc nạp trên l2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến l2. Dữ liệu này được cung cấp
     *        chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *        độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Xây dựng dữ liệu lệnh gọi cho lệnh gọi finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Cách hoạt động của các thông điệp liên miền là hợp đồng đích được gọi với thông điệp là dữ liệu lệnh gọi của nó.
Các hợp đồng Solidity luôn diễn giải dữ liệu lệnh gọi của chúng theo
[các thông số kỹ thuật ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Hàm Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) tạo ra dữ liệu lệnh gọi đó.

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

Thông điệp ở đây là gọi [hàm `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) với các tham số này:

| Tham số | Giá trị | Ý nghĩa |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0) | Giá trị đặc biệt đại diện cho ETH (không phải là token ERC-20) trên l1 |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Hợp đồng l2 quản lý ETH trên Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (hợp đồng này chỉ dành cho mục đích sử dụng nội bộ của Optimism) |
| \_from | \_from | Địa chỉ trên l1 gửi ETH |
| \_to | \_to | Địa chỉ trên l2 nhận ETH |
| amount | msg.value | Số lượng Wei được gửi (đã được gửi đến cầu nối) |
| \_data | \_data | Dữ liệu bổ sung để đính kèm vào khoản nạp tiền |

```solidity
        // Gửi dữ liệu lệnh gọi vào l2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Gửi thông điệp thông qua trình nhắn tin liên miền.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Phát ra một sự kiện để thông báo cho bất kỳ ứng dụng phi tập trung (dapp) nào lắng nghe giao dịch chuyển này.

```solidity
    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

Hai hàm này là các trình bao bọc xung quanh `_initiateERC20Deposit`, hàm xử lý việc nạp ERC-20 thực tế.

```solidity
    /**
     * @dev Thực hiện logic cho các khoản nạp bằng cách thông báo cho hợp đồng Token Đã nạp l2
     * về khoản nạp và gọi một trình xử lý để khóa tiền l1. (ví dụ: transferFrom)
     *
     * @param _l1Token Địa chỉ của ERC-20 l1 mà chúng ta đang nạp
     * @param _l2Token Địa chỉ của ERC-20 l2 tương ứng với l1
     * @param _from Tài khoản để kéo khoản nạp từ trên l1
     * @param _to Tài khoản để cung cấp khoản nạp cho trên l2
     * @param _amount Số lượng ERC-20 cần nạp.
     * @param _l2Gas Giới hạn Gas yêu cầu để hoàn thành việc nạp trên l2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến l2. Dữ liệu này được cung cấp
     *        chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *        độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

Hàm này tương tự như `_initiateETHDeposit` ở trên, với một vài điểm khác biệt quan trọng.
Sự khác biệt đầu tiên là hàm này nhận các địa chỉ token và số lượng cần chuyển làm tham số.
Trong trường hợp của ETH, lệnh gọi đến cầu nối đã bao gồm việc chuyển tài sản vào tài khoản cầu nối (`msg.value`).

```solidity
        // Khi một khoản nạp được khởi tạo trên l1, cầu nối l1 sẽ chuyển tiền cho chính nó cho các khoản
        // rút tiền trong tương lai. safeTransferFrom cũng kiểm tra xem hợp đồng có mã hay không, vì vậy điều này sẽ thất bại nếu
        // _from là một EOA hoặc Địa chỉ(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Các giao dịch chuyển token ERC-20 tuân theo một quy trình khác với ETH:

1. Người dùng (`_from`) cấp một hạn mức cho cầu nối để chuyển các token thích hợp.
2. Người dùng gọi cầu nối với địa chỉ của hợp đồng token, số lượng, v.v.
3. Cầu nối chuyển các token (cho chính nó) như một phần của quá trình nạp tiền.

Bước đầu tiên có thể xảy ra trong một giao dịch riêng biệt với hai bước cuối cùng.
Tuy nhiên, việc chạy trước không phải là vấn đề vì hai hàm gọi `_initiateERC20Deposit` (`depositERC20` và `depositERC20To`) chỉ gọi hàm này với `msg.sender` làm tham số `_from`.

```solidity
        // Xây dựng dữ liệu lệnh gọi cho _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Gửi dữ liệu lệnh gọi vào l2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Thêm số lượng token đã nạp vào cấu trúc dữ liệu `deposits`.
Có thể có nhiều địa chỉ trên l2 tương ứng với cùng một token ERC-20 l1, vì vậy việc sử dụng số dư của cầu nối đối với token ERC-20 l1 để theo dõi các khoản nạp tiền là không đủ.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Các hàm chéo chuỗi *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Cầu nối l2 gửi một thông điệp đến trình nhắn tin liên miền l2, điều này khiến trình nhắn tin liên miền l1 gọi hàm này (tất nhiên là sau khi [giao dịch hoàn tất thông điệp](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) được gửi trên l1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Đảm bảo rằng đây là một thông điệp _hợp lệ_, đến từ trình nhắn tin liên miền và bắt nguồn từ cầu nối token l2.
Hàm này được sử dụng để rút ETH khỏi cầu nối, vì vậy chúng ta phải đảm bảo nó chỉ được gọi bởi người gọi được ủy quyền.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Cách để chuyển ETH là gọi người nhận với số lượng Wei trong `msg.value`.

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

Phát ra một sự kiện về việc rút tiền.

```solidity
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Hàm này tương tự như `finalizeETHWithdrawal` ở trên, với những thay đổi cần thiết cho các token ERC-20.

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

Cập nhật cấu trúc dữ liệu `deposits`.

```solidity

        // Khi một khoản rút tiền được hoàn tất trên l1, cầu nối l1 sẽ chuyển tiền cho người rút tiền
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /*****************************
     * Tạm thời - Di chuyển ETH *
     *****************************/

    /**
     * @dev Thêm số dư ETH vào tài khoản. Điều này nhằm cho phép ETH
     * được di chuyển từ một cổng cũ sang một cổng mới.
     * LƯU Ý: Điều này chỉ được giữ lại cho một lần nâng cấp để chúng ta có thể nhận được ETH đã di chuyển từ
     * hợp đồng cũ
     */
    function donateETH() external payable {}
}
```

Đã có một bản triển khai trước đó của cầu nối.
Khi chúng ta chuyển từ bản triển khai đó sang bản này, chúng ta phải di chuyển tất cả các tài sản.
Các token ERC-20 có thể chỉ cần được di chuyển.
Tuy nhiên, để chuyển ETH đến một hợp đồng, bạn cần sự chấp thuận của hợp đồng đó, đó là những gì `donateETH` cung cấp cho chúng ta.

## Token ERC-20 trên Lớp 2 {#erc-20-tokens-on-l2}

Để một token ERC-20 phù hợp với cầu nối tiêu chuẩn, nó cần cho phép cầu nối tiêu chuẩn và _chỉ_ cầu nối tiêu chuẩn, đúc token.
Điều này là cần thiết vì các cầu nối cần đảm bảo rằng số lượng token lưu thông trên Optimism bằng với số lượng token bị khóa bên trong hợp đồng cầu nối l1.
Nếu có quá nhiều token trên l2, một số người dùng sẽ không thể chuyển tài sản của họ qua cầu nối trở lại l1.
Thay vì một cầu nối đáng tin cậy, về cơ bản chúng ta sẽ tạo lại [ngân hàng dự trữ theo tỷ lệ](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Nếu có quá nhiều token trên l1, một số token đó sẽ bị khóa vĩnh viễn bên trong hợp đồng cầu nối vì không có cách nào để giải phóng chúng mà không đốt các token l2.

### IL2StandardERC20 {#il2standarderc20}

Mọi token ERC-20 trên l2 sử dụng cầu nối tiêu chuẩn đều cần cung cấp [giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), giao diện này có các hàm và sự kiện mà cầu nối tiêu chuẩn cần.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Giao diện ERC-20 tiêu chuẩn](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) không bao gồm các hàm `mint` và `burn`.
Các phương thức đó không được yêu cầu bởi [tiêu chuẩn ERC-20](https://eips.ethereum.org/EIPS/eip-20), tiêu chuẩn này không chỉ định các cơ chế để tạo và tiêu hủy token.

```solidity
import { IERC-165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Giao diện ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) được sử dụng để chỉ định những hàm mà một hợp đồng cung cấp.
[Bạn có thể đọc tiêu chuẩn tại đây](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Hàm này cung cấp địa chỉ của token l1 được chuyển qua cầu nối đến hợp đồng này.
Lưu ý rằng chúng ta không có một hàm tương tự theo hướng ngược lại.
Chúng ta cần có khả năng chuyển qua cầu nối bất kỳ token l1 nào, bất kể việc hỗ trợ l2 có được lên kế hoạch khi nó được triển khai hay không.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Các hàm và sự kiện để đúc (tạo) và đốt (tiêu hủy) token.
Cầu nối phải là thực thể duy nhất có thể chạy các hàm này để đảm bảo số lượng token là chính xác (bằng với số lượng token bị khóa trên l1).

### L2StandardERC20 {#l2standarderc20}

[Đây là bản triển khai của chúng tôi cho giao diện `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Trừ khi bạn cần một số loại logic tùy chỉnh, bạn nên sử dụng bản này.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Hợp đồng ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism không tin vào việc phát minh lại bánh xe, đặc biệt là khi bánh xe đã được kiểm toán tốt và cần đủ đáng tin cậy để nắm giữ tài sản.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Đây là hai tham số cấu hình bổ sung mà chúng ta yêu cầu và ERC-20 thông thường thì không.

```solidity

    /**
     * @param _l2Bridge Địa chỉ của cầu nối tiêu chuẩn l2.
     * @param _l1Token Địa chỉ của token l1 tương ứng.
     * @param _name Tên ERC-20.
     * @param _symbol Ký hiệu ERC-20.
     */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

Đầu tiên gọi hàm khởi tạo cho hợp đồng mà chúng ta kế thừa (`ERC20(_name, _symbol)`) và sau đó thiết lập các biến của riêng chúng ta.

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

Đây là cách [ERC-165](https://eips.ethereum.org/EIPS/eip-165) hoạt động.
Mỗi giao diện là một số lượng các hàm được hỗ trợ và được xác định là [phép toán XOR (exclusive or)](https://en.wikipedia.org/wiki/Exclusive_or) của [các bộ chọn hàm ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) của các hàm đó.

Cầu nối l2 sử dụng ERC-165 như một bước kiểm tra tính hợp lý để đảm bảo rằng hợp đồng ERC-20 mà nó gửi tài sản đến là một `IL2StandardERC20`.

**Lưu ý:** Không có gì ngăn cản hợp đồng lừa đảo cung cấp câu trả lời sai cho `supportsInterface`, vì vậy đây là một cơ chế kiểm tra tính hợp lý, _không phải_ là một cơ chế bảo mật.

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

Chỉ cầu nối l2 mới được phép đúc và đốt tài sản.

`_mint` và `_burn` thực sự được định nghĩa trong [hợp đồng ERC-20 của OpenZeppelin](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Hợp đồng đó chỉ không hiển thị chúng ra bên ngoài, vì các điều kiện để đúc và đốt token cũng đa dạng như số cách sử dụng ERC-20.

## Mã cầu nối Lớp 2 {#l2-bridge-code}

Đây là mã chạy cầu nối trên Optimism.
[Mã nguồn cho hợp đồng này ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Nhập giao diện */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Giao diện [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) rất giống với [phiên bản l1 tương đương](#il1erc20bridge) mà chúng ta đã thấy ở trên.
Có hai điểm khác biệt đáng kể:

1. Trên l1, bạn khởi tạo các khoản nạp tiền và hoàn tất các khoản rút tiền.
   Ở đây, bạn khởi tạo các khoản rút tiền và hoàn tất các khoản nạp tiền.
2. Trên l1, cần phải phân biệt giữa ETH và token ERC-20.
   Trên l2, chúng ta có thể sử dụng cùng các hàm cho cả hai vì trong nội bộ, số dư ETH trên Optimism được xử lý như một token ERC-20 với địa chỉ [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Nhập thư viện */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Nhập hợp đồng */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Cầu nối tiêu chuẩn l2 là một hợp đồng hoạt động cùng với cầu nối tiêu chuẩn l1 để
 * cho phép các quá trình chuyển đổi ETH và ERC-20 giữa l1 và l2.
 * Hợp đồng này hoạt động như một công cụ đúc cho các token mới khi nó nghe về các khoản nạp vào cầu nối tiêu chuẩn
 * l1.
 * Hợp đồng này cũng hoạt động như một công cụ đốt các token dự định để rút tiền, thông báo cho cầu nối
 * l1 để giải phóng tiền l1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Tham chiếu hợp đồng bên ngoài *
     ********************************/

    address public l1TokenBridge;
```

Theo dõi địa chỉ của cầu nối l1.
Lưu ý rằng trái ngược với phiên bản l1 tương đương, ở đây chúng ta _cần_ biến này.
Địa chỉ của cầu nối l1 không được biết trước.

```solidity

    /***************
     * Hàm khởi tạo *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Messenger chéo miền được sử dụng bởi hợp đồng này.
     * @param _l1TokenBridge Địa chỉ của cầu nối l1 được triển khai trên chuỗi chính.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Rút tiền *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

Hai hàm này khởi tạo các khoản rút tiền.
Lưu ý rằng không cần chỉ định địa chỉ token l1.
Các token l2 được kỳ vọng sẽ cho chúng ta biết địa chỉ của phiên bản l1 tương đương.

```solidity

    /**
     * @dev Thực hiện logic cho các khoản rút tiền bằng cách đốt token và thông báo
     *      cho Cổng token l1 về khoản rút tiền.
     * @param _l2Token Địa chỉ của token l2 nơi khoản rút tiền được khởi tạo.
     * @param _from Tài khoản để kéo khoản rút tiền từ trên l2.
     * @param _to Tài khoản để cung cấp khoản rút tiền cho trên l1.
     * @param _amount Số lượng token cần rút.
     * @param _l1Gas Không được sử dụng, nhưng được bao gồm cho các cân nhắc tương thích chuyển tiếp tiềm năng.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến l1. Dữ liệu này được cung cấp
     *        chỉ để tạo sự thuận tiện cho các hợp đồng bên ngoài. Ngoài việc bắt buộc
     *        độ dài tối đa, các hợp đồng này không cung cấp đảm bảo nào về nội dung của nó.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Khi một khoản rút tiền được khởi tạo, chúng ta đốt tiền của người rút tiền để ngăn chặn việc sử dụng l2
        // sau đó
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Lưu ý rằng chúng ta _không_ dựa vào tham số `_from` mà dựa vào `msg.sender`, điều này khó làm giả hơn rất nhiều (theo tôi biết là không thể).

```solidity

        // Xây dựng dữ liệu lệnh gọi cho l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Trên l1, cần phải phân biệt giữa ETH và ERC-20.

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Gửi thông điệp lên cầu nối l1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Hàm chéo chuỗi: Nạp tiền *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

Hàm này được gọi bởi `L1StandardBridge`.

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

Đảm bảo nguồn của thông điệp là hợp lệ.
Điều này rất quan trọng vì hàm này gọi `_mint` và có thể được sử dụng để cung cấp các token không được bảo chứng bởi các token mà cầu nối sở hữu trên l1.

```solidity
        // Kiểm tra token mục tiêu có tuân thủ và
        // xác minh token đã nạp trên l1 khớp với đại diện token đã nạp l2 ở đây
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Các bước kiểm tra tính hợp lý:

1. Giao diện đúng được hỗ trợ
2. Địa chỉ l1 của hợp đồng ERC-20 l2 khớp với nguồn l1 của các token

```solidity
        ) {
            // Khi một khoản nạp được hoàn tất, chúng ta ghi có vào tài khoản trên l2 với cùng số lượng
            // token.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Nếu các bước kiểm tra tính hợp lý thành công, hãy hoàn tất khoản nạp tiền:

1. Đúc các token
2. Phát ra sự kiện thích hợp

```solidity
        } else {
            // Hoặc token l2 đang được nạp vào không đồng ý về Địa chỉ chính xác
            // của token l1 của nó, hoặc không hỗ trợ giao diện chính xác.
            // Điều này chỉ nên xảy ra nếu có một token l2 độc hại, hoặc nếu một người dùng bằng cách nào đó
            // đã chỉ định sai Địa chỉ token l2 để nạp vào.
            // Trong cả hai trường hợp, chúng ta dừng quá trình ở đây và xây dựng một
            // thông điệp rút tiền để người dùng có thể lấy tiền của họ ra trong một số trường hợp.
            // Không có cách nào để ngăn chặn hoàn toàn các hợp đồng token độc hại, nhưng điều này giới hạn
            // lỗi người dùng và giảm thiểu một số hình thức hành vi hợp đồng độc hại.
```

Nếu người dùng mắc lỗi có thể phát hiện được bằng cách sử dụng sai địa chỉ token l2, chúng ta muốn hủy khoản nạp tiền và trả lại các token trên l1.
Cách duy nhất chúng ta có thể làm điều này từ l2 là gửi một thông điệp sẽ phải đợi thời gian thử thách lỗi, nhưng điều đó tốt hơn nhiều cho người dùng so với việc mất token vĩnh viễn.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // đã chuyển đổi _to và _from ở đây để trả lại khoản nạp cho người gửi
                _from,
                _amount,
                _data
            );

            // Gửi thông điệp lên cầu nối l1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Kết luận {#conclusion}

Cầu nối tiêu chuẩn là cơ chế linh hoạt nhất cho các giao dịch chuyển tài sản.
Tuy nhiên, vì nó quá chung chung nên không phải lúc nào nó cũng là cơ chế dễ sử dụng nhất.
Đặc biệt đối với việc rút tiền, hầu hết người dùng thích sử dụng [các cầu nối của bên thứ ba](https://optimism.io/apps#bridge) không phải đợi thời gian thử thách và không yêu cầu bằng chứng Merkle để hoàn tất việc rút tiền.

Các cầu nối này thường hoạt động bằng cách có sẵn tài sản trên l1, mà chúng cung cấp ngay lập tức với một khoản phí nhỏ (thường ít hơn chi phí Gas cho một khoản rút tiền qua cầu nối tiêu chuẩn).
Khi cầu nối (hoặc những người điều hành nó) dự đoán sẽ thiếu hụt tài sản l1, nó sẽ chuyển đủ tài sản từ l2. Vì đây là những khoản rút tiền rất lớn, chi phí rút tiền được khấu hao trên một số lượng lớn và chiếm một tỷ lệ phần trăm nhỏ hơn nhiều.

Hy vọng bài viết này đã giúp bạn hiểu thêm về cách lớp 2 hoạt động và cách viết mã Solidity rõ ràng và an toàn.

[Xem thêm các bài viết của tôi tại đây](https://cryptodocguy.pro/).