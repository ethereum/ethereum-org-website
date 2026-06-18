---
title: "Ethereum cho các nhà phát triển Elixir"
description: "Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Elixir."
lang: vi
incomplete: false
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên Elixir.</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (dapp) tận dụng những lợi ích của tiền mã hóa và công nghệ Chuỗi khối. Các dapp này có thể không cần tin cậy, nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy đúng như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra các loại ứng dụng tài chính mới. Chúng có thể phi tập trung, nghĩa là không một thực thể hay cá nhân nào kiểm soát chúng và gần như không thể bị kiểm duyệt.

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

**Thực hiện những bước đầu tiên để tích hợp Elixir với Ethereum**

Bạn cần một tài liệu hướng dẫn cơ bản hơn trước? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về Chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Bài viết cho người mới bắt đầu {#beginner-articles}

- [Cuối cùng cũng hiểu về các tài khoản Ethereum](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Một thư viện Web3 Ethereum hạng nhất cho Elixir](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## Bài viết trình độ trung cấp {#intermediate-articles}

- [Cách ký các giao dịch hợp đồng Ethereum thô bằng Elixir](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [Hợp đồng thông minh Ethereum và Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Các dự án và công cụ Elixir {#elixir-projects-and-tools}

### Đang hoạt động {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Triển khai BIP32 & BIP44 trong Elixir (Phân cấp đa tài khoản cho ví tất định)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _Máy khách JSON-RPC Elixir cho Chuỗi khối Ethereum_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Một thư viện Web3 toàn diện để tương tác với các hợp đồng thông minh trên Ethereum bằng Elixir_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Một thư viện trình ký KMS cho Ethers (ký các giao dịch bằng AWS KMS)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Triển khai trình phân tích cú pháp/giải mã/mã hóa ABI Ethereum trong Elixir_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _Thư viện Elixir để tính toán các hàm băm Keccak SHA3-256 bằng cách sử dụng crate Rust tiny-keccak được xây dựng bằng NIF_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _Triển khai Elixir cho mã hóa RLP (Recursive Length Prefix) của Ethereum_

### Đã lưu trữ / Không còn được bảo trì {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Các tiện ích Ethereum cho Elixir_
- [exw3](https://github.com/hswick/exw3) - _Máy khách RPC Ethereum cấp cao cho Elixir_
- [mana](https://github.com/mana-ethereum/mana) - _Triển khai nút đầy đủ Ethereum được viết bằng Elixir_

Bạn đang tìm kiếm thêm tài nguyên? Hãy xem [trang chủ dành cho Nhà phát triển của chúng tôi](/developers/).

## Những người đóng góp từ cộng đồng Elixir {#elixir-community-contributors}

[Kênh #ethereum trên Slack của Elixir](https://elixir-lang.slack.com/archives/C5RPZ3RJL) là nơi tập hợp một cộng đồng đang phát triển nhanh chóng và là tài nguyên chuyên dụng để thảo luận về bất kỳ dự án nào ở trên cũng như các chủ đề liên quan.