---
title: Ethereum cho nhà phát triển Go
description: Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Go
lang: vi
sidebar: true
sidebarDepth: 1
---

# Ethereum cho nhà phát triển Go {#ethereum-for-go-devs}

<div class="featured">Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Go</div>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền điện tử và chuỗi khối. Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra những loại ứng dụng tài chính mới. Chúng có thể được phân cấp, có nghĩa là không một thực thể hay người nào kiểm soát chúng và gần như không thể kiểm duyệt.

<img src="https://i.imgur.com/MFg8Nop.png" width="100%" />

## Bắt đầu với Hợp đồng thông minh và Ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện các bước đầu tiên để tích hợp Go với Ethereum**

Cần một hướng dẫn cơ bản hơn? Tìm hiểu [ethereum.org/learn](/vi/learn/) hoặc [ethereum.org/developers](/vi/developers/).

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Hướng dẫn về hợp đồng](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Bài viết và sách cho người mới bắt đầu {#beginner-articles-and-books}

- [Chọn một ứng dụng Ethereum](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Bắt đầu với Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Dùng Golang để kết nối đến Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Triển khai hợp đồng thông minh Ethereum bằng cách sử dụng Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Hướng dẫn từng bước để kiểm tra và triển khai hợp đồng thông minh Ethereum trong Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [eBook: Phát triển Ethereum với Go](https://goethereumbook.org/) - _Phát triển ứng dụng Ethereum với Go_

## Bài viết trung gian và Tài liệu {#intermediate-articles-and-docs}

- [Tài liệu tham khảo về Go Ethereum](https://geth.ethereum.org/docs/) - _Tài liệu về Ethereum Golang chính thức_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Tạo ứng dụng phi tập trung trong Go với Geth](https://kauri.io/article/60a36c1b17d645939f63415218dc24f9/creating-a-dapp-in-go-with-geth)
- [Làm việc với Mạng riêng Ethereum với Golang và Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Đơn vị thử nghiệm Hợp đồng Solidity trên Ethereum với Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Phần cuối mô phỏng GETH](https://kauri.io/article/6285c9692883411aa041b6b970405a17/v1/the-geth-simulated-backend)
- [Các ứng dụng chuỗi khối dưới dạng dịch vụ sử dụng Ethereum và đại biểu](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Lưu trữ phân tán IPFS và Swarm trong ứng dụng chuỗi khối Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Khách hàng Di động: Thư viện và Nút Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [DApps gốc: Liên kết với các hợp đồng Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Các dự án và công cụ Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Việc triển khai chính thức giao thức Ethereum_
- [Phân tích mã Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Xem xét và phân tích mã nguồn Go Ethereum_
- [Golem](https://github.com/golemfactory/golem) - _Golem đang tạo ra một thị trường toàn cầu cho sức mạnh tính toán_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Việc triển khai Ethereum được cho phép bảo mật dữ liệu_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _Triển khai Ethereum 'Serenity' 2.0 Go_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter phi tập trung: Một dịch vụ blog chạy trên chuỗi khối Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) - _Golang triển khai và mở rộng đặc điểm kỹ thuật Plasma tối thiểu_
- [Mở nhóm khai thác Ethereum](https://github.com/sammy007/open-ethereum-pool) - _Nhóm khai thác Ethereum mã nguồn mở_
- [Ví Ethereum HD](https://github.com/miguelmota/go-ethereum-hdwallet) - _Các dẫn xuất của ví Ethereum HD trong Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Hỗ trợ cho nhiều loại mạng Ethereum_
- [Ứng dụng Geth Light](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Triển khai Geth của Light Ethereum Subprotocol_

Tìm kiếm thêm tài nguyên? Truy cập vào [ethereum.org/developers.](/vi/developers/)

## Những người đóng góp cho cộng đồng Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum channel](https://https:/gophers.slack.com/messages/C9HP1S9V2)
- [Trao đổi ngăn xếp - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Ứng dụng Geth light Gitter](https://gitter.im/ethereum/light-client)

## Danh sách tổng hợp khác {#other-aggregated-lists}

- [Ethereum tuyệt vời](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Danh sách các công cụ dứt khoát dành cho nhà phát triển Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Nguồn GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
