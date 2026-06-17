---
title: Ethereum dành cho nhà phát triển Go
description: Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Go
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Go</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (dapp). Các dapp này có thể đáng tin cậy, nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy đúng như được lập trình. Chúng phi tập trung, nghĩa là chúng chạy trên một mạng lưới ngang hàng và không có điểm lỗi duy nhất. Không một thực thể hay cá nhân nào kiểm soát chúng và chúng gần như không thể bị kiểm duyệt. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra các loại ứng dụng mới.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện những bước đầu tiên để tích hợp Go với Ethereum**

Bạn cần một tài liệu hướng dẫn cơ bản hơn trước? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về Chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Tìm hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Hướng dẫn về Hợp đồng](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Các bài viết và sách cho người mới bắt đầu {#beginner-articles-and-books}

- [Bắt đầu với Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Sử dụng Golang để kết nối với Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Triển khai hợp đồng thông minh Ethereum bằng Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Hướng dẫn từng bước để kiểm thử và triển khai hợp đồng thông minh Ethereum bằng Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Sách điện tử: Phát triển Ethereum với Go](https://goethereumbook.org/) - _Phát triển các ứng dụng Ethereum bằng Go_

## Các bài viết và tài liệu trung cấp {#intermediate-articles-and-docs}

- [Tài liệu Go Ethereum](https://geth.ethereum.org/docs) - _Tài liệu cho Ethereum Golang chính thức_
- [Hướng dẫn dành cho lập trình viên Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Hướng dẫn có minh họa bao gồm cây trạng thái, đa bằng chứng (multi-proof) và xử lý giao dịch_
- [Erigon và Ethereum phi trạng thái](https://youtu.be/3-Mn7OckSus?t=394) - _Hội nghị Cộng đồng Ethereum 2020 (EthCC 3)_
- [Erigon: tối ưu hóa các máy khách Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 năm 2018_
- [GoDoc của Go Ethereum](https://godoc.org/github.com/ethereum/go-ethereum)
- [Tạo một dapp bằng Go với Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Làm việc với Mạng lưới riêng tư Ethereum bằng Golang và Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Kiểm thử đơn vị các hợp đồng Solidity trên Ethereum bằng Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Tài liệu tham khảo nhanh để sử dụng Geth như một thư viện](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Các mô hình sử dụng nâng cao {#advanced-use-patterns}

- [Backend mô phỏng của GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Các ứng dụng Chuỗi khối như một Dịch vụ (BaaS) sử dụng Ethereum và Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Lưu trữ phân tán IPFS và Mạng lưới Swarm trong các ứng dụng Chuỗi khối Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Máy khách di động: Thư viện và các Node Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Các dapp gốc: Ràng buộc Go với các hợp đồng Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Các dự án và công cụ Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Bản triển khai Go chính thức của giao thức Ethereum_
- [Phân tích mã nguồn Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Đánh giá và phân tích mã nguồn Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Bản phái sinh nhanh hơn của Go Ethereum, tập trung vào các node lưu trữ_
- [Golem](https://github.com/golemfactory/golem) - _Golem đang tạo ra một thị trường toàn cầu cho sức mạnh tính toán_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Một bản triển khai có cấp phép của Ethereum hỗ trợ quyền riêng tư dữ liệu_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Bản triển khai Go của Ethereum 'Serenity' 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter phi tập trung: Một dịch vụ tiểu blog chạy trên chuỗi khối Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Bản triển khai và mở rộng Golang của đặc tả Minimum Viable Plasma_
- [Open Ethereum Mining Pool](https://github.com/sammy007/open-ethereum-pool) - _Một mỏ khai thác Ethereum mã nguồn mở_
- [Ví HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Các dẫn xuất Ví HD Ethereum bằng Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Hỗ trợ cho nhiều loại mạng lưới Ethereum_
- [Máy khách nhẹ Geth](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Bản triển khai Geth của Giao thức phụ Ethereum nhẹ (Light Ethereum Subprotocol)_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Một bản triển khai ví Ethereum đơn giản và các tiện ích bằng Golang_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _Truy cập dữ liệu chuỗi khối hiệu quả thông qua Go SDK cho hơn 200 chuỗi khối_

Bạn đang tìm kiếm thêm tài nguyên? Hãy xem [ethereum.org/developers](/developers/)

## Những người đóng góp trong cộng đồng Go {#go-community-contributors}

- [Discord của Geth](https://discordapp.com/invite/nthXNEv)
- [Gist của Geth](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [kênh #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Gitter của Multi Geth](https://gitter.im/ethoxy/multi-geth)
- [Gitter của Ethereum](https://gitter.im/ethereum/home)
- [Gitter của máy khách nhẹ Geth](https://gitter.im/ethereum/light-client)

## Các danh sách tổng hợp khác {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [ConsenSys: Danh sách đầy đủ các công cụ dành cho nhà phát triển Ethereum](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Nguồn GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)