---
title: Triển khai hợp đồng thông minh
description: Hãy học cách triển khai hợp đồng thông minh lên các mạng Ethereum, bao gồm các yêu cầu trước, công cụ và các bước triển khai.
lang: vi
---

Bạn cần phải triển khai hợp đồng thông minh của bạn để nó có thể khả thi cho tất cả người dùng trên một mạng Ethereum.

Để triển khai một hợp đồng thông minh, bạn chỉ cần gửi một giao dịch Ethereum có chứa mã đã được biên dịch của hợp đồng thông minh đó mà không chỉ định bất kỳ người nhận nào.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu về [mạng Ethereum](/developers/docs/networks/), [các giao dịch](/developers/docs/transactions/) và [cấu trúc của hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) trước khi triển khai hợp đồng thông minh.

Việc triển khai một hợp đồng cũng tốn ether (ETH) vì chúng được lưu trữ trên chuỗi khối, vì vậy bạn nên làm quen với [gas và phí](/developers/docs/gas/) trên Ethereum.

Cuối cùng, bạn sẽ cần phải biên dịch hợp đồng của mình trước khi triển khai, vì vậy hãy chắc chắn rằng bạn đã đọc về [việc biên dịch các hợp đồng thông minh](/developers/docs/smart-contracts/compiling/).

## Cách triển khai một hợp đồng thông minh {#how-to-deploy-a-smart-contract}

### Những gì bạn sẽ cần {#what-youll-need}

- Mã bytecode của hợp đồng của bạn – mã này được tạo ra thông qua [quá trình biên dịch](/developers/docs/smart-contracts/compiling/)
- ETH cho Gas - bạn sẽ thiết lập giới hạn gas của bạn như các giao dịch khác, vì vậy hãy lưu ý rằng sự triển khai hợp đồng cần rất nhiều gas hơn là một giao dịch ETH đơn giản
- một tập lệnh triển khai hoặc plugin
- quyền truy cập vào một [nút Ethereum](/developers/docs/nodes-and-clients/), bằng cách tự chạy nút của riêng bạn, kết nối với một nút công khai hoặc thông qua khóa API bằng cách sử dụng một [dịch vụ nút](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Các bước để triển khai một hợp đồng thông minh {#steps-to-deploy}

Các bước cụ thể sẽ phụ thuộc vào sự phát triển framework được đề cập. Ví dụ, bạn có thể xem qua [tài liệu của Hardhat về việc triển khai hợp đồng của bạn](https://hardhat.org/docs/tutorial/deploying) hoặc [tài liệu của Foundry về việc triển khai và xác minh một hợp đồng thông minh](https://book.getfoundry.sh/forge/deploying). Sau khi được triển khai, hợp đồng của bạn sẽ có một địa chỉ Ethereum giống như các [tài khoản](/developers/docs/accounts/) khác và có thể được xác minh bằng cách sử dụng [các công cụ xác minh mã nguồn](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Các công cụ liên quan {#related-tools}

**Remix - _Remix IDE cho phép phát triển, triển khai và quản lý các hợp đồng thông minh cho các chuỗi khối giống như Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Nền tảng phát triển Web3 cung cấp các tính năng gỡ lỗi, theo dõi và các khối xây dựng cơ sở hạ tầng cho việc phát triển, thử nghiệm, giám sát và vận hành các hợp đồng thông minh_**

- [tenderly.co](https://tenderly.co/)
- [Tài liệu](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Một môi trường phát triển để biên dịch, triển khai, thử nghiệm và gỡ lỗi phần mềm Ethereum của bạn_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Tài liệu về việc triển khai hợp đồng của bạn](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Dễ dàng triển khai bất kỳ hợp đồng nào tới bất kỳ chuỗi tương thích EVM nào, bằng một lệnh duy nhất_**

- [Tài liệu tham khảo](https://portal.thirdweb.com/deploy/)

**Crossmint - _Nền tảng phát triển Web3 cấp doanh nghiệp để triển khai hợp đồng thông minh, hỗ trợ thanh toán bằng thẻ tín dụng và đa chuỗi, đồng thời sử dụng API để tạo, phân phối, bán, lưu trữ và chỉnh sửa NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Tài liệu tham khảo](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Các hướng dẫn liên quan {#related-tutorials}

- [Triển khai hợp đồng thông minh đầu tiên của bạn](/developers/tutorials/deploying-your-first-smart-contract/) _– Lời giới thiệu về việc triển khai hợp đồng thông minh đầu tiên của bạn trên một mạng thử nghiệm Ethereum._
- [Hello World | hướng dẫn về hợp đồng thông minh](/developers/tutorials/hello-world-smart-contract/) _– Một hướng dẫn dễ thực hiện để tạo và triển khai một hợp đồng thông minh cơ bản trên Ethereum._
- [Tương tác với các hợp đồng khác từ Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Cách triển khai một hợp đồng thông minh từ một hợp đồng hiện có và tương tác với nó._
- [Cách thu nhỏ kích thước hợp đồng của bạn](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Cách giảm kích thước hợp đồng của bạn để giữ nó không vượt quá giới hạn và tiết kiệm gas_

## Đọc thêm {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Triển khai hợp đồng của bạn với Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Các khung phát triển](/developers/docs/frameworks/)
- [Chạy một nút Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nút dưới dạng dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service)
