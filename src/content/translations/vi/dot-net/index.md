---
title: Ethereum cho nhà phát triển .NET
description: Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở .NET
lang: vi
sidebar: true
sidebarDepth: 1
---

# Ethereum cho nhà phát triển .NET {#ethereum-for-dot-net-devs}

<div class="featured">Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở .NET</div>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hay "dapps") sử dụng các lợi ích của công nghệ tiền điện tử và chuỗi khóa. Các ứng dụng phi tập trung này có thể đáng tin cậy, có nghĩa là một khi chúng được triển khai lên Ethereum, chúng sẽ luôn chạy như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra những loại ứng dụng tài chính mới. Chúng có thể được phân cấp, có nghĩa là không một thực thể hay người nào kiểm soát chúng và gần như không thể kiểm duyệt.

Xây dựng các ứng dụng phi tập trung trên Ethereum và tương tác với các hợp đồng thông minh bằng các công cụ và ngôn ngữ từ kho công nghệ của Microsoft - Hỗ trợ C#, # Visual Basic .NET, F#, trên các công cụ như VSCode và Visual Studio, trên .NET Framework / .NET Core / .NET Standard. Triển khai chuỗi khối Ethereum trên Azure bằng chuỗi khối Microsoft Azure trong vài phút. Mang tình yêu của .NET đến Ethereum!

<img src="https://raw.githubusercontent.com/Nethereum/Nethereum/master/logos/logo192x192t.png" />

## Bắt đầu với Hợp đồng thông minh và Ngôn ngữ Solidity

**Thực hiện các bước đầu tiên để tích hợp .NET với Ethereum**

Cần một hướng dẫn cơ bản hơn? Tìm hiểu [ethereum.org/learn](/vi/learn/) hoặc [ethereum.org/developers](/vi/developers/).

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về Hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết Hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Tài liệu tham khảo và liên kết cho người mới bắt đầu {#beginner-references-and-links}

**Giới thiệu thư viện Nethereum và mã VS Solidity**

- [Nethereum, Bắt đầu](https://docs.nethereum.com/en/latest/getting-started/)
- [Cài đặt mã VS Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Một quy trình làm việc của nhà phát triển .NET để tạo và gọi các hợp đồng thông minh Ethereum](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Hợp đồng thông minh tích hợp với Nethereum](https://kauri.io/article/b54334b0695342c1bbe161c4c4467b50/smart-contracts-integration-with-nethereum)
- [Kết nối các hợp đồng thông minh chuỗi khối .NET và Ethereum với Nethereum](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), cũng trong [Phiên bản Trung Quốc](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [Nethereum - Một thư viện tích hợp .NET mã nguồn mở cho chuối khối](https://kauri.io/article/d15dfd4903f149cdb84b3ce666103b52/v1/nethereum-an-open-source-.net-integration-library-for-blockchain)
- [Viết giao dịch Ethereum vào cơ sở dữ liệu SQL bằng Nethereum](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [Xem việc triển khai các hợp đồng thông minh Ethereum bằng C# và VisualStudio dễ dàng tới mức nào](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**Bạn muốn bỏ qua thiết lập bây giờ và tiến thẳng đến các mẫu?**

- [Playground](http://playground.nethereum.com/) - Tương tác với Ethereum và tìm hiểu cách sử dụng Nethereum thông qua trình duyệt.
  - Số dư tài khoản truy vấn [C#](http://playground.nethereum.com/csharp/id/1001) [VB.NET](http://playground.nethereum.com/vb/id/2001)
  - Truy vấn số dư hợp đồng thông minh ERC20 [C#](http://playground.nethereum.com/csharp/id/1005) [VB.NET](http://playground.nethereum.com/vb/id/2004)
  - Chuyển ether vào tài khoản [C#](http://playground.nethereum.com/csharp/id/1003) [VB.NET](http://playground.nethereum.com/vb/id/2003)
  - ... Và nhiều hơn thế!

## Bài viết trung gian {#intermediate-articles}

- [Sổ làm việc/Danh sách mẫu của Nethereum](http://docs.nethereum.com/en/latest/Nethereum.Workbooks/docs/)
- [Triển khai chuỗi thử nghiệm phát triển của riêng bạn](https://github.com/Nethereum/Testchains)
- [Bổ sung mã VSCode cho Solidity](https://docs.nethereum.com/en/latest/nethereum-codegen-vscodesolidity/)
- [Sự đồng thuận và Ethereum: Tại sao và như thế nào](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [Tạo mã web API ASP.NET cho các ứng dụng phi tập trung của Ethereum](https://tech-mint.com/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Sử dụng Nethereum Web3 để triển khai hệ thống theo dõi chuỗi cung ứng](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Xử lý khối Nethereum](https://nethereum.readthedocs.io/en/latest/nethereum-block-processing-detail/), cùng [Sân chơi mẫu C#](http://playground.nethereum.com/csharp/id/1025)
- [Truyền tải trực tuyến Nethereum](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido và Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum và Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Azure Key Vault và Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)
- [Kiến trúc tham khảo phụ trợ Ujo Nethereum](https://docs.nethereum.com/en/latest/nethereum-ujo-backend-sample/)

## Dự án.NET, Công cụ và nội dung thú vị khác {#dot-net-projects-tools-and-other-fun stiff}

- [Sân chơi Nethereum](http://playground.nethereum.com/) - _Biên dịch, tạo và chạy đoạn mã Nethereum trong trình duyệt_
- [Mã Nethereum Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Mã Nethereum với UI trong Blazor_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _Trình khám phá blockchain .NET Wasm SPA và ví đơn giản_
- [Công cụ quy tắc kinh doanh của Wonka](https://docs.nethereum.com/en/latest/wonka/) - _Một công cụ quy tắc kinh doanh (cho cả nền tảng .NET và nền tảng Ethereum) vốn được định hướng siêu dữ liệu_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Ứng dụng .NET Core Ethereum cho Linux, Windows, MacOs_
- [Tiện ích của Eth](https://github.com/ethereum/eth-utils/) - _các chức năng tiện ích để làm việc với các cơ sở mã hóa liên quan đến Ethereum_
- [Chuỗi thử nghiệm](https://github.com/Nethereum/TestChains) - _Các chuỗi phát triển .NET được cấu hình sẵn để phản hồi nhanh (PoA)_

Tìm kiếm thêm nguồn lực? Truy cập vào [ethereum.org/developers.](/vi/developers/)

## Những người đóng góp cho cộng đồng .NET {#dot-net-community-contributors}

Tại Nethereum, chúng tôi chủ yếu tập trung vào [Gitter](https://gitter.im/Nethereum/Nethereum) nơi mọi người có thể hỏi/trả lời câu hỏi, nhận trợ giúp hoặc chỉ thư giãn. Hãy thoải mái làm PR hoặc mở một vấn đề trên [Kho lưu trữ Github của Nethereum](https://github.com/Nethereum), hoặc chỉ để duyệt qua nhiều dự án phụ/mẫu mà chúng tôi có.

Tại Nethermind, hãy liên lạc qua [Gitter](https://gitter.im/nethermindeth/nethermind). Đối với các PR hoặc vấn đề, hãy kiểm tra [Kho lưu trữ Github của Nethermind](https://github.com/NethermindEth/nethermind).

## Danh sách tổng hợp khác {#other-aggregated-lists}

[Trang web chính thức của Nethereum](https://nethereum.com/) [Trang web chính thức của Nethereum](https://nethermind.io/)
