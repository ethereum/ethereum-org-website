---
title: "Ethereum dành cho nhà phát triển .NET"
description: "Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên .NET"
lang: vi
incomplete: true
---

<FeaturedText>Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên .NET</FeaturedText>

Sử dụng Ethereum để tạo các ứng dụng phi tập trung (hoặc "dapp") tận dụng những lợi ích của tiền mã hóa và công nghệ chuỗi khối. Các dapp này có thể đáng tin cậy, nghĩa là một khi được triển khai lên Ethereum, chúng sẽ luôn chạy đúng như được lập trình. Chúng có thể kiểm soát các tài sản kỹ thuật số để tạo ra các loại ứng dụng tài chính mới. Chúng có thể phi tập trung, nghĩa là không một thực thể hay cá nhân nào kiểm soát chúng và gần như không thể bị kiểm duyệt.

Xây dựng các ứng dụng phi tập trung trên Ethereum và tương tác với các hợp đồng thông minh bằng cách sử dụng các công cụ và ngôn ngữ từ ngăn xếp công nghệ của Microsoft - Hỗ trợ C#, # Visual Basic .NET, F#, trên các công cụ như VSCode và Visual Studio, trên toàn bộ .NET Framework/.NET Core/.NET Standard. Triển khai một chuỗi khối Ethereum trên Azure bằng Microsoft Azure Blockchain chỉ trong vài phút. Mang tình yêu dành cho .NET đến với Ethereum!

## Bắt đầu với các hợp đồng thông minh và ngôn ngữ Solidity {#getting-started-with-smart-contracts-and-the-solidity-language}

**Thực hiện những bước đầu tiên để tích hợp .NET với Ethereum**

Bạn cần một tài liệu hướng dẫn cơ bản hơn trước? Hãy xem [ethereum.org/learn](/learn/) hoặc [ethereum.org/developers](/developers/).

- [Giải thích về chuỗi khối](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [Hiểu về hợp đồng thông minh](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [Viết hợp đồng thông minh đầu tiên của bạn](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Tìm hiểu cách biên dịch và triển khai Solidity](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Tài liệu tham khảo và liên kết cho người mới bắt đầu {#beginner-references-and-links}

**Giới thiệu thư viện Nethereum và VS Code Solidity**

- [Nethereum, Bắt đầu](https://docs.nethereum.com/docs/getting-started/welcome/)
- [Cài đặt VS Code Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)
- [Quy trình làm việc của nhà phát triển .NET để tạo và gọi các hợp đồng thông minh Ethereum](https://medium.com/coinmonks/a-net-developers-workflow-for-creating-and-calling-ethereum-smart-contracts-44714f191db2)
- [Tích hợp hợp đồng thông minh với Nethereum](https://kauri.io/#collections/Getting%20Started/smart-contracts-integration-with-nethereum/#smart-contracts-integration-with-nethereumm)
- [Giao tiếp giữa .NET và các hợp đồng thông minh chuỗi khối Ethereum bằng Nethereum](https://medium.com/my-blockchain-development-daily-journey/interfacing-net-and-ethereum-blockchain-smart-contracts-with-nethereum-2fa3729ac933), cũng có [phiên bản tiếng Trung](https://medium.com/my-blockchain-development-daily-journey/%E4%BD%BF%E7%94%A8nethereum%E9%80%A3%E6%8E%A5-net%E5%92%8C%E4%BB%A5%E5%A4%AA%E7%B6%B2%E5%8D%80%E5%A1%8A%E9%8F%88%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-4a96d35ad1e1)
- [Nethereum - Thư viện tích hợp .NET mã nguồn mở cho chuỗi khối](https://kauri.io/#collections/a%20hackathon%20survival%20guide/nethereum-an-open-source-.net-integration-library/)
- [Ghi các giao dịch Ethereum vào cơ sở dữ liệu SQL bằng Nethereum](https://medium.com/coinmonks/writing-ethereum-transactions-to-sql-database-using-nethereum-fd94e0e4fa36)
- [Xem cách dễ dàng triển khai các hợp đồng thông minh Ethereum bằng C# và VisualStudio](https://koukia.ca/deploy-ethereum-smart-contracts-using-c-and-visualstudio-5be188ae928c)

**Bạn muốn bỏ qua phần thiết lập lúc này và chuyển thẳng đến các ví dụ?**

- [Playground](https://playground.nethereum.com/) - Tương tác với Ethereum và tìm hiểu cách sử dụng Nethereum thông qua trình duyệt.
  - [Truy vấn số dư tài khoản](https://docs.nethereum.com/docs/core-foundation/guide-query-balance)
  - [Truy vấn số dư hợp đồng thông minh ERC-20](https://docs.nethereum.com/docs/smart-contracts/erc20)
  - [Chuyển ether đến một tài khoản](https://docs.nethereum.com/docs/core-foundation/guide-send-eth)
  - ... Và nhiều hơn nữa!

## Các bài viết trung cấp {#intermediate-articles}

- [Nethereum Bắt đầu & Dự án đầu tiên](https://docs.nethereum.com/docs/getting-started/first-project)
- [Triển khai các chuỗi thử nghiệm phát triển của riêng bạn](https://github.com/Nethereum/Testchains)
- [Plugin Codegen của VSCode cho Solidity](https://docs.nethereum.com/docs/aspire-templates/guide-codegen)
- [Unity và Ethereum: Tại sao và Như thế nào](https://www.raywenderlich.com/5509-unity-and-ethereum-why-and-how)
- [Tạo Web API ASP.NET Core cho các dapp Ethereum](https://tech-mint.com/blockchain/create-asp-net-core-web-api-for-ethereum-dapps/)
- [Sử dụng Nethereum Web3 để triển khai hệ thống theo dõi chuỗi cung ứng](http://blog.pomiager.com/post/using-nethereum-web3-to-implement-a-supply-chain-traking-system4)
- [Xử lý chuỗi khối Nethereum](https://docs.nethereum.com/docs/data-and-indexing/guide-blockchain-processing)
- [Truyền phát Websocket Nethereum](https://nethereum.readthedocs.io/en/latest/nethereum-subscriptions-streaming/)
- [Kaleido và Nethereum](https://kaleido.io/kaleido-and-nethereum/)
- [Quorum và Nethereum](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Quorum/README.md)

## Các mẫu sử dụng nâng cao {#advanced-use-patterns}

- [Azure Key Vault và Nethereum](https://github.com/Azure-Samples/bc-community-samples/tree/master/akv-nethereum)
- [Nethereum.DappHybrid](https://github.com/Nethereum/Nethereum.DappHybrid)

## Các dự án, công cụ .NET và những thứ thú vị khác {#dot-net-projects-tools-and-other-fun-stuff}

- [Nethereum Playground](https://playground.nethereum.com/) - _Biên dịch, tạo và chạy các đoạn mã Nethereum trong trình duyệt_
- [Nethereum Codegen Blazor](https://github.com/Nethereum/Nethereum.CodeGen.Blazor) - _Codegen Nethereum với giao diện người dùng trong Blazor_
- [Nethereum Blazor](https://github.com/Nethereum/NethereumBlazor) - _Một trình khám phá chuỗi khối nhẹ và ví đơn giản dạng SPA Wasm .NET_
- [Nethermind](https://github.com/NethermindEth/nethermind) - _Một ứng dụng khách Ethereum .NET Core cho Linux, Windows, MacOS_
- [eth-utils](https://github.com/ethereum/eth-utils/) - _các hàm tiện ích để làm việc với các cơ sở mã liên quan đến Ethereum_
- [TestChains](https://github.com/Nethereum/TestChains) - _Các chuỗi phát triển .NET được cấu hình sẵn để phản hồi nhanh (bằng chứng ủy quyền (PoA))_

Bạn đang tìm kiếm thêm tài nguyên? Hãy xem [ethereum.org/developers](/developers/).

## Những người đóng góp trong cộng đồng .NET {#dot-net-community-contributors}

Tại Nethereum, chúng tôi chủ yếu trò chuyện trên [Gitter](https://gitter.im/Nethereum/Nethereum), nơi mọi người đều được hoan nghênh để hỏi/đáp, nhận trợ giúp hoặc chỉ để thư giãn. Đừng ngần ngại tạo PR hoặc mở một vấn đề trên [kho lưu trữ GitHub của Nethereum](https://github.com/Nethereum), hoặc chỉ cần duyệt qua nhiều dự án phụ/ví dụ mà chúng tôi có. Bạn cũng có thể tìm thấy chúng tôi trên [Discord](https://discord.gg/jQPrR58FxX)!

Nếu bạn mới làm quen với Nethermind và cần trợ giúp để bắt đầu, hãy tham gia [Discord](https://discord.gg/PaCMRFdvWT) của chúng tôi. Các nhà phát triển của chúng tôi luôn sẵn sàng trả lời các câu hỏi của bạn. Đừng ngần ngại mở một PR hoặc nêu bất kỳ vấn đề nào trên [kho lưu trữ GitHub của Nethermind](https://github.com/NethermindEth/nethermind).

## Các danh sách tổng hợp khác {#other-aggregated-lists}

[Trang web chính thức của Nethereum](https://nethereum.com/)  
[Trang web chính thức của Nethermind](https://nethermind.io/)