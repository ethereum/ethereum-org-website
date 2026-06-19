---
title: "Triển khai hợp đồng thông minh"
description: "Tìm hiểu cách triển khai hợp đồng thông minh lên các mạng lưới Ethereum, bao gồm các điều kiện tiên quyết, công cụ và các bước triển khai."
lang: vi
---

Bạn cần triển khai hợp đồng thông minh của mình để nó có sẵn cho người dùng của một mạng lưới Ethereum.

Để triển khai một hợp đồng thông minh, bạn chỉ cần gửi một giao dịch Ethereum chứa mã đã biên dịch của hợp đồng thông minh mà không cần chỉ định bất kỳ người nhận nào.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu về [các mạng lưới Ethereum](/developers/docs/networks/), [giao dịch](/developers/docs/transactions/) và [cấu trúc của hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) trước khi triển khai hợp đồng thông minh.

Việc triển khai một hợp đồng cũng tốn ether (ETH) vì chúng được lưu trữ trên Chuỗi khối, vì vậy bạn nên làm quen với [Gas và phí](/developers/docs/gas/) trên Ethereum.

Cuối cùng, bạn sẽ cần biên dịch hợp đồng của mình trước khi triển khai nó, vì vậy hãy đảm bảo bạn đã đọc về [biên dịch hợp đồng thông minh](/developers/docs/smart-contracts/compiling/).

## Cách triển khai một hợp đồng thông minh {#how-to-deploy-a-smart-contract}

### Những gì bạn cần {#what-youll-need}

- Mã byte của hợp đồng của bạn – mã này được tạo ra thông qua quá trình [biên dịch](/developers/docs/smart-contracts/compiling/)
- ETH cho Gas – bạn sẽ thiết lập giới hạn gas của mình giống như các giao dịch khác, vì vậy hãy lưu ý rằng việc triển khai hợp đồng cần nhiều Gas hơn so với một giao dịch chuyển ETH đơn giản
- một tập lệnh hoặc plugin triển khai
- quyền truy cập vào một [nút Ethereum](/developers/docs/nodes-and-clients/), bằng cách tự chạy nút của riêng bạn, kết nối với một nút công khai hoặc thông qua một khóa API sử dụng một [dịch vụ nút](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Các bước để triển khai một hợp đồng thông minh {#steps-to-deploy}

Các bước cụ thể liên quan sẽ phụ thuộc vào framework phát triển đang được sử dụng. Ví dụ: bạn có thể xem [tài liệu của Hardhat về việc triển khai hợp đồng của bạn](https://hardhat.org/docs/tutorial/deploying) hoặc [tài liệu của Foundry về việc triển khai và xác minh một hợp đồng thông minh](https://book.getfoundry.sh/forge/deploying). Sau khi được triển khai, hợp đồng của bạn sẽ có một Địa chỉ Ethereum giống như các [tài khoản](/developers/docs/accounts/) khác và có thể được xác minh bằng cách sử dụng [các công cụ xác minh mã nguồn](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Các công cụ liên quan {#related-tools}

**Remix - _Remix IDE cho phép phát triển, triển khai và quản trị các hợp đồng thông minh cho các Chuỗi khối giống Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Nền tảng phát triển Web3 cung cấp các khối xây dựng cơ sở hạ tầng, khả năng quan sát và gỡ lỗi để phát triển, thử nghiệm, giám sát và vận hành các hợp đồng thông minh_**

- [tenderly.co](https://tenderly.co/)
- [Tài liệu](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Một môi trường phát triển để biên dịch, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Tài liệu về việc triển khai hợp đồng của bạn](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Dễ dàng triển khai bất kỳ hợp đồng nào lên bất kỳ Chuỗi tương thích EVM nào, chỉ bằng một lệnh duy nhất_**

- [Tài liệu](https://portal.thirdweb.com/deploy/)

**Crossmint - _Nền tảng phát triển Web3 cấp doanh nghiệp để triển khai các hợp đồng thông minh, cho phép thanh toán bằng thẻ tín dụng và thanh toán chéo Chuỗi, đồng thời sử dụng các API để tạo, phân phối, bán, lưu trữ và chỉnh sửa NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Tài liệu](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Các hướng dẫn liên quan {#related-tutorials}

- [Triển khai hợp đồng thông minh đầu tiên của bạn](/developers/tutorials/deploying-your-first-smart-contract/) _– Giới thiệu về việc triển khai hợp đồng thông minh đầu tiên của bạn trên một mạng lưới thử nghiệm Ethereum._
- [Hello World | hướng dẫn hợp đồng thông minh](/developers/tutorials/hello-world-smart-contract/) _– Một hướng dẫn dễ làm theo để tạo và triển khai một hợp đồng thông minh cơ bản trên Ethereum._
- [Tương tác với các hợp đồng khác từ Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó._
- [Cách thu nhỏ kích thước hợp đồng của bạn](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cách giảm kích thước hợp đồng của bạn để giữ nó dưới mức giới hạn và tiết kiệm Gas_

## Đọc thêm {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Triển khai các hợp đồng của bạn với Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Các framework phát triển](/developers/docs/frameworks/)
- [Chạy một nút Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nút dưới dạng dịch vụ (Nodes-as-a-service)](/developers/docs/nodes-and-clients/nodes-as-a-service)