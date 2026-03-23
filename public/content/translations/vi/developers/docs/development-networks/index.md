---
title: "Mạng lưới phát triển"
description: "Tổng quan về mạng lưới phát triển và các công cụ sẵn có để giúp xây dựng các ứng dụng Ethereum."
lang: vi
---

Khi xây dựng một ứng dụng Ethereum với hợp đồng thông minh, bạn sẽ muốn chạy nó trên mạng cục bộ để xem nó hoạt động như thế nào trước khi triển khai.

Tương tự như cách bạn có thể chạy một máy chủ cục bộ trên máy tính của mình để phát triển web, bạn có thể sử dụng mạng phát triển để tạo một phiên bản chuỗi khối cục bộ nhằm kiểm tra ứng dụng phi tập trung của mình. Các mạng phát triển Ethereum này cung cấp các tính năng cho phép lặp lại nhanh hơn nhiều so với một mạng thử nghiệm công khai (ví dụ: bạn không cần phải xoay sở để có được ETH từ một vòi mạng thử nghiệm).

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu những [kiến thức cơ bản về ngăn xếp Ethereum](/developers/docs/ethereum-stack/) và [mạng Ethereum](/developers/docs/networks/) trước khi đi sâu vào mạng phát triển.

## Mạng lưới phát triển là gì? {#what-is-a-development-network}

Mạng phát triển thực chất là các máy khách Ethereum (các bản triển khai của Ethereum) được thiết kế đặc biệt cho việc phát triển cục bộ.

**Tại sao không chỉ chạy một nút Ethereum tiêu chuẩn cục bộ?**

Bạn _có thể_ [chạy một nút](/developers/docs/nodes-and-clients/#running-your-own-node) nhưng vì các mạng phát triển được xây dựng có mục đích để phát triển, chúng thường đi kèm với các tính năng tiện lợi như:

- Tạo dữ liệu một cách tất định cho chuỗi khối cục bộ của bạn (ví dụ: các tài khoản có số dư ETH).
- Tạo khối ngay lập tức với mỗi giao dịch nhận được, theo thứ tự và không có độ trễ
- Chức năng gỡ lỗi và ghi nhật ký nâng cao

## Các công cụ có sẵn {#available-projects}

**Lưu ý**: Hầu hết [các khung phát triển](/developers/docs/frameworks/) đều bao gồm một mạng phát triển tích hợp sẵn. Chúng tôi khuyên bạn nên bắt đầu với một khung để [thiết lập môi trường phát triển cục bộ của bạn](/developers/local-environment/).

### Mạng Hardhat {#hardhat-network}

Một mạng Ethereum cục bộ được thiết kế để phát triển. Nó cho phép bạn triển khai các hợp đồng, chạy thử nghiệm và gỡ lỗi mã của mình.

Mạng Hardhat được tích hợp sẵn với Hardhat, một môi trường phát triển Ethereum dành cho các chuyên gia.

- [Trang web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Các Chuỗi Hải Đăng cục bộ {#local-beacon-chains}

Một số máy khách đồng thuận có các công cụ tích hợp sẵn để khởi chạy các Chuỗi Hải Đăng cục bộ cho mục đích thử nghiệm. Hướng dẫn cho Lighthouse, Nimbus và Lodestar có sẵn:

- [Mạng thử nghiệm cục bộ sử dụng Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Mạng thử nghiệm cục bộ sử dụng Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Các chuỗi thử nghiệm Ethereum công khai {#public-beacon-testchains}

Ngoài ra còn có hai bản triển khai thử nghiệm công khai được duy trì của Ethereum: Sepolia và Hoodi. Mạng thử nghiệm được đề xuất với sự hỗ trợ dài hạn là Hoodi, mà bất kỳ ai cũng có thể tự do xác thực. Sepolia sử dụng một bộ trình xác thực được cấp phép, có nghĩa là không có quyền truy cập chung cho các trình xác thực mới trên mạng thử nghiệm này.

- [Launchpad Cổ phần Hoodi](https://hoodi.launchpad.ethereum.org/)

### Gói Kurtosis Ethereum {#kurtosis}

Kurtosis là một hệ thống xây dựng cho các môi trường thử nghiệm đa vùng chứa, cho phép các nhà phát triển khởi chạy cục bộ các phiên bản có thể tái tạo của mạng chuỗi khối.

Gói Kurtosis Ethereum có thể được sử dụng để nhanh chóng khởi tạo một mạng thử nghiệm Ethereum có thể tham số hóa, có khả năng mở rộng cao và riêng tư trên Docker hoặc Kubernetes. Gói này hỗ trợ tất cả các máy khách Lớp thực thi (EL) và Lớp đồng thuận (CL) chính. Kurtosis xử lý linh hoạt tất cả các ánh xạ cổng cục bộ và các kết nối dịch vụ cho một mạng đại diện được sử dụng trong các quy trình xác thực và kiểm thử liên quan đến cơ sở hạ tầng cốt lõi của Ethereum.

- [Gói mạng Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Trang web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Tài liệu](https://docs.kurtosis.com/)

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_

## Các chủ đề liên quan {#related-topics}

- [Các khung phát triển](/developers/docs/frameworks/)
- [Thiết lập môi trường phát triển cục bộ](/developers/local-environment/)
