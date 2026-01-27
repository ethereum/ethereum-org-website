---
title: Dữ liệu và phân tích
description: Cách thu thập dữ liệu onchain và phân tích để sử dụng trong các ứng dụng phi tập trung của bạn
lang: vi
---

## Giới thiệu {#Introduction}

Khi việc sử dụng mạng ngày càng tăng, sẽ có một lượng lớn thông tin giá trị hơn trong dữ liệu onchain. Khi khối lượng dữ liệu tăng nhanh, việc tính toán và tổng hợp thông tin này để báo cáo hoặc làm cho một dapp có thể trở thành công việc tốn thời gian và công sức.

Tận dụng các nhà cung cấp dữ liệu hiện có có thể tăng tốc độ phát triển, tạo ra kết quả chính xác hơn và giảm thiểu nỗ lực bảo trì liên tục. Điều này sẽ giúp cho một đội ngũ tập trung vào chức năng chính mà dự án của họ đang cố gắng cung cấp.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm cơ bản về [Trình duyệt khối](/developers/docs/data-and-analytics/block-explorers/) để hiểu rõ hơn về cách sử dụng chúng trong bối cảnh phân tích dữ liệu. Ngoài ra, hãy tự làm quen với khái niệm về một [chỉ mục](/glossary/#index) để hiểu được những lợi ích mà chúng mang lại cho việc thiết kế hệ thống.

Về các nguyên tắc cơ bản của kiến trúc, bạn cần hiểu [API](https://www.wikipedia.org/wiki/API) và [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) là gì, dù chỉ trên lý thuyết.

## Trình duyệt khối {#block-explorers}

Nhiều [Trình duyệt khối](/developers/docs/data-and-analytics/block-explorers/) cung cấp các cổng [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) giúp các nhà phát triển có được khả năng hiển thị dữ liệu thời gian thực về các khối, giao dịch, người xác thực, tài khoản và các hoạt động trên chuỗi khác.

Sau đó, các nhà phát triển có thể xử lý và chuyển đổi dữ liệu này để cung cấp cho người dùng của họ những thông tin chi tiết và tương tác độc đáo với [chuỗi khối](/glossary/#blockchain). Ví dụ, [Etherscan](https://etherscan.io) và [Blockscout](https://eth.blockscout.com) cung cấp dữ liệu thực thi và đồng thuận cho mỗi slot 12 giây.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) là một giao thức lập chỉ mục cung cấp một cách dễ dàng để truy vấn dữ liệu chuỗi khối thông qua các API mở được gọi là subgraph.

Với The Graph, các nhà phát triển có thể hưởng lợi từ:

- Lập chỉ mục phi tập trung: Cho phép lập chỉ mục dữ liệu chuỗi khối thông qua nhiều trình lập chỉ mục, do đó loại bỏ mọi điểm lỗi đơn lẻ
- Truy vấn GraphQL: Cung cấp giao diện GraphQL mạnh mẽ để truy vấn dữ liệu đã được lập chỉ mục, giúp việc truy xuất dữ liệu trở nên cực kỳ đơn giản
- Tùy chỉnh: Xác định logic của riêng bạn để chuyển đổi và lưu trữ dữ liệu chuỗi khối, đồng thời sử dụng lại các subgraph do các nhà phát triển khác xuất bản trên Mạng The Graph

Làm theo hướng dẫn [bắt đầu nhanh](https://thegraph.com/docs/en/quick-start/) này để tạo, triển khai và truy vấn một subgraph trong vòng 5 phút.

## Sự đa dạng của ứng dụng khách {#client-diversity}

[Sự đa dạng của ứng dụng khách](/developers/docs/nodes-and-clients/client-diversity/) rất quan trọng đối với sức khỏe tổng thể của mạng Ethereum vì nó cung cấp khả năng phục hồi trước các lỗi và khai thác. Hiện có một số bảng thông tin về sự đa dạng của ứng dụng khách bao gồm [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) và [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) xử lý trước dữ liệu chuỗi khối thành các bảng cơ sở dữ liệu quan hệ (DuneSQL), cho phép người dùng truy vấn dữ liệu chuỗi khối bằng SQL và xây dựng bảng thông tin dựa trên kết quả truy vấn. Dữ liệu trên chuỗi được sắp xếp thành 4 bảng thô: `blocks`, `transactions`, `logs` (sự kiện) và `traces` (lệnh gọi). Các hợp đồng và giao thức phổ biến đã được giải mã và mỗi loại có bộ bảng sự kiện và lệnh gọi riêng. Các bảng sự kiện và lệnh gọi đó được xử lý thêm và sắp xếp thành các bảng trừu tượng theo loại giao thức, ví dụ: dex, cho vay, stablecoin, v.v.

## SQD {#sqd}

[SQD](https://sqd.dev/) là một nền tảng dữ liệu phi tập trung, có khả năng mở rộng siêu lớn, được tối ưu hóa để cung cấp quyền truy cập hiệu quả, không cần cấp phép vào các tập dữ liệu lớn. Nền tảng này hiện đang phục vụ dữ liệu lịch sử trên chuỗi, bao gồm nhật ký sự kiện, biên lai giao dịch, dấu vết và chênh lệch trạng thái trên mỗi giao dịch. SQD cung cấp một bộ công cụ mạnh mẽ để tạo các quy trình trích xuất và xử lý dữ liệu tùy chỉnh, đạt tốc độ lập chỉ mục lên tới 150 nghìn khối mỗi giây.

Để bắt đầu, hãy truy cập [tài liệu tham khảo](https://docs.sqd.dev/) hoặc xem [các ví dụ về EVM](https://github.com/subsquid-labs/squid-evm-examples) về những gì bạn có thể xây dựng với SQD.

## Mạng SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) là một công cụ lập chỉ mục dữ liệu hàng đầu, cung cấp cho các nhà phát triển các API nhanh, đáng tin cậy, phi tập trung và tùy chỉnh cho các dự án web3 của họ. SubQuery trao quyền cho các nhà phát triển từ hơn 165 hệ sinh thái (bao gồm cả Ethereum) với dữ liệu được lập chỉ mục phong phú để xây dựng trải nghiệm trực quan và sống động cho người dùng của họ. Mạng SubQuery hỗ trợ các ứng dụng không thể ngăn cản của bạn bằng một mạng cơ sở hạ tầng có khả năng phục hồi và phi tập trung. Sử dụng bộ công cụ dành cho nhà phát triển chuỗi khối của SubQuery để xây dựng các ứng dụng web3 của tương lai mà không tốn thời gian xây dựng một backend tùy chỉnh cho các hoạt động xử lý dữ liệu.

Để bắt đầu, hãy truy cập [hướng dẫn bắt đầu nhanh với Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) để bắt đầu lập chỉ mục dữ liệu chuỗi khối Ethereum trong vài phút trong môi trường Docker cục bộ để thử nghiệm trước khi hoạt động chính thức trên [dịch vụ được quản lý của SubQuery](https://managedservice.subquery.network/) hoặc trên [mạng phi tập trung của SubQuery](https://app.subquery.network/dashboard).

## Ngôn ngữ truy vấn EVM {#evm-query-language}

Ngôn ngữ truy vấn EVM (EQL) là một ngôn ngữ giống SQL được thiết kế để truy vấn các chuỗi EVM (Máy ảo Ethereum). Mục tiêu cuối cùng của EQL là hỗ trợ các truy vấn quan hệ phức tạp trên các thành phần hạng nhất của chuỗi EVM (khối, tài khoản và giao dịch) đồng thời cung cấp cho các nhà phát triển và nhà nghiên cứu một cú pháp tiện dụng để sử dụng hàng ngày. Với EQL, các nhà phát triển có thể tìm nạp dữ liệu chuỗi khối bằng cách sử dụng cú pháp quen thuộc giống SQL và loại bỏ nhu cầu về mã soạn sẵn phức tạp. EQL hỗ trợ các yêu cầu dữ liệu chuỗi khối tiêu chuẩn (ví dụ: truy xuất nonce và số dư của tài khoản trên Ethereum hoặc tìm nạp kích thước khối và dấu thời gian hiện tại) và liên tục bổ sung hỗ trợ cho các yêu cầu và bộ tính năng phức tạp hơn.

## Đọc thêm {#further-reading}

- [Khám phá dữ liệu tiền mã hóa I: Các kiến trúc luồng dữ liệu](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Tổng quan về Mạng Graph](https://thegraph.com/docs/en/about/)
- [Sân chơi truy vấn Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Các ví dụ về mã API trên EtherScan](https://etherscan.io/apis#contracts)
- [Tài liệu tham khảo API trên Blockscout](https://docs.blockscout.com/devs/apis)
- [Trình khám phá Chuỗi Hải Đăng Beaconcha.in](https://beaconcha.in)
- [Kiến thức cơ bản về Dune](https://docs.dune.com/#dune-basics)
- [Hướng dẫn bắt đầu nhanh với Ethereum của SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Tổng quan về Mạng SQD](https://docs.sqd.dev/)
- [Ngôn ngữ truy vấn EVM](https://eql.sh/blog/alpha-release-notes)
