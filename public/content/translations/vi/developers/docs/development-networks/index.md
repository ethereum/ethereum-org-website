---
title: Mạng lưới phát triển
description: Tổng quan về các mạng lưới phát triển và các công cụ có sẵn để giúp xây dựng các ứng dụng Ethereum.
lang: vi
---

Khi xây dựng một ứng dụng [Ethereum](/) với các hợp đồng thông minh, bạn sẽ muốn chạy nó trên một mạng lưới cục bộ để xem nó hoạt động như thế nào trước khi triển khai nó.

Tương tự như cách bạn có thể chạy một máy chủ cục bộ trên máy tính của mình để phát triển web, bạn có thể sử dụng một mạng lưới phát triển để tạo một phiên bản chuỗi khối cục bộ nhằm kiểm tra ứng dụng phi tập trung (dapp) của bạn. Các mạng lưới phát triển Ethereum này cung cấp các tính năng cho phép lặp lại nhanh hơn nhiều so với một mạng thử nghiệm công khai (ví dụ: bạn không cần phải giải quyết việc lấy ETH từ một vòi testnet).

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu [những điều cơ bản về ngăn xếp Ethereum](/developers/docs/ethereum-stack/) và [các mạng lưới Ethereum](/developers/docs/networks/) trước khi đi sâu vào các mạng lưới phát triển.

## Mạng lưới phát triển là gì? {#what-is-a-development-network}

Các mạng lưới phát triển về cơ bản là các máy khách Ethereum (các bản triển khai của Ethereum) được thiết kế đặc biệt cho việc phát triển cục bộ.

**Tại sao không chạy một nút Ethereum tiêu chuẩn cục bộ?**

Bạn _có thể_ [chạy một nút](/developers/docs/nodes-and-clients/#running-your-own-node) nhưng vì các mạng lưới phát triển được xây dựng có mục đích dành cho việc phát triển, chúng thường đi kèm với các tính năng tiện lợi như:

- Cung cấp dữ liệu một cách xác định cho chuỗi khối cục bộ của bạn (ví dụ: các tài khoản có số dư ETH)
- Tạo các khối ngay lập tức với mỗi giao dịch mà nó nhận được, theo thứ tự và không có độ trễ
- Chức năng gỡ lỗi và ghi nhật ký được nâng cao

## Các công cụ có sẵn {#available-projects}

**Lưu ý**: Hầu hết [các framework phát triển](/developers/docs/frameworks/) đều bao gồm một mạng lưới phát triển được tích hợp sẵn. Chúng tôi khuyên bạn nên bắt đầu với một framework để [thiết lập môi trường phát triển cục bộ của bạn](/developers/local-environment/).

### Mạng lưới Hardhat {#hardhat-network}

Một mạng lưới Ethereum cục bộ được thiết kế cho việc phát triển. Nó cho phép bạn triển khai các hợp đồng của mình, chạy các bài kiểm tra và gỡ lỗi mã của bạn.

Mạng lưới Hardhat được tích hợp sẵn với Hardhat, một môi trường phát triển Ethereum dành cho các chuyên gia.

- [Trang web](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Các Chuỗi Beacon Cục bộ {#local-beacon-chains}

Một số máy khách đồng thuận có các công cụ tích hợp sẵn để khởi chạy các chuỗi beacon cục bộ cho mục đích thử nghiệm. Các hướng dẫn cho Lighthouse, Nimbus và Lodestar đã có sẵn:

- [Mạng thử nghiệm cục bộ sử dụng Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Mạng thử nghiệm cục bộ sử dụng Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Các Chuỗi thử nghiệm Ethereum Công khai {#public-beacon-testchains}

Cũng có hai bản triển khai thử nghiệm công khai được duy trì của Ethereum: Sepolia và Hoodi. Mạng thử nghiệm được đề xuất với sự hỗ trợ dài hạn là Hoodi, nơi bất kỳ ai cũng có thể tự do xác thực. Sepolia sử dụng một tập hợp trình xác thực có cấp phép, nghĩa là không có quyền truy cập chung cho các trình xác thực mới trên mạng thử nghiệm này.

- [Launchpad đặt cọc Hoodi](https://hoodi.launchpad.ethereum.org/)

### Gói Kurtosis Ethereum {#kurtosis}

Kurtosis là một hệ thống xây dựng cho các môi trường thử nghiệm đa vùng chứa (multi-container), cho phép các nhà phát triển khởi chạy cục bộ các phiên bản có thể tái tạo của các mạng lưới chuỗi khối.

Gói Kurtosis Ethereum có thể được sử dụng để nhanh chóng khởi tạo một mạng thử nghiệm Ethereum riêng tư, có khả năng mở rộng cao và có thể tham số hóa trên Docker hoặc Kubernetes. Gói này hỗ trợ tất cả các máy khách Lớp thực thi (EL) và Lớp đồng thuận (CL) chính. Kurtosis xử lý một cách mượt mà tất cả các ánh xạ cổng cục bộ và kết nối dịch vụ cho một mạng lưới đại diện để được sử dụng trong các quy trình xác thực và thử nghiệm liên quan đến cơ sở hạ tầng cốt lõi của Ethereum.

- [Gói mạng lưới Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Trang web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Tài liệu](https://docs.kurtosis.com/)

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_

## Các chủ đề liên quan {#related-topics}

- [Các framework phát triển](/developers/docs/frameworks/)
- [Thiết lập môi trường phát triển cục bộ](/developers/local-environment/)

## Hướng dẫn: Các mạng lưới phát triển & môi trường thử nghiệm trên Ethereum {#tutorials}

- [Phát triển và thử nghiệm dapp với một mạng thử nghiệm Ethereum cục bộ đa máy khách](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Cách khởi chạy một mạng thử nghiệm Ethereum đa máy khách cục bộ với Kurtosis để phát triển và thử nghiệm dapp._