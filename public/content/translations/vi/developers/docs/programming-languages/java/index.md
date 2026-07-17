---
title: "Ethereum dành cho nhà phát triển Java"
description: "Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Java"
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Java</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (dapp) tận dụng những lợi ích của tiền mã hóa và công nghệ chuỗi khối. Các dapp này có thể đáng tin cậy, nghĩa là một khi được triển khai lên Ethereum, chúng sẽ luôn chạy đúng như được lập trình. Chúng có thể kiểm soát tài sản kỹ thuật số để tạo ra các loại ứng dụng tài chính mới. Chúng có thể phi tập trung, nghĩa là không một thực thể hay cá nhân nào kiểm soát chúng và gần như không thể bị kiểm duyệt.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện những bước đầu tiên để tích hợp Java với Ethereum**

Bạn cần một tài liệu hướng dẫn cơ bản hơn trước? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers.](/developers/)

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Tìm hiểu về hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Làm việc với các máy khách Ethereum {#working-with-ethereum-clients}

Tìm hiểu cách sử dụng [Web3j](https://github.com/web3j/web3j) và Hyperledger Besu, hai máy khách Ethereum bằng Java hàng đầu

- [Kết nối với máy khách Ethereum bằng Java, Eclipse và Web3j](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Quản lý tài khoản Ethereum bằng Java và Web3j](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [Tạo Java Wrapper từ hợp đồng thông minh của bạn](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [Tương tác với hợp đồng thông minh Ethereum](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Lắng nghe các sự kiện của hợp đồng thông minh Ethereum](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Sử dụng Besu (Pantheon), máy khách Ethereum bằng Java với Linux](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Chạy một nút Hyperledger Besu (Pantheon) trong các bài kiểm tra tích hợp Java](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Bảng tóm tắt Web3j](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

Tìm hiểu cách sử dụng [ethers-kt](https://github.com/Kr1ptal/ethers-kt), một thư viện Kotlin bất đồng bộ, hiệu suất cao để tương tác với các chuỗi khối dựa trên EVM. Nhắm mục tiêu đến các nền tảng JVM và Android.
- [Chuyển token ERC-20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [Hoán đổi UniswapV2 với tính năng lắng nghe sự kiện](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [Trình theo dõi số dư ETH / ERC-20](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## Bài viết trung cấp {#intermediate-articles}

- [Quản lý lưu trữ trong ứng dụng Java với IPFS](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Quản lý token ERC-20 trong Java với Web3j](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Trình quản lý giao dịch Web3j](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Sử dụng Eventeum để xây dựng bộ nhớ đệm dữ liệu hợp đồng thông minh bằng Java](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Các dự án và công cụ Java {#java-projects-and-tools}

- [Web3j (Thư viện để tương tác với các máy khách Ethereum)](https://github.com/web3j/web3j)
- [ethers-kt (Thư viện Kotlin/Java/Android bất đồng bộ, hiệu suất cao dành cho các chuỗi khối dựa trên EVM.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (Trình lắng nghe sự kiện)](https://github.com/ConsenSys/eventeum)
- [Mahuta (Công cụ phát triển IPFS)](https://github.com/ConsenSys/mahuta)

Bạn đang tìm kiếm thêm tài nguyên? Hãy xem [ethereum.org/developers.](/developers/)

## Những người đóng góp từ cộng đồng Java {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)