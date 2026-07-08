---
title: Portal Network
description: "Tổng quan về Portal Network - một mạng lưới đang được phát triển được thiết kế để hỗ trợ các máy khách có tài nguyên thấp."
lang: vi
---

[Ethereum](/) là một mạng lưới bao gồm các máy tính chạy phần mềm máy khách Ethereum. Mỗi máy tính này được gọi là một 'nút'. Phần mềm máy khách cho phép một nút gửi và nhận dữ liệu trên mạng lưới Ethereum, đồng thời xác minh dữ liệu theo các quy tắc Giao thức Ethereum. Các nút lưu giữ rất nhiều dữ liệu lịch sử trong bộ nhớ đĩa của chúng và bổ sung thêm khi nhận được các gói thông tin mới, được gọi là các khối, từ các nút khác trên mạng lưới. Điều này là cần thiết để luôn kiểm tra xem một nút có thông tin nhất quán với phần còn lại của mạng lưới hay không. Điều này có nghĩa là việc chạy một nút có thể yêu cầu rất nhiều dung lượng đĩa. Một số hoạt động của nút cũng có thể yêu cầu nhiều RAM.

Để giải quyết vấn đề lưu trữ đĩa này, các 'node nhẹ' đã được phát triển để yêu cầu thông tin từ các nút đầy đủ thay vì tự lưu trữ tất cả. Tuy nhiên, điều này có nghĩa là node nhẹ không xác minh thông tin một cách độc lập mà thay vào đó là tin tưởng một nút khác. Điều này cũng có nghĩa là các nút đầy đủ được yêu cầu đảm nhận thêm công việc để phục vụ các node nhẹ đó.

Portal Network là một thiết kế mạng lưới mới cho Ethereum nhằm giải quyết vấn đề tính khả dụng của dữ liệu (DA) cho các "node nhẹ" mà không cần phải tin tưởng hoặc gây thêm áp lực cho các nút đầy đủ, bằng cách chia sẻ dữ liệu cần thiết thành các phần nhỏ trên toàn mạng lưới.

Tìm hiểu thêm về [các nút và máy khách](/developers/docs/nodes-and-clients/)

## Tại sao chúng ta cần Portal Network {#why-do-we-need-portal-network}

Các nút Ethereum lưu trữ bản sao toàn bộ hoặc một phần Chuỗi khối Ethereum của riêng chúng. Bản sao cục bộ này được sử dụng để xác thực các giao dịch và đảm bảo nút đang theo đúng Chuỗi. Dữ liệu được lưu trữ cục bộ này cho phép các nút xác minh độc lập rằng dữ liệu đến là hợp lệ và chính xác mà không cần phải tin tưởng bất kỳ thực thể nào khác.

Bản sao cục bộ này của Chuỗi khối cùng với dữ liệu trạng thái và biên lai liên quan chiếm rất nhiều không gian trên ổ cứng của nút. Ví dụ: một ổ cứng 2TB được khuyến nghị để chạy một nút sử dụng [Geth](https://geth.ethereum.org) được ghép nối với một ứng dụng khách đồng thuận. Sử dụng đồng bộ hóa nhanh (snap sync), chỉ lưu trữ dữ liệu Chuỗi từ một tập hợp các khối tương đối gần đây, Geth thường chiếm khoảng 650GB dung lượng đĩa nhưng tăng trưởng ở mức khoảng 14GB/tuần (bạn có thể cắt giảm nút trở lại 650GB theo định kỳ).

Điều này có nghĩa là việc chạy các nút có thể tốn kém, bởi vì một lượng lớn dung lượng đĩa phải được dành riêng cho Ethereum. Có một số giải pháp cho vấn đề này trên lộ trình Ethereum, bao gồm [hết hạn lịch sử](/roadmap/statelessness/#history-expiry), [hết hạn trạng thái](/roadmap/statelessness/#state-expiry) và [tính phi trạng thái](/roadmap/statelessness/). Tuy nhiên, những giải pháp này có thể mất vài năm nữa mới được triển khai. Cũng có các [node nhẹ](/developers/docs/nodes-and-clients/light-clients/) không lưu bản sao dữ liệu Chuỗi của riêng chúng, chúng yêu cầu dữ liệu chúng cần từ các nút đầy đủ. Tuy nhiên, điều này có nghĩa là các node nhẹ phải tin tưởng các nút đầy đủ để cung cấp dữ liệu trung thực và cũng gây áp lực lên các nút đầy đủ phải phục vụ dữ liệu mà các node nhẹ cần.

Portal Network nhằm mục đích cung cấp một cách thay thế để các node nhẹ lấy dữ liệu của chúng mà không cần tin tưởng hoặc làm tăng đáng kể công việc phải thực hiện bởi các nút đầy đủ. Cách điều này sẽ được thực hiện là giới thiệu một cách mới để các nút Ethereum chia sẻ dữ liệu trên toàn mạng lưới.

## Portal Network hoạt động như thế nào? {#how-does-portal-network-work}

Các nút Ethereum có các Giao thức nghiêm ngặt xác định cách chúng giao tiếp với nhau. Các máy khách thực thi giao tiếp bằng cách sử dụng một tập hợp các Giao thức phụ được gọi là [devp2p](/developers/docs/networking-layer/#devp2p), trong khi các ứng dụng khách đồng thuận sử dụng một ngăn xếp các Giao thức phụ khác gọi là [libp2p](/developers/docs/networking-layer/#libp2p). Chúng xác định các loại dữ liệu có thể được truyền giữa các nút.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Các nút cũng có thể phục vụ dữ liệu cụ thể thông qua [API JSON-RPC](/developers/docs/apis/json-rpc/), đây là cách các ứng dụng và ví hoán đổi thông tin với các nút Ethereum. Tuy nhiên, không có Giao thức nào trong số này là lý tưởng để phục vụ dữ liệu cho các máy khách nhẹ.

Các máy khách nhẹ hiện không thể yêu cầu các phần dữ liệu Chuỗi cụ thể qua devp2p hoặc libp2p vì các Giao thức đó chỉ được thiết kế để cho phép đồng bộ hóa Chuỗi và truyền bá (gossip) các khối và giao dịch. Các máy khách nhẹ không muốn tải xuống thông tin này vì điều đó sẽ khiến chúng không còn "nhẹ" nữa.

API JSON-RPC cũng không phải là một lựa chọn lý tưởng cho các yêu cầu dữ liệu của máy khách nhẹ, bởi vì nó dựa vào kết nối với một nút đầy đủ cụ thể hoặc nhà cung cấp RPC tập trung có thể phục vụ dữ liệu. Điều này có nghĩa là máy khách nhẹ phải tin tưởng nút/nhà cung cấp cụ thể đó là trung thực, và nút đầy đủ cũng có thể phải xử lý rất nhiều yêu cầu từ nhiều máy khách nhẹ, làm tăng thêm yêu cầu về băng thông của chúng.

Mục đích của Portal Network là suy nghĩ lại toàn bộ thiết kế, xây dựng đặc biệt cho sự gọn nhẹ, nằm ngoài các ràng buộc thiết kế của các máy khách Ethereum hiện tại.

Ý tưởng cốt lõi của Portal Network là lấy những phần tốt nhất của ngăn xếp mạng lưới hiện tại bằng cách cho phép thông tin cần thiết cho các máy khách nhẹ, chẳng hạn như dữ liệu lịch sử và danh tính của phần đầu Chuỗi hiện tại được phục vụ thông qua một mạng lưới phi tập trung ngang hàng kiểu devp2p gọn nhẹ sử dụng [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (tương tự như Bittorrent).

Ý tưởng là thêm các phần nhỏ của tổng dữ liệu lịch sử Ethereum và một số trách nhiệm nút cụ thể cho mỗi nút. Sau đó, các yêu cầu được phục vụ bằng cách tìm kiếm các nút lưu trữ dữ liệu cụ thể đã được yêu cầu và truy xuất nó từ chúng.

Điều này đảo ngược mô hình thông thường của các node nhẹ là tìm kiếm một nút duy nhất và yêu cầu chúng lọc và phục vụ khối lượng dữ liệu lớn; thay vào đó, chúng nhanh chóng lọc một mạng lưới lớn các nút mà mỗi nút xử lý một lượng nhỏ dữ liệu.

Mục tiêu là cho phép một mạng lưới phi tập trung gồm các máy khách Portal gọn nhẹ có thể:

- theo dõi phần đầu của Chuỗi
- đồng bộ hóa dữ liệu Chuỗi gần đây và lịch sử
- truy xuất dữ liệu trạng thái
- phát sóng các giao dịch
- thực thi các giao dịch bằng cách sử dụng [EVM](/developers/docs/evm/)

Những lợi ích của thiết kế mạng lưới này là:

- giảm sự phụ thuộc vào các nhà cung cấp tập trung
- Giảm mức sử dụng băng thông Internet
- Giảm thiểu hoặc không cần đồng bộ hóa
- Có thể truy cập được đối với các thiết bị bị hạn chế về tài nguyên (\<1 GB RAM, \<100 MB dung lượng đĩa, 1 CPU)

Bảng dưới đây cho thấy các chức năng của các máy khách hiện tại có thể được cung cấp bởi Portal Network, cho phép người dùng truy cập các chức năng này trên các thiết bị có tài nguyên rất thấp.

### Các Portal Network {#the-portal-networks}

| Máy khách nhẹ Beacon | Mạng lưới trạng thái | Truyền bá giao dịch | Mạng lưới lịch sử | Chỉ số Txn chính tắc |
| ------------------- | ---------------------------- | ------------------- | --------------- | -------------------  |
| Chuỗi Beacon nhẹ | Lưu trữ tài khoản và hợp đồng | Mempool gọn nhẹ | Tiêu đề | TxHash > Mã băm, Chỉ số |
| Dữ liệu Giao thức |                              |                     | Thân khối |                      |
|                     |                              |                     | Biên lai |                      |

## Sự đa dạng máy khách theo mặc định {#client-diversity-as-default}

Các nhà phát triển Portal Network cũng đã đưa ra lựa chọn thiết kế để xây dựng bốn máy khách Portal Network riêng biệt ngay từ ngày đầu tiên.

Các máy khách Portal Network là:

- [Trin](https://github.com/ethereum/trin): được viết bằng Rust
- [Fluffy](https://fluffy.guide): được viết bằng Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): được viết bằng TypeScript
- [Shisui](https://github.com/zen-eth/shisui): được viết bằng Go

Việc có nhiều triển khai máy khách độc lập giúp tăng cường khả năng phục hồi và sự phi tập trung của mạng lưới Ethereum.

Nếu một máy khách gặp sự cố hoặc lỗ hổng, các máy khách khác có thể tiếp tục hoạt động trơn tru, ngăn chặn điểm lỗi duy nhất. Ngoài ra, các triển khai máy khách đa dạng thúc đẩy sự đổi mới và cạnh tranh, thúc đẩy các cải tiến và giảm rủi ro độc canh trong hệ sinh thái.

## Đọc thêm {#further-reading}

- [Portal Network (Piper Merriam tại Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord của Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Trang web Portal Network](https://www.ethportal.net/)