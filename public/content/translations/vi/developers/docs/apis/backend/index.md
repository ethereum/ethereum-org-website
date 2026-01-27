---
title: Thư viên Backend API
description: Một giới thiệu về các API của client Ethereum cho phép bạn tương tác với blockchain từ ứng dụng của mình.
lang: vi
---

Để một ứng dụng phần mềm có thể tương tác với chuỗi khối Ethereum (tức là đọc dữ liệu chuỗi khối và/hoặc gửi giao dịch đến mạng), nó phải kết nối với một nút Ethereum.

Vì mục đích này, mọi client Ethereum đều triển khai đặc tả [JSON-RPC](/developers/docs/apis/json-rpc/), do đó có một bộ [phương thức](/developers/docs/apis/json-rpc/#json-rpc-methods) thống nhất mà các ứng dụng có thể tin cậy.

Nếu bạn muốn sử dụng một ngôn ngữ lập trình cụ thể để kết nối với nút Ethereum, có rất nhiều thư viện tiện lợi trong hệ sinh thái giúp việc này trở nên dễ dàng hơn rất nhiều. Với các thư viện này, các nhà phát triển có thể viết các phương thức trực quan, chỉ với một dòng mã để khởi tạo các yêu cầu JSON-RPC (dưới lớp ngoài) tương tác với Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Sẽ rất hữu ích nếu bạn tìm hiểu về [Ethereum stack](/developers/docs/ethereum-stack/) và [các client Ethereum](/developers/docs/nodes-and-clients/).

## Tại sao lại sử dụng thư viện {#why-use-a-library}

Những thư viện này giúp đơn giản hóa nhiều phần phức tạp khi bạn tương tác trực tiếp với một nút Ethereum. Chúng cũng cung cấp các hàm tiện ích (ví dụ: chuyển đổi ETH sang Gwei) để với tư cách là nhà phát triển, bạn có thể tốn ít thời gian hơn để xử lý những phức tạp của các client Ethereum và tập trung nhiều thời gian hơn vào chức năng độc đáo của ứng dụng.

## Các thư viện hiện có {#available-libraries}

### Dịch vụ cơ sở hạ tầng và nút {#infrastructure-and-node-services}

**Alchemy -** **_Nền tảng phát triển Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [Tài liệu](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_Nút dưới dạng Dịch vụ._**

- [All That Node.com](https://www.allthatnode.com/)
- [Tài liệu](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Các API phi tập trung cho Mạng chính Ethereum và các Mạng thử nghiệm._**

- [blastapi.io](https://blastapi.io/)
- [Tài liệu](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_Cung cấp các dịch vụ RPC hiệu quả và nhanh hơn_**

- [blockpi.io](https://blockpi.io/)
- [Tài liệu](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cổng kết nối Ethereum Cloudflare.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Block Explorer và Giao dịch API**

- [Tài liệu](https://docs.etherscan.io/)

**Blockscout - Trình phá khối mã nguồn mở**

- [Tài liệu](https://docs.blockscout.com/)

**GetBlock -** **_Chuỗi khối dưới dạng dịch vụ để phát triển Web3_**

- [GetBlock.io](https://getblock.io/)
- [Tài liệu](https://docs.getblock.io/)

**Infura -** **_API Ethereum dưới dạng một dịch vụ._**

- [infura.io](https://infura.io)
- [Tài liệu](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC -** **_Nhà cung cấp JSON-RPC EVM hiệu quả về chi phí_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Tài liệu](https://docs.noderpc.xyz/node-rpc)

**NOWNodes -** **_Các nút đầy đủ và Trình khám phá khối._**

- [NOWNodes.io](https://nownodes.io/)
- [Tài liệu](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_Cơ sở hạ tầng Chuỗi khối dưới dạng Dịch vụ._**

- [quicknode.com](https://quicknode.com)
- [Tài liệu](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Các API Ethereum và Ethereum Classic dưới dạng dịch vụ được cung cấp bởi phần mềm mã nguồn mở._**

- [rivet.cloud](https://rivet.cloud)
- [Tài liệu](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Các nút Ethereum tập trung vào tốc độ qua API JSON-RPC/WebSockets._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Tài liệu](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Công cụ phát triển {#development-tools}

**ethers-kt -** **_Thư viện Kotlin/Java/Android không đồng bộ, hiệu suất cao cho các chuỗi khối dựa trên EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Các ví dụ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_Một thư viện tích hợp .NET mã nguồn mở cho chuỗi khối._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Tài liệu](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Bộ công cụ Python -** **_Nhiều thư viện để tương tác với Ethereum qua Python._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_Nền tảng phát triển chuỗi khối tối ưu._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Tài liệu](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_Thư viện tích hợp Java/Android/Kotlin/Scala cho Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Tài liệu](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Các dịch vụ chuỗi khối {#blockchain-services}

**BlockCypher -** **_Các API Web của Ethereum._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Tài liệu](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_Cơ sở hạ tầng dữ liệu web3 toàn diện cho Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Tài liệu](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Các nút Ethereum linh hoạt và chuyên dụng dưới dạng dịch vụ._**

- [chainstack.com](https://chainstack.com)
- [Tài liệu](https://docs.chainstack.com/)
- [Tài liệu tham khảo API Ethereum](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_API Cơ sở hạ tầng Chuỗi khối._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [Tài liệu](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_Các dịch vụ API Web3 với Mạng chính Ethereum và các mạng thử nghiệm._**

- [DataHub](https://www.figment.io/)
- [Tài liệu](https://docs.figment.io/)

**Moralis -** **_Nhà cung cấp API EVM cấp doanh nghiệp._**

- [moralis.io](https://moralis.io)
- [Tài liệu](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Diễn đàn](https://forum.moralis.io/)

**NFTPort -** **_Các API Dữ liệu và Đúc của Ethereum._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Tài liệu](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_Nền tảng API chuỗi khối đa tiền mã hóa chung._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Tài liệu](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Cung cấp quyền truy cập API đơn giản và đáng tin cậy vào chuỗi khối Ethereum._**

- [Watchdata](https://watchdata.io/)
- [Tài liệu](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_Các API chuỗi khối nâng cao cho hơn 200 chuỗi._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Tài liệu](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)
- [Các khung phát triển](/developers/docs/frameworks/)

## Các hướng dẫn liên quan {#related-tutorials}

- [Thiết lập Web3js để sử dụng chuỗi khối Ethereum trong JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Hướng dẫn thiết lập web3.js trong dự án của bạn._
- [Gọi một hợp đồng thông minh từ JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Sử dụng token DAI, hãy xem cách gọi hàm hợp đồng bằng JavaScript._
