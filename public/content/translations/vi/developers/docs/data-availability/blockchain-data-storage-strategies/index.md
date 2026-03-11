---
title: "Chiến lược lưu trữ dữ liệu chuỗi khối"
description: "Có một số cách để lưu trữ dữ liệu bằng chuỗi khối. Bài viết này sẽ so sánh các chiến lược khác nhau, chi phí và sự đánh đổi của chúng, cũng như các yêu cầu để sử dụng nó một cách an toàn."
lang: vi
---

Có nhiều cách để lưu trữ thông tin trực tiếp trên chuỗi khối, hoặc theo cách được bảo mật bởi chuỗi khối:

- Blob EIP-4844
- Calldata
- Ngoài chuỗi với các cơ chế L1
- "Mã" hợp đồng
- Sự kiện
- Lưu trữ máy ảo Ethereum

Việc lựa chọn phương pháp nào để sử dụng dựa trên một số tiêu chí:

- Nguồn thông tin. Thông tin trong calldata không thể đến trực tiếp từ chính chuỗi khối.
- Đích đến của thông tin. Calldata chỉ có sẵn trong giao dịch bao gồm nó. Các sự kiện hoàn toàn không thể truy cập trên chuỗi.
- Mức độ phức tạp nào là chấp nhận được? Các máy tính chạy một nút quy mô đầy đủ có thể thực hiện nhiều xử lý hơn một ứng dụng khách nhẹ trong một ứng dụng chạy trên trình duyệt.
- Có cần thiết phải tạo điều kiện truy cập dễ dàng vào thông tin từ mọi nút không?
- Các yêu cầu bảo mật.

## Các yêu cầu bảo mật {#security-requirements}

Nhìn chung, bảo mật thông tin bao gồm ba thuộc tính:

- _Tính bảo mật_, các thực thể không được phép không được phép đọc thông tin. Điều này quan trọng trong nhiều trường hợp, nhưng không phải ở đây. _Không có bí mật nào trên chuỗi khối_. Các chuỗi khối hoạt động vì bất kỳ ai cũng có thể xác minh các chuyển đổi trạng thái, vì vậy không thể sử dụng chúng để lưu trữ bí mật trực tiếp. Có nhiều cách để lưu trữ thông tin bí mật trên chuỗi khối, nhưng tất cả chúng đều dựa vào một số thành phần ngoài chuỗi để lưu trữ ít nhất một khóa.

- _Tính toàn vẹn_, thông tin là chính xác, nó không thể bị thay đổi bởi các thực thể không được ủy quyền, hoặc theo những cách không được ủy quyền (ví dụ: chuyển [token ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) mà không có sự kiện `Transfer`). Trên chuỗi khối, mọi nút đều xác minh mọi thay đổi trạng thái, điều này đảm bảo tính toàn vẹn.

- _Tính sẵn có_, thông tin có sẵn cho bất kỳ thực thể được ủy quyền nào. Trên chuỗi khối, điều này thường đạt được bằng cách làm cho thông tin có sẵn trên mọi [nút đầy đủ](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Các giải pháp khác nhau ở đây đều có tính toàn vẹn tuyệt vời, vì các hàm băm được đăng trên L1. Tuy nhiên, chúng có các đảm bảo về tính sẵn có khác nhau.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên có hiểu biết tốt về [các nguyên tắc cơ bản của chuỗi khối](/developers/docs/intro-to-ethereum/). Trang này cũng giả định người đọc đã quen thuộc với [khối](/developers/docs/blocks/), [giao dịch](/developers/docs/transactions/) và các chủ đề liên quan khác.

## Blob EIP-4844 {#eip-4844-blobs}

Bắt đầu với [bản nâng cấp Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md), chuỗi khối Ethereum bao gồm [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), bổ sung các blob dữ liệu vào Ethereum với thời gian tồn tại giới hạn (ban đầu khoảng [18 ngày](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Chúng được định giá riêng biệt với [gas thực thi](/developers/docs/gas), mặc dù sử dụng một cơ chế tương tự. Chúng là một cách rẻ tiền để đăng dữ liệu tạm thời.

Trường hợp sử dụng chính cho các blob EIP-4844 là để các rollup xuất bản các giao dịch của chúng. [Gộp giao dịch lạc quan](/developers/docs/scaling/optimistic-rollups) cần xuất bản các giao dịch trên chuỗi khối của họ. Những giao dịch đó phải có sẵn cho bất kỳ ai trong [thời gian thử thách](https://docs.optimism.io/connect/resources/glossary#challenge-period) để cho phép [người xác thực](https://docs.optimism.io/connect/resources/glossary#validator) sửa lỗi nếu [trình sắp xếp thứ tự](https://docs.optimism.io/connect/resources/glossary#sequencer) của rollup đăng một gốc trạng thái không chính xác.

Tuy nhiên, một khi thời gian thử thách đã qua và gốc trạng thái được hoàn tất, mục đích còn lại để biết các giao dịch này là để sao chép trạng thái hiện tại của chuỗi. Trạng thái này cũng có sẵn từ các nút chuỗi, với yêu cầu xử lý ít hơn nhiều. Vì vậy, thông tin giao dịch vẫn nên được lưu giữ ở một vài nơi, chẳng hạn như [trình khám phá khối](/developers/docs/data-and-analytics/block-explorers), nhưng không cần phải trả tiền cho mức độ chống kiểm duyệt mà Ethereum cung cấp.

[Rollup không kiến thức](/developers/docs/scaling/zk-rollups/#data-availability) cũng đăng dữ liệu giao dịch của họ để cho phép các nút khác sao chép trạng thái hiện có và xác minh bằng chứng hợp lệ, nhưng một lần nữa đó là một yêu cầu ngắn hạn.

Tại thời điểm viết bài, việc đăng trên EIP-4844 tốn một wei (10<sup>-18</sup> ETH) mỗi byte, một con số không đáng kể so với [21.000 gas thực thi mà bất kỳ giao dịch nào, bao gồm cả giao dịch đăng blob, đều tốn](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Bạn có thể xem giá EIP-4844 hiện tại trên [blobscan.com](https://blobscan.com/blocks).

Đây là các địa chỉ để xem các blob được đăng bởi một số rollup nổi tiếng.

| Rollup                               | Địa chỉ hộp thư                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata đề cập đến các byte được gửi như một phần của giao dịch. Nó được lưu trữ như một phần của bản ghi vĩnh viễn của chuỗi khối trong khối bao gồm giao dịch đó.

Đây là phương pháp rẻ nhất để đưa dữ liệu vĩnh viễn vào chuỗi khối. Chi phí cho mỗi byte là 4 gas thực thi (nếu byte là 0) hoặc 16 gas (bất kỳ giá trị nào khác). Nếu dữ liệu được nén, đây là một phương pháp tiêu chuẩn, thì mọi giá trị byte đều có khả năng như nhau, vì vậy chi phí trung bình là khoảng 15,95 gas mỗi byte.

Tại thời điểm viết bài, giá là 12 gwei/gas và 2300 $/ETH, có nghĩa là chi phí khoảng 45 xu cho mỗi kilobyte. Bởi vì đây là phương pháp rẻ nhất trước EIP-4844, đây là phương pháp mà các rollup đã sử dụng để lưu trữ thông tin giao dịch, thông tin này cần có sẵn cho [các thử thách lỗi](https://docs.optimism.io/stack/protocol/overview#fault-proofs), nhưng không cần phải truy cập trực tiếp trên chuỗi.

Đây là các địa chỉ để xem các giao dịch được đăng bởi một số rollup nổi tiếng.

| Rollup                               | Địa chỉ hộp thư                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Ngoài chuỗi với cơ chế L1 {#offchain-with-l1-mechs}

Tùy thuộc vào sự đánh đổi về bảo mật của bạn, có thể chấp nhận đặt thông tin ở nơi khác và sử dụng một cơ chế đảm bảo dữ liệu có sẵn khi cần. Có hai yêu cầu để điều này hoạt động:

1. Đăng một [hàm băm](https://en.wikipedia.org/wiki/Cryptographic_hash_function) của dữ liệu trên chuỗi khối, được gọi là _cam kết đầu vào_. Đây có thể là một từ 32 byte duy nhất, vì vậy nó không tốn kém. Miễn là cam kết đầu vào có sẵn, tính toàn vẹn được đảm bảo vì không khả thi để tìm bất kỳ dữ liệu nào khác sẽ băm ra cùng một giá trị. Vì vậy, nếu dữ liệu không chính xác được cung cấp, nó có thể được phát hiện.

2. Có một cơ chế đảm bảo tính sẵn có. Ví dụ: trong [Redstone](https://redstone.xyz/docs/what-is-redstone), bất kỳ nút nào cũng có thể gửi một thử thách về tính sẵn có. Nếu trình sắp xếp thứ tự không phản hồi trên chuỗi trước thời hạn, cam kết đầu vào sẽ bị hủy, vì vậy thông tin được coi là chưa bao giờ được đăng.

Điều này có thể chấp nhận được đối với một gộp giao dịch lạc quan vì chúng tôi đã dựa vào việc có ít nhất một người xác minh trung thực cho gốc trạng thái. Một người xác minh trung thực như vậy cũng sẽ đảm bảo rằng nó có dữ liệu để xử lý các khối và đưa ra một thử thách về tính sẵn có nếu thông tin không có sẵn ngoài chuỗi. Loại gộp giao dịch lạc quan này được gọi là [plasma](/developers/docs/scaling/plasma/).

## Mã hợp đồng {#contract-code}

Thông tin chỉ cần được viết một lần, không bao giờ bị ghi đè và cần có sẵn trên chuỗi có thể được lưu trữ dưới dạng mã hợp đồng. Điều này có nghĩa là chúng tôi tạo một "hợp đồng thông minh" với dữ liệu và sau đó sử dụng [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) để đọc thông tin. Ưu điểm là sao chép mã tương đối rẻ.

Ngoài chi phí mở rộng bộ nhớ, `EXTCODECOPY` tốn 2600 gas cho lần truy cập đầu tiên vào một hợp đồng (khi nó ở trạng thái "lạnh") và 100 gas cho các lần sao chép tiếp theo từ cùng một hợp đồng cộng với 3 gas cho mỗi từ 32 byte. So với calldata, có giá 15,95 mỗi byte, thì cách này rẻ hơn bắt đầu từ khoảng 200 byte. Dựa trên [công thức tính chi phí mở rộng bộ nhớ](https://www.evm.codes/about#memoryexpansion), miễn là bạn không cần nhiều hơn 4MB bộ nhớ, chi phí mở rộng bộ nhớ sẽ nhỏ hơn chi phí thêm calldata.

Tất nhiên, đây chỉ là chi phí để _đọc_ dữ liệu. Để tạo hợp đồng tốn khoảng 32.000 gas + 200 gas/byte. Phương pháp này chỉ kinh tế khi cùng một thông tin cần được đọc nhiều lần trong các giao dịch khác nhau.

Mã hợp đồng có thể vô nghĩa, miễn là nó không bắt đầu bằng `0xEF`. Các hợp đồng bắt đầu bằng `0xEF` được hiểu là [định dạng đối tượng ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), có các yêu cầu nghiêm ngặt hơn nhiều.

## Sự kiện {#events}

[Các sự kiện](https://docs.alchemy.com/docs/solidity-events) được phát ra bởi các hợp đồng thông minh và được đọc bởi phần mềm ngoài chuỗi.
Ưu điểm của chúng là mã ngoài chuỗi có thể lắng nghe các sự kiện. Chi phí là [gas](https://www.evm.codes/#a0?fork=cancun), 375 cộng với 8 gas cho mỗi byte dữ liệu. Với 12 gwei/gas và 2300 $/ETH, điều này tương đương với một xu cộng với 22 xu cho mỗi kilobyte.

## Lưu trữ {#storage}

Các hợp đồng thông minh có quyền truy cập vào [lưu trữ bền vững](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Tuy nhiên, nó rất tốn kém. Việc ghi một từ 32 byte vào một khe lưu trữ trống trước đó có thể [tốn 22.100 gas](https://www.evm.codes/#55?fork=cancun). Với 12 gwei/gas và 2300 $/ETH, con số này là khoảng 61 xu cho mỗi hoạt động ghi, hoặc 19,5 đô la cho mỗi kilobyte.

Đây là hình thức lưu trữ đắt nhất trong Ethereum.

## Tóm tắt {#summary}

Bảng này tóm tắt các tùy chọn khác nhau, ưu và nhược điểm của chúng.

| Loại lưu trữ                  | Nguồn dữ liệu               | Đảm bảo tính sẵn có                                                                                                                                | Tính sẵn có trên chuỗi                                   | Các giới hạn bổ sung                                                 |
| ----------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| Blob EIP-4844                 | Ngoài chuỗi                 | Ethereum đảm bảo trong [~18 ngày](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Chỉ có hàm băm                                           |                                                                      |
| Calldata                      | Ngoài chuỗi                 | Ethereum đảm bảo mãi mãi (một phần của chuỗi khối)                                                                              | Chỉ có sẵn nếu được ghi vào hợp đồng và tại giao dịch đó |                                                                      |
| Ngoài chuỗi với các cơ chế L1 | Ngoài chuỗi                 | Đảm bảo "một người xác minh trung thực" trong thời gian thử thách                                                                                  | Chỉ hàm băm                                              | Được đảm bảo bởi cơ chế thử thách, chỉ trong thời gian thử thách     |
| Mã hợp đồng                   | Trên chuỗi hoặc ngoài chuỗi | Ethereum đảm bảo mãi mãi (một phần của chuỗi khối)                                                                              | Có                                                       | Được ghi vào một địa chỉ "ngẫu nhiên", không thể bắt đầu bằng `0xEF` |
| Sự kiện                       | Trên chuỗi                  | Ethereum đảm bảo mãi mãi (một phần của chuỗi khối)                                                                              | Không                                                    |                                                                      |
| Lưu trữ                       | Trên chuỗi                  | Ethereum đảm bảo mãi mãi (một phần của chuỗi khối và trạng thái hiện tại cho đến khi bị ghi đè)                                 | Có                                                       |                                                                      |
