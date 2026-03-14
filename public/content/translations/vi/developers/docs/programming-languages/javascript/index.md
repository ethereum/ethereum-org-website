---
title: "Ethereum cho nhà phát triển JavaScript"
description: "Tìm hiểu cách phát triển Ethereum bằng cách sử dụng các dự án và công cụ dựa trên cơ sở JavaScript."
lang: vi
---

Java script là một ngôn ngữ nổi tiếng trong mạng lưới Ethereum. Trên thực tế, có một [nhóm](https://github.com/ethereumjs) chuyên mang càng nhiều thành phần của Ethereum sang JavaScript càng tốt.

Có nhiều cơ hội để viết JavaScript (hoặc một ngôn ngữ tương tự) ở [tất cả các cấp độ của ngăn xếp](/developers/docs/ethereum-stack/).

## Tương tác với Ethereum {#interact-with-ethereum}

### Thư viện API JavaScript {#javascript-api-libraries}

Nếu bạn muốn viết JavaScript để truy vấn chuỗi khối, gửi giao dịch và hơn thế nữa, cách thuận tiện nhất để làm điều này là sử dụng [thư viện API JavaScript](/developers/docs/apis/javascript/). Các API này cho phép các nhà phát triển dễ dàng tương tác với các [nút trong mạng Ethereum](/developers/docs/nodes-and-clients/).

Bạn có thể sử dụng những thư viện này để tương tác với hợp đồng thông minh trên Ethereum, vì vậy có thể xây dựng một ứng dụng phi tập trung dapp mà bạn chỉ cần sử dụng JavaScript để tương tác với các hợp đồng đã tồn tại.

**Hãy xem qua**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _bao gồm việc triển khai ví Ethereum và các tiện ích trong JavaScript và TypeScript._
- [viem](https://viem.sh) – _một Giao diện TypeScript cho Ethereum, cung cấp các yếu tố nguyên thuỷ không trạng thái cấp thấp để tương tác với Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _một siêu thư viện TypeScript với bộ nhớ đệm, hook và các bản mô phỏng thử nghiệm tích hợp sẵn để phát triển Ethereum một cách dễ dàng trên các thư viện web3._

### Hợp đồng thông minh {#smart-contracts}

Nếu bạn là một nhà phát triển JavaScript và muốn tự viết hợp đồng thông minh, bạn có thể muốn làm quen với [Solidity](https://solidity.readthedocs.io). Đây là ngôn ngữ hợp đồng thông minh phổ biến nhất và nó có cú pháp giống với JavaScript, điều này có thể giúp việc học trở nên dễ dàng hơn.

Thông tin thêm về [hợp đồng thông minh](/developers/docs/smart-contracts/).

## Tìm hiểu về giao thức {#understand-the-protocol}

### Máy ảo Ethereum {#the-ethereum-virtual-machine}

Có một bản triển khai JavaScript của [máy ảo Ethereum](/developers/docs/evm/). Nó hỗ trợ các quy tắc fork mới nhất. Quy tắc phân nhánh đề cập đến những thay đổi được thực hiện đối với EVM do kết quả của các nâng cấp theo kế hoạch.

Nó được chia thành nhiều gói JavaScript khác nhau mà bạn có thể xem qua để hiểu rõ hơn:

- Tài khoản
- Khối
- Chuỗi khối tự nó
- Các giao dịch
- Thêm nữa...

Điều này sẽ giúp bạn hiểu những thứ như "cấu trúc dữ liệu của một tài khoản là gì?".

Nếu bạn thích đọc mã, đoạn mã JavaScript này có thể là một sự thay thế tuyệt vời cho việc đọc tài liệu của chúng tôi.

**Hãy xem qua EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nút và máy khách {#nodes-and-clients}

Một client Ethereumjs đang được phát triển tích cực cho phép bạn đào sâu vào cách các client Ethereum hoạt động bằng một ngôn ngữ bạn hiểu; JavaScript!

**Hãy xem qua máy khách**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Các dự án khác {#other-projects}

Ngoài ra còn có rất nhiều điều hoạt động khác đang diễn ra trong lĩnh vực Ethereum JavaScript, bao gồm:

- các thư viện tiện ích ví.
- các công cụ để tạo, nhập và xuất khoá Ethereum.
- một bản triển khai của `merkle-patricia-tree` – một cấu trúc dữ liệu được nêu trong sách vàng Ethereum.

Tìm hiểu sâu hơn về bất cứ điều gì bạn quan tâm nhất tại [repo EthereumJS](https://github.com/ethereumjs)

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
