---
title: Lớp mạng
description: Giới thiệu về lớp mạng của Ethereum.
lang: vi
sidebarDepth: 2
---

Ethereum là một mạng ngang hàng với hàng nghìn nút phải có khả năng giao tiếp với nhau bằng các giao thức được tiêu chuẩn hóa. "Lớp mạng" là một chồng các giao thức cho phép các nút đó tìm thấy nhau và trao đổi thông tin. Điều này bao gồm việc "lan truyền" thông tin (giao tiếp một-nhiều) qua mạng cũng như hoán đổi các yêu cầu và phản hồi giữa các nút cụ thể (giao tiếp một-một). Mỗi nút phải tuân thủ các quy tắc mạng cụ thể để đảm bảo chúng đang gửi và nhận thông tin chính xác.

Có hai phần trong phần mềm máy khách (máy khách thực thi và máy khách đồng thuận), mỗi phần có một chồng mạng riêng biệt. Cũng như giao tiếp với các nút Ethereum khác, các máy khách thực thi và đồng thuận phải giao tiếp với nhau. Trang này đưa ra giải thích giới thiệu về các giao thức cho phép giao tiếp này.

Các máy khách thực thi lan truyền các giao dịch qua mạng ngang hàng của lớp thực thi. Điều này đòi hỏi giao tiếp được mã hóa giữa các máy ngang hàng đã được xác thực. Khi một trình xác thực được chọn để đề xuất một khối, các giao dịch từ bể giao dịch cục bộ của nút sẽ được chuyển đến các máy khách đồng thuận thông qua kết nối RPC cục bộ, và sẽ được đóng gói vào các khối Beacon. Các máy khách đồng thuận sau đó sẽ lan truyền các khối Beacon qua mạng p2p của chúng. Điều này đòi hỏi hai mạng p2p riêng biệt: một mạng kết nối các máy khách thực thi để lan truyền giao dịch và một mạng kết nối các máy khách đồng thuận để lan truyền khối.

## Điều kiện tiên quyết {#prerequisites}

Một số kiến thức về [các nút và máy khách](/developers/docs/nodes-and-clients/) của Ethereum sẽ hữu ích để hiểu trang này.

## Lớp Thực thi {#execution-layer}

Các giao thức mạng của lớp thực thi được chia thành hai chồng:

- chồng khám phá: được xây dựng trên UDP và cho phép một nút mới tìm các nút ngang hàng để kết nối

- chồng DevP2P: nằm trên TCP và cho phép các nút trao đổi thông tin

Cả hai chồng hoạt động song song. Chồng khám phá đưa những người tham gia mạng mới vào mạng, và chồng DevP2P cho phép các tương tác của họ.

### Khám phá {#discovery}

Khám phá là quá trình tìm kiếm các nút khác trong mạng. Quá trình này được khởi động bằng cách sử dụng một bộ nhỏ các nút khởi động (bootnodes) (các nút có địa chỉ được [mã hóa cứng](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) vào máy khách để chúng có thể được tìm thấy ngay lập tức và kết nối máy khách với các nút ngang hàng). Các nút khởi động này chỉ tồn tại để giới thiệu một nút mới cho một bộ các nút ngang hàng - đây là mục đích duy nhất của chúng, chúng không tham gia vào các tác vụ máy khách thông thường như đồng bộ hóa chuỗi và chúng chỉ được sử dụng trong lần đầu tiên máy khách được khởi chạy.

Giao thức được sử dụng cho các tương tác giữa nút và nút khởi động là một dạng sửa đổi của [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) sử dụng [bảng băm phân tán](https://en.wikipedia.org/wiki/Distributed_hash_table) để chia sẻ danh sách các nút. Mỗi nút có một phiên bản của bảng này chứa thông tin cần thiết để kết nối với các nút ngang hàng gần nhất. Sự 'gần gũi' này không phải là về mặt địa lý - khoảng cách được xác định bởi sự tương đồng của ID nút. Bảng của mỗi nút được làm mới thường xuyên như một tính năng bảo mật. Ví dụ, trong giao thức khám phá [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), các nút cũng có thể gửi 'quảng cáo' hiển thị các giao thức phụ mà máy khách hỗ trợ, cho phép các nút ngang hàng thương lượng về các giao thức mà cả hai có thể sử dụng để giao tiếp.

Quá trình khám phá bắt đầu bằng một trò chơi PING-PONG. Một PING-PONG thành công sẽ "liên kết" nút mới với một nút khởi động. Thông báo ban đầu cảnh báo một nút khởi động về sự tồn tại của một nút mới tham gia vào mạng là một `PING`. Gói `PING` này bao gồm thông tin đã được băm về nút mới, nút khởi động và một dấu thời gian hết hạn. Nút khởi động nhận `PING` và trả về một `PONG` chứa hàm băm của `PING`. Nếu các hàm băm của `PING` và `PONG` khớp nhau, kết nối giữa nút mới và nút khởi động được xác minh và chúng được cho là đã "liên kết".

Sau khi liên kết, nút mới có thể gửi yêu cầu `FIND-NEIGHBOURS` tới nút khởi động. Dữ liệu được trả về bởi nút khởi động bao gồm một danh sách các nút ngang hàng mà nút mới có thể kết nối. Nếu các nút không được liên kết, yêu cầu `FIND-NEIGHBOURS` sẽ thất bại, do đó nút mới sẽ không thể tham gia vào mạng.

Khi nút mới nhận được danh sách các nút lân cận từ nút khởi động, nó bắt đầu một cuộc trao đổi PING-PONG với mỗi nút trong số đó. Các PING-PONG thành công sẽ liên kết nút mới với các nút lân cận của nó, cho phép trao đổi thông điệp.

```
khởi động máy khách --> kết nối với nút khởi động --> liên kết với nút khởi động --> tìm các nút lân cận --> liên kết với các nút lân cận
```

Các máy khách thực thi hiện đang sử dụng giao thức khám phá [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) và đang có nỗ lực tích cực để chuyển sang giao thức [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Bản ghi nút Ethereum {#enr}

[Bản ghi nút Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) là một đối tượng chứa ba yếu tố cơ bản: một chữ ký (hàm băm của nội dung bản ghi được tạo theo một lược đồ nhận dạng đã thỏa thuận), một số thứ tự theo dõi các thay đổi đối với bản ghi, và một danh sách tùy ý các cặp khóa:giá trị. Đây là một định dạng có khả năng tương thích trong tương lai, cho phép trao đổi thông tin nhận dạng dễ dàng hơn giữa các nút ngang hàng mới và là định dạng [địa chỉ mạng](/developers/docs/networking-layer/network-addresses) được ưa thích cho các nút Ethereum.

#### Tại sao khám phá được xây dựng trên UDP? {#why-udp}

UDP không hỗ trợ bất kỳ kiểm tra lỗi, gửi lại các gói bị lỗi, hoặc tự động mở và đóng kết nối - thay vào đó nó chỉ gửi một luồng thông tin liên tục đến một mục tiêu, bất kể nó có được nhận thành công hay không. Chức năng tối thiểu này cũng có nghĩa là chi phí tối thiểu, làm cho loại kết nối này rất nhanh. Đối với việc khám phá, nơi một nút chỉ đơn giản muốn cho biết sự hiện diện của mình để sau đó thiết lập một kết nối chính thức với một nút ngang hàng, UDP là đủ. Tuy nhiên, đối với phần còn lại của chồng mạng, UDP không phù hợp với mục đích. Việc trao đổi thông tin giữa các nút khá phức tạp và do đó cần một giao thức có đầy đủ tính năng hơn có thể hỗ trợ gửi lại, kiểm tra lỗi, v.v. Chi phí bổ sung liên quan đến TCP là xứng đáng với chức năng bổ sung. Do đó, phần lớn của chồng P2P hoạt động trên TCP.

### DevP2P {#devp2p}

Bản thân DevP2P là một chồng các giao thức mà Ethereum triển khai để thiết lập và duy trì mạng ngang hàng. Sau khi các nút mới tham gia vào mạng, các tương tác của chúng được điều chỉnh bởi các giao thức trong chồng [DevP2P](https://github.com/ethereum/devp2p). Tất cả những giao thức này đều nằm trên TCP và bao gồm giao thức truyền tải RLPx, giao thức dây (wire protocol) và một số giao thức phụ. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) là giao thức điều chỉnh việc khởi tạo, xác thực và duy trì các phiên giữa các nút. RLPx mã hóa các thông báo bằng RLP (Recursive Length Prefix - Tiền tố độ dài đệ quy), đây là một phương pháp mã hóa dữ liệu rất hiệu quả về không gian thành một cấu trúc tối thiểu để gửi giữa các nút.

Một phiên RLPx giữa hai nút bắt đầu bằng một cái bắt tay mã hóa ban đầu. Điều này liên quan đến việc nút gửi một thông báo xác thực (auth message) sau đó được xác minh bởi nút ngang hàng. Sau khi xác minh thành công, nút ngang hàng tạo ra một thông báo xác nhận xác thực (auth-acknowledgement message) để trả về cho nút khởi tạo. Đây là một quá trình trao đổi khóa cho phép các nút giao tiếp một cách riêng tư và an toàn. Một cái bắt tay mã hóa thành công sau đó sẽ kích hoạt cả hai nút gửi thông báo "hello" cho nhau "trên đường truyền". Giao thức dây được khởi tạo bằng một cuộc trao đổi thông báo hello thành công.

Các thông báo hello chứa:

- phiên bản giao thức
- ID máy khách
- cổng
- ID nút
- danh sách các giao thức phụ được hỗ trợ

Đây là thông tin cần thiết cho một tương tác thành công vì nó xác định những khả năng được chia sẻ giữa cả hai nút và cấu hình giao tiếp. Có một quá trình thương lượng giao thức phụ, trong đó danh sách các giao thức phụ được hỗ trợ bởi mỗi nút được so sánh và những giao thức chung cho cả hai nút có thể được sử dụng trong phiên.

Cùng với các thông báo hello, giao thức dây cũng có thể gửi một thông báo "ngắt kết nối" để cảnh báo cho một nút ngang hàng rằng kết nối sẽ bị đóng. Giao thức dây cũng bao gồm các thông báo PING và PONG được gửi định kỳ để giữ cho một phiên luôn mở. Do đó, các cuộc trao đổi giao thức RLPx và giao thức dây thiết lập nền tảng cho việc giao tiếp giữa các nút, cung cấp giàn giáo để trao đổi thông tin hữu ích theo một giao thức phụ cụ thể.

### Các giao thức phụ {#sub-protocols}

#### Giao thức dây {#wire-protocol}

Khi các nút ngang hàng được kết nối và một phiên RLPx đã được bắt đầu, giao thức dây xác định cách các nút ngang hàng giao tiếp. Ban đầu, giao thức dây xác định ba nhiệm vụ chính: đồng bộ hóa chuỗi, lan truyền khối và trao đổi giao dịch. Tuy nhiên, sau khi Ethereum chuyển sang bằng chứng cổ phần, việc lan truyền khối và đồng bộ hóa chuỗi đã trở thành một phần của lớp đồng thuận. Trao đổi giao dịch vẫn nằm trong phạm vi của các máy khách thực thi. Trao đổi giao dịch là việc trao đổi các giao dịch đang chờ xử lý giữa các nút để những người xây dựng khối có thể chọn một số trong số chúng để đưa vào khối tiếp theo. Thông tin chi tiết về các nhiệm vụ này có tại [đây](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Các máy khách hỗ trợ các giao thức phụ này sẽ hiển thị chúng thông qua [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (giao thức phụ Ethereum nhẹ) {#les}

Đây là một giao thức tối thiểu để đồng bộ hóa các máy khách nhẹ. Theo truyền thống, giao thức này hiếm khi được sử dụng vì các nút đầy đủ được yêu cầu phục vụ dữ liệu cho các máy khách nhẹ mà không được khuyến khích. Hành vi mặc định của các máy khách thực thi là không phục vụ dữ liệu máy khách nhẹ qua les. Thông tin thêm có trong [thông số kỹ thuật](https://github.com/ethereum/devp2p/blob/master/caps/les.md) của les.

#### Snap {#snap}

[Giao thức snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) là một tiện ích mở rộng tùy chọn cho phép các nút ngang hàng trao đổi ảnh chụp nhanh các trạng thái gần đây, cho phép các nút ngang hàng xác minh dữ liệu tài khoản và lưu trữ mà không cần phải tải xuống các nút trung gian của cây Merkle.

#### Wit (giao thức witness) {#wit}

[Giao thức witness](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) là một tiện ích mở rộng tùy chọn cho phép trao đổi các bằng chứng trạng thái giữa các nút ngang hàng, giúp đồng bộ hóa các máy khách đến đỉnh của chuỗi.

#### Whisper {#whisper}

Whisper là một giao thức nhằm mục đích cung cấp dịch vụ nhắn tin an toàn giữa các nút ngang hàng mà không cần ghi bất kỳ thông tin nào vào chuỗi khối. Nó từng là một phần của giao thức dây DevP2P nhưng hiện đã không còn được dùng nữa. Các [dự án liên quan](https://wakunetwork.com/) khác tồn tại với mục tiêu tương tự.

## Lớp đồng thuận {#consensus-layer}

Các máy khách đồng thuận tham gia vào một mạng ngang hàng riêng biệt với một thông số kỹ thuật khác. Các máy khách đồng thuận cần tham gia vào việc lan truyền khối để chúng có thể nhận các khối mới từ các nút ngang hàng và quảng bá chúng khi đến lượt chúng là người đề xuất khối. Tương tự như lớp thực thi, điều này trước tiên đòi hỏi một giao thức khám phá để một nút có thể tìm thấy các nút ngang hàng và thiết lập các phiên an toàn để trao đổi các khối, các chứng thực, v.v.

### Khám phá {#consensus-discovery}

Tương tự như các máy khách thực thi, các máy khách đồng thuận sử dụng [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) trên UDP để tìm kiếm các nút ngang hàng. Việc triển khai discv5 của lớp đồng thuận khác với việc triển khai của các máy khách thực thi chỉ ở chỗ nó bao gồm một bộ điều hợp kết nối discv5 vào một chồng [libP2P](https://libp2p.io/), loại bỏ DevP2P. Các phiên RLPx của lớp thực thi không còn được dùng nữa để thay thế cho bắt tay kênh an toàn nhiễu của libP2P.

### ENRs {#consensus-enr}

ENR cho các nút đồng thuận bao gồm khóa công khai, địa chỉ IP, các cổng UDP và TCP của nút và hai trường dành riêng cho sự đồng thuận: trường bit mạng con chứng thực và khóa `eth2`. Trường hợp đầu tiên giúp các nút dễ dàng tìm thấy các nút ngang hàng tham gia vào các mạng con lan truyền chứng thực cụ thể. Khóa `eth2` chứa thông tin về phiên bản phân nhánh Ethereum mà nút đang sử dụng, đảm bảo các nút ngang hàng đang kết nối với đúng Ethereum.

### libP2P {#libp2p}

Chồng libP2P hỗ trợ tất cả các giao tiếp sau khi khám phá. Các máy khách có thể quay số và lắng nghe trên IPv4 và/hoặc IPv6 như được định nghĩa trong ENR của chúng. Các giao thức trên lớp libP2P có thể được chia thành các miền lan truyền (gossip) và yêu cầu/phản hồi (req/resp).

### Lan truyền {#gossip}

Miền lan truyền bao gồm tất cả thông tin phải được lan truyền nhanh chóng trên toàn mạng. Điều này bao gồm các khối beacon, bằng chứng, chứng thực, thoát và các hành vi phạt. Điều này được truyền bằng libP2P gossipsub v1 và dựa vào các siêu dữ liệu khác nhau được lưu trữ cục bộ tại mỗi nút, bao gồm kích thước tối đa của các tải trọng lan truyền để nhận và truyền. Thông tin chi tiết về miền lan truyền có tại [đây](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Yêu cầu-phản hồi {#request-response}

Miền yêu cầu-phản hồi chứa các giao thức để các máy khách yêu cầu thông tin cụ thể từ các nút ngang hàng của chúng. Các ví dụ bao gồm việc yêu cầu các khối Beacon cụ thể khớp với các hàm băm gốc nhất định hoặc trong một phạm vi các slot. Các phản hồi luôn được trả về dưới dạng các byte được mã hóa SSZ và nén bằng snappy.

## Tại sao máy khách đồng thuận lại ưu tiên SSZ hơn RLP? {#ssz-vs-rlp}

SSZ là viết tắt của tuần tự hóa đơn giản (simple serialization). Nó sử dụng các độ lệch cố định giúp dễ dàng giải mã các phần riêng lẻ của một thông báo đã được mã hóa mà không cần phải giải mã toàn bộ cấu trúc, điều này rất hữu ích cho máy khách đồng thuận vì nó có thể lấy hiệu quả các mẩu thông tin cụ thể từ các thông báo đã được mã hóa. Nó cũng được thiết kế đặc biệt để tích hợp với các giao thức Merkle, với các lợi ích về hiệu quả liên quan cho việc Merkle hóa. Vì tất cả các hàm băm trong lớp đồng thuận đều là các gốc Merkle, điều này tạo nên một cải tiến đáng kể. SSZ cũng đảm bảo các biểu diễn duy nhất của các giá trị.

## Kết nối các máy khách thực thi và đồng thuận {#connecting-clients}

Cả máy khách đồng thuận và máy khách thực thi đều chạy song song. Chúng cần được kết nối để máy khách đồng thuận có thể cung cấp hướng dẫn cho máy khách thực thi, và máy khách thực thi có thể chuyển các gói giao dịch cho máy khách đồng thuận để đưa vào các khối Beacon. Giao tiếp giữa hai máy khách có thể được thực hiện bằng cách sử dụng kết nối RPC cục bộ. Một API được gọi là ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) xác định các hướng dẫn được gửi giữa hai máy khách. Vì cả hai máy khách đều nằm sau một danh tính mạng duy nhất, chúng chia sẻ một ENR (bản ghi nút Ethereum) chứa một khóa riêng cho mỗi máy khách (khóa eth1 và khóa eth2).

Tóm tắt luồng điều khiển được hiển thị bên dưới, với chồng mạng liên quan trong ngoặc.

### Khi máy khách đồng thuận không phải là người sản xuất khối: {#when-consensus-client-is-not-block-producer}

- Máy khách đồng thuận nhận một khối thông qua giao thức lan truyền khối (p2p đồng thuận)
- Máy khách đồng thuận xác thực trước khối, tức là đảm bảo khối đến từ một người gửi hợp lệ với siêu dữ liệu chính xác
- Các giao dịch trong khối được gửi đến lớp thực thi dưới dạng tải trọng thực thi (kết nối RPC cục bộ)
- Lớp thực thi thực hiện các giao dịch và xác thực trạng thái trong tiêu đề khối (tức là kiểm tra các hàm băm khớp nhau)
- Lớp thực thi chuyển dữ liệu xác thực trở lại lớp đồng thuận, khối hiện được coi là đã được xác thực (kết nối RPC cục bộ)
- Lớp đồng thuận thêm khối vào đầu chuỗi khối của chính nó và chứng thực cho nó, quảng bá chứng thực qua mạng (p2p đồng thuận)

### Khi máy khách đồng thuận là người sản xuất khối: {#when-consensus-client-is-block-producer}

- Máy khách đồng thuận nhận được thông báo rằng nó là người sản xuất khối tiếp theo (p2p đồng thuận)
- Lớp đồng thuận gọi phương thức `create block` trong máy khách thực thi (RPC cục bộ)
- Lớp thực thi truy cập vào mempool giao dịch đã được điền bởi giao thức lan truyền giao dịch (p2p thực thi)
- Máy khách thực thi gói các giao dịch thành một khối, thực hiện các giao dịch và tạo ra một hàm băm khối
- Máy khách đồng thuận lấy các giao dịch và hàm băm khối từ máy khách thực thi và thêm chúng vào khối beacon (RPC cục bộ)
- Máy khách đồng thuận quảng bá khối qua giao thức lan truyền khối (p2p đồng thuận)
- Các máy khách khác nhận khối được đề xuất thông qua giao thức lan truyền khối và xác thực như được mô tả ở trên (p2p đồng thuận)

Một khi khối đã được chứng thực bởi đủ các trình xác thực, nó sẽ được thêm vào đầu chuỗi, được biện minh và cuối cùng được hoàn tất.

![](cons_client_net_layer.png)
![](exe_client_net_layer.png)

Sơ đồ lớp mạng cho các máy khách đồng thuận và thực thi, từ [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Đọc thêm {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Thông số kỹ thuật mạng lớp đồng thuận](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)
[kademlia sang discv5](https://vac.dev/kademlia-to-discv5)
[Bài báo Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Giới thiệu về mạng p2p của Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Mối quan hệ eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Video chi tiết về việc hợp nhất và máy khách eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
