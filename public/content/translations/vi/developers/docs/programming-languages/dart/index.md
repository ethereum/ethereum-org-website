---
title: Ethereum cho các nhà phát triển Dart
description: Tìm hiểu cách phát triển cho Ethereum bằng ngôn ngữ Dart
lang: vi
incomplete: true
---

## Bắt đầu với hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-solidity}

## Hướng dẫn {#tutorials}

- [Flutter và Chuỗi khối – Dapp Hello World](https://www.geeksforgeeks.org/flutter-and-blockchain-hello-world-dapp/) sẽ hướng dẫn bạn tất cả các bước để bắt đầu:
  1. Viết một hợp đồng thông minh bằng [Solidity](https://soliditylang.org/)
  2. Viết một giao diện người dùng bằng Dart
- [Xây dựng một dapp di động với Flutter](https://medium.com/dash-community/building-a-mobile-dapp-with-flutter-be945c80315a) ngắn hơn nhiều, có thể sẽ tốt hơn nếu bạn đã biết những điều cơ bản
- Nếu bạn thích học bằng cách xem video, bạn có thể xem [Xây dựng ứng dụng Flutter Chuỗi khối đầu tiên của bạn](https://www.youtube.com/watch?v=3Eeh3pJ6PeA), video này dài khoảng một giờ
- Nếu bạn thiếu kiên nhẫn, bạn có thể thích [Xây dựng một ứng dụng phi tập trung Chuỗi khối bằng Flutter và Dart trên Ethereum](https://www.youtube.com/watch?v=jaMFEOCq_1s), video này chỉ dài khoảng hai mươi phút
- [Tích hợp MetaMask trong ứng dụng Flutter với Web3Modal của WalletConnect](https://www.youtube.com/watch?v=v_M2buHCpc4) - video ngắn này sẽ hướng dẫn bạn các bước tích hợp MetaMask vào ứng dụng Flutter của bạn bằng thư viện [Web3Modal](https://pub.dev/packages/web3modal_flutter) của WalletConnect
- [Khóa học Bootcamp cho nhà phát triển chuỗi khối di động với Solidity & Flutter](https://youtube.com/playlist?list=PL4V4Unlk5luhQ26ERO6hWEbcUwHDSSmVH) - danh sách phát khóa học dành cho nhà phát triển chuỗi khối di động full-stack

## Làm việc với các máy khách Ethereum {#working-with-ethereum-clients}

Bạn có thể sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền mã hóa và chuỗi khối.
Hiện có ít nhất hai thư viện được duy trì cho Dart để sử dụng [API JSON-RPC](/developers/docs/apis/json-rpc/) cho Ethereum.

1. [Web3dart từ pwa.ir](https://pub.dev/packages/web3dart)
2. [Ethereum 5.0.0 từ darticulate.com](https://pub.dev/packages/ethereum)

Ngoài ra còn có các thư viện bổ sung cho phép bạn thao tác với các địa chỉ Ethereum cụ thể, hoặc cho phép bạn truy xuất giá của các loại tiền mã hóa khác nhau.
[Bạn có thể xem danh sách đầy đủ tại đây](https://pub.dev/dart/packages?q=ethereum).
