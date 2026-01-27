---
title: "Ethereum cho nhà phát triển Rust"
description: "Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Rust"
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng các dự án và công cụ dựa trên Rust</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền điện tử và chuỗi khối. Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra những loại ứng dụng tài chính mới. Chúng có thể được phân cấp, có nghĩa là không một thực thể hay người nào kiểm soát chúng và gần như không thể kiểm duyệt.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện các bước đầu tiên để tích hợp Rust với Ethereum**

Cần một hướng dẫn cơ bản hơn? Tham khảo [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về Chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Tìm hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách Biên dịch và Triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Các bài viết cho người mới bắt đầu {#beginner-articles}

- [Máy khách Ethereum Rust](https://openethereum.github.io/) \* **Lưu ý rằng OpenEthereum [đã không còn được dùng nữa](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) và không còn được bảo trì.** Hãy sử dụng một cách thận trọng và tốt nhất là chuyển sang một bản triển khai máy khách khác.
- [Gửi giao dịch đến Ethereum bằng Rust](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/sending-ethereum-transactions-with-rust/)
- [Hướng dẫn từng bước về cách viết hợp đồng trong Rust Wasm cho Kovan](https://github.com/paritytech/pwasm-tutorial)

## Các bài viết trình độ trung cấp {#intermediate-articles}

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Thư viện externs pwasm_ethereum để tương tác với mạng tương tự Ethereum](https://github.com/openethereum/pwasm-ethereum)

- [Xây dựng một ứng dụng trò chuyện phi tập trung bằng JavaScript và Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)

- [Xây dựng một ứng dụng Việc cần làm phi tập trung bằng Vue.js & Rust](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)

- [Xây dựng một chuỗi khối bằng Rust](https://blog.logrocket.com/how-to-build-a-blockchain-in-rust/)

## Các dự án và công cụ Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Bộ sưu tập externs để tương tác với mạng tương tự Ethereum_
- [Lighthouse](https://github.com/sigp/lighthouse) - _Máy khách lớp đồng thuận Ethereum nhanh chóng_
- [Ethereum WebAssembly](https://ewasm.readthedocs.io/en/mkdocs/) - _Đề xuất thiết kế lại lớp thực thi hợp đồng thông minh của Ethereum sử dụng một tập con xác định của WebAssembly_
- [oasis_std](https://docs.rs/oasis-std/latest/oasis_std/index.html) - _Tài liệu tham khảo API OASIS_
- [Solaris](https://github.com/paritytech/sol-rs) - _Bộ kiểm thử đơn vị Hợp đồng thông minh Solidity sử dụng EVM của Máy khách Parity gốc._
- [SputnikVM](https://github.com/rust-blockchain/evm) - _Bản triển khai Máy ảo Ethereum bằng Rust_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Hợp đồng thông minh Wavelet bằng Rust_
- [Foundry](https://github.com/foundry-rs/foundry) - _Bộ công cụ để phát triển ứng dụng Ethereum_
- [Alloy](https://alloy.rs) - _Thư viện hiệu suất cao, được kiểm thử kỹ lưỡng và có tài liệu đầy đủ để tương tác với Ethereum và các chuỗi dựa trên EVM khác._
- [Ethers_rs](https://github.com/gakonst/ethers-rs) - _Thư viện Ethereum và triển khai ví_
- [SewUp](https://github.com/second-state/SewUp) - _Một thư viện giúp bạn xây dựng hợp đồng Ethereum webassembly bằng Rust, giống như phát triển trên một backend thông thường_
- [Substreams](https://github.com/streamingfast/substreams) - _Công nghệ lập chỉ mục dữ liệu chuỗi khối song song_
- [Reth](https://github.com/paradigmxyz/reth) Reth (viết tắt của Rust Ethereum) là một bản triển khai nút đầy đủ mới của Ethereum
- [Awesome Ethereum Rust](https://github.com/Vid201/awesome-ethereum-rust) - _Một bộ sưu tập các dự án được tuyển chọn trong hệ sinh thái Ethereum được viết bằng Rust_

Tìm kiếm thêm tài nguyên? Hãy xem tại [ethereum.org/developers.](/developers/)

## Những người đóng góp cho cộng đồng Rust {#rust-community-contributors}

- [Ethereum WebAssembly](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
