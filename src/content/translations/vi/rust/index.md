---
title: Ethereum cho nhà phát triển Rust
description: Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Rust
lang: vi
sidebar: true
sidebarDepth: 1
---

# Ethereum cho nhà phát triển Rust {#ethereum-for-rust-devs}

<div class="featured">Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở Rust</div>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền điện tử và chuỗi khối. Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra những loại ứng dụng tài chính mới. Chúng có thể được phân cấp, có nghĩa là không một thực thể hay người nào kiểm soát chúng và gần như không thể kiểm duyệt.

## Bắt đầu với Hợp đồng thông minh và Ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện các bước đầu tiên để tích hợp Rust với Ethereum**

Cần một hướng dẫn cơ bản hơn? Tham khảo [ethereum.org/learn](/vi/learn/) hoặc [ethereum.org/developers](/vi/developers/).

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Bài viết cho người mới bắt đầu {#beginner-articles}

- [Chọn một ứng dụng Ethereum](https://www.trufflesuite.com/docs/truffle/reference/choosing-an-ethereum-client)
- [Ứng dụng Rust Ethereum](https://wiki.parity.io/Setup)
- [Gửi giao dịch tới Ethereum bằng Rust](https://kauri.io/article/97c85229c66445759bb0ce642224d364/sending-ethereum-transactions-with-rust)
- [Giới thiệu về Hợp đồng thông minh với ứng dụng Parity Ethereum](https://wiki.parity.io/Smart-Contracts)
- [Thiết lập môi trường lập trình Oasis SDK của bạn](https://docs.oasis.dev/quickstart.html#set-up-the-oasis-sdk)
- [Hướng dẫn từng bước về cách viết hợp đồng trong rust Wasm cho Kovan](https://github.com/paritytech/pwasm-tutorial)

## Bài viết trung gian {#intermediate-articles}

- [Tài liệu tham khảo Rust-Web3](https://tomusdrw.github.io/rust-web3/web3/index.html)
- [Ví dụ làm việc của Rust-Web3](https://github.com/tomusdrw/rust-web3/blob/master/examples)
- [Tạo một lá phiếu bí mật với OASIS SDK](https://docs.oasis.dev/tutorials/ballot.html#prerequisites)
- [Tạo một máy chủ trò chuyện riêng tư với OASIS SDK](https://docs.oasis.dev/tutorials/messaging.html#prerequisites)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Thư viện ngoài pwasm_ethereum để tương tác với mạng giống như Ethereum](https://paritytech.github.io/pwasm-ethereum/pwasm_ethereum/)
- [Xây dựng một cuộc trò chuyện phi tập trung bằng cách sử dụng JavaScript và Rust](https://medium.com/perlin-network/build-a-decentralized-chat-using-javascript-rust-webassembly-c775f8484b52)
- [Xây dựng ứng dụng làm việc phi tập trung bằng Vue.js & Rust ](https://medium.com/@jjmace01/build-a-decentralized-todo-app-using-vue-js-rust-webassembly-5381a1895beb)
- [Bắt đầu với Enigma - Trong ngôn ngữ lập trình Rust](https://blog.enigma.co/getting-started-with-discovery-the-rust-programming-language-4d1e0b06de15)
- [Giới thiệu về hợp đồng bí mật](https://blog.enigma.co/getting-started-with-enigma-an-intro-to-secret-contracts-cdba4fe501c2)
- [Triển khai Hợp đồng Solidity trên Oasis (Tổng hợp)](https://docs.oasis.dev/tutorials/deploy-solidity.html#deploy-using-truffle)

## Các dự án và công cụ Rust {#rust-projects-and-tools}

- [pwasm-ethereum](https://github.com/paritytech/pwasm-ethereum) - _Bộ sưu tập các biến ngoài để tương tác với mạng giống như ethereum._
- [Hội đồng mạng Ethereum](https://ewasm.readthedocs.io/en/mkdocs/)
- [oasis_std](https://docs.rs/oasis-std/0.2.7/oasis_std/) - _Tham chiếu OASIS API_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _các chức năng tiện ích để làm việc với các cơ sở mã hóa liên quan đến Ethereum_
- [Solaris](https://github.com/paritytech/sol-rs)
- [SputnikVM](https://github.com/sorpaas/rust-evm) - _Triển khai máy ảo Rust Ethereum_
- [Parity](https://github.com/paritytech/parity-ethereum) - _Máy khách Ethereum Rust_
- [rust-web3](https://github.com/tomusdrw/rust-web3) - _Sự triển khai Rust của thư viện Web3.js_
- [Wavelet](https://wavelet.perlin.net/docs/smart-contracts) - _Hợp đồng thông minh Wavelet trong Rust_

Tìm kiếm thêm tài nguyên? Tham khảo [ethereum.org/developers.](/vi/developers/)

## Những người đóng góp cho cộng đồng Rust {#rust-community-contributors}

- [Hội đồng mạng Ethereum](https://gitter.im/ewasm/Lobby)
- [Oasis Gitter](https://gitter.im/Oasis-official/Lobby)
- [Parity Gitter](https://gitter.im/paritytech/parity)
- [Enigma](https://discord.gg/SJK32GY)
