---
title: "Hướng dẫn hợp đồng cầu nối tiêu chuẩn Optimism"
description: Cầu nối tiêu chuẩn cho Optimism hoạt động như thế nào? Tại sao nó lại hoạt động theo cách này?
author: Ori Pomerantz
tags: [ "solidity", "cầu nối", "lớp 2" ]
skill: intermediate
published: 2022-03-30
lang: vi
---

[Optimism](https://www.optimism.io/) là một [gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups/).
Các gộp giao dịch lạc quan có thể xử lý các giao dịch với mức giá thấp hơn nhiều so với Ethereum Mainnet (còn được gọi là lớp 1 hoặc L1) vì các giao dịch chỉ được xử lý bởi một vài nút, thay vì mọi nút trên mạng.
Đồng thời, tất cả dữ liệu được ghi vào L1 để mọi thứ có thể được chứng minh và tái tạo lại với tất cả sự đảm bảo về tính toàn vẹn và tính khả dụng của Mainnet.

Để sử dụng tài sản L1 trên Optimism (hoặc bất kỳ L2 nào khác), tài sản cần được [bắc cầu](/bridges/#prerequisites).
Một cách để thực hiện điều này là người dùng khóa tài sản (ETH và [token ERC-20](/developers/docs/standards/tokens/erc-20/) là những tài sản phổ biến nhất) trên L1, và nhận tài sản tương đương để sử dụng trên L2.
Cuối cùng, bất cứ ai sở hữu chúng đều có thể muốn bắc cầu chúng trở lại L1.
Khi làm điều này, các tài sản sẽ bị đốt trên L2 và sau đó được trả lại cho người dùng trên L1.

Đây là cách mà [cầu nối tiêu chuẩn của Optimism](https://docs.optimism.io/app-developers/bridging/standard-bridge) hoạt động.
Trong bài viết này, chúng ta sẽ xem qua mã nguồn của cầu nối đó để xem nó hoạt động như thế nào và nghiên cứu nó như một ví dụ về mã Solidity được viết tốt.

## Luồng điều khiển {#control-flows}

Cầu nối có hai luồng chính:

- Gửi tiền (từ L1 đến L2)
- Rút tiền (từ L2 đến L1)

### Luồng gửi tiền {#deposit-flow}

#### Lớp 1 {#deposit-flow-layer-1}

1. Nếu gửi một ERC-20, người gửi cấp cho cầu nối một khoản phụ cấp để chi tiêu số tiền đang được gửi
2. Người gửi gọi cầu nối L1 (`depositERC20`, `depositERC20To`, `depositETH`, hoặc `depositETHTo`)
3. Cầu nối L1 nắm giữ tài sản được bắc cầu
   - ETH: Tài sản được người gửi chuyển như một phần của lệnh gọi
   - ERC-20: Tài sản được cầu nối tự chuyển cho chính nó bằng cách sử dụng khoản phụ cấp do người gửi cung cấp
4. Cầu nối L1 sử dụng cơ chế thông điệp liên miền để gọi `finalizeDeposit` trên cầu nối L2

#### Lớp 2 {#deposit-flow-layer-2}

5. Cầu nối L2 xác minh lệnh gọi đến `finalizeDeposit` là hợp lệ:
   - Đến từ hợp đồng thông điệp liên miền
   - Ban đầu đến từ cầu nối trên L1
6. Cầu nối L2 kiểm tra xem hợp đồng token ERC-20 trên L2 có phải là hợp đồng chính xác không:
   - Hợp đồng L2 báo cáo rằng đối tác L1 của nó giống với hợp đồng mà các token đến từ đó trên L1
   - Hợp đồng L2 báo cáo rằng nó hỗ trợ giao diện chính xác ([sử dụng ERC-165](https://eips.ethereum.org/EIPS/eip-165)).
7. Nếu hợp đồng L2 là hợp đồng chính xác, hãy gọi nó để đúc số lượng token thích hợp vào địa chỉ thích hợp. Nếu không, hãy bắt đầu quy trình rút tiền để cho phép người dùng nhận lại các token trên L1.

### Luồng rút tiền {#withdrawal-flow}

#### Lớp 2 {#withdrawal-flow-layer-2}

1. Người rút gọi cầu nối L2 (`withdraw` hoặc `withdrawTo`)
2. Cầu nối L2 đốt số lượng token thích hợp thuộc về `msg.sender`
3. Cầu nối L2 sử dụng cơ chế thông điệp liên miền để gọi `finalizeETHWithdrawal` hoặc `finalizeERC20Withdrawal` trên cầu nối L1

#### Lớp 1 {#withdrawal-flow-layer-1}

4. Cầu nối L1 xác minh lệnh gọi đến `finalizeETHWithdrawal` hoặc `finalizeERC20Withdrawal` là hợp lệ:
   - Đến từ cơ chế thông điệp liên miền
   - Ban đầu đến từ cầu nối trên L2
5. Cầu nối L1 chuyển tài sản thích hợp (ETH hoặc ERC-20) đến địa chỉ thích hợp

## Mã lớp 1 {#layer-1-code}

Đây là mã chạy trên L1, Ethereum Mainnet.

### IL1ERC20Bridge {#IL1ERC20Bridge}

[Giao diện này được định nghĩa ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
Nó bao gồm các hàm và định nghĩa cần thiết để bắc cầu các token ERC-20.

```solidity
// SPDX-License-Identifier: MIT
```

[Hầu hết mã của Optimism được phát hành theo giấy phép MIT](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).

```solidity
pragma solidity >0.5.0 <0.9.0;
```

Tại thời điểm viết bài, phiên bản mới nhất của Solidity là 0.8.12.
Cho đến khi phiên bản 0.9.0 được phát hành, chúng tôi không biết liệu mã này có tương thích với nó hay không.

```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Các sự kiện *
     **********/

    event ERC20DepositInitiated(
```

Trong thuật ngữ cầu nối Optimism _deposit_ (gửi tiền) có nghĩa là chuyển từ L1 sang L2, và _withdrawal_ (rút tiền) có nghĩa là chuyển từ L2 sang L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

Trong hầu hết các trường hợp, địa chỉ của một ERC-20 trên L1 không giống với địa chỉ của ERC-20 tương đương trên L2.
[Bạn có thể xem danh sách các địa chỉ token ở đây](https://static.optimism.io/optimism.tokenlist.json).
Địa chỉ có `chainId` 1 là trên L1 (Mainnet) và địa chỉ có `chainId` 10 là trên L2 (Optimism).
Hai giá trị `chainId` còn lại dành cho mạng thử nghiệm Kovan (42) và mạng thử nghiệm Optimistic Kovan (69).

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

Có thể thêm ghi chú vào các giao dịch chuyển tiền, trong trường hợp đó chúng sẽ được thêm vào các sự kiện báo cáo chúng.

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

Cùng một hợp đồng cầu nối xử lý các giao dịch chuyển tiền theo cả hai hướng.
Trong trường hợp của cầu nối L1, điều này có nghĩa là khởi tạo gửi tiền và hoàn tất rút tiền.

```solidity

    /********************
     * Các hàm công khai *
     ********************/

    /**
     * @dev lấy địa chỉ của hợp đồng cầu nối L2 tương ứng.
     * @return Địa chỉ của hợp đồng cầu nối L2 tương ứng.
     */
    function l2TokenBridge() external returns (address);
```

Hàm này không thực sự cần thiết, vì trên L2 nó là một hợp đồng được triển khai trước, vì vậy nó luôn ở địa chỉ `0x4200000000000000000000000000000000000010`.
Nó ở đây để đối xứng với cầu nối L2, vì địa chỉ của cầu nối L1 _không_ dễ dàng để biết.

```solidity
    /**
     * @dev gửi một lượng ERC20 vào số dư của người gọi trên L2.
     * @param _l1Token Địa chỉ của L1 ERC20 mà chúng ta đang gửi
     * @param _l2Token Địa chỉ của ERC20 L2 tương ứng của L1
     * @param _amount Lượng ERC20 cần gửi
     * @param _l2Gas Giới hạn gas cần thiết để hoàn tất việc gửi tiền trên L2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến L2. Dữ liệu này được cung cấp
     *        chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *        độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

Tham số `_l2Gas` là lượng gas L2 mà giao dịch được phép chi tiêu.
[Lên đến một giới hạn nhất định (cao), điều này là miễn phí](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), vì vậy trừ khi hợp đồng ERC-20 làm điều gì đó thực sự kỳ lạ khi đúc, nó sẽ không phải là một vấn đề.
Hàm này xử lý kịch bản phổ biến, trong đó người dùng bắc cầu tài sản đến cùng một địa chỉ trên một chuỗi khối khác.

```solidity
    /**
     * @dev gửi một lượng ERC20 vào số dư của người nhận trên L2.
     * @param _l1Token Địa chỉ của L1 ERC20 mà chúng ta đang gửi
     * @param _l2Token Địa chỉ của ERC20 L2 tương ứng của L1
     * @param _to Địa chỉ L2 để ghi có khoản rút tiền.
     * @param _amount Số lượng ERC20 cần gửi.
     * @param _l2Gas Giới hạn gas cần thiết để hoàn tất việc gửi tiền trên L2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến L2. Dữ liệu này được cung cấp
     *        chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *        độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
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
     * Các hàm liên chuỗi *
     *************************/

    /**
     * @dev Hoàn tất việc rút tiền từ L2 sang L1 và ghi có tiền vào số dư của người nhận
     * token ERC20 L1.
     * Lệnh gọi này sẽ thất bại nếu việc rút tiền đã được khởi tạo từ L2 chưa được hoàn tất.
     *
     * @param _l1Token Địa chỉ của token L1 để finalizeWithdrawal.
     * @param _l2Token Địa chỉ của token L2 nơi việc rút tiền được khởi tạo.
     * @param _from Địa chỉ L2 khởi tạo giao dịch chuyển tiền.
     * @param _to Địa chỉ L1 để ghi có khoản rút tiền.
     * @param _amount Số lượng ERC20 cần gửi.
     * @param _data Dữ liệu do người gửi cung cấp trên L2. Dữ liệu này được cung cấp
     *   chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *   độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
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

Việc rút tiền (và các thông điệp khác từ L2 sang L1) trong Optimism là một quy trình hai bước:

1. Một giao dịch khởi tạo trên L2.
2. Một giao dịch hoàn tất hoặc yêu cầu trên L1.
   Giao dịch này cần phải xảy ra sau khi [thời gian thử thách lỗi](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) cho giao dịch L2 kết thúc.

### IL1StandardBridge {#il1standardbridge}

[Giao diện này được định nghĩa ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
Tệp này chứa các định nghĩa sự kiện và hàm cho ETH.
Các định nghĩa này rất tương tự với những định nghĩa trong `IL1ERC20Bridge` ở trên cho ERC-20.

Giao diện cầu nối được chia thành hai tệp vì một số token ERC-20 yêu cầu xử lý tùy chỉnh và không thể được xử lý bởi cầu nối tiêu chuẩn.
Bằng cách này, cầu nối tùy chỉnh xử lý một token như vậy có thể triển khai `IL1ERC20Bridge` và không phải bắc cầu cả ETH.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Các sự kiện *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

Sự kiện này gần như giống hệt phiên bản ERC-20 (`ERC20DepositInitiated`), ngoại trừ không có địa chỉ token L1 và L2.
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
     * @dev Gửi một lượng ETH vào số dư của người gọi trên L2.
            .
            .
            .
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Gửi một lượng ETH vào số dư của người nhận trên L2.
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
     * Các hàm liên chuỗi *
     *************************/

    /**
     * @dev Hoàn tất việc rút tiền từ L2 sang L1 và ghi có tiền vào số dư của người nhận
     * token L1 ETH. Vì chỉ có xDomainMessenger mới có thể gọi hàm này, nên nó sẽ không bao giờ được gọi
     * trước khi việc rút tiền được hoàn tất.
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

[Hợp đồng này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) được kế thừa bởi cả hai cầu nối ([L1](#the-l1-bridge-contract) và [L2](#the-l2-bridge-contract)) để gửi thông điệp đến lớp kia.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[Giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) cho hợp đồng biết cách gửi thông điệp đến lớp kia, sử dụng trình nhắn tin liên miền.
Trình nhắn tin liên miền này là một hệ thống hoàn toàn khác, và xứng đáng có một bài viết riêng, mà tôi hy vọng sẽ viết trong tương lai.

```solidity
/**
 * @title CrossDomainEnabled
 * @dev Hợp đồng trợ giúp cho các hợp đồng thực hiện giao tiếp liên miền
 *
 * Trình biên dịch được sử dụng: được định nghĩa bởi hợp đồng kế thừa
 */
contract CrossDomainEnabled {
    /*************
     * Biến *
     *************/

    // Hợp đồng Messenger được sử dụng để gửi và nhận thông điệp từ miền khác.
    address public messenger;

    /***************
     * Hàm dựng *
     ***************/

    /**
     * @param _messenger Địa chỉ của CrossDomainMessenger trên lớp hiện tại.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

Tham số duy nhất mà hợp đồng cần biết, địa chỉ của trình nhắn tin liên miền trên lớp này.
Tham số này được thiết lập một lần trong hàm dựng và không bao giờ thay đổi.

```solidity

    /**********************
     * Bổ ngữ hàm *
     **********************/

    /**
     * @dev Chỉ cho phép hàm được sửa đổi được gọi bởi một tài khoản liên miền cụ thể.
     * @param _sourceDomainAccount Tài khoản duy nhất trên miền gốc được
     *  xác thực để gọi hàm này.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

Cơ chế nhắn tin liên miền có thể được truy cập bởi bất kỳ hợp đồng nào trên chuỗi khối nơi nó đang chạy (hoặc mainnet Ethereum hoặc Optimism).
Nhưng chúng ta cần cầu nối ở mỗi bên _chỉ_ tin cậy một số thông điệp nhất định nếu chúng đến từ cầu nối ở bên kia.

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Chỉ các thông điệp từ trình nhắn tin liên miền thích hợp (`messenger`, như bạn thấy bên dưới) mới có thể được tin cậy.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

Cách mà trình nhắn tin liên miền cung cấp địa chỉ đã gửi một thông điệp với lớp kia là [hàm `.xDomainMessageSender()`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128).
Miễn là nó được gọi trong giao dịch được khởi tạo bởi thông điệp, nó có thể cung cấp thông tin này.

Chúng ta cần đảm bảo rằng thông điệp chúng ta nhận được đến từ cầu nối kia.

```solidity

        _;
    }

    /**********************
     * Các hàm nội bộ *
     **********************/

    /**
     * @dev Lấy trình nhắn tin, thường từ bộ nhớ lưu trữ. Hàm này được hiển thị trong trường hợp một hợp đồng con
     * cần ghi đè.
     * @return Địa chỉ của hợp đồng trình nhắn tin liên miền nên được sử dụng.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

Hàm này trả về trình nhắn tin liên miền.
Chúng tôi sử dụng một hàm thay vì biến `messenger` để cho phép các hợp đồng kế thừa từ hợp đồng này sử dụng một thuật toán để chỉ định trình nhắn tin liên miền nào sẽ sử dụng.

```solidity

    /**
     * Gửi một thông điệp đến một tài khoản trên một miền khác
     * @param _crossDomainTarget Người nhận dự định trên miền đích
     * @param _message Dữ liệu để gửi đến mục tiêu (thường là calldata cho một hàm với
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit gasLimit cho việc nhận thông điệp trên miền đích.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Cuối cùng là hàm gửi thông điệp đến lớp kia.

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) là một trình phân tích tĩnh mà Optimism chạy trên mọi hợp đồng để tìm kiếm các lỗ hổng và các vấn đề tiềm ẩn khác.
Trong trường hợp này, dòng sau đây kích hoạt hai lỗ hổng:

1. [Sự kiện tái nhập](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [Tái nhập lành tính](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

Trong trường hợp này, chúng tôi không lo lắng về việc tái nhập, chúng tôi biết `getCrossDomainMessenger()` trả về một địa chỉ đáng tin cậy, ngay cả khi Slither không có cách nào để biết điều đó.

### Hợp đồng cầu nối L1 {#the-l1-bridge-contract}

[Mã nguồn của hợp đồng này ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

Các giao diện có thể là một phần của các hợp đồng khác, vì vậy chúng phải hỗ trợ một loạt các phiên bản Solidity.
Nhưng bản thân cầu nối là hợp đồng của chúng tôi, và chúng tôi có thể nghiêm ngặt về phiên bản Solidity mà nó sử dụng.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) và [IL1StandardBridge](#IL1StandardBridge) được giải thích ở trên.

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[Giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) cho phép chúng ta tạo thông điệp để điều khiển cầu nối tiêu chuẩn trên L2.

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Giao diện này](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) cho phép chúng ta điều khiển các hợp đồng ERC-20.
[Bạn có thể đọc thêm về nó ở đây](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[Như đã giải thích ở trên](#crossdomainenabled), hợp đồng này được sử dụng để nhắn tin giữa các lớp.

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol) có các địa chỉ cho các hợp đồng L2 luôn có cùng một địa chỉ. Điều này bao gồm cầu nối tiêu chuẩn trên L2.

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[Các tiện ích Địa chỉ của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol). Nó được sử dụng để phân biệt giữa các địa chỉ hợp đồng và những địa chỉ thuộc về tài khoản sở hữu bên ngoài (EOA).

Lưu ý rằng đây không phải là một giải pháp hoàn hảo, vì không có cách nào để phân biệt giữa các lệnh gọi trực tiếp và các lệnh gọi được thực hiện từ hàm dựng của hợp đồng, nhưng ít nhất điều này cho phép chúng tôi xác định và ngăn chặn một số lỗi người dùng phổ biến.

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[Tiêu chuẩn ERC-20](https://eips.ethereum.org/EIPS/eip-20) hỗ trợ hai cách để một hợp đồng báo cáo lỗi:

1. Hoàn nguyên
2. Trả về `false`

Xử lý cả hai trường hợp sẽ làm cho mã của chúng ta phức tạp hơn, vì vậy thay vào đó chúng ta sử dụng [`SafeERC20` của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol), đảm bảo [tất cả các lỗi đều dẫn đến việc hoàn nguyên](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96).

```solidity
/**
 * @title L1StandardBridge
 * @dev Cầu nối L1 ETH và ERC20 là một hợp đồng lưu trữ các khoản tiền L1 đã gửi và các token tiêu chuẩn
 * đang được sử dụng trên L2. Nó đồng bộ hóa một Cầu nối L2 tương ứng, thông báo cho nó về các khoản tiền gửi
 * và lắng nghe nó về các khoản rút tiền mới được hoàn tất.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

Dòng này là cách chúng ta chỉ định sử dụng trình bao bọc `SafeERC20` mỗi khi chúng ta sử dụng giao diện `IERC20`.

```solidity

    /********************************
     * Tham chiếu Hợp đồng Bên ngoài *
     ********************************/

    address public l2TokenBridge;
```

Địa chỉ của [L2StandardBridge](#the-l2-bridge-contract).

```solidity

    // Ánh xạ token L1 đến token L2 đến số dư của token L1 đã gửi
    mapping(address => mapping(address => uint256)) public deposits;
```

Một [ánh xạ](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) kép như thế này là cách bạn định nghĩa một [mảng thưa hai chiều](https://en.wikipedia.org/wiki/Sparse_matrix).
Các giá trị trong cấu trúc dữ liệu này được xác định là `deposit[địa chỉ token L1][địa chỉ token L2]`.
Giá trị mặc định là không.
Chỉ các ô được thiết lập thành một giá trị khác mới được ghi vào bộ nhớ lưu trữ.

```solidity

    /***************
     * Hàm dựng *
     ***************/

    // Hợp đồng này hoạt động đằng sau một proxy, vì vậy các tham số của hàm dựng sẽ không được sử dụng.
    constructor() CrossDomainEnabled(address(0)) {}
```

Để có thể nâng cấp hợp đồng này mà không cần phải sao chép tất cả các biến trong bộ nhớ lưu trữ.
Để làm điều đó, chúng tôi sử dụng một [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy), một hợp đồng sử dụng [`delegatecall`](https://solidity-by-example.org/delegatecall/) để chuyển các lệnh gọi đến một hợp đồng riêng biệt có địa chỉ được lưu trữ bởi hợp đồng proxy (khi bạn nâng cấp, bạn yêu cầu proxy thay đổi địa chỉ đó).
Khi bạn sử dụng `delegatecall`, bộ nhớ lưu trữ vẫn là bộ nhớ lưu trữ của hợp đồng _gọi_, vì vậy giá trị của tất cả các biến trạng thái hợp đồng không bị ảnh hưởng.

Một ảnh hưởng của mô hình này là bộ nhớ lưu trữ của hợp đồng được _gọi_ của `delegatecall` không được sử dụng và do đó các giá trị hàm dựng được truyền cho nó không quan trọng.
Đây là lý do chúng ta có thể cung cấp một giá trị vô nghĩa cho hàm dựng `CrossDomainEnabled`.
Đó cũng là lý do tại sao việc khởi tạo bên dưới được tách biệt khỏi hàm dựng.

```solidity
    /******************
     * Khởi tạo *
     ******************/

    /**
     * @param _l1messenger Địa chỉ L1 Messenger đang được sử dụng để giao tiếp liên chuỗi.
     * @param _l2TokenBridge Địa chỉ cầu nối tiêu chuẩn L2.
     */
    // slither-disable-next-line external-function
```

[Thử nghiệm Slither này](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) xác định các hàm không được gọi từ mã hợp đồng và do đó có thể được khai báo `external` thay vì `public`.
Chi phí gas của các hàm `external` có thể thấp hơn, vì chúng có thể được cung cấp các tham số trong calldata.
Các hàm được khai báo là `public` phải có thể truy cập được từ bên trong hợp đồng.
Các hợp đồng không thể sửa đổi calldata của chính chúng, vì vậy các tham số phải ở trong bộ nhớ.
Khi một hàm như vậy được gọi từ bên ngoài, cần phải sao chép calldata vào bộ nhớ, điều này tốn gas.
Trong trường hợp này, hàm chỉ được gọi một lần, vì vậy sự thiếu hiệu quả không quan trọng đối với chúng tôi.

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

Hàm `initialize` chỉ nên được gọi một lần.
Nếu địa chỉ của trình nhắn tin liên miền L1 hoặc cầu nối token L2 thay đổi, chúng tôi tạo một proxy mới và một cầu nối mới gọi nó.
Điều này không có khả năng xảy ra ngoại trừ khi toàn bộ hệ thống được nâng cấp, một sự kiện rất hiếm.

Lưu ý rằng hàm này không có bất kỳ cơ chế nào hạn chế _ai_ có thể gọi nó.
Điều này có nghĩa là về mặt lý thuyết, một kẻ tấn công có thể đợi cho đến khi chúng tôi triển khai proxy và phiên bản đầu tiên của cầu nối, sau đó [chạy trước](https://solidity-by-example.org/hacks/front-running/) để đến hàm `initialize` trước người dùng hợp pháp. Nhưng có hai phương pháp để ngăn chặn điều này:

1. Nếu các hợp đồng không được triển khai trực tiếp bởi một EOA mà [trong một giao dịch có một hợp đồng khác tạo ra chúng](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595), toàn bộ quá trình có thể là nguyên tử, và kết thúc trước khi bất kỳ giao dịch nào khác được thực hiện.
2. Nếu lệnh gọi hợp pháp đến `initialize` thất bại, luôn có thể bỏ qua proxy và cầu nối mới được tạo và tạo ra những cái mới.

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

Đây là hai tham số mà cầu nối cần biết.

```solidity

    /**************
     * Gửi tiền *
     **************/

    /** @dev Bổ ngữ yêu cầu người gửi phải là EOA. Kiểm tra này có thể bị bỏ qua bởi một hợp đồng
     * độc hại thông qua initcode, nhưng nó xử lý lỗi người dùng mà chúng tôi muốn tránh.
     */
    modifier onlyEOA() {
        // Được sử dụng để ngăn chặn việc gửi tiền từ các hợp đồng (tránh mất token do nhầm lẫn)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

Đây là lý do chúng ta cần các tiện ích `Address` của OpenZeppelin.

```solidity
    /**
     * @dev Hàm này có thể được gọi mà không có dữ liệu
     * để gửi một lượng ETH vào số dư của người gọi trên L2.
     * Vì hàm nhận không lấy dữ liệu, một lượng
     * mặc định thận trọng được chuyển tiếp đến L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

Hàm này tồn tại cho mục đích thử nghiệm.
Lưu ý rằng nó không xuất hiện trong các định nghĩa giao diện - nó không dành cho việc sử dụng thông thường.

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

Hai hàm này là các trình bao bọc xung quanh `_initiateETHDeposit`, hàm xử lý việc gửi ETH thực tế.

```solidity
    /**
     * @dev Thực hiện logic gửi tiền bằng cách lưu trữ ETH và thông báo cho Cổng ETH L2
     * về việc gửi tiền.
     * @param _from Tài khoản để lấy tiền gửi từ L1.
     * @param _to Tài khoản để cấp tiền gửi trên L2.
     * @param _l2Gas Giới hạn gas cần thiết để hoàn tất việc gửi tiền trên L2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến L2. Dữ liệu này được cung cấp
     *        chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *        độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Xây dựng calldata cho lệnh gọi finalizeDeposit
        bytes memory message = abi.encodeWithSelector(
```

Cách thức hoạt động của các thông điệp liên miền là hợp đồng đích được gọi với thông điệp làm calldata của nó.
Các hợp đồng Solidity luôn diễn giải calldata của chúng theo
[các thông số kỹ thuật ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html).
Hàm Solidity [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) tạo ra calldata đó.

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

Thông điệp ở đây là để gọi [hàm `finalizeDeposit`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) với các tham số này:

| Thông số                        | Giá trị                                                                                  | Ý nghĩa                                                                                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                                                            | Giá trị đặc biệt để đại diện cho ETH (không phải là một token ERC-20) trên L1                                                                        |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | Hợp đồng L2 quản lý ETH trên Optimism, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (hợp đồng này chỉ dành cho mục đích sử dụng nội bộ của Optimism) |
| \_from    | \_from                                                             | Địa chỉ trên L1 gửi ETH                                                                                                                                                 |
| \_to      | \_to                                                               | Địa chỉ trên L2 nhận ETH                                                                                                                                                |
| số lượng                        | msg.value                                                                | Số lượng wei đã gửi (đã được gửi đến cầu nối)                                                                                                        |
| \_data    | \_data                                                             | Dữ liệu bổ sung để đính kèm vào khoản tiền gửi                                                                                                                          |

```solidity
        // Gửi calldata vào L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

Gửi thông điệp thông qua trình nhắn tin liên miền.

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

Phát ra một sự kiện để thông báo cho bất kỳ ứng dụng phi tập trung nào đang lắng nghe về giao dịch chuyển tiền này.

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

Hai hàm này là các trình bao bọc xung quanh `_initiateERC20Deposit`, hàm xử lý việc gửi ERC-20 thực tế.

```solidity
    /**
     * @dev Thực hiện logic gửi tiền bằng cách thông báo cho Token đã gửi L2
     * hợp đồng về việc gửi tiền và gọi một trình xử lý để khóa các khoản tiền L1. (ví dụ, transferFrom)
     *
     * @param _l1Token Địa chỉ của L1 ERC20 chúng ta đang gửi
     * @param _l2Token Địa chỉ của ERC20 L2 tương ứng của L1
     * @param _from Tài khoản để lấy tiền gửi từ L1
     * @param _to Tài khoản để cấp tiền gửi trên L2
     * @param _amount Số lượng ERC20 cần gửi.
     * @param _l2Gas Giới hạn gas cần thiết để hoàn tất việc gửi tiền trên L2.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến L2. Dữ liệu này được cung cấp
     *        chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *        độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
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

Hàm này tương tự như `_initiateETHDeposit` ở trên, với một vài khác biệt quan trọng.
Sự khác biệt đầu tiên là hàm này nhận các địa chỉ token và số lượng cần chuyển làm tham số.
Trong trường hợp ETH, lệnh gọi đến cầu nối đã bao gồm việc chuyển tài sản đến tài khoản cầu nối (`msg.value`).

```solidity
        // Khi một khoản tiền gửi được khởi tạo trên L1, Cầu nối L1 sẽ chuyển tiền vào chính nó cho các khoản
        // rút tiền trong tương lai. safeTransferFrom cũng kiểm tra xem hợp đồng có mã hay không, vì vậy điều này sẽ thất bại nếu
        // _from là một EOA hoặc address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

Việc chuyển token ERC-20 theo một quy trình khác với ETH:

1. Người dùng (`_from`) cấp cho cầu nối một khoản phụ cấp để chuyển các token thích hợp.
2. Người dùng gọi cầu nối với địa chỉ của hợp đồng token, số lượng, v.v.
3. Cầu nối chuyển các token (cho chính nó) như một phần của quá trình gửi tiền.

Bước đầu tiên có thể xảy ra trong một giao dịch riêng biệt so với hai bước cuối cùng.
Tuy nhiên, chạy trước không phải là một vấn đề vì hai hàm gọi `_initiateERC20Deposit` (`depositERC20` và `depositERC20To`) chỉ gọi hàm này với `msg.sender` làm tham số `_from`.

```solidity
        // Xây dựng calldata cho _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Gửi calldata vào L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

Thêm số lượng token đã gửi vào cấu trúc dữ liệu `deposits`.
Có thể có nhiều địa chỉ trên L2 tương ứng với cùng một token L1 ERC-20, vì vậy không đủ để sử dụng số dư của token L1 ERC-20 của cầu nối để theo dõi các khoản tiền gửi.

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Các hàm liên chuỗi *
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

Cầu nối L2 gửi một thông điệp đến trình nhắn tin liên miền L2, điều này khiến trình nhắn tin liên miền L1 gọi hàm này (tất nhiên, một khi [giao dịch hoàn tất thông điệp](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) được gửi trên L1).

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

Đảm bảo rằng đây là một thông điệp _hợp lệ_, đến từ trình nhắn tin liên miền và bắt nguồn từ cầu nối token L2.
Hàm này được sử dụng để rút ETH từ cầu nối, vì vậy chúng ta phải đảm bảo nó chỉ được gọi bởi người gọi được ủy quyền.

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

Cách để chuyển ETH là gọi người nhận với số lượng wei trong `msg.value`.

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

        // Khi một khoản rút tiền được hoàn tất trên L1, Cầu nối L1 sẽ chuyển tiền cho người rút
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
     * LƯU Ý: Điều này được để lại cho một lần nâng cấp duy nhất để chúng tôi có thể nhận được ETH đã di chuyển từ
     * hợp đồng cũ
     */
    function donateETH() external payable {}
}
```

Có một triển khai trước đó của cầu nối.
Khi chúng tôi chuyển từ triển khai đó sang triển khai này, chúng tôi đã phải di chuyển tất cả các tài sản.
Các token ERC-20 chỉ cần được di chuyển.
Tuy nhiên, để chuyển ETH đến một hợp đồng, bạn cần sự chấp thuận của hợp đồng đó, đó là điều mà `donateETH` cung cấp cho chúng tôi.

## Các token ERC-20 trên L2 {#erc-20-tokens-on-l2}

Để một token ERC-20 phù hợp với cầu nối tiêu chuẩn, nó cần cho phép cầu nối tiêu chuẩn, và _chỉ_ cầu nối tiêu chuẩn, đúc token.
Điều này là cần thiết vì các cầu nối cần đảm bảo rằng số lượng token lưu hành trên Optimism bằng với số lượng token bị khóa bên trong hợp đồng cầu nối L1.
Nếu có quá nhiều token trên L2, một số người dùng sẽ không thể bắc cầu tài sản của họ trở lại L1.
Thay vì một cầu nối đáng tin cậy, chúng ta về cơ bản sẽ tái tạo lại [hệ thống ngân hàng dự trữ một phần](https://www.investopedia.com/terms/f/fractionalreservebanking.asp).
Nếu có quá nhiều token trên L1, một số token đó sẽ bị khóa bên trong hợp đồng cầu nối mãi mãi vì không có cách nào để giải phóng chúng mà không đốt các token L2.

### IL2StandardERC20 {#il2standarderc20}

Mọi token ERC-20 trên L2 sử dụng cầu nối tiêu chuẩn cần cung cấp [giao diện này](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol), có các hàm và sự kiện mà cầu nối tiêu chuẩn cần.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[Giao diện ERC-20 tiêu chuẩn](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) không bao gồm các hàm `mint` và `burn`.
Các phương thức đó không được yêu cầu bởi [tiêu chuẩn ERC-20](https://eips.ethereum.org/EIPS/eip-20), tiêu chuẩn này không chỉ định các cơ chế để tạo và hủy token.

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[Giao diện ERC-165](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) được sử dụng để chỉ định các hàm mà một hợp đồng cung cấp.
[Bạn có thể đọc tiêu chuẩn ở đây](https://eips.ethereum.org/EIPS/eip-165).

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

Hàm này cung cấp địa chỉ của token L1 được bắc cầu đến hợp đồng này.
Lưu ý rằng chúng ta không có một hàm tương tự theo hướng ngược lại.
Chúng ta cần có thể bắc cầu bất kỳ token L1 nào, bất kể hỗ trợ L2 có được lên kế hoạch khi nó được triển khai hay không.

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

Các hàm và sự kiện để đúc (tạo) và đốt (hủy) token.
Cầu nối nên là thực thể duy nhất có thể chạy các hàm này để đảm bảo số lượng token là chính xác (bằng với số lượng token bị khóa trên L1).

### L2StandardERC20 {#L2StandardERC20}

[Đây là triển khai của chúng tôi về giao diện `IL2StandardERC20`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol).
Trừ khi bạn cần một loại logic tùy chỉnh nào đó, bạn nên sử dụng cái này.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[Hợp đồng ERC-20 của OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol).
Optimism không tin vào việc phát minh lại bánh xe, đặc biệt là khi bánh xe được kiểm toán kỹ lưỡng và cần phải đủ đáng tin cậy để giữ tài sản.

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

Đây là hai tham số cấu hình bổ sung mà chúng tôi yêu cầu và ERC-20 thường không có.

```solidity

    /**
     * @param _l2Bridge Địa chỉ của cầu nối tiêu chuẩn L2.
     * @param _l1Token Địa chỉ của token L1 tương ứng.
     * @param _name Tên ERC20.
     * @param _symbol Ký hiệu ERC20.
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

Đầu tiên gọi hàm dựng cho hợp đồng mà chúng ta kế thừa từ đó (`ERC20(_name, _symbol)`) và sau đó thiết lập các biến của riêng chúng ta.

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
Mỗi giao diện là một tập hợp các hàm được hỗ trợ và được xác định là kết quả của phép toán [OR độc quyền](https://en.wikipedia.org/wiki/Exclusive_or) của các [bộ chọn hàm ABI](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector) của các hàm đó.

Cầu nối L2 sử dụng ERC-165 như một kiểm tra hợp lý để đảm bảo rằng hợp đồng ERC-20 mà nó gửi tài sản đến là một `IL2StandardERC20`.

**Lưu ý:** Không có gì ngăn cản hợp đồng giả mạo cung cấp câu trả lời sai cho `supportsInterface`, vì vậy đây là một cơ chế kiểm tra hợp lý, _không_ phải là một cơ chế bảo mật.

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

Chỉ có cầu nối L2 mới được phép đúc và đốt tài sản.

`_mint` và `_burn` thực sự được định nghĩa trong [hợp đồng OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).
Hợp đồng đó chỉ không hiển thị chúng ra bên ngoài, vì các điều kiện để đúc và đốt token rất đa dạng như số cách sử dụng ERC-20.

## Mã cầu nối L2 {#l2-bridge-code}

Đây là mã chạy cầu nối trên Optimism.
[Nguồn của hợp đồng này ở đây](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

Giao diện [IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) rất tương tự với [tương đương L1](#IL1ERC20Bridge) mà chúng ta đã thấy ở trên.
Có hai sự khác biệt đáng kể:

1. Trên L1, bạn khởi tạo gửi tiền và hoàn tất rút tiền.
   Ở đây bạn khởi tạo rút tiền và hoàn tất gửi tiền.
2. Trên L1, cần phải phân biệt giữa ETH và các token ERC-20.
   Trên L2, chúng ta có thể sử dụng cùng các hàm cho cả hai vì nội bộ số dư ETH trên Optimism được xử lý như một token ERC-20 với địa chỉ [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

```solidity
/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev Cầu nối Tiêu chuẩn L2 là một hợp đồng hoạt động cùng với cầu nối Tiêu chuẩn L1 để
 * cho phép chuyển đổi ETH và ERC20 giữa L1 và L2.
 * Hợp đồng này hoạt động như một trình đúc các token mới khi nó nghe về các khoản tiền gửi vào cầu nối Tiêu chuẩn
 * L1.
 * Hợp đồng này cũng hoạt động như một trình đốt các token dự định rút, thông báo cho cầu nối L1
 * để giải phóng các khoản tiền L1.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * Tham chiếu Hợp đồng Bên ngoài *
     ********************************/

    address public l1TokenBridge;
```

Theo dõi địa chỉ của cầu nối L1.
Lưu ý rằng ngược lại với tương đương L1, ở đây chúng ta _cần_ biến này.
Địa chỉ của cầu nối L1 không được biết trước.

```solidity

    /***************
     * Hàm dựng *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Trình nhắn tin liên miền được sử dụng bởi hợp đồng này.
     * @param _l1TokenBridge Địa chỉ của cầu nối L1 được triển khai trên chuỗi chính.
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

Hai hàm này khởi tạo việc rút tiền.
Lưu ý rằng không cần phải chỉ định địa chỉ token L1.
Các token L2 được mong đợi sẽ cho chúng tôi biết địa chỉ tương đương của L1.

```solidity

    /**
     * @dev Thực hiện logic rút tiền bằng cách đốt token và thông báo
     *      cho Cổng token L1 về việc rút tiền.
     * @param _l2Token Địa chỉ của token L2 nơi việc rút tiền được khởi tạo.
     * @param _from Tài khoản để lấy tiền rút từ L2.
     * @param _to Tài khoản để cấp tiền rút trên L1.
     * @param _amount Số lượng token cần rút.
     * @param _l1Gas Không sử dụng, nhưng được bao gồm cho các cân nhắc tương thích về phía trước tiềm năng.
     * @param _data Dữ liệu tùy chọn để chuyển tiếp đến L1. Dữ liệu này được cung cấp
     *        chỉ để thuận tiện cho các hợp đồng bên ngoài. Ngoài việc thực thi một
     *        độ dài tối đa, các hợp đồng này không cung cấp bất kỳ đảm bảo nào về nội dung của nó.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // Khi một khoản rút tiền được khởi tạo, chúng tôi đốt tiền của người rút để ngăn chặn việc sử dụng L2
        // sau đó
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

Lưu ý rằng chúng tôi _không_ dựa vào tham số `_from` mà vào `msg.sender` khó giả mạo hơn nhiều (không thể, theo như tôi biết).

```solidity

        // Xây dựng calldata cho l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

Trên L1, cần phải phân biệt giữa ETH và ERC-20.

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

        // Gửi thông điệp lên cầu nối L1
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Hàm liên chuỗi: Gửi tiền *
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
Điều này quan trọng vì hàm này gọi `_mint` và có thể được sử dụng để cấp các token không được bảo đảm bởi các token mà cầu nối sở hữu trên L1.

```solidity
        // Kiểm tra token mục tiêu có tuân thủ và
        // xác minh token đã gửi trên L1 khớp với biểu diễn token đã gửi L2 ở đây
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

Các kiểm tra hợp lý:

1. Giao diện chính xác được hỗ trợ
2. Địa chỉ L1 của hợp đồng ERC-20 L2 khớp với nguồn L1 của các token

```solidity
        ) {
            // Khi một khoản tiền gửi được hoàn tất, chúng tôi ghi có vào tài khoản trên L2 với cùng một số lượng
            // token.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

Nếu các kiểm tra hợp lý vượt qua, hoàn tất việc gửi tiền:

1. Đúc các token
2. Phát ra sự kiện thích hợp

```solidity
        } else {
            // Hoặc token L2 đang được gửi vào không đồng ý về địa chỉ chính xác
            // của token L1 của nó, hoặc không hỗ trợ giao diện chính xác.
            // Điều này chỉ nên xảy ra nếu có một token L2 độc hại, hoặc nếu người dùng bằng cách nào đó
            // chỉ định sai địa chỉ token L2 để gửi vào.
            // Trong cả hai trường hợp, chúng tôi dừng quá trình ở đây và xây dựng một thông điệp
            // rút tiền để người dùng có thể lấy lại tiền của họ trong một số trường hợp.
            // Không có cách nào để ngăn chặn hoàn toàn các hợp đồng token độc hại, nhưng điều này giới hạn
            // lỗi người dùng và giảm thiểu một số hình thức hành vi hợp đồng độc hại.
```

Nếu người dùng mắc lỗi có thể phát hiện bằng cách sử dụng sai địa chỉ token L2, chúng tôi muốn hủy bỏ việc gửi tiền và trả lại các token trên L1.
Cách duy nhất chúng ta có thể làm điều này từ L2 là gửi một thông điệp sẽ phải đợi hết thời gian thử thách lỗi, nhưng điều đó tốt hơn nhiều cho người dùng so với việc mất các token vĩnh viễn.

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // đã hoán đổi _to và _from ở đây để trả lại khoản tiền gửi cho người gửi
                _from,
                _amount,
                _data
            );

            // Gửi thông điệp lên cầu nối L1
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## Kết luận {#conclusion}

Cầu nối tiêu chuẩn là cơ chế linh hoạt nhất cho việc chuyển tài sản.
Tuy nhiên, vì nó rất chung chung nên không phải lúc nào cũng là cơ chế dễ sử dụng nhất.
Đặc biệt đối với việc rút tiền, hầu hết người dùng thích sử dụng [các cầu nối của bên thứ ba](https://optimism.io/apps#bridge) không phải chờ đợi hết thời gian thử thách và không yêu cầu bằng chứng Merkle để hoàn tất việc rút tiền.

Các cầu nối này thường hoạt động bằng cách có tài sản trên L1, mà họ cung cấp ngay lập tức với một khoản phí nhỏ (thường ít hơn chi phí gas cho một lần rút tiền qua cầu nối tiêu chuẩn).
Khi cầu nối (hoặc những người điều hành nó) dự đoán sẽ thiếu tài sản L1, nó sẽ chuyển đủ tài sản từ L2. Vì đây là những khoản rút tiền rất lớn, chi phí rút tiền được phân bổ trên một số lượng lớn và là một tỷ lệ phần trăm nhỏ hơn nhiều.

Hy vọng bài viết này đã giúp bạn hiểu thêm về cách lớp 2 hoạt động, và cách viết mã Solidity rõ ràng và bảo mật.

[Xem thêm công việc của tôi tại đây](https://cryptodocguy.pro/).
