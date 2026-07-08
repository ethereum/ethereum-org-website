---
title: "Dữ liệu và phân tích"
description: "Cách lấy dữ liệu và phân tích trên chuỗi để sử dụng trong các ứng dụng phi tập trung (dapp) của bạn"
lang: vi
---

## Giới thiệu {#introduction}

Khi việc sử dụng mạng lưới tiếp tục tăng lên, một lượng thông tin có giá trị ngày càng lớn sẽ tồn tại trong dữ liệu trên chuỗi. Khi khối lượng dữ liệu tăng lên nhanh chóng, việc tính toán và tổng hợp thông tin này để báo cáo hoặc vận hành một ứng dụng phi tập trung (dapp) có thể trở thành một nỗ lực tốn nhiều thời gian và công sức xử lý.

Việc tận dụng các nhà cung cấp dữ liệu hiện có có thể đẩy nhanh quá trình phát triển, tạo ra kết quả chính xác hơn và giảm bớt nỗ lực bảo trì liên tục. Điều này sẽ cho phép một nhóm tập trung vào chức năng cốt lõi mà dự án của họ đang cố gắng cung cấp.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu khái niệm cơ bản về [Trình khám phá khối](/developers/docs/data-and-analytics/block-explorers/) để hiểu rõ hơn về việc sử dụng chúng trong bối cảnh phân tích dữ liệu. Ngoài ra, hãy làm quen với khái niệm [chỉ số](/glossary/#index) để hiểu những lợi ích mà chúng mang lại cho thiết kế hệ thống.

Về các nguyên tắc cơ bản của kiến trúc, hãy hiểu [API](https://www.wikipedia.org/wiki/API) và [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) là gì, ngay cả trên lý thuyết.

## Trình khám phá khối {#block-explorers}

Nhiều [Trình khám phá khối](/developers/docs/data-and-analytics/block-explorers/) cung cấp các cổng [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) sẽ cung cấp cho các nhà phát triển khả năng hiển thị dữ liệu theo thời gian thực về các khối, giao dịch, trình xác thực, tài khoản và các hoạt động trên chuỗi khác.

Sau đó, các nhà phát triển có thể xử lý và chuyển đổi dữ liệu này để cung cấp cho người dùng của họ những thông tin chi tiết và tương tác độc đáo với [chuỗi khối](/glossary/#blockchain). Ví dụ: [Etherscan](https://etherscan.io) và [Blockscout](https://eth.blockscout.com) cung cấp dữ liệu thực thi và đồng thuận cho mỗi khe 12 giây.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) là một giao thức lập chỉ số cung cấp một cách dễ dàng để truy vấn dữ liệu chuỗi khối thông qua các API mở được gọi là đồ thị con.

Với The Graph, các nhà phát triển có thể hưởng lợi từ:

- Lập chỉ số phi tập trung: Cho phép lập chỉ số dữ liệu chuỗi khối thông qua nhiều trình lập chỉ số, do đó loại bỏ bất kỳ điểm lỗi duy nhất nào
- Truy vấn GraphQL: Cung cấp giao diện GraphQL mạnh mẽ để truy vấn dữ liệu được lập chỉ số, giúp việc truy xuất dữ liệu trở nên cực kỳ đơn giản
- Tùy chỉnh: Xác định logic của riêng bạn để chuyển đổi và lưu trữ dữ liệu chuỗi khối, đồng thời tái sử dụng các đồ thị con do các nhà phát triển khác xuất bản trên Mạng lưới The Graph

Làm theo hướng dẫn [bắt đầu nhanh](https://thegraph.com/docs/en/quick-start/) này để tạo, triển khai và truy vấn một đồ thị con trong vòng 5 phút.

## Sự đa dạng máy khách {#client-diversity}

[Sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/) rất quan trọng đối với sức khỏe tổng thể của mạng lưới Ethereum vì nó cung cấp khả năng phục hồi trước các lỗi và lỗ hổng bảo mật. Hiện có một số bảng điều khiển về sự đa dạng máy khách bao gồm [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) và [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) tiền xử lý dữ liệu chuỗi khối thành các bảng cơ sở dữ liệu quan hệ (DuneSQL), cho phép người dùng truy vấn dữ liệu chuỗi khối bằng SQL và xây dựng các bảng điều khiển dựa trên kết quả truy vấn. Dữ liệu trên chuỗi được tổ chức thành 4 bảng thô: `blocks`, `transactions`, (sự kiện) `logs` và (lệnh gọi) `traces`. Các hợp đồng và giao thức phổ biến đã được giải mã và mỗi hợp đồng/giao thức đều có bộ bảng sự kiện và lệnh gọi riêng. Các bảng sự kiện và lệnh gọi đó được xử lý thêm và tổ chức thành các bảng trừu tượng theo loại giao thức, ví dụ: dex, cho vay, stablecoin, v.v.

## SQD {#sqd}

[SQD](https://sqd.dev/) là một nền tảng dữ liệu siêu mở rộng phi tập trung được tối ưu hóa để cung cấp quyền truy cập hiệu quả, không cần cấp phép vào khối lượng dữ liệu lớn. Nó hiện phục vụ dữ liệu lịch sử trên chuỗi, bao gồm nhật ký sự kiện, biên lai giao dịch, dấu vết và sự khác biệt trạng thái trên mỗi giao dịch. SQD cung cấp một bộ công cụ mạnh mẽ để tạo các quy trình trích xuất và xử lý dữ liệu tùy chỉnh, đạt tốc độ lập chỉ số lên tới 150 nghìn khối mỗi giây.

Để bắt đầu, hãy truy cập [tài liệu](https://docs.sqd.dev/) hoặc xem [các ví dụ EVM](https://github.com/subsquid-labs/squid-evm-examples) về những gì bạn có thể xây dựng với SQD.

## Mạng lưới SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) là một trình lập chỉ số dữ liệu hàng đầu cung cấp cho các nhà phát triển các API nhanh chóng, đáng tin cậy, phi tập trung và có thể tùy chỉnh cho các dự án Web3 của họ. SubQuery trao quyền cho các nhà phát triển từ hơn 165 hệ sinh thái (bao gồm cả Ethereum) với dữ liệu được lập chỉ số phong phú để xây dựng trải nghiệm trực quan và đắm chìm cho người dùng của họ. Mạng lưới SubQuery cung cấp sức mạnh cho các ứng dụng không thể bị ngăn cản của bạn bằng một mạng lưới cơ sở hạ tầng linh hoạt và phi tập trung. Sử dụng bộ công cụ dành cho nhà phát triển chuỗi khối của SubQuery để xây dựng các ứng dụng Web3 của tương lai mà không mất thời gian xây dựng một backend tùy chỉnh cho các hoạt động xử lý dữ liệu.

Để bắt đầu, hãy truy cập [hướng dẫn bắt đầu nhanh Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) để bắt đầu lập chỉ số dữ liệu chuỗi khối Ethereum trong vài phút trong môi trường Docker cục bộ để thử nghiệm trước khi đi vào hoạt động trên [dịch vụ được quản lý của SubQuery](https://managedservice.subquery.network/) hoặc trên [mạng lưới phi tập trung của SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) là một API dữ liệu chuỗi khối theo thời gian thực cung cấp dữ liệu phong phú cho hơn 70 triệu token trên hơn 80 mạng lưới. Các nhà phát triển có thể truy cập định giá token có cấu trúc, số dư ví, lịch sử giao dịch và phân tích tổng hợp (khối lượng, thanh khoản, các ví duy nhất) mà không cần duy trì cơ sở hạ tầng lập chỉ số tùy chỉnh. Codex hỗ trợ phân phối dữ liệu dưới một giây thông qua tích hợp WebSocket và webhook.

Để bắt đầu, hãy truy cập [tài liệu](https://docs.codex.io), dùng thử [Trình khám phá](https://docs.codex.io/explore) hoặc đăng ký tại [bảng điều khiển](https://dashboard.codex.io/signup).

## Ngôn ngữ truy vấn EVM {#evm-query-language}

Ngôn ngữ truy vấn EVM (EQL) là một ngôn ngữ giống SQL được thiết kế để truy vấn các chuỗi EVM (Máy ảo Ethereum). Mục tiêu cuối cùng của EQL là hỗ trợ các truy vấn quan hệ phức tạp trên các thành phần hạng nhất của chuỗi EVM (khối, tài khoản và giao dịch) đồng thời cung cấp cho các nhà phát triển và nhà nghiên cứu một cú pháp tiện dụng để sử dụng hàng ngày. Với EQL, các nhà phát triển có thể tìm nạp dữ liệu chuỗi khối bằng cú pháp giống SQL quen thuộc và loại bỏ nhu cầu về mã soạn sẵn phức tạp. EQL hỗ trợ các yêu cầu dữ liệu chuỗi khối tiêu chuẩn (ví dụ: truy xuất nonce và số dư của một tài khoản trên Ethereum hoặc tìm nạp kích thước khối và dấu thời gian hiện tại) và liên tục bổ sung hỗ trợ cho các yêu cầu và bộ tính năng phức tạp hơn.

## Đọc thêm {#further-reading}

- [Khám phá dữ liệu tiền mã hóa I: Kiến trúc luồng dữ liệu](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Tổng quan về Mạng lưới The Graph](https://thegraph.com/docs/en/about/)
- [Sân chơi truy vấn The Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Các ví dụ về mã API trên Etherscan](https://etherscan.io/apis#contracts)
- [Tài liệu API trên Blockscout](https://docs.blockscout.com/devs/apis)
- [Trình khám phá Chuỗi Beacon Beaconcha.in](https://beaconcha.in)
- [Cơ bản về Dune](https://docs.dune.com/#dune-basics)
- [Hướng dẫn bắt đầu nhanh SubQuery Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Tổng quan về Mạng lưới SQD](https://docs.sqd.dev/)
- [Ngôn ngữ truy vấn EVM](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Hướng dẫn: Dữ liệu & phân tích / SQL trên Ethereum {#tutorials}

- [Tìm hiểu các chủ đề nền tảng của Ethereum bằng SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Truy vấn dữ liệu Ethereum trên chuỗi bằng SQL để hiểu các nguyên tắc cơ bản về giao dịch, khối và Gas._
