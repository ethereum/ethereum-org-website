---
title: "Ethereum dành cho nhà phát triển Rust"
description: "Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Rust"
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Rust</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (dapp) tận dụng những lợi ích của tiền mã hóa và công nghệ chuỗi khối. Các dapp này có thể đáng tin cậy, nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy đúng như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra các loại ứng dụng tài chính mới. Chúng có thể phi tập trung, nghĩa là không một thực thể hay cá nhân nào kiểm soát chúng và gần như không thể bị kiểm duyệt.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện những bước đầu tiên để tích hợp Rust với Ethereum**

Bạn cần một tài liệu hướng dẫn cơ bản hơn trước? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Bài viết cho người mới bắt đầu {#beginner-articles}

- [Máy khách Ethereum bằng Rust](https://openethereum.github.io/) \* **Lưu ý rằng OpenEthereum [đã bị ngừng hỗ trợ](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) và không còn được bảo trì nữa.** Hãy sử dụng nó một cách thận trọng và tốt nhất là chuyển sang một bản triển khai máy khách khác.
- [Gửi giao dịch lên Ethereum bằng Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Hướng dẫn từng bước về cách viết hợp đồng bằng Rust Wasm cho Kovan](https://github.com/paritytech/pwasm-tutorial)

## Bài viết trung cấp {#intermediate-articles}

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Thư viện externs pwasm_ethereum để tương tác với mạng lưới giống Ethereum](https://github.com/openethereum/pwasm-ethereum)
- [Xây dựng một ứng dụng trò chuyện phi tập trung bằng JavaScript và Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Xây dựng một ứng dụng Todo phi tập trung bằng Vue.js & Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Xây dựng một chuỗi khối bằng Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Các dự án và công cụ Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Bộ sưu tập các externs để tương tác với mạng lưới giống Ethereum_
- [Lighthouse](https://github.com/sigp/lighthouse) - _Máy khách lớp đồng thuận Ethereum tốc độ cao_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _Đề xuất thiết kế lại lớp thực thi hợp đồng thông minh Ethereum bằng cách sử dụng một tập hợp con tất định của WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _Tài liệu tham khảo API OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) - _Công cụ kiểm thử đơn vị cho hợp đồng thông minh Solidity sử dụng EVM của máy khách Parity gốc._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Bản triển khai Máy ảo Ethereum bằng Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Hợp đồng thông minh Wavelet bằng Rust_
- [Foundry](https://github.com/foundry-rs/foundry) - _Bộ công cụ phát triển ứng dụng Ethereum_
- [Alloy](https://alloy.rs) - _Các thư viện hiệu suất cao, được kiểm thử kỹ lưỡng & có tài liệu đầy đủ để tương tác với Ethereum và các chuỗi dựa trên EVM khác._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Thư viện Ethereum và bản triển khai ví_
- [SewUp](https://github.com/second-state/SewUp) - _Một thư viện giúp bạn xây dựng hợp đồng WebAssembly Ethereum bằng Rust giống như phát triển một backend thông thường_
- [Substreams](https://github.com/streamingfast/substreams) - _Công nghệ lập chỉ mục dữ liệu chuỗi khối song song_
- [Reth](https://github.com/paradigmxyz/reth) Reth (viết tắt của Rust Ethereum) là một bản triển khai nút đầy đủ Ethereum mới
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Một bộ sưu tập chọn lọc các dự án trong hệ sinh thái Ethereum được viết bằng Rust_
- [Stylus](https://github.com/OffchainLabs/stylus) - _Rust SDK để xây dựng hợp đồng thông minh trên Arbitrum_

Bạn đang tìm kiếm thêm tài nguyên? Hãy xem [ethereum.org/developers.](/developers/)

## Những người đóng góp trong cộng đồng Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)