---
title: "Ethereum dành cho nhà phát triển JavaScript"
description: "Tìm hiểu cách phát triển cho Ethereum bằng cách sử dụng các dự án và công cụ dựa trên JavaScript."
lang: vi
---

JavaScript là một trong những ngôn ngữ phổ biến nhất trong hệ sinh thái Ethereum, với các bản triển khai bằng JavaScript và TypeScript cho mọi thứ, từ các nguyên thủy Giao thức cốt lõi cho đến một ứng dụng khách đồng thuận cấp sản xuất.

Có nhiều cơ hội để viết JavaScript (hoặc ngôn ngữ tương tự) ở [mọi cấp độ của ngăn xếp](/developers/docs/ethereum-stack/).

## Tương tác với Ethereum {#interact-with-ethereum}

### Thư viện API JavaScript {#javascript-api-libraries}

Nếu bạn muốn viết JavaScript để truy vấn Chuỗi khối, gửi giao dịch và hơn thế nữa, cách thuận tiện nhất để làm điều này là sử dụng một [Thư viện API JavaScript](/developers/docs/apis/javascript/). Các API này cho phép các nhà phát triển dễ dàng tương tác với các [nút trong mạng lưới Ethereum](/developers/docs/nodes-and-clients/).

Bạn có thể sử dụng các Thư viện này để tương tác với các hợp đồng thông minh trên Ethereum, do đó bạn có thể xây dựng một ứng dụng phi tập trung (dapp) mà chỉ cần sử dụng JavaScript để tương tác với các hợp đồng đã có sẵn.

**Tham khảo**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _bao gồm việc triển khai Ví Ethereum và các tiện ích bằng JavaScript và TypeScript._
- [viem](https://viem.sh) – _một Giao diện TypeScript cho Ethereum cung cấp các nguyên thủy không trạng thái cấp thấp để tương tác với Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _một siêu Thư viện TypeScript với bộ nhớ đệm, hook và mock kiểm thử được tích hợp sẵn để phát triển Ethereum dễ dàng trên các Thư viện Web3._

### Hợp đồng thông minh {#smart-contracts}

Nếu bạn là một nhà phát triển JavaScript và muốn tự viết hợp đồng thông minh của riêng mình, bạn có thể muốn làm quen với [Solidity](https://solidity.readthedocs.io). Đây là ngôn ngữ hợp đồng thông minh phổ biến nhất và có cú pháp tương tự như JavaScript, điều này có thể giúp bạn học dễ dàng hơn.

Tìm hiểu thêm về [hợp đồng thông minh](/developers/docs/smart-contracts/).

## Hiểu về Giao thức {#understand-the-protocol}

### Máy ảo Ethereum {#the-ethereum-virtual-machine}

Có một bản triển khai bằng JavaScript của [máy ảo Ethereum](/developers/docs/evm/). Nó hỗ trợ các quy tắc Phân nhánh mới nhất. Các quy tắc Phân nhánh đề cập đến những thay đổi được thực hiện đối với EVM do các bản nâng cấp đã được lên kế hoạch.

Nó được chia thành nhiều gói JavaScript khác nhau mà bạn có thể tham khảo để hiểu rõ hơn:

- Tài khoản
- Khối
- Bản thân Chuỗi khối
- Giao dịch
- Và nhiều hơn nữa...

Điều này sẽ giúp bạn hiểu những điều như "cấu trúc dữ liệu của một Tài khoản là gì?".

Nếu bạn thích đọc mã nguồn, JavaScript này có thể là một giải pháp thay thế tuyệt vời cho việc đọc qua tài liệu của chúng tôi.

**Tham khảo EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Các nút và ứng dụng khách {#nodes-and-clients}

[Lodestar](https://lodestar.chainsafe.io/) là một ứng dụng khách đồng thuận sẵn sàng cho sản xuất được viết bằng TypeScript và được duy trì bởi ChainSafe. Nó bao gồm một nút Beacon và ứng dụng khách trình xác thực, và là một nơi tốt để xem cách đồng thuận Bằng chứng cổ phần của Ethereum hoạt động bằng một ngôn ngữ mà bạn biết.

**Tìm hiểu Lodestar**  
[`ChainSafe/lodestar`](https://github.com/ChainSafe/lodestar)

Về phía thực thi, ứng dụng khách EthereumJS đã bị ngừng sử dụng và lưu trữ, nhưng mã nguồn của nó vẫn có sẵn để khám phá cách một ứng dụng khách Ethereum hoạt động bằng JavaScript.

**Tìm hiểu ứng dụng khách đã lưu trữ**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/archive/client)

## Các dự án khác {#other-projects}

Cũng có rất nhiều điều khác đang diễn ra trong thế giới JavaScript của Ethereum, bao gồm:

- các Thư viện tiện ích Ví.
- các công cụ để tạo, nhập và xuất khóa Ethereum.
- một bản triển khai của `merkle-patricia-tree` – một cấu trúc dữ liệu được phác thảo trong sách vàng Ethereum.

Hãy tìm hiểu sâu vào bất cứ điều gì bạn quan tâm nhất tại [kho lưu trữ EthereumJS](https://github.com/ethereumjs)

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_
