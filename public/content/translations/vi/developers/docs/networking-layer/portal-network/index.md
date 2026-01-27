---
title: Mạng Portal
description: Tổng quan về Mạng Portal - một mạng đang trong quá trình phát triển được thiết kế để hỗ trợ các máy khách có tài nguyên thấp.
lang: vi
---

Ethereum là một mạng lưới bao gồm các máy tính chạy phần mềm máy khách Ethereum. Mỗi máy tính này được gọi là một 'nút'. Phần mềm máy khách cho phép một nút gửi và nhận dữ liệu trên mạng Ethereum và xác minh dữ liệu theo các quy tắc giao thức của Ethereum. Các nút lưu giữ rất nhiều dữ liệu lịch sử trong bộ nhớ đĩa và bổ sung vào đó khi chúng nhận được các gói thông tin mới, được gọi là các khối, từ các nút khác trên mạng. Điều này là cần thiết để luôn kiểm tra xem một nút có thông tin nhất quán với phần còn lại của mạng hay không. Điều này có nghĩa là việc chạy một nút có thể yêu cầu rất nhiều dung lượng đĩa. Một số hoạt động của nút cũng có thể yêu cầu nhiều RAM.

Để giải quyết vấn đề lưu trữ trên đĩa này, các nút 'nhẹ' đã được phát triển để yêu cầu thông tin từ các nút đầy đủ thay vì tự lưu trữ tất cả. Tuy nhiên, điều này có nghĩa là nút nhẹ không tự xác minh thông tin một cách độc lập mà thay vào đó là tin tưởng một nút khác. Điều đó cũng có nghĩa là các nút đầy đủ phải thực hiện thêm công việc để phục vụ các nút nhẹ đó.

Mạng Portal là một thiết kế mạng mới cho Ethereum nhằm giải quyết vấn đề tính sẵn có của dữ liệu cho các nút "nhẹ" mà không cần phải tin tưởng hoặc gây thêm áp lực cho các nút đầy đủ, bằng cách chia sẻ dữ liệu cần thiết thành các phần nhỏ trên toàn mạng.

Tìm hiểu thêm về [các nút và máy khách](/developers/docs/nodes-and-clients/)

## Tại sao chúng ta cần Mạng Portal {#why-do-we-need-portal-network}

Các nút Ethereum lưu trữ bản sao đầy đủ hoặc một phần của chuỗi khối Ethereum. Bản sao cục bộ này được sử dụng để xác thực các giao dịch và đảm bảo nút đang theo đúng chuỗi. Dữ liệu được lưu trữ cục bộ này cho phép các nút xác minh một cách độc lập rằng dữ liệu đến là hợp lệ và chính xác mà không cần phải tin tưởng bất kỳ thực thể nào khác.

Bản sao cục bộ của chuỗi khối cùng với dữ liệu trạng thái và biên nhận liên quan chiếm rất nhiều dung lượng trên đĩa cứng của nút. Ví dụ, một ổ cứng 2TB được khuyến nghị để chạy một nút sử dụng [Geth](https://geth.ethereum.org) được ghép nối với một máy khách đồng thuận. Sử dụng snap sync, chỉ lưu trữ dữ liệu chuỗi từ một bộ khối tương đối gần đây, Geth thường chiếm khoảng 650GB dung lượng đĩa nhưng tăng khoảng 14GB/tuần (bạn có thể định kỳ cắt tỉa nút trở lại 650GB).

Điều này có nghĩa là việc chạy các nút có thể tốn kém, vì một lượng lớn dung lượng đĩa phải được dành riêng cho Ethereum. Có một số giải pháp cho vấn đề này trên lộ trình của Ethereum, bao gồm [hết hạn lịch sử](/roadmap/statelessness/#history-expiry), [hết hạn trạng thái](/roadmap/statelessness/#state-expiry) và [tính không trạng thái](/roadmap/statelessness/). Tuy nhiên, có thể phải mất vài năm nữa những giải pháp này mới được triển khai. Cũng có những [nút nhẹ](/developers/docs/nodes-and-clients/light-clients/) không lưu bản sao dữ liệu chuỗi của riêng chúng, chúng yêu cầu dữ liệu cần thiết từ các nút đầy đủ. Tuy nhiên, điều này có nghĩa là các nút nhẹ phải tin tưởng các nút đầy đủ sẽ cung cấp dữ liệu trung thực và cũng gây áp lực lên các nút đầy đủ phải phục vụ dữ liệu mà các nút nhẹ cần.

Mạng Portal nhằm cung cấp một cách thay thế cho các nút nhẹ để lấy dữ liệu mà không yêu cầu tin tưởng hoặc tăng đáng kể khối lượng công việc mà các nút đầy đủ phải thực hiện. Cách thực hiện điều này là giới thiệu một phương pháp mới để các nút Ethereum chia sẻ dữ liệu trên toàn mạng.

## Mạng Portal hoạt động như thế nào? {#how-does-portal-network-work}

Các nút Ethereum có các giao thức nghiêm ngặt xác định cách chúng giao tiếp với nhau. Các máy khách thực thi giao tiếp bằng một bộ giao thức con được gọi là [DevP2P](/developers/docs/networking-layer/#devp2p), trong khi các máy khách đồng thuận sử dụng một chồng giao thức con khác gọi là [libP2P](/developers/docs/networking-layer/#libp2p). Các giao thức này xác định các loại dữ liệu có thể được truyền giữa các nút.

![devP2P và libP2P](portal-network-devp2p-libp2p.png)

Các nút cũng có thể phục vụ dữ liệu cụ thể thông qua [API JSON-RPC](/developers/docs/apis/json-rpc/), đó là cách các ứng dụng và ví hoán đổi thông tin với các nút Ethereum. Tuy nhiên, không có giao thức nào trong số này là lý tưởng để phục vụ dữ liệu cho các máy khách nhẹ.

Các máy khách nhẹ hiện không thể yêu cầu các phần dữ liệu chuỗi cụ thể qua DevP2P hoặc libP2p vì các giao thức đó chỉ được thiết kế để cho phép đồng bộ hóa chuỗi và truyền bá các khối và giao dịch. Các máy khách nhẹ không muốn tải xuống thông tin này vì điều đó sẽ khiến chúng không còn "nhẹ" nữa.

API JSON-RPC cũng không phải là lựa chọn lý tưởng cho các yêu cầu dữ liệu của máy khách nhẹ, vì nó phụ thuộc vào kết nối với một nút đầy đủ cụ thể hoặc nhà cung cấp RPC tập trung có thể phục vụ dữ liệu. Điều này có nghĩa là máy khách nhẹ phải tin tưởng nút/nhà cung cấp cụ thể đó là trung thực, và nút đầy đủ cũng có thể phải xử lý nhiều yêu cầu từ nhiều máy khách nhẹ, làm tăng yêu cầu về băng thông của họ.

Điểm mấu chốt của Mạng Portal là suy nghĩ lại toàn bộ thiết kế, xây dựng đặc biệt cho tính gọn nhẹ, bên ngoài các ràng buộc thiết kế của các máy khách Ethereum hiện có.

Ý tưởng cốt lõi của Mạng Portal là tận dụng những phần tốt nhất của chồng mạng hiện tại bằng cách cho phép thông tin cần thiết cho các máy khách nhẹ, chẳng hạn như dữ liệu lịch sử và danh tính của khối đứng đầu chuỗi hiện tại, được phục vụ thông qua một mạng phi tập trung ngang hàng kiểu DevP2P gọn nhẹ sử dụng [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (tương tự như Bittorrent).

Ý tưởng là thêm các phần nhỏ của tổng dữ liệu lịch sử Ethereum và một số trách nhiệm nút cụ thể cho mỗi nút. Sau đó, các yêu cầu được phục vụ bằng cách tìm kiếm các nút lưu trữ dữ liệu cụ thể đã được yêu cầu và truy xuất dữ liệu đó từ chúng.

Điều này đảo ngược mô hình thông thường của các nút nhẹ tìm một nút duy nhất và yêu cầu chúng lọc và phục vụ khối lượng lớn dữ liệu; thay vào đó, chúng nhanh chóng lọc một mạng lưới lớn các nút mà mỗi nút xử lý một lượng nhỏ dữ liệu.

Mục tiêu là cho phép một mạng lưới phi tập trung gồm các máy khách Portal nhẹ có thể:

- theo dõi khối đứng đầu chuỗi
- đồng bộ hóa dữ liệu chuỗi gần đây và lịch sử
- truy xuất dữ liệu trạng thái
- truyền bá các giao dịch
- thực thi các giao dịch bằng [Máy ảo Ethereum (EVM)](/developers/docs/evm/)

Những lợi ích của thiết kế mạng này là:

- giảm sự phụ thuộc vào các nhà cung cấp tập trung
- Giảm sử dụng băng thông Internet
- Đồng bộ hóa tối thiểu hoặc bằng không
- Có thể truy cập được đối với các thiết bị có tài nguyên hạn chế (\<1 GB RAM, \<100 MB dung lượng đĩa, 1 CPU)

Bảng dưới đây hiển thị các chức năng của các máy khách hiện có mà Mạng Portal có thể cung cấp, cho phép người dùng truy cập các chức năng này trên các thiết bị có tài nguyên rất thấp.

### Các Mạng Portal

| Máy khách nhẹ Beacon | Mạng trạng thái               | Lant truyền giao dịch | Mạng lịch sử  |
| -------------------- | ----------------------------- | --------------------- | ------------- |
| Chuỗi Beacon nhẹ     | Lưu trữ tài khoản và hợp đồng | Mempool nhẹ           | Tiêu đề       |
| Dữ liệu giao thức    |                               |                       | Nội dung khối |
|                      |                               |                       | Biên nhận     |

## Đa dạng máy khách theo mặc định {#client-diversity-as-default}

Các nhà phát triển Mạng Portal cũng đã đưa ra lựa chọn thiết kế là xây dựng bốn máy khách Mạng Portal riêng biệt ngay từ ngày đầu.

Các máy khách của Mạng Portal là:

- [Trin](https://github.com/ethereum/trin): viết bằng Rust
- [Fluffy](https://fluffy.guide): viết bằng Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): viết bằng Typescript
- [Shisui](https://github.com/zen-eth/shisui): viết bằng Go

Việc có nhiều triển khai máy khách độc lập giúp tăng cường khả năng phục hồi và tính phi tập trung của mạng Ethereum.

Nếu một máy khách gặp sự cố hoặc lỗ hổng, các máy khách khác có thể tiếp tục hoạt động trơn tru, ngăn chặn một điểm lỗi duy nhất. Ngoài ra, các triển khai máy khách đa dạng thúc đẩy sự đổi mới và cạnh tranh, thúc đẩy các cải tiến và giảm rủi ro đơn văn hóa trong hệ sinh thái.

## Đọc thêm {#further-reading}

- [Mạng Portal (Piper Merriam tại Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord Mạng Portal](https://discord.gg/CFFnmE7Hbs)
- [Trang web Mạng Portal](https://www.ethportal.net/)
