---
title: Nốt như một dịch vụ
description: Một cái nhìn tổng quan cho người mới bắt đầu về dịch vụ node, những ưu và nhược điểm, và các nhà cung cấp phổ biến.
lang: vi
sidebarDepth: 2
---

## Giới thiệu {#Introduction}

Việc chạy [nút Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) của riêng bạn có thể gặp nhiều thách thức, đặc biệt là khi mới bắt đầu hoặc khi mở rộng quy mô nhanh chóng. Có một [số dịch vụ](#popular-node-services) chạy cơ sở hạ tầng nút được tối ưu hóa cho bạn, vì vậy bạn có thể tập trung vào việc phát triển ứng dụng hoặc sản phẩm của mình. Chúng tôi sẽ giải thích cách hoạt động của các dịch vụ node, ưu và nhược điểm khi sử dụng chúng và liệt kê các nhà cung cấp nếu bạn quan tâm đến việc bắt đầu.

## Điều kiện tiên quyết {#prerequisites}

Nếu bạn chưa hiểu nút và máy khách là gì, hãy xem [Nút và máy khách](/developers/docs/nodes-and-clients/).

## Người đặt cược {#stakoooooooooooooors}

Những nhà đầu tư lập phải tự vận hành cơ sở hạ tầng của mình thay vì dựa vào các nhà cung cấp bên thứ ba. Điều này có nghĩa là chạy một cơ thế thực thi kết hợp với một cơ chế đồng thuận. Trước [The Merge](/roadmap/merge), bạn có thể chỉ chạy máy khách đồng thuận và sử dụng nhà cung cấp tập trung cho dữ liệu thực thi; điều này không còn khả thi nữa - một người đặt cược độc lập phải chạy cả hai máy khách. Tuy nhiên, có những dịch vụ có sẵn để làm đơn giản hóa quá trình này.

[Đọc thêm về cách chạy nút](/developers/docs/nodes-and-clients/run-a-node/).

Các dịch vụ được mô tả trên trang này dành cho các nút không có staking.

## Dịch vụ nút hoạt động như thể nào? {#how-do-node-services-work}

Các nhà cung cấp dịch vụ nút vận hành các cơ chế nút phân tán ở phía sau cho bạn, vì vậy bạn không cần phải làm điều đó.

Các dịch vụ này thường cung cấp một mã API mà bạn có thể sử dụng để ghi và đọc từ blockchain. Các dịch vụ này thường bao gồm quyền truy cập vào [các mạng thử nghiệm Ethereum](/developers/docs/networks/#ethereum-testnets) ngoài Mạng chính.

Một số dịch vụ cung cấp cho bạn một nút chuyên dụng mà họ quản lý, trong khi những dịch vụ khác sử dụng bộ cân bằng tải để phân phối hoạt động giữa các node.

Hầu như tất cả các dịch vụ nút đều cực kỳ dễ tích hợp, chỉ cần thay đổi dòng trong mã của bạn để hoán đổi nút tự lưu trữ hoặc thậm chí chuyển đổi giữa các dịch vụ.

Thông thường, các dịch vụ nút sẽ chạy nhiều loại [máy khách nút](/developers/docs/nodes-and-clients/#execution-clients) và [loại nút](/developers/docs/nodes-and-clients/#node-types), cho phép bạn truy cập các nút đầy đủ và nút lưu trữ ngoài các phương thức dành riêng cho máy khách trong một API.

Cần lưu ý rằng các dịch vụ nút không và không nên lưu trữ khóa riêng tư hoặc thông tin của bạn.

## Lợi ích của việc sử dụng dịch vụ nút là gì? {#benefits-of-using-a-node-service}

Lợi ích chính của việc sử dụng dịch vụ nút là không cần phải dành thời gian kỹ thuật để bảo trì và quản lý các nút một cách tự làm. Điều này cho phép bạn tập trung vào việc xây dựng sản phẩm của mình thay vì phải lo lắng về việc bảo trì hạ tầng.

Việc vận hành các nút của riêng bạn có thể rất tốn kém, từ chi phí lưu trữ đến băng thông và thời gian kỹ thuật quý giá. Các vấn đề như việc tăng cường thêm nút khi mở rộng quy mô, nâng cấp các nút lên các phiên bản mới nhất, và đảm bảo tính nhất quán của trạng thái có thể làm phân tâm khỏi việc xây dựng và chi tiêu tài nguyên cho sản phẩm web3 mà bạn mong muốn.

## Những nhược điểm của việc sử dụng dịch vụ nút là gì? {#cons-of-using-a-node-service}

Bằng cách sử dụng dịch vụ nút, bạn đang tập trung hóa khía cạnh cơ sở hạ tầng của sản phẩm của mình. Vì lý do này, các dự án coi sự phi tập trung là vô cùng quan trọng có thể ưu tiên việc tự lưu trữ các nút thay vì thuê ngoài cho bên thứ ba.

Đọc thêm về [lợi ích của việc chạy nút của riêng bạn](/developers/docs/nodes-and-clients/#benefits-to-you).

## Các dịch vụ nút phổ biến {#popular-node-services}

Dưới đây là danh sách một số nhà cung cấp nút Ethereum phổ biến nhất, xin vui lòng bổ sung bất kỳ nhà cung cấp nào còn thiếu! Mỗi dịch vụ nút cung cấp các lợi ích và tính năng khác nhau bên cạnh các gói miễn phí hoặc trả phí, bạn nên tìm hiểu xem dịch vụ nào phù hợp nhất với nhu cầu của bạn trước khi đưa ra quyết định.

- [**Alchemy**](https://alchemy.com/)
  - [Tài liệu](https://www.alchemy.com/docs/)
  - Tính năng
    - Gói miễn phí lớn nhất với 300 triệu đơn vị tính toán mỗi tháng (~30 triệu yêu cầu getLatestBlock)
    - Hỗ trợ đa chuỗi cho Polygon, Starknet, Optimism, Arbitrum
    - Cung cấp năng lượng cho khoảng 70% các ứng dụng phi tập trung Ethereum lớn nhất và khối lượng giao dịch DeFi
    - Cảnh báo webhook tức thì qua Alchemy Notify
    - Hỗ trợ và độ tin cậy/ổn định tốt nhất trong phân khúc
    - API NFT của Alchemy
    - Bảng điều khiển với Request Explorer, Mempool Watcher và Composer
    - Truy cập nguồn cấp testnet tích hợp
    - Cộng đồng nhà phát triển Discord năng động với 18.000 thành viên

- [**Allnodes**](https://www.allnodes.com/)
  - [Tài liệu](https://docs.allnodes.com/)
  - Tính năng
    - Không giới hạn tỷ lệ với mã thông báo PublicNode được tạo trên trang portfolio của Allnodes.
    - Các điểm cuối RPC miễn phí tập trung vào quyền riêng tư (hơn 100 chuỗi khối) trên [PublicNode](https://www.publicnode.com)
    - Các nút chuyên dụng không giới hạn tốc độ cho hơn 90 chuỗi khối
    - Các nút lưu trữ chuyên dụng cho hơn 30 chuỗi khối
    - Có sẵn tại 3 khu vực (Mỹ, EU, Châu Á)
    - Ảnh chụp nhanh cho hơn 100 chuỗi khối trên [PublicNode](https://www.publicnode.com/snapshots)
    - Hỗ trợ kỹ thuật 24/7 với SLA thời gian hoạt động từ 99.90%-99.98% (tùy thuộc vào gói dịch vụ).
    - Giá cho mỗi giờ
    - Thanh toán với Credit Card, PayPal hoặc Crypto

- [**All That Node**](https://allthatnode.com/)
  - [Tài liệu](https://docs.allthatnode.com/)
  - Tính năng
    - 50.000 yêu cầu mỗi ngày với gói miễn phí
    - Hỗ trợ lên tới 40 giao thức
    - Hỗ trợ API JSON-RPC (EVM, Tendermint), REST và Websocket
    - Truy cập không giới hạn vào dữ liệu lưu trữ
    - Hỗ trợ kỹ thuật 24/7 và thời gian hoạt động lên tới 99,9%
    - Faucet có sẵn trên đa chuỗi
    - Truy cập điểm cuối không giới hạn với số lượng khóa API không giới hạn
    - Hỗ trợ Theo dấu/Gỡ lỗi
    - Tự động cập nhật

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [Tài liệu](https://aws.amazon.com/managed-blockchain/resources/)
  - Tính năng
    - Quản lý tất cả các nút Ethereum
    - Có sẵn tại 6 quốc gia
    - JSON-RPC qua HTTP và WebSockets an toàn
    - Hỗ trợ 3 chuỗi
    - SLAs, AWS hỗ trợ 24/7
    - Go-ethereum và Lighthouse

- [**Ankr**](https://www.ankr.com/)
  - [Tài liệu](https://docs.ankr.com/)
  - Tính năng
    - Giao thức Ankr - truy cập mở đến các điểm cuối Public RPC API cho 8+ chuỗi
    - Cân bằng tải và giám sát tình trạng của nút để tạo ra một cổng kết nối nhanh chóng và đáng tin cậy đến nút gần nhất có sẵn
    - Gói cao cấp cho phép điểm cuối WSS và giới hạn tỷ lệ không giới hạn
    - Triển khai nút đầy đủ và nút xác thực chỉ với một cú nhấp chuột cho hơn 40 chuỗi
    - Mở rộng theo tiến độ
    - Bộ công cụ phân tích
    - Dashboard
    - Các điểm cuối RPC, HTTPS và WSS
    - Hỗ trợ tức thì

- [**Blast**](https://blastapi.io/)
  - [Tài liệu](https://docs.blastapi.io/)
  - Tính năng
    - Hỗ trợ RPC và WSS
    - Lưu trữ nút đa vùng
    - Cơ sở hạ tầng phi tập trung
    - API Công khai
    - Kế hoạch dành riêng miễn phí
    - Hỗ trợ đa chuỗi (17+ chuỗi khỗi)
    - Kho lưu trữ các nút
    - Hỗ trợ Discord 24/7
    - Giám sát và cảnh báo 24/7
    - Mức SLA tổng thể là 99,9%
    - Thanh toán bằng tiền điện tử

- [**BlockDaemon**](https://blockdaemon.com/)
  - [Tài liệu](https://ubiquity.docs.blockdaemon.com/)
  - Lợi ích
    - Dashboard
    - Trên cơ sở từng nút
    - Phân tích

- [**BlockPI**](https://blockpi.io/)
  - [Tài liệu](https://docs.blockpi.io/)
  - Tính năng
    - Cấu trúc nút mạnh mẽ và phân tán
    - Tối đa 40 điểm cuối HTTPS và WSS
    - Gói đăng ký miễn phí và gói hàng tháng
    - Phương pháp theo sát + Hỗ trợ dữ liệu lưu trữ
    - Gói dịch vụ có hiệu lực lên đến 90 ngày
    - Kế hoạch tùy chỉnh và phương thức thanh toán theo nhu cầu
    - Thanh toán bằng tiền điện tử
    - Hỗ trợ trực tiếp & Hỗ trợ kỹ thuật

- [**Chainbase**](https://www.chainbase.com/)
  - [Tài liệu](https://docs.chainbase.com)
  - Tính năng
    - Dịch vụ RPC sẵn sàng, nhanh chóng và có khả năng mở rộng
    - Hỗ trợ đa chuỗi
    - Miễn thuế
    - Dashboard thân thiện với người sử dụng
    - Cung cấp dịch vụ dữ liệu blockchain vượt xa RPC

- [**Chainstack**](https://chainstack.com/)
  - [Tài liệu](https://docs.chainstack.com/)
  - Tính năng
    - Chia sẻ nút miễn phí
    - Các nút lưu trữ chung
    - Hỗ trợ GraphQL
    - Điểm truy cập RPC và WSS
    - Cụm nút đầy đủ và nút lưu trữ chuyên dụng
    - Thời gian đồng bộ nhanh cho các khai triển chuyên dụng
    - Mang theo đám mây của bạn
    - Giá cho mỗi giờ
    - Hỗ trợ trực tiếp 24/7

- [**dRPC**](https://drpc.org/)
  - [Tài liệu](https://drpc.org/docs)
  - NodeCloud: Cơ sở hạ tầng RPC cắm và chạy bắt đầu từ 10 đô la (USD)—tốc độ tối đa, không giới hạn
  - Các tính năng của NodeCloud:
    - Hỗ trợ API cho 185 mạng lưới
    - Pool phân tán với hơn 40 nhà cung cấp
    - Phạm vi phủ sóng toàn cầu với chín (9) cụm địa lý
    - Hệ thống cân bằng tải được hỗ trợ bởi AI
    - Giá cố định trả theo mức sử dụng—không tăng giá, không hết hạn, không ràng buộc
    - Không giới hạn khóa, tinh chỉnh khóa chi tiết, vai trò nhóm, bảo vệ giao diện người dùng
    - Tỷ lệ cố định cho các phương thức là 20 đơn vị tính toán (CU) cho mỗi phương thức
    - [Danh sách chuỗi điểm cuối công khai](https://drpc.org/chainlist)
    - [Công cụ tính giá](https://drpc.org/pricing#calculator)
  - NodeCore: ngăn xếp mã nguồn mở cho các tổ chức muốn có toàn quyền kiểm soát

- [**GetBlock**](https://getblock.io/)
  - [Tài liệu](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Tính năng
    - Truy cập hơn 40 nút chuỗi khối
    - 40.000 yêu cầu miễn phí mỗi ngày
    - Số lượng khóa API không giới hạn
    - Tốc độ kết nối cao ở mức 1GB/giây
    - Theo dõi + Lưu trữ
    - Phân tích chuyên sâu
    - Tự động cập nhật
    - Hỗ trợ kĩ thuật

- [**InfStones**](https://infstones.com/)
  - Tính năng
    - Tùy chọn gói miễn phí
    - Mở rộng theo tiến độ
    - Phân tích
    - Dashboard
    - Điểm truy cập API độc nhất
    - Đầy đủ nút chuyên dụng
    - Thời gian đồng bộ nhanh cho các khai triển chuyên dụng
    - Hỗ trợ trực tiếp 24/7
    - Truy cập hơn 50 nút chuỗi khối

- [**Infura**](https://infura.io/)
  - [Tài liệu](https://infura.io/docs)
  - Tính năng
    - Tùy chọn gói miễn phí
    - Mở rộng theo tiến độ
    - Dữ liệu lưu trữ có phí
    - Hỗ trợ trực tiếp
    - Dashboard

- [**Kaleido**](https://kaleido.io/)
  - [Tài liệu](https://docs.kaleido.io/)
  - Tính năng
    - Gói khởi đầu miễn phí
    - Triển khai nút Ethereum với một chạm
    - Máy khách và thuật toán có thể tùy chỉnh (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - Hơn 500 API dịch vụ và quản trị
    - Giao diện RESTful cho việc gửi giao dịch Ethereum (hỗ trợ bởi Apache Kafka)
    - Các luồng ra cho việc phân phối sự kiện (hỗ trợ bởi Apache Kafka)
    - Bộ sưu tập chuyên sâu các dịch vụ "ngoài chuỗi" và dịch vụ phụ trợ (ví dụ: truyền tải tin nhắn được mã hóa song phương)
    - Quá trình khởi tạo mạng đơn giản với quản lý và kiểm soát quyền truy cập dựa trên vai trò
    - Quản lý người dùng tinh vi cho cả quản trị viên và người dùng cuối
    - Cơ sở hạ tầng quy mô lớn, kiên cố, đạt chuẩn doanh nghiệp
    - Quản lý khóa riêng tư Cloud HSM
    - Liên kết mạng chính Ethereum
    - Chứng nhận ISO 27k và SOC 2 loại 2
    - Cấu hình thời gian chạy động (ví dụ: thêm tích hợp đám mây, thay đổi các cổng vào của nút, v.v.)
    - Hỗ trợ cho việc triển khai đa đám mây, đa vùng và phối hợp lai.
    - Giá cả dựa trên SaaS theo giờ đơn
    - Hỗ trợ SLAs và 24x7

- [**Lava Network**](https://www.lavanet.xyz/)
  - [Tài liệu](https://docs.lavanet.xyz/)
  - Tính năng
    - Sử dụng testnet miễn phí
    - Sự dư thừa phi tập trung để đảm bảo tính khả dụng cao
    - Mã nguồn mở
    - SDK phi tập trung hoàn toàn
    - Tích hợp Ethers.js
    - Giao diện quản lý dự án trực quan
    - Tính toàn vẹn dữ liệu dựa trên đồng thuận
    - Hỗ trợ đa chuỗi

- [**Moralis**](https://moralis.io/)
  - [Tài liệu](https://docs.moralis.io/)
  - Tính năng
    - Chia sẻ nút miễn phí
    - Miễn phí lưu trữ các nút chia sẻ
    - Chính sách tập trung vào quyền riêng tư (không lưu giữ nhật ký)
    - Hỗ trợ chuỗi chéo
    - Mở rộng theo tiến độ
    - Dashboard
    - SDK Ethereum độc nhất
    - Điểm truy cập API độc nhất
    - Hỗ trợ kỹ thuật, trực tiếp

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [Tài liệu](https://docs.nodereal.io/docs/introduction)
  - Tính năng
    - Dịch vụ API RPC đáng tin cậy, nhanh chóng và có khả năng mở rộng.
    - API nâng cao dành cho các nhà phát triển web3
    - Hỗ trợ đa chuỗi
    - Bắt đầu miễn phí

- [**NOWNodes**](https://nownodes.io/)
  - [Tài liệu](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - Tính năng
    - Truy cập hơn 50 nút chuỗi khối
    - Khoá API miễn phí
    - Trình duyệt khối
    - Thời gian phản hồi APO ⩽ 1 giây
    - Nhóm hỗ trợ 24/7
    - Người quản lý tài khoản cá nhân
    - Các nút chia sẻ, lưu trữ, sao lưu và chuyên dụng.

- [**Pocket Network**](https://www.pokt.network/)
  - [Tài liệu](https://docs.pokt.network/home/)
  - Tính năng
    - Thị trường và giao thức RPC phi tập trung
    - 1 triệu yêu cầu mỗi ngày miễn phí (theo điểm kết nối, tối đa 2)
    - [Điểm cuối công khai](https://docs.pokt.network/developers/public-endpoints)
    - Chương trình Pre-Stake+ (nếu bạn cần hơn 1 triệu yêu cầu mỗi ngày)
    - Hỗ trợ hơn 15 chuỗi khối
    - Hơn 6400 nút đang kiếm POKT để phục vụ các ứng dụng.
    - Hỗ trợ Nút lưu trữ, Nút lưu trữ có Theo dõi, & Nút Mạng thử nghiệm
    - Sự đa dạng của các nút mạng chính Ethereum
    - Không có điểm chết đơn lẻ
    - Không có thời gian ngừng
    - Chi phí hiệu quả với Tokenomics gần như không có (cọc POKT một lần để nhận băng thông mạng)
    - Không có chi phí chìm hàng tháng, biến cơ sở hạ tầng của bạn thành tài sản.
    - Cân bằng tải được tích hợp sẵn trong giao thức
    - Tăng quy mô vô hạn số lượng yêu cầu mỗi ngày và số nút mỗi giờ khi bạn tiến hành.
    - Lựa chọn riêng tư nhất, không bị kiểm duyệt
    - Hỗ trợ lập trình viên thực hành
    - Bảng điều khiển và phân tích [Pocket Portal](https://bit.ly/ETHorg_POKTportal)

- [**QuickNode**](https://www.quicknode.com)
  - [Tài liệu](https://www.quicknode.com/docs/)
  - Tính năng
    - Hỗ trợ kỹ thuật 24/7 & cộng đồng nhà phát triển trên Discord
    - Mạng lưới đa đám mây/kim loại, cân bằng địa lý, độ trễ thấp
    - Hỗ trợ đa chuỗi (Optimism, Arbitrum, Polygon + 11 others)
    - Các lớp trung gian cho tốc độ và sự ổn định (định tuyến cuộc gọi, bộ nhớ đệm, lập chỉ mục)
    - Giám sát hợp đồng thông minh thông qua Webhooks
    - Bảng điều khiển trực quan, bộ phân tích, trình biên soạn RPC
    - Các tính năng bảo mật nâng cao (JWT, ẩn danh, whitelisting)
    - Dữ liệu NFT và phân tích API
    - [Chứng nhận SOC2](https://www.quicknode.com/security)
    - Phù hợp cho các nhà phát triển đến doanh nghiệp

- [**Rivet**](https://rivet.cloud/)
  - [Tài liệu](https://rivet.readthedocs.io/en/latest/)
  - Tính năng
    - Tùy chọn gói miễn phí
    - Mở rộng theo tiến độ

- [**SenseiNode**](https://senseinode.com)
  - [Tài liệu](https://docs.senseinode.com/)
  - Tính năng
    - Các nút chuyên dụng và chia sẻ
    - Dashboard
    - Lưu trữ trên AWS với nhiều nhà cung cấp khác nhau ở các địa điểm khắp Mỹ Latinh.
    - Cơ chế Prysm và Lighthouse

- [**SettleMint**](https://console.settlemint.com/)
  - [Tài liệu](https://docs.settlemint.com/)
  - Tính năng
    - Dùng thử miễn phí
    - Mở rộng theo tiến độ
    - Hỗ trợ GraphQL
    - Điểm truy cập RPC và WSS
    - Đầy đủ nút chuyên dụng
    - Mang theo đám mây của bạn
    - Bộ công cụ phân tích
    - Dashboard
    - Giá cho mỗi giờ
    - Hỗ trợ tức thì

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [Tài liệu](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - Tính năng
    - Gói miễn phí bao gồm 25 triệu Đơn vị Tenderly mỗi tháng
    - Truy cập miễn phí vào dữ liệu lịch sử
    - Nhanh hơn đến 8 lần cho các tác vụ đọc nặng!
    - Truy cập đọc nhất quán 100%
    - Điểm truy cập JSON-RPC
    - Trình xây dựng yêu cầu RPC dựa trên giao diện và xem trước yêu cầu
    - Kết hợp chặt chẽ với các công cụ phát triển, gỡ lỗi và kiểm thử của Tenderly
    - Giả lập giao dịch
    - Phân tích và lọc dữ liệu sử dụng
    - Quản lý khoá truy cập dễ dàng
    - Hỗ trợ kỹ thuật tận tình qua chat, email và Discord

- [**Tokenview**](https://services.tokenview.io/)
  - [Tài liệu](https://services.tokenview.io/docs?type=nodeService)
  - Tính năng
    - Hỗ trợ kỹ thuật 24/7 & cộng đồng nhà phát triển trên Telegram
    - Hỗ trợ đa chuỗi (Bitcoin, Ethereum, Tron, BNB Smart Chain, Ethereum Classic)
    - Cả hai điểm truy cập RPC và WSS đều mở để sử dụng
    - Truy cập không giới hạn vào dữ liệu lưu trữ API
    - Bảng điều khiển với Trình khám phá yêu cầu và Bộ theo dõi Mempool
    - API dữ liệu NFT và thông báo Webhook
    - Thanh toán bằng tiền điện tử
    - Hỗ trợ ngoài cho các yêu cầu hành vi bổ sung

- [**Watchdata**](https://watchdata.io/)
  - [Tài liệu](https://docs.watchdata.io/)
  - Tính năng
    - Độ tin cậy của dữ liệu
    - Kết nối liên tục mà không bị gián đoạn
    - Tự động hoá quy trình
    - Miễn thuế
    - Giới hạn cao phù hợp với mọi người dùng
    - Hỗ trợ cho các nút khác nhau
    - Mở rộng quy mô tài nguyên
    - Tốc độ xử lý cao

- [**ZMOK**](https://zmok.io/)
  - [Tài liệu](https://docs.zmok.io/)
  - Tính năng
    - Dịch vụ Front-running
    - Giao dịch mempool toàn cầu với phương pháp lọc,tìm kiếm
    - Phí TX không giới hạn và Gas vô tận để gửi giao dịch
    - Việc thu thập nhanh chóng khối mới và đọc chuỗi khối.
    - Cam kết mức giá tốt nhất cho mỗi lượt gọi API

- [**Zeeve**](https://www.zeeve.io/)
  - [Tài liệu](https://www.zeeve.io/docs/)
  - Tính năng
    - Nền tảng tự động hóa không mã cấp doanh nghiệp cung cấp việc triển khai, giám sát và quản lý các nút và mạng Blockchain.
    - Hơn 30 Giao thức & Tích hợp được hỗ trợ, và đang tiếp tục được bổ sung
    - Các dịch vụ hạ tầng web3 gia tăng giá trị như lưu trữ phi tập trung, danh tính phi tập trung và các API dữ liệu Blockchain Ledger cho các trường hợp sử dụng trong thế giới thực.
    - Hỗ trợ 24/7 và theo dõi chủ động giúp đảm bảo sức khỏe của các nút mọi lúc.
    - Các điểm cuối RPC cung cấp quyền truy cập đã xác thực vào các API, quản lý dễ dàng với bảng điều khiển và phân tích trực quan.
    - Cung cấp cả tùy chọn đám mây quản lý và đám mây tự chọn, cho bạn nhiều sự lựa chọn và hỗ trợ tất cả các nhà cung cấp đám mây lớn như AWS, Azure, Google Cloud, Digital Ocean và cả trên cơ sở.
    - Chúng tôi sử dụng định tuyến thông minh để luôn kết nối với nút gần nhất với người dùng của bạn.

## Đọc thêm {#further-reading}

- [Danh sách các dịch vụ nút Ethereum](https://ethereumnodes.com/)

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Bắt đầu phát triển Ethereum bằng Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Hướng dẫn gửi giao dịch bằng web3 và Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
