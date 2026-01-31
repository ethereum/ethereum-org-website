---
title: "Ethereum cho nhà phát triển Java"
description: "Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Java"
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng các dự án và công cụ dựa trên Java</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền điện tử và chuỗi khối. Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra những loại ứng dụng tài chính mới. Chúng có thể được phân cấp, có nghĩa là không một thực thể hay người nào kiểm soát chúng và gần như không thể kiểm duyệt.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện các bước đầu tiên để tích hợp Java với Ethereum**

Cần một hướng dẫn cơ bản hơn? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers.](/developers/)

- [Giải thích về Chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Tìm hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách Biên dịch và Triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Làm việc với các máy khách Ethereum {#working-with-ethereum-clients}

Tìm hiểu cách sử dụng [Web3J](https://github.com/web3j/web3j) và Hyperledger Besu, hai trình khách Java Ethereum hàng đầu

- [Kết nối với một trình khách Ethereum bằng Java, Eclipse và Web3J](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Quản lý tài khoản Ethereum bằng Java và Web3j](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [Tạo trình bao bọc Java từ Hợp đồng thông minh của bạn](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [Tương tác với một Hợp đồng thông minh Ethereum](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Lắng nghe các Sự kiện Hợp đồng thông minh Ethereum](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Sử dụng Besu (Pantheon), trình khách Java Ethereum với Linux](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Chạy nút Hyperledger Besu (Pantheon) trong các bài kiểm tra tích hợp Java](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Bảng tóm tắt Web3j](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

Tìm hiểu cách sử dụng [ethers-kt](https://github.com/Kr1ptal/ethers-kt), một thư viện Kotlin không đồng bộ, hiệu năng cao để tương tác với các chuỗi khối dựa trên EVM. Nhắm mục tiêu các nền tảng JVM và Android.

- [Chuyển token ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [Hoán đổi UniswapV2 với tính năng lắng nghe sự kiện](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [Trình theo dõi số dư ETH / ERC20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## Các bài viết trình độ trung cấp {#intermediate-articles}

- [Quản lý lưu trữ trong ứng dụng Java với IPFS](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Quản lý token ERC20 trong Java với Web3j](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Trình quản lý Giao dịch Web3j](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Sử dụng Eventeum để xây dựng bộ đệm dữ liệu hợp đồng thông minh Java](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Các dự án và công cụ Java {#java-projects-and-tools}

- [Web3J (Thư viện để tương tác với các trình khách Ethereum)](https://github.com/web3j/web3j)
- [ethers-kt (Thư viện Kotlin/Java/Android không đồng bộ, hiệu năng cao cho các chuỗi khối dựa trên EVM.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (Trình lắng nghe sự kiện)](https://github.com/ConsenSys/eventeum)
- [Mahuta (Công cụ phát triển IPFS)](https://github.com/ConsenSys/mahuta)

Tìm kiếm thêm tài nguyên? Hãy xem tại [ethereum.org/developers.](/developers/)

## Những người đóng góp cho cộng đồng Java {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
