---
title: "Giới thiệu về Ethereum stack"
description: "Một hướng dẫn về các lớp khác nhau của nền tảng Ethereum và cách chúng kết hợp với nhau."
lang: vi
---

Giống như bất kỳ bộ phần mềm nào, "bộ Ethereum" hoàn chỉnh sẽ khác nhau tùy theo từng dự án dựa trên mục tiêu của bạn.

Tuy nhiên, có những thành phần chính của Ethereum giúp chúng ta hình dung cách mà các ứng dụng phần mềm tương tác với chuỗi khối của Ethereum. Hiểu các lớp trong stack sẽ giúp bạn nắm bắt được những cách khác nhau mà Ethereum có thể được tích hợp vào các phần mềm dự án.

## Cấp 1: Máy ảo Ethereum {#ethereum-virtual-machine}

[Máy ảo Ethereum (EVM)](/developers/docs/evm/) là môi trường thực thi cho các hợp đồng thông minh trên Ethereum. Tất cả các hợp đồng thông minh và thay đổi trạng thái trên chuỗi khối Ethereum đều được thực thi bởi [các giao dịch](/developers/docs/transactions/). EVM xử lý toàn bộ quy trình giao dịch trên mạng Ethereum.

Giống như bất kỳ máy ảo nào, EVM tạo ra một lớp trừu tượng giữa các mã và máy đang chạy (một nút Ethereum). Hiện tại, EVM đang chạy trên hàng ngàn nút phân bổkhắp nơi trên thế giới.

Chi tiết thì EVM sử dụng một bộ lệnh opcode để thực hiện các tác vụ cụ thể. Các mã vận hành này (140 mã riêng biệt) cho phép EVM [hoàn thiện Turing](https://en.wikipedia.org/wiki/Turing_completeness), nghĩa là EVM có thể tính toán gần như mọi thứ, miễn là có đủ tài nguyên.

Là một nhà phát triển dapp, bạn không cần phải biết quá nhiều về EVM—chỉ cần biết rằng nó tồn tại và giữ cho tất cả các ứng dụng trên Ethereum hoạt động một cách trơn tru mà không xảy ra bất kỳ gián đoạn nào.

## Cấp 2: Hợp đồng thông minh {#smart-contracts}

[Các hợp đồng thông minh](/developers/docs/smart-contracts/) là các chương trình thực thi chạy trên chuỗi khối Ethereum.

Các hợp đồng thông minh được viết bằng các [ngôn ngữ lập trình](/developers/docs/smart-contracts/languages/) cụ thể, được biên dịch thành mã byte EVM (các lệnh máy cấp thấp được gọi là mã vận hành).

Hợp đồng thông minh không chỉ là thư viện mã nguồn mở, mà thực ra chúng giống như dịch vụ API mở luôn hoạt động và không thể bị tắt. Hợp đồng thông minh cung cấp các chức năng công khai mà người dùng và các ứng dụng ([các ứng dụng phi tập trung](/developers/docs/dapps/)) có thể tương tác mà không cần sự cho phép. Bất kỳ ứng dụng nào cũng có thể tích hợp với các hợp đồng thông minh đã triển khai để tạo nên chức năng, chẳng hạn như thêm [nguồn cấp dữ liệu](/developers/docs/oracles/) hoặc để hỗ trợ hoán đổi token. Ngoài ra, bất kỳ ai cũng có thể triển khai các hợp đồng thông minh mới trên Ethereum để thêm chức năng tùy chỉnh nhằm đáp ứng nhu cầu của ứng dụng của họ.

Nếu bạn là một nhà phát triển dapp, bạn chỉ cần viết hợp đồng thông minh nếu muốn thêm chức năng tùy chỉnh trên chuỗi khối Ethereum. Bạn có thể thấy rằng bạn có thể đáp ứng hầu hết hoặc tất cả nhu cầu của dự án chỉ bằng cách tích hợp với các hợp đồng thông minh hiện có, chẳng hạn như nếu bạn muốn hỗ trợ thanh toán bằng stablecoin hoặc cho phép trao đổi token một cách phi tập trung.

## Cấp 3: Các nút Ethereum {#ethereum-nodes}

Để một ứng dụng có thể tương tác với chuỗi khối Ethereum, ứng dụng đó phải kết nối với một [nút Ethereum](/developers/docs/nodes-and-clients/). Kết nối với một nút cho phép bạn đọc dữ liệu blockchain và cũng có thể gửi giao dịch đến mạng.

Các nút Ethereum là những máy tính chạy phần mềm - một client Ethereum. Một client là một bản triển khai của Ethereum, giúp xác minh tất cả các giao dịch trong mỗi khối, giữ cho mạng lưới an toàn và dữ liệu chính xác. **Các nút Ethereum là chuỗi khối Ethereum**. Họ cùng nhau lưu trữ trạng thái của blockchain Ethereum và đạt được sự đồng thuận về các giao dịch để biến đổi trạng thái của blockchain.

Bằng cách kết nối ứng dụng của bạn với một nút Ethereum (thông qua [API JSON-RPC](/developers/docs/apis/json-rpc/)), ứng dụng của bạn có thể đọc dữ liệu từ chuỗi khối (chẳng hạn như số dư tài khoản của người dùng) cũng như quảng bá các giao dịch mới đến mạng lưới (chẳng hạn như chuyển ETH giữa các tài khoản người dùng hoặc thực thi các chức năng của hợp đồng thông minh).

## Cấp 4: API máy khách Ethereum {#ethereum-client-apis}

Nhiều thư viện tiện ích (được xây dựng và duy trì bởi cộng đồng mã nguồn mở của Ethereum) cho phép ứng dụng của bạn kết nối và giao tiếp với chuỗi khối Ethereum.

Nếu ứng dụng hướng tới người dùng của bạn là một ứng dụng web, bạn có thể chọn `npm install` một [API JavaScript](/developers/docs/apis/javascript/) trực tiếp trong frontend của mình. Hoặc có lẽ bạn sẽ chọn triển khai chức năng này ở phía máy chủ, bằng cách sử dụng API [Python](/developers/docs/programming-languages/python/) hoặc [Java](/developers/docs/programming-languages/java/).

Mặc dù những API này không phải là một phần cần thiết trong hệ thống, nhưng chúng giúp đơn giản hóa rất nhiều khi làm việc trực tiếp với một nút Ethereum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi ETH sang Gwei) để với tư cách là một nhà phát triển, bạn có thể dành ít thời gian hơn để xử lý những điều phức tạp của các máy khách Ethereum và dành nhiều thời gian hơn để tập trung vào chức năng dành riêng cho ứng dụng của bạn.

## Cấp 5: Các ứng dụng cho người dùng cuối {#end-user-applications}

Ở cấp độ cao nhất của stack là việc khách hàng sử dụng ứng dụng Đây là những ứng dụng tiêu chuẩn mà bạn thường xuyên sử dụng và xây dựng ngày nay: chủ yếu là ứng dụng web và ứng dụng di động.

Cách mà bạn phát triển những giao diện người dùng này cơ bản vẫn như vậy. Người dùng thường không cần phải biết ứng dụng họ đang sử dụng được xây dựng trên nền tảng chuỗi khối

## Bạn đã sẵn sàng chọn stack cho mình? Sẵn sàng chọn stack của bạn? {#ready-to-choose-your-stack}

Hãy xem hướng dẫn của chúng tôi để [thiết lập môi trường phát triển cục bộ](/developers/local-environment/) cho ứng dụng Ethereum của bạn.

## Đọc thêm {#further-reading}

- [Kiến trúc của một ứng dụng Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
