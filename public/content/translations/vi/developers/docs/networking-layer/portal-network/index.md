---
title: Portal Network
description: "Tổng quan về Portal Network, một mạng lưới ngang hàng giúp duy trì tính khả dụng của lịch sử Ethereum khi các ứng dụng khách ngừng lưu trữ toàn bộ dữ liệu này."
lang: vi
---

[Ethereum](/) là một mạng lưới bao gồm các máy tính chạy phần mềm ứng dụng khách Ethereum. Mỗi máy tính này được gọi là một 'nút'. Phần mềm ứng dụng khách cho phép một nút gửi và nhận dữ liệu trên mạng lưới Ethereum, đồng thời xác minh dữ liệu theo các quy tắc Giao thức Ethereum. Các nút lưu giữ rất nhiều dữ liệu lịch sử trong bộ nhớ đĩa của chúng và bổ sung thêm khi nhận được các gói thông tin mới, được gọi là các khối, từ các nút khác trên mạng lưới. Điều này là cần thiết để luôn kiểm tra xem một nút có thông tin nhất quán với phần còn lại của mạng lưới hay không. Điều này có nghĩa là việc chạy một nút có thể yêu cầu rất nhiều dung lượng đĩa. Một số hoạt động của nút cũng có thể yêu cầu nhiều RAM.

Các ứng dụng khách thực thi không còn phải giữ tất cả dữ liệu đó nữa. Kể từ tháng 7 năm 2025, chúng có thể loại bỏ phần thân và biên lai của các khối từ trước [The Merge](/roadmap/merge/), và lộ trình Ethereum bao gồm việc loại bỏ thêm lịch sử của Chuỗi theo thời gian. Lịch sử đó vẫn phải luôn khả dụng cho bất kỳ ai cần đến nó, chẳng hạn như các trình khám phá khối, trình lập chỉ mục hoặc một Ví đang tra cứu một giao dịch cũ.

Portal Network giữ cho lịch sử này luôn khả dụng bằng cách chia sẻ nó thành các phần nhỏ trên nhiều nút. Không có nút nào phải lưu trữ toàn bộ dữ liệu đó, và một nút có thể tìm nạp bất kỳ phần nào và kiểm tra nó với dữ liệu mà nó đã giữ, mà không cần phải tin tưởng nút đã gửi nó.

Tìm hiểu thêm về [các nút và ứng dụng khách](/developers/docs/nodes-and-clients/)

## Tại sao chúng ta cần Portal Network {#why-do-we-need-portal-network}

Các nút Ethereum lưu trữ bản sao Chuỗi khối Ethereum đầy đủ hoặc một phần của riêng chúng. Bản sao cục bộ này được sử dụng để xác thực các giao dịch và đảm bảo nút đang theo dõi đúng Chuỗi. Dữ liệu được lưu trữ cục bộ này cho phép các nút xác minh độc lập rằng dữ liệu đến là hợp lệ và chính xác mà không cần phải tin tưởng bất kỳ thực thể nào khác.

Bản sao cục bộ này của Chuỗi khối cùng với dữ liệu trạng thái và biên lai liên quan chiếm rất nhiều dung lượng trên ổ cứng của nút. Ví dụ: một ổ SSD 4TB được khuyến nghị để chạy một nút sử dụng [Geth](https://geth.ethereum.org) được ghép nối với một ứng dụng khách đồng thuận. Với toàn bộ lịch sử Chuỗi, Geth chiếm hơn 1,8TB dung lượng đĩa (tính đến tháng 9 năm 2026) và con số đó tiếp tục tăng lên cùng với Chuỗi.

Điều này có nghĩa là việc chạy các nút có thể tốn kém, bởi vì một lượng lớn dung lượng đĩa phải được dành riêng cho Ethereum. [Hết hạn lịch sử](/roadmap/statelessness/#history-expiry) làm giảm điều này bằng cách cho phép các ứng dụng khách xóa dữ liệu khối cũ mà chúng không cần để theo dõi Chuỗi: kể từ khi [hết hạn lịch sử một phần](https://blog.ethereum.org/2025/07/08/partial-history-exp) vào tháng 7 năm 2025, các ứng dụng khách thực thi có thể loại bỏ phần thân và biên lai của mọi khối trước The Merge. [Hết hạn trạng thái](/roadmap/statelessness/#state-expiry) và [tính phi trạng thái](/roadmap/statelessness/) là các giải pháp sâu hơn vẫn đang được nghiên cứu.

Một khi các nút ngừng lưu trữ lịch sử cũ, chúng không còn có thể phục vụ nó cho những người khác. Các kho lưu trữ, torrent và nhà cung cấp giữ các bản sao của nó; Portal Network phân tán nó trên nhiều nút, vì vậy nó vẫn khả dụng mà không phụ thuộc vào bất kỳ nút nào trong số đó.

## Portal Network hoạt động như thế nào? {#how-does-portal-network-work}

Các nút Ethereum có các Giao thức nghiêm ngặt xác định cách chúng giao tiếp với nhau. Các ứng dụng khách thực thi giao tiếp bằng cách sử dụng một tập hợp các giao thức phụ được gọi là [devp2p](/developers/docs/networking-layer/#devp2p), trong khi các ứng dụng khách đồng thuận sử dụng một ngăn xếp các giao thức phụ khác gọi là [libp2p](/developers/docs/networking-layer/#libp2p). devp2p cho phép một nút yêu cầu phần thân khối và biên lai từ các nút ngang hàng của nó, nhưng một nút ngang hàng đã loại bỏ lịch sử cũ không thể phục vụ nó. Các ứng dụng và Ví cũng có thể lấy dữ liệu từ một nút thông qua [Giao diện Lập trình Ứng dụng (API) JSON-RPC](/developers/docs/apis/json-rpc/), nhưng điều đó phụ thuộc vào một nút hoặc nhà cung cấp lưu trữ dữ liệu và tin tưởng rằng nó trung thực.

Portal Network là một mạng lưới ngang hàng riêng biệt được xây dựng để chia sẻ lịch sử. Nó chạy trên [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), Giao thức khám phá nút mà các ứng dụng khách đồng thuận cũng sử dụng để tìm kiếm các nút ngang hàng, và tổ chức các nút của nó dưới dạng một [bảng Mã băm phân tán (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), tương tự như của BitTorrent. Mỗi nút có một ID nút và mỗi phần nội dung, chẳng hạn như biên lai của một khối, có một ID nội dung trong cùng một không gian ID, được bắt nguồn từ số khối của nó. Mỗi nút lưu trữ nội dung có ID gần nhất với ID của chính nó, lên đến một khoảng cách mà nó chọn, được gọi là bán kính của nó. Để tìm nạp một phần nội dung, một nút sẽ hỏi các nút ngang hàng mà nó biết gần nhất với ID nội dung. Các nút ngang hàng không có nội dung đó sẽ trả lời bằng các nút gần hơn nữa, cho đến khi yêu cầu đến được một nút lưu trữ nó.

<PortalHistoryDiagram />

Một nút không bao giờ phải tin tưởng vào dữ liệu mà nó nhận được. Nó giữ mọi tiêu đề block, và mỗi tiêu đề cam kết với các giao dịch và biên lai của khối thông qua các gốc như `transactionsRoot` và `receiptsRoot`. Nút kiểm tra phần thân khối hoặc biên lai của khối với các gốc đó trước khi sử dụng chúng.

### Các Portal Network {#the-portal-networks}

Portal Network ban đầu được thiết kế như một số mạng con cho phép các máy khách nhẹ theo dõi Chuỗi mà không cần tin tưởng vào một nút đầy đủ: mạng lưới máy khách nhẹ Chuỗi Beacon, mạng lưới trạng thái, mạng lưới lan truyền giao dịch và mạng lưới lịch sử. Vào năm 2025, các thông số kỹ thuật của tất cả ngoại trừ một mạng lưới đã được chuyển sang dạng kế thừa và quá trình phát triển hiện tập trung vào **Mạng lưới lịch sử**, nơi lưu trữ phần thân và biên lai của các khối trong quá khứ cho các ứng dụng khách thực thi giữ mọi tiêu đề block nhưng đã loại bỏ phần còn lại của lịch sử.

## Các ứng dụng khách Portal Network {#client-diversity-as-default}

Một số nhóm đã xây dựng các ứng dụng khách Portal Network:

- [Ứng dụng khách Nimbus Portal](https://fluffy.guide) (trước đây là Fluffy): được viết bằng Nim, và là ứng dụng khách vẫn đang được phát triển tích cực
- [Trin](https://github.com/ethereum/trin): được viết bằng Rust, không còn được bảo trì
- [Ultralight](https://github.com/ethereumjs/ultralight): được viết bằng TypeScript, không có bản cập nhật nào kể từ giữa năm 2025
- [Shisui](https://github.com/zen-eth/shisui): được viết bằng Go, không có bản cập nhật nào kể từ giữa năm 2025

## Đọc thêm {#further-reading}

- [Thông số kỹ thuật của Portal Network](https://github.com/ethereum/portal-network-specs)
- [Sử dụng Giao thức Portal Network cho việc hết hạn lịch sử](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Hết hạn lịch sử một phần](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Network (Piper Merriam tại Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord của Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Trang web Portal Network](https://www.ethportal.net/)
