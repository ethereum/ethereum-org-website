---
title: "Lớp mạng"
description: "Giới thiệu về lớp mạng của Ethereum."
lang: vi
sidebarDepth: 2
---

[Ethereum](/) là một mạng lưới ngang hàng với hàng ngàn nút phải có khả năng giao tiếp với nhau bằng các giao thức được tiêu chuẩn hóa. "Lớp mạng" là ngăn xếp các giao thức cho phép các nút đó tìm thấy nhau và trao đổi thông tin. Điều này bao gồm việc "lan truyền" thông tin (giao tiếp một-nhiều) qua mạng lưới cũng như hoán đổi các yêu cầu và phản hồi giữa các nút cụ thể (giao tiếp một-một). Mỗi nút phải tuân thủ các quy tắc mạng cụ thể để đảm bảo chúng đang gửi và nhận thông tin chính xác.

Có hai phần trong phần mềm máy khách (máy khách thực thi và ứng dụng khách đồng thuận), mỗi phần có ngăn xếp mạng riêng biệt. Ngoài việc giao tiếp với các nút Ethereum khác, máy khách thực thi và ứng dụng khách đồng thuận phải giao tiếp với nhau. Trang này cung cấp một lời giải thích giới thiệu về các giao thức cho phép sự giao tiếp này.

Các máy khách thực thi lan truyền các giao dịch qua mạng lưới ngang hàng lớp thực thi. Điều này yêu cầu giao tiếp được mã hóa giữa các nút ngang hàng đã được xác thực. Khi một trình xác thực được chọn để đề xuất một khối, các giao dịch từ bể giao dịch cục bộ của nút sẽ được chuyển đến các ứng dụng khách đồng thuận thông qua kết nối RPC cục bộ, sau đó sẽ được đóng gói thành các khối beacon. Các ứng dụng khách đồng thuận sau đó sẽ lan truyền các khối beacon trên mạng lưới p2p của chúng. Điều này yêu cầu hai mạng lưới p2p riêng biệt: một mạng kết nối các máy khách thực thi để lan truyền giao dịch và một mạng kết nối các ứng dụng khách đồng thuận để lan truyền khối.

## Điều kiện tiên quyết {#prerequisites}

Một số kiến thức về [các nút và máy khách](/developers/docs/nodes-and-clients/) Ethereum sẽ hữu ích để hiểu trang này.

## Lớp thực thi {#execution-layer}

Các giao thức mạng của lớp thực thi được chia thành hai ngăn xếp:

- ngăn xếp khám phá: được xây dựng trên UDP và cho phép một nút mới tìm thấy các nút ngang hàng để kết nối

- ngăn xếp DevP2P: nằm trên TCP và cho phép các nút trao đổi thông tin

Cả hai ngăn xếp hoạt động song song. Ngăn xếp khám phá đưa những người tham gia mạng lưới mới vào mạng lưới và ngăn xếp DevP2P cho phép các tương tác của họ.

### Khám phá {#discovery}

Khám phá là quá trình tìm kiếm các nút khác trong mạng lưới. Quá trình này được khởi động bằng cách sử dụng một tập hợp nhỏ các nút khởi động (các nút có địa chỉ được [mã hóa cứng](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) vào máy khách để chúng có thể được tìm thấy ngay lập tức và kết nối máy khách với các nút ngang hàng). Các nút khởi động này chỉ tồn tại để giới thiệu một nút mới với một tập hợp các nút ngang hàng - đây là mục đích duy nhất của chúng, chúng không tham gia vào các tác vụ máy khách thông thường như đồng bộ hóa chuỗi và chúng chỉ được sử dụng trong lần đầu tiên một máy khách được khởi động.

Giao thức được sử dụng cho các tương tác giữa nút và nút khởi động là một dạng sửa đổi của [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f), sử dụng một [bảng băm phân tán](https://en.wikipedia.org/wiki/Distributed_hash_table) để chia sẻ danh sách các nút. Mỗi nút có một phiên bản của bảng này chứa thông tin cần thiết để kết nối với các nút ngang hàng gần nhất của nó. Sự 'gần gũi' này không phải là về mặt địa lý - khoảng cách được xác định bởi sự tương đồng của ID nút. Bảng của mỗi nút được làm mới thường xuyên như một tính năng bảo mật. Ví dụ, trong giao thức khám phá [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), các nút cũng có thể gửi 'quảng cáo' hiển thị các giao thức phụ mà máy khách hỗ trợ, cho phép các nút ngang hàng đàm phán về các giao thức mà cả hai có thể sử dụng để giao tiếp.

Khám phá bắt đầu bằng một trò chơi PING-PONG. Một PING-PONG thành công sẽ "liên kết" nút mới với một nút khởi động. Thông điệp ban đầu cảnh báo một nút khởi động về sự tồn tại của một nút mới tham gia mạng lưới là một `PING`. `PING` này bao gồm thông tin đã được băm về nút mới, nút khởi động và dấu thời gian hết hạn. Nút khởi động nhận `PING` và trả về một `PONG` chứa mã băm của `PING`. Nếu các mã băm của `PING` và `PONG` khớp nhau thì kết nối giữa nút mới và nút khởi động được xác minh và chúng được cho là đã "liên kết".

Sau khi được liên kết, nút mới có thể gửi một yêu cầu `FIND-NEIGHBOURS` đến nút khởi động. Dữ liệu được trả về bởi nút khởi động bao gồm danh sách các nút ngang hàng mà nút mới có thể kết nối. Nếu các nút không được liên kết, yêu cầu `FIND-NEIGHBOURS` sẽ thất bại, do đó nút mới sẽ không thể tham gia mạng lưới.

Khi nút mới nhận được danh sách các nút lân cận từ nút khởi động, nó bắt đầu trao đổi PING-PONG với từng nút trong số đó. Các PING-PONG thành công sẽ liên kết nút mới với các nút lân cận của nó, cho phép trao đổi thông điệp.

```
khởi động máy khách --> kết nối với nút khởi động --> liên kết với nút khởi động --> tìm các nút lân cận --> liên kết với các nút lân cận
```

Các máy khách thực thi hiện đang sử dụng giao thức khám phá [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) và đang có nỗ lực tích cực để chuyển sang giao thức [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Bản ghi nút Ethereum {#enr}

[Bản ghi nút Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) là một đối tượng chứa ba yếu tố cơ bản: một chữ ký (mã băm của nội dung bản ghi được tạo theo một số sơ đồ danh tính đã thỏa thuận), một số thứ tự theo dõi các thay đổi đối với bản ghi và một danh sách tùy ý các cặp khóa:giá trị. Đây là một định dạng hướng tới tương lai cho phép trao đổi thông tin nhận dạng dễ dàng hơn giữa các nút ngang hàng mới và là định dạng [địa chỉ mạng](/developers/docs/networking-layer/network-addresses) ưa thích cho các nút Ethereum.

#### Tại sao khám phá được xây dựng trên UDP? {#why-udp}

UDP không hỗ trợ bất kỳ kiểm tra lỗi nào, gửi lại các gói bị lỗi hoặc mở và đóng kết nối một cách linh hoạt - thay vào đó, nó chỉ bắn một luồng thông tin liên tục vào mục tiêu, bất kể nó có được nhận thành công hay không. Chức năng tối thiểu này cũng chuyển thành chi phí hoạt động tối thiểu, làm cho loại kết nối này rất nhanh. Đối với khám phá, nơi một nút chỉ muốn thông báo sự hiện diện của nó để sau đó thiết lập kết nối chính thức với một nút ngang hàng, UDP là đủ. Tuy nhiên, đối với phần còn lại của ngăn xếp mạng, UDP không phù hợp với mục đích. Việc trao đổi thông tin giữa các nút khá phức tạp và do đó cần một giao thức đầy đủ tính năng hơn có thể hỗ trợ gửi lại, kiểm tra lỗi, v.v. Chi phí bổ sung liên quan đến TCP là xứng đáng với chức năng bổ sung. Do đó, phần lớn ngăn xếp P2P hoạt động trên TCP.

### DevP2P {#devp2p}

Bản thân DevP2P là toàn bộ một ngăn xếp các giao thức mà Ethereum triển khai để thiết lập và duy trì mạng lưới ngang hàng. Sau khi các nút mới tham gia mạng lưới, các tương tác của chúng được điều chỉnh bởi các giao thức trong ngăn xếp [DevP2P](https://github.com/ethereum/devp2p). Tất cả những thứ này đều nằm trên TCP và bao gồm giao thức truyền tải RLPx, giao thức wire và một số giao thức phụ. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) là giao thức điều chỉnh việc khởi tạo, xác thực và duy trì các phiên giữa các nút. RLPx mã hóa các thông điệp bằng RLP (Tiền tố độ dài đệ quy), đây là một phương pháp rất tiết kiệm không gian để mã hóa dữ liệu thành một cấu trúc tối thiểu để gửi giữa các nút.

Một phiên RLPx giữa hai nút bắt đầu bằng một cái bắt tay mật mã ban đầu. Điều này liên quan đến việc nút gửi một thông điệp xác thực, sau đó được xác minh bởi nút ngang hàng. Khi xác minh thành công, nút ngang hàng tạo ra một thông điệp xác nhận xác thực để trả về cho nút khởi tạo. Đây là một quá trình trao đổi khóa cho phép các nút giao tiếp riêng tư và an toàn. Một cái bắt tay mật mã thành công sau đó kích hoạt cả hai nút gửi một thông điệp "hello" cho nhau "trên wire". Giao thức wire được khởi tạo bằng một cuộc trao đổi thành công các thông điệp hello.

Các thông điệp hello chứa:

- phiên bản giao thức
- ID máy khách
- cổng
- ID nút
- danh sách các giao thức phụ được hỗ trợ

Đây là thông tin cần thiết cho một tương tác thành công vì nó xác định những khả năng nào được chia sẻ giữa cả hai nút và cấu hình giao tiếp. Có một quá trình đàm phán giao thức phụ trong đó danh sách các giao thức phụ được hỗ trợ bởi mỗi nút được so sánh và những giao thức chung cho cả hai nút có thể được sử dụng trong phiên.

Cùng với các thông điệp hello, giao thức wire cũng có thể gửi một thông điệp "ngắt kết nối" đưa ra cảnh báo cho một nút ngang hàng rằng kết nối sẽ bị đóng. Giao thức wire cũng bao gồm các thông điệp PING và PONG được gửi định kỳ để giữ cho một phiên luôn mở. Do đó, các trao đổi RLPx và giao thức wire thiết lập nền tảng giao tiếp giữa các nút, cung cấp giàn giáo để thông tin hữu ích được trao đổi theo một giao thức phụ cụ thể.

### Các giao thức phụ {#sub-protocols}

#### Giao thức wire {#wire-protocol}

Khi các nút ngang hàng được kết nối và một phiên RLPx đã được bắt đầu, giao thức wire xác định cách các nút ngang hàng giao tiếp. Ban đầu, giao thức wire xác định ba nhiệm vụ chính: đồng bộ hóa chuỗi, sự truyền khối và trao đổi giao dịch. Tuy nhiên, khi Ethereum chuyển sang Bằng chứng cổ phần (PoS), sự truyền khối và đồng bộ hóa chuỗi đã trở thành một phần của lớp đồng thuận. Trao đổi giao dịch vẫn nằm trong phạm vi của các máy khách thực thi. Trao đổi giao dịch đề cập đến việc trao đổi các giao dịch đang chờ xử lý giữa các nút để những người xây dựng khối có thể chọn một số trong số chúng để đưa vào khối tiếp theo. Thông tin chi tiết về các nhiệm vụ này có sẵn [tại đây](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Các máy khách hỗ trợ các giao thức phụ này hiển thị chúng thông qua [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (giao thức phụ Ethereum nhẹ) {#les}

Đây là một giao thức tối thiểu để đồng bộ hóa các máy khách nhẹ. Theo truyền thống, giao thức này hiếm khi được sử dụng vì các nút đầy đủ được yêu cầu phục vụ dữ liệu cho các máy khách nhẹ mà không được khuyến khích. Hành vi mặc định của các máy khách thực thi là không phục vụ dữ liệu máy khách nhẹ qua les. Thông tin thêm có sẵn trong [đặc tả](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

[Giao thức snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) là một tiện ích mở rộng tùy chọn cho phép các nút ngang hàng trao đổi các bản chụp của các trạng thái gần đây, cho phép các nút ngang hàng xác minh dữ liệu tài khoản và lưu trữ mà không cần phải tải xuống các nút Merkle trie trung gian.

#### Wit (giao thức bằng chứng dữ liệu) {#wit}

[Giao thức bằng chứng dữ liệu](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) là một tiện ích mở rộng tùy chọn cho phép trao đổi bằng chứng dữ liệu trạng thái giữa các nút ngang hàng, giúp đồng bộ hóa các máy khách với đỉnh của chuỗi.

#### Whisper {#whisper}

Whisper là một giao thức nhằm cung cấp nhắn tin bảo mật giữa các nút ngang hàng mà không ghi bất kỳ thông tin nào lên chuỗi khối. Nó là một phần của giao thức wire DevP2P nhưng hiện không còn được dùng nữa. Các [dự án liên quan](https://wakunetwork.com/) khác tồn tại với các mục tiêu tương tự.

## Lớp đồng thuận {#consensus-layer}

Các ứng dụng khách đồng thuận tham gia vào một mạng lưới ngang hàng riêng biệt với một đặc tả khác. Các ứng dụng khách đồng thuận cần tham gia vào việc lan truyền khối để chúng có thể nhận các khối mới từ các nút ngang hàng và phát sóng chúng khi đến lượt chúng làm người đề xuất khối. Tương tự như lớp thực thi, điều này trước tiên yêu cầu một giao thức khám phá để một nút có thể tìm thấy các nút ngang hàng và thiết lập các phiên an toàn để trao đổi khối, chứng thực, v.v.

### Khám phá {#consensus-discovery}

Tương tự như các máy khách thực thi, các ứng dụng khách đồng thuận sử dụng [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) qua UDP để tìm kiếm các nút ngang hàng. Việc triển khai discv5 của lớp đồng thuận chỉ khác với các máy khách thực thi ở chỗ nó bao gồm một bộ chuyển đổi kết nối discv5 vào một ngăn xếp [libP2P](https://libp2p.io/), loại bỏ DevP2P. Các phiên RLPx của lớp thực thi không còn được dùng nữa để chuyển sang bắt tay kênh bảo mật noise của libP2P.

### ENR {#consensus-enr}

ENR cho các nút đồng thuận bao gồm khóa công khai của nút, địa chỉ IP, cổng UDP và TCP và hai trường dành riêng cho đồng thuận: trường bit mạng con chứng thực và khóa `eth2`. Trường đầu tiên giúp các nút dễ dàng tìm thấy các nút ngang hàng tham gia vào các mạng con lan truyền chứng thực cụ thể. Khóa `eth2` chứa thông tin về phiên bản phân nhánh Ethereum nào mà nút đang sử dụng, đảm bảo các nút ngang hàng đang kết nối với đúng Ethereum.

### libP2P {#libp2p}

Ngăn xếp libP2P hỗ trợ tất cả các giao tiếp sau khi khám phá. Các máy khách có thể quay số và lắng nghe trên IPv4 và/hoặc IPv6 như được định nghĩa trong ENR của chúng. Các giao thức trên lớp libP2P có thể được chia nhỏ thành các miền lan truyền và yêu cầu/phản hồi.

### Lan truyền {#gossip}

Miền lan truyền bao gồm tất cả thông tin phải lan truyền nhanh chóng trên toàn mạng lưới. Điều này bao gồm các khối beacon, bằng chứng, chứng thực, thoát và cắt giảm. Điều này được truyền bằng cách sử dụng libP2P gossipsub v1 và dựa vào các siêu dữ liệu khác nhau được lưu trữ cục bộ tại mỗi nút, bao gồm kích thước tối đa của tải trọng lan truyền để nhận và truyền. Thông tin chi tiết về miền lan truyền có sẵn [tại đây](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Yêu cầu-phản hồi {#request-response}

Miền yêu cầu-phản hồi chứa các giao thức cho các máy khách yêu cầu thông tin cụ thể từ các nút ngang hàng của chúng. Các ví dụ bao gồm yêu cầu các khối beacon cụ thể khớp với các mã băm gốc nhất định hoặc trong một phạm vi các khe. Các phản hồi luôn được trả về dưới dạng các byte được mã hóa SSZ và nén bằng snappy.

## Tại sao ứng dụng khách đồng thuận thích SSZ hơn RLP? {#ssz-vs-rlp}

SSZ là viết tắt của tuần tự hóa đơn giản (simple serialization). Nó sử dụng các độ lệch cố định giúp dễ dàng giải mã các phần riêng lẻ của một thông điệp được mã hóa mà không cần phải giải mã toàn bộ cấu trúc, điều này rất hữu ích cho ứng dụng khách đồng thuận vì nó có thể lấy các phần thông tin cụ thể một cách hiệu quả từ các thông điệp được mã hóa. Nó cũng được thiết kế đặc biệt để tích hợp với các giao thức Merkle, với các mức tăng hiệu quả liên quan cho việc Merkle hóa. Vì tất cả các mã băm trong lớp đồng thuận đều là gốc Merkle, điều này mang lại một sự cải thiện đáng kể. SSZ cũng đảm bảo các biểu diễn duy nhất của các giá trị.

## Kết nối máy khách thực thi và ứng dụng khách đồng thuận {#connecting-clients}

Cả ứng dụng khách đồng thuận và máy khách thực thi đều chạy song song. Chúng cần được kết nối để ứng dụng khách đồng thuận có thể cung cấp hướng dẫn cho máy khách thực thi và máy khách thực thi có thể chuyển các gói giao dịch cho ứng dụng khách đồng thuận để đưa vào các khối beacon. Giao tiếp giữa hai máy khách có thể đạt được bằng cách sử dụng kết nối RPC cục bộ. Một API được gọi là ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) định nghĩa các hướng dẫn được gửi giữa hai máy khách. Vì cả hai máy khách đều nằm sau một danh tính mạng duy nhất, chúng chia sẻ một ENR (Bản ghi nút Ethereum) chứa một khóa riêng cho mỗi máy khách (khóa Eth1 và khóa Eth2).

Tóm tắt về luồng điều khiển được hiển thị bên dưới, với ngăn xếp mạng có liên quan trong ngoặc.

### Khi ứng dụng khách đồng thuận không phải là người tạo khối: {#when-consensus-client-is-not-block-producer}

- Ứng dụng khách đồng thuận nhận được một khối thông qua giao thức lan truyền khối (p2p đồng thuận)
- Ứng dụng khách đồng thuận xác thực trước khối, tức là đảm bảo nó đến từ một người gửi hợp lệ với siêu dữ liệu chính xác
- Các giao dịch trong khối được gửi đến lớp thực thi dưới dạng tải trọng thực thi (kết nối RPC cục bộ)
- Lớp thực thi thực thi các giao dịch và xác thực trạng thái trong tiêu đề block (tức là kiểm tra các mã băm khớp nhau)
- Lớp thực thi chuyển dữ liệu xác thực trở lại lớp đồng thuận, khối hiện được coi là đã được xác thực (kết nối RPC cục bộ)
- Lớp đồng thuận thêm khối vào đỉnh của chuỗi khối của chính nó và chứng thực nó, phát sóng chứng thực qua mạng lưới (p2p đồng thuận)

### Khi ứng dụng khách đồng thuận là người tạo khối: {#when-consensus-client-is-block-producer}

- Ứng dụng khách đồng thuận nhận được thông báo rằng nó là người tạo khối tiếp theo (p2p đồng thuận)
- Lớp đồng thuận gọi phương thức `create block` trong máy khách thực thi (RPC cục bộ)
- Lớp thực thi truy cập mempool giao dịch đã được điền bởi giao thức lan truyền giao dịch (p2p thực thi)
- Máy khách thực thi đóng gói các giao dịch thành một khối, thực thi các giao dịch và tạo ra một mã băm khối
- Ứng dụng khách đồng thuận lấy các giao dịch và mã băm khối từ máy khách thực thi và thêm chúng vào khối beacon (RPC cục bộ)
- Ứng dụng khách đồng thuận phát sóng khối qua giao thức lan truyền khối (p2p đồng thuận)
- Các máy khách khác nhận được khối được đề xuất thông qua giao thức lan truyền khối và xác thực như mô tả ở trên (p2p đồng thuận)

Khi khối đã được chứng thực bởi đủ số lượng trình xác thực, nó sẽ được thêm vào đỉnh của chuỗi, đã được chứng minh hợp lệ và cuối cùng là đã chung cuộc.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Sơ đồ lớp mạng cho ứng dụng khách đồng thuận và máy khách thực thi, từ [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Đọc thêm {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p)
[LibP2p](https://github.com/libp2p/specs)
[Đặc tả mạng lớp đồng thuận](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[kademlia đến discv5](https://vac.dev/kademlia-to-discv5)
[bài báo kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[giới thiệu về p2p Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[mối quan hệ eth1/eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[video chi tiết về hợp nhất và máy khách eth2](https://www.youtube.com/watch?v=zNIrIninMgg)