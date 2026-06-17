---
title: Cách thiết lập Tellor làm nguồn cấp dữ liệu của bạn
description: Hướng dẫn bắt đầu tích hợp nguồn cấp dữ liệu Tellor vào giao thức của bạn
author: "Tellor"
lang: vi
tags: ["solidity", "hợp đồng thông minh", "nguồn cấp dữ liệu"]
skill: beginner
breadcrumb: Nguồn cấp dữ liệu Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Câu hỏi nhanh: Giao thức của bạn sắp hoàn thành, nhưng nó cần một nguồn cấp dữ liệu để truy cập dữ liệu ngoài chuỗi... Bạn sẽ làm gì?

## Điều kiện tiên quyết (Cơ bản) {#soft-prerequisites}

Bài viết này nhằm mục đích làm cho việc truy cập vào một nguồn cấp dữ liệu trở nên đơn giản và dễ hiểu nhất có thể. Tuy nhiên, chúng tôi giả định những điều sau về trình độ kỹ năng lập trình của bạn để tập trung vào khía cạnh nguồn cấp dữ liệu.

Các giả định:

- bạn có thể sử dụng terminal (dòng lệnh)
- bạn đã cài đặt npm
- bạn biết cách sử dụng npm để quản lý các dependency (gói phụ thuộc)

Tellor là một nguồn cấp dữ liệu mã nguồn mở và đang hoạt động, sẵn sàng để triển khai. Hướng dẫn dành cho người mới bắt đầu này ở đây để cho thấy sự dễ dàng khi thiết lập và chạy Tellor, cung cấp cho dự án của bạn một nguồn cấp dữ liệu hoàn toàn phi tập trung và chống kiểm duyệt.

## Tổng quan {#overview}

Tellor là một hệ thống nguồn cấp dữ liệu nơi các bên có thể yêu cầu giá trị của một điểm dữ liệu ngoài chuỗi (ví dụ: BTC/USD) và các báo cáo viên cạnh tranh để thêm giá trị này vào một ngân hàng dữ liệu trên chuỗi, có thể truy cập được bởi tất cả các hợp đồng thông minh Ethereum. Các đầu vào cho ngân hàng dữ liệu này được bảo mật bởi một mạng lưới các báo cáo viên đã đặt cọc. Tellor sử dụng các cơ chế khuyến khích kinh tế tiền mã hóa, khen thưởng các báo cáo viên gửi dữ liệu trung thực và trừng phạt các tác nhân xấu thông qua việc phát hành token của Tellor, Tributes (TRB), và một cơ chế giải quyết tranh chấp.

Trong hướng dẫn này, chúng ta sẽ đi qua:

- Thiết lập bộ công cụ ban đầu bạn cần để bắt đầu và chạy.
- Xem qua một ví dụ đơn giản.
- Liệt kê các địa chỉ mạng thử nghiệm của các mạng lưới mà bạn hiện có thể thử nghiệm Tellor.

## UsingTellor {#usingtellor}

Điều đầu tiên bạn muốn làm là cài đặt các công cụ cơ bản cần thiết để sử dụng Tellor làm nguồn cấp dữ liệu của bạn. Sử dụng [gói này](https://github.com/tellor-io/usingtellor) để cài đặt Hợp đồng Người dùng Tellor (Tellor User Contracts):

`npm install usingtellor`

Sau khi cài đặt, điều này sẽ cho phép các hợp đồng của bạn kế thừa các hàm từ hợp đồng 'UsingTellor'.

Tuyệt vời! Bây giờ bạn đã chuẩn bị sẵn các công cụ, hãy cùng đi qua một bài tập đơn giản nơi chúng ta truy xuất giá bitcoin:

### Ví dụ BTC/USD {#btcusd-example}

Kế thừa hợp đồng UsingTellor, truyền địa chỉ Tellor như một đối số của hàm khởi tạo:

Dưới đây là một ví dụ:

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

Để xem danh sách đầy đủ các địa chỉ hợp đồng, hãy tham khảo [tại đây](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Để dễ sử dụng, kho lưu trữ UsingTellor đi kèm với một phiên bản của hợp đồng [Tellor Playground](https://github.com/tellor-io/TellorPlayground) giúp tích hợp dễ dàng hơn. Xem [tại đây](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) để biết danh sách các hàm hữu ích.

Để triển khai nguồn cấp dữ liệu Tellor một cách mạnh mẽ hơn, hãy xem danh sách đầy đủ các hàm có sẵn [tại đây](https://github.com/tellor-io/usingtellor/blob/master/README.md).