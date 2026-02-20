---
title: "Cách thiết lập Tellor làm Oracle của bạn"
description: "Hướng dẫn bắt đầu tích hợp oracle Tellor vào giao thức của bạn"
author: "Tellor"
lang: vi
tags: [ "solidity", "hợp đồng thông minh", "oracles" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Câu đố nhanh: Giao thức của bạn sắp hoàn thành nhưng lại cần một oracle để truy cập vào dữ liệu ngoài chuỗi... Bạn sẽ làm gì?

## Điều kiện tiên quyết (không bắt buộc) {#soft-prerequisites}

Bài đăng này nhằm mục đích giúp việc truy cập nguồn cấp dữ liệu oracle trở nên đơn giản và dễ hiểu nhất có thể. Tuy nhiên, chúng tôi giả định những điều sau đây về trình độ kỹ năng lập trình của bạn để tập trung vào khía cạnh oracle.

Các giả định:

- bạn có thể điều hướng một terminal
- bạn đã cài đặt npm
- bạn biết cách sử dụng npm để quản lý các phần phụ thuộc

Tellor là một oracle mã nguồn mở và đang hoạt động, sẵn sàng để triển khai. Hướng dẫn dành cho người mới bắt đầu này nhằm mục đích giới thiệu sự dễ dàng mà một người có thể bắt đầu và chạy với Tellor, cung cấp cho dự án của bạn một oracle hoàn toàn phi tập trung và chống kiểm duyệt.

## Tổng quan {#overview}

Tellor là một hệ thống oracle nơi các bên có thể yêu cầu giá trị của một điểm dữ liệu ngoài chuỗi (ví dụ: BTC/USD) và những người báo cáo cạnh tranh để thêm giá trị này vào ngân hàng dữ liệu trên chuỗi, có thể truy cập bởi tất cả các hợp đồng thông minh Ethereum. Các dữ liệu đầu vào cho ngân hàng dữ liệu này được bảo mật bởi một mạng lưới những người báo cáo đã đặt cược. Tellor sử dụng các cơ chế khuyến khích kinh tế-tiền mã hóa, thưởng cho các lần gửi dữ liệu trung thực của người báo cáo và trừng phạt các tác nhân xấu thông qua việc phát hành token của Tellor, Tributes (TRB) và một cơ chế tranh chấp.

Trong hướng dẫn này, chúng ta sẽ xem xét:

- Thiết lập bộ công cụ ban đầu bạn sẽ cần để bắt đầu.
- Xem qua một ví dụ đơn giản.
- Liệt kê các địa chỉ mạng thử nghiệm của các mạng mà bạn hiện có thể thử nghiệm Tellor.

## Sử dụng Tellor {#usingtellor}

Điều đầu tiên bạn sẽ muốn làm là cài đặt các công cụ cơ bản cần thiết để sử dụng Tellor làm oracle của bạn. Sử dụng [gói này](https://github.com/tellor-io/usingtellor) để cài đặt các Hợp đồng Người dùng Tellor:

`npm install usingtellor`

Sau khi cài đặt, điều này sẽ cho phép các hợp đồng của bạn kế thừa các hàm từ hợp đồng 'UsingTellor'.

Tuyệt vời! Bây giờ bạn đã sẵn sàng các công cụ, chúng ta hãy cùng thực hiện một bài tập đơn giản để truy xuất giá bitcoin:

### Ví dụ về BTC/USD {#btcusd-example}

Kế thừa hợp đồng UsingTellor, chuyển địa chỉ Tellor làm đối số hàm khởi tạo:

Dưới đây là ví dụ:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Hợp đồng này hiện có quyền truy cập vào tất cả các hàm trong UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Để có danh sách đầy đủ các địa chỉ hợp đồng, hãy tham khảo [tại đây](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Để dễ sử dụng, repo UsingTellor đi kèm với một phiên bản của hợp đồng [Tellor Playground](https://github.com/tellor-io/TellorPlayground) để tích hợp dễ dàng hơn. Xem [tại đây](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) để biết danh sách các hàm hữu ích.

Để triển khai oracle Tellor một cách mạnh mẽ hơn, hãy xem danh sách đầy đủ các hàm có sẵn [tại đây](https://github.com/tellor-io/usingtellor/blob/master/README.md).
