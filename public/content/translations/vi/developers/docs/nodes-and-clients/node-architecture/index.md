---
title: "Kiến trúc nút"
description: "Giới thiệu về cách các nút Ethereum được tổ chức."
lang: vi
---

Một nút Ethereum bao gồm hai máy khách: một [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và một [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients). Để một nút đề xuất một khối mới, nó cũng phải chạy một [máy khách trình xác thực](#validators).

Khi Ethereum sử dụng [Bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow/), một máy khách thực thi là đủ để chạy một nút Ethereum đầy đủ. Tuy nhiên, kể từ khi triển khai [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos/), máy khách thực thi phải được sử dụng cùng với một phần mềm khác gọi là [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients).

Biểu đồ dưới đây cho thấy mối quan hệ giữa hai máy khách Ethereum. Hai máy khách này kết nối với các mạng lưới ngang hàng (P2P) tương ứng của riêng chúng. Cần có các mạng lưới P2P riêng biệt vì các máy khách thực thi truyền bá các giao dịch qua mạng lưới P2P của chúng, cho phép chúng quản lý bể giao dịch cục bộ, trong khi các ứng dụng khách đồng thuận truyền bá các khối qua mạng lưới P2P của chúng, cho phép đạt được sự đồng thuận và phát triển Chuỗi.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Có một số tùy chọn cho máy khách thực thi bao gồm Erigon, Nethermind và Besu_.

Để cấu trúc hai máy khách này hoạt động, các ứng dụng khách đồng thuận phải chuyển các gói giao dịch cho máy khách thực thi. Máy khách thực thi sẽ thực thi các giao dịch cục bộ để xác thực rằng các giao dịch không vi phạm bất kỳ quy tắc nào của Ethereum và bản cập nhật được đề xuất cho trạng thái của Ethereum là chính xác. Khi một nút được chọn làm nhà sản xuất khối, phiên bản ứng dụng khách đồng thuận của nó sẽ yêu cầu các gói giao dịch từ máy khách thực thi để đưa vào khối mới và thực thi chúng nhằm cập nhật trạng thái toàn cục. Ứng dụng khách đồng thuận điều khiển máy khách thực thi thông qua kết nối RPC cục bộ bằng cách sử dụng [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Máy khách thực thi làm gì? {#execution-client}

Máy khách thực thi chịu trách nhiệm xác thực, xử lý và truyền bá giao dịch, cùng với việc quản lý trạng thái và hỗ trợ Máy ảo Ethereum ([EVM](/developers/docs/evm/)). Nó **không** chịu trách nhiệm xây dựng khối, truyền bá khối hoặc xử lý logic đồng thuận. Những việc này thuộc thẩm quyền của ứng dụng khách đồng thuận.

Máy khách thực thi tạo ra các tải trọng thực thi - danh sách các giao dịch, trie trạng thái được cập nhật và các dữ liệu liên quan đến thực thi khác. Các ứng dụng khách đồng thuận đưa tải trọng thực thi vào mọi khối. Máy khách thực thi cũng chịu trách nhiệm thực thi lại các giao dịch trong các khối mới để đảm bảo chúng hợp lệ. Việc thực thi các giao dịch được thực hiện trên máy tính nhúng của máy khách thực thi, được gọi là [Máy ảo Ethereum (EVM)](/developers/docs/evm).

Máy khách thực thi cũng cung cấp giao diện người dùng cho Ethereum thông qua [các phương thức RPC](/developers/docs/apis/json-rpc) cho phép người dùng truy vấn Chuỗi khối Ethereum, gửi giao dịch và triển khai hợp đồng thông minh. Thông thường, các lệnh gọi RPC được xử lý bởi một Thư viện như [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), hoặc bởi một giao diện người dùng như Ví trình duyệt.

Tóm lại, máy khách thực thi là:

- một cổng kết nối người dùng với Ethereum
- nơi chứa Máy ảo Ethereum, trạng thái của Ethereum và bể giao dịch.

## Ứng dụng khách đồng thuận làm gì? {#consensus-client}

Ứng dụng khách đồng thuận xử lý tất cả logic cho phép một nút luôn đồng bộ hóa với mạng lưới Ethereum. Điều này bao gồm việc nhận các khối từ các nút ngang hàng và chạy một thuật toán chọn nhánh để đảm bảo nút luôn theo dõi Chuỗi có sự tích lũy chứng thực lớn nhất (được tính theo trọng số số dư hiệu quả của trình xác thực). Tương tự như máy khách thực thi, các ứng dụng khách đồng thuận có mạng lưới P2P riêng để chia sẻ các khối và chứng thực.

Ứng dụng khách đồng thuận không tham gia vào việc chứng thực hoặc đề xuất các khối - việc này được thực hiện bởi một trình xác thực, một tiện ích bổ sung tùy chọn cho ứng dụng khách đồng thuận. Một ứng dụng khách đồng thuận không có trình xác thực chỉ theo dõi phần đầu của Chuỗi, cho phép nút luôn được đồng bộ hóa. Điều này cho phép người dùng giao dịch với Ethereum bằng máy khách thực thi của họ, với sự tự tin rằng họ đang ở trên đúng Chuỗi.

## Trình xác thực {#validators}

Việc đặt cọc và chạy phần mềm trình xác thực giúp một nút đủ điều kiện được chọn để đề xuất một khối mới. Các nhà điều hành nút có thể thêm một trình xác thực vào các ứng dụng khách đồng thuận của họ bằng cách gửi 32 ETH vào hợp đồng tiền gửi. Máy khách trình xác thực đi kèm với ứng dụng khách đồng thuận và có thể được thêm vào một nút bất kỳ lúc nào. Trình xác thực xử lý các chứng thực và đề xuất khối. Nó cũng cho phép một nút tích lũy phần thưởng hoặc mất ETH thông qua các hình phạt hoặc phạt cắt giảm.

[Tìm hiểu thêm về việc đặt cọc](/staking/).

## So sánh các thành phần của một nút {#node-comparison}

| Máy khách thực thi                                 | Ứng dụng khách đồng thuận                                                                                                                                 | Trình xác thực               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Truyền bá giao dịch qua mạng lưới P2P của nó       | Truyền bá khối và chứng thực qua mạng lưới P2P của nó                                                                                                     | Đề xuất khối                 |
| Thực thi/thực thi lại các giao dịch                | Chạy thuật toán chọn nhánh                                                                                                                                | Tích lũy phần thưởng/hình phạt |
| Xác minh các thay đổi trạng thái đến               | Theo dõi phần đầu của Chuỗi                                                                                                                               | Thực hiện chứng thực         |
| Quản lý trie trạng thái và biên lai                | Quản lý trạng thái Beacon (chứa thông tin đồng thuận và thực thi)                                                                                         | Yêu cầu đặt cọc 32 ETH       |
| Tạo tải trọng thực thi                             | Theo dõi tính ngẫu nhiên tích lũy trong RANDAO (một thuật toán cung cấp tính ngẫu nhiên có thể xác minh cho việc chọn trình xác thực và các hoạt động đồng thuận khác) | Có thể bị phạt cắt giảm      |
| Cung cấp JSON-RPC API để tương tác với Ethereum    | Theo dõi việc biện minh và hoàn thiện                                                                                                                     |                              |

## Đọc thêm {#further-reading}

- [Bằng chứng cổ phần (PoS)](/developers/docs/consensus-mechanisms/pos)
- [Đề xuất khối](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Phần thưởng và hình phạt của trình xác thực](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)