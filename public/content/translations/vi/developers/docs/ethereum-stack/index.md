---
title: "Giới thiệu về ngăn xếp Ethereum"
description: "Hướng dẫn chi tiết về các lớp khác nhau của ngăn xếp Ethereum và cách chúng kết hợp với nhau."
lang: vi
---

Giống như bất kỳ ngăn xếp phần mềm nào, "ngăn xếp Ethereum" hoàn chỉnh sẽ khác nhau tùy theo từng dự án phụ thuộc vào mục tiêu của bạn.

Tuy nhiên, có những thành phần cốt lõi của Ethereum giúp cung cấp một mô hình tư duy về cách các ứng dụng phần mềm tương tác với chuỗi khối Ethereum. Việc hiểu các lớp của ngăn xếp sẽ giúp bạn hiểu các cách khác nhau mà Ethereum có thể được tích hợp vào các dự án phần mềm.

## Cấp độ 1: Máy ảo Ethereum {#ethereum-virtual-machine}

[Máy ảo Ethereum (EVM)](/developers/docs/evm/) là môi trường thực thi cho các hợp đồng thông minh trên Ethereum. Tất cả các hợp đồng thông minh và những thay đổi trạng thái trên chuỗi khối Ethereum đều được thực thi bởi các [giao dịch](/developers/docs/transactions/). EVM đảm nhận toàn bộ việc xử lý giao dịch trên mạng lưới Ethereum.

Giống như bất kỳ máy ảo nào, EVM tạo ra một mức độ trừu tượng giữa mã đang thực thi và máy thực thi (một nút Ethereum). Hiện tại, EVM đang chạy trên hàng ngàn nút được phân tán trên toàn thế giới.

Về mặt kỹ thuật, EVM sử dụng một tập hợp các chỉ thị mã lệnh để thực thi các tác vụ cụ thể. Các mã lệnh (140 mã lệnh duy nhất) này cho phép EVM đạt được tính [Turing-complete (đầy đủ Turing)](https://en.wikipedia.org/wiki/Turing_completeness), điều này có nghĩa là EVM có khả năng tính toán hầu như mọi thứ, nếu có đủ tài nguyên.

Là một nhà phát triển ứng dụng phi tập trung (dapp), bạn không cần phải biết nhiều về EVM ngoài việc nó tồn tại và nó cung cấp sức mạnh một cách đáng tin cậy cho tất cả các ứng dụng trên Ethereum mà không có thời gian chết.

## Cấp độ 2: Hợp đồng thông minh {#smart-contracts}

[Hợp đồng thông minh](/developers/docs/smart-contracts/) là các chương trình có thể thực thi chạy trên chuỗi khối Ethereum.

Hợp đồng thông minh được viết bằng các [ngôn ngữ lập trình](/developers/docs/smart-contracts/languages/) cụ thể được biên dịch thành mã byte EVM (các chỉ thị máy cấp thấp được gọi là mã lệnh).

Hợp đồng thông minh không chỉ đóng vai trò là các thư viện mã nguồn mở, về cơ bản chúng còn là các dịch vụ API mở luôn chạy và không thể bị gỡ xuống. Hợp đồng thông minh cung cấp các hàm công khai mà người dùng và các ứng dụng ([dapp](/developers/docs/dapps/)) có thể tương tác mà không cần sự cho phép. Bất kỳ ứng dụng nào cũng có thể tích hợp với các hợp đồng thông minh đã được triển khai để kết hợp các chức năng, chẳng hạn như thêm [nguồn cấp dữ liệu](/developers/docs/oracles/) hoặc để hỗ trợ hoán đổi token. Ngoài ra, bất kỳ ai cũng có thể triển khai các hợp đồng thông minh mới lên Ethereum để thêm chức năng tùy chỉnh nhằm đáp ứng nhu cầu ứng dụng của họ.

Là một nhà phát triển dapp, bạn sẽ chỉ cần viết các hợp đồng thông minh nếu bạn muốn thêm chức năng tùy chỉnh trên chuỗi khối Ethereum. Bạn có thể thấy rằng mình có thể đạt được hầu hết hoặc tất cả các nhu cầu của dự án chỉ bằng cách tích hợp với các hợp đồng thông minh hiện có, ví dụ như nếu bạn muốn hỗ trợ thanh toán bằng stablecoin hoặc cho phép sàn giao dịch token phi tập trung.

## Cấp độ 3: Các nút Ethereum {#ethereum-nodes}

Để một ứng dụng có thể tương tác với chuỗi khối Ethereum, nó phải kết nối với một [nút Ethereum](/developers/docs/nodes-and-clients/). Việc kết nối với một nút cho phép bạn đọc dữ liệu chuỗi khối và/hoặc gửi các giao dịch đến mạng lưới.

Các nút Ethereum là các máy tính chạy phần mềm - một máy khách Ethereum. Máy khách là một bản triển khai của Ethereum giúp xác minh tất cả các giao dịch trong mỗi khối, giữ cho mạng lưới an toàn và dữ liệu chính xác. **Các nút Ethereum chính là chuỗi khối Ethereum**. Chúng cùng nhau lưu trữ trạng thái của chuỗi khối Ethereum và đạt được sự đồng thuận về các giao dịch để thay đổi trạng thái chuỗi khối.

Bằng cách kết nối ứng dụng của bạn với một nút Ethereum (thông qua [API JSON-RPC](/developers/docs/apis/json-rpc/)), ứng dụng của bạn có thể đọc dữ liệu từ chuỗi khối (chẳng hạn như số dư tài khoản người dùng) cũng như phát sóng các giao dịch mới lên mạng lưới (chẳng hạn như chuyển ETH giữa các tài khoản người dùng hoặc thực thi các hàm của hợp đồng thông minh).

## Cấp độ 4: Các API máy khách Ethereum {#ethereum-client-apis}

Nhiều thư viện tiện ích (được xây dựng và duy trì bởi cộng đồng mã nguồn mở của Ethereum) cho phép các ứng dụng của bạn kết nối và giao tiếp với chuỗi khối Ethereum.

Nếu ứng dụng hướng tới người dùng của bạn là một ứng dụng web, bạn có thể chọn `npm install` một [API JavaScript](/developers/docs/apis/javascript/) trực tiếp trong giao diện người dùng (frontend) của mình. Hoặc có lẽ bạn sẽ chọn triển khai chức năng này ở phía máy chủ (server-side), sử dụng một API [Python](/developers/docs/programming-languages/python/) hoặc [Java](/developers/docs/programming-languages/java/).

Mặc dù các API này không phải là một phần bắt buộc của ngăn xếp, chúng trừu tượng hóa phần lớn sự phức tạp của việc tương tác trực tiếp với một nút Ethereum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi ETH sang Gwei) để với tư cách là một nhà phát triển, bạn có thể dành ít thời gian hơn để giải quyết những sự phức tạp của các máy khách Ethereum và dành nhiều thời gian hơn để tập trung vào chức năng cụ thể cho ứng dụng của bạn.

## Cấp độ 5: Các ứng dụng dành cho người dùng cuối {#end-user-applications}

Ở cấp độ cao nhất của ngăn xếp là các ứng dụng hướng tới người dùng. Đây là những ứng dụng tiêu chuẩn mà bạn thường xuyên sử dụng và xây dựng ngày nay: chủ yếu là các ứng dụng web và di động.

Cách bạn phát triển các giao diện người dùng này về cơ bản vẫn không thay đổi. Thường thì người dùng sẽ không cần biết ứng dụng họ đang sử dụng được xây dựng bằng một chuỗi khối.

## Bạn đã sẵn sàng chọn ngăn xếp của mình chưa? {#ready-to-choose-your-stack}

Hãy xem hướng dẫn của chúng tôi để [thiết lập môi trường phát triển cục bộ](/developers/local-environment/) cho ứng dụng Ethereum của bạn.

## Đọc thêm {#further-reading}

- [Kiến trúc của một ứng dụng Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_