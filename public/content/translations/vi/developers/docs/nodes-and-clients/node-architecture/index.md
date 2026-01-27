---
title: Kiến trúc nốt
description: Giới thiệu về cách tổ chức các nút Ethereum.
lang: vi
---

Một nút Ethereum bao gồm hai máy khách: một [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và một [máy khách đồng thuận ](/developers/docs/nodes-and-clients/#consensus-clients). Để một nút đề xuất một khối mới, nó cũng phải chạy một [máy khách xác thực](#validators).

Khi Ethereum sử dụng [bằng chứng công việc](/developers/docs/consensus-mechanisms/pow/), một máy khách thực thi là đủ để chạy một nút Ethereum đầy đủ. Tuy nhiên, kể từ khi triển khai [bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pow/), máy khách thực thi phải được sử dụng cùng với một phần mềm khác được gọi là [máy khách đồng thuận ](/developers/docs/nodes-and-clients/#consensus-clients).

Sơ đồ dưới đây cho thấy mối quan hệ giữa hai máy khách Ethereum. Hai máy khách kết nối với các mạng ngang hàng (P2P) tương ứng của riêng chúng. Cần có các mạng P2P riêng biệt vì các máy khách thực thi lan truyền các giao dịch qua mạng P2P của chúng, cho phép chúng quản lý vùng giao dịch cục bộ của mình, trong khi các máy khách đồng thuận lan truyền các khối qua mạng P2P của chúng, cho phép sự đồng thuận và phát triển chuỗi.

![](node-architecture-text-background.png)

_Có một số tùy chọn cho máy khách thực thi bao gồm Erigon, Nethermind và Besu_.

Để cấu trúc hai máy khách này hoạt động, các máy khách đồng thuận phải chuyển các gói giao dịch cho máy khách thực thi. Máy khách thực thi thực hiện các giao dịch cục bộ để xác thực rằng các giao dịch đó không vi phạm bất kỳ quy tắc nào của Ethereum và bản cập nhật được đề xuất cho trạng thái của Ethereum là chính xác. Khi một nút được chọn làm trình sản xuất khối, phiên bản máy khách đồng thuận của nó sẽ yêu cầu các gói giao dịch từ máy khách thực thi để đưa vào khối mới và thực thi chúng để cập nhật trạng thái chung. Máy khách đồng thuận điều khiển máy khách thực thi thông qua kết nối RPC cục bộ bằng [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Máy khách thực thi làm gì? {#execution-client}

Máy khách thực thi chịu trách nhiệm xác thực, xử lý và lan truyền giao dịch, cùng với việc quản lý trạng thái và hỗ trợ Máy ảo Ethereum ([EVM](/developers/docs/evm/)). Nó **không** chịu trách nhiệm xây dựng khối, lan truyền khối hoặc xử lý logic đồng thuận. Những việc này thuộc phạm vi của máy khách đồng thuận .

Máy khách thực thi tạo ra các tải trọng thực thi - danh sách các giao dịch, cây trạng thái được cập nhật và các dữ liệu liên quan đến việc thực thi khác. Các máy khách đồng thuận bao gồm tải trọng thực thi trong mọi khối. Máy khách thực thi cũng chịu trách nhiệm thực thi lại các giao dịch trong các khối mới để đảm bảo chúng hợp lệ. Việc thực thi các giao dịch được thực hiện trên máy tính nhúng của máy khách thực thi, được gọi là [Máy ảo Ethereum (EVM)](/developers/docs/evm).

Máy khách thực thi cũng cung cấp giao diện người dùng cho Ethereum thông qua [các phương thức RPC](/developers/docs/apis/json-rpc) cho phép người dùng truy vấn chuỗi khối Ethereum, gửi giao dịch và triển khai các hợp đồng thông minh. Thông thường, các lệnh gọi RPC được xử lý bởi một thư viện như [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/), hoặc bởi một giao diện người dùng như ví trình duyệt.

Tóm lại, máy khách thực thi là:

- một cổng kết nối của người dùng đến Ethereum
- nơi chứa Máy ảo Ethereum, trạng thái của Ethereum và vùng giao dịch.

## Máy khách đồng thuận làm gì? {#consensus-client}

Máy khách đồng thuận xử lý tất cả logic cho phép một nút đồng bộ với mạng Ethereum. Điều này bao gồm việc nhận các khối từ các máy ngang hàng và chạy thuật toán lựa chọn phân nhánh để đảm bảo nút luôn đi theo chuỗi có sự tích lũy nhiều nhất các chứng thực (được tính trọng số theo số dư hiệu dụng của nút xác thực). Tương tự như máy khách thực thi, các máy khách đồng thuận có mạng P2P riêng mà qua đó chúng chia sẻ các khối và chứng thực.

Máy khách đồng thuận không tham gia vào việc chứng thực hoặc đề xuất các khối - việc này được thực hiện bởi một nút xác thực, một tiện ích bổ sung tùy chọn cho một máy khách đồng thuận . Một máy khách đồng thuận không có nút xác thực chỉ theo kịp phần đầu của chuỗi, cho phép nút duy trì đồng bộ. Điều này cho phép người dùng giao dịch với Ethereum bằng máy khách thực thi của họ, tự tin rằng họ đang ở trên đúng chuỗi.

## Người xác thực {#validators}

Việc đặt cược và chạy phần mềm nút xác thực giúp một nút đủ điều kiện được chọn để đề xuất một khối mới. Các nhà vận hành nút có thể thêm một nút xác thực vào các máy khách đồng thuận của họ bằng cách ký gửi 32 ETH vào hợp đồng ký gửi. Máy khách xác thực đi kèm với máy khách đồng thuận và có thể được thêm vào một nút bất kỳ lúc nào. Nút xác thực xử lý các chứng thực và đề xuất khối. Nó cũng cho phép một nút tích lũy phần thưởng hoặc mất ETH thông qua các hình phạt hoặc slashing.

[Thêm về việc đặt cược](/staking/).

## So sánh các thành phần của một nút {#node-comparison}

| Máy khách thực thi                              | Máy khách đồng thuận                                                                                                                                                                  | Nút xác thực                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Lan truyền các giao dịch qua mạng P2P của nó    | Lan truyền các khối và chứng thực qua mạng P2P của nó                                                                                                                                 | Đề xuất các khối               |
| Thực thi/thực thi lại các giao dịch             | Chạy thuật toán lựa chọn phân nhánh                                                                                                                                                   | Tích lũy phần thưởng/hình phạt |
| Xác minh các thay đổi trạng thái sắp tới        | Theo dõi phần đầu của chuỗi                                                                                                                                                           | Tạo chứng thực                 |
| Quản lý trạng thái và cây biên nhận             | Quản lý trạng thái Beacon (chứa thông tin đồng thuận và thực thi)                                                                                                  | Yêu cầu đặt cược 32 ETH        |
| Tạo tải trọng thực thi                          | Theo dõi tính ngẫu nhiên tích lũy trong RANDAO (một thuật toán cung cấp tính ngẫu nhiên có thể xác minh để lựa chọn nút xác thực và các hoạt động đồng thuận khác) | Có thể bị slashing             |
| Cung cấp API JSON-RPC để tương tác với Ethereum | Theo dõi sự hợp lý hóa và sự hoàn tất                                                                                                                                                 |                                |

## Đọc thêm {#further-reading}

- [Bằng chứng cổ phần](/developers/docs/consensus-mechanisms/pos)
- [Đề xuất khối](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Phần thưởng và hình phạt dành cho nút xác thực](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
