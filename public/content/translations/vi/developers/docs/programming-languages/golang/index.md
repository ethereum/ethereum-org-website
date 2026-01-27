---
title: Ethereum cho nhà phát triển Go
description: Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Go
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Go</FeaturedText>

Sử dụng Ethereum để tạo ra các ứng dụng phi tập trung (hay gọi là dapp). Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng là phi tập trung, nghĩa là chạy trên một mạng ngang hàng và không có điểm thất bại duy nhất. Không có thực thể hoặc cá nhân nào kiểm soát chúng và chúng gần như không thể kiểm duyệt. Chúng có thể quản lý tài sản kỹ thuật số để tạo ra các loại ứng dụng mới.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện các bước đầu tiên để tích hợp Go với Ethereum**

Cần một hướng dẫn cơ bản hơn? Tham khảo [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về Chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Tìm hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách Biên dịch và Triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [Hướng dẫn về Hợp đồng](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## Các bài viết và sách cho người mới bắt đầu {#beginner-articles-and-books}

- [Bắt đầu với Geth](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Sử dụng Golang để kết nối với Ethereum](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Triển khai Hợp đồng thông minh Ethereum bằng Golang](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Hướng dẫn từng bước để kiểm tra và triển khai hợp đồng thông minh Ethereum bằng Go](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [Sách điện tử: Phát triển Ethereum với Go](https://goethereumbook.org/) - _Phát triển các ứng dụng Ethereum bằng Go_

## Các bài viết và tài liệu cho trình độ trung cấp {#intermediate-articles-and-docs}

- [Tài liệu Go Ethereum](https://geth.ethereum.org/docs/) - _Tài liệu cho Ethereum Golang chính thức_
- [Hướng dẫn cho lập trình viên Erigon](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _Hướng dẫn có hình minh họa bao gồm cây trạng thái, đa bằng chứng và xử lý giao dịch_
- [Erigon và Ethereum không trạng thái](https://youtu.be/3-Mn7OckSus?t=394) - _Hội nghị Cộng đồng Ethereum 2020 (EthCC 3)_
- [Erigon: tối ưu hóa các ứng dụng Ethereum](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _Devcon 4 2018_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Tạo một ứng dụng phi tập trung trong Go với Geth](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Làm việc với Mạng riêng tư Ethereum bằng Golang và Geth](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Kiểm thử đơn vị các hợp đồng Solidity trên Ethereum bằng Go](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Tham khảo nhanh về việc sử dụng Geth như một thư viện](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Backend mô phỏng của GETH](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Các ứng dụng Chuỗi khối dưới dạng Dịch vụ (Blockchain-as-a-Service) sử dụng Ethereum và Quorum](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Lưu trữ phân tán IPFS và Swarm trong các ứng dụng Chuỗi khối Ethereum](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [Các ứng dụng di động: Thư viện và các nút Ethereum Inproc](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [Các ứng dụng phi tập trung gốc: Các ràng buộc Go với hợp đồng Ethereum](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Các dự án và công cụ của Go {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Bản triển khai chính thức bằng Go của giao thức Ethereum_
- [Phân tích mã nguồn Go Ethereum](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Xem xét và phân tích mã nguồn Go Ethereum_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Một phái sinh nhanh hơn của Go Ethereum, tập trung vào các nút lưu trữ_
- [Golem](https://github.com/golemfactory/golem) - _Golem đang tạo ra một thị trường toàn cầu cho sức mạnh tính toán_
- [Quorum](https://github.com/jpmorganchase/quorum) - _Một bản triển khai được cấp phép của Ethereum, hỗ trợ quyền riêng tư dữ liệu_
- [Lăng kính (Prysm)](https://github.com/prysmaticlabs/prysm) - _Bản triển khai bằng Go của Ethereum 'Serenity' 2.0_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _Twitter phi tập trung: Một dịch vụ tiểu blog chạy trên chuỗi khối Ethereum_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Bản triển khai và mở rộng bằng Golang của đặc tả Plasma khả thi tối thiểu_
- [Bể đào Ethereum mã nguồn mở](https://github.com/sammy007/open-ethereum-pool) - _Một bể đào Ethereum mã nguồn mở_
- [Ví HD Ethereum](https://github.com/miguelmota/go-ethereum-hdwallet) - _Các dẫn xuất ví HD Ethereum trong Go_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _Hỗ trợ nhiều loại mạng Ethereum_
- [Ứng dụng Geth phiên bản nhẹ](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _Bản triển khai Geth của Giao thức con Ethereum phiên bản nhẹ_
- [SDK Ethereum Golang](https://github.com/everFinance/goether) - _Một bản triển khai ví Ethereum đơn giản và các tiện ích trong Golang_
- [SDK Covalent Golang](https://github.com/covalenthq/covalent-api-sdk-go) - _Truy cập dữ liệu chuỗi khối hiệu quả thông qua SDK Go cho hơn 200 chuỗi khối_

Tìm kiếm thêm tài nguyên? Tham khảo [ethereum.org/developers](/developers/)

## Những người đóng góp cho cộng đồng Go {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gitter](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [kênh #ethereum](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Gitter cho Ứng dụng Geth phiên bản nhẹ](https://gitter.im/ethereum/light-client)

## Các danh sách tổng hợp khác {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Danh sách đầy đủ các công cụ dành cho nhà phát triển Ethereum](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [Nguồn trên GitHub](https://github.com/ConsenSys/ethereum-developer-tools-list)
