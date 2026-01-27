---
title: Nodes và máy khách
description: Tổng quan về các nút Ethereum và phần mềm client, cộng thêm cách thiết lập một nút và tại sao bạn nên làm điều đó.
lang: vi
sidebarDepth: 2
---

Ethereum là một mạng lưới phân tán gồm các máy tính (gọi là nút) chạy phần mềm có khả năng xác minh các khối và dữ liệu giao dịch. Phần mềm phải được chạy trên máy tính của bạn để biến nó thành một nút Ethereum. Có hai phần mềm riêng biệt (được gọi là 'clients') cần thiết để hình thành một nút.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm về mạng ngang hàng và [những điều cơ bản về EVM](/developers/docs/evm/) trước khi tìm hiểu sâu hơn và chạy phiên bản máy khách Ethereum của riêng bạn. Hãy xem [phần giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

Nếu bạn mới tìm hiểu về chủ đề nút, chúng tôi khuyên bạn nên xem qua phần giới thiệu thân thiện với người dùng của chúng tôi về [việc chạy một nút Ethereum](/run-a-node).

## Node và clients là gì? {#what-are-nodes-and-clients}

Một "Node" là bất kỳ phiên bản nào của phần mềm client Ethereum được kết nối với các máy tính khác cũng chạy phần mềm Ethereum, tạo thành một mạng. Một client (cơ chế)  là một phiên bản của Ethereum xác thực dữ liệu theo quy tắc của giao thức và giữ cho mạng an toàn. Một nút cần chạy hai cơ chế : một cơ chế đồng thuận và một cơ chế thực thi.

- Cơ chế thực thi (còn được gọi là động cơ thực thi, cơ chế EL hoặc trước đây là cơ chế Eth1) lắng nghe các giao dịch mới được phát sóng trong mạng, thực thi chúng trong EVM và giữ trạng thái và cơ sở dữ liệu mới nhất của tất cả dữ liệu Ethereum hiện tại.
- Cơ chế đồng thuận (còn được gọi là Beacon Node, cơ chế CL hoặc trước đây là cơ chế Eth2) sử dụng thuật toán đồng thuận proof-of-stake, giúp mạng lưới đạt được sự đồng thuận dựa trên dữ liệu đã được xác thực từ cơ chế thực thi. Còn có một phần mềm thứ ba, gọi là 'validator', có thể được thêm vào cơ chế đồng thuận, giúp một nút tham gia vào việc bảo mật mạng lưới.

Những cơ chế này làm việc cùng nhau để theo dõi đầu của chuỗi Ethereum và cho phép người dùng tương tác với mạng Ethereum. Thiết kế mô-đun với nhiều phần mềm hoạt động cùng nhau được gọi là [sự phức tạp được đóng gói](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Cách tiếp cận này giúp việc thực hiện [The Merge](/roadmap/merge) liền mạch hơn, giúp phần mềm máy khách dễ bảo trì và phát triển hơn, đồng thời cho phép tái sử dụng các máy khách riêng lẻ, ví dụ, trong [hệ sinh thái lớp 2](/layer-2/).

![Máy khách thực thi và máy khách đồng thuận được ghép nối](./eth1eth2client.png)
Sơ đồ đơn giản hóa về một máy khách thực thi và máy khách đồng thuận được ghép nối.

### Sự đa dạng của ứng dụng khách {#client-diversity}

Cả [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và [máy khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) đều tồn tại ở nhiều ngôn ngữ lập trình khác nhau do các nhóm khác nhau phát triển.

Việc có nhiều cơ chế triển khai có thể làm cho mạng mạnh hơn bằng cách giảm sự phụ thuộc vào một mã nguồn duy nhất. Mục tiêu lý tưởng là đạt được sự đa dạng mà không có cơ chế nào chiếm ưu thế trong mạng lưới, từ đó loại bỏ một điểm yếu tiềm ẩn duy nhất.
Sự đa dạng về ngôn ngữ cũng thu hút một cộng đồng lập trình viên rộng lớn hơn và cho phép họ tạo ra các ngôn ngữ tích hợp mà họ thích.

Tìm hiểu thêm về [sự đa dạng của máy khách](/developers/docs/nodes-and-clients/client-diversity/).

Những triển khai này có điểm chung là chúng đều tuân theo một quy định duy nhất. Thông số kỹ thuật quyết định cách mà mạng lưới và blockchain Ethereum hoạt động. Mọi chi tiết kỹ thuật đều được định nghĩa và các thông số có thể được tìm thấy như sau:

- Ban đầu, [Sách Vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Thông số kỹ thuật thực thi](https://github.com/ethereum/execution-specs/)
- [Thông số kỹ thuật đồng thuận](https://github.com/ethereum/consensus-specs)
- [Các EIP](https://eips.ethereum.org/) được triển khai trong các [bản nâng cấp mạng](/ethereum-forks/) khác nhau

### Theo dõi các nút trong mạng {#network-overview}

Nhiều trình theo dõi cung cấp cái nhìn tổng quát theo thời gian thực về các nút trong mạng lưới Ethereum. Lưu ý rằng do tính chất của các mạng phi tập trung, những trình thu thập thông tin này chỉ có thể cung cấp một cái nhìn hạn chế về mạng và có thể đưa ra những kết quả khác nhau.

- [Bản đồ các nút](https://etherscan.io/nodetracker) của Etherscan
- [Ethernodes](https://ethernodes.org/) của Bitfly
- [Nodewatch](https://www.nodewatch.io/) của Chainsafe, thu thập dữ liệu các nút đồng thuận
- [Monitoreth](https://monitoreth.io/) - của MigaLabs, một công cụ giám sát mạng phi tập trung
- [Báo cáo tình trạng mạng hàng tuần](https://probelab.io) - của ProbeLab, sử dụng [Nebula crawler](https://github.com/dennis-tra/nebula) và các công cụ khác

## Các loại nút {#node-types}

Nếu bạn muốn [chạy nút của riêng mình](/developers/docs/nodes-and-clients/run-a-node/), bạn nên hiểu rằng có các loại nút khác nhau tiêu thụ dữ liệu theo những cách khác nhau. In fact, clients can run three different types of nodes: light, full and archive. Trên thực tế, ứng dụng có thể chạy ba loại nút khác nhau: nút nhẹ, nút đầy đủ và nút lưu trữ. Đồng bộ hóa có nghĩa là nó có thể lấy thông tin mới nhất về trạng thái của Ethereum nhanh như thế nào.

### Nút đầy đủ {#full-node}

Các nút đầy đủ sẽ xác thực từng khối một của blockchain, bao gồm việc tải về và kiểm tra nội dung khối và dữ liệu trạng thái cho mỗi khối. Có nhiều loại nút đầy đủ khác nhau - một số bắt đầu từ khối genesis và xác minh từng khối trong toàn bộ lịch sử của blockchain. Các nút khác bắt đầu xác minh tại một khối gần đây hơn mà chúng tin là hợp lệ (ví dụ: 'đồng bộ hóa snap' của Geth). Bất kể bắt đầu xác thực ở đâu, các nút đầy đủ chỉ giữ một bản sao cục bộ của dữ liệu tương đối mới (thường là 128 khối mới nhất), cho phép xóa dữ liệu cũ để tiết kiệm không gian ổ đĩa. Dữ liệu cũ có thể được tạo lại khi cần.

- Lưu trữ toàn bộ dữ liệu blockchain (mặc dù điều này sẽ được làm sạch định kỳ nên nút đầy đủ không lưu trữ tất cả dữ liệu trạng thái từ lúc khởi đầu).
- Tham gia vào quá trình xác thực khối, xác minh tất cả các khối và trạng thái.
- Tất cả các trạng thái có thể được truy xuất từ bộ nhớ cục bộ hoặc được tái tạo từ 'ảnh chụp' bởi một nút đầy đủ.
- Đáp ứng mạng lưới và cung cấp dữ liệu theo yêu cầu.

### Nút lưu trữ {#archive-node}

Các nút lưu trữ là những nút đầy đủ, chúng xác minh mọi khối từ lúc bắt đầu và không bao giờ xóa bất kỳ dữ liệu nào đã tải xuống.

- Lưu trữ mọi thứ được giữ trong nút đầy đủ và xây dựng một kho lưu trữ các lịch sử trạng thái. Nó cần thiết nếu bạn muốn kiểm tra một cái gì đó như số dư tài khoản ở khối #4,000,000, hoặc chỉ đơn giản và đáng tin cậy để kiểm tra bộ giao dịch của bạn mà không cần xác minh chúng bằng cách theo dõi.
- Dữ liệu này thể hiện đơn vị terabyte, điều này khiến các nút lưu trữ trở nên không hấp dẫn với người dùng bình thường nhưng có thể hữu ích cho các dịch vụ như trình khám phá khối, nhà cung cấp ví và phân tích chuỗi.

Việc đồng bộ ứng dụng ở chế độ khác ngoài lưu trữ sẽ dẫn đến dữ liệu blockchain bị cắt giảm. Điều này có nghĩa là không có kho lưu trữ tất cả các lịch sử trạng thái nhưng nút đầy đủ có thể xây dựng chúng theo yêu cầu.

Tìm hiểu thêm về [các nút lưu trữ](/developers/docs/nodes-and-clients/archive-nodes).

### Nút nhẹ {#light-node}

Thay vì tải xuống từng khối, các nút nhẹ chỉ tải xuống tiêu đề của các khối. Những tiêu đề này chứa thông tin tóm tắt về nội dung của các khối. Bất kỳ thông tin nào khác mà nút nhẹ yêu cầu sẽ được yêu cầu từ một nút đầy đủ. Nút nhẹ sau đó có thể độc lập xác minh dữ liệu mà họ nhận được với các gốc trạng thái trong đầu khối. Cụm nút nhẹ cho phép người dùng tham gia vào mạng Ethereum mà không cần phần cứng mạnh mẽ hoặc băng thông cao cần thiết để chạy các nút hoàn chỉnh. Cuối cùng, các nút nhẹ có thể chạy trên điện thoại di động hoặc các thiết bị nhúng. Các nút nhẹ không tham gia vào sự đồng thuận (tức là chúng không thể là trình xác thực), nhưng chúng có thể truy cập chuỗi khối Ethereum với cùng chức năng và đảm bảo bảo mật như một nút đầy đủ.

Các ứng dụng nhẹ là một lĩnh vực đang được phát triển tích cực cho Ethereum và chúng tôi mong đợi sẽ thấy các ứng dụng nhẹ mới cho lớp đồng thuận và lớp thực thi trong thời gian tới.
Cũng có những tuyến tiềm năng để cung cấp dữ liệu máy khách nhẹ qua [mạng gossip](https://www.ethportal.net/). Điều này có lợi vì mạng lưới tin đồn có thể hỗ trợ một mạng lưới các nút nhẹ mà không cần yêu cầu các nút đầy đủ phục vụ các yêu cầu.

Ethereum chưa hỗ trợ một số lượng lớn các nút nhẹ, nhưng hỗ trợ nút nhẹ là một lĩnh vực dự kiến sẽ phát triển nhanh chóng trong tương lai gần. Cụ thể, các máy khách như [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) và [LodeStar](https://lodestar.chainsafe.io/) hiện đang tập trung nhiều vào các nút nhẹ.

## Tại sao tôi nên vận hành một nút Ethereum? {#why-should-i-run-an-ethereum-node}

Chạy một nút cho phép bạn sử dụng Ethereum trực tiếp, không cần tin tưởng và riêng tư, đồng thời hỗ trợ mạng lưới bằng cách giúp nó mạnh mẽ và phi tập trung hơn.

### Lợi ích cho bạn {#benefits-to-you}

Việc chạy nút riêng của bạn cho phép bạn sử dụng Ethereum một cách riêng tư, tự cung cấp và không cần tin tưởng. Bạn không cần phải tin tưởng vào mạng vì bạn có thể tự xác minh dữ liệu với ứng dụng của mình. "Đừng tin tưởng, hãy xác minh" là một phương châm phổ biến trong blockchain.

- Nút của bạn xác minh tất cả các giao dịch và khối theo quy tắc đồng thuận một cách độc lập. Điều này có nghĩa là bạn không cần phải dựa vào bất kỳ nút nào khác trong mạng hoặc hoàn toàn tin tưởng chúng.
- Bạn có thể sử dụng ví Ethereum với nút riêng của mình. Bạn có thể sử dụng dapps một cách an toàn và riêng tư hơn vì bạn sẽ không phải làm lộ địa chỉ và số dư của mình cho các bên trung gian. Mọi thứ có thể được kiểm tra với ứng dụng của bạn. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) và [nhiều loại ví khác](/wallets/find-wallet/) cung cấp tính năng nhập RPC, cho phép chúng sử dụng nút của bạn.
- Bạn có thể chạy và tự lưu trữ các dịch vụ khác mà phụ thuộc vào dữ liệu từ Ethereum. Chẳng hạn, điều này có thể là một trình xác thực Beacon Chain, phần mềm giống như layer 2, hạ tầng, công cụ khám phá khối, bộ xử lý thanh toán, v.v.
- Bạn có thể cung cấp các [điểm cuối RPC](/developers/docs/apis/json-rpc/) tùy chỉnh của riêng mình. Bạn thậm chí có thể cung cấp các điểm kết nối này công khai cho cộng đồng để giúp họ tránh xa những nhà cung cấp trung tâm lớn.
- Bạn có thể kết nối với nút của mình bằng **Giao tiếp giữa các tiến trình (IPC)** hoặc viết lại nút để tải chương trình của bạn dưới dạng một plugin. Điều này cho phép độ trễ thấp, rất hữu ích, ví dụ: khi xử lý nhiều dữ liệu bằng các thư viện web3 hoặc khi bạn cần thay thế các giao dịch của mình nhanh nhất có thể (tức là giao dịch đi trước).
- Bạn có thể trực tiếp staking ETH để bảo vệ mạng lưới và nhận thưởng. Xem [đặt cược solo](/staking/solo/) để bắt đầu.

![Cách bạn truy cập Ethereum qua ứng dụng và các nút của bạn](./nodes.png)

### Lợi ích cho mạng {#network-benefits}

Một tập hợp đa dạng các nút là rất quan trọng cho sức khỏe, an ninh và khả năng hoạt động bền vững của Ethereum.

- Các nút hoàn chỉnh thực thi các quy tắc đồng thuận nên họ không thể bị đánh lừa để chấp nhận các khối không tuân theo. Điều này cung cấp thêm bảo mật cho mạng vì nếu tất cả các nút đều là nút nhẹ, không thực hiện xác minh đầy đủ, thì các xác thực viên có thể tấn công mạng.
- Trong trường hợp một cuộc tấn công vượt qua các hàng rào phòng thủ kinh tế-mã hóa của [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos/#what-is-pos), một cuộc khôi phục xã hội có thể được thực hiện bởi các nút đầy đủ chọn theo chuỗi trung thực.
- Nhiều nút trong mạng sẽ tạo ra một mạng lưới đa dạng và mạnh mẽ hơn, đó là mục tiêu cuối cùng của việc phi tập trung, giúp tạo ra một hệ thống đáng tin cậy và không bị kiểm duyệt.
- Các nút hoàn thiện cung cấp quyền truy cập vào dữ liệu blockchain cho các client nhẹ phụ thuộc vào nó. Các nút nhẹ không lưu trữ toàn bộ chuỗi khối, thay vào đó chúng xác minh dữ liệu thông qua [các gốc trạng thái trong phần đầu khối](/developers/docs/blocks/#block-anatomy). Họ có thể yêu cầu thêm thông tin từ các hoàn thiện nếu họ cần.

Nếu bạn vận hành một nút hoàn thiện, toàn bộ mạng Ethereum sẽ được hưởng lợi từ điều đó, ngay cả khi bạn không vận hành một trình xác nhận.

## Chạy nút của riêng bạn {#running-your-own-node}

Bạn có muốn chạy client Ethereum của riêng mình không?

Để có phần giới thiệu thân thiện với người mới bắt đầu, hãy truy cập trang [chạy một nút](/run-a-node) của chúng tôi để tìm hiểu thêm.

Nếu bạn là người dùng có kỹ thuật hơn, hãy tìm hiểu sâu hơn về các chi tiết và tùy chọn về cách [khởi chạy nút của riêng bạn](/developers/docs/nodes-and-clients/run-a-node/).

## Các lựa chọn thay thế {#alternatives}

Setting up your own node can cost you time and resources but you don’t always need to run your own instance. Trong trường hợp này, bạn có thể sử dụng một nhà cung cấp API bên thứ ba. Để có cái nhìn tổng quan về việc sử dụng các dịch vụ này, hãy xem [nút dưới dạng dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Nếu có ai đó chạy một nút Ethereum với API công cộng trong cộng đồng của bạn, bạn có thể điều chỉnh ví của mình tới một nút cộng đồng qua tùy biến RPC và có được sự riêng tư hơn so với việc sử dụng một bên thứ ba nào đó mà bạn tin tưởng.

Mặt khác, nếu bạn điều hành một khách hàng, bạn có thể chia sẻ nó với bạn bè của mình, những người có thể cần đến.

## Các ứng dụng thực thi {#execution-clients}

Cộng đồng Ethereum duy trì nhiều client thực thi mã nguồn mở (trước đây gọi là 'client Eth1' hoặc đơn giản là 'client Ethereum'), được phát triển bởi các đội ngũ khác nhau sử dụng các ngôn ngữ lập trình khác nhau. Điều này giúp mạng mạnh hơn và [đa dạng](/developers/docs/nodes-and-clients/client-diversity/) hơn. Mục tiêu lý tưởng là đạt được sự đa dạng mà không có khách hàng nào chiếm ưu thế để giảm thiểu bất kỳ điểm thất bại nào.

Bảng này tóm tắt các clients khác nhau. Tất cả chúng đều vượt qua các [bài kiểm tra máy khách](https://github.com/ethereum/tests) và được bảo trì tích cực để luôn cập nhật các bản nâng cấp mạng.

| Client                                                                                      | Ngôn ngữ                 | Hệ điều hành          | Mạng                      | Chiến lược đồng bộ                                                              | State pruning   |
| ------------------------------------------------------------------------------------------- | ------------------------ | --------------------- | ------------------------- | ------------------------------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                                          | Go                       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [Full](#full-sync)                                          | Archive, Pruned |
| [Nethermind](https://www.nethermind.io/)                                                    | C#, .NET | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync) (không phục vụ), Fast, [Full](#full-sync) | Archive, Pruned |
| [Besu](https://besu.hyperledger.org/en/stable/)                                             | Java                     | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Snap](#snap-sync), [Fast](#fast-sync), [Full](#full-sync)                      | Archive, Pruned |
| [Erigon](https://github.com/ledgerwatch/erigon)                                             | Go                       | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Full](#full-sync)                                                              | Archive, Pruned |
| [Reth](https://reth.rs/)                                                                    | Rust                     | Linux, Windows, macOS | Mainnet, Sepolia, Holesky | [Full](#full-sync)                                                              | Archive, Pruned |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript               | Linux, Windows, macOS | Sepolia, Holesky          | [Full](#full-sync)                                                              | Pruned          |

Để biết thêm về các mạng được hỗ trợ, hãy đọc về [các mạng Ethereum](/developers/docs/networks/).

Mỗi khách hàng có những trường hợp sử dụng và lợi thế riêng, vì vậy bạn nên chọn một cái dựa trên sở thích của chính mình. Sự đa dạng cho phép các ứng dụng tập trung vào các tính năng khác nhau và các đối tượng người dùng khác nhau. Bạn có thể muốn chọn một ứng dụng dựa trên các tính năng, hỗ trợ, ngôn ngữ lập trình hoặc giấy phép.

### Besu {#besu}

Hyperledger Besu là một ứng dụng Ethereum cấp doanh nghiệp dành cho các mạng công cộng và có quyền truy cập. Nó cung cấp tất cả các tính năng của Ethereum Mainnet, từ việc theo dõi đến GraphQL, có khả năng giám sát rộng rãi và được hỗ trợ bởi ConsenSys, cả trong các kênh cộng đồng mở và thông qua các thỏa thuận mức dịch vụ thương mại cho các doanh nghiệp. Bạn có thể muốn chọn một ứng dụng dựa trên các tính năng, hỗ trợ, ngôn ngữ lập trình hoặc giấy phép.

[Tài liệu](https://besu.hyperledger.org/en/stable/) mở rộng của Besu sẽ hướng dẫn bạn qua tất cả các chi tiết về các tính năng và thiết lập của nó.

### Erigon {#erigon}

Erigon, trước đây được biết đến với tên gọi Turbo-Geth, bắt đầu như một nhánh của Go Ethereum hướng tới hiệu suất tốc độ và tiết kiệm không gian ổ đĩa. Erigon là một triển khai hoàn toàn được thiết kế lại của Ethereum, hiện đang được viết bằng ngôn ngữ Go nhưng cũng có các triển khai bằng ngôn ngữ khác đang được phát triển. Mục tiêu của Erigon là cung cấp một triển khai Ethereum nhanh hơn, linh hoạt hơn và tối ưu hơn. Nó có thể thực hiện việc đồng bộ nút lưu trữ đầy đủ sử dụng khoảng 2TB dung lượng ổ đĩa, trong vòng chưa đầy 3 ngày.

### Go Ethereum {#geth}

Go Ethereum (viết tắt là Geth) là một trong những triển khai gốc của giao thức Ethereum. Hiện nay, đây là ứng dụng phổ biến nhất với số lượng người dùng lớn nhất và đa dạng công cụ dành cho người sử dụng và nhà phát triển. Nó được viết bằng ngôn ngữ Go, hoàn toàn mã nguồn mở và được cấp phép theo GNU LGPL v3.

Tìm hiểu thêm về Geth trong [tài liệu](https://geth.ethereum.org/docs/) của nó.

### Nethermind {#nethermind}

Nethermind là một triển khai của Ethereum được tạo ra với công nghệ C# .NET, được cấp phép với LGPL-3.0, hoạt động trên tất cả các nền tảng chính bao gồm ARM. Nó cung cấp hiệu suất tuyệt vời với:

- một máy ảo được tối ưu hóa
- Truy cập trạng thái
- mạng lưới và các tính năng phong phú như bảng điều khiển Prometheus/Grafana, hỗ trợ ghi nhật ký doanh nghiệp seq, theo dõi JSON-RPC và các plugin phân tích.

Nethermind cũng có [tài liệu chi tiết](https://docs.nethermind.io), hỗ trợ nhà phát triển mạnh mẽ, một cộng đồng trực tuyến và hỗ trợ 24/7 cho người dùng cao cấp.

### Reth {#reth}

Reth (viết tắt của Rust Ethereum) là một triển khai nút đầy đủ Ethereum, tập trung vào việc thân thiện với người dùng, có tính mô-đun cao, nhanh chóng và hiệu quả. Reth ban đầu được xây dựng và phát triển bởi Paradigm, và được cấp phép theo các giấy phép Apache và MIT.

Reth đã sẵn sàng cho sản xuất và phù hợp để sử dụng trong các môi trường quan trọng như staking hoặc dịch vụ yêu cầu thời gian hoạt động cao. Hoạt động tốt trong các trường hợp sử dụng mà yêu cầu hiệu suất cao với biên lợi nhuận lớn như RPC, MEV, lập chỉ mục, mô phỏng và các hoạt động P2P.

Tìm hiểu thêm bằng cách xem [Sách Reth](https://reth.rs/), hoặc [kho GitHub của Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Đang phát triển {#execution-in-development}

Những ứng dụng này vẫn đang ở giai đoạn phát triển sớm và chưa được khuyến nghị sử dụng trong sản xuất.

#### EthereumJS {#ethereumjs}

Khách hàng thực thi EthereumJS (EthereumJS) được viết bằng TypeScript và bao gồm một số gói, bao gồm các nguyên tố Ethereum cốt lõi được thể hiện qua các lớp Block, Transaction và Merkle-Patricia Trie, cũng như các thành phần cốt lõi của khách hàng bao gồm việc triển khai Máy ảo Ethereum (EVM), một lớp blockchain, và ngăn xếp mạng DevP2P.

Tìm hiểu thêm về nó bằng cách đọc [tài liệu](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) của nó

## Các ứng dụng đồng thuận {#consensus-clients}

Có nhiều máy khách đồng thuận (trước đây gọi là máy khách 'Eth2') để hỗ trợ các [nâng cấp đồng thuận](/roadmap/beacon-chain/). Chúng chịu trách nhiệm cho tất cả logic liên quan đến sự đồng thuận bao gồm thuật toán chọn phân nhánh, xử lý các chứng thực và quản lý phần thưởng cũng như hình phạt của [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos).

| Client                                                        | Ngôn ngữ   | Hệ điều hành          | Mạng                                                                |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Chuỗi Hải Đăng, Holesky, Pyrmont, Sepolia, và nhiều hơn nữa         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Chuỗi Hải Đăng, Holesky, Sepolia, và nhiều hơn nữa                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Chuỗi Hải Đăng, Holesky, Sepolia, và nhiều hơn nữa                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Chuỗi Hải Đăng, Gnosis, Holesky, Pyrmont, Sepolia, và nhiều hơn nữa |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Chuỗi Hải Đăng, Gnosis, Holesky, Sepolia, và nhiều hơn nữa          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Chuỗi Hải Đăng, Holesky, Sepolia, và nhiều hơn nữa                  |

### Lighthouse {#lighthouse}

Lighthouse là một bản triển khai hệ thống đồng thuận, được viết bằng ngôn ngữ Rust và phát hành theo giấy phép Apache-2.0. Lighthouse được duy trì bởi Sigma Prime và đã ổn định, sẵn sàng cho môi trường sản xuất kể từ khi Chuỗi Hải Đăng ra đời. Nhiều doanh nghiệp, nhóm Cổ phần và cá nhân đang tin dùng. Nó hướng tới mục tiêu bảo mật, hiệu năng cao và khả năng tương tác trong nhiều môi trường khác nhau, từ máy tính cá nhân đến các hệ thống triển khai tự động phức tạp.

Tài liệu có thể được tìm thấy trong [Sách Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar là một bản triển khai hệ thống đồng thuận đã sẵn sàng cho môi trường sản xuất, được viết bằng Typescript theo giấy phép LGPL-3.0. Nó được duy trì bởi Lưới Bảo vệ Hệ thống và là hệ thống đồng thuận mới nhất dành cho người đóng góp cổ phần cá nhân, nhà phát triển và nhà nghiên cứu. Lodestar bao gồm một nút ngọn hải đăng và một hệ thống xác thực, được vận hành bởi các triển khai giao thức Ethereum viết bằng JavaScript. Lodestar hướng đến việc cải thiện khả năng sử dụng của Ethereum thông qua hệ thống ánh sáng, mở rộng khả năng tiếp cận cho nhiều nhà phát triển hơn và tiếp tục đóng góp vào sự đa dạng của hệ sinh thái.

Thông tin thêm có thể được tìm thấy trên [trang web Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus là một bản triển khai của hệ thống đồng thuận được viết bằng ngôn ngữ Nim, phát hành theo giấy phép Apache-2.0. Đây là một hệ thống đã sẵn sàng cho môi trường sản xuất, hiện đang được sử dụng bởi những người gửi cổ phần độc lập và các hồ cổ phần. Nimbus được thiết kế với hiệu quả tài nguyên làm trọng tâm, cho phép chạy dễ dàng trên cả các thiết bị hạn chế tài nguyên lẫn hạ tầng doanh nghiệp, mà vẫn đảm bảo tính ổn định và hiệu suất phần thưởng. Dấu chân tài nguyên nhẹ hơn đồng nghĩa với việc hệ thống có biên độ an toàn lớn hơn khi mạng lưới rơi vào tình trạng căng thẳng hoặc quá tải.

Tìm hiểu thêm trong [tài liệu Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm là một hệ thống đồng thuận đầy đủ tính năng, mã nguồn mở, được viết bằng Go và phân phối theo giấy phép GPL-3.0. Prysm đi kèm với tùy chọn giao diện phần mềm web UI, đồng thời ưu tiên trải nghiệm người dùng, tài liệu hướng dẫn rõ ràng và khả năng tùy chỉnh cao, phù hợp cho cả người dùng tự gửi cổ phần tại nhà lẫn tổ chức cổ phần quy mô lớn.

Truy cập [tài liệu Prysm](https://prysm.offchainlabs.com/docs/) để tìm hiểu thêm.

### Teku {#teku}

Teku là một trong những hệ thống đồng thuận gốc từ thời Chuỗi Hải Đăng sự sáng thế, được phát triển ngay từ những ngày đầu của Ethereum Bằng chứng Cổ phần. Bên cạnh những mục tiêu quen thuộc (bảo mật, độ bền vững, tính ổn định, khả năng sử dụng và hiệu năng), Teku đặc biệt hướng đến việc tuân thủ đầy đủ mọi tiêu chuẩn của các hệ thống đồng thuận.

Teku cung cấp các tùy chọn triển khai hết sức linh hoạt. Nút Ngọn hải đăng và hệ thống xác thực có thể được chạy cùng nhau trong một tiến trình duy nhất, điều này vô cùng tiện lợi cho những người cổ phần cá nhân; hoặc chúng cũng có thể được chạy tách biệt để phục vụ các hoạt động cổ phần phức tạp hơn. Ngoài ra, Teku hoàn toàn có thể tương tác với [Web3Signer](https://github.com/ConsenSys/web3signer/) để bảo mật khóa ký và bảo vệ chống chém.

Teku được viết bằng Java và có giấy phép Apache 2,0. Teku được viết bằng Java và có giấy phép Apache 2.0. Tìm hiểu thêm trong [tài liệu Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine là một thực hiện khách đồng thuận, được viết bằng Rust theo giấy phép GPL-3.0. Nó được duy trì bởi Đội ngũ Cốt lõi Grandine và nhanh chóng, hiệu suất cao và nhẹ. Nó phù hợp với nhiều loại stakers khác nhau, từ những stakers đơn lẻ chạy trên các thiết bị tài nguyên thấp như Raspberry Pi đến tổ chức stakers lớn điều hành hàng chục nghìn trình xác thực.

Tài liệu có thể được tìm thấy trong [Sách Grandine](https://docs.grandine.io/)

## Các chế độ đồng bộ hóa {#sync-modes}

Để theo dõi và xác minh dữ liệu hiện tại trên mạng, khách hàng Ethereum cần đồng bộ với trạng thái mạng mới nhất. Điều này được thực hiện bằng cách tải dữ liệu từ các đồng nghiệp, xác minh tính toàn vẹn của chúng một cách an toàn bằng mật mã, và xây dựng một cơ sở dữ liệu blockchain cục bộ.

Chế độ đồng bộ hóa đại diện cho các phương pháp khác nhau trong quá trình này với nhiều thỏa hiệp khác nhau. Khách hàng cũng khác nhau trong việc triển khai các thuật toán đồng bộ. Luôn tham khảo tài liệu chính thức của khách hàng mà bạn đã chọn để biết thông tin chi tiết về cách triển khai.

### Các chế độ đồng bộ hóa của lớp thực thi {#execution-layer-sync-modes}

Lớp thực thi có thể hoạt động ở các chế độ khác nhau để phù hợp với các trường hợp sử dụng khác nhau, từ việc tái thực thi trạng thái toàn cầu của chuỗi khối đến việc chỉ đồng bộ với đỉnh của chuỗi từ một điểm kiểm tra đáng tin cậy.

#### Đồng bộ hóa đầy đủ {#full-sync}

Một đồng bộ hoàn chỉnh tải xuống tất cả các khối (bao gồm tiêu đề và nội dung khối) và tái tạo trạng thái của chuỗi khối theo từng bước bằng cách thực hiện từng khối từ khởi nguồn.

- Giảm thiểu sự tin cậy và cung cấp mức độ an ninh cao nhất bằng cách xác minh từng giao dịch.
- Với số lượng giao dịch ngày càng tăng, quá trình xử lý tất cả các giao dịch có thể mất từ vài ngày đến vài tuần.

[Các nút lưu trữ](#archive-node) thực hiện đồng bộ hóa đầy đủ để xây dựng (và giữ lại) lịch sử hoàn chỉnh về các thay đổi trạng thái được thực hiện bởi mọi giao dịch trong mọi khối.

#### Đồng bộ hóa nhanh {#fast-sync}

Giống như việc đồng bộ hoàn chỉnh, việc đồng bộ nhanh tải xuống tất cả các khối (bao gồm tiêu đề, giao dịch và biên nhận). Tuy nhiên, thay vì xử lý lại các giao dịch lịch sử, một quá trình đồng bộ nhanh dựa vào các biên lai cho đến khi đạt đến đỉnh gần đây, khi đó nó chuyển sang nhập và xử lý các khối để cung cấp một nút hoàn chỉnh.

- Chiến lược đồng bộ nhanh.
- Giảm nhu cầu xử lý để ưu tiên sử dụng băng thông.

#### Đồng bộ hóa snap {#snap-sync}

Đồng bộ snap cũng xác minh chuỗi từng khối một. Tuy nhiên, thay vì bắt đầu từ khối genesis, một bản đồng bộ snap sẽ bắt đầu từ một điểm kiểm tra 'đáng tin' gần đây hơn, mà đã được biết là một phần của chuỗi khối thực. Nút lưu lại các điểm kiểm tra định kỳ trong khi xóa dữ liệu cũ hơn một khoảng thời gian nhất định. Các bức ảnh chụp này được sử dụng để tái tạo dữ liệu trạng thái khi cần thiết, thay vì lưu trữ nó mãi mãi.

- Chiến lược đồng bộ nhanh nhất, hiện đang là mặc định trên mạng chính Ethereum.
- Tiết kiệm rất nhiều dung lượng đĩa và băng thông mạng mà không hi sinh tính bảo mật.

[Thêm về đồng bộ hóa snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Đồng bộ hóa nhẹ {#light-sync}

Client nhẹ tải xuống tất cả các tiêu đề khối, dữ liệu khối và kiểm tra một số một cách ngẫu nhiên. Chỉ đồng bộ hóa đầu chuỗi từ điểm kiểm tra tin cậy.

- Chỉ nhận được trạng thái mới nhất trong khi dựa vào sự tin tưởng vào các nhà phát triển và cơ chế đồng thuận.
- Khách hàng sẵn sàng sử dụng với trạng thái mạng hiện tại trong vài phút.

**Lưu ý** Đồng bộ hóa nhẹ chưa hoạt động với Ethereum bằng chứng cổ phần - các phiên bản mới của đồng bộ hóa nhẹ sẽ sớm được phát hành!

[Thêm về các máy khách nhẹ](/developers/docs/nodes-and-clients/light-clients/)

### Các chế độ đồng bộ hóa của lớp đồng thuận {#consensus-layer-sync-modes}

#### Đồng bộ hóa lạc quan {#optimistic-sync}

Đồng bộ lạc quan là một chiến lược đồng bộ sau khi hợp nhất, được thiết kế theo dạng tùy chọn và tương thích ngược, cho phép các nút thực hiện đồng bộ thông qua những phương thức đã được thiết lập sẵn. Công cụ thực thi có thể nhập các khối beacon một cách _lạc quan_ mà không cần xác minh đầy đủ, tìm phần đầu mới nhất, sau đó bắt đầu đồng bộ hóa chuỗi bằng các phương pháp trên. Sau đó, khi client thực thi đã đồng bộ, nó sẽ thông báo cho client đồng thuận về tính hợp lệ của các giao dịch trong Beacon Chain.

[Thêm về đồng bộ hóa lạc quan](https://github.com/ethereum/consensus-specs/blob/dev/sync/optimistic.md)

#### Đồng bộ hóa điểm kiểm tra {#checkpoint-sync}

Một đồng bộ hóa checkpoint, còn được biết đến là đồng bộ hóa chủ yếu yếu, tạo ra trải nghiệm người dùng tốt hơn cho việc đồng bộ hóa một Nút Beacon. Nó dựa trên các giả định về [tính chủ quan yếu](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) cho phép đồng bộ hóa Chuỗi Hải Đăng từ một điểm kiểm tra tính chủ quan yếu gần đây thay vì từ khối khởi nguyên. Đồng bộ hóa điểm kiểm tra giúp thời gian đồng bộ hóa ban đầu nhanh hơn đáng kể với các giả định tin cậy tương tự như đồng bộ hóa từ [khối khởi nguyên](/glossary/#genesis-block).

Trên thực tế, điều này có nghĩa là nút của bạn kết nối với một dịch vụ từ xa để tải về các trạng thái đã hoàn tất gần đây và tiếp tục xác minh dữ liệu từ điểm đó. Bên thứ ba cung cấp dữ liệu được tin cậy và nên được lựa chọn một cách cẩn thận.

[Thêm về đồng bộ hóa điểm kiểm tra](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Đọc thêm {#further-reading}

- [Ethereum 101 - Phần 2 - Tìm hiểu về các nút](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, ngày 13 tháng 2 năm 2019_
- [Chạy các nút đầy đủ Ethereum: Hướng dẫn cho người có ít động lực](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, ngày 7 tháng 11 năm 2019_

## Các chủ đề liên quan {#related-topics}

- [Các khối](/developers/docs/blocks/)
- [Các mạng](/developers/docs/networks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Biến Raspberry Pi 4 của bạn thành một nút trình xác thực chỉ bằng cách flash thẻ MicroSD – Hướng dẫn cài đặt](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4 của bạn, cắm cáp ethernet, kết nối ổ SSD và bật nguồn thiết bị để biến Raspberry Pi 4 thành một nút Ethereum đầy đủ chạy lớp thực thi (Mainnet) và/hoặc lớp đồng thuận (Chuỗi Hải Đăng / trình xác thực)._
