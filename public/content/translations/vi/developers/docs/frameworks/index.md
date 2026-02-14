---
title: "Framework phát triển Dapp"
description: "Khám phá những lợi thế của các khung phát triển và so sánh các tùy chọn hiện có."
lang: vi
---

## Giới thiệu về các framework {#introduction-to-frameworks}

Việc xây dựng một ứng dụng phi tập trung hoàn chỉnh đòi hỏi
những thành phần công nghệ khác nhau. Các framework phần mềm bao gồm nhiều tính năng cần thiết hoặc cung cấp các hệ thống plugin dễ dàng để lựa chọn các công cụ mà bạn mong muốn.

Các framework đi kèm với nhiều chức năng sẵn có, chẳng hạn như :

- Các tính năng để tạo ra một phiên bản blockchain cục bộ.
- Các tiện ích để biên dịch và kiểm tra hợp đồng thông minh của bạn.
- Các tiện ích bổ sung phát triển client để xây dựng ứng dụng hướng tới người dùng của bạn
  trong cùng một dự án/kho lưu trữ.
- Cấu hình để kết nối với các mạng Ethereum và triển khai
  các hợp đồng, cho dù đó là một phiên bản đang chạy cục bộ, hay một trong
  các mạng công khai của Ethereum.
- Phân phối ứng dụng phi tập trung - tích hợp với các tùy chọn lưu trữ
  như IPFS.

## Điều kiện tiên quyết {#prerequisites}

Trước khi đi sâu vào các framework, chúng tôi khuyên bạn nên đọc qua phần giới thiệu của chúng tôi về [các ứng dụng phi tập trung](/developers/docs/dapps/) và [ngăn xếp Ethereum](/developers/docs/ethereum-stack/).

## Các framework có sẵn {#available-frameworks}

**Foundry** - **_Foundry là một bộ công cụ cực nhanh, di động và có thể mô-đun hóa để phát triển ứng dụng Ethereum_**

- [Cài đặt Foundry](https://book.getfoundry.sh/)
- [Sách về Foundry](https://book.getfoundry.sh/)
- [Trò chuyện cộng đồng Foundry trên Telegram](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_Môi trường phát triển Ethereum dành cho các chuyên gia._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Công cụ phát triển hợp đồng thông minh dành cho các Pythonista, Nhà khoa học dữ liệu và Chuyên gia bảo mật._**

- [Tài liệu](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_Một nền tảng để phát triển các ứng dụng chuỗi khối trên JVM._**

- [Trang chủ](https://www.web3labs.com/web3j-sdk)
- [Tài liệu](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_Thư viện Kotlin/Java/Android không đồng bộ, hiệu suất cao cho các chuỗi khối dựa trên EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Các ví dụ](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_Tạo các ứng dụng chạy trên Ethereum chỉ bằng một lệnh. Có nhiều lựa chọn về các khung giao diện người dùng (UI) và mẫu DeFi để chọn lựa._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [Các mẫu](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + các thành phần và hook của React cho web3: mọi thứ bạn cần để bắt đầu xây dựng các ứng dụng phi tập trung được hỗ trợ bởi các hợp đồng thông minh._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Nền tảng phát triển Web3 cho phép các nhà phát triển chuỗi khối xây dựng, kiểm thử, gỡ lỗi, giám sát và vận hành các hợp đồng thông minh và cải thiện UX của ứng dụng phi tập trung._**

- [Trang web](https://tenderly.co/)
- [Tài liệu](https://docs.tenderly.co/)

**The Graph -** **_The Graph để truy vấn dữ liệu chuỗi khối một cách hiệu quả._**

- [Trang web](https://thegraph.com/)
- [Hướng dẫn](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Nền tảng phát triển Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Nền tảng phát triển Ethereum._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_Xây dựng các ứng dụng web3 có thể tương tác với các hợp đồng thông minh của bạn bằng các SDK và CLI mạnh mẽ của chúng tôi._**

- [Tài liệu](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Nền tảng phát triển Web3 (Ethereum và các chuỗi khác)._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_Nền tảng phát triển web3 cấp doanh nghiệp, cho phép bạn xây dựng các ứng dụng NFT trên tất cả các chuỗi lớn, các chuỗi EVM (và các chuỗi khác)._**

- [Trang web](https://www.crossmint.com)
- [Tài liệu tham khảo](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Môi trường phát triển và framework kiểm thử dựa trên Python._**

- [Tài liệu](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie hiện tại không được bảo trì**

**OpenZeppelin SDK -** **_Bộ công cụ Hợp đồng thông minh Tối thượng: Một bộ công cụ giúp bạn phát triển, biên dịch, nâng cấp, triển khai và tương tác với các hợp đồng thông minh._**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Diễn đàn cộng đồng](https://forum.openzeppelin.com/c/support/17)
- **Việc phát triển SDK OpenZeppelin đã kết thúc**

**Catapulta -** **_Công cụ triển khai hợp đồng thông minh đa chuỗi, tự động hóa việc xác minh trong các trình khám phá khối, theo dõi các hợp đồng thông minh đã triển khai và chia sẻ báo cáo triển khai, dạng plug-and-play cho các dự án Foundry và Hardhat._**

- [Trang web](https://catapulta.sh/)
- [Tài liệu](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**GoldRush (do Covalent cung cấp) -** **_GoldRush cung cấp bộ API dữ liệu chuỗi khối toàn diện nhất cho các nhà phát triển, nhà phân tích và doanh nghiệp. Cho dù bạn đang xây dựng bảng điều khiển DeFi, ví, bot giao dịch, tác tử AI hay nền tảng tuân thủ, các API dữ liệu đều cung cấp quyền truy cập nhanh, chính xác và thân thiện với nhà phát triển vào dữ liệu trên chuỗi thiết yếu mà bạn cần_**

- [Trang web](https://goldrush.dev/)
- [Tài liệu](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_Framework Python tất cả trong một để kiểm thử hợp đồng, fuzzing, triển khai, quét lỗ hổng và điều hướng mã._**

- [Trang chủ](https://getwake.io/)
- [Tài liệu](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [Tiện ích mở rộng VS Code](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_Framework mã nguồn mở, dạng mô-đun và bất khả tri, giúp các nhà phát triển ứng dụng phi tập trung dễ dàng xây dựng danh tính phi tập trung và thông tin xác thực có thể kiểm chứng trong các ứng dụng của họ._**

- [Trang chủ](https://veramo.io/)
- [Tài liệu](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [Gói NPM](https://www.npmjs.com/package/@veramo/core)

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Thiết lập môi trường phát triển cục bộ](/developers/local-environment/)
