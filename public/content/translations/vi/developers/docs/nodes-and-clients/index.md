---
title: "Các nút và máy khách"
description: "Tổng quan về các nút và phần mềm máy khách Ethereum, cùng với cách thiết lập một nút và lý do bạn nên làm điều đó."
lang: vi
sidebarDepth: 2
---

[Ethereum](/) là một mạng lưới phân tán gồm các máy tính (được gọi là các nút) chạy phần mềm có thể xác minh các khối và dữ liệu giao dịch. Phần mềm này phải được chạy trên máy tính của bạn để biến nó thành một nút Ethereum. Cần có hai phần mềm riêng biệt (được gọi là 'máy khách') để tạo thành một nút.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm về mạng lưới ngang hàng và [những điều cơ bản về EVM](/developers/docs/evm/) trước khi tìm hiểu sâu hơn và chạy phiên bản máy khách Ethereum của riêng bạn. Hãy xem qua [phần giới thiệu về Ethereum](/developers/docs/intro-to-ethereum/) của chúng tôi.

Nếu bạn mới làm quen với chủ đề về các nút, chúng tôi khuyên bạn trước tiên nên xem qua phần giới thiệu thân thiện với người dùng của chúng tôi về [việc chạy một nút Ethereum](/run-a-node).

## Các nút và máy khách là gì? {#what-are-nodes-and-clients}

Một "nút" là bất kỳ phiên bản phần mềm máy khách Ethereum nào được kết nối với các máy tính khác cũng đang chạy phần mềm Ethereum, tạo thành một mạng lưới. Máy khách là một bản triển khai của Ethereum giúp xác minh dữ liệu dựa trên các quy tắc Giao thức và giữ cho mạng lưới an toàn. Một nút phải chạy hai máy khách: một ứng dụng khách đồng thuận và một máy khách thực thi.

- Máy khách thực thi (còn được gọi là Execution Engine, máy khách EL hoặc trước đây là máy khách Eth1) lắng nghe các giao dịch mới được phát trên mạng lưới, thực thi chúng trong EVM và lưu giữ trạng thái mới nhất cũng như cơ sở dữ liệu của tất cả dữ liệu Ethereum hiện tại.
- Ứng dụng khách đồng thuận (còn được gọi là nút Beacon, máy khách CL hoặc trước đây là máy khách Eth2) triển khai thuật toán đồng thuận Bằng chứng cổ phần (PoS), cho phép mạng lưới đạt được sự đồng thuận dựa trên dữ liệu đã được xác thực từ máy khách thực thi. Ngoài ra còn có một phần mềm thứ ba, được gọi là 'trình xác thực' có thể được thêm vào ứng dụng khách đồng thuận, cho phép một nút tham gia vào việc bảo mật mạng lưới.

Các máy khách này hoạt động cùng nhau để theo dõi phần đầu của Chuỗi Ethereum và cho phép người dùng tương tác với mạng lưới Ethereum. Thiết kế mô-đun với nhiều phần mềm hoạt động cùng nhau được gọi là [sự phức tạp được đóng gói](https://vitalik.eth.limo/general/2022/02/28/complexity.html). Cách tiếp cận này giúp thực hiện [The Merge](/roadmap/merge) một cách liền mạch dễ dàng hơn, làm cho phần mềm máy khách dễ bảo trì và phát triển hơn, đồng thời cho phép tái sử dụng các máy khách riêng lẻ, ví dụ như trong [hệ sinh thái lớp 2 (l2)](/layer-2/).

![Coupled execution and consensus clients](./eth1eth2client.png)
Sơ đồ đơn giản hóa của một máy khách thực thi và ứng dụng khách đồng thuận được ghép nối.

### Sự đa dạng máy khách {#client-diversity}

Cả [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) đều tồn tại bằng nhiều ngôn ngữ lập trình khác nhau do các nhóm khác nhau phát triển.

Nhiều bản triển khai máy khách có thể làm cho mạng lưới mạnh mẽ hơn bằng cách giảm sự phụ thuộc vào một cơ sở mã duy nhất. Mục tiêu lý tưởng là đạt được sự đa dạng mà không có bất kỳ máy khách nào thống trị mạng lưới, từ đó loại bỏ một điểm lỗi tiềm ẩn duy nhất.
Sự đa dạng về ngôn ngữ cũng thu hút một cộng đồng nhà phát triển rộng lớn hơn và cho phép họ tạo ra các tích hợp bằng ngôn ngữ ưa thích của mình.

Tìm hiểu thêm về [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/).

Điểm chung của các bản triển khai này là tất cả đều tuân theo một đặc tả duy nhất. Các đặc tả quy định cách thức hoạt động của mạng lưới và Chuỗi khối Ethereum. Mọi chi tiết kỹ thuật đều được xác định và các đặc tả có thể được tìm thấy dưới dạng:

- Ban đầu là [sách vàng Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Đặc tả thực thi](https://github.com/ethereum/execution-specs/)
- [Đặc tả đồng thuận](https://github.com/ethereum/consensus-specs)
- Các [EIP](https://eips.ethereum.org/) được triển khai trong nhiều [bản nâng cấp mạng lưới](/ethereum-forks/) khác nhau

### Theo dõi các nút trong mạng lưới {#network-overview}

Nhiều trình theo dõi cung cấp cái nhìn tổng quan theo thời gian thực về các nút trong mạng lưới Ethereum. Lưu ý rằng do bản chất của các mạng lưới phi tập trung, các trình thu thập dữ liệu này chỉ có thể cung cấp một cái nhìn hạn chế về mạng lưới và có thể báo cáo các kết quả khác nhau.

- [Bản đồ các nút](https://etherscan.io/nodetracker) bởi Etherscan
- [Ethernodes](https://ethernodes.org/) bởi Bitfly
- [Nodewatch](https://www.nodewatch.io/) bởi Chainsafe, thu thập dữ liệu các nút đồng thuận
- [Monitoreth](https://monitoreth.io/) - bởi MigaLabs, Một công cụ giám sát mạng lưới phân tán
- [Báo cáo Sức khỏe Mạng lưới Hàng tuần](https://probelab.io) - bởi ProbeLab, Sử dụng [trình thu thập dữ liệu Nebula](https://github.com/dennis-tra/nebula) và các công cụ khác

## Các loại nút {#node-types}

Nếu bạn muốn [chạy nút của riêng mình](/developers/docs/nodes-and-clients/run-a-node/), bạn nên hiểu rằng có các loại nút khác nhau tiêu thụ dữ liệu theo những cách khác nhau. Trên thực tế, các máy khách có thể chạy ba loại nút khác nhau: node nhẹ, nút đầy đủ và nút lưu trữ. Cũng có các tùy chọn về các chiến lược đồng bộ hóa khác nhau cho phép thời gian đồng bộ hóa nhanh hơn. Đồng bộ hóa đề cập đến tốc độ nó có thể nhận được thông tin cập nhật nhất về trạng thái của Ethereum.

### Nút đầy đủ {#full-node}

Các nút đầy đủ thực hiện xác thực khối theo từng khối của Chuỗi khối, bao gồm việc tải xuống và xác minh phần thân khối và dữ liệu trạng thái cho mỗi khối. Có các lớp nút đầy đủ khác nhau - một số bắt đầu từ khối nguyên thủy và xác minh từng khối một trong toàn bộ lịch sử của Chuỗi khối. Những nút khác bắt đầu quá trình xác minh của chúng ở một khối gần đây hơn mà chúng tin là hợp lệ (ví dụ: 'snap sync' của Geth). Bất kể quá trình xác minh bắt đầu từ đâu, các nút đầy đủ chỉ giữ một bản sao cục bộ của dữ liệu tương đối gần đây (thường là 128 khối gần nhất), cho phép xóa dữ liệu cũ hơn để tiết kiệm dung lượng ổ đĩa. Dữ liệu cũ hơn có thể được tạo lại khi cần thiết.

- Lưu trữ toàn bộ dữ liệu Chuỗi khối (mặc dù dữ liệu này được cắt tỉa định kỳ để một nút đầy đủ không lưu trữ tất cả dữ liệu trạng thái trở lại khối nguyên thủy)
- Tham gia vào việc xác thực khối, xác minh tất cả các khối và trạng thái.
- Tất cả các trạng thái có thể được truy xuất từ bộ nhớ cục bộ hoặc được tạo lại từ các 'ảnh chụp nhanh' bởi một nút đầy đủ.
- Phục vụ mạng lưới và cung cấp dữ liệu theo yêu cầu.

### Nút lưu trữ {#archive-node}

Các nút lưu trữ là các nút đầy đủ xác minh mọi khối từ khối nguyên thủy và không bao giờ xóa bất kỳ dữ liệu nào đã tải xuống.

- Lưu trữ mọi thứ được giữ trong nút đầy đủ và xây dựng một kho lưu trữ các trạng thái lịch sử. Điều này là cần thiết nếu bạn muốn truy vấn một thứ gì đó như số dư Tài khoản ở khối #4.000.000, hoặc đơn giản và đáng tin cậy là kiểm tra tập hợp các giao dịch của riêng bạn mà không cần xác thực chúng bằng cách sử dụng tính năng theo dõi.
- Dữ liệu này lên tới hàng terabyte, điều này làm cho các nút lưu trữ kém hấp dẫn hơn đối với người dùng trung bình nhưng có thể hữu ích cho các dịch vụ như trình khám phá khối, nhà cung cấp Ví và phân tích Chuỗi.

Việc đồng bộ hóa các máy khách ở bất kỳ chế độ nào khác ngoài chế độ lưu trữ sẽ dẫn đến dữ liệu Chuỗi khối bị cắt tỉa. Điều này có nghĩa là không có kho lưu trữ của tất cả các trạng thái lịch sử nhưng nút đầy đủ có thể xây dựng chúng theo yêu cầu.

Tìm hiểu thêm về [Các nút lưu trữ](/developers/docs/nodes-and-clients/archive-nodes).

### Node nhẹ {#light-node}

Thay vì tải xuống mọi khối, các node nhẹ chỉ tải xuống các tiêu đề khối. Các tiêu đề này chứa thông tin tóm tắt về nội dung của các khối. Bất kỳ thông tin nào khác mà node nhẹ yêu cầu đều được yêu cầu từ một nút đầy đủ. Sau đó, node nhẹ có thể xác minh độc lập dữ liệu mà chúng nhận được dựa trên các gốc trạng thái trong các tiêu đề khối. Các node nhẹ cho phép người dùng tham gia vào mạng lưới Ethereum mà không cần phần cứng mạnh mẽ hoặc băng thông cao cần thiết để chạy các nút đầy đủ. Cuối cùng, các node nhẹ có thể chạy trên điện thoại di động hoặc các thiết bị nhúng. Các node nhẹ không tham gia vào sự đồng thuận (tức là chúng không thể là các trình xác thực), nhưng chúng có thể truy cập Chuỗi khối Ethereum với cùng chức năng và đảm bảo bảo mật như một nút đầy đủ.

Các máy khách nhẹ là một lĩnh vực đang được phát triển tích cực cho Ethereum và chúng tôi hy vọng sẽ sớm thấy các máy khách nhẹ mới cho lớp đồng thuận và lớp thực thi.
Cũng có những lộ trình tiềm năng để cung cấp dữ liệu máy khách nhẹ qua [mạng lưới gossip](https://www.ethportal.net/). Điều này rất có lợi vì mạng lưới gossip có thể hỗ trợ một mạng lưới các node nhẹ mà không yêu cầu các nút đầy đủ phục vụ các yêu cầu.

Ethereum chưa hỗ trợ một số lượng lớn các node nhẹ, nhưng hỗ trợ node nhẹ là một lĩnh vực dự kiến sẽ phát triển nhanh chóng trong tương lai gần. Đặc biệt, các máy khách như [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios) và [Lodestar](https://lodestar.chainsafe.io/) hiện đang tập trung mạnh vào các node nhẹ.

## Tại sao tôi nên chạy một nút Ethereum? {#why-should-i-run-an-ethereum-node}

Việc chạy một nút cho phép bạn sử dụng Ethereum một cách trực tiếp, không cần tin cậy và riêng tư trong khi hỗ trợ mạng lưới bằng cách giữ cho nó mạnh mẽ và phi tập trung hơn.

### Lợi ích cho bạn {#benefits-to-you}

Việc chạy nút của riêng bạn cho phép bạn sử dụng Ethereum một cách riêng tư, tự túc và không cần tin cậy. Bạn không cần phải tin tưởng mạng lưới vì bạn có thể tự mình xác minh dữ liệu bằng máy khách của mình. "Đừng tin tưởng, hãy xác minh" là một câu thần chú phổ biến trong Chuỗi khối.

- Nút của bạn tự xác minh tất cả các giao dịch và khối dựa trên các quy tắc đồng thuận. Điều này có nghĩa là bạn không phải dựa vào bất kỳ nút nào khác trong mạng lưới hoặc hoàn toàn tin tưởng chúng.
- Bạn có thể sử dụng một Ví Ethereum với nút của riêng bạn. Bạn có thể sử dụng các ứng dụng phi tập trung (dapp) một cách an toàn và riêng tư hơn vì bạn sẽ không phải rò rỉ địa chỉ và số dư của mình cho các bên trung gian. Mọi thứ đều có thể được kiểm tra bằng máy khách của riêng bạn. [MetaMask](https://metamask.io), [Frame](https://frame.sh/) và [nhiều Ví khác](/wallets/find-wallet/) cung cấp tính năng nhập RPC, cho phép chúng sử dụng nút của bạn.
- Bạn có thể chạy và tự lưu trữ các dịch vụ khác phụ thuộc vào dữ liệu từ Ethereum. Ví dụ: đây có thể là một trình xác thực Chuỗi Beacon, phần mềm như lớp 2 (l2), cơ sở hạ tầng, trình khám phá khối, bộ xử lý thanh toán, v.v.
- Bạn có thể cung cấp các [điểm cuối RPC](/developers/docs/apis/json-rpc/) tùy chỉnh của riêng mình. Bạn thậm chí có thể cung cấp các điểm cuối này một cách công khai cho cộng đồng để giúp họ tránh các nhà cung cấp tập trung lớn.
- Bạn có thể kết nối với nút của mình bằng cách sử dụng **Giao tiếp liên tiến trình (IPC)** hoặc viết lại nút để tải chương trình của bạn dưới dạng một plugin. Điều này mang lại độ trễ thấp, giúp ích rất nhiều, ví dụ: khi xử lý nhiều dữ liệu bằng các thư viện Web3 hoặc khi bạn cần thay thế các giao dịch của mình càng nhanh càng tốt (tức là chạy trước - frontrunning).
- Bạn có thể trực tiếp đặt cọc ETH để bảo mật mạng lưới và kiếm phần thưởng. Xem [đặt cọc độc lập](/staking/solo/) để bắt đầu.

![How you access Ethereum via your application and nodes](./nodes.png)

### Lợi ích mạng lưới {#network-benefits}

Một tập hợp đa dạng các nút rất quan trọng đối với sức khỏe, bảo mật và khả năng phục hồi hoạt động của Ethereum.

- Các nút đầy đủ thực thi các quy tắc đồng thuận để chúng không thể bị lừa chấp nhận các khối không tuân theo các quy tắc đó. Điều này cung cấp thêm bảo mật trong mạng lưới vì nếu tất cả các nút đều là các node nhẹ, vốn không thực hiện xác minh đầy đủ, các trình xác thực có thể tấn công mạng lưới.
- Trong trường hợp xảy ra một cuộc tấn công vượt qua các hệ thống phòng thủ kinh tế tiền mã hóa của [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/#what-is-pos), một quá trình khôi phục xã hội có thể được thực hiện bởi các nút đầy đủ chọn đi theo Chuỗi trung thực.
- Nhiều nút hơn trong mạng lưới dẫn đến một mạng lưới đa dạng và mạnh mẽ hơn, mục tiêu cuối cùng của sự phi tập trung, cho phép một hệ thống chống kiểm duyệt và đáng tin cậy.
- Các nút đầy đủ cung cấp quyền truy cập vào dữ liệu Chuỗi khối cho các máy khách nhẹ phụ thuộc vào nó. Các node nhẹ không lưu trữ toàn bộ Chuỗi khối, thay vào đó chúng xác minh dữ liệu thông qua các [gốc trạng thái trong các tiêu đề khối](/developers/docs/blocks/#block-anatomy). Chúng có thể yêu cầu thêm thông tin từ các nút đầy đủ nếu cần.

Nếu bạn chạy một nút đầy đủ, toàn bộ mạng lưới Ethereum sẽ được hưởng lợi từ nó, ngay cả khi bạn không chạy một trình xác thực.

## Chạy nút của riêng bạn {#running-your-own-node}

Bạn quan tâm đến việc chạy máy khách Ethereum của riêng mình?

Để có phần giới thiệu thân thiện với người mới bắt đầu, hãy truy cập trang [chạy một nút](/run-a-node) của chúng tôi để tìm hiểu thêm.

Nếu bạn là một người dùng am hiểu kỹ thuật hơn, hãy đi sâu vào các chi tiết và tùy chọn về cách [khởi chạy nút của riêng bạn](/developers/docs/nodes-and-clients/run-a-node/).

## Các lựa chọn thay thế {#alternatives}

Việc thiết lập nút của riêng bạn có thể tiêu tốn thời gian và tài nguyên của bạn nhưng bạn không phải lúc nào cũng cần chạy phiên bản của riêng mình. Trong trường hợp này, bạn có thể sử dụng nhà cung cấp API của bên thứ ba. Để có cái nhìn tổng quan về việc sử dụng các dịch vụ này, hãy xem [các nút dưới dạng dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Nếu ai đó chạy một nút Ethereum với API công khai trong cộng đồng của bạn, bạn có thể trỏ các Ví của mình đến một nút cộng đồng thông qua RPC tùy chỉnh và có được nhiều quyền riêng tư hơn so với một bên thứ ba đáng tin cậy ngẫu nhiên nào đó.

Mặt khác, nếu bạn chạy một máy khách, bạn có thể chia sẻ nó với những người bạn có thể cần nó.

## Máy khách thực thi {#execution-clients}

Cộng đồng Ethereum duy trì nhiều máy khách thực thi mã nguồn mở (trước đây được gọi là 'máy khách Eth1', hoặc chỉ là 'máy khách Ethereum'), được phát triển bởi các nhóm khác nhau sử dụng các ngôn ngữ lập trình khác nhau. Điều này làm cho mạng lưới mạnh mẽ và [đa dạng](/developers/docs/nodes-and-clients/client-diversity/) hơn. Mục tiêu lý tưởng là đạt được sự đa dạng mà không có bất kỳ máy khách nào thống trị để giảm thiểu bất kỳ điểm lỗi duy nhất nào.

Bảng này tóm tắt các máy khách khác nhau. Tất cả chúng đều vượt qua [các bài kiểm tra máy khách](https://github.com/ethereum/tests) và được duy trì tích cực để luôn cập nhật với các bản nâng cấp mạng lưới.

| Máy khách                                                                   | Ngôn ngữ   | Hệ điều hành     | Mạng lưới                | Chiến lược đồng bộ hóa                                            | Cắt tỉa trạng thái   |
| ------------------------------------------------------------------------ | ---------- | --------------------- | ----------------------- | ---------------------------------------------------------- | --------------- |
| [Geth](https://geth.ethereum.org/)                                       | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Đầy đủ](#full-sync)                     | Lưu trữ, Đã cắt tỉa |
| [Nethermind](https://www.nethermind.io/)                                 | C#, .NET   | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), Nhanh, [Đầy đủ](#full-sync)               | Lưu trữ, Đã cắt tỉa |
| [Besu](https://besu.hyperledger.org/en/stable/)                          | Java       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Snap](#snap-sync), [Nhanh](#fast-sync), [Đầy đủ](#full-sync) | Lưu trữ, Đã cắt tỉa |
| [Erigon](https://github.com/ledgerwatch/erigon)                          | Go         | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Đầy đủ](#full-sync)                                         | Lưu trữ, Đã cắt tỉa |
| [Reth](https://reth.rs/)                                                 | Rust       | Linux, Windows, macOS | Mainnet, Sepolia, Hoodi | [Đầy đủ](#full-sync)                                         | Lưu trữ, Đã cắt tỉa |
| [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo) _(beta)_ | TypeScript | Linux, Windows, macOS | Sepolia, Hoodi          | [Đầy đủ](#full-sync)                                         | Đã cắt tỉa          |

Để biết thêm về các mạng lưới được hỗ trợ, hãy đọc về [các mạng lưới Ethereum](/developers/docs/networks/).

Mỗi máy khách có các trường hợp sử dụng và lợi thế riêng, vì vậy bạn nên chọn một máy khách dựa trên sở thích của riêng mình. Sự đa dạng cho phép các bản triển khai tập trung vào các tính năng và đối tượng người dùng khác nhau. Bạn có thể muốn chọn một máy khách dựa trên các tính năng, sự hỗ trợ, ngôn ngữ lập trình hoặc giấy phép.

### Besu {#besu}

Hyperledger Besu là một máy khách Ethereum cấp doanh nghiệp dành cho các mạng lưới công khai và có cấp phép. Nó chạy tất cả các tính năng của Mạng chính Ethereum, từ theo dõi đến GraphQL, có khả năng giám sát mở rộng và được hỗ trợ bởi ConsenSys, cả trong các kênh cộng đồng mở và thông qua các SLA thương mại dành cho doanh nghiệp. Nó được viết bằng Java và được cấp phép Apache-2.0.

[Tài liệu](https://besu.hyperledger.org/en/stable/) mở rộng của Besu sẽ hướng dẫn bạn qua tất cả các chi tiết về các tính năng và thiết lập của nó.

### Erigon {#erigon}

Erigon, trước đây được gọi là Turbo-Geth, bắt đầu như một bản Phân nhánh của Go Ethereum hướng tới tốc độ và hiệu quả không gian đĩa. Erigon là một bản triển khai được thiết kế lại hoàn toàn của Ethereum, hiện được viết bằng Go nhưng với các bản triển khai bằng các ngôn ngữ khác đang được phát triển. Mục tiêu của Erigon là cung cấp một bản triển khai Ethereum nhanh hơn, mô-đun hơn và tối ưu hóa hơn. Nó có thể thực hiện đồng bộ hóa nút lưu trữ đầy đủ bằng cách sử dụng khoảng 2TB dung lượng đĩa, trong vòng chưa đầy 3 ngày.

### Go Ethereum {#geth}

Go Ethereum (gọi tắt là Geth) là một trong những bản triển khai ban đầu của Giao thức Ethereum. Hiện tại, nó là máy khách phổ biến nhất với cơ sở người dùng lớn nhất và nhiều công cụ đa dạng cho người dùng và nhà phát triển. Nó được viết bằng Go, hoàn toàn mã nguồn mở và được cấp phép theo GNU LGPL v3.

Tìm hiểu thêm về Geth trong [tài liệu](https://geth.ethereum.org/docs) của nó.

### Nethermind {#nethermind}

Nethermind là một bản triển khai Ethereum được tạo bằng ngăn xếp công nghệ C# .NET, được cấp phép LGPL-3.0, chạy trên tất cả các nền tảng chính bao gồm cả ARM. Nó cung cấp hiệu suất tuyệt vời với:

- một máy ảo được tối ưu hóa
- quyền truy cập trạng thái
- mạng lưới và các tính năng phong phú như bảng điều khiển Prometheus/Grafana, hỗ trợ ghi nhật ký doanh nghiệp seq, theo dõi JSON-RPC và các plugin phân tích.

Nethermind cũng có [tài liệu chi tiết](https://docs.nethermind.io), hỗ trợ nhà phát triển mạnh mẽ, một cộng đồng trực tuyến và hỗ trợ 24/7 dành cho người dùng cao cấp.

### Reth {#reth}

Reth (viết tắt của Rust Ethereum) là một bản triển khai nút đầy đủ Ethereum tập trung vào tính thân thiện với người dùng, tính mô-đun cao, nhanh chóng và hiệu quả. Reth ban đầu được xây dựng và thúc đẩy bởi Paradigm, và được cấp phép theo giấy phép Apache-2.0 và MIT.

Reth đã sẵn sàng cho sản xuất và phù hợp để sử dụng trong các môi trường quan trọng như đặt cọc hoặc các dịch vụ có thời gian hoạt động cao. Hoạt động tốt trong các trường hợp sử dụng yêu cầu hiệu suất cao với biên độ lớn như RPC, MEV, lập chỉ mục, mô phỏng và các hoạt động P2P.

Tìm hiểu thêm bằng cách xem [Sách Reth](https://reth.rs/) hoặc [kho lưu trữ GitHub của Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file#reth).

### Đang phát triển {#execution-in-development}

Các máy khách này vẫn đang trong giai đoạn phát triển ban đầu và chưa được khuyến nghị sử dụng trong sản xuất.

#### EthereumJS {#ethereumjs}

Máy khách thực thi EthereumJS (EthereumJS) được viết bằng TypeScript và bao gồm một số gói, bao gồm các nguyên thủy Ethereum cốt lõi được đại diện bởi các lớp Khối, Giao dịch và Merkle-Patricia Trie cùng các thành phần máy khách cốt lõi bao gồm một bản triển khai của Máy ảo Ethereum (EVM), một lớp Chuỗi khối và ngăn xếp mạng lưới devp2p.

Tìm hiểu thêm về nó bằng cách đọc [tài liệu](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master) của nó

## Ứng dụng khách đồng thuận {#consensus-clients}

Có nhiều ứng dụng khách đồng thuận (trước đây được gọi là máy khách 'Eth2') để hỗ trợ [các bản nâng cấp đồng thuận](/roadmap/beacon-chain/). Chúng chịu trách nhiệm cho tất cả logic liên quan đến đồng thuận bao gồm thuật toán lựa chọn Phân nhánh, xử lý các chứng thực và quản lý phần thưởng cũng như hình phạt của [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos).

| Máy khách                                                        | Ngôn ngữ   | Hệ điều hành     | Mạng lưới                                                |
| ------------------------------------------------------------- | ---------- | --------------------- | ------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Chuỗi Beacon, Hoodi, Pyrmont, Sepolia và nhiều mạng lưới khác         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Chuỗi Beacon, Hoodi, Sepolia và nhiều mạng lưới khác                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Chuỗi Beacon, Hoodi, Sepolia và nhiều mạng lưới khác                  |
| [Prysm](https://prysm.offchainlabs.com/docs/)                 | Go         | Linux, Windows, macOS | Chuỗi Beacon, Gnosis, Hoodi, Pyrmont, Sepolia và nhiều mạng lưới khác |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Chuỗi Beacon, Gnosis, Hoodi, Sepolia và nhiều mạng lưới khác          |
| [Grandine](https://docs.grandine.io/)                         | Rust       | Linux, Windows, macOS | Chuỗi Beacon, Hoodi, Sepolia và nhiều mạng lưới khác                  |

### Lighthouse {#lighthouse}

Lighthouse là một bản triển khai ứng dụng khách đồng thuận được viết bằng Rust theo giấy phép Apache-2.0. Nó được duy trì bởi Sigma Prime và đã ổn định cũng như sẵn sàng cho sản xuất kể từ khối nguyên thủy của Chuỗi Beacon. Nó được tin cậy bởi nhiều doanh nghiệp, nhóm đặt cọc và cá nhân. Nó hướng tới mục tiêu bảo mật, hiệu suất cao và có khả năng tương tác trong nhiều môi trường khác nhau, từ máy tính để bàn đến các đợt triển khai tự động tinh vi.

Tài liệu có thể được tìm thấy trong [Sách Lighthouse](https://lighthouse-book.sigmaprime.io/)

### Lodestar {#lodestar}

Lodestar là một bản triển khai ứng dụng khách đồng thuận sẵn sàng cho sản xuất được viết bằng TypeScript theo giấy phép LGPL-3.0. Nó được duy trì bởi ChainSafe Systems và là ứng dụng khách đồng thuận mới nhất dành cho những người đặt cọc độc lập, nhà phát triển và nhà nghiên cứu. Lodestar bao gồm một nút Beacon và máy khách trình xác thực được cung cấp bởi các bản triển khai JavaScript của các Giao thức Ethereum. Lodestar nhằm mục đích cải thiện khả năng sử dụng Ethereum với các máy khách nhẹ, mở rộng khả năng tiếp cận cho một nhóm lớn hơn các nhà phát triển và đóng góp thêm vào sự đa dạng của hệ sinh thái.

Bạn có thể tìm thêm thông tin trên [trang web Lodestar](https://lodestar.chainsafe.io/)

### Nimbus {#nimbus}

Nimbus là một bản triển khai ứng dụng khách đồng thuận được viết bằng Nim theo giấy phép Apache-2.0. Nó là một máy khách sẵn sàng cho sản xuất được sử dụng bởi những người đặt cọc độc lập và các nhóm đặt cọc. Nimbus được thiết kế để mang lại hiệu quả tài nguyên, giúp dễ dàng chạy trên các thiết bị bị hạn chế tài nguyên và cơ sở hạ tầng doanh nghiệp một cách dễ dàng như nhau, mà không ảnh hưởng đến tính ổn định hoặc hiệu suất phần thưởng. Mức tiêu thụ tài nguyên nhẹ hơn có nghĩa là máy khách có biên độ an toàn lớn hơn khi mạng lưới chịu áp lực.

Tìm hiểu thêm trong [tài liệu Nimbus](https://nimbus.guide/)

### Prysm {#prysm}

Prysm là một ứng dụng khách đồng thuận mã nguồn mở, đầy đủ tính năng được viết bằng Go theo giấy phép GPL-3.0. Nó có giao diện người dùng ứng dụng web tùy chọn và ưu tiên trải nghiệm người dùng, tài liệu và khả năng cấu hình cho cả người dùng đặt cọc tại nhà và người dùng tổ chức.

Truy cập [tài liệu Prysm](https://prysm.offchainlabs.com/docs/) để tìm hiểu thêm.

### Teku {#teku}

Teku là một trong những máy khách nguyên thủy ban đầu của Chuỗi Beacon. Bên cạnh các mục tiêu thông thường (bảo mật, mạnh mẽ, ổn định, khả năng sử dụng, hiệu suất), Teku đặc biệt hướng tới việc tuân thủ đầy đủ tất cả các tiêu chuẩn ứng dụng khách đồng thuận khác nhau.

Teku cung cấp các tùy chọn triển khai rất linh hoạt. Nút Beacon và máy khách trình xác thực có thể được chạy cùng nhau như một tiến trình duy nhất, điều này cực kỳ thuận tiện cho những người đặt cọc độc lập, hoặc các nút có thể được chạy riêng biệt cho các hoạt động đặt cọc tinh vi. Ngoài ra, Teku hoàn toàn có khả năng tương tác với [Web3Signer](https://github.com/ConsenSys/web3signer/) để bảo mật khóa ký và bảo vệ khỏi phạt cắt giảm.

Teku được viết bằng Java và được cấp phép Apache-2.0. Nó được phát triển bởi nhóm Giao thức tại ConsenSys, nhóm cũng chịu trách nhiệm cho Besu và Web3Signer. Tìm hiểu thêm trong [tài liệu Teku](https://docs.teku.consensys.net/en/latest/).

### Grandine {#grandine}

Grandine là một bản triển khai ứng dụng khách đồng thuận, được viết bằng Rust theo giấy phép GPL-3.0. Nó được duy trì bởi Nhóm Cốt lõi Grandine và có tốc độ nhanh, hiệu suất cao và nhẹ. Nó phù hợp với nhiều đối tượng người đặt cọc, từ những người đặt cọc độc lập chạy trên các thiết bị có tài nguyên thấp như Raspberry Pi đến những người đặt cọc tổ chức lớn chạy hàng chục nghìn trình xác thực.

Tài liệu có thể được tìm thấy trong [Sách Grandine](https://docs.grandine.io/)

## Các chế độ đồng bộ hóa {#sync-modes}

Để theo dõi và xác minh dữ liệu hiện tại trong mạng lưới, máy khách Ethereum cần đồng bộ hóa với trạng thái mạng lưới mới nhất. Điều này được thực hiện bằng cách tải xuống dữ liệu từ các thiết bị ngang hàng, xác minh tính toàn vẹn của chúng bằng mật mã và xây dựng một cơ sở dữ liệu Chuỗi khối cục bộ.

Các chế độ đồng bộ hóa đại diện cho các cách tiếp cận khác nhau đối với quá trình này với nhiều sự đánh đổi khác nhau. Các máy khách cũng khác nhau trong việc triển khai các thuật toán đồng bộ hóa. Luôn tham khảo tài liệu chính thức của máy khách bạn đã chọn để biết chi tiết cụ thể về việc triển khai.

### Các chế độ đồng bộ hóa lớp thực thi {#execution-layer-sync-modes}

Lớp thực thi có thể được chạy ở các chế độ khác nhau để phù hợp với các trường hợp sử dụng khác nhau, từ việc thực thi lại trạng thái thế giới của Chuỗi khối cho đến việc chỉ đồng bộ hóa với phần đầu của Chuỗi từ một điểm kiểm tra đáng tin cậy.

#### Đồng bộ hóa đầy đủ {#full-sync}

Đồng bộ hóa đầy đủ tải xuống tất cả các khối (bao gồm tiêu đề và phần thân khối) và tạo lại trạng thái của Chuỗi khối một cách tăng dần bằng cách thực thi mọi khối từ khối nguyên thủy.

- Giảm thiểu sự tin cậy và cung cấp bảo mật cao nhất bằng cách xác minh mọi giao dịch.
- Với số lượng giao dịch ngày càng tăng, có thể mất từ vài ngày đến vài tuần để xử lý tất cả các giao dịch.

[Các nút lưu trữ](#archive-node) thực hiện đồng bộ hóa đầy đủ để xây dựng (và giữ lại) một lịch sử hoàn chỉnh về các thay đổi trạng thái được thực hiện bởi mọi giao dịch trong mọi khối.

#### Đồng bộ hóa nhanh {#fast-sync}

Giống như đồng bộ hóa đầy đủ, đồng bộ hóa nhanh tải xuống tất cả các khối (bao gồm tiêu đề, giao dịch và biên lai). Tuy nhiên, thay vì xử lý lại các giao dịch lịch sử, đồng bộ hóa nhanh dựa vào các biên lai cho đến khi nó đạt đến một phần đầu gần đây, khi đó nó chuyển sang nhập và xử lý các khối để cung cấp một nút đầy đủ.

- Chiến lược đồng bộ hóa nhanh.
- Giảm nhu cầu xử lý để ưu tiên sử dụng băng thông.

#### Đồng bộ hóa snap {#snap-sync}

Đồng bộ hóa snap cũng xác minh Chuỗi theo từng khối. Tuy nhiên, thay vì bắt đầu ở khối nguyên thủy, đồng bộ hóa snap bắt đầu ở một điểm kiểm tra 'đáng tin cậy' gần đây hơn được biết là một phần của Chuỗi khối thực sự. Nút lưu các điểm kiểm tra định kỳ trong khi xóa dữ liệu cũ hơn một độ tuổi nhất định. Các ảnh chụp nhanh này được sử dụng để tạo lại dữ liệu trạng thái khi cần, thay vì lưu trữ nó mãi mãi.

- Chiến lược đồng bộ hóa nhanh nhất, hiện là mặc định trong Mạng chính Ethereum.
- Tiết kiệm rất nhiều dung lượng đĩa và băng thông mạng lưới mà không làm giảm tính bảo mật.

[Tìm hiểu thêm về đồng bộ hóa snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md).

#### Đồng bộ hóa nhẹ {#light-sync}

Chế độ máy khách nhẹ tải xuống tất cả các tiêu đề khối, dữ liệu khối và xác minh ngẫu nhiên một số khối. Chỉ đồng bộ hóa phần đầu của Chuỗi từ điểm kiểm tra đáng tin cậy.

- Chỉ nhận trạng thái mới nhất trong khi dựa vào sự tin cậy đối với các nhà phát triển và cơ chế đồng thuận.
- Máy khách sẵn sàng sử dụng với trạng thái mạng lưới hiện tại trong vài phút.

**Lưu ý** Đồng bộ hóa nhẹ chưa hoạt động với Ethereum Bằng chứng cổ phần (PoS) - các phiên bản mới của đồng bộ hóa nhẹ sẽ sớm được phát hành!

[Tìm hiểu thêm về máy khách nhẹ](/developers/docs/nodes-and-clients/light-clients/)

### Các chế độ đồng bộ hóa lớp đồng thuận {#consensus-layer-sync-modes}

#### Đồng bộ hóa lạc quan {#optimistic-sync}

Đồng bộ hóa lạc quan là một chiến lược đồng bộ hóa sau The Merge được thiết kế để chọn tham gia và tương thích ngược, cho phép các nút thực thi đồng bộ hóa thông qua các phương pháp đã được thiết lập. Execution engine có thể nhập các khối Beacon một cách _lạc quan_ mà không cần xác minh đầy đủ chúng, tìm phần đầu mới nhất, và sau đó bắt đầu đồng bộ hóa Chuỗi bằng các phương pháp trên. Sau đó, sau khi máy khách thực thi đã bắt kịp, nó sẽ thông báo cho ứng dụng khách đồng thuận về tính hợp lệ của các giao dịch trong Chuỗi Beacon.

[Tìm hiểu thêm về đồng bộ hóa lạc quan](https://github.com/ethereum/consensus-specs/blob/master/sync/optimistic.md)

#### Đồng bộ hóa điểm kiểm tra {#checkpoint-sync}

Đồng bộ hóa điểm kiểm tra, còn được gọi là đồng bộ hóa tính chủ quan yếu, tạo ra trải nghiệm người dùng vượt trội để đồng bộ hóa một nút Beacon. Nó dựa trên các giả định về [tính chủ quan yếu](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) cho phép đồng bộ hóa Chuỗi Beacon từ một điểm kiểm tra tính chủ quan yếu gần đây thay vì khối nguyên thủy. Đồng bộ hóa điểm kiểm tra làm cho thời gian đồng bộ hóa ban đầu nhanh hơn đáng kể với các giả định tin cậy tương tự như đồng bộ hóa từ [khối nguyên thủy](/glossary/#genesis-block).

Trong thực tế, điều này có nghĩa là nút của bạn kết nối với một dịch vụ từ xa để tải xuống các trạng thái đã chung cuộc gần đây và tiếp tục xác minh dữ liệu từ điểm đó. Bên thứ ba cung cấp dữ liệu được tin cậy và nên được chọn cẩn thận.

Tìm hiểu thêm về [đồng bộ hóa điểm kiểm tra](https://notes.ethereum.org/@djrtwo/ws-sync-in-practice)

## Đọc thêm {#further-reading}

- [Ethereum 101 - Phần 2 - Hiểu về các nút](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, ngày 13 tháng 2 năm 2019_
- [Chạy các nút đầy đủ Ethereum: Hướng dẫn cho những người ít động lực](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, ngày 7 tháng 11 năm 2019_

## Các chủ đề liên quan {#related-topics}

- [Các khối](/developers/docs/blocks/)
- [Các mạng lưới](/developers/docs/networks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Biến Raspberry Pi 4 của bạn thành một nút trình xác thực chỉ bằng cách flash thẻ MicroSD – Hướng dẫn cài đặt](/developers/tutorials/run-node-raspberry-pi/) _– Flash Raspberry Pi 4 của bạn, cắm cáp ethernet, kết nối ổ đĩa SSD và bật nguồn thiết bị để biến Raspberry Pi 4 thành một nút đầy đủ Ethereum chạy lớp thực thi (Mạng chính) và / hoặc lớp đồng thuận (Chuỗi Beacon / trình xác thực)._